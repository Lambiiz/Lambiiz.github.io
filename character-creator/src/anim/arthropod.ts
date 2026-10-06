/**
 * Procedural animation for many-legged creatures: spiders, ants, beetles and scorpions.
 *
 * Every leg is hip → knee → ankle → tip: femur and tibia solved by IK with the knee raised above
 * the body, the short last segment hanging down to the tip. Insects walk with alternating tripods
 * (front and back legs of one side with the middle leg of the other), eight-legged ones with
 * alternating tetrapods, each leg slightly delayed behind the one in front (a ripple). Planted tips
 * move backwards at exactly the clip's ground speed. Dying bugs flip onto their backs and curl
 * their legs.
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, easeInOut, frac, keyframes, lerp, segmentFrame, smoothstep, twoBoneIK } from '../core/math';
import type { Animator, ClipDef } from '../model/types';

export type ArthroType = 'spider' | 'ant' | 'beetle' | 'scorpion';

export interface ALeg {
  side: number;
  /** 0 = front pair. */
  index: number;
  anchor: number;
  /** Hip in the anchor bone's frame. */
  hip: Vec3;
  bones: [number, number, number];
  len: [number, number, number];
  /** Tip on the ground and hip in the rest pose (creature space). */
  rest: Vec3;
  hipW: Vec3;
}

export interface Jaw {
  bone: number;
  side: number;
  /** Mandibles open sideways, fangs swing down. */
  kind: 'mandible' | 'fang';
}

export interface ArthroRig {
  kind: 'arthropod';
  type: ArthroType;
  bones: {
    body: number;
    head: number;
    abdomen: number[];
    tail: number[];
    antennae: number[][];
    jaws: Jaw[];
    claws: { bones: number[]; finger: number; side: number }[];
    elytra: number[];
    wings: number[];
  };
  legs: ALeg[];
  groups: { wings: number[] };
  /** Body length unit, body height above the ground, leg length, half thickness of the body. */
  dims: { S: number; bodyY: number; legLen: number; thick: number };
  traits: { energy: number; flies: boolean };
}

interface AState {
  root: Vec3;
  pitch: number;
  yaw: number;
  /** Roll onto the back (π = upside down). */
  roll: number;
  headPitch: number;
  headYaw: number;
  abdomenPitch: number;
  /** Scorpion tail: extra curl (+ over the back) and strike. */
  tailCurl: number;
  tailStrike: number;
  antennae: number;
  antennaeWave: number;
  jaws: number;
  /** Claws raised (0..1) and opened (0..1). */
  clawRaise: number;
  clawOpen: number;
  /** Elytra open and wing buzz phase (beetles). */
  elytra: number;
  wingPhase: number;
  tips: { pos: Vec3; planted: boolean }[];
  /** Curl legs towards the body (dead bug). */
  curl: number;
  blink: number;
  mood: SkeletonPose['mood'];
  shadow: number;
  flash: number;
}

