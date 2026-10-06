/**
 * Procedural animation for limbless bodies: snakes and giant worms.
 *
 * The body is a chain of equal segments. Each pose gives every segment a heading (yaw) and an
 * elevation; joint positions are integrated from the tail tip forwards, so segments never stretch.
 * Slithering uses the serpenoid curve (heading = α·sin 2π(s/λ − t)): the wave runs down the body
 * while the body slides along a path that stays fixed on the ground, one wavelength per loop. The
 * clip's ground speed is that wavelength measured along the ground, so nothing slips.
 */

import type { SkeletonPose } from '../anatomy/pose';
import { Mat3, PI, TAU, Vec3, Xform, keyframes, lerp, segmentFrame, smoothstep } from '../core/math';
import type { Animator, ClipDef } from '../model/types';

export interface SerpentRig {
  kind: 'serpent';
  bones: { body: number[]; head: number; jaw: number; tongue: number; hood: number; maw: number };
  groups: { tongue: number; fangs: number };
  dims: {
    /** Segment count, segment length, body length (without the head), thickest radius. */
    N: number;
    seg: number;
    L: number;
    R: number;
    /** Body radius at each joint (N + 1, head end first). */
    radii: number[];
    headLen: number;
    tongueLen: number;
    /** Body waves while slithering (an integer keeps the body's heading steady). */
    waves: number;
  };
  traits: { energy: number; amplitude: number; hood: boolean; rattle: boolean; worm: boolean; venomous: boolean };
}

interface SState {
  /** Heading of each segment (0 = forward, + turns left in creature space). */
  yaw: number[];
  /** Elevation of each segment (+ rises towards the head). */
  elev: number[];
  /** Extra height of each joint above the ground (humps). */
  lift: number[];
  /** Roll about the body axis (π = belly up). */
  roll: number;
  /** 'centroid' keeps the body's centre still (locomotion); 'tail' plants the rest pose's tail. */
  anchor: 'centroid' | 'tail';
  shift: Vec3;
  headYaw: number;
  /** Absolute head pitch (+ = nose up). */
  headPitch: number;
  jaw: number;
  tongue: number;
  flick: number;
  hood: number;
  maw: number;
  mood: SkeletonPose['mood'];
  shadow: number;
}

export class SerpentAnimator implements Animator {
  readonly clips: ClipDef[];
  private readonly baseYaw: number[];
  private readonly tailRef: Vec3;
  private readonly strides: Record<'walk' | 'run', number>;

  constructor(readonly rig: SerpentRig) {
    const { N } = rig.dims;
    const t = rig.traits;
    // resting shape: one lazy S
    const raw = Array.from({ length: N }, (_, i) => 0.62 * Math.sin(TAU * ((i + 0.5) / N) + 0.7) * smoothstep(-0.2, 0.25, (i + 0.5) / N));
    const mean = raw.reduce((a, b) => a + b, 0) / N;
    this.baseYaw = raw.map((y) => y - mean);
    // where the tail tip sits when the resting shape is centred on the origin
    const rest = this.integrate(this.baseYaw, new Array(N).fill(0));
    let cx = 0, cz = 0;
    for (let i = 0; i <= N; i++) {
      cx += rest.x[i];
      cz += rest.z[i];
    }
    this.tailRef = new Vec3(-cx / (N + 1), 0, -cz / (N + 1));
    this.strides = { walk: this.stride(t.amplitude), run: this.stride(t.amplitude * 1.25) };
    const def = (id: string, label: string, frames: number, fps: number, loop: boolean, stride = 0): ClipDef =>
      ({ id, label, frames, fps, loop, speed: stride ? Math.round((stride / (frames / fps)) * 10) / 10 : 0 });
    const fast = lerp(0.85, 1.15, t.energy);
    this.clips = [
      def('idle', 'Idle', 8, 6, true),
      def('walk', t.worm ? 'Crawl' : 'Slither', 8, Math.round(8 * fast), true, this.strides.walk),
      def('run', t.worm ? 'Fast crawl' : 'Fast slither', 8, Math.round(13 * fast), true, this.strides.run),
      def('attack', t.worm ? 'Lunge' : 'Strike', 9, 12, false),
      def('rear', t.hood ? 'Spread hood' : t.rattle ? 'Rattle' : t.worm ? 'Rear up' : 'Hiss', 8, 8, true),
      def('coil', t.worm ? 'Rest' : 'Coil up', 4, 3, true),
      def('hurt', 'Hurt', 6, 12, false),
      def('die', 'Die', 10, 10, false),
    ];
  }

