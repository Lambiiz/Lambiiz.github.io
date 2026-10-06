/**
 * Body-anchored surface patterns. Every shaded pixel knows which primitive it belongs to and where
 * on that primitive it sits: a coordinate along the part (u, pixels) and an angle around it (theta,
 * 0 = top/dorsal, ±π = belly). Patterns are functions of those coordinates, so marks stick to the
 * body through every pose and direction instead of swimming over it.
 */

import { Domain } from '../anatomy/anatomy';
import { hash01 } from '../core/rng';
import { PI, frac, lerp, smoothstep } from '../core/math';

export type PatternKind = 'none' | 'stripes' | 'spots' | 'rosettes' | 'saddle' | 'dorsal' | 'mottled' | 'bands' | 'blotches' | 'piebald';

export interface SurfaceSpec {
  pattern: PatternKind;
  /** Characteristic mark size in pixels (at pattern scale 1). */
  markSize: number;
  /** 0..1 how much of the surface the marks cover. */
  density: number;
  seed: number;
  /** 0..1 lighter belly. */
  countershade: number;
  /** 0..1 length of coloured tail / limb tips. */
  tips: number;
  /** 0..1 coloured lower legs. */
  socks: number;
  /** Slots that patterns may recolour (the body coat). */
  coat: number[];
  markSlot: number;
  bellySlot: number;
  tipSlot: number;
  /** Which domains carry the main pattern. */
  domains: number[];
}

export const NO_SURFACE: SurfaceSpec = {
  pattern: 'none', markSize: 4, density: 0.5, seed: 1, countershade: 0, tips: 0, socks: 0,
  coat: [], markSlot: -1, bellySlot: -1, tipSlot: -1, domains: [],
};

export interface SurfacePoint {
  domain: number;
  /** Pixels along the part (from its start, offset by the part's domain range). */
  u: number;
  /** 0..1 along the part. */
  t: number;
  /** Angle around the part: 0 top, ±π underside. */
  theta: number;
  /** Arc length around the part in pixels. */
  v: number;
}

function valueNoise(seed: number, x: number, y: number): number {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = hash01(seed, x0, y0), b = hash01(seed, x0 + 1, y0);
  const c = hash01(seed, x0, y0 + 1), d = hash01(seed, x0 + 1, y0 + 1);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sy);
}

function fbm(seed: number, x: number, y: number): number {
  return valueNoise(seed, x, y) * 0.65 + valueNoise(seed + 17, x * 2.1, y * 2.1) * 0.35;
}

/** Distance to the nearest jittered cell centre (cellular noise), in cell units. */
function cellDist(seed: number, x: number, y: number, jitter = 0.7): number {
  const cx = Math.floor(x), cy = Math.floor(y);
  let best = 9;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ix = cx + dx, iy = cy + dy;
      const px = ix + 0.5 + (hash01(seed, ix, iy, 1) - 0.5) * jitter;
      const py = iy + 0.5 + (hash01(seed, ix, iy, 2) - 0.5) * jitter;
      const d = Math.hypot(x - px, y - py);
      if (d < best) best = d;
    }
  }
  return best;
}

/** Returns the slot to draw for a pixel (possibly recoloured by the pattern). */
export function evaluateSurface(s: SurfaceSpec, sp: SurfacePoint, slot: number, scale: number): number {
  if (!s.coat.includes(slot)) return slot;
  const dom = sp.domain;
  const absT = Math.abs(sp.theta);
  // tips and socks first: they read best and win over patterns
  if (s.tipSlot >= 0 && s.tips > 0.02 && dom === Domain.Tail && sp.t > 1 - s.tips * 0.6) return s.tipSlot;
  if (s.tipSlot >= 0 && s.socks > 0.02 && dom === Domain.Limb && sp.t > 1 - s.socks * 0.7) return s.tipSlot;
  if (s.bellySlot >= 0 && s.countershade > 0.02 && (dom === Domain.Body || dom === Domain.Neck || dom === Domain.Head || dom === Domain.Tail || dom === Domain.Belly)) {
    const limit = PI * (1 - 0.42 * s.countershade);
    const wobble = (valueNoise(s.seed + 5, sp.u / (6 * scale), 0) - 0.5) * 0.4;
    if (absT > limit + wobble || dom === Domain.Belly) return s.bellySlot;
  }
  if (s.pattern === 'none' || s.markSlot < 0 || !s.domains.includes(dom)) return slot;
  const size = Math.max(1.5, s.markSize * scale);
  const u = sp.u / size, v = sp.v / size;
  const dens = s.density;
  switch (s.pattern) {
    case 'stripes': {
      // bands across the body, thinning towards the belly, with a little wobble
      if (absT > PI * 0.78) return slot;
      const w = (valueNoise(s.seed, v * 0.6, u * 0.3) - 0.5) * 0.5;
      const f = frac(u * 0.55 + w);
      const width = lerp(0.18, 0.5, dens) * (1 - smoothstep(PI * 0.4, PI * 0.78, absT));
      return f < width ? s.markSlot : slot;
    }
    case 'bands': {
      const f = frac(u * 0.45);
      return f < lerp(0.2, 0.5, dens) ? s.markSlot : slot;
    }
    case 'spots': {
      if (absT > PI * 0.82) return slot;
      const d = cellDist(s.seed, u * 0.9, v * 0.9);
      return d < lerp(0.18, 0.34, dens) ? s.markSlot : slot;
    }
    case 'rosettes': {
      if (absT > PI * 0.82) return slot;
      const d = cellDist(s.seed, u * 0.7, v * 0.7);
      const r = lerp(0.22, 0.34, dens);
      return d < r && d > r * 0.45 ? s.markSlot : slot;
    }
    case 'saddle': {
      if (dom !== Domain.Body) return slot;
      const edge = (valueNoise(s.seed, sp.u / (5 * scale), 1) - 0.5) * 0.5;
      return absT < PI * lerp(0.28, 0.45, dens) + edge && sp.t > 0.25 && sp.t < 0.85 ? s.markSlot : slot;
    }
    case 'dorsal': {
      const w = lerp(0.12, 0.3, dens) * PI;
      return absT < w ? s.markSlot : slot;
    }
    case 'mottled': {
      const n = fbm(s.seed, u * 0.8, v * 0.8);
      return n > lerp(0.7, 0.5, dens) ? s.markSlot : slot;
    }
    case 'blotches': {
      const n = fbm(s.seed, u * 0.35, v * 0.35);
      return n > lerp(0.68, 0.52, dens) ? s.markSlot : slot;
    }
    case 'piebald': {
      const n = fbm(s.seed, u * 0.25, v * 0.25 + sp.theta);
      return n > lerp(0.66, 0.48, dens) ? s.markSlot : slot;
    }
  }
  return slot;
}
