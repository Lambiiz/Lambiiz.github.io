/**
 * A built creature: genome → anatomy, palette, surface patterns and animator, plus helpers to pose
 * and render single frames and to size a sprite cell that fits every frame of every clip.
 */

import { PrimKind } from '../anatomy/anatomy';
import { SkeletonPose } from '../anatomy/pose';
import { DEG, Mat3, Vec3 } from '../core/math';
import { Genes } from '../genome/schema';
import { Palette } from '../render/materials';
import { Frame, Renderer, worldToView, type RenderModel, type ViewSpec } from '../render/raster';
import type { Animator, ClipDef, Family, Genome } from './types';

export interface CreatureModel extends RenderModel {
  family: Family;
  genome: Genome;
  animator: Animator;
  scale: number;
}

export function buildModel(family: Family, genome: Genome, scale = 1): CreatureModel {
  const parts = family.build(new Genes(family.schema, genome.genes), genome, scale);
  const palette = new Palette(parts.anatomy.slots, parts.materials);
  return { family, genome, scale, anatomy: parts.anatomy, palette, surface: parts.surface, animator: parts.animator };
}

/** The eight facings, in sheet order. Yaw 0 faces east (screen right). */
export const DIRECTIONS = [
  { id: 's', label: 'South', yaw: -90 * DEG },
  { id: 'se', label: 'South-east', yaw: -45 * DEG },
  { id: 'e', label: 'East', yaw: 0 },
  { id: 'ne', label: 'North-east', yaw: 45 * DEG },
  { id: 'n', label: 'North', yaw: 90 * DEG },
  { id: 'nw', label: 'North-west', yaw: 135 * DEG },
  { id: 'w', label: 'West', yaw: 180 * DEG },
  { id: 'sw', label: 'South-west', yaw: -135 * DEG },
] as const;

export type DirId = (typeof DIRECTIONS)[number]['id'];

/** Normalised clip time of frame i (loops never repeat their first frame at the end). */
export function frameTime(clip: ClipDef, i: number): number {
  return clip.loop ? i / clip.frames : clip.frames <= 1 ? 0 : i / (clip.frames - 1);
}

export function poseAt(model: CreatureModel, clip: string, u: number, pose = new SkeletonPose(model.anatomy)): SkeletonPose {
  model.animator.pose(clip, u, pose);
  return pose;
}

export interface CellBox {
  w: number;
  h: number;
  /** Pixel position of the creature's ground origin inside the cell. */
  ox: number;
  oy: number;
}

/**
 * The smallest cell (plus margins for outline and shadow) that holds every frame of the given clips
 * in the given directions, with the ground origin at the same spot in every frame.
 */
export function cellBox(model: CreatureModel, elevation: number, clips: ClipDef[] = model.animator.clips, dirs: readonly { yaw: number }[] = DIRECTIONS): CellBox {
  const an = model.anatomy;
  const pose = new SkeletonPose(an);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  const wv = worldToView(elevation);
  const mats = dirs.map((d) => wv.mul(Mat3.rotY(d.yaw)));
  const pts: [Vec3, number][] = [];
  for (const clip of clips) {
    for (let i = 0; i < clip.frames; i++) {
      model.animator.pose(clip.id, frameTime(clip, i), pose);
      pts.length = 0;
      for (const p of an.prims) {
        if (pose.hide.has(p.group) || an.scale < p.minScale) continue;
        if (p.kind === PrimKind.Ellipsoid) pts.push([pose.world[p.boneA].point(p.a), Math.max(p.radii.x, p.radii.y, p.radii.z)]);
        else if (p.kind === PrimKind.Cone) {
          pts.push([pose.world[p.boneA].point(p.a), p.ra]);
          pts.push([pose.world[p.boneB].point(p.b), p.rb]);
        } else {
          pts.push([pose.world[p.boneA].point(p.a), 0.5], [pose.world[p.boneB].point(p.b), 0.5], [pose.world[p.boneC].point(p.c), 0.5]);
        }
      }
      for (const m of mats) {
        for (const [c, r] of pts) {
          const v = m.apply(c);
          x0 = Math.min(x0, v.x - r); x1 = Math.max(x1, v.x + r);
          y0 = Math.min(y0, v.y - r); y1 = Math.max(y1, v.y + r);
          // the ground shadow under the part
          const g = m.apply(new Vec3(c.x, 0, c.z));
          y0 = Math.min(y0, g.y - r * 0.8);
        }
      }
    }
  }
  if (!Number.isFinite(x0)) return { w: 16, h: 16, ox: 8, oy: 12 };
  const m = 3;
  const left = Math.ceil(-x0) + m, right = Math.ceil(x1) + m;
  const half = Math.max(left, right);
  const top = Math.ceil(y1) + m, bottom = Math.ceil(-y0) + m;
  return { w: half * 2, h: top + bottom, ox: half, oy: top };
}

/** Renders one frame into a fresh (or given) frame buffer. */
export function renderPose(renderer: Renderer, model: CreatureModel, pose: SkeletonPose, yaw: number, box: CellBox, view: Partial<ViewSpec> & { elevation: number }, frame?: Frame): Frame {
  const f = frame && frame.w === box.w && frame.h === box.h ? frame : new Frame(box.w, box.h, box.ox, box.oy);
  renderer.render(model, pose, { yaw, elevation: view.elevation, shadow: view.shadow ?? true, outline: view.outline ?? true, offset: view.offset }, f);
  return f;
}
