/** Colour helpers for pixel drawing. Colours are 0xRRGGBB integers. */

export type RGB = [number, number, number];

export function rgb(c: number): RGB {
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
}

export function pack(r: number, g: number, b: number): number {
  const cl = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (cl(r) << 16) | (cl(g) << 8) | cl(b);
}

export function mix(a: number, b: number, t: number): number {
  const [ar, ag, ab] = rgb(a), [br, bg, bb] = rgb(b);
  return pack(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}

/** Multiply brightness; >1 lightens. */
export function scale(c: number, k: number): number {
  const [r, g, b] = rgb(c);
  return pack(r * k, g * k, b * k);
}

/**
 * Hue-shifted shading, the pixel-art way: shadows drift toward cool purple-blue, highlights toward
 * warm yellow, instead of plain darken / lighten. `t` < 0 shades, > 0 lights (about -1..1).
 */
export function shade(c: number, t: number): number {
  if (t < 0) return mix(scale(c, 1 + t * 0.55), 0x2a2050, -t * 0.28);
  return mix(scale(c, 1 + t * 0.35), 0xfff0c0, t * 0.3);
}

/** Build an n-step ramp around a base colour, darkest first. */
export function ramp(c: number, n = 4, spread = 1): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(shade(c, ((i / (n - 1)) * 2 - 1) * spread * 0.8));
  return out;
}
