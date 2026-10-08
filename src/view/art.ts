// Procedural engraved artwork drawn once per definition into CanvasTextures.
// All imagery here is original: a small motif vocabulary (soul glyph, lozenge chain,
// dotted arcs, quarter rosettes) repeats across cards, the board rim and the Base lid.
import * as THREE from 'three';
import { cardDef, WEAPONS } from '../game/content';
import type { CardId } from '../game/types';

export const INK = '#1b2234';
export const INK_SOFT = 'rgba(27,34,52,0.55)';
export const IVORY = '#e6dec7';
export const IVORY_DEEP = '#d3c8aa';
export const BRASS = '#a88a52';
export const BRASS_LIGHT = '#d5bd84';
export const TURQ = '#3fb3aa';
export const CORAL = '#c8604f';
export const ENAMEL = '#1b2a48';

export const SERIF = '"Cormorant Garamond", "Iowan Old Style", Georgia, serif';
export const SANS = 'Inter, "Segoe UI", system-ui, sans-serif';

export const CARD_TEX_W = 576;
export const CARD_TEX_H = 768;

type Ctx = CanvasRenderingContext2D;

/** Deterministic tiny RNG for texture grain (never touches gameplay streams). */
function grainRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function makeCanvas(w: number, h: number): [HTMLCanvasElement, Ctx] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  return [c, ctx];
}

export function colorTexture(canvas: HTMLCanvasElement, renderer?: THREE.WebGLRenderer): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 4;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

export function dataTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.NoColorSpace; // masks/roughness are data
  t.needsUpdate = true;
  return t;
}

export function roundRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Parallel engraving lines clipped to the current path. */
export function hatch(ctx: Ctx, angle: number, spacing: number, width: number, color: string, bounds: [number, number, number, number]): void {
  const [x, y, w, h] = bounds;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.hypot(w, h) / 2 + spacing;
  ctx.save();
  ctx.clip();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  for (let d = -r; d <= r; d += spacing) {
    ctx.moveTo(-r, d);
    ctx.lineTo(r, d);
  }
  ctx.stroke();
  ctx.restore();
}

/** The repeating "soul glyph": a ring with four tapered rays and a centre dot. */
export function soulGlyph(ctx: Ctx, x: number, y: number, s: number, color: string, lw = 1.5): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-s * 0.06, -s * 0.5);
    ctx.lineTo(0, -s);
    ctx.lineTo(s * 0.06, -s * 0.5);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/** Lozenge with a dot: the chain motif used along borders. */
export function lozenge(ctx: Ctx, x: number, y: number, s: number, color: string, lw = 1.2): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(x, y - s);
  ctx.lineTo(x + s * 0.6, y);
  ctx.lineTo(x, y + s);
  ctx.lineTo(x - s * 0.6, y);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, s * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function quarterRosette(ctx: Ctx, x: number, y: number, s: number, rot: number, color: string): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, (s * i) / 3, 0, Math.PI / 2);
    ctx.stroke();
  }
  for (let i = 0; i <= 4; i++) {
    const a = (i / 4) * (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * s * 0.33, Math.sin(a) * s * 0.33);
    ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
    ctx.stroke();
  }
  ctx.restore();
}

