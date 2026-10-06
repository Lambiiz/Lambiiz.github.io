import * as THREE from 'three';
import type { AnimDef, SheetInfo } from '../character/bake';
import { spriteTexture } from '../pixel/texture';

/** Layer that only the sun's shadow camera renders: sun-facing silhouette proxies live here. */
export const SHADOW_LAYER = 1;

/** A sprite sheet uploaded once and shared by every sprite that uses it. */
export class SheetTexture {
  readonly texture: THREE.Texture;
  constructor(readonly info: SheetInfo) {
    this.texture = spriteTexture(info.canvas);
  }

  /** Column and row of animation `anim`, `seconds` in, for direction `dir`. */
  frame(anim: string, seconds: number, dir: number): { col: number; row: number; done: boolean } {
    const info = this.info;
    const a = info.anims[anim] ?? info.anims.idle;
    let f = Math.floor(seconds * a.fps);
    let done = false;
    if (a.loop) f = ((f % a.frames) + a.frames) % a.frames;
    else if (f >= a.frames) { f = a.frames - 1; done = true; }
    return { col: Math.max(0, f), row: a.row + Math.min(dir, info.dirs.length - 1) * info.rowsPerDir, done };
  }

  /** Point a texture (a clone of `texture`) at one frame. */
  aim(tex: THREE.Texture, col: number, row: number): void {
    const { cols, rows } = this.info;
    tex.repeat.set(1 / cols, 1 / rows);
    tex.offset.set(col / cols, 1 - (row + 1) / rows);
  }

  /** Plane geometry sized for one frame, origin at the feet. */
  geometry(stretch = 1): THREE.PlaneGeometry {
    const { frameW, frameH, footPx, ppu } = this.info;
    const w = frameW / ppu, h = frameH / ppu;
    const geo = new THREE.PlaneGeometry(w, h);
    geo.translate(0, h / 2 - (frameH - footPx) / ppu, 0);
    geo.scale(1, stretch, 1);
    return geo;
  }
}

let blobTexture: THREE.Texture | null = null;
function getBlobTexture(): THREE.Texture {
  if (blobTexture) return blobTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(0,0,0,1)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.75)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  blobTexture = new THREE.CanvasTexture(c);
  return blobTexture;
}

export interface SpriteOptions {
  /** How far the shading normal leans up (0 = faces the camera, larger = lit like the ground). */
  normalUp?: number;
  /** Self-illumination that keeps the shadow side readable. */
  fill?: number;
  blobSize?: number;
  blobOpacity?: number;
  castShadow?: boolean;
  /** Vertical stretch that compensates for the camera pitch foreshortening a vertical billboard. */
  stretch?: number;
}

/**
 * A lit, shadow-casting pixel-art billboard standing on the ground.
 *
 * The visible quad turns to face the camera's yaw (so it stays upright like a paper cut-out in a
 * diorama). Its shading normal leans upward so the sun and lanterns light it like the ground it
 * stands on. A second quad, rendered only into the sun's shadow map, turns to face the sun so the
 * cast shadow is always the full silhouette, whatever the camera angle.
 */
export class Sprite3D extends THREE.Group {
  readonly sheet: SheetTexture;
  readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>;
  readonly proxy: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  readonly blob: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private tex: THREE.Texture;
  /** Height of the ground under the sprite (the blob shadow sits here while the sprite jumps). */
  groundY = 0;
  /** Visual lift above the ground (jumps). */
  lift = 0;
  /** Direction index into the sheet's direction blocks. */
  dir = 0;
  anim = 'idle';
  private animTime = 0;
  speed = 1;
  private finished = false;

  constructor(sheet: SheetTexture, opts: SpriteOptions = {}) {
    super();
    this.sheet = sheet;
    const w = sheet.info.frameW / sheet.info.ppu;
    this.tex = sheet.texture.clone();
    const geo = sheet.geometry(opts.stretch ?? 1);

    const up = opts.normalUp ?? 1.3;
    const mat = new THREE.MeshLambertMaterial({
      map: this.tex,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(1, 0.94, 0.88).multiplyScalar(opts.fill ?? 0.12),
      emissiveMap: this.tex,
    });
    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `vec3 objectNormal = normalize(vec3(0.0, ${up.toFixed(3)}, 1.0));`,
      );
    };
    mat.customProgramCacheKey = () => `sprite-${up.toFixed(3)}`;
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    this.add(this.mesh);

    // shadow-only proxy facing the sun
    const pmat = new THREE.MeshBasicMaterial({ map: this.tex, alphaTest: 0.5, side: THREE.DoubleSide });
    this.proxy = new THREE.Mesh(geo, pmat);
    this.proxy.layers.set(SHADOW_LAYER);
    this.proxy.castShadow = opts.castShadow ?? true;
    this.proxy.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: this.tex, alphaTest: 0.5, side: THREE.DoubleSide });
    this.add(this.proxy);

    const bs = opts.blobSize ?? w * 0.42;
    const bgeo = new THREE.PlaneGeometry(bs, bs * 0.55);
    bgeo.rotateX(-Math.PI / 2);
    this.blob = new THREE.Mesh(bgeo, new THREE.MeshBasicMaterial({ map: getBlobTexture(), color: 0x000000, transparent: true, opacity: opts.blobOpacity ?? 0.4, depthWrite: false }));
    this.blob.renderOrder = -1;
    this.add(this.blob);
    this.setFrame(0, 0);
  }

  setFrame(col: number, row: number): void {
    this.sheet.aim(this.tex, col, row);
  }

  play(name: string, restart = false): void {
    if (this.anim === name && !restart) return;
    this.anim = name;
    this.animTime = 0;
    this.finished = false;
  }

  /** Show animation `name` at exactly `seconds` into it (sim-driven playback, ghosts). */
  pose(name: string, seconds: number): void {
    this.anim = name;
    this.animTime = seconds;
    this.finished = false;
  }

  get animDef(): AnimDef | undefined {
    return this.sheet.info.anims[this.anim];
  }

  get done(): boolean {
    return this.finished;
  }

  /** Advance the animation and orient toward the camera and the sun. */
  update(dt: number, cameraYaw: number, sunYaw: number): void {
    this.animTime += dt * this.speed;
    const f = this.sheet.frame(this.anim, this.animTime, this.dir);
    this.finished = f.done;
    this.setFrame(f.col, f.row);
    this.mesh.rotation.y = cameraYaw;
    this.proxy.rotation.y = sunYaw;
    this.mesh.position.y = this.lift;
    this.proxy.position.y = this.lift;
    this.blob.position.y = this.groundY - this.position.y + 0.02;
    const s = Math.max(0.35, 1 - (this.lift + this.position.y - this.groundY) * 0.25);
    this.blob.scale.setScalar(s);
  }

  dispose(): void {
    this.tex.dispose();
    this.mesh.material.dispose();
    this.proxy.material.dispose();
    this.blob.material.dispose();
    this.mesh.geometry.dispose();
  }
}
