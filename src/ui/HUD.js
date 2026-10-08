// Loading screen, title card and the minimal exploration HUD.
import { el } from './dom.js';

export class HUD {
  constructor(root) {
    this.root = root;

    this.loading = el('div', { class: 'loading' },
      el('div', { class: 'loading__mark' }, el('span', {}, 'MIRROR'), el('span', { class: 'accent' }, 'HOUR')),
      el('div', { class: 'loading__bar' }, (this.loadFill = el('i'))),
      (this.loadText = el('div', { class: 'loading__text' }, 'Opening the school gates…'))
    );

    this.title = el('div', { class: 'title hidden' },
      el('div', { class: 'title__slab' }),
      el('div', { class: 'title__inner' },
        el('div', { class: 'title__kicker' }, 'SEIRYO ACADEMY · WEST WING · 17:47'),
        el('h1', { class: 'title__logo' }, el('span', { class: 'l1' }, 'MIRROR'), el('span', { class: 'l2' }, 'HOUR')),
        el('div', { class: 'title__tag' }, 'When the sun sets, the glass stops lying.'),
        (this.startBtn = el('button', { class: 'title__start', type: 'button' }, el('span', {}, 'PRESS ENTER / CLICK TO BEGIN'))),
        el('div', { class: 'title__controls' },
          el('span', {}, el('b', {}, 'WASD'), ' move'),
          el('span', {}, el('b', {}, 'SHIFT'), ' walk'),
          el('span', {}, el('b', {}, 'DRAG'), ' camera'),
          el('span', {}, el('b', {}, 'E / ENTER'), ' interact'),
          el('span', {}, el('b', {}, 'M'), ' mute')
        )
      )
    );

    this.explore = el('div', { class: 'explore hidden' },
      el('div', { class: 'loc' },
        el('div', { class: 'loc__time' }, el('b', {}, '17:47'), el('span', {}, 'AFTER SCHOOL')),
        el('div', { class: 'loc__name' }, '2F · WEST CORRIDOR')
      ),
      el('div', { class: 'objective' }, el('i', {}, 'OBJECTIVE'), (this.objText = el('span', {}, 'Someone is still in the corridor. Go see who.'))),
      el('div', { class: 'keys' }, el('span', {}, el('b', {}, 'WASD'), 'MOVE'), el('span', {}, el('b', {}, 'SHIFT'), 'WALK'), el('span', {}, el('b', {}, 'DRAG'), 'LOOK'))
    );

    this.prompt = el('div', { class: 'prompt hidden' },
      el('div', { class: 'prompt__key' }, 'E'),
      el('div', { class: 'prompt__body' }, el('b', {}, 'TALK'), (this.promptName = el('span', {}, 'Mio Tachibana')))
    );

    this.toast = el('div', { class: 'toast hidden' });
    root.append(this.loading, this.title, this.explore, this.prompt, this.toast);
  }

  setLoading(frac, text) {
    this.loadFill.style.transform = `scaleX(${frac})`;
    if (text) this.loadText.textContent = text;
  }

  hideLoading() {
    this.loading.classList.add('gone');
    setTimeout(() => this.loading.remove(), 900);
  }

  showTitle(show) {
    this.title.classList.toggle('hidden', !show);
  }

  showExplore(show) {
    this.explore.classList.toggle('hidden', !show);
  }

  setObjective(text) {
    this.objText.textContent = text;
  }

  /** Position the talk prompt over a world point (screen coords in px). */
  setPrompt(visible, x = 0, y = 0) {
    this.prompt.classList.toggle('hidden', !visible);
    if (visible) this.prompt.style.transform = `translate(${x}px, ${y}px)`;
  }

  flashToast(text, ms = 2200) {
    this.toast.textContent = text;
    this.toast.classList.remove('hidden');
    clearTimeout(this._tt);
    this._tt = setTimeout(() => this.toast.classList.add('hidden'), ms);
  }
}
