// Compact DOM HUD. Cards themselves are physical objects in the scene; the DOM only carries
// Integrity, wave clock, time speed, settings, active-card cooldown icons, the modifier panel,
// the turn controls (energy, piles, End Turn), a contextual action bar (sacrifice/purge/replace/
// cancel), a card tooltip and the overlays.
import { activeCooldown, ACTIVE_IDS, BASE, cardDef, ENEMIES, SPELLS, STAKES_LINE, TRIAL_COUNT, TURN, WEAPONS } from '../game/content';
import type { TurnStage } from '../game/phases';
import { averageDps, fmt, towerStats } from '../game/stats';
import type { ActiveDef, ActiveId, CardId, Phase, StatId, StatMods, WeaponId } from '../game/types';
import { drawCardIcon } from '../view/art';

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
  setSpeed(speed: number): void;
}

export interface ActiveView {
  id: ActiveId;
  count: number;
  fraction: number;
}

export interface HudState {
  phase: Phase;
  suspended: boolean;
  pauseReason: 'manual' | 'suspended' | null;
  hp: number;
  maxHp: number;
  speed: number;
  mods: StatMods;
  actives: ActiveView[];
  towerIds: WeaponId[];
  showStats: boolean;
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

/** Card text markup → HTML: {+bonus} green, {-drawback} red. */
export function richHtml(text: string): string {
  return text.replace(/\{([+-])([^}]*)\}/g, (_, sign: string, body: string) => `<span class="${sign === '+' ? 'pos' : 'neg'}">${sign}${body}</span>`);
}

/** Wrap a number that a modifier changed: green when raised, red when lowered. */
function tone(value: string, now: number, base: number): string {
  if (Math.abs(now - base) < 1e-9) return value;
  return `<span class="${now > base ? 'pos' : 'neg'}">${value}</span>`;
}

const STAT_LABEL: Record<StatId, string> = { attackSpeed: 'Attack speed', damage: 'Damage', range: 'Range', maxIntegrity: 'Max Integrity' };

export interface DetailContext {
  mods: StatMods;
  towerIds: WeaponId[];
  /** Copies of each active already in play. */
  activeCounts: Partial<Record<ActiveId, number>>;
}

/**
 * Tooltip body for a card. Costs are printed on the card itself, so they are not repeated here.
 * Tower numbers include every modifier in play.
 */
