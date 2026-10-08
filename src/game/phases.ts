// The single phase controller: owns state transitions, offers, placement/replacement and
// reward resolution. Views observe it through typed events; it never touches rendering.
import { BOON_TUNING, cardDef, isWeaponId, SLOT_COUNT, TRIALS } from './content';
import { generateOffer } from './draft';
import { deriveStream, Rng } from './rng';
import { Simulation } from './simulation';
import type { CardId, Phase, StepOutcome, TrialDef, WeaponId, WeaponInstance } from './types';

export type DraftStage = 'choosing' | 'boonSelected' | 'placing' | 'confirmReplace' | 'settling' | 'resolved';

export interface DraftState {
  draftIndex: number;
  offer: CardId[];
  selected: number | null;
  stage: DraftStage;
  pendingSlot: number | null;
  settleRemaining: number;
  resolved: { card: CardId; slot: number | null } | null;
}

export type ControllerEvent =
  | { type: 'phase'; from: Phase; to: Phase }
  | { type: 'runStarted'; seed: number }
  | { type: 'offer'; draft: DraftState }
  | { type: 'selection'; index: number | null }
  | { type: 'replacePreview'; slot: number | null }
  | { type: 'committed'; slot: number; instance: WeaponInstance; replaced: WeaponInstance | null; offerIndex: number }
  | { type: 'boonUsed'; id: CardId; offerIndex: number }
  | { type: 'settled' }
  | { type: 'suspended'; value: boolean };

export const SETTLE_SECONDS = 0.34;

export interface ControllerOptions {
  trials?: TrialDef[];
}

export class PhaseController {
  phase: Phase = 'TITLE';
  sim: Simulation;
  draft: DraftState | null = null;
  /** True while the page lost visibility during a draft; requires an explicit Resume. */
  suspended = false;
  pausedFrom: 'COMBAT' | 'CLEARING' | null = null;
  pauseReason: 'manual' | 'suspended' | null = null;
  seed: number;
  transitions = 0;

  private offerRng: Rng;
  private listeners = new Set<(e: ControllerEvent) => void>();
  private trials: TrialDef[];

