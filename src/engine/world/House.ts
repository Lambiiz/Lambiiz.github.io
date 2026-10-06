import * as THREE from 'three';
import { PixelCanvas } from '../pixel/PixelCanvas';
import { shade, mix } from '../pixel/color';
import { Rng, fbm, hash2 } from '../core/rng';
import { pixelMaterial, toMaps, PX_PER_UNIT } from '../pixel/texture';
import { roofTiles, stoneBlocks, bricks, timber as timberTex } from '../pixel/surfaces';

export type Side = 'n' | 's' | 'e' | 'w';

export interface HouseSpec {
  /** Footprint min corner and size in world units. */
  x: number;
  z: number;
  w: number;
  d: number;
  /** Ground height under the house. */
  y?: number;
  floors?: 1 | 2;
  style?: 'timber' | 'plaster' | 'brick' | 'stone';
  plaster?: number;
  timber?: number;
  roof?: number;
  /** Ridge direction. 'z' puts the gables on the north / south faces (toward the camera). */
  ridge?: 'x' | 'z';
  /** Roof rise per unit of half-span. */
  pitch?: number;
  door?: Side;
  /** Door position along the face, 0..1. */
  doorAt?: number;
  shutters?: number;
  flowers?: boolean;
  chimney?: boolean;
  seed?: number;
}

export const FLOOR_H = 2.75;
const FOUND_H = 0.35;

export interface HouseResult {
  group: THREE.Group;
  /** Window materials (emissive at night). */
  windowMats: THREE.MeshStandardMaterial[];
  /** World position of the door's threshold (for interactions and lamps). */
  door: THREE.Vector3 | null;
  doorSide: Side;
}

interface FacadeInfo {
  faceW: number;
  wallH: number;
  gable: number;
  hasDoor: boolean;
  doorAt: number;
}

