// Smooth third-person orbit camera with drag-to-look, gentle auto-follow and
// collision against the corridor bounds.
import * as THREE from 'three';
import { damp, clamp } from '../core/math.js';
import { dampAngle } from '../characters/Character.js';
import { HALL } from '../world/SchoolHallway.js';

export class FollowCamera {
  constructor(camera, input) {
    this.camera = camera;
    this.input = input;
    this.yaw = 0;
    this.pitch = 0.18;
    this.distance = 3.3;
    this.targetDistance = 3.3;
    this.shoulder = 0.32;
    this.idleTime = 10;
    this.target = new THREE.Vector3();
    this.smoothedTarget = new THREE.Vector3();
    this.pos = new THREE.Vector3();
    this.first = true;
  }

  snap(player) {
    this.yaw = player.heading;
    this.first = true;
  }

  update(dt, player, moving) {
    const m = this.input.consumeMouse();
    if (m.dx || m.dy) this.idleTime = 0;
    else this.idleTime += dt;
    this.yaw -= m.dx * 0.0042;
    this.pitch = clamp(this.pitch + m.dy * 0.003, -0.25, 0.75);
    if (m.wheel) this.targetDistance = clamp(this.targetDistance + m.wheel * 0.35, 2.2, 5);
    this.distance = damp(this.distance, this.targetDistance, 8, dt);

    // gently swing behind the player while they move and the mouse is idle
    if (moving && this.idleTime > 1.2) this.yaw = dampAngle(this.yaw, player.heading, 1.1, dt);

    this.target.copy(player.root.position).add(new THREE.Vector3(0, 1.42, 0));
    if (this.first) this.smoothedTarget.copy(this.target);
    this.smoothedTarget.x = damp(this.smoothedTarget.x, this.target.x, 12, dt);
    this.smoothedTarget.y = damp(this.smoothedTarget.y, this.target.y, 8, dt);
    this.smoothedTarget.z = damp(this.smoothedTarget.z, this.target.z, 12, dt);

    const fwd = new THREE.Vector3(Math.sin(this.yaw) * Math.cos(this.pitch), -Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch));
    const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw));
    const pivot = this.smoothedTarget.clone().addScaledVector(right, -this.shoulder);
    const desired = pivot.clone().addScaledVector(fwd, -this.distance);
    this.collide(pivot, desired);

    if (this.first) {
      this.pos.copy(desired);
      this.first = false;
    } else {
      const r = 18;
      this.pos.x = damp(this.pos.x, desired.x, r, dt);
      this.pos.y = damp(this.pos.y, desired.y, r, dt);
      this.pos.z = damp(this.pos.z, desired.z, r, dt);
    }
    this.camera.position.copy(this.pos);
    this.camera.lookAt(pivot.clone().addScaledVector(fwd, 2));
  }

  /** Pull the camera in toward the pivot until it sits inside the corridor. */
  collide(pivot, desired) {
    const inside = (p) =>
      p.x > HALL.minX + 0.2 && p.x < HALL.maxX - 0.25 && p.y > 0.25 && p.y < HALL.height - 0.15 && p.z > HALL.minZ + 0.2 && p.z < HALL.maxZ - 0.2;
    if (inside(desired)) return;
    let lo = 0;
    let hi = 1;
    const tmp = new THREE.Vector3();
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      tmp.lerpVectors(pivot, desired, mid);
      if (inside(tmp)) lo = mid;
      else hi = mid;
    }
    desired.lerpVectors(pivot, desired, lo);
  }
}
