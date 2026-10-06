/**
 * Procedural animation for soft and floating creatures: slimes, ghosts, wisps, floating eyes and
 * jellyfish.
 *
 * The body bone moves and turns; a child "shape" bone carries the body primitives and is scaled
 * for squash and stretch (volume preserving). Tendrils (tentacles, eye stalks, ghost tails, flames,
 * little arms) are chains whose segment directions are computed in world space every frame from a
 * rest direction, gravity, drag against the motion and a travelling sway wave, so they hang, trail
 * and ripple naturally whatever the body does.
 *
 * Hopping slimes only move while airborne: on the ground they stay planted while the ground scrolls
 * at the clip's speed, so the hop lands exactly where the next one starts.
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, clamp, easeInOut, keyframes, lerp, segmentFrame, smoothstep } from '../core/math';
import type { Animator, ClipDef } from '../model/types';

export type BlobType = 'slime' | 'ghost' | 'wisp' | 'eye' | 'jelly';
export type TendrilKind = 'hang' | 'stalk' | 'tail' | 'flame' | 'arm';

export interface Tendril {
  kind: TendrilKind;
  /** Attachment point in the shape bone's frame (follows squash and stretch). */
  at: Vec3;
  /** Rest direction of the chain in the body frame. */
  dir: Vec3;
  bones: number[];
  seg: number;
  phase: number;
  side: number;
}

export interface BlobRig {
  kind: 'blob';
  type: BlobType;
  bones: { body: number; shape: number; eyeball: number; lid: number };
  tendrils: Tendril[];
  groups: { beam: number };
  dims: { R: number; /** Rest height of the body bone above the ground. */ hover: number };
  traits: { energy: number; bounce: number; wobble: number };
}

interface BState {
  /** Body offset (x forward, y up) from its rest position. */
  pos: Vec3;
  /** Vertical scale (< 1 squashed); the other axes compensate to keep the volume. */
  squash: number;
  /** Extra horizontal spread (melting). */
  spread: number;
  /** Uniform size (ghosts fading away). */
  size: number;
  yaw: number;
  /** + leans forward. */
  pitch: number;
  roll: number;
  /** Tendril sway amplitude, drag against the motion (+ trails back), droop (+ hangs lower). */
  sway: number;
  swayFreq: number;
  drag: number;
  droop: number;
  /** Ghost arms: 0 down … 1 raised. */
  arms: number;
  /** Flame length multiplier (wisps). */
  flame: number;
  /** Floating eye: gaze yaw / pitch and lid (0 open … 1 shut). */
  lookYaw: number;
  lookPitch: number;
  lid: number;
  beam: boolean;
  mouth: number;
  blink: number;
  flash: number;
  mood: SkeletonPose['mood'];
  shadow: number;
}