function paperGround(ctx: Ctx, w: number, h: number, seed: number, base = IVORY): void {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const rnd = grainRng(seed);
  // fibrous grain
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const l = 2 + rnd() * 7;
    const a = rnd() * Math.PI;
    ctx.strokeStyle = rnd() < 0.5 ? 'rgba(120,98,60,0.07)' : 'rgba(255,250,235,0.10)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    ctx.stroke();
  }
  // restrained wear: soft foxing near edges
  for (let i = 0; i < 9; i++) {
    const edge = rnd() < 0.5;
    const x = edge ? (rnd() < 0.5 ? rnd() * 60 : w - rnd() * 60) : rnd() * w;
    const y = edge ? rnd() * h : rnd() < 0.5 ? rnd() * 60 : h - rnd() * 60;
    const r = 12 + rnd() * 34;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(140,105,55,0.10)');
    g.addColorStop(1, 'rgba(140,105,55,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(70,52,28,0.28)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
}

// ---------------------------------------------------------------------------
// Card illustrations. Each draws a large, high-contrast silhouette centred at (0,0)
// in a ~380px box, then fine engraved detail.

function illusNeedle(ctx: Ctx): void {
  // broken ceramic dish, two halves offset along a jagged crack
  const crack: [number, number][] = [
    [-30, -175],
    [-8, -110],
    [-36, -60],
    [6, -10],
    [-14, 40],
    [22, 95],
    [4, 175],
  ];
  const half = (side: number) => {
    ctx.save();
    ctx.translate(side * 9, side * 4);
    ctx.beginPath();
    if (side < 0) {
      ctx.moveTo(crack[0][0], crack[0][1]);
      ctx.arc(0, 0, 170, -Math.PI / 2 - 0.18, Math.PI / 2 + 0.02, true);
    } else {
      ctx.moveTo(crack[0][0], crack[0][1]);
      ctx.arc(0, 0, 170, -Math.PI / 2 - 0.18, Math.PI / 2 + 0.02, false);
    }
    for (let i = crack.length - 1; i >= 0; i--) ctx.lineTo(crack[i][0], crack[i][1]);
    ctx.closePath();
    ctx.fillStyle = ENAMEL;
    ctx.fill();
    // glaze rim
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = IVORY_DEEP;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(230,222,199,0.45)';
    for (let r = 40; r < 140; r += 14) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    hatch(ctx, side < 0 ? 0.9 : -0.9, 7, 1.1, 'rgba(0,0,0,0.25)', [-180, -180, 360, 360]);
    ctx.restore();
  };
  half(-1);
  half(1);
  // turquoise stitches across the crack
  ctx.strokeStyle = TURQ;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    const y = -135 + i * 52;
    ctx.beginPath();
    ctx.moveTo(-34, y - 10);
    ctx.lineTo(32, y + 12);
    ctx.stroke();
  }
  // the needle: long brass spindle crossing diagonally
  ctx.save();
  ctx.rotate(-0.78);
  const len = 250;
  ctx.beginPath();
  ctx.moveTo(-len, 0);
  ctx.lineTo(len - 70, -11);
  ctx.quadraticCurveTo(len - 20, -11, len - 18, 0);
  ctx.quadraticCurveTo(len - 20, 11, len - 70, 11);
  ctx.closePath();
  ctx.fillStyle = BRASS_LIGHT;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // eye
  ctx.beginPath();
  ctx.ellipse(len - 52, 0, 16, 4.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = INK;
  ctx.fill();
  // sharp tip pointing down-left
  ctx.beginPath();
  ctx.moveTo(-len, 0);
  ctx.lineTo(-len + 60, -7);
  ctx.lineTo(-len + 60, 7);
  ctx.closePath();
  ctx.fillStyle = INK;
  ctx.fill();
  ctx.strokeStyle = 'rgba(27,34,52,0.4)';
  ctx.lineWidth = 1;
  for (let x = -len + 70; x < len - 80; x += 9) {
    ctx.beginPath();
    ctx.moveTo(x, 4);
    ctx.lineTo(x + 5, 9);
    ctx.stroke();
  }
  ctx.restore();
  // trailing thread from the eye
  ctx.strokeStyle = TURQ;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(140, -150);
  ctx.bezierCurveTo(200, -120, 120, -40, 175, 10);
  ctx.stroke();
}

function illusLight(ctx: Ctx): void {
  // dark field disc
  ctx.beginPath();
  ctx.arc(0, 0, 178, 0, Math.PI * 2);
  ctx.fillStyle = ENAMEL;
  ctx.fill();
  // sun rays
  ctx.save();
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    const long = i % 2 === 0;
    ctx.beginPath();
    ctx.moveTo(-9, -70);
    ctx.lineTo(0, long ? -168 : -128);
    ctx.lineTo(9, -70);
    ctx.closePath();
    ctx.fillStyle = long ? BRASS_LIGHT : 'rgba(213,189,132,0.7)';
    ctx.fill();
  }
  ctx.restore();
  // sun disc
  const g = ctx.createRadialGradient(-15, -15, 10, 0, 0, 72);
  g.addColorStop(0, '#fbf3dc');
  g.addColorStop(1, '#d9c088');
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // fracture through the sun
  ctx.beginPath();
  ctx.moveTo(-82, -40);
  ctx.lineTo(-30, -18);
  ctx.lineTo(-12, 8);
  ctx.lineTo(18, 2);
  ctx.lineTo(40, 30);
  ctx.lineTo(86, 44);
  ctx.lineWidth = 6;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.strokeStyle = CORAL;
  ctx.stroke();
  // double lens: two thick brass rings
  for (const [r, w] of [
    [182, 14],
    [150, 7],
  ] as const) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.lineWidth = w + 4;
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.lineWidth = w;
    ctx.strokeStyle = BRASS;
    ctx.stroke();
  }
  // lens ticks
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r0 = i % 4 === 0 ? 160 : 165;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    ctx.lineTo(Math.cos(a) * 172, Math.sin(a) * 172);
    ctx.stroke();
  }
  // lens glint
  ctx.beginPath();
  ctx.arc(0, 0, 182, -2.5, -1.9);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#fff6df';
  ctx.stroke();
}

