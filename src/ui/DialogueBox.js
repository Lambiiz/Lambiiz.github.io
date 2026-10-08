// Typewriter dialogue box with speaker nameplates and inline markup:
//   *word*  → highlighted   ~word~ → shaking (menacing) text
import { el, retrigger } from './dom.js';

export class DialogueBox {
  constructor(root) {
    this.node = el('div', { class: 'dlg hidden' },
      el('div', { class: 'dlg__shade' }),
      (this.nameEl = el('div', { class: 'dlg__name' })),
      el('div', { class: 'dlg__box' }, (this.textEl = el('div', { class: 'dlg__text' })), el('div', { class: 'dlg__hint' }, 'ENTER / CLICK'), el('div', { class: 'dlg__next' }))
    );
    root.append(this.node);
    this.chars = [];
    this.shown = 0;
    this.typing = false;
    this.onClick = null;
    this.node.addEventListener('click', () => this.onClick?.());
  }

  show(on) {
    this.node.classList.toggle('hidden', !on);
  }

  /** Prepare a line. Returns nothing; call tick() to reveal characters. */
  setLine(speaker, label, sub, text) {
    const changed = this.speaker !== speaker;
    this.speaker = speaker;
    this.node.className = `dlg speaker-${speaker}`;
    this.nameEl.innerHTML = '';
    this.nameEl.append(label || '');
    if (sub) this.nameEl.append(el('small', {}, sub));
    if (changed) retrigger(this.node, 'enter');
    // parse markup into spans of single characters
    this.textEl.innerHTML = '';
    this.chars = [];
    let mode = null;
    for (const ch of text) {
      if (ch === '*') {
        mode = mode === 'em' ? null : 'em';
        continue;
      }
      if (ch === '~') {
        mode = mode === 'shake' ? null : 'shake';
        continue;
      }
      const span = el('span', { class: mode === 'em' ? 'em' : mode === 'shake' ? 'shake' : '' }, ch);
      if (mode === 'em') span.style.color = 'var(--teal)';
      span.style.visibility = 'hidden';
      this.textEl.append(span);
      this.chars.push(span);
    }
    this.shown = 0;
    this.typing = true;
    this.node.classList.remove('ready');
  }

  /** Reveal n more characters; returns the characters revealed. */
  reveal(n) {
    const out = [];
    while (n-- > 0 && this.shown < this.chars.length) {
      const c = this.chars[this.shown++];
      c.style.visibility = 'visible';
      out.push(c.textContent);
    }
    if (this.shown >= this.chars.length) this.finish();
    return out;
  }

  finish() {
    for (const c of this.chars) c.style.visibility = 'visible';
    this.shown = this.chars.length;
    this.typing = false;
    this.node.classList.add('ready');
  }
}
