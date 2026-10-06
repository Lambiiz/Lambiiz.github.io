import * as THREE from 'three';
import { SHADOW_LAYER } from '../sprite/Sprite3D';
import type { PostFX } from './PostFX';
import type { Sky } from './Sky';

export interface LightPreset {
  sun: number;
  sunIntensity: number;
  /** Degrees above the horizon. */
  elevation: number;
  /** Degrees; 0 = sun to the south (behind the camera), 90 = west (left of screen). */
  azimuth: number;
  sky: number;
  ground: number;
  hemiIntensity: number;
  fog: number;
  fogDensity: number;
  background: number;
  exposure: number;
  lamps: number;
  windows: number;
  shadowTint: [number, number, number];
  highlightTint: [number, number, number];
  saturation: number;
  bloom: number;
}

export const PRESETS: Record<string, LightPreset> = {
  day: {
    sun: 0xfff2dc, sunIntensity: 3.0, elevation: 52, azimuth: 52, sky: 0xbcd4ff, ground: 0x8a7a60, hemiIntensity: 1.25,
    fog: 0xc8d4dc, fogDensity: 0.006, background: 0x9ab4cc, exposure: 0.95, lamps: 0, windows: 0,
    shadowTint: [0.0, 0.012, 0.03], highlightTint: [1.02, 1.0, 0.97], saturation: 1.1, bloom: 0.45,
  },
  golden: {
    sun: 0xffc88a, sunIntensity: 3.4, elevation: 26, azimuth: 62, sky: 0x9ab0e0, ground: 0x7a5a48, hemiIntensity: 1.15,
    fog: 0xe0b088, fogDensity: 0.009, background: 0xd8a070, exposure: 1.0, lamps: 0.35, windows: 0.06,
    shadowTint: [0.0, 0.02, 0.045], highlightTint: [1.06, 0.99, 0.9], saturation: 1.12, bloom: 0.6,
  },
  dusk: {
    sun: 0xff8a6a, sunIntensity: 1.6, elevation: 9, azimuth: 70, sky: 0x6a6ab8, ground: 0x4a3a50, hemiIntensity: 1.25,
    fog: 0x8a6a90, fogDensity: 0.012, background: 0x6a5a8a, exposure: 1.15, lamps: 1.0, windows: 0.9,
    shadowTint: [0.01, 0.0, 0.05], highlightTint: [1.05, 0.95, 0.92], saturation: 1.08, bloom: 0.8,
  },
  night: {
    sun: 0x9ab4ff, sunIntensity: 0.75, elevation: 40, azimuth: -30, sky: 0x3656a0, ground: 0x1a2040, hemiIntensity: 1.25,
    fog: 0x1a2440, fogDensity: 0.014, background: 0x101830, exposure: 1.35, lamps: 1.4, windows: 1.3,
    shadowTint: [0.0, 0.01, 0.05], highlightTint: [1.0, 0.98, 1.0], saturation: 1.0, bloom: 0.95,
  },
};

export const PRESET_ORDER = ['golden', 'dusk', 'night', 'day'];

interface Lamp {
  light: THREE.PointLight;
  base: number;
  phase: number;
}

/**
 * Sun, sky fill, fog and lanterns, blended between time-of-day presets. The sun's shadow camera
 * follows the point of interest and is texel-snapped so shadows do not shimmer as the camera moves.
 */
export class Lighting {
  readonly sun: THREE.DirectionalLight;
  readonly hemi: THREE.HemisphereLight;
  readonly fog: THREE.FogExp2;
  private lamps: Lamp[] = [];
  private emissives: { mat: THREE.MeshStandardMaterial | THREE.MeshLambertMaterial; base: number; kind: 'lamp' | 'window' }[] = [];
  private current: LightPreset;
  /** The blended preset currently applied. */
  get state(): Readonly<LightPreset> {
    return this.current;
  }
  private from: LightPreset;
  private to: LightPreset;
  private t = 1;
  presetName = 'golden';
  sky: Sky | null = null;
  /** Half-size of the shadow box (world units). */
  shadowSize = 22;

  constructor(private scene: THREE.Scene, preset = 'golden') {
    this.current = { ...PRESETS[preset] };
    this.from = this.to = PRESETS[preset];
    this.presetName = preset;
    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.radius = 2.5;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 120;
    this.sun.shadow.camera.layers.enable(SHADOW_LAYER);
    scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(this.hemi);
    this.fog = new THREE.FogExp2(0xffffff, 0.01);
    scene.fog = this.fog;
    this.apply();
  }

  addLamp(light: THREE.PointLight, base = light.intensity): void {
    this.lamps.push({ light, base, phase: Math.random() * 100 });
  }

  addEmissive(mat: THREE.MeshStandardMaterial | THREE.MeshLambertMaterial, base: number, kind: 'lamp' | 'window'): void {
    this.emissives.push({ mat, base, kind });
  }

  setPreset(name: string, seconds = 1.5): void {
    this.from = { ...this.current };
    this.to = PRESETS[name];
    this.presetName = name;
    this.t = seconds <= 0 ? 1 : 0;
    this.blendSpeed = seconds <= 0 ? 1 : 1 / seconds;
    if (seconds <= 0) this.current = { ...this.to };
  }
  private blendSpeed = 1;

