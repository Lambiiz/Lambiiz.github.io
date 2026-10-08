// Procedural engraved artwork drawn once per definition into CanvasTextures.
// All imagery here is original: a small motif vocabulary (soul glyph, lozenge chain,
// dotted arcs, quarter rosettes) repeats across cards, the board rim and the Base lid.
import * as THREE from 'three';
import { cardDef, WEAPONS } from '../game/content';
import type { CardId, CardType } from '../game/types';

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

function illusQuicken(ctx: Ctx): void {
  // an hourglass whose sand hangs in the air
  ctx.lineWidth = 7;
  ctx.strokeStyle = INK;
  ctx.fillStyle = BRASS;
  ctx.fillRect(-110, -170, 220, 22);
  ctx.strokeRect(-110, -170, 220, 22);
  ctx.fillRect(-110, 148, 220, 22);
  ctx.strokeRect(-110, 148, 220, 22);
  ctx.beginPath();
  ctx.moveTo(-85, -148);
  ctx.bezierCurveTo(-85, -40, -14, -20, -14, 0);
  ctx.bezierCurveTo(-14, 20, -85, 40, -85, 148);
  ctx.lineTo(85, 148);
  ctx.bezierCurveTo(85, 40, 14, 20, 14, 0);
  ctx.bezierCurveTo(14, -20, 85, -40, 85, -148);
  ctx.closePath();
  ctx.fillStyle = 'rgba(160,200,195,0.35)';
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-70, -120);
  ctx.lineTo(70, -120);
  ctx.lineTo(10, -20);
  ctx.lineTo(-10, -20);
  ctx.closePath();
  ctx.fillStyle = '#b89a5a';
  ctx.fill();
  const rnd = grainRng(5);
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    ctx.arc((rnd() - 0.5) * 40, 10 + i * 4.5, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = TURQ;
    ctx.fill();
  }
  for (const x of [-120, 120]) {
    ctx.beginPath();
    ctx.moveTo(x, -148);
    ctx.lineTo(x, 148);
    ctx.lineWidth = 10;
    ctx.strokeStyle = INK;
    ctx.stroke();
  }
}

function illusKeen(ctx: Ctx): void {
  // a long blade drawn across a whetstone, sparks flying
  ctx.save();
  ctx.rotate(-0.55);
  ctx.beginPath();
  ctx.moveTo(-190, -10);
  ctx.lineTo(120, -18);
  ctx.lineTo(175, 0);
  ctx.lineTo(120, 18);
  ctx.lineTo(-190, 10);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, -18, 0, 18);
  g.addColorStop(0, '#e9e4d6');
  g.addColorStop(0.5, '#8d96a6');
  g.addColorStop(1, '#3b4352');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.fillStyle = BRASS;
  ctx.fillRect(-206, -30, 18, 60);
  ctx.strokeRect(-206, -30, 18, 60);
  ctx.fillStyle = '#3a2418';
  ctx.fillRect(-262, -12, 58, 24);
  ctx.strokeRect(-262, -12, 58, 24);
  ctx.restore();
  // whetstone
  ctx.beginPath();
  ctx.roundRect(-150, 70, 300, 70, 12);
  ctx.fillStyle = '#5a5249';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.save();
  ctx.clip();
  hatch(ctx, 0.3, 8, 1.2, 'rgba(230,222,199,0.18)', [-150, 70, 300, 70]);
  ctx.restore();
  const rnd = grainRng(19);
  ctx.strokeStyle = '#e8a050';
  ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) {
    const a = -Math.PI / 2 + (rnd() - 0.5) * 1.6;
    const r0 = 20 + rnd() * 20;
    const r1 = r0 + 30 + rnd() * 50;
    ctx.beginPath();
    ctx.moveTo(30 + Math.cos(a) * r0, 60 + Math.sin(a) * r0);
    ctx.lineTo(30 + Math.cos(a) * r1, 60 + Math.sin(a) * r1);
    ctx.stroke();
  }
}