  pose(clip: string, u: number, pose: SkeletonPose): void {
    const s = this.neutral();
    const fn = (this as unknown as Record<string, (u: number, s: SState) => void>)['clip_' + clip];
    (fn ?? this.clip_idle).call(this, u, s);
    this.apply(s, pose);
  }

  private neutral(): SState {
    const { N } = this.rig.dims;
    return {
      yaw: this.baseYaw.slice(), elev: new Array(N).fill(0), lift: new Array(N + 1).fill(0), roll: 0, anchor: 'tail', shift: Vec3.ZERO,
      headYaw: 0, headPitch: 0, jaw: 0, tongue: 0, flick: 0, hood: 0, maw: 0, mood: 'neutral', shadow: 1,
    };
  }

  // ------------------------------------------------------------------------------------ chain

  /** Joint positions relative to the tail tip (x, z) and heights from the elevations. */
  private integrate(yaw: number[], elev: number[]): { x: number[]; z: number[]; h: number[] } {
    const { N, seg } = this.rig.dims;
    const x = new Array(N + 1).fill(0), z = new Array(N + 1).fill(0), h = new Array(N + 1).fill(0);
    for (let i = N - 1; i >= 0; i--) {
      const c = Math.cos(elev[i]) * seg;
      x[i] = x[i + 1] + c * Math.cos(yaw[i]);
      z[i] = z[i + 1] - c * Math.sin(yaw[i]);
      h[i] = h[i + 1] + seg * Math.sin(elev[i]);
    }
    return { x, z, h };
  }

  /** Ground distance covered by one slither loop at a given wave amplitude. */
  private stride(amp: number): number {
    const { N, seg, waves } = this.rig.dims;
    let c = 0;
    const n = 64;
    for (let k = 0; k < n; k++) c += Math.cos(amp * Math.sin((TAU * k) / n));
    return (c / n) * seg * (N / waves);
  }

  private apply(s: SState, pose: SkeletonPose): void {
    pose.reset();
    const { N, radii } = this.rig.dims;
    const B = this.rig.bones;
    const c = this.integrate(s.yaw, s.elev);
    let ax = this.tailRef.x, az = this.tailRef.z;
    if (s.anchor === 'centroid') {
      ax = 0;
      az = 0;
      for (let i = 0; i <= N; i++) {
        ax -= c.x[i] / (N + 1);
        az -= c.z[i] / (N + 1);
      }
    }
    const P: Vec3[] = [];
    for (let i = 0; i <= N; i++) P.push(new Vec3(c.x[i] + ax + s.shift.x, radii[i] + Math.max(0, c.h[i] + s.lift[i]) + s.shift.y, c.z[i] + az + s.shift.z));
    const roll = Mat3.rotX(s.roll);
    for (let i = 0; i < N; i++) {
      // the back faces "up" relative to the segment's own slope
      const e = s.elev[i], y = s.yaw[i];
      const up = new Vec3(-Math.sin(e) * Math.cos(y), Math.cos(e), Math.sin(e) * Math.sin(y));
      const f = segmentFrame(P[i], P[i + 1], up);
      pose.setWorld(B.body[i], new Xform(f.basis.mul(roll), f.origin));
    }
    const hy = s.yaw[0] + s.headYaw;
    pose.setWorld(B.head, new Xform(Mat3.rotY(hy).mul(Mat3.rotZ(s.headPitch)).mul(Mat3.rotX(s.roll)), P[0]));
    if (B.jaw >= 0) pose.rotate(B.jaw, Mat3.rotZ(-s.jaw * 1.15));
    if (B.tongue >= 0) {
      const tl = this.rig.dims.tongueLen;
      pose.translate(B.tongue, new Vec3(lerp(-0.6, 0.45, s.tongue) * tl, 0, 0));
      pose.rotate(B.tongue, Mat3.rotZ(s.flick * 0.35));
      if (s.tongue < 0.15) pose.hide.add(this.rig.groups.tongue);
    }
    if (B.hood >= 0) {
      const l = pose.local[B.hood];
      pose.setLocal(B.hood, new Xform(Mat3.scale(1, 1, lerp(0.75, 2.7, s.hood)), l.origin));
    }
    if (B.maw >= 0) {
      const l = pose.local[B.maw];
      const k = lerp(0.5, 1.2, s.maw);
      pose.setLocal(B.maw, new Xform(Mat3.scale(1, k, k), l.origin));
    } else if (s.jaw < 0.3 && this.rig.groups.fangs >= 0) pose.hide.add(this.rig.groups.fangs);
    pose.solve();
    pose.blink = 0;
    pose.mouth = s.jaw;
    pose.mood = s.mood;
    pose.shadow = s.shadow;
  }

