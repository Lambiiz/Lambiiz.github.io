import * as THREE from 'three';

/**
 * Blocky multi-level terrain from character grids.
 *
 *  - `tiles`: one character per tile naming its surface (see `surfaces` in the def).
 *  - `heights`: one character per tile, '0'-'9' = level × `step` world units.
 *  - Stairs: tiles whose surface char is in `stairs` (e.g. '^' climbing north). A run of stair tiles
 *    ramps between the ground before and after it; their own height digit is ignored.
 *
 * Wherever two neighbouring surfaces differ in height a wall is generated, textured by the higher
 * tile's wall material (cut stone under paving, earth under grass).
 */

export interface SurfaceDef {
  /** Material key for the top. */
  top: string;
  /** Material key for walls under this surface. */
  wall: string;
  walkable?: boolean;
}

export interface TerrainDef {
  tiles: string[];
  heights: string[];
  step: number;
  surfaces: Record<string, SurfaceDef>;
  /** Stair chars and the direction they climb toward. */
  stairs: Record<string, 'n' | 's' | 'e' | 'w'>;
  /** Material key for stair treads. */
  stairMaterial: string;
  /** World units per texture repeat (default 4 = 64 px textures). */
  texUnits?: number;
}

const DIRS = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0] } as const;

export class Terrain {
  readonly w: number;
  readonly d: number;
  private h: Float32Array;
  private surf: string[];
  /** Per tile: blocked by geometry placed on top (houses, wells…). */
  readonly blocked: Uint8Array;
  readonly colliders: { x: number; z: number; r: number }[] = [];
  readonly boxes: { x0: number; z0: number; x1: number; z1: number }[] = [];
  readonly group = new THREE.Group();

  constructor(readonly def: TerrainDef, private materials: Record<string, THREE.Material>) {
    this.d = def.tiles.length;
    this.w = def.tiles[0].length;
    this.h = new Float32Array(this.w * this.d);
    this.surf = [];
    this.blocked = new Uint8Array(this.w * this.d);
    for (let z = 0; z < this.d; z++) {
      for (let x = 0; x < this.w; x++) {
        const c = def.tiles[z][x] ?? ' ';
        this.surf.push(c);
        const hc = def.heights[z]?.[x] ?? '0';
        this.h[z * this.w + x] = (hc.charCodeAt(0) - 48) * def.step;
        const s = def.surfaces[c];
        if (!def.stairs[c] && (!s || s.walkable === false)) this.blocked[z * this.w + x] = 1;
      }
    }
    this.build();
  }

  surfaceAt(tx: number, tz: number): string {
    if (tx < 0 || tz < 0 || tx >= this.w || tz >= this.d) return ' ';
    return this.surf[tz * this.w + tx];
  }

  private levelAt(tx: number, tz: number): number {
    tx = THREE.MathUtils.clamp(tx, 0, this.w - 1);
    tz = THREE.MathUtils.clamp(tz, 0, this.d - 1);
    return this.h[tz * this.w + tx];
  }

  /** For a stair tile: [height at the low edge, height at the high edge], spanning the whole run. */
  private stairRange(tx: number, tz: number): { lo: number; hi: number; t0: number; t1: number; dir: 'n' | 's' | 'e' | 'w' } {
    const c = this.surfaceAt(tx, tz);
    const dir = this.def.stairs[c];
    const [dx, dz] = DIRS[dir];
    // walk back to the bottom of the run and forward to the top
    let back = 0, fwd = 0;
    while (this.def.stairs[this.surfaceAt(tx - dx * (back + 1), tz - dz * (back + 1))] === dir) back++;
    while (this.def.stairs[this.surfaceAt(tx + dx * (fwd + 1), tz + dz * (fwd + 1))] === dir) fwd++;
    const lo = this.levelAt(tx - dx * (back + 1), tz - dz * (back + 1));
    const hi = this.levelAt(tx + dx * (fwd + 1), tz + dz * (fwd + 1));
    const n = back + fwd + 1;
    return { lo, hi, t0: back / n, t1: (back + 1) / n, dir };
  }

