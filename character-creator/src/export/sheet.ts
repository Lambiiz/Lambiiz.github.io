/**
 * Sprite sheets: every selected clip in every selected direction, one row per (clip, direction),
 * one column per frame, all cells the same size with the ground origin (pivot) at the same spot.
 * The JSON metadata describes rows, timing, pivot and ground speed so a game can play the clips
 * and move the sprite without foot sliding.
 */

import { DEG } from '../core/math';
import { GENOME_FORMAT, type Family, type Genome } from '../model/types';
import { DIRECTIONS, buildModel, cellBox, frameTime, poseAt, renderPose } from '../model/model';
import { Renderer } from '../render/raster';

export interface SheetOptions {
  scale: number;
  elevationDeg: number;
  dirs: string[];
  clips: string[];
  shadow: boolean;
  outline: boolean;
}

export interface SheetMeta {
  format: 'pixel-creature-sheet';
  version: 1;
  name: string;
  family: string;
  archetype: string;
  image: { w: number; h: number };
  frame: { w: number; h: number };
  /** Where the creature's ground point sits inside every cell. */
  pivot: { x: number; y: number };
  elevationDeg: number;
  directions: { id: string; yawDeg: number }[];
  clips: Record<string, { label: string; frames: number; fps: number; loop: boolean; speedPxPerSec: number; rows: Record<string, number> }>;
  genome: Genome;
}

export interface SheetResult {
  pixels: Uint32Array;
  w: number;
  h: number;
  meta: SheetMeta;
}

export function renderSheet(family: Family, genome: Genome, o: SheetOptions, progress?: (done: number, total: number) => void): SheetResult {
  const model = buildModel(family, genome, o.scale);
  const clips = model.animator.clips.filter((c) => o.clips.includes(c.id));
  const dirs = DIRECTIONS.filter((d) => o.dirs.includes(d.id));
  const elevation = o.elevationDeg * DEG;
  const box = cellBox(model, elevation, clips, dirs);
  const cols = Math.max(1, ...clips.map((c) => c.frames));
  const rows = clips.length * dirs.length;
  const W = cols * box.w, H = rows * box.h;
  const pixels = new Uint32Array(W * H);
  const renderer = new Renderer();
  const total = clips.reduce((n, c) => n + c.frames, 0) * dirs.length;
  let done = 0;
  const meta: SheetMeta = {
    format: 'pixel-creature-sheet', version: 1, name: genome.name, family: family.id, archetype: genome.archetype,
    image: { w: W, h: H }, frame: { w: box.w, h: box.h }, pivot: { x: box.ox, y: box.oy }, elevationDeg: o.elevationDeg,
    directions: dirs.map((d) => ({ id: d.id, yawDeg: Math.round(d.yaw / DEG) })), clips: {}, genome: { ...genome, format: GENOME_FORMAT },
  };
  let frame = undefined as ReturnType<typeof renderPose> | undefined;
  clips.forEach((clip, ci) => {
    const entry = { label: clip.label, frames: clip.frames, fps: clip.fps, loop: clip.loop, speedPxPerSec: clip.speed, rows: {} as Record<string, number> };
    meta.clips[clip.id] = entry;
    dirs.forEach((dir, di) => {
      const row = ci * dirs.length + di;
      entry.rows[dir.id] = row;
      for (let i = 0; i < clip.frames; i++) {
        const pose = poseAt(model, clip.id, frameTime(clip, i));
        frame = renderPose(renderer, model, pose, dir.yaw, box, { elevation, shadow: o.shadow, outline: o.outline }, frame);
        const x0 = i * box.w, y0 = row * box.h;
        for (let y = 0; y < box.h; y++) pixels.set(frame.pixels.subarray(y * box.w, (y + 1) * box.w), (y0 + y) * W + x0);
        done++;
        if (progress && done % 16 === 0) progress(done, total);
      }
    });
  });
  progress?.(total, total);
  return { pixels, w: W, h: H, meta };
}
