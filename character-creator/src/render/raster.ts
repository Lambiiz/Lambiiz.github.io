/**
 * CPU pixel renderer. A posed anatomy becomes one pixel-art frame:
 *
 *  1. Every bone is moved into view space (creature yaw + an oblique orthographic camera).
 *  2. Primitives are prepared analytically: ellipsoids as quadrics, round cones after Inigo Quilez,
 *     triangles as plates; clip planes cut them (hairlines, hood openings, coat tails).
 *  3. Groups are rasterised. Inside a group primitives form a soft union: silhouettes get fillets
 *     from a clamped distance field, depth and normals blend with a smooth maximum. Across groups a
 *     z-buffer decides (near/far limbs, clothing over the body).
 *  4. Stylisation: body-anchored patterns, quantised toon lighting with hue-shifted ramps, far-side
 *     darkening, micro textures, contact shadows, cleanup of stray pixels.
 *  5. Composition: palette colours, contour lines between overlapping parts, a selective outline.
 *  6. Faces and markings are stamped as designed pixel clusters, then the ground shadow.
 *
 * Everything works on one logical pixel grid: no scaling, no anti-aliasing.
 */

import { Domain, GF, PF, PrimKind, type Anatomy, type FeatureDef } from '../anatomy/anatomy';
import type { SkeletonPose } from '../anatomy/pose';
import { Shade, unpack, packRGBA } from '../core/color';
import { Mat3, Vec3, Xform, clamp, saturate } from '../core/math';
import { shadeLevel, type Palette } from './materials';
import { evaluateSurface, type SurfacePoint, type SurfaceSpec } from './surface';

export interface ViewSpec {
  /** Creature facing in the world: 0 = east, π/2 = north. */
  yaw: number;
  /** Camera elevation above the horizon (radians). */
  elevation: number;
  shadow: boolean;
  outline: boolean;
  /** Extra creature-space offset of the whole body (pixels). */
  offset?: Vec3;
}

export class Frame {
  readonly pixels: Uint32Array;
  constructor(readonly w: number, readonly h: number, readonly ox: number, readonly oy: number) {
    this.pixels = new Uint32Array(w * h);
  }
  clear(): void {
    this.pixels.fill(0);
  }
}

export interface RenderModel {
  anatomy: Anatomy;
  palette: Palette;
  surface: SurfaceSpec;
}

/** Light direction in world space: upper left, a little towards the viewer. */
export const WORLD_LIGHT = new Vec3(-0.5, 0.82, 0.3).norm();

/** World → view rotation for a camera elevation. */
export const worldToView = (elevation: number): Mat3 => Mat3.rotX(elevation);

// pixel flags
const F_COVERED = 1, F_FILLET = 2, F_BACK = 4, F_THIN = 8, F_CONTOUR = 16, F_FEATURE = 32, F_NOOUTLINE = 64, F_CAP = 128;

interface Clip {
  nx: number;
  ny: number;
  nz: number;
  d: number;
}

/** A primitive prepared in view space for one frame. */
interface PP {
  kind: number;
  /** Index in the prepared list (what the prim buffer stores). */
  idx: number;
  src: number;
  group: number;
  slot: number;
  flags: number;
  side: number;
  shadeBias: number;
  domain: number;
  u0: number;
  u1: number;
  domainLen: number;
  hard: boolean;
  capShade: number;
  clips: Clip[];
  x0: number; y0: number; x1: number; y1: number;
  // ellipsoid
  cx: number; cy: number; cz: number;
  qxx: number; qxy: number; qxz: number; qyy: number; qyz: number; qzz: number;
  mxx: number; mxy: number; myy: number;
  rmin: number; req: number;
  ainv: Mat3;
  // cone
  ax: number; ay: number; az: number; bx: number; by: number; bz: number;
  ra: number; rb: number;
  ddx: number; ddy: number; h2: number; coefA: number; coefB: number; degenerate: boolean;
  zTop: number; zBot: number;
  up: Vec3;
  // triangle
  p0: Vec3; p1: Vec3; p2: Vec3; tn: Vec3; back: boolean; area2: number;
}

const PLATE_HALF = 0.45;

// scratch results of the hit functions (avoid allocations in the inner loops)
let HZ = 0, HNX = 0, HNY = 0, HNZ = 1, HCAP = false;

export class Renderer {
  private w = 0;
  private h = 0;
  private ox = 0;
  private oy = 0;
  private z = new Float32Array(0);
  private nx = new Float32Array(0);
  private ny = new Float32Array(0);
  private nz = new Float32Array(0);
  private prim = new Int16Array(0);
  private group = new Uint8Array(0);
  private flags = new Uint8Array(0);
  private mat = new Uint8Array(0);
  private level = new Int8Array(0);
  private levelTmp = new Int8Array(0);
  private matTmp = new Uint8Array(0);
  private field = new Float32Array(0);

  private pp: PP[] = [];
  private boneView: Xform[] = [];
  private boneScale: number[] = [];
  private c2v = Mat3.I;
  private lightV = Vec3.Y;
  private halfV = Vec3.Z;
  private lateralV = Vec3.Z;
  private forwardV = Vec3.X;
  private cx0 = 0;
  private cy0 = 0;
  private cx1 = -1;
  private cy1 = -1;

  /** Statistics of the last frame (pixels covered, primitives drawn). */
  covered = 0;

  render(model: RenderModel, pose: SkeletonPose, view: ViewSpec, frame: Frame): void {
    const an = model.anatomy;
    this.w = frame.w;
    this.h = frame.h;
    this.ox = frame.ox;
    this.oy = frame.oy;
    this.ensure(frame.w * frame.h);
    frame.clear();

    const wv = worldToView(view.elevation);
    this.c2v = wv.mul(Mat3.rotY(view.yaw));
    this.lightV = wv.apply(WORLD_LIGHT).norm();
    this.halfV = this.lightV.add(Vec3.Z).norm();
    this.lateralV = this.c2v.apply(Vec3.Z);
    this.forwardV = this.c2v.apply(Vec3.X);
    const offset = view.offset ?? Vec3.ZERO;

    // 1. bones → view
    const n = pose.world.length;
    this.boneView.length = n;
    this.boneScale.length = n;
    for (let i = 0; i < n; i++) {
      const w = pose.world[i];
      this.boneView[i] = new Xform(this.c2v.mul(w.basis), this.c2v.apply(w.origin.add(offset)));
      const det = Math.abs(w.basis.det());
      this.boneScale[i] = det > 1e-9 ? Math.cbrt(det) : 1;
    }

    // 2. primitives
    this.prepare(an, pose.hide);
    // 3. groups
    this.rasterGroups(an);
    this.cleanupSilhouette();
    // 4. stylise
    this.stylize(model);
    this.contactShadows();
    this.cleanupShading();
    // 5. compose
    this.compose(model, frame, view, pose.flash);
    // 6. features & shadow
    this.drawFeatures(model, pose, frame);
    if (view.shadow && pose.shadow > 0) this.drawShadow(model, pose, frame, view, offset);
  }

  // ---------------------------------------------------------------------------------- buffers

  private ensure(n: number): void {
    if (this.z.length < n) {
      this.z = new Float32Array(n);
      this.nx = new Float32Array(n);
      this.ny = new Float32Array(n);
      this.nz = new Float32Array(n);
      this.prim = new Int16Array(n);
      this.group = new Uint8Array(n);
      this.flags = new Uint8Array(n);
      this.mat = new Uint8Array(n);
      this.level = new Int8Array(n);
      this.levelTmp = new Int8Array(n);
      this.matTmp = new Uint8Array(n);
      this.field = new Float32Array(n);
    }
    this.z.fill(-Infinity, 0, n);
    this.prim.fill(-1, 0, n);
    this.group.fill(255, 0, n);
    this.flags.fill(0, 0, n);
    this.level.fill(0, 0, n);
    this.mat.fill(0, 0, n);
  }

  // ---------------------------------------------------------------------------------- preparation

