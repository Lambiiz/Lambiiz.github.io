/**
 * Human-shaped bodies with natural proportions, and everything they wear and carry.
 *
 * Proportions are built from the head height h (the classic figure-drawing unit): an adult is
 * about 7.3 heads tall, a child about 5.4. Landmarks (hip joint, knee, waist, shoulders, chin) sit
 * where they do on a real body, so a sprite reads as an ordinary person, not a chibi.
 *
 * Clothes are fitted to the body: shirts and armour are enlarged copies of the torso ellipsoids,
 * sleeves and trousers enlarged copies of the limb cones, skirts are bell-shaped domes hanging from
 * the waist, hair and hats are shells around the skull cut by hairline / face-opening planes.
 */

import { Domain, GF, PF, type Plane, type PrimDef } from '../anatomy/anatomy';
import { AnatomyBuilder, type PrimOpts } from '../anatomy/builder';
import { SIDES, buildBipedSkeleton, gripXform, type BipedBones, type BipedDims, type OffhandKind, type WeaponKind } from '../anim/bipedRig';
import { Mat3, Vec3, lerp } from '../core/math';

export interface Shell {
  bone: number;
  center: Vec3;
  radii: Vec3;
}

export interface BodySpec {
  /** Total height in pixels. */
  H: number;
  /** Height in heads (7.3 adult, 5.4 child). */
  heads: number;
  /** 0..1 leg length, 0.5 average. */
  legs: number;
  mass: number;
  muscle: number;
  /** 0 broad shoulders / narrow hips … 1 narrow shoulders / wide hips. */
  frame: number;
  bust: number;
  belly: number;
  headWidth: number;
  jaw: number;
  nose: number;
  eyeSize: number;
  /** Forward stoop (radians). */
  hunch: number;
  /** Arm length multiplier (1 = human). */
  arms?: number;
  ears?: 'round' | 'pointed' | 'long' | 'none';
  /** Snout length in heads (0 = flat human face). */
  snout?: number;
  /** Feet: plantigrade (human) or long beast feet. */
  digitigrade?: boolean;
  eyeStyle?: string;
  /** No mouth / brow features (masked faces, skeletons). */
  noFace?: boolean;
  skin?: string;
  /** 0..1: thinner limbs and torso (skeletons, gaunt undead). */
  thin?: number;
  /** Body parts fully hidden by clothing: their skin is not built (no poke-through at joints). */
  covered?: Set<'torso' | 'pelvis' | 'upper' | 'fore' | 'hand' | 'thigh' | 'shin' | 'foot'>;
}

export interface HumanBody {
  b: AnatomyBuilder;
  d: BipedDims;
  B: BipedBones;
  h: number;
  spec: BodySpec;
  pelvis: Shell;
  waist: Shell;
  chest: Shell;
  girdle: Shell;
  bust: Shell[];
  skull: Shell;
  jaw: Shell;
  /** Head-local centre of the cranium. */
  C: Vec3;
  r: { thigh: number; knee: number; calf: number; ankle: number; upper: number; elbow: number; fore: number; wrist: number; hand: number; neck: number };
  groups: { body: number; head: number; arm: [number, number]; leg: [number, number] };
  /** World height of the natural waist. */
  waistY: number;
}

/** Minimum garment thickness: one pixel layer at least, so clothes never z-fight the skin. */
const inflateBy = (body: HumanBody, k: number) => Math.max(0.55, body.h * k);

