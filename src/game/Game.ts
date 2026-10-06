import * as THREE from 'three';
import { PostFX } from '../engine/render/PostFX';
import { Input } from '../engine/core/Input';
import { updateGlobals } from '../engine/render/globals';
import { UI } from './ui/UI';
import { Overworld } from './overworld/Overworld';
import type { GameScene, SceneEvent } from './SceneTypes';

type Transition = { t: number; dur: number; mode: 0 | 1; swapAt: number; swap: () => void; swapped: boolean };

/**
 * Owns the renderer, the post stack, input and the main loop, and switches between the overworld and
 * battles with a transition (a fade, or the swirling battle intro).
 */
export class Game {
  readonly renderer: THREE.WebGLRenderer;
  readonly post: PostFX;
  readonly input = new Input();
  readonly ui: UI;
  readonly overworld: Overworld;
  active: GameScene;
  private battle: GameScene | null = null;
  private time = 0;
  private last = performance.now();
  private transition: Transition | null = null;
  private fps = 60;

  constructor(root: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping;
    root.appendChild(this.renderer.domElement);
    this.post = new PostFX(this.renderer);
    this.ui = new UI(root);
    this.overworld = new Overworld(this.ui);
    this.active = this.overworld;
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.exposeHooks();
  }

  start(): void {
    this.active.enter();
    const q = new URLSearchParams(location.search);
    if (q.get('time')) this.overworld.lighting.setPreset(q.get('time')!, 0);
    const nofade = q.has('nofade');
    if (q.get('scene') === 'battle') this.startBattle('bandits', true);
    else if (!nofade) this.ui.showBanner('Brightwater', 'The Riverside Town');
    if (!nofade) {
      this.post.transition = 1;
      this.transition = { t: 0, dur: 1.2, mode: 0, swapAt: 0, swap: () => {}, swapped: true };
    }
    const loop = () => {
      requestAnimationFrame(loop);
      this.frame();
    };
    loop();
    (window as unknown as { __ready: boolean }).__ready = true;
  }

  private resize(): void {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    const pr = this.renderer.getPixelRatio();
    this.post.setSize(w * pr, h * pr);
    for (const s of [this.overworld, this.battle]) {
      if (!s) continue;
      s.camera.aspect = w / h;
      s.camera.updateProjectionMatrix();
    }
  }

  private frame(): void {
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;
    this.fps += (1 / Math.max(dt, 1e-3) - this.fps) * 0.05;
    this.input.poll();

    // during a transition the scene still renders but its clock is frozen
    const busy = this.transition !== null;
    const ev: SceneEvent | null = this.active.update(busy ? 0 : dt, this.time, this.input);
    if (ev && !busy) this.handle(ev);

    if (this.transition) this.stepTransition(dt);
    updateGlobals(this.time, this.active.camera);
    this.active.dof(this.post);
    this.post.render(this.active.scene, this.active.camera, this.time, this.active.overlay);
    this.input.endFrame();
  }

  private handle(ev: SceneEvent): void {
    if (ev.type === 'battle') this.startBattle(ev.encounter);
    else if (ev.type === 'leaveBattle') this.endBattle();
  }

  private startBattle(encounter: string, instant = false): void {
    const go = async () => {
      const { Battle } = await import('./battle/Battle');
      const b = new Battle(this.ui, this.overworld.lighting.presetName, encounter);
      this.battle = b;
      this.resize();
      this.active.exit();
      this.active = b;
      b.enter();
    };
    if (instant) { void go(); return; }
    this.transition = { t: 0, dur: 1.6, mode: 1, swapAt: 0.62, swap: () => void go(), swapped: false };
  }

  private endBattle(): void {
    this.transition = {
      t: 0, dur: 1.3, mode: 0, swapAt: 0.5, swapped: false,
      swap: () => {
        this.active.exit();
        this.active = this.overworld;
        this.battle = null;
        this.overworld.enter();
      },
    };
  }

  private stepTransition(dt: number): void {
    const tr = this.transition!;
    tr.t += dt / tr.dur;
    this.post.transitionMode = tr.mode;
    if (!tr.swapped && tr.t >= tr.swapAt) {
      tr.swapped = true;
      tr.swap();
    }
    // 0 → 1 until the swap, then back to 0 (fade in from the new scene)
    const k = tr.swapAt > 0 ? (tr.t < tr.swapAt ? tr.t / tr.swapAt : 1 - (tr.t - tr.swapAt) / (1 - tr.swapAt)) : 1 - tr.t;
    this.post.transition = THREE.MathUtils.clamp(k, 0, 1);
    if (tr.t >= 1) {
      this.post.transition = 0;
      this.transition = null;
    }
  }

  /** Automation hooks for headless checks and debugging (window.__game). */
  private exposeHooks(): void {
    const g = this;
    (window as unknown as { __game: unknown }).__game = {
      game: g,
      get fps() { return g.fps; },
      teleport: (x: number, z: number) => { g.overworld.player.place(x, z); },
      setTime: (p: string) => g.overworld.lighting.setPreset(p, 0),
      startBattle: () => g.startBattle('bandits'),
      info: () => g.renderer.info.render,
      get battle() { return g.active !== g.overworld ? g.active : null; },
    };
  }
}
