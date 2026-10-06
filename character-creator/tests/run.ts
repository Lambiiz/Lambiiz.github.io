/**
 * `npm test`: checks the engine without a browser.
 *
 *  - random streams, maths and IK basics;
 *  - the rasterised silhouette of a round cone against a brute-force convex hull;
 *  - every family × archetype × a few seeds builds, poses every frame of every clip with finite
 *    transforms and renders non-empty frames;
 *  - rendering is deterministic, genomes survive JSON / share-code round trips;
 *  - looping clips are seamless (the pose at u = 1 equals the pose at u = 0);
 *  - planted feet do not slide: they move backwards at exactly the clip's ground speed.
 */

import { AnatomyBuilder } from '../src/anatomy/builder';
import { SkeletonPose } from '../src/anatomy/pose';
import type { ArthroRig } from '../src/anim/arthropod';
import type { FlyerRig } from '../src/anim/flyer';
import type { QuadRig } from '../src/anim/quadruped';
import { Mat3, Vec3, Xform, twoBoneIK } from '../src/core/math';
import { Rng, deriveSeed, hashString } from '../src/core/rng';
import { FAMILIES, FAMILY_MAP } from '../src/families';
import { crossover, genomeFromCode, genomeFromJSON, genomeToCode, genomeToJSON, mutate, newGenome } from '../src/genome/ops';
import { DIRECTIONS, buildModel, cellBox, frameTime, poseAt, renderPose, type CreatureModel } from '../src/model/model';
import { Palette } from '../src/render/materials';
import { Frame, Renderer } from '../src/render/raster';
import { NO_SURFACE } from '../src/render/surface';

let failures = 0, checks = 0;
const t0 = performance.now();

function check(ok: boolean, msg: string): void {
  checks++;
  if (!ok) {
    failures++;
    if (failures <= 40) console.error('  ✗ ' + msg);
  }
}

function section(name: string, fn: () => void | Promise<void>): Promise<void> {
  const before = failures;
  return Promise.resolve(fn()).then(() => console.log(`${failures === before ? '✓' : '✗'} ${name}`));
}

const hashPixels = (f: Frame): number => {
  let h = 2166136261;
  for (let i = 0; i < f.pixels.length; i++) h = Math.imul(h ^ f.pixels[i], 16777619);
  return h >>> 0;
};

// ------------------------------------------------------------------------------------------------

await section('random streams and maths', () => {
  const a = new Rng(1234), b = new Rng(1234);
  let same = true;
  for (let i = 0; i < 100; i++) same &&= a.next() === b.next();
  check(same, 'Rng is not deterministic');
  check(deriveSeed(7, 'anatomy') !== deriveSeed(7, 'color'), 'derived seeds collide');
  check(hashString('abc') === hashString('abc') && hashString('abc') !== hashString('abd'), 'hashString');
  const r = Mat3.ypr(0.4, -0.3, 1.1);
  const ri = r.inverse();
  const p = new Vec3(1.5, -2, 0.25);
  check(ri.apply(r.apply(p)).sub(p).length < 1e-9, 'Mat3.inverse');
  for (let i = 0; i < 50; i++) {
    const rng = new Rng(i + 1);
    const root = new Vec3(rng.range(-5, 5), rng.range(-5, 5), rng.range(-5, 5));
    const target = root.add(new Vec3(rng.range(-6, 6), rng.range(-6, 6), rng.range(-6, 6)));
    const l1 = rng.range(2, 5), l2 = rng.range(2, 5);
    const { mid, end } = twoBoneIK(root, target, l1, l2, new Vec3(0, 1, 0));
    check(Math.abs(Vec3.dist(root, mid) - l1) < 1e-6 && Math.abs(Vec3.dist(mid, end) - l2) < 1e-6, 'IK changes bone lengths');
    const reach = Vec3.dist(root, target);
    if (reach < (l1 + l2) * 0.99 && reach > Math.abs(l1 - l2) + 0.01) check(Vec3.dist(end, target) < 1e-6, 'IK misses a reachable target');
  }
});