export function buildHumanBody(b: AnatomyBuilder, spec: BodySpec, skel: Parameters<typeof buildBipedSkeleton>[2]): HumanBody {
  const H = spec.H;
  const h = H / spec.heads;
  const thin = lerp(1, 0.55, spec.thin ?? 0), thinT = lerp(1, 0.78, spec.thin ?? 0);
  const Bc = H - h; // chin height
  const mF = lerp(0.84, 1.42, spec.mass);
  const fr = spec.frame;
  const legF = lerp(0.965, 1.045, spec.legs);
  const hipY = 0.612 * Bc * legF;
  const ankleH = 0.052 * Bc;
  const legSpan = hipY - ankleH;
  const waistY = lerp(0.715, 0.73, fr) * Bc;
  const chestBoneY = 0.83 * Bc;
  const shoulderY = Bc - 0.4 * h;
  const neckY = Bc - 0.14 * h;
  const armF = spec.arms ?? 1;
  const d: BipedDims = {
    h, height: H, hipY,
    hipZ: lerp(0.35, 0.42, fr) * h * Math.pow(mF, 0.3),
    lThigh: legSpan * 0.522,
    lShin: legSpan * 0.483,
    ankleH,
    heel: 0.26 * h,
    ball: spec.digitigrade ? 0.55 * h : 0.68 * h,
    toe: spec.digitigrade ? 0.8 * h : 0.92 * h,
    shoulder: new Vec3(-0.04 * h, shoulderY - chestBoneY, lerp(0.84, 0.7, fr) * h * (1 + 0.08 * spec.muscle) * Math.pow(mF, 0.25)),
    lUpper: 0.216 * Bc * armF,
    lFore: 0.172 * Bc * armF,
    lHand: 0.1 * Bc * armF,
    spineY: waistY - hipY,
    chestY: chestBoneY - waistY,
    neckY: neckY - chestBoneY,
    headY: 0.19 * h,
    torsoDepth: 0.5 * h * mF,
    hunch: spec.hunch,
  };
  const B = buildBipedSkeleton(b, d, skel);

  const blend = Math.max(1.2, h * 0.32);
  const body = b.group('body', blend, { flags: GF.CreaseShade });
  const head = b.group('head', Math.max(1, h * 0.18));
  const skin = spec.skin ?? 'skin';
  const bodyO: PrimOpts = { domain: Domain.Body, domainLen: H * 0.5 };
  const cov = spec.covered ?? new Set();

  // ---- torso
  const pelvis: Shell = { bone: B.pelvis, center: new Vec3(-0.05 * h, -0.02 * h, 0), radii: new Vec3(0.5 * h * Math.pow(mF, 0.8) * thinT, 0.5 * h, lerp(0.6, 0.78, fr) * h * Math.pow(mF, 0.7) * thinT) };
  const waist: Shell = { bone: B.spine, center: new Vec3(spec.belly * 0.12 * h, 0.05 * h, 0), radii: new Vec3(0.42 * h * mF * (1 + 0.32 * spec.belly) * thinT * thinT, 0.62 * h, lerp(0.54, 0.48, fr) * h * mF * (1 + 0.18 * spec.belly) * thinT * thinT) };
  const chest: Shell = { bone: B.chest, center: new Vec3(0, 0.02 * h, 0), radii: new Vec3(0.5 * h * Math.pow(mF, 0.8) * (1 + 0.06 * spec.muscle) * thinT, 0.7 * h, lerp(0.7, 0.6, fr) * h * Math.pow(mF, 0.7) * (1 + 0.1 * spec.muscle) * thinT) };
  const girdle: Shell = { bone: B.chest, center: new Vec3(-0.06 * h, d.shoulder.y - 0.02 * h, 0), radii: new Vec3(0.36 * h * (1 + 0.15 * spec.muscle), 0.2 * h, d.shoulder.z * 0.95 + 0.06 * h) };
  if (!cov.has('pelvis')) b.ellipsoid(body, pelvis.bone, pelvis.center, pelvis.radii, skin, { ...bodyO, tag: 'pelvis' });
  if (!cov.has('torso')) for (const s of [waist, chest, girdle]) b.ellipsoid(body, s.bone, s.center, s.radii, skin, { ...bodyO, tag: 'torso' });
  const bust: Shell[] = [];
  if (spec.bust > 0.08) {
    const r = (0.13 + 0.12 * spec.bust) * h * Math.pow(mF, 0.5);
    for (const side of SIDES) {
      const s: Shell = { bone: B.chest, center: new Vec3(chest.radii.x * 0.62, -0.18 * h, side * 0.27 * h), radii: new Vec3(r * 0.95, r, r) };
      bust.push(s);
      if (!cov.has('torso')) b.ellipsoid(body, s.bone, s.center, s.radii, skin, { ...bodyO, tag: 'bust' });
    }
  }

  // ---- neck & head
  const rNeck = 0.24 * h * (1 + 0.25 * spec.muscle) * Math.pow(mF, 0.3);
  b.cone(body, B.chest, new Vec3(-0.03 * h, d.neckY - 0.05 * h, 0), rNeck * 1.1, B.head, new Vec3(-0.04 * h, 0.12 * h, 0), rNeck * 0.9, skin, { domain: Domain.Neck, domainLen: h });
  const C = new Vec3(-0.03 * h, 0.5 * h, 0);
  const hw = lerp(0.9, 1.08, spec.headWidth);
  const skull: Shell = { bone: B.head, center: C, radii: new Vec3(0.53 * h, 0.48 * h, 0.41 * h * hw) };
  const jaw: Shell = { bone: B.head, center: new Vec3(0.1 * h, 0.26 * h, 0), radii: new Vec3(0.36 * h, 0.27 * h, lerp(0.27, 0.34, spec.jaw) * h * hw) };
  const headO: PrimOpts = { domain: Domain.Head, domainLen: h };
  b.ellipsoid(head, B.head, skull.center, skull.radii, skin, headO);
  b.ellipsoid(head, B.head, jaw.center, jaw.radii, skin, headO);
  const snout = spec.snout ?? 0;
  if (snout > 0.05) {
    b.ellipsoid(head, B.head, new Vec3(0.3 * h + snout * h * 0.5, 0.3 * h, 0), new Vec3(snout * h * 0.6 + 0.15 * h, 0.2 * h, 0.22 * h * hw), skin, headO);
  } else {
    // the nose: what makes a profile read as a person
    const nz = lerp(0.8, 1.35, spec.nose);
    b.ellipsoid(head, B.head, new Vec3(0.5 * h, 0.4 * h, 0), new Vec3(0.11 * h * nz, 0.12 * h * nz, 0.075 * h * nz), skin, { ...headO, tag: 'nose' });
  }
  const ears = spec.ears ?? 'round';
  for (const side of SIDES) {
    if (ears === 'none') break;
    if (ears === 'round') b.ellipsoid(head, B.head, new Vec3(-0.06 * h, 0.45 * h, side * 0.38 * h * hw), new Vec3(0.08 * h, 0.13 * h, 0.06 * h), skin, { ...headO, side });
    else {
      const len = ears === 'long' ? 0.75 : 0.42;
      b.cone(head, B.head, new Vec3(-0.06 * h, 0.44 * h, side * 0.38 * h * hw), 0.1 * h, B.head, new Vec3(-0.22 * h, 0.62 * h + len * 0.2 * h, side * (0.42 + len) * h * hw), 0.035 * h, skin, { ...headO, side });
    }
  }

  // ---- face features
  const eyeY = 0.5 * h, eyeX = snout > 0.05 ? 0.4 * h : 0.43 * h;
  for (const side of SIDES) {
    b.feature('eye', B.head, new Vec3(eyeX, eyeY, side * 0.17 * h * hw), new Vec3(1, 0.05, side * 0.42), Math.max(1, h * 0.11 * lerp(0.85, 1.25, spec.eyeSize)), { aspect: 1.35, style: spec.eyeStyle ?? 'human', side, slot: 'eye' });
    if (h >= 10.5 && !spec.noFace) b.feature('brow', B.head, new Vec3(eyeX + 0.02 * h, eyeY + 0.14 * h, side * 0.18 * h * hw), new Vec3(1, 0.15, side * 0.4), h * 0.12, { aspect: 1.6, side, slot: 'hair' });
  }
  if (!spec.noFace && h >= 7.5) b.feature('mouth', B.head, new Vec3(snout > 0.05 ? 0.35 * h + snout * h : 0.42 * h, 0.24 * h, 0), new Vec3(1, -0.05, 0), Math.max(1, h * 0.09), { aspect: 1.4, slot: 'lip' });

  // ---- arms
  const upperR = 0.19 * h * (1 + 0.35 * spec.muscle) * Math.pow(mF, 0.5);
  const r = {
    thigh: 0.35 * h * Math.pow(mF, 0.65) * (1 + 0.08 * spec.muscle),
    knee: 0.19 * h * Math.pow(mF, 0.35),
    calf: 0.21 * h * Math.pow(mF, 0.45) * (1 + 0.1 * spec.muscle),
    ankle: 0.12 * h,
    upper: upperR,
    elbow: 0.14 * h * Math.pow(mF, 0.4),
    fore: 0.155 * h * (1 + 0.2 * spec.muscle) * Math.pow(mF, 0.35),
    wrist: 0.1 * h,
    hand: 0.125 * h,
    neck: rNeck,
  };
  if (thin !== 1) for (const k of Object.keys(r) as (keyof typeof r)[]) r[k] *= k === 'hand' || k === 'neck' ? lerp(1, thin, 0.6) : thin;
  const arm: number[] = [], leg: number[] = [];
  for (let i = 0; i < 2; i++) {
    const side = SIDES[i];
    const ga = b.group('arm' + (side < 0 ? 'L' : 'R'), Math.max(0.8, h * 0.12), { side });
    arm.push(ga);
    const lo: PrimOpts = { domain: Domain.Limb, domainLen: d.lUpper + d.lFore, side };
    if (!cov.has('upper')) {
      b.cone(ga, B.upper[i], Vec3.ZERO, r.upper, B.fore[i], Vec3.ZERO, r.elbow, skin, { ...lo, u0: 0, u1: 0.5 });
      b.ellipsoid(ga, B.upper[i], new Vec3(d.lUpper * 0.12, 0, 0), new Vec3(d.lUpper * 0.32, r.upper * 1.18, r.upper * 1.2), skin, lo);
    }
    if (!cov.has('fore')) b.cone(ga, B.fore[i], Vec3.ZERO, r.fore, B.hand[i], Vec3.ZERO, r.wrist, skin, { ...lo, u0: 0.5, u1: 0.95 });
    if (!cov.has('hand')) b.ellipsoid(ga, B.hand[i], new Vec3(d.lHand * 0.45, 0, 0), new Vec3(d.lHand * 0.5, r.hand, r.hand * 0.6), skin, { ...lo, tag: 'hand' });
    const gl = b.group('leg' + (side < 0 ? 'L' : 'R'), Math.max(0.8, h * 0.14), { side });
    leg.push(gl);
    const lg: PrimOpts = { domain: Domain.Limb, domainLen: hipY, side };
    if (!cov.has('thigh')) b.cone(gl, B.thigh[i], new Vec3(0, 0, -side * 0.04 * h), r.thigh, B.shin[i], Vec3.ZERO, r.knee, skin, { ...lg, u0: 0, u1: 0.5 });
    if (!cov.has('shin')) {
      b.ellipsoid(gl, B.shin[i], new Vec3(d.lShin * 0.3, -0.05 * h, 0), new Vec3(d.lShin * 0.3, r.calf, r.calf * 0.95), skin, { ...lg, u0: 0.5, u1: 0.7 });
      b.cone(gl, B.shin[i], Vec3.ZERO, r.knee * 0.95, B.foot[i], Vec3.ZERO, r.ankle, skin, { ...lg, u0: 0.5, u1: 0.95 });
    }
    if (!cov.has('foot')) footPrims(b, gl, B.foot[i], d, r.ankle, skin, side, spec.digitigrade);
  }
  return {
    b, d, B, h, spec, pelvis, waist, chest, girdle, bust, skull, jaw, C, r,
    groups: { body, head, arm: arm as [number, number], leg: leg as [number, number] },
    waistY,
  };
}

function footPrims(b: AnatomyBuilder, g: number, foot: number, d: BipedDims, ankleR: number, slot: string, side: number, digi?: boolean, inflate = 0): void {
  const h = d.h;
  const o: PrimOpts = { domain: Domain.Limb, side, u0: 0.95, u1: 1, flags: PF.ShadowCaster };
  const w = 0.14 * h + inflate;
  if (digi) {
    b.cone(g, foot, new Vec3(-0.1 * h, -0.02 * h, 0), ankleR + inflate, foot, new Vec3(d.ball, -d.ankleH + 0.1 * h, 0), w * 0.9, slot, o);
    b.ellipsoid(g, foot, new Vec3(d.ball + 0.05 * h, -d.ankleH + 0.08 * h, 0), new Vec3(0.2 * h + inflate, 0.09 * h + inflate * 0.6, w), slot, o);
    return;
  }
  b.cone(g, foot, new Vec3(-d.heel + 0.1 * h, -d.ankleH + 0.11 * h, 0), 0.11 * h + inflate, foot, new Vec3(d.ball * 0.85, -d.ankleH + 0.09 * h, 0), 0.1 * h + inflate, slot, o);
  b.ellipsoid(g, foot, new Vec3(d.ball * 0.85, -d.ankleH + 0.08 * h, 0), new Vec3(0.3 * h + inflate, 0.085 * h + inflate * 0.6, w), slot, o);
}

