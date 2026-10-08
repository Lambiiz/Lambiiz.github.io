// Compact DOM HUD: integrity, trial clock, pause/mute/quality/restart, title, draft panel with a
// 14px+ detail view, keyboard-accessible mirrors of offer/socket commands, and end overlays.
import { BASE, BOON_TUNING, cardDef, ENEMIES, isWeaponId, STAKES_LINE, TRIAL_COUNT, WEAPONS } from '../game/content';
import type { DraftStage } from '../game/phases';
import type { CardId, Phase, WeaponId } from '../game/types';

export interface HudCallbacks {
  start(): void;
  pause(): void;
  resume(): void;
  toggleMute(): void;
  toggleQuality(): void;
  restart(): void;
  selectOffer(i: number): void;
  placeSlot(s: number): void;
  useBoon(): void;
  confirmReplace(): void;
  cancel(): void;
  continueRun(): void;
}

export interface HudState {
  phase: Phase;
  suspended: boolean;
  pauseReason: 'manual' | 'suspended' | null;
  hp: number;
  trialIndex: number;
  trialTime: number;
  trialDuration: number;
  clearing: boolean;
  enemiesLeft: number;
  muted: boolean;
  quality: 'high' | 'low';
  seed: number;
  kills: number;
  polishStacks: number;
  slots: ({ defId: WeaponId; charge: number } | null)[];
  draft: null | {
    draftIndex: number;
    offer: CardId[];
    selected: number | null;
    stage: DraftStage;
    pendingSlot: number | null;
    forecast: string;
    resolvedCard: CardId | null;
  };
}

function weaponStats(id: WeaponId, polish: number): [string, string][] {
  const w = WEAPONS[id];
  const mul = 1 + BOON_TUNING.polishPerStack * polish;
  const dmg = (n: number) => (Math.round(n * mul * 10) / 10).toString();
  const rows: [string, string][] = [['Interval', `${w.interval.toFixed(1)} s`]];
  if (w.pattern === 'chain') rows.push(['Damage', (w.chainDamage ?? []).map(dmg).join(' / ')], ['Targets', `up to 3, hop ${w.chainHopRange}`], ['Range', `${w.range}`]);
  else if (w.pattern === 'pulse') rows.push(['Damage', `${dmg(w.damage)} to all`], ['Radius', `${w.pulseRadius} from Base centre`]);
  else rows.push(['Damage', dmg(w.damage)], ['Range', `${w.range}`], ['Delivery', w.pattern === 'projectile' ? 'homing needle' : 'instant lance']);
  rows.push(['DPS (1 target)', ((w.pattern === 'chain' ? (w.chainDamage ?? [0])[0] : w.damage) * mul / w.interval).toFixed(1)]);
  return rows;
}

export function detailHtml(id: CardId, polish: number, extra = ''): string {
  const d = cardDef(id);
  const type = d.kind === 'weapon' ? `Weapon · ${{ projectile: 'Single target', lance: 'Heavy single target', chain: 'Chain', pulse: 'Area ring' }[WEAPONS[d.id].pattern]}` : 'Boon · resolves immediately';
  const rows = d.kind === 'weapon' ? weaponStats(d.id, polish) : id === 'polish' ? [['Effect', `+15% weapon damage (now ${polish}/2)`]] : [['Effect', `Restore ${BOON_TUNING.mendAmount} Integrity`]];
  return `<div class="name">${d.name}</div><div class="type">${type}</div>
    <div>${d.summary}</div>
    <dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>${extra}
    <div class="flavor">“${d.flavor}”</div>`;
}

export class Hud {
  private root: HTMLElement;
  private el: Record<string, HTMLElement> = {};
  private draftKey = '';
  private lastHp = BASE.maxHealth;
  private hitTimer = 0;
  private toastTimer = 0;
  private hoverCard: { id: CardId; charge: number | null; slot: number | null } | null = null;
  private offListeners: (() => void)[] = [];
  private lastPhase: Phase | null = null;