  private prepare(an: Anatomy, hide: Set<number>): void {
    this.pp.length = 0;
    const prims = an.prims;
    for (let i = 0; i < prims.length; i++) {
      const d = prims[i];
      if (an.scale < d.minScale || hide.has(d.group)) continue;
      const bv = this.boneView[d.boneA];
      const p = {
        kind: d.kind, src: i, group: d.group, slot: d.slot, flags: d.flags, side: d.side, shadeBias: d.shadeBias,
        domain: d.domain, u0: d.u0, u1: d.u1, domainLen: d.domainLen, hard: (d.flags & PF.Hard) !== 0, capShade: d.capShade,
        clips: d.clips.map((c) => {
          const nv = bv.basis.apply(c.n);
          const l = nv.length || 1;
          return { nx: nv.x / l, ny: nv.y / l, nz: nv.z / l, d: (c.d + nv.dot(bv.origin)) / l };
        }),
      } as PP;
      let ok: boolean;
      if (d.kind === PrimKind.Ellipsoid) ok = this.prepEllipsoid(p, d.a, d.radii, d.rot, d.boneA);
      else if (d.kind === PrimKind.Cone) ok = this.prepCone(p, d.boneA, d.a, d.ra, d.boneB, d.b, d.rb);
      else ok = this.prepTri(p, d.boneA, d.a, d.boneB, d.b, d.boneC, d.c);
      if (ok) {
        p.idx = this.pp.length;
        this.pp.push(p);
      }
    }
  }

  private setBox(p: PP, vx0: number, vy0: number, vx1: number, vy1: number): void {
    p.x0 = Math.floor(this.ox + vx0) - 1;
    p.x1 = Math.ceil(this.ox + vx1) + 1;
    p.y0 = Math.floor(this.oy - vy1) - 1;
    p.y1 = Math.ceil(this.oy - vy0) + 1;
  }

  private prepEllipsoid(p: PP, center: Vec3, radii: Vec3, rot: Mat3, bone: number): boolean {
    const bv = this.boneView[bone];
    const c = bv.point(center);
    const a = bv.basis.mul(rot).scaledCols(radii.x, radii.y, radii.z);
    if (Math.abs(a.det()) < 1e-9 || !c.isFinite()) return false;
    const ai = a.inverse();
    const c0 = ai.c0, c1 = ai.c1, c2 = ai.c2;
    p.qxx = c0.dot(c0); p.qxy = c0.dot(c1); p.qxz = c0.dot(c2);
    p.qyy = c1.dot(c1); p.qyz = c1.dot(c2); p.qzz = c2.dot(c2);
    if (p.qzz < 1e-12) return false;
    p.mxx = p.qxx - (p.qxz * p.qxz) / p.qzz;
    p.mxy = p.qxy - (p.qxz * p.qyz) / p.qzz;
    p.myy = p.qyy - (p.qyz * p.qyz) / p.qzz;
    p.cx = c.x; p.cy = c.y; p.cz = c.z;
    p.ainv = ai;
    const ex = Math.sqrt(a.m00 * a.m00 + a.m01 * a.m01 + a.m02 * a.m02);
    const ey = Math.sqrt(a.m10 * a.m10 + a.m11 * a.m11 + a.m12 * a.m12);
    const s = this.boneScale[bone];
    p.rmin = Math.min(radii.x, radii.y, radii.z) * s;
    p.req = 0.5 * (radii.y + radii.z) * s;
    this.setBox(p, c.x - ex, c.y - ey, c.x + ex, c.y + ey);
    return true;
  }

  private prepCone(p: PP, boneA: number, la: Vec3, ra0: number, boneB: number, lb: Vec3, rb0: number): boolean {
    const bA = this.boneView[boneA], bB = this.boneView[boneB];
    const a = bA.point(la), b = bB.point(lb);
    if (!a.isFinite() || !b.isFinite()) return false;
    const ra = ra0 * this.boneScale[boneA], rb = rb0 * this.boneScale[boneB];
    p.ax = a.x; p.ay = a.y; p.az = a.z; p.bx = b.x; p.by = b.y; p.bz = b.z;
    p.ra = ra; p.rb = rb;
    const dx = b.x - a.x, dy = b.y - a.y;
    const h = Math.sqrt(dx * dx + dy * dy);
    p.h2 = h;
    if (h <= Math.abs(ra - rb) + 1e-6) {
      p.degenerate = true;
      p.ddx = 1; p.ddy = 0;
      p.coefA = 1; p.coefB = 0;
    } else {
      p.degenerate = false;
      p.ddx = dx / h; p.ddy = dy / h;
      p.coefB = (ra - rb) / h;
      p.coefA = Math.sqrt(Math.max(0, 1 - p.coefB * p.coefB));
    }
    p.zTop = Math.max(a.z + ra, b.z + rb) + 1;
    p.zBot = Math.min(a.z - ra, b.z - rb) - 1;
    p.up = bA.basis.c1.norm(Vec3.Y);
    this.setBox(p, Math.min(a.x - ra, b.x - rb), Math.min(a.y - ra, b.y - rb), Math.max(a.x + ra, b.x + rb), Math.max(a.y + ra, b.y + rb));
    return true;
  }

  private prepTri(p: PP, bA: number, la: Vec3, bB: number, lb: Vec3, bC: number, lc: Vec3): boolean {
    const p0 = this.boneView[bA].point(la), p1 = this.boneView[bB].point(lb), p2 = this.boneView[bC].point(lc);
    if (!p0.isFinite() || !p1.isFinite() || !p2.isFinite()) return false;
    p.p0 = p0; p.p1 = p1; p.p2 = p2;
    let n = p1.sub(p0).cross(p2.sub(p0));
    const l = n.length;
    n = l > 1e-9 ? n.mul(1 / l) : Vec3.Z;
    p.back = n.z < 0;
    if (p.back) n = n.neg();
    p.tn = n;
    p.area2 = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
    const t = PLATE_HALF;
    this.setBox(p, Math.min(p0.x, p1.x, p2.x) - t, Math.min(p0.y, p1.y, p2.y) - t, Math.max(p0.x, p1.x, p2.x) + t, Math.max(p0.y, p1.y, p2.y) + t);
    return true;
  }

  // ---------------------------------------------------------------------------------- analytic shapes

  /** 2D signed distance from a view-space point to the primitive's silhouette. */
  private sd2(p: PP, x: number, y: number): number {
    if (p.kind === PrimKind.Ellipsoid) {
      const dx = x - p.cx, dy = y - p.cy;
      const q = p.mxx * dx * dx + 2 * p.mxy * dx * dy + p.myy * dy * dy;
      if (q < 1e-12) return -p.rmin;
      const rho = Math.sqrt(q);
      const gx = p.mxx * dx + p.mxy * dy, gy = p.mxy * dx + p.myy * dy;
      const gl = Math.sqrt(gx * gx + gy * gy);
      if (gl < 1e-12) return -p.rmin;
      return ((rho - 1) * rho) / gl;
    }
    if (p.kind === PrimKind.Cone) {
      const px = x - p.ax, py = y - p.ay;
      if (p.degenerate) {
        const d1 = Math.sqrt(px * px + py * py) - p.ra;
        const qx = x - p.bx, qy = y - p.by;
        return Math.min(d1, Math.sqrt(qx * qx + qy * qy) - p.rb);
      }
      const ly = px * p.ddx + py * p.ddy;
      const lx = Math.abs(px * p.ddy - py * p.ddx);
      const k = -p.coefB * lx + p.coefA * ly;
      if (k < 0) return Math.sqrt(lx * lx + ly * ly) - p.ra;
      if (k > p.coefA * p.h2) return Math.sqrt(lx * lx + (ly - p.h2) * (ly - p.h2)) - p.rb;
      return lx * p.coefA + ly * p.coefB - p.ra;
    }
    return sdTriangle(p, x, y) - PLATE_HALF;
  }

