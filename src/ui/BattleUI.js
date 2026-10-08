// Battle interface: status cards, affinity chips, turn strip, the staircase
// command menu with skill/item sub-menus, action call-outs and result screens.
// Fully navigable by keyboard (arrows/WASD, Enter, Esc) and mouse.
import { el, retrigger } from './dom.js';
import { SKILLS, ITEMS, ELEMENTS } from '../data/battleData.js';

const COMMANDS = [
  { id: 'attack', label: 'ATTACK', key: '1' },
  { id: 'skill', label: 'SKILL', key: '2' },
  { id: 'guard', label: 'GUARD', key: '3' },
  { id: 'item', label: 'ITEM', key: '4' },
];

export class BattleUI {
  constructor(root, audio) {
    this.audio = audio;
    this.root = el('div', { class: 'bui hidden' });
    root.append(this.root);
    this._buildCards();
    this._buildTurn();
    this._buildMenu();
    this._buildCallouts();
    this.resolve = null;
    this.mode = 'closed'; // closed | main | sub
    this.sel = 0;
    this.subSel = 0;
  }

  // ------------------------------------------------------------------ build
  _bar(cls) {
    const fill = el('i', { class: 'bar__fill' });
    const lag = el('i', { class: 'bar__lag' });
    return { node: el('div', { class: `bar ${cls}` }, lag, fill), fill, lag };
  }

  _buildCards() {
    this.portrait = el('div', { class: 'pcard__portrait' });
    this.hpBar = this._bar('bar--hp');
    this.spBar = this._bar('bar--sp');
    this.pcard = el('div', { class: 'pcard' },
      this.portrait,
      el('div', { class: 'pcard__body' },
        el('div', { class: 'pcard__name' }, 'KAITO', el('span', {}, 'SENA')),
        el('div', { class: 'pcard__row' }, el('b', {}, 'HP'), this.hpBar.node, (this.hpNum = el('span', { class: 'num' }, '140'))),
        el('div', { class: 'pcard__row' }, el('b', {}, 'SP'), this.spBar.node, (this.spNum = el('span', { class: 'num num--sp' }, '60')))
      ),
      (this.pStatus = el('div', { class: 'pcard__status' }))
    );

    this.ehpBar = this._bar('bar--ehp');
    this.affChips = {};
    const chips = Object.entries(ELEMENTS).map(([k, e]) => {
      const c = el('div', { class: 'aff', 'data-el': k }, el('i', { style: { color: e.color } }, e.glyph), el('b', {}, e.label), el('span', {}, '?'));
      this.affChips[k] = c;
      return c;
    });
    this.ecard = el('div', { class: 'ecard' },
      el('div', { class: 'ecard__title' }, (this.eTitle = el('span', {}, 'THE FLAWLESS ONE'))),
      el('div', { class: 'ecard__name' }, "MIO'S ECHO"),
      this.ehpBar.node,
      el('div', { class: 'ecard__affs' }, ...chips),
      (this.eStatus = el('div', { class: 'ecard__status' }))
    );
    this.root.append(this.pcard, this.ecard);
  }

  _buildTurn() {
    this.turnNum = el('b', {}, '01');
    this.order = el('div', { class: 'order' });
    this.turnBox = el('div', { class: 'turnbox' }, el('div', { class: 'turnbox__label' }, 'TURN'), this.turnNum, this.order);
    this.root.append(this.turnBox);
  }

