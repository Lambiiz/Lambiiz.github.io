// Compact DOM HUD. Cards themselves are physical objects in the scene; the DOM only carries
// Integrity, wave clock, settings, the turn controls (energy, piles, End Turn), a contextual
// action bar (sacrifice/purge/replace/cancel), a 14px card tooltip and the overlays.
import { BASE, cardDef, ENEMIES, STAKES_LINE, TRIAL_COUNT, TURN, WEAPONS } from '../game/content';
import type { TurnStage } from '../game/phases';
import type { CardId, Phase } from '../game/types';

export interface HudCallbacks {
  start(): void;
  pause(): void;
  resume(): void;
  toggleMute(): void;
  setVolume(v: number): void;
  toggleQuality(): void;
  restart(): void;
  endTurn(): void;
  sacrifice(): void;
  purge(): void;
  clearMarks(): void;
  confirmReplace(): void;
  cancel(): void;
}

export interface HudState {
  phase: Phase;
  suspended: boolean;
  pauseReason: 'manual' | 'suspended' | null;
  hp: number;
  waveIndex: number;
  trialTime: number;
  trialDuration: number;
  clearing: boolean;
  enemiesLeft: number;
  muted: boolean;
  quality: 'high' | 'low';
  seed: number;
  kills: number;
  towers: number;
  turn: null | {
    turnIndex: number;
    energy: number;
    stage: TurnStage;
    marked: number;
    purgesLeft: number;
    selectedName: string | null;
    selectedIsTower: boolean;
    replace: { from: string; to: string } | null;
    forecast: string;
    nextWave: number;
    canEndTurn: boolean;
  };
  piles: { draw: number; discard: number; drawPos: { x: number; y: number }; discardPos: { x: number; y: number }; cardH: number };
}

export function detailHtml(id: CardId, extra = ''): string {
  const d = cardDef(id);
  const typeName = { tower: 'Tower', active: 'Active', passive: 'Passive · lasts the next wave' }[d.type];
  let rows: [string, string][] = [['Cost', `${d.cost} energy`]];
  if (d.type === 'tower') {
    const w = WEAPONS[d.id];
    rows = rows.concat([
      ['Damage', w.pattern === 'chain' ? (w.chainDamage ?? []).join(' / ') : w.pattern === 'pulse' ? `${w.damage} to all in reach` : `${w.damage}`],
      ['Interval', `${w.interval.toFixed(1)} s`],
      ['Range', w.pattern === 'pulse' ? `${w.pulseRadius} around the vessel` : `${w.range}`],
    ]);
    if (w.pattern === 'chain') rows.push(['Chain', `3 foes, hop ${w.chainHopRange}`]);
  }
  return `<div class="tt-head tt-${d.type}"><span class="tt-name">${d.name}</span><span class="tt-type">${typeName}</span></div>
    <div class="tt-body">${d.summary}</div>
    <dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>${extra}
    <div class="tt-flavor">“${d.flavor}”</div>`;
}

export class Hud {
  private el: Record<string, HTMLElement> = {};
  private lastHp = BASE.maxHealth;
  private hitTimer = 0;
  private toastTimer = 0;
  private offListeners: (() => void)[] = [];
  private lastPhase: Phase | null = null;
  private turnKey = '';