/** Paint one wall face (and its gable triangle when `gable` > 0). */
function paintFacade(spec: Required<HouseSpec>, info: FacadeInfo, seed: number): PixelCanvas {
  const W = Math.round(info.faceW * PX_PER_UNIT);
  const HW = Math.round(info.wallH * PX_PER_UNIT);
  const HG = Math.round(info.gable * PX_PER_UNIT);
  const H = HW + HG;
  const pc = new PixelCanvas(W, H);
  const rng = new Rng(seed);
  const plaster = spec.plaster, wood = spec.timber;
  const top = (y: number) => H - 1 - y; // canvas row for height y px above the base
  // inside the gable silhouette?
  const inGable = (x: number, yUp: number) => {
    if (yUp < HW) return true;
    const t = (yUp - HW) / Math.max(1, HG);
    const half = (W / 2) * (1 - t);
    return Math.abs(x + 0.5 - W / 2) <= half;
  };

  // --- base material ---
  for (let y = 0; y < H; y++) {
    const yUp = H - 1 - y;
    for (let x = 0; x < W; x++) {
      if (!inGable(x, yUp)) continue;
      let c: number, h = 0.5;
      const n = fbm(x, y, W, H, 6, 3, seed) - 0.5;
      if (spec.style === 'brick' && yUp < HW) {
        const row = Math.floor(yUp / 4), off = row % 2 ? 4 : 0;
        const ix = (x + off) % 8, iy = yUp % 4;
        const t = hash2(Math.floor((x + off) / 8), row, seed);
        if (ix === 0 || iy === 0) { c = 0x5a4a40; h = 0.2; }
        else { c = shade(mix(0xa0573e, t > 0.5 ? 0xb87a52 : 0x7a3e34, Math.abs(t - 0.5)), (iy === 3 ? 0.2 : 0) + n * 0.3); h = 0.6; }
      } else if (spec.style === 'stone' && yUp < HW) {
        const row = Math.floor(yUp / 7), off = Math.floor(hash2(row, 0, seed) * 9);
        const ix = (x + off) % 11, iy = yUp % 7;
        const t = hash2(Math.floor((x + off) / 11), row, seed);
        if (ix === 0 || iy === 0) { c = 0x4a423a; h = 0.15; }
        else { c = shade(mix(0xa89c8a, 0x8a8478, t), (iy === 6 ? 0.2 : iy === 1 ? -0.15 : 0) + n * 0.4); h = 0.6; }
      } else {
        c = shade(plaster, n * 0.28);
        c = mix(c, shade(plaster, -0.35), Math.max(0, fbm(x, y, W, H, 3, 2, seed + 9) - 0.62) * 1.5);
        // grime toward the bottom
        if (yUp < 10) c = shade(c, -(10 - yUp) * 0.02);
      }
      pc.set(x, y, c);
      pc.setHeight(x, y, h);
    }
  }

  const beam = (x0: number, y0: number, x1: number, y1: number, thick = 3) => {
    // y in "up" pixels
    const len = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= len; i++) {
      const t = len ? i / len : 0;
      const bx = x0 + (x1 - x0) * t, by = y0 + (y1 - y0) * t;
      for (let k = 0; k < thick; k++) {
        const horizontal = Math.abs(x1 - x0) >= Math.abs(y1 - y0);
        const px = Math.round(horizontal ? bx : bx + k), py = Math.round(horizontal ? by + k : by);
        if (px < 0 || px >= W || py < 0 || py >= H || !inGable(px, py)) continue;
        const edge = k === 0 ? -0.25 : k === thick - 1 ? 0.2 : 0;
        const g = Math.sin(i * 0.7 + k * 2 + seed) * 0.06;
        pc.set(px, top(py), shade(wood, edge + g + (horizontal ? 0 : 0.05)));
        pc.setHeight(px, top(py), 0.85);
      }
    }
  };

  // --- windows / door layout ---
  const floors = spec.floors;
  const floorPx = FLOOR_H * PX_PER_UNIT;
  const winW = 12, winH = 17;
  const bays = Math.max(1, Math.floor((W - 6) / 26));
  const bayX = (i: number) => Math.round(((i + 0.5) / bays) * W);
  const doorW = 18, doorH = 31;
  const doorX = info.hasDoor ? Math.round(THREE.MathUtils.clamp(info.doorAt * W, doorW / 2 + 4, W - doorW / 2 - 4)) : -999;

  // --- timber frame ---
  if (spec.style === 'timber' || spec.style === 'plaster') {
    const frame = spec.style === 'timber';
    beam(0, 0, 0, HW - 1, 3);
    beam(W - 3, 0, W - 3, HW - 1, 3);
    beam(0, HW - 3, W - 1, HW - 3, 3);
    if (frame) {
      for (let f = 1; f < floors; f++) beam(0, Math.round(f * floorPx) - 2, W - 1, Math.round(f * floorPx) - 2, 3);
      beam(0, 0, W - 1, 0, 2);
      for (let f = 0; f < floors; f++) {
        const y0 = Math.round(f * floorPx), y1 = Math.round((f + 1) * floorPx) - 3;
        // posts between bays
        for (let i = 1; i < bays; i++) {
          const px = Math.round((i / bays) * W) - 1;
          if (f === 0 && Math.abs(px - doorX) < doorW / 2 + 3) continue;
          beam(px, y0, px, y1, 3);
        }
        // diagonal braces in each bay corner (skip where windows / door sit)
        if (rng.chance(0.8)) {
          beam(3, y0 + 2, 3 + 8, y0 + Math.min(14, y1 - y0 - 2), 2);
          beam(W - 6, y0 + 2, W - 6 - 8, y0 + Math.min(14, y1 - y0 - 2), 2);
        }
      }
    }
    if (HG > 0) {
      // gable: rafters along the slopes, a king post and a collar
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const yy = HW + t * HG;
        const half = (W / 2) * (1 - t);
        for (let k = 0; k < 3; k++) {
          const lx = Math.round(W / 2 - half + k), rx = Math.round(W / 2 + half - 1 - k);
          for (const px of [lx, rx]) {
            if (px >= 0 && px < W) { pc.set(px, top(Math.round(yy)), shade(wood, k === 0 ? 0.15 : -0.1)); pc.setHeight(px, top(Math.round(yy)), 0.85); }
          }
        }
      }
      if (frame) {
        beam(Math.round(W / 2) - 1, HW, Math.round(W / 2) - 1, HW + HG - 4, 3);
        beam(Math.round(W * 0.22), HW + Math.round(HG * 0.42), Math.round(W * 0.78), HW + Math.round(HG * 0.42), 3);
        beam(Math.round(W / 2) - 1, HW + 2, Math.round(W * 0.2), HW + Math.round(HG * 0.36), 2);
        beam(Math.round(W / 2) + 1, HW + 2, Math.round(W * 0.8), HW + Math.round(HG * 0.36), 2);
      }
    }
  }

  // --- windows ---
  const windowAt = (cx: number, yBase: number, w: number, h: number, round = false) => {
    const x0 = cx - Math.floor(w / 2);
    // stone / wood frame
    for (let y = -1; y <= h; y++) {
      for (let x = -1; x <= w; x++) {
        const px = x0 + x, py = yBase + y;
        const edge = x === -1 || y === -1 || x === w || y === h;
        if (round && y > h - 3 && (x < 1 || x > w - 2) && !edge) continue;
        if (edge) { pc.set(px, top(py), shade(wood, y === h ? 0.15 : -0.15)); pc.setHeight(px, top(py), 0.75); continue; }
        // glass: dark blue-grey, a sky reflection streak, mullion cross
        const mull = x === Math.floor(w / 2) || y === Math.floor(h * 0.55);
        if (mull) { pc.set(px, top(py), shade(wood, -0.05)); pc.setHeight(px, top(py), 0.6); pc.setEmissive(px, top(py), 0x1a0c04); continue; }
        const refl = (x + (h - y)) % 9 < 2 && y > h * 0.5;
        const glass = refl ? 0x8aa4c0 : mix(0x2a3450, 0x40507a, y / h);
        pc.set(px, top(py), glass);
        pc.setHeight(px, top(py), 0.1);
        const warm = mix(0xffb050, 0xffe0a0, hash2(px, py, seed) * 0.4 + (y / h) * 0.3);
        pc.setEmissive(px, top(py), warm);
      }
    }
    // shutters
    if (spec.shutters >= 0) {
      for (const side of [-1, 1]) {
        const sx0 = side < 0 ? x0 - 1 - 6 : x0 + w + 1;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < 6; x++) {
            const px = sx0 + x, py = yBase + y;
            const slat = y % 3 === 0;
            const edge = x === 0 || x === 5;
            pc.set(px, top(py), shade(spec.shutters, (slat ? -0.25 : 0.05) + (edge ? -0.2 : 0) + (side < 0 ? 0 : -0.08)));
            pc.setHeight(px, top(py), slat ? 0.6 : 0.75);
          }
        }
      }
    }
    // sill
    for (let x = -2; x <= w + 1; x++) { pc.set(x0 + x, top(yBase - 2), shade(0xc8bca8, 0.1)); pc.set(x0 + x, top(yBase - 3), shade(0xc8bca8, -0.3)); pc.setHeight(x0 + x, top(yBase - 2), 0.95); }
    // flower box
    if (spec.flowers && rng.chance(0.75)) {
      const cols = [0xe86a8a, 0xf0d060, 0xffffff, 0xd070e0, 0xf08a40];
      const fc = rng.pick(cols), fc2 = rng.pick(cols);
      for (let x = -1; x <= w; x++) {
        for (let y = 0; y < 4; y++) { pc.set(x0 + x, top(yBase - 4 - y), shade(0x7a4a2a, y === 0 ? -0.3 : 0)); pc.setHeight(x0 + x, top(yBase - 4 - y), 0.9); }
        // foliage and blooms spilling over the box
        for (let y = 0; y < 3; y++) {
          if (rng.chance(0.85)) {
            const bloom = rng.chance(0.4);
            pc.set(x0 + x, top(yBase - 1 + y - 2), bloom ? (rng.chance(0.5) ? fc : fc2) : shade(0x5a8a3a, rng.range(-0.3, 0.3)));
            pc.setHeight(x0 + x, top(yBase - 1 + y - 2), 1);
          }
        }
      }
    }
  };

  for (let f = 0; f < floors; f++) {
    const yBase = Math.round(f * floorPx + (f === 0 ? 11 : 9));
    for (let i = 0; i < bays; i++) {
      const cx = bayX(i);
      if (f === 0 && info.hasDoor && Math.abs(cx - doorX) < doorW / 2 + winW / 2 + 8) continue;
      if (cx - winW / 2 - 7 < 2 || cx + winW / 2 + 7 > W - 2) {
        windowAt(cx, yBase, winW - 4, winH, false);
      } else windowAt(cx, yBase, winW, winH, f === floors - 1 && spec.style !== 'timber');
    }
  }
  if (HG > 18) {
    // small attic window in the gable
    windowAt(Math.round(W / 2), HW + Math.round(HG * 0.12), 8, 10, true);
  }

  // --- door ---
  if (info.hasDoor) {
    const x0 = doorX - doorW / 2;
    for (let y = -1; y < doorH + 3; y++) {
      for (let x = -2; x < doorW + 2; x++) {
        const cx = x + 0.5 - doorW / 2, archTop = doorH - 5;
        const r = doorW / 2 + 2;
        const inArch = y < archTop || cx * cx + ((y - archTop) * 1.3) ** 2 < r * r;
        if (!inArch) continue;
        const frame = x < 0 || x >= doorW || cx * cx + ((y - archTop) * 1.3) ** 2 > (r - 2) ** 2 && y >= archTop;
        const px = x0 + x, py = y;
        if (frame) { pc.set(px, top(py), shade(0xb0a490, ((x + y) % 5 === 0 ? -0.25 : 0) + (y > archTop ? 0.1 : 0))); pc.setHeight(px, top(py), 0.8); continue; }
        const plank = x % 4 === 0;
        const band = y === 6 || y === doorH - 9;
        let c = shade(0x7a4a2a, (plank ? -0.4 : 0) + Math.sin(y * 0.8 + x) * 0.05);
        if (band) c = shade(0x3a3438, 0.1);
        if (band && x % 4 === 2) c = 0x9a9aa0;
        if (x === doorW - 4 && y === 14) c = 0xd0b060;
        pc.set(px, top(py), c);
        pc.setHeight(px, top(py), plank ? 0.25 : 0.4);
      }
    }
  }
  return pc;
}

