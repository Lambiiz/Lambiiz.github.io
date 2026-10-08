// Procedurally painted canvas textures for the school environment.
// Everything here is original artwork generated at runtime.
import * as THREE from 'three';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function tex(c, { repeat = [1, 1], srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  return t;
}

function noise(ctx, w, h, amount, alpha = 0.06) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  void alpha;
}

/** Glossy two-tone vinyl tiles. */
export function floorTexture() {
  const S = 512;
  const [c, g] = canvas(S, S);
  const tiles = 4;
  const ts = S / tiles;
  for (let y = 0; y < tiles; y++) {
    for (let x = 0; x < tiles; x++) {
      const v = 214 + Math.random() * 10;
      g.fillStyle = `rgb(${v - 6},${v},${v - 10})`;
      g.fillRect(x * ts, y * ts, ts, ts);
      // faint mottling typical of vinyl composition tile
      for (let i = 0; i < 90; i++) {
        g.fillStyle = `rgba(${120 + Math.random() * 60},${130 + Math.random() * 50},${120},${0.05 + Math.random() * 0.06})`;
        const r = 2 + Math.random() * 6;
        g.fillRect(x * ts + Math.random() * ts, y * ts + Math.random() * ts, r, r * 0.6);
      }
    }
  }
  g.strokeStyle = 'rgba(70,80,75,0.35)';
  g.lineWidth = 2;
  for (let i = 0; i <= tiles; i++) {
    g.beginPath();
    g.moveTo(i * ts, 0);
    g.lineTo(i * ts, S);
    g.moveTo(0, i * ts);
    g.lineTo(S, i * ts);
    g.stroke();
  }
  noise(g, S, S, 10);
  return tex(c);
}

/** Painted plaster wall. */
export function plasterTexture(base = [236, 228, 211]) {
  const S = 256;
  const [c, g] = canvas(S, S);
  g.fillStyle = `rgb(${base.join(',')})`;
  g.fillRect(0, 0, S, S);
  for (let i = 0; i < 400; i++) {
    g.fillStyle = `rgba(0,0,0,${Math.random() * 0.025})`;
    g.beginPath();
    g.arc(Math.random() * S, Math.random() * S, 1 + Math.random() * 8, 0, Math.PI * 2);
    g.fill();
  }
  noise(g, S, S, 8);
  return tex(c);
}

/** Vertical-grain light wood for sliding doors. */
export function woodTexture() {
  const W = 256;
  const H = 512;
  const [c, g] = canvas(W, H);
  g.fillStyle = '#c99a63';
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * W;
    g.strokeStyle = `rgba(${90 + Math.random() * 40},${50 + Math.random() * 30},20,${0.08 + Math.random() * 0.12})`;
    g.lineWidth = 0.5 + Math.random() * 2.5;
    g.beginPath();
    g.moveTo(x, 0);
    for (let y = 0; y <= H; y += 32) g.lineTo(x + Math.sin(y * 0.02 + i) * 4, y);
    g.stroke();
  }
  noise(g, W, H, 10);
  return tex(c);
}

/** Brushed steel locker front with vents and a name slot. */
export function lockerTexture(tint = '#6f86a3') {
  const W = 128;
  const H = 512;
  const [c, g] = canvas(W, H);
  g.fillStyle = tint;
  g.fillRect(0, 0, W, H);
  const grd = g.createLinearGradient(0, 0, W, 0);
  grd.addColorStop(0, 'rgba(255,255,255,0.10)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0)');
  grd.addColorStop(1, 'rgba(0,0,0,0.12)');
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  // door seam + shadow edge
  g.fillStyle = 'rgba(10,20,40,0.55)';
  g.fillRect(0, 0, 3, H);
  g.fillRect(W - 2, 0, 2, H);
  g.fillRect(0, H / 2 - 2, W, 4);
  // vents
  for (const top of [26, H / 2 + 26]) {
    for (let i = 0; i < 6; i++) {
      g.fillStyle = 'rgba(15,25,45,0.7)';
      g.fillRect(28, top + i * 9, W - 56, 4);
      g.fillStyle = 'rgba(255,255,255,0.18)';
      g.fillRect(28, top + i * 9 + 4, W - 56, 1);
    }
  }
  // handles and name slots
  for (const top of [140, H / 2 + 140]) {
    g.fillStyle = 'rgba(230,235,240,0.85)';
    g.fillRect(W - 30, top, 10, 44);
    g.fillStyle = 'rgba(250,248,240,0.9)';
    g.fillRect(26, top - 70, 56, 16);
    g.fillStyle = 'rgba(40,40,60,0.55)';
    g.font = 'bold 10px sans-serif';
    g.fillText(String(Math.floor(Math.random() * 40) + 1).padStart(2, '0'), 30, top - 58);
  }
  noise(g, W, H, 9);
  return tex(c, { repeat: [1, 1] });
}

