// Application lifecycle: creates the renderer and views once, owns the single animation loop,
// bridges typed simulation/controller events to presentation, and handles restart/teardown.
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './ui/styles.css';
import * as THREE from 'three';
import { CARD_IDS, cardDef, FIXED_DT, isWeaponId, WEAPONS } from './game/content';
import { FixedStepClock } from './game/clock';
import { PhaseController, type ControllerEvent, type PlayResult } from './game/phases';
import { freshSeed } from './game/rng';
import { chargeFraction } from './game/simulation';
import type { SimEvent, StepOutcome } from './game/types';
import { AudioEngine } from './fx/audio';
import { Effects } from './fx/effects';
import { CardInteraction } from './input/cardInteraction';
import { detailHtml, Hud, type HudState } from './ui/hud';
import { BoardView } from './view/board';
import { CardAssets } from './view/cardAssets';
import { CardsView, type SocketCard } from './view/cards';
import { EnemiesView } from './view/enemies';
import { HandView } from './view/hand';
import { LID_TOP, socketCenter } from './view/layout';
import { SceneRig } from './view/scene';
import { installDevApi } from './dev/devApi';

export class App {
  readonly rig: SceneRig;
  readonly board: BoardView;
  readonly assets: CardAssets;
  readonly cards: CardsView;
  readonly hand: HandView;
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
  /** [update ms, render-submit ms] per frame, for profiling. */
  cpuTimes: [number, number][] = [];
  private rateHistory: [number, number][] = [];
  loops = 0;

  private lastNow: number | null = null;
  private lastRenderSimTime = 0;
  private presentTime = 0;
  private listeners: (() => void)[] = [];
  private soulLift = 0;
  private soulFade = 1;
  private disposed = false;
  private hoverHandUid: number | null = null;
  private hoverOffer: number | null = null;
  private hoverSocketCard: SocketCard | null = null;
  private hoverSlot: number | null = null;

  constructor(canvas: HTMLCanvasElement, ui: HTMLElement) {
    this.rig = new SceneRig(canvas);
    this.board = new BoardView(this.rig.renderer);
    this.assets = new CardAssets(this.rig.renderer);
    this.assets.prepare(CARD_IDS);
    this.cards = new CardsView(this.assets);
    this.hand = new HandView(this.assets);
    this.enemies = new EnemiesView(this.rig.renderer);
    this.effects = new Effects(this.rig.renderer, 0xc0ffee);
    this.rig.scene.add(this.board.root, this.enemies.root, this.cards.root, this.effects.root);
    this.rig.setHandOverlay(this.hand.scene, this.hand.camera);
    this.controller = new PhaseController(freshSeed());

    this.hud = new Hud(ui, {
      start: () => this.start(),
      pause: () => this.controller.pause(),
      resume: () => this.resume(),
      toggleMute: () => this.audio.setMuted(!this.audio.muted),
      setVolume: (v) => this.audio.setVolume(v),
      toggleQuality: () => this.setQuality(this.rig.quality === 'high' ? 'low' : 'high'),
      restart: () => this.restart(),
      endTurn: () => this.endTurn(),
      sacrifice: () => this.controller.sacrifice(),
      purge: () => this.controller.purge(),
      clearMarks: () => this.controller.clearMarks(),
      confirmReplace: () => this.controller.confirmReplace(),
      cancel: () => this.cancel(),
    });

    this.input = new CardInteraction(canvas, this.rig, this.board, this.cards, this.hand, () => this.controller, {
      play: (uid, slot) => this.play(uid, slot),
      select: (uid) => {
        if (this.controller.select(uid) && uid !== null) this.audio.cardPick();
      },
      toggleMark: (uid) => {
        if (this.controller.toggleMark(uid)) this.audio.cardPick();
      },
      chooseOffer: (i) => this.controller.chooseOffer(i),
      hoverHand: (uid, offer) => {
        this.hoverHandUid = uid;
        this.hoverOffer = offer;
      },
      hoverSocketCard: (c) => {
        this.hoverSocketCard = c;
        this.cards.setHover(c ? c.key : null);
      },
      hoverSocket: (slot) => (this.hoverSlot = slot),
      hoverSound: () => this.audio.cardHover(),
      pickSound: () => this.audio.cardPick(),
      returnSound: () => this.audio.cardReturn(),
    });

    this.controller.on((e) => this.onControllerEvent(e));

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
    this.board.setLocked(this.controller.sim.locked);
    this.loops++;
    this.rig.renderer.setAnimationLoop((t) => this.frame(t));
    this.hud.focusPrimary('TITLE');
  }

