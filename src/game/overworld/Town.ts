import * as THREE from 'three';
import { Terrain, type TerrainDef } from '../../engine/world/Terrain';
import { buildHouse, type HouseSpec } from '../../engine/world/House';
import { PropKit } from '../../engine/world/Props';
import { Atlas } from '../../engine/sprite/Atlas';
import { BillboardBatch } from '../../engine/sprite/BillboardBatch';
import { pixelMaterial, toMaps } from '../../engine/pixel/texture';
import { cobblestone, grass, dirt, stoneBlocks, earthSide, roughStone } from '../../engine/pixel/surfaces';
import { leafClump, grassTuft, flowerPatch, bush, pine, produce, shopSign, banner, ivy } from '../../engine/pixel/foliage';
import type { Lighting } from '../../engine/render/Lighting';
import { Rng } from '../../engine/core/rng';

/**
 * Brightwater, the starting town. A raised terrace street with a row of tall gabled houses, stairs
 * down to a cobbled market plaza with a well, and a balustraded front edge that drops to a lower road
 * leading out of town (east → the Wilds, where fights happen).
 */

export const TOWN_W = 34;
export const TOWN_D = 27;

/** Height levels (× 0.5 units). */
const TERRACE = '5', PLAZA = '2', LOW = '0';
/** Rows where the levels change: terrace z < 9, plaza 9..20, low road ≥ 20. */
const Z_PLAZA = 9, Z_LOW = 20;

function grid(fill: string): string[][] {
  return Array.from({ length: TOWN_D }, () => Array.from({ length: TOWN_W }, () => fill));
}
function rect(g: string[][], x: number, z: number, w: number, d: number, c: string): void {
  for (let j = z; j < z + d; j++) for (let i = x; i < x + w; i++) if (g[j] && g[j][i] !== undefined) g[j][i] = c;
}

function layout(): TerrainDef {
  const t = grid('g'), h = grid(LOW);
  // upper terrace (north): a paved street in front of the house row, a little square in the gap
  rect(h, 0, 0, TOWN_W, Z_PLAZA, TERRACE);
  rect(t, 0, 6, TOWN_W, 3, 'p');
  rect(t, 13, 1, 8, 5, 'p');
  // market plaza
  rect(h, 0, Z_PLAZA, TOWN_W, Z_LOW - Z_PLAZA, PLAZA);
  rect(t, 0, Z_PLAZA, TOWN_W, Z_LOW - Z_PLAZA, 'c');
  rect(t, 7, 17, 2, 3, 'g');
  rect(t, 25, 17, 2, 3, 'g');
  // stairs up to the terrace and down to the low road
  rect(t, 15, 9, 4, 2, '^');
  rect(t, 16, 20, 2, 2, '^');
  // low road (south, in front of the balustrade)
  rect(t, 0, 22, TOWN_W, 2, 'd');
  return {
    tiles: t.map((r) => r.join('')),
    heights: h.map((r) => r.join('')),
    step: 0.5,
    surfaces: {
      c: { top: 'cobble', wall: 'wall' },
      p: { top: 'paving', wall: 'wall' },
      g: { top: 'grass', wall: 'earth' },
      d: { top: 'dirt', wall: 'earth' },
    },
    stairs: { '^': 'n' },
    stairMaterial: 'steps',
  };
}

export interface TownBuild {
  group: THREE.Group;
  terrain: Terrain;
  doors: { pos: THREE.Vector3; name: string }[];
  signs: { pos: THREE.Vector3; text: string }[];
  /** Where to start and where the road to the Wilds begins. */
  start: THREE.Vector3;
  wildsZone: THREE.Box2;
}