  constructor(
    private root: HTMLElement,
    cb: HudCallbacks,
  ) {
    root.innerHTML = `
      <div id="hud" class="hidden" role="toolbar" aria-label="Game controls">
        <div class="brand">PALIMPSEST</div>
        <div class="meter" id="integrity" aria-live="polite">
          <span class="label">Integrity</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">100</span>
        </div>
        <div class="meter" id="trial">
          <span class="label">Wave <span class="trial-n">1</span>/${TRIAL_COUNT}</span>
          <div class="bar"><div class="fill"></div></div>
          <span class="value">30s</span>
        </div>
        <div class="hud-spacer"></div>
        <div class="hud-buttons">
          <button id="btn-pause" title="Pause (P)">Pause</button>
          <button id="btn-mute" title="Mute (M)">Mute</button>
          <label class="volume" title="Volume"><span class="sr-only">Volume</span><input id="volume" type="range" min="0" max="100" value="70" aria-label="Volume" /></label>
          <button id="btn-quality" title="Toggle quality (Q)">Quality: High</button>
          <button id="btn-restart" class="danger" title="Restart">Restart</button>
        </div>
      </div>
      <div id="forecast" class="hidden"></div>
      <div id="energy" class="hidden" aria-live="polite"><span class="label">Energy</span><span class="pips"></span><span class="value"></span></div>
      <div id="draw-count" class="pile-count hidden" title="Draw pile"></div>
      <div id="discard-count" class="pile-count hidden" title="Discard pile"></div>
      <button id="btn-end-turn" class="primary hidden" title="End turn (E)">End Turn</button>
      <div id="action-bar" class="hidden">
        <span id="action-text"></span>
        <button id="btn-sacrifice" class="hidden">Sacrifice</button>
        <button id="btn-purge" class="hidden">Purge</button>
        <button id="btn-clear" class="hidden">Clear</button>
        <button id="btn-replace" class="primary hidden">Replace</button>
        <button id="btn-cancel" class="hidden">Cancel</button>
      </div>
      <div id="tooltip" class="hidden" role="tooltip"></div>
      <div id="title-overlay" class="overlay">
        <div class="plate">
          <h1>PALIMPSEST</h1>
          <div class="stakes">${STAKES_LINE}</div>
          <div class="divider"></div>
          <p>Seat tower cards in the vessel; each fills with light and fires on its own. Between waves, play your hand with ${TURN.energyPerTurn} energy.</p>
          <p>Drag or click cards to play them. Right-click cards to mark them: sacrifice two for something new, or purge one.</p>
          <div class="actions"><button id="btn-start" class="primary">Begin</button></div>
          <p class="small">E end turn · Esc cancel · P pause · M mute · Q quality · wheel zoom · Z reset zoom</p>
        </div>
      </div>
      <div id="pause-overlay" class="overlay soft hidden">
        <div class="plate">
          <h2 id="pause-title">Paused</h2>
          <p id="pause-text">The wave is held still.</p>
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
      <div id="toast" class="hidden"></div>
    `;
    root.querySelectorAll<HTMLElement>('[id]').forEach((n) => (this.el[n.id] = n));

    const on = (id: string, fn: () => void) => {
      const h = (e: Event) => {
        e.preventDefault();
        fn();
      };
      this.el[id].addEventListener('click', h);
      this.offListeners.push(() => this.el[id].removeEventListener('click', h));
    };
    on('btn-start', () => {
      // hide at once: the next HUD frame may be a while away, and the overlay would swallow pointer moves
      this.el['title-overlay'].classList.add('hidden');
      cb.start();
    });
    on('btn-pause', () => (this.lastPhase === 'PAUSED' ? cb.resume() : cb.pause()));
    on('btn-resume', () => cb.resume());
    on('btn-mute', () => cb.toggleMute());
    on('btn-quality', () => cb.toggleQuality());
    on('btn-restart', () => cb.restart());
    on('btn-end-restart', () => cb.restart());
    on('btn-end-turn', () => cb.endTurn());
    on('btn-sacrifice', () => cb.sacrifice());
    on('btn-purge', () => cb.purge());
    on('btn-clear', () => cb.clearMarks());
    on('btn-replace', () => cb.confirmReplace());
    on('btn-cancel', () => cb.cancel());
    const vol = this.el.volume as HTMLInputElement;
    const onVol = () => cb.setVolume(Number(vol.value) / 100);
    vol.addEventListener('input', onVol);
    this.offListeners.push(() => vol.removeEventListener('input', onVol));
  }

  toast(text: string, seconds = 2.5): void {
    this.el.toast.textContent = text;
    this.el.toast.classList.remove('hidden');
    this.toastTimer = seconds;
  }

