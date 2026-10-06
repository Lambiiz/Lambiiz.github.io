/**
 * Slimes & spirits: hopping slimes (with faces, cores and crowns), sheet ghosts with wispy tails,
 * flame wisps, floating eyes with eye stalks and tentacles, and jellyfish. Soft bodies squash and
 * stretch; tendrils hang, trail and ripple (see anim/blob.ts).
 */

import { Domain, GF, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { BlobAnimator, type BlobRig, type BlobType, type Tendril, type TendrilKind } from '../anim/blob';
import { hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { Vec3, Xform, clamp, lerp, segmentFrame } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { Material, StyleName } from '../render/materials';
import type { PatternKind, SurfaceSpec } from '../render/surface';
import { syllableName } from './human';

type W = readonly (readonly [string, number])[];
const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const ARCH = [['slime', 'Slime'], ['ghost', 'Ghost'], ['wisp', 'Wisp'], ['eye', 'Floating eye'], ['jelly', 'Jellyfish']] as const;

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('size', 'Size', 0.5)
  .float('height', 'Height', 0.5)
  .choice('shape', 'Slime shape', opt(['dome', 'Dome'], ['drop', 'Droplet']), 'dome')
  .group('face', 'Face', 'anatomy')
  .float('eyeSize', 'Eye size', 0.5)
  .choice('eyeStyle', 'Eyes', opt(['button', 'Button'], ['bead', 'Beady'], ['round', 'Round'], ['slit', 'Slit'], ['glow', 'Glowing']), 'button')
  .bool('mouth', 'Mouth', true)
  .group('extras', 'Extras', 'anatomy')
  .bool('core', 'Visible core (slime)', false)
  .bool('crown', 'Crown (slime)', false)
  .bool('arms', 'Little arms (ghost)', true)
  .choice('stalks', 'Eye stalks', opt(['0', 'None'], ['3', 'Three'], ['5', 'Five']), '0')
  .choice('tentacles', 'Tentacles', opt(['0', 'None'], ['3', 'Three'], ['5', 'Five'], ['8', 'Eight']), '0')
  .float('tentacleLength', 'Tentacle length', 0.5)
  .group('colors', 'Colours', 'color')
  .bool('glow', 'Glows', false)
  .color('bodyColor', 'Body', 0x6ac85a)
  .color('secondColor', 'Second colour', 0x3a8a4a)
  .color('eyeColor', 'Eyes', 0x2a2228)
  .color('markColor', 'Markings', 0x3a8a4a)
  .group('pattern', 'Pattern', 'pattern')
  .choice('pattern', 'Pattern', opt(['none', 'None'], ['spots', 'Spots'], ['mottled', 'Mottled'], ['stripes', 'Stripes'], ['piebald', 'Patches']), 'none')
  .float('markSize', 'Mark size', 0.5)
  .float('density', 'Density', 0.5)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .float('bounce', 'Bounce', 0.5)
  .float('wobble', 'Wobble', 0.5)
  .build();

interface Prior {
  weight: number;
  size: [number, number];
  shape?: W;
  eyes: W;
  mouth: number;
  core?: number;
  crown?: number;
  arms?: number;
  stalks?: W;
  tentacles?: W;
  glow: number;
  bodies: Hex[];
  seconds?: Hex[];
  eyeColors: Hex[];
  patterns: W;
}

const PRIORS: Record<BlobType, Prior> = {
  slime: { weight: 1.5, size: [6, 12], shape: [['dome', 2], ['drop', 1]], eyes: [['button', 2], ['bead', 1], ['round', 0.6]], mouth: 0.7, core: 0.25, crown: 0.06, glow: 0.05, bodies: [0x6ac85a, 0x4a9ad8, 0xd85a5a, 0xb86ad8, 0xe8c84a, 0x5ad8c8, 0xe88ab8, 0x8a8a8a], eyeColors: [0x1e1a22], patterns: [['none', 4], ['spots', 1], ['mottled', 0.6]] },
  ghost: { weight: 1.1, size: [5, 8], eyes: [['button', 3], ['glow', 1]], mouth: 0.8, arms: 0.75, glow: 0.35, bodies: [0xe8ecf0, 0xd8e4f0, 0xc8e8e0, 0xe0d8f0, 0xb8c8d8], eyeColors: [0x1e1a28, 0x5ad8ff, 0xff5a5a, 0x9aff6a], patterns: [['none', 1]] },
  wisp: { weight: 1, size: [4.5, 7], eyes: [['bead', 2], ['button', 1]], mouth: 0.3, glow: 1, bodies: [0x8ae8ff, 0xffb84a, 0xa8ff8a, 0xff7ad8, 0xd8a8ff], eyeColors: [0x1e1a28], patterns: [['none', 1]] },
  eye: { weight: 1, size: [6, 11], eyes: [['round', 2], ['slit', 1]], mouth: 0.4, stalks: [['0', 2], ['3', 1], ['5', 1]], tentacles: [['0', 1], ['3', 1], ['5', 1.5]], glow: 0, bodies: [0x8a5a6a, 0x6a7a5a, 0xa87a6a, 0x5a5a7a, 0xc89a8a], eyeColors: [0xc83a3a, 0x3a9a5a, 0xd8a83a, 0x5a7ad8], patterns: [['none', 3], ['spots', 1], ['mottled', 1]] },
  jelly: { weight: 0.9, size: [6, 10], eyes: [['bead', 1]], mouth: 0, tentacles: [['5', 1], ['8', 2]], glow: 0.5, bodies: [0xe8a8d8, 0xa8c8f8, 0xc8a8f8, 0xf8c8a8, 0xa8f0e0], eyeColors: [0x1e1a28], patterns: [['none', 3], ['spots', 1]] },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.035 * amt), l.c * (1 + rng.gaussian(0, 0.12 * amt)), l.h + rng.gaussian(0, 8 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const type = (ctx.arch in PRIORS ? ctx.arch : 'slime') as BlobType;
  const p = PRIORS[type];
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), pt = ctx.rng('pattern'), m = ctx.rng('motion');
  const g = (mean: number, sd = 0.12) => clamp(a.gaussian(mean, sd), 0, 1);
  const v: Record<string, GeneValue> = {
    size: g(0.5, 0.25), height: g(0.5), shape: p.shape ? pick(a, p.shape) : 'dome', eyeSize: g(0.5, 0.15), eyeStyle: pick(a, p.eyes), mouth: a.chance(p.mouth),
    core: a.chance(p.core ?? 0), crown: a.chance(p.crown ?? 0), arms: a.chance(p.arms ?? 0), stalks: p.stalks ? pick(a, p.stalks) : '0',
    tentacles: p.tentacles ? pick(a, p.tentacles) : '0', tentacleLength: g(0.5, 0.18),
  };
  const body = jitter(c, c.pick(p.bodies), 0.8);
  const bl = hexToOklch(body);
  v.glow = c.chance(p.glow);
  v.bodyColor = body;
  v.secondColor = type === 'wisp' ? oklch(Math.min(0.97, bl.l + 0.15), bl.c * 0.5, bl.h) : oklch(clamp(bl.l - 0.18, 0.2, 0.9), bl.c * 1.1, bl.h + c.range(-25, 25));
  v.eyeColor = v.eyeStyle === 'glow' || type === 'eye' ? c.pick(p.eyeColors) : p.eyeColors[0];
  v.markColor = oklch(clamp(bl.l - 0.14, 0.2, 0.9), bl.c * 1.15, bl.h + 10);
  v.pattern = pick(pt, p.patterns);
  v.markSize = clamp(pt.gaussian(0.5, 0.15), 0, 1);
  v.density = clamp(pt.gaussian(0.5, 0.18), 0, 1);
  v.energy = clamp(m.gaussian(0.5, 0.15), 0, 1);
  v.bounce = clamp(m.gaussian(0.5, 0.15), 0, 1);
  v.wobble = clamp(m.gaussian(0.5, 0.15), 0, 1);
  return v;
}

/** A chain of `count` bones from `at` (shape-bone frame) along `dir`, with tapering round cones. */
function tendril(
  b: AnatomyBuilder, shape: number, kind: TendrilKind, at: Vec3, dir: Vec3, count: number, seg: number, r0: number, r1: number,
  slot: string, group: number, phase: number, side: number, flags = 0, domain: Domain = Domain.Limb, tipSlot = slot,
): Tendril {
  const d = dir.norm(Vec3.Y);
  const up = Math.abs(d.y) > 0.9 ? Vec3.X : Vec3.Y;
  const base = b.restWorld(shape).point(at);
  const bones: number[] = [];
  for (let j = 0; j < count; j++) {
    const p = base.addScaled(d, seg * j);
    bones.push(b.boneAt('tendril', j ? bones[j - 1] : shape, segmentFrame(p, p.addScaled(d, seg), up)));
  }
  for (let j = 0; j < count; j++) {
    const ra = lerp(r0, r1, j / count), rb = lerp(r0, r1, (j + 1) / count);
    b.cone(group, bones[j], Vec3.ZERO, ra, j + 1 < count ? bones[j + 1] : bones[j], j + 1 < count ? Vec3.ZERO : new Vec3(seg, 0, 0), rb, j === count - 1 ? tipSlot : slot, { side, flags, domain, u0: j / count, u1: (j + 1) / count, domainLen: seg * count });
  }
  return { kind, at, dir: d, bones, seg, phase, side };
}

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const type = (genome.archetype in PRIORS ? genome.archetype : 'slime') as BlobType;
  const p = PRIORS[type];
  const b = new AnatomyBuilder(scale);
  const R = lerp(p.size[0], p.size[1], g.f('size')) * scale;
  const hgt = lerp(0.8, 1.25, g.f('height'));
  const tentLen = R * lerp(1.2, 2.6, g.f('tentacleLength')) * (type === 'jelly' ? 1.3 : 1);
  const nTent = Number(g.c('tentacles')) || 0;
  const hover = { slime: 0, ghost: R * 2.9 * hgt, wisp: R * 3.2, eye: R * 1.25 + (nTent ? tentLen * 0.85 : R * 0.9), jelly: R * 0.4 + tentLen * 0.95 }[type];
  const root = b.bone('root', -1, Xform.I);
  const body = b.bone('body', root, Xform.at(0, hover, 0));
  const shape = b.bone('shape', body, Xform.I);
  const tendrils: Tendril[] = [];
  let eyeball = -1, lid = -1, beam = -1;
  const es = g.f('eyeSize');
  const eyeStyle = g.c('eyeStyle');
  const bo = { domain: Domain.Body, domainLen: R * 2 };
  let height = R * 2;

  switch (type) {
    case 'slime': {
      const gb = b.group('body', R * 0.4, { flags: GF.CreaseShade });
      b.ellipsoid(gb, shape, new Vec3(0, R * 0.78 * hgt, 0), new Vec3(R, R * 0.82 * hgt, R), 'primary', bo);
      b.ellipsoid(gb, shape, new Vec3(0, R * 0.32, 0), new Vec3(R * 1.12, R * 0.32, R * 1.12), 'primary', bo);
      const top = R * 1.6 * hgt;
      height = top;
      if (g.c('shape') === 'drop') {
        b.cone(gb, shape, new Vec3(-R * 0.1, R * 1.25 * hgt, 0), R * 0.45, shape, new Vec3(-R * 0.4, R * 1.95 * hgt, 0), R * 0.1, 'primary', bo);
        height = R * 2 * hgt;
      }
      for (const side of [-1, 1]) b.feature('eye', shape, new Vec3(R * 0.8, R * 0.95 * hgt, side * R * 0.36), new Vec3(0.85, 0.2, side * 0.42), Math.max(1, R * 0.24 * lerp(0.8, 1.4, es)), { style: eyeStyle, side, slot: 'eye' });
      if (g.b('mouth')) b.feature('mouth', shape, new Vec3(R * 0.95, R * 0.58 * hgt, 0), new Vec3(1, -0.05, 0), Math.max(1, R * 0.24), { aspect: 1.3, slot: 'mouth' });
      if (g.b('core')) {
        const gc = b.group('core', 0, { depthBias: R * 0.9, flags: GF.NoContour | GF.NoOutline });
        b.ellipsoid(gc, shape, new Vec3(-R * 0.1, R * 0.62 * hgt, R * 0.1), new Vec3(R * 0.3, R * 0.3, R * 0.3), 'second', { flags: PF.NoShadow | PF.NoPattern | PF.NoOutline });
        b.trait('core');
      }
      if (g.b('crown')) {
        const gk = b.group('crown', R * 0.1, { depthBias: 0.1 });
        const cy = (g.c('shape') === 'drop' ? R * 1.45 : R * 1.55) * hgt;
        b.ellipsoid(gk, shape, new Vec3(0, cy, 0), new Vec3(R * 0.42, R * 0.13, R * 0.42), 'gold', { flags: PF.NoPattern });
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2;
          const x = Math.cos(a) * R * 0.36, z = Math.sin(a) * R * 0.36;
          b.cone(gk, shape, new Vec3(x, cy, z), R * 0.12, shape, new Vec3(x * 1.1, cy + R * 0.38, z * 1.1), 0.35, 'gold', { flags: PF.NoPattern });
        }
        height += R * 0.4;
        b.trait('crown');
      }
      break;
    }
    case 'ghost': {
      const gb = b.group('body', R * 0.25);
      b.ellipsoid(gb, shape, Vec3.ZERO, new Vec3(R, R * 1.05, R), 'primary', bo);
      // a sheet: the skirt is cut flat and a wavy hem of short lobes hangs from its rim
      const hem = -R * 1.1 * hgt;
      b.cone(gb, shape, new Vec3(0, -R * 0.2, 0), R * 0.98, shape, new Vec3(-R * 0.08, hem + R * 0.1, 0), R * 1.08, 'primary', { ...bo, clips: [{ n: new Vec3(0, -1, 0), d: -hem }] });
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        tendrils.push(tendril(b, shape, 'hang', new Vec3(-R * 0.08 + Math.cos(a) * R * 0.74, hem + R * 0.15, Math.sin(a) * R * 0.74), new Vec3(Math.cos(a) * 0.25, -1, Math.sin(a) * 0.25), 1, R * 0.7, R * 0.4, R * 0.07, 'primary', gb, k * 1.9, 0, 0, Domain.Body));
      }
      tendrils.push(tendril(b, shape, 'tail', new Vec3(-R * 0.75, hem + R * 0.2, 0), new Vec3(-0.8, -0.5, 0), 3, R * 0.45, R * 0.45, R * 0.08, 'primary', gb, 0, 0, 0, Domain.Body));
      if (g.b('arms')) {
        for (const side of [-1, 1]) {
          const ga = b.group('arm', R * 0.15, { side });
          tendrils.push(tendril(b, shape, 'arm', new Vec3(R * 0.15, -R * 0.35, side * R * 0.9), new Vec3(0.45, -0.75, side * 0.5), 2, R * 0.42, R * 0.3, R * 0.24, 'primary', ga, side, side));
        }
      }
      for (const side of [-1, 1]) b.feature('eye', shape, new Vec3(R * 0.84, R * 0.12, side * R * 0.36), new Vec3(0.9, 0.1, side * 0.42), Math.max(1, R * 0.4 * lerp(0.8, 1.3, es)), { style: eyeStyle, side, slot: 'eye', aspect: 0.8 });
      if (g.b('mouth')) b.feature('mouth', shape, new Vec3(R * 0.97, -R * 0.4, 0), new Vec3(1, 0, 0), Math.max(1, R * 0.3), { slot: 'mouth' });
      height = hover + R;
      break;
    }
    case 'wisp': {
      const gw = b.group('wisp', R * 0.45, { flags: GF.NoFarShade });
      b.ellipsoid(gw, shape, Vec3.ZERO, new Vec3(R, R, R), 'core', { flags: PF.Emissive | PF.NoPattern });
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2 + 0.3;
        tendrils.push(tendril(b, shape, 'flame', new Vec3(Math.cos(a) * R * 0.55, R * 0.45, Math.sin(a) * R * 0.55), new Vec3(Math.cos(a) * 0.55, 1, Math.sin(a) * 0.55), 2, R * 0.75, R * 0.55, R * 0.08, 'flame', gw, k * 1.3, 0, PF.Emissive | PF.NoPattern | PF.NoShadow, Domain.Limb, 'flameTip'));
      }
      tendrils.push(tendril(b, shape, 'flame', new Vec3(0, R * 0.7, 0), new Vec3(0, 1, 0), 2, R * 0.95, R * 0.6, R * 0.08, 'flame', gw, 0.7, 0, PF.Emissive | PF.NoPattern | PF.NoShadow, Domain.Limb, 'flameTip'));
      tendrils.push(tendril(b, shape, 'tail', new Vec3(-R * 0.6, 0, 0), new Vec3(-1, 0.25, 0), 3, R * 0.6, R * 0.7, R * 0.08, 'flame', gw, 0.2, 0, PF.Emissive | PF.NoPattern | PF.NoShadow, Domain.Limb, 'flameTip'));
      for (const side of [-1, 1]) b.feature('eye', shape, new Vec3(R * 0.88, R * 0.08, side * R * 0.3), new Vec3(0.9, 0.1, side * 0.4), Math.max(1, R * 0.32 * lerp(0.8, 1.3, es)), { style: eyeStyle, side, slot: 'eye' });
      height = hover + R * 2.4;
      break;
    }
    case 'eye': {
      const gb = b.group('body', R * 0.35, { flags: GF.CreaseShade });
      b.ellipsoid(gb, shape, Vec3.ZERO, new Vec3(R, R * hgt, R), 'primary', bo);
      const re = R * 0.64;
      eyeball = b.bone('eyeball', shape, Xform.at(R * 0.44, R * 0.16, 0));
      b.ellipsoid(b.group('sclera', 0), eyeball, Vec3.ZERO, new Vec3(re, re, re), 'sclera', { flags: PF.NoPattern });
      b.ellipsoid(b.group('iris', 0, { depthBias: 0.1 }), eyeball, new Vec3(re * 0.8, 0, 0), new Vec3(re * 0.3, re * 0.52 * lerp(0.85, 1.15, es), re * 0.52 * lerp(0.85, 1.15, es)), 'iris', { flags: PF.NoPattern | PF.NoShadow });
      const slit = eyeStyle === 'slit';
      b.ellipsoid(b.group('pupil', 0, { depthBias: 0.2, flags: GF.NoContour }), eyeball, new Vec3(re * 0.98, 0, 0), new Vec3(re * 0.15, re * (slit ? 0.4 : 0.24), re * (slit ? 0.09 : 0.24)), 'pupil', { flags: PF.NoPattern | PF.NoShadow | PF.NoOutline });
      b.feature('spot', eyeball, new Vec3(re * 0.92, re * 0.32, -re * 0.28), new Vec3(1, 0.4, -0.3), 1, { slot: 'sclera' });
      lid = b.bone('lid', shape, Xform.at(R * 0.44, R * 0.16, 0));
      b.ellipsoid(b.group('lid', 0), lid, Vec3.ZERO, new Vec3(re * 1.14, re * 1.14, re * 1.14), 'primary', { ...bo, clips: [{ n: new Vec3(0, -1, 0), d: 0 }] });
      const gbeam = b.group('beam', 0, { depthBias: 3, flags: GF.NoContour | GF.NoFarShade });
      b.cone(gbeam, eyeball, new Vec3(re * 1.05, 0, 0), re * 0.32, eyeball, new Vec3(R * 4.5, 0, 0), re * 0.65, 'beam', { flags: PF.Emissive | PF.NoShadow | PF.NoPattern | PF.NoOutline });
      beam = gbeam;
      const nStalk = Number(g.c('stalks')) || 0;
      if (nStalk) {
        const gs = b.group('stalks', R * 0.15);
        for (let k = 0; k < nStalk; k++) {
          const a = nStalk === 1 ? 0 : -1.1 + (2.2 * k) / (nStalk - 1);
          const back = k % 2 ? -0.35 : 0;
          const dir = new Vec3(-0.2 + back + 0.25 * Math.cos(a), 1, Math.sin(a) * 1.1);
          const t = tendril(b, shape, 'stalk', new Vec3(-R * 0.15 + back * R * 0.5, R * 0.8 * hgt, Math.sin(a) * R * 0.5), dir, 2, R * 0.62, R * 0.14, R * 0.09, 'primary', gs, k * 1.1, Math.sign(a));
          tendrils.push(t);
          const tip = t.bones[1];
          b.ellipsoid(gs, tip, new Vec3(R * 0.66, 0, 0), new Vec3(R * 0.17, R * 0.17, R * 0.17), 'sclera', { flags: PF.NoPattern });
          b.feature('eye', tip, new Vec3(R * 0.8, 0, 0), new Vec3(1, 0.2, 0), 1, { style: 'bead', slot: 'eye' });
        }
        height = hover + R * 2.2;
        b.trait(`${nStalk} eye stalks`);
      } else height = hover + R;
      if (g.b('mouth')) {
        const gm = b.group('mouth', 0, { depthBias: 0.2 });
        b.ellipsoid(gm, shape, new Vec3(R * 0.72, -R * 0.52, 0), new Vec3(R * 0.26, R * 0.16, R * 0.46), 'mouth', { flags: PF.NoPattern | PF.NoShadow });
        for (let k = 0; k < 4; k++) {
          const z = (-0.3 + (0.6 * k) / 3) * R;
          b.cone(b.group('teeth', 0, { depthBias: 0.4, flags: GF.NoContour }), shape, new Vec3(R * 0.84, -R * 0.42, z), 0.5, shape, new Vec3(R * 0.88, -R * 0.56, z), 0.35, 'fang', { flags: PF.NoPattern | PF.NoShadow | PF.Thin });
        }
      }
      break;
    }
    case 'jelly': {
      const gb = b.group('bell', R * 0.3, { flags: GF.CreaseShade });
      b.ellipsoid(gb, shape, Vec3.ZERO, new Vec3(R, R * 0.78 * hgt, R), 'primary', { ...bo, clips: [{ n: new Vec3(0, -1, 0), d: R * 0.12 }], capShade: -2 });
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2;
        b.ellipsoid(gb, shape, new Vec3(Math.cos(a) * R * 0.9, -R * 0.1, Math.sin(a) * R * 0.9), new Vec3(R * 0.2, R * 0.16, R * 0.2), 'primary', { flags: PF.NoPattern });
      }
      const ga = b.group('arms', R * 0.2, { depthBias: -0.3 });
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + 0.4;
        tendrils.push(tendril(b, shape, 'hang', new Vec3(Math.cos(a) * R * 0.2, -R * 0.15, Math.sin(a) * R * 0.2), new Vec3(Math.cos(a) * 0.25, -1, Math.sin(a) * 0.25), 3, tendLenArm(R), R * 0.3, R * 0.12, 'second', ga, k * 1.7, 0, PF.NoPattern));
      }
      height = hover + R * 0.8;
      break;
    }
  }

  // tentacles under floating eyes and jellyfish
  if ((type === 'eye' || type === 'jelly') && nTent) {
    const gt = b.group('tentacles', type === 'eye' ? R * 0.12 : 0, { depthBias: -0.2 });
    for (let k = 0; k < nTent; k++) {
      const a = (k / nTent) * Math.PI * 2 + 0.3;
      const rim = type === 'jelly' ? R * 0.85 : R * 0.5;
      const thick = type === 'jelly' ? [0.5, 0.36] : [R * 0.15, R * 0.06];
      tendrils.push(tendril(b, shape, 'hang', new Vec3(Math.cos(a) * rim, type === 'jelly' ? -R * 0.12 : -R * 0.72 * hgt, Math.sin(a) * rim), new Vec3(Math.cos(a) * 0.55, -1, Math.sin(a) * 0.55), 4, tentLen / 4, thick[0], thick[1], type === 'jelly' ? 'tentacle' : 'primary', gt, k * 2.1, 0, type === 'jelly' ? PF.Thin | PF.NoPattern | PF.NoShadow : 0));
    }
    b.trait(`${nTent} tentacles`);
  }

  b.trait(type === 'eye' ? 'floating eye' : type);
  if (g.b('glow')) b.trait('glowing');
  if (g.c('pattern') !== 'none' && type !== 'wisp') b.trait(g.c('pattern'));

  const rig: BlobRig = {
    kind: 'blob', type, bones: { body, shape, eyeball, lid }, tendrils, groups: { beam },
    dims: { R, hover }, traits: { energy: g.f('energy'), bounce: g.f('bounce'), wobble: g.f('wobble') },
  };
  const animator = new BlobAnimator(rig);
  const anatomy = b.build({ height, walkSpeed: animator.clips.find((c) => c.id === 'walk')!.speed, runSpeed: animator.clips.find((c) => c.id === 'run')!.speed, length: R * 2.2 }, rig, clamp(R / 9, 0.6, 2));

  // ---- materials
  const glow = g.b('glow');
  const bodyCol = g.col('bodyColor'), second = g.col('secondColor');
  const soft: StyleName = type === 'slime' || type === 'jelly' ? 'slime' : type === 'ghost' ? 'skin' : 'hide';
  const primary: Material = glow ? { color: bodyCol, ramp: 'glow', style: type === 'ghost' ? 'skin' : 'slime', emissive: type === 'wisp' } : { color: bodyCol, ramp: type === 'ghost' ? 'cloth' : 'organic', style: soft };
  const eyeGlow = eyeStyle === 'glow';
  const bl = hexToOklch(bodyCol);
  const flameCol = oklch(Math.min(0.78, bl.l), Math.min(0.3, bl.c * 1.4 + 0.03), bl.h);
  const flameL = hexToOklch(flameCol);
  const materials: Record<string, Material> = {
    primary,
    second: { color: second, ramp: glow ? 'glow' : 'organic', style: 'slime' },
    marking: { color: g.col('markColor'), ramp: 'organic', style: soft },
    core: { color: mixHex(bodyCol, 0xffffff, 0.55), ramp: 'glow', style: 'emissive', emissive: true },
    flame: { color: flameCol, ramp: 'glow', style: 'emissive', emissive: true },
    flameTip: { color: oklch(Math.max(0.35, flameL.l - 0.12), Math.min(0.3, flameL.c * 1.3), flameL.h - 18), ramp: 'glow', style: 'emissive', emissive: true },
    eye: { color: g.col('eyeColor'), ramp: eyeGlow ? 'glow' : 'cloth', style: eyeGlow ? 'emissive' : 'glossy', emissive: eyeGlow },
    mouth: { color: 0x3a1a26, ramp: 'dark', style: 'matte' },
    sclera: { color: 0xf0ece0, ramp: 'bone', style: 'glossy' },
    iris: { color: g.col('eyeColor'), ramp: 'cloth', style: 'glossy' },
    pupil: { color: 0x141018, ramp: 'dark', style: 'glossy' },
    beam: { color: mixHex(g.col('eyeColor'), 0xffffff, 0.3), ramp: 'glow', style: 'emissive', emissive: true },
    fang: { color: 0xf0ece0, ramp: 'bone', style: 'glossy' },
    gold: { color: 0xe8b830, ramp: 'gold', style: 'metal' },
    tentacle: { color: mixHex(bodyCol, second, 0.5), ramp: glow ? 'glow' : 'organic', style: 'slime' },
  };
  const slot = (n: string) => {
    const i = anatomy.slots.indexOf(n);
    return i >= 0 ? i : anatomy.slots.push(n) - 1;
  };
  const surface: SurfaceSpec = {
    pattern: (type === 'wisp' ? 'none' : g.c('pattern')) as PatternKind, markSize: lerp(3, 6, g.f('markSize')), density: g.f('density'),
    seed: Math.floor(g.f('markSize') * 9973 + g.f('density') * 7919 + g.col('markColor')) >>> 0,
    countershade: 0, tips: 0, socks: 0, coat: [slot('primary')], markSlot: slot('marking'), bellySlot: -1, tipSlot: -1, domains: [Domain.Body],
  };
  return { anatomy, materials, surface, animator };
}

const tendLenArm = (R: number) => R * 0.45;

export const blobFamily: Family = {
  id: 'blob',
  label: 'Slimes & spirits',
  description: 'Hopping slimes with faces, cores and crowns; ghosts, flame wisps, floating eyes with eye stalks and tentacles, and jellyfish. Squash-and-stretch bodies with tendrils that hang, trail and ripple.',
  archetypes: ARCH.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    const t = { slime: ['Gloop', 'Jiggly', 'Wobbler'], ghost: ['the Restless', 'the Pale', 'the Lost'], wisp: ['Flicker', 'the Lantern', 'Glimmer'], eye: ['the Watcher', 'the Unblinking'], jelly: ['Drifter', 'the Stinger'] }[genome.archetype as BlobType] ?? [];
    if (!t.length || rng.chance(0.5)) return n;
    const s = rng.pick(t);
    return s.startsWith('the') ? `${n} ${s}` : s;
  },
};
