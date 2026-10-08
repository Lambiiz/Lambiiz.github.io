// The dramatic shift from conversation to combat: the window cracks, the
// frame is captured and shattered into glass shards that fly apart to reveal
// the transformed corridor, with a bold encounter title card on top.
import { el, retrigger } from '../ui/dom.js';
import { easeInOutCubic } from '../core/math.js';

export class BattleTransition {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById('shatter');
    this.ctx = this.canvas.getContext('2d');
    this.capture = document.createElement('canvas');
    this.captureRequested = false;
    this.card = el('div', { class: 'encounter hidden' },
      el('div', { class: 'encounter__band encounter__band--a' }, el('span', {}, 'WARNING · ECHO MANIFESTED · WARNING · ECHO MANIFESTED · WARNING · ECHO MANIFESTED · ')),
      el('div', { class: 'encounter__band encounter__band--b' }, el('span', {}, 'THE GLASS IS LISTENING · THE GLASS IS LISTENING · THE GLASS IS LISTENING · ')),
      el('div', { class: 'encounter__core' },
        el('div', { class: 'encounter__kicker' }, 'ENCOUNTER'),
        el('div', { class: 'encounter__name' }, "MIO'S ECHO"),
        el('div', { class: 'encounter__title' }, '— THE FLAWLESS ONE —')
      )
    );
    game.uiRoot.append(this.card);
    this.onResize();
  }

  onResize() {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    for (const c of [this.canvas, this.capture]) {
      c.width = Math.floor(innerWidth * dpr);
      c.height = Math.floor(innerHeight * dpr);
    }
    this.dpr = dpr;
  }

  /** Called by the game loop right after rendering a frame. */
  afterRender() {
    if (!this.captureRequested) return;
    this.captureRequested = false;
    const cx = this.capture.getContext('2d');
    cx.drawImage(this.game.renderer.domElement, 0, 0, this.capture.width, this.capture.height);
    this._captured?.();
  }

  _requestCapture() {
    return new Promise((r) => {
      this._captured = r;
      this.captureRequested = true;
    });
  }

  /** Build a radial web of glass shards around a centre point. */
  _makeShards(cx, cy) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const maxR = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.05;
    const rings = [0, 0.06, 0.16, 0.3, 0.5, 0.75, 1.0].map((r) => r * maxR);
    const sectors = 14;
    const pts = rings.map((r, ri) => {
      const row = [];
      for (let s = 0; s < sectors; s++) {
        const a = ((s + (ri % 2) * 0.5 + (Math.random() - 0.5) * 0.5) / sectors) * Math.PI * 2;
        const rr = ri === 0 ? 0 : r * (0.9 + Math.random() * 0.2);
        row.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
      }
      return row;
    });
    const shards = [];
    for (let ri = 0; ri < rings.length - 1; ri++) {
      for (let s = 0; s < sectors; s++) {
        const s2 = (s + 1) % sectors;
        const poly = ri === 0 ? [pts[0][0], pts[1][s], pts[1][s2]] : [pts[ri][s], pts[ri + 1][s], pts[ri + 1][s2], pts[ri][s2]];
        // split larger quads into two triangles for a more glassy look
        const polys = poly.length === 4 && Math.random() < 0.6 ? [[poly[0], poly[1], poly[2]], [poly[0], poly[2], poly[3]]] : [poly];
        for (const pp of polys) {
          const c = pp.reduce((a, p) => [a[0] + p[0] / pp.length, a[1] + p[1] / pp.length], [0, 0]);
          const dx = c[0] - cx;
          const dy = c[1] - cy;
          const d = Math.hypot(dx, dy) || 1;
          shards.push({
            poly: pp,
            c,
            vx: (dx / d) * (300 + Math.random() * 500) * (0.4 + d / maxR),
            vy: (dy / d) * (300 + Math.random() * 500) * (0.4 + d / maxR) - 200,
            rot: (Math.random() - 0.5) * 6,
            delay: (d / maxR) * 0.12 + Math.random() * 0.05,
            depth: 0.6 + Math.random() * 0.6,
          });
        }
      }
    }
    return { shards, pts, rings };
  }

  _drawCracks(web, progress) {
    const ctx = this.ctx;
    const { pts } = web;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.shadowColor = 'rgba(160,250,255,0.9)';
    ctx.shadowBlur = 12 * this.dpr;
    ctx.lineWidth = 2 * this.dpr;
    const ringsShown = Math.floor(progress * (pts.length - 1)) + 1;
    for (let ri = 1; ri < Math.min(ringsShown + 1, pts.length); ri++) {
      for (let s = 0; s < pts[ri].length; s++) {
        const a = pts[ri - 1][ri === 1 ? 0 : s];
        const b = pts[ri][s];
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
        if (ri > 1 && ri < ringsShown) {
          const n = pts[ri][(s + 1) % pts[ri].length];
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.moveTo(b[0], b[1]);
          ctx.lineTo(n[0], n[1]);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    ctx.restore();
  }

  _drawShards(web, t) {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);
    for (const s of web.shards) {
      const k = Math.max(0, t - s.delay);
      const ox = s.vx * k;
      const oy = s.vy * k + 1400 * k * k * this.dpr;
      const alpha = Math.max(0, 1 - k * 1.25);
      if (alpha <= 0) continue;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(s.c[0] + ox * this.dpr, s.c[1] + oy);
      ctx.rotate(s.rot * k);
      const sc = 1 + k * 0.25 * s.depth;
      ctx.scale(sc, sc);
      ctx.translate(-s.c[0], -s.c[1]);
      ctx.beginPath();
      s.poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
      ctx.save();
      ctx.clip();
      ctx.drawImage(this.capture, 0, 0);
      // glassy sheen
      ctx.fillStyle = `rgba(200,250,255,${0.08 + k * 0.25})`;
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.5 * this.dpr;
      ctx.stroke();
      ctx.restore();
    }
  }

  async run() {
    const g = this.game;
    const u = g.post.u;
    const tasks = g.tasks;
    const audio = g.audio;

    // 1 — the glass cracks around the Echo
    const ep = g.echo.bone('head').getWorldPosition(g.echo.root.position.clone()).project(g.camera);
    const cx = (ep.x * 0.5 + 0.5) * this.canvas.width;
    const cy = (-ep.y * 0.5 + 0.5) * this.canvas.height;
    const web = this._makeShards(cx, cy);
    audio.setMusic(null, { fade: 0.3 });
    audio.play('crack');
    g.rig.shake(0.06);
    u.chroma.value = 0.7;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawCracks(web, 0.25);
    await tasks.sleep(0.45);
    audio.play('crack');
    audio.play('riser', { dur: 0.9 });
    g.rig.shake(0.08);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawCracks(web, 0.6);
    tasks.tween(0.8, (t) => {
      u.duotone.value = t * 0.6;
      u.zoomBlur.value = t * 0.5;
    });
    u.duoA.value.set(0x05010c);
    u.duoB.value.set(0xff3d6e);
    await tasks.sleep(0.5);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawCracks(web, 1);
    await tasks.sleep(0.32);

    // 2 — freeze the frame, swap the world behind it
    u.invert.value = 1;
    await this._requestCapture();
    u.invert.value = 0;
    // redraw the capture with cracks as the static overlay
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.capture, 0, 0);
    this._drawCracks(web, 1);
    u.duotone.value = 0;
    u.zoomBlur.value = 0;
    u.chroma.value = 0.12;
    u.saturation.value = 1.1;
    g.student.lookAt(null);
    g.battle.setupArena();
    const intro = g.battle.intro();

    // 3 — shatter!
    audio.play('shatter');
    audio.play('boom');
    u.flashColor.value.set(0xffffff);
    tasks.tween(0.35, (t) => (u.flash.value = 0.9 * (1 - t)));
    u.speedLines.value = 1;
    tasks.tween(1.0, (t) => (u.speedLines.value = 1 - t));
    this.card.classList.remove('hidden');
    retrigger(this.card, 'run');
    await tasks.tween(1.25, (t) => this._drawShards(web, t * 1.25), (t) => t);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    await tasks.sleep(0.8);
    this.card.classList.add('out');
    await tasks.sleep(0.45);
    this.card.classList.add('hidden');
    this.card.classList.remove('out');
    await intro;
    void easeInOutCubic;
  }
}