  /** Continuous ground height (stairs are ramps for walking). */
  heightAt(x: number, z: number): number {
    const tx = Math.floor(x), tz = Math.floor(z);
    const c = this.surfaceAt(tx, tz);
    if (this.def.stairs[c]) {
      const r = this.stairRange(tx, tz);
      const fx = x - tx, fz = z - tz;
      const along = r.dir === 'n' ? 1 - fz : r.dir === 's' ? fz : r.dir === 'e' ? fx : 1 - fx;
      const t = r.t0 + (r.t1 - r.t0) * along;
      return r.lo + (r.hi - r.lo) * t;
    }
    return this.levelAt(tx, tz);
  }

  /** Height at a tile corner as seen from tile (tx, tz) — corners (cx, cz) in 0..1. */
  private cornerH(tx: number, tz: number, cx: number, cz: number): number {
    return this.heightAt(tx + THREE.MathUtils.clamp(cx, 0.0001, 0.9999), tz + THREE.MathUtils.clamp(cz, 0.0001, 0.9999));
  }

  blockTile(tx: number, tz: number): void {
    if (tx >= 0 && tz >= 0 && tx < this.w && tz < this.d) this.blocked[tz * this.w + tx] = 1;
  }

  /** Block a world-space axis-aligned rectangle (building footprints). */
  blockRect(x0: number, z0: number, x1: number, z1: number): void {
    this.boxes.push({ x0, z0, x1, z1 });
  }

  addCollider(x: number, z: number, r: number): void {
    this.colliders.push({ x, z, r });
  }

