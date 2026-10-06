/**
 * The preview stage: plays a clip in one of eight directions at an integer zoom over a tiled
 * ground. While a moving clip plays the ground scrolls at the clip's exact ground speed, so planted
 * feet should stay glued to it. "Test drive" lets you walk the character around with the keyboard.
 */

import { DEG, clamp } from '../core/math';
import { DIRECTIONS, type CreatureModel } from '../model/model';
import type { ClipDef } from '../model/types';
import { backgroundTile, type BackgroundId } from './backgrounds';
import { SpriteCache, type ViewOptions } from './sprites';

const ACTION_KEYS: Record<string, string> = {
  Space: 'attack', KeyF: 'cast', KeyJ: 'jump', KeyH: 'hurt', KeyK: 'die', KeyX: 'sit', KeyV: 'wave', KeyB: 'cheer', KeyE: 'pickup', KeyT: 'talk', KeyG: 'block', KeyR: 'ready',
};

export class Stage {
  readonly el: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  cache: SpriteCache | null = null;
  model: CreatureModel | null = null;
  clipId = 'idle';
  dir = 0;
  playing = true;
  speed = 1;
  smooth = false;
  scroll = true;
  /** 0 = automatic. */
  zoom = 0;
  bg: BackgroundId = 'grass';
  turntable = false;
  drive = false;
  onTick: ((info: { frame: number; frames: number; clip: ClipDef | undefined; zoom: number }) => void) | null = null;
  onDriveClip: ((clip: string, dir: number) => void) | null = null;

