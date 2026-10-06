/**
 * Procedural animation for bipeds (humans and humanoids).
 *
 * Every clip is a function of normalised time that fills a BipedState: where the pelvis is, how the
 * spine, neck and head bend, where each foot is (IK) and how each arm is held (angles or IK with an
 * explicit hand orientation). `apply` turns the state into bone transforms.
 *
 * Gaits keep planted feet planted: during stance a foot's contact point (heel, sole or ball of the
 * foot) moves backwards at exactly the clip's ground speed, so a sprite moved at `ClipDef.speed`
 * never slides. Heel strike and toe-off roll the foot about the heel and the ball, the pelvis
 * lowers itself whenever a planted leg could not otherwise reach (that is where the natural bob
 * comes from), hips and shoulders counter-rotate and the arms swing against the legs.
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, clamp, easeInOut, frac, keyframes, lerp, pulse, saturate, segmentFrame, smoothstep, twoBoneIK } from '../core/math';
import type { Animator, ClipDef } from '../model/types';
import { SIDES, armFromAngles, armFromTarget, footFrame, restArm, type ArmAngles, type BipedRig } from './bipedRig';

interface Rot {
  yaw: number;
  pitch: number;
  roll: number;
}
const rot = (yaw = 0, pitch = 0, roll = 0): Rot => ({ yaw, pitch, roll });

interface LegTarget {
  ankle: Vec3;
  pitch: number;
  yaw: number;
  planted: boolean;
  /** Knee direction (default: forward). */
  pole?: Vec3;
}

interface ArmTarget {
  angles: ArmAngles;
  /** When set, the wrist reaches this creature-space point (IK) instead of using the angles. */
  target?: Vec3;
  pole?: Vec3;
  /** IK hand orientation: fingers and thumb directions (creature space). */
  fingers?: Vec3;
  thumb?: Vec3;
}

export interface BipedState {
  /** Pelvis offset from its rest position (creature space). */
  root: Vec3;
  /** Lower the pelvis whenever a planted leg would be over-stretched. */
  autoHeight: boolean;
  pelvis: Rot;
  spine: Rot;
  chest: Rot;
  neck: Rot;
  head: Rot;
  legs: [LegTarget, LegTarget];
  arms: [ArmTarget, ArmTarget];
  /** Held items, relative to their grip (pitch tips the blade back towards the arm). */
  weapon: Rot;
  offhand: Rot;
  showArrow: boolean;
  cape: number;
  capeSide: number;
  skirt: number;
  hair: number;
  hairSide: number;
  tail: Rot;
  blink: number;
  mouth: number;
  mood: SkeletonPose['mood'];
  /** 0..1: falls over backwards (dying) about a pivot on the ground. */
  fall: number;
  shadow: number;
}

interface GaitSpec {
  stride: number;
  duty: number;
  lift: number;
  liftPeak: number;
  heel: number;
  toe: number;
  width: number;
}

/** Clip list with frame counts and timing. Ground speeds follow from leg length. */
function clipDefs(rig: BipedRig): ClipDef[] {
  const L = rig.dims.lThigh + rig.dims.lShin;
  const g = gaits(rig);
  const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
    ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
  void L;
  return [
    def('idle', 'Idle', 8, 6, true),
    def('ready', 'Ready', 4, 5, true),
    def('walk', 'Walk', 8, 9, true, g.walk.stride),
    def('run', 'Run', 8, 13, true, g.run.stride),
    def('sneak', 'Sneak', 8, 7, true, g.sneak.stride),
    def('jump', 'Jump', 10, 12, false),
    def('attack', rig.weapon === 'bow' ? 'Shoot' : rig.weapon === 'spear' ? 'Thrust' : rig.weapon === 'none' ? 'Punch' : rig.weapon === 'staff' || rig.weapon === 'wand' ? 'Magic attack' : 'Slash', 10, 14, false),
    def('cast', 'Cast', 10, 10, false),
    def('block', 'Block', 4, 6, true),
    def('hurt', 'Hurt', 6, 12, false),
    def('die', 'Die', 10, 10, false),
    def('sit', 'Sit', 4, 4, true),
    def('wave', 'Wave', 8, 9, true),
    def('cheer', 'Cheer', 8, 10, true),
    def('pickup', 'Pick up', 10, 10, false),
    def('talk', 'Talk', 8, 6, true),
  ];
}

function gaits(rig: BipedRig): { walk: GaitSpec; run: GaitSpec; sneak: GaitSpec } {
  const L = rig.dims.lThigh + rig.dims.lShin;
  const t = rig.traits;
  const short = rig.longSkirt ? 0.85 : 1;
  const kid = lerp(1.08, 1, saturate(t.age * 3));
  return {
    walk: { stride: L * 1.22 * short * kid * lerp(0.95, 1.06, t.energy), duty: 0.6, lift: L * lerp(0.09, 0.13, t.energy), liftPeak: 0.42, heel: 0.3, toe: -0.62, width: 1.0 },
    run: { stride: L * 2.15 * kid * lerp(0.94, 1.06, t.energy), duty: 0.36, lift: L * 0.34, liftPeak: 0.32, heel: 0.08, toe: -0.85, width: 0.8 },
    sneak: { stride: L * 0.85, duty: 0.7, lift: L * 0.12, liftPeak: 0.45, heel: 0.15, toe: -0.4, width: 1.25 },
  };
}