  /** Can a circle of radius r stand at (x, z), coming from height `fromH`? */
  canStand(x: number, z: number, r: number, fromH: number): boolean {
    for (const [ox, oz] of [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r], [r * 0.7, r * 0.7], [-r * 0.7, r * 0.7], [r * 0.7, -r * 0.7], [-r * 0.7, -r * 0.7]]) {
      const px = x + ox, pz = z + oz;
      const tx = Math.floor(px), tz = Math.floor(pz);
      if (tx < 0 || tz < 0 || tx >= this.w || tz >= this.d) return false;
      if (this.blocked[tz * this.w + tx]) return false;
      if (Math.abs(this.heightAt(px, pz) - fromH) > 0.42) return false;
    }
    for (const b of this.boxes) {
      if (x + r > b.x0 && x - r < b.x1 && z + r > b.z0 && z - r < b.z1) return false;
    }
    for (const c of this.colliders) {
      if (Math.hypot(x - c.x, z - c.z) < c.r + r) return false;
    }
    return true;
  }

  // -------------------------------------------------------------------------------------------
  // geometry
  // -------------------------------------------------------------------------------------------

  private build(): void {
    const U = this.def.texUnits ?? 4;
    const parts = new Map<string, { pos: number[]; uv: number[]; nrm: number[] }>();
    const get = (k: string) => {
      let p = parts.get(k);
      if (!p) parts.set(k, (p = { pos: [], uv: [], nrm: [] }));
      return p;
    };
    const quad = (k: string, a: number[], b: number[], c: number[], d: number[], ua: number[], ub: number[], uc: number[], ud: number[], n: number[]) => {
      const p = get(k);
      p.pos.push(...a, ...b, ...c, ...a, ...c, ...d);
      p.uv.push(...ua, ...ub, ...uc, ...ua, ...uc, ...ud);
      for (let i = 0; i < 6; i++) p.nrm.push(...n);
    };

    for (let tz = 0; tz < this.d; tz++) {
      for (let tx = 0; tx < this.w; tx++) {
        const c = this.surfaceAt(tx, tz);
        const isStair = !!this.def.stairs[c];
        const s = this.def.surfaces[c];
        if (!s && !isStair) continue;
        if (isStair) {
          this.buildStair(tx, tz, quad, U);
        } else {
          const y = this.levelAt(tx, tz);
          // top, UVs in world space so textures run continuously across tiles
          quad(s.top,
            [tx, y, tz + 1], [tx + 1, y, tz + 1], [tx + 1, y, tz], [tx, y, tz],
            [tx / U, -(tz + 1) / U], [(tx + 1) / U, -(tz + 1) / U], [(tx + 1) / U, -tz / U], [tx / U, -tz / U],
            [0, 1, 0]);
        }
        // walls toward lower neighbours
        const wallMat = s?.wall ?? this.def.stairMaterial;
        for (const [dir, [dx, dz]] of Object.entries(DIRS)) {
          const nx = tx + dx, nz = tz + dz;
          // edge endpoints in tile-local corner space, ordered so the quad faces outward
          let e: [number, number, number, number];
          if (dir === 's') e = [0, 1, 1, 1];
          else if (dir === 'n') e = [1, 0, 0, 0];
          else if (dir === 'e') e = [1, 1, 1, 0];
          else e = [0, 0, 0, 1];
          const h1 = this.cornerH(tx, tz, e[0], e[1]), h2 = this.cornerH(tx, tz, e[2], e[3]);
          let n1: number, n2: number;
          const inside = nx >= 0 && nz >= 0 && nx < this.w && nz < this.d;
          const ns = inside ? this.surfaceAt(nx, nz) : ' ';
          if (!inside || (!this.def.surfaces[ns] && !this.def.stairs[ns])) { n1 = n2 = Math.min(-1, h1 - 1); }
          else {
            n1 = this.cornerH(nx, nz, e[0] - dx, e[1] - dz);
            n2 = this.cornerH(nx, nz, e[2] - dx, e[3] - dz);
          }
          if (h1 - n1 < 0.01 && h2 - n2 < 0.01) continue;
          const x1 = tx + e[0], z1 = tz + e[1], x2 = tx + e[2], z2 = tz + e[3];
          const b1 = Math.min(n1, h1), b2 = Math.min(n2, h2);
          const along1 = dir === 'n' || dir === 's' ? x1 : z1, along2 = dir === 'n' || dir === 's' ? x2 : z2;
          const sgn = dir === 's' || dir === 'w' ? 1 : -1;
          quad(wallMat,
            [x1, b1, z1], [x2, b2, z2], [x2, h2, z2], [x1, h1, z1],
            [sgn * along1 / U, b1 / U], [sgn * along2 / U, b2 / U], [sgn * along2 / U, h2 / U], [sgn * along1 / U, h1 / U],
            [dx, 0, dz]);
        }
      }
    }

    for (const [k, p] of parts) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(p.pos, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(p.nrm, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(p.uv, 2));
      const m = new THREE.Mesh(g, this.materials[k]);
      m.receiveShadow = true;
      m.castShadow = true;
      m.name = `terrain:${k}`;
      this.group.add(m);
    }
  }

  private buildStair(tx: number, tz: number, quad: (k: string, a: number[], b: number[], c: number[], d: number[], ua: number[], ub: number[], uc: number[], ud: number[], n: number[]) => void, U: number): void {
    const r = this.stairRange(tx, tz);
    const k = this.def.stairMaterial;
    const steps = 3;
    // local frame: "along" climbs; build in (a, across) then map to world
    const map = (along: number, across: number, y: number): number[] => {
      switch (r.dir) {
        case 'n': return [tx + across, y, tz + 1 - along];
        case 's': return [tx + 1 - across, y, tz + along];
        case 'e': return [tx + along, y, tz + across];
        default: return [tx + 1 - along, y, tz + 1 - across];
      }
    };
    const dirV = DIRS[r.dir];
    for (let i = 0; i < steps; i++) {
      const a0 = i / steps, a1 = (i + 1) / steps;
      const yTop = r.lo + (r.hi - r.lo) * (r.t0 + (r.t1 - r.t0) * ((i + 1) / steps));
      const yBot = r.lo + (r.hi - r.lo) * (r.t0 + (r.t1 - r.t0) * (i / steps));
      // riser (faces down the stairs)
      const p0 = map(a0, 0, yBot), p1 = map(a0, 1, yBot), p2 = map(a0, 1, yTop), p3 = map(a0, 0, yTop);
      quad(k, p0, p1, p2, p3, [0, yBot / U * 2], [1 / U * 2, yBot / U * 2], [1 / U * 2, yTop / U * 2], [0, yTop / U * 2], [-dirV[0], 0, -dirV[1]]);
      // tread
      const q0 = map(a0, 0, yTop), q1 = map(a0, 1, yTop), q2 = map(a1, 1, yTop), q3 = map(a1, 0, yTop);
      quad(k, q0, q1, q2, q3, [0, a0 / 2], [0.5, a0 / 2], [0.5, a1 / 2], [0, a1 / 2], [0, 1, 0]);
    }
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose();
    });
  }
}

