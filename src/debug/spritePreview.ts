import * as THREE from 'three';
import { LOOKS } from '../engine/character/look';
import { overworldSheet, battleSheet, setBakeRenderer } from '../engine/character/sheets';

/**
 * `?view=sprites`: every baked character sheet, scaled up, for checking the art.
 * `&only=hero,mage` limits the looks, `&kind=battle|overworld` the sheets, `&scale=3` the zoom.
 */
export function spritePreview(root: HTMLElement): void {
  document.body.style.background = '#2a2a34';
  document.body.style.margin = '0';
  const q = new URLSearchParams(location.search);
  const scale = Number(q.get('scale') ?? 3);
  const only = q.get('only');
  const kind = q.get('kind');
  // &rows=2-5 shows only those sheet rows; &cols=0-3 only those columns
  const range = (v: string | null, max: number): [number, number] => {
    if (!v) return [0, max - 1];
    const [a, b] = v.split('-').map(Number);
    return [a, Number.isFinite(b) ? b : a];
  };
  const renderer = new THREE.WebGLRenderer();
  setBakeRenderer(renderer);
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;padding:16px;font:12px monospace;color:#ccc';
  root.appendChild(wrap);
  for (const name of Object.keys(LOOKS)) {
    if (only && !only.split(',').includes(name)) continue;
    const sheets = [];
    if (kind !== 'battle') sheets.push(overworldSheet(name));
    if (kind !== 'overworld') sheets.push(battleSheet(name));
    for (const sheet of sheets) {
      const info = sheet.info;
      const box = document.createElement('div');
      const label = document.createElement('div');
      label.textContent = `${name} ${info.frameW}px · dirs ${info.dirs.join(' ')} · ${Object.keys(info.anims).join(' ')}`;
      const src = info.canvas.toCanvas();
      const strip = q.get('strip'); // e.g. strip=idle:0 → that frame for every direction
      if (strip) {
        const [an, fi] = strip.split(':');
        const a = info.anims[an] ?? info.anims.idle;
        const c = document.createElement('canvas');
        c.width = info.frameW * info.dirs.length * scale;
        c.height = info.frameH * scale;
        const g = c.getContext('2d')!;
        g.imageSmoothingEnabled = false;
        g.fillStyle = '#6a7a62';
        g.fillRect(0, 0, c.width, c.height);
        info.dirs.forEach((_, d) => {
          const row = a.row + d * info.rowsPerDir, col = Math.min(Number(fi ?? 0), a.frames - 1);
          g.drawImage(src, col * info.frameW, row * info.frameH, info.frameW, info.frameH, d * info.frameW * scale, 0, info.frameW * scale, info.frameH * scale);
        });
        box.append(label, c);
        wrap.appendChild(box);
        continue;
      }
      const [r0, r1] = range(q.get('rows'), info.rows);
      const [c0, c1] = range(q.get('cols'), info.cols);
      const sw = (c1 - c0 + 1) * info.frameW, sh = (r1 - r0 + 1) * info.frameH;
      const c = document.createElement('canvas');
      c.width = sw * scale;
      c.height = sh * scale;
      const g = c.getContext('2d')!;
      g.imageSmoothingEnabled = false;
      g.fillStyle = '#6a7a62';
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(src, c0 * info.frameW, r0 * info.frameH, sw, sh, 0, 0, c.width, c.height);
      g.strokeStyle = 'rgba(0,0,0,0.25)';
      for (let x = 0; x <= c1 - c0 + 1; x++) g.strokeRect(x * info.frameW * scale, 0, 0, c.height);
      for (let y = 0; y <= r1 - r0 + 1; y++) g.strokeRect(0, y * info.frameH * scale, c.width, 0);
      box.append(label, c);
      wrap.appendChild(box);
    }
  }
  (window as unknown as { __ready: boolean }).__ready = true;
}
