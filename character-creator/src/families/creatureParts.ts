/**
 * Reusable creature parts: heads (cranium, snout, jaw, nose, eyes), ears, horns and antlers, tails,
 * manes, dorsal spikes and membrane wings. Families combine them with their own body plans.
 */

import { Domain, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { Mat3, Vec3, Xform, lerp } from '../core/math';

export type EarKind = 'none' | 'pointed' | 'round' | 'floppy' | 'long' | 'tufted';
export type HornKind = 'none' | 'short' | 'curved' | 'ram' | 'antlers' | 'unicorn' | 'dragon';

export interface HeadSpec {
  parent: number;
  /** Head bone origin (back of the skull) in the parent's frame, and its orientation. */
  at: Vec3;
  rot: Mat3;
  skullR: number;
  width: number;
  snoutLen: number;
  snoutR: number;
  snoutDrop: number;
  /** 0 = eyes face forward (predators) … 1 = on the sides (prey). */
  eyeSide: number;
  eyeSize: number;
  eyeStyle: string;
  ears: EarKind;
  earSize: number;
  horns: HornKind;
  hornSize: number;
  tusks: boolean;
  slot: string;
  group: number;
  side?: number;
}

export interface HeadResult {
  head: number;
  jaw: number;
  ears: number[];
}

export function buildHead(b: AnatomyBuilder, s: HeadSpec): HeadResult {
  const head = b.bone('head', s.parent, new Xform(s.rot, s.at));
  const r = s.skullR, w = s.width;
  const o = { domain: Domain.Head, domainLen: r * 3 };
  const g = s.group;
  b.ellipsoid(g, head, new Vec3(r * 0.9, r * 0.15, 0), new Vec3(r * 1.05, r * 0.92, r * 0.86 * w), s.slot, o);
  const sx = r * 1.35;
  const tip = new Vec3(sx + s.snoutLen, -r * 0.12 - s.snoutDrop, 0);
  if (s.snoutLen > r * 0.15) {
    b.cone(g, head, new Vec3(sx - r * 0.2, -r * 0.05, 0), s.snoutR, head, tip, s.snoutR * 0.72, s.slot, { ...o, tag: 'snout' });
    b.ellipsoid(g, head, tip.add(new Vec3(-s.snoutR * 0.15, s.snoutR * 0.3, 0)), new Vec3(s.snoutR * 0.45, s.snoutR * 0.38, s.snoutR * 0.5), 'nose', { ...o, flags: PF.NoPattern });
  }
  // jaw (opens) and a dark mouth inside
  const jaw = b.bone('jaw', head, Xform.at(r * 1.05, -r * 0.5, 0));
  const jl = Math.max(r * 0.5, s.snoutLen + r * 0.3);
  b.ellipsoid(g, jaw, new Vec3(jl * 0.5, 0, 0), new Vec3(jl * 0.55, Math.max(0.6, s.snoutR * 0.42), s.snoutR * 0.78 * w), s.slot, { ...o, domain: Domain.Belly });
  b.ellipsoid(b.group('mouth', 0, { depthBias: -0.6, flags: 0 }), head, new Vec3(sx + s.snoutLen * 0.4, -r * 0.42 - s.snoutDrop * 0.5, 0), new Vec3(s.snoutLen * 0.5 + r * 0.2, s.snoutR * 0.45, s.snoutR * 0.55), 'mouth', { flags: PF.NoPattern | PF.NoShadow });
  if (s.tusks) {
    for (const side of [-1, 1]) b.cone(g, jaw, new Vec3(jl * 0.8, 0, side * s.snoutR * 0.6), r * 0.12, jaw, new Vec3(jl * 0.95, r * 0.55, side * s.snoutR * 0.85), r * 0.04, 'horn', { side, flags: PF.NoPattern });
  }
  // eyes
  const es = s.eyeSide;
  for (const side of [-1, 1]) {
    b.feature('eye', head, new Vec3(r * lerp(1.55, 1.25, es), r * 0.38, side * r * lerp(0.48, 0.7, es) * w), new Vec3(lerp(1, 0.3, es), 0.25, side * lerp(0.45, 1, es)), s.eyeSize, { style: s.eyeStyle, side, slot: 'eye' });
  }
  // ears
  const ears: number[] = [];
  if (s.ears !== 'none') {
    for (const side of [-1, 1]) {
      const eb = b.bone('ear', head, Xform.at(r * 0.7, r * 0.78, side * r * 0.52 * w));
      ears.push(eb);
      const es2 = s.earSize, eg = b.group('ear', r * 0.12, { side });
      const eo = { side, domain: Domain.Head, domainLen: r };
      switch (s.ears) {
        case 'pointed':
        case 'tufted':
          b.cone(eg, eb, Vec3.ZERO, r * 0.32 * es2, eb, new Vec3(-r * 0.12, r * 0.85 * es2, side * r * 0.2 * es2), r * 0.06, s.slot, eo);
          if (s.ears === 'tufted') b.ellipsoid(eg, eb, new Vec3(-r * 0.12, r * 0.9 * es2, side * r * 0.2 * es2), new Vec3(r * 0.08, r * 0.2, r * 0.08), 'marking', eo);
          break;
        case 'round':
          b.ellipsoid(eg, eb, new Vec3(-r * 0.05, r * 0.2 * es2, side * r * 0.05), new Vec3(r * 0.16 * es2, r * 0.26 * es2, r * 0.26 * es2), s.slot, eo);
          break;
        case 'floppy':
          b.ellipsoid(eg, eb, new Vec3(-r * 0.15, -r * 0.45 * es2, side * r * 0.32), new Vec3(r * 0.3 * es2, r * 0.6 * es2, r * 0.12), s.slot, { ...eo, rot: Mat3.rotZ(0.15) });
          break;
        case 'long':
          b.cone(eg, eb, Vec3.ZERO, r * 0.22 * es2, eb, new Vec3(-r * 0.3, r * 1.6 * es2, side * r * 0.25), r * 0.1, s.slot, eo);
          break;
      }
    }
  }
  buildHorns(b, head, s, r, w);
  return { head, jaw, ears };
}

function buildHorns(b: AnatomyBuilder, head: number, s: HeadSpec, r: number, w: number): void {
  if (s.horns === 'none') return;
  const k = s.hornSize;
  const o = { flags: PF.NoPattern };
  for (const side of [-1, 1]) {
    if (s.horns === 'unicorn' && side > 0) break;
    const g = b.group('horn', r * 0.1, { side: s.horns === 'unicorn' ? 0 : side, depthBias: 0.1 });
    const base = new Vec3(r * 1.0, r * 0.75, s.horns === 'unicorn' ? 0 : side * r * 0.42 * w);
    const chain = (pts: Vec3[], r0: number) => {
      for (let i = 0; i < pts.length - 1; i++) b.cone(g, head, pts[i], r0 * (1 - i / pts.length), head, pts[i + 1], r0 * (1 - (i + 1) / pts.length) + 0.05, 'horn', { ...o, side });
    };
    const P = (x: number, y: number, z: number) => base.add(new Vec3(x * r * k, y * r * k, side * z * r * k));
    switch (s.horns) {
      case 'short':
        chain([base, P(-0.1, 0.5, 0.15)], r * 0.18 * k);
        break;
      case 'curved':
        chain([base, P(-0.05, 0.25, 0.55), P(0.15, 0.75, 0.75), P(0.35, 1.05, 0.55)], r * 0.2 * k);
        break;
      case 'ram':
        chain([base, P(-0.55, 0.3, 0.35), P(-0.75, -0.25, 0.55), P(-0.35, -0.6, 0.6), P(0.05, -0.35, 0.5)], r * 0.26 * k);
        break;
      case 'antlers': {
        const beam = [base, P(-0.2, 0.7, 0.35), P(-0.35, 1.4, 0.6), P(-0.25, 2.0, 0.75)];
        chain(beam, r * 0.13 * k);
        for (const [i, t] of [[1, 0.5], [2, 0.6]] as const) b.cone(g, head, beam[i], r * 0.07 * k, head, beam[i].add(new Vec3(r * 0.35 * k * t * 1.6, r * 0.45 * k * t, side * r * 0.05)), r * 0.03, 'horn', { ...o, side });
        break;
      }
      case 'unicorn':
        chain([new Vec3(r * 1.35, r * 0.7, 0), new Vec3(r * 1.35 + r * 0.55 * k, r * 0.7 + r * 1.5 * k, 0)], r * 0.16 * k);
        break;
      case 'dragon':
        chain([base, P(-0.6, 0.35, 0.2), P(-1.3, 0.55, 0.3), P(-1.8, 0.55, 0.3)], r * 0.22 * k);
        break;
    }
  }
}

export type TailKind = 'none' | 'thin' | 'bushy' | 'tufted' | 'stub' | 'hair' | 'long' | 'spiked' | 'fan';

/** Tail bones: a chain leaving `parent` at `at`, pointing back (−X) and tilted by `pitch` (+ up). */
export function tailBones(b: AnatomyBuilder, parent: number, at: Vec3, count: number, seg: number, pitch: number, curl: number): number[] {
  const out: number[] = [];
  let p = parent;
  for (let i = 0; i < count; i++) {
    const bi = b.bone('tail' + i, p, i === 0 ? new Xform(Mat3.rotZ(Math.PI - pitch), at) : Xform.at(seg, 0, 0, Mat3.rotZ(-curl)));
    out.push(bi);
    p = bi;
  }
  return out;
}

export function buildTail(b: AnatomyBuilder, bones: number[], kind: TailKind, r0: number, seg: number, slot: string, hairSlot = 'hair'): void {
  if (kind === 'none' || !bones.length) return;
  const g = b.group('tail', r0 * 0.4, { depthBias: -0.05 });
  const n = bones.length;
  const pt = (i: number) => (i < n ? { bone: bones[i], p: Vec3.ZERO } : { bone: bones[n - 1], p: new Vec3(seg, 0, 0) });
  const taper = kind === 'long' || kind === 'spiked' ? 0.85 : kind === 'bushy' ? 0.2 : 0.65;
  const o = (t0: number, t1: number) => ({ domain: Domain.Tail, u0: t0, u1: t1, domainLen: seg * n });
  if (kind === 'stub') {
    b.ellipsoid(g, bones[0], new Vec3(r0 * 0.6, 0, 0), new Vec3(r0 * 1.1, r0 * 0.8, r0 * 0.8), slot, o(0, 1));
    return;
  }
  if (kind === 'hair') {
    // horse tail: a short dock, then a long fall of hair
    b.cone(g, bones[0], Vec3.ZERO, r0, bones[1] ?? bones[0], Vec3.ZERO, r0 * 0.7, slot, o(0, 0.3));
    b.ellipsoid(g, bones[Math.min(1, n - 1)], new Vec3(seg * 1.1, 0, 0), new Vec3(seg * 1.3, r0 * 1.2, r0 * 1.0), hairSlot, { ...o(0.3, 1), flags: PF.NoPattern });
    return;
  }
  for (let i = 0; i < n; i++) {
    const a = pt(i), c = pt(i + 1);
    const ra = r0 * (1 - (i / n) * taper), rb = r0 * (1 - ((i + 1) / n) * taper);
    b.cone(g, a.bone, a.p, ra, c.bone, c.p, Math.max(0.4, rb), slot, o(i / n, (i + 1) / n));
    if (kind === 'bushy') b.ellipsoid(g, a.bone, new Vec3(seg * 0.5, 0, 0), new Vec3(seg * 0.75, r0 * (1.4 - i * 0.1), r0 * (1.4 - i * 0.1)), slot, o(i / n, (i + 1) / n));
    if (kind === 'spiked' && i < n - 1) b.cone(b.group('spike', 0), a.bone, new Vec3(seg * 0.5, ra * 0.8, 0), ra * 0.35, a.bone, new Vec3(seg * 0.3, ra * 1.9, 0), 0.3, 'horn', { flags: PF.NoPattern });
  }
  const last = bones[n - 1];
  if (kind === 'tufted') b.ellipsoid(g, last, new Vec3(seg * 1.05, 0, 0), new Vec3(r0 * 1.3, r0 * 0.9, r0 * 0.9), hairSlot, { ...o(0.95, 1), flags: PF.NoPattern });
  if (kind === 'fan') b.ellipsoid(g, last, new Vec3(seg * 0.9, 0, 0), new Vec3(r0 * 2.2, r0 * 0.4, r0 * 1.8), slot, o(0.9, 1));
}

/** Membrane wings (dragons, bats): three-bone arms with a skin stretched between finger tips and body. */
export function buildMembraneWings(b: AnatomyBuilder, parent: number, root: Vec3, span: number, bodyAttach: { bone: number; p: Vec3 }, slots: { bone: string; membrane: string }): number[][] {
  const chains: number[][] = [];
  for (const side of [-1, 1]) {
    // wing frame: X outwards along the arm, Y up, Z backwards for the right wing
    const base = new Xform(Mat3.rotY(-side * Math.PI / 2).mul(Mat3.rotZ(0.35)), root.with({ z: side * Math.abs(root.z) }));
    const w0 = b.bone('wing', parent, base);
    const w1 = b.bone('wing', w0, Xform.at(span * 0.3, 0, 0, Mat3.rotZ(-0.25)));
    const w2 = b.bone('wing', w1, Xform.at(span * 0.35, 0, 0, Mat3.rotZ(-0.3)));
    chains.push([w0, w1, w2]);
    const g = b.group('wing', span * 0.02, { side });
    const r = Math.max(0.6, span * 0.025);
    const o = { side, flags: PF.NoPattern };
    b.cone(g, w0, Vec3.ZERO, r * 1.3, w1, Vec3.ZERO, r, slots.bone, o);
    b.cone(g, w1, Vec3.ZERO, r, w2, Vec3.ZERO, r * 0.8, slots.bone, o);
    // fingers fan out from the wrist (Z of the wing frame points back for both sides after mirroring)
    const fz = side;
    const f1 = new Vec3(span * 0.32, span * 0.06, 0), f2 = new Vec3(span * 0.26, -span * 0.02, -fz * span * 0.22), f3 = new Vec3(span * 0.1, -span * 0.04, -fz * span * 0.38);
    for (const f of [f1, f2, f3]) b.cone(g, w2, Vec3.ZERO, r * 0.8, w2, f, 0.35, slots.bone, { ...o, flags: o.flags | PF.Thin });
    const mo = { side, domain: Domain.Wing, flags: PF.NoPattern | PF.NoShadow };
    const gm = b.group('membrane', 0, { side, depthBias: -0.05 });
    b.tri(gm, w2, Vec3.ZERO, w2, f1, w2, f2, slots.membrane, mo);
    b.tri(gm, w2, Vec3.ZERO, w2, f2, w2, f3, slots.membrane, mo);
    b.tri(gm, w1, Vec3.ZERO, w2, Vec3.ZERO, w2, f3, slots.membrane, mo);
    b.tri(gm, w1, Vec3.ZERO, w2, f3, bodyAttach.bone, bodyAttach.p.with({ z: side * Math.abs(bodyAttach.p.z) }), slots.membrane, mo);
    b.tri(gm, w0, Vec3.ZERO, w1, Vec3.ZERO, bodyAttach.bone, bodyAttach.p.with({ z: side * Math.abs(bodyAttach.p.z) }), slots.membrane, mo);
  }
  return chains;
}

/** A row of spikes or plates along bones (dragons, boars' bristles, stegosaur plates). */
export function buildSpikes(b: AnatomyBuilder, points: { bone: number; p: Vec3; size: number }[], slot: string): void {
  const g = b.group('spikes', 0, { depthBias: -0.1 });
  for (const { bone, p, size } of points) b.cone(g, bone, p, size * 0.35, bone, p.add(new Vec3(-size * 0.35, size, 0)), 0.3, slot, { flags: PF.NoPattern });
}
