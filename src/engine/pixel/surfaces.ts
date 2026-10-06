import { PixelCanvas } from './PixelCanvas';
import { mix, shade, scale } from './color';
import { Rng, fbm, hash2 } from '../core/rng';

/**
 * Procedural tiling surfaces (ground, walls, roofs, wood). All tile seamlessly and carry a height
 * channel for normal mapping. Sizes are in texels at 16 texels per world unit.
 */

/** Wrapped Voronoi over a jittered grid: returns nearest cell id and the gap to the second nearest. */
function voronoi(x: number, y: number, w: number, h: number, cell: number, seed: number, jitter = 0.8) {
  const cx = Math.floor(x / cell), cy = Math.floor(y / cell);
  const nx = Math.round(w / cell), ny = Math.round(h / cell);
  let d1 = 1e9, d2 = 1e9, id = 0, fx = 0, fy = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const gx = cx + i, gy = cy + j;
      const wx = ((gx % nx) + nx) % nx, wy = ((gy % ny) + ny) % ny;
      const px = (gx + 0.5 + (hash2(wx, wy, seed) - 0.5) * jitter) * cell;
      const py = (gy + 0.5 + (hash2(wx, wy, seed + 7) - 0.5) * jitter) * cell;
      const d = Math.hypot(x - px, y - py);
      if (d < d1) { d2 = d1; d1 = d; id = wy * nx + wx; fx = x - px; fy = y - py; }
      else if (d < d2) d2 = d;
    }
  }
  return { id, edge: d2 - d1, d1, fx, fy };
}

export function cobblestone(seed = 1, base = 0xa79a86, size = 64, cell = 7): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const mortar = 0x4a4038;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const v = voronoi(x + 0.5, y + 0.5, size, size, cell, seed, 0.75);
      const tint = hash2(v.id, 3, seed);
      const stone = mix(mix(base, 0x8f8a96, tint * 0.6), 0xc4a88a, hash2(v.id, 9, seed) * 0.35);
      if (v.edge < 1.1) {
        const moss = fbm(x, y, size, size, 4, 2, seed + 5) > 0.62;
        pc.set(x, y, moss ? 0x4f5a34 : mortar);
        pc.setHeight(x, y, 0.05);
        continue;
      }
      const round = Math.min(1, (v.edge - 1.1) / 2.6);
      const h = Math.sqrt(round);
      // baked light from the upper-left; the normal map adds the real lighting on top
      const lit = -(v.fx + v.fy) / (cell * 1.2);
      const n = fbm(x, y, size, size, 8, 2, seed) - 0.5;
      let c = shade(stone, lit * 0.22 + n * 0.22 + (round - 1) * 0.2);
      if (round < 0.3) c = shade(c, -0.15);
      pc.set(x, y, c);
      pc.setHeight(x, y, 0.25 + h * 0.6 + n * 0.1);
    }
  }
  return pc;
}

export function grass(seed = 2, base = 0x6f9a3c, size = 64): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const rng = new Rng(seed);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x, y, size, size, 4, 3, seed);
      const m = fbm(x, y, size, size, 16, 2, seed + 3);
      let c = shade(base, (n - 0.5) * 0.9 + (m - 0.5) * 0.4);
      c = mix(c, 0x8aa040, Math.max(0, n - 0.6) * 1.4);
      pc.set(x, y, c);
      pc.setHeight(x, y, 0.4 + n * 0.3);
    }
  }
  // blade strokes: dark root, light tip
  for (let i = 0; i < size * size * 0.09; i++) {
    const x = rng.int(0, size - 1), y = rng.int(0, size - 1);
    const len = rng.int(2, 3);
    for (let k = 0; k < len; k++) {
      const t = k / (len - 1);
      pc.setW(x, y - k, shade(base, -0.45 + t * 0.95));
      pc.setHeight(x, y - k, 0.5 + t * 0.4);
    }
  }
  // a few tiny flowers
  for (let i = 0; i < 6; i++) {
    const x = rng.int(0, size - 1), y = rng.int(0, size - 1);
    const fc = rng.pick([0xf2e6a8, 0xe9a0b8, 0xffffff, 0xc8b4f0]);
    pc.setW(x, y, fc);
    pc.setHeight(x, y, 0.9);
  }
  return pc;
}