function mask(ctx: Ctx, x: number, y: number, rot: number, mirror: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(mirror, 1);
  ctx.beginPath();
  ctx.moveTo(0, -105);
  ctx.bezierCurveTo(70, -105, 82, -20, 66, 30);
  ctx.bezierCurveTo(52, 80, 22, 110, 0, 112);
  ctx.bezierCurveTo(-22, 110, -52, 80, -66, 30);
  ctx.bezierCurveTo(-82, -20, -70, -105, 0, -105);
  ctx.closePath();
  ctx.fillStyle = ENAMEL;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.save();
  hatch(ctx, 0.5, 6, 1.1, 'rgba(230,222,199,0.18)', [-90, -110, 180, 230]);
  ctx.restore();
  // brow ridge and eyes
  ctx.fillStyle = IVORY;
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(s * 30, -18, 20, 10, s * -0.25, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = INK;
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(s * 30, -16, 7, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // mouth slit
  ctx.strokeStyle = IVORY;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-22, 58);
  ctx.quadraticCurveTo(0, 66, 22, 58);
  ctx.stroke();
  // brass forehead mark
  soulGlyph(ctx, 0, -66, 15, BRASS_LIGHT, 2);
  ctx.restore();
}

function illusThread(ctx: Ctx): void {
  // threads behind masks
  ctx.lineCap = 'round';
  const threads = [
    [-60, -40, 60, -40, -80],
    [-60, 20, 60, 20, 30],
    [-60, 70, 60, 70, 120],
  ];
  for (const [x0, y0, x1, y1, cy] of threads) {
    ctx.strokeStyle = INK;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(0, cy, x1, y1);
    ctx.stroke();
    ctx.strokeStyle = TURQ;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  mask(ctx, -88, 0, -0.22, 1);
  mask(ctx, 88, 0, 0.22, -1);
  // fine knots
  for (const [x0, y0] of [
    [-50, -38],
    [50, -38],
    [-50, 22],
    [50, 22],
    [-48, 70],
    [48, 70],
  ]) {
    ctx.beginPath();
    ctx.arc(x0, y0, 5, 0, Math.PI * 2);
    ctx.fillStyle = BRASS_LIGHT;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = INK;
    ctx.stroke();
  }
}

function illusBell(ctx: Ctx): void {
  // concentric water below
  ctx.save();
  ctx.translate(0, 112);
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(0, 0, 40 + i * 34, 9 + i * 8.5, 0, 0, Math.PI * 2);
    ctx.lineWidth = i === 0 ? 4 : 3;
    ctx.strokeStyle = i % 2 === 0 ? INK : TURQ;
    ctx.stroke();
  }
  ctx.restore();
  // falling drop between bell and water
  ctx.beginPath();
  ctx.moveTo(0, 46);
  ctx.quadraticCurveTo(12, 72, 0, 80);
  ctx.quadraticCurveTo(-12, 72, 0, 46);
  ctx.fillStyle = TURQ;
  ctx.fill();
  // inverted ceremonial bell (mouth up)
  ctx.save();
  ctx.translate(0, -40);
  ctx.beginPath();
  ctx.moveTo(-125, -95);
  ctx.bezierCurveTo(-110, -70, -70, -40, -64, 0);
  ctx.bezierCurveTo(-60, 40, -38, 62, 0, 64);
  ctx.bezierCurveTo(38, 62, 60, 40, 64, 0);
  ctx.bezierCurveTo(70, -40, 110, -70, 125, -95);
  ctx.closePath();
  ctx.fillStyle = '#5a4524';
  ctx.fill();
  ctx.save();
  ctx.clip();
  const g = ctx.createLinearGradient(-125, 0, 125, 0);
  g.addColorStop(0, 'rgba(0,0,0,0.35)');
  g.addColorStop(0.35, 'rgba(213,189,132,0.55)');
  g.addColorStop(0.55, 'rgba(255,240,200,0.25)');
  g.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = g;
  ctx.fillRect(-130, -100, 260, 170);
  hatch(ctx, 0, 7, 1.2, 'rgba(27,34,52,0.35)', [-130, -100, 260, 170]);
  // decorative bands
  ctx.strokeStyle = BRASS_LIGHT;
  ctx.lineWidth = 4;
  for (const y of [-58, -30, 22]) {
    ctx.beginPath();
    ctx.moveTo(-130, y);
    ctx.lineTo(130, y);
    ctx.stroke();
  }
  for (let i = -3; i <= 3; i++) lozenge(ctx, i * 22, -44, 8, BRASS_LIGHT, 1.6);
  ctx.restore();
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // mouth rim ellipse
  ctx.beginPath();
  ctx.ellipse(0, -95, 125, 20, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#2a2014';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = BRASS_LIGHT;
  ctx.stroke();
  // handle/stem at the bottom (bell is inverted)
  ctx.beginPath();
  ctx.arc(0, 78, 14, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.restore();
}

function illusPolish(ctx: Ctx): void {
  // hand mirror
  ctx.save();
  ctx.rotate(-0.35);
  ctx.beginPath();
  ctx.roundRect(-16, 80, 32, 120, 10);
  ctx.fillStyle = BRASS;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, -30, 105, 125, 0, 0, Math.PI * 2);
  ctx.fillStyle = BRASS;
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, -30, 88, 108, 0, 0, Math.PI * 2);
  const g = ctx.createLinearGradient(-80, -130, 80, 80);
  g.addColorStop(0, '#9fd9d3');
  g.addColorStop(0.5, ENAMEL);
  g.addColorStop(1, '#0f1626');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  // starburst glint
  ctx.fillStyle = '#fff7e2';
  ctx.save();
  ctx.translate(-30, -70);
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(0, i % 2 ? -40 : -70);
    ctx.lineTo(5, 0);
    ctx.lineTo(0, i % 2 ? 40 : 70);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function illusMend(ctx: Ctx): void {
  ctx.beginPath();
  ctx.moveTo(-40, -150);
  ctx.lineTo(40, -150);
  ctx.bezierCurveTo(40, -110, 30, -95, 50, -70);
  ctx.bezierCurveTo(130, 0, 120, 110, 60, 150);
  ctx.lineTo(-60, 150);
  ctx.bezierCurveTo(-120, 110, -130, 0, -50, -70);
  ctx.bezierCurveTo(-30, -95, -40, -110, -40, -150);
  ctx.closePath();
  ctx.fillStyle = ENAMEL;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.save();
  ctx.clip();
  hatch(ctx, 0.7, 7, 1.1, 'rgba(230,222,199,0.16)', [-130, -150, 260, 300]);
  ctx.strokeStyle = '#e6c46e';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-120, -10);
  ctx.lineTo(-40, 10);
  ctx.lineTo(-10, -40);
  ctx.lineTo(40, 20);
  ctx.lineTo(120, 0);
  ctx.moveTo(-10, -40);
  ctx.lineTo(0, -150);
  ctx.moveTo(40, 20);
  ctx.lineTo(20, 150);
  ctx.stroke();
  ctx.restore();
}

const ILLUSTRATIONS: Record<CardId, (ctx: Ctx) => void> = {
  needle: illusNeedle,
  light: illusLight,
  thread: illusThread,
  bell: illusBell,
  polish: illusPolish,
  mend: illusMend,
};

/** Short pattern label shown on the card's lower band (full text lives in the DOM panel). */
function statLine(id: CardId): string {
  const d = cardDef(id);
  if (d.kind === 'boon') return id === 'polish' ? '+15% DAMAGE' : '+20 INTEGRITY';
  const w = WEAPONS[d.id];
  const kind = { projectile: 'SINGLE', lance: 'HEAVY', chain: 'CHAIN ×3', pulse: 'RING' }[w.pattern];
  return `${Math.round(w.damage)} · ${w.interval.toFixed(1)}s · ${kind}`;
}

/** Draws one card face. Printed bottom is canvas bottom (UV y=0). */
export function drawCardFace(id: CardId): HTMLCanvasElement {
  const W = CARD_TEX_W;
  const H = CARD_TEX_H;
  const [c, ctx] = makeCanvas(W, H);
  const def = cardDef(id);
  const isBoon = def.kind === 'boon';
  paperGround(ctx, W, H, id.charCodeAt(0) * 31 + id.length, isBoon ? '#e2dac8' : IVORY);

  // frame: outer brass rule, inner hairline, lozenge chain
  ctx.lineWidth = 9;
  ctx.strokeStyle = BRASS;
  roundRectPath(ctx, 14, 14, W - 28, H - 28, 26);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  roundRectPath(ctx, 30, 30, W - 60, H - 60, 16);
  ctx.stroke();
  roundRectPath(ctx, 38, 38, W - 76, H - 76, 12);
  ctx.lineWidth = 1;
  ctx.stroke();
  for (const [x, y, r] of [
    [38, 38, 0],
    [W - 38, 38, Math.PI / 2],
    [W - 38, H - 38, Math.PI],
    [38, H - 38, -Math.PI / 2],
  ] as const) {
    quarterRosette(ctx, x, y, 34, r, BRASS);
  }

  // title band
  const titleY = 108;
  ctx.fillStyle = INK;
  ctx.font = `700 60px ${SERIF}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let size = 60;
  while (ctx.measureText(def.name).width > W - 120 && size > 40) {
    size -= 2;
    ctx.font = `700 ${size}px ${SERIF}`;
  }
  ctx.fillText(def.name, W / 2, titleY);
  ctx.strokeStyle = BRASS;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, titleY + 20);
  ctx.lineTo(W / 2 - 28, titleY + 20);
  ctx.moveTo(W / 2 + 28, titleY + 20);
  ctx.lineTo(W - 80, titleY + 20);
  ctx.stroke();
  soulGlyph(ctx, W / 2, titleY + 20, 14, isBoon ? CORAL : BRASS, 1.6);

  // illustration medallion area
  ctx.save();
  ctx.translate(W / 2, 382);
  ctx.scale(0.98, 0.98);
  ILLUSTRATIONS[id](ctx);
  ctx.restore();

  // bottom band
  const bandY = H - 150;
  ctx.fillStyle = 'rgba(27,34,52,0.92)';
  roundRectPath(ctx, 54, bandY, W - 108, 84, 12);
  ctx.fill();
  ctx.strokeStyle = BRASS_LIGHT;
  ctx.lineWidth = 2;
  roundRectPath(ctx, 60, bandY + 6, W - 120, 72, 9);
  ctx.stroke();
  ctx.fillStyle = '#efe6cd';
  ctx.font = `600 31px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(statLine(id), W / 2, bandY + 43);
  ctx.fillStyle = INK_SOFT;
  ctx.font = `600 18px ${SANS}`;
  ctx.fillText(isBoon ? 'BOON · USED ONCE' : 'WEAPON · BASE EMITTER', W / 2, H - 46);
  return c;
}

/** Card back (used for the memory stack). */
export function drawCardBack(): HTMLCanvasElement {
  const W = 288;
  const H = 384;
  const [c, ctx] = makeCanvas(W, H);
  ctx.fillStyle = ENAMEL;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = BRASS;
  ctx.lineWidth = 6;
  roundRectPath(ctx, 10, 10, W - 20, H - 20, 14);
  ctx.stroke();
  ctx.lineWidth = 1.2;
  for (let r = 20; r < 130; r += 12) {
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
    ctx.strokeStyle = r % 24 === 0 ? 'rgba(213,189,132,0.5)' : 'rgba(105,218,208,0.2)';
    ctx.stroke();
  }
  soulGlyph(ctx, W / 2, H / 2, 46, BRASS_LIGHT, 2.5);
  return c;
}

export function drawCardEdge(): HTMLCanvasElement {
  // brass edge band with ivory core (paper stock visible on the card thickness)
  const [c, ctx] = makeCanvas(64, 64);
  ctx.fillStyle = '#c9b78a';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#efe6cf';
  ctx.fillRect(0, 22, 64, 20);
  return c;
}

// ---------------------------------------------------------------------------
// Environment textures

export function drawBoardTop(size = 2048): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  const s = size / 2;
  const rnd = grainRng(1234);
  ctx.fillStyle = '#121a2a';
  ctx.fillRect(0, 0, size, size);
  // slate grain
  for (let i = 0; i < 14000; i++) {
    const x = rnd() * size;
    const y = rnd() * size;
    ctx.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(x, y, 2 + rnd() * 3, 1 + rnd() * 2);
  }
  const g = ctx.createRadialGradient(s, s, s * 0.1, s, s, s);
  g.addColorStop(0, 'rgba(40,60,90,0.35)');
  g.addColorStop(0.7, 'rgba(20,28,45,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(s, s);
  const k = s / 10.6; // px per world unit
  // low-contrast engraved rings (kept faint so approach paths stay clean)
  ctx.strokeStyle = 'rgba(181,154,99,0.10)';
  ctx.lineWidth = 2;
  for (const r of [5.2, 6.85, 8.6]) {
    ctx.beginPath();
    ctx.arc(0, 0, r * k, 0, Math.PI * 2);
    ctx.stroke();
  }
  // spawn ring hint: dotted
  ctx.fillStyle = 'rgba(105,218,208,0.12)';
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 9.5 * k, Math.sin(a) * 9.5 * k, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  // outer glyph band near the rim
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const x = Math.cos(a) * 10.05 * k;
    const y = Math.sin(a) * 10.05 * k;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a + Math.PI / 2);
    if (i % 4 === 0) soulGlyph(ctx, 0, 0, 13, 'rgba(181,154,99,0.32)', 1.6);
    else lozenge(ctx, 0, 0, 7, 'rgba(181,154,99,0.22)', 1.2);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 10.4 * k, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(181,154,99,0.25)';
  ctx.lineWidth = 3;
  ctx.stroke();
  return c;
}