  /** Show a card tooltip next to a screen rect (CSS px), or hide it. */
  setTooltip(html: string | null, rect?: { x: number; y: number; w: number; h: number }): void {
    const tt = this.el.tooltip;
    if (!html || !rect) {
      tt.classList.add('hidden');
      return;
    }
    tt.innerHTML = html;
    tt.classList.remove('hidden');
    const W = this.root.clientWidth;
    const H = this.root.clientHeight;
    const tw = tt.offsetWidth || 280;
    const th = tt.offsetHeight || 200;
    let x = rect.x + rect.w + 12;
    if (x + tw > W - 8) x = rect.x - tw - 12;
    x = Math.max(8, Math.min(W - tw - 8, x));
    let y = rect.y + rect.h / 2 - th / 2;
    y = Math.max(64, Math.min(H - th - 8, y));
    tt.style.left = `${x}px`;
    tt.style.top = `${y}px`;
  }

  /** Bottom safe area the camera fit should keep clear (CSS px). */
  insets(): { top: number; right: number; bottom: number; left: number } {
    return { top: 56, right: 0, bottom: 40, left: 0 };
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

    const hpFrac = Math.max(0, s.hp / BASE.maxHealth);
    (this.el.integrity.querySelector('.fill') as HTMLElement).style.transform = `scaleX(${hpFrac})`;
    (this.el.integrity.querySelector('.value') as HTMLElement).textContent = `${Math.ceil(s.hp)}`;
    this.el.integrity.classList.toggle('low', hpFrac <= 0.35);
    if (s.hp < this.lastHp) this.hitTimer = 0.35;
    this.lastHp = s.hp;
    this.hitTimer = Math.max(0, this.hitTimer - dt);
    this.el.integrity.classList.toggle('hit', this.hitTimer > 0);

    const turn = s.phase === 'TURN' && s.turn;
    (this.el.trial.querySelector('.trial-n') as HTMLElement).textContent = `${(turn ? s.turn!.nextWave : s.waveIndex) + 1}`;
    const remaining = Math.max(0, s.trialDuration - s.trialTime);
    (this.el.trial.querySelector('.fill') as HTMLElement).style.transform = `scaleX(${turn ? 1 : s.clearing ? 0 : remaining / s.trialDuration})`;
    (this.el.trial.querySelector('.value') as HTMLElement).textContent = turn ? 'next' : s.clearing ? `${s.enemiesLeft} left` : `${Math.ceil(remaining)}s`;

    this.el['btn-pause'].textContent = s.phase === 'PAUSED' ? 'Resume' : 'Pause';
    (this.el['btn-pause'] as HTMLButtonElement).disabled = !(s.phase === 'COMBAT' || s.phase === 'CLEARING' || s.phase === 'PAUSED');
    this.el['btn-mute'].textContent = s.muted ? 'Unmute' : 'Mute';
    this.el['btn-quality'].textContent = `Quality: ${s.quality === 'high' ? 'High' : 'Low'}`;

    const paused = s.phase === 'PAUSED' || s.suspended;
    this.el['pause-overlay'].classList.toggle('hidden', !paused);
    if (paused) {
      const susp = s.suspended || s.pauseReason === 'suspended';
      this.el['pause-title'].textContent = susp ? 'The vessel waits' : 'Paused';
      this.el['pause-text'].textContent = susp ? 'The run was suspended while you were away. Nothing advanced.' : 'The wave is held still.';
      if (phaseChanged) this.el['btn-resume'].focus({ preventScroll: true });
    }

    const ended = s.phase === 'DEFEAT' || s.phase === 'VICTORY';
    this.el['end-overlay'].classList.toggle('hidden', !ended);
    if (ended && phaseChanged) {
      this.el.toast.classList.add('hidden');
      this.toastTimer = 0;
      const win = s.phase === 'VICTORY';
      this.el['end-overlay'].className = `overlay ${win ? 'victory' : 'defeat'}`;
      this.el['end-title'].textContent = win ? 'Returned to Life' : 'The Vessel Breaks';
      this.el['end-text'].textContent = win ? 'Eight waves endured. The aperture opens and the soul rises toward a new life.' : 'Your memories scatter across the table. The instrument can be wound again.';
      this.el['end-stats'].innerHTML = `<div><b>${s.waveIndex + 1}/${TRIAL_COUNT}</b>wave</div><div><b>${s.kills}</b>echoes laid to rest</div><div><b>${s.towers}</b>towers held</div><div><b>${Math.ceil(s.hp)}</b>integrity</div>`;
      this.el['end-seed'].textContent = `Seed ${s.seed}`;
      setTimeout(() => this.el['btn-end-restart'].focus({ preventScroll: true }), 0);
    }

    this.updateTurn(s);

    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.el.toast.classList.add('hidden');
    }
  }

  private updateTurn(s: HudState): void {
    const t = s.phase === 'TURN' || s.suspended ? s.turn : null;
    for (const id of ['forecast', 'energy', 'draw-count', 'discard-count', 'btn-end-turn']) this.el[id].classList.toggle('hidden', !t);
    if (!t) {
      this.el['action-bar'].classList.add('hidden');
      this.turnKey = '';
      return;
    }
    const p = s.piles;
    this.place(this.el['draw-count'], p.drawPos.x, p.drawPos.y - p.cardH * 0.5 - 14);
    this.place(this.el['discard-count'], p.discardPos.x, p.discardPos.y - p.cardH * 0.5 - 14);
    this.place(this.el.energy, p.drawPos.x, p.drawPos.y - p.cardH * 0.5 - 52);
    this.place(this.el['btn-end-turn'], p.discardPos.x, p.discardPos.y - p.cardH * 0.5 - 58);
    const key = JSON.stringify([t, p.draw, p.discard, s.suspended]);
    if (key === this.turnKey) return;
    this.turnKey = key;

    this.el['draw-count'].textContent = `Draw ${p.draw}`;
    this.el['discard-count'].textContent = `Discard ${p.discard}`;
    this.el.forecast.innerHTML = `<b>${t.turnIndex === 0 ? 'Prepare' : `Wave ${t.turnIndex} endured`}</b> · Next, wave ${t.nextWave + 1}: ${t.forecast}`;
    (this.el.energy.querySelector('.pips') as HTMLElement).innerHTML = Array.from({ length: TURN.energyPerTurn }, (_, i) => `<i class="${i < t.energy ? 'lit' : ''}"></i>`).join('');
    (this.el.energy.querySelector('.value') as HTMLElement).textContent = `${t.energy}/${TURN.energyPerTurn}`;
    (this.el['btn-end-turn'] as HTMLButtonElement).disabled = !t.canEndTurn;

    // contextual action bar
    const show = (id: string, on: boolean) => this.el[id].classList.toggle('hidden', !on);
    let text = '';
    show('btn-sacrifice', false);
    show('btn-purge', false);
    show('btn-clear', false);
    show('btn-replace', false);
    show('btn-cancel', false);
    if (t.stage === 'sacrificeChoice') text = 'Choose what rises from the ashes.';
    else if (t.stage === 'confirmReplace' && t.replace) {
      text = `Replace ${t.replace.from} with ${t.replace.to}? The old tower is destroyed.`;
      show('btn-replace', true);
      show('btn-cancel', true);
    } else if (t.stage === 'targeting') {
      text = t.selectedIsTower ? `Place ${t.selectedName}: click an open socket.` : `${t.selectedName}: click a placed tower.`;
      show('btn-cancel', true);
    } else if (t.marked === 2) {
      text = 'Two cards marked.';
      show('btn-sacrifice', true);
      show('btn-clear', true);
    } else if (t.marked === 1) {
      text = t.purgesLeft > 0 ? 'Mark one more to sacrifice, or purge this card from your deck.' : 'Mark one more to sacrifice (purge already used this turn).';
      show('btn-purge', t.purgesLeft > 0);
      show('btn-clear', true);
    }
    this.el['action-text'].textContent = text;
    this.el['action-bar'].classList.toggle('hidden', !text || s.suspended);
    const bottom = p.cardH * 1.25 + 18;
    this.el['action-bar'].style.bottom = `${bottom}px`;
  }

  /** Position an element centred on x (clamped to the viewport) with its bottom at y. */
  private place(el: HTMLElement, x: number, y: number): void {
    const half = (el.offsetWidth || 0) / 2;
    const W = this.root.clientWidth || window.innerWidth;
    el.style.left = `${Math.round(Math.max(half + 6, Math.min(W - half - 6, x)))}px`;
    el.style.top = `${Math.round(y)}px`;
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
