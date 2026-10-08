// All audio is synthesised at runtime with the Web Audio API — original sound
// design and generative music, so there are no licensing concerns.

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.musicTrack = null;
    this.nextStep = 0;
    this.step = 0;
  }

  /** Must be called from a user gesture. */
  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master.connect(comp).connect(ctx.destination);

    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = 0.9;
    this.sfxBus.connect(this.master);
    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = 0.42;
    this.musicFilter = ctx.createBiquadFilter();
    this.musicFilter.type = 'lowpass';
    this.musicFilter.frequency.value = 18000;
    this.musicBus.connect(this.musicFilter).connect(this.master);

    // shared reverb
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._impulse(2.4, 2.6);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.28;
    this.reverbSend.connect(this.reverb).connect(this.master);

    this.noiseBuf = this._noise(2);
    this._scheduler = setInterval(() => this._schedule(), 25);
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    return this.muted;
  }

  _impulse(sec, decay) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  _noise(sec) {
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  get now() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  // ---------------------------------------------------------------- primitives
  _env(gainNode, t, a, peak, d, sustain = 0, r = 0.05) {
    const g = gainNode.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(0.0001, t);
    g.linearRampToValueAtTime(peak, t + a);
    g.exponentialRampToValueAtTime(Math.max(0.0001, sustain || 0.0001), t + a + d);
    if (sustain) g.setTargetAtTime(0.0001, t + a + d, r);
  }

  tone({ freq = 440, type = 'sine', t = this.now, a = 0.005, d = 0.2, peak = 0.3, slideTo = null, slideTime = 0.1, bus = this.sfxBus, rev = 0, detune = 0, filter = null }) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.detune.value = detune;
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + slideTime);
    const g = this.ctx.createGain();
    this._env(g, t, a, peak, d);
    let node = o;
    if (filter) {
      const f = this.ctx.createBiquadFilter();
      f.type = filter.type || 'lowpass';
      f.frequency.setValueAtTime(filter.freq, t);
      if (filter.to) f.frequency.exponentialRampToValueAtTime(filter.to, t + (filter.time || d));
      f.Q.value = filter.q || 1;
      o.connect(f);
      node = f;
    }
    node.connect(g).connect(bus);
    if (rev) {
      const s = this.ctx.createGain();
      s.gain.value = rev;
      g.connect(s).connect(this.reverbSend);
    }
    o.start(t);
    o.stop(t + a + d + 0.1);
  }

  noise({ t = this.now, a = 0.002, d = 0.2, peak = 0.3, type = 'bandpass', freq = 2000, to = null, q = 1, bus = this.sfxBus, rev = 0 }) {
    if (!this.ctx) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (to) f.frequency.exponentialRampToValueAtTime(to, t + a + d);
    f.Q.value = q;
    const g = this.ctx.createGain();
    this._env(g, t, a, peak, d);
    s.connect(f).connect(g).connect(bus);
    if (rev) {
      const r = this.ctx.createGain();
      r.gain.value = rev;
      g.connect(r).connect(this.reverbSend);
    }
    s.start(t, Math.random());
    s.stop(t + a + d + 0.1);
  }

  // ---------------------------------------------------------------- sfx
  play(name, opts = {}) {
    if (!this.ctx) return;
    const t = this.now + 0.005;
    const fn = SFX[name];
    if (fn) fn(this, t, opts);
  }

  // ---------------------------------------------------------------- music
  setMusic(track, { fade = 1.0 } = {}) {
    if (!this.ctx) {
      this.pendingTrack = track;
      return;
    }
    if (this.musicTrack === track) return;
    const g = this.musicBus.gain;
    const t = this.now;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(0.0001, t + fade * 0.5);
    setTimeout(() => {
      this.musicTrack = track;
      this.step = 0;
      this.nextStep = this.now + 0.05;
      if (track) {
        const tt = this.now;
        g.cancelScheduledValues(tt);
        g.setValueAtTime(0.0001, tt);
        g.linearRampToValueAtTime(TRACKS[track].gain, tt + fade * 0.5);
      }
    }, fade * 500);
  }

  /** Muffle music (e.g. during dialogue tension). */
  setMusicFilter(freq, time = 0.4) {
    if (!this.ctx) return;
    this.musicFilter.frequency.setTargetAtTime(freq, this.now, time / 3);
  }

  _schedule() {
    if (!this.ctx || !this.musicTrack) return;
    const tr = TRACKS[this.musicTrack];
    const stepDur = 60 / tr.bpm / 4;
    while (this.nextStep < this.now + 0.12) {
      tr.step(this, this.nextStep, this.step, stepDur);
      this.step++;
      this.nextStep += stepDur;
      if (tr.length && this.step >= tr.length) {
        if (tr.loop === false) {
          this.musicTrack = null;
          break;
        }
        this.step = 0;
      }
    }
  }
}

