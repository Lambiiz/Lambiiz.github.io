import * as THREE from 'three';
import { Sprite3D, SheetTexture } from '../../engine/sprite/Sprite3D';
import { overworldSheet, type CharacterLook } from '../../engine/pixel/characters';
import type { Terrain } from '../../engine/world/Terrain';

export type Facing = 'down' | 'up' | 'left' | 'right';

const sheetCache = new Map<CharacterLook, SheetTexture>();
function sheetFor(look: CharacterLook): SheetTexture {
  let s = sheetCache.get(look);
  if (!s) sheetCache.set(look, (s = new SheetTexture(overworldSheet(look))));
  return s;
}

/** A walking character in the overworld: position, facing, collision and its sprite. */
export class Actor {
  readonly sprite: Sprite3D;
  readonly pos = new THREE.Vector3();
  /** World-space facing angle (atan2(dx, dz)); 0 = toward the camera (south). */
  heading = Math.PI;
  moving = false;
  running = false;
  radius = 0.32;

  constructor(look: CharacterLook, private terrain: Terrain) {
    this.sprite = new Sprite3D(sheetFor(look), { footPx: 30, normalUp: 1.3, fill: 0.14, stretch: 1.1 });
    this.sprite.play('idle');
  }

  place(x: number, z: number): void {
    this.pos.set(x, this.terrain.heightAt(x, z), z);
  }

  /** Try to move by (dx, dz), sliding along obstacles. Returns true if it moved. */
  move(dx: number, dz: number): boolean {
    const t = this.terrain;
    const h = this.pos.y;
    const tryAt = (x: number, z: number) => t.canStand(x, z, this.radius, h);
    let nx = this.pos.x + dx, nz = this.pos.z + dz;
    if (!tryAt(nx, nz)) {
      if (tryAt(this.pos.x + dx, this.pos.z)) nz = this.pos.z;
      else if (tryAt(this.pos.x, this.pos.z + dz)) nx = this.pos.x;
      else return false;
    }
    this.pos.x = nx;
    this.pos.z = nz;
    this.pos.y = t.heightAt(nx, nz);
    return true;
  }

  faceToward(p: THREE.Vector3): void {
    this.heading = Math.atan2(p.x - this.pos.x, p.z - this.pos.z);
  }

  /** Screen-relative facing for the camera at yaw `camYaw`. */
  facing(camYaw: number): Facing {
    const a = this.heading - camYaw;
    const sx = Math.sin(a), sz = Math.cos(a);
    if (Math.abs(sx) > Math.abs(sz) * 1.05) return sx > 0 ? 'right' : 'left';
    return sz > 0 ? 'down' : 'up';
  }

  update(dt: number, camYaw: number, sunYaw: number): void {
    const f = this.facing(camYaw);
    this.sprite.rowOffset = f === 'down' ? 0 : f === 'up' ? 1 : 2;
    this.sprite.flip = f === 'left';
    this.sprite.play(this.moving ? 'walk' : 'idle');
    this.sprite.speed = this.moving ? (this.running ? 1.6 : 1) : 1;
    this.sprite.position.copy(this.pos);
    this.sprite.groundY = this.pos.y;
    this.sprite.update(dt, camYaw, sunYaw);
  }
}
