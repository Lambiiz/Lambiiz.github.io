/**
 * The creator: family / type / seed at the top, genes on the left, the animated stage in the
 * middle with variations, gallery and export below it, animation and view controls on the right.
 */

import { hexToCss } from '../core/color';
import { Rng, seedFromText } from '../core/rng';
import { FAMILIES, FAMILY_MAP } from '../families';
import { STREAMS, genomeFromCode, genomeFromJSON, genomeToCode, genomeToJSON, mutate, newGenome, reroll } from '../genome/ops';
import type { GeneValue, Stream } from '../genome/schema';
import { DIRECTIONS, buildModel, type CreatureModel } from '../model/model';
import type { Family, Genome } from '../model/types';
import { BACKGROUNDS, type BackgroundId } from './backgrounds';
import { download, h, slug, toast } from './dom';
import { GeneEditor } from './editor';
import { exportPanel } from './exportPanel';
import { icon } from './icons';
import { Stage } from './stage';
import { ThumbGrid } from './thumbs';

const STORE = 'pixel-creature-creator.v1';
const BG_COLOR: Record<BackgroundId, number> = { grass: 0x5c8a42, dirt: 0x86694a, stone: 0x6a6e78, sand: 0xd4bc86, snow: 0xdfe6ee, checker: 0x30333b, dark: 0x1c1e24, light: 0xd8dce2 };

const randomSeed = () => {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % 1000000;
};

interface Saved {
  genome: Genome;
  locks: string[];
  view: App['view'];
}

export class App {
  family!: Family;
  genome!: Genome;
  model!: CreatureModel;
  locks = new Set<string>();
  view = { scale: 1, elevationDeg: 30, shadow: true, outline: true, bg: 'grass' as BackgroundId, mutation: 0.35 };
  private undoStack: Genome[] = [];
  private redoStack: Genome[] = [];
  private rebuildQueued = false;

  readonly stage = new Stage();
  readonly editor = new GeneEditor({
    change: (id, v, commit) => this.setGene(id, v, commit),
    lock: (ids, locked) => {
      for (const id of ids) {
        if (locked) this.locks.add(id);
        else this.locks.delete(id);
      }
      this.editor.setValues(this.genome.genes, this.locks);
      this.save();
    },
  });

  // header controls
  private familySel = h('select', { class: 'family-select', title: 'Creature family' });
  private archSel = h('select', { title: 'Type: a template for proportions, outfit and colours' });
  private seedInput = h('input', { class: 'seed', type: 'text', placeholder: 'seed or any text', title: 'Seed: the same seed always gives the same creature' });
  private nameInput = h('input', { class: 'name', type: 'text', title: 'Name' });
  private undoBtn = h('button', { class: 'btn icon-only', title: 'Undo (Ctrl+Z)' }, icon('undo'));
  private redoBtn = h('button', { class: 'btn icon-only', title: 'Redo (Ctrl+Y)' }, icon('redo'));
  // right panel
  private clipBar = h('div', { class: 'clip-grid' });
  private dirPad = h('div', { class: 'dir-pad' });
  private frameInfo = h('span', { class: 'frame-info' });
  private playBtn = h('button', { class: 'btn icon-only', title: 'Play / pause (Space)' }, icon('pause'));
  private info = h('div', { class: 'info' });
  private familyDesc = h('p', { class: 'family-desc' });
  // tabs
  private variations: ThumbGrid;
  private gallery: ThumbGrid;
  private exporter: ReturnType<typeof exportPanel>;

  constructor(private root: HTMLElement) {
    const viewOpts = () => ({ elevationDeg: this.view.elevationDeg, shadow: this.view.shadow, outline: this.view.outline, bg: this.view.bg });
    this.variations = new ThumbGrid(viewOpts, (g) => this.setGenome(g, true));
    this.variations.clip = 'idle';
    this.gallery = new ThumbGrid(viewOpts, (g) => this.openGallery(g), (g) => `${FAMILY_MAP.get(g.family)?.label ?? ''} · ${FAMILY_MAP.get(g.family)?.archetypes.find((a) => a.id === g.archetype)?.label ?? g.archetype}`);
    this.exporter = exportPanel({
      genome: () => this.genome,
      model: () => this.model,
      view: () => ({ ...this.view, clip: this.stage.clipId, dir: this.stage.dir, bgColor: (0xff000000 | ((BG_COLOR[this.view.bg] & 255) << 16) | (BG_COLOR[this.view.bg] & 0xff00) | ((BG_COLOR[this.view.bg] >> 16) & 255)) >>> 0 }),
    });
    this.layout();
    this.stage.onTick = ({ frame, frames, zoom }) => (this.frameInfo.textContent = `frame ${frame + 1}/${frames} · ×${zoom}`);
    this.stage.onDriveClip = () => this.syncClipButtons();
    this.keyboard();
    void this.start();
  }