  _buildMenu() {
    this.menu = el('div', { class: 'cmd' });
    this.cmdNodes = COMMANDS.map((c, i) => {
      const sub = el('small', {});
      const n = el('button', { class: 'cmd__item', type: 'button', 'data-i': i },
        el('span', { class: 'cmd__key' }, c.key),
        el('span', { class: 'cmd__label' }, c.label),
        sub
      );
      n.style.setProperty('--i', i);
      n.addEventListener('mouseenter', () => this.mode === 'main' && this._select(i));
      n.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.mode !== 'main') {
          if (this.mode === 'sub') this._closeSub();
          else return;
        }
        this._select(i, true);
        this._confirm();
      });
      n._sub = sub;
      this.menu.append(n);
      return n;
    });
    this.menuHint = el('div', { class: 'cmd__hint' }, el('b', {}, '↑↓'), ' SELECT ', el('b', {}, 'ENTER'), ' CONFIRM ', el('b', {}, 'ESC'), ' BACK');
    this.menuWrap = el('div', { class: 'cmdwrap hidden' }, el('div', { class: 'cmd__ribbon' }, el('span', {}, 'YOUR MOVE')), this.menu, this.menuHint);

    this.subList = el('div', { class: 'sub__list' });
    this.subDesc = el('div', { class: 'sub__desc' });
    this.subTitle = el('div', { class: 'sub__title' });
    this.sub = el('div', { class: 'sub hidden' }, this.subTitle, this.subList, this.subDesc);
    this.root.append(this.menuWrap, this.sub);
    this.root.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this._back();
    });
  }

  _buildCallouts() {
    this.callout = el('div', { class: 'callout hidden' }, (this.calloutGlyph = el('i')), (this.calloutText = el('b')), (this.calloutSub = el('span')));
    this.banner = el('div', { class: 'tbanner hidden' }, el('div', { class: 'tbanner__stripe' }), (this.bannerText = el('b')), (this.bannerSub = el('span')));
    this.narr = el('div', { class: 'narr hidden' });
    this.result = el('div', { class: 'result hidden' });
    this.root.append(this.callout, this.banner, this.narr, this.result);
  }

  // ------------------------------------------------------------------ state
  show(on) {
    this.root.classList.toggle('hidden', !on);
    if (on) retrigger(this.root, 'enter');
  }

  setPortrait(url) {
    this.portrait.style.backgroundImage = `url(${url})`;
  }

  _setBar(bar, frac, instant) {
    frac = Math.max(0, Math.min(1, frac));
    bar.fill.style.transform = `scaleX(${frac})`;
    if (instant) bar.lag.style.transition = 'none';
    else bar.lag.style.transition = '';
    bar.lag.style.transform = `scaleX(${frac})`;
    if (instant) void bar.lag.offsetWidth;
  }

  setPlayer(p, instant = false) {
    this._setBar(this.hpBar, p.hp / p.maxHp, instant);
    this._setBar(this.spBar, p.sp / p.maxSp, instant);
    this.hpNum.textContent = p.hp;
    this.spNum.textContent = p.sp;
    this.pcard.classList.toggle('low', p.hp / p.maxHp < 0.3);
  }

  setEnemy(e, instant = false) {
    this._setBar(this.ehpBar, e.hp / e.maxHp, instant);
  }

  shakeCard(which) {
    retrigger(which === 'player' ? this.pcard : this.ecard, 'hit');
  }

  setAffinities(known) {
    for (const [k, chip] of Object.entries(this.affChips)) {
      const v = known[k];
      chip.dataset.state = v || 'unknown';
      chip.querySelector('span').textContent = v === 'weak' ? 'WEAK' : v === 'resist' ? 'RESIST' : v === 'normal' ? '—' : '?';
    }
  }

  revealAffinity(el_) {
    const chip = this.affChips[el_];
    if (chip) retrigger(chip, 'flash');
  }

  setEnemyStatus(text, kind = '') {
    this.eStatus.textContent = text || '';
    this.eStatus.className = `ecard__status ${kind}`;
  }

  setPlayerStatus(text) {
    this.pStatus.textContent = text || '';
    this.pStatus.classList.toggle('on', !!text);
  }

  setTurn(n, order) {
    this.turnNum.textContent = String(n).padStart(2, '0');
    retrigger(this.turnNum, 'tick');
    this.order.innerHTML = '';
    order.forEach((o, i) => {
      const label = o === 'player' ? 'YOU' : o === 'enemy-stunned' ? 'SKIP' : 'ECHO';
      this.order.append(el('span', { class: `chip chip--${o} ${i === 0 ? 'now' : ''}` }, label));
    });
  }

  // ------------------------------------------------------------------ callouts
  /** Skill name card, slides in from the actor's side. */
  callSkill(name, element, side = 'player') {
    const e = ELEMENTS[element] || { glyph: '◆', color: '#fff', label: '' };
    this.calloutGlyph.textContent = e.glyph;
    this.calloutGlyph.style.color = e.color;
    this.calloutText.textContent = name.toUpperCase();
    this.calloutSub.textContent = side === 'player' ? `KAITO · ${e.label}` : `ECHO · ${e.label || 'ACTION'}`;
    this.callout.className = `callout callout--${side}`;
    retrigger(this.callout, 'run');
  }

  hideCallout() {
    this.callout.classList.add('hidden');
  }

  turnBanner(side, sub = '') {
    this.banner.className = `tbanner tbanner--${side}`;
    this.bannerText.textContent = side === 'player' ? 'YOUR MOVE' : side === 'enemy' ? "ECHO'S TURN" : side;
    this.bannerSub.textContent = sub;
    retrigger(this.banner, 'run');
  }

  narrate(text, ms = 1800) {
    this.narr.textContent = text;
    this.narr.classList.remove('hidden');
    retrigger(this.narr, 'run');
    clearTimeout(this._nt);
    if (ms) this._nt = setTimeout(() => this.narr.classList.add('hidden'), ms);
  }

  // ------------------------------------------------------------------ menu
  /**
   * Opens the command menu and resolves with the chosen action.
   * @param {import('../battle/BattleSystem.js').BattleSystem} sys
   */
  chooseCommand(sys) {
    this.sys = sys;
    this.mode = 'main';
    this._refreshSubLabels();
    this.menuWrap.classList.remove('hidden');
    retrigger(this.menuWrap, 'open');
    this._select(this.sel, true);
    return new Promise((r) => (this.resolve = r));
  }

  _refreshSubLabels() {
    const s = this.sys;
    const itemsLeft = Object.values(s.items).reduce((a, b) => a + b, 0);
    this.cmdNodes[0]._sub.textContent = 'Strike · 2 hits';
    this.cmdNodes[1]._sub.textContent = `${s.player.sp} SP ready`;
    this.cmdNodes[2]._sub.textContent = 'Halve damage · +5 SP';
    this.cmdNodes[3]._sub.textContent = itemsLeft ? `${itemsLeft} left` : 'Empty';
    this.cmdNodes[3].classList.toggle('dim', !itemsLeft);
  }

  _select(i, silent = false) {
    const n = COMMANDS.length;
    i = ((i % n) + n) % n;
    if (i !== this.sel && !silent) this.audio.play('uiMove');
    this.sel = i;
    this.cmdNodes.forEach((node, k) => node.classList.toggle('sel', k === i));
  }

  _confirm() {
    const c = COMMANDS[this.sel];
    if (c.id === 'attack') return this._finish({ kind: 'attack' });
    if (c.id === 'guard') return this._finish({ kind: 'guard' });
    if (c.id === 'skill') return this._openSub('skill');
    if (c.id === 'item') {
      if (!Object.values(this.sys.items).some((v) => v > 0)) {
        this.audio.play('uiDeny');
        retrigger(this.cmdNodes[3], 'deny');
        return;
      }
      return this._openSub('item');
    }
  }

  _finish(action) {
    this.audio.play('uiConfirm');
    this.mode = 'closed';
    this.menuWrap.classList.add('closing');
    this.sub.classList.add('hidden');
    setTimeout(() => {
      this.menuWrap.classList.add('hidden');
      this.menuWrap.classList.remove('closing');
    }, 220);
    const r = this.resolve;
    this.resolve = null;
    r?.(action);
  }

  _openSub(kind) {
    this.audio.play('uiConfirm');
    this.mode = 'sub';
    this.subKind = kind;
    this.subSel = 0;
    this.subList.innerHTML = '';
    const sys = this.sys;
    let entries;
    if (kind === 'skill') {
      this.subTitle.textContent = 'SKILLS';
      entries = ['lumenEdge', 'cinderVerse'].map((id) => {
        const s = SKILLS[id];
        const e = ELEMENTS[s.element];
        const aff = sys.known[sys.enemy.phase][s.element];
        const ok = sys.canUse(id);
        return {
          id,
          ok,
          desc: s.desc,
          node: el('button', { class: `sub__item ${ok ? '' : 'dim'}`, type: 'button' },
            el('i', { style: { color: e.color } }, e.glyph),
            el('b', {}, s.name),
            aff ? el('em', { class: `tag tag--${aff}` }, aff === 'weak' ? 'WEAK' : aff === 'resist' ? 'RESIST' : 'NORMAL') : el('em', { class: 'tag tag--unknown' }, '?'),
            el('span', { class: 'cost' }, `${s.cost} SP`)
          ),
        };
      });
    } else {
      this.subTitle.textContent = 'ITEMS';
      entries = Object.values(ITEMS).map((it) => {
        const n = sys.items[it.id];
        return {
          id: it.id,
          ok: n > 0,
          desc: it.desc,
          node: el('button', { class: `sub__item ${n > 0 ? '' : 'dim'}`, type: 'button' }, el('i', {}, it.heal ? '✚' : '✧'), el('b', {}, it.name), el('span', { class: 'cost' }, `×${n}`)),
        };
      });
    }
    this.subEntries = entries;
    entries.forEach((en, i) => {
      en.node.addEventListener('mouseenter', () => this._subSelect(i));
      en.node.addEventListener('click', (e) => {
        e.stopPropagation();
        this._subSelect(i, true);
        this._subConfirm();
      });
      this.subList.append(en.node);
    });
    this.sub.classList.remove('hidden');
    retrigger(this.sub, 'open');
    this.menuWrap.classList.add('dimmed');
    this._subSelect(0, true);
  }

  _subSelect(i, silent = false) {
    const n = this.subEntries.length;
    i = ((i % n) + n) % n;
    if (i !== this.subSel && !silent) this.audio.play('uiMove');
    this.subSel = i;
    this.subEntries.forEach((en, k) => en.node.classList.toggle('sel', k === i));
    const en = this.subEntries[i];
    this.subDesc.textContent = en.ok ? en.desc : this.subKind === 'skill' ? 'Not enough SP.' : 'None left.';
  }

  _subConfirm() {
    const en = this.subEntries[this.subSel];
    if (!en.ok) {
      this.audio.play('uiDeny');
      retrigger(en.node, 'deny');
      return;
    }
    this.menuWrap.classList.remove('dimmed');
    this._finish(this.subKind === 'skill' ? { kind: 'skill', id: en.id } : { kind: 'item', id: en.id });
  }

  _closeSub() {
    this.mode = 'main';
    this.sub.classList.add('hidden');
    this.menuWrap.classList.remove('dimmed');
  }

  _back() {
    if (this.mode === 'sub') {
      this.audio.play('uiBack');
      this._closeSub();
    }
  }

  /** Per-frame keyboard handling. */
  update(input) {
    if (this.mode === 'main') {
      if (input.pressed('up')) this._select(this.sel - 1);
      if (input.pressed('down')) this._select(this.sel + 1);
      for (let i = 0; i < 4; i++) {
        if (input.pressedThisFrame.has(`Digit${i + 1}`)) {
          this._select(i);
          this._confirm();
          return;
        }
      }
      if (input.pressed('confirm')) this._confirm();
    } else if (this.mode === 'sub') {
      if (input.pressed('up')) this._subSelect(this.subSel - 1);
      if (input.pressed('down')) this._subSelect(this.subSel + 1);
      if (input.pressed('confirm')) this._subConfirm();
      else if (input.pressed('back') || input.pressed('left')) this._back();
    }
  }

  // ------------------------------------------------------------------ results
  /** Shows the result screen; resolves with the chosen option id. */
  showResult(kind, stats, options) {
    this.result.innerHTML = '';
    const title = kind === 'victory' ? 'VICTORY' : 'FADED';
    const sub = kind === 'victory' ? 'THE ECHO IS SILENCED' : 'THE GLASS CLOSES OVER YOU';
    const buttons = options.map((o, i) =>
      el('button', { class: `result__btn ${i === 0 ? 'sel' : ''}`, type: 'button', 'data-id': o.id }, el('span', {}, o.label))
    );
    this.result.append(
      el('div', { class: `result__slab result__slab--${kind}` }),
      el('div', { class: 'result__inner' },
        el('div', { class: 'result__kicker' }, kind === 'victory' ? 'ENCOUNTER CLEARED' : 'ENCOUNTER FAILED'),
        el('h2', { class: `result__title result__title--${kind}` }, title),
        el('div', { class: 'result__sub' }, sub),
        el('div', { class: 'result__stats' },
          ...stats.map(([k, v]) => el('div', { class: 'stat' }, el('span', {}, k), el('b', {}, v)))
        ),
        el('div', { class: 'result__btns' }, ...buttons)
      )
    );
    this.result.className = `result result--${kind}`;
    retrigger(this.result, 'run');
    let sel = 0;
    return new Promise((resolve) => {
      const choose = (i) => {
        this.audio.play('uiConfirm');
        this._resultInput = null;
        resolve(options[i].id);
      };
      const select = (i) => {
        if (i !== sel) this.audio.play('uiMove');
        sel = (i + buttons.length) % buttons.length;
        buttons.forEach((b, k) => b.classList.toggle('sel', k === sel));
      };
      buttons.forEach((b, i) => {
        b.addEventListener('mouseenter', () => select(i));
        b.addEventListener('click', () => choose(i));
      });
      this._resultInput = (input) => {
        if (input.pressed('up') || input.pressed('left')) select(sel - 1);
        if (input.pressed('down') || input.pressed('right')) select(sel + 1);
        if (input.pressed('confirm')) choose(sel);
      };
    });
  }

  updateResult(input) {
    this._resultInput?.(input);
  }

  hideResult() {
    this.result.classList.add('hidden');
  }
}