  /**
   * Front surface of a primitive at a pixel, honouring its clip planes. Sets HZ, HN*, HCAP.
   * `grazing`: the pixel is inside the 2D silhouette, so a numerical miss falls back to the rim.
   */
  private hit(p: PP, x: number, y: number, grazing: boolean): boolean {
    let zf: number, zb: number;
    if (p.kind === PrimKind.Ellipsoid) {
      const dx = x - p.cx, dy = y - p.cy;
      const bq = p.qxz * dx + p.qyz * dy;
      const cq = p.qxx * dx * dx + 2 * p.qxy * dx * dy + p.qyy * dy * dy - 1;
      let disc = bq * bq - p.qzz * cq;
      if (disc < 0) {
        if (!grazing) return false;
        disc = 0;
      }
      const sq = Math.sqrt(disc);
      const sf = (-bq + sq) / p.qzz;
      zf = p.cz + sf;
      zb = p.cz + (-bq - sq) / p.qzz;
      HNX = p.qxx * dx + p.qxy * dy + p.qxz * sf;
      HNY = p.qxy * dx + p.qyy * dy + p.qyz * sf;
      HNZ = p.qxz * dx + p.qyz * dy + p.qzz * sf;
    } else if (p.kind === PrimKind.Cone) {
      if (!this.coneRay(p, x, y, -1)) {
        if (!grazing) return false;
        this.coneRim(p, x, y);
      }
      zf = HZ;
      if (p.clips.length) {
        const nx = HNX, ny = HNY, nz = HNZ;
        zb = this.coneRay(p, x, y, 1) ? HZ : zf;
        HNX = nx; HNY = ny; HNZ = nz;
      } else zb = zf;
    } else {
      this.plate(p, x, y);
      HCAP = false;
      return true;
    }
    HCAP = false;
    const clips = p.clips;
    if (clips.length) {
      let zhi = zf, zlo = zb, cap = -1;
      for (let k = 0; k < clips.length; k++) {
        const c = clips[k];
        const r = c.d - c.nx * x - c.ny * y;
        if (Math.abs(c.nz) < 1e-6) {
          if (r < 0) return false;
          continue;
        }
        const bound = r / c.nz;
        if (c.nz > 0) {
          if (bound < zhi) {
            zhi = bound;
            cap = k;
          }
        } else if (bound > zlo) zlo = bound;
      }
      if (zhi < zlo) return false;
      if (cap >= 0) {
        const c = clips[cap];
        HNX = c.nx; HNY = c.ny; HNZ = c.nz;
        HCAP = true;
      }
      HZ = zhi;
    } else HZ = zf;
    const l = Math.sqrt(HNX * HNX + HNY * HNY + HNZ * HNZ);
    if (l > 1e-12) {
      HNX /= l; HNY /= l; HNZ /= l;
    } else {
      HNX = 0; HNY = 0; HNZ = 1;
    }
    return true;
  }

  /** Exact ray / round-cone intersection (after Inigo Quilez). dir -1: from the viewer, +1: from behind. */
  private coneRay(p: PP, x: number, y: number, dir: number): boolean {
    const roz = dir < 0 ? p.zTop : p.zBot;
    const bax = p.bx - p.ax, bay = p.by - p.ay, baz = p.bz - p.az;
    const oax = x - p.ax, oay = y - p.ay, oaz = roz - p.az;
    const obx = x - p.bx, oby = y - p.by, obz = roz - p.bz;
    const ra = p.ra, rb = p.rb;
    const rr = ra - rb;
    const m0 = bax * bax + bay * bay + baz * baz;
    const m1 = bax * oax + bay * oay + baz * oaz;
    const m2 = baz * dir;
    const m3 = oaz * dir;
    const m5 = oax * oax + oay * oay + oaz * oaz;
    const m6 = obz * dir;
    const m7 = obx * obx + oby * oby + obz * obz;
    const d2 = m0 - rr * rr;
    if (d2 > 1e-9) {
      const k2 = d2 - m2 * m2;
      const k1 = d2 * m3 - m1 * m2 + m2 * rr * ra;
      const k0 = d2 * m5 - m1 * m1 + m1 * rr * ra * 2 - m0 * ra * ra;
      const h = k1 * k1 - k0 * k2;
      if (h >= 0 && Math.abs(k2) > 1e-9) {
        const t = (-Math.sqrt(h) - k1) / k2;
        const yy = m1 - ra * rr + t * m2;
        if (yy > 0 && yy < d2 && t >= 0) {
          HZ = roz + dir * t;
          // normal = d2 * (oa + t rd) - ba * yy
          HNX = d2 * oax - bax * yy;
          HNY = d2 * oay - bay * yy;
          HNZ = d2 * (oaz + t * dir) - baz * yy;
          return true;
        }
      }
    }
    let best = Infinity;
    const h1 = m3 * m3 - m5 + ra * ra;
    if (h1 > 0) {
      const t = -m3 - Math.sqrt(h1);
      if (t < best) {
        best = t;
        HNX = oax; HNY = oay; HNZ = oaz + t * dir;
      }
    }
    const h2 = m6 * m6 - m7 + rb * rb;
    if (h2 > 0) {
      const t = -m6 - Math.sqrt(h2);
      if (t < best) {
        best = t;
        HNX = obx; HNY = oby; HNZ = obz + t * dir;
      }
    }
    if (best === Infinity) return false;
    HZ = roz + dir * best;
    return true;
  }

  /** Depth and normal of the silhouette rim of a cone nearest to a pixel (fillets, grazing pixels). */
  private coneRim(p: PP, x: number, y: number): void {
    const px = x - p.ax, py = y - p.ay;
    const t = p.h2 > 1e-9 ? saturate((px * p.ddx + py * p.ddy) / p.h2) : 0;
    HZ = p.az + (p.bz - p.az) * t;
    const cx = p.ax + (p.bx - p.ax) * t, cy = p.ay + (p.by - p.ay) * t;
    HNX = x - cx; HNY = y - cy; HNZ = 0;
    const l = Math.hypot(HNX, HNY);
    if (l > 1e-9) {
      HNX /= l; HNY /= l;
    } else {
      HNX = 0; HNY = 0; HNZ = 1;
    }
  }

  private rim(p: PP, x: number, y: number): void {
    if (p.kind === PrimKind.Ellipsoid) {
      const dx = x - p.cx, dy = y - p.cy;
      HZ = p.cz - (p.qxz * dx + p.qyz * dy) / p.qzz;
      const gx = p.mxx * dx + p.mxy * dy, gy = p.mxy * dx + p.myy * dy;
      const l = Math.hypot(gx, gy);
      HNX = l > 1e-9 ? gx / l : 0; HNY = l > 1e-9 ? gy / l : 0; HNZ = l > 1e-9 ? 0 : 1;
    } else if (p.kind === PrimKind.Cone) this.coneRim(p, x, y);
    else this.plate(p, x, y);
  }

  private plate(p: PP, x: number, y: number): void {
    HNX = p.tn.x; HNY = p.tn.y; HNZ = p.tn.z;
    const area = p.area2;
    if (Math.abs(area) > 0.25) {
      let l1 = ((x - p.p0.x) * (p.p2.y - p.p0.y) - (y - p.p0.y) * (p.p2.x - p.p0.x)) / area;
      let l2 = ((p.p1.x - p.p0.x) * (y - p.p0.y) - (p.p1.y - p.p0.y) * (x - p.p0.x)) / area;
      let l0 = 1 - l1 - l2;
      l0 = Math.max(0, l0); l1 = Math.max(0, l1); l2 = Math.max(0, l2);
      const s = l0 + l1 + l2 || 1;
      HZ = (l0 * p.p0.z + l1 * p.p1.z + l2 * p.p2.z) / s;
      return;
    }
    // edge-on plate: depth along the nearest edge
    HZ = (p.p0.z + p.p1.z + p.p2.z) / 3;
  }

  // ---------------------------------------------------------------------------------- groups

  private aInside = new Uint8Array(0);
  private aFlags = new Uint8Array(0);
  private aZ = new Float64Array(0);
  private aNx = new Float64Array(0);
  private aNy = new Float64Array(0);
  private aNz = new Float64Array(0);
  private aDom = new Int32Array(0);
  private aField = new Float64Array(0);
  private aFz = new Float64Array(0);
  private aFw = new Float64Array(0);
  private aFnx = new Float64Array(0);
  private aFny = new Float64Array(0);
  private aFnz = new Float64Array(0);
  private aFdomW = new Float64Array(0);
  private aFdom = new Int32Array(0);
  private aCap = new Uint8Array(0);

