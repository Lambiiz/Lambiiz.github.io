import { Mat3, Vec3, Xform } from '../core/math';
import { Domain, PrimKind, type Anatomy, type BoneDef, type FeatureDef, type FeatureKind, type GroupDef, type Metrics, type Plane, type PrimDef } from './anatomy';

export interface PrimOpts {
  flags?: number;
  shadeBias?: number;
  side?: number;
  domain?: Domain;
  u0?: number;
  u1?: number;
  domainLen?: number;
  tag?: string;
  clips?: Plane[];
  capShade?: number;
  minScale?: number;
}

/**
 * Assembles an anatomy. Bones are created with their rest transform in creature space (`boneAt`) or
 * relative to the parent (`bone`); primitives can be given in bone-local coordinates or in creature
 * space (the `…W` helpers convert using the rest pose).
 */
export class AnatomyBuilder {
  readonly bones: BoneDef[] = [];
  readonly prims: PrimDef[] = [];
  readonly groups: GroupDef[] = [];
  readonly features: FeatureDef[] = [];
  readonly slots: string[] = [];
  readonly traits: string[] = [];
  private readonly world: Xform[] = [];

  constructor(readonly scale: number) {}

  // ---------------------------------------------------------------------------- bones

  /** Bone with a local rest transform relative to its parent. */
  bone(name: string, parent: number, local: Xform): number {
    this.bones.push({ name, parent, rest: local });
    this.world.push(parent >= 0 ? this.world[parent].mul(local) : local);
    return this.bones.length - 1;
  }

  /** Bone whose rest frame is given in creature space. */
  boneAt(name: string, parent: number, world: Xform): number {
    const local = parent >= 0 ? this.world[parent].inverseRigid().mul(world) : world;
    return this.bone(name, parent, local);
  }

  restWorld(bone: number): Xform {
    return this.world[bone];
  }

  /** Creature-space point → bone-local point. */
  toLocal(bone: number, p: Vec3): Vec3 {
    return this.world[bone].inverseRigid().point(p);
  }

  toLocalDir(bone: number, d: Vec3): Vec3 {
    return this.world[bone].basis.transpose().apply(d);
  }

  // ---------------------------------------------------------------------------- groups & slots

  group(name: string, blend = 0, opts: { depthBias?: number; side?: number; flags?: number } = {}): number {
    this.groups.push({ name, blend, depthBias: opts.depthBias ?? 0, side: opts.side ?? 0, flags: opts.flags ?? 0 });
    return this.groups.length - 1;
  }

  slot(name: string): number {
    let i = this.slots.indexOf(name);
    if (i < 0) {
      this.slots.push(name);
      i = this.slots.length - 1;
    }
    return i;
  }

  trait(t: string): void {
    if (!this.traits.includes(t)) this.traits.push(t);
  }

  // ---------------------------------------------------------------------------- primitives

  private base(kind: PrimKind, group: number, slot: string, o: PrimOpts): PrimDef {
    return {
      kind, group, slot: this.slot(slot),
      boneA: 0, a: Vec3.ZERO, boneB: 0, b: Vec3.ZERO, boneC: 0, c: Vec3.ZERO,
      ra: 0, rb: 0, radii: Vec3.ZERO, rot: Mat3.I,
      clips: o.clips ?? [], capShade: o.capShade ?? 0,
      flags: o.flags ?? 0, shadeBias: o.shadeBias ?? 0, side: o.side ?? 0,
      domain: o.domain ?? Domain.None, u0: o.u0 ?? 0, u1: o.u1 ?? 1, domainLen: o.domainLen ?? 10,
      tag: o.tag ?? '', minScale: o.minScale ?? 0,
    };
  }

  /** Ellipsoid in bone-local coordinates; `rot` orients its axes inside the bone frame. */
  ellipsoid(group: number, bone: number, center: Vec3, radii: Vec3, slot: string, o: PrimOpts & { rot?: Mat3 } = {}): PrimDef {
    const p = this.base(PrimKind.Ellipsoid, group, slot, o);
    p.boneA = bone;
    p.a = center;
    p.radii = new Vec3(Math.max(0.3, radii.x), Math.max(0.3, radii.y), Math.max(0.3, radii.z));
    p.rot = o.rot ?? Mat3.I;
    this.prims.push(p);
    return p;
  }