// =============================================================================================
// garments
// =============================================================================================

function shell(body: HumanBody, g: number, s: Shell, inflate: number, slot: string, o: PrimOpts = {}): PrimDef {
  return body.b.ellipsoid(g, s.bone, s.center, s.radii.add(new Vec3(inflate, inflate * 0.6, inflate)), slot, { domain: Domain.Body, domainLen: body.d.height * 0.5, ...o });
}

export type Top = 'none' | 'shirt' | 'tunic' | 'vest' | 'coat' | 'robe' | 'dress' | 'leather' | 'chainmail' | 'plate' | 'rags';
export type Sleeves = 'none' | 'short' | 'long';
export type Bottom = 'trousers' | 'shorts' | 'skirt' | 'longskirt' | 'leggings' | 'loincloth' | 'none';
export type Shoes = 'barefoot' | 'shoes' | 'boots' | 'tallboots' | 'sandals';

/**
 * A bell-shaped skirt (or coat tail, tunic hem, robe) hanging from the waist on the skirt bone:
 * the upper part of an ellipsoid centred at the hem, cut at the waist and the hem.
 */
export function skirt(body: HumanBody, g: number, slot: string, len: number, flare: number, o: { clips?: Plane[]; capShade?: number; inflate?: number; topY?: number } = {}): PrimDef {
  const { b, d, h, B } = body;
  const bone = B.skirt >= 0 ? B.skirt : B.pelvis;
  const top = o.topY ?? body.waistY - 0.25 * h;
  const hem = Math.max(d.ankleH * 0.6, top - len);
  const inf = o.inflate ?? inflateBy(body, 0.06);
  const wTop = Math.max(body.pelvis.radii.z, body.waist.radii.z) + inf;
  const dTop = Math.max(body.pelvis.radii.x, body.waist.radii.x) + inf;
  const wHem = wTop + flare * h + 0.05 * h;
  const dHem = dTop + flare * h * 0.85 + 0.05 * h;
  const k = Math.min(0.97, wTop / wHem);
  const ry = (top - hem) / Math.sqrt(1 - k * k);
  const center = new Vec3(-0.04 * h, hem, 0);
  const clips: Plane[] = [{ n: new Vec3(0, 1, 0), d: top + 0.02 * h }, { n: new Vec3(0, -1, 0), d: -hem }, ...(o.clips ?? [])];
  return b.ellipsoidW(g, bone, center, new Vec3(dHem, ry, wHem), slot, { domain: Domain.Body, clips, capShade: o.capShade ?? -1, tag: 'skirt' });
}

export function dressTorso(body: HumanBody, top: Top, sleeves: Sleeves, s: { top: string; second: string; trim: string }): void {
  const { b, B, d, h, r } = body;
  if (top === 'none') return;
  const g = b.group('top', body.d.h * 0.3, { flags: GF.CreaseShade });
  const metal = top === 'plate';
  const mail = top === 'chainmail';
  const mainSlot = top === 'leather' ? 'leather' : metal ? 'metal' : mail ? 'mail' : s.top;
  const layered = metal || mail || top === 'leather' || top === 'vest';
  const underInf = inflateBy(body, 0.05);
  // an outer layer sits clearly above the one below (no z-fighting between layers)
  const inf = layered ? underInf + Math.max(0.6, h * (metal ? 0.1 : 0.06)) : inflateBy(body, top === 'coat' ? 0.08 : 0.055);
  const torso = [body.waist, body.chest, body.girdle];
  // armour and mail are worn over a shirt
  if (layered) {
    const under = b.group('undershirt', body.d.h * 0.3);
    for (const sh of torso) shell(body, under, sh, underInf, s.second);
  }
  for (const sh of torso) shell(body, g, sh, inf, mainSlot, { flags: metal ? PF.NoPattern : 0 });
  for (const sh of body.bust) shell(body, g, sh, inf, mainSlot);
  if (top === 'vest') {
    // the open front shows the shirt underneath
    const fg = b.group('shirtfront', 0, { depthBias: 0.4 });
    b.ellipsoid(fg, B.chest, new Vec3(body.chest.radii.x + inf * 0.6, 0.05 * h, 0), new Vec3(0.12 * h, body.chest.radii.y * 0.85, 0.13 * h), s.second, { flags: PF.NoPattern });
    b.ellipsoid(fg, B.spine, new Vec3(body.waist.center.x + body.waist.radii.x + inf * 0.4, 0.15 * h, 0), new Vec3(0.1 * h, body.waist.radii.y * 0.6, 0.11 * h), s.second, { flags: PF.NoPattern });
  }
  if (top === 'rags') {
    // torn hem: a ragged skirt with uneven cuts
    skirt(body, g, s.top, h * 1.1, 0.1, { clips: [{ n: new Vec3(0.3, -1, 0.4).norm(), d: -(body.waistY - h * 1.6) }] });
  }
  if (top === 'tunic') skirt(body, g, s.top, h * 1.45, 0.07);
  if (top === 'coat') {
    // open in front: the tails hang behind the legs, their inside is dark
    skirt(body, g, s.top, (d.hipY - d.ankleH) * 0.62 + h * 0.25, 0.16, { clips: [{ n: new Vec3(1, 0, 0), d: -0.08 * h }], capShade: -2 });
    // collar
    b.ellipsoid(g, B.chest, new Vec3(-0.06 * h, d.neckY - 0.02 * h, 0), new Vec3(r.neck + 0.16 * h, 0.13 * h, r.neck + 0.18 * h), s.trim);
  }
  if (top === 'robe') skirt(body, g, s.top, body.waistY - d.ankleH * 0.4, 0.2);
  if (top === 'dress') skirt(body, g, s.top, (body.waistY - d.ankleH) * 0.72, 0.28);
  if (top === 'chainmail') skirt(body, g, 'mail', h * 1.6, 0.08, { inflate: inf });
  if (top === 'leather') skirt(body, g, 'leather', h * 1.0, 0.07, { capShade: -1, inflate: inf });
  if (metal) {
    skirt(body, g, 'metal', h * 1.05, 0.1, { inflate: inf });
    // pauldrons
    for (let i = 0; i < 2; i++) {
      b.ellipsoid(b.group('pauldron', 0, { side: SIDES[i], depthBias: 0.3 }), B.upper[i], new Vec3(d.lUpper * 0.05, 0, 0), new Vec3(d.lUpper * 0.32, r.upper * 1.7, r.upper * 1.75), 'metal', { side: SIDES[i], flags: PF.NoPattern });
    }
  }
  if (top === 'robe' || top === 'dress' || top === 'tunic' || top === 'coat') {
    // trim at the neckline
    b.ellipsoid(g, B.chest, new Vec3(0.02 * h, d.neckY - 0.08 * h, 0), new Vec3(r.neck + 0.12 * h, 0.07 * h, r.neck + 0.14 * h), s.trim);
  }
  // sleeves
  const sl: Sleeves = metal || mail ? 'short' : top === 'robe' || top === 'coat' ? 'long' : sleeves;
  const sleeveSlot = top === 'vest' || top === 'leather' ? s.second : mainSlot;
  if (sl === 'none' && top !== 'vest' && top !== 'leather') return;
  for (let i = 0; i < 2; i++) {
    const side = SIDES[i];
    const gs = b.group('sleeve', body.d.h * 0.1, { side });
    const si = inflateBy(body, 0.05);
    const slv = top === 'vest' || top === 'leather' ? (sleeves === 'none' ? 'none' : sleeves) : sl;
    if (slv === 'none') continue;
    const end = slv === 'short' ? 0.55 : 1;
    b.cone(gs, B.upper[i], new Vec3(-0.05 * h, 0, 0), r.upper + si + 0.04 * h, B.upper[i], new Vec3(d.lUpper * end, 0, 0), lerp(r.upper, r.elbow, end) + si, sleeveSlot, { side, domain: Domain.Limb });
    b.ellipsoid(gs, B.upper[i], new Vec3(d.lUpper * 0.12, 0, 0), new Vec3(d.lUpper * 0.33, r.upper * 1.18 + si, r.upper * 1.2 + si), sleeveSlot, { side, domain: Domain.Limb });
    if (slv === 'long') {
      const wide = top === 'robe';
      b.cone(gs, B.fore[i], Vec3.ZERO, r.elbow + si, B.fore[i], new Vec3(d.lFore * 0.94, 0, 0), (wide ? r.wrist + 0.32 * h : r.wrist + si * 1.4), sleeveSlot, { side, domain: Domain.Limb, capShade: -2 });
      if (!wide) b.cone(gs, B.fore[i], new Vec3(d.lFore * 0.84, 0, 0), r.wrist + si * 2, B.fore[i], new Vec3(d.lFore * 0.94, 0, 0), r.wrist + si * 2, top === 'coat' ? s.trim : sleeveSlot, { side });
    }
  }
}

