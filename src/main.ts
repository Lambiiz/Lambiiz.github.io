// Application lifecycle: creates the renderer and views once, owns the single animation loop,
// bridges typed simulation/controller events to presentation, and handles restart/teardown.
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './ui/styles.css';
import * as THREE from 'three';
import { BOON_IDS, FIXED_DT, isWeaponId, WEAPON_IDS } from './game/content';
import { FixedStepClock } from './game/clock';
import { PhaseController, type ControllerEvent } from './game/phases';
import { freshSeed } from './game/rng';
import { chargeFraction } from './game/simulation';
import type { SimEvent, StepOutcome } from './game/types';
import { AudioEngine } from './fx/audio';
import { Effects } from './fx/effects';
import { CardInteraction } from './input/cardInteraction';
import { Hud, type HudState } from './ui/hud';
import { BoardView } from './view/board';
import { CardsView } from './view/cards';
import { EnemiesView } from './view/enemies';
import { CARD_H, CARD_W, LID_TOP, socketCenter, TRAY } from './view/layout';
import { SceneRig } from './view/scene';
import { installDevApi } from './dev/devApi';

export class App {
  readonly rig: SceneRig;
  readonly board: BoardView;
  readonly cards: CardsView;
  readonly enemies: EnemiesView;
  readonly effects: Effects;
  readonly audio = new AudioEngine();
  readonly hud: Hud;
  readonly input: CardInteraction;
  readonly controller: PhaseController;
  readonly clock = new FixedStepClock();
  /** Developer capture mode: freezes presentation time and hides overlays for deterministic screenshots. */
  capture = false;
  frameTimes: number[] = [];
  loops = 0;