const matCache = new Map<string, THREE.MeshStandardMaterial>();
function sharedMat(key: string, make: () => THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  let m = matCache.get(key);
  if (!m) matCache.set(key, (m = make()));
  return m;
}

/** A slab (box-ish prism) from 4 bottom corners with a thickness, with per-face materials groups. */
function roofSlab(eave0: THREE.Vector3, eave1: THREE.Vector3, ridge1: THREE.Vector3, ridge0: THREE.Vector3, thick: number): THREE.BufferGeometry {
  // top surface: eave0 → eave1 → ridge1 → ridge0 ; normal points outward/up
  const up = new THREE.Vector3().subVectors(eave1, eave0).cross(new THREE.Vector3().subVectors(ridge0, eave0)).normalize();
  const off = up.clone().multiplyScalar(thick);
  const t = [eave0, eave1, ridge1, ridge0].map((p) => p.clone().add(off));
  const b = [eave0, eave1, ridge1, ridge0];
  const along = eave0.distanceTo(eave1), slope = eave0.distanceTo(ridge0);
  const pos: number[] = [], uv: number[] = [], groups: [number, number, number][] = [];
  const quad = (a: THREE.Vector3, bq: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3, uvs: number[][], mat: number) => {
    const start = pos.length / 3;
    for (const p of [a, bq, c, a, c, d]) pos.push(p.x, p.y, p.z);
    for (const i of [0, 1, 2, 0, 2, 3]) uv.push(...uvs[i]);
    groups.push([start, 6, mat]);
  };
  const U = 4;
  // tiles: u along the ridge, v up the slope
  quad(t[0], t[1], t[2], t[3], [[0, 0], [along / U, 0], [along / U, slope / U], [0, slope / U]], 0);
  quad(b[1], b[0], b[3], b[2], [[0, 0], [1, 0], [1, 1], [0, 1]], 1); // underside
  quad(b[0], b[1], t[1], t[0], [[0, 0], [along, 0], [along, 0.2], [0, 0.2]], 1); // eave edge
  quad(b[3], b[0], t[0], t[3], [[0, 0], [slope, 0], [slope, 0.2], [0, 0.2]], 1); // gable edges
  quad(b[1], b[2], t[2], t[1], [[0, 0], [slope, 0], [slope, 0.2], [0, 0.2]], 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  for (const [s, c, m] of groups) g.addGroup(s, c, m);
  g.computeVertexNormals();
  return g;
}

/** A wall face as a pentagon (or rectangle) in its own plane, UV mapped to the facade canvas. */
function wallFace(width: number, wallH: number, gable: number): THREE.BufferGeometry {
  const H = wallH + gable;
  const pts: [number, number][] = gable > 0 ? [[0, 0], [width, 0], [width, wallH], [width / 2, H], [0, wallH]] : [[0, 0], [width, 0], [width, wallH], [0, wallH]];
  const pos: number[] = [], uv: number[] = [];
  const tri = (a: number, b: number, c: number) => {
    for (const i of [a, b, c]) {
      pos.push(pts[i][0] - width / 2, pts[i][1], 0);
      uv.push(pts[i][0] / width, pts[i][1] / H);
    }
  };
  tri(0, 1, 2);
  tri(0, 2, pts.length - 1);
  if (gable > 0) tri(4, 2, 3);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

export function buildHouse(input: HouseSpec): HouseResult {
  const spec: Required<HouseSpec> = {
    y: 0, floors: 2, style: 'timber', plaster: 0xeadfc4, timber: 0x4a3226, roof: 0x4f7896, ridge: 'z', pitch: 1.15,
    door: 's', doorAt: 0.5, shutters: 0x3f6a4a, flowers: true, chimney: true, seed: 1,
    ...input,
  };
  const group = new THREE.Group();
  const windowMats: THREE.MeshStandardMaterial[] = [];
  const wallH = spec.floors * FLOOR_H;
  const span = spec.ridge === 'z' ? spec.w : spec.d;
  const rise = (span / 2) * spec.pitch;
  const cx = spec.x + spec.w / 2, cz = spec.z + spec.d / 2;
  const by = spec.y;

  // walls
  const faces: { side: Side; width: number; gable: number; pos: THREE.Vector3; rotY: number }[] = [
    { side: 's', width: spec.w, gable: spec.ridge === 'z' ? rise : 0, pos: new THREE.Vector3(cx, by, spec.z + spec.d), rotY: 0 },
    { side: 'n', width: spec.w, gable: spec.ridge === 'z' ? rise : 0, pos: new THREE.Vector3(cx, by, spec.z), rotY: Math.PI },
    { side: 'e', width: spec.d, gable: spec.ridge === 'x' ? rise : 0, pos: new THREE.Vector3(spec.x + spec.w, by, cz), rotY: Math.PI / 2 },
    { side: 'w', width: spec.d, gable: spec.ridge === 'x' ? rise : 0, pos: new THREE.Vector3(spec.x, by, cz), rotY: -Math.PI / 2 },
  ];
  let door: THREE.Vector3 | null = null;
  faces.forEach((f, i) => {
    const hasDoor = f.side === spec.door;
    const pc = paintFacade(spec, { faceW: f.width, wallH, gable: f.gable, hasDoor, doorAt: spec.doorAt }, spec.seed * 13 + i);
    const maps = toMaps(pc, { repeat: false, normalStrength: 3 });
    const m = pixelMaterial(maps, { roughness: 0.9 });
    windowMats.push(m);
    const mesh = new THREE.Mesh(wallFace(f.width, wallH, f.gable), m);
    mesh.position.copy(f.pos);
    mesh.rotation.y = f.rotY;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    if (hasDoor) {
      const along = THREE.MathUtils.clamp(spec.doorAt * f.width, 18 / 32 + 0.25, f.width - 18 / 32 - 0.25) - f.width / 2;
      const local = new THREE.Vector3(along, 0, 0.5).applyAxisAngle(new THREE.Vector3(0, 1, 0), f.rotY);
      door = f.pos.clone().add(local);
    }
  });

  // foundation band
  const stone = sharedMat('found', () => pixelMaterial(toMaps(stoneBlocks(21, 0x8e8478, 64, 16, 8)), { roughness: 1 }));
  const fgeo = new THREE.BoxGeometry(spec.w + 0.16, FOUND_H, spec.d + 0.16);
  const uvs = fgeo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uvs.count; i++) uvs.setXY(i, uvs.getX(i) * Math.max(spec.w, spec.d) / 4, uvs.getY(i) * FOUND_H / 1);
  const found = new THREE.Mesh(fgeo, stone);
  found.position.set(cx, by + FOUND_H / 2 - 0.05, cz);
  found.castShadow = found.receiveShadow = true;
  group.add(found);

  // roof
  const tiles = sharedMat(`roof-${spec.roof}`, () => pixelMaterial(toMaps(roofTiles(spec.seed, spec.roof, 64, 64, 6, 6), { normalStrength: 4 }), { roughness: 0.75 }));
  const under = sharedMat('roof-under', () => pixelMaterial(toMaps(timberTex(31, 0x3a2a20, 16, 16)), { roughness: 1, side: THREE.DoubleSide }));
  const oh = 0.45, ohEnd = 0.4, thick = 0.22;
  const top = by + wallH;
  const ridgeY = top + rise;
  const dropY = oh * spec.pitch;
  let slabs: THREE.BufferGeometry[];
  if (spec.ridge === 'z') {
    const z0 = spec.z - ohEnd, z1 = spec.z + spec.d + ohEnd;
    slabs = [
      // west slope (eave at x min), wound so its top faces up-west
      roofSlab(new THREE.Vector3(spec.x - oh, top - dropY, z0), new THREE.Vector3(spec.x - oh, top - dropY, z1), new THREE.Vector3(cx, ridgeY, z1), new THREE.Vector3(cx, ridgeY, z0), thick),
      roofSlab(new THREE.Vector3(spec.x + spec.w + oh, top - dropY, z1), new THREE.Vector3(spec.x + spec.w + oh, top - dropY, z0), new THREE.Vector3(cx, ridgeY, z0), new THREE.Vector3(cx, ridgeY, z1), thick),
    ];
  } else {
    const x0 = spec.x - ohEnd, x1 = spec.x + spec.w + ohEnd;
    slabs = [
      roofSlab(new THREE.Vector3(x1, top - dropY, spec.z - oh), new THREE.Vector3(x0, top - dropY, spec.z - oh), new THREE.Vector3(x0, ridgeY, cz), new THREE.Vector3(x1, ridgeY, cz), thick),
      roofSlab(new THREE.Vector3(x0, top - dropY, spec.z + spec.d + oh), new THREE.Vector3(x1, top - dropY, spec.z + spec.d + oh), new THREE.Vector3(x1, ridgeY, cz), new THREE.Vector3(x0, ridgeY, cz), thick),
    ];
  }
  for (const g of slabs) {
    const m = new THREE.Mesh(g, [tiles, under]);
    m.castShadow = m.receiveShadow = true;
    group.add(m);
  }
  // ridge cap
  const capLen = (spec.ridge === 'z' ? spec.d : spec.w) + ohEnd * 2 + 0.1;
  const cap = new THREE.Mesh(new THREE.BoxGeometry(spec.ridge === 'z' ? 0.3 : capLen, 0.22, spec.ridge === 'z' ? capLen : 0.3), sharedMat(`cap-${spec.roof}`, () => new THREE.MeshStandardMaterial({ color: new THREE.Color(shade(spec.roof, -0.45)), roughness: 0.8 })));
  cap.position.set(cx, ridgeY + thick * 0.7, cz);
  cap.castShadow = true;
  group.add(cap);

  // chimney
  if (spec.chimney) {
    const brick = sharedMat('chimney', () => pixelMaterial(toMaps(bricks(41, 0x9a5a44, 32, 32)), { roughness: 1 }));
    const chH = rise * 0.75 + 1.2;
    const along = spec.ridge === 'z' ? spec.d : spec.w;
    const offA = along * 0.25;
    const offS = (span / 2) * 0.45;
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.7, chH, 0.7), brick);
    if (spec.ridge === 'z') ch.position.set(cx + offS, top + rise * 0.55 + chH / 2 - 0.6, spec.z + offA);
    else ch.position.set(spec.x + offA, top + rise * 0.55 + chH / 2 - 0.6, cz - offS);
    ch.castShadow = ch.receiveShadow = true;
    group.add(ch);
    const capm = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.14, 0.86), stone);
    capm.position.copy(ch.position).y += chH / 2;
    group.add(capm);
  }
  return { group, windowMats, door, doorSide: spec.door };
}