  constructor(root: HTMLElement, cb: HudCallbacks) {
    this.root = root;
    root.innerHTML = `
      <div id="hud" class="hidden" role="toolbar" aria-label="Game controls">
        <div class="brand">PALIMPSEST</div>
        <div class="meter" id="integrity" aria-live="polite">
          <span class="label">Integrity</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">100</span>
        </div>
        <div class="meter" id="trial">
          <span class="label">Trial <span class="trial-n">1</span>/${TRIAL_COUNT}</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">30</span>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-buttons">
          <button id="btn-pause" title="Pause (P)">Pause</button>
          <button id="btn-mute" title="Mute (M)">Mute</button>
          <button id="btn-quality" title="Toggle quality (Q)">Quality: High</button>
          <button id="btn-restart" class="danger" title="Restart (R)">Restart</button>
        </div>
      </div>
      <div id="title-overlay" class="overlay">
        <div class="plate">
          <h1>PALIMPSEST</h1>
          <div class="stakes">${STAKES_LINE}</div>
          <div class="divider"></div>
          <p>Your weapons are memory cards seated in the vessel. Each fills with light from bottom to top, then the vessel fires on its own.</p>
          <p>Between trials, choose one memory. Drag it into a socket, or click it and then click a socket.</p>
          <div class="actions"><button id="btn-start" class="primary">Begin the Trials</button></div>
          <p class="small">P pause · M mute · Q quality · Esc cancel · 1–3 choose · 1–6 socket</p>
        </div>
      </div>
      <div id="pause-overlay" class="overlay soft hidden">
        <div class="plate">
          <h2 id="pause-title">Paused</h2>
          <p id="pause-text">The trial is held still.</p>
          <div class="actions"><button id="btn-resume" class="primary">Resume</button></div>
        </div>
      </div>
      <div id="end-overlay" class="overlay hidden">
        <div class="plate">
          <h2 id="end-title"></h2>
          <p id="end-text"></p>
          <div class="stats" id="end-stats"></div>
          <div class="actions"><button id="btn-end-restart" class="primary">Restart</button></div>
          <p class="small" id="end-seed"></p>
        </div>
      </div>
      <aside id="draft-panel" class="hidden" aria-label="Choose a memory">
        <div class="eyebrow" id="draft-eyebrow"></div>
        <h3 id="draft-heading">Choose one memory</h3>
        <div class="forecast" id="draft-forecast"></div>
        <div class="offer-list" id="offer-list" role="group" aria-label="Offered cards"></div>
        <div class="detail" id="draft-detail"></div>
        <div id="compare-slot"></div>
        <div class="socket-list hidden" id="socket-list" role="group" aria-label="Sockets"></div>
        <div class="hint" id="draft-hint"></div>
        <div class="draft-actions">
          <button id="btn-use" class="primary hidden">Use</button>
          <button id="btn-replace" class="primary hidden">Replace</button>
          <button id="btn-cancel" class="hidden">Cancel</button>
          <button id="btn-continue" class="primary" disabled>Continue</button>
        </div>
      </aside>
      <div id="inspect" class="detail hidden" aria-live="polite"></div>
      <div id="toast" class="hidden"></div>
    `;
    const ids = [
      'hud',
      'integrity',
      'trial',
      'btn-pause',
      'btn-mute',
      'btn-quality',
      'btn-restart',
      'title-overlay',
      'btn-start',
      'pause-overlay',
      'pause-title',
      'pause-text',
      'btn-resume',
      'end-overlay',
      'end-title',
      'end-text',
      'end-stats',
      'end-seed',
      'btn-end-restart',
      'draft-panel',
      'draft-eyebrow',
      'draft-heading',
      'draft-forecast',
      'offer-list',
      'draft-detail',
      'compare-slot',
      'socket-list',
      'draft-hint',
      'btn-use',
      'btn-replace',
      'btn-cancel',
      'btn-continue',
      'inspect',
      'toast',
    ];
    for (const id of ids) this.el[id] = root.querySelector(`#${id}`) as HTMLElement;

    const on = (id: string, fn: () => void) => {
      const h = (e: Event) => {
        e.preventDefault();
        fn();
      };
      this.el[id].addEventListener('click', h);
      this.offListeners.push(() => this.el[id].removeEventListener('click', h));
    };
    on('btn-start', () => cb.start());
    on('btn-pause', () => (this.lastPhase === 'PAUSED' ? cb.resume() : cb.pause()));
    on('btn-resume', () => cb.resume());
    on('btn-mute', () => cb.toggleMute());
    on('btn-quality', () => cb.toggleQuality());
    on('btn-restart', () => cb.restart());
    on('btn-end-restart', () => cb.restart());
    on('btn-use', () => cb.useBoon());
    on('btn-replace', () => cb.confirmReplace());
    on('btn-cancel', () => cb.cancel());
    on('btn-continue', () => cb.continueRun());
    const delegate = (id: string, attr: string, fn: (n: number) => void) => {
      const h = (e: Event) => {
        const b = (e.target as HTMLElement).closest(`button[${attr}]`) as HTMLButtonElement | null;
        if (b && !b.disabled) fn(Number(b.getAttribute(attr)));
      };
      this.el[id].addEventListener('click', h);
      this.offListeners.push(() => this.el[id].removeEventListener('click', h));
    };
    delegate('offer-list', 'data-offer', (i) => cb.selectOffer(i));
    delegate('socket-list', 'data-slot', (s) => cb.placeSlot(s));
  }