  private lastNow: number | null = null;
  private lastRenderSimTime = 0;
  private presentTime = 0;
  private listeners: (() => void)[] = [];
  private fitPhase: string | null = null;
  private soulLift = 0;
  private soulFade = 1;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, ui: HTMLElement) {
    this.rig = new SceneRig(canvas);
    this.board = new BoardView(this.rig.renderer);
    this.cards = new CardsView(this.rig.renderer);
    this.enemies = new EnemiesView(this.rig.renderer);
    this.effects = new Effects(this.rig.renderer, 0xc0ffee);
    this.rig.scene.add(this.board.root, this.enemies.root, this.cards.root, this.effects.root);
    this.controller = new PhaseController(freshSeed());

    this.hud = new Hud(ui, {
      start: () => this.start(),
      pause: () => this.controller.pause(),
      resume: () => this.resume(),
      toggleMute: () => this.audio.setMuted(!this.audio.muted),
      toggleQuality: () => this.setQuality(this.rig.quality === 'high' ? 'low' : 'high'),
      restart: () => this.restart(),
      selectOffer: (i) => this.selectOffer(i),
      placeSlot: (s) => void this.placeSlot(s),
      useBoon: () => this.controller.useBoon(),
      confirmReplace: () => this.controller.confirmReplace(),
      cancel: () => this.cancel(),
      continueRun: () => this.controller.continueRun(),
    });

    this.input = new CardInteraction(canvas, this.rig, this.board, this.cards, () => this.controller, {
      selectOffer: (i) => this.selectOffer(i),
      placeSlot: (s) => this.placeSlot(s),
      cancel: () => this.cancel(),
      hover: (c) => this.hud.setHoverCard(c),
      hoverSound: () => this.audio.cardHover(),
      pickSound: () => this.audio.cardPick(),
      returnSound: () => this.audio.cardReturn(),
      rejected: (msg) => this.hud.toast(msg),
    });

    this.controller.on((e) => this.onControllerEvent(e));
    this.cards.prepare([...WEAPON_IDS, ...BOON_IDS]);

    const add = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      target.addEventListener(type, fn, opts);
      this.listeners.push(() => target.removeEventListener(type, fn, opts));
    };
    add(window, 'resize', () => this.onResize());
    add(window, 'blur', () => this.input.cancelDrag('blur'));
    add(document, 'visibilitychange', () => this.onVisibility());
    add(window, 'keydown', (e) => this.onKey(e as KeyboardEvent));
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.rig.reducedMotion = rm.matches;
    add(rm, 'change', () => (this.rig.reducedMotion = rm.matches));

    this.onResize();
    this.applyFit(true);
    this.loops++;
    this.rig.renderer.setAnimationLoop((t) => this.frame(t));
    this.hud.focusPrimary('TITLE');
  }

  get listenerCount(): number {
    return this.listeners.length;
  }

  // ------------------------------------------------------------------ commands
  start(seed = freshSeed()): void {
    this.audio.unlock();
    this.controller.startRun(seed);
    this.audio.phase('start');
  }

  restart(seed = freshSeed()): void {
    this.input.cancelDrag('restart');
    this.audio.unlock();
    this.controller.startRun(seed);
  }

  resume(): void {
    this.audio.unlock();
    if (this.controller.resume()) this.lastNow = null;
  }

  selectOffer(i: number): void {
    if (this.controller.selectOffer(i)) this.audio.cardPick();
  }

  placeSlot(slot: number): 'committed' | 'confirm' | 'rejected' {
    const res = this.controller.requestPlace(slot);
    if (res === 'rejected') {
      const sel = this.controller.selectedCard();
      if (sel && !isWeaponId(sel)) this.hud.toast('Boons are used, not socketed — press Use.');
    }
    return res;
  }

  cancel(): void {
    this.input.cancelDrag('escape');
    const d = this.controller.draft;
    if (!d) return;
    if (d.stage === 'confirmReplace') this.controller.cancelReplace();
    else this.controller.cancelSelection();
  }

  setQuality(level: 'high' | 'low'): void {
    this.rig.applyQuality(level);
    this.effects.setQuality(this.rig.settings.particleBudget, this.rig.settings.dustCount);
    this.input.cancelDrag('quality');
    this.applyFit(true);
  }

  // ------------------------------------------------------------------ events
  private onControllerEvent(e: ControllerEvent): void {
    const sim = this.controller.sim;
    switch (e.type) {
      case 'runStarted':
        this.audio.stopAll();
        this.cards.reset();
        this.enemies.reset();
        this.effects.reset();
        this.board.reset();
        this.clock.reset();
        this.lastRenderSimTime = 0;
        this.soulLift = 0;
        this.soulFade = 1;
        this.cards.syncEquipped(sim.slots);
        break;
      case 'phase':
        this.onPhase(e.from, e.to);
        break;
      case 'offer':
        this.cards.presentOffer(e.draft.offer);
        break;
      case 'selection':
        this.cards.setSelected(e.index);
        if (e.index === null) for (let i = 0; i < 3; i++) this.cards.returnOffer(i);
        break;
      case 'committed': {
        const c = socketCenter(e.slot);
        this.cards.commitOffer(e.offerIndex, e.instance, () => {
          this.effects.landing(new THREE.Vector3(c.x, LID_TOP, c.z));
          this.audio.cardPlace();
        });
        this.cards.syncEquipped(sim.slots); // discards a replaced card
        this.board.setProgress(sim.trialIndex + 1);
        break;
      }
      case 'boonUsed':
        this.cards.consumeBoon(e.offerIndex);
        this.audio.boon();
        this.board.emitterPulse(1);
        this.hud.toast(e.id === 'mend' ? 'The vessel is mended.' : 'Every weapon strikes harder.');
        this.board.setProgress(sim.trialIndex + 1);
        break;
      case 'suspended':
        this.input.cancelDrag('suspend');
        break;
      default:
        break;
    }
  }

  private onPhase(from: string, to: string): void {
    const running = to === 'COMBAT' || to === 'CLEARING';
    this.audio.setCombatActive(running);
    if (to === 'DRAFT' && from === 'COMBAT') this.audio.phase('draft');
    if (to === 'COMBAT' && (from === 'DRAFT' || from === 'PLACEMENT')) {
      this.audio.phase('resume');
      this.cards.clearOffers();
    }
    if (to === 'CLEARING') {
      this.audio.phase('clearing');
      this.hud.toast('No more spawns. Lay the remaining echoes to rest.', 3.5);
    }
    if (to === 'DEFEAT') {
      this.audio.phase('defeat');
      this.effects.ceremony('defeat');
      this.input.cancelDrag('defeat');
      this.cards.clearOffers();
    }
    if (to === 'VICTORY') {
      this.audio.phase('victory');
      this.board.setProgress(8);
      this.board.openAperture(true);
      this.effects.ceremony('victory');
    }
    this.applyFit(false);
  }

  private onSimEvent(ev: SimEvent): void {
    this.enemies.onEvent(ev);
    this.effects.onSimEvent(ev, (wid) => {
      const v = this.cards.equippedView(wid);
      return v ? v.group.position.clone().setY(v.group.position.y + 0.05) : null;
    });
    switch (ev.type) {
      case 'fired':
        this.cards.onFire(ev.weaponId, ev.t);
        this.board.emitterPulse(ev.defId === 'needle' ? 0.5 : 1);
        this.audio.weapon(ev.defId);
        if (ev.defId === 'light') this.rig.kick(0.06, 100);
        if (ev.defId === 'bell') this.rig.kick(0.04, 120);
        break;
      case 'died':
        this.audio.enemyDeath(ev.kind);
        break;
      case 'baseDamaged':
        this.board.baseHit(ev.amount);
        this.audio.baseHit();
        this.rig.kick(0.1, 130);
        break;
      default:
        break;
    }
  }

  private step = (): StepOutcome => {
    const sim = this.controller.sim;
    const outcome = sim.step();
    for (const ev of sim.drainEvents()) this.onSimEvent(ev);
    return outcome;
  };

  /** Fast-forward for developer fixtures only (not normal pacing). */
  advanceTicks(n: number): void {
    for (let i = 0; i < n && this.controller.isRunning(); i++) this.controller.handleOutcome(this.step());
  }

  private onVisibility(): void {
    if (document.hidden) {
      this.input.cancelDrag('hidden');
      this.controller.suspend();
      this.audio.setCombatActive(false);
    }
    this.lastNow = null;
    this.clock.reset();
  }

  private onResize(): void {
    this.input.cancelDrag('resize');
    this.rig.resize();
    this.applyFit(true);
  }

  private onKey(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement) return;
    const c = this.controller;
    const k = e.key.toLowerCase();
    if (k === 'escape') {
      if (c.phase === 'DRAFT' || c.phase === 'PLACEMENT') this.cancel();
      else if (c.phase === 'COMBAT' || c.phase === 'CLEARING') c.pause();
      else if (c.phase === 'PAUSED') this.resume();
      return;
    }
    if (k === 'p') {
      if (c.phase === 'PAUSED' || c.suspended) this.resume();
      else c.pause();
    } else if (k === 'm') this.audio.setMuted(!this.audio.muted);
    else if (k === 'q') this.setQuality(this.rig.quality === 'high' ? 'low' : 'high');
    else if (/^[1-6]$/.test(k) && c.draft && !c.suspended) {
      const n = Number(k) - 1;
      if (c.draft.stage === 'placing') this.placeSlot(n);
      else if (n < 3 && (c.draft.stage === 'choosing' || c.draft.stage === 'boonSelected')) this.selectOffer(n);
    }
  }

  // ------------------------------------------------------------------ camera composition
  private draftFitPoints(): THREE.Vector3[] {
    const pts: THREE.Vector3[] = [];
    const hx = 4.3;
    const hz = 4.0;
    for (const [x, z] of [
      [-hx, -hz],
      [hx, -hz],
      [-hx, hz],
      [hx, hz],
    ])
      pts.push(new THREE.Vector3(x, 0, z), new THREE.Vector3(x, LID_TOP, z));
    const w = (CARD_W * TRAY.scale) / 2;
    const h = (CARD_H * TRAY.scale) / 2;
    for (const i of [0, 2]) {
      const x = (i - 1) * TRAY.spacing;
      for (const sx of [-1, 1])
        for (const sz of [-1, 1]) pts.push(new THREE.Vector3(x + sx * w, TRAY.y + sz * h * Math.sin(-TRAY.tilt), TRAY.z - sz * h * Math.cos(TRAY.tilt)));
    }
    return pts;
  }

  private applyFit(snap: boolean): void {
    const phase = this.controller.phase;
    const drafting = phase === 'DRAFT' || phase === 'PLACEMENT';
    const key = `${drafting}`;
    if (!snap && key === this.fitPhase) return;
    this.fitPhase = key;
    this.rig.setFit(drafting ? this.draftFitPoints() : this.board.combatFitPoints(), this.hud.insets(phase), snap);
    this.rig.setDim(drafting ? 0.7 : 1);
  }

  // ------------------------------------------------------------------ frame
  private frame(nowMs: number): void {
    if (this.disposed) return;
    const now = nowMs / 1000;
    const rawDt = this.lastNow === null ? 0 : now - this.lastNow;
    this.lastNow = now;
    const dt = Math.min(Math.max(rawDt, 0), 0.1);
    if (rawDt > 0 && rawDt < 1) {
      this.frameTimes.push(rawDt * 1000);
      if (this.frameTimes.length > 600) this.frameTimes.shift();
    }
    this.update(this.capture ? 0 : dt, this.capture ? 0 : dt);
    this.rig.renderer.info.reset();
    this.rig.render();
  }

  /** One presentation update. `simDelta` feeds the fixed-step clock; `presentDt` drives UI/card motion. */
  update(simDelta: number, presentDt: number): void {
    const c = this.controller;
    const outcome = this.clock.advance(simDelta, c.isRunning(), this.step);
    if (outcome !== 'continue') c.handleOutcome(outcome);
    c.updatePresentation(presentDt);
    this.presentTime += presentDt;

    const sim = c.sim;
    const alpha = c.isRunning() ? this.clock.alpha : 1;
    const renderSimTime = Math.max(0, sim.simTime - (1 - alpha) * FIXED_DT);
    const simDt = Math.max(0, renderSimTime - this.lastRenderSimTime);
    this.lastRenderSimTime = renderSimTime;

    // ceremonies (presentation only)
    if (c.phase === 'VICTORY') this.soulLift = Math.min(1, this.soulLift + presentDt * 0.35);
    if (c.phase === 'DEFEAT') this.soulFade = Math.max(0.05, this.soulFade - presentDt * 0.6);
    this.board.setSoul(this.soulLift, this.soulFade);

    const charge = new Map<number, number>();
    for (const w of sim.slots) if (w) charge.set(w.id, chargeFraction(w));

    this.rig.update(presentDt);
    this.board.update(presentDt, simDt, this.presentTime);
    this.cards.setDim(c.phase === 'DRAFT' || c.phase === 'PLACEMENT' ? 0.9 : 1);
    this.cards.update(presentDt, renderSimTime, charge);
    this.enemies.update(sim.enemies, alpha, renderSimTime, this.rig.camera);
    this.effects.setView(this.rig.camera, this.rig.viewport.height);
    this.effects.update(renderSimTime, presentDt, sim.projectiles, alpha);
    this.input.updateHalos();
    if (this.rig.viewport.width > 0) this.input.refreshHover();
    this.hud.update(this.hudState(), presentDt);
  }

  /** Developer capture helper: advance presentation-only motion (cards, camera) without simulation. */
  settlePresentation(seconds: number, step = 1 / 60): void {
    for (let t = 0; t < seconds; t += step) this.update(0, step);
  }

  hudState(): HudState {
    const c = this.controller;
    const s = c.sim;
    return {
      phase: c.phase,
      suspended: c.suspended,
      pauseReason: c.pauseReason,
      hp: s.baseHp,
      trialIndex: s.trialIndex,
      trialTime: s.trialTime,
      trialDuration: s.trial.durationSeconds,
      clearing: s.clearing,
      enemiesLeft: s.enemies.length,
      muted: this.audio.muted,
      quality: this.rig.quality,
      seed: c.seed,
      kills: s.kills,
      polishStacks: s.polishStacks,
      slots: s.slots.map((w) => (w ? { defId: w.defId, charge: chargeFraction(w) } : null)),
      draft: c.draft
        ? {
            draftIndex: c.draft.draftIndex,
            offer: c.draft.offer,
            selected: c.draft.selected,
            stage: c.draft.stage,
            pendingSlot: c.draft.pendingSlot,
            forecast: c.nextTrialForecast(),
            resolvedCard: c.draft.resolved?.card ?? null,
          }
        : null,
    };
  }

  dispose(): void {
    this.disposed = true;
    this.rig.renderer.setAnimationLoop(null);
    for (const off of this.listeners) off();
    this.listeners = [];
    this.input.dispose();
    this.hud.dispose();
    this.audio.dispose();
    this.cards.dispose();
    this.enemies.dispose();
    this.effects.dispose();
    this.board.dispose();
    this.rig.dispose();
  }
}

