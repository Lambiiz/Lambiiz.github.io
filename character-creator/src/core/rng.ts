/**
 * Seeded randomness. Every creature is a pure function of its genome, and a genome is sampled from a
 * seed with separate streams (anatomy, color, pattern, motion), so rerolling colours never changes
 * the body. Nothing here uses Math.random.
 */

/** FNV-1a over a string → uint32. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Murmur3-style finaliser: a well mixed uint32 from any uint32. */
export function mix32(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Seed of a named sub-stream. */
export function deriveSeed(seed: number, label: string): number {
  return mix32((seed ^ hashString(label)) + 0x9e3779b9);
}

/** Stable hash of integer coordinates → [0, 1). Used for body-anchored patterns. */
export function hash01(seed: number, x: number, y: number, z = 0): number {
  let h = seed ^ Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(z | 0, 0x61c88647);
  return mix32(h) / 4294967296;
}

/** Seed from user input: numbers are used as they are, any other text is hashed. */
export function seedFromText(text: string): number {
  const t = text.trim();
  if (/^\d+$/.test(t)) return Number(t) >>> 0;
  return hashString(t);
}

/** sfc32: small, fast, good quality. */
export class Rng {
  private a: number;
  private b: number;
  private c: number;
  private d: number;

  constructor(seed: number) {
    this.a = 0x9e3779b9;
    this.b = 0x243f6a88;
    this.c = 0xb7e15162;
    this.d = seed >>> 0;
    for (let i = 0; i < 12; i++) this.next();
  }

  /** Float in [0, 1). */
  next(): number {
    const t = (((this.a + this.b) | 0) + this.d) | 0;
    this.d = (this.d + 1) | 0;
    this.a = this.b ^ (this.b >>> 9);
    this.b = (this.c + (this.c << 3)) | 0;
    this.c = (this.c << 21) | (this.c >>> 11);
    this.c = (this.c + t) | 0;
    return (t >>> 0) / 4294967296;
  }
  uint(): number {
    return Math.floor(this.next() * 4294967296) >>> 0;
  }
  range(a: number, b: number): number {
    return a + (b - a) * this.next();
  }
  /** Integer in [a, b] inclusive. */
  int(a: number, b: number): number {
    return a + Math.floor(this.next() * (b - a + 1));
  }
  chance(p: number): boolean {
    return this.next() < p;
  }
  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }
  /** Index chosen with probability proportional to its weight. */
  weighted(weights: readonly number[]): number {
    let total = 0;
    for (const w of weights) total += Math.max(0, w);
    let r = this.next() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= Math.max(0, weights[i]);
      if (r < 0) return i;
    }
    return weights.length - 1;
  }
  /** Picks an id from [id, weight] pairs. */
  pickWeighted<T>(options: readonly (readonly [T, number])[]): T {
    return options[this.weighted(options.map((o) => o[1]))][0];
  }
  /** Normal distribution (Box–Muller), clipped to ±clip standard deviations. */
  gaussian(mean = 0, sd = 1, clip = 3): number {
    const u = Math.max(1e-12, this.next()), v = this.next();
    const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return mean + sd * Math.max(-clip, Math.min(clip, g));
  }
}
