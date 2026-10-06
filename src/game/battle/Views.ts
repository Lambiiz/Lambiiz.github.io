import * as THREE from 'three';
import { Sprite3D, type SheetTexture } from '../../engine/sprite/Sprite3D';
import { battleSheet } from '../../engine/character/sheets';
import { PixelCanvas } from '../../engine/pixel/PixelCanvas';
import { spriteTexture } from '../../engine/pixel/texture';
import type { Fighter, Projectile } from './sim/types';
import { TPS } from './sim/types';

export function battleSheetFor(look: string): SheetTexture {
  return battleSheet(look);
}

/** Battle sheets hold two directions: 0 facing right, 1 facing left. */
export const dirFor = (facing: number) => (facing < 0 ? 1 : 0);

/** Ground-plane z for a fighter's cosmetic lane (the sim itself is strictly 2D). */
export const laneZ = (lane: number) => lane * 0.6;

/** A fighter on stage, driven by the sim's state (position interpolated between ticks). */
export class FighterView {
  readonly sprite: Sprite3D;
  private flash = 0;
  /** 0..1 extra glow (the fighter whose turn it is). */
  highlight = 0;

  constructor(readonly id: number, look: string) {
    this.sprite = new Sprite3D(battleSheetFor(look), { normalUp: 2.2, fill: 0.3, stretch: 1.02, blobSize: 1.1, blobOpacity: 0.45 });
  }

  sync(prev: Fighter, cur: Fighter, alpha: number, camYaw: number, sunYaw: number, dt: number): void {
    const x = prev.x + (cur.x - prev.x) * alpha;
    const y = prev.y + (cur.y - prev.y) * alpha;
    this.sprite.position.set(x, 0, laneZ(cur.lane));
    this.sprite.lift = y;
    this.sprite.groundY = 0;
    this.sprite.dir = dirFor(cur.facing);
    this.sprite.pose(cur.anim, (cur.animT + alpha) / TPS);
    this.sprite.update(0, camYaw, sunYaw);
    if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 4);
    const m = this.sprite.mesh.material;
    const h = this.highlight * 0.35;
    m.emissive.setRGB(0.3 + this.flash * 2.5 + h, 0.28 + this.flash * 2.2 + h * 0.85, 0.26 + this.flash * 2.0 + h * 0.4);
  }

  hit(strength = 1): void {
    this.flash = Math.max(this.flash, strength);
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
// markers: team rings under everyone, and the "it's your turn" marker
// ---------------------------------------------------------------------------------------------

function ringCanvas(size: number, inner: number, outer: number): PixelCanvas {
  const pc = new PixelCanvas(size, size);
  const c = size / 2;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const d = Math.hypot(x + 0.5 - c, y + 0.5 - c);
    if (d > inner && d < outer) pc.set(x, y, 0xffffff);
  }
  return pc;
}

function chevronCanvas(): PixelCanvas {
  const pc = new PixelCanvas(13, 9);
  for (let i = 0; i < 7; i++) {
    for (let t = 0; t < 3; t++) {
      pc.set(i, i + t - 0, 0xffffff);
      pc.set(12 - i, i + t - 0, 0xffffff);
    }
  }
  pc.outline(0.2);
  return pc;
}

const TEAM_RING = { party: new THREE.Color(0.1, 0.55, 1.9), enemy: new THREE.Color(1.9, 0.18, 0.1) };

/** A flat ring on the ground under a fighter, in its team's colour. */
export class TeamRing {
  readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private static tex: THREE.Texture | null = null;
  constructor(team: 'party' | 'enemy') {
    TeamRing.tex ??= spriteTexture(ringCanvas(48, 18, 23));
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.25), new THREE.MeshBasicMaterial({ map: TeamRing.tex, transparent: true, depthWrite: false, color: TEAM_RING[team], opacity: 0.8, fog: false }));
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.renderOrder = 1;
  }
}

/** The acting fighter: a bright pulsing ring at the feet and a bobbing chevron overhead. */
export class ActorMarker {
  readonly ring: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  readonly chevron: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  constructor() {
    this.ring = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), new THREE.MeshBasicMaterial({ map: spriteTexture(ringCanvas(64, 24, 31)), transparent: true, depthWrite: false, color: new THREE.Color(2.4, 1.9, 0.9), fog: false }));
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.renderOrder = 2;
    this.chevron = new THREE.Mesh(new THREE.PlaneGeometry(13 / 20, 9 / 20), new THREE.MeshBasicMaterial({ map: spriteTexture(chevronCanvas()), transparent: true, alphaTest: 0.5, depthTest: false, color: new THREE.Color(1.6, 1.3, 0.6), fog: false }));
    this.chevron.renderOrder = 15;
    this.hide();
  }

  hide(): void {
    this.ring.visible = this.chevron.visible = false;
  }

  show(x: number, y: number, z: number, time: number): void {
    this.ring.visible = this.chevron.visible = true;
    this.ring.position.set(x, 0.03, z);
    const p = 1 + Math.sin(time * 6) * 0.08;
    this.ring.scale.setScalar(p);
    this.ring.rotation.z = time * 0.8;
    this.chevron.position.set(x, y + 2.35 + Math.abs(Math.sin(time * 4)) * 0.18, z + 0.3);
  }
}
