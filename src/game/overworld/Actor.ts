import * as THREE from 'three';
import { Sprite3D } from '../../engine/sprite/Sprite3D';
import { overworldSheet } from '../../engine/character/sheets';
import type { CharacterLook } from '../../engine/character/look';
import type { Terrain } from '../../engine/world/Terrain';

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
    this.sprite = new Sprite3D(overworldSheet(look), { normalUp: 2.2, fill: 0.16, stretch: 1.06 });
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

  /**
   * Screen-relative direction for the camera at yaw `camYaw`: an index into the sheet's 8
   * directions (0 = toward the camera, then clockwise as seen from above: se, e, ne, n, nw, w, sw).
   */
  direction(camYaw: number): number {
    const a = this.heading - camYaw;
    const k = Math.round(a / (Math.PI / 4));
    return ((k % 8) + 8) % 8;
  }

  update(dt: number, camYaw: number, sunYaw: number): void {
    this.sprite.dir = this.direction(camYaw);
    this.sprite.play(this.moving ? 'walk' : 'idle');
    this.sprite.speed = this.moving ? (this.running ? 1.6 : 1) : 1;
    this.sprite.position.copy(this.pos);
    this.sprite.groundY = this.pos.y;
    this.sprite.update(dt, camYaw, sunYaw);
  }
}
