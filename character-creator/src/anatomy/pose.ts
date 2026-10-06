import { Mat3, Vec3, Xform } from '../core/math';
import type { Anatomy } from './anatomy';

export type Mood = 'neutral' | 'angry' | 'pain' | 'happy' | 'dead' | 'focus';

/**
 * A posed skeleton. Animators start from the rest pose, rotate / move bones locally (forward
 * kinematics), solve once to get the torso in place, then override limb bones with transforms
 * computed by IK, and solve again so children of overridden bones (hands → weapons) follow.
 */
export class SkeletonPose {
  readonly local: Xform[];
  readonly world: Xform[];
  readonly override: (Xform | null)[];
  // expression / extras
  blink = 0;
  mouth = 0;
  mood: Mood = 'neutral';
  /** Eye direction in creature space terms: +1 looks forward-right of the screen, etc. (unused = 0). */
  lookY = 0;
  /** White hit flash 0..1. */
  flash = 0;
  /** Ground shadow scale (jumps shrink it) and visibility. */
  shadow = 1;
  /** Groups not drawn in this pose (an arrow only exists while shooting). */
  readonly hide = new Set<number>();

  constructor(readonly anatomy: Anatomy) {
    this.local = anatomy.bones.map((b) => b.rest);
    this.world = anatomy.restWorld.slice();
    this.override = anatomy.bones.map(() => null);
  }

  reset(): void {
    const bones = this.anatomy.bones;
    for (let i = 0; i < bones.length; i++) {
      this.local[i] = bones[i].rest;
      this.override[i] = null;
    }
    this.blink = 0;
    this.mouth = 0;
    this.mood = 'neutral';
    this.lookY = 0;
    this.flash = 0;
    this.shadow = 1;
    this.hide.clear();
  }

  /** Rotates a bone in its own (rest) frame. */
  rotate(bone: number, r: Mat3): void {
    if (bone < 0) return;
    this.local[bone] = this.local[bone].rotated(r);
  }

  /** Moves a bone's origin, in its parent's frame. */
  translate(bone: number, d: Vec3): void {
    if (bone < 0) return;
    const l = this.local[bone];
    this.local[bone] = new Xform(l.basis, l.origin.add(d));
  }

  setLocal(bone: number, x: Xform): void {
    if (bone >= 0) this.local[bone] = x;
  }

  /** Fixes a bone's creature-space transform (IK results). */
  setWorld(bone: number, x: Xform): void {
    if (bone >= 0) this.override[bone] = x;
  }

  /** Forward kinematics, honouring overrides. Bones are stored parents-first. */
  solve(): void {
    const bones = this.anatomy.bones;
    for (let i = 0; i < bones.length; i++) {
      const o = this.override[i];
      if (o) {
        this.world[i] = o;
        continue;
      }
      const p = bones[i].parent;
      this.world[i] = p >= 0 ? this.world[p].mul(this.local[i]) : this.local[i];
    }
  }

  /** Applies a rigid transform to the whole posed creature (falls, rolls, tumbles). */
  transformAll(t: Xform): void {
    for (let i = 0; i < this.world.length; i++) this.world[i] = t.mul(this.world[i]);
  }

  point(bone: number, local: Vec3 = Vec3.ZERO): Vec3 {
    return this.world[bone].point(local);
  }
}