function makeAtlas(): Atlas {
  const a = new Atlas(512);
  a.add('canopyA', leafClump(11, 40, 30, 0x4f8a3a));
  a.add('canopyB', leafClump(12, 36, 28, 0x5a9440));
  a.add('canopyC', leafClump(13, 44, 32, 0x467e36));
  a.add('canopyAut', leafClump(14, 40, 30, 0xc07a30));
  a.add('canopyAut2', leafClump(15, 36, 28, 0xd09a3a));
  a.add('canopyBlossom', leafClump(16, 40, 30, 0x6a9a48, { blossoms: [0xf4c0d0, 0xffe0ec, 0xe890b0] }));
  for (let i = 0; i < 4; i++) a.add(`tuft${i}`, grassTuft(20 + i));
  a.add('flowersP', flowerPatch(30, [0xe86a8a, 0xf4a0b8]));
  a.add('flowersY', flowerPatch(31, [0xf0d060, 0xffffff]));
  a.add('flowersB', flowerPatch(32, [0x8a90f0, 0xc0a0f0]));
  a.add('bush', bush(40));
  a.add('bush2', bush(41, 0x3f7030, 26, 18));
  a.add('bushFlower', bush(42, 0x4a7a34, 22, 16, [0xf080a0, 0xffffff]));
  a.add('pine', pine(50));
  a.add('pine2', pine(51, 30, 56, 0x2a5236));
  a.add('apples', produce(60, [0xd03a2a, 0xe05a3a, 0xa02a2a]));
  a.add('oranges', produce(61, [0xf09a30, 0xe8b040]));
  a.add('greens', produce(62, [0x6aa040, 0x4a8a3a, 0x9ac050]));
  a.add('bread', produce(63, [0xd0a060, 0xb88040]));
  a.add('ivy', ivy(70));
  return a;
}