  private ensureAccum(n: number): void {
    if (this.aInside.length >= n) return;
    const m = Math.max(n, this.aInside.length * 2);
    this.aInside = new Uint8Array(m); this.aFlags = new Uint8Array(m); this.aZ = new Float64Array(m);
    this.aNx = new Float64Array(m); this.aNy = new Float64Array(m); this.aNz = new Float64Array(m); this.aDom = new Int32Array(m);
    this.aField = new Float64Array(m); this.aFz = new Float64Array(m); this.aFw = new Float64Array(m);
    this.aFnx = new Float64Array(m); this.aFny = new Float64Array(m); this.aFnz = new Float64Array(m);
    this.aFdomW = new Float64Array(m); this.aFdom = new Int32Array(m); this.aCap = new Uint8Array(m);
  }

  private rasterGroups(an: Anatomy): void {
    const W = this.w, H = this.h;
    this.cx0 = W; this.cy0 = H; this.cx1 = -1; this.cy1 = -1;
    const byGroup: PP[][] = an.groups.map(() => []);
    for (const p of this.pp) byGroup[p.group].push(p);
    const ACC_BACK = 1, ACC_THIN = 2;

    for (let g = 0; g < an.groups.length; g++) {
      const list = byGroup[g];
      if (!list.length) continue;
      const grp = an.groups[g];
      const k = grp.blend;
      const invTwoK = k > 0 ? 1 / (2 * k) : 0;
      const pad = Math.ceil(k);
      let gx0 = Infinity, gy0 = Infinity, gx1 = -Infinity, gy1 = -Infinity;
      for (const p of list) {
        gx0 = Math.min(gx0, p.x0 - pad); gy0 = Math.min(gy0, p.y0 - pad);
        gx1 = Math.max(gx1, p.x1 + pad); gy1 = Math.max(gy1, p.y1 + pad);
      }
      gx0 = Math.max(0, gx0); gy0 = Math.max(0, gy0);
      gx1 = Math.min(W - 1, gx1); gy1 = Math.min(H - 1, gy1);
      if (gx1 < gx0 || gy1 < gy0) continue;
      const gw = gx1 - gx0 + 1, gh = gy1 - gy0 + 1, gn = gw * gh;
      this.ensureAccum(gn);
      const { aInside, aFlags, aZ, aNx, aNy, aNz, aDom, aField, aFz, aFw, aFnx, aFny, aFnz, aFdomW, aFdom, aCap } = this;
      aInside.fill(0, 0, gn); aField.fill(0, 0, gn); aFw.fill(0, 0, gn); aFz.fill(0, 0, gn);
      aFnx.fill(0, 0, gn); aFny.fill(0, 0, gn); aFnz.fill(0, 0, gn); aFdomW.fill(0, 0, gn);
      aFdom.fill(-1, 0, gn); aDom.fill(-1, 0, gn); aCap.fill(0, 0, gn);

      for (const p of list) {
        const pi = p.idx;
        const clipped = p.clips.length > 0;
        const blend = k > 0 && !p.hard && !clipped;
        const ppad = blend ? pad : 0;
        const x0 = Math.max(gx0, p.x0 - ppad), x1 = Math.min(gx1, p.x1 + ppad);
        const y0 = Math.max(gy0, p.y0 - ppad), y1 = Math.min(gy1, p.y1 + ppad);
        const pflag = (p.kind === PrimKind.Tri && p.back ? ACC_BACK : 0) | ((p.flags & PF.Thin) !== 0 ? ACC_THIN : 0);
        for (let py = y0; py <= y1; py++) {
          const vy = this.oy - (py + 0.5);
          const row = (py - gy0) * gw - gx0;
          for (let px = x0; px <= x1; px++) {
            const vx = px + 0.5 - this.ox;
            const a = row + px;
            const sd = this.sd2(p, vx, vy);
            if (sd <= 0 && this.hit(p, vx, vy, !clipped)) {
              const z = HZ;
              if (aInside[a] === 0) {
                aInside[a] = 1;
                aZ[a] = z; aNx[a] = HNX; aNy[a] = HNY; aNz[a] = HNZ; aDom[a] = pi;
                aFlags[a] = pflag; aCap[a] = HCAP ? 1 : 0;
              } else if (k <= 0 || p.hard || clipped || this.pp[aDom[a]].hard || aCap[a]) {
                if (z > aZ[a]) {
                  aZ[a] = z; aNx[a] = HNX; aNy[a] = HNY; aNz[a] = HNZ; aDom[a] = pi;
                  aFlags[a] = pflag; aCap[a] = HCAP ? 1 : 0;
                }
              } else {
                const zAcc = aZ[a];
                const hh = saturate(0.5 + (0.5 * (z - zAcc)) / k);
                aZ[a] = zAcc + (z - zAcc) * hh + k * hh * (1 - hh);
                aNx[a] += (HNX - aNx[a]) * hh; aNy[a] += (HNY - aNy[a]) * hh; aNz[a] += (HNZ - aNz[a]) * hh;
                if (hh > 0.5) {
                  aDom[a] = pi;
                  aFlags[a] = pflag;
                }
              }
            }
            if (blend && sd < k) {
              let gi = 0.5 - sd * invTwoK;
              if (gi > 1) gi = 1;
              if (gi > 0) {
                aField[a] += gi;
                if (sd > 0) {
                  this.rim(p, vx, vy);
                  aFz[a] += gi * HZ; aFw[a] += gi;
                  aFnx[a] += gi * HNX; aFny[a] += gi * HNY; aFnz[a] += gi * HNZ;
                  if (gi > aFdomW[a]) {
                    aFdomW[a] = gi;
                    aFdom[a] = pi;
                  }
                }
              }
            }
          }
        }
      }

      // resolve: z-test the group against the frame
      const bias = grp.depthBias;
      const noOutline = (grp.flags & GF.NoOutline) !== 0 ? F_NOOUTLINE : 0;
      for (let py = gy0; py <= gy1; py++) {
        const row = (py - gy0) * gw;
        for (let px = gx0; px <= gx1; px++) {
          const a = row + (px - gx0);
          let zAcc: number, nX: number, nY: number, nZ: number, dom: number;
          let extra = 0, af: number;
          if (aInside[a] !== 0) {
            zAcc = aZ[a]; nX = aNx[a]; nY = aNy[a]; nZ = aNz[a]; dom = aDom[a];
            af = aFlags[a];
            if (aCap[a]) extra |= F_CAP;
          } else {
            const fw = aFw[a];
            if (aField[a] < 0.5 || fw <= 0 || aFdom[a] < 0) continue;
            zAcc = aFz[a] / fw;
            nX = aFnx[a]; nY = aFny[a]; nZ = aFnz[a] + 0.35 * fw;
            dom = aFdom[a];
            extra = F_FILLET;
            af = 0;
          }
          const zt = zAcc + bias;
          const idx = py * W + px;
          if (zt <= this.z[idx]) continue;
          let nl = Math.sqrt(nX * nX + nY * nY + nZ * nZ);
          if (nl < 1e-9) {
            nX = 0; nY = 0; nZ = 1; nl = 1;
          }
          this.z[idx] = zt;
          this.nx[idx] = nX / nl;
          this.ny[idx] = nY / nl;
          this.nz[idx] = nZ / nl;
          this.prim[idx] = dom;
          this.group[idx] = g;
          let f = F_COVERED | extra | noOutline;
          if (af & ACC_BACK) f |= F_BACK;
          if (af & ACC_THIN) f |= F_THIN;
          this.flags[idx] = f;
          if (px < this.cx0) this.cx0 = px;
          if (px > this.cx1) this.cx1 = px;
          if (py < this.cy0) this.cy0 = py;
          if (py > this.cy1) this.cy1 = py;
        }
      }
    }
  }

  /** Content bounds grown by one pixel (outline), clamped. */
  private region(): [number, number, number, number] {
    if (this.cx1 < this.cx0) return [0, 0, -1, -1];
    return [Math.max(0, this.cx0 - 1), Math.max(0, this.cy0 - 1), Math.min(this.w - 1, this.cx1 + 1), Math.min(this.h - 1, this.cy1 + 1)];
  }

  // ---------------------------------------------------------------------------------- cleanup

  private covered4(x: number, y: number): number {
    const W = this.w, f = this.flags;
    let n = 0;
    if (x > 0 && f[y * W + x - 1] & F_COVERED) n++;
    if (x < W - 1 && f[y * W + x + 1] & F_COVERED) n++;
    if (y > 0 && f[(y - 1) * W + x] & F_COVERED) n++;
    if (y < this.h - 1 && f[(y + 1) * W + x] & F_COVERED) n++;
    return n;
  }

