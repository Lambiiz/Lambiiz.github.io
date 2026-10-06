import * as THREE from 'three';
import { Terrain } from '../../engine/world/Terrain';
import { PropKit } from '../../engine/world/Props';
import { buildHouse } from '../../engine/world/House';
import { Atlas } from '../../engine/sprite/Atlas';
import { BillboardBatch } from '../../engine/sprite/BillboardBatch';
import { pixelMaterial, toMaps } from '../../engine/pixel/texture';
import { grass, dirt, earthSide, stoneBlocks, roughStone } from '../../engine/pixel/surfaces';
import { leafClump, grassTuft, flowerPatch, bush, pine } from '../../engine/pixel/foliage';
import type { Lighting } from '../../engine/render/Lighting';
import { Rng } from '../../engine/core/rng';

/**
 * The battle diorama: the fighters' 2D plane runs along world x at z = 0 on a dirt road. Behind it
 * the scenery recedes in layers (a low wall, trees, the last houses of town, a pine ridge) and in
 * front sit a few blurred foreground plants: the depth of field keeps only the fighting plane sharp,
 * which is what makes the action readable.
 */
const X0 = -24, Z0 = -24;
const W = 48, D = 34;

export function buildStage(scene: THREE.Scene, lighting: Lighting): THREE.Group {
  const t: string[] = [], h: string[] = [];
  for (let j = 0; j < D; j++) {
    const z = j + Z0;
    let row = '', hr = '';
    for (let i = 0; i < W; i++) {
      const road = z >= -2 && z < 2;
      row += road ? 'd' : 'g';
      hr += z < -12 ? '3' : z < -7 ? '1' : '0';
    }
    t.push(row);
    h.push(hr);
  }
  const mats = {
    grass: pixelMaterial(toMaps(grass(31, 0x6a9a3a)), { roughness: 1 }),
    dirt: pixelMaterial(toMaps(dirt(32, 0x9a7a55)), { roughness: 1 }),
    earth: pixelMaterial(toMaps(earthSide(33, 0x6e5440, 64, 64)), { roughness: 1 }),
    wall: pixelMaterial(toMaps(stoneBlocks(34, 0x9d9184, 64, 64, 8)), { roughness: 1 }),
    steps: pixelMaterial(toMaps(roughStone(35, 0xa8a090, 32)), { roughness: 1 }),
  };
  const terrain = new Terrain({
    tiles: t, heights: h, step: 0.5,
    surfaces: { g: { top: 'grass', wall: 'earth' }, d: { top: 'dirt', wall: 'earth' } },
    stairs: {}, stairMaterial: 'steps',
  }, mats);
  const group = new THREE.Group();
  group.position.set(X0, 0, Z0);
  group.add(terrain.group);
  const kit = new PropKit(terrain, lighting);
  group.add(kit.group);
  const L = (x: number) => x - X0, Lz = (z: number) => z - Z0;

  const atlas = new Atlas(512);
  atlas.add('canopyA', leafClump(11, 40, 30, 0x4f8a3a));
  atlas.add('canopyB', leafClump(12, 36, 28, 0x5a9440));
  atlas.add('canopyAut', leafClump(14, 40, 30, 0xc07a30));
  for (let i = 0; i < 4; i++) atlas.add(`tuft${i}`, grassTuft(20 + i));
  atlas.add('flowersP', flowerPatch(30, [0xe86a8a, 0xf4a0b8]));
  atlas.add('flowersY', flowerPatch(31, [0xf0d060, 0xffffff]));
  atlas.add('bush', bush(40));
  atlas.add('bush2', bush(41, 0x3f7030, 26, 18));
  atlas.add('pine', pine(50));
  atlas.add('pine2', pine(51, 30, 56, 0x2a5236));

  // mid-ground: a low stone wall with a gap, and a wooden fence
  kit.balustrade(L(-15), Lz(-4.2), L(-3), Lz(-4.2), { collide: false });
  kit.fence(L(3), Lz(-4.4), L(16), Lz(-4.4));
  kit.lamppost(L(-1.8), Lz(-3.6));
  kit.barrel(L(-13.5), Lz(-3.2)); kit.crate(L(-12.6), Lz(-3.4), 0.7, 0.3);
  // trees behind the wall
  for (const [x, z, c] of [[-11, -8.5, 'canopyA'], [-5, -9.5, 'canopyAut'], [5.5, -8.8, 'canopyB'], [12, -9.2, 'canopyA'], [18, -8, 'canopyAut']] as [number, number, string][]) {
    kit.tree(L(x), Lz(z), { clumps: [c, 'canopyA', c], height: 3.3, collide: false });
  }
  // the last houses of town, up on the rise
  const houses = [
    { x: -19, z: -19, w: 6, d: 5, roof: 0x4a7496 }, { x: -9, z: -20, w: 5.5, d: 5, roof: 0xb4583a },
    { x: 6, z: -19.5, w: 6.5, d: 5, roof: 0x3e6a8e }, { x: 15, z: -20, w: 5, d: 5, roof: 0xc0683e },
  ];
  houses.forEach((hs, i) => {
    const r = buildHouse({ x: L(hs.x), z: Lz(hs.z), w: hs.w, d: hs.d, y: 1.5, roof: hs.roof, ridge: i % 2 ? 'x' : 'z', seed: 200 + i, floors: 2 });
    group.add(r.group);
    for (const m of r.windowMats) lighting.addEmissive(m, 1.4, 'window');
  });
  const rng = new Rng(5);
  for (let i = 0; i < 40; i++) kit.sprite(rng.chance(0.5) ? 'pine' : 'pine2', L(rng.range(-24, 24)), Lz(rng.range(-24, -21)), { y: 1.5, scale: rng.range(1.5, 2.3), sway: 0.15 });
  // ground cover
  for (let i = 0; i < 700; i++) {
    const x = rng.range(-23.5, 23.5), z = rng.range(-23.5, 9.5);
    if (z > -2.2 && z < 2.2) continue;
    kit.sprite(rng.chance(0.85) ? `tuft${rng.int(0, 3)}` : rng.pick(['flowersP', 'flowersY']), L(x), Lz(z), { sway: 0.6, flip: rng.chance(0.5) });
  }
  for (let i = 0; i < 26; i++) {
    const x = rng.range(-22, 22);
    kit.sprite(rng.pick(['bush', 'bush2']), L(x), Lz(-5 - rng.range(0, 1.5)), { sway: 0.25, flip: rng.chance(0.5) });
  }
  // blurred foreground plants framing the bottom corners; they never reach up over the fighting line
  for (let i = 0; i < 14; i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * rng.range(7, 15);
    kit.sprite(rng.pick(['bush', 'bush2', 'tuft1', 'tuft2']), L(x), Lz(rng.range(7.5, 9.5)), { sway: 0.4, scale: rng.range(1.0, 1.5), flip: rng.chance(0.5) });
  }
  for (let i = 0; i < 18; i++) {
    kit.sprite(rng.pick(['tuft0', 'tuft1', 'tuft2', 'flowersP']), L(rng.range(-12, 12)), Lz(rng.range(8, 10)), { sway: 0.5, scale: rng.range(1.0, 1.4), flip: rng.chance(0.5) });
  }
  group.add(new BillboardBatch(atlas, kit.billboards));

  // ground continues to the horizon
  const plane = (w: number, d: number) => {
    const g = new THREE.PlaneGeometry(w, d);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * w) / 4, (uv.getY(i) * d) / 4);
    return g;
  };
  const far = new THREE.Mesh(plane(200, 80), mats.grass);
  far.rotation.x = -Math.PI / 2;
  far.position.set(0, 1.49, -64);
  far.receiveShadow = true;
  scene.add(far);
  const near = new THREE.Mesh(plane(200, 60), mats.grass);
  near.rotation.x = -Math.PI / 2;
  near.position.set(0, -0.01, 38);
  scene.add(near);
  scene.add(group);
  return group;
}