// =============================================================================
// Sound effects
// =============================================================================
const SFX = {
  uiMove(a, t) {
    a.tone({ freq: 1320, type: 'triangle', t, d: 0.05, peak: 0.12 });
    a.tone({ freq: 1980, type: 'sine', t: t + 0.015, d: 0.04, peak: 0.05 });
  },
  uiConfirm(a, t) {
    a.tone({ freq: 880, type: 'square', t, d: 0.06, peak: 0.08, filter: { freq: 3000 } });
    a.tone({ freq: 1320, type: 'triangle', t: t + 0.05, d: 0.16, peak: 0.16, rev: 0.3 });
    a.noise({ t, d: 0.08, peak: 0.08, freq: 6000, q: 2 });
  },
  uiBack(a, t) {
    a.tone({ freq: 660, type: 'triangle', t, d: 0.08, peak: 0.12, slideTo: 440, slideTime: 0.08 });
  },
  uiDeny(a, t) {
    a.tone({ freq: 180, type: 'square', t, d: 0.12, peak: 0.1, filter: { freq: 900 } });
    a.tone({ freq: 150, type: 'square', t: t + 0.09, d: 0.14, peak: 0.1, filter: { freq: 900 } });
  },
  blip(a, t, { pitch = 1 } = {}) {
    a.tone({ freq: 620 * pitch * (0.95 + Math.random() * 0.1), type: 'triangle', t, d: 0.035, peak: 0.05 });
  },
  interact(a, t) {
    a.tone({ freq: 523, type: 'sine', t, d: 0.25, peak: 0.15, rev: 0.4 });
    a.tone({ freq: 784, type: 'sine', t: t + 0.07, d: 0.3, peak: 0.12, rev: 0.4 });
  },
  step(a, t) {
    a.noise({ t, d: 0.05, peak: 0.05, type: 'lowpass', freq: 700 });
  },
  heartbeat(a, t) {
    for (const [o, p] of [[0, 0.5], [0.2, 0.35]]) {
      a.tone({ freq: 70, type: 'sine', t: t + o, d: 0.22, peak: p, slideTo: 40, slideTime: 0.2 });
    }
  },
  riser(a, t, { dur = 2 } = {}) {
    a.noise({ t, a: dur * 0.9, d: 0.2, peak: 0.25, type: 'bandpass', freq: 300, to: 7000, q: 3, rev: 0.4 });
    a.tone({ freq: 110, type: 'sawtooth', t, a: dur * 0.9, d: 0.2, peak: 0.08, slideTo: 880, slideTime: dur, filter: { freq: 2000 } });
  },
  crack(a, t) {
    a.noise({ t, d: 0.12, peak: 0.6, type: 'highpass', freq: 3000, rev: 0.5 });
    a.tone({ freq: 2600, type: 'square', t, d: 0.05, peak: 0.08, slideTo: 900, slideTime: 0.05 });
    a.noise({ t: t + 0.07, d: 0.09, peak: 0.35, type: 'highpass', freq: 5000 });
  },
  shatter(a, t) {
    a.noise({ t, d: 0.9, peak: 0.7, type: 'highpass', freq: 2500, rev: 0.7 });
    for (let i = 0; i < 14; i++) {
      a.tone({ freq: 2000 + Math.random() * 5000, type: 'sine', t: t + Math.random() * 0.6, d: 0.15 + Math.random() * 0.3, peak: 0.06, rev: 0.6 });
    }
    a.tone({ freq: 60, type: 'sine', t, d: 0.8, peak: 0.6, slideTo: 30, slideTime: 0.8 });
  },
  boom(a, t) {
    a.tone({ freq: 90, type: 'sine', t, d: 0.9, peak: 0.8, slideTo: 28, slideTime: 0.9 });
    a.noise({ t, d: 0.6, peak: 0.35, type: 'lowpass', freq: 1200, to: 100, rev: 0.5 });
  },
  whoosh(a, t) {
    a.noise({ t, a: 0.08, d: 0.22, peak: 0.3, type: 'bandpass', freq: 600, to: 3200, q: 2 });
  },
  swing(a, t) {
    a.noise({ t, a: 0.02, d: 0.12, peak: 0.3, type: 'bandpass', freq: 1500, to: 400, q: 3 });
  },
  hit(a, t, { heavy = false } = {}) {
    a.tone({ freq: heavy ? 120 : 180, type: 'sine', t, d: heavy ? 0.35 : 0.18, peak: 0.7, slideTo: 45, slideTime: 0.2 });
    a.noise({ t, d: heavy ? 0.25 : 0.12, peak: 0.5, type: 'lowpass', freq: 3500, to: 300 });
    a.tone({ freq: 1200, type: 'square', t, d: 0.03, peak: 0.08 });
  },
  crit(a, t) {
    a.tone({ freq: 1760, type: 'triangle', t, d: 0.4, peak: 0.18, rev: 0.6 });
    a.tone({ freq: 2637, type: 'sine', t: t + 0.05, d: 0.4, peak: 0.12, rev: 0.6 });
  },
  lumen(a, t) {
    // bright shimmering chord + rising sweep
    for (const [n, o] of [[79, 0], [83, 0.03], [86, 0.06], [91, 0.09]]) a.tone({ freq: NOTE(n), type: 'triangle', t: t + o, d: 0.6, peak: 0.1, rev: 0.7 });
    a.noise({ t, a: 0.15, d: 0.3, peak: 0.25, type: 'bandpass', freq: 2000, to: 9000, q: 4, rev: 0.4 });
  },
  lumenHit(a, t) {
    a.tone({ freq: NOTE(96), type: 'sine', t, d: 0.5, peak: 0.12, rev: 0.8 });
    a.noise({ t, d: 0.3, peak: 0.5, type: 'highpass', freq: 4000, rev: 0.5 });
    a.tone({ freq: 220, type: 'sine', t, d: 0.3, peak: 0.6, slideTo: 60, slideTime: 0.3 });
  },
  fire(a, t) {
    a.noise({ t, a: 0.2, d: 0.6, peak: 0.45, type: 'lowpass', freq: 400, to: 2400, rev: 0.3 });
    a.tone({ freq: 70, type: 'sawtooth', t, a: 0.1, d: 0.6, peak: 0.18, filter: { freq: 500 } });
  },
  fireHit(a, t) {
    a.noise({ t, d: 0.7, peak: 0.6, type: 'lowpass', freq: 3000, to: 200, rev: 0.4 });
    a.tone({ freq: 100, type: 'sine', t, d: 0.5, peak: 0.7, slideTo: 35, slideTime: 0.5 });
  },
  glass(a, t) {
    for (let i = 0; i < 6; i++) a.tone({ freq: NOTE(84 + [0, 3, 7, 10, 12, 15][i]), type: 'sine', t: t + i * 0.05, d: 0.4, peak: 0.07, rev: 0.8 });
  },
  inkSlash(a, t) {
    a.noise({ t, a: 0.01, d: 0.18, peak: 0.45, type: 'bandpass', freq: 3000, to: 600, q: 2 });
    a.tone({ freq: 300, type: 'sawtooth', t, d: 0.15, peak: 0.12, slideTo: 80, slideTime: 0.15, filter: { freq: 1500 } });
  },
  charge(a, t) {
    a.tone({ freq: 55, type: 'sawtooth', t, a: 1.2, d: 0.3, peak: 0.2, slideTo: 110, slideTime: 1.4, filter: { freq: 600 } });
    a.noise({ t, a: 1.2, d: 0.3, peak: 0.2, type: 'bandpass', freq: 200, to: 3000, q: 6, rev: 0.4 });
  },
  guard(a, t) {
    a.tone({ freq: 392, type: 'triangle', t, d: 0.3, peak: 0.16, rev: 0.4 });
    a.tone({ freq: 587, type: 'triangle', t: t + 0.04, d: 0.35, peak: 0.12, rev: 0.4 });
    a.noise({ t, d: 0.15, peak: 0.15, type: 'bandpass', freq: 1200, q: 3 });
  },
  block(a, t) {
    a.tone({ freq: 900, type: 'square', t, d: 0.08, peak: 0.12, filter: { freq: 2500 } });
    a.tone({ freq: 160, type: 'sine', t, d: 0.2, peak: 0.5, slideTo: 60, slideTime: 0.2 });
  },
  heal(a, t) {
    for (const [n, o] of [[72, 0], [76, 0.08], [79, 0.16], [84, 0.24]]) a.tone({ freq: NOTE(n), type: 'sine', t: t + o, d: 0.5, peak: 0.12, rev: 0.6 });
  },
  can(a, t) {
    a.noise({ t, d: 0.05, peak: 0.3, type: 'highpass', freq: 4000 });
    a.noise({ t: t + 0.04, a: 0.02, d: 0.5, peak: 0.12, type: 'highpass', freq: 6000 });
  },
  weak(a, t) {
    a.tone({ freq: NOTE(88), type: 'square', t, d: 0.12, peak: 0.12, filter: { freq: 5000 } });
    a.tone({ freq: NOTE(95), type: 'square', t: t + 0.08, d: 0.25, peak: 0.12, filter: { freq: 5000 }, rev: 0.4 });
  },
  resist(a, t) {
    a.tone({ freq: 300, type: 'triangle', t, d: 0.25, peak: 0.15, slideTo: 200, slideTime: 0.25 });
  },
  stun(a, t) {
    a.tone({ freq: 2400, type: 'sine', t, d: 0.6, peak: 0.1, slideTo: 1200, slideTime: 0.6, rev: 0.6 });
    a.noise({ t, d: 0.4, peak: 0.25, type: 'highpass', freq: 3500, rev: 0.4 });
  },
  turn(a, t) {
    a.tone({ freq: NOTE(79), type: 'triangle', t, d: 0.12, peak: 0.12 });
    a.tone({ freq: NOTE(86), type: 'triangle', t: t + 0.07, d: 0.2, peak: 0.12, rev: 0.3 });
  },
  enemyTurn(a, t) {
    a.tone({ freq: NOTE(62), type: 'sawtooth', t, d: 0.2, peak: 0.08, filter: { freq: 1200 } });
    a.tone({ freq: NOTE(61), type: 'sawtooth', t: t + 0.1, d: 0.3, peak: 0.08, filter: { freq: 1200 } });
  },
  victory(a, t) {
    const seq = [[72, 0], [76, 0.12], [79, 0.24], [84, 0.36], [83, 0.6], [84, 0.72]];
    for (const [n, o] of seq) {
      a.tone({ freq: NOTE(n), type: 'square', t: t + o, d: 0.3, peak: 0.08, filter: { freq: 3500 }, rev: 0.4 });
      a.tone({ freq: NOTE(n - 12), type: 'triangle', t: t + o, d: 0.3, peak: 0.1 });
    }
    for (const n of [60, 64, 67, 72]) a.tone({ freq: NOTE(n), type: 'sawtooth', t: t + 0.72, a: 0.02, d: 1.6, peak: 0.05, filter: { freq: 2400 }, rev: 0.6 });
  },
  defeat(a, t) {
    for (const [n, o] of [[67, 0], [63, 0.35], [60, 0.7], [55, 1.05]]) a.tone({ freq: NOTE(n), type: 'triangle', t: t + o, d: 0.7, peak: 0.12, rev: 0.6 });
  },
};

