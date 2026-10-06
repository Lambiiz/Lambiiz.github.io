/**
 * Birds and bats: songbirds, crows, owls, birds of prey, parrots, chickens and bats. Feathered
 * bodies with beaks, crests, combs, owl faces and fanned tails; wings that fold against the body
 * or spread into jointed wings with fanned flight feathers; bats with membrane wings and big ears.
 */

import { Domain, GF, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { FlyerAnimator, type FlyerLeg, type FlyerRig } from '../anim/flyer';
import { hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { Mat3, PI, Vec3, Xform, clamp, lerp, segmentFrame, twoBoneIK } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { Material } from '../render/materials';
import type { PatternKind, SurfaceSpec } from '../render/surface';
import { syllableName } from './human';

type W = readonly (readonly [string, number])[];
const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const ARCH = [['songbird', 'Songbird'], ['crow', 'Crow'], ['owl', 'Owl'], ['raptor', 'Bird of prey'], ['parrot', 'Parrot'], ['chicken', 'Chicken'], ['bat', 'Bat']] as const;

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('size', 'Size', 0.5)
  .float('mass', 'Plumpness', 0.5)
  .float('legs', 'Leg length', 0.5)
  .float('neck', 'Neck length', 0.5)
  .float('tail', 'Tail length', 0.5)
  .float('wingspan', 'Wingspan', 0.5)
  .float('posture', 'Posture', 0.5, { help: 'Leaning forward ↔ upright.' })
  .group('head', 'Head', 'anatomy')
  .float('headSize', 'Head size', 0.5)
  .float('beak', 'Beak length', 0.5)
  .choice('beakShape', 'Beak', opt(['straight', 'Straight'], ['conical', 'Short and thick'], ['hooked', 'Hooked']), 'straight')
  .float('eyeSize', 'Eye size', 0.5)
  .choice('eyeStyle', 'Eyes', opt(['bead', 'Beady'], ['round', 'Round'], ['slit', 'Big round (owl)'], ['glow', 'Glowing']), 'bead')
  .choice('crest', 'Crest', opt(['none', 'None'], ['tuft', 'Tuft'], ['plume', 'Plume'], ['comb', 'Comb & wattle']), 'none')
  .bool('earTufts', 'Ear tufts', false)
  .bool('faceDisc', 'Facial disc', false)
  .float('ears', 'Bat ears', 0.5)
  .group('colors', 'Plumage', 'color')
  .color('bodyColor', 'Body', 0x8a6a4a)
  .color('headColor', 'Head', 0x8a6a4a)
  .color('bellyColor', 'Breast', 0xd8c8a8)
  .color('wingColor', 'Wing coverts', 0x7a5a3a)
  .color('flightColor', 'Flight feathers', 0x4a3a2a)
  .color('tailColor', 'Tail', 0x5a4a3a)
  .color('beakColor', 'Beak', 0x3a3438)
  .color('feetColor', 'Feet', 0x8a6a6a)
  .color('eyeColor', 'Eyes', 0x1e1a1e)
  .color('crestColor', 'Crest & comb', 0xc82a2a)
  .group('pattern', 'Pattern', 'pattern')
  .choice('pattern', 'Pattern', opt(['none', 'None'], ['spots', 'Spots'], ['mottled', 'Mottled'], ['stripes', 'Bars'], ['blotches', 'Patches']), 'none')
  .color('markColor', 'Markings', 0x3a2a1e)
  .float('markSize', 'Mark size', 0.5)
  .float('density', 'Density', 0.5)
  .float('countershade', 'Light breast', 0.6)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .float('bob', 'Head bob', 0.5)
  .build();

interface Prior {
  weight: number;
  size: [number, number];
  head: number;
  neck: number;
  neckAngle: number;
  legs: number;
  tail: number;
  tailFeathers: number;
  tailAngle: number;
  wing: number;
  chord: number;
  beak: number;
  beakShape: W;
  tilt: number;
  hopper: boolean;
  ground?: boolean;
  attack: 'peck' | 'talons' | 'bite';
  call: string;
  eyes: W;
  eyeSize: number;
  crest?: W;
  owl?: boolean;
  /** Body, head, breast, coverts, flight, tail colours as alternatives. */
  palettes: Hex[][];
  beaks: Hex[];
  feet: Hex[];
  eyeColors: Hex[];
  crests?: Hex[];
  patterns: W;
  countershade: [number, number];
}

const PRIORS: Record<string, Prior> = {
  songbird: {
    weight: 1.3, size: [8, 11], head: 0.36, neck: 0.12, neckAngle: 1.0, legs: 0.45, tail: 0.6, tailFeathers: 3, tailAngle: 0.15, wing: 1.15, chord: 0.36, beak: 0.5, beakShape: [['conical', 2], ['straight', 1]],
    tilt: 0.55, hopper: true, attack: 'peck', call: 'Sing', eyes: [['bead', 1]], eyeSize: 1,
    crest: [['none', 6], ['tuft', 1]],
    palettes: [[0x8a6a4a, 0x7a5a3a, 0xd8c8a8, 0x8a6a4a, 0x4a3a2a, 0x5a4a3a], [0x6a6a6a, 0x5a5a5a, 0xe8784a, 0x6a6a6a, 0x3a3a3a, 0x4a4a4a], [0x4a7ac8, 0x3a5aa8, 0xe8d84a, 0x4a7ac8, 0x2a3a6a, 0x3a4a7a], [0xc82a2a, 0xc82a2a, 0xb8302a, 0xa82a2a, 0x6a2a2a, 0x8a2a2a], [0xe8c83a, 0x2a2628, 0xe8d04a, 0x2a2628, 0x2a2628, 0x2a2628], [0x8a9a5a, 0x7a8a4a, 0xd8d8a8, 0x7a8a4a, 0x4a5a3a, 0x5a6a3a]],
    beaks: [0x3a3438, 0xe8a03a, 0x8a7a6a], feet: [0x8a6a6a, 0x5a4a4a], eyeColors: [0x1e1a1e], crests: [0xc82a2a, 0x3a5aa8], patterns: [['none', 3], ['stripes', 1], ['spots', 0.7]], countershade: [0.5, 0.9],
  },
  crow: {
    weight: 1.1, size: [12, 15], head: 0.32, neck: 0.15, neckAngle: 0.9, legs: 0.55, tail: 0.75, tailFeathers: 3, tailAngle: 0.05, wing: 1.4, chord: 0.36, beak: 1.0, beakShape: [['straight', 1]],
    tilt: 0.42, hopper: false, attack: 'peck', call: 'Caw', eyes: [['bead', 1]], eyeSize: 0.9,
    palettes: [[0x2a2830, 0x2a2830, 0x2a2830, 0x2a2830, 0x1e1c24, 0x1e1c24], [0x2a2830, 0x2a2830, 0xe8e8e8, 0x2a2830, 0x2a3a5a, 0x2a3048], [0x8a8a98, 0x2a2830, 0x9a9aa8, 0x2a2830, 0x1e1c24, 0x1e1c24], [0x8a9ab8, 0x8a9ab8, 0xc8c8d0, 0x4a6ac8, 0x2a3a6a, 0x3a4a7a]],
    beaks: [0x1e1c22], feet: [0x1e1c22], eyeColors: [0x1e1a1e], patterns: [['none', 1]], countershade: [0, 0.3],
  },
  owl: {
    weight: 1, size: [12, 16], head: 0.5, neck: 0.04, neckAngle: 1.45, legs: 0.42, tail: 0.32, tailFeathers: 3, tailAngle: -0.1, wing: 1.3, chord: 0.42, beak: 0.32, beakShape: [['hooked', 1]],
    tilt: 1.15, hopper: false, attack: 'talons', call: 'Hoot', eyes: [['slit', 1]], eyeSize: 2.2, owl: true,
    palettes: [[0x8a6a4a, 0x8a6a4a, 0xc8b090, 0x7a5a3a, 0x5a4030, 0x6a5038], [0xa87a4a, 0xa87a4a, 0xd8c098, 0x9a6a3a, 0x6a4a2a, 0x7a5a3a], [0x8a8480, 0x8a8480, 0xc8c4c0, 0x7a7470, 0x5a5450, 0x6a6460], [0xe8e4dc, 0xe8e4dc, 0xf0ece4, 0xe0dcd4, 0xd0ccc4, 0xd8d4cc], [0xc8a070, 0xe8dcc8, 0xf0e8d8, 0xc8a070, 0xa88050, 0xb89060]],
    beaks: [0x6a5a4a, 0x3a3438], feet: [0x5a4a40], eyeColors: [0xe8b82a, 0xe8b82a, 0xe87a2a], patterns: [['mottled', 2], ['spots', 1], ['stripes', 1], ['none', 1]], countershade: [0.3, 0.7],
  },
  raptor: {
    weight: 1, size: [14, 18], head: 0.34, neck: 0.14, neckAngle: 0.95, legs: 0.52, tail: 0.65, tailFeathers: 4, tailAngle: 0.0, wing: 1.75, chord: 0.42, beak: 0.55, beakShape: [['hooked', 1]],
    tilt: 0.75, hopper: false, attack: 'talons', call: 'Screech', eyes: [['round', 1], ['bead', 1]], eyeSize: 1.1,
    palettes: [[0x5a3a26, 0xf0ece4, 0x5a3a26, 0x5a3a26, 0x3a2a1e, 0xf0ece4], [0x7a5a3a, 0x7a5a3a, 0xe8dcc0, 0x6a4a30, 0x3a2a1e, 0xa85a3a], [0x5a6a7a, 0x3a3a44, 0xe0dcd0, 0x5a6a7a, 0x2a3038, 0x4a5462], [0x6a4a30, 0x9a7a4a, 0x6a4a30, 0x5a4028, 0x3a2a1e, 0x5a4028]],
    beaks: [0xe8c03a, 0x3a3438], feet: [0xe8c03a], eyeColors: [0xe8b82a, 0x3a2a1a], patterns: [['none', 2], ['stripes', 1], ['spots', 1]], countershade: [0.3, 0.8],
  },
  parrot: {
    weight: 1, size: [11, 15], head: 0.4, neck: 0.1, neckAngle: 1.2, legs: 0.38, tail: 1.15, tailFeathers: 3, tailAngle: -0.05, wing: 1.25, chord: 0.36, beak: 0.55, beakShape: [['hooked', 1]],
    tilt: 0.95, hopper: true, attack: 'peck', call: 'Squawk', eyes: [['round', 1]], eyeSize: 1.1,
    crest: [['none', 4], ['plume', 1.2]],
    palettes: [[0x3aa84a, 0x3aa84a, 0x8ad84a, 0x3aa84a, 0x2a5ac8, 0xc83a3a], [0xc82a2a, 0xc82a2a, 0xc82a2a, 0xe8c83a, 0x2a5ac8, 0xc82a2a], [0x2a7ad8, 0x3aa84a, 0xe8c83a, 0x2a7ad8, 0x2a4aa8, 0x2a7ad8], [0xe8e8e0, 0xe8e8e0, 0xe8e8e0, 0xe8e8e0, 0xd8d8d0, 0xe8e8e0], [0x8a8a90, 0x9a9aa0, 0x8a8a90, 0x7a7a80, 0x5a5a60, 0xc82a2a]],
    beaks: [0x2a2628, 0xe0d8c8, 0x5a5050], feet: [0x5a5050, 0x8a7a7a], eyeColors: [0xe8e0c8], crests: [0xe8c83a, 0xe85a3a], patterns: [['none', 1]], countershade: [0, 0.3],
  },
  chicken: {
    weight: 0.9, size: [12, 16], head: 0.3, neck: 0.32, neckAngle: 1.2, legs: 0.62, tail: 0.75, tailFeathers: 3, tailAngle: 1.05, wing: 0.95, chord: 0.38, beak: 0.42, beakShape: [['conical', 1]],
    tilt: 0.22, hopper: false, ground: true, attack: 'peck', call: 'Crow', eyes: [['bead', 1]], eyeSize: 0.9,
    crest: [['comb', 1]],
    palettes: [[0xe8e4dc, 0xe8e4dc, 0xe8e4dc, 0xe0dcd4, 0xd8d4cc, 0xe8e4dc], [0xa8683a, 0xc8803a, 0xa8683a, 0x8a4a2a, 0x5a3a2a, 0x2a2628], [0x2a2628, 0x2a2628, 0x2a2628, 0x2a2628, 0x1e1c22, 0x2a3048], [0xc89a6a, 0xc89a6a, 0xd8b080, 0xb8885a, 0x8a6040, 0x8a6040]],
    beaks: [0xe8c03a, 0xd8b070], feet: [0xe8c03a, 0xd8b070], eyeColors: [0xc8802a], crests: [0xd82a2a], patterns: [['none', 3], ['spots', 1], ['mottled', 0.6]], countershade: [0, 0.3],
  },
  bat: {
    weight: 1, size: [9, 13], head: 0.52, neck: 0.05, neckAngle: 0.6, legs: 0.3, tail: 0, tailFeathers: 0, tailAngle: 0, wing: 1.8, chord: 0.5, beak: 0.25, beakShape: [['straight', 1]],
    tilt: 0, hopper: false, attack: 'bite', call: 'Screech', eyes: [['bead', 2], ['glow', 1]], eyeSize: 1,
    palettes: [[0x5a4a40, 0x5a4a40, 0x6a5a4a, 0x3a2a30, 0x3a2a30, 0x3a2a30], [0x3a3638, 0x3a3638, 0x4a4648, 0x2a2228, 0x2a2228, 0x2a2228], [0x7a5a3a, 0x7a5a3a, 0x8a6a4a, 0x4a3030, 0x4a3030, 0x4a3030], [0xd8d4cc, 0xd8d4cc, 0xe8e4dc, 0xc8b8b8, 0xc8b8b8, 0xc8b8b8]],
    beaks: [0x3a2a30], feet: [0x3a2a30], eyeColors: [0x1e1a1e, 0xff3a3a], patterns: [['none', 1]], countershade: [0.2, 0.5],
  },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.03 * amt), l.c * (1 + rng.gaussian(0, 0.1 * amt)), l.h + rng.gaussian(0, 6 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const p = PRIORS[ctx.arch] ?? PRIORS.songbird;
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), pt = ctx.rng('pattern'), m = ctx.rng('motion');
  const g = (mean: number, sd = 0.12) => clamp(a.gaussian(mean, sd), 0, 1);
  const v: Record<string, GeneValue> = {
    size: g(0.5, 0.25), mass: g(0.5), legs: g(0.5), neck: g(0.5), tail: g(0.5), wingspan: g(0.5), posture: g(0.5, 0.1),
    headSize: g(0.5), beak: g(0.5), beakShape: pick(a, p.beakShape), eyeSize: g(0.5, 0.15), eyeStyle: pick(a, p.eyes),
    crest: p.crest ? pick(a, p.crest) : 'none', earTufts: !!p.owl && a.chance(0.5), faceDisc: !!p.owl, ears: g(0.5),
  };
  const pal = c.pick(p.palettes).map((x) => jitter(c, x, 0.6));
  [v.bodyColor, v.headColor, v.bellyColor, v.wingColor, v.flightColor, v.tailColor] = pal;
  v.beakColor = c.pick(p.beaks);
  v.feetColor = c.pick(p.feet);
  v.eyeColor = c.pick(p.eyeColors);
  v.crestColor = p.crests ? c.pick(p.crests) : 0xc82a2a;
  const bl = hexToOklch(pal[0]);
  v.markColor = oklch(clamp(bl.l - 0.2, 0.15, 0.9), bl.c * 0.9, bl.h);
  v.pattern = pick(pt, p.patterns);
  v.markSize = clamp(pt.gaussian(0.4, 0.15), 0, 1);
  v.density = clamp(pt.gaussian(0.5, 0.18), 0, 1);
  v.countershade = clamp(pt.range(...p.countershade), 0, 1);
  v.energy = clamp(m.gaussian(ctx.arch === 'songbird' || ctx.arch === 'bat' ? 0.65 : 0.45, 0.15), 0, 1);
  v.bob = clamp(m.gaussian(ctx.arch === 'chicken' || ctx.arch === 'crow' ? 0.8 : 0.4, 0.12), 0, 1);
  return v;
}

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const arch = genome.archetype;
  const p = PRIORS[arch] ?? PRIORS.songbird;
  const bat = arch === 'bat';
  const b = new AnatomyBuilder(scale);
  const S = lerp(p.size[0], p.size[1], g.f('size')) * scale;
  const mass = lerp(0.85, 1.2, g.f('mass'));
  const bl = S * (bat ? 0.8 : 1), bh = S * 0.6 * mass * (bat ? 1.1 : 1), bw = S * 0.56 * mass * (bat ? 1.05 : 1);
  const hr = S * p.head * 0.5 * lerp(0.85, 1.2, g.f('headSize'));
  const neckLen = Math.max(0.5, S * p.neck * lerp(0.7, 1.35, g.f('neck')));
  const legLen = S * p.legs * lerp(0.8, 1.25, g.f('legs'));
  const tl = S * p.tail * lerp(0.7, 1.4, g.f('tail'));
  const Wsp = S * p.wing * lerp(0.85, 1.2, g.f('wingspan'));
  const tilt = p.tilt + (g.f('posture') - 0.5) * 0.4;

  // ---- skeleton (body level in the rest pose)
  const root = b.bone('root', -1, Xform.I);
  const body = b.bone('body', root, Xform.at(0, legLen + bh * 0.5, 0));
  const neck = b.bone('neck', body, Xform.at(bl * (bat ? 0.4 : 0.36), bh * 0.18, 0, Mat3.rotZ(p.neckAngle)));
  const neckEnd = b.restWorld(neck).point(new Vec3(neckLen, 0, 0));
  const head = b.boneAt('head', neck, Xform.at(neckEnd.x, neckEnd.y, 0));
  const jaw = b.bone('jaw', head, Xform.at(hr * 0.78, -hr * 0.22, 0));

  const bodyG = b.group('body', bh * 0.3, { flags: GF.CreaseShade });
  const bo = { domain: Domain.Body, domainLen: bl };
  b.ellipsoid(bodyG, body, Vec3.ZERO, new Vec3(bl * 0.5, bh * 0.5, bw * 0.5), 'primary', { ...bo, u0: 0, u1: 1 });
  if (!bat) b.ellipsoid(bodyG, body, new Vec3(bl * 0.16, -bh * 0.05, 0), new Vec3(bl * 0.32, bh * 0.46, bw * 0.47), 'primary', { ...bo, u0: 0.4, u1: 0.95 });
  b.cone(bodyG, body, new Vec3(bl * 0.3, bh * 0.15, 0), bh * 0.3, neck, new Vec3(neckLen, 0, 0), hr * 0.62, 'primary', { domain: Domain.Neck, domainLen: neckLen + hr });

  // ---- head
  const headG = b.group('head', hr * 0.3);
  const ho = { domain: Domain.Head, domainLen: hr * 2 };
  b.ellipsoid(headG, head, new Vec3(hr * 0.1, hr * 0.05, 0), new Vec3(hr * (bat ? 0.95 : 1.02), hr * 0.95, hr * 0.9), 'head', ho);
  const beakG = b.group('beak', 0, { depthBias: 0.05 });
  const shape = g.c('beakShape');
  const bLen = Math.max(1, hr * p.beak * 2 * lerp(0.7, 1.35, g.f('beak')));
  const bR = Math.max(0.6, hr * (shape === 'conical' ? 0.42 : shape === 'hooked' ? 0.36 : 0.28));
  const bx = hr * 0.82;
  const owl = !!p.owl;
  if (bat) {
    // short furry snout, a pink nose and two little fangs
    b.cone(headG, head, new Vec3(hr * 0.6, -hr * 0.1, 0), hr * 0.45, head, new Vec3(hr * 1.25, -hr * 0.2, 0), hr * 0.3, 'head', ho);
    b.ellipsoid(beakG, head, new Vec3(hr * 1.3, -hr * 0.1, 0), new Vec3(hr * 0.15, hr * 0.15, hr * 0.22), 'beak', { flags: PF.NoPattern });
    for (const side of [-1, 1]) b.cone(b.group('fangs', 0, { depthBias: 0.2, flags: GF.NoContour }), head, new Vec3(hr * 1.1, -hr * 0.4, side * hr * 0.15), 0.45, head, new Vec3(hr * 1.12, -hr * 0.75, side * hr * 0.15), 0.35, 'fang', { flags: PF.NoPattern | PF.Thin | PF.NoShadow });
    b.ellipsoid(beakG, jaw, new Vec3(hr * 0.25, -hr * 0.05, 0), new Vec3(hr * 0.35, hr * 0.12, hr * 0.28), 'head', { flags: PF.NoPattern });
    const eo = lerp(0.7, 1.5, g.f('ears'));
    for (const side of [-1, 1]) b.cone(b.group('ear', hr * 0.1, { side }), head, new Vec3(hr * 0.05, hr * 0.55, side * hr * 0.45), hr * 0.38 * eo, head, new Vec3(-hr * 0.15, hr * (0.9 + 0.8 * eo), side * hr * (0.6 + 0.2 * eo)), hr * 0.08, 'head', { ...ho, side });
  } else {
    b.cone(beakG, head, new Vec3(bx, -hr * 0.02, 0), bR, head, new Vec3(bx + bLen, -hr * 0.12 - (shape === 'hooked' ? bLen * 0.15 : 0), 0), 0.38, 'beak', { flags: PF.NoPattern });
    if (shape === 'hooked') b.cone(beakG, head, new Vec3(bx + bLen * 0.75, -hr * 0.05, 0), bR * 0.55, head, new Vec3(bx + bLen * 0.95, -hr * 0.2 - bLen * 0.45, 0), 0.38, 'beak', { flags: PF.NoPattern });
    b.cone(beakG, jaw, Vec3.ZERO, bR * 0.7, jaw, new Vec3(bLen * (shape === 'hooked' ? 0.55 : 0.85), -0.1, 0), 0.36, 'beak', { flags: PF.NoPattern });
  }
  // eyes
  const eyeR = Math.max(1, hr * 0.3 * p.eyeSize * lerp(0.8, 1.3, g.f('eyeSize')));
  for (const side of [-1, 1]) {
    const pos = owl ? new Vec3(hr * 0.86, hr * 0.12, side * hr * 0.4) : bat ? new Vec3(hr * 0.75, hr * 0.25, side * hr * 0.45) : new Vec3(hr * 0.55, hr * 0.25, side * hr * 0.66);
    const nrm = owl ? new Vec3(1, 0.05, side * 0.35) : bat ? new Vec3(0.8, 0.2, side * 0.6) : new Vec3(0.55, 0.2, side);
    b.feature('eye', head, pos, nrm, eyeR, { style: g.c('eyeStyle'), side, slot: 'eye' });
  }
  // owl face, tufts, crests, combs
  if (g.b('faceDisc') && !bat) {
    b.ellipsoid(b.group('face', hr * 0.2, { depthBias: 0.05 }), head, new Vec3(hr * 0.62, 0, 0), new Vec3(hr * 0.32, hr * 0.85, hr * 0.92), 'face', { flags: PF.NoPattern });
    b.trait('facial disc');
  }
  if (g.b('earTufts') && !bat) {
    for (const side of [-1, 1]) b.cone(headG, head, new Vec3(hr * 0.35, hr * 0.7, side * hr * 0.5), hr * 0.25, head, new Vec3(hr * 0.1, hr * 1.45, side * hr * 0.75), 0.4, 'head', { ...ho, side });
    b.trait('ear tufts');
  }
  const crest = bat ? 'none' : g.c('crest');
  if (crest === 'tuft' || crest === 'plume') {
    const cg = b.group('crest', hr * 0.15, { depthBias: -0.05 });
    const n = crest === 'plume' ? 4 : 2;
    for (let k = 0; k < n; k++) {
      const t = k / Math.max(1, n - 1);
      const len = hr * (crest === 'plume' ? 1.5 - 0.4 * t : 0.9);
      const a0 = new Vec3(hr * (0.45 - 0.35 * t), hr * 0.8, 0);
      b.cone(cg, head, a0, hr * 0.22, head, a0.add(new Vec3(-len * (0.45 + 0.5 * t), len * (0.9 - 0.4 * t), 0)), 0.38, 'crest', { flags: PF.NoPattern });
    }
    b.trait(crest);
  } else if (crest === 'comb') {
    const cg = b.group('comb', hr * 0.15, { depthBias: 0.02 });
    for (let k = 0; k < 4; k++) b.ellipsoid(cg, head, new Vec3(hr * (0.55 - 0.35 * k), hr * (0.95 + 0.12 * Math.sin(k * 1.4)), 0), new Vec3(hr * 0.24, hr * 0.32, hr * 0.12), 'crest', { flags: PF.NoPattern });
    b.ellipsoid(b.group('wattle', hr * 0.1, { depthBias: 0.02 }), head, new Vec3(hr * 0.85, -hr * 0.6, 0), new Vec3(hr * 0.18, hr * 0.32, hr * 0.12), 'crest', { flags: PF.NoPattern });
    b.trait('comb');
  }

  // ---- tail
  let tail = -1;
  const tailFeathers: number[] = [], tailSpread: number[] = [];
  if (!bat && tl > 0) {
    const sickle = arch === 'chicken';
    tail = b.bone('tail', body, Xform.at(-bl * 0.4, bh * 0.08, 0, Mat3.rotZ(PI - p.tailAngle)));
    const tg = b.group('tail', 0.5, { depthBias: -0.05 });
    b.cone(bodyG, body, new Vec3(-bl * 0.25, bh * 0.03, 0), bh * 0.36, tail, new Vec3(tl * 0.12, 0, 0), Math.max(0.6, bh * 0.16), 'primary', { ...bo, u0: 0, u1: 0.2 });
    const n = p.tailFeathers;
    const tw = Math.max(0.8, S * (arch === 'parrot' ? 0.07 : 0.1));
    for (let k = 0; k < n; k++) {
      const off = (k - (n - 1) / 2) * (sickle ? 0.25 : 0.32);
      const fb = b.bone('tailFeather', tail, new Xform(sickle ? Mat3.rotZ(-off * 1.4) : Mat3.rotY(off * 0.35), Vec3.ZERO));
      tailFeathers.push(fb);
      tailSpread.push(sickle ? 0 : off);
      const len = tl * (sickle ? 1 - 0.18 * Math.abs(k - (n - 1) / 2) : 1 - 0.1 * Math.abs(k - (n - 1) / 2));
      b.ellipsoid(tg, fb, new Vec3(len * 0.5, 0, 0), new Vec3(len * 0.5, sickle ? tw : 0.45, sickle ? 0.45 : tw), 'tail', { flags: PF.NoPattern, rot: sickle ? Mat3.rotZ(0.3) : Mat3.I });
    }
  }

  // ---- wings
  const wings: number[][] = [];
  const wingFolded: number[] = [], wingSpread: number[] = [];
  const a0 = Wsp * (bat ? 0.26 : 0.22), a1 = Wsp * (bat ? 0.32 : 0.3), a2 = Wsp * 0.18;
  const chord = Wsp * p.chord;
  for (const side of [-1, 1]) {
    const shoulder = new Vec3(bl * (bat ? 0.12 : 0.16), bh * (bat ? 0.2 : 0.28), side * bw * 0.42);
    const w0 = b.bone('wing', body, new Xform(Mat3.rotY(-side * PI / 2), shoulder));
    const w1 = b.bone('wing', w0, Xform.at(a0, 0, 0));
    const w2 = b.bone('wing', w1, Xform.at(a1, 0, 0));
    wings.push([w0, w1, w2]);
    const z = (back: number) => side * back;
    if (bat) {
      const g2 = b.group('wing', 0.4, { side });
      const r = Math.max(0.5, S * 0.05);
      const o = { side, flags: PF.NoPattern };
      b.cone(g2, w0, Vec3.ZERO, r * 1.4, w1, Vec3.ZERO, r, 'membraneBone', o);
      b.cone(g2, w1, Vec3.ZERO, r, w2, Vec3.ZERO, r * 0.8, 'membraneBone', o);
      const fing = [[0.1, 0.55], [0.75, 0.5], [1.45, 0.42]].map(([a, l]) => new Vec3(Math.cos(a) * Wsp * l, 0, z(Math.sin(a) * Wsp * l)));
      for (const f of fing) b.cone(g2, w2, Vec3.ZERO, r * 0.8, w2, f, 0.35, 'membraneBone', { ...o, flags: PF.NoPattern | PF.Thin });
      b.cone(g2, w2, Vec3.ZERO, r * 0.7, w2, new Vec3(-r * 0.5, r, z(-r * 2.5)), 0.35, 'beak', { ...o, flags: PF.NoPattern | PF.Thin });
      const gm = b.group('membrane', 0, { side, depthBias: -0.05 });
      const mo = { side, domain: Domain.Wing, flags: PF.NoPattern | PF.NoShadow };
      const attach = new Vec3(-bl * 0.45, -bh * 0.2, side * bw * 0.3);
      b.tri(gm, w2, Vec3.ZERO, w2, fing[0], w2, fing[1], 'membrane', mo);
      b.tri(gm, w2, Vec3.ZERO, w2, fing[1], w2, fing[2], 'membrane', mo);
      b.tri(gm, w1, Vec3.ZERO, w2, Vec3.ZERO, w2, fing[2], 'membrane', mo);
      b.tri(gm, w1, Vec3.ZERO, w2, fing[2], body, attach, 'membrane', mo);
      b.tri(gm, w0, Vec3.ZERO, w1, Vec3.ZERO, body, attach, 'membrane', mo);
      continue;
    }
    // spread wing: leading edge, coverts, secondaries along the forearm, primaries fanned from the hand
    const gs = b.group('wingSpread', 0.6, { side });
    wingSpread.push(gs);
    const wo = { side, flags: PF.NoPattern };
    const lr = Math.max(0.6, S * 0.06);
    b.cone(gs, w0, Vec3.ZERO, lr * 1.5, w1, Vec3.ZERO, lr * 1.2, 'wing', wo);
    b.cone(gs, w1, Vec3.ZERO, lr * 1.2, w2, Vec3.ZERO, lr, 'wing', wo);
    b.cone(gs, w2, Vec3.ZERO, lr, w2, new Vec3(a2, 0, 0), lr * 0.7, 'wing', wo);
    const sl = chord * 0.62;
    b.ellipsoid(gs, w0, new Vec3(a0 * 0.5, 0.1, z(chord * 0.3)), new Vec3(a0 * 0.62, 0.55, chord * 0.42), 'wing', wo);
    b.ellipsoid(gs, w1, new Vec3(a1 * 0.5, 0.1, z(chord * 0.28)), new Vec3(a1 * 0.58, 0.55, chord * 0.4), 'wing', wo);
    for (let k = 0; k < 4; k++) {
      const x = a1 * (k + 0.5) / 4;
      b.ellipsoid(gs, w1, new Vec3(x, 0, z(chord * 0.32 + sl * 0.5)), new Vec3(a1 * 0.16, 0.4, sl * 0.5), 'flight', { ...wo, flags: PF.NoPattern | PF.Thin });
    }
    b.ellipsoid(gs, w0, new Vec3(a0 * 0.6, 0, z(chord * 0.3 + sl * 0.45)), new Vec3(a0 * 0.45, 0.4, sl * 0.45), 'flight', { ...wo, flags: PF.NoPattern | PF.Thin });
    const pl = Wsp - a0 - a1 - a2 * 0.6;
    for (let k = 0; k < 5; k++) {
      const th = 0.05 + k * 0.3;
      const len = pl * (1 - 0.1 * k);
      const dir = new Vec3(Math.cos(th), 0, z(Math.sin(th)));
      b.ellipsoid(gs, w2, new Vec3(a2 * 0.55, 0, 0).addScaled(dir, len * 0.5), new Vec3(len * 0.5, 0.4, Math.max(0.7, chord * 0.12)), 'flight', { ...wo, flags: PF.NoPattern | PF.Thin, rot: Mat3.rotY(-side * th) });
    }
    // folded wing lying against the body
    const gf = b.group('wingFolded', 0.5, { side, depthBias: 0.15 });
    wingFolded.push(gf);
    b.ellipsoid(gf, body, new Vec3(-bl * 0.05, bh * 0.1, side * bw * 0.36), new Vec3(bl * 0.44, bh * 0.34, bw * 0.2), 'wing', { side, flags: PF.NoPattern });
    b.ellipsoid(gf, body, new Vec3(-bl * 0.42, bh * 0.04, side * bw * 0.26), new Vec3(bl * 0.34, bh * 0.15, bw * 0.13), 'flight', { side, flags: PF.NoPattern, rot: Mat3.rotZ(0.12) });
  }

  // ---- legs
  const legs: FlyerLeg[] = [];
  const bw0 = b.restWorld(body);
  for (const side of [-1, 1]) {
    const hip = bat ? new Vec3(-bl * 0.3, -bh * 0.25, side * bw * 0.28) : new Vec3(bl * 0.04, -bh * 0.3, side * bw * 0.26);
    const hipW = bw0.point(hip);
    const len: [number, number] = [legLen * 0.48, legLen * 0.62];
    const foot = new Vec3(hipW.x + S * 0.04, 0, hipW.z);
    const { mid, end } = twoBoneIK(hipW, foot, len[0], len[1], new Vec3(-1, 0, 0));
    const l0 = b.boneAt('leg', body, segmentFrame(hipW, mid, new Vec3(-1, 0, 0)));
    const l1 = b.boneAt('leg', l0, segmentFrame(mid, end, new Vec3(-1, 0, 0)));
    const ft = b.boneAt('foot', l1, Xform.at(end.x, end.y, end.z));
    legs.push({ side, hip, bones: [l0, l1, ft], len });
    const lg = b.group('leg', 0.3, { side, depthBias: -0.02 });
    const thighR = Math.max(0.7, bw * (owl ? 0.24 : 0.17));
    b.cone(lg, l0, Vec3.ZERO, thighR, l1, Vec3.ZERO, owl ? thighR * 0.8 : 0.5, owl ? 'belly' : 'primary', { side, domain: Domain.Limb, domainLen: legLen });
    b.cone(lg, l1, Vec3.ZERO, owl ? thighR * 0.7 : 0.45, ft, Vec3.ZERO, 0.42, owl ? 'belly' : 'feet', { side, flags: PF.NoPattern | PF.Thin });
    const toe = Math.max(1, S * (bat ? 0.06 : 0.14));
    const to = { side, flags: PF.NoPattern | PF.Thin | PF.ShadowCaster };
    for (const a of [-0.45, 0, 0.45]) b.cone(lg, ft, Vec3.ZERO, 0.42, ft, new Vec3(Math.cos(a) * toe, -0.2, Math.sin(a) * toe), 0.36, 'feet', to);
    b.cone(lg, ft, Vec3.ZERO, 0.42, ft, new Vec3(-toe * 0.55, -0.2, 0), 0.36, 'feet', to);
  }

  for (const t of [arch === 'raptor' ? 'bird of prey' : arch, g.c('pattern') !== 'none' ? g.c('pattern') : '', !bat ? `${g.c('beakShape')} beak` : ''])
    if (t) b.trait(t);

  const rig: FlyerRig = {
    kind: 'flyer', bat,
    bones: { body, neck, head, jaw, tail, tailFeathers, tailSpread, wings, legs },
    groups: { wingFolded, wingSpread },
    dims: { S, bl, bh, tilt: bat ? 0 : tilt, legLen, neckLen, hr, W: Wsp },
    traits: { energy: g.f('energy'), hopper: p.hopper, ground: !!p.ground, attack: p.attack, call: p.call, bob: g.f('bob') },
  };
  const animator = new FlyerAnimator(rig);
  const height = bat ? S * 2.2 + Wsp * 0.4 + S : legLen + bh * 0.9 + neckLen * 0.8 + hr * 1.8;
  const anatomy = b.build({ height, walkSpeed: animator.clips.find((c) => c.id === 'walk')!.speed, runSpeed: animator.clips.find((c) => c.id === 'run')!.speed, length: bat ? Wsp * 1.4 : bl + tl * 0.5 + hr }, rig, clamp(S / 12, 0.6, 2));

  // ---- materials
  const feather = (c: Hex, style: 'feather' | 'fur' = bat ? 'fur' : 'feather'): Material => ({ color: c, ramp: 'organic', style });
  const eyeGlow = g.c('eyeStyle') === 'glow';
  const materials: Record<string, Material> = {
    primary: feather(g.col('bodyColor')),
    head: feather(g.col('headColor')),
    belly: feather(g.col('bellyColor')),
    face: feather(mixHex(g.col('bellyColor'), 0xffffff, 0.15)),
    wing: feather(g.col('wingColor')),
    flight: feather(g.col('flightColor')),
    tail: feather(g.col('tailColor')),
    marking: feather(g.col('markColor')),
    crest: { color: g.col('crestColor'), ramp: arch === 'chicken' ? 'skin' : 'organic', style: arch === 'chicken' ? 'skin' : 'feather' },
    beak: { color: g.col('beakColor'), ramp: 'bone', style: 'glossy' },
    feet: { color: g.col('feetColor'), ramp: 'skin', style: 'hide' },
    eye: { color: g.col('eyeColor'), ramp: eyeGlow ? 'glow' : 'cloth', style: eyeGlow ? 'emissive' : 'glossy', emissive: eyeGlow },
    membrane: { color: g.col('wingColor'), ramp: 'organic', style: 'membrane' },
    membraneBone: { color: mixHex(g.col('wingColor'), g.col('bodyColor'), 0.4), ramp: 'organic', style: 'hide' },
    fang: { color: 0xf0ece0, ramp: 'bone', style: 'glossy' },
  };
  const slot = (n: string) => {
    const i = anatomy.slots.indexOf(n);
    return i >= 0 ? i : anatomy.slots.push(n) - 1;
  };
  const surface: SurfaceSpec = {
    pattern: g.c('pattern') as PatternKind, markSize: lerp(1.6, 3.5, g.f('markSize')), density: g.f('density'),
    seed: Math.floor(g.f('markSize') * 9973 + g.f('density') * 7919 + g.col('markColor')) >>> 0,
    countershade: g.f('countershade'), tips: 0, socks: 0,
    coat: [slot('primary'), slot('wing')], markSlot: slot('marking'), bellySlot: slot('belly'), tipSlot: -1,
    domains: [Domain.Body, Domain.Neck],
  };
  return { anatomy, materials, surface, animator };
}

export const flyerFamily: Family = {
  id: 'flyer',
  label: 'Birds & bats',
  description: 'Songbirds, crows, owls, birds of prey, parrots, chickens and bats: folded or spread feathered wings, beaks, crests, combs and owl faces; hops, head-bobbing walks, flapping flight, glides, take-offs, pecks and talon strikes.',
  archetypes: ARCH.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng) {
    return syllableName(rng);
  },
};