export function buildTown(scene: THREE.Scene, lighting: Lighting): TownBuild {
  const def = layout();
  const maps = {
    cobble: pixelMaterial(toMaps(cobblestone(1, 0xa89884, 128, 8), { normalStrength: 2.4 }), { roughness: 0.85 }),
    paving: pixelMaterial(toMaps(cobblestone(2, 0xb0a08a, 128, 13), { normalStrength: 2.4 }), { roughness: 0.85 }),
    grass: pixelMaterial(toMaps(grass(3, 0x6a9a3a, 128)), { roughness: 1 }),
    dirt: pixelMaterial(toMaps(dirt(4, 0x9a7a55, 128)), { roughness: 1 }),
    wall: pixelMaterial(toMaps(stoneBlocks(5, 0x9d9184, 128, 128, 13, 1.9), { normalStrength: 4 }), { roughness: 0.95 }),
    earth: pixelMaterial(toMaps(earthSide(6, 0x6e5440, 128, 128)), { roughness: 1 }),
    steps: pixelMaterial(toMaps(roughStone(7, 0xa8a090, 64)), { roughness: 1 }),
  };
  const terrain = new Terrain(def, maps);
  const group = new THREE.Group();
  group.add(terrain.group);
  const kit = new PropKit(terrain, lighting);
  group.add(kit.group);
  const doors: TownBuild['doors'] = [];
  const signs: TownBuild['signs'] = [];
  const atlas = makeAtlas();

  // ---- houses ---------------------------------------------------------------------------------
  const T = 2.5, P = 1.0;
  const houses: (HouseSpec & { name: string; sign?: 'inn' | 'shop' | 'smith' | 'cafe'; banner?: number })[] = [
    { name: "Elder Maren's house", x: 0.6, z: 0.8, w: 6, d: 5, y: T, roof: 0x4a7496, ridge: 'z', seed: 3, shutters: 0x3f6a4a, banner: 0xa83a3a },
    { name: 'the Tailor', x: 7.4, z: 1.2, w: 5.2, d: 4.6, y: T, roof: 0xb4583a, ridge: 'x', style: 'plaster', plaster: 0xf0e2c4, seed: 4, shutters: 0x4a6a9a },
    { name: 'The Lantern Inn', x: 21.4, z: 0.8, w: 6.6, d: 5, y: T, roof: 0x3e6a8e, ridge: 'z', seed: 5, shutters: 0x7a3a3a, sign: 'inn', banner: 0x3a5a9a, doorAt: 0.38 },
    { name: 'a quiet home', x: 28.6, z: 1.2, w: 5, d: 4.6, y: T, roof: 0xc0683e, ridge: 'z', style: 'brick', seed: 6, shutters: 0x3f6a4a },
    { name: "Hollis's General Goods", x: 0.5, z: 10.4, w: 6, d: 6, y: P, roof: 0x5a7a4e, ridge: 'z', door: 'e', doorAt: 0.6, seed: 7, shutters: 0x7a5a3a, sign: 'shop' },
    { name: 'the Smithy', x: 27.5, z: 10.4, w: 6, d: 6, y: P, roof: 0x6a5a6a, ridge: 'z', door: 'w', doorAt: 0.4, style: 'stone', seed: 8, shutters: 0x5a4a3a, sign: 'smith', floors: 1, pitch: 1.0 },
  ];
  for (const hs of houses) {
    const r = buildHouse(hs);
    group.add(r.group);
    for (const m of r.windowMats) lighting.addEmissive(m, 1.6, 'window');
    terrain.blockRect(hs.x - 0.1, hs.z - 0.1, hs.x + hs.w + 0.1, hs.z + hs.d + 0.1);
    if (r.door) {
      doors.push({ pos: r.door, name: hs.name });
      kit.lamppost(r.door.x + (r.doorSide === 's' ? 1.15 : 0), r.door.z + (r.doorSide === 's' ? -0.42 : r.doorSide === 'e' ? -1.2 : -1.2), { wall: true });
    }
    if (hs.sign && r.door) {
      const side = r.doorSide;
      const sx = side === 's' ? r.door.x - 1.5 : r.door.x, sz = side === 's' ? r.door.z - 0.5 : r.door.z + 1.4;
      const s = kit.wallSprite(shopSign(hs.sign), sx + (side === 'e' ? 0.4 : side === 'w' ? -0.4 : 0), (hs.y ?? 0) + 2.55, sz + (side === 's' ? 0.35 : 0), side === 's' ? Math.PI / 2 : 0);
      void s;
    }
    if (hs.banner !== undefined) {
      const bx = hs.x + hs.w * 0.5, bz = hs.z + hs.d + 0.03;
      kit.wallSprite(banner(hs.banner), bx, (hs.y ?? 0) + 4.6, bz, 0);
    }
  }
  // distant rooftops past the north edge, so the top of the frame is town, not void
  const far = new Rng(99);
  for (let i = 0; i < 9; i++) {
    const x = -6 + i * 6 + far.range(-1, 1);
    const r = buildHouse({ x, z: -9 - far.range(0, 4), w: far.range(4.5, 6.5), d: 5, y: T + 0.5, floors: 2, roof: far.pick([0x4a7496, 0xb4583a, 0x3e6a8e, 0x5a7a4e]), ridge: far.chance(0.5) ? 'z' : 'x', seed: 100 + i, chimney: far.chance(0.5), flowers: false });
    group.add(r.group);
    for (const m of r.windowMats) lighting.addEmissive(m, 1.2, 'window');
  }

  // ---- outer world: ground continues past the map edges at matching heights -------------------
  const outer = (x0: number, x1: number, z0: number, z1: number, top: number) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, top + 3, z1 - z0), [maps.earth, maps.earth, maps.grass, maps.earth, maps.earth, maps.earth]);
    b.position.set((x0 + x1) / 2, (top - 3) / 2, (z0 + z1) / 2);
    setBoxUV(b.geometry, 4, b.position);
    b.receiveShadow = true;
    group.add(b);
  };
  outer(-40, TOWN_W + 40, -60, 0, T);
  outer(-40, 0, 0, Z_PLAZA, T);
  outer(TOWN_W, TOWN_W + 40, 0, Z_PLAZA, T);
  outer(-40, 0, Z_PLAZA, Z_LOW, P);
  outer(TOWN_W, TOWN_W + 40, Z_PLAZA, Z_LOW, P);
  outer(-40, TOWN_W + 40, TOWN_D, 90, -0.02);
  outer(-40, 0, Z_LOW, TOWN_D, -0.02);
  outer(TOWN_W, TOWN_W + 40, Z_LOW, TOWN_D, -0.02);

  // ---- props --------------------------------------------------------------------------------------
  kit.well(17, 14.4);
  kit.marketStall(10.4, 11.4, 'awningR', ['apples', 'oranges', 'greens']);
  kit.marketStall(23.6, 11.4, 'awningB', ['bread', 'apples', 'bread']);
  for (const [x, z] of [[8.2, 9.6], [25.8, 9.6], [11.6, 19.3], [22.4, 19.3], [13.4, 6.3], [20.6, 6.3], [3.5, 19.3], [30.5, 19.3]]) kit.lamppost(x, z);
  // barrels & crates by the shop and the smithy
  kit.barrel(7.0, 16.9); kit.barrel(7.6, 17.5, 0.9); kit.crate(6.9, 18.4, 0.7, 0.2); kit.crate(6.9, 18.4, 0.5, 0.6, 0.7);
  kit.barrel(27.0, 17.0); kit.crate(27.1, 18.3, 0.75, -0.3); kit.barrel(26.4, 17.6, 0.85);
  kit.barrel(13.0, 2.0); kit.crate(20.6, 1.8, 0.7, 0.4);
  kit.bench(13.2, 17.9, 0); kit.bench(20.8, 17.9, 0);
  kit.bench(17, 2.3, 0);
  // balustrades: the terrace edge either side of the stairs, and the plaza's front edge
  kit.balustrade(0.2, 8.75, 14.8, 8.75, { y: T });
  kit.balustrade(19.2, 8.75, 33.8, 8.75, { y: T });
  kit.balustrade(0.2, 19.75, 15.8, 19.75, { y: P });
  kit.balustrade(18.2, 19.75, 33.8, 19.75, { y: P });
  // fences along the far side of the low road
  kit.fence(0.5, 26.4, 13, 26.4);
  kit.fence(21, 26.4, 33.5, 26.4);

  // trees
  const treeSpots: [number, number, string[]?][] = [
    [17, 3.6, ['canopyBlossom', 'canopyA', 'canopyBlossom']], [13.6, 0.6, ['canopyAut', 'canopyAut2', 'canopyA']], [20.6, 0.5],
    [7.9, 18.6, ['canopyA', 'canopyB']], [26.1, 18.6, ['canopyAut', 'canopyAut2']],
    [2.5, 21.2], [9.5, 25.2, ['canopyAut', 'canopyAut2']], [24.5, 25.3], [31.5, 21.2, ['canopyBlossom', 'canopyB']],
  ];
  for (const [x, z, cl] of treeSpots) kit.tree(x, z, { clumps: cl, height: z < 5 ? 3.4 : 3.0 });

  // foliage scatter on grass, flowers by walls, bushes along the balustrades
  const rng = new Rng(7);
  for (let i = 0; i < 900; i++) {
    const x = rng.range(0.2, TOWN_W - 0.2), z = rng.range(0.2, TOWN_D - 0.2);
    const s = terrain.surfaceAt(Math.floor(x), Math.floor(z));
    if (s !== 'g') continue;
    const r = rng.next();
    kit.sprite(r < 0.82 ? `tuft${rng.int(0, 3)}` : rng.pick(['flowersP', 'flowersY', 'flowersB']), x, z, { sway: 0.6, flip: rng.chance(0.5) });
  }
  // grass creeping over cobble edges
  for (let z = 0; z < TOWN_D; z++) {
    for (let x = 0; x < TOWN_W; x++) {
      if (terrain.surfaceAt(x, z) !== 'g') continue;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const n = terrain.surfaceAt(x + dx, z + dz);
        if ((n === 'c' || n === 'p') && rng.chance(0.85)) {
          kit.sprite(`tuft${rng.int(0, 3)}`, x + 0.5 + dx * 0.55 + rng.range(-0.3, 0.3) * (dz ? 1 : 0), z + 0.5 + dz * 0.55 + rng.range(-0.3, 0.3) * (dx ? 1 : 0), { sway: 0.5 });
        }
      }
    }
  }
  for (let i = 0; i < 22; i++) {
    const x = rng.range(1, TOWN_W - 1);
    if (Math.abs(x - 17) < 2.5) continue;
    kit.sprite(rng.pick(['bush', 'bush2', 'bushFlower']), x, Z_LOW + 0.45 + rng.range(0, 0.4), { sway: 0.25, flip: rng.chance(0.5) });
  }
  for (let i = 0; i < 12; i++) {
    const x = rng.range(1, TOWN_W - 1);
    if (Math.abs(x - 17) < 3) continue;
    kit.sprite(rng.pick(['bush', 'bushFlower', 'bush2']), x, 25.8 + rng.range(-0.2, 0.3), { sway: 0.25, flip: rng.chance(0.5) });
  }
  // background pines beyond the town edges
  for (let i = 0; i < 70; i++) {
    const x = rng.range(-14, TOWN_W + 14);
    const z = rng.range(-22, -12);
    kit.sprite(rng.chance(0.5) ? 'pine' : 'pine2', x, z, { y: T + 0.5, scale: rng.range(1.4, 2.2), sway: 0.15 });
  }
  for (let i = 0; i < 40; i++) {
    const side = rng.chance(0.5) ? -1 : 1;
    const x = side < 0 ? rng.range(-12, -1.5) : rng.range(TOWN_W + 1.5, TOWN_W + 12);
    const z = rng.range(0, TOWN_D);
    kit.sprite(rng.chance(0.5) ? 'pine' : 'canopyA', x, z, { y: z < Z_PLAZA ? T : z < Z_LOW ? P : 0, scale: rng.range(1.2, 1.9), sway: 0.2 });
  }
  for (let i = 0; i < 30; i++) {
    const x = rng.range(-10, TOWN_W + 10);
    const z = rng.range(TOWN_D + 0.5, TOWN_D + 5);
    kit.sprite(rng.pick(['bush', 'bush2', 'canopyB', 'canopyAut']), x, z, { y: 0, scale: rng.range(1.0, 1.6), sway: 0.3 });
  }
  // ivy on the retaining wall
  for (let i = 0; i < 8; i++) {
    const x = rng.range(1, TOWN_W - 1);
    if (Math.abs(x - 17) < 3) continue;
    kit.wallSprite(ivy(80 + i), x, P + 0.72, Z_PLAZA + 0.02, 0);
  }

  group.add(new BillboardBatch(atlas, kit.billboards));

  signs.push({ pos: new THREE.Vector3(32.6, 0, 23), text: 'East: the Wilds. Beware of bandits.' });
  scene.add(group);
  return {
    group, terrain, doors, signs,
    start: new THREE.Vector3(17, terrain.heightAt(17, 17.2), 17.2),
    wildsZone: new THREE.Box2(new THREE.Vector2(TOWN_W - 0.9, Z_LOW), new THREE.Vector2(TOWN_W, TOWN_D)),
  };
}

function setBoxUV(g: THREE.BufferGeometry, units: number, at: THREE.Vector3): void {
  // BoxGeometry UVs are 0..1 per face; scale by the face's world size
  const pos = g.attributes.position as THREE.BufferAttribute;
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const nrm = g.attributes.normal as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) {
    const nx = Math.abs(nrm.getX(i)), ny = Math.abs(nrm.getY(i));
    const x = pos.getX(i) + at.x, y = pos.getY(i) + at.y, z = pos.getZ(i) + at.z;
    if (ny > 0.5) uv.setXY(i, x / units, -z / units);
    else if (nx > 0.5) uv.setXY(i, z / units, y / units);
    else uv.setXY(i, x / units, y / units);
  }
}

