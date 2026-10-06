/**
 * `?debug`: renders sheets for checking the art. Parameters:
 *   family, arch, seed (or seeds=1-8), clip, dirs=s,se,e…, scale (build scale), zoom, elev (degrees)
 */
import { FAMILY_MAP, FAMILIES } from './families';
import { newGenome } from './genome/ops';
import { DEG } from './core/math';
import { DIRECTIONS, buildModel, cellBox, frameTime, poseAt, renderPose } from './model/model';
import { Renderer, toImageData } from './render/raster';

function allClips(root: HTMLElement, renderer: Renderer, model: ReturnType<typeof buildModel>, elev: number, dir: { yaw: number }, zoom: number, bg: string): void {
  const only = new URLSearchParams(location.search).get('clips')?.split(',');
  const clips = model.animator.clips.filter((c) => !only || only.includes(c.id));
  const box = cellBox(model, elev, clips, [dir]);
  const cols = Math.max(...clips.map((c) => c.frames));
  const c = document.createElement('canvas');
  c.width = (box.w * cols + 60) * zoom;
  c.height = box.h * clips.length * zoom;
  c.style.cssText = `margin:0 8px;image-rendering:pixelated;background:${bg}`;
  root.appendChild(c);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const tmp = document.createElement('canvas');
  tmp.width = box.w;
  tmp.height = box.h;
  const tctx = tmp.getContext('2d')!;
  clips.forEach((clip, r) => {
    ctx.fillStyle = '#000';
    ctx.font = `${6 * zoom}px monospace`;
    ctx.fillText(clip.id, 2 * zoom, r * box.h * zoom + 10 * zoom);
    for (let i = 0; i < clip.frames; i++) {
      const pose = poseAt(model, clip.id, frameTime(clip, i));
      const f = renderPose(renderer, model, pose, dir.yaw, box, { elevation: elev });
      tctx.clearRect(0, 0, f.w, f.h);
      tctx.putImageData(toImageData(f), 0, 0);
      ctx.drawImage(tmp, (60 + i * box.w) * zoom, r * box.h * zoom, box.w * zoom, box.h * zoom);
    }
  });
}

export function debugView(root: HTMLElement, q: URLSearchParams): void {
  document.body.style.cssText = 'margin:0;background:#2a2a34;color:#ccc;font:12px monospace';
  const fam = FAMILY_MAP.get(q.get('family') ?? 'human') ?? FAMILIES[0];
  const zoom = Number(q.get('zoom') ?? 3);
  const scale = Number(q.get('scale') ?? 1);
  const elev = Number(q.get('elev') ?? 30) * DEG;
  const clipId = q.get('clip') ?? 'walk';
  const dirs = (q.get('dirs') ?? 's,se,e,ne,n,nw,w,sw').split(',').map((id) => DIRECTIONS.find((d) => d.id === id)!).filter(Boolean);
  const seedsParam = q.get('seeds');
  let seeds: number[] = [Number(q.get('seed') ?? 1)];
  if (seedsParam) {
    const [a, b] = seedsParam.split('-').map(Number);
    seeds = [];
    for (let s = a; s <= b; s++) seeds.push(s);
  }
  const bg = q.get('bg') ?? '#6f8a5a';
  const renderer = new Renderer();
  const t0 = performance.now();
  let frames = 0;
  for (const seed of seeds) {
    const g = newGenome(fam, seed, q.get('arch') ?? undefined);
    const model = buildModel(fam, g, scale);
    if (clipId === 'all') {
      allClips(root, renderer, model, elev, dirs[0], zoom, bg);
      continue;
    }
    const clip = model.animator.clips.find((c) => c.id === clipId) ?? model.animator.clips[0];
    const box = cellBox(model, elev, [clip]);
    const onlyFrame = q.get('frame');
    const nFrames = onlyFrame !== null ? 1 : clip.frames;
    const label = document.createElement('div');
    label.textContent = `#${seed} ${g.name} · ${g.archetype} · ${clip.id} ${clip.frames}f@${clip.fps} speed ${clip.speed}px/s · cell ${box.w}×${box.h} · ${model.anatomy.prims.length} prims · ${model.anatomy.traits.join(', ')}`;
    label.style.padding = '6px 8px 2px';
    root.appendChild(label);
    const row = nFrames === 1;
    const c = document.createElement('canvas');
    c.width = box.w * (row ? dirs.length : nFrames) * zoom;
    c.height = box.h * (row ? 1 : dirs.length) * zoom;
    c.style.cssText = `margin:0 8px;image-rendering:pixelated;background:${bg}`;
    root.appendChild(c);
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    const tmp = document.createElement('canvas');
    tmp.width = box.w;
    tmp.height = box.h;
    const tctx = tmp.getContext('2d')!;
    dirs.forEach((dir, r) => {
      for (let i = 0; i < nFrames; i++) {
        const fi = onlyFrame !== null ? Number(onlyFrame) : i;
        const pose = poseAt(model, clip.id, frameTime(clip, fi));
        const f = renderPose(renderer, model, pose, dir.yaw, box, { elevation: elev });
        frames++;
        const img = toImageData(f);
        tctx.clearRect(0, 0, f.w, f.h);
        tctx.putImageData(img, 0, 0);
        const cx = row ? r : i, cy = row ? 0 : r;
        ctx.drawImage(tmp, cx * box.w * zoom, cy * box.h * zoom, box.w * zoom, box.h * zoom);
      }
    });
  }
  const info = document.createElement('div');
  info.textContent = `${frames} frames in ${(performance.now() - t0).toFixed(0)} ms`;
  info.style.padding = '8px';
  root.appendChild(info);
  (window as unknown as { __ready: boolean }).__ready = true;
}
