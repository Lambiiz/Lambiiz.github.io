/**
 * Colour helpers: sRGB ↔ OKLab/OKLCH, packed pixels, and the hue-shifted shade ramps that give the
 * sprites their painted look (shadows drift towards cool violet, lights towards warm yellow).
 *
 * Packed pixels are uint32 in the byte order of a canvas ImageData viewed as Uint32Array on a
 * little-endian machine: 0xAABBGGRR.
 */

import { clamp } from './math';

export type Hex = number; // 0xRRGGBB

export const packRGBA = (r: number, g: number, b: number, a = 255): number =>
  ((clamp(Math.round(a), 0, 255) << 24) | (clamp(Math.round(b), 0, 255) << 16) | (clamp(Math.round(g), 0, 255) << 8) | clamp(Math.round(r), 0, 255)) >>> 0;
export const packHex = (hex: Hex, a = 255): number => packRGBA((hex >> 16) & 255, (hex >> 8) & 255, hex & 255, a);
export const unpack = (p: number): [number, number, number, number] => [p & 255, (p >>> 8) & 255, (p >>> 16) & 255, p >>> 24];
export const packedToHex = (p: number): Hex => ((p & 255) << 16) | (((p >>> 8) & 255) << 8) | ((p >>> 16) & 255);

export const hexToRgb = (hex: Hex): [number, number, number] => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
export const rgbToHex = (r: number, g: number, b: number): Hex =>
  (clamp(Math.round(r), 0, 255) << 16) | (clamp(Math.round(g), 0, 255) << 8) | clamp(Math.round(b), 0, 255);
export const hexToCss = (hex: Hex): string => '#' + (hex >>> 0).toString(16).padStart(6, '0');
export const cssToHex = (css: string): Hex => parseInt(css.replace('#', ''), 16) >>> 0;