function illusSturdy(ctx: Ctx): void {
  // a squat reliquary chest bound with iron straps
  ctx.beginPath();
  ctx.roundRect(-150, -40, 300, 170, 14);
  ctx.fillStyle = '#5a3a24';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-150, -40);
  ctx.quadraticCurveTo(0, -170, 150, -40);
  ctx.closePath();
  ctx.fillStyle = '#6b4730';
  ctx.fill();
  ctx.stroke();
  ctx.save();
  ctx.clip();
  hatch(ctx, 0.15, 10, 1.3, 'rgba(230,222,199,0.14)', [-150, -170, 300, 140]);
  ctx.restore();
  ctx.fillStyle = '#2b2b30';
  for (const x of [-100, 80]) {
    ctx.fillRect(x, -120, 22, 250);
    ctx.strokeRect(x, -120, 22, 250);
  }
  ctx.fillRect(-150, 40, 300, 20);
  ctx.strokeRect(-150, 40, 300, 20);
  // clasp
  ctx.beginPath();
  ctx.arc(0, 50, 26, 0, Math.PI * 2);
  ctx.fillStyle = BRASS;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.fillRect(-5, 44, 10, 22);
  // rivets
  ctx.fillStyle = BRASS_LIGHT;
  for (const [x, y] of [[-89, -70], [-89, 0], [-89, 100], [91, -70], [91, 0], [91, 100]]) {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function illusStray(ctx: Ctx): void {
  // a single memory falling like a comet onto a small piece below
  const g = ctx.createLinearGradient(140, -170, -10, 60);
  g.addColorStop(0, 'rgba(105,218,208,0)');
  g.addColorStop(1, 'rgba(105,218,208,0.9)');
  ctx.beginPath();
  ctx.moveTo(170, -190);
  ctx.lineTo(-2, 52);
  ctx.lineTo(18, 64);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(4, 58, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#e8fffb';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.stroke();
  // the struck piece: a little hooded pawn
  ctx.beginPath();
  ctx.moveTo(-40, 170);
  ctx.lineTo(40, 170);
  ctx.lineTo(28, 140);
  ctx.quadraticCurveTo(30, 90, 4, 82);
  ctx.quadraticCurveTo(-22, 90, -20, 140);
  ctx.closePath();
  ctx.fillStyle = IVORY_DEEP;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.stroke();
  // impact rays
  ctx.strokeStyle = CORAL;
  ctx.lineWidth = 4;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(4 + Math.cos(a) * 30, 58 + Math.sin(a) * 30);
    ctx.lineTo(4 + Math.cos(a) * 56, 58 + Math.sin(a) * 56);
    ctx.stroke();
  }
  // a few stars
  const rnd = grainRng(41);
  ctx.fillStyle = INK_SOFT;
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    ctx.arc(-200 + rnd() * 400, -170 + rnd() * 150, 2 + rnd() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ILLUSTRATIONS: Record<CardId, (ctx: Ctx) => void> = {
  needle: illusNeedle,
  light: illusLight,
  thread: illusThread,
  bell: illusBell,
  swift: illusQuicken,
  keen: illusKeen,
  farsight: illusPolish,
  sturdy: illusSturdy,
  stray: illusStray,
  mend: illusMend,
};

/** Muted type colours: towers dark blue, actives dark red, passives dark brown. */
export const TYPE_COLORS: Record<CardType, { frame: string; band: string; text: string; label: string }> = {
  tower: { frame: '#2f3d55', band: '#1d2638', text: '#d9d2bf', label: 'TOWER' },
  active: { frame: '#5c2b28', band: '#3a1916', text: '#e2d4c0', label: 'ACTIVE' },
  passive: { frame: '#54402a', band: '#33261a', text: '#e0d3bb', label: 'PASSIVE' },
};

export interface RichWord {
  text: string;
  tone: 0 | 1 | -1; // 1 bonus (green), -1 drawback (red)
  glue: boolean; // no space before (punctuation right after a highlighted phrase)
}

/** Split card text with {+bonus} / {-drawback} markup into styled words. */
export function richWords(text: string): RichWord[] {
  const out: RichWord[] = [];
  const re = /\{([+-])([^}]*)\}|([^{]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const tone: RichWord['tone'] = m[1] === '+' ? 1 : m[1] === '-' ? -1 : 0;
    const body = m[1] ? m[1] + m[2] : m[3];
    body.split(' ').forEach((w, i) => {
      if (w) out.push({ text: w, tone, glue: i === 0 && out.length > 0 && !/^\s/.test(body) });
    });
  }
  return out;
}

function joinWords(ws: RichWord[]): string {
  return ws.map((w, i) => (i > 0 && !w.glue ? ' ' : '') + w.text).join('');
}

function wrapRich(ctx: Ctx, words: RichWord[], maxW: number): RichWord[][] {
  const lines: RichWord[][] = [];
  let line: RichWord[] = [];
  const width = (ws: RichWord[]) => ctx.measureText(joinWords(ws)).width;
  for (const w of words) {
    if (line.length && width([...line, w]) > maxW) {
      lines.push(line);
      line = [w];
    } else line.push(w);
  }
  if (line.length) lines.push(line);
  return lines;
}

function drawRichLine(ctx: Ctx, line: RichWord[], cx: number, y: number, colors: Record<-1 | 0 | 1, string>): void {
  const space = ctx.measureText(' ').width;
  const total = ctx.measureText(joinWords(line)).width;
  let x = cx - total / 2;
  ctx.textAlign = 'left';
  line.forEach((w, i) => {
    if (i > 0 && !w.glue) x += space;
    ctx.fillStyle = colors[w.tone];
    ctx.fillText(w.text, x, y);
    x += ctx.measureText(w.text).width;
  });
  ctx.textAlign = 'center';
}

/** Worn edge: random nicks along a rectangle's border, drawn in the background colour. */
function wornEdges(ctx: Ctx, w: number, h: number, seed: number, color: string): void {
  const rnd = grainRng(seed);
  ctx.fillStyle = color;
  for (let i = 0; i < 70; i++) {
    const side = rnd() * 4;
    const t = rnd();
    const r = 2 + rnd() * 7;
    const x = side < 1 ? t * w : side < 2 ? w - rnd() * 4 : side < 3 ? t * w : rnd() * 4;
    const y = side < 1 ? rnd() * 4 : side < 2 ? t * h : side < 3 ? h - rnd() * 4 : t * h;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Printed-card finish: soft posterisation plus a little grain, so the cards look stamped rather
 * than smoothly digital. (No ordered dither: its regular pattern shimmers when the card is scaled.)
 */
function printFinish(c: HTMLCanvasElement, seed: number, levels = 14): void {
  const ctx = c.getContext('2d')!;
  const img = ctx.getImageData(0, 0, c.width, c.height);
  const d = img.data;
  const rnd = grainRng(seed);
  const step = 255 / (levels - 1);
  for (let y = 0; y < c.height; y++)
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4;
      if (d[i + 3] === 0) continue;
      const g = (rnd() - 0.5) * 10;
      for (let k = 0; k < 3; k++) {
        const v = d[i + k] + g;
        d[i + k] = Math.max(0, Math.min(255, Math.round(v / step) * step));
      }
    }
  ctx.putImageData(img, 0, 0);
}

/** A square icon of a card's illustration (used for the active-card cooldown icons). */
export function drawCardIcon(id: CardId, size = 96): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  paperGround(ctx, size, size, id.length * 13, '#cfc3a2');
  ctx.translate(size / 2, size / 2);
  ctx.scale(size / 330, size / 330);
  ILLUSTRATIONS[id](ctx);
  return c;
}

/** Draws one card face. Printed bottom is canvas bottom (UV y=0). */
export function drawCardFace(id: CardId): HTMLCanvasElement {
  const W = CARD_TEX_W;
  const H = CARD_TEX_H;
  const [c, ctx] = makeCanvas(W, H);
  const def = cardDef(id);
  const tc = TYPE_COLORS[def.type];
  const seed = id.charCodeAt(0) * 31 + id.length * 7;

  // frame in the type colour, with grime
  ctx.fillStyle = tc.frame;
  ctx.fillRect(0, 0, W, H);
  const rnd = grainRng(seed);
  for (let i = 0; i < 1800; i++) {
    ctx.fillStyle = rnd() < 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,240,210,0.05)';
    ctx.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 4, 1 + rnd() * 3);
  }
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(10,8,6,0.75)';
  roundRectPath(ctx, 22, 22, W - 44, H - 44, 18);
  ctx.stroke();

  // header band with the name and the cost pip
  ctx.fillStyle = tc.band;
  roundRectPath(ctx, 34, 34, W - 68, 96, 12);
  ctx.fill();
  ctx.fillStyle = tc.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let size = 54;
  ctx.font = `700 ${size}px ${SERIF}`;
  while (ctx.measureText(def.name).width > W - 220 && size > 36) {
    size -= 2;
    ctx.font = `700 ${size}px ${SERIF}`;
  }
  ctx.fillText(def.name, W / 2 + 34, 84);
  // cost pip: a wax seal with the energy cost
  ctx.beginPath();
  ctx.arc(86, 84, 42, 0, Math.PI * 2);
  ctx.fillStyle = '#1a120c';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#b09060';
  ctx.stroke();
  ctx.fillStyle = '#f0dcae';
  ctx.font = `800 54px ${SANS}`;
  ctx.fillText(String(def.cost), 86, 87);

  // illustration on aged paper
  const px = 46;
  const py = 144;
  const pw = W - 92;
  const ph = 392;
  ctx.save();
  roundRectPath(ctx, px, py, pw, ph, 10);
  ctx.clip();
  paperGround(ctx, W, H, seed + 3, '#cfc3a2');
  ctx.translate(W / 2, py + ph / 2);
  ctx.scale(0.86, 0.86);
  ILLUSTRATIONS[id](ctx);
  ctx.restore();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#120d09';
  roundRectPath(ctx, px, py, pw, ph, 10);
  ctx.stroke();

  // rules text box
  const ty = py + ph + 14;
  ctx.fillStyle = tc.band;
  roundRectPath(ctx, 34, ty, W - 68, H - ty - 34, 12);
  ctx.fill();
  ctx.fillStyle = tc.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  if (def.type === 'tower') {
    const w = WEAPONS[def.id];
    const kind = { projectile: 'SINGLE', lance: 'HEAVY', chain: 'CHAIN ×3', pulse: 'RING' }[w.pattern];
    ctx.font = `700 40px ${SANS}`;
    ctx.fillText(`${w.damage} DMG · ${w.interval.toFixed(1)}s`, W / 2, ty + 62);
    ctx.font = `600 30px ${SANS}`;
    ctx.fillText(`RANGE ${w.range} · ${kind}`, W / 2, ty + 108);
  } else {
    ctx.font = `600 29px ${SANS}`;
    const lines = wrapRich(ctx, richWords(def.summary), W - 116).slice(0, 4);
    const colors = { 0: tc.text, 1: '#9ad78c', [-1]: '#ec8a78' } as Record<-1 | 0 | 1, string>;
    lines.forEach((ln, i) => drawRichLine(ctx, ln, W / 2, ty + 50 + i * 38, colors));
  }
  ctx.font = `800 22px ${SANS}`;
  ctx.globalAlpha = 0.75;
  ctx.fillText(tc.label, W / 2, H - 50);
  ctx.globalAlpha = 1;

  wornEdges(ctx, W, H, seed + 9, 'rgba(255,240,210,0.07)');
  printFinish(c, seed + 11);
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

// ---------------------------------------------------------------------------
// Environment textures

/** Engraved brass name-plate for the ceramic body (glyph chain between soul glyphs). */
export function drawMedallion(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(768, 216);
  ctx.clearRect(0, 0, 768, 216);
  const g = ctx.createLinearGradient(0, 0, 0, 216);
  g.addColorStop(0, '#dcc48f');
  g.addColorStop(0.5, '#b59a63');
  g.addColorStop(1, '#7e6438');
  ctx.fillStyle = g;
  roundRectPath(ctx, 8, 8, 752, 200, 100);
  ctx.fill();
  ctx.strokeStyle = 'rgba(40,28,10,0.8)';
  ctx.lineWidth = 4;
  roundRectPath(ctx, 22, 22, 724, 172, 86);
  ctx.stroke();
  soulGlyph(ctx, 110, 108, 52, 'rgba(40,28,10,0.85)', 3);
  soulGlyph(ctx, 658, 108, 52, 'rgba(40,28,10,0.85)', 3);
  for (let i = 0; i < 7; i++) lozenge(ctx, 234 + i * 50, 108, 22, 'rgba(40,28,10,0.75)', 3);
  ctx.beginPath();
  ctx.ellipse(384, 108, 30, 30, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#1b2a48';
  ctx.fill();
  ctx.strokeStyle = 'rgba(40,28,10,0.9)';
  ctx.stroke();
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

/**
 * Fog veil for a horizontal plane of `world` units at height `fogY`. Transparent around the Base,
 * thickening to near-black toward the table edges, with a pool of light around the candle. Hole
 * centres are shifted toward the viewer so they line up with the ground seen through the veil.
 */
export function drawFogVeil(world: number, fogY: number, candle: { x: number; z: number }, book: { x: number; z: number }, size = 1024): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  const img = ctx.createImageData(size, size);
  const d = img.data;
  const shift = fogY / Math.tan((58 * Math.PI) / 180); // view elevation (SceneRig)
  const ss = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let py = 0; py < size; py++)
    for (let px = 0; px < size; px++) {
      const wx = (px / size - 0.5) * world;
      const wz = (py / size - 0.5) * world;
      const r = Math.hypot(wx, wz - shift);
      let a = ss(11, 27, r) * 0.86 + ss(27, 42, r) * 0.12;
      // slow drifting wisps so the veil reads as fog, not a flat gradient
      a += (Math.sin(wx * 0.21 + wz * 0.07) + Math.sin(wz * 0.17 - wx * 0.11 + 1.7)) * 0.03 * ss(14, 24, r);
      const dc = Math.hypot(wx - candle.x, wz - candle.z - shift);
      a *= 1 - 0.8 * (1 - ss(3, 12, dc));
      const db = Math.hypot(wx - book.x, wz - book.z - shift);
      a *= 1 - 0.4 * (1 - ss(5, 11, db));
      const i = (py * size + px) * 4;
      d[i] = 7;
      d[i + 1] = 4;
      d[i + 2] = 3;
      d[i + 3] = Math.round(Math.min(0.98, Math.max(0, a)) * 255);
    }
  ctx.putImageData(img, 0, 0);
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

// ---------------------------------------------------------------------------
// Tabletop (Inscryption-like wooden table, candle-lit, worn)

/** Dark worn planks. Planks run along U; tile with RepeatWrapping. */
export function drawWoodTable(size = 2048): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  const rnd = grainRng(4242);
  const planks = 6;
  const ph = size / planks;
  for (let p = 0; p < planks; p++) {
    const y0 = p * ph;
    const tone = 0.75 + rnd() * 0.35;
    const base = [Math.round(58 * tone), Math.round(38 * tone), Math.round(24 * tone)];
    ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
    ctx.fillRect(0, y0, size, ph);
    // grain: long wavy lines
    for (let g = 0; g < 70; g++) {
      const gy = y0 + rnd() * ph;
      const amp = 2 + rnd() * 8;
      const freq = 0.002 + rnd() * 0.006;
      const ph0 = rnd() * 10;
      ctx.strokeStyle = rnd() < 0.6 ? `rgba(20,10,4,${0.12 + rnd() * 0.22})` : `rgba(150,105,60,${0.05 + rnd() * 0.08})`;
      ctx.lineWidth = 0.8 + rnd() * 2.2;
      ctx.beginPath();
      for (let x = 0; x <= size; x += 16) {
        const yy = gy + Math.sin(x * freq + ph0) * amp + Math.sin(x * freq * 3.1 + ph0) * amp * 0.3;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    // knots
    for (let k = 0; k < 2; k++) {
      const kx = rnd() * size;
      const ky = y0 + ph * (0.25 + rnd() * 0.5);
      for (let r = 6; r < 34; r += 5) {
        ctx.beginPath();
        ctx.ellipse(kx, ky, r * 2.4, r * 0.8, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(15,8,3,${0.35 - r * 0.008})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(kx, ky, 10, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10,5,2,0.7)';
      ctx.fill();
    }
    // plank seam
    ctx.fillStyle = 'rgba(5,2,0,0.85)';
    ctx.fillRect(0, y0, size, 5);
    ctx.fillStyle = 'rgba(120,80,45,0.12)';
    ctx.fillRect(0, y0 + 5, size, 2);
    // nails at the plank ends
    for (const nx of [40, size - 40]) {
      ctx.beginPath();
      ctx.arc(nx, y0 + ph / 2, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1612';
      ctx.fill();
    }
  }
  // scratches and wax drips
  for (let i = 0; i < 260; i++) {
    const x = rnd() * size;
    const y = rnd() * size;
    const l = 10 + rnd() * 60;
    const a = rnd() * Math.PI;
    ctx.strokeStyle = `rgba(170,130,90,${0.04 + rnd() * 0.08})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    ctx.stroke();
  }
  for (let i = 0; i < 14; i++) {
    const x = rnd() * size;
    const y = rnd() * size;
    const r = 6 + rnd() * 18;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + rnd() * 0.5), rnd() * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,180,140,${0.1 + rnd() * 0.12})`;
    ctx.fill();
  }
  return c;
}

/**
 * The arena: a large circle inked/burnt into the table with faint rune rings.
 * Transparent outside the ink. `worldRadius` maps the canvas half-width to world units.
 */
export function drawArenaDecal(worldRadius: number, spawnRadius: number, size = 2048): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(size, size);
  ctx.clearRect(0, 0, size, size);
  const s = size / 2;
  const k = s / (worldRadius + 1.5);
  ctx.translate(s, s);
  // soot inside the circle, darker toward the rim
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, worldRadius * k);
  g.addColorStop(0, 'rgba(0,0,0,0.05)');
  g.addColorStop(0.85, 'rgba(0,0,0,0.22)');
  g.addColorStop(1, 'rgba(0,0,0,0.38)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, worldRadius * k, 0, Math.PI * 2);
  ctx.fill();
  // double inked rim
  ctx.strokeStyle = 'rgba(12,6,2,0.85)';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(0, 0, worldRadius * k, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, (worldRadius - 0.9) * k, 0, Math.PI * 2);
  ctx.stroke();
  // runes between the two rims
  const rnd = grainRng(31);
  const runes = 72;
  for (let i = 0; i < runes; i++) {
    const a = (i / runes) * Math.PI * 2;
    const r = (worldRadius - 0.45) * k;
    ctx.save();
    ctx.translate(Math.cos(a) * r, Math.sin(a) * r);
    ctx.rotate(a + Math.PI / 2);
    ctx.strokeStyle = 'rgba(14,7,3,0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const n = 2 + Math.floor(rnd() * 3);
    for (let j = 0; j < n; j++) {
      const x0 = (rnd() - 0.5) * 18;
      const y0 = (rnd() - 0.5) * 14;
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + (rnd() - 0.5) * 18, y0 + (rnd() - 0.5) * 18);
    }
    ctx.stroke();
    ctx.restore();
  }
  // faint range rings every 5 units (low contrast so approach paths stay clean)
  ctx.strokeStyle = 'rgba(200,170,120,0.06)';
  ctx.lineWidth = 2;
  for (let r = 5; r < worldRadius - 1; r += 5) {
    ctx.beginPath();
    ctx.arc(0, 0, r * k, 0, Math.PI * 2);
    ctx.stroke();
  }
  // dotted spawn line
  ctx.fillStyle = 'rgba(220,190,140,0.14)';
  for (let i = 0; i < 260; i++) {
    const a = (i / 260) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * spawnRadius * k, Math.sin(a) * spawnRadius * k, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

/** Brass cover plate with a padlock glyph for locked sockets. */
export function drawLockCover(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(256, 340);
  const g = ctx.createLinearGradient(0, 0, 256, 340);
  g.addColorStop(0, '#8a6e3e');
  g.addColorStop(0.5, '#6e5530');
  g.addColorStop(1, '#4a381e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 340);
  const rnd = grainRng(8);
  for (let i = 0; i < 900; i++) {
    ctx.strokeStyle = rnd() < 0.5 ? 'rgba(255,230,180,0.08)' : 'rgba(30,20,8,0.12)';
    const y = rnd() * 340;
    const x = rnd() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20 + rnd() * 40, y);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(25,15,5,0.8)';
  ctx.lineWidth = 6;
  roundRectPath(ctx, 14, 14, 228, 312, 14);
  ctx.stroke();
  for (const [x, y] of [
    [30, 30],
    [226, 30],
    [30, 310],
    [226, 310],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#2a1e10';
    ctx.fill();
  }
  // padlock
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#1e150a';
  ctx.beginPath();
  ctx.arc(128, 150, 34, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = '#1e150a';
  roundRectPath(ctx, 78, 150, 100, 82, 10);
  ctx.fill();
  ctx.fillStyle = '#8a6e3e';
  ctx.beginPath();
  ctx.arc(128, 182, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(124, 186, 8, 22);
  printFinish(c, 99, 10);
  return c;
}

/** Bone/ivory game-piece material with fine grain. */
export function drawBone(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#d8ccb0';
  ctx.fillRect(0, 0, 256, 256);
  const rnd = grainRng(66);
  for (let i = 0; i < 400; i++) {
    ctx.strokeStyle = rnd() < 0.5 ? 'rgba(90,70,40,0.12)' : 'rgba(255,250,235,0.12)';
    const x = rnd() * 256;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (rnd() - 0.5) * 30, 256);
    ctx.stroke();
  }
  return c;
}

/** Dark stained wood for the Base box and piece bases. */
export function drawDarkWood(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(512, 512);
  ctx.fillStyle = '#2a1a10';
  ctx.fillRect(0, 0, 512, 512);
  const rnd = grainRng(91);
  for (let g = 0; g < 90; g++) {
    const gy = rnd() * 512;
    ctx.strokeStyle = rnd() < 0.6 ? `rgba(10,5,2,${0.2 + rnd() * 0.3})` : `rgba(120,80,45,${0.06 + rnd() * 0.08})`;
    ctx.lineWidth = 1 + rnd() * 2;
    ctx.beginPath();
    for (let x = 0; x <= 512; x += 16) {
      const yy = gy + Math.sin(x * 0.01 + g) * 4;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  return c;
}

/** Bone die face (five pips) for table clutter. */
export function drawDie(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = '#cbbd9c';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#2a1a10';
  for (const [x, y] of [
    [32, 32],
    [96, 32],
    [64, 64],
    [32, 96],
    [96, 96],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}
