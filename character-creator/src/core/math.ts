/**
 * Small vector / matrix library for building and posing creatures.
 *
 * Creature space: +X forward (the way the creature faces), +Y up, +Z to the creature's right.
 * World space:    +X east, +Y up, +Z south (towards the viewer). Yaw 0 faces east.
 * View space:     +x right, +y up on screen, +z towards the viewer.
 *
 * Vec3 / Mat3 are immutable value objects: every operation returns a new instance. The rasterizer's
 * inner loops work on plain numbers instead.
 */

export const PI = Math.PI;
export const TAU = Math.PI * 2;
export const DEG = Math.PI / 180;

export const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);
export const saturate = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const invLerp = (a: number, b: number, v: number): number => (b === a ? 0 : (v - a) / (b - a));
export const smoothstep = (a: number, b: number, v: number): number => {
  const t = saturate(invLerp(a, b, v));
  return t * t * (3 - 2 * t);
};
export const frac = (v: number): number => v - Math.floor(v);
export const easeInOut = (t: number): number => 0.5 - 0.5 * Math.cos(PI * saturate(t));
export const easeOut = (t: number): number => 1 - (1 - saturate(t)) ** 2;
export const easeIn = (t: number): number => saturate(t) ** 2;
export const easeOutBack = (t: number, s = 1.6): number => {
  const u = saturate(t) - 1;
  return 1 + u * u * ((s + 1) * u + s);
};
/** 0 at t <= a, ramps to 1 at b, holds, ramps back to 0 between c and d. */
export const pulse = (t: number, a: number, b: number, c: number, d: number): number =>
  t <= a || t >= d ? 0 : t < b ? easeInOut((t - a) / (b - a)) : t <= c ? 1 : 1 - easeInOut((t - c) / (d - c));
/** Wraps an angle into (-PI, PI]. */
export const wrapAngle = (a: number): number => a - TAU * Math.floor((a + PI) / TAU);

/**
 * Piecewise smooth keyframes: `keys` are [time, value] pairs sorted by time; values between keys
 * are eased (sine in/out), outside the range they hold. Good enough for hand-timed actions.
 */
export function keyframes(t: number, keys: readonly (readonly [number, number])[]): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i];
    if (t <= t1) {
      const [t0, v0] = keys[i - 1];
      return lerp(v0, v1, easeInOut((t - t0) / Math.max(1e-9, t1 - t0)));
    }
  }
  return keys[keys.length - 1][1];
}

export class Vec3 {
  constructor(readonly x = 0, readonly y = 0, readonly z = 0) {}

  static readonly ZERO = new Vec3(0, 0, 0);
  static readonly X = new Vec3(1, 0, 0);
  static readonly Y = new Vec3(0, 1, 0);
  static readonly Z = new Vec3(0, 0, 1);

  add(b: Vec3): Vec3 {
    return new Vec3(this.x + b.x, this.y + b.y, this.z + b.z);
  }
  sub(b: Vec3): Vec3 {
    return new Vec3(this.x - b.x, this.y - b.y, this.z - b.z);
  }
  mul(s: number): Vec3 {
    return new Vec3(this.x * s, this.y * s, this.z * s);
  }
  /** Component-wise product. */
  scale(b: Vec3): Vec3 {
    return new Vec3(this.x * b.x, this.y * b.y, this.z * b.z);
  }
  /** this + b * s */
  addScaled(b: Vec3, s: number): Vec3 {
    return new Vec3(this.x + b.x * s, this.y + b.y * s, this.z + b.z * s);
  }
  neg(): Vec3 {
    return new Vec3(-this.x, -this.y, -this.z);
  }
  dot(b: Vec3): number {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  }
  cross(b: Vec3): Vec3 {
    return new Vec3(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
  }
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  get lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  norm(fallback: Vec3 = Vec3.X): Vec3 {
    const l = this.length;
    return l > 1e-12 ? new Vec3(this.x / l, this.y / l, this.z / l) : fallback;
  }
  with(p: { x?: number; y?: number; z?: number }): Vec3 {
    return new Vec3(p.x ?? this.x, p.y ?? this.y, p.z ?? this.z);
  }
  /** Projection on the ground plane (y = 0). */
  ground(): Vec3 {
    return new Vec3(this.x, 0, this.z);
  }
  isFinite(): boolean {
    return Number.isFinite(this.x) && Number.isFinite(this.y) && Number.isFinite(this.z);
  }
  static lerp(a: Vec3, b: Vec3, t: number): Vec3 {
    return new Vec3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
  }
  static dist(a: Vec3, b: Vec3): number {
    return a.sub(b).length;
  }
}

export const v3 = (x = 0, y = 0, z = 0): Vec3 => new Vec3(x, y, z);

/** 3×3 matrix, row-major fields m{row}{col}. Columns are the images of the unit axes. */
export class Mat3 {
  constructor(
    readonly m00 = 1, readonly m01 = 0, readonly m02 = 0,
    readonly m10 = 0, readonly m11 = 1, readonly m12 = 0,
    readonly m20 = 0, readonly m21 = 0, readonly m22 = 1,
  ) {}