await section('round cone silhouette matches the brute-force hull', () => {
  const cases: [Vec3, number, Vec3, number][] = [
    [new Vec3(-6, 2, 0), 3, new Vec3(7, -3, 2), 1.5],
    [new Vec3(0, -5, 1), 1, new Vec3(1, 6, -2), 4],
    [new Vec3(-2, 0, 0), 5, new Vec3(1, 1, 0), 2],
  ];
  const renderer = new Renderer();
  for (const [a, ra, c, rc] of cases) {
    const b = new AnatomyBuilder(1);
    const root = b.bone('root', -1, Xform.I);
    b.cone(b.group('g', 0), root, a, ra, root, c, rc, 'x', { flags: 0 });
    const an = b.build({ height: 10, walkSpeed: 0, runSpeed: 0, length: 10 }, null);
    const model = { anatomy: an, palette: new Palette(an.slots, { x: { color: 0x8080c0, ramp: 'cloth', style: 'matte' } }), surface: NO_SURFACE };
    const W = 40, H = 40, ox = 20, oy = 20;
    const f = new Frame(W, H, ox, oy);
    renderer.render(model, new SkeletonPose(an), { yaw: 0, elevation: 0, shadow: false, outline: false }, f);
    // brute force: the projection of a round cone is the 2D convex hull of the two end circles
    const pts: [number, number][] = [];
    for (let k = 0; k < 720; k++) {
      const t = (k / 720) * Math.PI * 2;
      pts.push([a.x + ra * Math.cos(t), a.y + ra * Math.sin(t)], [c.x + rc * Math.cos(t), c.y + rc * Math.sin(t)]);
    }
    const hull = convexHull(pts);
    let bad = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const vx = x + 0.5 - ox, vy = oy - (y + 0.5);
        const d = hullDistance(hull, vx, vy);
        if (Math.abs(d) < 0.75) continue; // boundary pixels may go either way
        const inside = d < 0;
        if (inside !== (f.pixels[y * W + x] !== 0)) bad++;
      }
    }
    check(bad === 0, `round cone silhouette differs in ${bad} pixels`);
  }
});

// ------------------------------------------------------------------------------------------------

const SEEDS = [1, 2, 3];
const models: CreatureModel[] = [];

await section('every family and archetype builds, poses and renders', () => {
  const renderer = new Renderer();
  for (const fam of FAMILIES) {
    for (const arch of fam.archetypes) {
      for (const seed of SEEDS) {
        const tag = `${fam.id}/${arch.id}#${seed}`;
        let model: CreatureModel;
        try {
          model = buildModel(fam, newGenome(fam, seed, arch.id));
        } catch (e) {
          check(false, `${tag} failed to build: ${(e as Error).message}`);
          continue;
        }
        models.push(model);
        const an = model.anatomy;
        check(an.prims.length > 0 && an.bones.length > 0, `${tag} is empty`);
        check(Number.isFinite(an.metrics.height) && an.metrics.height > 0, `${tag} has no height`);
        check(model.animator.clips.some((c) => c.id === 'idle') && model.animator.clips.some((c) => c.id === 'walk'), `${tag} lacks idle or walk`);
        const box = cellBox(model, 30 * Math.PI / 180);
        check(box.w > 0 && box.h > 0 && box.w < 400 && box.h < 400, `${tag} has an odd cell ${box.w}×${box.h}`);
        const pose = new SkeletonPose(an);
        for (const clip of model.animator.clips) {
          check(clip.frames > 0 && clip.fps > 0 && Number.isFinite(clip.speed) && clip.speed >= 0, `${tag} clip ${clip.id} has bad timing`);
          for (let i = 0; i < clip.frames; i++) {
            poseAt(model, clip.id, frameTime(clip, i), pose);
            const finite = pose.world.every((w) => w.origin.isFinite() && w.basis.c0.isFinite() && w.basis.c1.isFinite() && w.basis.c2.isFinite());
            check(finite, `${tag} ${clip.id} frame ${i} has non-finite bones`);
            if (!finite) break;
            if (seed !== 1 || (i !== 0 && i !== Math.floor(clip.frames / 2))) continue;
            for (const d of [DIRECTIONS[0], DIRECTIONS[2], DIRECTIONS[5]]) {
              const f = renderPose(renderer, model, pose, d.yaw, box, { elevation: 30 * Math.PI / 180 });
              let n = 0;
              for (let k = 0; k < f.pixels.length; k++) if (f.pixels[k] !== 0) n++;
              check(n > 12, `${tag} ${clip.id} frame ${i} ${d.id} renders only ${n} pixels`);
            }
          }
        }
      }
    }
  }
  console.log(`    ${models.length} creatures from ${FAMILIES.length} families`);
});