  // ------------------------------------------------------------------------------------- start

  private async start(): Promise<void> {
    let g: Genome | null = null;
    const hash = location.hash.match(/[#&]g=([^&]+)/);
    if (hash) {
      try {
        g = await genomeFromCode(hash[1], FAMILY_MAP);
      } catch {
        toast('That link could not be read.');
      }
    }
    if (!g) {
      try {
        const raw = localStorage.getItem(STORE);
        if (raw) {
          const s = JSON.parse(raw) as Saved;
          g = genomeFromJSON(JSON.stringify(s.genome), FAMILY_MAP);
          this.locks = new Set(s.locks ?? []);
          Object.assign(this.view, s.view ?? {});
        }
      } catch {
        /* storage unavailable or stale: start fresh */
      }
    }
    g ??= newGenome(FAMILY_MAP.get('human')!, randomSeed());
    this.applyView();
    this.setGenome(g, false);
    this.refreshGallery();
    (window as unknown as { __ready: boolean; __app: App }).__ready = true;
    (window as unknown as { __app: App }).__app = this;
  }

  // ------------------------------------------------------------------------------------- state

  setGenome(g: Genome, record: boolean): void {
    if (record && this.genome) {
      this.undoStack.push(this.genome);
      if (this.undoStack.length > 100) this.undoStack.shift();
      this.redoStack.length = 0;
    }
    const famChanged = !this.family || this.family.id !== g.family;
    this.genome = g;
    this.family = FAMILY_MAP.get(g.family)!;
    if (famChanged) {
      this.editor.setSchema(this.family.schema);
      this.archSel.replaceChildren(...this.family.archetypes.map((a) => h('option', { value: a.id }, a.label)));
      this.familyDesc.textContent = this.family.description;
      this.locks = new Set([...this.locks].filter((id) => this.family.schema.has(id)));
    }
    this.familySel.value = g.family;
    this.archSel.value = g.archetype;
    this.nameInput.value = g.name;
    this.seedInput.value = '';
    this.seedInput.placeholder = `seed ${g.seeds.anatomy % 100000}…`;
    this.editor.setValues(g.genes, this.locks);
    this.rebuild();
    this.undoBtn.disabled = !this.undoStack.length;
    this.redoBtn.disabled = !this.redoStack.length;
    if (record || famChanged) this.refreshVariations();
    this.save();
  }

  private setGene(id: string, v: GeneValue, commit: boolean): void {
    const g: Genome = { ...this.genome, genes: { ...this.genome.genes, [id]: v } };
    if (commit) this.setGenome(g, true);
    else {
      this.genome = g;
      this.rebuild();
    }
  }

  private rebuild(): void {
    if (this.rebuildQueued) return;
    this.rebuildQueued = true;
    requestAnimationFrame(() => {
      this.rebuildQueued = false;
      this.model = buildModel(this.family, this.genome, this.view.scale);
      this.stage.setModel(this.model, this.view);
      this.syncClipButtons();
      this.exporter.refresh();
      this.updateInfo();
    });
  }

  private save(): void {
    try {
      localStorage.setItem(STORE, JSON.stringify({ genome: this.genome, locks: [...this.locks], view: this.view } satisfies Saved));
    } catch {
      /* private mode: nothing to persist */
    }
  }

  private undo(): void {
    const g = this.undoStack.pop();
    if (!g) return;
    this.redoStack.push(this.genome);
    this.setGenome(g, false);
  }

  private redo(): void {
    const g = this.redoStack.pop();
    if (!g) return;
    this.undoStack.push(this.genome);
    this.setGenome(g, false);
  }

  private newCreature(seed = randomSeed(), family = this.family, archetype?: string): void {
    this.setGenome(newGenome(family, seed, archetype), true);
  }

  private rerollStreams(streams: Stream[], archetype?: string): void {
    const g = reroll(this.family, this.genome, randomSeed(), streams, this.locks, archetype);
    this.setGenome(g, true);
  }

  private refreshVariations(): void {
    const rng = new Rng(randomSeed());
    const kids: Genome[] = [];
    for (let i = 0; i < 8; i++) {
      const k = mutate(this.family, this.genome, rng.uint(), this.view.mutation, this.locks);
      kids.push({ ...k, name: this.genome.name });
    }
    this.variations.set(kids, kids.map((_, i) => `Variation ${i + 1}`));
  }

  private galleryFamily = 'same';
  private refreshGallery(): void {
    const rng = new Rng(randomSeed());
    const list: Genome[] = [];
    for (let i = 0; i < 24; i++) {
      const fam = this.galleryFamily === 'all' ? FAMILIES[i % FAMILIES.length] : this.galleryFamily === 'same' ? this.family : FAMILY_MAP.get(this.galleryFamily)!;
      list.push(newGenome(fam, rng.uint() % 1000000));
    }
    this.gallery.set(list);
  }

  private openGallery(g: Genome): void {
    this.setGenome(g, true);
  }

  // ------------------------------------------------------------------------------------- layout

  private layout(): void {
    for (const f of FAMILIES) this.familySel.appendChild(h('option', { value: f.id }, f.label));
    this.familySel.addEventListener('change', () => this.newCreature(randomSeed(), FAMILY_MAP.get(this.familySel.value)!));
    this.archSel.addEventListener('change', () => this.rerollStreams(STREAMS, this.archSel.value));
    this.seedInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.seedInput.value.trim()) this.newCreature(seedFromText(this.seedInput.value), this.family, this.archSel.value);
    });
    this.nameInput.addEventListener('change', () => this.setGenome({ ...this.genome, name: this.nameInput.value }, true));
    this.undoBtn.addEventListener('click', () => this.undo());
    this.redoBtn.addEventListener('click', () => this.redo());

