// The single phase controller: owns state transitions and the turn loop (hand, energy, playing,
// sacrifice, purge). Views observe it through typed events; it never touches rendering.
//
// A run opens with a turn before wave 1. Each wave freezes at its boundary into a turn:
// draw 4, energy refills to 6, play cards, sacrifice/purge, then End Turn resumes combat.
import { cardDef, isWeaponId, SLOT_COUNT, STARTING_DECK, TRIALS, TURN, WEAPONS } from './content';
import { Deck, sacrificeOffers } from './deck';
import { deriveStream, Rng } from './rng';
import { Simulation } from './simulation';
import type { CardId, CardInstance, Phase, SpellDef, StepOutcome, TrialDef, WeaponInstance } from './types';

export type TurnStage = 'idle' | 'targeting' | 'confirmReplace' | 'sacrificeChoice';

export interface TurnState {
  turnIndex: number; // 0 = the opening turn before wave 1
  energy: number;
  stage: TurnStage;
  /** Card waiting for a target (a tower card, or an active that targets a tower). */
  selected: number | null;
  pendingSlot: number | null;
  /** Up to two cards marked for sacrifice (right-click). */
  marked: number[];
  purgesLeft: number;
  offers: CardId[] | null;
}

export type PlayResult = 'played' | 'needsTarget' | 'confirm' | 'noEnergy' | 'locked' | 'invalid';

export type ControllerEvent =
  | { type: 'phase'; from: Phase; to: Phase }
  | { type: 'runStarted'; seed: number }
  | { type: 'turnStarted'; turnIndex: number; drawn: CardInstance[] }
  | { type: 'cardPlayed'; card: CardInstance; slot: number | null; instance: WeaponInstance | null; replaced: WeaponInstance | null }
  | { type: 'sacrificed'; cards: CardInstance[]; offers: CardId[] }
  | { type: 'offerChosen'; card: CardInstance }
  | { type: 'purged'; card: CardInstance }
  | { type: 'handDiscarded'; cards: CardInstance[] }
  | { type: 'selection'; uid: number | null }
  | { type: 'marked'; uids: number[] }
  | { type: 'suspended'; value: boolean };

export interface ControllerOptions {
  trials?: TrialDef[];
  deck?: CardId[];
}

export class PhaseController {
  phase: Phase = 'TITLE';
  sim: Simulation;
  deck: Deck;
  turn: TurnState | null = null;
  /** True while the page lost visibility during a turn; requires an explicit Resume. */
  suspended = false;
  pausedFrom: 'COMBAT' | 'CLEARING' | null = null;
  pauseReason: 'manual' | 'suspended' | null = null;
  seed: number;
  transitions = 0;

  private offerRng: Rng;
  private listeners = new Set<(e: ControllerEvent) => void>();
  private trials: TrialDef[];
  private startingDeck: CardId[];

  constructor(seed: number, opts: ControllerOptions = {}) {
    this.trials = opts.trials ?? TRIALS;
    this.startingDeck = opts.deck ?? STARTING_DECK;
    this.seed = seed;
    this.sim = new Simulation({ seed, trials: this.trials });
    this.deck = new Deck(this.startingDeck, deriveStream(seed, 'deck'));
    this.offerRng = deriveStream(seed, 'offers');
  }

