/**
 * Anatomy: what a creature is made of, in its rest pose.
 *
 *  - Bones: a hierarchy of frames (local rest transform relative to the parent).
 *  - Primitives attached to bones: ellipsoids, round cones (between two bones, so limbs stretch
 *    with their joints) and flat triangles (membranes). Ellipsoids and cones can be cut by planes
 *    (hairlines, hood openings, coat tails).
 *  - Groups: primitives in one group blend into one smooth shape (soft union with fillets); between
 *    groups a depth buffer decides, and contour lines separate them (an arm in front of the chest).
 *  - Features: eyes, brows, mouths, nostrils… stamped as designed pixel clusters after shading.
 *
 * Units are pixels at scale 1: the builder's coordinates are the size the sprite will be drawn at.
 */

import { Mat3, Vec3, Xform } from '../core/math';

export const PrimKind = { Ellipsoid: 0, Cone: 1, Tri: 2 } as const;
export type PrimKind = (typeof PrimKind)[keyof typeof PrimKind];

export const PF = {
  /** Does not produce an exterior outline (soft glows, ground-hugging parts). */
  NoOutline: 1,
  /** Always lit (glowing orbs, embers). */
  Emissive: 2,
  /** Thin part: cleanup never removes its single pixels. */
  Thin: 4,
  /** No smooth blending with the rest of its group (sharp edges: blades, buckles). */
  Hard: 8,
  /** Ignores body patterns. */
  NoPattern: 16,
  /** Never casts the ground shadow. */
  NoShadow: 32,
  /** Casts the ground shadow even if it is not a body part. */
  ShadowCaster: 64,
  /** Chiselled shading (stone, crystal). */
  Faceted: 128,
  /** Does not cast contact shadows onto other parts. */
  NoContactShadow: 256,
} as const;

export const GF = {
  /** Pixels of this group never get an exterior outline. */
  NoOutline: 1,
  /** Never draws contour lines onto parts behind it. */
  NoContour: 2,
  /** Fillet pixels (joins inside the group) are shaded one level darker. */
  CreaseShade: 4,
  /** Not darkened when it is on the far side of the body. */
  NoFarShade: 8,
} as const;

/** Pattern domains: where body-anchored patterns (stripes, spots…) may appear. */
export const Domain = { None: 0, Body: 1, Head: 2, Neck: 3, Limb: 4, Tail: 5, Belly: 6, Wing: 7 } as const;
export type Domain = (typeof Domain)[keyof typeof Domain];

/** Keeps the points p (in the local frame of the primitive's first bone) with n·p ≤ d. */
export interface Plane {
  n: Vec3;
  d: number;
}

export interface PrimDef {
  kind: PrimKind;
  group: number;
  slot: number;
  boneA: number;
  a: Vec3;
  boneB: number;
  b: Vec3;
  boneC: number;
  c: Vec3;
  ra: number;
  rb: number;
  radii: Vec3;
  rot: Mat3;
  clips: Plane[];
  /** Shade offset of the flat cut surfaces created by clip planes (-3: dark interior of a hood). */
  capShade: number;
  flags: number;
  shadeBias: number;
  side: number;
  domain: Domain;
  u0: number;
  u1: number;
  domainLen: number;
  tag: string;
  /** Skip when the creature is drawn smaller than this scale (tiny details). */
  minScale: number;
}

export interface GroupDef {
  name: string;
  /** Soft-union radius in pixels (0 = hard union). */
  blend: number;
  /** Added to the depth when z-testing against other groups (> 0 sits in front). */
  depthBias: number;
  side: number;
  flags: number;
}

export type FeatureKind = 'eye' | 'brow' | 'mouth' | 'nostril' | 'spot' | 'blush';

export interface FeatureDef {
  kind: FeatureKind;
  bone: number;
  pos: Vec3;
  /** Outward surface normal (bone local): decides visibility and foreshortening. */
  normal: Vec3;
  /** Size in pixels (eyes: height). */
  size: number;
  aspect: number;
  style: string;
  side: number;
  /** Material slot name used for colours (eyes: iris colour, brows: hair). */
  slot: number;
}

export interface BoneDef {
  name: string;
  parent: number;
  rest: Xform;
}

export interface Metrics {
  /** Highest point of the rest pose above the ground (pixels). */
  height: number;
  /** Ground speed of the walk and run clips (pixels per second). */
  walkSpeed: number;
  runSpeed: number;
  /** Rough body length along the facing direction. */
  length: number;
}

export interface Anatomy {
  bones: BoneDef[];
  prims: PrimDef[];
  groups: GroupDef[];
  features: FeatureDef[];
  /** Material slot names; prims and features refer to them by index. */
  slots: string[];
  metrics: Metrics;
  /** Rest pose in creature space (computed). */
  restWorld: Xform[];
  /** Pattern scale (bigger creatures get bigger marks). */
  patternScale: number;
  /** Feature-size multiplier from the build scale. */
  scale: number;
  /** Semantic description used by the animator (family specific). */
  rig: unknown;
  /** Descriptive traits for the info panel ("hair: long", "weapon: sword"). */
  traits: string[];
}

export function boneIndex(an: Anatomy, name: string): number {
  return an.bones.findIndex((b) => b.name === name);
}
