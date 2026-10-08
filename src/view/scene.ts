// Renderer, camera, lights, environment and the post-processing chain.
// Chain: RenderPass (half-float, MSAA) -> UnrealBloomPass (High only) -> OutputPass (always: tone map + sRGB once).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PALETTE, QUALITY, type QualityLevel, type QualitySettings } from './quality';

export interface SafeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Frustum {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const ELEVATION = THREE.MathUtils.degToRad(57);
const AZIMUTH = THREE.MathUtils.degToRad(9);
const CAMERA_DISTANCE = 60;

export class SceneRig {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  readonly composer: EffectComposer;
  readonly bloom: UnrealBloomPass;
  readonly output: OutputPass;
  readonly sun: THREE.DirectionalLight;
  readonly hemi: THREE.HemisphereLight;
  quality: QualityLevel = 'high';
  settings: QualitySettings = QUALITY.high;
  reducedMotion = false;

  private envTarget: THREE.WebGLRenderTarget;
  private renderTarget: THREE.WebGLRenderTarget;
  private canvas: HTMLCanvasElement;
  private width = 1;
  private height = 1;
  private frustumFrom: Frustum = { left: -1, right: 1, top: 1, bottom: -1 };
  private frustumTo: Frustum = { left: -1, right: 1, top: 1, bottom: -1 };
  private frustumT = 1;
  private impulse = new THREE.Vector2();
  private impulseAge = 1;
  private impulseDuration = 0.12;
  private impulseStrength = 0;
  private fitPoints: THREE.Vector3[] = [];
  private fitInsets: SafeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
  private camRight = new THREE.Vector3();
  private camUp = new THREE.Vector3();
  private camPos = new THREE.Vector3();
  private baseLightIntensity = 2.1;
  private dimTarget = 1;
  private dim = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // WebGLRenderer in r186 requires WebGL2 and throws if it cannot create a context.
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', alpha: false });
    if (!this.renderer.capabilities.isWebGL2) throw new Error('WebGL2 unavailable');
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // soft-filtered PCF in r186; PCFSoftShadowMap is removed
    this.renderer.setClearColor(PALETTE.void, 1);
    this.renderer.info.autoReset = false; // count every pass of a composed frame

    this.scene.background = new THREE.Color(PALETTE.void);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTarget = pmrem.fromScene(room, 0.04);
    room.dispose();
    pmrem.dispose();
    this.scene.environment = this.envTarget.texture;
    this.scene.environmentIntensity = 0.32;

    this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 140);
    const dir = new THREE.Vector3(Math.sin(AZIMUTH) * Math.cos(ELEVATION), Math.sin(ELEVATION), Math.cos(AZIMUTH) * Math.cos(ELEVATION));
    this.camera.position.copy(dir.multiplyScalar(CAMERA_DISTANCE));
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.camRight.setFromMatrixColumn(this.camera.matrixWorld, 0);
    this.camUp.setFromMatrixColumn(this.camera.matrixWorld, 1);
    this.camPos.copy(this.camera.position);

    this.hemi = new THREE.HemisphereLight(0x8fa3c8, 0x2a1f18, 0.55);
    this.scene.add(this.hemi);

    this.sun = new THREE.DirectionalLight(0xfff1dc, this.baseLightIntensity);
    this.sun.position.set(-7, 16, 9);
    this.sun.target.position.set(0, 0, 0);
    this.sun.castShadow = true;
    const sc = this.sun.shadow.camera;
    sc.left = -7.5;
    sc.right = 7.5;
    sc.top = 7.5;
    sc.bottom = -7.5;
    sc.near = 4;
    sc.far = 40;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.025;
    this.sun.shadow.radius = 3;
    this.scene.add(this.sun, this.sun.target);

    const rim = new THREE.DirectionalLight(0x6fb8d6, 0.5);
    rim.position.set(8, 6, -12);
    this.scene.add(rim);

