/**
 * The biped skeleton shared by humans and humanoids: root → pelvis → spine → chest → neck → head,
 * two legs (thigh, shin, foot) and two arms (upper arm, forearm, hand), plus optional bones for a
 * held weapon, an off-hand item, cape, skirt, hair and tail chains.
 *
 * Limb bones are always placed from joint positions (IK / arm angles), with these frames:
 *  - thigh, shin, upper arm, forearm: X along the segment, Y towards the body's front;
 *  - foot: X towards the toes, Y up;
 *  - hand: X along the fingers, Y towards the thumb (a held weapon points along the hand's Y axis).
 */

import { AnatomyBuilder } from '../anatomy/builder';
import { Mat3, Vec3, Xform, segmentFrame, twoBoneIK } from '../core/math';

export type WeaponKind = 'none' | 'sword' | 'dagger' | 'axe' | 'mace' | 'hammer' | 'spear' | 'staff' | 'wand' | 'bow' | 'club';
export type OffhandKind = 'none' | 'shield' | 'buckler' | 'torch' | 'book' | 'lantern';

export interface BipedDims {
  /** Head height in pixels (the proportion unit). */
  h: number;
  height: number;
  hipY: number;
  /** Half the distance between the hip joints. */
  hipZ: number;
  lThigh: number;
  lShin: number;
  ankleH: number;
  /** Heel behind / ball and toe tip in front of the ankle. */
  heel: number;
  ball: number;
  toe: number;
  /** Right shoulder joint in the chest frame (the left one is mirrored). */
  shoulder: Vec3;
  lUpper: number;
  lFore: number;
  lHand: number;
  /** Rest offsets of spine, chest, neck and head along the torso (local Y). */
  spineY: number;
  chestY: number;
  neckY: number;
  headY: number;
  /** Half depth of the torso (for poses that touch the body). */
  torsoDepth: number;
  /** Forward lean of the rest posture (radians, hunched creatures). */
  hunch: number;
}

export interface BipedBones {
  root: number;
  pelvis: number;
  spine: number;
  chest: number;
  neck: number;
  head: number;
  /** [left, right] */
  upper: [number, number];
  fore: [number, number];
  hand: [number, number];
  thigh: [number, number];
  shin: [number, number];
  foot: [number, number];
  weapon: number;
  offhand: number;
  cape: number[];
  skirt: number;
  hair: number[];
  tail: number[];
  quiver: number;
}

export interface BipedTraits {
  /** 0 calm … 1 lively (tempo, amplitude). */
  energy: number;
  /** 0 light … 1 heavy (deeper steps, slower). */
  weight: number;
  /** Arm swing amount. */
  swing: number;
  /** Vertical bounce of the gait. */
  bounce: number;
  /** 0 child … 1 elder. */
  age: number;
  /** Rest posture 0 upright … 1 stooped. */
  posture: number;
  /** Walks on the toes (beast legs). */
  digitigrade: boolean;
  /** Feminine/masculine hip sway 0..1 (only a nuance of the walk). */
  sway: number;
}

export interface BipedRig {
  kind: 'biped';
  dims: BipedDims;
  bones: BipedBones;
  weapon: WeaponKind;
  offhand: OffhandKind;
  traits: BipedTraits;
  /** Grip transforms of the weapon / off-hand item relative to their hand bones. */
  weaponGrip: Xform;
  offhandGrip: Xform;
  /** The clothing hides the legs (long robe or dress): smaller steps look better. */
  longSkirt: boolean;
}

export const SIDES = [-1, 1] as const;

/** Arm pose by angles (in the chest frame). */
export interface ArmAngles {
  /** Forward (+) / backward (-) swing of the upper arm. */
  swing: number;
  /** Sideways raise away from the body. */
  raise: number;
  /** Rotation of the upper arm about its own axis (> 0 turns the forearm inwards). */
  twist: number;
  /** Elbow bend (0 straight). */
  elbow: number;
  /** Wrist bend towards the thumb side (> 0) and roll about the forearm. */
  flex: number;
  roll: number;
}

export const restArm = (): ArmAngles => ({ swing: 0.04, raise: 0.12, twist: 0, elbow: 0.18, flex: 0, roll: 0 });

