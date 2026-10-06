/**
 * Procedural animation for four-legged creatures (and the shared machinery for many-legged ones).
 *
 * Each leg is hip → knee → ankle → toe. The last segment (pastern, metatarsus or sole) keeps a
 * designed angle from the vertical and folds back while the foot swings; the other two joints are
 * solved by IK. Gaits use per-leg phase offsets: lateral-sequence walk, diagonal trot, gallop with
 * spine flexion. Stance feet move backwards at exactly the clip's ground speed (no sliding).
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, clamp, easeInOut, frac, keyframes, lerp, segmentFrame, smoothstep, twoBoneIK } from '../core/math';
import type { Animator, ClipDef } from '../model/types';

export interface QLeg {
  side: number;
  front: boolean;
  anchor: number;
  /** Hip / shoulder joint in the anchor bone's frame. */
  hip: Vec3;
  bones: [number, number, number];
  len: [number, number, number];
  /** Toe contact in the rest pose (creature space). */
  restToe: Vec3;
  /** Rest angle of the last segment from the vertical, leaning back (radians). */
  meta: number;
}

export type QAction = 'bite' | 'charge' | 'kick' | 'swipe' | 'pounce' | 'breath';

export interface QuadRig {
  kind: 'quad';
  bones: { root: number; pelvis: number; spine: number; chest: number; neck: number[]; head: number; jaw: number; tail: number[]; ears: number[]; wings: number[][] };
  legs: QLeg[];
  dims: { S: number; hipY: number; shoulderY: number; BL: number; R: number; legLen: number };
  traits: { energy: number; weight: number; bounce: number; sits: boolean; grazer: boolean; action: QAction; hooved: boolean; tailWag: number };
}

interface Rot {
  yaw: number;
  pitch: number;
  roll: number;
}
const rot = (yaw = 0, pitch = 0, roll = 0): Rot => ({ yaw, pitch, roll });

interface LegT {
  toe: Vec3;
  /** Extra fold of the last segment (swing). */
  fold: number;
  planted: boolean;
}

export interface QState {
  root: Vec3;
  autoHeight: boolean;
  pelvis: Rot;
  spine: Rot;
  chest: Rot;
  neck: Rot;
  head: Rot;
  jaw: number;
  ears: number;
  tail: Rot & { curl: number };
  legs: LegT[];
  /** Wings: 1 folded … 0 spread; flap angle (+ down). */
  wingFold: number;
  wingFlap: number;
  /** Lies on its side: 0..1. */
  roll: number;
  blink: number;
  mood: SkeletonPose['mood'];
  shadow: number;
}

interface Gait {
  stride: number;
  duty: number;
  lift: number;
  /** Phase offsets: [front-left, front-right, hind-left, hind-right]. */
  offsets: [number, number, number, number];
}

