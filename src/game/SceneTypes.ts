import type * as THREE from 'three';
import type { Input } from '../engine/core/Input';
import type { PostFX } from '../engine/render/PostFX';

export type SceneEvent =
  | { type: 'battle'; encounter: string }
  | { type: 'leaveBattle'; result: 'win' | 'lose' | 'flee' };

/** A playable scene: the overworld or a battle. Game owns the renderer and switches between them. */
export interface GameScene {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  /** Drawn after post-processing: sharp, ungraded, always on top. */
  readonly overlay?: THREE.Scene;
  update(dt: number, time: number, input: Input): SceneEvent | null;
  /** Set depth-of-field (and any other post) parameters for this frame. */
  dof(post: PostFX): void;
  enter(): void;
  exit(): void;
}
