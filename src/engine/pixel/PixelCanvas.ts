import { rgb, pack } from './color';

/**
 * A tiny software pixel surface. Every texture and sprite in the game is drawn into one of these by
 * code and then uploaded to the GPU. Alongside colour it keeps an optional height channel (turned
 * into a normal map so the pixels react to light) and an optional emissive channel (glowing windows,
 * lanterns, magic).
 */
export class PixelCanvas {
  readonly w: number;
  readonly h: number;
  readonly data: Uint8ClampedArray;
  /** 0..1 per pixel, used for normal maps. Allocated lazily by setHeight / hrect. */
  height: Float32Array | null = null;
  /** RGB emissive per pixel. Allocated lazily. */
  emissive: Uint8ClampedArray | null = null;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.data = new Uint8ClampedArray(w * h * 4);
  }

  inside(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.w && y < this.h;
  }

  set(x: number, y: number, c: number, a = 255): void {
    x |= 0;
    y |= 0;
    if (!this.inside(x, y)) return;
    const i = (y * this.w + x) * 4;
    const [r, g, b] = rgb(c);
    if (a >= 255) {
      this.data[i] = r;
      this.data[i + 1] = g;
      this.data[i + 2] = b;
      this.data[i + 3] = 255;
    } else {
      const k = a / 255;
      const da = this.data[i + 3] / 255;
      const oa = k + da * (1 - k);
      if (oa <= 0) return;
      this.data[i] = (r * k + this.data[i] * da * (1 - k)) / oa;
      this.data[i + 1] = (g * k + this.data[i + 1] * da * (1 - k)) / oa;
      this.data[i + 2] = (b * k + this.data[i + 2] * da * (1 - k)) / oa;
      this.data[i + 3] = oa * 255;
    }
  }

  /** Set with wrap-around (for tiling textures). */
  setW(x: number, y: number, c: number, a = 255): void {
    this.set(((x % this.w) + this.w) % this.w, ((y % this.h) + this.h) % this.h, c, a);
  }

  get(x: number, y: number): number {
    if (!this.inside(x, y)) return 0;
    const i = (y * this.w + x) * 4;
    return pack(this.data[i], this.data[i + 1], this.data[i + 2]);
  }

  alpha(x: number, y: number): number {
    if (!this.inside(x, y)) return 0;
    return this.data[(y * this.w + x) * 4 + 3];
  }

  clearPixel(x: number, y: number): void {
    if (!this.inside(x, y)) return;
    this.data[(y * this.w + x) * 4 + 3] = 0;
  }

  fill(c: number): void {
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) this.set(x, y, c);
  }

  rect(x: number, y: number, w: number, h: number, c: number, a = 255): void {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, c, a);
  }

  /** Filled ellipse centred on (cx, cy) with radii (rx, ry); `fn` may vary colour per pixel. */
  ellipse(cx: number, cy: number, rx: number, ry: number, c: number | ((x: number, y: number, nx: number, ny: number) => number)): void {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
        if (nx * nx + ny * ny <= 1) this.set(x, y, typeof c === 'number' ? c : c(x, y, nx, ny));
      }
    }
  }

  /** Bresenham line. */
  line(x0: number, y0: number, x1: number, y1: number, c: number, a = 255): void {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.set(x0, y0, c, a);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  /** A thick line drawn as a run of discs: used for limbs of the battle puppet. */
  thickLine(x0: number, y0: number, x1: number, y1: number, r: number, c: number | ((x: number, y: number, t: number, side: number) => number)): void {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const minX = Math.floor(Math.min(x0, x1) - r - 1), maxX = Math.ceil(Math.max(x0, x1) + r + 1);
    const minY = Math.floor(Math.min(y0, y1) - r - 1), maxY = Math.ceil(Math.max(y0, y1) + r + 1);
    const dx = x1 - x0, dy = y1 - y0;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const px = x + 0.5 - x0, py = y + 0.5 - y0;
        let t = len > 0 ? (px * dx + py * dy) / (len * len) : 0;
        t = Math.max(0, Math.min(1, t));
        const qx = px - dx * t, qy = py - dy * t;
        const d = Math.hypot(qx, qy);
        if (d <= r) {
          // side: -1 .. 1 across the limb (perpendicular), for cylindrical shading
          const side = len > 0 ? (qx * -dy + qy * dx) / (len * r) : 0;
          this.set(x, y, typeof c === 'number' ? c : c(x, y, t, side));
        }
      }
    }
  }

  // ---- height channel (normal maps) ---------------------------------------------------------

  ensureHeight(base = 0.5): Float32Array {
    if (!this.height) this.height = new Float32Array(this.w * this.h).fill(base);
    return this.height;
  }

  setHeight(x: number, y: number, v: number): void {
    const h = this.ensureHeight();
    x = ((x % this.w) + this.w) % this.w;
    y = ((y % this.h) + this.h) % this.h;
    h[y * this.w + x] = v;
  }

  getHeight(x: number, y: number): number {
    if (!this.height) return 0.5;
    x = ((x % this.w) + this.w) % this.w;
    y = ((y % this.h) + this.h) % this.h;
    return this.height[y * this.w + x];
  }

  // ---- emissive channel -----------------------------------------------------------------------

  setEmissive(x: number, y: number, c: number): void {
    if (!this.inside(x, y)) return;
    if (!this.emissive) this.emissive = new Uint8ClampedArray(this.w * this.h * 4);
    const i = (y * this.w + x) * 4;
    const [r, g, b] = rgb(c);
    this.emissive[i] = r;
    this.emissive[i + 1] = g;
    this.emissive[i + 2] = b;
    this.emissive[i + 3] = 255;
  }

  // ---- sprite helpers -----------------------------------------------------------------------

  /**
   * Selective outline: every transparent pixel touching an opaque one becomes a darkened, slightly
   * purple version of that neighbour (the classic soft HD-2D sprite outline, not flat black).
   */
  outline(strength = 0.42, diagonals = false): void {
    const src = new Uint8ClampedArray(this.data);
    const at = (x: number, y: number) => (x >= 0 && y >= 0 && x < this.w && y < this.h ? src[(y * this.w + x) * 4 + 3] : 0);
    const dirs = diagonals
      ? [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]
      : [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (at(x, y) > 0) continue;
        for (const [dx, dy] of dirs) {
          if (at(x + dx, y + dy) > 128) {
            const i = ((y + dy) * this.w + (x + dx)) * 4;
            const r = src[i] * strength, g = src[i + 1] * strength, b = src[i + 2] * strength;
            this.set(x, y, pack(r * 0.8 + 18, g * 0.7 + 10, b * 0.9 + 26));
            break;
          }
        }
      }
    }
  }

  /** Copy another canvas into this one at (dx, dy), optionally mirrored. Alpha-tested. */
  blit(src: PixelCanvas, dx: number, dy: number, flipX = false): void {
    for (let y = 0; y < src.h; y++) {
      for (let x = 0; x < src.w; x++) {
        const sx = flipX ? src.w - 1 - x : x;
        const i = (y * src.w + sx) * 4;
        if (src.data[i + 3] === 0) continue;
        this.set(dx + x, dy + y, pack(src.data[i], src.data[i + 1], src.data[i + 2]), src.data[i + 3]);
        if (src.emissive && src.emissive[i + 3]) {
          this.setEmissive(dx + x, dy + y, pack(src.emissive[i], src.emissive[i + 1], src.emissive[i + 2]));
        }
      }
    }
  }

  toCanvas(): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = this.w;
    c.height = this.h;
    c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(this.data), this.w, this.h), 0, 0);
    return c;
  }

  emissiveCanvas(): HTMLCanvasElement | null {
    if (!this.emissive) return null;
    const c = document.createElement('canvas');
    c.width = this.w;
    c.height = this.h;
    const d = new Uint8ClampedArray(this.emissive);
    for (let i = 3; i < d.length; i += 4) d[i] = 255;
    c.getContext('2d')!.putImageData(new ImageData(d, this.w, this.h), 0, 0);
    return c;
  }

  /** Tangent-space normal map from the height channel (Sobel), wrapping at the edges. */
  normalCanvas(strength = 2): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = this.w;
    c.height = this.h;
    const out = new Uint8ClampedArray(this.w * this.h * 4);
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const hl = this.getHeight(x - 1, y), hr = this.getHeight(x + 1, y);
        const hu = this.getHeight(x, y - 1), hd = this.getHeight(x, y + 1);
        // canvas y runs down; texture v runs up (flipY): n.y = -dh/dv = h(below) - h(above)
        let nx = (hl - hr) * strength, ny = (hd - hu) * strength;
        const nz = 1;
        const len = Math.hypot(nx, ny, nz);
        nx /= len; ny /= len;
        const i = (y * this.w + x) * 4;
        out[i] = (nx * 0.5 + 0.5) * 255;
        out[i + 1] = (ny * 0.5 + 0.5) * 255;
        out[i + 2] = (nz / len * 0.5 + 0.5) * 255;
        out[i + 3] = 255;
      }
    }
    c.getContext('2d')!.putImageData(new ImageData(out, this.w, this.h), 0, 0);
    return c;
  }
}