  get listenerCount(): number {
    return this.listeners.length;
  }

  // ------------------------------------------------------------------ commands
  /** Normal starts use a fresh seed; `?seed=N` replays a displayed seed (developer replay). */
  start(seed = Number(new URLSearchParams(location.search).get('seed')) || freshSeed()): void {
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

  endTurn(): void {
    this.input.cancelDrag('endturn');
    if (this.controller.endTurn()) this.audio.phase('resume');
  }

  play(uid: number, slot?: number): PlayResult {
    const res = this.controller.playCard(uid, slot);
    if (res === 'noEnergy') this.hud.toast('Not enough energy.');
    else if (res === 'locked') this.hud.toast('That socket is locked.');
    else if (res === 'invalid' && slot !== undefined) this.hud.toast(this.controller.deck.inHand(uid) && isWeaponId(this.controller.deck.inHand(uid)!.defId) ? 'Towers go into open sockets.' : 'Choose a placed tower.');
    return res;
  }

  cancel(): void {
    this.input.cancelDrag('escape');
    const t = this.controller.turn;
    if (!t) return;
    if (t.stage === 'confirmReplace' || t.stage === 'targeting') this.controller.cancel();
    else if (t.marked.length) this.controller.clearMarks();
  }

  setQuality(level: 'high' | 'low'): void {
    this.rig.applyQuality(level);
    this.effects.setQuality(this.rig.settings.particleBudget, this.rig.settings.dustCount);
    this.input.cancelDrag('quality');
    this.applyFit();
  }

  private socketScreen(slot: number): { x: number; y: number } {
    const c = socketCenter(slot);
    return this.rig.project(new THREE.Vector3(c.x, LID_TOP, c.z));
  }

  // ------------------------------------------------------------------ events
  private onControllerEvent(e: ControllerEvent): void {
    const sim = this.controller.sim;
    switch (e.type) {
      case 'runStarted':
        this.audio.stopAll();
        this.cards.reset();
        this.hand.reset();
        this.enemies.reset();
        this.effects.reset();
        this.board.reset();
        this.board.setLocked(sim.locked);
        this.clock.reset();
        this.lastRenderSimTime = 0;
        this.soulLift = 0;
        this.soulFade = 1;
        break;
      case 'phase':
        this.onPhase(e.from, e.to);
        break;
      case 'turnStarted':
        this.audio.cardPick();
        break;
      case 'cardPlayed': {
        const def = cardDef(e.card.defId);
        if (def.type === 'tower' && e.slot !== null) {
          this.hand.animateLeave(e.card.uid, 'tower', this.socketScreen(e.slot));
          const c = socketCenter(e.slot);
          this.cards.syncEquipped(sim.slots, false, () => {
            this.effects.landing(new THREE.Vector3(c.x, LID_TOP, c.z));
            this.audio.cardPlace();
          });
        } else {
          this.hand.animateLeave(e.card.uid, 'play');
          this.audio.boon();
          this.board.emitterPulse(1);
          if (def.type !== 'tower' && def.effect.kind === 'charge' && e.slot !== null) {
            const c = socketCenter(e.slot);
            this.effects.landing(new THREE.Vector3(c.x, LID_TOP, c.z));
          }
          if (def.type !== 'tower' && def.effect.kind === 'blast') this.hud.toast('Ash will scatter when the wave begins.');
        }
        break;
      }
      case 'sacrificed':
        for (const c of e.cards) this.hand.animateLeave(c.uid, 'burn');
        this.hand.showOffers(e.offers);
        this.audio.baseHit();
        break;
      case 'offerChosen':
        this.hand.showOffers(null);
        this.audio.boon();
        break;
      case 'purged':
        this.hand.animateLeave(e.card.uid, 'burn');
        this.audio.enemyDeath('urn');
        break;
      case 'handDiscarded':
        for (const c of e.cards) this.hand.animateLeave(c.uid, 'discard');
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
    this.effects.setFrozen(!running);
    if (to === 'TURN' && from === 'COMBAT') {
      this.audio.phase('draft');
      this.board.setProgress(this.controller.sim.trialIndex + 1); // one aperture light per endured wave
    }
    if (to === 'CLEARING') {
      this.audio.phase('clearing');
      this.hud.toast('No more spawns. Lay the remaining echoes to rest.', 3.5);
    }
    if (to === 'DEFEAT') {
      this.audio.phase('defeat');
      this.effects.ceremony('defeat');
      this.input.cancelDrag('defeat');
      this.hand.reset();
    }
    if (to === 'VICTORY') {
      this.audio.phase('victory');
      this.board.setProgress(8);
      this.board.openAperture(true);
      this.effects.ceremony('victory');
    }
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
        if (ev.defId === 'light') this.rig.kick(0.08, 100);
        if (ev.defId === 'bell') this.rig.kick(0.05, 120);
        break;
      case 'died':
        this.audio.enemyDeath(ev.kind);
        break;
      case 'baseDamaged':
        this.board.baseHit(ev.amount);
        this.audio.baseHit();
        this.rig.kick(0.14, 130);
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
    this.clock.reset(); // display the authoritative state reached by the fixture
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
    const vp = this.rig.viewport;
    this.hand.resize(vp.width, vp.height);
    this.applyFit();
  }

  /** The camera frames every spawn approach. It never changes on its own between phases. */
  private applyFit(): void {
    this.rig.setFit(this.board.combatFitPoints(), this.hud.insets(), true);
  }

  private onKey(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement) return;
    const c = this.controller;
    const k = e.key.toLowerCase();
    if (k === 'escape') {
      if (c.phase === 'TURN') this.cancel();
      else if (c.phase === 'COMBAT' || c.phase === 'CLEARING') c.pause();
      else if (c.phase === 'PAUSED') this.resume();
      return;
    }
    if (k === 'p') {
      if (c.phase === 'PAUSED' || c.suspended) this.resume();
      else c.pause();
    } else if (k === 'm') this.audio.setMuted(!this.audio.muted);
    else if (k === 'q') this.setQuality(this.rig.quality === 'high' ? 'low' : 'high');
    else if (k === 'z') this.rig.resetZoom();
    else if (k === 'e' && c.phase === 'TURN') this.endTurn();
  }

  // ------------------------------------------------------------------ presentation helpers
  /** Range preview: hovered socket tower, else the tower being placed, else a hovered tower card. */
  private updateRangePreview(): void {
    const c = this.controller;
    const t = c.turn;
    let def: string | null = null;
    if (this.hoverSocketCard) def = this.hoverSocketCard.defId;
    else if (t && t.selected !== null && c.deck.inHand(t.selected) && isWeaponId(c.deck.inHand(t.selected)!.defId)) def = c.deck.inHand(t.selected)!.defId;
    else if (this.hoverHandUid !== null && c.deck.inHand(this.hoverHandUid) && isWeaponId(c.deck.inHand(this.hoverHandUid)!.defId)) def = c.deck.inHand(this.hoverHandUid)!.defId;
    if (def && def in WEAPONS) {
      const w = WEAPONS[def as keyof typeof WEAPONS];
      this.board.setRange(w.pulseRadius ?? w.range, w.pattern === 'pulse' ? 0xe8a07a : 0x69dad0);
    } else this.board.setRange(null);
  }

  /** Socket halos while a card needs a target (selected or dragged). */
  private updateHalos(): void {
    const c = this.controller;
    const t = c.turn;
    const uid = t && t.selected !== null ? t.selected : this.input.isDragging ? this.dragUid() : null;
    for (const s of this.board.sockets) {
      if (uid === null || !c.validTarget(uid, s.slot) || c.phase !== 'TURN') {
        this.board.setSocketHalo(s.slot, 0, 0x69dad0);
        continue;
      }
      const occupied = !!c.sim.slots[s.slot];
      const tower = isWeaponId(c.deck.inHand(uid)!.defId);
      this.board.setSocketHalo(s.slot, this.hoverSlot === s.slot ? 1 : 0.4, tower && occupied ? 0xe2b074 : 0x69dad0);
    }
    if (t?.stage === 'confirmReplace' && t.pendingSlot !== null) this.board.setSocketHalo(t.pendingSlot, 1, 0xe0705c);
  }

  private dragUid(): number | null {
    return this.input.draggedUid;
  }

  private updateTooltip(): void {
    const c = this.controller;
    if (this.hoverOffer !== null && c.turn?.offers) {
      const id = c.turn.offers[this.hoverOffer];
      const p = this.hand.offerScreen(this.hoverOffer);
      if (p) this.hud.setTooltip(detailHtml(id), { x: p.x - this.hand.cardWidth * 0.8, y: p.y - this.hand.cardHeight * 0.8, w: this.hand.cardWidth * 1.6, h: this.hand.cardHeight * 1.6 });
      return;
    }
    if (this.hoverHandUid !== null && !this.input.isDragging) {
      const card = c.deck.inHand(this.hoverHandUid);
      const r = this.hand.cardRect(this.hoverHandUid);
      if (card && r) {
        this.hud.setTooltip(detailHtml(card.defId), r);
        return;
      }
    }
    if (this.hoverSocketCard) {
      const sc = this.hoverSocketCard;
      const w = c.sim.slots[sc.slot];
      const p = this.rig.project(sc.group.position);
      const extra = w ? `<dl><dt>Charge</dt><dd>${Math.round(chargeFraction(w) * 100)}%</dd><dt>Socket</dt><dd>${sc.slot + 1} (no effect on combat)</dd></dl>` : '';
      this.hud.setTooltip(detailHtml(sc.defId, extra), { x: p.x - 30, y: p.y - 40, w: 60, h: 80 });
      return;
    }
    this.hud.setTooltip(null);
  }

  // ------------------------------------------------------------------ frame
  /** Simulation seconds advanced per wall-clock second over the last ~10 s (1.0 = real time). */
  simRate(): number {
    const h = this.rateHistory;
    if (h.length < 2) return 0;
    const [w0, s0] = h[0];
    const [w1, s1] = h[h.length - 1];
    return w1 > w0 ? +((s1 - s0) / (w1 - w0)).toFixed(3) : 0;
  }

  private frame(nowMs: number): void {
    if (this.disposed) return;
    const now = nowMs / 1000;
    const rawDt = this.lastNow === null ? 0 : now - this.lastNow;
    this.lastNow = now;
    const dt = Math.min(Math.max(rawDt, 0), 0.1);
    if (rawDt > 0) {
      this.frameTimes.push(rawDt * 1000);
      if (this.frameTimes.length > 600) this.frameTimes.shift();
    }
    if (this.controller.isRunning()) {
      this.rateHistory.push([now, this.controller.sim.simTime]);
      while (this.rateHistory.length > 2 && now - this.rateHistory[0][0] > 10) this.rateHistory.shift();
    } else this.rateHistory.length = 0;
    const t0 = performance.now();
    this.update(this.capture ? 0 : dt, this.capture ? 0 : dt);
    const t1 = performance.now();
    this.rig.renderer.info.reset();
    this.rig.render();
    const t2 = performance.now();
    this.cpuTimes.push([t1 - t0, t2 - t1]);
    if (this.cpuTimes.length > 240) this.cpuTimes.shift();
  }

  /** One presentation update. `simDelta` feeds the fixed-step clock; `presentDt` drives UI/card motion. */
  update(simDelta: number, presentDt: number): void {
    const c = this.controller;
    const outcome = this.clock.advance(simDelta, c.isRunning(), this.step);
    if (outcome !== 'continue') c.handleOutcome(outcome);
    this.presentTime += presentDt;

    const sim = c.sim;
    const alpha = c.isRunning() && !this.capture ? this.clock.alpha : 1;
    const renderSimTime = Math.max(0, sim.simTime - (1 - alpha) * FIXED_DT);
    const simDt = Math.max(0, renderSimTime - this.lastRenderSimTime);
    this.lastRenderSimTime = renderSimTime;

    if (c.phase === 'VICTORY') this.soulLift = Math.min(1, this.soulLift + presentDt * 0.35);
    if (c.phase === 'DEFEAT') this.soulFade = Math.max(0.05, this.soulFade - presentDt * 0.6);
    this.board.setSoul(this.soulLift, this.soulFade);

    const charge = new Map<number, number>();
    for (const w of sim.slots) if (w) charge.set(w.id, chargeFraction(w));

    const t = c.turn;
    this.hand.sync({
      hand: c.phase === 'TURN' || c.suspended ? c.deck.hand : [],
      marked: new Set(t?.marked ?? []),
      selected: t?.selected ?? null,
      affordable: (uid) => c.canAfford(uid),
      interactive: c.phase === 'TURN' && !c.suspended,
    });
    this.hand.setPiles(c.deck.drawPile.length, c.deck.discard.length);
    if (c.phase !== 'TURN') this.hand.setRaised(false);

    this.rig.update(presentDt);
    this.board.update(presentDt, simDt, this.presentTime);
    this.cards.update(presentDt, renderSimTime, charge);
    this.hand.update(presentDt);
    this.enemies.update(sim.enemies, alpha, renderSimTime, this.rig.camera);
    this.effects.setView(this.rig.camera, this.rig.viewport.height);
    this.effects.update(renderSimTime, presentDt, sim.projectiles, alpha);
    if (this.rig.viewport.width > 0) this.input.refreshHover();
    this.updateHalos();
    this.updateRangePreview();
    this.updateTooltip();
    this.hud.update(this.hudState(), presentDt);
  }

  hudState(): HudState {
    const c = this.controller;
    const s = c.sim;
    const t = c.turn;
    const sel = t && t.selected !== null ? c.deck.inHand(t.selected) : undefined;
    return {
      phase: c.phase,
      suspended: c.suspended,
      pauseReason: c.pauseReason,
      hp: s.baseHp,
      waveIndex: s.trialIndex,
      trialTime: s.trialTime,
      trialDuration: s.trial.durationSeconds,
      clearing: s.clearing,
      enemiesLeft: s.enemies.length,
      muted: this.audio.muted,
      quality: this.rig.quality,
      seed: c.seed,
      kills: s.kills,
      towers: s.slots.filter(Boolean).length,
      turn: t
        ? {
            turnIndex: t.turnIndex,
            energy: t.energy,
            stage: t.stage,
            marked: t.marked.length,
            purgesLeft: t.purgesLeft,
            selectedName: sel ? cardDef(sel.defId).name : null,
            selectedIsTower: !!sel && isWeaponId(sel.defId),
            replace:
              t.stage === 'confirmReplace' && sel && t.pendingSlot !== null && s.slots[t.pendingSlot]
                ? { from: WEAPONS[s.slots[t.pendingSlot]!.defId].name, to: cardDef(sel.defId).name }
                : null,
            forecast: c.nextWaveForecast(),
            nextWave: c.nextWaveIndex(),
            canEndTurn: c.canEndTurn(),
          }
        : null,
      piles: { draw: c.deck.drawPile.length, discard: c.deck.discard.length, drawPos: this.hand.drawPileScreen(), discardPos: this.hand.discardPileScreen(), cardH: this.hand.cardHeight },
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
    this.hand.dispose();
    this.assets.dispose();
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
      document.fonts.load('700 40px Inter'),
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
