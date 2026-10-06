import { makeRamp, packHex, Shade, SHADES, type Hex, type RampKind } from '../core/color';

/** Surface micro textures, drawn as a modulation of the lighting term (tufts, scales, links…). */
export type Texture = 'none' | 'fur' | 'scales' | 'plates' | 'feathers' | 'hair' | 'chain' | 'knit';

/** How a material reacts to light: thresholds on a wrapped diffuse term, plus a specular cut. */
export interface ShadeStyle {
  wrap: number;
  light: number;
  base: number;
  shadow: number;
  /** n·h threshold for the highlight band (> 1 disables). */
  spec: number;
  texture: Texture;
  faceted?: boolean;
}

const style = (wrap: number, light: number, base: number, shadow: number, spec: number, texture: Texture = 'none', faceted = false): ShadeStyle =>
  ({ wrap, light, base, shadow, spec, texture, faceted });

export const STYLES = {
  matte: style(0.3, 0.62, 0.22, -0.1, 2),
  cloth: style(0.32, 0.6, 0.2, -0.12, 2),
  skin: style(0.4, 0.6, 0.18, -0.14, 0.992),
  hair: style(0.25, 0.6, 0.24, -0.06, 0.97, 'hair'),
  leather: style(0.25, 0.6, 0.22, -0.08, 0.975),
  metal: style(0.05, 0.6, 0.3, 0.04, 0.9),
  chain: style(0.15, 0.6, 0.28, 0.0, 0.93, 'chain'),
  glossy: style(0.2, 0.62, 0.25, -0.05, 0.93),
  fur: style(0.35, 0.58, 0.18, -0.12, 2, 'fur'),
  hide: style(0.25, 0.6, 0.22, -0.08, 0.985),
  scales: style(0.2, 0.62, 0.24, -0.04, 0.975, 'scales'),
  chitin: style(0.1, 0.64, 0.28, 0.0, 0.955, 'plates'),
  stone: style(0.15, 0.6, 0.26, -0.02, 2, 'none', true),
  slime: style(0.45, 0.62, 0.2, -0.2, 0.94),
  feather: style(0.3, 0.6, 0.2, -0.1, 2, 'feathers'),
  membrane: style(0.4, 0.62, 0.2, -0.15, 2),
  emissive: style(1.0, 0.7, 0.3, -2, 0.9),
  knit: style(0.32, 0.6, 0.2, -0.12, 2, 'knit'),
} satisfies Record<string, ShadeStyle>;

export type StyleName = keyof typeof STYLES;

/** Global form-light remap: about a third of a body faces away from the light (readable volume). */
const FORM_SHIFT = -0.1, FORM_GAIN = 1.08;

export function shadeLevel(s: ShadeStyle, ndl: number, ndh: number): number {
  const w = ((ndl + s.wrap) / (1 + s.wrap) + FORM_SHIFT) * FORM_GAIN;
  if (ndh > s.spec) return Shade.Highlight;
  if (w > s.light) return Shade.Light;
  if (w > s.base) return Shade.Base;
  if (w > s.shadow) return Shade.Shadow;
  return Shade.Deep;
}

export interface Material {
  color: Hex;
  ramp: RampKind;
  style: StyleName;
  /** Always lit, no outline darkening (glow). */
  emissive?: boolean;
}

/** Compiled palette: one six-colour ramp and one shading style per material slot. */
export class Palette {
  readonly ramps: Uint32Array;
  readonly styles: ShadeStyle[];
  readonly emissive: boolean[];
  /** Ground shadow colour (translucent). */
  readonly shadow = packHex(0x120e1c, 88);

  constructor(readonly slots: string[], readonly materials: Record<string, Material>) {
    this.ramps = new Uint32Array(slots.length * SHADES);
    this.styles = [];
    this.emissive = [];
    slots.forEach((name, i) => {
      const m = materials[name] ?? { color: 0xff00ff, ramp: 'cloth', style: 'matte' };
      const r = makeRamp(m.color, m.ramp);
      for (let k = 0; k < SHADES; k++) this.ramps[i * SHADES + k] = r[k];
      this.styles.push(STYLES[m.style]);
      this.emissive.push(!!m.emissive);
    });
  }

  color(slot: number, level: number): number {
    return this.ramps[slot * SHADES + (level < 0 ? 0 : level > 5 ? 5 : level)];
  }

  /** Distinct colours actually present (for the info panel). */
  uniqueColors(): number[] {
    return [...new Set(Array.from(this.ramps))];
  }
}