// =============================================================================
// Generative music (16th-note step sequencers)
// =============================================================================
const kick = (a, t, peak = 0.7) => {
  a.tone({ freq: 150, type: 'sine', t, d: 0.28, peak, slideTo: 42, slideTime: 0.12, bus: a.musicBus });
};
const snare = (a, t, peak = 0.3) => {
  a.noise({ t, d: 0.16, peak, type: 'bandpass', freq: 2200, q: 0.8, bus: a.musicBus });
  a.tone({ freq: 220, type: 'triangle', t, d: 0.08, peak: peak * 0.6, bus: a.musicBus });
};
const hat = (a, t, peak = 0.06, open = false) => a.noise({ t, d: open ? 0.14 : 0.03, peak, type: 'highpass', freq: 8000, bus: a.musicBus });

const TRACKS = {
  // mellow after-school lo-fi, 84 bpm, Dmaj7 – Bm9 – Gmaj7 – A6
  explore: {
    bpm: 84,
    gain: 0.4,
    length: 64,
    step(a, t, s, sd) {
      const chords = [[62, 66, 69, 73], [59, 62, 66, 69, 73], [55, 59, 62, 66], [57, 61, 64, 66]];
      const bar = Math.floor(s / 16) % 4;
      const ch = chords[bar];
      const i = s % 16;
      if (i === 0) {
        for (const n of ch) a.tone({ freq: NOTE(n), type: 'sine', t, a: 0.02, d: sd * 15, peak: 0.07, bus: a.musicBus, detune: (Math.random() - 0.5) * 12 });
        a.tone({ freq: NOTE(ch[0] - 24), type: 'triangle', t, a: 0.01, d: sd * 7, peak: 0.16, bus: a.musicBus });
      }
      if (i === 10) a.tone({ freq: NOTE(ch[0] - 24), type: 'triangle', t, a: 0.01, d: sd * 5, peak: 0.12, bus: a.musicBus });
      if (i === 0 || i === 7 || i === 10) kick(a, t, 0.35);
      if (i === 4 || i === 12) snare(a, t, 0.08);
      if (i % 2 === 0) hat(a, t + (i % 4 === 2 ? sd * 0.18 : 0), 0.025);
      // sparse melody
      const mel = [null, null, 78, null, null, 76, null, 73, null, null, 74, null, 76, null, null, null];
      if (bar % 2 === 1 && mel[i]) a.tone({ freq: NOTE(mel[i]), type: 'triangle', t, d: sd * 3, peak: 0.05, bus: a.musicBus, rev: 0.5 });
    },
  },
  // tense ambience before the fight
  tension: {
    bpm: 60,
    gain: 0.45,
    length: 32,
    step(a, t, s, sd) {
      if (s % 16 === 0) {
        a.tone({ freq: NOTE(38), type: 'sawtooth', t, a: 1.5, d: sd * 15, peak: 0.1, bus: a.musicBus, filter: { freq: 300 } });
        a.tone({ freq: NOTE(51), type: 'sine', t, a: 1.5, d: sd * 15, peak: 0.05, bus: a.musicBus, rev: 0.6 });
      }
      if (s % 8 === 4) a.tone({ freq: NOTE(86 + (s % 16 === 4 ? 0 : 1)), type: 'sine', t, d: 0.6, peak: 0.025, bus: a.musicBus, rev: 0.9 });
    },
  },
  // driving battle theme, 150 bpm in E minor
  battle: {
    bpm: 150,
    gain: 0.42,
    length: 128,
    step(a, t, s, sd) {
      const i = s % 16;
      const bar = Math.floor(s / 16) % 8;
      const roots = [40, 40, 36, 38, 40, 40, 43, 42];
      const r = roots[bar];
      if (i % 4 === 0) kick(a, t, 0.6);
      if (i === 4 || i === 12) snare(a, t, 0.28);
      if (bar === 7 && i >= 12) snare(a, t, 0.18);
      hat(a, t, i % 4 === 2 ? 0.07 : 0.035, i % 4 === 2);
      // offbeat octave bass
      if (i % 2 === 1 || i === 0) a.tone({ freq: NOTE(r + (i % 4 === 3 ? 12 : 0)), type: 'sawtooth', t, d: sd * 0.9, peak: 0.14, bus: a.musicBus, filter: { freq: 900, to: 300, time: sd } });
      // arpeggio
      const arp = [0, 7, 12, 15, 19, 15, 12, 7];
      a.tone({ freq: NOTE(r + 24 + arp[i % 8]), type: 'square', t, d: sd * 0.8, peak: 0.03, bus: a.musicBus, filter: { freq: 2600 } });
      // stabs every other bar
      if (bar % 2 === 1 && (i === 0 || i === 3 || i === 6)) {
        for (const n of [r + 24, r + 27, r + 31]) a.tone({ freq: NOTE(n), type: 'sawtooth', t, d: sd * 1.5, peak: 0.035, bus: a.musicBus, filter: { freq: 3000 }, rev: 0.2 });
      }
      // lead hook on bars 4-7
      const lead = { 0: 71, 3: 74, 6: 76, 8: 79, 10: 78, 12: 74, 14: 76 };
      if (bar >= 4 && lead[i] && bar !== 7) a.tone({ freq: NOTE(lead[i] + (bar === 6 ? 2 : 0)), type: 'triangle', t, d: sd * 2.2, peak: 0.07, bus: a.musicBus, rev: 0.3 });
    },
  },
};