export function detailHtml(id: CardId, ctx: DetailContext): string {
  const d = cardDef(id);
  const typeName = { tower: 'Tower', active: 'Active · repeats during waves', passive: 'Passive · permanent' }[d.type];
  let body = `<div class="tt-body">${richHtml(d.summary)}</div>`;
  const rows: [string, string][] = [];
  if (d.type === 'tower') {
    const now = towerStats(d.id, ctx.mods);
    const base = towerStats(d.id, { attackSpeed: 0, damage: 0, range: 0, maxIntegrity: 0 });
    rows.push(['Damage', tone(now.damage.map((x) => fmt(x)).join(' → '), now.damage[0], base.damage[0])]);
    rows.push(['DPS', tone(fmt(now.dps), now.dps, base.dps)]);
    rows.push(['Attack speed', tone(`${fmt(now.attacksPerSecond, 2)} / s`, now.attacksPerSecond, base.attacksPerSecond)]);
    rows.push(['Range', tone(fmt(now.range), now.range, base.range)]);
    rows.push(['Target', now.target]);
    if (now.projectiles !== null) rows.push(['Projectiles', String(now.projectiles)]);
  } else if (d.type === 'passive') {
    const total = ctx.mods[d.stat];
    rows.push([`${STAT_LABEL[d.stat]} now`, total > 0 ? `<span class="pos">+${fmt(total * 100)}%</span>` : '+0%']);
  } else {
    const a = d as ActiveDef;
    const have = ctx.activeCounts[a.id] ?? 0;
    rows.push(['Cooldown', have > 0 ? `${fmt(activeCooldown(a.id, have))} s → <span class="pos">${fmt(activeCooldown(a.id, have + 1))} s</span>` : `${fmt(a.cooldown)} s`]);
    if (a.effect.kind === 'strike') rows.push(['Strike now', `<span class="pos">${fmt(averageDps(ctx.towerIds, ctx.mods) * a.effect.dpsRatio)}</span> damage`]);
    rows.push(['In play', have > 0 ? `${have} ${have === 1 ? 'copy' : 'copies'}` : 'none']);
    body += `<div class="tt-note">Each extra copy shortens the shared cooldown.</div>`;
  }
  return `<div class="tt-head tt-${d.type}"><span class="tt-name">${d.name}</span><span class="tt-type">${typeName}</span></div>
    ${body}<dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
}

export class Hud {
  private el: Record<string, HTMLElement> = {};
  private lastHp = BASE.maxHealth;
  private hitTimer = 0;
  private toastTimer = 0;
  private offListeners: (() => void)[] = [];
  private lastPhase: Phase | null = null;
  private turnKey = '';
  private activesKey = '';
  private statsKey = '';
  private icons = new Map<ActiveId, string>();

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
        <div class="speed" role="group" aria-label="Time speed">
          <button id="btn-speed-1" title="Normal speed (1)">1×</button>
          <button id="btn-speed-2" title="Double speed (2)">2×</button>
          <button id="btn-speed-3" title="Triple speed (3)">3×</button>
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
      <div id="actives" class="hidden" aria-label="Active cards"></div>
      <div id="stats-panel" class="hidden" aria-label="Modifiers"></div>
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
          <p>Passive cards are permanent bonuses; active cards repeat on their own during waves. Drag or click cards to play them. Right-click cards to mark them: sacrifice two for something new, or purge one.</p>
          <div class="actions"><button id="btn-start" class="primary">Begin</button></div>
          <p class="small">E end turn · Esc cancel · Tab modifiers · 1/2/3 speed · P pause · M mute · Q quality · wheel zoom · Z reset zoom</p>
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
    for (const n of [1, 2, 3]) on(`btn-speed-${n}`, () => cb.setSpeed(n));
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

    const hpFrac = Math.max(0, s.hp / s.maxHp);
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

    for (const n of [1, 2, 3]) this.el[`btn-speed-${n}`].classList.toggle('on', s.speed === n);
    this.updateActives(s);
    this.updateStats(s);

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
      this.el['end-text'].textContent = win ? 'Eight waves endured. The candle burns down and the soul rises toward a new life.' : 'Your memories scatter across the table. The instrument can be wound again.';
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

  /** Cooldown icons for played active cards; each fills bottom-up like a tower card. */
  private updateActives(s: HudState): void {
    const box = this.el.actives;
    const show = s.phase !== 'TITLE' && s.actives.length > 0;
    box.classList.toggle('hidden', !show);
    if (!show) return;
    const key = s.actives.map((a) => `${a.id}:${a.count}`).join(',');
    if (key !== this.activesKey) {
      this.activesKey = key;
      box.innerHTML = s.actives
        .map((a) => {
          const def = SPELLS[a.id] as ActiveDef;
          return `<div class="active-icon" data-id="${a.id}" title="${def.name}: every ${fmt(activeCooldown(a.id, a.count))} s">
            <img alt="" src="${this.iconUrl(a.id)}" /><div class="cd"></div>
            ${a.count > 1 ? `<span class="count">×${a.count}</span>` : ''}<span class="cd-label">${fmt(activeCooldown(a.id, a.count))}s</span></div>`;
        })
        .join('');
    }
    for (const a of s.actives) {
      const el = box.querySelector<HTMLElement>(`.active-icon[data-id="${a.id}"]`);
      if (!el) continue;
      (el.querySelector('.cd') as HTMLElement).style.transform = `scaleY(${1 - a.fraction})`;
      el.classList.toggle('ready', a.fraction >= 1);
    }
  }

  private iconUrl(id: ActiveId): string {
    let url = this.icons.get(id);
    if (!url) {
      url = drawCardIcon(id, 96).toDataURL();
      this.icons.set(id, url);
    }
    return url;
  }

  /** Run-wide modifiers: always shown during a turn, toggled with Tab during a wave. */
  private updateStats(s: HudState): void {
    const panel = this.el['stats-panel'];
    const show = s.phase !== 'TITLE' && s.phase !== 'DEFEAT' && s.phase !== 'VICTORY' && (s.phase === 'TURN' || s.showStats);
    panel.classList.toggle('hidden', !show);
    if (!show) return;
    const key = JSON.stringify([s.mods, s.actives.map((a) => [a.id, a.count]), s.towerIds, s.maxHp]);
    if (key === this.statsKey) return;
    this.statsKey = key;
    const pct = (v: number) => (v > 0 ? `<span class="pos">+${fmt(v * 100)}%</span>` : `<span class="zero">+0%</span>`);
    const rows = (Object.keys(STAT_LABEL) as StatId[]).map((k) => `<dt>${STAT_LABEL[k]}</dt><dd>${pct(s.mods[k])}</dd>`).join('');
    const towers = s.towerIds.map((id) => `<dt>${WEAPONS[id].name}</dt><dd>${fmt(towerStats(id, s.mods).dps)} DPS</dd>`).join('');
    const actives = ACTIVE_IDS.map((id) => s.actives.find((a) => a.id === id))
      .filter((a): a is ActiveView => !!a)
      .map((a) => `<dt>${SPELLS[a.id].name}${a.count > 1 ? ` ×${a.count}` : ''}</dt><dd>every ${fmt(activeCooldown(a.id, a.count))} s</dd>`)
      .join('');
    panel.innerHTML = `<h3>Modifiers</h3><dl>${rows}<dt>Integrity</dt><dd>${fmt(s.maxHp)} max</dd></dl>
      ${towers ? `<h4>Towers</h4><dl>${towers}</dl>` : ''}
      ${actives ? `<h4>Actives</h4><dl>${actives}</dl>` : ''}
      <p class="hint">${s.phase === 'TURN' ? 'Tab shows this during waves' : 'Tab to hide'}</p>`;
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