export function drawRimBand(): HTMLCanvasElement {
  const W = 2048;
  const H = 128;
  const [c, ctx] = makeCanvas(W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#d8c08a');
  g.addColorStop(0.5, '#b59a63');
  g.addColorStop(1, '#7d6538');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  const rnd = grainRng(77);
  for (let i = 0; i < 3000; i++) {
    ctx.strokeStyle = rnd() < 0.5 ? 'rgba(255,240,200,0.10)' : 'rgba(60,40,10,0.10)';
    ctx.lineWidth = 1;
    const y = rnd() * H;
    const x = rnd() * W;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20 + rnd() * 50, y);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(40,28,10,0.7)';
  ctx.lineWidth = 2;
  for (const y of [14, H - 14]) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  for (let i = 0; i < 32; i++) {
    const x = (i + 0.5) * (W / 32);
    if (i % 2 === 0) soulGlyph(ctx, x, H / 2, 30, 'rgba(40,28,10,0.75)', 2.2);
    else {
      lozenge(ctx, x - 20, H / 2, 14, 'rgba(40,28,10,0.6)', 2);
      lozenge(ctx, x + 20, H / 2, 14, 'rgba(40,28,10,0.6)', 2);
    }
  }
  return c;
}

export function drawLidEnamel(w = 1560, h = 1400): HTMLCanvasElement {
  // UV space: shape coords mapped to [0,1] over the 7.8 x 7.0 lid
  const [c, ctx] = makeCanvas(w, h);
  ctx.fillStyle = '#1a2846';
  ctx.fillRect(0, 0, w, h);
  const rnd = grainRng(5);
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = rnd() < 0.5 ? 'rgba(120,160,220,0.035)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(rnd() * w, rnd() * h, 2, 2);
  }
  // fine engraved guilloché lines
  ctx.strokeStyle = 'rgba(181,154,99,0.16)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 90; i++) {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 8) {
      const y = (i / 90) * h + Math.sin(x * 0.012 + i * 0.6) * 9;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // border glyph chain
  ctx.strokeStyle = 'rgba(213,189,132,0.55)';
  ctx.lineWidth = 3;
  roundRectPath(ctx, 26, 26, w - 52, h - 52, 30);
  ctx.stroke();
  for (let x = 70; x < w - 50; x += 46) {
    lozenge(ctx, x, 46, 9, 'rgba(213,189,132,0.45)', 1.4);
    lozenge(ctx, x, h - 46, 9, 'rgba(213,189,132,0.45)', 1.4);
  }
  for (let y = 80; y < h - 60; y += 46) {
    lozenge(ctx, 46, y, 9, 'rgba(213,189,132,0.45)', 1.4);
    lozenge(ctx, w - 46, y, 9, 'rgba(213,189,132,0.45)', 1.4);
  }
  return c;
}