  // ------------------------------------------------------------------------------------ helpers

  private tongueFlick(s: SState, u: number, at: number, len = 0.3): void {
    const t = (u - at) / len;
    if (t < 0 || t > 1) return;
    s.tongue = Math.sin(PI * Math.min(1, t * 1.3)) > 0.2 ? 1 : 0.5;
    s.flick = Math.sin(TAU * t * 2.5);
  }

  /** Raises the front `k` segments into a rearing column with a level head on top. */
  private rear(s: SState, k: number, amount: number): void {
    for (let i = 0; i < k; i++) {
      const j = i / Math.max(1, k - 1); // 0 at the head … 1 at the base
      const e = 0.2 + 1.3 * smoothstep(0, 0.3, j) - 0.85 * smoothstep(0.55, 1, j);
      s.elev[i] = e * amount;
      s.yaw[i] *= 1 - amount;
    }
    s.headPitch = -0.12 * amount;
  }

  /** Lateral serpenoid wave travelling down the body. */
  private slither(s: SState, u: number, amp: number): void {
    const { N, waves } = this.rig.dims;
    let mean = 0;
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) / N;
      s.yaw[i] = amp * (0.5 + 0.5 * smoothstep(0, 0.3, t)) * Math.sin(TAU * (t * waves - u));
      mean += s.yaw[i] / N;
    }
    for (let i = 0; i < N; i++) s.yaw[i] -= mean;
    s.anchor = 'centroid';
    s.elev[0] = 0.28;
    s.elev[1] = 0.1;
    s.headPitch = -0.12;
    s.headYaw = -0.55 * s.yaw[0];
  }

  // ------------------------------------------------------------------------------------ clips

  clip_idle(u: number, s: SState): void {
    const sway = Math.sin(TAU * u);
    s.elev[0] = 0.4;
    s.elev[1] = 0.25;
    s.elev[2] = 0.08;
    s.yaw[0] += 0.14 * sway;
    s.yaw[1] += 0.07 * sway;
    s.headPitch = -0.1;
    s.headYaw = 0.2 * Math.sin(TAU * u + 0.8);
    if (this.rig.traits.worm) {
      s.maw = 0.25 + 0.2 * Math.max(0, Math.sin(TAU * u));
      s.lift[1] = this.rig.dims.R * 0.2 * (1 + sway);
    } else this.tongueFlick(s, u, 0.25, 0.4);
    if (this.rig.traits.hood) s.hood = 0.05;
  }

  clip_walk(u: number, s: SState): void {
    this.slither(s, u, this.rig.traits.amplitude);
    if (this.rig.traits.worm) this.humps(s, u);
    else this.tongueFlick(s, u, 0.5, 0.3);
  }

  clip_run(u: number, s: SState): void {
    this.slither(s, u, this.rig.traits.amplitude * 1.25);
    s.elev[0] = 0.18;
    s.elev[1] = 0.05;
    s.headPitch = -0.05;
    if (this.rig.traits.worm) this.humps(s, u);
  }

  /** Giant worms also ripple up and down. */
  private humps(s: SState, u: number): void {
    const { N, R, waves } = this.rig.dims;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const w = Math.max(0, Math.sin(TAU * (t * waves * 1.5 - u)));
      s.lift[i] += R * 0.7 * w * w * smoothstep(0, 0.15, t) * (1 - smoothstep(0.85, 1, t));
    }
    s.maw = 0.3;
  }

  clip_attack(u: number, s: SState): void {
    const { N, seg } = this.rig.dims;
    const k = Math.max(3, Math.round(N * 0.35));
    const coil = keyframes(u, [[0, 0], [0.3, 1], [0.42, 0], [1, 0]]);
    const lunge = keyframes(u, [[0, 0], [0.3, 0], [0.42, 1], [0.62, 1], [0.9, 0]]);
    for (let i = 0; i < k; i++) {
      const j = i / k; // 0 at the head
      // drawn back into a tight S, then straightened in one snap
      s.yaw[i] = s.yaw[i] * (1 - coil - lunge) + coil * 1.0 * Math.sin(TAU * j * 1.1);
      s.elev[i] = (0.25 * (1 - j) + 0.45 * coil * (1 - j)) * (1 - lunge) + lunge * 0.18 * (1 - j);
    }
    s.shift = new Vec3(seg * 1.2 * lunge - seg * 0.4 * coil, 0, 0);
    s.headPitch = 0.12 * coil - 0.15 * lunge;
    s.headYaw = -0.5 * s.yaw[0] * coil;
    if (this.rig.traits.worm) s.maw = Math.max(0.3 + 0.3 * coil, lunge);
    else s.jaw = Math.max(0.25 * coil, lunge * (u < 0.7 ? 1 : 0.3));
    s.hood = this.rig.traits.hood ? Math.max(coil, lunge) : 0;
    s.mood = 'angry';
  }

  clip_rear(u: number, s: SState): void {
    const { N } = this.rig.dims;
    const t = this.rig.traits;
    const k = Math.max(3, Math.round(N * (t.worm ? 0.42 : t.hood ? 0.4 : 0.33)));
    this.rear(s, k, 1);
    const sway = Math.sin(TAU * u);
    for (let i = 0; i < k + 2; i++) s.yaw[i] += 0.12 * sway;
    s.headYaw = 0.15 * Math.sin(TAU * u + 1);
    if (t.hood) s.hood = 0.92 + 0.08 * sway;
    if (t.worm) s.maw = 0.6 + 0.4 * Math.max(0, Math.sin(TAU * u * 2));
    else {
      s.jaw = u >= 0.5 && u < 0.875 ? 0.45 : 0;
      if (s.jaw === 0) this.tongueFlick(s, u, 0.1, 0.35);
    }
    if (t.rattle) {
      // tail tip raised and buzzing
      s.elev[N - 1] = -0.9;
      s.elev[N - 2] = -0.35;
      s.yaw[N - 1] += (Math.round(u * 8) % 2 ? 0.4 : -0.4);
      s.lift[N] = this.rig.dims.R * 2.2;
      s.lift[N - 1] = this.rig.dims.R * 1.1;
    }
    s.mood = 'angry';
  }

  clip_coil(u: number, s: SState): void {
    const { N, seg, R } = this.rig.dims;
    const worm = this.rig.traits.worm;
    // flat spiral from the head (inside) outwards; turns lie side by side
    let rho = R * (worm ? 3.2 : 2.3), a = 0.9;
    const gap = R * 2.05 / TAU;
    for (let i = 0; i < N; i++) {
      s.yaw[i] = a;
      const da = seg / rho;
      a -= da;
      rho += gap * da;
    }
    s.anchor = 'centroid';
    if (!worm) {
      // head resting on top of the coil
      s.elev[0] = -0.35;
      s.elev[1] = 0.25;
      s.elev[2] = 0.55;
      s.elev[3] = 0.25;
      s.headPitch = -0.05;
      s.headYaw = 0.5;
    }
    const breathe = Math.sin(TAU * u);
    s.lift[2] = R * 0.1 * breathe;
    if (worm) s.maw = 0.2;
    else this.tongueFlick(s, u, 0.5, 0.25);
    s.mood = 'neutral';
  }

  clip_hurt(u: number, s: SState): void {
    const { seg } = this.rig.dims;
    const h = keyframes(u, [[0, 0], [0.15, 1], [0.45, 0.7], [1, 0]]);
    s.elev[0] = 0.4 + 0.5 * h;
    s.elev[1] = 0.25 + 0.4 * h;
    s.elev[2] = 0.08 + 0.2 * h;
    s.yaw[0] += 0.6 * h;
    s.yaw[1] -= 0.4 * h;
    s.yaw[2] += 0.2 * h;
    s.shift = new Vec3(-seg * 0.6 * h, 0, 0);
    s.headPitch = 0.3 * h;
    s.headYaw = -0.4 * h;
    if (this.rig.traits.worm) s.maw = 0.4 + 0.6 * h;
    else s.jaw = 0.6 * h;
    s.mood = 'pain';
  }

  clip_die(u: number, s: SState): void {
    const { N } = this.rig.dims;
    const writhe = keyframes(u, [[0, 0], [0.15, 1], [0.5, 0.7], [0.8, 0]]);
    const flip = keyframes(u, [[0.25, 0], [0.65, 1.05], [0.8, 0.97], [1, 1]]);
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) / N;
      s.yaw[i] = s.yaw[i] * (1 - 0.4 * flip) + writhe * 0.7 * Math.sin(TAU * (t * 1.5 + u * 2));
    }
    s.elev[0] = 0.5 * writhe;
    s.elev[1] = 0.3 * writhe;
    s.roll = flip * PI;
    s.headPitch = 0.4 * writhe;
    s.headYaw = 0.3 * writhe;
    if (this.rig.traits.worm) s.maw = 0.4 + 0.5 * writhe;
    else {
      s.jaw = 0.5 * writhe + 0.35 * flip;
      s.tongue = flip > 0.8 ? 0.55 : 0;
    }
    s.mood = flip > 0.5 ? 'dead' : 'pain';
  }
}