  private uncover(i: number): void {
    this.flags[i] = 0;
    this.z[i] = -Infinity;
    this.prim[i] = -1;
    this.group[i] = 255;
  }

  private cleanupSilhouette(): void {
    const [rx0, ry0, rx1, ry1] = this.region();
    const W = this.w;
    // isolated specks
    for (let y = ry0; y <= ry1; y++) {
      for (let x = rx0; x <= rx1; x++) {
        const i = y * W + x;
        if (!(this.flags[i] & F_COVERED) || this.flags[i] & F_THIN) continue;
        if (this.covered4(x, y) === 0) this.uncover(i);
      }
    }
    // single pixel holes / notches inside one group
    const ox = [1, -1, 0, 0], oy = [0, 0, 1, -1];
    for (let y = Math.max(1, ry0); y <= Math.min(this.h - 2, ry1); y++) {
      for (let x = Math.max(1, rx0); x <= Math.min(W - 2, rx1); x++) {
        const i = y * W + x;
        if (this.flags[i] & F_COVERED) continue;
        if (this.covered4(x, y) < 3) continue;
        let src = -1, grp = -1, same = true, bestZ = -Infinity;
        for (let k = 0; k < 4; k++) {
          const j = (y + oy[k]) * W + x + ox[k];
          if (!(this.flags[j] & F_COVERED)) continue;
          if (grp < 0) grp = this.group[j];
          else if (this.group[j] !== grp) same = false;
          if (this.z[j] > bestZ) {
            bestZ = this.z[j];
            src = j;
          }
        }
        if (!same || src < 0) continue;
        this.z[i] = this.z[src];
        this.nx[i] = this.nx[src]; this.ny[i] = this.ny[src]; this.nz[i] = this.nz[src];
        this.prim[i] = this.prim[src];
        this.group[i] = this.group[src];
        this.flags[i] = (this.flags[src] | F_FILLET) & ~F_CAP;
      }
    }
  }

  // ---------------------------------------------------------------------------------- stylise

  private surfacePoint(p: PP, vx: number, vy: number, z: number, out: SurfacePoint): void {
    out.domain = p.domain;
    const len = Math.max(1, p.domainLen);
    if (p.kind === PrimKind.Ellipsoid) {
      const q = p.ainv.apply(new Vec3(vx - p.cx, vy - p.cy, z - p.cz));
      const t = saturate(q.x * 0.5 + 0.5);
      const tn = p.u0 + (p.u1 - p.u0) * t;
      out.t = tn;
      out.u = tn * len;
      out.theta = Math.atan2(q.z, q.y);
      const ring = Math.sqrt(Math.max(0, 1 - q.x * q.x));
      out.v = out.theta * p.req * Math.max(0.35, ring);
    } else if (p.kind === PrimKind.Cone) {
      const ax = p.bx - p.ax, ay = p.by - p.ay, az = p.bz - p.az;
      const al = Math.sqrt(ax * ax + ay * ay + az * az);
      const dir = al > 1e-9 ? new Vec3(ax / al, ay / al, az / al) : Vec3.X;
      const rel = new Vec3(vx - p.ax, vy - p.ay, z - p.az);
      const along = rel.dot(dir);
      const t = al > 1e-9 ? saturate(along / al) : 0;
      const tn = p.u0 + (p.u1 - p.u0) * t;
      out.t = tn;
      out.u = tn * len;
      const perp = rel.sub(dir.mul(along));
      const up = p.up.sub(dir.mul(p.up.dot(dir))).norm(Vec3.Y);
      const side = dir.cross(up);
      out.theta = Math.atan2(perp.dot(side), perp.dot(up));
      out.v = out.theta * (p.ra + (p.rb - p.ra) * t);
    } else {
      out.t = 0.5;
      out.u = 0.5 * len;
      out.theta = 0;
      out.v = 0;
    }
  }

  private stylize(model: RenderModel): void {
    const an = model.anatomy, pal = model.palette, surf = model.surface;
    const [rx0, ry0, rx1, ry1] = this.region();
    const W = this.w;
    const L = this.lightV, Hv = this.halfV;
    const sp: SurfacePoint = { domain: 0, u: 0, t: 0, theta: 0, v: 0 };
    const patternScale = an.patternScale;
    for (let y = ry0; y <= ry1; y++) {
      const vy = this.oy - (y + 0.5);
      for (let x = rx0; x <= rx1; x++) {
        const i = y * W + x;
        const fl = this.flags[i];
        if (!(fl & F_COVERED)) continue;
        const p = this.pp[this.prim[i]];
        const grp = an.groups[this.group[i]];
        const vx = x + 0.5 - this.ox;
        let slot = p.slot;
        let bias = p.shadeBias;
        let style = pal.styles[slot];
        const hasSurface = p.domain !== Domain.None;
        if (hasSurface && (surf.pattern !== 'none' || surf.countershade > 0 || surf.tips > 0 || surf.socks > 0 || style.texture !== 'none')) {
          this.surfacePoint(p, vx, vy, this.z[i] - grp.depthBias, sp);
          if (!(p.flags & PF.NoPattern)) {
            slot = evaluateSurface(surf, sp, slot, patternScale);
            style = pal.styles[slot];
          }
        }
        let nX = this.nx[i], nY = this.ny[i], nZ = this.nz[i];
        if (style.faceted || p.flags & PF.Faceted) [nX, nY, nZ] = this.facet(p.src, nX, nY, nZ);
        let level: number;
        if (pal.emissive[slot] || p.flags & PF.Emissive) {
          level = nZ > 0.55 ? Shade.Light : Shade.Base;
        } else if (fl & F_CAP) {
          level = Shade.Base + p.capShade + (nX * L.x + nY * L.y + nZ * L.z > 0.3 ? 0 : -1);
        } else {
          let ndl = nX * L.x + nY * L.y + nZ * L.z;
          const ndh = nX * Hv.x + nY * Hv.y + nZ * Hv.z;
          if (style.texture !== 'none' && hasSurface) ndl += textureOffset(style.texture, sp, patternScale, x, y);
          level = shadeLevel(style, ndl, ndh);
          if (level === Shade.Highlight && fl & F_FILLET) level = Shade.Light;
        }
        level += bias;
        if (fl & F_BACK) level -= 1;
        const side = grp.side || p.side;
        if (side !== 0 && !(grp.flags & GF.NoFarShade) && this.lateralV.z * side < -0.3) level -= 1;
        if (grp.flags & GF.CreaseShade && fl & F_FILLET && level > Shade.Shadow) level -= 1;
        this.mat[i] = slot;
        this.level[i] = clamp(level, Shade.Deep, Shade.Highlight);
      }
    }
  }

  /** Snaps a normal to one of a few seeded facet directions (stone, crystal). */
  private facet(seed: number, nx: number, ny: number, nz: number): [number, number, number] {
    let best = -2, bx = nx, by = ny, bz = nz;
    for (let k = 0; k < 7; k++) {
      const a = hashf(seed * 31 + k, 1) * Math.PI * 2;
      const e = hashf(seed * 31 + k, 2) * 1.2 - 0.2;
      const f = this.c2v.apply(new Vec3(Math.cos(a) * Math.cos(e), Math.sin(e), Math.sin(a) * Math.cos(e)));
      const d = f.x * nx + f.y * ny + f.z * nz;
      if (d > best) {
        best = d;
        bx = f.x; by = f.y; bz = f.z;
      }
    }
    if (best < 0.55) return [nx, ny, nz];
    const m = new Vec3(bx * 0.8 + nx * 0.2, by * 0.8 + ny * 0.2, bz * 0.8 + nz * 0.2).norm(Vec3.Z);
    return m.z < 0.05 ? [nx, ny, nz] : [m.x, m.y, m.z];
  }

