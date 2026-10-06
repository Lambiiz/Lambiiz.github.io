/**
 * Procedural animation for birds and bats.
 *
 * The body bone is built level; standing birds tilt it up by their posture angle, flying ones keep
 * it level. The head is stabilised in world space (birds hold their heads still and level), which
 * also gives walking birds their head bob: the head stays put on the ground while the body walks
 * under it, then thrusts forward. Legs are two-bone IK chains whose middle joint (the bird's
 * "backwards knee", really the ankle) bends backwards. Hops and steps are locked to the ground
 * scrolling at the clip's speed.
 *
 * Feathered wings exist twice: folded against the body (shown on the ground) and as a jointed,
 * spread wing (shoulder, forearm, hand with fanned flight feathers) for flight. Bat wings are one
 * membrane wing that folds at the wrist.
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, easeInOut, keyframes, lerp, segmentFrame, twoBoneIK } from '../core/math';
import type { Animator, ClipDef } from '../model/types';

export interface FlyerLeg {
  side: number;
  /** Hip in the body frame. */
  hip: Vec3;
  bones: [number, number, number];
  len: [number, number];
}

export interface FlyerRig {
  kind: 'flyer';
  bat: boolean;
  bones: { body: number; neck: number; head: number; jaw: number; tail: number; tailFeathers: number[]; tailSpread: number[]; wings: number[][]; legs: FlyerLeg[] };
  groups: { wingFolded: number[]; wingSpread: number[] };
  dims: { S: number; bl: number; bh: number; tilt: number; legLen: number; neckLen: number; hr: number; W: number };
  traits: { energy: number; hopper: boolean; ground: boolean; attack: 'peck' | 'talons' | 'bite'; call: string; bob: number };
}

interface FState {
  /** Body offset from its standing position (creature space). */
  root: Vec3;
  /** Body pitch, + nose down (standing birds are at −tilt). */
  pitch: number;
  yaw: number;
  neckPitch: number;
  neckYaw: number;
  /** Head orientation in world terms (+ nose down) and a forward thrust in pixels. */
  headPitch: number;
  headYaw: number;
  headRoll: number;
  headX: number;
  beak: number;
  /** Birds: 0 wings folded … 1 spread. Bats: ignored. */
  spread: number;
  /** + raises the wings. */
  flap: number;
  sweep: number;
  /** Wrist fold (upstroke, bats folding). */
  wrist: number;
  tailPitch: number;
  tailSpread: number;
  tailYaw: number;
  feet: { pos: Vec3; planted: boolean }[];
  /** 0 feet at their targets … 1 tucked under the body (flight). */
  tuck: number;
  /** 0..1 fallen onto the side. */
  fall: number;
  /** Bats asleep upside down. */
  hang: boolean;
  blink: number;
  mood: SkeletonPose['mood'];
  shadow: number;
  flash: number;
}