  /** Ellipsoid given in creature space (centre and orientation in the rest pose). */
  ellipsoidW(group: number, bone: number, center: Vec3, radii: Vec3, slot: string, o: PrimOpts & { rot?: Mat3 } = {}): PrimDef {
    const w = this.world[bone];
    const rot = w.basis.transpose().mul(o.rot ?? Mat3.I);
    return this.ellipsoid(group, bone, w.inverseRigid().point(center), radii, slot, { ...o, rot, clips: o.clips?.map((c) => this.planeToLocal(bone, c)) });
  }

  /** Round cone from (boneA, a) to (boneB, b), both bone-local; radii ra at a and rb at b. */
  cone(group: number, boneA: number, a: Vec3, ra: number, boneB: number, b: Vec3, rb: number, slot: string, o: PrimOpts = {}): PrimDef {
    const p = this.base(PrimKind.Cone, group, slot, o);
    p.boneA = boneA;
    p.a = a;
    p.boneB = boneB;
    p.b = b;
    p.ra = Math.max(0.35, ra);
    p.rb = Math.max(0.35, rb);
    this.prims.push(p);
    return p;
  }

  /** Round cone with endpoints in creature space (rest pose). */
  coneW(group: number, boneA: number, a: Vec3, ra: number, boneB: number, b: Vec3, rb: number, slot: string, o: PrimOpts = {}): PrimDef {
    return this.cone(group, boneA, this.toLocal(boneA, a), ra, boneB, this.toLocal(boneB, b), rb, slot, { ...o, clips: o.clips?.map((c) => this.planeToLocal(boneA, c)) });
  }

  /** Flat two-sided triangle (wing membranes, fins, ear flaps). Vertices are bone-local. */
  tri(group: number, boneA: number, a: Vec3, boneB: number, b: Vec3, boneC: number, c: Vec3, slot: string, o: PrimOpts = {}): PrimDef {
    const p = this.base(PrimKind.Tri, group, slot, o);
    p.boneA = boneA;
    p.a = a;
    p.boneB = boneB;
    p.b = b;
    p.boneC = boneC;
    p.c = c;
    this.prims.push(p);
    return p;
  }

  triW(group: number, boneA: number, a: Vec3, boneB: number, b: Vec3, boneC: number, c: Vec3, slot: string, o: PrimOpts = {}): PrimDef {
    return this.tri(group, boneA, this.toLocal(boneA, a), boneB, this.toLocal(boneB, b), boneC, this.toLocal(boneC, c), slot, o);
  }

  /** A creature-space plane (n·p ≤ d) expressed in a bone's frame. */
  planeToLocal(bone: number, pl: Plane): Plane {
    const w = this.world[bone];
    const n = w.basis.transpose().apply(pl.n);
    // n·(R p + o) ≤ d  →  (Rᵀn)·p ≤ d − n·o
    return { n, d: pl.d - pl.n.dot(w.origin) };
  }

  // ---------------------------------------------------------------------------- features

  feature(kind: FeatureKind, bone: number, pos: Vec3, normal: Vec3, size: number, o: { aspect?: number; style?: string; side?: number; slot?: string } = {}): FeatureDef {
    const f: FeatureDef = {
      kind, bone, pos, normal: normal.norm(Vec3.X), size, aspect: o.aspect ?? 1, style: o.style ?? 'round', side: o.side ?? 0,
      slot: this.slot(o.slot ?? 'eye'),
    };
    this.features.push(f);
    return f;
  }

  /** Feature placed in creature space (rest pose). */
  featureW(kind: FeatureKind, bone: number, pos: Vec3, normal: Vec3, size: number, o: { aspect?: number; style?: string; side?: number; slot?: string } = {}): FeatureDef {
    return this.feature(kind, bone, this.toLocal(bone, pos), this.toLocalDir(bone, normal), size, o);
  }

  // ---------------------------------------------------------------------------- result

  build(metrics: Metrics, rig: unknown, patternScale = 1): Anatomy {
    return {
      bones: this.bones,
      prims: this.prims,
      groups: this.groups,
      features: this.features,
      slots: this.slots,
      metrics,
      restWorld: this.world.slice(),
      patternScale,
      scale: this.scale,
      rig,
      traits: this.traits,
    };
  }
}