  /** A short ray towards the light through the depth buffer: parts in the shadow of others drop a level. */
  private contactShadows(): void {
    const [rx0, ry0, rx1, ry1] = this.region();
    const W = this.w, H = this.h, L = this.lightV;
    const maxT = 6;
    for (let y = ry0; y <= ry1; y++) {
      const vy = this.oy - (y + 0.5);
      for (let x = rx0; x <= rx1; x++) {
        const i = y * W + x;
        if (!(this.flags[i] & F_COVERED) || this.level[i] < Shade.Base) continue;
        const p = this.pp[this.prim[i]];
        if (p.flags & PF.Emissive) continue;
        const vx = x + 0.5 - this.ox, z = this.z[i], prim = this.prim[i];
        let hit = false;
        for (let t = 1.5; t <= maxT && !hit; t += 1) {
          const sx = Math.floor(vx + L.x * t + this.ox), sy = Math.floor(this.oy - (vy + L.y * t));
          if (sx < 0 || sy < 0 || sx >= W || sy >= H) break;
          const j = sy * W + sx;
          if (!(this.flags[j] & F_COVERED) || this.prim[j] === prim) continue;
          if (this.pp[this.prim[j]].flags & PF.NoContactShadow) continue;
          const gap = this.z[j] - (z + L.z * t);
          hit = gap > 1.0 && gap < 18;
        }
        if (hit) this.level[i] = Math.max(Shade.Shadow, this.level[i] - 1);
      }
    }
  }

  private cleanupShading(): void {
    const [rx0, ry0, rx1, ry1] = this.region();
    const W = this.w;
    for (let y = ry0; y <= ry1; y++) {
      const r = y * W;
      this.levelTmp.set(this.level.subarray(r + rx0, r + rx1 + 1), r + rx0);
      this.matTmp.set(this.mat.subarray(r + rx0, r + rx1 + 1), r + rx0);
    }
    const counts = new Int32Array(8);
    const nb = [-1, 1, -W, W];
    for (let y = Math.max(1, ry0); y <= Math.min(this.h - 2, ry1); y++) {
      for (let x = Math.max(1, rx0); x <= Math.min(W - 2, rx1); x++) {
        const i = y * W + x;
        if (!(this.flags[i] & F_COVERED) || this.flags[i] & F_THIN) continue;
        const g = this.group[i];
        // isolated material speck (pattern noise) inside one group
        let sameGroup = 0, differ = 0;
        const matCount = new Map<number, number>();
        for (const o of nb) {
          const j = i + o;
          if (!(this.flags[j] & F_COVERED) || this.group[j] !== g) continue;
          sameGroup++;
          matCount.set(this.matTmp[j], (matCount.get(this.matTmp[j]) ?? 0) + 1);
          if (this.matTmp[j] !== this.matTmp[i]) differ++;
        }
        if (sameGroup >= 3 && differ === sameGroup) {
          let bestM = this.matTmp[i], bestC = 0;
          for (const [m, c] of matCount) if (c > bestC) {
            bestC = c;
            bestM = m;
          }
          if (bestC >= 3) this.mat[i] = bestM;
        }
        // isolated shade pixel
        counts.fill(0);
        let same = 0, total = 0;
        for (const o of nb) {
          const j = i + o;
          if (!(this.flags[j] & F_COVERED) || this.group[j] !== g || this.mat[j] !== this.mat[i]) continue;
          total++;
          const lv = this.levelTmp[j];
          counts[lv]++;
          if (lv === this.levelTmp[i]) same++;
        }
        if (total >= 3 && same === 0) {
          let best = this.levelTmp[i], bestC = 0;
          for (let lv = 0; lv < 8; lv++) if (counts[lv] > bestC) {
            bestC = counts[lv];
            best = lv;
          }
          if (this.levelTmp[i] !== Shade.Highlight || bestC >= 4) this.level[i] = best;
        }
      }
    }
  }

  // ---------------------------------------------------------------------------------- compose

  private compose(model: RenderModel, frame: Frame, view: ViewSpec, flash: number): void {
    const an = model.anatomy, pal = model.palette;
    const out = frame.pixels;
    const [rx0, ry0, rx1, ry1] = this.region();
    const W = this.w, H = this.h;
    for (let y = ry0; y <= ry1; y++) {
      for (let x = rx0; x <= rx1; x++) {
        const i = y * W + x;
        if (this.flags[i] & F_COVERED) out[i] = pal.color(this.mat[i], this.level[i]);
      }
    }
    // interior contours: a pixel right behind a clearly nearer part becomes a line
    const tau = 1.6, tauSelf = 5;
    const dx4 = [-1, 1, 0, 0], dy4 = [0, 0, -1, 1];
    for (let y = ry0; y <= ry1; y++) {
      for (let x = rx0; x <= rx1; x++) {
        const i = y * W + x;
        if (!(this.flags[i] & F_COVERED)) continue;
        const g = this.group[i];
        const zi = this.z[i];
        let front = -1, frontZ = -Infinity;
        for (let k = 0; k < 4; k++) {
          const nx = x + dx4[k], ny = y + dy4[k];
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const j = ny * W + nx;
          if (!(this.flags[j] & F_COVERED)) continue;
          const gj = this.group[j];
          if (an.groups[gj].flags & GF.NoContour) continue;
          const gap = this.z[j] - zi;
          const edge = gj !== g ? gap > tau : gap > tauSelf + an.groups[g].blend;
          if (!edge) continue;
          if (this.z[j] > frontZ) {
            frontZ = this.z[j];
            front = j;
          }
        }
        if (front < 0) continue;
        const gap = frontZ - zi;
        out[i] = gap > 6 || this.level[i] <= Shade.Deep ? pal.color(this.mat[front], Shade.Outline) : pal.color(this.mat[i], Shade.Deep);
        this.flags[i] |= F_CONTOUR;
      }
    }
    // exterior outline (4-neighbourhood keeps diagonals clean); lit side gets a softer line
    if (view.outline) {
      for (let y = ry0; y <= ry1; y++) {
        for (let x = rx0; x <= rx1; x++) {
          const i = y * W + x;
          if (this.flags[i] & F_COVERED) continue;
          let best = -1, bestZ = -Infinity, lit = 0;
          for (let k = 0; k < 4; k++) {
            const nx = x + dx4[k], ny = y + dy4[k];
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const j = ny * W + nx;
            if (!(this.flags[j] & F_COVERED) || this.flags[j] & F_NOOUTLINE) continue;
            if (this.z[j] > bestZ) {
              bestZ = this.z[j];
              best = j;
            }
            if (this.level[j] >= Shade.Light) lit++;
          }
          if (best < 0) continue;
          const towardsLight = (y + 1 < H && this.flags[i + W] & F_COVERED && (y === 0 || !(this.flags[i - W] & F_COVERED))) ||
            (x + 1 < W && this.flags[i + 1] & F_COVERED && (x === 0 || !(this.flags[i - 1] & F_COVERED)));
          out[i] = pal.color(this.mat[best], lit > 0 && towardsLight ? Shade.Deep : Shade.Outline);
        }
      }
    }
    if (flash > 0) {
      for (let i = 0; i < out.length; i++) {
        const c = out[i];
        if (!c) continue;
        const [r, g, b, a] = unpack(c);
        out[i] = packRGBA(r + (255 - r) * flash, g + (250 - g) * flash, b + (240 - b) * flash, a);
      }
    }
  }

  // ---------------------------------------------------------------------------------- features

  private put(out: Uint32Array, x: number, y: number, c: number, needCover = true): void {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = y * this.w + x;
    if (needCover && !(this.flags[i] & F_COVERED)) return;
    out[i] = c;
    this.flags[i] |= F_FEATURE;
  }

