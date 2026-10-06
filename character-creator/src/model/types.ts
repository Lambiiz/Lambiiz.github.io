import type { Anatomy } from '../anatomy/anatomy';
import type { SkeletonPose } from '../anatomy/pose';
import type { Rng } from '../core/rng';
import type { GeneSchema, GeneValue, Genes, Stream } from '../genome/schema';
import type { Material } from '../render/materials';
import type { SurfaceSpec } from '../render/surface';

export const GENOME_FORMAT = 'pixel-creature';
export const GENOME_VERSION = 1;

/** Everything needed to rebuild a creature exactly. Saved as JSON presets and in share links. */
export interface Genome {
  format: typeof GENOME_FORMAT;
  version: number;
  family: string;
  archetype: string;
  /** Seeds of the four random streams. */
  seeds: Record<Stream, number>;
  name: string;
  genes: Record<string, GeneValue>;
}

export interface ClipDef {
  id: string;
  label: string;
  frames: number;
  fps: number;
  loop: boolean;
  /** Ground speed while the clip plays (pixels per second, 0 = in place). */
  speed: number;
}

/** Turns a clip and a normalised time into a pose. Loops use u in [0, 1); one-shots run 0 → 1. */
export interface Animator {
  readonly clips: ClipDef[];
  pose(clip: string, u: number, pose: SkeletonPose): void;
}

export interface Archetype {
  id: string;
  label: string;
  weight: number;
}

export interface SampleContext {
  arch: string;
  rng(stream: Stream): Rng;
}

export interface BuiltParts {
  anatomy: Anatomy;
  materials: Record<string, Material>;
  surface: SurfaceSpec;
  animator: Animator;
}

export interface Family {
  id: string;
  label: string;
  description: string;
  archetypes: Archetype[];
  schema: GeneSchema;
  /** Samples genes for an archetype (missing genes keep their defaults). */
  sample(ctx: SampleContext): Record<string, GeneValue>;
  /** Builds anatomy, materials, patterns and the animator. `scale` multiplies every length. */
  build(genes: Genes, genome: Genome, scale: number): BuiltParts;
  /** A generated display name. */
  name(rng: Rng, genome: Genome): string;
}
