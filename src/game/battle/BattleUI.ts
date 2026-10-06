import './battle.css';
import type { BattleState, Fighter, Skill } from './sim/types';
import { TPS } from './sim/types';
import type { Prediction } from './sim/predict';
import { turnOrder } from './sim/predict';
import { battleSheetFor } from './Views';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent?: HTMLElement): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  e.className = cls;
  parent?.appendChild(e);
  return e;
}

export interface MenuItem {
  skill: Skill | 'flee';
  label: string;
  key: string;
  desc: string;
  enabled: boolean;
}

/** Seconds shown on the turn-order axis. */
const AXIS_SECONDS = 6;

const portraitCache = new Map<string, string>();
function portrait(look: string): string {
  let url = portraitCache.get(look);
  if (!url) portraitCache.set(look, (url = battleSheetFor(look).info.portrait.toCanvas().toDataURL()));
  return url;
}

const fmt = (ticks: number) => `${(ticks / TPS).toFixed(1)}s`;

/**
 * DOM layer for battles. Readability first:
 *  - the turn-order bar always shows who acts next and when (portraits on a time axis); while you
 *    choose it also shows where your command puts your next turn and the preview window;
 *  - a "what happens" list spells the preview out in order, including knock-backs, so a hit that
 *    lands later than expected is explained;
 *  - every fighter has a plate with HP and its turn gauge.
 */
export class BattleUI {
  readonly root: HTMLDivElement;
  private party: HTMLDivElement;
  private members = new Map<number, { row: HTMLDivElement; hp: HTMLElement; atb: HTMLDivElement; hpNum: HTMLElement }>();
  private plates = new Map<number, { el: HTMLDivElement; hp: HTMLElement; atb: HTMLDivElement }>();
  private menu: HTMLDivElement;
  private order: HTMLDivElement;
  private orderTrack: HTMLDivElement;
  private log: HTMLDivElement;
  private hint: HTMLDivElement;
  private orderLabel: HTMLDivElement;
  private result: HTMLDivElement;
  private pvLabels: HTMLDivElement[] = [];
  private logRows: { tick: number; el: HTMLDivElement }[] = [];
  private playhead: HTMLDivElement | null = null;
  items: MenuItem[] = [];
  sel = 0;
  onPick: ((i: number) => void) | null = null;
  onHover: ((i: number) => void) | null = null;

  constructor(parent: HTMLElement, private state: BattleState) {
    this.root = el('div', 'bui', parent);
    this.party = el('div', 'party', this.root);
    for (const f of state.fighters) {
      if (f.team === 'party') {
        const row = el('div', 'member', this.party);
        const img = el('img', 'face', row);
        img.src = portrait(f.look);
        el('div', 'nm', row).textContent = f.name;
        const hpb = el('div', 'bar', row);
        const hp = el('i', '', hpb);
        const hpNum = el('span', 'hpnum', hpb);
        const atb = el('div', 'bar atb', row);
        el('i', '', atb);
        this.members.set(f.id, { row, hp, atb, hpNum });
      }
      const p = el('div', `plate t-${f.team}`, this.root);
      el('div', 'pn', p).textContent = f.name;
      const hpb = el('div', 'bar', p);
      const hp = el('i', '', hpb);
      const atb = el('div', 'bar atb', p);
      el('i', '', atb);
      this.plates.set(f.id, { el: p, hp, atb });
    }
    this.menu = el('div', 'menu hidden', this.root);
    this.order = el('div', 'order', this.root);
    this.orderLabel = el('div', 'lbl', this.order);
    this.orderLabel.textContent = 'TURN ORDER';
    this.orderTrack = el('div', 'track', this.order);
    this.log = el('div', 'log hidden', this.root);
    this.hint = el('div', 'hint', this.root);
    this.result = el('div', 'result', this.root);
  }

  dispose(): void {
    this.root.remove();
  }

