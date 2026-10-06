/**
 * Bugs & spiders: spiders (hairy or glossy, eight eyes, fangs), ants (elbowed antennae,
 * mandibles), beetles (shell cases that open for flight, horns or big mandibles) and scorpions
 * (pincers and a curled, striking tail). Six or eight jointed legs with knees above the body.
 */

import { Domain, GF, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { ArthropodAnimator, type ALeg, type ArthroRig, type ArthroType, type Jaw } from '../anim/arthropod';
import { hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { DEG, Mat3, Vec3, Xform, clamp, lerp, segmentFrame, twoBoneIK } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { Material, StyleName } from '../render/materials';
import type { PatternKind, SurfaceSpec } from '../render/surface';
import { syllableName } from './human';

type W = readonly (readonly [string, number])[];
const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const ARCH = [['spider', 'Spider'], ['ant', 'Ant'], ['beetle', 'Beetle'], ['scorpion', 'Scorpion']] as const;

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('size', 'Size', 0.5)
  .float('legs', 'Leg length', 0.5)
  .float('abdomen', 'Abdomen size', 0.5)
  .float('headSize', 'Head size', 0.5)
  .float('thickness', 'Leg thickness', 0.5)
  .group('features', 'Features', 'anatomy')
  .choice('weapon', 'Head weapon', opt(['none', 'None'], ['horn', 'Horn'], ['mandibles', 'Big mandibles']), 'none')
  .bool('hairy', 'Hairy', false)
  .bool('glowEyes', 'Glowing eyes', false)
  .float('antennae', 'Antenna length', 0.5)
  .float('tail', 'Tail length (scorpion)', 0.5)
  .float('claws', 'Pincer size (scorpion)', 0.5)
  .group('colors', 'Colours', 'color')
  .color('bodyColor', 'Body', 0x2a2628)
  .color('abdomenColor', 'Abdomen & shell', 0x2a2628)
  .color('legColor', 'Legs', 0x2a2628)
  .color('markColor', 'Markings', 0xc82a2a)
  .color('eyeColor', 'Eyes', 0x1e1a1e)
  .color('wingColor', 'Wings', 0xc8c0b0)
  .group('pattern', 'Pattern', 'pattern')
  .choice('pattern', 'Pattern', opt(['none', 'None'], ['spots', 'Spots'], ['dorsal', 'Stripe'], ['stripes', 'Bands'], ['saddle', 'Saddle'], ['mottled', 'Mottled'], ['diamonds', 'Diamonds']), 'none')
  .float('markSize', 'Mark size', 0.5)
  .float('density', 'Density', 0.5)
  .float('legBands', 'Banded legs', 0)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .build();

interface Prior {
  weight: number;
  size: [number, number];
  legs: number;
  weapon: W;
  hairy: number;
  glow: number;
  bodies: Hex[];
  abdomens?: Hex[];
  marks: Hex[];
  eyes: Hex[];
  patterns: W;
  legBands: number;
}

const PRIORS: Record<ArthroType, Prior> = {
  spider: { weight: 1.4, size: [14, 24], legs: 1.25, weapon: [['none', 1]], hairy: 0.5, glow: 0.3, bodies: [0x2a2628, 0x5a4a3a, 0x3a3434, 0x7a6a4a, 0x8a5a3a], marks: [0xc82a2a, 0xe8c83a, 0xe8e0d0, 0x3a2a1e], eyes: [0x1e1a1e, 0xff3a3a, 0x8aff4a], patterns: [['none', 2], ['spots', 1], ['dorsal', 1], ['saddle', 1], ['diamonds', 0.6]], legBands: 0.3 },
  ant: { weight: 1.1, size: [14, 22], legs: 0.9, weapon: [['none', 3], ['mandibles', 1]], hairy: 0, glow: 0.1, bodies: [0x2a2628, 0x8a2a1e, 0x5a3a2a, 0xa86a2a], marks: [0x1e1a1e], eyes: [0x1e1a1e], patterns: [['none', 1]], legBands: 0 },
  beetle: { weight: 1.2, size: [14, 22], legs: 0.62, weapon: [['none', 2], ['horn', 1.5], ['mandibles', 1]], hairy: 0, glow: 0.1, bodies: [0x2a2628, 0x1e3a2a, 0x2a2a4a, 0x3a2a1e, 0x2a2628], abdomens: [0x2a2628, 0x2a8a4a, 0x2a4aa8, 0xc82a2a, 0x8a5a2a, 0xa8882a], marks: [0x1e1a1e, 0xe8c83a], eyes: [0x1e1a1e], patterns: [['none', 2], ['spots', 1], ['stripes', 0.5]], legBands: 0 },
  scorpion: { weight: 1, size: [18, 28], legs: 0.5, weapon: [['none', 1]], hairy: 0, glow: 0.15, bodies: [0x2a2628, 0xa8884a, 0x5a3a2a, 0x3a3a44, 0xc8a870], marks: [0x3a2a1e], eyes: [0x1e1a1e], patterns: [['none', 2], ['dorsal', 1], ['stripes', 1]], legBands: 0.1 },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.03 * amt), l.c * (1 + rng.gaussian(0, 0.12 * amt)), l.h + rng.gaussian(0, 8 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const type = (ctx.arch in PRIORS ? ctx.arch : 'spider') as ArthroType;
  const p = PRIORS[type];
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), pt = ctx.rng('pattern'), m = ctx.rng('motion');
  const g = (mean: number, sd = 0.12) => clamp(a.gaussian(mean, sd), 0, 1);
  const v: Record<string, GeneValue> = {
    size: g(0.5, 0.25), legs: g(0.5), abdomen: g(0.5), headSize: g(0.5), thickness: g(0.5), weapon: pick(a, p.weapon), hairy: a.chance(p.hairy),
    glowEyes: a.chance(p.glow), antennae: g(0.5), tail: g(0.5), claws: g(0.5),
  };
  const body = jitter(c, c.pick(p.bodies), 0.6);
  v.bodyColor = body;
  v.abdomenColor = p.abdomens ? jitter(c, c.pick(p.abdomens), 0.6) : c.chance(0.7) ? body : jitter(c, mixHex(body, 0x8a6a4a, 0.4), 0.5);
  v.legColor = c.chance(0.8) ? body : jitter(c, mixHex(body, 0x000000, 0.3), 0.3);
  v.markColor = jitter(c, c.pick(p.marks), 0.4);
  v.eyeColor = v.glowEyes ? c.pick([0xff3a3a, 0x8aff4a, 0x4ad8ff]) : c.pick(p.eyes);
  v.wingColor = c.pick([0xc8c0b0, 0xa8b8c8, 0xd8c8a0]);
  v.pattern = pick(pt, p.patterns);
  if (type === 'beetle' && hexToOklch(v.abdomenColor as number).l > 0.45 && pt.chance(0.6)) v.pattern = 'spots';
  v.markSize = clamp(pt.gaussian(0.5, 0.15), 0, 1);
  v.density = clamp(pt.gaussian(0.5, 0.18), 0, 1);
  v.legBands = pt.chance(p.legBands) ? pt.range(0.4, 1) : 0;
  v.energy = clamp(m.gaussian(type === 'ant' || type === 'spider' ? 0.6 : 0.45, 0.15), 0, 1);
  return v;
}

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const type = (genome.archetype in PRIORS ? genome.archetype : 'spider') as ArthroType;
  const p = PRIORS[type];
  const b = new AnatomyBuilder(scale);
  const S = lerp(p.size[0], p.size[1], g.f('size')) * scale;
  const legLen = S * p.legs * lerp(0.8, 1.25, g.f('legs'));
  const abd = lerp(0.8, 1.3, g.f('abdomen'));
  const hs = lerp(0.85, 1.2, g.f('headSize'));
  const legR = Math.max(0.5, S * 0.035 * lerp(0.7, 1.4, g.f('thickness')) * (type === 'beetle' ? 1.2 : 1));
  const hairy = g.b('hairy') && type === 'spider';
  const weapon = g.c('weapon');

  // dimensions per body plan
  const bodyY = { spider: S * 0.3, ant: S * 0.28, beetle: S * 0.2, scorpion: S * 0.14 }[type];
  const root = b.bone('root', -1, Xform.I);
  const body = b.bone('body', root, Xform.at(0, bodyY, 0));
  const bodyG = b.group('body', S * 0.06, { flags: GF.CreaseShade });
  const bo = { domain: Domain.Body, domainLen: S };
  let head = body;
  const abdomen: number[] = [], tail: number[] = [], antennae: number[][] = [], jaws: Jaw[] = [];
  const claws: { bones: number[]; finger: number; side: number }[] = [];
  const elytra: number[] = [], wings: number[] = [], wingGroups: number[] = [];
  let thick = S * 0.12;
  // legs: hips in the body frame and resting angles (degrees from forward)
  let legAngles: number[] = [];
  let hipR = S * 0.1;
  let legAnchor = body;
  let legCentre = Vec3.ZERO;

  const eyesAt = (bone: number, pts: [Vec3, Vec3, number][]) => {
    const style = g.b('glowEyes') ? 'glow' : type === 'ant' || type === 'beetle' ? 'compound' : 'bead';
    for (const [pos, n, size] of pts) b.feature('eye', bone, pos, n, Math.max(1, size), { style, side: Math.sign(pos.z), slot: 'eye' });
  };

  switch (type) {
    case 'spider': {
      const c = S * 0.36 * hs;
      thick = c * 0.34;
      b.ellipsoid(bodyG, body, Vec3.ZERO, new Vec3(c * 0.5, c * 0.32, c * 0.42), 'primary', { ...bo, u0: 0.6, u1: 1 });
      const ab = b.bone('abdomen', body, Xform.at(-c * 0.45, c * 0.08, 0, Mat3.rotZ(0.15)));
      abdomen.push(ab);
      const a = S * 0.55 * abd;
      b.ellipsoid(b.group('abdomen', S * 0.05, { flags: GF.CreaseShade }), ab, new Vec3(-a * 0.48, a * 0.06, 0), new Vec3(a * 0.55, a * 0.44, a * 0.47), 'abdomen', { domain: Domain.Body, u0: 0, u1: 0.6, domainLen: S });
      b.cone(bodyG, body, new Vec3(-c * 0.3, 0, 0), c * 0.18, ab, new Vec3(-a * 0.1, 0, 0), c * 0.16, 'primary', bo);
      // fangs (chelicerae) and pedipalps
      for (const side of [-1, 1]) {
        const fb = b.bone('fang', body, Xform.at(c * 0.45, -c * 0.05, side * c * 0.13));
        jaws.push({ bone: fb, side, kind: 'fang' });
        b.cone(b.group('fang', 0.3, { side }), fb, Vec3.ZERO, c * 0.13, fb, new Vec3(c * 0.12, -c * 0.32, -side * c * 0.04), 0.4, 'jaw', { side, flags: PF.NoPattern });
        b.cone(b.group('palp', 0.3, { side }), body, new Vec3(c * 0.4, 0, side * c * 0.22), c * 0.08, body, new Vec3(c * 0.75, -c * 0.25, side * c * 0.32), c * 0.06, 'leg', { side, flags: PF.NoPattern });
      }
      eyesAt(body, [
        [new Vec3(c * 0.47, c * 0.18, -c * 0.08), new Vec3(1, 0.3, -0.2), c * 0.14], [new Vec3(c * 0.47, c * 0.18, c * 0.08), new Vec3(1, 0.3, 0.2), c * 0.14],
        [new Vec3(c * 0.4, c * 0.26, -c * 0.17), new Vec3(0.7, 0.6, -0.5), 1], [new Vec3(c * 0.4, c * 0.26, c * 0.17), new Vec3(0.7, 0.6, 0.5), 1],
      ]);
      legAngles = [40, 75, 110, 145];
      hipR = c * 0.36;
      break;
    }
    case 'ant': {
      const t = S * 0.3, h = S * 0.17 * hs, ga = S * 0.42 * abd;
      thick = t * 0.3;
      b.ellipsoid(bodyG, body, Vec3.ZERO, new Vec3(t * 0.5, t * 0.3, t * 0.28), 'primary', { ...bo, u0: 0.45, u1: 0.75 });
      head = b.bone('head', body, Xform.at(t * 0.5, t * 0.12, 0, Mat3.rotZ(-0.15)));
      const hg = b.group('head', S * 0.04);
      b.ellipsoid(hg, head, new Vec3(h * 0.8, 0, 0), new Vec3(h, h * 0.85, h * 0.92), 'primary', { ...bo, domain: Domain.Head });
      b.cone(bodyG, body, new Vec3(t * 0.3, t * 0.05, 0), t * 0.14, head, new Vec3(h * 0.2, 0, 0), t * 0.12, 'primary', bo);
      const pet = b.bone('petiole', body, Xform.at(-t * 0.5, 0, 0));
      b.ellipsoid(bodyG, pet, new Vec3(-t * 0.12, t * 0.05, 0), new Vec3(t * 0.13, t * 0.16, t * 0.11), 'primary', bo);
      const ab = b.bone('abdomen', pet, Xform.at(-t * 0.25, 0, 0, Mat3.rotZ(-0.25)));
      abdomen.push(ab);
      b.ellipsoid(b.group('abdomen', S * 0.04, { flags: GF.CreaseShade }), ab, new Vec3(-ga * 0.5, 0, 0), new Vec3(ga * 0.52, ga * 0.38, ga * 0.4), 'abdomen', { domain: Domain.Body, u0: 0, u1: 0.45, domainLen: S });
      const big = weapon === 'mandibles' ? 1.6 : 1;
      for (const side of [-1, 1]) {
        const mb = b.bone('mandible', head, Xform.at(h * 1.6, -h * 0.35, side * h * 0.35));
        jaws.push({ bone: mb, side, kind: 'mandible' });
        b.cone(b.group('mandible', 0.3, { side }), mb, Vec3.ZERO, h * 0.2, mb, new Vec3(h * 0.55 * big, -h * 0.05, -side * h * 0.3 * big), 0.4, 'jaw', { side, flags: PF.NoPattern });
      }
      eyesAt(head, [[new Vec3(h * 1.1, h * 0.3, -h * 0.75), new Vec3(0.4, 0.3, -1), h * 0.35], [new Vec3(h * 1.1, h * 0.3, h * 0.75), new Vec3(0.4, 0.3, 1), h * 0.35]]);
      antennae.push(...antennaPair(b, head, new Vec3(h * 1.3, h * 0.55, 0), h * 0.3, S * 0.3 * lerp(0.7, 1.3, g.f('antennae')), true));
      legAngles = [55, 90, 125];
      hipR = t * 0.22;
      break;
    }
    case 'beetle': {
      const pr = S * 0.2, h = S * 0.12 * hs, ab = S * 0.36 * abd;
      thick = S * 0.17;
      b.ellipsoid(bodyG, body, new Vec3(S * 0.06, S * 0.02, 0), new Vec3(pr * 0.8, pr * 0.62, pr), 'primary', { ...bo, u0: 0.55, u1: 0.8 });
      head = b.bone('head', body, Xform.at(S * 0.2, 0, 0));
      const hg = b.group('head', S * 0.03);
      b.ellipsoid(hg, head, new Vec3(h * 0.6, 0, 0), new Vec3(h * 0.85, h * 0.7, h * 0.95), 'primary', { ...bo, domain: Domain.Head });
      b.ellipsoid(bodyG, body, new Vec3(-ab * 0.55, 0, 0), new Vec3(ab * 0.85, S * 0.15, S * 0.22), 'primary', bo);
      if (weapon === 'horn') {
        b.cone(b.group('horn', S * 0.02), head, new Vec3(h * 0.8, h * 0.45, 0), h * 0.4, head, new Vec3(h * 2.2, h * 2.0, 0), 0.4, 'primary', { flags: PF.NoPattern });
        b.trait('horn');
      }
      const big = weapon === 'mandibles' ? 2.2 : 0.8;
      for (const side of [-1, 1]) {
        const mb = b.bone('mandible', head, Xform.at(h * 1.3, -h * 0.15, side * h * 0.35));
        jaws.push({ bone: mb, side, kind: 'mandible' });
        b.cone(b.group('mandible', 0.3, { side }), mb, Vec3.ZERO, h * 0.22 * Math.sqrt(big), mb, new Vec3(h * 0.7 * big, h * 0.1 * big, -side * h * 0.35 * big), 0.4, 'jaw', { side, flags: PF.NoPattern });
      }
      if (weapon === 'mandibles') b.trait('stag mandibles');
      eyesAt(head, [[new Vec3(h * 0.9, h * 0.2, -h * 0.7), new Vec3(0.5, 0.3, -1), h * 0.3], [new Vec3(h * 0.9, h * 0.2, h * 0.7), new Vec3(0.5, 0.3, 1), h * 0.3]]);
      antennae.push(...antennaPair(b, head, new Vec3(h * 1.2, h * 0.4, 0), h * 0.4, S * 0.18 * lerp(0.7, 1.4, g.f('antennae')), false));
      // shell cases (elytra) and the wings beneath them
      for (const side of [-1, 1]) {
        const eb = b.bone('elytron', body, Xform.at(-S * 0.04, S * 0.08, side * 0.3));
        elytra.push(eb);
        b.ellipsoid(b.group('elytron', 0, { side, depthBias: 0.05 }), eb, new Vec3(-ab * 0.6, -S * 0.04, side * S * 0.12), new Vec3(ab * 0.85, S * 0.16, S * 0.13), 'abdomen', { side, domain: Domain.Body, u0: 0, u1: 0.55, domainLen: S, clips: [{ n: new Vec3(0, 0, -side), d: 0 }] });
        const wb = b.bone('wing', body, Xform.at(-S * 0.08, S * 0.1, side * S * 0.05));
        wings.push(wb);
        const wg = b.group('wing', 0, { side, depthBias: -0.1 });
        wingGroups.push(wg);
        const wl = S * 0.8;
        b.tri(wg, wb, Vec3.ZERO, wb, new Vec3(-wl * 0.85, 0, side * wl * 0.22), wb, new Vec3(-wl * 0.35, 0, side * wl * 0.42), 'wing', { side, flags: PF.NoPattern | PF.NoShadow });
        b.tri(wg, wb, Vec3.ZERO, wb, new Vec3(-wl * 0.35, 0, side * wl * 0.42), wb, new Vec3(-wl * 0.05, 0, side * wl * 0.2), 'wing', { side, flags: PF.NoPattern | PF.NoShadow });
      }
      legAngles = [60, 95, 130];
      hipR = S * 0.12;
      legCentre = new Vec3(-S * 0.08, -S * 0.06, 0);
      break;
    }
    case 'scorpion': {
      const c = S * 0.22 * hs;
      thick = S * 0.07;
      b.ellipsoid(bodyG, body, Vec3.ZERO, new Vec3(c, c * 0.42, c * 0.78), 'primary', { ...bo, u0: 0.7, u1: 1 });
      // segmented body, then the tail curling up over the back
      let prev = body;
      const segL = S * 0.12;
      for (let i = 0; i < 4; i++) {
        const sb = b.bone('segment', prev, Xform.at(i ? -segL : -c * 0.7, 0, 0));
        abdomen.push(sb);
        const w = c * (0.85 - i * 0.1);
        b.ellipsoid(bodyG, sb, new Vec3(-segL * 0.5, 0, 0), new Vec3(segL * 0.62, c * 0.4, w), 'abdomen', { domain: Domain.Body, u0: 0.3 + i * 0.1, u1: 0.4 + i * 0.1, domainLen: S });
        prev = sb;
      }
      const tl = S * 0.13 * lerp(0.75, 1.3, g.f('tail'));
      const tr = Math.max(0.7, S * 0.055);
      const tg = b.group('tail', tr * 0.5);
      for (let i = 0; i < 5; i++) {
        const tb = b.bone('tail', prev, i ? Xform.at(tl, 0, 0, Mat3.rotZ(-0.5)) : Xform.at(-segL, 0, 0, Mat3.rotZ(Math.PI - 1.15)));
        tail.push(tb);
        b.cone(tg, tb, Vec3.ZERO, tr * (1 - i * 0.07), tb, new Vec3(tl, 0, 0), tr * (1 - (i + 1) * 0.07), 'abdomen', { domain: Domain.Tail, u0: i / 6, u1: (i + 1) / 6, domainLen: tl * 6 });
        prev = tb;
      }
      const tel = b.bone('telson', prev, Xform.at(tl, 0, 0, Mat3.rotZ(-0.5)));
      tail.push(tel);
      b.ellipsoid(tg, tel, new Vec3(tl * 0.35, 0, 0), new Vec3(tl * 0.45, tr * 1.1, tr * 1.0), 'abdomen', { domain: Domain.Tail, u0: 0.85, u1: 0.95, domainLen: tl * 6 });
      b.cone(b.group('sting', 0.2), tel, new Vec3(tl * 0.6, -tr * 0.2, 0), tr * 0.5, tel, new Vec3(tl * 0.95, -tr * 1.6, 0), 0.35, 'jaw', { flags: PF.NoPattern });
      // pincers
      const cs = lerp(1.0, 1.6, g.f('claws'));
      for (const side of [-1, 1]) {
        const shoulder = new Vec3(c * 0.75, 0, side * c * 0.45);
        const up = b.bone('arm', body, new Xform(Mat3.rotY(-side * 0.9).mul(Mat3.rotZ(0.35)), shoulder));
        const lo = b.bone('arm', up, Xform.at(S * 0.15 * cs, 0, 0, Mat3.rotY(side * 1.5).mul(Mat3.rotZ(-0.35))));
        const hand = b.bone('hand', lo, Xform.at(S * 0.15 * cs, 0, 0, Mat3.rotY(-side * 0.45)));
        const finger = b.bone('finger', hand, Xform.at(S * 0.1 * cs, 0, -side * S * 0.025 * cs));
        claws.push({ bones: [up, lo, hand], finger, side });
        const cg = b.group('claw', S * 0.02, { side });
        const ar = Math.max(0.6, S * 0.04 * cs);
        b.cone(cg, up, Vec3.ZERO, ar, lo, Vec3.ZERO, ar * 1.1, 'primary', { side, domain: Domain.Limb, domainLen: S * 0.4 });
        b.cone(cg, lo, Vec3.ZERO, ar * 1.1, hand, Vec3.ZERO, ar * 1.3, 'primary', { side, domain: Domain.Limb, domainLen: S * 0.4 });
        b.ellipsoid(cg, hand, new Vec3(S * 0.05 * cs, 0, 0), new Vec3(S * 0.1 * cs, S * 0.065 * cs, S * 0.08 * cs), 'primary', { side, domain: Domain.Limb, domainLen: S * 0.4 });
        b.cone(cg, hand, new Vec3(S * 0.1 * cs, 0, side * S * 0.025 * cs), ar, hand, new Vec3(S * 0.25 * cs, 0, side * S * 0.01), 0.4, 'primary', { side, flags: PF.NoPattern });
        b.cone(cg, finger, Vec3.ZERO, ar * 0.9, finger, new Vec3(S * 0.15 * cs, 0, side * S * 0.02), 0.4, 'primary', { side, flags: PF.NoPattern });
      }
      eyesAt(body, [[new Vec3(c * 0.5, c * 0.4, -c * 0.12), new Vec3(0.3, 1, -0.3), 1], [new Vec3(c * 0.5, c * 0.4, c * 0.12), new Vec3(0.3, 1, 0.3), 1]]);
      legAnchor = abdomen[0];
      legCentre = new Vec3(c * 0.1, 0, 0);
      legAngles = [55, 80, 105, 130];
      hipR = c * 0.55;
      break;
    }
  }

  // ---- legs
  const legs: ALeg[] = [];
  const anchorW = b.restWorld(legAnchor);
  const centreW = b.restWorld(body).point(legCentre);
  // spiders hold their knees high; the others walk on flatter, more extended legs
  const reach = legLen * { spider: 0.6, ant: 0.72, beetle: 0.8, scorpion: 0.8 }[type];
  const legBands = g.f('legBands');
  legAngles.forEach((deg, index) => {
    for (const side of [-1, 1]) {
      const a = deg * DEG;
      const dir = new Vec3(Math.cos(a), 0, side * Math.sin(a));
      const hipW = centreW.addScaled(dir, hipR).add(new Vec3(0, -thick * 0.2, 0));
      const tip = new Vec3(centreW.x + dir.x * (hipR + reach), 0, dir.z * (hipR + reach));
      const len: [number, number, number] = [legLen * 0.42, legLen * 0.46, legLen * 0.18];
      const ankle = tip.add(new Vec3(0, len[2] * 0.92, 0)).addScaled(dir, -len[2] * 0.3);
      const { mid, end } = twoBoneIK(hipW, ankle, len[0], len[1], new Vec3(0, 1.2, 0).addScaled(dir, 0.4));
      const l0 = b.boneAt('leg', legAnchor, segmentFrame(hipW, mid, Vec3.Y));
      const l1 = b.boneAt('leg', l0, segmentFrame(mid, end, Vec3.Y));
      const l2 = b.boneAt('leg', l1, segmentFrame(end, tip, dir));
      legs.push({ side, index, anchor: legAnchor, hip: anchorW.inverseRigid().point(hipW), hipW, bones: [l0, l1, l2], len, rest: tip });
      const lg = b.group('leg', legR * 0.6, { side, depthBias: -0.05 });
      const lo = { side, domain: Domain.Limb, domainLen: legLen, flags: PF.NoPattern | PF.Thin };
      const band = (t: number) => (legBands > 0.05 && Math.floor(t * 4 + 0.5) % 2 === 1 ? 'mark' : 'leg');
      const thickK = hairy ? 1.35 : 1;
      b.cone(lg, l0, Vec3.ZERO, legR * 1.15 * thickK, l1, Vec3.ZERO, legR * thickK, band(0), { ...lo, u0: 0, u1: 0.42 });
      b.cone(lg, l1, Vec3.ZERO, legR * thickK, l2, Vec3.ZERO, legR * 0.8 * thickK, band(0.5), { ...lo, u0: 0.42, u1: 0.88 });
      b.cone(lg, l2, Vec3.ZERO, legR * 0.8, l2, new Vec3(len[2], 0, 0), 0.4, band(1), { ...lo, flags: PF.NoPattern | PF.Thin | PF.ShadowCaster, u0: 0.88, u1: 1 });
    }
  });

  for (const t of [type, hairy ? 'hairy' : '', g.b('glowEyes') ? 'glowing eyes' : '', g.c('pattern') !== 'none' ? g.c('pattern') : '']) if (t) b.trait(t);

  const rig: ArthroRig = {
    kind: 'arthropod', type,
    bones: { body, head, abdomen, tail, antennae, jaws, claws, elytra, wings },
    legs,
    groups: { wings: wingGroups },
    dims: { S, bodyY, legLen, thick },
    traits: { energy: g.f('energy'), flies: type === 'beetle' },
  };
  const animator = new ArthropodAnimator(rig);
  const height = type === 'scorpion' ? bodyY + S * 0.55 : type === 'spider' ? bodyY + legLen * 0.45 : bodyY + S * 0.3;
  const anatomy = b.build({ height, walkSpeed: animator.clips.find((c) => c.id === 'walk')!.speed, runSpeed: animator.clips.find((c) => c.id === 'run')!.speed, length: S * 1.2 }, rig, clamp(S / 18, 0.6, 2));

  // ---- materials
  const style: StyleName = hairy ? 'fur' : 'chitin';
  const chitin = (c: Hex, st: StyleName = style): Material => ({ color: c, ramp: 'organic', style: st });
  const eyeGlow = g.b('glowEyes');
  const materials: Record<string, Material> = {
    primary: chitin(g.col('bodyColor')),
    abdomen: chitin(g.col('abdomenColor'), type === 'beetle' ? 'chitin' : style),
    leg: chitin(g.col('legColor')),
    mark: chitin(mixHex(g.col('legColor'), g.col('markColor'), 0.7)),
    marking: chitin(g.col('markColor')),
    jaw: { color: mixHex(g.col('bodyColor'), 0x1a1418, 0.6), ramp: 'dark', style: 'glossy' },
    eye: { color: g.col('eyeColor'), ramp: eyeGlow ? 'glow' : 'dark', style: eyeGlow ? 'emissive' : 'glossy', emissive: eyeGlow },
    wing: { color: g.col('wingColor'), ramp: 'organic', style: 'membrane' },
  };
  const slot = (n: string) => {
    const i = anatomy.slots.indexOf(n);
    return i >= 0 ? i : anatomy.slots.push(n) - 1;
  };
  const surface: SurfaceSpec = {
    pattern: g.c('pattern') as PatternKind, markSize: lerp(1.8, 4, g.f('markSize')), density: g.f('density'),
    seed: Math.floor(g.f('markSize') * 9973 + g.f('density') * 7919 + g.col('markColor')) >>> 0,
    countershade: 0, tips: 0, socks: 0, coat: [slot('abdomen')], markSlot: slot('marking'), bellySlot: -1, tipSlot: -1, domains: [Domain.Body, Domain.Tail],
  };
  return { anatomy, materials, surface, animator };
}

