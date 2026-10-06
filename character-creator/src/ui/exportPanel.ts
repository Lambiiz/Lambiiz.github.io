/** Export: sprite sheets (PNG + JSON, rendered in a worker), animated GIFs and single frames. */

import { DEG } from '../core/math';
import { encodeGif } from '../export/gif';
import type { SheetMeta, SheetOptions } from '../export/sheet';
import { DIRECTIONS, buildModel, frameTime, poseAt, renderPose, cellBox, type CreatureModel } from '../model/model';
import type { Genome } from '../model/types';
import { Renderer, toImageData } from '../render/raster';
import { canvasBlob, download, h, slug, toast } from './dom';
import { icon } from './icons';

export interface ExportContext {
  genome(): Genome;
  model(): CreatureModel | undefined;
  view(): { elevationDeg: number; shadow: boolean; outline: boolean; scale: number; clip: string; dir: number; bgColor: number };
}

let worker: Worker | null = null;
let jobId = 0;

function sheetInWorker(genome: Genome, options: SheetOptions, progress: (p: number) => void): Promise<{ w: number; h: number; meta: SheetMeta; pixels: Uint32Array }> {
  worker ??= new Worker(new URL('../worker/sheetWorker.ts', import.meta.url), { type: 'module' });
  const id = ++jobId;
  return new Promise((resolve, reject) => {
    const onMsg = (e: MessageEvent) => {
      if (e.data.id !== id) return;
      if (e.data.progress !== undefined) progress(e.data.progress);
      else {
        worker!.removeEventListener('message', onMsg);
        if (e.data.error) reject(new Error(e.data.error));
        else resolve({ ...e.data.result, pixels: new Uint32Array(e.data.result.buffer) });
      }
    };
    worker!.addEventListener('message', onMsg);
    worker!.postMessage({ id, genome, options });
  });
}