export class BipedAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly L: number;
  private readonly g: ReturnType<typeof gaits>;

  constructor(readonly rig: BipedRig) {
    this.clips = clipDefs(rig);
    this.L = rig.dims.lThigh + rig.dims.lShin;
    this.g = gaits(rig);
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: BipedState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose);
  }

  // ------------------------------------------------------------------------------------ state

  private neutral(): BipedState {
    const d = this.rig.dims;
    const legs = SIDES.map((side) => ({
      ankle: new Vec3(0, d.ankleH, side * d.hipZ * 1.02), pitch: 0, yaw: side * -0.12, planted: true,
    })) as [LegTarget, LegTarget];
    const arms = SIDES.map(() => ({ angles: restArm() })) as [ArmTarget, ArmTarget];
    const s: BipedState = {
      root: Vec3.ZERO, autoHeight: true,
      pelvis: rot(), spine: rot(), chest: rot(), neck: rot(), head: rot(),
      legs, arms, weapon: rot(), offhand: rot(), showArrow: false,
      cape: 0.08, capeSide: 0, skirt: 0, hair: 0, hairSide: 0, tail: rot(0, 0, 0),
      blink: 0, mouth: 0, mood: 'neutral', fall: 0, shadow: 1,
    };
    this.carry(s);
    return s;
  }

  /** How the held items are carried when relaxed. */
  private carry(s: BipedState): void {
    const w = this.rig.weapon, o = this.rig.offhand;
    const R = s.arms[1].angles, Lf = s.arms[0].angles;
    switch (w) {
      case 'spear':
      case 'staff':
        // shaft upright, butt near the ground
        Object.assign(R, { swing: 0.12, raise: 0.18, elbow: 1.05, twist: 0.1 });
        s.weapon.pitch = 0.62;
        break;
      case 'bow':
        Object.assign(Lf, { swing: 0.06, raise: 0.14, elbow: 0.2 });
        s.offhand.pitch = 1.45;
        break;
      case 'none':
        break;
      case 'wand':
        Object.assign(R, { swing: 0.1, elbow: 0.35 });
        s.weapon.pitch = -0.9;
        break;
      default:
        // one-handed weapons hang forward-down
        Object.assign(R, { swing: 0.12, raise: 0.16, elbow: 0.32 });
        s.weapon.pitch = -0.85;
    }
    switch (o) {
      case 'shield':
      case 'buckler':
        Object.assign(Lf, { swing: 0.2, raise: 0.22, elbow: 0.75, twist: 0.4 });
        s.offhand.pitch = 0.2;
        break;
      case 'torch':
      case 'lantern':
        Object.assign(Lf, { swing: 0.15, raise: 0.12, elbow: 1.25, twist: -0.2 });
        s.offhand.pitch = o === 'torch' ? 0.95 : 0.0;
        break;
      case 'book':
        Object.assign(Lf, { swing: 0.25, raise: 0.05, elbow: 1.55, twist: 0.9 });
        s.offhand.pitch = 0;
        break;
    }
  }

  // ------------------------------------------------------------------------------------ apply

  private apply(s: BipedState, pose: SkeletonPose): void {
    pose.reset();
    const rig = this.rig, B = rig.bones, d = rig.dims;
    const R = (r: Rot) => Mat3.ypr(r.yaw, r.pitch, r.roll);

    // pelvis placement (lowered when a planted leg cannot reach)
    let root = s.root;
    if (s.autoHeight) {
      const pr = R(s.pelvis);
      const L = (d.lThigh + d.lShin) * 0.992;
      let drop = 0;
      for (let i = 0; i < 2; i++) {
        const leg = s.legs[i];
        if (!leg.planted) continue;
        const hip = new Vec3(0, d.hipY, 0).add(root).add(pr.apply(new Vec3(0, 0, SIDES[i] * d.hipZ)));
        const dx = hip.x - leg.ankle.x, dz = hip.z - leg.ankle.z;
        const maxDy = Math.sqrt(Math.max(0, L * L - dx * dx - dz * dz));
        const dy = hip.y - leg.ankle.y;
        if (dy > maxDy) drop = Math.max(drop, dy - maxDy);
      }
      root = root.add(new Vec3(0, -drop, 0));
    }
    pose.translate(B.pelvis, root);
    pose.rotate(B.pelvis, R(s.pelvis));
    pose.rotate(B.spine, R(s.spine));
    pose.rotate(B.chest, R(s.chest));
    pose.rotate(B.neck, R(s.neck));
    pose.rotate(B.head, R(s.head));
    if (B.skirt >= 0) pose.rotate(B.skirt, Mat3.rotZ(-s.skirt));
    B.hair.forEach((h, i) => i > 0 && pose.rotate(h, Mat3.rotZ(-s.hair * 0.6).mul(Mat3.rotX(s.hairSide * (i + 1) * 0.5))));
    B.tail.forEach((t, i) => pose.rotate(t, Mat3.rotY(s.tail.yaw * (0.6 + i * 0.25)).mul(Mat3.rotZ(-s.tail.pitch * (i === 0 ? 1 : 0.3) - s.tail.roll * 0.25))));
    pose.solve();
    // capes and hair hang with gravity: only the body's heading turns them, not its lean
    const yawOf = (bone: number) => {
      const f = pose.world[bone].basis.c0.ground().norm(Vec3.X);
      return Mat3.rotY(Math.atan2(-f.z, f.x));
    };
    if (B.cape.length) {
      const c = B.cape[0];
      const o = pose.world[B.chest].point(this.rig.bones.cape.length ? pose.anatomy.bones[c].rest.origin : Vec3.ZERO);
      pose.setWorld(c, new Xform(yawOf(B.chest).mul(Mat3.rotZ(-s.cape)).mul(Mat3.rotX(s.capeSide)), o));
    }
    if (B.hair.length) {
      const c = B.hair[0];
      const o = pose.world[B.head].point(pose.anatomy.bones[c].rest.origin);
      pose.setWorld(c, new Xform(yawOf(B.head).mul(Mat3.rotZ(-s.hair)).mul(Mat3.rotX(s.hairSide * 0.5)), o));
    }
    if (B.cape.length || B.hair.length) pose.solve();

    const pw = pose.world[B.pelvis], cw = pose.world[B.chest];
    const fwd = pw.basis.c0.ground().norm(Vec3.X);

    // legs
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const leg = s.legs[i];
      const hip = pw.point(new Vec3(0, 0, side * d.hipZ));
      const pole = leg.pole ?? fwd.add(new Vec3(0, 0, side * 0.12));
      const { mid: knee, end } = twoBoneIK(hip, leg.ankle, d.lThigh, d.lShin, pole);
      pose.setWorld(B.thigh[i], segmentFrame(hip, knee, pole));
      pose.setWorld(B.shin[i], segmentFrame(knee, end, pole));
      pose.setWorld(B.foot[i], footFrame(end, leg.pitch, leg.yaw));
    }

    // arms
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const a = s.arms[i];
      const shoulder = cw.point(new Vec3(d.shoulder.x, d.shoulder.y, side * d.shoulder.z));
      const r = a.target
        ? armFromTarget(shoulder, a.target, a.pole ?? new Vec3(-0.4, -0.6, side * 0.7), d, a.fingers, a.thumb)
        : armFromAngles(cw, shoulder, side, d, a.angles);
      pose.setWorld(B.upper[i], r.upper);
      pose.setWorld(B.fore[i], r.fore);
      pose.setWorld(B.hand[i], r.hand);
    }
    pose.setLocal(B.weapon, rig.weaponGrip.rotated(R(s.weapon)));
    pose.setLocal(B.offhand, rig.offhandGrip.rotated(R(s.offhand)));
    pose.solve();
    if (!s.showArrow) for (const gi of this.arrowGroups(pose)) pose.hide.add(gi);

    if (s.fall > 0) {
      // fall backwards about a pivot on the ground behind the heels
      const a = s.fall * (PI / 2 - 0.06);
      const pivot = new Vec3(-d.torsoDepth * 1.1, 0, 0);
      const t = new Xform(Mat3.rotZ(a), pivot).mul(new Xform(Mat3.I, pivot.neg()));
      pose.transformAll(t);
    }
    pose.blink = s.blink;
    pose.mouth = s.mouth;
    pose.mood = s.mood;
    pose.shadow = s.shadow;
  }

  private arrowGroupCache: number[] | null = null;
  private arrowGroups(pose: SkeletonPose): number[] {
    if (!this.arrowGroupCache) this.arrowGroupCache = pose.anatomy.groups.map((g, i) => (g.name === 'arrow' ? i : -1)).filter((i) => i >= 0);
    return this.arrowGroupCache;
  }

  // ------------------------------------------------------------------------------------ helpers

  /** Ankle position of a foot whose sole origin is at x=F, lifted by y, pitched about heel or ball. */
  private footAnkle(F: number, y: number, pitch: number): [number, number] {
    const d = this.rig.dims;
    const c = Math.cos(pitch), s = Math.sin(pitch);
    if (pitch >= 0) {
      const hx = F - d.heel;
      return [hx + d.heel * c - d.ankleH * s, y + d.heel * s + d.ankleH * c];
    }
    const bx = F + d.ball;
    return [bx - d.ball * c - d.ankleH * s, y - d.ball * s + d.ankleH * c];
  }

  /** Planted-foot gait: the right foot strikes at u = 0, the left at u = 0.5. */
  private gait(s: BipedState, u: number, g: GaitSpec): void {
    const d = this.rig.dims;
    const half = (g.stride * g.duty) / 2;
    const k = Math.log(0.5) / Math.log(g.liftPeak);
    const digi = this.rig.traits.digitigrade;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const p = frac(u + (side > 0 ? 0 : 0.5));
      let F: number, y = 0, pitch: number;
      if (p < g.duty) {
        const t = p / g.duty;
        F = half - t * g.stride * g.duty;
        pitch = t < 0.16 ? lerp(g.heel, 0, smoothstep(0, 0.16, t)) : t > 0.48 ? g.toe * smoothstep(0.48, 1, t) ** 1.4 : 0;
      } else {
        const t = (p - g.duty) / (1 - g.duty);
        F = lerp(-half, half, easeInOut(t));
        y = g.lift * Math.sin(PI * Math.pow(t, k));
        pitch = keyframes(t, [[0, g.toe], [0.35, g.toe * 0.25], [0.7, 0.05], [1, g.heel]]);
      }
      if (digi) pitch = Math.min(pitch, -0.35) - 0.0;
      const [ax, ay] = this.footAnkle(F, y, pitch);
      s.legs[i] = { ankle: new Vec3(ax, ay, side * d.hipZ * g.width), pitch, yaw: side * -0.1, planted: p < g.duty };
    }
  }

  private setArmsSwing(s: BipedState, u: number, amp: number, elbow: number, elbowGain: number, raise: number, bias = 0): void {
    const c = Math.cos(TAU * u);
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const a = s.arms[i];
      const sw = bias + (side > 0 ? -1 : 1) * amp * c;
      // arms holding something keep their carry pose and only sway a little
      const busy = (side > 0 && this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') || (side < 0 && (this.rig.offhand !== 'none' || this.rig.weapon === 'bow'));
      if (busy) {
        a.angles.swing += sw * 0.35;
        continue;
      }
      a.angles = { ...a.angles, swing: sw, raise, elbow: elbow + Math.max(0, sw) * elbowGain, twist: 0.1, flex: 0, roll: 0 };
    }
  }

  /** Feet apart, knees soft, weight low: the fighting stance. */
  private stance(s: BipedState, amt = 1): void {
    const d = this.rig.dims, L = this.L;
    s.legs[0] = { ...s.legs[0], ankle: new Vec3(L * 0.2 * amt, d.ankleH, -d.hipZ * lerp(1.02, 1.5, amt)), yaw: 0.25 * amt };
    s.legs[1] = { ...s.legs[1], ankle: new Vec3(-L * 0.18 * amt, d.ankleH, d.hipZ * lerp(1.02, 1.35, amt)), yaw: -0.45 * amt };
    s.root = s.root.add(new Vec3(0, -L * 0.07 * amt, 0));
    s.pelvis.yaw += -0.12 * amt;
    s.chest.yaw += -0.08 * amt;
    s.spine.pitch += 0.06 * amt;
  }

  /** Ready pose of the arms for the held weapon (fighting stance). */
  private readyArms(s: BipedState, b = 0): void {
    const w = this.rig.weapon, o = this.rig.offhand;
    const R = s.arms[1], Lf = s.arms[0];
    switch (w) {
      case 'bow':
        Lf.angles = { swing: 0.75, raise: 0.18, twist: 0.2, elbow: 0.35, flex: 0, roll: 0 };
        s.offhand.pitch = 1.3;
        R.angles = { swing: 0.35, raise: 0.18, twist: 0.3, elbow: 1.0 + b, flex: 0, roll: 0 };
        break;
      case 'spear':
        R.angles = { swing: 0.35, raise: 0.2, twist: -0.2, elbow: 1.2 + b, flex: 0, roll: 0 };
        s.weapon.pitch = -0.25;
        break;
      case 'staff':
        R.angles = { swing: 0.35, raise: 0.18, twist: 0.1, elbow: 1.2 + b, flex: 0, roll: 0 };
        s.weapon.pitch = 0.45;
        break;
      case 'none':
        // fists up
        R.angles = { swing: 0.55, raise: 0.25, twist: 0.6, elbow: 2.0 + b, flex: 0, roll: 0 };
        Lf.angles = { swing: 0.7, raise: 0.2, twist: 0.6, elbow: 2.1 + b, flex: 0, roll: 0 };
        break;
      default:
        R.angles = { swing: 0.5, raise: 0.22, twist: 0.1, elbow: 1.25 + b, flex: 0, roll: 0 };
        s.weapon.pitch = 0.55;
    }
    if (w !== 'bow' && w !== 'none') {
      if (o === 'shield' || o === 'buckler') {
        Lf.angles = { swing: 0.55, raise: 0.3, twist: 1.0, elbow: 1.5 + b, flex: 0, roll: 0 };
        s.offhand.pitch = 0.1;
      } else if (o === 'none') Lf.angles = { swing: 0.35, raise: 0.3, twist: 0.4, elbow: 1.0 + b, flex: 0, roll: 0 };
    }
  }

  private breathe(s: BipedState, u: number, amt = 1): void {
    const b = Math.sin(TAU * u);
    s.chest.pitch += -0.025 * b * amt;
    s.neck.pitch += 0.015 * b * amt;
    for (const a of s.arms) if (!a.target) a.angles.raise += 0.02 * b * amt;
    s.root = s.root.add(new Vec3(0, -this.L * 0.006 * (1 - Math.cos(TAU * u)) * amt, 0));
  }

  private posture(s: BipedState): void {
    // stooped elders and hunched creatures bend forward and look up
    const p = this.rig.traits.posture;
    s.spine.pitch += p * 0.18;
    s.chest.pitch += p * 0.12;
    s.neck.pitch -= p * 0.2;
    s.head.pitch -= p * 0.1;
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: BipedState): void {
    const L = this.L;
    this.posture(s);
    this.breathe(s, u);
    // a slow weight shift onto the left leg and back
    const w = Math.sin(TAU * u);
    s.root = s.root.add(new Vec3(0, 0, -L * 0.03 * w));
    s.pelvis.roll += 0.03 * w;
    s.chest.roll -= 0.02 * w;
    s.head.yaw = 0.06 * Math.sin(TAU * u + 1);
    s.blink = u >= 0.74 && u < 0.875 ? 1 : 0;
    s.cape += 0.02 * w;
    s.hair = 0.02 * w;
  }

  clip_ready(u: number, s: BipedState): void {
    this.stance(s);
    const b = Math.sin(TAU * u);
    this.readyArms(s, 0.05 * b);
    s.root = s.root.add(new Vec3(0, -this.L * 0.012 * (1 - Math.cos(TAU * u)), 0));
    s.head.pitch = -0.06;
    s.mood = 'focus';
  }

  clip_walk(u: number, s: BipedState): void {
    const t = this.rig.traits, L = this.L;
    this.gait(s, u, this.g.walk);
    const c = Math.cos(TAU * u);
    s.pelvis.yaw = 0.1 * c;
    s.pelvis.roll = -0.045 * Math.sin(TAU * (u - 0.05)) * (0.7 + t.sway * 0.8);
    s.root = s.root.add(new Vec3(0, L * 0.018 * Math.cos(2 * TAU * (u - 0.3)) - L * 0.01, -L * 0.012 * Math.sin(TAU * (u - 0.05)) * (1 + t.sway)));
    s.chest.yaw = -0.09 * c;
    s.chest.roll = 0.02 * Math.sin(TAU * (u - 0.05));
    s.spine.pitch = 0.05;
    this.posture(s);
    s.head.pitch = -0.03 * Math.cos(2 * TAU * (u - 0.3));
    this.setArmsSwing(s, u, lerp(0.32, 0.5, t.swing), 0.25, 0.4, 0.1);
    s.cape = 0.2 + 0.06 * Math.abs(Math.sin(TAU * u));
    s.skirt = 0.06 * c;
    s.hair = 0.08 + 0.04 * Math.cos(2 * TAU * (u - 0.4));
    s.tail = rot(0.12 * Math.sin(TAU * u), 0.1, 0);
    s.blink = u >= 0.5 && u < 0.6 ? 1 : 0;
  }

  clip_run(u: number, s: BipedState): void {
    const L = this.L;
    this.gait(s, u, this.g.run);
    const c = Math.cos(TAU * u);
    s.root = new Vec3(L * 0.06, -L * 0.07 - L * 0.045 * Math.cos(2 * TAU * (u - 0.18)), 0);
    s.pelvis = rot(0.13 * c, 0.1, -0.03 * Math.sin(TAU * u));
    s.spine.pitch = 0.18;
    s.chest = rot(-0.18 * c, 0.06, 0);
    s.neck.pitch = -0.14;
    s.head.pitch = -0.08;
    this.posture(s);
    this.setArmsSwing(s, u, 0.78, 1.55, 0.25, 0.16, 0.18);
    if (this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') {
      s.arms[1].angles = { ...s.arms[1].angles, swing: 0.35 - 0.3 * c, elbow: 1.3 };
      if (this.rig.weapon === 'spear' || this.rig.weapon === 'staff') s.weapon.pitch = -0.4;
    }
    s.cape = 0.75 + 0.12 * Math.sin(2 * TAU * u);
    s.capeSide = 0.06 * c;
    s.skirt = 0.12 * c;
    s.hair = 0.4 + 0.08 * Math.sin(2 * TAU * u);
    s.tail = rot(0.15 * Math.sin(TAU * u), -0.2, 0);
    s.mouth = 0.2;
  }

  clip_sneak(u: number, s: BipedState): void {
    const L = this.L;
    this.gait(s, u, this.g.sneak);
    const c = Math.cos(TAU * u);
    s.root = new Vec3(-L * 0.03, -L * 0.16 + L * 0.01 * Math.cos(2 * TAU * u), 0);
    s.pelvis = rot(0.06 * c, 0.15, 0);
    s.spine.pitch = 0.32;
    s.chest = rot(-0.06 * c, 0.12, 0);
    s.neck.pitch = -0.35;
    s.head.pitch = -0.12;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const busy = (side > 0 && this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') || (side < 0 && this.rig.offhand !== 'none');
      if (busy) continue;
      s.arms[i].angles = { swing: 0.5 + 0.12 * c * -side, raise: 0.3, twist: 0.5, elbow: 1.35, flex: 0.3, roll: 0 };
    }
    s.cape = 0.25;
    s.hair = 0.05;
    s.tail = rot(0.1 * Math.sin(TAU * u), 0.3, 0);
  }

  clip_jump(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    const crouch = keyframes(u, [[0, 0], [0.16, 1], [0.27, -0.05], [0.4, 0], [0.7, 0], [0.8, 0.8], [1, 0]]);
    const air = u > 0.27 && u < 0.76 ? Math.sin(PI * (u - 0.27) / 0.49) : 0;
    const height = L * 0.55 * air;
    const tuck = air * smoothstep(0.3, 0.5, u) * (1 - smoothstep(0.55, 0.72, u));
    s.root = new Vec3(L * 0.04 * crouch, height - L * 0.24 * crouch, 0);
    s.autoHeight = air === 0;
    s.spine.pitch = 0.3 * crouch + 0.1 * tuck;
    s.neck.pitch = -0.2 * crouch;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const lead = side < 0 ? 1 : 0;
      s.legs[i] = {
        ankle: new Vec3(L * (0.05 + 0.18 * tuck * lead), d.ankleH + height + L * 0.38 * tuck - (air > 0 ? L * 0.04 : 0), side * d.hipZ * 1.08),
        pitch: air > 0 ? -0.45 * (1 - tuck * 0.5) : 0, yaw: side * -0.12, planted: air === 0,
      };
    }
    const armSwing = keyframes(u, [[0, 0], [0.16, -0.75], [0.3, 2.5], [0.5, 2.2], [0.72, 0.9], [0.82, 0.3], [1, 0.04]]);
    const armRaise = keyframes(u, [[0, 0.12], [0.3, 0.25], [0.55, 0.5], [0.75, 0.75], [1, 0.12]]);
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const busy = (side > 0 && this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') || (side < 0 && this.rig.offhand !== 'none');
      const a = s.arms[i].angles;
      s.arms[i].angles = busy ? { ...a, swing: a.swing + armSwing * 0.3, raise: armRaise } : { swing: armSwing, raise: armRaise, twist: 0.2, elbow: 0.35, flex: 0, roll: 0 };
    }
    s.cape = 0.15 + 0.6 * air * (u < 0.5 ? -0.5 : 1);
    s.hair = u < 0.5 ? -0.25 * air : 0.4 * air;
    s.skirt = 0.1 * air;
    s.shadow = 1 - 0.35 * air;
  }

  clip_attack(u: number, s: BipedState): void {
    switch (this.rig.weapon) {
      case 'bow':
        return this.shoot(u, s);
      case 'spear':
        return this.thrust(u, s);
      case 'staff':
      case 'wand':
        return this.clip_cast(u, s);
      case 'none':
        return this.punch(u, s);
      default:
        return this.slash(u, s);
    }
  }

  /** One-handed diagonal slash: wind up over the shoulder, cut down across the body, recover. */
  private slash(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s);
    this.readyArms(s);
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const T = [0, 0.32, 0.46, 0.6, 1];
    const wind = pulse(u, 0, T[1], T[1], T[2]);
    const strike = pulse(u, T[1], T[2], T[2], T[3] + 0.15);
    s.chest.yaw += k([[0, 0], [T[1], -0.55], [T[2], 0.45], [T[3], 0.6], [1, 0]]);
    s.pelvis.yaw += k([[0, 0], [T[1], -0.25], [T[2], 0.2], [T[3], 0.25], [1, 0]]);
    s.spine.pitch += k([[0, 0], [T[1], -0.12], [T[2], 0.28], [T[3], 0.3], [1, 0]]);
    s.root = s.root.add(new Vec3(k([[0, 0], [T[1], -0.08 * L], [T[2], 0.12 * L], [T[3], 0.14 * L], [1, 0]]), -0.05 * L * strike, 0));
    // right hand path: start (ready) → behind the head → forward → down across
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    const pts: [number, Vec3][] = [
      [0, new Vec3(L * 0.28, shY - L * 0.25, d.shoulder.z * 0.9)],
      [T[1], new Vec3(-L * 0.12, shY + L * 0.38, d.shoulder.z * 0.8)],
      [T[2], new Vec3(L * 0.55, shY - L * 0.02, d.shoulder.z * 0.4)],
      [T[3], new Vec3(L * 0.42, shY - L * 0.55, -d.shoulder.z * 0.4)],
      [1, new Vec3(L * 0.28, shY - L * 0.25, d.shoulder.z * 0.9)],
    ];
    const blades: [number, Vec3][] = [
      [0, new Vec3(0.6, 0.8, 0)],
      [T[1], new Vec3(-0.85, 0.35, 0.2)],
      [T[2], new Vec3(0.75, 0.6, -0.2)],
      [T[3], new Vec3(0.2, -0.85, -0.45)],
      [1, new Vec3(0.6, 0.8, 0)],
    ];
    const target = pathAt(pts, u);
    const blade = pathAt(blades, u).norm(Vec3.X);
    s.arms[1] = { angles: s.arms[1].angles, target, pole: new Vec3(-0.3, -0.7, 0.7), thumb: blade };
    s.weapon.pitch = 0;
    s.mood = wind > 0.2 || strike > 0.2 ? 'angry' : 'focus';
    s.mouth = strike > 0.5 ? 0.6 : 0;
    s.cape = 0.12 + 0.14 * strike;
    s.hair = 0.15 * strike;
  }

  private thrust(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s);
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    const reach = k([[0, 0.15], [0.3, -0.05], [0.45, 0.95], [0.62, 0.9], [1, 0.15]]);
    s.root = s.root.add(new Vec3(L * 0.18 * k([[0, 0], [0.3, -0.3], [0.45, 1], [0.62, 1], [1, 0]]), 0, 0));
    s.chest.yaw += k([[0, 0], [0.3, -0.35], [0.45, 0.25], [0.62, 0.2], [1, 0]]);
    s.spine.pitch += k([[0, 0], [0.3, -0.05], [0.45, 0.22], [1, 0]]);
    const target = new Vec3(L * (0.1 + 0.75 * reach), shY - L * 0.38, d.shoulder.z * 0.7);
    s.arms[1] = { angles: s.arms[1].angles, target, pole: new Vec3(-0.6, -0.6, 0.6), fingers: new Vec3(0.1, -0.4, -1), thumb: new Vec3(1, 0.05, 0) };
    s.arms[0] = { angles: s.arms[0].angles, target: target.add(new Vec3(-L * 0.12, L * 0.04, -d.shoulder.z * 0.9)), pole: new Vec3(-0.5, -0.6, -0.8), fingers: new Vec3(0, -0.3, 1), thumb: new Vec3(1, 0, 0) };
    s.weapon.pitch = 0;
    s.mood = 'angry';
    s.mouth = reach > 0.8 ? 0.6 : 0;
    s.cape = 0.2 + 0.3 * saturate(reach);
  }

  private shoot(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s, 0.8);
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const raise = k([[0, 0], [0.22, 1], [0.85, 1], [1, 0]]);
    const draw = k([[0, 0], [0.22, 0], [0.5, 1], [0.66, 1], [0.7, 0.2], [1, 0]]);
    const release = u > 0.66 ? pulse(u, 0.66, 0.7, 0.75, 0.95) : 0;
    s.chest.yaw += -0.75 * raise;
    s.pelvis.yaw += -0.3 * raise;
    s.head.yaw = 0.75 * raise;
    s.neck.yaw = 0.15 * raise;
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    // left arm points the bow at the target
    const bowHand = new Vec3(L * lerp(0.2, 0.62, raise), shY - L * lerp(0.35, 0.03, raise), -d.shoulder.z * lerp(1, 0.25, raise));
    s.arms[0] = { angles: s.arms[0].angles, target: bowHand, pole: new Vec3(0, -0.3, -1), fingers: new Vec3(1, 0, 0.3), thumb: new Vec3(0, 1, 0) };
    s.offhand.pitch = 0;
    s.offhand.yaw = 0;
    // right hand: from the string at the bow to the cheek, then flies back on release
    const nock = bowHand.add(new Vec3(-L * 0.05, 0, d.shoulder.z * 0.15));
    const cheek = new Vec3(L * 0.08, shY + L * 0.12, d.shoulder.z * 0.35);
    let hand = Vec3.lerp(nock, cheek, draw);
    hand = hand.add(new Vec3(-L * 0.15 * release, L * 0.05 * release, d.shoulder.z * 0.4 * release));
    if (raise < 0.95) hand = Vec3.lerp(new Vec3(L * 0.18, shY - L * 0.4, d.shoulder.z), hand, raise);
    s.arms[1] = { angles: s.arms[1].angles, target: hand, pole: new Vec3(-0.6, 0.1, 1), fingers: new Vec3(1, 0, -0.2), thumb: new Vec3(0, 1, 0) };
    s.showArrow = u > 0.18 && u < 0.67;
    s.mood = 'focus';
  }

  private punch(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s);
    this.readyArms(s);
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const hit = k([[0, 0], [0.25, -0.2], [0.42, 1], [0.58, 1], [1, 0]]);
    s.chest.yaw += 0.55 * hit;
    s.pelvis.yaw += 0.25 * hit;
    s.root = s.root.add(new Vec3(L * 0.1 * hit, 0, 0));
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    if (hit > 0.05) {
      const target = new Vec3(L * lerp(0.15, 0.8, hit), shY - L * 0.1, lerp(d.shoulder.z, -d.shoulder.z * 0.1, hit));
      s.arms[1] = { angles: s.arms[1].angles, target, pole: new Vec3(-0.2, -0.8, 0.6), fingers: new Vec3(1, 0, 0), thumb: new Vec3(0, 0.3, -1) };
    }
    s.mood = 'angry';
    s.mouth = hit > 0.8 ? 0.5 : 0;
  }

  clip_cast(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s, 0.6);
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    const gather = k([[0, 0], [0.35, 1], [0.48, 1], [0.58, 0], [1, 0]]);
    const push = k([[0, 0], [0.45, 0], [0.58, 1], [0.75, 1], [1, 0]]);
    s.spine.pitch += -0.12 * gather + 0.2 * push;
    s.neck.pitch += 0.12 * gather - 0.1 * push;
    s.root = s.root.add(new Vec3(L * 0.1 * push - L * 0.04 * gather, 0, 0));
    s.mood = 'focus';
    s.mouth = push > 0.6 ? 0.5 : 0;
    s.cape = 0.12 + 0.5 * push;
    s.hair = 0.25 * push;
    if (this.rig.weapon === 'staff') {
      // raise the staff high, then point it forward
      const up = new Vec3(L * 0.15, shY + L * 0.32, d.shoulder.z * 0.8);
      const out = new Vec3(L * 0.68, shY - L * 0.05, d.shoulder.z * 0.4);
      const rest = new Vec3(L * 0.3, shY - L * 0.32, d.shoulder.z * 1.1);
      const t1 = Vec3.lerp(rest, up, gather);
      const target = Vec3.lerp(t1, out, push);
      const shaft = Vec3.lerp(Vec3.lerp(new Vec3(0.15, 1, 0), new Vec3(0.2, 1, 0), gather), new Vec3(1, 0.35, 0), push).norm();
      s.arms[1] = { angles: s.arms[1].angles, target, pole: new Vec3(-0.3, -0.7, 0.8), thumb: shaft };
      s.weapon.pitch = 0;
      s.arms[0].angles = { swing: 0.4 + 0.9 * push, raise: 0.35, twist: 0.2, elbow: 1.2 - 0.9 * push, flex: 0.4, roll: 0 };
      return;
    }
    // both hands gather in front of the chest, then push forward
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const near = new Vec3(L * 0.28, shY - L * 0.28, side * d.shoulder.z * 0.25);
      const far = new Vec3(L * 0.7, shY - L * 0.1, side * d.shoulder.z * 0.45);
      const rest = new Vec3(L * 0.15, shY - L * 0.55, side * d.shoulder.z * 1.2);
      const target = Vec3.lerp(Vec3.lerp(rest, near, gather), far, push);
      const busy = side < 0 && this.rig.offhand !== 'none';
      if (busy) continue;
      s.arms[i] = {
        angles: s.arms[i].angles, target, pole: new Vec3(-0.3, -0.8, side * 0.7),
        fingers: Vec3.lerp(new Vec3(0.3, 0.5, -side * 0.6), new Vec3(0.2, 1, 0), push).norm(), thumb: new Vec3(0.2, 0.3, -side).norm(),
      };
    }
    if (this.rig.weapon === 'wand') s.weapon.pitch = 0.5 * push;
  }

  clip_block(u: number, s: BipedState): void {
    const d = this.rig.dims, L = this.L;
    this.stance(s, 1.1);
    s.root = s.root.add(new Vec3(-L * 0.04, -L * 0.04 - L * 0.01 * (1 - Math.cos(TAU * u)), 0));
    s.spine.pitch += 0.12;
    s.neck.pitch -= 0.1;
    s.mood = 'focus';
    const shY = d.hipY + d.spineY + d.chestY + d.shoulder.y;
    if (this.rig.offhand === 'shield' || this.rig.offhand === 'buckler') {
      s.arms[0] = { angles: s.arms[0].angles, target: new Vec3(L * 0.36, shY - L * 0.2, -d.shoulder.z * 0.15), pole: new Vec3(-0.2, -0.6, -1), fingers: new Vec3(0, 0, 1), thumb: new Vec3(0, 1, 0) };
      s.offhand.pitch = 0;
      this.readyArms(s);
      s.arms[0] = { angles: s.arms[0].angles, target: new Vec3(L * 0.36, shY - L * 0.2, -d.shoulder.z * 0.15), pole: new Vec3(-0.2, -0.6, -1), fingers: new Vec3(0, 0, 1), thumb: new Vec3(0, 1, 0) };
      return;
    }
    if (this.rig.weapon === 'none' || this.rig.weapon === 'bow') {
      // forearms up in front of the face
      for (let i = 0; i < 2; i++) {
        const side = SIDES[i];
        s.arms[i] = { angles: s.arms[i].angles, target: new Vec3(L * 0.3, shY + L * 0.05, side * d.shoulder.z * 0.35), pole: new Vec3(0.2, -1, side * 0.6), fingers: new Vec3(0.2, 1, -side * 0.3).norm(), thumb: new Vec3(0, 0, -side) };
      }
      return;
    }
    // parry: blade held across, up and to the left
    s.arms[1] = { angles: s.arms[1].angles, target: new Vec3(L * 0.38, shY - L * 0.12, d.shoulder.z * 0.5), pole: new Vec3(-0.3, -0.8, 0.7), fingers: new Vec3(0.2, -0.5, 1).norm(), thumb: new Vec3(0.1, 0.75, -0.65).norm() };
    s.weapon.pitch = 0;
    if (this.rig.offhand === 'none') s.arms[0].angles = { swing: 0.3, raise: 0.35, twist: 0.4, elbow: 1.0, flex: 0, roll: 0 };
  }

  clip_hurt(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.4, 0.8], [1, 0]]);
    s.root = new Vec3(-L * 0.14 * h, -L * 0.05 * h, 0);
    s.spine.pitch = -0.32 * h;
    s.chest.pitch = -0.1 * h;
    s.neck.pitch = -0.2 * h;
    s.head.pitch = -0.25 * h;
    s.chest.yaw = 0.15 * h;
    for (let i = 0; i < 2; i++) {
      const a = s.arms[i].angles;
      s.arms[i].angles = { ...a, swing: a.swing - 0.4 * h, raise: a.raise + 0.55 * h, elbow: a.elbow + 0.5 * h };
    }
    // the right foot steps back to catch the fall
    const back = keyframes(u, [[0, 0], [0.25, 1], [0.7, 1], [1, 0]]);
    const lift = u > 0.1 && u < 0.3 ? Math.sin(PI * (u - 0.1) / 0.2) : u > 0.7 && u < 0.95 ? Math.sin(PI * (u - 0.7) / 0.25) : 0;
    s.legs[1] = { ...s.legs[1], ankle: new Vec3(-L * 0.28 * back, d.ankleH + L * 0.08 * lift, s.legs[1].ankle.z), planted: lift === 0 };
    s.mood = 'pain';
    s.mouth = h > 0.5 ? 0.7 : 0;
    s.cape = 0.08 - 0.25 * h;
    s.hair = -0.3 * h;
  }

  clip_die(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    const hit = keyframes(u, [[0, 0], [0.12, 1], [0.3, 0.6]]);
    const buckle = keyframes(u, [[0.15, 0], [0.4, 1], [1, 1]]);
    const fall = keyframes(u, [[0.3, 0], [0.75, 1.03], [0.85, 0.97], [1, 1]]);
    s.root = new Vec3(-L * 0.1 * hit, -L * 0.28 * buckle * (1 - fall * 0.7), 0);
    s.autoHeight = fall < 0.05;
    s.spine.pitch = -0.3 * hit + 0.35 * buckle * (1 - fall);
    s.neck.pitch = -0.2 * hit + 0.3 * buckle * (1 - fall) - 0.15 * fall;
    s.head.yaw = 0.4 * fall;
    // knees fold during the buckle, then the legs relax on the ground
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      s.legs[i] = { ankle: new Vec3(L * (0.05 + 0.12 * buckle) * (side > 0 ? 1 : 0.4), d.ankleH, side * d.hipZ * lerp(1.02, 1.4, fall)), pitch: 0.2 * fall, yaw: side * -0.3 * fall, planted: fall < 0.05 };
      const a = s.arms[i].angles;
      s.arms[i].angles = { ...a, swing: lerp(a.swing - 0.4 * hit, 0.5, fall), raise: lerp(a.raise + 0.6 * hit, 1.1, fall), elbow: lerp(a.elbow, 0.5, fall), twist: 0 };
    }
    s.fall = fall;
    s.mood = fall > 0.5 ? 'dead' : 'pain';
    s.mouth = hit > 0.5 && fall < 0.5 ? 0.7 : 0;
    s.cape = lerp(0.1, -0.5, fall);
    s.hair = 0.2 * fall;
    s.shadow = 1;
  }

  clip_sit(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    s.autoHeight = false;
    s.root = new Vec3(-L * 0.05, -(d.hipY - d.h * 0.42), 0);
    s.pelvis.pitch = -0.25;
    s.spine.pitch = 0.25;
    s.chest.pitch = 0.05 - 0.02 * Math.sin(TAU * u);
    s.neck.pitch = -0.05;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      s.legs[i] = { ankle: new Vec3(L * (this.rig.longSkirt ? 0.9 : 0.72), d.ankleH, side * d.hipZ * 1.25), pitch: 0, yaw: side * -0.2, planted: false, pole: new Vec3(0.4, 1, side * 0.25) };
      if ((side > 0 && this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') || (side < 0 && this.rig.offhand !== 'none')) continue;
      // hands rest on the knees
      s.arms[i] = { angles: s.arms[i].angles, target: new Vec3(L * 0.48, d.hipY - d.h * 0.42 + L * 0.42, side * d.hipZ * 1.25), pole: new Vec3(-0.3, -1, side * 0.6), fingers: new Vec3(1, -0.6, 0), thumb: new Vec3(0, 0.3, -side) };
    }
    s.blink = u >= 0.75 ? 1 : 0;
    s.cape = 0.5;
    s.skirt = this.rig.longSkirt ? -1.25 : -0.7;
    s.shadow = 1;
  }

  clip_wave(u: number, s: BipedState): void {
    this.breathe(s, u, 0.5);
    const w = Math.sin(2 * TAU * u);
    s.arms[1].angles = { swing: 0.25, raise: 2.45, twist: -1.35, elbow: 0.55 + 0.4 * w, flex: 0.15 * w, roll: 0 };
    s.chest.roll = -0.05;
    s.head.roll = 0.08;
    s.head.yaw = 0.1;
    s.mood = 'happy';
    s.mouth = u > 0.25 && u < 0.75 ? 0.2 : 0;
  }

  clip_cheer(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    const hop = Math.max(0, Math.sin(2 * TAU * u));
    s.root = new Vec3(0, L * 0.14 * hop - L * 0.06 * (1 - hop), 0);
    s.autoHeight = hop < 0.02;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      s.legs[i] = { ankle: new Vec3(0, d.ankleH + L * 0.12 * hop, side * d.hipZ * 1.1), pitch: -0.3 * hop, yaw: side * -0.12, planted: hop < 0.02 };
      const busy = (side > 0 && this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') || (side < 0 && this.rig.offhand !== 'none');
      s.arms[i].angles = { swing: busy ? 2.5 : 2.75, raise: 0.4 + 0.1 * hop, twist: 0.1, elbow: 0.2 + 0.25 * hop, flex: 0, roll: 0 };
    }
    if (this.rig.weapon !== 'none' && this.rig.weapon !== 'bow') s.weapon.pitch = 1.0;
    s.neck.pitch = -0.2;
    s.head.pitch = -0.1;
    s.mood = 'happy';
    s.mouth = 0.7;
    s.hair = 0.2 * hop;
    s.cape = 0.1 + 0.2 * hop;
    s.shadow = 1 - 0.2 * hop;
  }

  clip_pickup(u: number, s: BipedState): void {
    const L = this.L, d = this.rig.dims;
    const bend = keyframes(u, [[0, 0], [0.4, 1], [0.6, 1], [1, 0]]);
    s.root = new Vec3(-L * 0.18 * bend, -L * 0.36 * bend, 0);
    s.spine.pitch = 0.85 * bend;
    s.chest.pitch = 0.25 * bend;
    s.neck.pitch = -0.55 * bend;
    s.legs[0] = { ...s.legs[0], ankle: new Vec3(L * 0.12 * bend, d.ankleH, s.legs[0].ankle.z) };
    if (bend > 0.02) {
      const ground = new Vec3(L * 0.42, L * 0.06, d.shoulder.z * 0.6);
      const chest = new Vec3(L * 0.25, d.hipY + d.spineY + d.chestY - L * 0.1, d.shoulder.z * 0.6);
      const target = u < 0.5 ? Vec3.lerp(new Vec3(L * 0.1, d.hipY - L * 0.2, d.shoulder.z * 1.1), ground, saturate(u / 0.45)) : Vec3.lerp(ground, chest, saturate((u - 0.6) / 0.4));
      if (!(this.rig.weapon !== 'none' && this.rig.weapon !== 'bow')) s.arms[1] = { angles: s.arms[1].angles, target, pole: new Vec3(-0.5, 0, 1), fingers: new Vec3(0.3, -1, 0), thumb: new Vec3(1, 0, -0.3) };
    }
    s.hair = -0.2 * bend;
    s.cape = 0.08 + 0.3 * bend;
  }

  clip_talk(u: number, s: BipedState): void {
    this.breathe(s, u, 0.6);
    const g = Math.sin(TAU * u);
    if (!(this.rig.weapon !== 'none' && this.rig.weapon !== 'bow')) s.arms[1].angles = { swing: 0.45 + 0.15 * g, raise: 0.25 + 0.1 * Math.sin(2 * TAU * u), twist: 0.6, elbow: 1.35 + 0.15 * g, flex: -0.2, roll: 0.3 * g };
    if (this.rig.offhand === 'none' && this.rig.weapon !== 'bow') s.arms[0].angles = { swing: 0.25 - 0.1 * g, raise: 0.18, twist: 0.4, elbow: 0.9 - 0.2 * g, flex: 0, roll: 0 };
    s.head.pitch = 0.06 * Math.sin(2 * TAU * u);
    s.head.roll = 0.05 * g;
    s.chest.yaw = 0.06 * g;
    s.mouth = Math.floor(u * 8) % 2 === 0 ? 0.5 : 0;
    s.blink = u >= 0.62 && u < 0.75 ? 1 : 0;
  }
}

/** Interpolates a keyed path of points with eased segments. */
function pathAt(keys: [number, Vec3][], t: number): Vec3 {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, a] = keys[i - 1], [t1, b] = keys[i];
      return Vec3.lerp(a, b, easeInOut((t - t0) / Math.max(1e-9, t1 - t0)));
    }
  }
  return keys[keys.length - 1][1];
}

export const _test = { pathAt, clamp };