export function dressLegs(body: HumanBody, bottom: Bottom, shoes: Shoes, pantsSlot: string, opts: { greaves?: boolean } = {}): void {
  const { b, B, d, h, r } = body;
  const inf = inflateBy(body, 0.05);
  if (bottom !== 'none' && bottom !== 'skirt' && bottom !== 'longskirt' && bottom !== 'loincloth') {
    const gp = b.group('pants', body.d.h * 0.28, { flags: GF.CreaseShade });
    shell(body, gp, body.pelvis, inf, pantsSlot);
    const tight = bottom === 'leggings' ? 0.5 : 1;
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const gl = b.group('pantleg', body.d.h * 0.1, { side });
      const end = bottom === 'shorts' ? 0.55 : 1;
      b.cone(gl, B.thigh[i], new Vec3(0, 0, -side * 0.04 * h), r.thigh + inf * tight, end < 1 ? B.thigh[i] : B.shin[i], end < 1 ? new Vec3(d.lThigh * end, 0, 0) : Vec3.ZERO, (end < 1 ? lerp(r.thigh, r.knee, end) : r.knee) + inf * tight, pantsSlot, { side, domain: Domain.Limb });
      if (end === 1) {
        b.ellipsoid(gl, B.shin[i], new Vec3(d.lShin * 0.3, -0.05 * h, 0), new Vec3(d.lShin * 0.3, r.calf + inf * tight, r.calf * 0.95 + inf * tight), pantsSlot, { side, domain: Domain.Limb });
        b.cone(gl, B.shin[i], Vec3.ZERO, r.knee + inf * tight, B.shin[i], new Vec3(d.lShin * 0.97, 0, 0), r.ankle + inf * tight * 1.3, pantsSlot, { side, domain: Domain.Limb });
      }
    }
  }
  if (bottom === 'skirt' || bottom === 'longskirt') {
    const g = b.group('skirt', body.d.h * 0.2);
    shell(body, g, body.pelvis, inf, pantsSlot);
    skirt(body, g, pantsSlot, bottom === 'skirt' ? (body.waistY - d.ankleH) * 0.42 : body.waistY - d.ankleH * 0.6, bottom === 'skirt' ? 0.22 : 0.24);
  }
  if (bottom === 'loincloth') {
    const g = b.group('loincloth', 0);
    shell(body, g, { ...body.pelvis, radii: body.pelvis.radii.mul(0.98) }, inf, pantsSlot, { clips: [{ n: new Vec3(0, 1, 0), d: 0.1 * h }] });
    skirt(body, g, pantsSlot, h * 1.2, 0.05, { clips: [{ n: new Vec3(0, 0, 1), d: 0.22 * h }, { n: new Vec3(0, 0, -1), d: 0.22 * h }] });
  }
  // footwear
  for (let i = 0; i < 2; i++) {
    const side = SIDES[i];
    if (shoes === 'barefoot') continue;
    const gf = b.group('shoe', body.d.h * 0.1, { side, depthBias: 0.05 });
    const slot = opts.greaves ? 'metal' : 'boots';
    const si = inflateBy(body, 0.045);
    footPrims(b, gf, B.foot[i], d, r.ankle + si, shoes === 'sandals' ? 'leather' : slot, side, body.spec.digitigrade, si);
    if (shoes === 'sandals') continue;
    const top = opts.greaves ? 0.05 : shoes === 'tallboots' ? 0.12 : shoes === 'boots' ? 0.5 : 0.86;
    b.cone(gf, B.shin[i], new Vec3(d.lShin * top, 0, 0), lerp(r.knee, r.ankle, top) + si * 1.6, B.foot[i], Vec3.ZERO, r.ankle + si, slot, { side, domain: Domain.Limb });
    if (top < 0.6) b.cone(gf, B.shin[i], new Vec3(d.lShin * top, 0, 0), lerp(r.knee, r.ankle, top) + si * 2.6, B.shin[i], new Vec3(d.lShin * (top + 0.06), 0, 0), lerp(r.knee, r.ankle, top + 0.06) + si * 2.6, slot, { side });
  }
}

export function dressExtras(body: HumanBody, o: { belt: boolean; gloves: 'none' | 'gloves' | 'gauntlets'; scarf: boolean; apron: boolean; cape: 'none' | 'cape' | 'cloak'; pouch: boolean }, s: { trim: string; cape: string; apron: string }): void {
  const { b, B, d, h, r } = body;
  if (o.apron) {
    const g = b.group('apron', 0, { depthBias: 0.2 });
    const front: Plane[] = [{ n: new Vec3(-1, 0, 0), d: 0.05 * h }];
    shell(body, g, body.waist, inflateBy(body, 0.14), s.apron, { clips: [...front, { n: new Vec3(0, 1, 0), d: 0.3 * h }] });
    skirt(body, g, s.apron, (body.waistY - d.ankleH) * 0.5, 0.16, { clips: [{ n: new Vec3(-1, 0, 0), d: -0.05 * h }] });
  }
  if (o.belt) {
    const g = b.group('belt', 0, { depthBias: 0.25 });
    const w = body.waist;
    const y = -0.35 * h;
    b.ellipsoid(g, B.spine, w.center.add(new Vec3(0, y, 0)), new Vec3(w.radii.x * 0.96 + inflateBy(body, 0.16), 0.085 * h, w.radii.z * 0.96 + inflateBy(body, 0.16)), 'leather', { flags: PF.NoPattern });
    b.ellipsoid(g, B.spine, w.center.add(new Vec3(w.radii.x + inflateBy(body, 0.12), y, 0)), new Vec3(0.06 * h, 0.07 * h, 0.08 * h), 'gold', { flags: PF.Hard });
    if (o.pouch) b.ellipsoid(g, B.spine, w.center.add(new Vec3(0.1 * h, y - 0.18 * h, -(w.radii.z + 0.1 * h))), new Vec3(0.16 * h, 0.17 * h, 0.1 * h), 'leather', { shadeBias: -1 });
  }
  if (o.gloves !== 'none') {
    for (let i = 0; i < 2; i++) {
      const side = SIDES[i];
      const g = b.group('glove', body.d.h * 0.08, { side });
      const slot = o.gloves === 'gauntlets' ? 'metal' : 'leather';
      const gi = inflateBy(body, 0.04);
      b.ellipsoid(g, B.hand[i], new Vec3(d.lHand * 0.45, 0, 0), new Vec3(d.lHand * 0.5 + gi, r.hand + gi, r.hand * 0.6 + gi), slot, { side });
      b.cone(g, B.fore[i], new Vec3(d.lFore * (o.gloves === 'gauntlets' ? 0.5 : 0.78), 0, 0), lerp(r.fore, r.wrist, 0.6) + gi * 2.2, B.hand[i], Vec3.ZERO, r.wrist + gi * 1.6, slot, { side });
    }
  }
  if (o.scarf) {
    const g = b.group('scarf', h * 0.1, { depthBias: 0.3 });
    b.ellipsoid(g, B.chest, new Vec3(0, d.neckY - 0.02 * h, 0), new Vec3(r.neck + 0.2 * h, 0.15 * h, r.neck + 0.22 * h), s.trim);
    b.cone(g, B.chest, new Vec3(body.chest.radii.x * 0.8, d.neckY - 0.12 * h, -0.16 * h), 0.1 * h, B.chest, new Vec3(body.chest.radii.x + 0.1 * h, d.neckY - 0.85 * h, -0.2 * h), 0.08 * h, s.trim);
  }
  if (o.cape !== 'none' && B.cape.length) {
    const g = b.group('cape', 0, { depthBias: -0.4 });
    const cloak = o.cape === 'cloak';
    const len = cloak ? d.height * 0.78 : d.height * 0.5;
    const wid = d.shoulder.z + (cloak ? 0.42 : 0.25) * h;
    b.ellipsoid(g, B.cape[0], new Vec3(-0.12 * h, -len * 0.5, 0), new Vec3((cloak ? 0.3 : 0.18) * h, len * 0.56, wid), s.cape, {
      clips: [{ n: new Vec3(0, 1, 0), d: 0.02 * h }, { n: new Vec3(0, -1, 0), d: len * 0.98 }, { n: new Vec3(1, 0, 0), d: cloak ? 0.3 * h : 0.08 * h }], capShade: -2, tag: 'cape',
    });
    // clasp / collar
    b.ellipsoid(b.group('collar', h * 0.1, { depthBias: 0.2 }), B.chest, new Vec3(-0.08 * h, d.neckY - 0.06 * h, 0), new Vec3(r.neck + 0.18 * h, 0.12 * h, r.neck + 0.28 * h), s.cape);
  }
}

