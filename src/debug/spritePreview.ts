import { battleSheet, overworldSheet, LOOKS, type CharacterLook } from '../engine/pixel/characters';

/** `?view=sprites`: every character sheet, scaled up, for checking the art. */
export function spritePreview(root: HTMLElement): void {
  document.body.style.background = '#2a2a34';
  document.body.style.margin = '0';
  const scale = Number(new URLSearchParams(location.search).get('scale') ?? 3);
  const only = new URLSearchParams(location.search).get('only');
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;padding:16px;font:12px monospace;color:#ccc';
  root.appendChild(wrap);
  for (const [name, look] of Object.entries(LOOKS) as [string, CharacterLook][]) {
    if (only && !only.split(',').includes(name)) continue;
    for (const sheet of [overworldSheet(look), battleSheet(look)]) {
      const box = document.createElement('div');
      const label = document.createElement('div');
      label.textContent = `${name} ${sheet.frameW}px`;
      const src = sheet.canvas.toCanvas();
      const c = document.createElement('canvas');
      c.width = src.width * scale;
      c.height = src.height * scale;
      const g = c.getContext('2d')!;
      g.imageSmoothingEnabled = false;
      g.fillStyle = '#5a6a5a';
      g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = 'rgba(0,0,0,0.25)';
      for (let x = 0; x <= sheet.cols; x++) g.strokeRect(x * sheet.frameW * scale, 0, 0, c.height);
      for (let y = 0; y <= sheet.rows; y++) g.strokeRect(0, y * sheet.frameH * scale, c.width, 0);
      g.drawImage(src, 0, 0, c.width, c.height);
      box.append(label, c);
      wrap.appendChild(box);
    }
  }
  (window as unknown as { __ready: boolean }).__ready = true;
}