/** Sunset sky with skyline and clouds, seen through the windows. */
export function skyTexture(mode = 'day') {
  const W = 2048;
  const H = 768;
  const [c, g] = canvas(W, H);
  const grd = g.createLinearGradient(0, 0, 0, H);
  if (mode === 'day') {
    grd.addColorStop(0, '#3d4f9e');
    grd.addColorStop(0.35, '#a774b6');
    grd.addColorStop(0.62, '#ff9e74');
    grd.addColorStop(0.8, '#ffd59a');
    grd.addColorStop(1, '#ffe7b8');
  } else {
    grd.addColorStop(0, '#05030f');
    grd.addColorStop(0.45, '#1b0b2e');
    grd.addColorStop(0.7, '#5a0f3a');
    grd.addColorStop(1, '#ff2d55');
  }
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);

  if (mode === 'day') {
    // sun disk + glow
    const sx = W * 0.62;
    const sy = H * 0.7;
    const glow = g.createRadialGradient(sx, sy, 0, sx, sy, 380);
    glow.addColorStop(0, 'rgba(255,250,220,1)');
    glow.addColorStop(0.08, 'rgba(255,236,180,0.95)');
    glow.addColorStop(0.3, 'rgba(255,180,120,0.35)');
    glow.addColorStop(1, 'rgba(255,150,120,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, W, H);
    // soft painterly clouds
    for (let i = 0; i < 26; i++) {
      const cx = Math.random() * W;
      const cy = H * (0.12 + Math.random() * 0.45);
      const len = 160 + Math.random() * 420;
      for (let j = 0; j < 10; j++) {
        const r = 18 + Math.random() * 36;
        const x = cx + (j / 10) * len;
        const y = cy + Math.sin(j) * 6;
        const cg = g.createRadialGradient(x, y, 0, x, y, r * 1.8);
        const top = cy < H * 0.35 ? '255,190,210' : '255,214,170';
        cg.addColorStop(0, `rgba(${top},0.42)`);
        cg.addColorStop(1, `rgba(${top},0)`);
        g.fillStyle = cg;
        g.fillRect(x - r * 2, y - r * 2, r * 4, r * 4);
      }
    }
  } else {
    // pale eclipse ring
    const sx = W * 0.6;
    const sy = H * 0.42;
    const ring = g.createRadialGradient(sx, sy, 60, sx, sy, 160);
    ring.addColorStop(0, 'rgba(0,0,0,1)');
    ring.addColorStop(0.55, 'rgba(0,0,0,1)');
    ring.addColorStop(0.62, 'rgba(255,240,250,1)');
    ring.addColorStop(0.75, 'rgba(255,80,140,0.6)');
    ring.addColorStop(1, 'rgba(255,40,100,0)');
    g.fillStyle = ring;
    g.beginPath();
    g.arc(sx, sy, 160, 0, Math.PI * 2);
    g.fill();
    for (let i = 0; i < 400; i++) {
      g.fillStyle = `rgba(255,255,255,${Math.random() * 0.7})`;
      g.fillRect(Math.random() * W, Math.random() * H * 0.6, 1.5, 1.5);
    }
  }

  // city skyline silhouettes (two layers for depth)
  const layers = mode === 'day' ? ['rgba(120,90,140,0.55)', 'rgba(70,52,96,0.9)'] : ['rgba(30,10,40,0.8)', 'rgba(8,4,14,1)'];
  layers.forEach((col, li) => {
    g.fillStyle = col;
    let x = 0;
    const base = H * (0.8 + li * 0.06);
    while (x < W) {
      const bw = 30 + Math.random() * 90;
      const bh = 30 + Math.random() * (li ? 120 : 200);
      g.fillRect(x, base - bh, bw, H);
      if (li === 1 || mode !== 'day') {
        // lit windows
        g.save();
        g.fillStyle = mode === 'day' ? 'rgba(255,220,150,0.35)' : 'rgba(255,60,110,0.5)';
        for (let wy = base - bh + 8; wy < base - 4; wy += 10) {
          for (let wx = x + 5; wx < x + bw - 6; wx += 9) if (Math.random() < 0.22) g.fillRect(wx, wy, 4, 5);
        }
        g.restore();
      }
      x += bw + Math.random() * 8;
    }
    if (li === 1) {
      // trees along the school fence
      g.fillStyle = mode === 'day' ? '#3b2f4a' : '#05020a';
      for (let tx = 0; tx < W; tx += 26) {
        g.beginPath();
        g.arc(tx, H * 0.95, 30 + Math.random() * 30, 0, Math.PI * 2);
        g.fill();
      }
    }
  });
  const t = tex(c, { repeat: [1, 1] });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** Soft radial / linear gradient used for light shafts and glows. */
export function shaftTexture() {
  const [c, g] = canvas(64, 256);
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, 'rgba(255,255,255,0)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.8)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 256);
  const side = g.createLinearGradient(0, 0, 64, 0);
  side.addColorStop(0, 'rgba(0,0,0,1)');
  side.addColorStop(0.2, 'rgba(0,0,0,0)');
  side.addColorStop(0.8, 'rgba(0,0,0,0)');
  side.addColorStop(1, 'rgba(0,0,0,1)');
  g.globalCompositeOperation = 'destination-out';
  g.fillStyle = side;
  g.fillRect(0, 0, 64, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function glowTexture() {
  const [c, g] = canvas(128, 128);
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------------------------------------------------------------------
// Posters & signage
// ---------------------------------------------------------------------------

function wrapText(g, text, x, y, maxW, lh) {
  const words = text.split(' ');
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (g.measureText(test).width > maxW && line) {
      g.fillText(line, x, y);
      line = w;
      y += lh;
    } else line = test;
  }
  g.fillText(line, x, y);
  return y;
}

const POSTERS = {
  festival(g, W, H) {
    const grd = g.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0, '#13183a');
    grd.addColorStop(1, '#3a1d5c');
    g.fillStyle = grd;
    g.fillRect(0, 0, W, H);
    // mirrored half-moons motif
    g.fillStyle = '#ffb36b';
    g.beginPath();
    g.arc(W * 0.5, H * 0.38, W * 0.26, Math.PI * 0.5, Math.PI * 1.5);
    g.fill();
    g.fillStyle = '#5ff0dc';
    g.beginPath();
    g.arc(W * 0.5, H * 0.38, W * 0.26, -Math.PI * 0.5, Math.PI * 0.5);
    g.fill();
    g.fillStyle = '#13183a';
    g.fillRect(W * 0.495, H * 0.1, W * 0.01, H * 0.56);
    g.fillStyle = '#fff';
    g.font = 'bold 54px Anton, Impact, sans-serif';
    g.textAlign = 'center';
    g.fillText('SEIRYO', W / 2, H * 0.75);
    g.font = 'italic 800 34px "Barlow Condensed", sans-serif';
    g.fillStyle = '#ffb36b';
    g.fillText('AUTUMN FESTIVAL', W / 2, H * 0.82);
    g.font = '600 22px "Barlow Condensed", sans-serif';
    g.fillStyle = '#c9d2ff';
    g.fillText('THEME: "THE OTHER SIDE OF THE GLASS"', W / 2, H * 0.89);
    g.fillText('OCT 24 — 25 · ALL CLASSES', W / 2, H * 0.94);
  },
  astronomy(g, W, H) {
    g.fillStyle = '#0b1026';
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 160; i++) {
      g.fillStyle = `rgba(255,255,255,${Math.random()})`;
      g.fillRect(Math.random() * W, Math.random() * H * 0.7, 2, 2);
    }
    g.strokeStyle = '#7fd6ff';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(W * 0.7, H * 0.25, 40, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#fff';
    g.textAlign = 'left';
    g.font = 'bold 60px Anton, Impact, sans-serif';
    g.fillText('LOOK UP.', 28, H * 0.66);
    g.font = '600 26px "Barlow Condensed", sans-serif';
    g.fillStyle = '#7fd6ff';
    g.fillText('ASTRONOMY CLUB · ROOFTOP · FRI 19:00', 28, H * 0.74);
    g.fillStyle = '#cfd8ff';
    g.font = '500 22px "Barlow Condensed", sans-serif';
    wrapText(g, 'New members welcome. Telescopes provided. Bring a jacket and your curiosity.', 28, H * 0.82, W - 56, 26);
  },
  library(g, W, H) {
    g.fillStyle = '#f3ede0';
    g.fillRect(0, 0, W, H);
    g.fillStyle = '#2f5d50';
    g.fillRect(0, 0, W, H * 0.3);
    g.fillStyle = '#f3ede0';
    g.font = 'bold 48px Anton, Impact, sans-serif';
    g.textAlign = 'center';
    g.fillText('LIBRARY', W / 2, H * 0.14);
    g.font = '600 28px "Barlow Condensed", sans-serif';
    g.fillText('QUIET HOURS', W / 2, H * 0.24);
    g.fillStyle = '#2f5d50';
    g.font = '500 26px "Barlow Condensed", sans-serif';
    ['MON–THU  7:30 – 18:00', 'FRI  7:30 – 17:00', 'RETURNS: COUNTER B', 'NO FOOD · NO PHONES'].forEach((l, i) => g.fillText(l, W / 2, H * 0.42 + i * 40));
    // little book stack
    ['#c45b4a', '#e2a54a', '#3f6f9e'].forEach((col, i) => {
      g.fillStyle = col;
      g.fillRect(W / 2 - 60 + i * 6, H * 0.82 - i * 18, 120, 16);
    });
  },
  track(g, W, H) {
    g.fillStyle = '#ff6a3d';
    g.fillRect(0, 0, W, H);
    g.fillStyle = '#1a1030';
    g.beginPath();
    g.moveTo(0, H * 0.55);
    g.lineTo(W, H * 0.35);
    g.lineTo(W, H);
    g.lineTo(0, H);
    g.fill();
    g.fillStyle = '#fff';
    g.font = 'bold 64px Anton, Impact, sans-serif';
    g.textAlign = 'left';
    g.save();
    g.translate(30, H * 0.3);
    g.rotate(-0.12);
    g.fillText('RUN', 0, 0);
    g.fillText('FASTER', 0, 64);
    g.restore();
    g.font = '600 26px "Barlow Condensed", sans-serif';
    g.fillText('TRACK & FIELD — TRYOUTS', 30, H * 0.72);
    g.font = '500 22px "Barlow Condensed", sans-serif';
    g.fillStyle = '#ffb36b';
    g.fillText('GROUND B · AFTER SCHOOL · ALL YEARS', 30, H * 0.79);
  },
  notice(g, W, H) {
    g.fillStyle = '#fbfaf5';
    g.fillRect(0, 0, W, H);
    g.fillStyle = '#d23a4a';
    g.fillRect(0, 0, W, 16);
    g.fillStyle = '#222';
    g.textAlign = 'left';
    g.font = 'bold 34px "Barlow Condensed", sans-serif';
    g.fillText('STUDENT COUNCIL NOTICE', 24, 64);
    g.font = '500 22px "Barlow Condensed", sans-serif';
    let y = 110;
    for (const p of [
      'Festival committee meets daily until 18:30.',
      'Please do not leave posters on the windows.',
      'Lost: silver hand mirror, compact type. If found, return to Room 2-C (Class Rep).',
      'Reminder: the west corridor closes at sunset.',
    ]) {
      y = wrapText(g, '• ' + p, 24, y, W - 48, 28) + 40;
    }
    g.fillStyle = '#999';
    g.font = 'italic 600 20px "Barlow Condensed", sans-serif';
    g.fillText('— S.C. Secretary', W - 180, H - 30);
  },
  music(g, W, H) {
    g.fillStyle = '#1e2b4f';
    g.fillRect(0, 0, W, H);
    g.strokeStyle = '#ffd36b';
    g.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      g.beginPath();
      g.moveTo(20, 120 + i * 18);
      g.bezierCurveTo(W * 0.4, 60 + i * 18, W * 0.6, 200 + i * 18, W - 20, 120 + i * 18);
      g.stroke();
    }
    g.fillStyle = '#fff';
    g.textAlign = 'center';
    g.font = 'bold 50px Anton, Impact, sans-serif';
    g.fillText('BRASS BAND', W / 2, H * 0.62);
    g.font = '600 26px "Barlow Condensed", sans-serif';
    g.fillStyle = '#ffd36b';
    g.fillText('AUTUMN CONCERT · GYM · 16:30', W / 2, H * 0.71);
  },
};

export function posterTexture(kind, W = 360, H = 512) {
  const [c, g] = canvas(W, H);
  POSTERS[kind](g, W, H);
  // paper sheen + slight wear
  const sheen = g.createLinearGradient(0, 0, W, H);
  sheen.addColorStop(0, 'rgba(255,255,255,0.08)');
  sheen.addColorStop(0.5, 'rgba(255,255,255,0)');
  sheen.addColorStop(1, 'rgba(0,0,0,0.06)');
  g.fillStyle = sheen;
  g.fillRect(0, 0, W, H);
  const t = tex(c, { repeat: [1, 1] });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** Protruding classroom name plate (double-sided). */
export function plateTexture(label, sub = '') {
  const W = 512;
  const H = 160;
  const [c, g] = canvas(W, H);
  g.fillStyle = '#f7f4ea';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = '#26365c';
  g.lineWidth = 10;
  g.strokeRect(5, 5, W - 10, H - 10);
  g.fillStyle = '#26365c';
  g.fillRect(5, 5, 90, H - 10);
  g.fillStyle = '#f7f4ea';
  g.font = 'bold 54px Anton, Impact, sans-serif';
  g.textAlign = 'center';
  g.fillText('◆', 50, 100);
  g.fillStyle = '#1a2340';
  g.font = 'bold 76px Anton, Impact, sans-serif';
  g.fillText(label, 300, sub ? 92 : 108);
  if (sub) {
    g.font = '600 30px "Barlow Condensed", sans-serif';
    g.fillStyle = '#56607a';
    g.fillText(sub, 300, 136);
  }
  const t = tex(c, { repeat: [1, 1] });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function bannerTexture() {
  const W = 1024;
  const H = 256;
  const [c, g] = canvas(W, H);
  g.fillStyle = '#26365c';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#ffb36b';
  g.fillRect(0, H - 18, W, 8);
  g.fillStyle = '#f7f4ea';
  g.font = 'bold 100px Anton, Impact, sans-serif';
  g.textAlign = 'center';
  g.fillText('SEE CLEARLY · ACT KINDLY', W / 2, 140);
  g.font = 'italic 600 40px "Barlow Condensed", sans-serif';
  g.fillStyle = '#c9d2ff';
  g.fillText('SEIRYO ACADEMY — SCHOOL MOTTO', W / 2, 205);
  const t = tex(c, { repeat: [1, 1] });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function exitSignTexture() {
  const W = 256;
  const H = 96;
  const [c, g] = canvas(W, H);
  g.fillStyle = '#16a05a';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff';
  g.font = 'bold 54px Anton, Impact, sans-serif';
  g.textAlign = 'center';
  g.fillText('EXIT ▸', W / 2, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function clockTexture() {
  const S = 256;
  const [c, g] = canvas(S, S);
  g.fillStyle = '#fbfaf5';
  g.beginPath();
  g.arc(S / 2, S / 2, S / 2 - 4, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#1a2340';
  g.lineWidth = 10;
  g.stroke();
  g.fillStyle = '#1a2340';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    g.fillRect(S / 2 + Math.sin(a) * 100 - 3, S / 2 - Math.cos(a) * 100 - 8, 6, 16);
  }
  const hand = (a, len, w) => {
    g.save();
    g.translate(S / 2, S / 2);
    g.rotate(a);
    g.fillRect(-w / 2, -len, w, len + 10);
    g.restore();
  };
  hand(((5 + 47 / 60) / 12) * Math.PI * 2, 60, 9); // 5:47 — almost sunset
  hand((47 / 60) * Math.PI * 2, 92, 6);
  g.fillStyle = '#d23a4a';
  hand((12 / 60) * Math.PI * 2, 96, 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Glowing summoning sigil for the battle floor (original design). */
export function sigilTexture() {
  const S = 1024;
  const [c, g] = canvas(S, S);
  g.translate(S / 2, S / 2);
  g.strokeStyle = '#fff';
  g.lineCap = 'round';
  const ring = (r, w, dash) => {
    g.lineWidth = w;
    g.setLineDash(dash || []);
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
  };
  ring(490, 6);
  ring(470, 2, [30, 14]);
  ring(360, 4);
  ring(200, 3, [6, 10]);
  g.setLineDash([]);
  // two interlocking squares = "reflection"
  for (const rot of [0, Math.PI / 4]) {
    g.save();
    g.rotate(rot);
    g.lineWidth = 4;
    g.strokeRect(-250, -250, 500, 500);
    g.restore();
  }
  // shard glyphs around the ring
  for (let i = 0; i < 24; i++) {
    g.save();
    g.rotate((i / 24) * Math.PI * 2);
    g.beginPath();
    g.moveTo(0, -440);
    g.lineTo(10, -405);
    g.lineTo(0, -380);
    g.lineTo(-10, -405);
    g.closePath();
    g.fillStyle = '#fff';
    g.fill();
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