// =============================================================================================
// hair, beards, hats
// =============================================================================================

export type HairStyle = 'bald' | 'buzz' | 'short' | 'sidepart' | 'curly' | 'afro' | 'bob' | 'shoulder' | 'long' | 'ponytail' | 'bun' | 'braid' | 'mohawk' | 'topknot' | 'receding';

export const HAIR_STYLES: [HairStyle, string][] = [
  ['bald', 'Bald'], ['buzz', 'Buzz cut'], ['receding', 'Receding'], ['short', 'Short'], ['sidepart', 'Side part'], ['curly', 'Curly'],
  ['afro', 'Afro'], ['bob', 'Bob'], ['shoulder', 'Shoulder length'], ['long', 'Long'], ['ponytail', 'Ponytail'], ['bun', 'Bun'],
  ['braid', 'Braid'], ['mohawk', 'Mohawk'], ['topknot', 'Top knot'],
];

/** Plane of a hairline: hair keeps what lies above/behind a line through P tilted by theta. */
const hairline = (P: Vec3, theta: number): Plane => {
  const n = new Vec3(Math.cos(theta), -Math.sin(theta), 0);
  return { n, d: n.dot(P) };
};

export function hairChainFor(style: HairStyle, h: number): { origin: Vec3; seg: number; count: number } | undefined {
  if (style === 'long' || style === 'shoulder') return { origin: new Vec3(-0.38 * h, 0.55 * h, 0), seg: h * 0.8, count: 2 };
  if (style === 'ponytail' || style === 'braid') return { origin: new Vec3(-0.55 * h, 0.62 * h, 0), seg: h * 0.6, count: 2 };
  return undefined;
}

/** `hatCovers`: the hat hides the top of the head, so only what shows below it is built. */
export function buildHair(body: HumanBody, style: HairStyle, volume: number, hatCovers: boolean): void {
  if (style === 'bald') return;
  const { b, B, h, C } = body;
  const g = b.group('hair', Math.max(0.8, h * 0.16), { depthBias: 0.15 });
  const R = body.skull.radii;
  const v = lerp(1.06, 1.2, volume);
  const ho: PrimOpts = { domain: Domain.Head, domainLen: h, flags: PF.NoPattern };
  const cap = (scale: number, theta: number, frontY: number, napeY: number | null, extra: Plane[] = [], off = Vec3.ZERO, slot = 'hair') => {
    const clips: Plane[] = [hairline(new Vec3(0.45 * h, C.y + frontY * h, 0), theta), ...extra];
    if (napeY !== null) clips.push({ n: new Vec3(0, -1, 0), d: -(C.y + napeY * h) });
    if (hatCovers) clips.push({ n: new Vec3(0, 1, 0), d: C.y + 0.12 * h });
    return b.ellipsoid(g, B.head, C.add(new Vec3(-0.03 * h, 0.03 * h, 0)).add(off), new Vec3(R.x * scale + 0.25, R.y * scale + 0.25, R.z * scale + 0.25), slot, { ...ho, clips, capShade: 0 });
  };
  const longMass = (len: number, width: number) => {
    if (B.hair.length) b.ellipsoid(g, B.hair[0], new Vec3(-0.05 * h, -len * 0.42, 0), new Vec3(0.24 * h, len * 0.56, width * h), 'hair', { ...ho, tag: 'hairBack' });
  };
  switch (style) {
    case 'buzz':
      cap(1.035, 1.0, 0.24, -0.25, [], Vec3.ZERO, 'buzz');
      break;
    case 'receding':
      cap(1.05, 0.45, 0.02, -0.3, [{ n: new Vec3(0, 1, 0).norm(), d: C.y + 0.35 * h }]);
      cap(1.05, 1.15, 0.36, -0.3);
      break;
    case 'short':
      cap(v, 1.05, 0.2, -0.3);
      b.ellipsoid(g, B.head, C.add(new Vec3(0.24 * h, 0.34 * h, 0.02 * h)), new Vec3(0.24 * h, 0.13 * h * v, 0.32 * h), 'hair', ho);
      break;
    case 'sidepart':
      cap(v, 1.0, 0.16, -0.3);
      b.ellipsoid(g, B.head, C.add(new Vec3(0.28 * h, 0.3 * h, -0.1 * h)), new Vec3(0.26 * h, 0.15 * h * v, 0.3 * h), 'hair', { ...ho, rot: Mat3.rotX(-0.35) });
      break;
    case 'curly':
      cap(v * 1.08, 0.95, 0.18, -0.38);
      for (let k = 0; k < 7; k++) {
        const a = -2.2 + (k / 6) * 4.4;
        b.ellipsoid(g, B.head, C.add(new Vec3(Math.cos(a) * R.x * 0.85 - 0.08 * h, 0.12 * h + Math.abs(Math.sin(a)) * 0.05 * h, Math.sin(a) * R.z * 1.0)), new Vec3(0.19 * h, 0.2 * h, 0.19 * h), 'hair', ho);
      }
      break;
    case 'afro':
      if (!hatCovers) b.ellipsoid(g, B.head, C.add(new Vec3(-0.08 * h, 0.16 * h, 0)), new Vec3(R.x * 1.4, R.y * 1.38, R.z * 1.55), 'hair', { ...ho, clips: [hairline(new Vec3(0.45 * h, C.y + 0.14 * h, 0), 0.82), { n: new Vec3(0, -1, 0), d: -(C.y - 0.28 * h) }] });
      else cap(1.2, 0.82, 0.14, -0.28);
      break;
    case 'bob':
      cap(v * 1.04, 0.5, 0.06, -0.5, [], new Vec3(-0.02 * h, -0.02 * h, 0));
      break;
    case 'shoulder':
      cap(v, 0.7, 0.16, null);
      longMass(h * 1.15, 0.42);
      for (const side of SIDES) b.ellipsoid(g, B.head, C.add(new Vec3(-0.08 * h, -0.45 * h, side * R.z * 0.95)), new Vec3(0.22 * h, 0.38 * h, 0.13 * h), 'hair', ho);
      break;
    case 'long':
      cap(v, 0.62, 0.15, null);
      longMass(h * 2.3, 0.46);
      for (const side of SIDES) b.ellipsoid(g, B.head, C.add(new Vec3(-0.04 * h, -0.55 * h, side * R.z * 0.95)), new Vec3(0.2 * h, 0.55 * h, 0.13 * h), 'hair', ho);
      break;
    case 'ponytail':
    case 'braid': {
      cap(1.07, 0.9, 0.2, -0.32);
      if (B.hair.length >= 2) {
        const braid = style === 'braid';
        const r0 = (braid ? 0.12 : 0.17) * h;
        b.cone(g, B.hair[0], Vec3.ZERO, r0, B.hair[1], Vec3.ZERO, r0 * 0.9, 'hair', ho);
        const tip = braid ? h * 1.2 : h * 0.7;
        if (braid) for (let k = 0; k < 3; k++) b.ellipsoid(g, B.hair[1], new Vec3(0, -k * tip * 0.3, 0), new Vec3(0.13 * h, tip * 0.18, 0.13 * h), 'hair', ho);
        else b.ellipsoid(g, B.hair[1], new Vec3(0, -tip * 0.45, 0), new Vec3(0.15 * h, tip * 0.55, 0.15 * h), 'hair', ho);
        b.ellipsoid(b.group('tie', 0, { depthBias: 0.3 }), B.hair[0], new Vec3(0.02 * h, -0.05 * h, 0), new Vec3(0.1 * h, 0.07 * h, 0.12 * h), 'trim', {});
      }
      break;
    }
    case 'bun':
      cap(1.07, 0.9, 0.2, -0.3);
      if (!hatCovers) b.ellipsoid(g, B.head, C.add(new Vec3(-0.42 * h, 0.4 * h, 0)), new Vec3(0.22 * h, 0.22 * h, 0.22 * h), 'hair', ho);
      break;
    case 'topknot':
      cap(1.06, 0.95, 0.2, -0.3);
      if (!hatCovers) b.ellipsoid(g, B.head, C.add(new Vec3(-0.12 * h, 0.58 * h, 0)), new Vec3(0.16 * h, 0.2 * h, 0.16 * h), 'hair', ho);
      break;
    case 'mohawk':
      cap(1.03, 1.0, 0.24, -0.25, [], Vec3.ZERO, 'buzz');
      if (!hatCovers) b.ellipsoid(g, B.head, C.add(new Vec3(-0.05 * h, 0.36 * h, 0)), new Vec3(R.x * 1.05, 0.3 * h, 0.09 * h), 'hair', ho);
      break;
  }
}