  static readonly I = new Mat3();

  static fromCols(c0: Vec3, c1: Vec3, c2: Vec3): Mat3 {
    return new Mat3(c0.x, c1.x, c2.x, c0.y, c1.y, c2.y, c0.z, c1.z, c2.z);
  }
  static rotX(a: number): Mat3 {
    const c = Math.cos(a), s = Math.sin(a);
    return new Mat3(1, 0, 0, 0, c, -s, 0, s, c);
  }
  static rotY(a: number): Mat3 {
    const c = Math.cos(a), s = Math.sin(a);
    return new Mat3(c, 0, s, 0, 1, 0, -s, 0, c);
  }
  static rotZ(a: number): Mat3 {
    const c = Math.cos(a), s = Math.sin(a);
    return new Mat3(c, -s, 0, s, c, 0, 0, 0, 1);
  }
  /** Rotation about a unit axis (Rodrigues). */
  static axisAngle(axis: Vec3, a: number): Mat3 {
    const { x, y, z } = axis.norm(Vec3.Y);
    const c = Math.cos(a), s = Math.sin(a), t = 1 - c;
    return new Mat3(
      t * x * x + c, t * x * y - s * z, t * x * z + s * y,
      t * x * y + s * z, t * y * y + c, t * y * z - s * x,
      t * x * z - s * y, t * y * z + s * x, t * z * z + c,
    );
  }
  /**
   * Euler rotation used for body parts: yaw (about Y, > 0 turns to the creature's left), then pitch
   * (about Z, > 0 tips the top forward towards +X), then roll (about X, > 0 tips the top to the right).
   */
  static ypr(yaw: number, pitch: number, roll: number): Mat3 {
    return Mat3.rotY(yaw).mul(Mat3.rotZ(-pitch)).mul(Mat3.rotX(roll));
  }
  static scale(sx: number, sy: number, sz: number): Mat3 {
    return new Mat3(sx, 0, 0, 0, sy, 0, 0, 0, sz);
  }
  /** Orthonormal basis whose X axis points along `x` and whose Y axis leans towards `up`. */
  static lookAlong(x: Vec3, up: Vec3): Mat3 {
    const ax = x.norm(Vec3.X);
    let ay = up.sub(ax.mul(up.dot(ax)));
    if (ay.lengthSq < 1e-10) {
      const alt = Math.abs(ax.y) < 0.9 ? Vec3.Y : Vec3.X;
      ay = alt.sub(ax.mul(alt.dot(ax)));
    }
    ay = ay.norm(Vec3.Y);
    const az = ax.cross(ay);
    return Mat3.fromCols(ax, ay, az);
  }

  get c0(): Vec3 {
    return new Vec3(this.m00, this.m10, this.m20);
  }
  get c1(): Vec3 {
    return new Vec3(this.m01, this.m11, this.m21);
  }
  get c2(): Vec3 {
    return new Vec3(this.m02, this.m12, this.m22);
  }