export function exportPanel(ctx: ExportContext): { el: HTMLElement; refresh(): void } {
  const dirBoxes = DIRECTIONS.map((d) => h('input', { type: 'checkbox', checked: true, value: d.id }));
  const clipList = h('div', { class: 'checks' });
  let clipBoxes: HTMLInputElement[] = [];
  const refresh = () => {
    const model = ctx.model();
    if (!model) return;
    const prev = new Map(clipBoxes.map((c) => [c.value, c.checked]));
    clipBoxes = model.animator.clips.map((c) => h('input', { type: 'checkbox', checked: prev.get(c.id) ?? true, value: c.id }));
    clipList.replaceChildren(...clipBoxes.map((b, i) => h('label', { class: 'check' }, b, model.animator.clips[i].label)));
  };
  const shadow = h('input', { type: 'checkbox', checked: true });
  const outline = h('input', { type: 'checkbox', checked: true });
  const gifScale = h('select', {}, ...[1, 2, 3, 4, 6].map((s) => h('option', { value: String(s), selected: s === 3 }, `×${s}`)));
  const gifBg = h('select', {}, h('option', { value: 'clear' }, 'Transparent'), h('option', { value: 'stage' }, 'Stage colour'));
  const status = h('div', { class: 'export-status' });
  const preview = h('div', { class: 'export-preview' });
  const bar = h('div', { class: 'progress' }, h('div', { class: 'progress-fill' }));

  const presetDirs = (ids: string[]) => dirBoxes.forEach((b) => (b.checked = ids.includes(b.value)));

  const doSheet = async () => {
    const v = ctx.view();
    const opts: SheetOptions = {
      scale: v.scale, elevationDeg: v.elevationDeg, shadow: shadow.checked, outline: outline.checked,
      dirs: dirBoxes.filter((b) => b.checked).map((b) => b.value), clips: clipBoxes.filter((b) => b.checked).map((b) => b.value),
    };
    if (!opts.dirs.length || !opts.clips.length) return toast('Pick at least one direction and one animation.');
    const g = ctx.genome();
    status.textContent = 'Rendering…';
    bar.classList.add('on');
    try {
      const res = await sheetInWorker(g, opts, (p) => ((bar.firstChild as HTMLElement).style.width = `${Math.round(p * 100)}%`));
      const c = h('canvas', { width: res.w, height: res.h });
      c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(res.pixels.buffer as ArrayBuffer), res.w, res.h), 0, 0);
      const png = await canvasBlob(c);
      const json = new Blob([JSON.stringify(res.meta, null, 2)], { type: 'application/json' });
      const name = slug(g.name || g.archetype);
      download(`${name}-sheet.png`, png);
      setTimeout(() => download(`${name}-sheet.json`, json), 300);
      const frames = Object.values(res.meta.clips).reduce((n, cl) => n + cl.frames * opts.dirs.length, 0);
      status.textContent = `${res.w}×${res.h} px · ${frames} frames of ${res.meta.frame.w}×${res.meta.frame.h} · pivot ${res.meta.pivot.x},${res.meta.pivot.y}`;
      c.className = 'export-sheet';
      preview.replaceChildren(c);
    } catch (e) {
      status.textContent = `Export failed: ${(e as Error).message}`;
    } finally {
      bar.classList.remove('on');
    }
  };

  const doGif = async () => {
    const v = ctx.view();
    const model = buildModel(ctx.model()!.family, ctx.genome(), v.scale);
    const clip = model.animator.clips.find((c) => c.id === v.clip) ?? model.animator.clips[0];
    const dir = DIRECTIONS[v.dir];
    const e = v.elevationDeg * DEG;
    const box = cellBox(model, e, [clip], [dir]);
    const r = new Renderer();
    const frames: Uint32Array[] = [];
    for (let i = 0; i < clip.frames; i++) {
      const f = renderPose(r, model, poseAt(model, clip.id, frameTime(clip, i)), dir.yaw, box, { elevation: e, shadow: shadow.checked, outline: outline.checked });
      frames.push(f.pixels.slice());
    }
    if (!clip.loop) for (let k = 0; k < Math.round(clip.fps * 0.6); k++) frames.push(frames[frames.length - 1]);
    const bytes = encodeGif(frames, box.w, box.h, { delay: Math.round(100 / clip.fps), scale: Number(gifScale.value), background: gifBg.value === 'stage' ? v.bgColor : undefined });
    download(`${slug(ctx.genome().name || 'creature')}-${clip.id}-${dir.id}.gif`, new Blob([bytes as BlobPart], { type: 'image/gif' }));
    status.textContent = `GIF: ${clip.label}, ${dir.label}, ${frames.length} frames`;
  };

  const doFrame = async () => {
    const v = ctx.view();
    const model = buildModel(ctx.model()!.family, ctx.genome(), v.scale);
    const clip = model.animator.clips.find((c) => c.id === v.clip) ?? model.animator.clips[0];
    const dir = DIRECTIONS[v.dir];
    const e = v.elevationDeg * DEG;
    const box = cellBox(model, e, [clip], [dir]);
    const f = renderPose(new Renderer(), model, poseAt(model, clip.id, 0), dir.yaw, box, { elevation: e, shadow: shadow.checked, outline: outline.checked });
    const c = h('canvas', { width: box.w, height: box.h });
    c.getContext('2d')!.putImageData(toImageData(f), 0, 0);
    download(`${slug(ctx.genome().name || 'creature')}-${clip.id}-${dir.id}.png`, await canvasBlob(c));
  };

  const el = h('div', { class: 'export' },
    h('div', { class: 'export-col' },
      h('h4', {}, 'Directions'),
      h('div', { class: 'checks' }, ...dirBoxes.map((b, i) => h('label', { class: 'check' }, b, DIRECTIONS[i].label))),
      h('div', { class: 'row' },
        h('button', { class: 'btn small', on: { click: () => presetDirs(DIRECTIONS.map((d) => d.id)) } }, 'All 8'),
        h('button', { class: 'btn small', on: { click: () => presetDirs(['s', 'e', 'n', 'w']) } }, '4'),
        h('button', { class: 'btn small', on: { click: () => presetDirs(['e', 'w']) } }, 'Side-on'),
        h('button', { class: 'btn small', on: { click: () => presetDirs([DIRECTIONS[ctx.view().dir].id]) } }, 'Current')),
      h('h4', {}, 'Options'),
      h('label', { class: 'check' }, shadow, 'Ground shadow'),
      h('label', { class: 'check' }, outline, 'Outline')),
    h('div', { class: 'export-col' },
      h('h4', {}, 'Animations'),
      clipList,
      h('div', { class: 'row' },
        h('button', { class: 'btn small', on: { click: () => clipBoxes.forEach((b) => (b.checked = true)) } }, 'All'),
        h('button', { class: 'btn small', on: { click: () => clipBoxes.forEach((b) => (b.checked = false)) } }, 'None'))),
    h('div', { class: 'export-col export-actions' },
      h('button', { class: 'btn primary', on: { click: doSheet } }, icon('download'), 'Sprite sheet (PNG + JSON)'),
      bar,
      h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: doGif } }, icon('download'), 'Animated GIF'), gifScale, gifBg),
      h('button', { class: 'btn', on: { click: doFrame } }, icon('download'), 'Current pose (PNG)'),
      status, preview));
  refresh();
  return { el, refresh };
}