  private drawFeatures(model: RenderModel, pose: SkeletonPose, frame: Frame): void {
    const an = model.anatomy, pal = model.palette;
    const out = frame.pixels;
    for (const f of an.features) {
      const bv = this.boneView[f.bone];
      const pos = bv.point(f.pos);
      const nrm = bv.dir(f.normal).norm(Vec3.Z);
      if (!pos.isFinite()) continue;
      const sx = this.ox + pos.x, sy = this.oy - pos.y;
      const cx = Math.floor(sx), cy = Math.floor(sy);
      if (cx < 0 || cy < 0 || cx >= this.w || cy >= this.h) continue;
      if (nrm.z < (f.kind === 'eye' ? -0.05 : 0.05)) continue;
      const ci = cy * this.w + cx;
      if (!(this.flags[ci] & F_COVERED)) continue;
      // occluded: something clearly in front of the feature point
      if (this.z[ci] > pos.z + 1.4 + f.size * 0.4) continue;
      const scale = this.boneScale[f.bone];
      switch (f.kind) {
        case 'eye':
          if (f.style === 'human') this.humanEye(f, pal, out, sx, sy, nrm, pose);
          else this.creatureEye(f, pal, out, sx, sy, nrm, pose, scale);
          break;
        case 'brow': {
          if (nrm.z < 0.15) break;
          const w = Math.max(1, Math.round(f.size * f.aspect * (0.5 + 0.5 * saturate(nrm.z * 1.3))));
          const c = pal.color(f.slot, Shade.Deep);
          const x0 = Math.floor(sx - w * 0.5 + 0.5);
          const angry = pose.mood === 'angry' || pose.mood === 'focus';
          for (let k = 0; k < w; k++) {
            // angry brows dip towards the nose
            const inner = (f.side < 0) === (this.forwardV.x >= 0) ? k === w - 1 : k === 0;
            this.put(out, x0 + k, cy + (angry && inner && w > 1 ? 1 : 0), c);
          }
          break;
        }
        case 'mouth': {
          if (nrm.z < 0.2) break;
          const open = pose.mouth;
          const facing = saturate(nrm.z * 1.4);
          const w = Math.max(1, Math.round(f.size * f.aspect * (0.45 + 0.55 * facing)));
          const x0 = Math.floor(sx - w * 0.5 + 0.5);
          const lip = pal.color(f.slot, Shade.Shadow);
          const dark = pal.color(f.slot, Shade.Outline);
          if (open > 0.4) {
            for (let k = 0; k < w; k++) this.put(out, x0 + k, cy, dark);
            if (f.size >= 1.6 || open > 0.75) for (let k = 0; k < w; k++) this.put(out, x0 + k, cy + 1, dark);
          } else if (pose.mood === 'happy' && w >= 2) {
            for (let k = 0; k < w; k++) this.put(out, x0 + k, cy, lip);
            this.put(out, x0 - 1, cy - 1, lip);
          } else {
            for (let k = 0; k < w; k++) this.put(out, x0 + k, cy, lip);
          }
          break;
        }
        case 'nostril':
          if (nrm.z > 0.15 && !(this.flags[ci] & F_CONTOUR)) this.put(out, cx, cy, pal.color(this.mat[ci], Shade.Deep));
          break;
        case 'blush':
          if (nrm.z > 0.4 && pose.blink < 0.5) this.put(out, cx, cy, pal.color(f.slot, Shade.Light));
          break;
        case 'spot':
          this.put(out, cx, cy, pal.color(f.slot, Shade.Highlight));
          break;
      }
    }
  }

  /**
   * Human eyes at small sizes, the way pixel artists draw them: a dark iris column with a lit
   * white on the outer side when there is room, a lid line on top for bigger faces.
   */
  private humanEye(f: FeatureDef, pal: Palette, out: Uint32Array, sx: number, sy: number, nrm: Vec3, pose: SkeletonPose): void {
    const facing = saturate(nrm.z * 1.3 + 0.1);
    const h = Math.max(1, Math.floor(f.size + 0.35));
    const wFull = Math.max(1, Math.floor(f.size * f.aspect + 0.4));
    const w = Math.max(1, Math.round(wFull * (0.5 + 0.5 * facing)));
    const x0 = Math.floor(sx - w * 0.5 + 0.5), y0 = Math.floor(sy - h * 0.5 + 0.5);
    const ink = pal.color(f.slot, Shade.Outline);
    const iris = pal.color(f.slot, Shade.Shadow);
    const irisL = pal.color(f.slot, Shade.Base);
    const white = packRGBA(236, 232, 226);
    const whiteShade = packRGBA(196, 188, 190);
    const lid = pal.color(this.mat[Math.max(0, Math.min(this.w * this.h - 1, Math.floor(sy) * this.w + Math.floor(sx)))], Shade.Deep);
    // where the eye looks on screen: the creature's forward direction
    const look = this.forwardV.x > 0.35 ? 1 : this.forwardV.x < -0.35 ? -1 : 0;
    if (pose.blink > 0.5 || pose.mood === 'dead') {
      for (let k = 0; k < w; k++) this.put(out, x0 + k, y0 + h - 1, pose.mood === 'dead' ? ink : lid);
      return;
    }
    if (pose.mood === 'pain' && w >= 2) {
      for (let k = 0; k < w; k++) this.put(out, x0 + k, y0 + h - 1, ink);
      return;
    }
    if (w === 1) {
      for (let k = 0; k < h; k++) this.put(out, x0, y0 + k, k === 0 && h >= 2 ? ink : ink);
      return;
    }
    // iris column(s) towards the look direction, whites on the other side
    const irisW = w >= 4 ? 2 : 1;
    const irisX = look > 0 ? w - irisW : look < 0 ? 0 : Math.floor((w - irisW) / 2 + (f.side > 0 ? 0.5 : 0));
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        const isIris = xx >= irisX && xx < irisX + irisW;
        let c: number;
        if (isIris) c = yy === 0 && h >= 3 ? ink : h >= 3 && yy === h - 1 ? irisL : h >= 2 && yy > 0 ? iris : ink;
        else c = yy === 0 && h >= 3 ? ink : yy === h - 1 && h >= 2 ? whiteShade : white;
        if (isIris && h >= 2 && w >= 3 && yy === Math.min(1, h - 1) && xx === irisX) c = ink;
        this.put(out, x0 + xx, y0 + yy, c);
      }
    }
  }

  /** Creature eyes (round, bead, slit, glow, button, compound), scaled with the head. */
  private creatureEye(f: FeatureDef, pal: Palette, out: Uint32Array, sx: number, sy: number, nrm: Vec3, pose: SkeletonPose, scale: number): void {
    const facing = saturate(nrm.z * 1.25 + 0.15);
    const h = Math.max(1, Math.floor(f.size * scale + 0.7));
    const wFull = Math.max(1, Math.floor(f.size * f.aspect * scale + 0.7));
    let w = Math.max(1, Math.round(wFull * (0.45 + 0.55 * facing)));
    if (h >= 2 && wFull >= 2 && facing > 0.3) w = Math.max(2, w);
    const x0 = Math.floor(sx - w * 0.5 + 0.5), y0 = Math.floor(sy - h * 0.5 + 0.5);
    const ink = pal.color(f.slot, Shade.Outline);
    const iris = pal.color(f.slot, Shade.Base);
    const irisDark = pal.color(f.slot, Shade.Shadow);
    const irisLight = pal.color(f.slot, Shade.Light);
    const shine = pal.color(f.slot, Shade.Highlight);
    const sclera = packRGBA(238, 234, 222);
    const look = this.forwardV.x > 0.3 ? 1 : this.forwardV.x < -0.3 ? -1 : 0;
    if (pose.blink > 0.5 || pose.mood === 'dead' || pose.mood === 'pain') {
      const lw = Math.max(1, Math.min(w + (h >= 3 ? 1 : 0), 5));
      const lx0 = Math.floor(sx - lw * 0.5 + 0.5), ly = Math.floor(sy + (h >= 3 ? 0.5 : 0));
      for (let k = 0; k < lw; k++) this.put(out, lx0 + k, ly - ((pose.mood === 'pain' || pose.mood === 'dead') && lw >= 3 && (k === 0 || k === lw - 1) ? 1 : 0), ink);
      return;
    }
    const style = f.style;
    const pupilCol = look > 0 ? w - 1 - (w >= 4 ? 1 : 0) : look < 0 ? (w >= 4 ? 1 : 0) : Math.floor((w - 1) / 2);
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        if (w >= 4 && h >= 4) {
          const ex = (xx + 0.5) / w * 2 - 1, ey = (yy + 0.5) / h * 2 - 1;
          if (ex * ex + ey * ey > 1.05) continue;
        }
        let c = ink;
        const isShine = xx === (look > 0 ? Math.max(0, pupilCol - 1) : Math.min(w - 1, pupilCol + (w >= 3 ? 0 : 1))) && yy === 0 && (w >= 2 || h >= 3);
        switch (style) {
          case 'glow':
            c = xx === pupilCol || w * h <= 2 ? pal.color(f.slot, Shade.Highlight) : pal.color(f.slot, Shade.Light);
            break;
          case 'slit':
            c = xx === pupilCol && (yy > 0 || h < 3) ? ink : isShine && w >= 3 ? irisLight : yy >= h - 1 && h >= 3 ? irisDark : iris;
            if (w * h === 1) c = iris;
            break;
          case 'round':
            if (w === 1) c = h >= 2 && yy === 0 ? sclera : ink;
            else if (xx === pupilCol || (w >= 5 && Math.abs(xx - pupilCol) === 1 && yy > 0 && yy < h - 1)) c = yy === 0 && h >= 3 ? (w >= 4 ? shine : iris) : ink;
            else if (w >= 4 && Math.abs(xx - pupilCol) === 1) c = iris;
            else c = h === 1 ? sclera : sclera;
            break;
          case 'compound':
            c = isShine ? shine : yy >= h / 2 ? ink : irisDark;
            break;
          case 'button':
            c = (w >= 2 && h >= 2 && xx === (look > 0 ? w - 1 : 0) && yy === 0) || (isShine && w >= 3) ? shine : ink;
            break;
          default: // bead
            c = isShine && w * h >= 4 ? shine : ink;
        }
        this.put(out, x0 + xx, y0 + yy, c);
      }
    }
  }

  // ---------------------------------------------------------------------------------- ground shadow

  private drawShadow(model: RenderModel, pose: SkeletonPose, frame: Frame, view: ViewSpec, offset: Vec3): void {
    const an = model.anatomy;
    const out = frame.pixels;
    const W = this.w, H = this.h;
    const field = this.field;
    field.fill(0, 0, W * H);
    const sinE = Math.sin(view.elevation);
    const blobs: [number, number, number, number][] = [];
    for (const p of this.pp) {
      if (p.flags & (PF.NoShadow | PF.Thin) || p.kind === PrimKind.Tri) continue;
      const caster = p.flags & PF.ShadowCaster || p.domain === Domain.Body || p.domain === Domain.Limb || p.domain === Domain.Neck || p.domain === Domain.Head || p.domain === Domain.Belly;
      if (!caster) continue;
      const def = an.prims[p.src];
      let c: Vec3, r: number;
      if (p.kind === PrimKind.Ellipsoid) {
        c = pose.world[def.boneA].point(def.a);
        r = Math.sqrt(def.radii.x * def.radii.z) * this.boneScale[def.boneA];
      } else {
        const a = pose.world[def.boneA].point(def.a), b = pose.world[def.boneB].point(def.b);
        c = a.y < b.y ? a : b;
        r = Math.max(def.ra, def.rb) * 1.25;
      }
      c = c.add(offset);
      if (r < 1) continue;
      const height = Math.max(0, c.y - r);
      const fade = clamp(1 - height / (r * 4 + 20), 0, 1);
      if (fade <= 0.05) continue;
      blobs.push([c.x, c.z, r * (0.55 + 0.5 * fade) * pose.shadow, fade]);
    }
    for (const [bx, bz, br, bw] of blobs) {
      const c = this.c2v.apply(new Vec3(bx, 0, bz));
      const rx = br * 1.35, ry = Math.max(1, br * 1.35 * sinE);
      const scx = this.ox + c.x, scy = this.oy - c.y;
      const x0 = Math.max(0, Math.floor(scx - rx)), x1 = Math.min(W - 1, Math.ceil(scx + rx));
      const y0 = Math.max(0, Math.floor(scy - ry)), y1 = Math.min(H - 1, Math.ceil(scy + ry));
      for (let y = y0; y <= y1; y++) {
        const dy = (y + 0.5 - scy) / ry;
        for (let x = x0; x <= x1; x++) {
          const dx = (x + 0.5 - scx) / rx;
          const d2 = dx * dx + dy * dy;
          if (d2 >= 1) continue;
          const f = 1 - d2;
          field[y * W + x] += f * f * bw;
        }
      }
    }
    const sh = model.palette.shadow;
    for (let i = 0; i < W * H; i++) if (field[i] > 0.33 && out[i] === 0) out[i] = sh;
  }

  /** Bounding box of the covered pixels of the last frame (for canvas sizing). */
  bounds(): [number, number, number, number] {
    return [this.cx0, this.cy0, this.cx1, this.cy1];
  }
}