export type FacialHair = 'none' | 'stubble' | 'mustache' | 'goatee' | 'beard' | 'longbeard';

export function buildFacialHair(body: HumanBody, kind: FacialHair): void {
  if (kind === 'none') return;
  const { b, B, h, jaw } = body;
  const g = b.group('beard', Math.max(0.6, h * 0.1), { depthBias: 0.2 });
  const ho: PrimOpts = { domain: Domain.Head, domainLen: h, flags: PF.NoPattern };
  const mustache = () => b.ellipsoid(g, B.head, new Vec3(0.47 * h, 0.32 * h, 0), new Vec3(0.07 * h, 0.05 * h, 0.17 * h), 'hair', ho);
  switch (kind) {
    case 'stubble':
      b.ellipsoid(g, B.head, jaw.center, jaw.radii.add(new Vec3(0.3, 0.3, 0.3)), 'stubble', { ...ho, clips: [{ n: new Vec3(0, 1, 0), d: 0.33 * h }, { n: new Vec3(-1, 0, 0), d: 0.05 * h }] });
      break;
    case 'mustache':
      mustache();
      break;
    case 'goatee':
      mustache();
      b.ellipsoid(g, B.head, new Vec3(0.4 * h, 0.08 * h, 0), new Vec3(0.13 * h, 0.13 * h, 0.11 * h), 'hair', ho);
      break;
    case 'beard':
    case 'longbeard':
      mustache();
      b.ellipsoid(g, B.head, jaw.center.add(new Vec3(0.02 * h, -0.03 * h, 0)), jaw.radii.add(new Vec3(0.07 * h, 0.09 * h, 0.06 * h)), 'hair', { ...ho, clips: [{ n: new Vec3(0, 1, 0), d: 0.3 * h }, { n: new Vec3(-1, 0, 0), d: 0.1 * h }] });
      if (kind === 'longbeard') b.ellipsoid(g, B.head, new Vec3(0.34 * h, -0.2 * h, 0), new Vec3(0.18 * h, 0.4 * h, 0.24 * h), 'hair', ho);
      break;
  }
}

export type Headwear = 'none' | 'hood' | 'cap' | 'beanie' | 'bandana' | 'widebrim' | 'wizard' | 'helmet' | 'greathelm' | 'crown' | 'circlet' | 'strawhat' | 'horned';

/** True when the hat hides the top of the hair. */
export const hatCoversHair = (w: Headwear): boolean => w !== 'none' && w !== 'circlet' && w !== 'bandana';

export function buildHeadwear(body: HumanBody, kind: Headwear, slot: string): void {
  if (kind === 'none') return;
  const { b, B, h, C, d, r } = body;
  const R = body.skull.radii;
  const g = b.group('hat', Math.max(0.5, h * 0.08), { depthBias: 0.3 });
  const o: PrimOpts = { flags: PF.NoPattern };
  const brim = (rad: number, y: number, s = slot) => b.ellipsoid(g, B.head, C.add(new Vec3(0, y, 0)), new Vec3(rad, Math.max(0.45, 0.05 * h), rad * 0.95), s, o);
  switch (kind) {
    case 'hood': {
      const n = new Vec3(1, -0.15, 0).norm();
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.06 * h, 0.04 * h, 0)), R.mul(1.3), slot, { ...o, clips: [{ n, d: n.dot(C.add(new Vec3(0.3 * h, 0, 0))) }], capShade: -3 });
      b.ellipsoid(b.group('cowl', h * 0.1, { depthBias: 0.1 }), B.chest, new Vec3(-0.06 * h, d.neckY - 0.08 * h, 0), new Vec3(r.neck + 0.32 * h, 0.22 * h, r.neck + 0.36 * h), slot, o);
      break;
    }
    case 'cap':
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.04 * h, 0)), R.mul(1.12), slot, { ...o, clips: [{ n: new Vec3(0, -1, 0), d: -(C.y + 0.1 * h) }] });
      b.ellipsoid(g, B.head, C.add(new Vec3(R.x * 0.95, 0.12 * h, 0)), new Vec3(0.22 * h, 0.045 * h + 0.2, 0.3 * h), slot, o);
      break;
    case 'beanie':
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.03 * h, 0.08 * h, 0)), R.mul(1.14), slot, { ...o, clips: [{ n: new Vec3(0, -1, 0), d: -(C.y + 0.06 * h) }] });
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.12 * h, 0)), new Vec3(R.x * 1.06, 0.09 * h, R.z * 1.1), 'trim', o);
      break;
    case 'bandana':
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.02 * h, 0)), R.mul(1.09), slot, { ...o, clips: [{ n: new Vec3(0, -1, 0), d: -(C.y + 0.12 * h) }, { n: new Vec3(0, 1, 0), d: C.y + 0.3 * h }] });
      b.ellipsoid(g, B.head, C.add(new Vec3(-R.x * 1.05, 0.2 * h, 0)), new Vec3(0.1 * h, 0.12 * h, 0.12 * h), slot, o);
      break;
    case 'widebrim':
    case 'strawhat':
      brim(kind === 'strawhat' ? 1.0 * h : 0.92 * h, 0.27 * h);
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.42 * h, 0)), new Vec3(0.5 * h, 0.3 * h, 0.46 * h), slot, { ...o, clips: [{ n: new Vec3(0, -1, 0), d: -(C.y + 0.27 * h) }] });
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.33 * h, 0)), new Vec3(0.51 * h, 0.07 * h, 0.47 * h), 'trim', o);
      break;
    case 'wizard': {
      brim(0.82 * h, 0.27 * h);
      const tip = b.group('hatTip', h * 0.15, { depthBias: 0.3 });
      b.cone(tip, B.head, C.add(new Vec3(-0.02 * h, 0.3 * h, 0)), 0.46 * h, B.head, C.add(new Vec3(-0.15 * h, 1.05 * h, 0)), 0.2 * h, slot, o);
      b.cone(tip, B.head, C.add(new Vec3(-0.15 * h, 1.05 * h, 0)), 0.2 * h, B.head, C.add(new Vec3(-0.5 * h, 1.45 * h, 0)), 0.05 * h, slot, o);
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.36 * h, 0)), new Vec3(0.47 * h, 0.07 * h, 0.44 * h), 'trim', o);
      break;
    }
    case 'helmet':
    case 'horned':
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.04 * h, 0)), R.mul(1.17), 'metal', { ...o, clips: [{ n: new Vec3(0, -1, 0), d: -(C.y - 0.28 * h) }, { n: new Vec3(1, 0, 0), d: 0.3 * h }], capShade: -3 });
      b.ellipsoid(g, B.head, C.add(new Vec3(R.x * 1.12, -0.02 * h, 0)), new Vec3(0.05 * h, 0.2 * h, 0.045 * h + 0.2), 'metal', o);
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.06 * h, 0)), new Vec3(R.x * 1.2, 0.07 * h, R.z * 1.2), 'metal', { ...o, shadeBias: -1 });
      if (kind === 'horned') for (const side of SIDES) {
        const hg = b.group('horn', h * 0.1, { side, depthBias: 0.3 });
        b.cone(hg, B.head, C.add(new Vec3(-0.05 * h, 0.25 * h, side * R.z * 0.95)), 0.13 * h, B.head, C.add(new Vec3(0.05 * h, 0.55 * h, side * R.z * 1.7)), 0.08 * h, 'bone', o);
        b.cone(hg, B.head, C.add(new Vec3(0.05 * h, 0.55 * h, side * R.z * 1.7)), 0.08 * h, B.head, C.add(new Vec3(0.25 * h, 0.9 * h, side * R.z * 1.75)), 0.03 * h, 'bone', o);
      }
      break;
    case 'greathelm':
      b.ellipsoid(g, B.head, C.add(new Vec3(0, -0.04 * h, 0)), new Vec3(R.x * 1.15, R.y * 1.25, R.z * 1.22), 'metal', o);
      b.ellipsoid(g, B.head, C.add(new Vec3(R.x * 1.12, 0.02 * h, 0)), new Vec3(0.05 * h, 0.04 * h + 0.2, R.z * 0.75), 'visor', { flags: PF.NoPattern | PF.Hard });
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.05 * h, R.y * 1.22, 0)), new Vec3(0.3 * h, 0.12 * h, 0.06 * h), 'trim', o);
      break;
    case 'crown': {
      b.ellipsoid(g, B.head, C.add(new Vec3(-0.02 * h, 0.3 * h, 0)), new Vec3(R.x * 0.92, 0.11 * h, R.z * 0.98), 'gold', o);
      for (let k = 0; k < 5; k++) {
        const a = -1.2 + (k / 4) * 2.4;
        const p = C.add(new Vec3(Math.cos(a) * R.x * 0.88 - 0.02 * h, 0.36 * h, Math.sin(a) * R.z * 0.95));
        b.cone(g, B.head, p, 0.07 * h, B.head, p.add(new Vec3(0, 0.2 * h, 0)), 0.035 * h, 'gold', o);
      }
      b.ellipsoid(g, B.head, C.add(new Vec3(R.x * 0.95, 0.3 * h, 0)), new Vec3(0.05 * h, 0.06 * h, 0.06 * h), 'gem', { flags: PF.Emissive | PF.Hard });
      break;
    }
    case 'circlet':
      b.ellipsoid(g, B.head, C.add(new Vec3(0.0, 0.2 * h, 0)), new Vec3(R.x * 1.08, 0.045 * h + 0.2, R.z * 1.1), 'gold', { ...o, clips: [{ n: new Vec3(0, 1, 0), d: C.y + 0.24 * h }] });
      b.ellipsoid(g, B.head, C.add(new Vec3(R.x * 1.08, 0.2 * h, 0)), new Vec3(0.05 * h, 0.06 * h, 0.05 * h), 'gem', { flags: PF.Emissive | PF.Hard });
      break;
  }
}

