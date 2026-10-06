import './ui.css';
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/600.css';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent?: HTMLElement): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  e.className = cls;
  parent?.appendChild(e);
  return e;
}

export interface DialogLine {
  name?: string;
  text: string;
  choices?: string[];
}

/** DOM overlay: dialog box, prompts, banners, toasts and the controls legend. */
export class UI {
  readonly root: HTMLDivElement;
  private dialog: HTMLDivElement;
  private dName: HTMLDivElement;
  private dText: HTMLDivElement;
  private dChoices: HTMLDivElement;
  private prompt: HTMLDivElement;
  private banner: HTMLDivElement;
  private toastEl: HTMLDivElement;
  readonly help: HTMLDivElement;

  private queue: DialogLine[] = [];
  private line: DialogLine | null = null;
  private shown = 0;
  private choice = 0;
  private onDone: ((choice: number) => void) | null = null;
  private lastChoice = -1;
  private toastT = 0;

  constructor(parent: HTMLElement) {
    this.root = el('div', 'ui', parent);
    this.dialog = el('div', 'dialog', this.root);
    this.dName = el('div', 'name', this.dialog);
    this.dText = el('div', 'text', this.dialog);
    this.dChoices = el('div', 'choices', this.dialog);
    el('div', 'next', this.dialog);
    this.dialog.classList.add('hidden');
    this.prompt = el('div', 'prompt', this.root);
    this.banner = el('div', 'banner', this.root);
    this.toastEl = el('div', 'toast', this.root);
    this.help = el('div', 'help', this.root);
  }

  get talking(): boolean {
    return this.line !== null;
  }

  /** Show a conversation; `done` receives the index of the last choice made (or -1). */
  say(lines: DialogLine[], done?: (choice: number) => void): void {
    this.queue = lines.slice();
    this.onDone = done ?? null;
    this.lastChoice = -1;
    this.dialog.classList.remove('hidden');
    requestAnimationFrame(() => this.dialog.classList.add('show'));
    this.nextLine();
  }

  private nextLine(): void {
    this.line = this.queue.shift() ?? null;
    if (!this.line) {
      this.dialog.classList.remove('show');
      setTimeout(() => { if (!this.line) this.dialog.classList.add('hidden'); }, 180);
      const cb = this.onDone;
      this.onDone = null;
      cb?.(this.lastChoice);
      return;
    }
    this.shown = 0;
    this.choice = 0;
    this.dName.textContent = this.line.name ?? '';
    this.dName.style.display = this.line.name ? '' : 'none';
    this.dText.textContent = '';
    this.dChoices.innerHTML = '';
    this.dialog.classList.remove('done');
  }

  /** Advance typing; returns true while a dialog is open (input consumed). */
  update(dt: number, confirm: boolean, up: boolean, down: boolean): boolean {
    if (this.toastT > 0) {
      this.toastT -= dt;
      if (this.toastT <= 0) this.toastEl.classList.remove('show');
    }
    if (!this.line) return false;
    const full = this.line.text;
    const typing = this.shown < full.length;
    if (typing) {
      this.shown = Math.min(full.length, this.shown + dt * 55);
      this.dText.textContent = full.slice(0, Math.floor(this.shown));
      if (confirm) { this.shown = full.length; this.dText.textContent = full; }
      if (this.shown >= full.length) this.finishLine();
      return true;
    }
    if (this.line.choices) {
      if (up) this.choice = (this.choice + this.line.choices.length - 1) % this.line.choices.length;
      if (down) this.choice = (this.choice + 1) % this.line.choices.length;
      if (up || down) this.renderChoices();
    }
    if (confirm) {
      if (this.line.choices) this.lastChoice = this.choice;
      this.nextLine();
    }
    return true;
  }

  private finishLine(): void {
    this.dialog.classList.add('done');
    if (this.line?.choices) this.renderChoices();
  }

  private renderChoices(): void {
    this.dChoices.innerHTML = '';
    this.line!.choices!.forEach((c, i) => {
      const d = el('div', `choice${i === this.choice ? ' sel' : ''}`, this.dChoices);
      d.textContent = c;
    });
  }

  showPrompt(text: string | null, x = 0, y = 0): void {
    if (!text) { this.prompt.classList.remove('show'); return; }
    this.prompt.innerHTML = `<kbd>Space</kbd>${text}`;
    this.prompt.style.left = `${x}px`;
    this.prompt.style.top = `${y}px`;
    this.prompt.classList.add('show');
  }

  showBanner(title: string, sub: string, seconds = 3.2): void {
    this.banner.innerHTML = `<div class="s">${sub}</div><div class="line"></div><div class="t">${title}</div><div class="line"></div>`;
    this.banner.classList.add('show');
    setTimeout(() => this.banner.classList.remove('show'), seconds * 1000);
  }

  toast(text: string, seconds = 2): void {
    this.toastEl.textContent = text;
    this.toastEl.classList.add('show');
    this.toastT = seconds;
  }

  setHelp(html: string): void {
    this.help.innerHTML = html;
  }
}