  /** Called by input when a card is hovered (offer or equipped). */
  setHoverCard(card: { id: CardId; charge: number | null; slot: number | null } | null): void {
    this.hoverCard = card;
  }

  toast(text: string, seconds = 2.5): void {
    this.el.toast.textContent = text;
    this.el.toast.classList.remove('hidden');
    this.el.toast.style.opacity = '1';
    this.toastTimer = seconds;
  }

  /** Safe-area insets (CSS px) the camera must keep clear. */
  insets(phase: Phase): { top: number; right: number; bottom: number; left: number } {
    const drafting = phase === 'DRAFT' || phase === 'PLACEMENT';
    const panel = drafting ? (this.el['draft-panel'].getBoundingClientRect().width || 330) + 20 : 0;
    return { top: 56, right: panel, bottom: 6, left: 6 };
  }

  focusPrimary(phase: Phase): void {
    if (phase === 'TITLE') this.el['btn-start'].focus();
  }

  update(s: HudState, dt: number): void {
    const phaseChanged = s.phase !== this.lastPhase;
    this.lastPhase = s.phase;
    const inRun = s.phase !== 'TITLE';
    this.el.hud.classList.toggle('hidden', !inRun);
    this.el['title-overlay'].classList.toggle('hidden', s.phase !== 'TITLE');

    // integrity
    const hpFrac = Math.max(0, s.hp / BASE.maxHealth);
    (this.el.integrity.querySelector('.fill') as HTMLElement).style.transform = `scaleX(${hpFrac})`;
    (this.el.integrity.querySelector('.value') as HTMLElement).textContent = `${Math.ceil(s.hp)}`;
    this.el.integrity.classList.toggle('low', hpFrac <= 0.35);
    if (s.hp < this.lastHp) this.hitTimer = 0.35;
    this.lastHp = s.hp;
    this.hitTimer = Math.max(0, this.hitTimer - dt);
    this.el.integrity.classList.toggle('hit', this.hitTimer > 0);

    // trial clock (reads the trial definition's duration)
    (this.el.trial.querySelector('.trial-n') as HTMLElement).textContent = `${s.trialIndex + 1}`;
    const remaining = Math.max(0, s.trialDuration - s.trialTime);
    (this.el.trial.querySelector('.fill') as HTMLElement).style.transform = `scaleX(${s.clearing ? 0 : remaining / s.trialDuration})`;
    (this.el.trial.querySelector('.value') as HTMLElement).textContent = s.clearing ? `${s.enemiesLeft} left` : `${Math.ceil(remaining)}s`;

    this.el['btn-pause'].textContent = s.phase === 'PAUSED' ? 'Resume' : 'Pause';
    (this.el['btn-pause'] as HTMLButtonElement).disabled = !(s.phase === 'COMBAT' || s.phase === 'CLEARING' || s.phase === 'PAUSED');
    this.el['btn-mute'].textContent = s.muted ? 'Unmute' : 'Mute';
    this.el['btn-quality'].textContent = `Quality: ${s.quality === 'high' ? 'High' : 'Low'}`;

    // pause / suspension
    const paused = s.phase === 'PAUSED' || s.suspended;
    this.el['pause-overlay'].classList.toggle('hidden', !paused);
    if (paused) {
      const susp = s.suspended || s.pauseReason === 'suspended';
      this.el['pause-title'].textContent = susp ? 'The vessel waits' : 'Paused';
      this.el['pause-text'].textContent = susp ? 'The trial was suspended while you were away. Nothing advanced.' : 'The trial is held still.';
      if (phaseChanged) this.el['btn-resume'].focus({ preventScroll: true });
    }

    // endings
    const ended = s.phase === 'DEFEAT' || s.phase === 'VICTORY';
    this.el['end-overlay'].classList.toggle('hidden', !ended);
    if (ended && phaseChanged) {
      this.el.toast.classList.add('hidden');
      this.toastTimer = 0;
      const win = s.phase === 'VICTORY';
      this.el['end-overlay'].className = `overlay ${win ? 'victory' : 'defeat'}`;
      this.el['end-title'].textContent = win ? 'Returned to Life' : 'The Vessel Breaks';
      this.el['end-text'].textContent = win
        ? 'Eight trials endured. The aperture opens and the soul rises toward a new life.'
        : 'Your memories scatter into the void. The instrument can be wound again.';
      const build = s.slots.filter(Boolean).length;
      this.el['end-stats'].innerHTML = `<div><b>${s.trialIndex + 1}/${TRIAL_COUNT}</b>trial</div><div><b>${s.kills}</b>echoes laid to rest</div><div><b>${build}</b>memories held</div><div><b>${Math.ceil(s.hp)}</b>integrity</div>`;
      this.el['end-seed'].textContent = `Seed ${s.seed}`;
      setTimeout(() => this.el['btn-end-restart'].focus({ preventScroll: true }), 0);
    }

    this.updateDraft(s);
    this.updateInspect(s);

    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.el.toast.classList.add('hidden');
    }
  }

  private updateDraft(s: HudState): void {
    const drafting = (s.phase === 'DRAFT' || s.phase === 'PLACEMENT') && !!s.draft;
    this.el['draft-panel'].classList.toggle('hidden', !drafting);
    if (!drafting || !s.draft) {
      this.draftKey = '';
      return;
    }
    const d = s.draft;
    const hoverId = this.hoverCard && this.hoverCard.slot === null ? this.hoverCard.id : null;
    const key = JSON.stringify([d, s.slots.map((x) => x?.defId ?? null), s.hp, s.polishStacks, hoverId, s.suspended]);
    if (key === this.draftKey) return;
    this.draftKey = key;

    this.el['draft-eyebrow'].textContent = `Trial ${d.draftIndex + 1} endured`;
    this.el['draft-heading'].textContent = d.stage === 'resolved' ? 'Memory reclaimed' : 'Choose one memory';
    this.el['draft-forecast'].textContent = `Next: ${d.forecast}`;
    const locked = d.stage === 'settling' || d.stage === 'resolved' || d.stage === 'confirmReplace';
    this.el['offer-list'].innerHTML = d.offer
      .map((id, i) => {
        const def = cardDef(id);
        const owned = isWeaponId(id) && s.slots.some((w) => w?.defId === id);
        const kind = def.kind === 'boon' ? 'Boon' : owned ? 'Weapon · owned' : 'Weapon · new';
        return `<button data-offer="${i}" aria-pressed="${d.selected === i}" ${locked ? 'disabled' : ''}><span>${i + 1}. ${def.name}</span><span class="kind">${kind}</span></button>`;
      })
      .join('');

    const shown: CardId | null = hoverId ?? (d.selected !== null ? d.offer[d.selected] : d.resolvedCard);
    this.el['draft-detail'].innerHTML = shown ? detailHtml(shown, s.polishStacks) : `<div class="hint">Hover or select a card to read it. Every weapon fires from the vessel's shared emitter; sockets are interchangeable.</div>`;

    // replacement comparison
    if (d.stage === 'confirmReplace' && d.pendingSlot !== null && d.selected !== null) {
      const old = s.slots[d.pendingSlot];
      const neu = d.offer[d.selected] as WeaponId;
      this.el['compare-slot'].innerHTML = old
        ? `<div class="compare"><div class="old"><b>${WEAPONS[old.defId].name}</b>${WEAPONS[old.defId].interval.toFixed(1)}s · ${WEAPONS[old.defId].damage} dmg</div><div class="arrow">→</div><div class="new"><b>${WEAPONS[neu].name}</b>${WEAPONS[neu].interval.toFixed(1)}s · ${WEAPONS[neu].damage} dmg</div></div>`
        : '';
    } else this.el['compare-slot'].innerHTML = '';

    // keyboard socket mirror
    const placing = d.stage === 'placing';
    this.el['socket-list'].classList.toggle('hidden', !placing);
    if (placing) {
      this.el['socket-list'].innerHTML = s.slots
        .map((w, i) => `<button data-slot="${i}"><span>Socket ${i + 1}</span><span class="kind">${w ? `Replace ${WEAPONS[w.defId].name}` : 'Empty'}</span></button>`)
        .join('');
    }

    const isBoon = d.selected !== null && !isWeaponId(d.offer[d.selected]);
    this.el['btn-use'].classList.toggle('hidden', !(d.stage === 'boonSelected' && isBoon));
    this.el['btn-replace'].classList.toggle('hidden', d.stage !== 'confirmReplace');
    this.el['btn-cancel'].classList.toggle('hidden', !(d.stage === 'placing' || d.stage === 'confirmReplace' || d.stage === 'boonSelected'));
    (this.el['btn-continue'] as HTMLButtonElement).disabled = d.stage !== 'resolved' || s.suspended;

    const hints: Record<DraftStage, string> = {
      choosing: 'Drag a weapon card into any socket, or click it and then click a socket. Boons are used, not socketed.',
      boonSelected: 'Press Use to apply this boon. It does not take a socket.',
      placing: 'Click a socket on the vessel (or a socket button). Occupied sockets ask before replacing. Esc returns the card.',
      confirmReplace: 'The current weapon stays installed until you press Replace.',
      settling: 'Seating the memory…',
      resolved: 'Your build is set. Press Continue when ready — the trial resumes exactly where it froze.',
    };
    this.el['draft-hint'].textContent = hints[d.stage];
    if (d.stage === 'resolved') setTimeout(() => (this.el['btn-continue'] as HTMLButtonElement).focus({ preventScroll: true }), 0);
  }

  private updateInspect(s: HudState): void {
    const show = !!this.hoverCard && this.hoverCard.slot !== null && (s.phase === 'COMBAT' || s.phase === 'CLEARING' || s.phase === 'PAUSED' || s.phase === 'DRAFT' || s.phase === 'PLACEMENT');
    this.el.inspect.classList.toggle('hidden', !show);
    if (show && this.hoverCard) {
      const charge = this.hoverCard.slot !== null ? s.slots[this.hoverCard.slot]?.charge ?? 0 : 0;
      const extra = `<dl><dt>Socket</dt><dd>${(this.hoverCard.slot ?? 0) + 1} (no effect on combat)</dd><dt>Charge</dt><dd>${Math.round(charge * 100)}%</dd></dl>`;
      this.el.inspect.innerHTML = detailHtml(this.hoverCard.id, s.polishStacks, extra);
      const drafting = s.phase === 'DRAFT' || s.phase === 'PLACEMENT';
      this.el.inspect.style.left = '14px';
      this.el.inspect.style.right = drafting ? 'auto' : 'auto';
    }
  }

  dispose(): void {
    for (const off of this.offListeners) off();
    this.offListeners = [];
    this.root.innerHTML = '';
  }

  static enemyName(kind: keyof typeof ENEMIES): string {
    return ENEMIES[kind].name;
  }
}