  cycle(): string {
    const i = PRESET_ORDER.indexOf(this.presetName);
    const next = PRESET_ORDER[(i + 1) % PRESET_ORDER.length];
    this.setPreset(next);
    return next;
  }

  /** Unit vector pointing from the ground toward the sun. */
  get sunDir(): THREE.Vector3 {
    const el = THREE.MathUtils.degToRad(this.current.elevation);
    const az = THREE.MathUtils.degToRad(this.current.azimuth);
    return new THREE.Vector3(-Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  }

  /** Yaw that turns a sprite's shadow proxy to face the sun. */
  get sunYaw(): number {
    const d = this.sunDir;
    return Math.atan2(d.x, d.z);
  }

  update(dt: number, time: number, focus: THREE.Vector3): void {
    if (this.t < 1) {
      this.t = Math.min(1, this.t + dt * this.blendSpeed);
      const k = this.t * this.t * (3 - 2 * this.t);
      this.current = blend(this.from, this.to, k);
    }
    this.apply();
    // shadow box follows the focus, snapped to shadow-map texels
    const d = this.sunDir;
    const texel = (this.shadowSize * 2) / this.sun.shadow.mapSize.x;
    const snapped = focus.clone();
    // snap in light space
    const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), d.clone().negate(), new THREE.Vector3(0, 1, 0));
    const inv = m.clone().invert();
    snapped.applyMatrix4(inv);
    snapped.x = Math.round(snapped.x / texel) * texel;
    snapped.y = Math.round(snapped.y / texel) * texel;
    snapped.applyMatrix4(m);
    this.sun.target.position.copy(snapped);
    this.sun.position.copy(snapped).addScaledVector(d, 60);
    const cam = this.sun.shadow.camera;
    cam.left = cam.bottom = -this.shadowSize;
    cam.right = cam.top = this.shadowSize;
    cam.updateProjectionMatrix();
    // lantern flicker
    const c = this.current;
    for (const l of this.lamps) {
      const f = 0.88 + 0.08 * Math.sin(time * 9 + l.phase) + 0.05 * Math.sin(time * 23.7 + l.phase * 2);
      l.light.intensity = l.base * c.lamps * f;
    }
    for (const e of this.emissives) e.mat.emissiveIntensity = e.base * (e.kind === 'lamp' ? Math.max(0.25, c.lamps) : c.windows);
  }

  /** Push this light's colour grade (exposure, tints, bloom) into the post stack. */
  applyGrade(post: PostFX): void {
    const c = this.current;
    post.grade.exposure = c.exposure;
    post.grade.shadowTint.setRGB(...c.shadowTint);
    post.grade.highlightTint.setRGB(...c.highlightTint);
    post.grade.saturation = c.saturation;
    post.grade.bloomStrength = c.bloom;
  }

  private apply(): void {
    const c = this.current;
    this.sun.color.set(c.sun);
    this.sun.intensity = c.sunIntensity;
    this.hemi.color.set(c.sky);
    this.hemi.groundColor.set(c.ground);
    this.hemi.intensity = c.hemiIntensity;
    this.fog.color.set(c.fog);
    this.fog.density = c.fogDensity;
    this.scene.background = new THREE.Color(c.background);
    this.sky?.update(c.sky, c.background, c.sun, this.sunDir);
  }
}

function lerpColor(a: number, b: number, t: number): number {
  return new THREE.Color(a).lerp(new THREE.Color(b), t).getHex();
}

function blend(a: LightPreset, b: LightPreset, t: number): LightPreset {
  const n = (x: number, y: number) => x + (y - x) * t;
  let az = b.azimuth - a.azimuth;
  if (az > 180) az -= 360;
  if (az < -180) az += 360;
  return {
    sun: lerpColor(a.sun, b.sun, t), sunIntensity: n(a.sunIntensity, b.sunIntensity), elevation: n(a.elevation, b.elevation),
    azimuth: a.azimuth + az * t, sky: lerpColor(a.sky, b.sky, t), ground: lerpColor(a.ground, b.ground, t),
    hemiIntensity: n(a.hemiIntensity, b.hemiIntensity), fog: lerpColor(a.fog, b.fog, t), fogDensity: n(a.fogDensity, b.fogDensity),
    background: lerpColor(a.background, b.background, t), exposure: n(a.exposure, b.exposure), lamps: n(a.lamps, b.lamps),
    windows: n(a.windows, b.windows),
    shadowTint: [n(a.shadowTint[0], b.shadowTint[0]), n(a.shadowTint[1], b.shadowTint[1]), n(a.shadowTint[2], b.shadowTint[2])],
    highlightTint: [n(a.highlightTint[0], b.highlightTint[0]), n(a.highlightTint[1], b.highlightTint[1]), n(a.highlightTint[2], b.highlightTint[2])],
    saturation: n(a.saturation, b.saturation), bloom: n(a.bloom, b.bloom),
  };
}