/** Two antennae: elbowed (ants) or straight with a club (beetles). Returns the bone chains. */
function antennaPair(b: AnatomyBuilder, head: number, at: Vec3, spread: number, len: number, elbowed: boolean): number[][] {
  const out: number[][] = [];
  const g = b.group('antennae', 0, { depthBias: 0.05 });
  for (const side of [-1, 1]) {
    const a0 = b.bone('antenna', head, new Xform(Mat3.rotY(-side * 0.5).mul(Mat3.rotZ(elbowed ? 1.0 : 0.6)), at.add(new Vec3(0, 0, side * spread))));
    const a1 = b.bone('antenna', a0, Xform.at(len * (elbowed ? 0.45 : 0.6), 0, 0, Mat3.rotZ(elbowed ? -1.4 : -0.3)));
    out.push([a0, a1]);
    const o = { side, flags: PF.NoPattern | PF.Thin };
    b.cone(g, a0, Vec3.ZERO, 0.45, a1, Vec3.ZERO, 0.4, 'leg', o);
    b.cone(g, a1, Vec3.ZERO, 0.4, a1, new Vec3(len * (elbowed ? 0.55 : 0.4), 0, 0), elbowed ? 0.4 : 0.6, 'leg', o);
  }
  return out;
}

export const arthropodFamily: Family = {
  id: 'arthropod',
  label: 'Bugs & spiders',
  description: 'Spiders, ants, beetles and scorpions: six or eight jointed legs walking in alternating tripods or tetrapods, fangs, mandibles, horns, pincers and a striking tail; beetles open their shells to fly; dead bugs flip over and curl up.',
  archetypes: ARCH.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    return genome.archetype === 'spider' && rng.chance(0.4) ? `${n} the ${rng.pick(['Weaver', 'Lurker', 'Widow'])}` : n;
  },
};