    this.renderTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    this.renderTarget.texture.name = 'palimpsest.hdr';
    this.composer = new EffectComposer(this.renderer, this.renderTarget);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.42, 0.38, 1.05);
    this.composer.addPass(this.bloom);
    this.output = new OutputPass();
    this.composer.addPass(this.output);

    this.applyQuality('high');
  }

  applyQuality(level: QualityLevel): void {
    this.quality = level;
    this.settings = QUALITY[level];
    this.bloom.enabled = this.settings.bloom;
    this.bloom.strength = this.settings.bloomStrength;
    const shadowSize = this.settings.shadowMapSize;
    if (this.sun.shadow.mapSize.x !== shadowSize) {
      this.sun.shadow.mapSize.set(shadowSize, shadowSize);
      this.sun.shadow.map?.dispose();
      this.sun.shadow.map = null;
    }
    for (const rt of [this.composer.renderTarget1, this.composer.renderTarget2]) {
      if (rt.samples !== this.settings.msaaSamples) {
        rt.samples = this.settings.msaaSamples;
        rt.dispose(); // reallocated with the new sample count on next use
      }
    }
    this.resize();
  }

  pixelRatio(): number {
    return Math.min(window.devicePixelRatio || 1, this.settings.maxPixelRatio);
  }

  /** Resize renderer, composer and camera together from the actual canvas size and current DPR. */
  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));
    const dpr = this.pixelRatio();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(this.width, this.height);
    this.refit(true);
  }

  get viewport() {
    return { width: this.width, height: this.height };
  }

  /** Fit the given world points into the viewport's safe area. `snap` skips the transition. */
  setFit(points: THREE.Vector3[], insets: SafeInsets, snap = false, ): void {
    this.fitPoints = points;
    this.fitInsets = insets;
    this.refit(snap);
  }

  private computeFrustum(): Frustum {
    const pts = this.fitPoints;
    if (pts.length === 0) return { left: -10, right: 10, top: 10, bottom: -10 };
    let minR = Infinity;
    let maxR = -Infinity;
    let minU = Infinity;
    let maxU = -Infinity;
    const tmp = new THREE.Vector3();
    for (const p of pts) {
      tmp.copy(p).sub(this.camPos);
      const r = tmp.dot(this.camRight);
      const u = tmp.dot(this.camUp);
      minR = Math.min(minR, r);
      maxR = Math.max(maxR, r);
      minU = Math.min(minU, u);
      maxU = Math.max(maxU, u);
    }
    const ins = this.fitInsets;
    const pad = 12;
    const safeW = Math.max(50, this.width - ins.left - ins.right - pad * 2);
    const safeH = Math.max(50, this.height - ins.top - ins.bottom - pad * 2);
    const s = Math.min(safeW / (maxR - minR), safeH / (maxU - minU)); // px per world unit
    const safeCx = ins.left + pad + safeW / 2;
    const safeCy = ins.top + pad + safeH / 2;
    const midR = (minR + maxR) / 2;
    const midU = (minU + maxU) / 2;
    const left = midR - safeCx / s;
    const top = midU + safeCy / s;
    return { left, right: left + this.width / s, top, bottom: top - this.height / s };
  }

  private refit(snap: boolean): void {
    const next = this.computeFrustum();
    if (snap) {
      this.frustumFrom = next;
      this.frustumTo = next;
      this.frustumT = 1;
    } else {
      this.frustumFrom = this.currentFrustum();
      this.frustumTo = next;
      this.frustumT = 0;
    }
    this.applyFrustum();
  }

  private currentFrustum(): Frustum {
    const k = easeInOut(this.frustumT);
    const a = this.frustumFrom;
    const b = this.frustumTo;
    return {
      left: a.left + (b.left - a.left) * k,
      right: a.right + (b.right - a.right) * k,
      top: a.top + (b.top - a.top) * k,
      bottom: a.bottom + (b.bottom - a.bottom) * k,
    };
  }

  private applyFrustum(): void {
    const f = this.currentFrustum();
    let ox = 0;
    let oy = 0;
    if (this.impulseAge < this.impulseDuration && !this.reducedMotion) {
      const k = 1 - this.impulseAge / this.impulseDuration;
      const w = Math.sin(this.impulseAge * 90) * k * k * this.impulseStrength;
      ox = this.impulse.x * w;
      oy = this.impulse.y * w;
    }
    this.camera.left = f.left + ox;
    this.camera.right = f.right + ox;
    this.camera.top = f.top + oy;
    this.camera.bottom = f.bottom + oy;
    this.camera.updateProjectionMatrix();
  }

  /** Tiny 80–140 ms camera impulse for strong hits (disabled for reduced motion). */
  kick(strength: number, durationMs = 110): void {
    if (this.reducedMotion) return;
    const a = Math.random() * Math.PI * 2;
    this.impulse.set(Math.cos(a), Math.sin(a));
    this.impulseStrength = Math.max(this.impulseAge < this.impulseDuration ? this.impulseStrength : 0, strength);
    this.impulseDuration = THREE.MathUtils.clamp(durationMs, 80, 140) / 1000;
    this.impulseAge = 0;
  }

  setDim(target: number): void {
    this.dimTarget = target;
  }

  update(presentDt: number): void {
    if (this.frustumT < 1) this.frustumT = Math.min(1, this.frustumT + presentDt / 0.55);
    this.impulseAge += presentDt;
    this.applyFrustum();
    this.dim += (this.dimTarget - this.dim) * (1 - Math.exp(-presentDt * 5));
    this.sun.intensity = this.baseLightIntensity * this.dim;
    this.hemi.intensity = 0.55 * (0.7 + 0.3 * this.dim);
  }

  render(): void {
    this.composer.render();
  }

  /** World -> CSS pixel coordinates in the canvas. */
  project(p: THREE.Vector3): { x: number; y: number } {
    const v = p.clone().project(this.camera);
    return { x: (v.x * 0.5 + 0.5) * this.width, y: (-v.y * 0.5 + 0.5) * this.height };
  }

  dispose(): void {
    this.composer.dispose();
    this.renderTarget.dispose();
    this.envTarget.dispose();
    this.bloom.dispose();
    this.output.dispose();
    this.sun.shadow.map?.dispose();
    this.renderer.dispose();
  }
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
