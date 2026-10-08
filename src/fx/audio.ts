// Synthesized Web Audio. One graph is created after a user gesture and reused across restarts.
// Voices are capped; combat audio fades on pause; restart stops all scheduled run voices.
import type { WeaponId } from '../game/types';

const MAX_VOICES = 14;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private combatBus: GainNode | null = null;
  private uiBus: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private voices = new Set<AudioScheduledSourceNode>();
  private lastPlayed = new Map<string, number>();
  muted = false;
  volume = 0.7;

  /** Create (or resume) the graph. Must be called from a user gesture. */
  unlock(): void {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.ratio.value = 4;
      this.master = this.ctx.createGain();
      this.combatBus = this.ctx.createGain();
      this.uiBus = this.ctx.createGain();
      this.combatBus.connect(this.master);
      this.uiBus.connect(this.master);
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 1.0;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noise.getChannelData(0);
      let seed = 12345;
      for (let i = 0; i < len; i++) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        d[i] = (seed / 4294967296) * 2 - 1;
      }
      this.applyVolume();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  get ready(): boolean {
    return !!this.ctx;
  }

  get activeVoices(): number {
    return this.voices.size;
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyVolume();
  }

  setVolume(v: number): void {
    this.volume = v;
    this.applyVolume();
  }

  private applyVolume(): void {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
  }

  /** Fade combat audio when the encounter freezes (pause/draft); restore on resume. */
  setCombatActive(active: boolean): void {
    if (!this.ctx || !this.combatBus) return;
    this.combatBus.gain.setTargetAtTime(active ? 1 : 0.0001, this.ctx.currentTime, active ? 0.05 : 0.08);
  }

  /** Stop every scheduled voice (restart / teardown). */
  stopAll(): void {
    for (const v of this.voices) {
      try {
        v.stop();
      } catch {
        /* already stopped */
      }
    }
    this.voices.clear();
  }

  private throttle(key: string, minGap: number): boolean {
    if (!this.ctx) return false;
    const now = this.ctx.currentTime;
    const last = this.lastPlayed.get(key) ?? -1;
    if (now - last < minGap) return false;
    this.lastPlayed.set(key, now);
    return true;
  }

  private track(src: AudioScheduledSourceNode): void {
    this.voices.add(src);
    src.onended = () => this.voices.delete(src);
  }

  private canPlay(): boolean {
    return !!this.ctx && this.voices.size < MAX_VOICES && this.ctx.state === 'running';
  }

  private tone(freq: number, dur: number, opts: { type?: OscillatorType; gain?: number; bus?: 'combat' | 'ui'; attack?: number; glide?: number; delay?: number; detune?: number; lowpass?: number } = {}): void {
    if (!this.canPlay()) return;
    const ctx = this.ctx!;
    const t0 = ctx.currentTime + (opts.delay ?? 0);
    const osc = ctx.createOscillator();
    osc.type = opts.type ?? 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (opts.glide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * opts.glide), t0 + dur);
    if (opts.detune) osc.detune.value = opts.detune;
    const g = ctx.createGain();
    const peak = opts.gain ?? 0.2;
    const atk = opts.attack ?? 0.004;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node: AudioNode = osc;
    if (opts.lowpass) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = opts.lowpass;
      osc.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(opts.bus === 'ui' ? this.uiBus! : this.combatBus!);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
    this.track(osc);
  }

  private noiseHit(dur: number, freq: number, q: number, gain: number, bus: 'combat' | 'ui' = 'combat', type: BiquadFilterType = 'bandpass', delay = 0): void {
    if (!this.canPlay() || !this.noise) return;
    const ctx = this.ctx!;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(bus === 'ui' ? this.uiBus! : this.combatBus!);
    src.start(t0, Math.random() * 0.5);
    src.stop(t0 + dur + 0.02);
    this.track(src);
  }

  weapon(id: WeaponId): void {
    if (!this.throttle(`w-${id}`, 0.05)) return;
    switch (id) {
      case 'needle': // dry glass tick
        this.tone(2850, 0.07, { type: 'triangle', gain: 0.09 });
        this.tone(4200, 0.04, { type: 'sine', gain: 0.05 });
        this.noiseHit(0.035, 6000, 4, 0.06);
        break;
      case 'light': // low resonant strike
        this.tone(98, 0.9, { type: 'sine', gain: 0.32, glide: 0.82, attack: 0.006 });
        this.tone(196, 0.55, { type: 'triangle', gain: 0.1, glide: 0.9, lowpass: 900 });
        this.tone(588, 0.25, { type: 'sine', gain: 0.05 });
        this.noiseHit(0.12, 900, 1.2, 0.12);
        break;
      case 'thread': // soft electrical chord
        for (const [f, d] of [
          [330, -6],
          [415, 4],
          [494, 9],
        ] as const)
          this.tone(f, 0.32, { type: 'sawtooth', gain: 0.035, detune: d, lowpass: 2400, attack: 0.01 });
        this.noiseHit(0.18, 3200, 6, 0.04);
        break;
      case 'bell': // muted bronze bell: inharmonic partials
        for (const [ratio, g, d] of [
          [1, 0.16, 1.6],
          [2.41, 0.07, 1.0],
          [2.98, 0.05, 0.8],
          [4.16, 0.03, 0.5],
        ] as const)
          this.tone(262 * ratio, d, { type: 'sine', gain: g, lowpass: 2200, attack: 0.003 });
        break;
    }
  }

  enemyDeath(kind: string): void {
    if (!this.throttle('death', 0.06)) return;
    const f = kind === 'urn' ? 700 : kind === 'moth' ? 2600 : 1500;
    this.noiseHit(0.14, f, 2.5, 0.13);
    this.tone(f * 0.7, 0.09, { type: 'triangle', gain: 0.04, glide: 0.6 });
  }

  baseHit(): void {
    if (!this.throttle('base', 0.08)) return;
    this.tone(70, 0.4, { type: 'sine', gain: 0.35, glide: 0.7 });
    this.tone(311, 0.3, { type: 'triangle', gain: 0.06, detune: 30 });
    this.tone(330, 0.3, { type: 'triangle', gain: 0.06 });
    this.noiseHit(0.2, 400, 1, 0.15, 'combat', 'lowpass');
  }

  cardHover(): void {
    if (!this.throttle('hover', 0.06)) return;
    this.tone(1800, 0.05, { type: 'sine', gain: 0.025, bus: 'ui' });
  }

  cardPick(): void {
    this.tone(660, 0.12, { type: 'triangle', gain: 0.06, bus: 'ui' });
    this.noiseHit(0.06, 2500, 2, 0.04, 'ui');
  }

  cardPlace(): void {
    this.tone(180, 0.18, { type: 'sine', gain: 0.25, bus: 'ui', glide: 0.7 });
    this.noiseHit(0.08, 1400, 1.5, 0.12, 'ui');
    this.tone(880, 0.4, { type: 'sine', gain: 0.05, bus: 'ui', delay: 0.04 });
    this.tone(1320, 0.5, { type: 'sine', gain: 0.03, bus: 'ui', delay: 0.07 });
  }

  cardReturn(): void {
    this.tone(440, 0.1, { type: 'triangle', gain: 0.04, bus: 'ui', glide: 0.8 });
  }

  boon(): void {
    for (const [f, d] of [
      [523, 0],
      [659, 0.08],
      [784, 0.16],
    ] as const)
      this.tone(f, 0.6, { type: 'sine', gain: 0.07, bus: 'ui', delay: d });
  }

  phase(kind: 'draft' | 'resume' | 'defeat' | 'victory' | 'start' | 'clearing'): void {
    switch (kind) {
      case 'draft':
        this.tone(392, 0.9, { type: 'sine', gain: 0.08, bus: 'ui' });
        this.tone(587, 0.9, { type: 'sine', gain: 0.05, bus: 'ui', delay: 0.1 });
        break;
      case 'resume':
      case 'start':
        this.tone(294, 0.5, { type: 'triangle', gain: 0.07, bus: 'ui' });
        this.tone(440, 0.6, { type: 'sine', gain: 0.06, bus: 'ui', delay: 0.08 });
        break;
      case 'clearing':
        this.tone(220, 1.2, { type: 'sine', gain: 0.08, bus: 'ui' });
        this.tone(330, 1.2, { type: 'sine', gain: 0.05, bus: 'ui', delay: 0.15 });
        break;
      case 'defeat':
        for (const [f, d] of [
          [196, 0],
          [185, 0.25],
          [147, 0.5],
        ] as const)
          this.tone(f, 1.6, { type: 'triangle', gain: 0.08, bus: 'ui', delay: d, lowpass: 900 });
        break;
      case 'victory':
        for (const [f, d] of [
          [392, 0],
          [494, 0.15],
          [587, 0.3],
          [784, 0.5],
          [988, 0.7],
        ] as const)
          this.tone(f, 1.8, { type: 'sine', gain: 0.07, bus: 'ui', delay: d });
        break;
    }
  }

  dispose(): void {
    this.stopAll();
    void this.ctx?.close();
    this.ctx = null;
  }
}