    const fileInput = h('input', { type: 'file', accept: '.json,application/json', style: 'display:none' });
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files?.[0];
      if (!f) return;
      try {
        const text = await f.text();
        const raw = JSON.parse(text);
        const g = genomeFromJSON(JSON.stringify(raw.genome ?? raw), FAMILY_MAP);
        this.setGenome(g, true);
        toast(`Loaded ${g.name || 'preset'}`);
      } catch (e) {
        toast(`Could not load: ${(e as Error).message}`);
      }
      fileInput.value = '';
    });

    const rerollMenu = h('div', { class: 'split' },
      h('button', { class: 'btn', title: 'Reroll everything that is not locked (R)', on: { click: () => this.rerollStreams(STREAMS) } }, icon('dice'), 'Reroll'),
      h('button', { class: 'btn small', title: 'Reroll the body only', on: { click: () => this.rerollStreams(['anatomy']) } }, 'Body'),
      h('button', { class: 'btn small', title: 'Reroll the colours only', on: { click: () => this.rerollStreams(['color', 'pattern']) } }, 'Colours'),
      h('button', { class: 'btn small', title: 'Reroll the way it moves', on: { click: () => this.rerollStreams(['motion']) } }, 'Motion'));

    const header = h('header', { class: 'top' },
      h('div', { class: 'brand' }, h('span', { class: 'logo' }), h('span', {}, 'Pixel Creature Creator')),
      h('div', { class: 'top-group' }, this.familySel, this.archSel),
      h('div', { class: 'top-group' }, this.nameInput, this.seedInput,
        h('button', { class: 'btn primary', title: 'A new random creature (N)', on: { click: () => this.newCreature(randomSeed(), this.family, this.archSel.value) } }, icon('sparkle'), 'New')),
      h('div', { class: 'top-group' }, rerollMenu),
      h('div', { class: 'top-group' }, this.undoBtn, this.redoBtn),
      h('div', { class: 'top-group right' },
        h('button', { class: 'btn', title: 'Download this creature as a JSON preset', on: { click: () => download(`${slug(this.genome.name || 'creature')}.json`, new Blob([genomeToJSON(this.genome)], { type: 'application/json' })) } }, icon('download'), 'Save'),
        h('button', { class: 'btn', title: 'Load a JSON preset (or a sheet .json)', on: { click: () => fileInput.click() } }, icon('upload'), 'Load'),
        h('button', { class: 'btn', title: 'Copy a link to this exact creature', on: { click: () => void this.share() } }, icon('link'), 'Share'),
        fileInput));

    // ---- right panel
    const dirs = [['nw', 7, '↖'], ['n', 4, '↑'], ['ne', 3, '↗'], ['w', 6, '←'], ['spin', -1, '⟳'], ['e', 2, '→'], ['sw', 7, '↙'], ['s', 0, '↓'], ['se', 1, '↘']] as const;
    for (const [id, , label] of dirs) {
      const di = DIRECTIONS.findIndex((d) => d.id === id);
      const b = h('button', { class: 'btn dir', dataset: { dir: id }, title: id === 'spin' ? 'Turntable: rotate freely' : DIRECTIONS[di].label }, label);
      b.addEventListener('click', () => {
        if (id === 'spin') this.stage.turntable = !this.stage.turntable;
        else {
          this.stage.turntable = false;
          this.stage.dir = di;
        }
        this.syncDirButtons();
      });
      this.dirPad.appendChild(b);
    }
    this.playBtn.addEventListener('click', () => this.togglePlay());
    const speedSel = h('select', { title: 'Playback speed' }, ...[0.25, 0.5, 1, 1.5, 2].map((s) => h('option', { value: String(s), selected: s === 1 }, `${s}×`)));
    speedSel.addEventListener('change', () => (this.stage.speed = Number(speedSel.value)));
    const toggle = (label: string, title: string, get: () => boolean, set: (v: boolean) => void) => {
      const cb = h('input', { type: 'checkbox', checked: get() });
      cb.addEventListener('change', () => set(cb.checked));
      return h('label', { class: 'check', title }, cb, label);
    };
    const scaleSel = h('select', { title: 'Pixel size of the creature (an average adult human is about 64 px tall at 1×)' }, ...[0.5, 0.75, 1, 1.25, 1.5, 2, 3].map((s) => h('option', { value: String(s) }, `${s}× (${Math.round(64 * s)} px human)`)));
    scaleSel.addEventListener('change', () => {
      this.view.scale = Number(scaleSel.value);
      this.rebuild();
      this.save();
    });
    const elev = h('input', { type: 'range', min: '0', max: '60', step: '5', title: 'Camera elevation' });
    const elevOut = h('span', { class: 'gene-value' });
    elev.addEventListener('input', () => {
      this.view.elevationDeg = Number(elev.value);
      elevOut.textContent = `${elev.value}°`;
      this.rebuild();
    });
    elev.addEventListener('change', () => this.save());
    const bgSel = h('select', {}, ...BACKGROUNDS.map(([id, label]) => h('option', { value: id }, label)));
    bgSel.addEventListener('change', () => {
      this.view.bg = bgSel.value as BackgroundId;
      this.stage.bg = this.view.bg;
      this.save();
    });
    const zoomSel = h('select', { title: 'Zoom (mouse wheel on the stage)' }, h('option', { value: '0' }, 'Auto'), ...[1, 2, 3, 4, 5, 6, 8, 10, 12].map((z) => h('option', { value: String(z) }, `×${z}`)));
    zoomSel.addEventListener('change', () => (this.stage.zoom = Number(zoomSel.value)));
    this.applyView = () => {
      scaleSel.value = String(this.view.scale);
      elev.value = String(this.view.elevationDeg);
      elevOut.textContent = `${this.view.elevationDeg}°`;
      bgSel.value = this.view.bg;
      this.stage.bg = this.view.bg;
    };
    const driveHelp = h('div', { class: 'drive-help' }, 'WASD / arrows move · Shift run · C sneak · Space attack · F cast · G block · J jump · H hurt · K die · X sit · V wave · B cheer · E pick up · T talk · R ready');
    const right = h('aside', { class: 'panel right' },
      h('h3', {}, 'Animation'),
      this.clipBar,
      h('div', { class: 'row playback' },
        h('button', { class: 'btn icon-only', title: 'Previous frame (,)', on: { click: () => this.stage.step(-1) } }, icon('stepB')),
        this.playBtn,
        h('button', { class: 'btn icon-only', title: 'Next frame (.)', on: { click: () => this.stage.step(1) } }, icon('stepF')),
        speedSel, this.frameInfo),
      h('h3', {}, 'Direction'),
      this.dirPad,
      h('div', { class: 'toggles' },
        toggle('Smooth playback', 'Render every screen frame instead of the sprite frame rate', () => this.stage.smooth, (v) => (this.stage.smooth = v)),
        toggle('Scroll ground', 'Move the ground at the exact walking speed: planted feet must not slide', () => this.stage.scroll, (v) => (this.stage.scroll = v)),
        toggle('Test drive (keyboard)', 'Walk the character around with the keyboard', () => this.stage.drive, (v) => {
          this.stage.drive = v;
          driveHelp.classList.toggle('on', v);
          if (v) this.stage.canvas.focus();
        })),
      driveHelp,
      h('h3', {}, 'View'),
      h('div', { class: 'field' }, h('span', {}, 'Size'), scaleSel),
      h('div', { class: 'field' }, h('span', {}, 'Camera'), h('div', { class: 'gene-range' }, elev, elevOut)),
      h('div', { class: 'field' }, h('span', {}, 'Ground'), bgSel),
      h('div', { class: 'field' }, h('span', {}, 'Zoom'), zoomSel),
      h('div', { class: 'toggles' },
        toggle('Ground shadow', '', () => this.view.shadow, (v) => {
          this.view.shadow = v;
          this.rebuild();
          this.save();
        }),
        toggle('Outline', '', () => this.view.outline, (v) => {
          this.view.outline = v;
          this.rebuild();
          this.save();
        })),
      h('h3', {}, 'About'),
      this.info);

    // ---- tabs under the stage
    const mutSlider = h('input', { type: 'range', min: '0.05', max: '1', step: '0.05', value: String(this.view.mutation) });
    const mutOut = h('span', { class: 'gene-value' }, `${Math.round(this.view.mutation * 100)}%`);
    mutSlider.addEventListener('input', () => {
      this.view.mutation = Number(mutSlider.value);
      mutOut.textContent = `${Math.round(this.view.mutation * 100)}%`;
    });
    mutSlider.addEventListener('change', () => this.refreshVariations());
    const galFam = h('select', {}, h('option', { value: 'same' }, 'This family'), h('option', { value: 'all' }, 'All families'), ...FAMILIES.map((f) => h('option', { value: f.id }, f.label)));
    galFam.addEventListener('change', () => {
      this.galleryFamily = galFam.value;
      this.refreshGallery();
    });
    const tabs: [string, string, HTMLElement][] = [
      ['variations', 'Variations', h('div', { class: 'tab-body' },
        h('div', { class: 'row tab-tools' }, h('span', {}, 'Mutation'), h('div', { class: 'gene-range' }, mutSlider, mutOut),
          h('button', { class: 'btn small', on: { click: () => this.refreshVariations() } }, icon('dice'), 'New variations'),
          h('span', { class: 'hint' }, 'Click one to make it the parent. Locked genes never change.')),
        this.variations.el)],
      ['gallery', 'Gallery', h('div', { class: 'tab-body' },
        h('div', { class: 'row tab-tools' }, galFam, h('button', { class: 'btn small', on: { click: () => this.refreshGallery() } }, icon('dice'), 'Reroll gallery'),
          h('span', { class: 'hint' }, 'Click a creature to open it in the editor.')),
        this.gallery.el)],
      ['export', 'Export', h('div', { class: 'tab-body' }, this.exporter.el)],
    ];
    const tabBar = h('div', { class: 'tab-bar' });
    const tabHost = h('div', { class: 'tab-host' });
    const show = (id: string) => {
      for (const [tid, , body] of tabs) body.classList.toggle('on', tid === id);
      for (const b of tabBar.children) (b as HTMLElement).classList.toggle('on', (b as HTMLElement).dataset.tab === id);
    };
    for (const [id, label, body] of tabs) {
      tabBar.appendChild(h('button', { class: 'tab', dataset: { tab: id }, on: { click: () => show(id) } }, label));
      tabHost.appendChild(body);
    }
    show('variations');

    const left = h('aside', { class: 'panel left' }, this.familyDesc, this.editor.el);
    const center = h('main', { class: 'center' }, this.stage.el, h('section', { class: 'tabs' }, tabBar, tabHost));
    this.root.append(h('div', { class: 'app' }, header, left, center, right));
  }

  private applyView: () => void = () => {};

  private syncClipButtons(): void {
    const clips = this.model?.animator.clips ?? [];
    if (this.clipBar.childElementCount !== clips.length || [...this.clipBar.children].some((b, i) => (b as HTMLElement).dataset.clip !== clips[i].id)) {
      this.clipBar.replaceChildren(...clips.map((c, i) => h('button', {
        class: 'btn clip', dataset: { clip: c.id }, title: `${c.frames} frames at ${c.fps} fps${c.loop ? ', loops' : ''}${c.speed ? `, moves ${c.speed} px/s` : ''}${i < 9 ? ` (${i + 1})` : ''}`,
        on: { click: () => {
          this.stage.setClip(c.id);
          this.stage.playing = true;
          this.playBtn.replaceChildren(icon('pause'));
          this.syncClipButtons();
        } },
      }, c.label)));
    }
    for (const b of this.clipBar.children) (b as HTMLElement).classList.toggle('on', (b as HTMLElement).dataset.clip === this.stage.clipId);
    this.syncDirButtons();
  }

  private syncDirButtons(): void {
    for (const b of this.dirPad.children) {
      const id = (b as HTMLElement).dataset.dir;
      (b as HTMLElement).classList.toggle('on', id === 'spin' ? this.stage.turntable : !this.stage.turntable && DIRECTIONS[this.stage.dir].id === id);
    }
  }

  private togglePlay(): void {
    this.stage.playing = !this.stage.playing;
    this.playBtn.replaceChildren(icon(this.stage.playing ? 'pause' : 'play'));
  }

  private updateInfo(): void {
    const m = this.model, an = m.anatomy, box = this.stage.cache?.box;
    const arch = this.family.archetypes.find((a) => a.id === this.genome.archetype)?.label ?? this.genome.archetype;
    const colors = m.palette.uniqueColors().length;
    const row = (k: string, v: string) => h('div', { class: 'info-row' }, h('span', {}, k), h('span', {}, v));
    this.info.replaceChildren(
      row('Family', `${this.family.label} · ${arch}`),
      row('Height', `${Math.round(an.metrics.height)} px`),
      row('Sprite cell', box ? `${box.w} × ${box.h} px` : '–'),
      row('Walk / run', `${an.metrics.walkSpeed} / ${an.metrics.runSpeed} px/s`),
      row('Colours', `${colors}`),
      row('Parts', `${an.prims.length} shapes · ${an.bones.length} bones`),
      h('div', { class: 'traits' }, ...an.traits.map((t) => h('span', { class: 'chip' }, t))),
      h('div', { class: 'swatches' }, ...[...new Set(Object.values(m.palette.materials).map((x) => x.color))].slice(0, 24).map((c) => h('span', { class: 'swatch', style: `background:${hexToCss(c)}` }))),
    );
  }

  private async share(): Promise<void> {
    const code = await genomeToCode(this.genome);
    const url = `${location.origin}${location.pathname}#g=${code}`;
    history.replaceState(null, '', `#g=${code}`);
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied: it recreates this exact creature.');
    } catch {
      toast('Link is in the address bar.');
    }
  }

  private keyboard(): void {
    window.addEventListener('keydown', (e) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) {
        if (!(t instanceof HTMLInputElement && (t.type === 'range' || t.type === 'checkbox'))) return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) this.redo();
        else this.undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.redo();
        return;
      }
      if (this.stage.drive || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.stage.turntable = false;
        this.stage.dir = (this.stage.dir + (e.key === 'ArrowLeft' ? 7 : 1)) % 8;
        this.syncDirButtons();
      } else if (e.key === ',') this.stage.step(-1);
      else if (e.key === '.') this.stage.step(1);
      else if (e.key === 'n') this.newCreature(randomSeed(), this.family, this.archSel.value);
      else if (e.key === 'r') this.rerollStreams(STREAMS);
      else if (/^[1-9]$/.test(e.key)) {
        const c = this.model.animator.clips[Number(e.key) - 1];
        if (c) {
          this.stage.setClip(c.id);
          this.syncClipButtons();
        }
      }
    });
  }
}

export function startApp(root: HTMLElement): App {
  return new App(root);
}