/** Joint positions and frames of an arm posed by angles. */
export function armFromAngles(chest: Xform, shoulder: Vec3, side: number, d: BipedDims, a: ArmAngles): { sh: Vec3; el: Vec3; wr: Vec3; upper: Xform; fore: Xform; hand: Xform } {
  const C = chest.basis;
  const R = Mat3.rotZ(a.swing).mul(Mat3.rotX(-side * a.raise));
  const armDir = C.apply(R.apply(new Vec3(0, -1, 0))).norm();
  let front = C.apply(R.apply(new Vec3(1, 0, 0))).norm();
  if (a.twist) front = Mat3.axisAngle(armDir, -side * a.twist).apply(front);
  const sh = shoulder;
  const el = sh.addScaled(armDir, d.lUpper);
  const ce = Math.cos(a.elbow), se = Math.sin(a.elbow);
  const foreDir = armDir.mul(ce).add(front.mul(se)).norm();
  const foreFront = armDir.mul(-se).add(front.mul(ce)).norm();
  const wr = el.addScaled(foreDir, d.lFore);
  // wrist: flex bends the hand towards the thumb side, roll turns it about the forearm
  let hx = foreDir, hy = foreFront;
  if (a.flex) {
    const lat = foreDir.cross(foreFront);
    const r = Mat3.axisAngle(lat, a.flex);
    hx = r.apply(hx);
    hy = r.apply(hy);
  }
  if (a.roll) {
    const r = Mat3.axisAngle(hx, side * a.roll);
    hy = r.apply(hy);
  }
  return {
    sh, el, wr,
    upper: segmentFrame(sh, el, front),
    fore: segmentFrame(el, wr, foreFront),
    hand: new Xform(Mat3.lookAlong(hx, hy), wr),
  };
}

/**
 * Arm reaching a target with IK. The hand is oriented by `thumb` (kept exactly: a held weapon
 * points along it) and `fingers` (made perpendicular; default: continue the forearm).
 */
export function armFromTarget(shoulder: Vec3, target: Vec3, pole: Vec3, d: BipedDims, fingers?: Vec3, thumb?: Vec3): { sh: Vec3; el: Vec3; wr: Vec3; upper: Xform; fore: Xform; hand: Xform } {
  const { mid, end } = twoBoneIK(shoulder, target, d.lUpper, d.lFore, pole);
  const foreDir = end.sub(mid).norm();
  const fore = segmentFrame(mid, end, pole);
  let basis: Mat3;
  if (thumb) {
    const y = thumb.norm(Vec3.Y);
    let x = fingers ?? foreDir;
    x = x.sub(y.mul(x.dot(y)));
    if (x.lengthSq < 1e-6) x = foreDir.sub(y.mul(foreDir.dot(y)));
    if (x.lengthSq < 1e-6) x = y.cross(Vec3.Z);
    x = x.norm(Vec3.X);
    basis = Mat3.fromCols(x, y, x.cross(y));
  } else basis = Mat3.lookAlong(fingers ?? foreDir, fore.basis.c1);
  return { sh: shoulder, el: mid, wr: end, upper: segmentFrame(shoulder, mid, pole), fore, hand: new Xform(basis, end) };
}

/** Frame of a foot with its ankle at `ankle`, pitched (toe up > 0) and turned (yaw > 0 to the left). */
export function footFrame(ankle: Vec3, pitch: number, yaw: number, bodyYaw = 0): Xform {
  const r = Mat3.rotY(yaw + bodyYaw).mul(Mat3.rotZ(pitch));
  return new Xform(r, ankle);
}

/**
 * Where a held item sits in the hand: in the palm, its X axis along the hand's thumb direction
 * (Y), its Y axis back along the hand. Weapons are modelled in this frame: grip at the origin,
 * blade or shaft along +X, cutting edge towards -Y (the fingers).
 */
export function gripXform(d: BipedDims): Xform {
  return new Xform(Mat3.rotZ(Math.PI / 2), new Vec3(d.lHand * 0.5, 0, 0));
}

/**
 * Builds the bones of a biped in its rest pose. `sideOut` slightly opens the rest arms so they do
 * not sink into wide hips.
 */