export function dirt(seed = 3, base = 0x9a7a55, size = 64): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const rng = new Rng(seed);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x, y, size, size, 5, 3, seed);
      const m = fbm(x, y, size, size, 20, 1, seed + 1);
      pc.set(x, y, shade(base, (n - 0.5) * 0.7 + (m - 0.5) * 0.3));
      pc.setHeight(x, y, 0.3 + n * 0.3);
    }
  }
  for (let i = 0; i < 70; i++) {
    const x = rng.int(0, size - 1), y = rng.int(0, size - 1);
    pc.setW(x, y, shade(base, 0.35));
    pc.setW(x, y + 1, shade(base, -0.45));
    pc.setHeight(x, y, 0.8);
  }
  return pc;
}

/** Cut-stone retaining wall / foundation: staggered rows of blocks. */
export function stoneBlocks(seed = 4, base = 0x9d9184, w = 64, h = 64, rowH = 8): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  const rows = Math.round(h / rowH);
  for (let r = 0; r < rows; r++) {
    let x = Math.floor(rng.next() * 10);
    const y0 = r * rowH;
    while (x < w + 12) {
      const bw = rng.int(9, 16);
      const tint = rng.next();
      const col = mix(mix(base, 0x7d7a86, tint * 0.6), 0xb5a28a, rng.next() * 0.3);
      for (let j = 0; j < rowH; j++) {
        for (let i = 0; i < bw; i++) {
          const px = x + i, py = y0 + j;
          const edgeL = i === 0, edgeT = j === 0;
          const n = fbm(((px % w) + w) % w, py, w, h, 8, 2, seed) - 0.5;
          if (edgeL || edgeT) {
            pc.setW(px, py, 0x463d37);
            pc.setHeight(px, py, 0.05);
          } else {
            const lit = (j === 1 ? 0.35 : 0) + (i === 1 ? 0.2 : 0) + (j === rowH - 1 ? -0.35 : 0) + (i === bw - 1 ? -0.25 : 0);
            pc.setW(px, py, shade(col, lit + n * 0.5));
            pc.setHeight(px, py, 0.6 + n * 0.25 - (j === rowH - 1 || i === bw - 1 ? 0.2 : 0));
          }
        }
      }
      x += bw;
    }
  }
  return pc;
}

/** Brick wall (warm red, for the canal-town style). */
export function bricks(seed = 5, base = 0xa0573e, w = 64, h = 64): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const bw = 8, bh = 4;
  for (let y = 0; y < h; y++) {
    const row = Math.floor(y / bh);
    const off = row % 2 ? bw / 2 : 0;
    for (let x = 0; x < w; x++) {
      const col = Math.floor((x + off) / bw);
      const ix = (x + off) % bw, iy = y % bh;
      if (ix === 0 || iy === 0) {
        pc.set(x, y, 0x5a4a40);
        pc.setHeight(x, y, 0.1);
        continue;
      }
      const t = hash2(col, row, seed);
      const c = mix(base, t > 0.5 ? 0xb87a52 : 0x7a3e34, Math.abs(t - 0.5));
      const n = fbm(x, y, w, h, 16, 1, seed) - 0.5;
      pc.set(x, y, shade(c, (iy === 1 ? 0.25 : iy === bh - 1 ? -0.25 : 0) + n * 0.3));
      pc.setHeight(x, y, 0.6 + n * 0.2);
    }
  }
  return pc;
}

export function plaster(seed = 6, base = 0xe8dcc0, w = 64, h = 64): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = fbm(x, y, w, h, 6, 3, seed);
      const s = fbm(x, y, w, h, 3, 2, seed + 4);
      let c = shade(base, (n - 0.5) * 0.25);
      c = mix(c, 0xb8a888, Math.max(0, s - 0.6) * 1.2); // weathering stains
      pc.set(x, y, c);
      pc.setHeight(x, y, 0.5 + (n - 0.5) * 0.15);
    }
  }
  return pc;
}