  private name(id: number): string {
    return this.state.fighters.find((f) => f.id === id)?.name ?? '?';
  }

  /** Per-frame refresh of bars and plates. */
  update(state: BattleState, project: (x: number, y: number, z: number) => { x: number; y: number }, viewPos: (f: Fighter) => { x: number; z: number }): void {
    for (const f of state.fighters) {
      const atbFill = state.awaiting === f.id ? 1 : Math.max(0, f.atb);
      const m = this.members.get(f.id);
      if (m) {
        m.hp.style.transform = `scaleX(${f.hp / f.maxHp})`;
        m.hpNum.textContent = `${f.hp}`;
        (m.atb.firstChild as HTMLElement).style.transform = `scaleX(${atbFill})`;
        m.atb.classList.toggle('full', atbFill >= 1);
        m.row.classList.toggle('active', state.awaiting === f.id);
        m.row.classList.toggle('ko', f.ko);
      }
      const p = this.plates.get(f.id)!;
      const v = viewPos(f);
      const s = project(v.x, -0.32, v.z);
      p.el.style.left = `${s.x}px`;
      p.el.style.top = `${s.y}px`;
      p.hp.style.transform = `scaleX(${f.hp / f.maxHp})`;
      (p.atb.firstChild as HTMLElement).style.transform = `scaleX(${atbFill})`;
      p.atb.classList.toggle('full', atbFill >= 1);
      p.el.classList.toggle('ko', f.ko);
      p.el.classList.toggle('active', state.awaiting === f.id);
    }
  }

  // -------------------------------------------------------------------------------------------
  // turn order
  // -------------------------------------------------------------------------------------------

  /**
   * Who acts when. `pred` (while choosing) adds the preview window, its playhead and impacts, and
   * moves the actor's next-turn chip to where the highlighted command puts it.
   */
  showOrder(state: BattleState, pred: Prediction | null, actorRestart: number | null): void {
    const T = AXIS_SECONDS * TPS;
    const W = this.orderTrack.clientWidth || 600;
    const xOf = (tick: number) => 26 + Math.min(1, tick / T) * (W - 52);
    let html = '';
    for (let s = 1; s <= AXIS_SECONDS; s++) html += `<div class="sec" style="left:${xOf(s * TPS)}px">${s}s</div>`;
    if (pred) {
      const certain = Math.min(pred.ticks, pred.certainUntil);
      html += `<div class="pv" style="left:${xOf(0)}px;width:${xOf(pred.ticks) - xOf(0)}px"><span>PREVIEW ${(pred.ticks / TPS).toFixed(1)}s</span></div>`;
      html += `<div class="pv-sure" style="left:${xOf(0)}px;width:${xOf(certain) - xOf(0)}px"></div>`;
      if (pred.certainUntil < pred.ticks) html += `<div class="pv-edge" style="left:${xOf(certain)}px" title="Someone else decides here: the preview may change after this">?</div>`;
      for (const e of pred.events) if (e.type === 'hit') html += `<div class="hitmark${e.certain ? '' : ' unc'}" style="left:${xOf(e.tick)}px"></div>`;
    }
    const entries = turnOrder(state, 9, actorRestart ?? 0);
    // the actor's next turn comes from the prediction when there is one (knock-outs, stuns…)
    if (pred && state.awaiting !== null) {
      const i = entries.findIndex((e) => e.fighter === state.awaiting && !e.now);
      if (i >= 0) entries.splice(i, 1);
      entries.push({ fighter: state.awaiting, tick: pred.actorNext });
      entries.sort((a, b) => a.tick - b.tick || a.fighter - b.fighter);
    }
    const lanes: number[] = [-1e9, -1e9];
    let shownNext = false;
    for (const e of entries) {
      const f = state.fighters.find((g) => g.id === e.fighter)!;
      const x = xOf(e.tick);
      let lane = x - lanes[0] >= 30 ? 0 : x - lanes[1] >= 30 ? 1 : 0;
      if (e.now) lane = 0;
      lanes[lane] = x;
      const isNext = !!pred && e.fighter === state.awaiting && !e.now && !shownNext;
      if (isNext) shownNext = true;
      const cls = `chip t-${f.team}${e.now ? ' now' : ''}${isNext ? ' next' : ''} lane${lane}`;
      const tag = e.now ? '<b>NOW</b>' : isNext ? `<b>next ${fmt(e.tick)}</b>` : '';
      html += `<div class="${cls}" style="left:${x}px" title="${f.name} · ${fmt(e.tick)}"><img src="${portrait(f.look)}">${tag}</div>`;
    }
    html += '<div class="playhead"></div>';
    this.orderTrack.innerHTML = html;
    this.playhead = this.orderTrack.querySelector('.playhead');
    if (this.playhead) this.playhead.style.display = pred ? '' : 'none';
  }

