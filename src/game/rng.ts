// Small seeded PRNG (mulberry32) with independent named streams so that cosmetic
// randomness can never perturb offers or spawns.

export class Rng {
  private s: number;
  constructor(seed: number) {
    this.s = seed >>> 0;
  }
  next(): number {
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(a: number, b: number): number {
    return a + (b - a) * this.next();
  }
  int(n: number): number {
    return Math.floor(this.next() * n);
  }
  pick<T>(items: readonly T[]): T {
    return items[this.int(items.length)];
  }
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function deriveStream(seed: number, name: 'offers' | 'spawns' | 'cosmetic' | 'deck' | 'actives'): Rng {
  return new Rng((seed ^ hashString(name)) >>> 0);
}

export function freshSeed(): number {
  // Wall-clock entropy is fine here: seeds are displayed and replayable.
  return (Math.floor(Math.random() * 0xffffffff) ^ Date.now()) >>> 0 || 1;
}
