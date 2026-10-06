/**
 * Gene schemas. A family describes its genes once (id, label, group, kind, range, default); the UI,
 * sampling, mutation, crossover and serialisation are all driven by that description.
 *
 * Genes belong to groups, and every group belongs to one random stream (anatomy, color, pattern or
 * motion), so a reroll of one stream never touches the others.
 */

export type Stream = 'anatomy' | 'color' | 'pattern' | 'motion';
export type GeneValue = number | string | boolean;

interface GeneBase {
  id: string;
  label: string;
  group: string;
  help?: string;
  /** Relative mutation strength (1 = normal, 0 = never mutates). */
  mut: number;
  /** Hidden from the editor (derived or internal). */
  hidden?: boolean;
}

export interface FloatGene extends GeneBase {
  kind: 'float';
  min: number;
  max: number;
  def: number;
  /** How the value is shown: as a percentage of the range, or a number with a unit. */
  unit?: '%' | '°' | 'x' | '';
}

export interface ChoiceGene extends GeneBase {
  kind: 'choice';
  options: { id: string; label: string }[];
  def: string;
}

export interface BoolGene extends GeneBase {
  kind: 'bool';
  def: boolean;
}

export interface ColorGene extends GeneBase {
  kind: 'color';
  def: number;
}

export type GeneDef = FloatGene | ChoiceGene | BoolGene | ColorGene;

export interface GroupDef {
  id: string;
  label: string;
  stream: Stream;
}

export class GeneSchema {
  readonly byId = new Map<string, GeneDef>();
  readonly groupById = new Map<string, GroupDef>();

  constructor(readonly groups: GroupDef[], readonly genes: GeneDef[]) {
    for (const g of groups) this.groupById.set(g.id, g);
    for (const g of genes) this.byId.set(g.id, g);
  }

  get(id: string): GeneDef {
    const g = this.byId.get(id);
    if (!g) throw new Error(`unknown gene ${id}`);
    return g;
  }
  has(id: string): boolean {
    return this.byId.has(id);
  }
  streamOf(id: string): Stream {
    return this.groupById.get(this.get(id).group)!.stream;
  }
  genesIn(group: string): GeneDef[] {
    return this.genes.filter((g) => g.group === group);
  }
  defaults(): Record<string, GeneValue> {
    const v: Record<string, GeneValue> = {};
    for (const g of this.genes) v[g.id] = g.def;
    return v;
  }
  /** Brings a value into the gene's domain (clamps floats, maps unknown choices to the default). */
  sanitize(id: string, value: unknown): GeneValue {
    const g = this.get(id);
    switch (g.kind) {
      case 'float': {
        const n = typeof value === 'number' && Number.isFinite(value) ? value : g.def;
        return Math.min(g.max, Math.max(g.min, n));
      }
      case 'choice':
        return typeof value === 'string' && g.options.some((o) => o.id === value) ? value : g.def;
      case 'bool':
        return typeof value === 'boolean' ? value : g.def;
      case 'color':
        return typeof value === 'number' && Number.isFinite(value) ? (value >>> 0) & 0xffffff : g.def;
    }
  }
}

type Opts = { help?: string; mut?: number; hidden?: boolean };

/** Fluent builder: `b.group('body', 'Body', 'anatomy').float('height', 'Height', 0.5)…` */
export class SchemaBuilder {
  private groups: GroupDef[] = [];
  private genes: GeneDef[] = [];
  private current = '';

  group(id: string, label: string, stream: Stream): this {
    this.groups.push({ id, label, stream });
    this.current = id;
    return this;
  }
  float(id: string, label: string, def: number, o: Opts & { min?: number; max?: number; unit?: FloatGene['unit'] } = {}): this {
    this.genes.push({ kind: 'float', id, label, group: this.current, def, min: o.min ?? 0, max: o.max ?? 1, unit: o.unit ?? '%', help: o.help, mut: o.mut ?? 1, hidden: o.hidden });
    return this;
  }
  choice(id: string, label: string, options: readonly (readonly [string, string])[], def: string, o: Opts = {}): this {
    this.genes.push({ kind: 'choice', id, label, group: this.current, options: options.map(([id, label]) => ({ id, label })), def, help: o.help, mut: o.mut ?? 1, hidden: o.hidden });
    return this;
  }
  bool(id: string, label: string, def: boolean, o: Opts = {}): this {
    this.genes.push({ kind: 'bool', id, label, group: this.current, def, help: o.help, mut: o.mut ?? 1, hidden: o.hidden });
    return this;
  }
  color(id: string, label: string, def: number, o: Opts = {}): this {
    this.genes.push({ kind: 'color', id, label, group: this.current, def, help: o.help, mut: o.mut ?? 1, hidden: o.hidden });
    return this;
  }
  build(): GeneSchema {
    return new GeneSchema(this.groups, this.genes);
  }
}

/** Typed read access to a genome's values. */
export class Genes {
  constructor(readonly schema: GeneSchema, readonly values: Record<string, GeneValue>) {}

  f(id: string): number {
    const v = this.values[id];
    return typeof v === 'number' ? v : (this.schema.get(id).def as number);
  }
  c(id: string): string {
    const v = this.values[id];
    return typeof v === 'string' ? v : (this.schema.get(id).def as string);
  }
  b(id: string): boolean {
    const v = this.values[id];
    return typeof v === 'boolean' ? v : (this.schema.get(id).def as boolean);
  }
  col(id: string): number {
    const v = this.values[id];
    return typeof v === 'number' ? v : (this.schema.get(id).def as number);
  }
}
