/**
 * A grid of small animated creatures (variations, gallery). Models are built progressively, one
 * per animation frame, so the page never stalls; all thumbnails share one animation ticker.
 */

import { FAMILY_MAP } from '../families';
import { DIRECTIONS, buildModel } from '../model/model';
import type { Genome } from '../model/types';
import { clear, h } from './dom';
import { SpriteCache, type ViewOptions } from './sprites';

interface Thumb {
  genome: Genome;
  canvas: HTMLCanvasElement;
  cache: SpriteCache | null;
  label: HTMLElement;
}

export class ThumbGrid {
  readonly el = h('div', { class: 'thumbs' });
  private items: Thumb[] = [];
  private queue: Thumb[] = [];
  private t0 = performance.now();
  clip = 'walk';
  dir = 1;

  constructor(private view: () => ViewOptions & { bg: string }, private onPick: (g: Genome) => void, private sub?: (g: Genome) => string) {
    const tick = () => {
      requestAnimationFrame(tick);
      this.build();
      if (this.el.isConnected) this.draw();
    };
    requestAnimationFrame(tick);
  }

  set(genomes: Genome[], labels?: string[]): void {
    clear(this.el);
    this.items = genomes.map((genome, i) => {
      const canvas = h('canvas', { class: 'thumb-canvas', width: 144, height: 160 });
      const label = h('div', { class: 'thumb-label' }, labels?.[i] ?? (genome.name || genome.archetype));
      const card = h('button', { class: 'thumb', title: 'Open in the editor', on: { click: () => this.onPick(genome) } }, canvas, label, this.sub ? h('div', { class: 'thumb-sub' }, this.sub(genome)) : null);
      this.el.appendChild(card);
      return { genome, canvas, cache: null, label };
    });
    this.queue = this.items.slice();
  }

  private build(): void {
    const start = performance.now();
    while (this.queue.length && performance.now() - start < 12) {
      const t = this.queue.shift()!;
      const fam = FAMILY_MAP.get(t.genome.family);
      if (!fam) continue;
      const model = buildModel(fam, t.genome, 1);
      const clip = model.animator.clips.find((c) => c.id === this.clip) ?? model.animator.clips[0];
      const v = this.view();
      t.cache = new SpriteCache(model, { elevationDeg: v.elevationDeg, shadow: v.shadow, outline: v.outline }, [clip], [DIRECTIONS[this.dir]]);
    }
  }

  private draw(): void {
    const time = (performance.now() - this.t0) / 1000;
    for (const t of this.items) {
      if (!t.cache) continue;
      const clip = t.cache.model.animator.clips.find((c) => c.id === this.clip) ?? t.cache.model.animator.clips[0];
      const fi = Math.floor(time * clip.fps) % clip.frames;
      const spr = t.cache.get(clip, this.dir, fi);
      const g = t.canvas.getContext('2d')!;
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, t.canvas.width, t.canvas.height);
      const m = t.cache.model.anatomy.metrics;
      const size = Math.max(m.height, m.length * 0.8, 10);
      const z = Math.max(1, Math.floor(Math.min((t.canvas.width * 0.9) / size, (t.canvas.height * 0.82) / size)));
      const box = t.cache.box;
      const px = Math.round(t.canvas.width / 2 - box.ox * z), py = Math.round(t.canvas.height * 0.5 + m.height * z * 0.45 - box.oy * z);
      g.drawImage(spr, px, py, spr.width * z, spr.height * z);
    }
  }
}
