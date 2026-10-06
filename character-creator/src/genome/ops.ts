/**
 * Genome operations: sampling from a seed, rerolls that respect locked genes, mutation (offspring),
 * crossover by gene group, and (de)serialisation for presets and share links.
 */

import { hexToOklch, oklchToHex } from '../core/color';
import { Rng, deriveSeed, mix32 } from '../core/rng';
import { GENOME_FORMAT, GENOME_VERSION, type Family, type Genome } from '../model/types';
import type { GeneValue, Stream } from './schema';

export const STREAMS: Stream[] = ['anatomy', 'color', 'pattern', 'motion'];

function streamSeeds(seed: number): Record<Stream, number> {
  return { anatomy: deriveSeed(seed, 'anatomy'), color: deriveSeed(seed, 'color'), pattern: deriveSeed(seed, 'pattern'), motion: deriveSeed(seed, 'motion') };
}

function sampleValues(family: Family, arch: string, seeds: Record<Stream, number>): Record<string, GeneValue> {
  const rngs = new Map<Stream, Rng>();
  const values = family.schema.defaults();
  Object.assign(values, family.sample({ arch, rng: (s) => {
    let r = rngs.get(s);
    if (!r) rngs.set(s, (r = new Rng(seeds[s])));
    return r;
  } }));
  for (const id of Object.keys(values)) {
    if (!family.schema.has(id)) delete values[id];
    else values[id] = family.schema.sanitize(id, values[id]);
  }
  return values;
}

/** A complete new creature from a seed. The archetype is picked from the seed when not given. */
export function newGenome(family: Family, seed: number, archetype?: string): Genome {
  const r = new Rng(deriveSeed(seed, 'archetype'));
  const arch = archetype && family.archetypes.some((a) => a.id === archetype) ? archetype : family.archetypes[r.weighted(family.archetypes.map((a) => a.weight))].id;
  const seeds = streamSeeds(seed);
  const g: Genome = { format: GENOME_FORMAT, version: GENOME_VERSION, family: family.id, archetype: arch, seeds, name: '', genes: sampleValues(family, arch, seeds) };
  g.name = family.name(new Rng(deriveSeed(seed, 'name')), g);
  return g;
}

/**
 * Rerolls the given streams with a fresh seed; locked genes (and every gene of the other streams)
 * keep their values.
 */
export function reroll(family: Family, g: Genome, seed: number, streams: Stream[], locked: Set<string>, archetype?: string): Genome {
  const fresh = streamSeeds(seed);
  const seeds = { ...g.seeds };
  for (const s of streams) seeds[s] = fresh[s];
  const arch = archetype ?? g.archetype;
  const sampled = sampleValues(family, arch, seeds);
  const genes: Record<string, GeneValue> = {};
  for (const def of family.schema.genes) {
    const stream = family.schema.streamOf(def.id);
    const keep = locked.has(def.id) || !streams.includes(stream);
    genes[def.id] = keep && def.id in g.genes ? g.genes[def.id] : sampled[def.id];
  }
  const out: Genome = { ...g, archetype: arch, seeds, genes };
  if (streams.includes('anatomy') && !locked.has('__name')) out.name = family.name(new Rng(deriveSeed(seed, 'name')), out);
  return out;
}

/**
 * Offspring: every unlocked gene drifts by a Gaussian step scaled by `strength` (0..1) and the gene's
 * own mutation rate; choices switch rarely, colours drift in OKLCH.
 */