function showUnsupported(ui: HTMLElement, err: unknown): void {
  ui.innerHTML = `<div id="webgl-error"><div class="plate"><h2>WebGL2 is required</h2>
    <p>PALIMPSEST could not start a WebGL2 renderer in this browser.</p>
    <p class="small">Try a current desktop Chrome, Edge, Firefox or Safari with hardware acceleration enabled.</p>
    <p class="small">${String((err as Error)?.message ?? err).replace(/</g, '&lt;')}</p></div></div>`;
}

async function boot(): Promise<void> {
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  const ui = document.getElementById('ui') as HTMLElement;
  // Card artwork is drawn into canvases once; wait for the bundled fonts first.
  try {
    await Promise.all([
      document.fonts.load('700 60px "Cormorant Garamond"'),
      document.fonts.load('600 31px Inter'),
      document.fonts.load('600 18px Inter'),
    ]);
  } catch {
    /* fall back to system fonts */
  }
  const probe = document.createElement('canvas').getContext('webgl2');
  if (!probe) {
    showUnsupported(ui, new Error('webgl2 context unavailable'));
    return;
  }
  let app: App;
  try {
    app = new App(canvas, ui);
  } catch (err) {
    console.error(err);
    showUnsupported(ui, err);
    return;
  }
  installDevApi(app);
  if (import.meta.hot) {
    import.meta.hot.dispose(() => app.dispose());
  }
}

void boot();