export function drawSocketFloor(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(256, 340);
  const g = ctx.createRadialGradient(128, 170, 20, 128, 170, 200);
  g.addColorStop(0, '#16203a');
  g.addColorStop(1, '#070a14');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 340);
  ctx.strokeStyle = 'rgba(105,218,208,0.18)';
  ctx.lineWidth = 2;
  for (let r = 30; r < 110; r += 18) {
    ctx.beginPath();
    ctx.arc(128, 170, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  soulGlyph(ctx, 128, 170, 34, 'rgba(105,218,208,0.35)', 2);
  // baked contact occlusion toward the walls
  const o = ctx.createLinearGradient(0, 0, 256, 0);
  o.addColorStop(0, 'rgba(0,0,0,0.6)');
  o.addColorStop(0.15, 'rgba(0,0,0,0)');
  o.addColorStop(0.85, 'rgba(0,0,0,0)');
  o.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = o;
  ctx.fillRect(0, 0, 256, 340);
  const o2 = ctx.createLinearGradient(0, 0, 0, 340);
  o2.addColorStop(0, 'rgba(0,0,0,0.6)');
  o2.addColorStop(0.12, 'rgba(0,0,0,0)');
  o2.addColorStop(0.88, 'rgba(0,0,0,0)');
  o2.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = o2;
  ctx.fillRect(0, 0, 256, 340);
  return c;
}

export function drawCeramic(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#d8d0b7';
  ctx.fillRect(0, 0, 512, 512);
  const rnd = grainRng(9);
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = rnd() < 0.5 ? 'rgba(255,255,245,0.05)' : 'rgba(110,90,60,0.05)';
    ctx.fillRect(rnd() * 512, rnd() * 512, 3, 3);
  }
  // faint crackle glaze
  ctx.strokeStyle = 'rgba(90,70,40,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 70; i++) {
    let x = rnd() * 512;
    let y = rnd() * 512;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let j = 0; j < 5; j++) {
      x += (rnd() - 0.5) * 60;
      y += (rnd() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return c;
}

export function drawBrassBrushed(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#b59a63';
  ctx.fillRect(0, 0, 512, 512);
  const rnd = grainRng(19);
  for (let i = 0; i < 2500; i++) {
    ctx.strokeStyle = rnd() < 0.5 ? 'rgba(255,240,200,0.12)' : 'rgba(60,40,10,0.12)';
    const y = rnd() * 512;
    const x = rnd() * 512;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30 + rnd() * 80, y);
    ctx.stroke();
  }
  // worn darker patina patches
  for (let i = 0; i < 12; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const r = 30 + rnd() * 70;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(70,50,20,0.18)');
    g.addColorStop(1, 'rgba(70,50,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return c;
}

export function drawMothWing(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);
  // wing occupies the full square; shape alpha comes from geometry
  const g = ctx.createLinearGradient(0, 256, 256, 0);
  g.addColorStop(0, '#cfc4a6');
  g.addColorStop(1, '#efe7d2');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(27,34,52,0.55)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 7; i++) {
    const a = 0.15 + i * 0.2;
    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.quadraticCurveTo(Math.cos(a) * 140, 256 - Math.sin(a) * 90, Math.cos(a) * 260, 256 - Math.sin(a) * 260);
    ctx.stroke();
  }
  // eye-spot
  ctx.beginPath();
  ctx.arc(150, 110, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#1b2234';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 110, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#69dad0';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 110, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#1b2234';
  ctx.fill();
  // folded edge band
  ctx.strokeStyle = 'rgba(27,34,52,0.8)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 256, 245, -Math.PI / 2, 0);
  ctx.stroke();
  return c;
}

export function drawMaskFace(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#e4dcc4';
  ctx.fillRect(0, 0, 256, 256);
  const rnd = grainRng(31);
  ctx.strokeStyle = 'rgba(90,70,40,0.25)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 12; i++) {
    let x = rnd() * 256;
    let y = rnd() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let j = 0; j < 4; j++) {
      x += (rnd() - 0.5) * 50;
      y += (rnd() - 0.5) * 50;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return c;
}

export function drawRadial(inner: string, outer: string, size = 128): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export function drawVoid(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(1024, 1024);
  const g = ctx.createRadialGradient(512, 512, 40, 512, 512, 512);
  g.addColorStop(0, '#16233a');
  g.addColorStop(0.45, '#0b1322');
  g.addColorStop(1, '#05080f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 1024);
  const rnd = grainRng(3);
  ctx.strokeStyle = 'rgba(105,218,208,0.035)';
  ctx.lineWidth = 2;
  for (let r = 120; r < 512; r += 46 + rnd() * 30) {
    ctx.beginPath();
    ctx.arc(512, 512, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  return c;
}
