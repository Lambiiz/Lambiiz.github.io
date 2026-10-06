import * as THREE from 'three';
import { Sprite3D, SheetTexture } from '../../engine/sprite/Sprite3D';
import { battleSheet, LOOKS, type CharacterLook } from '../../engine/pixel/characters';
import { PixelCanvas } from '../../engine/pixel/PixelCanvas';
import { spriteTexture } from '../../engine/pixel/texture';
import type { Fighter, Projectile } from './sim/types';
import { TPS } from './sim/types';
import type { Prediction } from './sim/predict';

const sheets = new Map<string, SheetTexture>();
export function battleSheetFor(look: string): SheetTexture {
  let s = sheets.get(look);
  if (!s) sheets.set(look, (s = new SheetTexture(battleSheet((LOOKS as Record<string, CharacterLook>)[look] ?? LOOKS.hero))));
  return s;
}

/** Ground-plane z for a fighter's cosmetic lane (the sim itself is strictly 2D). */
export const laneZ = (lane: number) => lane * 0.6;

/** A fighter on stage, driven by the sim's state (position interpolated between ticks). */
export class FighterView {
  readonly sprite: Sprite3D;
  private flash = 0;

  constructor(readonly id: number, look: string) {
    this.sprite = new Sprite3D(battleSheetFor(look), { footPx: 60, normalUp: 1.1, fill: 0.16, stretch: 1.04, blobSize: 1.1, blobOpacity: 0.45 });
  }

  sync(prev: Fighter, cur: Fighter, alpha: number, camYaw: number, sunYaw: number, dt: number): void {
    const x = prev.x + (cur.x - prev.x) * alpha;
    const y = prev.y + (cur.y - prev.y) * alpha;
    this.sprite.position.set(x, 0, laneZ(cur.lane));
    this.sprite.lift = y;
    this.sprite.groundY = 0;
    this.sprite.flip = cur.facing < 0;
    this.sprite.pose(cur.anim, (cur.animT + alpha) / TPS);
    this.sprite.update(0, camYaw, sunYaw);
    if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 4);
    const m = this.sprite.mesh.material;
    m.emissive.setRGB(0.16 + this.flash * 2.5, 0.15 + this.flash * 2.2, 0.14 + this.flash * 2.0);
  }

  hit(): void {
    this.flash = 1;
  }
}

// ---------------------------------------------------------------------------------------------
// projectiles
// ---------------------------------------------------------------------------------------------

function arrowCanvas(): PixelCanvas {
  const pc = new PixelCanvas(18, 5);
  for (let x = 3; x < 15; x++) pc.set(x, 2, x % 3 ? 0x8a5a36 : 0x7a4a2a);
  pc.set(15, 2, 0xd8dce4); pc.set(16, 2, 0xe8ecf4); pc.set(17, 2, 0xb8bcc4);
  pc.set(15, 1, 0xa8acb4); pc.set(15, 3, 0x9a9ea6);
  for (const [x, y] of [[0, 0], [1, 1], [2, 1], [0, 4], [1, 3], [2, 3], [3, 1], [3, 3]]) pc.set(x, y, 0xe8e0d0);
  pc.outline(0.4);
  return pc;
}

function orbCanvas(core: number, edge: number, size = 12): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const c = size / 2;
  pc.ellipse(c, c, c - 1, c - 1, (_x, _y, nx, ny) => {
    const d = Math.hypot(nx, ny);
    return d < 0.45 ? 0xfffbe8 : d < 0.75 ? core : edge;
  });
  return pc;
}

let arrowTex: THREE.Texture | null = null;
let fireTex: THREE.Texture | null = null;
let emberTex: THREE.Texture | null = null;

export class ProjectileView {
  readonly obj = new THREE.Group();
  private light: THREE.PointLight | null = null;
  private trail: THREE.Mesh[] = [];
  private history: THREE.Vector3[] = [];

