// Renderer, camera, lights, environment and the post-processing chain.
// Chain: RenderPass world (half-float, MSAA) -> RenderPass hand overlay (depth cleared, so nothing in
// the world can cover the cards) -> UnrealBloomPass (High only) -> OutputPass (tone map + sRGB once)
// -> StylizePass (display-space print finish: soft posterize, ordered dither, grain, vignette).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
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

const ELEVATION = THREE.MathUtils.degToRad(58);
const AZIMUTH = 0; // square to the screen: no dutch angle
const CAMERA_DISTANCE = 90;
const MAX_ZOOM = 3.2;

/** Display-space stylization: gives the render a printed, gritty finish (Inscryption-like). */
const StylizeShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uStrength: { value: 1 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uStrength;
    varying vec2 vUv;
    float bayer(vec2 p) {
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int i = x + y * 4;
      float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
      return m[i] / 16.0 - 0.5;
    }
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec2 c = vUv - 0.5;
      float ca = 0.0012 * uStrength * dot(c, c) * 4.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ca).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ca).b;
      // gritty afterlife grade: slightly desaturated, warm shadows
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, vec3(l), 0.18 * uStrength);
      col *= mix(vec3(1.0), vec3(1.04, 0.98, 0.9), uStrength);
      // soft posterize with ordered dither (printed look)
      float levels = 28.0;
      vec2 px = vUv * uResolution;
      col = floor(col * levels + 0.5 + bayer(px) * 0.9 * uStrength) / levels;
      // film grain + vignette
      col += (hash(px + uTime * 61.0) - 0.5) * 0.045 * uStrength;
      float v = smoothstep(0.95, 0.3, length(c * vec2(1.0, 1.15)));
      col *= mix(1.0, 0.55 + 0.45 * v, uStrength);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`,
};

export class SceneRig {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  readonly composer: EffectComposer;
  readonly bloom: UnrealBloomPass;
  readonly output: OutputPass;
  readonly stylize: ShaderPass;
  private handPass: RenderPass | null = null;
  private zoom = 1;
  private pan = new THREE.Vector2();
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
  private baseLightIntensity = 1.5;
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
    this.scene.environmentIntensity = 0.18;

    this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 220);
    const dir = new THREE.Vector3(Math.sin(AZIMUTH) * Math.cos(ELEVATION), Math.sin(ELEVATION), Math.cos(AZIMUTH) * Math.cos(ELEVATION));
    this.camera.position.copy(dir.multiplyScalar(CAMERA_DISTANCE));
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.camRight.setFromMatrixColumn(this.camera.matrixWorld, 0);
    this.camUp.setFromMatrixColumn(this.camera.matrixWorld, 1);
    this.camPos.copy(this.camera.position);

    // candle-lit tabletop: warm key, dim cool fill, deep falloff toward the table edges
    this.hemi = new THREE.HemisphereLight(0x7a86a2, 0x2a1a10, 0.6);
    this.scene.add(this.hemi);

    this.sun = new THREE.DirectionalLight(0xffd9a8, this.baseLightIntensity);
    this.sun.position.set(-8, 18, 7);
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

    const rim = new THREE.DirectionalLight(0x6f8fb6, 0.35);
    rim.position.set(10, 8, -14);
    this.scene.add(rim);
    // warm pool of light over the arena, falling off toward the table edges
    const pool = new THREE.SpotLight(0xffc98a, 1100, 140, 0.74, 0.65, 1.3);
    pool.position.set(0, 60, 8);
    pool.target.position.set(0, 0, 0);
    this.scene.add(pool, pool.target);

    this.renderTarget = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    this.renderTarget.texture.name = 'palimpsest.hdr';
    this.composer = new EffectComposer(this.renderer, this.renderTarget);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.3, 0.28, 1.1);
    this.composer.addPass(this.bloom);
    this.output = new OutputPass();
    this.composer.addPass(this.output);
    this.stylize = new ShaderPass(StylizeShader);
    this.composer.addPass(this.stylize);

    this.applyQuality('high');
  }

  /** Render the hand overlay scene after the world, with depth cleared, before bloom/output. */
  setHandOverlay(scene: THREE.Scene, camera: THREE.Camera): void {
    const pass = new RenderPass(scene, camera);
    pass.clear = false;
    pass.clearDepth = true;
    this.composer.insertPass(pass, 1);
    this.handPass = pass;
  }

  applyQuality(level: QualityLevel): void {
    this.quality = level;
    this.settings = QUALITY[level];
    this.bloom.enabled = this.settings.bloom;
    this.bloom.strength = this.settings.bloomStrength;
    this.stylize.uniforms.uStrength.value = level === 'high' ? 1 : 0.6;
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
    this.stylize.uniforms.uResolution.value.set(this.width * dpr, this.height * dpr);
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

  /** Player zoom toward a screen point (CSS px). Never changed automatically. */
  zoomAt(px: number, py: number, factor: number): void {
    const f = this.currentFrustum();
    const before = this.viewPoint(f, px, py);
    this.zoom = THREE.MathUtils.clamp(this.zoom * factor, 1, MAX_ZOOM);
    const after = this.viewPoint(f, px, py);
    this.pan.x += before.x - after.x;
    this.pan.y += before.y - after.y;
    this.clampPan(f);
    this.applyFrustum();
  }

  resetZoom(): void {
    this.zoom = 1;
    this.pan.set(0, 0);
    this.applyFrustum();
  }

  get zoomLevel(): number {
    return this.zoom;
  }

  private zoomed(f: Frustum): Frustum {
    const cx = (f.left + f.right) / 2 + this.pan.x;
    const cy = (f.top + f.bottom) / 2 + this.pan.y;
    const hw = (f.right - f.left) / 2 / this.zoom;
    const hh = (f.top - f.bottom) / 2 / this.zoom;
    return { left: cx - hw, right: cx + hw, top: cy + hh, bottom: cy - hh };
  }

  private viewPoint(f: Frustum, px: number, py: number): THREE.Vector2 {
    const z = this.zoomed(f);
    return new THREE.Vector2(z.left + (px / this.width) * (z.right - z.left), z.top - (py / this.height) * (z.top - z.bottom));
  }

  private clampPan(f: Frustum): void {
    const hw = (f.right - f.left) / 2;
    const hh = (f.top - f.bottom) / 2;
    const mx = hw * (1 - 1 / this.zoom);
    const my = hh * (1 - 1 / this.zoom);
    this.pan.x = THREE.MathUtils.clamp(this.pan.x, -mx, mx);
    this.pan.y = THREE.MathUtils.clamp(this.pan.y, -my, my);
  }

  private applyFrustum(): void {
    const f = this.zoomed(this.currentFrustum());
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
    this.stylize.uniforms.uTime.value = (this.stylize.uniforms.uTime.value + presentDt) % 1000;
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
    this.stylize.dispose();
    this.handPass?.dispose();
    this.sun.shadow.map?.dispose();
    this.renderer.dispose();
  }
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
