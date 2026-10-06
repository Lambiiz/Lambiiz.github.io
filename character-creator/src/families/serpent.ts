/**
 * Serpents: vipers, cobras, pythons, banded snakes and giant worms. A tapering chain of body
 * segments with a jointed head (opening jaw, fangs, flicking forked tongue), optional cobra hood,
 * rattle and brow horns, and body-anchored scale patterns (diamonds, zigzags, blotches, rings).
 */

import { Domain, GF, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { SerpentAnimator, type SerpentRig } from '../anim/serpent';
import { hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { Vec3, Xform, clamp, lerp, segmentFrame, smoothstep } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { Material, StyleName } from '../render/materials';
import type { PatternKind, SurfaceSpec } from '../render/surface';
import { syllableName } from './human';

type W = readonly (readonly [string, number])[];
const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const ARCH = [['viper', 'Viper'], ['cobra', 'Cobra'], ['python', 'Python'], ['banded', 'Banded snake'], ['worm', 'Giant worm']] as const;

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('size', 'Length', 0.5)
  .float('thickness', 'Thickness', 0.5)
  .float('neck', 'Neck', 0.5, { help: 'Thin neck behind a wide head ↔ no neck at all.' })
  .float('tail', 'Tail length', 0.5)
  .group('head', 'Head', 'anatomy')
  .choice('headShape', 'Head shape', opt(['triangle', 'Triangular'], ['oval', 'Oval'], ['round', 'Small and round'], ['maw', 'Round maw (worm)']), 'oval')
  .float('headSize', 'Head size', 0.5)
  .float('eyeSize', 'Eye size', 0.5)
  .choice('eyeStyle', 'Eyes', opt(['slit', 'Slit pupils'], ['round', 'Round'], ['bead', 'Beady'], ['glow', 'Glowing'], ['none', 'None']), 'slit')
  .bool('fangs', 'Fangs', true)
  .bool('horns', 'Brow horns', false)
  .group('extras', 'Hood & rattle', 'anatomy')
  .bool('hood', 'Hood', false)
  .bool('rattle', 'Rattle', false)
  .group('scales', 'Colours', 'color')
  .choice('material', 'Surface', opt(['scales', 'Scales'], ['smooth', 'Smooth'], ['slimy', 'Slimy']), 'scales')
  .color('coatColor', 'Back', 0x7a6a4a)
  .color('bellyColor', 'Belly', 0xd8c8a0)
  .color('markColor', 'Markings', 0x3a2e24)
  .color('ringColor', 'Second marking', 0xe8c84a)
  .color('eyeColor', 'Eyes', 0xc8a03a)
  .color('tongueColor', 'Tongue', 0xc8303a)
  .group('pattern', 'Pattern', 'pattern')
  .choice('pattern', 'Pattern', opt(['none', 'None'], ['diamonds', 'Diamonds'], ['zigzag', 'Zigzag'], ['blotches', 'Blotches'], ['mottled', 'Mottled'], ['bands', 'Bands'], ['rings', 'Triple rings'], ['dorsal', 'Back stripe'], ['spots', 'Spots'], ['saddle', 'Saddle']), 'none')
  .float('markSize', 'Mark size', 0.5)
  .float('density', 'Density', 0.5)
  .float('countershade', 'Light belly', 0.6)
  .float('tips', 'Tail tip', 0)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .float('amplitude', 'Wiggle', 0.5)
  .float('waves', 'Body waves', 0.5, { help: 'One big S ↔ two waves along the body.' })
  .build();

interface Prior {
  weight: number;
  length: [number, number];
  thick: number;
  neck: number;
  tail: number;
  head: W;
  headSize: number;
  eyes: W;
  fangs: number;
  horns?: number;
  hood?: number;
  rattle?: number;
  material: W;
  coats: Hex[];
  bellies?: Hex[];
  marks: Hex[];
  rings?: Hex[];
  patterns: W;
  countershade: [number, number];
  eyeColors: Hex[];
  tongues: Hex[];
  waves: number;
}

const PRIORS: Record<string, Prior> = {
  viper: { weight: 1.3, length: [40, 54], thick: 0.062, neck: 0.5, tail: 0.13, head: [['triangle', 1]], headSize: 1.3, eyes: [['slit', 1]], fangs: 1, horns: 0.15, rattle: 0.45, material: [['scales', 1]], coats: [0x8a7a5a, 0x6a5a40, 0xa89a7a, 0x5a5a4a, 0x7a6a6a, 0xb8a080], marks: [0x3a2e24, 0x2a2622, 0x4a3a2a], patterns: [['diamonds', 2], ['zigzag', 1.5], ['blotches', 1]], countershade: [0.4, 0.8], eyeColors: [0xc8a03a, 0xd88a3a, 0x9ab04a], tongues: [0x2a2228, 0x4a3a4a], waves: 0.3 },
  cobra: { weight: 1.1, length: [54, 68], thick: 0.042, neck: 0.75, tail: 0.2, head: [['oval', 2], ['round', 1]], headSize: 1.05, eyes: [['round', 2], ['bead', 1]], fangs: 1, hood: 1, material: [['scales', 1]], coats: [0x6a5034, 0x2a2626, 0x8a7a4a, 0xa88a4a, 0x4a4a3a], bellies: [0xe0d4b0, 0xc8b890], marks: [0x2a2420, 0xe8dcc0], patterns: [['none', 2], ['bands', 1], ['dorsal', 0.4]], countershade: [0.6, 0.9], eyeColors: [0x3a2a1a, 0xc8a03a], tongues: [0x2a2228], waves: 0.6 },
  python: { weight: 1, length: [70, 96], thick: 0.064, neck: 0.72, tail: 0.14, head: [['oval', 1]], headSize: 0.95, eyes: [['slit', 1], ['round', 0.4]], fangs: 0, material: [['scales', 1]], coats: [0x9a7a4a, 0x7a6a4a, 0xd8c070, 0x3a7a3a, 0x6a5a5a, 0xe8d8a8], marks: [0x3a2a1e, 0x4a3a2a, 0xe8e0c8], patterns: [['blotches', 2], ['mottled', 1.5], ['saddle', 1], ['spots', 0.5]], countershade: [0.4, 0.8], eyeColors: [0xc8a03a, 0xd8c070], tongues: [0x2a2228, 0x8a2a3a], waves: 0.4 },
  banded: { weight: 0.9, length: [44, 60], thick: 0.032, neck: 0.9, tail: 0.15, head: [['round', 2], ['oval', 1]], headSize: 1.0, eyes: [['bead', 2], ['round', 1]], fangs: 0.3, material: [['smooth', 2], ['scales', 1]], coats: [0xc8302a, 0xd84a2a, 0x2a2626, 0xe8e0d0], marks: [0x1e1a1e], rings: [0xf0d040, 0xe8e4d8], patterns: [['rings', 2], ['bands', 1.5]], countershade: [0, 0.3], eyeColors: [0x1e1a1e], tongues: [0x2a2228, 0xc8303a], waves: 0.8 },
  worm: { weight: 0.7, length: [60, 90], thick: 0.085, neck: 1, tail: 0.1, head: [['maw', 1]], headSize: 1, eyes: [['none', 1]], fangs: 1, material: [['slimy', 1], ['smooth', 1]], coats: [0xc88a8a, 0xb89a7a, 0x8a6a8a, 0x8a8478, 0xd8b890], marks: [0x8a5a5a, 0x6a5040], patterns: [['bands', 3], ['none', 1]], countershade: [0.3, 0.7], eyeColors: [0x1e1a1e], tongues: [0x8a2a3a], waves: 0.1 },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.035 * amt), l.c * (1 + rng.gaussian(0, 0.12 * amt)), l.h + rng.gaussian(0, 8 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const p = PRIORS[ctx.arch] ?? PRIORS.viper;
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), pt = ctx.rng('pattern'), m = ctx.rng('motion');
  const g = (mean: number, sd = 0.12) => clamp(a.gaussian(mean, sd), 0, 1);
  const v: Record<string, GeneValue> = {
    size: g(0.5, 0.25), thickness: g(0.5), neck: g(0.5), tail: g(0.5), headShape: pick(a, p.head), headSize: g(0.5), eyeSize: g(0.5, 0.15),
    eyeStyle: pick(a, p.eyes), fangs: a.chance(p.fangs), horns: a.chance(p.horns ?? 0), hood: a.chance(p.hood ?? 0), rattle: a.chance(p.rattle ?? 0),
  };
  const base = c.pick(p.coats);
  const coat = jitter(c, base, 0.7);
  const cl = hexToOklch(coat);
  v.material = pick(c, p.material);
  v.coatColor = coat;
  v.bellyColor = p.bellies ? jitter(c, c.pick(p.bellies), 0.5) : oklch(Math.min(0.9, cl.l + 0.2), cl.c * 0.45, cl.h + 10);
  v.markColor = jitter(c, c.pick(p.marks), 0.4);
  // dark snakes get light bands (kingsnakes), never black on black
  if (cl.l < 0.4 && hexToOklch(v.markColor).l < 0.45) v.markColor = jitter(c, c.pick([0xe8e4d8, 0xc8302a, 0xe8c84a]), 0.3);
  v.ringColor = p.rings ? jitter(c, c.pick(p.rings), 0.3) : oklch(Math.min(0.9, cl.l + 0.25), cl.c * 0.6, cl.h);
  v.eyeColor = c.pick(p.eyeColors);
  v.tongueColor = c.pick(p.tongues);
  // green tree pythons wear white spots
  if (ctx.arch === 'python' && base === 0x3a7a3a) v.markColor = jitter(c, 0xe8e8d8, 0.3);
  v.pattern = pick(pt, p.patterns);
  v.markSize = clamp(pt.gaussian(0.5, 0.15), 0, 1);
  v.density = clamp(pt.gaussian(0.5, 0.18), 0, 1);
  v.countershade = clamp(pt.range(...p.countershade), 0, 1);
  v.tips = ctx.arch !== 'banded' && pt.chance(0.15) ? pt.range(0.2, 0.6) : 0;
  v.energy = clamp(m.gaussian(ctx.arch === 'python' || ctx.arch === 'worm' ? 0.3 : 0.55, 0.15), 0, 1);
  v.amplitude = clamp(m.gaussian(ctx.arch === 'worm' ? 0.2 : 0.5, 0.12), 0, 1);
  v.waves = clamp(m.gaussian(p.waves, 0.15), 0, 1);
  return v;
}

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const arch = genome.archetype;
  const p = PRIORS[arch] ?? PRIORS.viper;
  const b = new AnatomyBuilder(scale);
  const L = lerp(p.length[0], p.length[1], g.f('size')) * scale;
  const R = Math.max(1.2, L * p.thick * lerp(0.75, 1.3, g.f('thickness')));
  const N = 16;
  const seg = L / N;
  const shape = g.c('headShape');
  const worm = shape === 'maw';
  const neckRatio = clamp(p.neck * lerp(0.8, 1.2, g.f('neck')), 0.4, 1);
  const tailFrac = clamp(p.tail * lerp(0.7, 1.5, g.f('tail')), 0.06, 0.35);
  const rattle = g.b('rattle') && !worm;
  const tipR = worm ? 0.7 : rattle ? 0.35 : 0.12;
  const radii: number[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    let k = lerp(neckRatio, 1, smoothstep(0, 0.3, t));
    if (t > 1 - tailFrac * 1.6) k *= lerp(1, tipR, smoothstep(1 - tailFrac * 1.6, 1, t) ** 0.8);
    radii.push(Math.max(0.6, R * k));
  }

  // ---- skeleton: a straight chain along −X, head end at +X
  const x0 = L * 0.5;
  const P = (i: number) => new Vec3(x0 - i * seg, radii[i], 0);
  const root = b.bone('root', -1, Xform.I);
  const body: number[] = [];
  for (let i = 0; i < N; i++) body.push(b.boneAt('body' + i, i ? body[i - 1] : root, segmentFrame(P(i), P(i + 1), Vec3.Y)));
  const head = b.boneAt('head', root, Xform.at(P(0).x, P(0).y, 0));

  const bodyG = b.group('body', R * 0.35, { flags: GF.CreaseShade });
  const tailStart = Math.floor(N * (1 - tailFrac * 1.2));
  for (let i = 0; i < N; i++) {
    const tail = i >= tailStart;
    const o = { domain: tail ? Domain.Tail : Domain.Body, u0: i / N, u1: (i + 1) / N, domainLen: L, flags: tail ? PF.ShadowCaster : 0 };
    b.cone(bodyG, body[i], Vec3.ZERO, radii[i], i + 1 < N ? body[i + 1] : body[i], i + 1 < N ? Vec3.ZERO : new Vec3(seg, 0, 0), radii[i + 1], 'primary', o);
  }

  // ---- head
  const headG = b.group('head', R * 0.3);
  const hr = worm ? R : Math.max(1.2, R * lerp(0.82, 1.2, g.f('headSize')) * ({ triangle: 1.15, oval: 1.0, round: 0.92 }[shape] ?? 1) * (shape === 'triangle' ? p.headSize / 1.15 : 1));
  const hl = worm ? R * 1.2 : hr * ({ triangle: 2.3, oval: 2.5, round: 1.9 }[shape] ?? 2.3);
  const ho = { domain: Domain.Head, domainLen: hl * 2 };
  let jaw = -1, tongue = -1, maw = -1, tongueG = -1, fangG = -1;
  const tongueLen = Math.max(4, hl * 0.8);
  if (worm) {
    b.ellipsoid(headG, head, new Vec3(R * 0.25, 0, 0), new Vec3(R * 0.95, radii[0] * 1.02, radii[0] * 1.02), 'primary', ho);
    maw = b.bone('maw', head, Xform.at(R * 1.12, 0, 0));
    b.ellipsoid(b.group('mouth', 0, { depthBias: 0.3 }), maw, Vec3.ZERO, new Vec3(R * 0.2, R * 0.72, R * 0.72), 'mouth', { flags: PF.NoPattern | PF.NoShadow });
    fangG = b.group('teeth', 0, { depthBias: 0.5, flags: GF.NoContour });
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2 + 0.2;
      const ca = Math.cos(a), sa = Math.sin(a);
      b.cone(fangG, maw, new Vec3(R * 0.02, ca * R * 0.7, sa * R * 0.7), Math.max(0.5, R * 0.12), maw, new Vec3(R * 0.2, ca * R * 0.32, sa * R * 0.32), 0.35, 'fang', { flags: PF.NoPattern | PF.NoShadow | PF.Thin });
    }
  } else {
    b.ellipsoid(headG, head, new Vec3(hl * 0.42, hr * 0.02, 0), new Vec3(hl * 0.5, hr * 0.6, hr * 0.85), 'primary', ho);
    if (shape === 'triangle') b.ellipsoid(headG, head, new Vec3(hl * 0.22, -hr * 0.08, 0), new Vec3(hl * 0.3, hr * 0.55, hr * 1.05), 'primary', ho);
    if (shape !== 'round') b.cone(headG, head, new Vec3(hl * 0.5, 0, 0), hr * 0.62, head, new Vec3(hl * 0.86, -hr * 0.06, 0), hr * (shape === 'triangle' ? 0.36 : 0.42), 'primary', ho);
    jaw = b.bone('jaw', head, Xform.at(hl * 0.1, -hr * 0.32, 0));
    b.ellipsoid(headG, jaw, new Vec3(hl * 0.4, 0, 0), new Vec3(hl * 0.45, hr * 0.22, hr * 0.72), 'primary', { ...ho, domain: Domain.Belly });
    b.ellipsoid(b.group('mouth', 0, { depthBias: -0.6 }), head, new Vec3(hl * 0.5, -hr * 0.34, 0), new Vec3(hl * 0.42, hr * 0.22, hr * 0.6), 'mouth', { flags: PF.NoPattern | PF.NoShadow });
    if (g.b('fangs')) {
      fangG = b.group('fangs', 0, { depthBias: 0.2, flags: GF.NoContour });
      for (const side of [-1, 1]) b.cone(fangG, head, new Vec3(hl * 0.76, -hr * 0.28, side * hr * 0.28), 0.5, head, new Vec3(hl * 0.72, -hr * 0.85, side * hr * 0.26), 0.35, 'fang', { side, flags: PF.NoPattern | PF.NoShadow | PF.Thin });
    }
    if (g.c('eyeStyle') !== 'none') {
      const es = Math.max(1, hr * 0.42 * lerp(0.8, 1.35, g.f('eyeSize')));
      for (const side of [-1, 1]) b.feature('eye', head, new Vec3(hl * 0.6, hr * 0.28, side * hr * 0.62), new Vec3(0.3, 0.45, side), es, { style: g.c('eyeStyle'), side, slot: 'eye' });
    }
    if (g.b('horns')) {
      const hg = b.group('horns', 0, { depthBias: 0.1 });
      for (const side of [-1, 1]) b.cone(hg, head, new Vec3(hl * 0.62, hr * 0.45, side * hr * 0.42), Math.max(0.5, hr * 0.2), head, new Vec3(hl * 0.52, hr * 1.15, side * hr * 0.55), 0.3, 'horn', { side, flags: PF.NoPattern });
    }
    tongue = b.bone('tongue', head, Xform.at(hl * 0.9, -hr * 0.24, 0));
    tongueG = b.group('tongue', 0, { depthBias: 0.2, flags: GF.NoContour });
    const to = { flags: PF.NoPattern | PF.NoShadow | PF.Thin };
    b.cone(tongueG, tongue, new Vec3(-tongueLen * 0.75, 0, 0), 0.45, tongue, Vec3.ZERO, 0.4, 'tongue', to);
    for (const side of [-1, 1]) b.cone(tongueG, tongue, Vec3.ZERO, 0.4, tongue, new Vec3(tongueLen * 0.3, 0, side * tongueLen * 0.14), 0.35, 'tongue', to);
  }

  // ---- hood
  let hood = -1;
  if (g.b('hood') && !worm) {
    hood = b.bone('hood', body[1], Xform.at(seg * 0.4, 0, 0));
    b.ellipsoid(bodyG, hood, new Vec3(0, -radii[1] * 0.1, 0), new Vec3(seg * 1.5, radii[1] * 0.42, radii[1] * 1.0), 'primary', { domain: Domain.Body, u0: 0.02, u1: 0.15, domainLen: L });
    b.trait('hood');
  }

  // ---- rattle
  if (rattle) {
    const rg = b.group('rattle', 0.4, { depthBias: 0.05 });
    const rr = Math.max(0.7, R * 0.32);
    for (let k = 0; k < 4; k++) b.ellipsoid(rg, body[N - 1], new Vec3(seg * 0.9 + k * rr * 1.25, 0, 0), new Vec3(rr * 0.75, rr * (1 - k * 0.12), rr * (0.9 - k * 0.1)), 'rattle', { flags: PF.NoPattern | PF.ShadowCaster });
    b.trait('rattle');
  }

  for (const t of [arch, g.c('pattern') !== 'none' ? g.c('pattern') : '', g.b('fangs') && !worm ? 'venomous' : '', g.b('horns') && !worm ? 'brow horns' : ''])
    if (t) b.trait(t);

  const rig: SerpentRig = {
    kind: 'serpent',
    bones: { body, head, jaw, tongue, hood, maw },
    groups: { tongue: tongueG, fangs: fangG },
    dims: { N, seg, L, R, radii, headLen: hl, tongueLen, waves: g.f('waves') > 0.5 ? 2 : 1 },
    traits: { energy: g.f('energy'), amplitude: lerp(0.45, 0.9, g.f('amplitude')), hood: hood >= 0, rattle, worm, venomous: g.b('fangs') },
  };
  const animator = new SerpentAnimator(rig);
  const height = R * 2 + L * 0.33 * 0.6;
  const anatomy = b.build({ height, walkSpeed: animator.clips.find((c) => c.id === 'walk')!.speed, runSpeed: animator.clips.find((c) => c.id === 'run')!.speed, length: L * 0.8 + hl }, rig, clamp(L / 60, 0.6, 2));

  // ---- materials & patterns
  const mat = g.c('material');
  const style: StyleName = mat === 'scales' ? 'scales' : mat === 'slimy' ? 'slime' : 'hide';
  const organic = (c: Hex): Material => ({ color: c, ramp: 'organic', style });
  const eyeGlow = g.c('eyeStyle') === 'glow';
  const materials: Record<string, Material> = {
    primary: organic(g.col('coatColor')),
    belly: organic(g.col('bellyColor')),
    marking: organic(g.col('markColor')),
    ring: organic(g.col('ringColor')),
    eye: { color: g.col('eyeColor'), ramp: eyeGlow ? 'glow' : 'cloth', style: eyeGlow ? 'emissive' : 'glossy', emissive: eyeGlow },
    mouth: { color: worm ? 0x3a1a22 : 0xb86a78, ramp: worm ? 'dark' : 'organic', style: 'matte' },
    fang: { color: 0xf0ece0, ramp: 'bone', style: 'glossy' },
    tongue: { color: g.col('tongueColor'), ramp: 'organic', style: 'glossy' },
    horn: { color: mixHex(g.col('coatColor'), 0xd8c8a8, 0.5), ramp: 'bone', style: 'glossy' },
    rattle: { color: mixHex(g.col('coatColor'), 0xc8b088, 0.6), ramp: 'bone', style: 'chitin' },
  };
  const slot = (n: string) => {
    const i = anatomy.slots.indexOf(n);
    return i >= 0 ? i : anatomy.slots.push(n) - 1;
  };
  const pattern = g.c('pattern') as PatternKind;
  const surface: SurfaceSpec = {
    pattern, markSize: lerp(2.5, 6, g.f('markSize')) * (worm ? 0.8 : 1), density: g.f('density'), seed: Math.floor(g.f('markSize') * 9973 + g.f('density') * 7919 + g.col('markColor')) >>> 0,
    countershade: g.f('countershade'), tips: g.f('tips'), socks: 0,
    coat: [slot('primary')], markSlot: slot('marking'), bellySlot: slot('belly'), tipSlot: pattern === 'rings' ? slot('ring') : slot('marking'),
    domains: [Domain.Body, Domain.Tail, Domain.Head],
  };
  return { anatomy, materials, surface, animator };
}

export const serpentFamily: Family = {
  id: 'serpent',
  label: 'Serpents & worms',
  description: 'Vipers, cobras, pythons, banded snakes and giant worms: a jointed body that slithers along a fixed ground path, with strikes, hoods, rattles, coils, flicking tongues and scale patterns.',
  archetypes: ARCH.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    return genome.archetype === 'worm' && rng.chance(0.5) ? `${n} the ${rng.pick(['Devourer', 'Burrower', 'Deep', 'Hungry'])}` : n;
  },
};