  constructor(seed: number, opts: ControllerOptions = {}) {
    this.trials = opts.trials ?? TRIALS;
    this.seed = seed;
    this.sim = new Simulation({ seed, trials: this.trials });
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

  /** Start a fresh run (also used for restart). Old simulation state is discarded wholesale. */
  startRun(seed: number): void {
    this.seed = seed;
    this.sim = new Simulation({ seed, trials: this.trials });
    this.offerRng = deriveStream(seed, 'offers');
    this.draft = null;
    this.suspended = false;
    this.pausedFrom = null;
    this.pauseReason = null;
    this.sim.installWeapon(0, 'needle');
    this.emit({ type: 'runStarted', seed });
    this.setPhase('COMBAT');
  }

  /** Apply a simulation step outcome. Called at most once per boundary because stepping stops. */
  handleOutcome(outcome: StepOutcome): void {
    switch (outcome) {
      case 'continue':
        return;
      case 'defeat':
        this.draft = null;
        this.setPhase('DEFEAT');
        return;
      case 'victory':
        this.setPhase('VICTORY');
        return;
      case 'clearingStarted':
        this.setPhase('CLEARING');
        return;
      case 'boundary':
        this.openDraft();
        return;
    }
  }

  private openDraft(): void {
    const owned = new Set<WeaponId>();
    for (const w of this.sim.slots) if (w) owned.add(w.defId);
    const offer = generateOffer(this.offerRng, {
      draftIndex: this.sim.trialIndex,
      ownedWeapons: owned,
      polishStacks: this.sim.polishStacks,
      baseHp: this.sim.baseHp,
    });
    this.draft = {
      draftIndex: this.sim.trialIndex,
      offer,
      selected: null,
      stage: 'choosing',
      pendingSlot: null,
      settleRemaining: 0,
      resolved: null,
    };
    this.setPhase('DRAFT');
    this.emit({ type: 'offer', draft: this.draft });
  }

  nextTrialForecast(): string {
    const next = this.trials[Math.min(this.sim.trialIndex + 1, this.trials.length - 1)];
    return next.forecast;
  }

  private inputLocked(): boolean {
    return this.suspended || !this.draft;
  }

  /** Select an offered card (click or drag start). Weapons enter placement; boons await Use. */
  selectOffer(index: number): boolean {
    const d = this.draft;
    if (this.inputLocked() || !d) return false;
    if (d.stage !== 'choosing' && d.stage !== 'boonSelected' && d.stage !== 'placing') return false;
    if (index < 0 || index >= d.offer.length) return false;
    d.selected = index;
    d.pendingSlot = null;
    if (isWeaponId(d.offer[index])) {
      d.stage = 'placing';
      this.setPhase('PLACEMENT');
    } else {
      d.stage = 'boonSelected';
      this.setPhase('DRAFT');
    }
    this.emit({ type: 'selection', index });
    return true;
  }

  /** Return a selected/dragged card to the tray without consuming it. */
  cancelSelection(): void {
    const d = this.draft;
    if (!d || (d.stage !== 'placing' && d.stage !== 'boonSelected' && d.stage !== 'confirmReplace')) return;
    d.selected = null;
    d.pendingSlot = null;
    d.stage = 'choosing';
    this.setPhase('DRAFT');
    this.emit({ type: 'replacePreview', slot: null });
    this.emit({ type: 'selection', index: null });
  }

  selectedCard(): CardId | null {
    const d = this.draft;
    return d && d.selected !== null ? d.offer[d.selected] : null;
  }

  /** Request placement of the selected weapon into a socket. Empty sockets commit immediately. */
  requestPlace(slot: number): 'committed' | 'confirm' | 'rejected' {
    const d = this.draft;
    if (this.inputLocked() || !d || d.stage !== 'placing' || d.selected === null) return 'rejected';
    if (slot < 0 || slot >= SLOT_COUNT) return 'rejected';
    const card = d.offer[d.selected];
    if (!isWeaponId(card)) return 'rejected';
    if (this.sim.slots[slot]) {
      d.stage = 'confirmReplace';
      d.pendingSlot = slot;
      this.emit({ type: 'replacePreview', slot });
      return 'confirm';
    }
    this.commit(slot, card);
    return 'committed';
  }

  confirmReplace(): boolean {
    const d = this.draft;
    if (this.inputLocked() || !d || d.stage !== 'confirmReplace' || d.pendingSlot === null || d.selected === null) return false;
    const card = d.offer[d.selected];
    if (!isWeaponId(card)) return false;
    this.commit(d.pendingSlot, card);
    return true;
  }

  /** Cancel replacement: the old weapon stays installed and the choice is unresolved again. */
  cancelReplace(): void {
    const d = this.draft;
    if (!d || d.stage !== 'confirmReplace') return;
    this.cancelSelection();
  }

  private commit(slot: number, card: WeaponId): void {
    const d = this.draft!;
    const replaced = this.sim.slots[slot];
    const instance = this.sim.installWeapon(slot, card); // atomic: old ownership removed, new at zero charge
    const offerIndex = d.selected!;
    d.stage = 'settling';
    d.pendingSlot = null;
    d.settleRemaining = SETTLE_SECONDS;
    d.resolved = { card, slot };
    this.emit({ type: 'replacePreview', slot: null });
    this.emit({ type: 'committed', slot, instance, replaced, offerIndex });
  }

  useBoon(): boolean {
    const d = this.draft;
    if (this.inputLocked() || !d || d.stage !== 'boonSelected' || d.selected === null) return false;
    const card = d.offer[d.selected];
    if (card === 'polish') {
      this.sim.polishStacks = Math.min(BOON_TUNING.polishMaxStacks, this.sim.polishStacks + 1);
    } else if (card === 'mend') {
      this.sim.heal(BOON_TUNING.mendAmount);
    } else return false;
    d.stage = 'resolved';
    d.resolved = { card, slot: null };
    this.emit({ type: 'boonUsed', id: card, offerIndex: d.selected });
    this.setPhase('DRAFT');
    return true;
  }

  canContinue(): boolean {
    return !!this.draft && this.draft.stage === 'resolved' && !this.suspended;
  }

  continueRun(): boolean {
    if (!this.canContinue()) return false;
    this.draft = null;
    this.sim.beginNextTrial();
    this.setPhase('COMBAT');
    return true;
  }

  /** Presentation-time update (settle animation lock). Never advances simulation. */
  updatePresentation(dt: number): void {
    const d = this.draft;
    if (!d || this.suspended) return;
    if (d.stage === 'settling') {
      d.settleRemaining -= dt;
      if (d.settleRemaining <= 0) {
        d.settleRemaining = 0;
        d.stage = 'resolved';
        this.setPhase('DRAFT');
        this.emit({ type: 'settled' });
      }
    }
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
    } else if ((this.phase === 'DRAFT' || this.phase === 'PLACEMENT') && !this.suspended) {
      this.suspended = true;
      this.emit({ type: 'suspended', value: true });
    }
  }

  cardName(id: CardId): string {
    return cardDef(id).name;
  }
}
