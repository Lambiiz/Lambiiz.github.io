/** Small seeded PRNG (mulberry32). Deterministic: the same seed always yields the same stream. */
export class Rng {
  private s: number;
  constructor(seed = 1) {
    this.s = seed >>> 0;
  }
  /** Float in [0, 1). */
  next(): number {
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(a: number, b: number): number {
    return a + (b - a) * this.next();
  }
  int(a: number, b: number): number {
    return Math.floor(this.range(a, b + 1));
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }
  chance(p: number): boolean {
    return this.next() < p;
  }
}

/** Integer hash → [0,1). Stable lattice noise for textures. */
export function hash2(x: number, y: number, seed = 0): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Tileable value noise with period (px, py). */
export function valueNoise(x: number, y: number, px: number, py: number, seed = 0): number {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const w = (a: number, p: number) => ((a % p) + p) % p;
  const a = hash2(w(x0, px), w(y0, py), seed);
  const b = hash2(w(x0 + 1, px), w(y0, py), seed);
  const c = hash2(w(x0, px), w(y0 + 1, py), seed);
  const d = hash2(w(x0 + 1, px), w(y0 + 1, py), seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

/** Tileable fractal noise over a texture of size (w, h); `scale` = lattice cells across the texture. */
export function fbm(x: number, y: number, w: number, h: number, scale: number, octaves = 3, seed = 0): number {
  let amp = 0.5, sum = 0, norm = 0, s = scale;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise((x / w) * s, (y / h) * s, s, s, seed + o * 31);
    norm += amp;
    amp *= 0.5;
    s *= 2;
  }
  return sum / norm;
}