export function mixHex(a: Hex, b: Hex, t: number): Hex {
  const [r1, g1, b1] = hexToRgb(a), [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

// --------------------------------------------------------------------------------------------
// OKLab (Björn Ottosson)
// --------------------------------------------------------------------------------------------

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

export interface LCH {
  l: number; // 0..1
  c: number; // 0..~0.37
  h: number; // degrees
}

export function hexToOklch(hex: Hex): LCH {
  const [R, G, B] = hexToRgb(hex).map((v) => toLinear(v / 255));
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

function oklchToLinear(L: number, C: number, H: number): [number, number, number] {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** OKLCH → hex, reducing chroma until the colour fits in sRGB. */
export function oklchToHex(L: number, C: number, H: number): Hex {
  L = clamp(L, 0, 1);
  let c = Math.max(0, C);
  let rgb = oklchToLinear(L, c, H);
  const inGamut = (v: number[]) => v.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
  if (!inGamut(rgb)) {
    let lo = 0, hi = c;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear(L, mid, H))) lo = mid;
      else hi = mid;
    }
    c = lo;
    rgb = oklchToLinear(L, c, H);
  }
  return rgbToHex(toGamma(clamp(rgb[0], 0, 1)) * 255, toGamma(clamp(rgb[1], 0, 1)) * 255, toGamma(clamp(rgb[2], 0, 1)) * 255);
}

export const oklch = (l: number, c: number, h: number): Hex => oklchToHex(l, c, h);

/** Moves hue `h` towards `target` by at most `amount` degrees along the shorter way round. */
export function hueToward(h: number, target: number, amount: number): number {
  let d = ((target - h + 540) % 360) - 180;
  const step = Math.sign(d) * Math.min(Math.abs(d), amount);
  return (h + step + 360) % 360;
}

/** Adjusts lightness / chroma / hue of a hex colour. */
export function adjust(hex: Hex, dl = 0, cMul = 1, dh = 0): Hex {
  const c = hexToOklch(hex);
  return oklchToHex(c.l + dl, c.c * cMul, c.h + dh);
}

// --------------------------------------------------------------------------------------------
// shade ramps
// --------------------------------------------------------------------------------------------

/** Shade levels of a material ramp. */
export const Shade = { Outline: 0, Deep: 1, Shadow: 2, Base: 3, Light: 4, Highlight: 5 } as const;
export const SHADES = 6;

export type RampKind = 'cloth' | 'skin' | 'hair' | 'metal' | 'gold' | 'glow' | 'leather' | 'wood' | 'organic' | 'bone' | 'dark';

interface RampSpec {
  dl: number[];
  shiftCool: number[];
  shiftWarm: number[];
  chroma: number[];
  cool: number;
  warm: number;
}

const COOL = 285, WARM = 80;
const SPECS: Record<RampKind, RampSpec> = {
  cloth: { dl: [-0.34, -0.2, -0.1, 0, 0.075, 0.14], shiftCool: [24, 15, 7, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 5, 10], chroma: [0.75, 0.95, 1.05, 1, 0.96, 0.82], cool: COOL, warm: WARM },
  organic: { dl: [-0.34, -0.19, -0.095, 0, 0.08, 0.15], shiftCool: [22, 14, 7, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 6, 12], chroma: [0.8, 1.0, 1.06, 1, 0.95, 0.8], cool: COOL, warm: WARM },
  // skin: shadows warm towards red (light scatters under the skin), never grey-blue
  skin: { dl: [-0.36, -0.16, -0.075, 0, 0.055, 0.1], shiftCool: [14, 9, 5, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 3, 6], chroma: [1.0, 1.18, 1.1, 1, 0.92, 0.78], cool: 22, warm: 75 },
  hair: { dl: [-0.34, -0.19, -0.1, 0, 0.09, 0.17], shiftCool: [20, 12, 6, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 6, 10], chroma: [0.8, 1.0, 1.05, 1, 0.98, 0.85], cool: COOL, warm: WARM },
  leather: { dl: [-0.32, -0.18, -0.09, 0, 0.07, 0.13], shiftCool: [18, 10, 5, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 5, 9], chroma: [0.8, 1.0, 1.05, 1, 0.95, 0.85], cool: 20, warm: WARM },
  wood: { dl: [-0.32, -0.18, -0.09, 0, 0.07, 0.13], shiftCool: [16, 9, 4, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 5, 9], chroma: [0.8, 1.0, 1.05, 1, 0.95, 0.85], cool: 20, warm: WARM },
  metal: { dl: [-0.42, -0.26, -0.13, 0, 0.13, 0.3], shiftCool: [18, 12, 6, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 4, 8], chroma: [0.9, 1.0, 1.0, 1, 0.8, 0.4], cool: 260, warm: WARM },
  gold: { dl: [-0.4, -0.22, -0.11, 0, 0.1, 0.2], shiftCool: [30, 18, 8, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 4, 8], chroma: [0.9, 1.05, 1.05, 1, 0.9, 0.6], cool: 25, warm: 100 },
  bone: { dl: [-0.38, -0.2, -0.1, 0, 0.05, 0.09], shiftCool: [20, 12, 6, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 4, 6], chroma: [1.6, 1.4, 1.15, 1, 0.9, 0.7], cool: COOL, warm: WARM },
  glow: { dl: [-0.28, -0.12, -0.05, 0, 0.08, 0.18], shiftCool: [10, 6, 3, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 0, 0], chroma: [0.9, 1.0, 1.0, 1, 0.85, 0.5], cool: COOL, warm: WARM },
  dark: { dl: [-0.2, -0.1, -0.05, 0, 0.07, 0.13], shiftCool: [15, 10, 5, 0, 0, 0], shiftWarm: [0, 0, 0, 0, 5, 8], chroma: [0.8, 0.9, 1.0, 1, 1.0, 0.9], cool: COOL, warm: WARM },
};

/** Six packed colours: outline, deep, shadow, base, light, highlight. */
export function makeRamp(base: Hex, kind: RampKind = 'cloth'): number[] {
  const spec = SPECS[kind];
  const c = hexToOklch(base);
  // very dark bases get their ramp lifted upwards so the shadows stay distinguishable
  const lift = Math.max(0, 0.28 - c.l) * 0.6;
  const out: number[] = [];
  for (let i = 0; i < SHADES; i++) {
    let l = c.l + spec.dl[i] + (i >= 3 ? lift * (i - 2) * 0.5 : 0);
    const floor = [0.06, 0.1, 0.14, 0, 0, 0][i];
    if (i < 3) l = Math.max(floor + (i === 0 ? 0 : lift * 0.3), Math.min(l, c.l - (3 - i) * 0.035));
    if (i === Shade.Outline) l = Math.min(l, Math.max(0.1, c.l * 0.48));
    let h = c.h;
    if (spec.shiftCool[i] > 0) h = hueToward(h, spec.cool, spec.shiftCool[i] * (c.c < 0.03 ? 0.4 : 1));
    if (spec.shiftWarm[i] > 0) h = hueToward(h, spec.warm, spec.shiftWarm[i] * (c.c < 0.03 ? 0.4 : 1));
    // greys pick up a little colour in the shadows and lights (painted, not photographic)
    let ch = c.c * spec.chroma[i];
    if (c.c < 0.025 && i !== Shade.Base && kind !== 'metal') ch += 0.012;
    out.push(packHex(oklchToHex(l, ch, h)));
  }
  return out;
}

/** Ramp whose outline is pushed further towards a dark violet ink (used for the silhouette). */
export function outlineOf(ramp: number[]): number {
  return ramp[Shade.Outline];
}
