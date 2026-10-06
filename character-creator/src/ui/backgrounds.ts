/** Procedural pixel-art ground tiles for the stage (seamless, 64×64). */

import { hash01 } from '../core/rng';

export const BACKGROUNDS = [
  ['grass', 'Grass'], ['dirt', 'Dirt path'], ['stone', 'Stone floor'], ['sand', 'Sand'], ['snow', 'Snow'], ['checker', 'Transparent'], ['dark', 'Dark'], ['light', 'Light'],
] as const;

export type BackgroundId = (typeof BACKGROUNDS)[number][0];

const cache = new Map<string, HTMLCanvasElement>();

function tile(id: BackgroundId): HTMLCanvasElement {
  const S = 64;
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const g = c.getContext('2d')!;
  const img = g.createImageData(S, S);
  const put = (x: number, y: number, col: number) => {
    const i = (((y + S) % S) * S + ((x + S) % S)) * 4;
    img.data[i] = (col >> 16) & 255;
    img.data[i + 1] = (col >> 8) & 255;
    img.data[i + 2] = col & 255;
    img.data[i + 3] = 255;
  };
  const fill = (col: number) => {
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) put(x, y, col);
  };
  // smooth periodic noise for patches
  const noise = (x: number, y: number, cells: number, seed: number) => {
    const fx = (x / S) * cells, fy = (y / S) * cells;
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const tx = fx - x0, ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const v = (a: number, b: number) => hash01(seed, ((a % cells) + cells) % cells, ((b % cells) + cells) % cells);
    const top = v(x0, y0) + (v(x0 + 1, y0) - v(x0, y0)) * sx;
    const bot = v(x0, y0 + 1) + (v(x0 + 1, y0 + 1) - v(x0, y0 + 1)) * sx;
    return top + (bot - top) * sy;
  };
  switch (id) {
    case 'grass':
    case 'sand':
    case 'snow':
    case 'dirt': {
      const pal = {
        grass: [0x4f7a3a, 0x5c8a42, 0x6a9a4a, 0x7aa852, 0x3f6a32],
        sand: [0xc8b07a, 0xd4bc86, 0xdcc692, 0xe6d29e, 0xb89e6a],
        snow: [0xd4dce6, 0xdfe6ee, 0xe8eef4, 0xf2f6fa, 0xbcc8d6],
        dirt: [0x7a5e42, 0x86694a, 0x927454, 0x9e805e, 0x6a5038],
      }[id];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const n = noise(x, y, 4, 7) * 0.7 + noise(x, y, 8, 11) * 0.3;
          const k = n < 0.38 ? 0 : n < 0.55 ? 1 : n < 0.7 ? 2 : 3;
          put(x, y, pal[k]);
        }
      }
      // tufts / pebbles
      for (let i = 0; i < 26; i++) {
        const x = Math.floor(hash01(3, i, 1) * S), y = Math.floor(hash01(3, i, 2) * S);
        if (id === 'grass') {
          put(x, y, pal[3]);
          put(x, y - 1, pal[3]);
          put(x + 1, y, pal[4]);
          put(x - 1, y + 1, pal[4]);
        } else {
          put(x, y, pal[4]);
          put(x + 1, y, pal[3]);
        }
      }
      break;
    }
    case 'stone': {
      fill(0x5a5e66);
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const row = Math.floor(y / 16);
          const off = row % 2 ? 8 : 0;
          const bx = ((x + off) % 16), by = y % 16;
          const edge = bx === 0 || by === 0;
          const n = noise(x, y, 8, 5);
          const shade = hash01(9, Math.floor((x + off) / 16), row) * 0.12;
          const base = 0x6a6e78;
          const v = edge ? 0x45484f : n + shade > 0.62 ? 0x767a84 : n + shade < 0.3 ? 0x5e626b : base;
          put(x, y, v);
          if (!edge && (bx === 1 || by === 1)) put(x, y, 0x7c808a);
        }
      }
      break;
    }
    case 'checker':
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) put(x, y, ((x >> 3) + (y >> 3)) & 1 ? 0x3a3d46 : 0x30333b);
      break;
    case 'dark':
      fill(0x1c1e24);
      break;
    case 'light':
      fill(0xd8dce2);
      break;
  }
  g.putImageData(img, 0, 0);
  return c;
}

export function backgroundTile(id: BackgroundId): HTMLCanvasElement {
  let t = cache.get(id);
  if (!t) cache.set(id, (t = tile(id)));
  return t;
}