export class FlyerAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly standY: number;
  private readonly standFeet: Vec3[];
  private readonly stride: { walk: number; fly: number };
  private readonly flyH: number;

  constructor(readonly rig: FlyerRig) {
    const d = rig.dims, t = rig.traits;
    // body height so the hips sit at a comfortable crouch over the feet
    const tiltM = Mat3.rotZ(d.tilt);
    let hipY = 0;
    for (const l of rig.bones.legs) hipY = Math.min(hipY, tiltM.apply(l.hip).y);
    const legReach = rig.bones.legs.length ? (rig.bones.legs[0].len[0] + rig.bones.legs[0].len[1]) * 0.86 : d.bh;
    this.standY = rig.bat ? d.bh * 0.6 : legReach - hipY;
    this.standFeet = rig.bones.legs.map((l) => {
      const h = tiltM.apply(l.hip);
      return new Vec3(h.x + d.S * 0.04, 0, l.side * Math.max(Math.abs(h.z) * 0.85, 0.8));
    });
    this.flyH = rig.bat ? d.S * 2.2 + d.W * 0.4 : Math.max(this.standY * 1.6, d.S * 1.3) + d.W * 0.5;
    // walkers never stride further than their legs reach
    const legSpan = rig.bones.legs.length ? rig.bones.legs[0].len[0] + rig.bones.legs[0].len[1] : d.S;
    this.stride = { walk: t.hopper ? d.S * 0.75 : Math.min(d.S * 0.9, legSpan * 1.25), fly: d.S * 3.2 };
    const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
      ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
    const e = lerp(0.85, 1.2, t.energy);
    if (rig.bat) {
      this.clips = [
        def('idle', 'Hover', 6, Math.round(12 * e), true),
        def('walk', 'Fly', 6, Math.round(12 * e), true, this.stride.fly * 0.7),
        def('run', 'Fast flight', 6, Math.round(14 * e), true, this.stride.fly * 1.1),
        def('attack', 'Bite', 9, 12, false),
        def('call', 'Screech', 8, 10, false),
        def('hurt', 'Hurt', 6, 12, false),
        def('die', 'Die', 10, 10, false),
        def('sleep', 'Hang', 4, 3, true),
      ];
      return;
    }
    const attack = t.attack === 'talons' ? 'Talon strike' : 'Peck';
    this.clips = [
      def('idle', 'Idle', 8, Math.round(6 * e), true),
      def('walk', t.hopper ? 'Hop' : 'Walk', 8, Math.round((t.hopper ? 10 : 8) * e), true, this.stride.walk),
      t.ground ? def('run', 'Run', 8, Math.round(12 * e), true, this.stride.walk * 2) : def('run', 'Fly', 8, Math.round(11 * e), true, this.stride.fly),
      t.ground ? def('fly', 'Flutter', 8, 12, true, this.stride.fly * 0.6) : def('glide', 'Glide', 4, 6, true, this.stride.fly),
      def('jump', t.ground ? 'Flap up' : 'Take off', 12, 12, false),
      def('attack', attack, 9, 12, false),
      def('call', t.call, 8, 8, false),
      def('eat', 'Peck food', 8, 8, true),
      def('hurt', 'Hurt', 6, 12, false),
      def('die', 'Die', 10, 10, false),
      def('sleep', 'Sleep', 4, 3, true),
    ];
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: FState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose);
  }

  private neutral(): FState {
    const bat = this.rig.bat;
    return {
      root: Vec3.ZERO, pitch: bat ? 0 : -this.rig.dims.tilt, yaw: 0, neckPitch: 0, neckYaw: 0, headPitch: 0, headYaw: 0, headRoll: 0, headX: 0, beak: 0,
      spread: 0, flap: 0, sweep: 0, wrist: 0, tailPitch: 0, tailSpread: 0, tailYaw: 0,
      feet: this.standFeet.map((p) => ({ pos: p, planted: true })), tuck: 0, fall: 0, hang: false, blink: 0, mood: 'neutral', shadow: 1, flash: 0,
    };
  }

  // ------------------------------------------------------------------------------------ apply

  private apply(s: FState, pose: SkeletonPose): void {
    pose.reset();
    const B = this.rig.bones, d = this.rig.dims;
    const yawM = Mat3.rotY(s.yaw);
    const bodyBasis = yawM.mul(Mat3.rotZ(-s.pitch));
    pose.setLocal(B.body, new Xform(bodyBasis, new Vec3(0, this.standY, 0).add(s.root)));
    pose.rotate(B.neck, Mat3.rotY(s.neckYaw).mul(Mat3.rotZ(-s.neckPitch)));
    if (B.tail >= 0) pose.rotate(B.tail, Mat3.rotY(s.tailYaw).mul(Mat3.rotZ(s.tailPitch)));
    B.tailFeathers.forEach((f, i) => pose.rotate(f, Mat3.rotY(B.tailSpread[i] * s.tailSpread)));
    B.wings.forEach((w, i) => {
      const side = i === 0 ? -1 : 1;
      pose.rotate(w[0], Mat3.rotZ(s.flap).mul(Mat3.rotY(-side * s.sweep)));
      if (this.rig.bat) {
        pose.rotate(w[1], Mat3.rotY(side * s.wrist * 1.5));
        pose.rotate(w[2], Mat3.rotY(-side * s.wrist * 2.1));
      } else {
        pose.rotate(w[1], Mat3.rotY(side * s.wrist * 0.35));
        pose.rotate(w[2], Mat3.rotY(-side * s.wrist * 1.1).mul(Mat3.rotZ(-s.wrist * 0.3)));
      }
    });
    if (!this.rig.bat) {
      const hide = s.spread < 0.5 ? this.rig.groups.wingSpread : this.rig.groups.wingFolded;
      for (const g of hide) pose.hide.add(g);
    }
    pose.solve();

    // head: stabilised in world space
    const neckEnd = pose.world[B.neck].point(new Vec3(d.neckLen, 0, 0));
    const fwd = yawM.apply(Vec3.X);
    pose.setWorld(B.head, new Xform(Mat3.rotY(s.yaw + s.headYaw).mul(Mat3.rotZ(-s.headPitch)).mul(Mat3.rotX(s.headRoll)), neckEnd.addScaled(fwd, s.headX)));
    if (B.jaw >= 0) pose.rotate(B.jaw, Mat3.rotZ(-s.beak * 0.55));

    // legs
    const body = pose.world[B.body];
    const back = fwd.neg();
    B.legs.forEach((leg, i) => {
      const hipW = body.point(leg.hip);
      const tucked = body.point(leg.hip.add(new Vec3(-d.bl * 0.22, -leg.len[0] * 0.55, 0)));
      const target = Vec3.lerp(s.feet[i].pos, tucked, s.tuck);
      const { mid, end } = twoBoneIK(hipW, target, leg.len[0], leg.len[1], back.add(new Vec3(0, -0.2, 0)));
      pose.setWorld(leg.bones[0], segmentFrame(hipW, mid, back));
      pose.setWorld(leg.bones[1], segmentFrame(mid, end, back));
      pose.setWorld(leg.bones[2], new Xform(yawM.mul(Mat3.rotZ(-1.1 * s.tuck)), end));
    });
    pose.solve();

    if (s.fall > 0) {
      const a = s.fall * (PI / 2 - 0.15);
      const pivot = new Vec3(0, 0, -d.bh * 0.5);
      pose.transformAll(new Xform(Mat3.rotX(-a), pivot).mul(new Xform(Mat3.I, pivot.neg())));
    }
    if (s.hang) {
      // upside down, hanging from the feet
      const top = this.flyH + d.bh;
      const pivot = new Vec3(0, top, 0);
      pose.transformAll(new Xform(Mat3.rotZ(PI), pivot).mul(new Xform(Mat3.I, pivot.neg())));
    }
    pose.blink = s.blink;
    pose.mouth = s.beak;
    pose.mood = s.mood;
    pose.shadow = s.shadow;
    pose.flash = s.flash;
  }

  // ------------------------------------------------------------------------------------ helpers

  private look(s: FState, u: number): void {
    // birds turn their heads in quick jerks, not smooth sweeps
    const k = Math.floor(u * 4) % 4;
    s.headYaw = [0, 0.55, 0.2, -0.45][k];
    s.headPitch = [0, -0.1, 0.1, 0][k];
    s.headRoll = [0, 0, 0.25, 0][k];
  }

  /** Flapping flight at altitude. */
  private flight(s: FState, u: number, amp: number, alt: number): void {
    const d = this.rig.dims;
    const c = Math.cos(TAU * u), sn = Math.sin(TAU * u);
    s.spread = 1;
    s.flap = amp * c - 0.05;
    s.wrist = this.rig.bat ? 0.55 * Math.max(0, -sn) + 0.1 : 0.75 * Math.max(0, -sn);
    s.sweep = 0.12 + 0.15 * Math.max(0, -sn);
    s.root = new Vec3(0, alt + d.S * 0.12 * sn - this.standY, 0);
    s.pitch = this.rig.bat ? -0.1 : 0.05;
    s.tuck = 1;
    s.tailSpread = 0.4;
    s.headPitch = 0.05;
    s.shadow = 0.55;
  }

  /** One hop: planted, crouch, launch, flight, landing; locked to the scrolling ground. */
  private hop(s: FState, u: number, stride: number): void {
    const d = this.rig.dims;
    const t0 = 0.3, t1 = 0.72;
    const air = u > t0 && u < t1 ? (u - t0) / (t1 - t0) : -1;
    const X = air < 0 ? (u <= t0 ? 0 : stride) : stride * easeInOut(air);
    const off = X - stride * u;
    const crouch = keyframes(u, [[0, 0], [0.2, 0.6], [0.3, 0], [0.72, 0], [0.8, 0.5], [1, 0]]);
    const h = air < 0 ? 0 : d.legLen * 0.8 * Math.sin(PI * air);
    s.root = new Vec3(off, h - d.legLen * 0.25 * crouch, 0);
    s.pitch = -d.tilt + 0.15 * crouch - 0.1 * (air < 0 ? 0 : Math.cos(PI * air));
    s.feet = this.standFeet.map((p) => ({ pos: p.add(new Vec3(off, air < 0 ? 0 : h * 0.85, 0)), planted: air < 0 }));
    s.tailPitch = 0.2 * crouch + (air < 0 ? 0 : 0.2);
    s.shadow = air < 0 ? 1 : 1 - 0.3 * Math.sin(PI * air);
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: FState): void {
    if (this.rig.bat) {
      this.flight(s, u, 1.0, this.flyH);
      s.tuck = 0.6;
      s.shadow = 0.6;
      return;
    }
    this.look(s, u);
    s.tailPitch = u >= 0.5 && u < 0.625 ? 0.3 : 0;
    s.root = new Vec3(0, -this.rig.dims.S * 0.02 * Math.sin(TAU * u), 0);
    if (u >= 0.75 && u < 0.875) s.blink = 1;
  }

  clip_walk(u: number, s: FState): void {
    const d = this.rig.dims, t = this.rig.traits;
    if (this.rig.bat) {
      this.flight(s, u, 0.95, this.flyH);
      s.pitch = 0.05;
      return;
    }
    if (t.hopper) {
      this.hop(s, u, this.stride.walk);
      return;
    }
    // alternating steps, two per loop, with the ground-locked head bob
    const stride = this.stride.walk;
    const duty = 0.62;
    const half = (stride * duty) / 2;
    s.feet = this.standFeet.map((p, i) => {
      const ph = (u + (i ? 0.5 : 0)) % 1;
      let x: number, y = 0;
      if (ph < duty) x = half - (ph / duty) * stride * duty;
      else {
        const k = (ph - duty) / (1 - duty);
        x = lerp(-half, half, easeInOut(k));
        y = d.legLen * 0.28 * Math.sin(PI * k);
      }
      return { pos: p.add(new Vec3(x, y, 0)), planted: ph < duty };
    });
    const step = (u * 2) % 1;
    const dist = (stride / 2) * 0.65 * t.bob;
    s.headX = step < 0.65 ? dist / 2 - dist * (step / 0.65) : -dist / 2 + dist * ((step - 0.65) / 0.35);
    s.root = new Vec3(0, -d.legLen * 0.04 * Math.cos(TAU * u * 2), 0);
    s.yaw = 0.05 * Math.sin(TAU * u);
    s.tailYaw = -0.12 * Math.sin(TAU * u);
    s.pitch += 0.04 * Math.sin(TAU * u * 2);
  }

  clip_run(u: number, s: FState): void {
    if (this.rig.bat) {
      this.flight(s, u, 1.1, this.flyH * 0.9);
      s.pitch = 0.2;
      return;
    }
    if (this.rig.traits.ground) {
      // chickens run with their wings half open
      this.clip_walk(u, s);
      s.feet = s.feet.map((f, i) => ({ ...f, pos: this.standFeet[i].add(f.pos.sub(this.standFeet[i]).mul(2)) }));
      s.pitch = -this.rig.dims.tilt * 0.4;
      s.spread = 1;
      s.flap = 0.25 + 0.2 * Math.sin(TAU * u * 2);
      s.wrist = 0.9;
      s.sweep = 0.4;
      s.headX *= 0.5;
      s.neckPitch = 0.2;
      return;
    }
    this.flight(s, u, 0.95, this.flyH);
  }

  clip_glide(u: number, s: FState): void {
    this.flight(s, 0, 0, this.flyH);
    s.flap = 0.12 + 0.04 * Math.sin(TAU * u);
    s.wrist = 0.05;
    s.sweep = 0.1;
    s.root = new Vec3(0, this.flyH - this.standY + this.rig.dims.S * 0.08 * Math.sin(TAU * u), 0);
    s.yaw = 0.05 * Math.sin(TAU * u);
    s.tailSpread = 0.8;
    s.tailYaw = 0.1 * Math.sin(TAU * u);
  }

  clip_fly(u: number, s: FState): void {
    // ground birds: a short, frantic flutter
    this.flight(s, u * 2 % 1, 1.0, this.standY + this.rig.dims.legLen * 1.2);
    s.tuck = 0.5;
    s.pitch = -0.2;
  }

  clip_jump(u: number, s: FState): void {
    const d = this.rig.dims;
    const crouch = keyframes(u, [[0, 0], [0.15, 1], [0.25, 0], [0.85, 0], [0.92, 0.7], [1, 0]]);
    const air = u > 0.22 && u < 0.88 ? Math.sin((PI * (u - 0.22)) / 0.66) : 0;
    const flapPhase = u > 0.22 && u < 0.88 ? (u - 0.22) / 0.33 : 0;
    s.root = new Vec3(0, d.legLen * 2.2 * air - d.legLen * 0.3 * crouch, 0);
    s.pitch = -d.tilt * (1 - 0.6 * air);
    s.spread = air > 0.05 || (u > 0.15 && u < 0.92) ? 1 : 0;
    s.flap = air > 0 ? 0.9 * Math.cos(TAU * flapPhase) : 0.6 * crouch;
    s.wrist = air > 0 ? 0.6 * Math.max(0, -Math.sin(TAU * flapPhase)) : 0.3;
    s.tuck = 0.5 * air;
    s.feet = this.standFeet.map((p) => ({ pos: p.add(new Vec3(0, d.legLen * 2.2 * air * 0.8, 0)), planted: air === 0 }));
    s.tailSpread = air;
    s.shadow = 1 - 0.35 * air;
  }

  clip_attack(u: number, s: FState): void {
    const d = this.rig.dims;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    s.mood = 'angry';
    if (this.rig.bat) {
      this.flight(s, (u * 2) % 1, 1.0, this.flyH);
      const dive = k([[0, 0], [0.35, 1], [0.6, 1], [1, 0]]);
      s.root = s.root.add(new Vec3(d.S * 1.2 * dive, -this.flyH * 0.4 * dive, 0));
      s.pitch = 0.5 * dive;
      s.beak = k([[0, 0], [0.3, 1], [0.55, 1], [0.65, 0]]);
      return;
    }
    if (this.rig.traits.attack === 'talons') {
      const rise = k([[0, 0], [0.3, 1], [0.6, 0.6], [1, 0]]);
      const strike = k([[0, 0], [0.35, 0], [0.5, 1], [0.7, 1], [1, 0]]);
      s.root = new Vec3(d.S * 0.3 * strike, d.legLen * 1.3 * rise, 0);
      s.pitch = -d.tilt - 0.5 * rise + 0.4 * strike;
      s.spread = u > 0.05 && u < 0.92 ? 1 : 0;
      s.flap = 0.9 * rise - 0.3 * strike;
      s.sweep = -0.1;
      s.feet = this.standFeet.map((p) => ({ pos: p.add(new Vec3(d.S * 0.6 * strike + d.S * 0.2 * rise, d.legLen * 1.3 * rise * (1 - strike), 0)), planted: rise < 0.05 }));
      s.beak = strike > 0.5 ? 0.8 : 0;
      s.tailSpread = rise;
      s.shadow = 1 - 0.25 * rise;
      return;
    }
    const wind = k([[0, 0], [0.3, 1], [0.42, 0], [1, 0]]);
    const peck = k([[0, 0], [0.3, 0], [0.42, 1], [0.6, 1], [0.85, 0]]);
    s.pitch = -d.tilt + 0.2 * wind + (d.tilt * 0.8 + 0.35) * peck;
    s.neckPitch = -0.3 * wind + 0.4 * peck;
    s.headPitch = -0.2 * wind + 0.5 * peck;
    s.headX = d.S * (0.35 * peck - 0.15 * wind);
    s.beak = Math.max(0.6 * wind, peck > 0.9 ? 0.2 : peck);
    s.spread = wind > 0.5 || peck > 0.5 ? 1 : 0;
    s.flap = 0.5;
    s.wrist = 1;
    s.sweep = 0.5;
    s.tailPitch = 0.3 * peck;
  }

  clip_call(u: number, s: FState): void {
    const up = keyframes(u, [[0, 0], [0.2, 1], [0.8, 1], [1, 0]]);
    if (this.rig.bat) {
      this.flight(s, u * 1.5 % 1, 0.9, this.flyH);
      s.beak = up;
      s.headPitch = -0.3 * up;
      return;
    }
    const big = this.rig.traits.call === 'Crow' || this.rig.traits.call === 'Screech';
    s.neckPitch = -0.3 * up;
    s.headPitch = (big ? -0.6 : -0.35) * up;
    s.beak = up * (big ? 0.9 : 0.5 + 0.4 * Math.max(0, Math.sin(TAU * u * 3)));
    s.pitch = -this.rig.dims.tilt - 0.15 * up;
    if (big) {
      s.spread = up > 0.5 ? 1 : 0;
      s.flap = 0.4 + 0.3 * Math.sin(TAU * u * 2);
      s.wrist = 0.8;
      s.sweep = 0.5;
    }
    s.tailPitch = 0.2 * up;
  }

  clip_eat(u: number, s: FState): void {
    const d = this.rig.dims;
    const p = Math.max(0, Math.sin(TAU * u * 2));
    s.pitch = -d.tilt * 0.3 + 0.35 + 0.15 * p;
    s.neckPitch = 0.5 + 0.3 * p;
    s.headPitch = 0.9 + 0.3 * p;
    s.headX = d.S * 0.15 * p;
    s.beak = p > 0.7 ? 0.3 : 0;
    s.tailPitch = 0.3;
    if (u > 0.4 && u < 0.5) s.blink = 1;
  }

  clip_hurt(u: number, s: FState): void {
    const d = this.rig.dims;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.45, 0.7], [1, 0]]);
    if (this.rig.bat) {
      this.flight(s, u, 0.6, this.flyH);
      s.root = s.root.add(new Vec3(-d.S * 0.5 * h, d.S * 0.3 * h, 0));
      s.wrist = 0.8 * h;
    } else {
      s.root = new Vec3(-d.S * 0.25 * h, d.legLen * 0.2 * h, 0);
      s.pitch = -d.tilt - 0.3 * h;
      s.spread = h > 0.3 ? 1 : 0;
      s.flap = 0.7 * h;
      s.wrist = 0.6;
      s.feet = this.standFeet.map((p) => ({ pos: p.add(new Vec3(-d.S * 0.2 * h, d.legLen * 0.2 * h, 0)), planted: h < 0.1 }));
    }
    s.headPitch = -0.3 * h;
    s.headYaw = 0.3 * h;
    s.beak = 0.7 * h;
    s.flash = u < 0.2 ? 0.7 : 0;
    s.mood = 'pain';
  }

  clip_die(u: number, s: FState): void {
    const d = this.rig.dims;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    if (this.rig.bat) {
      // tumbles down and lies with its wings spread
      const fall = k([[0, 0], [0.7, 1]]);
      this.flight(s, Math.min(1, u * 3) % 1, 0.8 * (1 - fall), this.flyH * (1 - fall) + d.bh * 0.45 * fall);
      s.flap = lerp(s.flap, -0.08, fall);
      s.wrist = lerp(s.wrist, 0.35, fall);
      s.pitch = 0.3 * Math.sin(PI * fall);
      s.tuck = 1 - fall;
      s.shadow = 0.6 + 0.4 * fall;
    } else {
      const buckle = k([[0, 0], [0.3, 1]]);
      const fall = k([[0.2, 0], [0.6, 1.05], [0.7, 0.97], [1, 1]]);
      s.root = new Vec3(0, -d.legLen * 0.5 * buckle * (1 - fall) - d.legLen * 0.2 * fall, 0);
      s.pitch = -d.tilt * (1 - fall) + 0.2 * fall;
      s.fall = fall;
      s.spread = u > 0.15 && u < 0.5 ? 1 : 0;
      s.flap = 0.5 * buckle * (1 - fall) - 0.2 * fall;
      s.wrist = 0.4;
      s.feet = this.standFeet.map((p, i) => ({ pos: p.add(new Vec3(d.S * 0.2 * fall, d.legLen * (0.6 + 0.2 * i) * fall, 0)), planted: false }));
    }
    s.headPitch = 0.4 * u;
    s.beak = 0.4 * u;
    s.mood = u > 0.5 ? 'dead' : 'pain';
  }

  clip_sleep(u: number, s: FState): void {
    const d = this.rig.dims;
    const b = Math.sin(TAU * u);
    s.blink = 1;
    if (this.rig.bat) {
      s.hang = true;
      s.spread = 0;
      s.wrist = 1;
      s.flap = -0.9;
      s.sweep = 0.9;
      s.root = new Vec3(0, this.flyH - this.standY, 0);
      s.tuck = 0;
      s.feet = this.standFeet.map((p) => ({ pos: p.add(new Vec3(0, this.flyH + d.bh * 1.1, 0)), planted: false }));
      s.headPitch = -0.2 + 0.03 * b;
      s.shadow = 0.5;
      return;
    }
    s.root = new Vec3(0, -d.legLen * 0.45 + d.S * 0.015 * b, 0);
    s.pitch = -d.tilt * 0.6;
    s.neckPitch = 0.4;
    s.headYaw = 2.5;
    s.headPitch = 0.35;
    s.tailPitch = -0.1;
  }
}