  apply(v: Vec3): Vec3 {
    return new Vec3(
      this.m00 * v.x + this.m01 * v.y + this.m02 * v.z,
      this.m10 * v.x + this.m11 * v.y + this.m12 * v.z,
      this.m20 * v.x + this.m21 * v.y + this.m22 * v.z,
    );
  }
  mul(b: Mat3): Mat3 {
    const a = this;
    return new Mat3(
      a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20, a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21, a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22,
      a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20, a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21, a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22,
      a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20, a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21, a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22,
    );
  }
  transpose(): Mat3 {
    return new Mat3(this.m00, this.m10, this.m20, this.m01, this.m11, this.m21, this.m02, this.m12, this.m22);
  }
  det(): number {
    const a = this;
    return a.m00 * (a.m11 * a.m22 - a.m12 * a.m21) - a.m01 * (a.m10 * a.m22 - a.m12 * a.m20) + a.m02 * (a.m10 * a.m21 - a.m11 * a.m20);
  }
  inverse(): Mat3 {
    const a = this;
    const d = this.det();
    const id = Math.abs(d) > 1e-15 ? 1 / d : 0;
    return new Mat3(
      (a.m11 * a.m22 - a.m12 * a.m21) * id, (a.m02 * a.m21 - a.m01 * a.m22) * id, (a.m01 * a.m12 - a.m02 * a.m11) * id,
      (a.m12 * a.m20 - a.m10 * a.m22) * id, (a.m00 * a.m22 - a.m02 * a.m20) * id, (a.m02 * a.m10 - a.m00 * a.m12) * id,
      (a.m10 * a.m21 - a.m11 * a.m20) * id, (a.m01 * a.m20 - a.m00 * a.m21) * id, (a.m00 * a.m11 - a.m01 * a.m10) * id,
    );
  }
  /** Multiplies column i by s[i] (rotation followed by a per-axis scale). */
  scaledCols(sx: number, sy: number, sz: number): Mat3 {
    return new Mat3(
      this.m00 * sx, this.m01 * sy, this.m02 * sz,
      this.m10 * sx, this.m11 * sy, this.m12 * sz,
      this.m20 * sx, this.m21 * sy, this.m22 * sz,
    );
  }
}

/** Rigid transform: basis (rotation, possibly scaled) and origin. */
export class Xform {
  constructor(readonly basis: Mat3 = Mat3.I, readonly origin: Vec3 = Vec3.ZERO) {}

  static readonly I = new Xform();

  static at(x: number, y: number, z: number, basis: Mat3 = Mat3.I): Xform {
    return new Xform(basis, new Vec3(x, y, z));
  }
  point(p: Vec3): Vec3 {
    return this.basis.apply(p).add(this.origin);
  }
  dir(v: Vec3): Vec3 {
    return this.basis.apply(v);
  }
  /** this ∘ b (b expressed in this frame). */
  mul(b: Xform): Xform {
    return new Xform(this.basis.mul(b.basis), this.point(b.origin));
  }
  /** Inverse for orthonormal bases. */
  inverseRigid(): Xform {
    const t = this.basis.transpose();
    return new Xform(t, t.apply(this.origin).neg());
  }
  withOrigin(o: Vec3): Xform {
    return new Xform(this.basis, o);
  }
  rotated(r: Mat3): Xform {
    return new Xform(this.basis.mul(r), this.origin);
  }
}

/** Basis whose X axis runs from a to b and whose Y axis leans towards `up`. */
export function segmentFrame(a: Vec3, b: Vec3, up: Vec3): Xform {
  return new Xform(Mat3.lookAlong(b.sub(a), up), a);
}

/**
 * Two-bone IK: the middle joint of root → mid → end reaching `target`, bending towards `pole`.
 * The reachable end is clamped to the chain's range and returned in `end`.
 */
export function twoBoneIK(root: Vec3, target: Vec3, l1: number, l2: number, pole: Vec3): { mid: Vec3; end: Vec3 } {
  const d = target.sub(root);
  const dist = d.length;
  const dir = dist > 1e-9 ? d.mul(1 / dist) : new Vec3(0, -1, 0);
  const maxReach = (l1 + l2) * 0.9995;
  const minReach = Math.abs(l1 - l2) + 1e-3;
  const c = clamp(dist, minReach, maxReach);
  const end = root.addScaled(dir, c);
  const a = (l1 * l1 - l2 * l2 + c * c) / (2 * c);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  let bend = pole.sub(dir.mul(pole.dot(dir)));
  if (bend.lengthSq < 1e-10) bend = dir.cross(Math.abs(dir.y) < 0.9 ? Vec3.Y : Vec3.X);
  bend = bend.norm(Vec3.X);
  return { mid: root.addScaled(dir, a).addScaled(bend, h), end };
}
