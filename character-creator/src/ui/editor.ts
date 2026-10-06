/**
 * Gene editor: every gene of the family schema as a control, grouped like the schema, with locks.
 * Locked genes keep their value when rerolling or making variations.
 */

import { cssToHex, hexToCss } from '../core/color';
import type { GeneDef, GeneSchema, GeneValue } from '../genome/schema';
import { clear, h } from './dom';
import { icon } from './icons';

export interface EditorEvents {
  change(id: string, value: GeneValue, commit: boolean): void;
  lock(ids: string[], locked: boolean): void;
}

const STREAM_LABEL = { anatomy: 'Body', color: 'Colour', pattern: 'Pattern', motion: 'Motion' } as const;

export class GeneEditor {
  readonly el = h('div', { class: 'editor' });
  private controls = new Map<string, { set(v: GeneValue): void; lock: HTMLButtonElement }>();
  private groupLocks = new Map<string, HTMLButtonElement>();
  private schema: GeneSchema | null = null;
  private collapsed = new Set<string>();

  constructor(private readonly ev: EditorEvents) {}

  setSchema(schema: GeneSchema): void {
    if (schema === this.schema) return;
    this.schema = schema;
    clear(this.el);
    this.controls.clear();
    this.groupLocks.clear();
    for (const grp of schema.groups) {
      const genes = schema.genesIn(grp.id).filter((g) => !g.hidden);
      if (!genes.length) continue;
      const body = h('div', { class: 'group-body' });
      const lockAll = h('button', { class: 'lock', title: 'Lock / unlock the whole group' }, icon('unlock'));
      lockAll.addEventListener('click', (e) => {
        e.stopPropagation();
        const locked = lockAll.classList.contains('on');
        this.ev.lock(genes.map((g) => g.id), !locked);
      });
      this.groupLocks.set(grp.id, lockAll);
      const head = h('div', { class: 'group-head', on: { click: () => {
        sec.classList.toggle('collapsed');
        if (sec.classList.contains('collapsed')) this.collapsed.add(grp.id);
        else this.collapsed.delete(grp.id);
      } } }, icon('chevron'), h('span', { class: 'group-title' }, grp.label), h('span', { class: 'badge' }, STREAM_LABEL[grp.stream]), lockAll);
      const sec = h('section', { class: 'group' + (this.collapsed.has(grp.id) ? ' collapsed' : '') }, head, body);
      for (const g of genes) body.appendChild(this.row(g));
      this.el.appendChild(sec);
    }
  }

  private row(g: GeneDef): HTMLElement {
    const lock = h('button', { class: 'lock', title: 'Lock: keep this value when rerolling' }, icon('unlock'));
    lock.addEventListener('click', () => this.ev.lock([g.id], !lock.classList.contains('on')));
    const label = h('label', { class: 'gene-label', title: g.help ?? '' }, g.label);
    let control: HTMLElement;
    let set: (v: GeneValue) => void;
    switch (g.kind) {
      case 'float': {
        const out = h('span', { class: 'gene-value' });
        const input = h('input', { type: 'range', min: String(g.min), max: String(g.max), step: String((g.max - g.min) / 200) });
        const fmt = (v: number) => (g.unit === '%' ? `${Math.round(((v - g.min) / (g.max - g.min)) * 100)}%` : `${v.toFixed(2)}${g.unit ?? ''}`);
        input.addEventListener('input', () => {
          out.textContent = fmt(Number(input.value));
          this.ev.change(g.id, Number(input.value), false);
        });
        input.addEventListener('change', () => this.ev.change(g.id, Number(input.value), true));
        set = (v) => {
          input.value = String(v);
          out.textContent = fmt(v as number);
        };
        control = h('div', { class: 'gene-range' }, input, out);
        break;
      }
      case 'choice': {
        const sel = h('select', {}, ...g.options.map((o) => h('option', { value: o.id }, o.label)));
        sel.addEventListener('change', () => this.ev.change(g.id, sel.value, true));
        set = (v) => (sel.value = String(v));
        control = sel;
        break;
      }
      case 'bool': {
        const cb = h('input', { type: 'checkbox' });
        cb.addEventListener('change', () => this.ev.change(g.id, cb.checked, true));
        set = (v) => (cb.checked = !!v);
        control = h('label', { class: 'switch' }, cb, h('span', { class: 'switch-ui' }));
        break;
      }
      case 'color': {
        const c = h('input', { type: 'color' });
        c.addEventListener('input', () => this.ev.change(g.id, cssToHex(c.value), false));
        c.addEventListener('change', () => this.ev.change(g.id, cssToHex(c.value), true));
        set = (v) => (c.value = hexToCss(v as number));
        control = c;
        break;
      }
    }
    this.controls.set(g.id, { set, lock });
    return h('div', { class: 'gene' }, label, control, lock);
  }

  setValues(values: Record<string, GeneValue>, locks: Set<string>): void {
    for (const [id, c] of this.controls) {
      if (id in values) c.set(values[id]);
      const on = locks.has(id);
      c.lock.classList.toggle('on', on);
      c.lock.replaceChildren(icon(on ? 'lock' : 'unlock'));
    }
    if (!this.schema) return;
    for (const [gid, btn] of this.groupLocks) {
      const genes = this.schema.genesIn(gid).filter((g) => !g.hidden);
      const all = genes.every((g) => locks.has(g.id));
      btn.classList.toggle('on', all);
      btn.replaceChildren(icon(all ? 'lock' : 'unlock'));
    }
  }
}