export function buildBipedSkeleton(b: AnatomyBuilder, d: BipedDims, opts: { tail?: number; hairChain?: { origin: Vec3; seg: number; count: number }; cape?: boolean; skirt?: boolean; quiver?: boolean }): BipedBones {
  const root = b.bone('root', -1, Xform.I);
  const pelvis = b.bone('pelvis', root, Xform.at(0, d.hipY, 0, Mat3.rotZ(-d.hunch * 0.4)));
  const spine = b.bone('spine', pelvis, Xform.at(0, d.spineY, 0, Mat3.rotZ(-d.hunch * 0.3)));
  const chest = b.bone('chest', spine, Xform.at(0, d.chestY, 0, Mat3.rotZ(-d.hunch * 0.3)));
  const neck = b.bone('neck', chest, Xform.at(d.hunch * d.h * 0.2, d.neckY, 0, Mat3.rotZ(d.hunch * 0.7)));
  const head = b.bone('head', neck, Xform.at(0, d.headY, 0, Mat3.rotZ(d.hunch * 0.3)));

  const pw = b.restWorld(pelvis), cw = b.restWorld(chest);
  const upper: number[] = [], fore: number[] = [], hand: number[] = [];
  const thigh: number[] = [], shin: number[] = [], foot: number[] = [];
  for (const side of SIDES) {
    const n = side < 0 ? 'L' : 'R';
    const shoulder = cw.point(new Vec3(d.shoulder.x, d.shoulder.y, side * d.shoulder.z));
    const arm = armFromAngles(cw, shoulder, side, d, restArm());
    upper.push(b.boneAt('upperArm' + n, chest, arm.upper));
    fore.push(b.boneAt('forearm' + n, upper[upper.length - 1], arm.fore));
    hand.push(b.boneAt('hand' + n, fore[fore.length - 1], arm.hand));

    const hip = pw.point(new Vec3(0, 0, side * d.hipZ));
    const ankle = new Vec3(0, d.ankleH, side * d.hipZ * 1.02);
    const { mid: knee, end } = twoBoneIK(hip, ankle, d.lThigh, d.lShin, new Vec3(1, 0, 0));
    thigh.push(b.boneAt('thigh' + n, pelvis, segmentFrame(hip, knee, Vec3.X)));
    shin.push(b.boneAt('shin' + n, thigh[thigh.length - 1], segmentFrame(knee, end, Vec3.X)));
    foot.push(b.boneAt('foot' + n, shin[shin.length - 1], footFrame(end, 0, side * -0.12)));
  }

  const weapon = b.bone('weapon', hand[1], gripXform(d));
  const offhand = b.bone('offhand', hand[0], gripXform(d));
  const cape: number[] = [];
  if (opts.cape) {
    const c0 = b.bone('cape0', chest, Xform.at(-d.torsoDepth * 0.9, d.shoulder.y + d.h * 0.12, 0));
    cape.push(c0);
  }
  const skirt = opts.skirt ? b.bone('skirt', pelvis, Xform.at(0, -d.h * 0.1, 0)) : -1;
  const hair: number[] = [];
  if (opts.hairChain) {
    const hc = opts.hairChain;
    let parent = head;
    for (let i = 0; i < hc.count; i++) {
      const bi = b.bone('hair' + i, parent, i === 0 ? new Xform(Mat3.I, hc.origin) : Xform.at(0, -hc.seg, 0));
      hair.push(bi);
      parent = bi;
    }
  }
  const tail: number[] = [];
  if (opts.tail) {
    let parent = pelvis;
    const seg = opts.tail;
    for (let i = 0; i < seg; i++) {
      const bi = b.bone('tail' + i, parent, i === 0 ? Xform.at(-d.torsoDepth * 0.8, -d.h * 0.1, 0, Mat3.rotZ(Math.PI * 0.62)) : Xform.at(d.h * 0.55, 0, 0, Mat3.rotZ(-0.12)));
      tail.push(bi);
      parent = bi;
    }
  }
  const quiver = opts.quiver ? b.bone('quiver', chest, Xform.at(-d.torsoDepth * 1.05, d.h * 0.1, 0, Mat3.rotX(-0.45))) : -1;
  return {
    root, pelvis, spine, chest, neck, head,
    upper: upper as [number, number], fore: fore as [number, number], hand: hand as [number, number],
    thigh: thigh as [number, number], shin: shin as [number, number], foot: foot as [number, number],
    weapon, offhand, cape, skirt, hair, tail, quiver,
  };
}