  on(fn: (e: ControllerEvent) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(e: ControllerEvent): void {
    for (const l of this.listeners) l(e);
  }

  private setPhase(to: Phase): void {
    if (to === this.phase) return;
    const from = this.phase;
    this.phase = to;
    this.transitions++;
    this.emit({ type: 'phase', from, to });
  }

  /** COMBAT and CLEARING advance simulation; every other state freezes it. */
  isRunning(): boolean {
    return (this.phase === 'COMBAT' || this.phase === 'CLEARING') && !this.suspended;
  }

  /** Start a fresh run (also used for restart). Old state is discarded wholesale. */
  startRun(seed: number): void {
    this.seed = seed;
    this.sim = new Simulation({ seed, trials: this.trials });
    this.deck = new Deck(this.startingDeck, deriveStream(seed, 'deck'));
    this.offerRng = deriveStream(seed, 'offers');
    this.turn = null;
    this.suspended = false;
    this.pausedFrom = null;
    this.pauseReason = null;
    this.emit({ type: 'runStarted', seed });
    this.openTurn(0);
  }

  /** Apply a simulation step outcome. Called at most once per boundary because stepping stops. */
  handleOutcome(outcome: StepOutcome): void {
    switch (outcome) {
      case 'continue':
        return;
      case 'defeat':
        this.turn = null;
        this.setPhase('DEFEAT');
        return;
      case 'victory':
        this.setPhase('VICTORY');
        return;
      case 'clearingStarted':
        this.setPhase('CLEARING');
        return;
      case 'boundary':
        this.openTurn(this.sim.trialIndex + 1);
        return;
    }
  }

  private openTurn(turnIndex: number): void {
    this.sim.resetWaveModifiers(); // passives last exactly one wave
    this.turn = {
      turnIndex,
      energy: TURN.energyPerTurn,
      stage: 'idle',
      selected: null,
      pendingSlot: null,
      marked: [],
      purgesLeft: TURN.purgesPerTurn,
      offers: null,
    };
    const drawn = turnIndex === 0 ? this.deck.drawOpening(TURN.handDraw) : this.deck.draw(TURN.handDraw);
    this.setPhase('TURN');
    this.emit({ type: 'turnStarted', turnIndex, drawn });
  }

  /** Forecast for the wave that follows the current turn. */
  nextWaveForecast(): string {
    const t = this.turn;
    const idx = !t || t.turnIndex === 0 ? this.sim.trialIndex : Math.min(this.sim.trialIndex + 1, this.trials.length - 1);
    return this.trials[idx].forecast;
  }

  /** Index (0-based) of the wave that follows the current turn. */
  nextWaveIndex(): number {
    const t = this.turn;
    return !t || t.turnIndex === 0 ? this.sim.trialIndex : Math.min(this.sim.trialIndex + 1, this.trials.length - 1);
  }

  private active(): TurnState | null {
    return this.phase === 'TURN' && !this.suspended ? this.turn : null;
  }

  cardCost(uid: number): number {
    const c = this.deck.inHand(uid);
    return c ? cardDef(c.defId).cost : Infinity;
  }

  canAfford(uid: number): boolean {
    const t = this.turn;
    return !!t && this.cardCost(uid) <= t.energy;
  }

  needsTarget(uid: number): boolean {
    const c = this.deck.inHand(uid);
    if (!c) return false;
    return isWeaponId(c.defId) || (cardDef(c.defId) as SpellDef).target === 'tower';
  }

  /** Is `slot` a valid drop/target for the card? (unlocked socket for towers, a placed tower for Quicken) */
  validTarget(uid: number, slot: number): boolean {
    const c = this.deck.inHand(uid);
    if (!c || slot < 0 || slot >= SLOT_COUNT || this.sim.locked[slot]) return false;
    if (isWeaponId(c.defId)) return true;
    return (cardDef(c.defId) as SpellDef).target === 'tower' && !!this.sim.slots[slot];
  }

  /** Select a card that needs a target (click), or clear the selection with null. */
  select(uid: number | null): boolean {
    const t = this.active();
    if (!t || (t.stage !== 'idle' && t.stage !== 'targeting')) return false;
    if (uid !== null && (!this.deck.inHand(uid) || !this.needsTarget(uid))) return false;
    t.selected = uid;
    t.stage = uid === null ? 'idle' : 'targeting';
    this.emit({ type: 'selection', uid });
    return true;
  }

  /** Play a card from the hand. Towers and targeted actives need `slot`. */
  playCard(uid: number, slot?: number): PlayResult {
    const t = this.active();
    if (!t || (t.stage !== 'idle' && t.stage !== 'targeting')) return 'invalid';
    const card = this.deck.inHand(uid);
    if (!card) return 'invalid';
    const def = cardDef(card.defId);
    if (def.cost > t.energy) return 'noEnergy';
    if (this.needsTarget(uid)) {
      if (slot === undefined) {
        this.select(uid);
        return 'needsTarget';
      }
      if (slot < 0 || slot >= SLOT_COUNT) return 'invalid';
      if (this.sim.locked[slot]) return 'locked';
      if (!this.validTarget(uid, slot)) return 'invalid';
      if (def.type === 'tower' && this.sim.slots[slot]) {
        t.stage = 'confirmReplace';
        t.selected = uid;
        t.pendingSlot = slot;
        return 'confirm';
      }
    }
    this.commit(t, card, slot ?? null);
    return 'played';
  }

  confirmReplace(): boolean {
    const t = this.active();
    if (!t || t.stage !== 'confirmReplace' || t.selected === null || t.pendingSlot === null) return false;
    const card = this.deck.inHand(t.selected);
    if (!card || cardDef(card.defId).cost > t.energy) return false;
    this.commit(t, card, t.pendingSlot);
    return true;
  }

  /** Cancel a pending replacement or target selection; the card stays in hand. */
  cancel(): void {
    const t = this.turn;
    if (!t || (t.stage !== 'confirmReplace' && t.stage !== 'targeting')) return;
    t.stage = 'idle';
    t.selected = null;
    t.pendingSlot = null;
    this.emit({ type: 'selection', uid: null });
  }

  private commit(t: TurnState, card: CardInstance, slot: number | null): void {
    const def = cardDef(card.defId);
    t.energy -= def.cost;
    t.stage = 'idle';
    t.selected = null;
    t.pendingSlot = null;
    t.marked = t.marked.filter((u) => u !== card.uid);
    let instance: WeaponInstance | null = null;
    let replaced: WeaponInstance | null = null;
    if (def.type === 'tower') {
      // placed towers leave the deck cycle; a replaced tower is destroyed
      this.deck.takeFromHand(card.uid);
      replaced = this.sim.slots[slot!];
      instance = this.sim.installWeapon(slot!, def.id);
    } else {
      this.deck.discardFromHand(card.uid);
      const e = def.effect;
      if (e.kind === 'heal') this.sim.heal(e.amount);
      else if (e.kind === 'blast') this.sim.pendingBlasts.push({ damage: e.damage, radius: e.radius });
      else if (e.kind === 'charge') {
        const w = this.sim.slots[slot!];
        if (w) w.elapsed = WEAPONS[w.defId].interval;
      } else if (e.kind === 'damageBonus') this.sim.damageBonus += e.amount;
      else if (e.kind === 'slow') this.sim.speedFactor = Math.max(0.4, this.sim.speedFactor * e.factor);
    }
    this.emit({ type: 'cardPlayed', card, slot, instance, replaced });
  }

  /** Right-click: toggle a card's sacrifice mark (at most two; a third replaces the oldest). */
  toggleMark(uid: number): boolean {
    const t = this.active();
    if (!t || (t.stage !== 'idle' && t.stage !== 'targeting') || !this.deck.inHand(uid)) return false;
    if (t.stage === 'targeting') this.cancel();
    if (t.marked.includes(uid)) t.marked = t.marked.filter((u) => u !== uid);
    else {
      t.marked.push(uid);
      if (t.marked.length > 2) t.marked.shift();
    }
    this.emit({ type: 'marked', uids: [...t.marked] });
    return true;
  }

  clearMarks(): void {
    const t = this.turn;
    if (!t || t.marked.length === 0) return;
    t.marked = [];
    this.emit({ type: 'marked', uids: [] });
  }

  /** Sacrifice the two marked cards; then one of three offers must be chosen. Unlimited per turn. */
  sacrifice(): boolean {
    const t = this.active();
    if (!t || t.stage !== 'idle' || t.marked.length !== 2) return false;
    const cards = t.marked.map((u) => this.deck.takeFromHand(u)).filter((c): c is CardInstance => !!c);
    if (cards.length !== 2) return false;
    t.marked = [];
    t.offers = sacrificeOffers(this.offerRng, cards[0].defId, cards[1].defId);
    t.stage = 'sacrificeChoice';
    this.emit({ type: 'sacrificed', cards, offers: [...t.offers] });
    this.emit({ type: 'marked', uids: [] });
    return true;
  }

  chooseOffer(index: number): boolean {
    const t = this.active();
    if (!t || t.stage !== 'sacrificeChoice' || !t.offers || index < 0 || index >= t.offers.length) return false;
    const card = this.deck.addToHand(t.offers[index]);
    t.offers = null;
    t.stage = 'idle';
    this.emit({ type: 'offerChosen', card });
    return true;
  }

  /** Purge the single marked card from the deck. Once per turn. */
  purge(): boolean {
    const t = this.active();
    if (!t || t.stage !== 'idle' || t.marked.length !== 1 || t.purgesLeft <= 0) return false;
    const card = this.deck.takeFromHand(t.marked[0]);
    if (!card) return false;
    t.marked = [];
    t.purgesLeft--;
    this.emit({ type: 'purged', card });
    this.emit({ type: 'marked', uids: [] });
    return true;
  }

  canEndTurn(): boolean {
    const t = this.turn;
    return this.phase === 'TURN' && !this.suspended && !!t && t.stage !== 'sacrificeChoice' && t.stage !== 'confirmReplace';
  }

  /** Discard the hand and resume combat with the next wave. */
  endTurn(): boolean {
    if (!this.canEndTurn()) return false;
    const t = this.turn!;
    const cards = this.deck.discardHand();
    this.emit({ type: 'handDiscarded', cards });
    if (t.turnIndex > 0) this.sim.beginNextTrial();
    this.turn = null;
    this.setPhase('COMBAT');
    return true;
  }

  pause(): boolean {
    if (this.phase !== 'COMBAT' && this.phase !== 'CLEARING') return false;
    this.pausedFrom = this.phase;
    this.pauseReason = 'manual';
    this.setPhase('PAUSED');
    return true;
  }

  resume(): boolean {
    if (this.suspended) {
      this.suspended = false;
      this.emit({ type: 'suspended', value: false });
      return true;
    }
    if (this.phase !== 'PAUSED' || !this.pausedFrom) return false;
    const to = this.pausedFrom;
    this.pausedFrom = null;
    this.pauseReason = null;
    this.setPhase(to);
    return true;
  }

  /** Page visibility lost: freeze, preserve context, and require an explicit Resume. */
  suspend(): void {
    if (this.phase === 'COMBAT' || this.phase === 'CLEARING') {
      this.pausedFrom = this.phase;
      this.pauseReason = 'suspended';
      this.setPhase('PAUSED');
    } else if (this.phase === 'TURN' && !this.suspended) {
      this.suspended = true;
      this.emit({ type: 'suspended', value: true });
    }
  }
}