export class ArthropodAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly stride: { walk: number; run: number };

  constructor(readonly rig: ArthroRig) {
    const d = rig.dims, t = rig.traits;
    this.stride = { walk: this.reachable(d.legLen * 0.55, 0.6, 0), run: this.reachable(d.legLen * 0.85, 0.5, d.bodyY * 0.08) };
    const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
      ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
    const e = lerp(0.85, 1.2, t.energy);
    const attack = { spider: 'Bite', ant: 'Bite', beetle: 'Ram', scorpion: 'Sting' }[rig.type];
    this.clips = [
      def('idle', 'Idle', 8, Math.round(6 * e), true),
      def('walk', 'Walk', 8, Math.round(10 * e), true, this.stride.walk),
      def('run', 'Scuttle', 8, Math.round(15 * e), true, this.stride.run),
      def('attack', attack, 9, 12, false),
      def('rear', rig.type === 'scorpion' ? 'Threaten' : rig.type === 'spider' ? 'Rear up' : 'Antennae', 8, 8, false),
      ...(t.flies ? [def('fly', 'Fly', 6, 14, true, this.stride.run * 1.8)] : []),
      def('hurt', 'Hurt', 6, 12, false),
      def('die', 'Die', 10, 10, false),
    ];
  }

  /** The longest stride (up to `want`) whose planted tips every leg can still reach. */
  private reachable(want: number, duty: number, sink: number): number {
    const ok = (stride: number) => this.rig.legs.every((leg) => {
      const reach = (leg.len[0] + leg.len[1]) * 0.97;
      for (const x of [-stride * duty / 2, stride * duty / 2]) {
        const tip = leg.rest.add(new Vec3(x, 0, 0));
        const hip = leg.hipW.add(new Vec3(0, -sink, 0));
        const out = new Vec3(tip.x - hip.x, 0, tip.z - hip.z).norm(new Vec3(0, 0, leg.side));
        const ankle = tip.add(new Vec3(0, leg.len[2] * 0.92, 0)).addScaled(out, -leg.len[2] * 0.3);
        if (Vec3.dist(hip, ankle) > reach) return false;
      }
      return true;
    });
    if (ok(want)) return want;
    let lo = 0, hi = want;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (ok(mid)) lo = mid;
      else hi = mid;
    }
    return Math.max(lo * 0.97, this.rig.dims.legLen * 0.1);
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: AState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose);
  }

  private neutral(): AState {
    return {
      root: Vec3.ZERO, pitch: 0, yaw: 0, roll: 0, headPitch: 0, headYaw: 0, abdomenPitch: 0, tailCurl: 0, tailStrike: 0,
      antennae: 0, antennaeWave: 0, jaws: 0, clawRaise: 0, clawOpen: 0, elytra: 0, wingPhase: 0,
      tips: this.rig.legs.map((l) => ({ pos: l.rest, planted: true })), curl: 0, blink: 0, mood: 'neutral', shadow: 1, flash: 0,
    };
  }

  // ------------------------------------------------------------------------------------ apply

  private apply(s: AState, pose: SkeletonPose): void {
    pose.reset();
    const B = this.rig.bones, d = this.rig.dims;
    const rest = pose.local[B.body];
    pose.setLocal(B.body, new Xform(Mat3.rotY(s.yaw).mul(Mat3.rotZ(-s.pitch)).mul(rest.basis), rest.origin.add(s.root)));
    if (B.head !== B.body) pose.rotate(B.head, Mat3.rotY(s.headYaw).mul(Mat3.rotZ(-s.headPitch)));
    B.abdomen.forEach((a, i) => pose.rotate(a, Mat3.rotZ((i === 0 ? 1 : 0.4) * s.abdomenPitch)));
    B.tail.forEach((t, i) => pose.rotate(t, Mat3.rotZ(s.tailCurl * 0.25 - s.tailStrike * (i < 2 ? 0.15 : 0.4))));
    B.antennae.forEach((chain, k) => {
      const side = k === 0 ? -1 : 1;
      chain.forEach((a, i) => pose.rotate(a, Mat3.rotZ(s.antennae * (i ? 0.6 : 0.4) + 0.25 * Math.sin(s.antennaeWave + k * 1.3 + i)).mul(Mat3.rotY(side * 0.15 * Math.sin(s.antennaeWave + k * 2.1)))));
    });
    for (const j of B.jaws) pose.rotate(j.bone, j.kind === 'mandible' ? Mat3.rotY(-j.side * s.jaws * 0.7) : Mat3.rotZ(s.jaws * 0.8));
    for (const c of B.claws) {
      pose.rotate(c.bones[0], Mat3.rotZ(s.clawRaise * 0.7).mul(Mat3.rotY(-c.side * s.clawRaise * 0.2)));
      pose.rotate(c.bones[1], Mat3.rotZ(s.clawRaise * 0.5));
      if (c.finger >= 0) pose.rotate(c.finger, Mat3.rotY(c.side * s.clawOpen * 0.7));
    }
    B.elytra.forEach((e, i) => {
      const side = i === 0 ? -1 : 1;
      pose.rotate(e, Mat3.rotX(-side * s.elytra * 1.1).mul(Mat3.rotZ(s.elytra * 0.45)));
    });
    B.wings.forEach((w, i) => {
      const side = i === 0 ? -1 : 1;
      const out = smoothstep(0.3, 1, s.elytra);
      pose.rotate(w, Mat3.rotY(side * out * 1.2).mul(Mat3.rotX(-side * out * 0.5 * Math.sin(s.wingPhase))));
    });
    if (s.elytra < 0.3) for (const g of this.rig.groups.wings) pose.hide.add(g);
    pose.solve();

    // legs: knee raised above the body, last segment hanging to the tip
    const body = pose.world[B.body];
    const up = body.basis.c1.norm(Vec3.Y);
    for (let i = 0; i < this.rig.legs.length; i++) {
      const leg = this.rig.legs[i];
      const hip = pose.world[leg.anchor].point(leg.hip);
      let tip = s.tips[i].pos;
      if (s.curl > 0) {
        // dead bug: tips pulled in under the belly (they point up once it flips over)
        const inward = pose.world[leg.anchor].point(leg.hip.mul(0.5)).addScaled(up, -d.legLen * 0.3);
        tip = Vec3.lerp(tip, inward, s.curl);
      }
      const out = new Vec3(tip.x - hip.x, 0, tip.z - hip.z).norm(new Vec3(0, 0, leg.side));
      const ankle = tip.add(new Vec3(0, leg.len[2] * 0.92, 0)).addScaled(out, -leg.len[2] * 0.3);
      const pole = up.mul(1.2 - 2.4 * s.curl).add(out.mul(0.4));
      const { mid, end } = twoBoneIK(hip, ankle, leg.len[0], leg.len[1], pole);
      const tipReal = end.add(tip.sub(ankle).norm(Vec3.Y.neg()).mul(leg.len[2]));
      pose.setWorld(leg.bones[0], segmentFrame(hip, mid, up));
      pose.setWorld(leg.bones[1], segmentFrame(mid, end, up));
      pose.setWorld(leg.bones[2], segmentFrame(end, tipReal, out));
    }
    pose.solve();

    if (s.roll !== 0) {
      // flip over the body's long axis, landing on the back
      // the pivot is chosen so the back rests on the ground once upside down
      const pivot = new Vec3(0, (d.bodyY + d.thick) / 2, 0);
      const lift = Math.sin(Math.min(PI, Math.abs(s.roll))) * d.bodyY * 0.8;
      pose.transformAll(new Xform(Mat3.rotX(s.roll), pivot.add(new Vec3(0, lift, 0))).mul(new Xform(Mat3.I, pivot.neg())));
    }
    pose.blink = s.blink;
    pose.mouth = s.jaws;
    pose.mood = s.mood;
    pose.shadow = s.shadow;
    pose.flash = s.flash;
  }

  // ------------------------------------------------------------------------------------ gait

  private gait(s: AState, u: number, stride: number, duty: number, lift: number): void {
    const n = this.rig.legs.length / 2;
    const half = (stride * duty) / 2;
    this.rig.legs.forEach((leg, i) => {
      // alternating tripods / tetrapods with a small front-to-back ripple
      const ph = frac(u + ((leg.index + (leg.side > 0 ? 1 : 0)) % 2) * 0.5 + (leg.index / n) * 0.12);
      let x: number, y = 0;
      if (ph < duty) x = half - (ph / duty) * stride * duty;
      else {
        const k = (ph - duty) / (1 - duty);
        x = lerp(-half, half, easeInOut(k));
        y = lift * Math.sin(PI * k);
      }
      s.tips[i] = { pos: leg.rest.add(new Vec3(x, y, 0)), planted: ph < duty };
    });
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: AState): void {
    const d = this.rig.dims;
    s.root = new Vec3(0, d.bodyY * 0.04 * Math.sin(TAU * u), 0);
    s.antennaeWave = TAU * u;
    s.abdomenPitch = 0.04 * Math.sin(TAU * u);
    s.headYaw = 0.12 * Math.sin(TAU * u + 1);
    s.jaws = u > 0.5 && u < 0.75 ? 0.4 : 0;
    s.clawOpen = 0.3 + 0.3 * Math.sin(TAU * u);
    s.tailCurl = 0.15 * Math.sin(TAU * u);
    // one leg taps now and then
    const tap = this.rig.legs.findIndex((l) => l.index === 0 && l.side > 0);
    if (tap >= 0 && u > 0.25 && u < 0.5) s.tips[tap] = { pos: this.rig.legs[tap].rest.add(new Vec3(0, d.legLen * 0.12 * Math.sin(PI * (u - 0.25) * 4), 0)), planted: false };
  }

  clip_walk(u: number, s: AState): void {
    const d = this.rig.dims;
    this.gait(s, u, this.stride.walk, 0.6, d.legLen * 0.18);
    s.root = new Vec3(0, d.bodyY * 0.03 * Math.cos(TAU * u * 2), 0);
    s.yaw = 0.03 * Math.sin(TAU * u);
    s.antennaeWave = TAU * u * 2;
    s.antennae = 0.1;
    s.tailCurl = 0.1;
  }

  clip_run(u: number, s: AState): void {
    const d = this.rig.dims;
    this.gait(s, u, this.stride.run, 0.5, d.legLen * 0.25);
    s.root = new Vec3(0, -d.bodyY * 0.08 + d.bodyY * 0.04 * Math.cos(TAU * u * 2), 0);
    s.pitch = 0.05;
    s.antennae = -0.3;
    s.antennaeWave = TAU * u * 2;
    s.tailCurl = 0.2;
  }

  clip_attack(u: number, s: AState): void {
    const d = this.rig.dims;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const wind = k([[0, 0], [0.3, 1], [0.42, 0], [1, 0]]);
    const hit = k([[0, 0], [0.3, 0], [0.42, 1], [0.62, 1], [0.9, 0]]);
    s.mood = 'angry';
    switch (this.rig.type) {
      case 'scorpion':
        s.tailCurl = 0.8 * wind;
        s.tailStrike = 1.6 * hit;
        s.clawRaise = 0.8 * Math.max(wind, hit);
        s.clawOpen = wind > 0.3 ? 1 : 0.2;
        s.root = new Vec3(d.legLen * 0.15 * hit - d.legLen * 0.1 * wind, 0, 0);
        s.pitch = 0.1 * hit;
        break;
      case 'beetle':
        s.root = new Vec3(d.legLen * (0.4 * hit - 0.2 * wind), -d.bodyY * 0.2 * wind, 0);
        s.pitch = 0.15 * wind - 0.2 * hit;
        s.headPitch = 0.3 * wind - 0.5 * hit;
        s.jaws = hit;
        break;
      default: {
        // rear back, then lunge and bite
        s.root = new Vec3(d.legLen * (0.35 * hit - 0.15 * wind), d.bodyY * 0.3 * wind, 0);
        s.pitch = -0.35 * wind + 0.2 * hit;
        s.jaws = Math.max(wind, hit > 0.5 ? 1 - (hit - 0.5) * 2 : hit);
        this.rig.legs.forEach((leg, i) => {
          if (leg.index !== 0) return;
          s.tips[i] = { pos: leg.rest.add(new Vec3(d.legLen * 0.25 * hit, d.legLen * 0.6 * wind, 0)), planted: false };
        });
        s.antennae = -0.4 * wind;
      }
    }
  }

  clip_rear(u: number, s: AState): void {
    const d = this.rig.dims;
    const up = keyframes(u, [[0, 0], [0.25, 1], [0.8, 1], [1, 0]]);
    const shake = Math.sin(TAU * u * 3) * up;
    s.mood = 'angry';
    if (this.rig.type === 'scorpion') {
      s.clawRaise = up;
      s.clawOpen = 0.5 + 0.5 * shake;
      s.tailCurl = 0.6 * up + 0.2 * shake;
      s.pitch = -0.1 * up;
      return;
    }
    if (this.rig.type === 'spider') {
      s.pitch = -0.5 * up;
      s.root = new Vec3(-d.legLen * 0.1 * up, d.bodyY * 0.5 * up, 0);
      s.jaws = up;
      this.rig.legs.forEach((leg, i) => {
        if (leg.index > 1) return;
        const raise = leg.index === 0 ? 1 : 0.6;
        s.tips[i] = { pos: leg.rest.add(new Vec3(-d.legLen * 0.1 * up * raise, d.legLen * (0.8 + 0.1 * shake) * up * raise, 0)), planted: false };
      });
      s.abdomenPitch = 0.3 * up;
      return;
    }
    s.antennae = -0.5 * up;
    s.antennaeWave = TAU * u * 4;
    s.headPitch = -0.3 * up;
    s.jaws = up * (0.5 + 0.5 * shake);
    s.abdomenPitch = 0.4 * up;
  }

  clip_fly(u: number, s: AState): void {
    const d = this.rig.dims;
    s.root = new Vec3(0, d.legLen * 1.6 + d.bodyY * 0.2 * Math.sin(TAU * u), 0);
    s.pitch = -0.35;
    s.elytra = 1;
    s.wingPhase = TAU * u * 3;
    s.curl = 0.35;
    this.rig.legs.forEach((leg, i) => (s.tips[i] = { pos: leg.rest.add(new Vec3(0, d.legLen * 1.2, 0)), planted: false }));
    s.antennae = -0.2;
    s.shadow = 0.6;
  }

  clip_hurt(u: number, s: AState): void {
    const d = this.rig.dims;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.45, 0.7], [1, 0]]);
    s.root = new Vec3(-d.legLen * 0.15 * h, d.bodyY * 0.25 * h, 0);
    s.pitch = -0.2 * h;
    s.jaws = 0.6 * h;
    s.antennae = -0.5 * h;
    s.clawRaise = 0.5 * h;
    s.flash = u < 0.2 ? 0.7 : 0;
    s.mood = 'pain';
  }

  clip_die(u: number, s: AState): void {
    const d = this.rig.dims;
    const flip = keyframes(u, [[0.2, 0], [0.6, 1.05], [0.7, 0.97], [1, 1]]);
    const twitch = u > 0.6 ? Math.sin(TAU * u * 4) * (1 - u) * 2.5 : 0;
    s.roll = -flip * PI;
    s.root = new Vec3(0, -d.bodyY * 0.4 * smoothstep(0, 0.2, u) * (1 - flip), 0);
    s.curl = smoothstep(0.15, 0.7, u) * (0.85 + 0.15 * twitch);
    s.antennae = 0.5 * flip;
    s.jaws = 0.5;
    s.tailCurl = -0.6 * flip;
    s.clawRaise = 0.3 * flip;
    s.mood = u > 0.5 ? 'dead' : 'pain';
    s.shadow = 1;
  }
}