await section('rendering is deterministic and genomes round-trip', async () => {
  const renderer = new Renderer();
  for (const fam of FAMILIES) {
    const g = newGenome(fam, 4242);
    const render = () => {
      const m = buildModel(fam, g);
      const box = cellBox(m, 0.5);
      const pose = poseAt(m, 'walk', 0.25);
      return hashPixels(renderPose(renderer, m, pose, DIRECTIONS[1].yaw, box, { elevation: 0.5 }));
    };
    check(render() === render(), `${fam.id} renders differently twice`);
    const back = genomeFromJSON(genomeToJSON(g), FAMILY_MAP);
    check(JSON.stringify(back.genes) === JSON.stringify(JSON.parse(genomeToJSON(g)).genes), `${fam.id} JSON round trip`);
    const code = await genomeToCode(g);
    const fromCode = await genomeFromCode(code, FAMILY_MAP);
    check(genomeToJSON(fromCode) === genomeToJSON(back), `${fam.id} share code round trip`);
    const child = mutate(fam, g, 99, 0.6, new Set());
    const mix = crossover(fam, g, newGenome(fam, 77), 5);
    for (const x of [child, mix]) {
      try {
        buildModel(fam, x);
        check(true, '');
      } catch (e) {
        check(false, `${fam.id} offspring failed to build: ${(e as Error).message}`);
      }
    }
  }
});

await section('looping clips are seamless', () => {
  for (const model of models.filter((_, i) => i % 3 === 0)) {
    const a = new SkeletonPose(model.anatomy), b = new SkeletonPose(model.anatomy);
    for (const clip of model.animator.clips.filter((c) => c.loop)) {
      model.animator.pose(clip.id, 0, a);
      model.animator.pose(clip.id, 1, b);
      let worst = 0;
      for (let i = 0; i < a.world.length; i++) worst = Math.max(worst, Vec3.dist(a.world[i].origin, b.world[i].origin));
      check(worst < 0.25, `${model.family.id}/${model.genome.archetype} ${clip.id} jumps ${worst.toFixed(2)} px at the loop point`);
    }
  }
});

await section('planted feet do not slide', () => {
  for (const model of models) {
    const rig = model.anatomy.rig as { kind: string };
    let feet: { bone: number; tip: Vec3 }[] = [];
    let clips = ['walk'];
    if (rig.kind === 'quad') {
      feet = (rig as QuadRig).legs.map((l) => ({ bone: l.bones[2], tip: new Vec3(l.len[2], 0, 0) }));
      clips = ['walk', 'trot', 'run'];
    } else if (rig.kind === 'arthropod') {
      feet = (rig as ArthroRig).legs.map((l) => ({ bone: l.bones[2], tip: new Vec3(l.len[2], 0, 0) }));
      clips = ['walk', 'run'];
    } else if (rig.kind === 'flyer' && !(rig as FlyerRig).bat && !(rig as FlyerRig).traits.hopper) {
      feet = (rig as FlyerRig).bones.legs.map((l) => ({ bone: l.bones[2], tip: Vec3.ZERO }));
    } else continue;
    const pose = new SkeletonPose(model.anatomy);
    for (const id of clips) {
      const clip = model.animator.clips.find((c) => c.id === id);
      if (!clip) continue;
      const n = 96, dur = clip.frames / clip.fps;
      const track = feet.map(() => [] as Vec3[]);
      for (let k = 0; k <= n; k++) {
        model.animator.pose(id, k / n, pose);
        feet.forEach((f, i) => track[i].push(pose.world[f.bone].point(f.tip)));
      }
      let worst = 0;
      for (const tr of track) {
        const low = Math.min(...tr.map((p) => p.y));
        for (let k = 0; k < n; k++) {
          // both samples on the ground (an interval that straddles lift-off is not a slide)
          if (tr[k].y > low + 0.002 || tr[k + 1].y > low + 0.002) continue;
          const v = (tr[k + 1].x - tr[k].x) / (dur / n);
          worst = Math.max(worst, Math.abs(v + clip.speed));
        }
      }
      check(worst < Math.max(0.5, clip.speed * 0.06), `${model.family.id}/${model.genome.archetype} ${id}: planted feet slide (${worst.toFixed(2)} px/s off ${clip.speed})`);
    }
  }
});

// ------------------------------------------------------------------------------------------------

function convexHull(points: [number, number][]): [number, number][] {
  const p = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [], upper: [number, number][] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  for (const q of p.reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Signed distance to a convex polygon (counter-clockwise), negative inside. */
function hullDistance(h: [number, number][], x: number, y: number): number {
  let inside = true, best = Infinity;
  for (let i = 0; i < h.length; i++) {
    const [ax, ay] = h[i], [bx, by] = h[(i + 1) % h.length];
    const ex = bx - ax, ey = by - ay;
    if (ex * (y - ay) - ey * (x - ax) < 0) inside = false;
    const t = Math.max(0, Math.min(1, ((x - ax) * ex + (y - ay) * ey) / (ex * ex + ey * ey)));
    best = Math.min(best, Math.hypot(x - ax - ex * t, y - ay - ey * t));
  }
  return inside ? -best : best;
}

console.log(`\n${checks} checks, ${failures} failed (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
if (failures) throw new Error(`${failures} checks failed`);