/** Wooden planks running vertically (doors, crates) or horizontally. */
export function planks(seed = 7, base = 0x8a5a36, w = 32, h = 32, plankW = 5, horizontal = false): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = horizontal ? y : x, v = horizontal ? x : y;
      const p = Math.floor(u / plankW);
      const iu = u % plankW;
      const tint = hash2(p, 1, seed);
      const col = mix(base, tint > 0.5 ? 0xa06c40 : 0x6e4428, Math.abs(tint - 0.5));
      const grain = Math.sin(v * 0.9 + hash2(p, 2, seed) * 20 + Math.sin(v * 0.21 + p) * 2) * 0.5 + 0.5;
      if (iu === 0) {
        pc.set(x, y, shade(col, -0.7));
        pc.setHeight(x, y, 0.1);
      } else {
        pc.set(x, y, shade(col, (grain - 0.5) * 0.25 + (iu === 1 ? 0.2 : 0) + (iu === plankW - 1 ? -0.2 : 0)));
        pc.setHeight(x, y, 0.55 + grain * 0.1);
      }
    }
  }
  return pc;
}

/** Overlapping roof tiles: rows of rounded shingles, darker in the overlap shadow. */
export function roofTiles(seed = 8, base = 0x4f7896, w = 64, h = 64, tileW = 6, rowH = 6): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    const row = Math.floor(y / rowH);
    const iy = y % rowH;
    const off = row % 2 ? tileW / 2 : 0;
    for (let x = 0; x < w; x++) {
      const col = Math.floor((x + off) / tileW);
      const ix = (x + off) % tileW;
      const t = hash2(((col % (w / tileW)) + w / tileW) % (w / tileW), row, seed);
      const c = mix(base, t > 0.5 ? shade(base, 0.25) : shade(base, -0.25), Math.abs(t - 0.5) * 1.2);
      // rounded bottom edge: corners of each tile's last row belong to the tile below (shadow)
      const cx = (ix + 0.5) / tileW - 0.5;
      const bottom = iy >= rowH - 1 - (Math.abs(cx) > 0.3 ? 1 : 0);
      const n = fbm(x, y, w, h, 16, 1, seed) - 0.5;
      if (ix === 0 && !bottom) {
        pc.set(x, y, shade(c, -0.55));
        pc.setHeight(x, y, 0.3);
      } else if (bottom) {
        pc.set(x, y, shade(c, -0.75));
        pc.setHeight(x, y, 0.15);
      } else {
        // shingles bulge: lighter at the top of the row, cylindrical across
        const across = 1 - Math.abs(cx) * 2;
        pc.set(x, y, shade(c, 0.35 - (iy / rowH) * 0.5 + across * 0.15 + n * 0.2));
        pc.setHeight(x, y, 0.3 + (1 - iy / rowH) * 0.4 + across * 0.25);
      }
    }
  }
  return pc;
}

/** Dark timber (beams, posts). */
export function timber(seed = 9, base = 0x4a3426, w = 16, h = 64): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const g = Math.sin(x * 1.7 + Math.sin(y * 0.15) * 2 + hash2(x, 0, seed) * 3) * 0.5 + 0.5;
      pc.set(x, y, shade(base, (g - 0.5) * 0.3 + (fbm(x, y, w, h, 4, 2, seed) - 0.5) * 0.3));
      pc.setHeight(x, y, 0.5 + g * 0.1);
    }
  }
  return pc;
}

/** Simple rough stone for wells, steps and posts. */
export function roughStone(seed = 10, base = 0x9a948a, size = 32): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x, y, size, size, 4, 3, seed);
      pc.set(x, y, shade(base, (n - 0.5) * 0.8));
      pc.setHeight(x, y, n);
    }
  }
  return pc;
}

/** Striped cloth (awnings, banners). */
export function stripes(a: number, b: number, w = 32, h = 32, stripe = 4): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = Math.floor(x / stripe) % 2 ? a : b;
      const n = fbm(x, y, w, h, 4, 2, 11) - 0.5;
      pc.set(x, y, shade(c, n * 0.25 + (y % 8 === 0 ? -0.1 : 0)));
      pc.setHeight(x, y, 0.5);
    }
  }
  return pc;
}

export function solid(c: number, size = 8): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  pc.fill(c);
  return pc;
}

/** Cliff / terrain side: earth with roots, used where ground steps down without a built wall. */
export function earthSide(seed = 12, base = 0x6e5440, w = 64, h = 32): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = fbm(x, y, w, h, 6, 3, seed);
      let c = shade(base, (n - 0.5) * 0.8 - (y / h) * 0.2);
      if (y < 3 + Math.floor(hash2(x, 0, seed) * 3)) c = shade(0x5f8a34, (n - 0.5) * 0.6); // grass lip
      pc.set(x, y, c);
      pc.setHeight(x, y, n);
    }
  }
  return pc;
}

export { scale as scaleColor };