// =============================================================================================
// weapons, off-hand items, back items
// =============================================================================================

/**
 * Weapons are modelled in the grip frame: grip at the origin, blade or shaft along +X, cutting edge
 * towards -Y. Sizes scale with the head unit so they stay proportional at every build scale.
 */
export function buildWeapon(body: HumanBody, kind: WeaponKind, size = 1): void {
  if (kind === 'none' || kind === 'bow') return;
  const { b, B, h } = body;
  const g = b.group('weapon', Math.max(0.4, h * 0.05), { side: 1, depthBias: 0.1 });
  const bone = B.weapon;
  const k = h * size;
  const o: PrimOpts = { flags: PF.NoPattern | PF.NoShadow, side: 1 };
  const hard: PrimOpts = { ...o, flags: o.flags! | PF.Hard };
  const shaft = (a: number, bEnd: number, ra: number, rb = ra, slot = 'wood') => b.cone(g, bone, new Vec3(a * k, 0, 0), ra * k, bone, new Vec3(bEnd * k, 0, 0), rb * k, slot, { ...o, flags: o.flags! | PF.Thin });
  switch (kind) {
    case 'sword': {
      const L = 2.7;
      b.ellipsoid(g, bone, new Vec3(-0.34 * k, 0, 0), new Vec3(0.08 * k, 0.08 * k, 0.08 * k), 'gold', hard);
      shaft(-0.3, 0.2, 0.06, 0.06, 'leather');
      b.ellipsoid(g, bone, new Vec3(0.24 * k, 0, 0), new Vec3(0.06 * k, 0.34 * k, 0.07 * k), 'gold', hard);
      b.ellipsoid(g, bone, new Vec3((0.26 + L / 2) * k, 0, 0), new Vec3((L / 2) * k, 0.1 * k + 0.15, Math.max(0.45, 0.035 * k)), 'metal', hard);
      break;
    }
    case 'dagger':
      shaft(-0.22, 0.15, 0.055, 0.055, 'leather');
      b.ellipsoid(g, bone, new Vec3(0.17 * k, 0, 0), new Vec3(0.05 * k, 0.2 * k, 0.06 * k), 'metal', hard);
      b.ellipsoid(g, bone, new Vec3(0.75 * k, 0, 0), new Vec3(0.58 * k, 0.09 * k + 0.12, Math.max(0.45, 0.03 * k)), 'metal', hard);
      break;
    case 'axe':
      shaft(-0.5, 2.5, 0.07, 0.065);
      b.ellipsoid(g, bone, new Vec3(2.1 * k, -0.28 * k, 0), new Vec3(0.3 * k, 0.34 * k, 0.045 * k + 0.15), 'metal', { ...hard, clips: [{ n: new Vec3(0, 1, 0), d: -0.04 * k }] });
      b.ellipsoid(g, bone, new Vec3(2.1 * k, 0.05 * k, 0), new Vec3(0.14 * k, 0.12 * k, 0.07 * k), 'metal', hard);
      break;
    case 'mace':
      shaft(-0.4, 1.8, 0.065);
      b.ellipsoid(g, bone, new Vec3(2.0 * k, 0, 0), new Vec3(0.26 * k, 0.24 * k, 0.24 * k), 'metal', { ...o, flags: o.flags! | PF.Faceted });
      for (const dz of [-1, 1]) b.ellipsoid(g, bone, new Vec3(2.0 * k, 0, dz * 0.24 * k), new Vec3(0.18 * k, 0.07 * k, 0.07 * k), 'metal', hard);
      break;
    case 'hammer':
      shaft(-0.4, 2.2, 0.065);
      b.ellipsoid(g, bone, new Vec3(2.2 * k, 0, 0), new Vec3(0.2 * k, 0.4 * k, 0.21 * k), 'metal', { ...hard, flags: hard.flags! | PF.Faceted });
      break;
    case 'club':
      b.cone(g, bone, new Vec3(-0.25 * k, 0, 0), 0.07 * k, bone, new Vec3(1.9 * k, 0, 0), 0.2 * k, 'wood', o);
      break;
    case 'spear':
      shaft(-2.3, 3.7, 0.055);
      b.ellipsoid(g, bone, new Vec3(3.95 * k, 0, 0), new Vec3(0.33 * k, 0.09 * k + 0.12, 0.04 * k + 0.1), 'metal', hard);
      b.ellipsoid(g, bone, new Vec3(3.6 * k, 0, 0), new Vec3(0.08 * k, 0.08 * k, 0.08 * k), 'leather', o);
      break;
    case 'staff':
      shaft(-3.0, 3.0, 0.065, 0.075);
      b.ellipsoid(g, bone, new Vec3(3.1 * k, 0, 0), new Vec3(0.12 * k, 0.17 * k, 0.17 * k), 'wood', o);
      b.ellipsoid(b.group('orb', 0, { depthBias: 0.2 }), bone, new Vec3(3.32 * k, 0, 0), new Vec3(0.17 * k, 0.17 * k, 0.17 * k), 'glow', { flags: PF.Emissive | PF.NoShadow | PF.NoContactShadow });
      break;
    case 'wand':
      shaft(-0.15, 1.05, 0.045, 0.035);
      b.ellipsoid(g, bone, new Vec3(1.12 * k, 0, 0), new Vec3(0.07 * k, 0.07 * k, 0.07 * k), 'glow', { flags: PF.Emissive | PF.NoShadow });
      break;
  }
}