  constructor(readonly id: number, readonly kind: Projectile['kind']) {
    if (kind === 'arrow') {
      arrowTex ??= spriteTexture(arrowCanvas());
      const m = new THREE.Mesh(new THREE.PlaneGeometry(18 / 16, 5 / 16), new THREE.MeshLambertMaterial({ map: arrowTex, alphaTest: 0.5, side: THREE.DoubleSide, emissive: 0x332211 }));
      this.obj.add(m);
    } else {
      fireTex ??= spriteTexture(orbCanvas(0xffb040, 0xe05020, 12));
      emberTex ??= spriteTexture(orbCanvas(0xff9030, 0xc03010, 6));
      const core = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), new THREE.MeshBasicMaterial({ map: fireTex, alphaTest: 0.5, color: new THREE.Color(4, 2.6, 1.4) }));
      this.obj.add(core);
      this.light = new THREE.PointLight(0xff8a3a, 8, 7, 1.6);
      this.obj.add(this.light);
      for (let i = 0; i < 6; i++) {
        const e = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: emberTex, alphaTest: 0.5, color: new THREE.Color(3, 1.6, 0.8) }));
        this.trail.push(e);
      }
    }
  }

  /** Trail pieces live in world space; add them to the scene alongside obj. */
  get extras(): THREE.Object3D[] {
    return this.trail;
  }

  sync(prev: Projectile | undefined, cur: Projectile, alpha: number, time: number): void {
    const px = prev ? prev.x + (cur.x - prev.x) * alpha : cur.x;
    const py = prev ? prev.y + (cur.y - prev.y) * alpha : cur.y;
    this.obj.position.set(px, py, 0.05);
    this.obj.rotation.z = Math.atan2(cur.vy, cur.vx);
    if (this.kind === 'fireball') {
      this.obj.rotation.z = time * 8;
      this.obj.scale.setScalar(1 + Math.sin(time * 30) * 0.08);
      this.history.unshift(this.obj.position.clone());
      if (this.history.length > 18) this.history.pop();
      this.trail.forEach((e, i) => {
        const p = this.history[Math.min(this.history.length - 1, (i + 1) * 3)];
        e.position.copy(p);
        e.position.y += Math.sin(time * 9 + i) * 0.05;
        e.scale.setScalar(1 - i * 0.14);
      });
      if (this.light) this.light.intensity = 8 + Math.sin(time * 25) * 1.5;
    }
  }

  dispose(): void {
    this.obj.removeFromParent();
    for (const e of this.trail) e.removeFromParent();
  }
}

// ---------------------------------------------------------------------------------------------
// preview overlay
// ---------------------------------------------------------------------------------------------

const MAX_DOTS = 4000;

function dotCanvas(): PixelCanvas {
  const pc = new PixelCanvas(8, 8);
  pc.ellipse(4, 4, 3.5, 3.5, 0xffffff);
  return pc;
}

function burstCanvas(): PixelCanvas {
  const pc = new PixelCanvas(24, 24);
  const c = 12;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + (i % 2) * 0.2;
    const r = i % 2 ? 7 : 11;
    pc.thickLine(c, c, c + Math.cos(a) * r, c + Math.sin(a) * r, i % 2 ? 0.9 : 1.4, 0xffffff);
  }
  pc.ellipse(c, c, 3.5, 3.5, 0xffffff);
  return pc;
}

export const TEAM_COLOR = { party: new THREE.Color(0.55, 0.85, 1.4), enemy: new THREE.Color(1.5, 0.45, 0.35) };
const PROJ_COLOR: Record<string, THREE.Color> = {
  'fireball:party': new THREE.Color(1.6, 0.8, 0.25),
  'arrow:party': new THREE.Color(0.75, 1.4, 0.7),
  'arrow:enemy': new THREE.Color(1.6, 0.35, 0.3),
  'fireball:enemy': new THREE.Color(1.6, 0.35, 0.3),
};

/**
 * Draws a Prediction: dotted paths for every fighter and projectile (bright while certain, dim once
 * another turn could change things), translucent afterimages where everyone ends up, and bursts
 * where hits land.
 */
export class PreviewView {
  readonly group = new THREE.Group();
  private dots: THREE.InstancedMesh;
  private ghosts = new Map<number, THREE.Mesh>();
  private bursts: THREE.Mesh[] = [];
  private burstTex = spriteTexture(burstCanvas());

