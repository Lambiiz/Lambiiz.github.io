import './battle.css';
import type { BattleState, Fighter, Skill } from './sim/types';
import { TPS } from './sim/types';
import type { Prediction } from './sim/predict';

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

/** DOM layer for battles: party status, enemy plates, the command menu and the preview timeline. */
export class BattleUI {
  readonly root: HTMLDivElement;
  private party: HTMLDivElement;
  private members = new Map<number, { row: HTMLDivElement; hp: HTMLElement; atb: HTMLDivElement; hpNum: HTMLElement }>();
  private plates = new Map<number, { el: HTMLDivElement; hp: HTMLElement; atb: HTMLDivElement }>();
  private menu: HTMLDivElement;
  private timeline: HTMLDivElement;
  private hint: HTMLDivElement;
  private stop: HTMLDivElement;
  private result: HTMLDivElement;
  private pvLabels: HTMLDivElement[] = [];
  items: MenuItem[] = [];
  sel = 0;
  onPick: ((i: number) => void) | null = null;
  onHover: ((i: number) => void) | null = null;

  constructor(parent: HTMLElement, state: BattleState) {
    this.root = el('div', 'bui', parent);
    this.party = el('div', 'party', this.root);
    for (const f of state.fighters) {
      if (f.team === 'party') {
        const row = el('div', 'member', this.party);
        el('div', 'nm', row).textContent = f.name;
        const hpb = el('div', 'bar', row);
        const hp = el('i', '', hpb);
        const hpNum = el('span', 'hpnum', hpb);
        const atb = el('div', 'bar atb', row);
        el('i', '', atb);
        this.members.set(f.id, { row, hp, atb, hpNum });
      } else {
        const p = el('div', 'plate', this.root);
        el('div', '', p).textContent = f.name;
        const hpb = el('div', 'bar', p);
        const hp = el('i', '', hpb);
        const atb = el('div', 'bar atb', p);
        el('i', '', atb);
        this.plates.set(f.id, { el: p, hp, atb });
      }
    }
    this.menu = el('div', 'menu hidden', this.root);
    this.timeline = el('div', 'timeline', this.root);
    this.hint = el('div', 'hint', this.root);
    this.stop = el('div', 'stop', this.root);
    this.stop.textContent = 'TIME STOPPED';
    this.result = el('div', 'result', this.root);
  }

  dispose(): void {
    this.root.remove();
  }

  /** Per-frame refresh of bars and enemy plates. */
  update(state: BattleState, project: (x: number, y: number, z: number) => { x: number; y: number }, viewX: (f: Fighter) => number): void {
    for (const f of state.fighters) {
      const m = this.members.get(f.id);
      const atbFill = state.awaiting === f.id ? 1 : f.atb;
      if (m) {
        m.hp.style.transform = `scaleX(${f.hp / f.maxHp})`;
        m.hpNum.textContent = `${f.hp}`;
        (m.atb.firstChild as HTMLElement).style.transform = `scaleX(${atbFill})`;
        m.atb.classList.toggle('full', atbFill >= 1);
        m.row.classList.toggle('active', state.awaiting === f.id);
        m.row.classList.toggle('ko', f.ko);
      }
      const p = this.plates.get(f.id);
      if (p) {
        const s = project(viewX(f), -0.35, f.lane * 0.6);
        p.el.style.left = `${s.x}px`;
        p.el.style.top = `${s.y}px`;
        p.hp.style.transform = `scaleX(${f.hp / f.maxHp})`;
        (p.atb.firstChild as HTMLElement).style.transform = `scaleX(${atbFill})`;
        p.atb.classList.toggle('full', atbFill >= 1);
        p.el.classList.toggle('ko', f.ko);
      }
    }
  }

  /** Open the command menu above the party panel (kept clear of the fighting plane). */
  showMenu(title: string, items: MenuItem[]): void {
    this.items = items;
    this.sel = Math.max(0, items.findIndex((i) => i.enabled));
    this.menu.classList.remove('hidden');
    this.menu.style.left = '16px';
    this.menu.style.bottom = `${this.party.offsetHeight + 28}px`;
    this.menu.innerHTML = '';
    el('div', 'hd', this.menu).textContent = title;
    items.forEach((it, i) => {
      const d = el('div', `it${it.enabled ? '' : ' off'}`, this.menu);
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

  get menuOpen(): boolean {
    return !this.menu.classList.contains('hidden');
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
    if (desc) desc.textContent = this.items[this.sel]?.desc ?? '';
  }

  setHint(html: string): void {
    this.hint.innerHTML = html;
  }

  setStopped(on: boolean): void {
    this.stop.classList.toggle('show', on);
  }

  /** The preview's timeline: who acts when, the certain window, and when hits land. */
  showTimeline(pred: Prediction | null, state: BattleState): void {
    if (!pred) { this.timeline.classList.remove('show'); return; }
    this.timeline.classList.add('show');
    const H = pred.ticks;
    const pct = (t: number) => `${Math.min(100, (t / H) * 100)}%`;
    let html = `<div class="lbl">PREVIEW · ${(H / TPS).toFixed(1)}s</div><div class="certain" style="width:${pct(Math.min(H, pred.certainUntil))}"></div>`;
    for (let s = 0.5; s < H / TPS; s += 0.5) html += `<div class="tick" style="left:${pct(s * TPS)}">${s}s</div>`;
    for (const h of pred.hits) html += `<div class="hit${h.certain ? '' : ' unc'}" style="left:${pct(h.tick)}"></div>`;
    for (const t of pred.turns) {
      const f = state.fighters.find((x) => x.id === t.fighter)!;
      html += `<div class="mk t-${f.team}" style="left:${pct(t.tick)}" title="${f.name}">${f.name[0]}</div>`;
    }
    this.timeline.innerHTML = html;
  }

  /** Floating damage numbers predicted by the preview. */
  showPreviewDamage(pred: Prediction | null, project: (x: number, y: number, z: number) => { x: number; y: number }): void {
    const hits = pred?.hits ?? [];
    while (this.pvLabels.length < hits.length) this.pvLabels.push(el('div', 'dmg pv', this.root));
    this.pvLabels.forEach((l, i) => {
      const h = hits[i];
      if (!h) { l.style.display = 'none'; return; }
      l.style.display = '';
      const s = project(h.x, h.y + 0.75, 1);
      l.style.left = `${s.x}px`;
      l.style.top = `${s.y}px`;
      const ko = pred!.kos.some((k) => k.target === h.target && k.tick === h.tick);
      l.textContent = `${h.certain ? '' : '?'}${h.damage}${ko ? ' KO' : ''}`;
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

  callout(x: number, y: number, text: string): void {
    const d = el('div', 'callout', this.root);
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

