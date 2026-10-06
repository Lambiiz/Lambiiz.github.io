import { PixelCanvas } from './PixelCanvas';
import { shade, mix } from './color';
import { Rng } from '../core/rng';

/**
 * Procedural foliage and small-prop sprites: tree canopy clumps, bushes, grass tufts, flowers,
 * produce and the like. Lit from the upper left with hue-shifted shading and a soft outline.
 */

/** A leafy clump: many small leaf clusters inside an irregular blob, shaded as a sphere. */
export function leafClump(seed: number, w: number, h: number, base: number, opts: { density?: number; blossoms?: number[] } = {}): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  const cx = w / 2, cy = h / 2;
  const lobes: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 9; i++) {
    const a = rng.range(0, Math.PI * 2), d = rng.range(0, 0.38);
    lobes.push({ x: cx + Math.cos(a) * d * w, y: cy + Math.sin(a) * d * h * 0.9, r: rng.range(0.2, 0.32) * Math.min(w, h) });
  }
  const inside = (x: number, y: number) => lobes.some((l) => Math.hypot(x - l.x, y - l.y) < l.r);
  // leaf clusters, back to front
  const n = Math.floor(w * h * (opts.density ?? 0.16));
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const x = rng.range(2, w - 2), y = rng.range(2, h - 2);
    if (inside(x, y)) pts.push({ x, y });
  }
  pts.sort((a, b) => a.y - b.y);
  for (const p of pts) {
    // sphere shading: light from the upper left
    const nx = (p.x - cx) / (w / 2), ny = (p.y - cy) / (h / 2);
    const lit = -(nx * 0.55 + ny * 0.85);
    const c = shade(base, lit * 0.75 + rng.range(-0.12, 0.12));
    const r = rng.range(1.2, 2.3);
    pc.ellipse(p.x, p.y, r, r * 0.8, (x, y) => {
      const top = y < p.y - r * 0.2 && x < p.x;
      return top ? shade(c, 0.25) : c;
    });
  }
  // speckled highlights on the lit side and dark pockets
  for (let i = 0; i < w * h * 0.04; i++) {
    const x = rng.int(0, w - 1), y = rng.int(0, h - 1);
    if (pc.alpha(x, y) === 0) continue;
    const nx = (x - cx) / (w / 2), ny = (y - cy) / (h / 2);
    if (nx + ny < -0.2) pc.set(x, y, shade(base, 0.85));
    else if (rng.chance(0.5)) pc.set(x, y, shade(base, -0.75));
  }
  if (opts.blossoms) {
    for (let i = 0; i < w * h * 0.025; i++) {
      const x = rng.int(0, w - 1), y = rng.int(0, h - 1);
      if (pc.alpha(x, y) > 0) pc.set(x, y, rng.pick(opts.blossoms));
    }
  }
  pc.outline(0.45);
  return pc;
}

export function grassTuft(seed: number, base = 0x6a9a3a, w = 10, h = 9): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  const blades = rng.int(5, 8);
  for (let i = 0; i < blades; i++) {
    const x0 = rng.range(1, w - 2);
    const lean = rng.range(-0.5, 0.5);
    const len = rng.range(h * 0.5, h - 1);
    for (let k = 0; k < len; k++) {
      const t = k / len;
      pc.set(Math.round(x0 + lean * k), h - 1 - k, shade(base, -0.45 + t * 0.9));
    }
  }
  return pc;
}

export function flowerPatch(seed: number, petals: number[], w = 12, h = 9): PixelCanvas {
  const pc = grassTuft(seed, 0x5a8a34, w, h);
  const rng = new Rng(seed + 1);
  for (let i = 0; i < 4; i++) {
    const x = rng.int(2, w - 3), y = rng.int(1, h - 4);
    const c = rng.pick(petals);
    pc.set(x, y, c);
    pc.set(x + 1, y, shade(c, -0.2));
    pc.set(x, y + 1, shade(c, -0.3));
    pc.set(x + 1, y + 1, shade(c, -0.45));
    pc.set(x, y - 1 < 0 ? 0 : y - 1, shade(c, 0.35));
  }
  pc.outline(0.5);
  return pc;
}

export function bush(seed: number, base = 0x4a7a34, w = 22, h = 16, blossoms?: number[]): PixelCanvas {
  return leafClump(seed, w, h, base, { density: 0.22, blossoms });
}

/** Tall slender conifer (for the background ring). */
export function pine(seed: number, w = 26, h = 48, base = 0x2f5a3a): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  const cx = w / 2;
  for (let y = 2; y < h - 6; y++) {
    const t = (y - 2) / (h - 8);
    const tier = (t * 5) % 1;
    const half = (0.12 + t * 0.85) * (w / 2) * (0.75 + tier * 0.3);
    for (let x = Math.floor(cx - half); x <= Math.ceil(cx + half); x++) {
      const s = (x + 0.5 - cx) / half;
      if (Math.abs(s) > 1) continue;
      const c = shade(base, -s * 0.45 - tier * 0.3 + 0.15 + rng.range(-0.08, 0.08));
      pc.set(x, y, c);
    }
  }
  pc.rect(Math.floor(cx) - 1, h - 6, 3, 6, 0x4a3426);
  pc.outline(0.45);
  return pc;
}