export class QuadrupedAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly g: { walk: Gait; trot: Gait; run: Gait };

  constructor(readonly rig: QuadRig) {
    const L = rig.dims.legLen;
    const e = rig.traits.energy;
    this.g = {
      walk: { stride: L * 1.25 * lerp(0.9, 1.08, e), duty: 0.64, lift: L * 0.16, offsets: [0.25, 0.75, 0, 0.5] },
      trot: { stride: L * 1.9, duty: 0.48, lift: L * 0.24, offsets: [0.5, 0, 0, 0.5] },
      run: { stride: L * 3.2 * lerp(0.9, 1.1, e), duty: 0.34, lift: L * 0.3, offsets: [0.48, 0.58, 0, 0.1] },
    };
    const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
      ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
    const t = rig.traits;
    const attackLabel = { bite: 'Bite', charge: 'Charge', kick: 'Kick', swipe: 'Swipe', pounce: 'Pounce', breath: 'Breath' }[t.action];
    this.clips = [
      def('idle', 'Idle', 8, 5, true),
      def('walk', 'Walk', 8, 8, true, this.g.walk.stride),
      def('trot', 'Trot', 8, 10, true, this.g.trot.stride),
      def('run', 'Gallop', 8, 13, true, this.g.run.stride),
      def('jump', 'Jump', 10, 12, false),
      def('attack', attackLabel, 9, 12, false),
      def('call', t.action === 'bite' && !t.hooved ? 'Howl' : 'Roar', 8, 8, false),
      def('hurt', 'Hurt', 6, 12, false),
      def('die', 'Die', 10, 10, false),
      def(t.sits ? 'sit' : 'rest', t.sits ? 'Sit' : 'Lie down', 4, 4, true),
      def('sleep', 'Sleep', 4, 3, true),
      ...(t.grazer ? [def('eat', 'Graze', 8, 6, true)] : []),
      ...(rig.bones.wings.length ? [def('fly', 'Fly', 8, 10, true)] : []),
    ];
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: QState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose);
  }

  private neutral(): QState {
    return {
      root: Vec3.ZERO, autoHeight: true, pelvis: rot(), spine: rot(), chest: rot(), neck: rot(), head: rot(), jaw: 0, ears: 0,
      tail: { ...rot(), curl: 0 }, legs: this.rig.legs.map((l) => ({ toe: l.restToe, fold: 0, planted: true })),
      wingFold: 1, wingFlap: 0, roll: 0, blink: 0, mood: 'neutral', shadow: 1,
    };
  }

  // ------------------------------------------------------------------------------------ apply

  private apply(s: QState, pose: SkeletonPose): void {
    pose.reset();
    const B = this.rig.bones, d = this.rig.dims;
    const R = (r: Rot) => Mat3.ypr(r.yaw, r.pitch, r.roll);
    // the whole body hangs off the pelvis: move it, rotating about the body centre
    const centre = new Vec3(d.BL * 0.5, 0, 0);
    const pR = R(s.pelvis);
    let shift = s.root.add(centre).sub(pR.apply(centre));
    if (s.autoHeight) {
      // lower the body when a planted leg could not reach its foot
      const rest = pose.anatomy.restWorld;
      const pelvisRest = rest[B.pelvis];
      const pw = new Xform(pelvisRest.basis.mul(pR), pelvisRest.origin.add(shift));
      let drop = 0;
      for (let i = 0; i < this.rig.legs.length; i++) {
        const leg = this.rig.legs[i], t = s.legs[i];
        if (!t.planted) continue;
        const hip = pw.point(pelvisRest.inverseRigid().mul(rest[leg.anchor]).point(leg.hip));
        const ankle = t.toe.addScaled(this.metaDir(leg, t.fold, pR), leg.len[2]);
        const L = (leg.len[0] + leg.len[1]) * 0.99;
        const dx = hip.x - ankle.x, dz = hip.z - ankle.z;
        const maxDy = Math.sqrt(Math.max(0, L * L - dx * dx - dz * dz));
        if (hip.y - ankle.y > maxDy) drop = Math.max(drop, hip.y - ankle.y - maxDy);
      }
      shift = shift.add(new Vec3(0, -drop, 0));
    }
    pose.translate(B.pelvis, shift);
    pose.rotate(B.pelvis, R(s.pelvis));
    pose.rotate(B.spine, R(s.spine));
    pose.rotate(B.chest, R(s.chest));
    const nn = B.neck.length;
    B.neck.forEach((n) => pose.rotate(n, Mat3.ypr(s.neck.yaw / nn, s.neck.pitch / nn, s.neck.roll / nn)));
    pose.rotate(B.head, R(s.head));
    if (B.jaw >= 0) pose.rotate(B.jaw, Mat3.rotZ(-s.jaw * 0.6));
    B.ears.forEach((e) => pose.rotate(e, Mat3.rotZ(s.ears * 0.6)));
    B.tail.forEach((t, i) => pose.rotate(t, Mat3.rotY(s.tail.yaw * (0.5 + i * 0.2)).mul(Mat3.rotZ(-s.tail.pitch * (i === 0 ? 1 : 0.25) - s.tail.curl * 0.3))));
    B.wings.forEach((w) => {
      // shoulder: flap about the body axis, elbow / hand fold the wing
      const side = pose.anatomy.bones[w[0]].rest.origin.z > 0 ? 1 : -1;
      const fold = s.wingFold;
      pose.rotate(w[0], Mat3.rotX(side * (s.wingFlap - fold * 0.2)).mul(Mat3.rotY(side * fold * 0.9)));
      pose.rotate(w[1], Mat3.rotY(-side * fold * 2.1));
      pose.rotate(w[2], Mat3.rotY(side * fold * 1.8).mul(Mat3.rotX(side * s.wingFlap * 0.4)));
    });
    pose.solve();
    const pr = pose.world[B.pelvis].basis;
    for (let i = 0; i < this.rig.legs.length; i++) {
      const leg = this.rig.legs[i], t = s.legs[i];
      const anchor = pose.world[leg.anchor];
      const hip = anchor.point(leg.hip);
      const meta = this.metaDir(leg, t.fold, pr);
      const ankle = t.toe.addScaled(meta, leg.len[2]);
      const fwd = pr.c0.ground().norm(Vec3.X);
      const pole = leg.front ? fwd.neg().add(new Vec3(0, 0, leg.side * 0.1)) : fwd.add(new Vec3(0, 0, leg.side * 0.1));
      const { mid, end } = twoBoneIK(hip, ankle, leg.len[0], leg.len[1], pole);
      const toe = end.addScaled(meta, -leg.len[2]);
      pose.setWorld(leg.bones[0], segmentFrame(hip, mid, pole));
      pose.setWorld(leg.bones[1], segmentFrame(mid, end, pole));
      pose.setWorld(leg.bones[2], segmentFrame(end, toe, fwd));
    }
    pose.solve();
    if (s.roll > 0) {
      // fall onto the left side about the left feet
      const a = s.roll * (PI / 2 - 0.12);
      const pivot = new Vec3(d.BL * 0.5, 0, -d.R * 0.9);
      pose.transformAll(new Xform(Mat3.rotX(-a), pivot).mul(new Xform(Mat3.I, pivot.neg())));
    }
    pose.blink = s.blink;
    pose.mouth = s.jaw;
    pose.mood = s.mood;
    pose.shadow = s.shadow;
  }

  private metaDir(leg: QLeg, fold: number, body: Mat3): Vec3 {
    const a = leg.meta + fold;
    return body.apply(new Vec3(-Math.sin(a), Math.cos(a), 0)).norm(Vec3.Y);
  }

  // ------------------------------------------------------------------------------------ gaits

  private gait(s: QState, u: number, g: Gait): void {
    const half = (g.stride * g.duty) / 2;
    this.rig.legs.forEach((leg, i) => {
      const off = g.offsets[(leg.front ? 0 : 2) + (leg.side > 0 ? 1 : 0)];
      const p = frac(u + off);
      let x: number, y = 0, fold = 0;
      if (p < g.duty) {
        const t = p / g.duty;
        x = half - t * g.stride * g.duty;
        fold = t > 0.7 ? (t - 0.7) * 0.8 : 0;
      } else {
        const t = (p - g.duty) / (1 - g.duty);
        x = lerp(-half, half, easeInOut(t));
        y = g.lift * Math.sin(PI * Math.pow(t, 0.8));
        fold = (leg.front ? 1.1 : 0.7) * Math.sin(PI * Math.min(1, t * 1.2));
      }
      s.legs[i] = { toe: leg.restToe.add(new Vec3(x, y, 0)), fold, planted: p < g.duty };
    });
  }

  private breathe(s: QState, u: number): void {
    const b = Math.sin(TAU * u);
    s.chest.pitch += -0.02 * b;
    s.neck.pitch += 0.03 * b;
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: QState): void {
    this.breathe(s, u);
    s.head.yaw = 0.18 * Math.sin(TAU * u);
    s.neck.yaw = 0.1 * Math.sin(TAU * u);
    s.tail = { yaw: 0.25 * Math.sin(TAU * u) * this.rig.traits.tailWag, pitch: 0, roll: 0, curl: 0.1 };
    s.ears = u > 0.55 && u < 0.7 ? -0.6 : 0;
    s.blink = u >= 0.74 && u < 0.875 ? 1 : 0;
    if (this.rig.bones.wings.length) s.wingFold = 0.95 + 0.05 * Math.sin(TAU * u);
  }

  clip_walk(u: number, s: QState): void {
    this.gait(s, u, this.g.walk);
    const c = Math.cos(TAU * u);
    s.root = new Vec3(0, this.rig.dims.legLen * 0.012 * Math.cos(2 * TAU * u), 0);
    s.pelvis.roll = 0.03 * Math.sin(TAU * u);
    s.spine.yaw = 0.05 * c;
    s.neck.pitch = 0.08 * Math.sin(2 * TAU * u + 0.5) * (this.rig.traits.hooved ? 1.5 : 0.6);
    s.tail = { yaw: 0.3 * Math.sin(TAU * u) * this.rig.traits.tailWag, pitch: -0.05, roll: 0, curl: 0 };
    s.blink = u >= 0.5 && u < 0.62 ? 1 : 0;
  }

  clip_trot(u: number, s: QState): void {
    this.gait(s, u, this.g.trot);
    s.root = new Vec3(0, -this.rig.dims.legLen * 0.03 * Math.cos(2 * TAU * u), 0);
    s.neck.pitch = 0.06 * Math.sin(2 * TAU * u);
    s.head.pitch = -0.05;
    s.tail = { yaw: 0.2 * Math.sin(TAU * u) * this.rig.traits.tailWag, pitch: 0.15, roll: 0, curl: 0 };
    s.ears = -0.2;
  }

  clip_run(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    this.gait(s, u, this.g.run);
    // spine flexion: gathered when the hind legs reach forward, extended in the reach
    const flex = Math.sin(TAU * (u - 0.2));
    s.root = new Vec3(0, L * 0.06 * Math.sin(TAU * (u - 0.35)) - L * 0.05, 0);
    s.pelvis.pitch = 0.12 * flex;
    s.spine.pitch = -0.08 * flex;
    s.chest.pitch = -0.12 * flex;
    s.neck.pitch = 0.12 + 0.12 * Math.sin(TAU * u);
    s.head.pitch = -0.05;
    s.tail = { yaw: 0, pitch: 0.35 - 0.2 * flex, roll: 0, curl: 0 };
    s.ears = -0.7;
    s.shadow = 1;
    if (this.rig.bones.wings.length) s.wingFold = 0.75;
  }

  clip_jump(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    const crouch = keyframes(u, [[0, 0], [0.18, 1], [0.28, -0.2], [0.4, 0], [0.72, 0], [0.82, 0.7], [1, 0]]);
    const air = u > 0.28 && u < 0.76 ? Math.sin((PI * (u - 0.28)) / 0.48) : 0;
    const h = L * 0.9 * air;
    s.root = new Vec3(L * 0.3 * smoothstep(0.25, 0.8, u) - L * 0.3 * smoothstep(0.85, 1, u), h - L * 0.25 * crouch, 0);
    s.autoHeight = air === 0;
    s.pelvis.pitch = -0.25 * (u < 0.5 ? air : -air * 0.6) + 0.1 * crouch;
    this.rig.legs.forEach((leg, i) => {
      const reach = leg.front ? (u < 0.5 ? 0.35 : 0.5) : u < 0.5 ? -0.45 : 0.1;
      s.legs[i] = { toe: leg.restToe.add(new Vec3(L * reach * air, h + L * 0.25 * air, 0)), fold: air * (leg.front ? 1.2 : 0.4), planted: air === 0 };
    });
    s.tail = { yaw: 0, pitch: 0.3 * air, roll: 0, curl: 0 };
    s.ears = -0.6 * air;
    s.shadow = 1 - 0.4 * air;
    if (this.rig.bones.wings.length) {
      s.wingFold = 1 - air;
      s.wingFlap = 0.6 * Math.sin(TAU * u * 2) * air;
    }
  }

  clip_attack(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    switch (this.rig.traits.action) {
      case 'bite':
      case 'breath': {
        const wind = k([[0, 0], [0.3, 1], [0.45, 0], [1, 0]]);
        const lunge = k([[0, 0], [0.3, 0], [0.45, 1], [0.6, 1], [1, 0]]);
        s.root = new Vec3(L * (0.35 * lunge - 0.15 * wind), -L * 0.12 * wind, 0);
        s.pelvis.pitch = 0.08 * wind - 0.05 * lunge;
        s.neck.pitch = -0.4 * wind + 0.25 * lunge;
        s.head.pitch = 0.2 * lunge;
        s.jaw = this.rig.traits.action === 'breath' ? Math.max(wind * 0.6, lunge) : Math.max(0.5 * wind, lunge * (u < 0.52 ? 1 : 0.2));
        s.ears = -0.8 * (wind + lunge);
        s.tail.pitch = 0.3 * lunge;
        s.mood = 'angry';
        if (this.rig.bones.wings.length) s.wingFold = 1 - 0.5 * wind;
        break;
      }
      case 'charge': {
        const lower = k([[0, 0], [0.25, 1], [0.75, 1], [1, 0]]);
        const push = k([[0, 0], [0.3, 0], [0.5, 1], [0.65, 1], [1, 0]]);
        s.root = new Vec3(L * (0.5 * push - 0.1 * lower), -L * 0.08 * lower, 0);
        s.neck.pitch = 0.45 * lower;
        s.head.pitch = 0.35 * lower - 0.4 * push;
        s.pelvis.pitch = 0.05 * lower;
        this.rig.legs.forEach((leg, i) => {
          if (!leg.front || leg.side > 0) return;
          const paw = Math.sin(PI * clamp((u - 0.05) / 0.22, 0, 1));
          s.legs[i] = { toe: leg.restToe.add(new Vec3(-L * 0.25 * paw, L * 0.15 * paw, 0)), fold: 0.6 * paw, planted: paw < 0.05 };
        });
        s.mood = 'angry';
        break;
      }
      case 'kick': {
        // buck: front end down, hind legs strike backwards
        const buck = k([[0, 0], [0.3, 1], [0.55, 1], [1, 0]]);
        const strike = k([[0, 0], [0.3, 0], [0.42, 1], [0.55, 1], [0.8, 0]]);
        s.pelvis.pitch = 0.3 * buck;
        s.root = new Vec3(0, L * 0.1 * buck, 0);
        s.neck.pitch = 0.4 * buck;
        this.rig.legs.forEach((leg, i) => {
          if (leg.front) return;
          s.legs[i] = { toe: leg.restToe.add(new Vec3(-L * 0.9 * strike, L * 0.55 * buck, 0)), fold: -0.4 * strike, planted: buck < 0.05 };
        });
        s.tail.pitch = 0.6 * buck;
        s.ears = -1;
        s.mood = 'angry';
        break;
      }
      case 'swipe': {
        // rear up and swipe with a front paw
        const rear = k([[0, 0], [0.3, 1], [0.7, 1], [1, 0]]);
        const swipe = k([[0, 0], [0.35, 0], [0.5, 1], [0.62, 0.3], [1, 0]]);
        s.pelvis.pitch = -0.55 * rear;
        s.root = new Vec3(-L * 0.2 * rear, L * 0.15 * rear, 0);
        s.neck.pitch = 0.35 * rear;
        s.jaw = 0.8 * rear;
        this.rig.legs.forEach((leg, i) => {
          if (!leg.front) return;
          const right = leg.side > 0;
          const t = leg.restToe;
          s.legs[i] = { toe: new Vec3(t.x + L * (0.2 + (right ? 0.6 * swipe : 0)), L * (0.7 + (right ? 0.35 * (1 - swipe) : 0.1)) * rear, t.z), fold: 1.2 * rear, planted: rear < 0.05 };
        });
        s.mood = 'angry';
        break;
      }
      case 'pounce': {
        const crouch = k([[0, 0], [0.25, 1], [0.35, 0.2], [0.85, 0.2], [1, 0]]);
        const leap = u > 0.3 && u < 0.7 ? Math.sin((PI * (u - 0.3)) / 0.4) : 0;
        const fwd = smoothstep(0.3, 0.7, u) * (1 - smoothstep(0.75, 1, u));
        s.root = new Vec3(L * 0.8 * fwd, L * 0.45 * leap - L * 0.3 * crouch, 0);
        s.autoHeight = leap === 0;
        s.pelvis.pitch = -0.2 * leap + 0.1 * crouch;
        s.jaw = leap > 0.5 ? 0.9 : 0;
        this.rig.legs.forEach((leg, i) => {
          const reach = leg.front ? 0.6 : -0.4;
          s.legs[i] = { toe: leg.restToe.add(new Vec3(L * (reach * leap + 0.8 * fwd), L * 0.45 * leap + L * 0.2 * leap, 0)), fold: leg.front ? 0.2 : 0.5 * leap, planted: leap === 0 };
        });
        s.tail.pitch = 0.4 * leap;
        s.ears = -0.8;
        s.shadow = 1 - 0.3 * leap;
        s.mood = 'angry';
        break;
      }
    }
  }

  clip_call(u: number, s: QState): void {
    const up = keyframes(u, [[0, 0], [0.25, 1], [0.8, 1], [1, 0]]);
    const howl = this.rig.traits.action === 'bite' && !this.rig.traits.hooved;
    s.neck.pitch = (howl ? -0.9 : -0.35) * up;
    s.head.pitch = (howl ? -0.5 : 0.1) * up;
    s.jaw = up * (0.7 + 0.15 * Math.sin(TAU * u * 3));
    s.pelvis.pitch = howl ? 0 : -0.1 * up;
    s.ears = -0.4 * up;
    s.tail.pitch = 0.2 * up;
    s.mood = howl ? 'neutral' : 'angry';
    if (this.rig.bones.wings.length) {
      s.wingFold = 1 - 0.9 * up;
      s.wingFlap = -0.3 * up;
    }
  }

  clip_hurt(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.45, 0.7], [1, 0]]);
    s.root = new Vec3(-L * 0.18 * h, -L * 0.06 * h, 0);
    s.pelvis.pitch = 0.08 * h;
    s.neck.pitch = -0.35 * h;
    s.head.yaw = 0.25 * h;
    s.jaw = 0.6 * h;
    s.ears = -1 * h;
    s.tail.pitch = -0.4 * h;
    s.mood = 'pain';
  }

  clip_die(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    const buckle = keyframes(u, [[0, 0], [0.15, 0.3], [0.45, 1]]);
    const fall = keyframes(u, [[0.3, 0], [0.75, 1.04], [0.85, 0.97], [1, 1]]);
    s.root = new Vec3(0, -L * 0.35 * buckle * (1 - fall * 0.6), 0);
    s.autoHeight = false;
    s.neck.pitch = 0.3 * buckle - 0.2 * fall;
    s.head.pitch = 0.2 * fall;
    s.jaw = 0.3 * fall;
    this.rig.legs.forEach((leg, i) => {
      s.legs[i] = { toe: leg.restToe.add(new Vec3(L * (leg.front ? 0.15 : -0.1) * fall, L * 0.1 * buckle * (1 - fall), 0)), fold: 0.6 * buckle, planted: false };
    });
    s.tail = { yaw: 0, pitch: -0.3 * fall, roll: 0, curl: 0 };
    s.roll = fall;
    s.mood = fall > 0.5 ? 'dead' : 'pain';
    if (this.rig.bones.wings.length) s.wingFold = 1 - 0.5 * fall;
  }

  /** Dogs, cats, bears: sit on the haunches, front legs straight. */
  clip_sit(u: number, s: QState): void {
    const L = this.rig.dims.legLen, d = this.rig.dims;
    s.autoHeight = false;
    s.pelvis.pitch = -0.6;
    s.root = new Vec3(-d.BL * 0.05, -d.hipY * 0.55, 0);
    this.rig.legs.forEach((leg, i) => {
      if (leg.front) s.legs[i] = { toe: leg.restToe.add(new Vec3(-d.BL * 0.25, 0, 0)), fold: 0, planted: false };
      else s.legs[i] = { toe: leg.restToe.add(new Vec3(L * 0.45, 0, leg.side * L * 0.06)), fold: 0.9, planted: false };
    });
    this.breathe(s, u);
    s.neck.pitch -= 0.15;
    s.head.pitch = 0.25;
    s.tail = { yaw: 0.2 * Math.sin(TAU * u) * this.rig.traits.tailWag, pitch: -0.4, roll: 0, curl: 0.3 };
    s.blink = u >= 0.75 ? 1 : 0;
  }

  /** Hooved animals: lie down with the legs folded under. */
  clip_rest(u: number, s: QState): void {
    const L = this.rig.dims.legLen, d = this.rig.dims;
    s.autoHeight = false;
    s.root = new Vec3(0, -d.hipY * 0.68, 0);
    this.rig.legs.forEach((leg, i) => {
      s.legs[i] = { toe: leg.restToe.add(new Vec3(leg.front ? L * 0.25 : L * 0.35, d.hipY * 0.02, leg.side * L * 0.1)), fold: 1.6, planted: false };
    });
    this.breathe(s, u);
    s.neck.pitch = -0.1;
    s.head.yaw = 0.1 * Math.sin(TAU * u);
    s.tail = { yaw: 0.1, pitch: -0.2, roll: 0, curl: 0.4 };
    s.blink = u >= 0.75 ? 1 : 0;
    if (this.rig.bones.wings.length) s.wingFold = 1;
  }

  clip_sleep(u: number, s: QState): void {
    this.clip_rest(u, s);
    s.neck.pitch = 0.55;
    s.head.pitch = 0.3;
    s.head.yaw = 0.35;
    s.tail = { yaw: 0.8, pitch: -0.2, roll: 0, curl: 0.6 };
    s.blink = 1;
    s.mood = 'dead';
    s.chest.pitch += -0.04 * Math.sin(TAU * u);
  }

  clip_eat(u: number, s: QState): void {
    s.neck.pitch = 0.95;
    s.head.pitch = 0.45;
    s.jaw = 0.25 * Math.max(0, Math.sin(TAU * u * 2));
    s.pelvis.pitch = 0.04;
    s.tail = { yaw: 0.3 * Math.sin(TAU * u) * this.rig.traits.tailWag, pitch: 0, roll: 0, curl: 0 };
    s.ears = 0.3 * Math.sin(TAU * u);
    s.blink = u > 0.4 && u < 0.6 ? 1 : 0;
  }

  clip_fly(u: number, s: QState): void {
    const L = this.rig.dims.legLen;
    const flap = Math.sin(TAU * u);
    const alt = L * 1.4 + L * 0.12 * Math.sin(TAU * u - 1);
    s.root = new Vec3(0, alt, 0);
    s.autoHeight = false;
    s.wingFold = 0.05;
    s.wingFlap = 0.75 * flap;
    s.pelvis.pitch = -0.1;
    s.neck.pitch = -0.15;
    this.rig.legs.forEach((leg, i) => {
      s.legs[i] = { toe: leg.restToe.add(new Vec3(leg.front ? L * 0.1 : -L * 0.45, alt + L * 0.35, 0)), fold: leg.front ? 1.4 : 0.5, planted: false };
    });
    s.tail = { yaw: 0.1 * flap, pitch: 0.1, roll: 0, curl: 0 };
    s.shadow = 0.55;
  }
}
