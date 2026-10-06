/** Tiny DOM helpers (no framework). */

type Child = Node | string | null | undefined | false;
type Props<K extends keyof HTMLElementTagNameMap> = Partial<Omit<HTMLElementTagNameMap[K], 'style'>> & {
  class?: string;
  style?: string;
  dataset?: Record<string, string>;
  attrs?: Record<string, string>;
  on?: Partial<{ [E in keyof HTMLElementEventMap]: (ev: HTMLElementEventMap[E]) => void }>;
};

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, props: Props<K> = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  const { class: cls, style, dataset, attrs, on, ...rest } = props;
  if (cls) el.className = cls;
  if (style) el.setAttribute('style', style);
  if (dataset) Object.assign(el.dataset, dataset);
  if (attrs) for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  Object.assign(el, rest);
  if (on) for (const [k, fn] of Object.entries(on)) el.addEventListener(k, fn as EventListener);
  for (const c of children) if (c !== null && c !== undefined && c !== false) el.append(c);
  return el;
}

export function clear(el: HTMLElement): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function download(name: string, data: Blob): void {
  const url = URL.createObjectURL(data);
  const a = h('a', { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function canvasBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('PNG encoding failed'))), 'image/png'));
}

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'creature';
}

let toastTimer = 0;
export function toast(msg: string): void {
  let el = document.getElementById('toast');
  if (!el) {
    el = h('div', { id: 'toast', class: 'toast' });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el!.classList.remove('show'), 2200);
}