/** Produce pile for market stalls / crates. */
export function produce(seed: number, colors: number[], w = 16, h = 8): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  for (let i = 0; i < 14; i++) {
    const x = rng.range(2, w - 2), y = rng.range(h * 0.45, h - 2) - (1 - Math.abs(x - w / 2) / (w / 2)) * h * 0.4;
    const c = rng.pick(colors);
    pc.ellipse(x, y, 1.7, 1.6, (_x, _y, nx, ny) => shade(c, -(nx + ny) * 0.5 + 0.1));
  }
  pc.outline(0.5);
  return pc;
}

/** Hanging shop sign: a board with an emblem. */
export function shopSign(kind: 'inn' | 'shop' | 'smith' | 'cafe', w = 16, h = 14): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const board = 0x7a4a2a;
  pc.rect(0, 0, w, h, shade(board, -0.4));
  pc.rect(1, 1, w - 2, h - 2, board);
  for (let y = 1; y < h - 1; y += 3) pc.rect(1, y, w - 2, 1, shade(board, -0.15));
  const cx = w / 2, cy = h / 2;
  const gold = 0xe8c060;
  if (kind === 'inn') {
    pc.rect(cx - 3, cy - 2, 5, 5, gold);
    pc.rect(cx + 2, cy - 1, 2, 3, gold);
    pc.rect(cx - 3, cy - 3, 5, 1, 0xfff0d0);
  } else if (kind === 'cafe') {
    pc.ellipse(cx, cy + 1, 3.5, 2.5, gold);
    pc.rect(cx - 2, cy - 3, 1, 2, 0xfff0d0);
    pc.rect(cx + 1, cy - 4, 1, 2, 0xfff0d0);
  } else if (kind === 'smith') {
    pc.rect(cx - 4, cy - 1, 8, 2, 0xc0c4cc);
    pc.rect(cx - 1, cy + 1, 2, 3, 0xc0c4cc);
  } else {
    pc.ellipse(cx, cy, 3, 3, 0xd04a3a);
    pc.set(cx, cy - 4, 0x5a8a34);
  }
  pc.outline(0.4);
  return pc;
}

/** Hanging banner cloth with a crest. */
export function banner(color: number, w = 12, h = 28): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // swallowtail bottom
      if (y > h - 5 && Math.abs(x + 0.5 - w / 2) < (y - (h - 5)) * 1.2) continue;
      const fold = Math.sin(x * 1.1) * 0.12;
      pc.set(x, y, shade(color, fold - y / h * 0.2 + (x === 0 || x === w - 1 ? -0.2 : 0)));
    }
  }
  pc.rect(0, 0, w, 2, 0x5a3a2a);
  const gold = 0xe8c060;
  const cx = Math.floor(w / 2);
  for (let i = 0; i < 6; i++) {
    pc.set(cx, 7 + i, gold);
    pc.set(cx - 1, 7 + i, i > 1 && i < 4 ? gold : shade(color, -0.1));
  }
  pc.rect(cx - 3, 9, 6, 1, gold);
  pc.rect(1, 3, w - 2, 1, mix(color, gold, 0.6));
  pc.outline(0.45);
  return pc;
}

/** Soft round glow sprite for lanterns and particles (alpha falloff baked into colour on black). */
export function glow(size = 16): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const c = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x + 0.5 - c, y + 0.5 - c) / c;
      if (d > 1) continue;
      const a = Math.pow(1 - d, 2);
      pc.set(x, y, 0xffffff, Math.round(a * 255));
    }
  }
  return pc;
}

/** Ivy / creeper patch that hangs on walls. */
export function ivy(seed: number, w = 14, h = 22, base = 0x4a7a3a): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  const rng = new Rng(seed);
  for (let i = 0; i < 40; i++) {
    const x = rng.range(1, w - 1), y = rng.range(0, h * (0.5 + 0.5 * (1 - Math.abs(x - w / 2) / (w / 2))));
    pc.ellipse(x, y, 1.3, 1.1, shade(base, rng.range(-0.4, 0.4)));
  }
  pc.outline(0.5);
  return pc;
}

/** Speech-bubble "…" shown above villagers who have something to say. */
export function speechBubble(w = 15, h = 11): PixelCanvas {
  const pc = new PixelCanvas(w, h);
  pc.ellipse(w / 2, 4.5, w / 2 - 0.5, 4.2, 0xf8f4ec);
  pc.set(Math.floor(w / 2) - 1, 9, 0xf8f4ec);
  pc.set(Math.floor(w / 2), 9, 0xf8f4ec);
  pc.set(Math.floor(w / 2) - 1, 10, 0xf8f4ec);
  for (const x of [4, 7, 10]) pc.rect(x, 4, 2, 2, 0x4a4a5a);
  pc.outline(0.25);
  return pc;
}