  setPlayhead(tick: number): void {
    if (!this.playhead) return;
    const W = this.orderTrack.clientWidth || 600;
    this.playhead.style.left = `${26 + Math.min(1, tick / (AXIS_SECONDS * TPS)) * (W - 52)}px`;
    for (const r of this.logRows) r.el.classList.toggle('past', r.tick <= tick);
  }

  // -------------------------------------------------------------------------------------------
  // the "what happens" list
  // -------------------------------------------------------------------------------------------

  showLog(pred: Prediction | null, actorName: string, actionLabel: string): void {
    this.logRows = [];
    if (!pred) { this.log.classList.add('hidden'); return; }
    this.log.classList.remove('hidden');
    this.log.innerHTML = '<div class="hd">WHAT HAPPENS</div>';
    const row = (tick: number, icon: string, html: string, certain: boolean, cls = '') => {
      const r = el('div', `ev ${cls}${certain ? '' : ' unc'}`, this.log);
      r.innerHTML = `<span class="t">${fmt(tick)}</span><span class="i">${icon}</span><span class="x">${html}</span>`;
      this.logRows.push({ tick, el: r });
    };
    row(0, '▶', `<b>${actorName}</b> — ${actionLabel}`, true, 'act');
    let n = 0;
    let shownTurn = false;
    for (const e of pred.events) {
      if (n >= 9) break;
      if (e.type === 'hit') {
        const what = e.guarded ? 'guards' : e.knock > 3 ? 'is knocked back' : 'is hit';
        row(e.tick, '✦', `<b>${this.name(e.target)}</b> ${what} by ${this.name(e.source)} <em>${e.damage}</em>`, e.certain, 'hit');
        n++;
      } else if (e.type === 'ko') {
        row(e.tick, '✖', `<b>${this.name(e.target)}</b> is knocked out`, e.certain, 'ko');
        n++;
      } else if (e.type === 'turn') {
        // only the first turn matters here: it is where the preview stops being certain
        if (e.tick !== pred.certainUntil || shownTurn) continue;
        shownTurn = true;
        const f = this.state.fighters.find((g) => g.id === e.fighter)!;
        row(e.tick, '◆', `<b>${f.name}</b> decides — <i>anything after this may change</i>`, true, `turn t-${f.team}`);
        n++;
      } else if (e.type === 'spawn' && e.owner !== -1) {
        const kind = e.kind === 'fireball' ? 'Fireball' : 'Arrow';
        row(e.tick, '➶', `${kind} from <b>${this.name(e.owner)}</b>`, e.certain, 'spawn');
        n++;
      }
    }
    if (n === 0) row(pred.ticks, '·', 'Nothing else happens in the next 2.5 s', true);
  }

  // -------------------------------------------------------------------------------------------
  // menu, hints, labels
  // -------------------------------------------------------------------------------------------