export function mutate(family: Family, g: Genome, seed: number, strength: number, locked: Set<string>): Genome {
  const rng = new Rng(seed);
  const genes = { ...g.genes };
  for (const def of family.schema.genes) {
    if (locked.has(def.id) || def.hidden || def.mut <= 0) {
      rng.next();
      continue;
    }
    const s = strength * def.mut;
    const v = genes[def.id];
    switch (def.kind) {
      case 'float': {
        const range = def.max - def.min;
        genes[def.id] = Math.min(def.max, Math.max(def.min, (v as number) + rng.gaussian(0, 0.12 * s * range)));
        break;
      }
      case 'choice':
        if (rng.chance(0.12 * s)) genes[def.id] = rng.pick(def.options).id;
        break;
      case 'bool':
        if (rng.chance(0.08 * s)) genes[def.id] = !(v as boolean);
        break;
      case 'color': {
        const c = hexToOklch(v as number);
        genes[def.id] = oklchToHex(c.l + rng.gaussian(0, 0.05 * s), c.c * (1 + rng.gaussian(0, 0.2 * s)), c.h + rng.gaussian(0, 18 * s));
        break;
      }
    }
  }
  return { ...g, genes, seeds: { ...g.seeds, motion: mix32(g.seeds.motion ^ seed) } };
}

/** Child of two parents of the same family: whole gene groups come from one parent or the other. */
export function crossover(family: Family, a: Genome, b: Genome, seed: number): Genome {
  if (a.family !== b.family) throw new Error('parents must be of the same family');
  const rng = new Rng(seed);
  const genes: Record<string, GeneValue> = {};
  for (const grp of family.schema.groups) {
    const fromA = rng.chance(0.5);
    for (const def of family.schema.genesIn(grp.id)) genes[def.id] = (fromA ? a : b).genes[def.id] ?? def.def;
  }
  const seeds = { ...a.seeds };
  for (const s of STREAMS) if (rng.chance(0.5)) seeds[s] = b.seeds[s];
  return { ...a, archetype: rng.chance(0.5) ? a.archetype : b.archetype, genes, seeds };
}

// ---------------------------------------------------------------------------------------------
// serialisation
// ---------------------------------------------------------------------------------------------

export function genomeToJSON(g: Genome): string {
  const genes: Record<string, GeneValue> = {};
  for (const [k, v] of Object.entries(g.genes)) genes[k] = typeof v === 'number' && !Number.isInteger(v) ? Math.round(v * 1e5) / 1e5 : v;
  return JSON.stringify({ ...g, genes }, null, 2);
}

/** Parses and validates a preset. Unknown genes are dropped, missing ones get defaults. */
export function genomeFromJSON(text: string, families: Map<string, Family>): Genome {
  const raw = JSON.parse(text);
  if (!raw || raw.format !== GENOME_FORMAT) throw new Error('not a creature preset');
  const fam = families.get(raw.family);
  if (!fam) throw new Error(`unknown family "${raw.family}"`);
  const genes = fam.schema.defaults();
  for (const def of fam.schema.genes) if (raw.genes && def.id in raw.genes) genes[def.id] = fam.schema.sanitize(def.id, raw.genes[def.id]);
  const seeds = streamSeeds(1);
  for (const s of STREAMS) if (raw.seeds && Number.isFinite(raw.seeds[s])) seeds[s] = raw.seeds[s] >>> 0;
  const arch = fam.archetypes.some((a) => a.id === raw.archetype) ? raw.archetype : fam.archetypes[0].id;
  return { format: GENOME_FORMAT, version: GENOME_VERSION, family: fam.id, archetype: arch, seeds, name: String(raw.name ?? ''), genes };
}

const b64urlEncode = (bytes: Uint8Array): string => {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const b64urlDecode = (s: string): Uint8Array => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

/** Compact share code (URL-safe): the genome as JSON, deflated when the browser supports it. */
export async function genomeToCode(g: Genome): Promise<string> {
  const json = genomeToJSON(g).replace(/\s+/g, '');
  const bytes = new TextEncoder().encode(json);
  if (typeof CompressionStream !== 'undefined') {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    const buf = new Uint8Array(await new Response(stream).arrayBuffer());
    return 'z' + b64urlEncode(buf);
  }
  return 'j' + b64urlEncode(bytes);
}

export async function genomeFromCode(code: string, families: Map<string, Family>): Promise<Genome> {
  const kind = code[0];
  let bytes = b64urlDecode(code.slice(1));
  if (kind === 'z') {
    const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  }
  return genomeFromJSON(new TextDecoder().decode(bytes), families);
}