  constructor() {
    const mat = new THREE.MeshBasicMaterial({ map: spriteTexture(dotCanvas()), transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.dots = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, MAX_DOTS);
    this.dots.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX_DOTS * 3), 3);
    this.dots.count = 0;
    this.dots.renderOrder = 20;
    this.dots.frustumCulled = false;
    this.group.add(this.dots);
  }

  clear(): void {
    this.dots.count = 0;
    for (const g of this.ghosts.values()) g.visible = false;
    for (const b of this.bursts) b.visible = false;
  }

  show(pred: Prediction, fighters: Fighter[], actingId: number, time: number): void {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    let n = 0;
    const put = (x: number, y: number, z: number, size: number, c: THREE.Color, k: number) => {
      if (n >= MAX_DOTS) return;
      m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(size, size, size));
      this.dots.setMatrixAt(n, m);
      this.dots.setColorAt(n, c.clone().multiplyScalar(k));
      n++;
    };
    const byId = new Map(fighters.map((f) => [f.id, f]));
    // a marching phase so the dots flow along the path, showing direction
    const march = Math.floor(time * 30) % 4;
    for (const tr of pred.fighters) {
      const f = byId.get(tr.id)!;
      const col = TEAM_COLOR[f.team];
      const pts = tr.points;
      // skip fighters that stay put
      const moved = pts.some((p) => Math.abs(p.x - pts[0].x) > 0.05 || Math.abs(p.y - pts[0].y) > 0.05);
      if (!moved) continue;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i % 2) continue;
        const pulse = (i / 2 + march) % 4 === 0 ? 1.25 : 1;
        put(p.x, p.y + 1.05, 0.9, (p.certain ? 0.15 : 0.1) * pulse, col, p.certain ? (tr.id === actingId ? 0.9 : 0.6) : 0.22);
      }
    }
    for (const tr of pred.projectiles) {
      const col = PROJ_COLOR[`${tr.kind}:${tr.team}`] ?? TEAM_COLOR.enemy;
      tr.points.forEach((p, i) => {
        if (i % 2) return;
        put(p.x, p.y, 0.9, p.certain ? 0.16 : 0.11, col, p.certain ? 0.85 : 0.22);
      });
    }
    this.dots.count = n;
    this.dots.instanceMatrix.needsUpdate = true;
    if (this.dots.instanceColor) this.dots.instanceColor.needsUpdate = true;

    // afterimages where each mover is when the preview stops being certain (or at the horizon)
    for (const g of this.ghosts.values()) g.visible = false;
    for (const tr of pred.fighters) {
      const f = byId.get(tr.id)!;
      const pose = tr.atCertain;
      const dx = pose.x - tr.points[0].x, dy = pose.y - tr.points[0].y;
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3 && tr.id !== actingId) continue;
      const g = this.ghost(f);
      g.visible = true;
      g.position.set(pose.x, pose.y, 0.6);
      const mat = g.material as THREE.MeshBasicMaterial;
      mat.color.set(0xffffff).lerp(TEAM_COLOR[f.team], 0.55);
      mat.opacity = tr.id === actingId ? 0.6 : 0.42;
      // show the frame the fighter will actually be in
      const info = battleSheetFor(f.look).info;
      const a = info.anims[pose.anim] ?? info.anims.idle;
      let fr = Math.floor((pose.animT / TPS) * a.fps);
      fr = a.loop ? fr % a.frames : Math.min(fr, a.frames - 1);
      const tex = mat.map!;
      tex.repeat.x = (pose.facing < 0 ? -1 : 1) / info.cols;
      tex.offset.x = (fr + (pose.facing < 0 ? 1 : 0)) / info.cols;
      tex.offset.y = 1 - (a.row + 1) / info.rows;
    }

    // hit bursts
    pred.hits.forEach((h, i) => {
      let b = this.bursts[i];
      if (!b) {
        b = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), new THREE.MeshBasicMaterial({ map: this.burstTex, transparent: true, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
        b.renderOrder = 21;
        this.bursts.push(b);
        this.group.add(b);
      }
      b.visible = true;
      b.position.set(h.x, h.y, 1.0);
      b.rotation.z = time * 2;
      const k = h.certain ? 1 : 0.3;
      (b.material as THREE.MeshBasicMaterial).color.setRGB(2 * k, (h.guarded ? 1.6 : 0.8) * k, 0.3 * k);
      b.scale.setScalar(h.certain ? 1 + Math.sin(time * 10) * 0.12 : 0.7);
    });
    for (let i = pred.hits.length; i < this.bursts.length; i++) this.bursts[i].visible = false;
  }

  /** Translucent copy of a fighter's idle frame. */
  private ghost(f: Fighter): THREE.Mesh {
    let g = this.ghosts.get(f.id);
    if (g) return g;
    const sheet = battleSheetFor(f.look);
    const tex = sheet.texture.clone();
    const { cols, rows, frameW, frameH } = sheet.info;
    tex.repeat.set(1 / cols, 1 / rows);
    tex.offset.set(0, 1 - 1 / rows);
    const geo = new THREE.PlaneGeometry(frameW / 16, frameH / 16);
    geo.translate(0, frameH / 32 - 4 / 16, 0);
    g = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, depthWrite: false, depthTest: false, fog: false }));
    g.renderOrder = 19;
    this.ghosts.set(f.id, g);
    this.group.add(g);
    return g;
  }
}

