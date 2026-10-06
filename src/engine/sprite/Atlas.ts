import * as THREE from 'three';
import { PixelCanvas } from '../pixel/PixelCanvas';
import { spriteTexture } from '../pixel/texture';

export interface AtlasRegion {
  /** UV rectangle (u0, v0) bottom-left .. (u1, v1) top-right. */
  u0: number; v0: number; u1: number; v1: number;
  w: number; h: number;
}

/** Shelf-packs many small sprites into one texture. */
export class Atlas {
  readonly canvas: PixelCanvas;
  private x = 0;
  private y = 0;
  private rowH = 0;
  readonly regions = new Map<string, AtlasRegion>();
  private _texture: THREE.Texture | null = null;

  constructor(readonly size = 512) {
    this.canvas = new PixelCanvas(size, size);
  }

  add(name: string, pc: PixelCanvas): AtlasRegion {
    if (this.x + pc.w + 1 > this.size) {
      this.x = 0;
      this.y += this.rowH + 1;
      this.rowH = 0;
    }
    if (this.y + pc.h > this.size) throw new Error('atlas full');
    this.canvas.blit(pc, this.x, this.y);
    const S = this.size;
    // half-texel inset avoids bleeding from neighbours under nearest filtering
    const r: AtlasRegion = {
      u0: (this.x + 0.01) / S, u1: (this.x + pc.w - 0.01) / S,
      v1: 1 - (this.y + 0.01) / S, v0: 1 - (this.y + pc.h - 0.01) / S,
      w: pc.w, h: pc.h,
    };
    this.regions.set(name, r);
    this.x += pc.w + 1;
    this.rowH = Math.max(this.rowH, pc.h);
    return r;
  }

  get(name: string): AtlasRegion {
    const r = this.regions.get(name);
    if (!r) throw new Error(`no atlas region ${name}`);
    return r;
  }

  get texture(): THREE.Texture {
    if (!this._texture) this._texture = spriteTexture(this.canvas);
    return this._texture;
  }
}
