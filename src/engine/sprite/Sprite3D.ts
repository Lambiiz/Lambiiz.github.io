import * as THREE from 'three';
import type { AnimDef, SheetInfo } from '../pixel/characters';
import { PX_PER_UNIT, spriteTexture } from '../pixel/texture';

/** Layer that only the sun's shadow camera renders: sun-facing silhouette proxies live here. */
export const SHADOW_LAYER = 1;

/** A sprite sheet uploaded once and shared by every sprite that uses it. */
export class SheetTexture {
  readonly texture: THREE.Texture;
  constructor(readonly info: SheetInfo) {
    this.texture = spriteTexture(info.canvas);
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
  /** Pixel row (from the top of a frame) where the feet touch the ground. */
  footPx?: number;
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
  flip = false;
  anim = 'idle';
  private animTime = 0;
  private row = 0;
  private col = 0;
  /** Extra row offset for directional sheets (overworld: 0 down, 1 up, 2 side). */
  rowOffset = 0;
  speed = 1;
  private finished = false;

  constructor(sheet: SheetTexture, opts: SpriteOptions = {}) {
    super();
    this.sheet = sheet;
    const { frameW, frameH, cols, rows } = sheet.info;
    const w = frameW / PX_PER_UNIT, h = frameH / PX_PER_UNIT;
    const footPx = opts.footPx ?? frameH - 1;
    const stretch = opts.stretch ?? 1;
    this.tex = sheet.texture.clone();
    this.tex.repeat.set(1 / cols, 1 / rows);

    const geo = new THREE.PlaneGeometry(w, h);
    geo.translate(0, h / 2 - (frameH - footPx) / PX_PER_UNIT, 0);
    geo.scale(1, stretch, 1);

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
    this.col = col;
    this.row = row;
    const { cols, rows } = this.sheet.info;
    if (this.flip) {
      this.tex.repeat.x = -1 / cols;
      this.tex.offset.x = (col + 1) / cols;
    } else {
      this.tex.repeat.x = 1 / cols;
      this.tex.offset.x = col / cols;
    }
    this.tex.offset.y = 1 - (row + 1) / rows;
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
    const a = this.animDef;
    if (a) {
      this.animTime += dt * this.speed;
      let f = Math.floor(this.animTime * a.fps);
      if (a.loop) f %= a.frames;
      else if (f >= a.frames) { f = a.frames - 1; this.finished = true; }
      // overworld sheets: walk frames follow the two idle columns
      const colBase = this.anim === 'walk' && this.sheet.info.frameW === 32 ? 2 : 0;
      this.setFrame(colBase + f, a.row + this.rowOffset);
    } else {
      this.setFrame(this.col, this.row);
    }
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
