/**
 * Quadrupeds: wolves, dogs, foxes, cats, big cats, bears, horses, deer, boars, oxen, goats and
 * dragons. One body plan (hips, belly, chest, neck, head, tail, four legs) with paws, hooves or
 * flat bear feet; ears, horns and antlers, manes, wings and spikes; body-anchored coat patterns.
 */

import { Domain, GF, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { QuadrupedAnimator, type QAction, type QLeg, type QuadRig } from '../anim/quadruped';
import { adjust, hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { DEG, Mat3, Vec3, Xform, clamp, lerp, segmentFrame, twoBoneIK } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { Material, StyleName } from '../render/materials';
import type { PatternKind, SurfaceSpec } from '../render/surface';
import { buildHead, buildMembraneWings, buildSpikes, buildTail, tailBones, type EarKind, type HornKind, type TailKind } from './creatureParts';
import { syllableName } from './human';

type W = readonly (readonly [string, number])[];
const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const ARCH = [['wolf', 'Wolf'], ['dog', 'Dog'], ['fox', 'Fox'], ['cat', 'Cat'], ['bigcat', 'Big cat'], ['bear', 'Bear'], ['horse', 'Horse'], ['deer', 'Deer'], ['boar', 'Boar'], ['ox', 'Ox'], ['goat', 'Goat'], ['dragon', 'Dragon']] as const;
const PATTERNS = opt(['none', 'None'], ['stripes', 'Stripes'], ['spots', 'Spots'], ['rosettes', 'Rosettes'], ['saddle', 'Saddle'], ['dorsal', 'Dorsal stripe'], ['mottled', 'Mottled'], ['blotches', 'Blotches'], ['piebald', 'Piebald']);

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('size', 'Size', 0.5)
  .float('length', 'Body length', 0.5)
  .float('mass', 'Build', 0.5)
  .float('legs', 'Leg length', 0.5)
  .float('neck', 'Neck length', 0.5)
  .float('back', 'Back slope', 0.5, { help: 'Rump higher ↔ shoulders higher.' })
  .choice('feet', 'Feet', opt(['paw', 'Paws'], ['hoof', 'Hooves'], ['claw', 'Flat feet with claws']), 'paw')
  .group('head', 'Head', 'anatomy')
  .float('headSize', 'Head size', 0.5)
  .float('snout', 'Snout', 0.5)
  .float('eyeSize', 'Eye size', 0.5)
  .choice('eyeStyle', 'Eyes', opt(['round', 'Round'], ['bead', 'Beady'], ['slit', 'Slit pupils'], ['glow', 'Glowing']), 'round')
  .choice('ears', 'Ears', opt(['pointed', 'Pointed'], ['round', 'Round'], ['floppy', 'Floppy'], ['long', 'Long'], ['tufted', 'Tufted'], ['none', 'None']), 'pointed')
  .float('earSize', 'Ear size', 0.5)
  .choice('horns', 'Horns', opt(['none', 'None'], ['short', 'Short'], ['curved', 'Curved'], ['ram', 'Ram'], ['antlers', 'Antlers'], ['unicorn', 'Unicorn'], ['dragon', 'Swept back']), 'none')
  .float('hornSize', 'Horn size', 0.5)
  .bool('tusks', 'Tusks', false)
  .group('extras', 'Tail & extras', 'anatomy')
  .choice('tail', 'Tail', opt(['none', 'None'], ['thin', 'Thin'], ['bushy', 'Bushy'], ['tufted', 'Tufted'], ['stub', 'Stub'], ['hair', 'Long hair'], ['long', 'Long (reptile)'], ['spiked', 'Spiked']), 'thin')
  .float('tailLength', 'Tail length', 0.5)
  .choice('mane', 'Mane', opt(['none', 'None'], ['neck', 'Along the neck'], ['lion', 'Lion mane'], ['ruff', 'Neck ruff']), 'none')
  .bool('wings', 'Wings', false)
  .bool('spikes', 'Back spikes', false)
  .group('coat', 'Coat', 'color')
  .choice('material', 'Surface', opt(['fur', 'Fur'], ['hide', 'Hide'], ['scales', 'Scales']), 'fur')
  .color('coatColor', 'Coat', 0x8a7a6a)
  .color('bellyColor', 'Belly', 0xd8ccb8)
  .color('markColor', 'Markings', 0x3a3430)
  .color('hairColor', 'Mane & tail hair', 0x3a3028)
  .color('noseColor', 'Nose', 0x2a2228)
  .color('hornColor', 'Horns & hooves', 0xd8c8a8)
  .color('eyeColor', 'Eyes', 0xc89a3a)
  .color('wingColor', 'Wing skin', 0x6a3a3a)
  .group('pattern', 'Pattern', 'pattern')
  .choice('pattern', 'Pattern', PATTERNS, 'none')
  .float('markSize', 'Mark size', 0.5)
  .float('density', 'Density', 0.5)
  .float('countershade', 'Light belly', 0.5)
  .float('socks', 'Socks', 0)
  .float('tips', 'Tail tip', 0)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .float('weight', 'Heaviness', 0.5)
  .float('tailWag', 'Tail wag', 0.5)
  .build();

interface Prior {
  weight: number;
  size: [number, number];
  legs: number;
  len: number;
  mass: number;
  neck: number;
  neckAngle: number;
  head: number;
  snout: number;
  snoutDrop: number;
  eyeSide: number;
  feet: string;
  ears: W;
  earSize: number;
  horns?: W;
  hornSize?: number;
  tusks?: number;
  tail: W;
  tailLen: number;
  mane?: W;
  wings?: number;
  spikes?: number;
  material: string;
  coats: Hex[];
  bellies?: Hex[];
  marks?: Hex[];
  patterns: W;
  countershade: [number, number];
  socks?: number;
  tips?: number;
  eyes: Hex[];
  eyeStyle: W;
  action: QAction;
  sits: boolean;
  grazer?: boolean;
  back?: number;
}

const PRIORS: Record<string, Prior> = {
  wolf: { weight: 1.5, size: [26, 32], legs: 0.58, len: 0.85, mass: 0.42, neck: 0.32, neckAngle: 30, head: 1.0, snout: 1.35, snoutDrop: 0.05, eyeSide: 0.25, feet: 'paw', ears: [['pointed', 1]], earSize: 0.9, tail: [['bushy', 1]], tailLen: 0.5, material: 'fur', coats: [0x8a8a8a, 0x6a6058, 0x9a8a72, 0x3a3634, 0xd8d4cc, 0x7a6a5a], patterns: [['none', 3], ['saddle', 2], ['dorsal', 1]], countershade: [0.4, 0.8], eyes: [0xc8a03a, 0x8ab0c8], eyeStyle: [['round', 2], ['bead', 1]], action: 'bite', sits: true },
  dog: { weight: 1.5, size: [17, 30], legs: 0.58, len: 0.85, mass: 0.45, neck: 0.3, neckAngle: 35, head: 1.0, snout: 1.0, snoutDrop: 0.08, eyeSide: 0.2, feet: 'paw', ears: [['floppy', 2], ['pointed', 1.5], ['round', 0.3]], earSize: 0.85, tail: [['thin', 2], ['bushy', 1], ['stub', 0.4]], tailLen: 0.45, material: 'fur', coats: [0x8a5a3a, 0xc8a070, 0x2a2626, 0xe8e0d0, 0x6a4a3a, 0xa87a4a, 0x7a7068], patterns: [['none', 3], ['piebald', 2], ['saddle', 1], ['spots', 0.5]], countershade: [0, 0.6], socks: 0.3, eyes: [0x6a4a2a, 0x3a2a1a], eyeStyle: [['round', 2], ['bead', 1]], action: 'bite', sits: true },
  fox: { weight: 1, size: [15, 19], legs: 0.52, len: 0.85, mass: 0.32, neck: 0.3, neckAngle: 30, head: 1.05, snout: 1.4, snoutDrop: 0.03, eyeSide: 0.25, feet: 'paw', ears: [['pointed', 1]], earSize: 1.2, tail: [['bushy', 1]], tailLen: 0.7, material: 'fur', coats: [0xc8642a, 0xb85a2a, 0x8a8a8a, 0xe8e4dc, 0x5a4a44], bellies: [0xf0ece4], marks: [0x2a2224], patterns: [['none', 1]], countershade: [0.6, 0.9], socks: 0.6, tips: 0.6, eyes: [0xc89a2a], eyeStyle: [['slit', 2], ['round', 1]], action: 'pounce', sits: true },
  cat: { weight: 1.2, size: [12, 15], legs: 0.52, len: 0.82, mass: 0.35, neck: 0.22, neckAngle: 35, head: 1.15, snout: 0.35, snoutDrop: 0.0, eyeSide: 0.0, feet: 'paw', ears: [['pointed', 1]], earSize: 0.85, tail: [['thin', 1]], tailLen: 0.75, material: 'fur', coats: [0x8a7a6a, 0xd8904a, 0x2a2626, 0xe8e0d4, 0x7a7a80, 0xb8a080], patterns: [['stripes', 2], ['none', 1.5], ['piebald', 1.2], ['spots', 0.4]], countershade: [0.2, 0.7], socks: 0.2, eyes: [0x9ac040, 0xd0a030, 0x4a9ab0], eyeStyle: [['slit', 3], ['round', 1]], action: 'pounce', sits: true },
  bigcat: { weight: 1.2, size: [30, 38], legs: 0.55, len: 0.95, mass: 0.48, neck: 0.25, neckAngle: 25, head: 1.0, snout: 0.6, snoutDrop: 0.02, eyeSide: 0.05, feet: 'paw', ears: [['round', 1]], earSize: 0.75, tail: [['tufted', 1], ['thin', 1]], tailLen: 0.7, mane: [['none', 2], ['lion', 1]], material: 'fur', coats: [0xc8a060, 0xd8883a, 0xd8b070, 0x2a2626, 0xe8e0d4], marks: [0x2a1e1a, 0x4a3020], patterns: [['none', 1.5], ['stripes', 1.5], ['rosettes', 1.5], ['spots', 0.6]], countershade: [0.4, 0.8], eyes: [0xd0a030, 0x9ac040], eyeStyle: [['round', 2], ['slit', 1]], action: 'pounce', sits: true },
  bear: { weight: 1, size: [34, 44], legs: 0.45, len: 0.8, mass: 0.85, neck: 0.25, neckAngle: 15, head: 1.0, snout: 0.85, snoutDrop: 0.05, eyeSide: 0.15, feet: 'claw', ears: [['round', 1]], earSize: 0.8, tail: [['stub', 1]], tailLen: 0.2, material: 'fur', coats: [0x6a4a30, 0x4a3426, 0x2a2424, 0xe8e4d8, 0x8a6a4a], patterns: [['none', 1]], countershade: [0, 0.2], eyes: [0x3a2a1a], eyeStyle: [['bead', 1]], action: 'swipe', sits: true, back: 0.55 },
  horse: { weight: 1.2, size: [46, 54], legs: 0.68, len: 0.95, mass: 0.48, neck: 0.62, neckAngle: 52, head: 1.0, snout: 2.0, snoutDrop: 0.15, eyeSide: 0.9, feet: 'hoof', ears: [['pointed', 1]], earSize: 0.65, horns: [['none', 12], ['unicorn', 1]], hornSize: 1.0, tail: [['hair', 1]], tailLen: 0.6, mane: [['neck', 1]], wings: 0.05, material: 'hide', coats: [0x7a4a2a, 0x5a3420, 0x2a2224, 0xa86a3a, 0xd8d4cc, 0x9a9490, 0xc8a878], patterns: [['none', 4], ['piebald', 1], ['spots', 0.3]], countershade: [0, 0.2], socks: 0.3, eyes: [0x3a2a1a], eyeStyle: [['round', 1]], action: 'kick', sits: false, grazer: true },
  deer: { weight: 1, size: [34, 42], legs: 0.68, len: 0.85, mass: 0.32, neck: 0.5, neckAngle: 55, head: 0.95, snout: 1.4, snoutDrop: 0.1, eyeSide: 0.9, feet: 'hoof', ears: [['pointed', 1]], earSize: 1.1, horns: [['antlers', 2], ['none', 1]], hornSize: 1.0, tail: [['stub', 1]], tailLen: 0.2, material: 'fur', coats: [0xa8784a, 0x8a6a4a, 0xb88a5a], bellies: [0xf0e8d8], patterns: [['none', 3], ['spots', 1]], countershade: [0.5, 0.9], eyes: [0x2a1e1a], eyeStyle: [['round', 1]], action: 'charge', sits: false, grazer: true },
  boar: { weight: 0.8, size: [22, 28], legs: 0.42, len: 0.95, mass: 0.75, neck: 0.18, neckAngle: 10, head: 1.1, snout: 1.2, snoutDrop: 0.15, eyeSide: 0.5, feet: 'hoof', ears: [['pointed', 1]], earSize: 0.6, tusks: 0.9, tail: [['thin', 1]], tailLen: 0.25, mane: [['neck', 1]], material: 'fur', coats: [0x4a3a30, 0x5a4a3a, 0x3a3030, 0x6a5040], patterns: [['none', 2], ['dorsal', 1]], countershade: [0, 0.3], eyes: [0x2a1e1a], eyeStyle: [['bead', 1]], action: 'charge', sits: false, back: 0.65 },
  ox: { weight: 0.8, size: [40, 48], legs: 0.52, len: 1.0, mass: 0.82, neck: 0.25, neckAngle: 12, head: 1.05, snout: 1.2, snoutDrop: 0.15, eyeSide: 0.7, feet: 'hoof', ears: [['floppy', 1], ['pointed', 1]], earSize: 0.6, horns: [['curved', 3], ['short', 1], ['none', 0.5]], hornSize: 1.0, tail: [['tufted', 1]], tailLen: 0.55, material: 'hide', coats: [0x6a4a30, 0x2a2224, 0xe8e0d0, 0xa86a3a, 0x8a7a6a], patterns: [['none', 2], ['piebald', 2]], countershade: [0, 0.3], eyes: [0x2a1e1a], eyeStyle: [['round', 1]], action: 'charge', sits: false, grazer: true },
  goat: { weight: 0.8, size: [22, 28], legs: 0.56, len: 0.8, mass: 0.42, neck: 0.38, neckAngle: 45, head: 1.0, snout: 1.15, snoutDrop: 0.12, eyeSide: 0.85, feet: 'hoof', ears: [['floppy', 1], ['pointed', 1.5]], earSize: 0.7, horns: [['ram', 2], ['curved', 1.5], ['short', 1]], hornSize: 1.0, tail: [['stub', 1]], tailLen: 0.2, material: 'fur', coats: [0xe8e0d4, 0x8a7a6a, 0x5a4a3a, 0x2a2626, 0xb89a7a], patterns: [['none', 2], ['piebald', 1], ['saddle', 0.5]], countershade: [0, 0.4], eyes: [0xc8a03a], eyeStyle: [['slit', 1]], action: 'charge', sits: false, grazer: true },
  dragon: { weight: 0.8, size: [50, 68], legs: 0.48, len: 1.1, mass: 0.55, neck: 0.62, neckAngle: 42, head: 1.0, snout: 1.6, snoutDrop: 0.05, eyeSide: 0.5, feet: 'claw', ears: [['none', 2], ['pointed', 1]], earSize: 0.6, horns: [['dragon', 3], ['ram', 0.6], ['curved', 0.6]], hornSize: 1.2, tail: [['spiked', 2], ['long', 1]], tailLen: 0.9, wings: 0.85, spikes: 0.8, material: 'scales', coats: [0x8a2a2a, 0x2a6a3a, 0x2a4a7a, 0x3a3a44, 0xb8902a, 0x5a2a6a, 0xd8d4c8], patterns: [['none', 2], ['dorsal', 1], ['bands', 0.5]], countershade: [0.5, 0.9], eyes: [0xffc040, 0xff6a2a, 0x8aff6a], eyeStyle: [['slit', 3], ['glow', 1]], action: 'breath', sits: true },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.035 * amt), l.c * (1 + rng.gaussian(0, 0.12 * amt)), l.h + rng.gaussian(0, 8 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const p = PRIORS[ctx.arch] ?? PRIORS.wolf;
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), pt = ctx.rng('pattern'), m = ctx.rng('motion');
  const g = (mean: number, sd = 0.12) => clamp(a.gaussian(mean, sd), 0, 1);
  const v: Record<string, GeneValue> = {
    size: g(0.5, 0.25), length: g(0.5), mass: g(0.5), legs: g(0.5), neck: g(0.5), back: g(p.back ?? 0.5, 0.08), feet: p.feet,
    headSize: g(0.5), snout: g(0.5), eyeSize: g(0.5, 0.15), eyeStyle: pick(a, p.eyeStyle), ears: pick(a, p.ears), earSize: g(0.5),
    horns: p.horns ? pick(a, p.horns) : 'none', hornSize: g(0.5), tusks: a.chance(p.tusks ?? 0),
    tail: pick(a, p.tail), tailLength: g(0.5), mane: p.mane ? pick(a, p.mane) : 'none', wings: a.chance(p.wings ?? 0), spikes: a.chance(p.spikes ?? 0),
  };
  if (ctx.arch === 'deer' && v.horns === 'antlers' && a.chance(0.3)) v.horns = 'none';
  const coat = jitter(c, c.pick(p.coats), 0.7);
  v.material = p.material;
  v.coatColor = coat;
  const cl = hexToOklch(coat);
  v.bellyColor = p.bellies ? jitter(c, c.pick(p.bellies), 0.5) : oklch(Math.min(0.92, cl.l + 0.22), cl.c * 0.5, cl.h + 8);
  v.markColor = p.marks ? jitter(c, c.pick(p.marks), 0.5) : c.chance(0.3) ? oklch(Math.min(0.9, cl.l + 0.25), cl.c * 0.4, cl.h) : oklch(Math.max(0.15, cl.l - 0.25), cl.c * 0.8, cl.h - 10);
  v.hairColor = ctx.arch === 'bigcat' ? jitter(c, mixHex(coat, 0x3a2416, 0.45), 0.4) : jitter(c, mixHex(coat, 0x1e1814, c.range(0.3, 0.75)), 0.4);
  v.noseColor = ctx.arch === 'dragon' ? adjust(coat, -0.15) : c.pick([0x2a2228, 0x3a2a2a, 0xc87a7a, 0x1e1a1e]);
  v.hornColor = ctx.arch === 'deer' ? 0x8a6a4a : ctx.arch === 'dragon' ? c.pick([0xe8dcc0, 0x3a3434, 0xd8c070]) : c.pick([0xd8c8a8, 0x4a4040, 0xe8dcc4]);
  v.eyeColor = c.pick(p.eyes);
  v.wingColor = jitter(c, mixHex(coat, 0x2a1a2a, 0.3), 0.6);
  v.pattern = pick(pt, p.patterns);
  v.markSize = clamp(pt.gaussian(0.5, 0.15), 0, 1);
  v.density = clamp(pt.gaussian(0.5, 0.18), 0, 1);
  v.countershade = clamp(pt.range(...p.countershade), 0, 1);
  v.socks = pt.chance(p.socks ?? 0) ? clamp(pt.range(0.3, 0.9), 0, 1) : 0;
  v.tips = pt.chance(p.tips ?? 0.15) ? clamp(pt.range(0.3, 0.9), 0, 1) : 0;
  v.energy = clamp(m.gaussian(['cat', 'fox', 'dog'].includes(ctx.arch) ? 0.65 : ['bear', 'ox'].includes(ctx.arch) ? 0.3 : 0.5, 0.15), 0, 1);
  v.weight = clamp(m.gaussian(['bear', 'ox', 'boar', 'dragon'].includes(ctx.arch) ? 0.75 : 0.4, 0.12), 0, 1);
  v.tailWag = clamp(m.gaussian(ctx.arch === 'dog' ? 0.8 : 0.4, 0.15), 0, 1);
  return v;
}

const LEG_SHAPES = {
  paw: { front: [0.42, 0.38, 0.2], hind: [0.38, 0.36, 0.26], metaF: 0.3, metaH: 0.62 },
  hoof: { front: [0.33, 0.35, 0.32], hind: [0.32, 0.33, 0.35], metaF: 0.12, metaH: 0.32 },
  claw: { front: [0.46, 0.42, 0.14], hind: [0.46, 0.42, 0.16], metaF: 1.25, metaH: 1.3 },
} as const;

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const arch = genome.archetype;
  const p = PRIORS[arch] ?? PRIORS.wolf;
  const b = new AnatomyBuilder(scale);
  const S = lerp(p.size[0], p.size[1], g.f('size')) * scale;
  const R = S * lerp(0.15, 0.24, g.f('mass')) * lerp(0.75, 1.3, p.mass);
  const legLen = S * p.legs * lerp(0.85, 1.18, g.f('legs'));
  const shoulderY = legLen;
  const hipY = legLen * lerp(1.06, 0.9, g.f('back'));
  const BL = S * p.len * lerp(0.85, 1.18, g.f('length'));
  const feet = g.c('feet') as keyof typeof LEG_SHAPES;
  const shape = LEG_SHAPES[feet] ?? LEG_SHAPES.paw;

  // ---- skeleton
  const root = b.bone('root', -1, Xform.I);
  const pelvis = b.bone('pelvis', root, Xform.at(-BL / 2, hipY, 0));
  const spine = b.bone('spine', pelvis, Xform.at(BL / 2, (shoulderY - hipY) / 2, 0));
  const chest = b.bone('chest', spine, Xform.at(BL / 2, (shoulderY - hipY) / 2, 0));
  const neckLen = S * p.neck * lerp(0.75, 1.3, g.f('neck'));
  const na = p.neckAngle * DEG;
  const neck0 = b.bone('neck0', chest, Xform.at(R * 0.75, R * 0.7, 0, Mat3.rotZ(na)));
  const neck1 = b.bone('neck1', neck0, Xform.at(neckLen / 2, 0, 0));
  const skullR = S * 0.12 * p.head * lerp(0.82, 1.2, g.f('headSize'));
  const body = b.group('body', R * 0.45, { flags: GF.CreaseShade });
  const bo = { domain: Domain.Body, domainLen: BL + R * 2 };
  b.ellipsoid(body, pelvis, new Vec3(-R * 0.05, R * 0.38, 0), new Vec3(R * 0.95, R * 0.86, R * 0.82), 'primary', { ...bo, u0: 0, u1: 0.35 });
  b.ellipsoid(body, spine, new Vec3(0, R * 0.22, 0), new Vec3(BL * 0.45, R * 0.82, R * 0.84), 'primary', { ...bo, u0: 0.25, u1: 0.75 });
  b.ellipsoid(body, chest, new Vec3(R * 0.12, R * 0.3, 0), new Vec3(R * 1.08, R * 1.02, R * 0.86), 'primary', { ...bo, u0: 0.65, u1: 1 });
  const neckR = Math.max(1, R * (arch === 'horse' || arch === 'deer' ? 0.48 : 0.6));
  b.cone(body, chest, new Vec3(R * 0.6, R * 0.55, 0), neckR * 1.25, neck1, Vec3.ZERO, neckR, 'primary', { domain: Domain.Neck, domainLen: neckLen });

  // ---- head
  const headGroup = b.group('head', skullR * 0.35);
  const head = buildHead(b, {
    parent: neck1, at: new Vec3(neckLen / 2, 0, 0), rot: Mat3.rotZ(-na - (arch === 'horse' || arch === 'deer' ? 0.65 : 0.25)),
    skullR, width: arch === 'bear' || arch === 'bigcat' ? 1.1 : 1, snoutLen: skullR * p.snout * lerp(0.7, 1.35, g.f('snout')), snoutR: skullR * (arch === 'horse' ? 0.5 : 0.58),
    snoutDrop: skullR * p.snoutDrop * 3, eyeSide: p.eyeSide, eyeSize: Math.max(1, skullR * 0.26 * lerp(0.8, 1.3, g.f('eyeSize'))), eyeStyle: g.c('eyeStyle'),
    ears: g.c('ears') as EarKind, earSize: lerp(0.7, 1.35, g.f('earSize')) * p.earSize, horns: g.c('horns') as HornKind, hornSize: lerp(0.7, 1.4, g.f('hornSize')) * (p.hornSize ?? 1),
    tusks: g.b('tusks'), slot: 'primary', group: headGroup,
  });
  b.cone(headGroup, neck1, new Vec3(neckLen * 0.3, 0, 0), neckR, head.head, new Vec3(skullR * 0.4, -skullR * 0.1, 0), Math.max(0.8, neckR * 0.8), 'primary', { domain: Domain.Neck, domainLen: neckLen });

  // ---- mane
  const mane = g.c('mane');
  if (mane !== 'none') {
    const gm = b.group('mane', skullR * 0.3, { depthBias: 0.05 });
    const ho = { flags: PF.NoPattern };
    if (mane === 'neck') {
      b.ellipsoid(gm, neck0, new Vec3(neckLen * 0.25, neckR * 0.85, 0), new Vec3(neckLen * 0.35, neckR * 0.45, neckR * 0.35), 'hair', ho);
      b.ellipsoid(gm, neck1, new Vec3(neckLen * 0.2, neckR * 0.8, 0), new Vec3(neckLen * 0.32, neckR * 0.42, neckR * 0.32), 'hair', ho);
      b.ellipsoid(gm, head.head, new Vec3(skullR * 0.9, skullR * 0.95, 0), new Vec3(skullR * 0.35, skullR * 0.25, skullR * 0.25), 'hair', ho);
    } else if (mane === 'lion') {
      b.ellipsoid(gm, neck1, new Vec3(neckLen * 0.1, neckR * 0.2, 0), new Vec3(skullR * 1.25, skullR * 1.55, skullR * 1.45), 'hair', ho);
      b.ellipsoid(gm, neck0, new Vec3(0, neckR * 0.4, 0), new Vec3(skullR * 1.1, skullR * 1.2, skullR * 1.2), 'hair', ho);
    } else {
      b.ellipsoid(gm, neck0, new Vec3(neckLen * 0.35, 0, 0), new Vec3(neckLen * 0.45, neckR * 1.35, neckR * 1.35), 'belly', ho);
    }
  }

  // ---- legs
  const legs: QLeg[] = [];
  const pw = b.restWorld(pelvis), cw = b.restWorld(chest);
  for (const front of [true, false]) {
    for (const side of [-1, 1]) {
      const anchor = front ? chest : pelvis;
      const hip = front ? new Vec3(R * 0.2, -R * 0.22, side * R * 0.55) : new Vec3(0, -R * 0.12, side * R * 0.52);
      const hipW = (front ? cw : pw).point(hip);
      const ratios = front ? shape.front : shape.hind;
      const total = hipW.y * 1.05;
      const len: [number, number, number] = [total * ratios[0], total * ratios[1], total * ratios[2]];
      const meta = front ? shape.metaF : shape.metaH;
      const toe = new Vec3(hipW.x + len[2] * Math.sin(meta) * (front ? 0.85 : 0.55), 0, side * R * 0.58);
      const metaDir = new Vec3(-Math.sin(meta), Math.cos(meta), 0);
      const ankle = toe.addScaled(metaDir, len[2]);
      const pole = front ? new Vec3(-1, 0, 0) : new Vec3(1, 0, 0);
      const { mid, end } = twoBoneIK(hipW, ankle, len[0], len[1], pole);
      const n = (front ? 'F' : 'H') + (side < 0 ? 'L' : 'R');
      const upper = b.boneAt('leg' + n + '0', anchor, segmentFrame(hipW, mid, pole));
      const lower = b.boneAt('leg' + n + '1', upper, segmentFrame(mid, end, pole));
      const footB = b.boneAt('leg' + n + '2', lower, segmentFrame(end, toe, Vec3.X));
      const gl = b.group('leg' + n, R * 0.15, { side });
      const lo = { side, domain: Domain.Limb, domainLen: hipW.y };
      const r0 = R * (front ? 0.36 : 0.42) * lerp(0.85, 1.15, g.f('mass'));
      const r1 = Math.max(0.7, r0 * (feet === 'hoof' ? 0.42 : 0.55));
      const r2 = Math.max(0.6, r1 * 0.8);
      // muscle at the top (shoulder blade / haunch), blended with the body
      b.ellipsoid(body, anchor, hip.add(new Vec3(front ? R * 0.05 : -R * 0.08, R * 0.25, side * R * 0.05)), new Vec3(R * (front ? 0.5 : 0.62), R * 0.7, R * 0.42), 'primary', { ...bo, side });
      b.cone(gl, upper, Vec3.ZERO, r0, lower, Vec3.ZERO, r1, 'primary', { ...lo, u0: 0, u1: 0.45 });
      b.cone(gl, lower, Vec3.ZERO, r1, footB, Vec3.ZERO, r2 * 0.9, 'primary', { ...lo, u0: 0.45, u1: 0.8 });
      b.cone(gl, footB, Vec3.ZERO, r2 * 0.9, footB, new Vec3(len[2], 0, 0), r2 * 0.8, 'primary', { ...lo, u0: 0.8, u1: 1 });
      // what touches the ground
      if (feet === 'hoof') b.ellipsoid(gl, footB, new Vec3(len[2] + r2 * 0.1, 0, 0), new Vec3(r2 * 1.0, r2 * 1.15, r2 * 1.1), 'hoof', { ...lo, flags: PF.NoPattern | PF.ShadowCaster });
      else if (feet === 'claw') b.ellipsoid(gl, footB, new Vec3(len[2] * 0.5, -r2 * 0.4, 0), new Vec3(len[2] * 0.75, r2 * 0.55, r2 * 1.1), 'primary', { ...lo, u0: 0.9, u1: 1, flags: PF.ShadowCaster });
      else b.ellipsoid(gl, footB, new Vec3(len[2] + r2 * 0.3, -r2 * 0.1, 0), new Vec3(r2 * 1.25, r2 * 0.8, r2 * 1.05), 'primary', { ...lo, u0: 0.95, u1: 1, flags: PF.ShadowCaster });
      legs.push({ side, front, anchor, hip, bones: [upper, lower, footB], len, restToe: toe, meta });
    }
  }

  // ---- tail
  const tailKind = g.c('tail') as TailKind;
  const tailLen = S * p.tailLen * lerp(0.6, 1.4, g.f('tailLength')) * (tailKind === 'stub' ? 0.3 : 1);
  const tailCount = tailKind === 'long' || tailKind === 'spiked' ? 6 : tailKind === 'stub' ? 1 : 4;
  const tailPitch = { thin: arch === 'cat' ? 0.5 : 0.1, bushy: -0.45, tufted: -0.75, stub: 0.6, hair: -0.6, long: -0.15, spiked: -0.1, none: 0, fan: 0 }[tailKind] ?? 0;
  const tail = tailKind === 'none' ? [] : tailBones(b, pelvis, new Vec3(-R * 0.9, R * 0.62, 0), tailCount, tailLen / tailCount, tailPitch, tailKind === 'thin' && arch === 'cat' ? 0.12 : tailKind === 'long' || tailKind === 'spiked' ? 0.04 : -0.1);
  buildTail(b, tail, tailKind, Math.max(0.8, R * (tailKind === 'long' || tailKind === 'spiked' ? 0.45 : tailKind === 'bushy' ? 0.28 : 0.18)), tailLen / tailCount, 'primary');

  // ---- wings & spikes
  let wings: number[][] = [];
  if (g.b('wings')) {
    wings = buildMembraneWings(b, chest, new Vec3(-R * 0.15, R * 1.05, R * 0.45), S * 1.5, { bone: spine, p: new Vec3(-BL * 0.15, R * 0.85, R * 0.5) }, { bone: 'primary', membrane: 'membrane' });
    b.trait('wings');
  }
  if (g.b('spikes')) {
    const pts: { bone: number; p: Vec3; size: number }[] = [];
    pts.push({ bone: neck0, p: new Vec3(neckLen * 0.3, neckR * 0.9, 0), size: R * 0.35 }, { bone: neck1, p: new Vec3(neckLen * 0.1, neckR * 0.85, 0), size: R * 0.3 });
    for (const [bone, x] of [[chest, 0], [spine, BL * 0.15], [spine, -BL * 0.2], [pelvis, 0]] as const) pts.push({ bone, p: new Vec3(x, R * 1.1, 0), size: R * 0.45 });
    buildSpikes(b, pts, 'horn');
    b.trait('spikes');
  }

  for (const t of [arch, `${feet}s`.replace('claws', 'claws'), tailKind !== 'none' ? `${tailKind} tail` : '', g.c('horns') !== 'none' ? g.c('horns') : '', mane !== 'none' ? `${mane} mane` : '', g.c('pattern') !== 'none' ? g.c('pattern') : ''])
    if (t) b.trait(t);

  const rig: QuadRig = {
    kind: 'quad',
    bones: { root, pelvis, spine, chest, neck: [neck0, neck1], head: head.head, jaw: head.jaw, tail, ears: head.ears, wings },
    legs,
    dims: { S, hipY, shoulderY, BL, R, legLen },
    traits: { energy: g.f('energy'), weight: g.f('weight'), bounce: 0.5, sits: p.sits, grazer: !!p.grazer, action: p.action, hooved: feet === 'hoof', tailWag: g.f('tailWag') },
  };
  const animator = new QuadrupedAnimator(rig);
  const height = shoulderY + R * 1.4 + neckLen * Math.sin(na) * 0.8 + skullR;
  const anatomy = b.build({ height, walkSpeed: animator.clips.find((c) => c.id === 'walk')!.speed, runSpeed: animator.clips.find((c) => c.id === 'run')!.speed, length: BL + R * 2 + skullR * 3 }, rig, clamp(S / 30, 0.6, 2));

  // ---- materials & patterns
  const mat = g.c('material');
  const style: StyleName = mat === 'scales' ? 'scales' : mat === 'hide' ? 'hide' : 'fur';
  const organic = (c: Hex, st: StyleName = style): Material => ({ color: c, ramp: 'organic', style: st });
  const materials: Record<string, Material> = {
    primary: organic(g.col('coatColor')),
    belly: organic(g.col('bellyColor')),
    marking: organic(g.col('markColor')),
    hair: { color: g.col('hairColor'), ramp: 'hair', style: 'hair' },
    nose: { color: g.col('noseColor'), ramp: 'dark', style: 'glossy' },
    hoof: { color: mixHex(g.col('hornColor'), 0x2a2420, 0.6), ramp: 'bone', style: 'glossy' },
    horn: { color: g.col('hornColor'), ramp: 'bone', style: 'glossy' },
    eye: { color: g.col('eyeColor'), ramp: g.c('eyeStyle') === 'glow' ? 'glow' : 'cloth', style: g.c('eyeStyle') === 'glow' ? 'emissive' : 'glossy', emissive: g.c('eyeStyle') === 'glow' },
    mouth: { color: 0x5a1e24, ramp: 'dark', style: 'matte' },
    membrane: { color: g.col('wingColor'), ramp: 'organic', style: 'membrane' },
  };
  const slot = (n: string) => anatomy.slots.indexOf(n);
  const surface: SurfaceSpec = {
    pattern: g.c('pattern') as PatternKind, markSize: lerp(2.5, 6, g.f('markSize')), density: g.f('density'), seed: genomeSeed(g),
    countershade: g.f('countershade'), tips: g.f('tips'), socks: g.f('socks'),
    coat: [slot('primary')], markSlot: slot('marking'), bellySlot: slot('belly') >= 0 ? slot('belly') : anatomy.slots.push('belly') - 1, tipSlot: slot('marking'),
    domains: [Domain.Body, Domain.Neck, Domain.Tail, Domain.Limb, Domain.Head],
  };
  if (surface.markSlot < 0) surface.markSlot = anatomy.slots.push('marking') - 1;
  surface.tipSlot = surface.markSlot;
  return { anatomy, materials, surface, animator };
}

/** A stable per-creature seed for patterns, from the pattern genes. */
function genomeSeed(g: Genes): number {
  return Math.floor(g.f('markSize') * 9973 + g.f('density') * 7919 + g.col('markColor')) >>> 0;
}

export const quadrupedFamily: Family = {
  id: 'quadruped',
  label: 'Four-legged beasts',
  description: 'Wolves, dogs, foxes, cats, big cats, bears, horses, deer, boars, oxen, goats and dragons: paws, hooves or flat feet, horns and antlers, manes, wings, coat patterns, with walk, trot, gallop, pounce, howl, sit, sleep and more.',
  archetypes: ARCH.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    return genome.archetype === 'dragon' && rng.chance(0.6) ? `${n} the ${rng.pick(['Red', 'Ancient', 'Dread', 'Golden', 'Storm'])}` : n;
  },
};