function hashf(a: number, b: number): number {
  let h = Math.imul(a | 0, 0x27d4eb2d) ^ Math.imul(b | 0, 0x165667b1);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

function sdTriangle(p: PP, px: number, py: number): number {
  const { p0, p1, p2 } = p;
  const e0x = p1.x - p0.x, e0y = p1.y - p0.y;
  const e1x = p2.x - p1.x, e1y = p2.y - p1.y;
  const e2x = p0.x - p2.x, e2y = p0.y - p2.y;
  const v0x = px - p0.x, v0y = py - p0.y;
  const v1x = px - p1.x, v1y = py - p1.y;
  const v2x = px - p2.x, v2y = py - p2.y;
  const t0 = saturate((v0x * e0x + v0y * e0y) / Math.max(1e-12, e0x * e0x + e0y * e0y));
  const t1 = saturate((v1x * e1x + v1y * e1y) / Math.max(1e-12, e1x * e1x + e1y * e1y));
  const t2 = saturate((v2x * e2x + v2y * e2y) / Math.max(1e-12, e2x * e2x + e2y * e2y));
  const q0x = v0x - e0x * t0, q0y = v0y - e0y * t0;
  const q1x = v1x - e1x * t1, q1y = v1y - e1y * t1;
  const q2x = v2x - e2x * t2, q2y = v2y - e2y * t2;
  let s = Math.sign(e0x * e2y - e0y * e2x);
  if (s === 0) s = 1;
  const d0 = q0x * q0x + q0y * q0y, s0 = s * (v0x * e0y - v0y * e0x);
  const d1 = q1x * q1x + q1y * q1y, s1 = s * (v1x * e1y - v1y * e1x);
  const d2 = q2x * q2x + q2y * q2y, s2 = s * (v2x * e2y - v2y * e2x);
  const dmin = Math.min(d0, d1, d2);
  const smin = Math.min(s0, s1, s2);
  return -Math.sqrt(dmin) * Math.sign(smin === 0 ? -1 : smin);
}

/** Micro texture: a small offset of the lighting term in surface coordinates (tufts, scales, links). */
function textureOffset(t: string, sp: SurfacePoint, scale: number, px: number, py: number): number {
  const u = sp.u / scale, v = Math.abs(sp.v) / scale;
  switch (t) {
    case 'fur': {
      const f = (u / 3 + 0.37 * Math.floor(v / 3)) % 1;
      return (Math.abs(f * 2 - 1) - 0.5) * 0.3;
    }
    case 'hair': {
      // strands along the part: alternating light/dark streaks
      const f = ((v / 2.2) % 1 + 1) % 1;
      return (f < 0.5 ? 0.08 : -0.08) + (((px * 7 + py * 3) % 5) - 2) * 0.012;
    }
    case 'scales': {
      const cell = 3.2;
      const row = Math.floor(v / cell);
      const off = row & 1 ? 0.5 : 0;
      const fu = (((u / cell + off) % 1) + 1) % 1 - 0.5;
      const fv = ((v / cell) % 1) - 0.5;
      return (0.28 - Math.sqrt(fu * fu * 1.2 + fv * fv)) * 0.55;
    }
    case 'plates': {
      const f = ((u / 4.6) % 1 + 1) % 1;
      return f < 0.22 ? -0.32 : 0.06;
    }
    case 'feathers': {
      const cell = 3.8;
      const row = Math.floor(u / cell);
      const off = row & 1 ? 0.5 : 0;
      const fv = (((v / cell + off) % 1) + 1) % 1 - 0.5;
      const fu = ((u / cell) % 1 + 1) % 1;
      return fu - (0.55 - 1.6 * fv * fv) > 0 ? -0.18 : 0.05;
    }
    case 'chain':
      // mail: a checker of rings in screen space reads best at this size
      return (px + py) & 1 ? 0.12 : -0.12;
    case 'knit':
      return ((px >> 1) + py) & 1 ? 0.06 : -0.06;
  }
  return 0;
}

/** Copies a frame into an ImageData (for canvas drawing). */
export function toImageData(f: Frame): ImageData {
  const bytes = new Uint8ClampedArray(f.pixels.buffer as ArrayBuffer, f.pixels.byteOffset, f.w * f.h * 4);
  return new ImageData(bytes.slice(), f.w, f.h);
}