  /**
   * The command bar: a horizontal row along the bottom, over the foreground, so it never covers a
   * fighter.
   */
  showMenu(title: string, items: MenuItem[]): void {
    this.items = items;
    this.sel = Math.max(0, items.findIndex((i) => i.enabled));
    this.menu.classList.remove('hidden');
    this.menu.style.left = `${this.party.offsetWidth + 32}px`;
    this.menu.innerHTML = '';
    el('div', 'hd', this.menu).textContent = title;
    const row = el('div', 'row', this.menu);
    items.forEach((it, i) => {
      const d = el('div', `it${it.enabled ? '' : ' off'}`, row);
      d.innerHTML = `<span>${it.label}</span><kbd>${it.key}</kbd>`;
      d.addEventListener('mouseenter', () => { if (it.enabled) { this.sel = i; this.renderSel(); this.onHover?.(i); } });
      d.addEventListener('click', (e) => { e.stopPropagation(); if (it.enabled) this.onPick?.(i); });
    });
    el('div', 'desc', this.menu);
    this.renderSel();
  }

  hideMenu(): void {
    this.menu.classList.add('hidden');
  }

  moveSel(d: number): void {
    const n = this.items.length;
    for (let k = 1; k <= n; k++) {
      const i = (this.sel + d * k + n * 4) % n;
      if (this.items[i].enabled) { this.sel = i; break; }
    }
    this.renderSel();
  }

  private renderSel(): void {
    [...this.menu.querySelectorAll('.it')].forEach((e, i) => e.classList.toggle('sel', i === this.sel));
    const desc = this.menu.querySelector('.desc');
    if (desc) desc.innerHTML = this.items[this.sel]?.desc ?? '';
  }

  setHint(html: string): void {
    this.hint.innerHTML = html;
  }

  setStopped(on: boolean): void {
    this.orderLabel.innerHTML = on ? 'TURN ORDER · <span class="stopped">TIME STOPPED</span>' : 'TURN ORDER';
  }

  /** Damage labels pinned where the preview's hits land. */
  showPreviewDamage(pred: Prediction | null, project: (x: number, y: number, z: number) => { x: number; y: number }): void {
    const hits = pred ? pred.events.filter((e) => e.type === 'hit') : [];
    while (this.pvLabels.length < hits.length) this.pvLabels.push(el('div', 'dmg pv', this.root));
    this.pvLabels.forEach((l, i) => {
      const h = hits[i];
      if (!h || h.type !== 'hit') { l.style.display = 'none'; return; }
      l.style.display = '';
      const s = project(h.x, h.y + 0.55, 1);
      l.style.left = `${s.x}px`;
      l.style.top = `${s.y}px`;
      const ko = pred!.events.some((k) => k.type === 'ko' && k.target === h.target && k.tick === h.tick);
      l.innerHTML = `${h.certain ? '' : '?'}${h.damage}${ko ? ' KO' : ''}<small>${fmt(h.tick)}</small>`;
      l.classList.toggle('unc', !h.certain);
    });
  }

  damage(x: number, y: number, amount: number, guarded: boolean): void {
    const d = el('div', `dmg${guarded ? ' guard' : ''}`, this.root);
    d.textContent = `${amount}`;
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    setTimeout(() => d.remove(), 1000);
  }

  /** A number popping out of the hologram replay as it reaches a hit. */
  holoImpact(x: number, y: number, text: string, certain: boolean): void {
    const d = el('div', `dmg holo${certain ? '' : ' unc'}`, this.root);
    d.textContent = text;
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    setTimeout(() => d.remove(), 800);
  }

  callout(x: number, y: number, text: string, team: 'party' | 'enemy'): void {
    const d = el('div', `callout t-${team}`, this.root);
    d.textContent = text;
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    setTimeout(() => d.remove(), 1500);
  }

  showResult(title: string, sub: string): void {
    this.result.innerHTML = `<div class="t">${title}</div><div class="s">${sub}</div>`;
    this.result.classList.add('show');
  }
}