export class BlobAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly stride: { walk: number; run: number };

  constructor(readonly rig: BlobRig) {
    const R = rig.dims.R, t = rig.traits;
    const hop = rig.type === 'slime';
    this.stride = hop ? { walk: R * lerp(1.6, 2.4, t.bounce), run: R * lerp(2.8, 3.8, t.bounce) } : { walk: R * 1.6, run: R * 3 };
    const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
      ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
    const e = lerp(0.85, 1.2, t.energy);
    const attack = { slime: 'Pounce', ghost: 'Spook', wisp: 'Flare', eye: 'Gaze beam', jelly: 'Sting' }[rig.type];
    this.clips = [
      def('idle', 'Idle', 8, Math.round(6 * e), true),
      def('walk', hop ? 'Hop' : rig.type === 'jelly' ? 'Swim' : 'Float', hop ? 10 : 8, Math.round((hop ? 11 : 7) * e), true, this.stride.walk),
      def('run', hop ? 'Big hops' : 'Dash', hop ? 10 : 8, Math.round((hop ? 13 : 11) * e), true, this.stride.run),
      def('attack', attack, 9, 12, false),
      def('cast', rig.type === 'slime' ? 'Wobble' : 'Spell', 8, 10, false),
      def('hurt', 'Hurt', 6, 12, false),
      def('die', rig.type === 'slime' ? 'Melt' : rig.type === 'ghost' ? 'Vanish' : rig.type === 'wisp' ? 'Fizzle out' : 'Die', 10, 10, false),
      def('sleep', 'Sleep', 4, 3, true),
    ];
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: BState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose, u);
  }

  private neutral(): BState {
    return {
      pos: Vec3.ZERO, squash: 1, spread: 1, size: 1, yaw: 0, pitch: 0, roll: 0, sway: 0.25, swayFreq: 1, drag: 0, droop: 0, arms: 0, flame: 1,
      lookYaw: 0, lookPitch: 0, lid: 0, beam: false, mouth: 0, blink: 0, flash: 0, mood: 'neutral', shadow: 1,
    };
  }

  private get floats(): boolean {
    return this.rig.type !== 'slime';
  }

  // ------------------------------------------------------------------------------------ apply

  private apply(s: BState, pose: SkeletonPose, u: number): void {
    pose.reset();
    const B = this.rig.bones;
    const restBody = pose.local[B.body];
    const rot = Mat3.rotY(s.yaw).mul(Mat3.rotZ(-s.pitch)).mul(Mat3.rotX(s.roll));
    pose.setLocal(B.body, new Xform(rot, restBody.origin.add(s.pos)));
    const sq = clamp(s.squash, 0.08, 3);
    const side = (1 / Math.sqrt(sq)) * s.spread;
    const restShape = pose.local[B.shape];
    pose.setLocal(B.shape, new Xform(Mat3.scale(side * s.size, sq * s.size, side * s.size), restShape.origin.mul(s.size)));
    if (B.eyeball >= 0) pose.rotate(B.eyeball, Mat3.rotY(s.lookYaw).mul(Mat3.rotZ(s.lookPitch)));
    if (B.lid >= 0) pose.rotate(B.lid, Mat3.rotZ(lerp(1.25, -1.65, clamp(Math.max(s.lid, s.blink), 0, 1))));
    if (!s.beam && this.rig.groups.beam >= 0) pose.hide.add(this.rig.groups.beam);
    pose.solve();

    // tendrils, in world space
    const body = pose.world[B.body], shape = pose.world[B.shape];
    const fwd = body.basis.c0.norm(Vec3.X), up = body.basis.c1.norm(Vec3.Y), lat = body.basis.c2.norm(Vec3.Z);
    const down = new Vec3(0, -1, 0);
    for (const td of this.rig.tendrils) {
      let p = shape.point(td.at);
      const rest = body.basis.apply(td.dir).norm(Vec3.Y);
      const n = td.bones.length;
      for (let j = 0; j < n; j++) {
        const t = (j + 0.5) / n;
        const wave = Math.sin(TAU * (u * s.swayFreq - t * 0.7) + td.phase);
        const wave2 = Math.cos(TAU * (u * s.swayFreq - t * 0.7) + td.phase * 1.7);
        let d: Vec3;
        let len = td.seg * s.size;
        switch (td.kind) {
          case 'hang': {
            const g = clamp(0.35 + 0.65 * t + s.droop, 0, 1);
            d = rest.mul(1 - g).add(down.mul(g)).addScaled(fwd, -s.drag * t).addScaled(lat, s.sway * wave * t).addScaled(fwd, s.sway * 0.5 * wave2 * t);
            break;
          }
          case 'stalk':
            d = rest.add(up.mul(0.3 * t)).addScaled(lat, s.sway * 0.6 * wave * t).addScaled(fwd, s.sway * 0.4 * wave2 * t - s.drag * 0.5 * t).addScaled(down, s.droop * t * 1.5);
            break;
          case 'tail':
            d = rest.addScaled(fwd, -s.drag * t).addScaled(lat, s.sway * wave * (0.3 + t)).addScaled(down, s.droop * t);
            break;
          case 'flame':
            d = rest.add(new Vec3(0, 0.9 * t, 0)).addScaled(fwd, -s.drag * t).addScaled(lat, s.sway * wave * t);
            len *= s.flame * (0.85 + 0.25 * Math.sin(TAU * u * 2 + td.phase * 3));
            break;
          case 'arm': {
            const raised = fwd.mul(0.75).add(up.mul(0.9)).addScaled(lat, td.side * 0.35);
            d = rest.mul(1 - s.arms).add(raised.mul(s.arms)).addScaled(lat, td.side * s.sway * 0.3 * wave).addScaled(down, s.droop * 0.5);
            break;
          }
        }
        d = d.norm(down);
        const q = p.addScaled(d, len);
        const f = segmentFrame(p, q, Math.abs(d.y) > 0.9 ? fwd : up);
        pose.setWorld(td.bones[j], f);
        p = q;
      }
    }
    pose.solve();
    pose.blink = s.blink;
    pose.mouth = s.mouth;
    pose.mood = s.mood;
    pose.flash = s.flash;
    pose.shadow = s.shadow;
  }

  // ------------------------------------------------------------------------------------ helpers

  private bob(s: BState, u: number, amt = 1): void {
    const R = this.rig.dims.R;
    s.pos = s.pos.add(new Vec3(0, R * 0.12 * amt * Math.sin(TAU * u), 0));
    s.shadow = 1 - 0.08 * Math.sin(TAU * u);
  }

  private blinkAt(s: BState, u: number, at: number): void {
    if (u >= at && u < at + 0.125) s.blink = 1;
  }

  /** One hop: planted, crouch, launch, flight, landing. Ground-locked against the scrolling ground. */
  private hop(s: BState, u: number, stride: number, height: number): void {
    const t0 = 0.22, t1 = 0.72;
    const air = u > t0 && u < t1 ? (u - t0) / (t1 - t0) : -1;
    const X = air < 0 ? (u <= t0 ? 0 : stride) : stride * easeInOut(air);
    s.pos = new Vec3(X - stride * u, air < 0 ? 0 : height * Math.sin(PI * air), 0);
    s.squash = keyframes(u, [[0, 0.95], [0.16, 0.7], [0.24, 1.32], [0.4, 1.08], [0.62, 1.0], [0.72, 1.12], [0.8, 0.66], [0.9, 1.06], [1, 0.95]]);
    s.pitch = air < 0 ? 0 : 0.18 * Math.cos(PI * air);
    s.shadow = air < 0 ? 1 : 1 - 0.35 * Math.sin(PI * air);
    s.mouth = air > 0.2 && air < 0.8 ? 0.5 : 0;
    s.mood = air >= 0 ? 'happy' : 'neutral';
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: BState): void {
    const R = this.rig.dims.R;
    switch (this.rig.type) {
      case 'slime':
        s.squash = 1 + 0.06 * this.rig.traits.wobble * 2 * Math.sin(TAU * u * 2) - 0.02;
        s.roll = 0.04 * Math.sin(TAU * u);
        this.blinkAt(s, u, 0.625);
        break;
      case 'ghost':
        this.bob(s, u);
        s.arms = 0.15 + 0.1 * Math.sin(TAU * u);
        s.drag = 0.15;
        s.sway = 0.35;
        this.blinkAt(s, u, 0.5);
        break;
      case 'wisp':
        this.bob(s, u, 0.8);
        s.sway = 0.4;
        s.swayFreq = 2;
        s.flame = 1;
        this.blinkAt(s, u, 0.75);
        break;
      case 'eye':
        this.bob(s, u);
        s.lookYaw = keyframes(u, [[0, 0], [0.2, 0.45], [0.45, 0.45], [0.6, -0.4], [0.85, -0.4], [1, 0]]);
        s.lookPitch = -0.1;
        s.sway = 0.3;
        this.blinkAt(s, u, 0.5);
        break;
      case 'jelly': {
        const pulse = Math.sin(TAU * u);
        s.squash = 1 + 0.08 * pulse;
        s.pos = new Vec3(0, R * 0.15 * Math.sin(TAU * u - 1), 0);
        s.sway = 0.3;
        s.droop = 0.1 * pulse;
        break;
      }
    }
  }

  clip_walk(u: number, s: BState): void {
    const R = this.rig.dims.R;
    if (this.rig.type === 'slime') {
      this.hop(s, u, this.stride.walk, R * lerp(0.8, 1.4, this.rig.traits.bounce));
      return;
    }
    if (this.rig.type === 'jelly') {
      // contract, surge forward, glide
      const contract = keyframes(u, [[0, 0], [0.25, 1], [0.4, 0], [1, 0]]);
      const X = this.stride.walk * keyframes(u, [[0, 0], [0.25, 0.1], [0.5, 0.75], [1, 1]]);
      s.pos = new Vec3(X - this.stride.walk * u, R * 0.1 * Math.sin(TAU * u), 0);
      s.squash = 1 + 0.25 * contract;
      s.pitch = 0.5;
      s.drag = 0.5 + 0.5 * smoothstep(0.25, 0.5, u) * (1 - smoothstep(0.6, 1, u));
      s.sway = 0.15;
      return;
    }
    this.bob(s, u, 0.8);
    s.pitch = 0.15;
    s.drag = 0.55;
    s.sway = 0.3;
    s.arms = 0.25;
    s.lookPitch = -0.05;
    this.blinkAt(s, u, 0.75);
  }

  clip_run(u: number, s: BState): void {
    const R = this.rig.dims.R;
    if (this.rig.type === 'slime') {
      this.hop(s, u, this.stride.run, R * lerp(1.4, 2.2, this.rig.traits.bounce));
      return;
    }
    if (this.rig.type === 'jelly') {
      this.clip_walk(u, s);
      s.pos = s.pos.mul(this.stride.run / this.stride.walk);
      s.drag = 0.9;
      return;
    }
    this.bob(s, u * 2, 0.5);
    s.pitch = 0.35;
    s.drag = 1.1;
    s.sway = 0.2;
    s.swayFreq = 2;
    s.arms = 0.05;
    s.flame = 1.2;
    s.mood = 'focus';
  }

  clip_attack(u: number, s: BState): void {
    const R = this.rig.dims.R;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    const wind = k([[0, 0], [0.3, 1], [0.42, 0], [1, 0]]);
    const hit = k([[0, 0], [0.3, 0], [0.42, 1], [0.62, 1], [0.9, 0]]);
    s.mood = 'angry';
    switch (this.rig.type) {
      case 'slime': {
        const air = u > 0.3 && u < 0.55 ? Math.sin((PI * (u - 0.3)) / 0.25) : 0;
        s.pos = new Vec3(R * 1.6 * hit - R * 0.2 * wind, R * 1.2 * air, 0);
        s.squash = u < 0.3 ? 1 - 0.35 * wind : u < 0.55 ? 1.25 : k([[0.55, 0.55], [0.7, 0.75], [1, 1]]);
        s.spread = u >= 0.55 ? k([[0.55, 1.25], [0.75, 1.1], [1, 1]]) : 1;
        s.pitch = 0.3 * air;
        s.mouth = hit > 0.5 ? 1 : 0;
        s.shadow = 1 - 0.3 * air;
        break;
      }
      case 'ghost':
        s.pos = new Vec3(R * (1.4 * hit - 0.4 * wind), R * 0.3 * wind, 0);
        s.squash = 1 + 0.15 * wind - 0.1 * hit;
        s.arms = Math.max(wind, hit);
        s.pitch = -0.2 * wind + 0.3 * hit;
        s.mouth = hit > 0.3 ? 1 : 0;
        s.drag = 0.3 + 0.8 * hit;
        break;
      case 'wisp':
        s.flame = 1 + 1.2 * Math.max(wind * 0.5, hit);
        s.squash = 1 + 0.2 * hit;
        s.size = 1 + 0.15 * hit;
        s.pos = new Vec3(R * 0.8 * hit, 0, 0);
        s.drag = 0.2 + 0.6 * hit;
        s.sway = 0.5;
        s.swayFreq = 3;
        break;
      case 'eye':
        s.lid = 0.55 * wind;
        s.pos = new Vec3(-R * 0.2 * wind + R * 0.25 * hit, 0, 0);
        s.pitch = 0.1 * hit;
        s.beam = hit > 0.5;
        s.sway = 0.5 * hit;
        s.mouth = hit;
        break;
      case 'jelly':
        s.squash = 1 + 0.3 * wind - 0.2 * hit;
        s.pos = new Vec3(R * 0.6 * hit, R * 0.3 * wind, 0);
        s.drag = -1.4 * hit + 0.4 * wind;
        s.droop = -0.3 * hit;
        s.pitch = -0.2 * hit;
        break;
    }
  }

  clip_cast(u: number, s: BState): void {
    const R = this.rig.dims.R;
    const up = keyframes(u, [[0, 0], [0.3, 1], [0.75, 1], [1, 0]]);
    if (this.rig.type === 'slime') {
      // a happy jiggle
      s.squash = 1 + 0.25 * Math.sin(TAU * u * 3) * (1 - u);
      s.roll = 0.15 * Math.sin(TAU * u * 2) * (1 - u);
      s.mood = 'happy';
      s.mouth = u > 0.2 && u < 0.7 ? 0.5 : 0;
      return;
    }
    this.bob(s, u);
    s.pos = s.pos.add(new Vec3(0, R * 0.4 * up, 0));
    s.arms = up;
    s.flame = 1 + 0.6 * up;
    s.size = 1 + 0.08 * up;
    s.sway = 0.4 + 0.3 * up;
    s.swayFreq = 2;
    s.droop = -0.25 * up;
    s.lookPitch = 0.3 * up;
    s.mood = 'focus';
    s.mouth = up > 0.5 ? 0.5 : 0;
  }

  clip_hurt(u: number, s: BState): void {
    const R = this.rig.dims.R;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.45, 0.7], [1, 0]]);
    s.pos = new Vec3(-R * 0.5 * h, this.floats ? R * 0.15 * h : 0, 0);
    s.squash = 1 - 0.3 * h;
    s.pitch = -0.25 * h;
    s.flash = u < 0.2 ? 0.7 : 0;
    s.drag = -0.4 * h;
    s.arms = 0.6 * h;
    s.lid = 0.6 * h;
    s.flame = 1 - 0.4 * h;
    s.mouth = 0.6 * h;
    s.mood = 'pain';
  }

  clip_die(u: number, s: BState): void {
    const R = this.rig.dims.R, hover = this.rig.dims.hover;
    const k = (keys: [number, number][]) => keyframes(u, keys);
    s.mood = u > 0.4 ? 'dead' : 'pain';
    switch (this.rig.type) {
      case 'slime':
        s.squash = k([[0, 1], [0.15, 1.15], [0.6, 0.42], [1, 0.3]]);
        s.spread = k([[0, 1], [0.6, 1.1], [1, 1.2]]);
        s.roll = 0.15 * Math.sin(TAU * u * 1.5) * (1 - u);
        break;
      case 'ghost':
        s.pos = new Vec3(0, R * 2.5 * smoothstep(0.2, 1, u), 0);
        s.size = k([[0, 1], [0.3, 1.05], [1, 0.08]]);
        s.arms = 1 - u;
        s.squash = 1 + 0.4 * smoothstep(0.3, 1, u);
        s.droop = -0.4 * u;
        break;
      case 'wisp':
        s.flame = k([[0, 1], [0.2, 1.4], [0.8, 0.1], [1, 0]]);
        s.size = k([[0, 1], [0.5, 0.8], [1, 0.25]]);
        s.pos = new Vec3(0, -hover * 0.6 * smoothstep(0.3, 1, u), 0);
        s.shadow = 1 - u * 0.5;
        break;
      case 'eye': {
        const fall = k([[0.15, 0], [0.6, 1]]);
        s.pos = new Vec3(R * 0.2 * fall, -(hover - R) * fall, 0);
        s.roll = 1.2 * smoothstep(0.5, 0.9, u);
        s.squash = u > 0.6 ? k([[0.6, 0.85], [0.7, 1.05], [1, 0.95]]) : 1;
        s.lid = k([[0, 0], [0.3, 0.5], [0.8, 1]]);
        s.droop = 1;
        s.sway = 0.1 * (1 - u);
        break;
      }
      case 'jelly': {
        const sink = k([[0, 0], [0.8, 1]]);
        s.pos = new Vec3(0, -(hover - R * 0.5) * sink, 0);
        s.squash = lerp(1, 0.45, sink);
        s.spread = lerp(1, 1.3, sink);
        s.droop = -0.8 * sink;
        s.sway = 0.1;
        break;
      }
    }
  }

  clip_sleep(u: number, s: BState): void {
    const R = this.rig.dims.R, hover = this.rig.dims.hover;
    const b = Math.sin(TAU * u);
    s.blink = 1;
    s.lid = 1;
    switch (this.rig.type) {
      case 'slime':
        s.squash = 0.8 + 0.04 * b;
        s.spread = 1.08;
        break;
      case 'jelly':
        s.squash = 0.95 + 0.03 * b;
        s.pos = new Vec3(0, -(hover - R) * 0.6, 0);
        s.droop = 0.4;
        s.sway = 0.1;
        break;
      default:
        s.pos = new Vec3(0, -(hover - R) * (this.rig.type === 'eye' ? 0.8 : 0.4) + R * 0.06 * b, 0);
        s.flame = 0.6;
        s.droop = 0.6;
        s.sway = 0.1;
        s.pitch = 0.2;
        s.shadow = 1;
    }
  }
}