  private time = 0;
  private yaw = 0;
  private groundX = 0;
  private groundY = 0;
  private last = 0;
  private keys = new Set<string>();
  private action: string | null = null;
  private actionStarted = false;
  private dpr = 1;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'stage-canvas';
    this.canvas.tabIndex = 0;
    this.el = document.createElement('div');
    this.el.className = 'stage';
    this.el.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const z = this.currentZoom();
      this.zoom = clamp(z + (e.deltaY < 0 ? 1 : -1), 1, 16);
    }, { passive: false });
    window.addEventListener('keydown', (e) => this.key(e, true));
    window.addEventListener('keyup', (e) => this.key(e, false));
    requestAnimationFrame((t) => this.frame(t));
  }

  get clip(): ClipDef | undefined {
    return this.model?.animator.clips.find((c) => c.id === this.clipId);
  }

  setModel(model: CreatureModel, view: ViewOptions): void {
    this.model = model;
    this.cache = new SpriteCache(model, view);
    if (!this.clip) this.clipId = 'idle';
  }

  setClip(id: string): void {
    this.clipId = id;
    this.time = 0;
  }

  restart(): void {
    this.time = 0;
  }

  step(n: number): void {
    const c = this.clip;
    if (!c) return;
    this.playing = false;
    this.time = Math.max(0, (Math.floor(this.time * c.fps + 1e-6) + n) / c.fps);
  }

  private currentZoom(): number {
    if (this.zoom > 0 || !this.cache || !this.model) return this.zoom || 4;
    // fit the creature itself (the cell also holds falls, jumps and weapon swings)
    const m = this.model.anatomy.metrics;
    const size = Math.max(m.height, m.length * 0.8, 12);
    const w = this.canvas.width / this.dpr, h = this.canvas.height / this.dpr;
    return clamp(Math.floor(Math.min((w * 0.55) / size, (h * 0.62) / size)), 1, 16);
  }

  private key(e: KeyboardEvent, down: boolean): void {
    if (!this.drive) return;
    const t = e.target as HTMLElement;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) return;
    const move = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight', 'KeyC'];
    if (move.includes(e.code)) {
      e.preventDefault();
      if (down) this.keys.add(e.code);
      else this.keys.delete(e.code);
      return;
    }
    if (down && ACTION_KEYS[e.code] && !e.repeat) {
      e.preventDefault();
      const id = ACTION_KEYS[e.code];
      if (this.model?.animator.clips.some((c) => c.id === id)) {
        this.action = id;
        this.actionStarted = true;
      }
    }
  }

  private frame(now: number): void {
    requestAnimationFrame((t) => this.frame(t));
    const dt = this.last ? Math.min(0.1, (now - this.last) / 1000) : 0;
    this.last = now;
    if (!this.el.isConnected) return;
    this.resize();
    const cache = this.cache, model = this.model;
    if (!cache || !model) return;
    const e = cache.view.elevationDeg * DEG;
    let clip = this.clip;
    let dirYaw = DIRECTIONS[this.dir].yaw;

    if (this.drive) {
      // keyboard control: 8-way movement, shift runs, C sneaks; actions play once
      let vx = 0, vz = 0;
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) vz -= 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) vz += 1;
      if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) vx -= 1;
      if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) vx += 1;
      const moving = vx !== 0 || vz !== 0;
      let id = 'idle';
      if (this.action) {
        const ac = model.animator.clips.find((c) => c.id === this.action)!;
        const dur = ac.frames / ac.fps;
        const over = ac.loop ? this.time > dur * 2 || moving : this.time > dur + 0.25;
        if (over) this.action = null;
        else id = ac.id;
      }
      if (moving) {
        const yaw = Math.atan2(-vz, vx);
        const diff = (a: number) => Math.abs(Math.atan2(Math.sin(a - yaw), Math.cos(a - yaw)));
        this.dir = DIRECTIONS.reduce((best, d, i) => (diff(d.yaw) < diff(DIRECTIONS[best].yaw) ? i : best), 0);
        dirYaw = DIRECTIONS[this.dir].yaw;
        if (!this.action) id = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') ? 'run' : this.keys.has('KeyC') ? 'sneak' : 'walk';
      }
      if (this.actionStarted) {
        this.actionStarted = false;
        this.time = 0;
      }
      if (id !== this.clipId) {
        const loco = (c: string) => c === 'walk' || c === 'run' || c === 'sneak';
        if (!(loco(id) && loco(this.clipId))) this.time = 0;
        this.clipId = id;
        this.onDriveClip?.(id, this.dir);
      }
      clip = this.clip;
    }

    if (!clip) return;
    if (this.playing) this.time += dt * this.speed;
    if (this.turntable) this.yaw += dt * this.speed * 0.8;

    // frame selection
    const dur = clip.frames / clip.fps;
    let u: number, fi: number;
    if (clip.loop) {
      const ft = this.time * clip.fps;
      fi = Math.floor(ft) % clip.frames;
      u = this.smooth ? (ft % clip.frames) / clip.frames : fi / clip.frames;
    } else {
      const hold = this.drive ? 0 : 0.7;
      const ft = this.time * clip.fps;
      if (!this.drive && this.time > dur + hold) this.time = 0;
      fi = Math.min(clip.frames - 1, Math.floor(ft));
      u = this.smooth ? Math.min(1, ft / Math.max(1, clip.frames - 1)) : fi / Math.max(1, clip.frames - 1);
    }

    // ground motion at the clip's exact speed
    if ((this.scroll || this.drive) && clip.speed > 0 && this.playing && (!this.drive || this.keys.size > 0)) {
      const v = clip.speed * dt * this.speed;
      this.groundX -= Math.cos(dirYaw) * v;
      this.groundY += Math.sin(dirYaw) * v * Math.sin(e);
    }

    const zoom = this.currentZoom();
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    const z = zoom * this.dpr;
    ctx.imageSmoothingEnabled = false;
    // background tiles, snapped to the logical pixel grid
    const tile = backgroundTile(this.bg);
    const ts = tile.width * z;
    const cx = Math.round(W / 2 / z) * z, cy = Math.round((H / 2 + model.anatomy.metrics.height * z * 0.45) / z) * z;
    const ox = (((Math.round(this.groundX) * z + cx) % ts) + ts) % ts;
    const oy = (((Math.round(this.groundY) * z + cy) % ts) + ts) % ts;
    for (let y = oy - ts; y < H; y += ts) for (let x = ox - ts; x < W; x += ts) ctx.drawImage(tile, x, y, ts, ts);

    const sprite = this.turntable ? cache.live(clip.id, this.yaw, u) : this.smooth && !this.drive ? cache.live(clip.id, dirYaw, u) : cache.get(clip, this.dir, fi);
    ctx.drawImage(sprite, cx - cache.box.ox * z, cy - cache.box.oy * z, cache.box.w * z, cache.box.h * z);
    this.onTick?.({ frame: fi, frames: clip.frames, clip, zoom });
  }

  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    const r = this.el.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h || this.dpr !== dpr) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.dpr = dpr;
    }
  }
}