export function buildBow(body: HumanBody, size = 1): void {
  const { b, B, h, d } = body;
  const g = b.group('bow', 0, { side: -1, depthBias: 0.1 });
  const bone = B.offhand;
  const k = h * size;
  const o: PrimOpts = { flags: PF.NoPattern | PF.NoShadow | PF.Thin, side: -1 };
  const pts = [new Vec3(-1.75 * k, 0.42 * k, 0), new Vec3(-0.95 * k, 0.12 * k, 0), Vec3.ZERO, new Vec3(0.95 * k, 0.12 * k, 0), new Vec3(1.75 * k, 0.42 * k, 0)];
  for (let i = 0; i < 4; i++) b.cone(g, bone, pts[i], (i === 0 || i === 3 ? 0.045 : 0.07) * k, bone, pts[i + 1], (i === 0 || i === 3 ? 0.07 : 0.045) * k, 'wood', o);
  b.cone(g, bone, pts[0], 0.36, bone, pts[4], 0.36, 'string', o);
  // the arrow, drawn only while shooting: along the right hand's fingers
  const ga = b.group('arrow', 0, { side: 1, depthBias: 0.2 });
  const hb = B.hand[1];
  b.cone(ga, hb, new Vec3(d.lHand * 0.3 - 0.2 * k, 0, 0), 0.04 * k + 0.05, hb, new Vec3(d.lHand * 0.3 + 2.3 * k, 0, 0), 0.04 * k + 0.05, 'wood', { ...o, side: 1 });
  b.ellipsoid(ga, hb, new Vec3(d.lHand * 0.3 + 2.4 * k, 0, 0), new Vec3(0.14 * k, 0.06 * k + 0.15, 0.05 * k + 0.1), 'metal', { ...o, side: 1 });
  b.ellipsoid(ga, hb, new Vec3(d.lHand * 0.3 - 0.05 * k, 0, 0), new Vec3(0.16 * k, 0.08 * k, 0.03 * k + 0.1), 'fletch', { ...o, side: 1 });
}

export function buildOffhand(body: HumanBody, kind: OffhandKind): void {
  if (kind === 'none') return;
  const { b, B, h } = body;
  const g = b.group('offhand', 0, { side: -1, depthBias: 0.12 });
  const bone = B.offhand;
  const o: PrimOpts = { flags: PF.NoPattern, side: -1 };
  switch (kind) {
    case 'shield':
      b.ellipsoid(g, bone, new Vec3(0.12 * h, 0, -0.26 * h), new Vec3(0.8 * h, 0.78 * h, 0.08 * h + 0.2), 'shield', o);
      b.ellipsoid(g, bone, new Vec3(0.12 * h, 0, -0.27 * h), new Vec3(0.86 * h, 0.84 * h, 0.06 * h + 0.15), 'metal', { ...o, shadeBias: -1 });
      b.ellipsoid(g, bone, new Vec3(0.12 * h, 0, -0.36 * h), new Vec3(0.17 * h, 0.17 * h, 0.1 * h), 'metal', { ...o, flags: PF.Hard | PF.NoPattern });
      break;
    case 'buckler':
      b.ellipsoid(g, bone, new Vec3(0.05 * h, 0, -0.2 * h), new Vec3(0.45 * h, 0.45 * h, 0.07 * h + 0.2), 'metal', o);
      b.ellipsoid(g, bone, new Vec3(0.05 * h, 0, -0.28 * h), new Vec3(0.12 * h, 0.12 * h, 0.07 * h), 'gold', o);
      break;
    case 'torch':
      b.cone(g, bone, new Vec3(-0.45 * h, 0, 0), 0.06 * h, bone, new Vec3(1.0 * h, 0, 0), 0.085 * h, 'wood', { ...o, flags: PF.Thin });
      b.ellipsoid(g, bone, new Vec3(0.95 * h, 0, 0), new Vec3(0.1 * h, 0.12 * h, 0.12 * h), 'leather', o);
      b.ellipsoid(b.group('flame', 0, { depthBias: 0.3, flags: GF.NoOutline }), bone, new Vec3(1.25 * h, 0, 0), new Vec3(0.3 * h, 0.17 * h, 0.17 * h), 'flame', { flags: PF.Emissive | PF.NoShadow | PF.NoContactShadow });
      break;
    case 'lantern':
      b.cone(g, bone, Vec3.ZERO, 0.04 * h, bone, new Vec3(-0.28 * h, 0, 0), 0.04 * h, 'metal', { ...o, flags: PF.Thin });
      b.ellipsoid(g, bone, new Vec3(-0.32 * h, 0, 0), new Vec3(0.07 * h, 0.17 * h, 0.17 * h), 'metal', o);
      b.ellipsoid(g, bone, new Vec3(-0.58 * h, 0, 0), new Vec3(0.24 * h, 0.15 * h, 0.15 * h), 'flame', { flags: PF.Emissive | PF.NoShadow });
      b.ellipsoid(g, bone, new Vec3(-0.84 * h, 0, 0), new Vec3(0.06 * h, 0.17 * h, 0.17 * h), 'metal', o);
      break;
    case 'book':
      b.ellipsoid(g, bone, new Vec3(0.05 * h, -0.1 * h, -0.12 * h), new Vec3(0.42 * h, 0.32 * h, 0.1 * h), 'book', { ...o, flags: PF.Hard | PF.NoPattern });
      b.ellipsoid(g, bone, new Vec3(0.05 * h, -0.14 * h, -0.12 * h), new Vec3(0.38 * h, 0.3 * h, 0.07 * h), 'paper', { ...o, flags: PF.Hard | PF.NoPattern });
      break;
  }
}

export function buildBackItem(body: HumanBody, kind: 'none' | 'backpack' | 'quiver' | 'sheath'): void {
  if (kind === 'none') return;
  const { b, B, h } = body;
  const g = b.group('back', h * 0.1, { depthBias: -0.2 });
  if (kind === 'backpack') {
    b.ellipsoid(g, B.chest, new Vec3(-body.chest.radii.x - 0.25 * h, -0.2 * h, 0), new Vec3(0.3 * h, 0.55 * h, 0.46 * h), 'leather', { flags: PF.NoPattern });
    b.ellipsoid(g, B.chest, new Vec3(-body.chest.radii.x - 0.3 * h, 0.42 * h, 0), new Vec3(0.18 * h, 0.17 * h, 0.55 * h), 'trim', { flags: PF.NoPattern, rot: Mat3.I });
    for (const side of SIDES) b.cone(g, B.chest, new Vec3(-body.chest.radii.x * 0.5, 0.4 * h, side * 0.32 * h), 0.06 * h, B.chest, new Vec3(body.chest.radii.x * 0.95, -0.35 * h, side * 0.36 * h), 0.06 * h, 'leather', { flags: PF.NoPattern | PF.Thin });
  }
  if (kind === 'quiver' && B.quiver >= 0) {
    b.cone(g, B.quiver, new Vec3(0, -0.75 * h, 0), 0.17 * h, B.quiver, new Vec3(0, 0.55 * h, 0), 0.19 * h, 'leather', { flags: PF.NoPattern });
    for (let k = 0; k < 3; k++) b.ellipsoid(g, B.quiver, new Vec3(0.04 * h * (k - 1), 0.72 * h, 0.07 * h * (k - 1)), new Vec3(0.05 * h, 0.15 * h, 0.08 * h), 'fletch', { flags: PF.NoPattern });
  }
}

export { gripXform };
