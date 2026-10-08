// Third-person movement: camera-relative input, acceleration, smooth turning,
// animation selection by speed and circle-vs-AABB collision.
import * as THREE from 'three';
import { damp, clamp } from '../core/math.js';
import { dampAngle } from '../characters/Character.js';

const WALK_SPEED = 1.45; // m/s  (Walk_Loop authored at ~1.0 m/s)
const RUN_SPEED = 4.0; // m/s    (Jog_Fwd_Loop authored at ~5.4 m/s)
const RADIUS = 0.28;

export class PlayerController {
  constructor(character, world, input) {
    this.char = character;
    this.world = world;
    this.input = input;
    this.speed = 0;
    this.velocity = new THREE.Vector3();
    this.enabled = true;
    this.dynamicColliders = []; // circles: {x, z, r}
    this.anim = '';
  }

  addCircle(obj, r) {
    this.dynamicColliders.push({ obj, r });
  }

  update(dt, cameraYaw) {
    const c = this.char;
    let targetSpeed = 0;
    let moveDir = null;
    if (this.enabled) {
      const ax = this.input.moveAxis();
      if (ax.active) {
        const fwd = new THREE.Vector3(Math.sin(cameraYaw), 0, Math.cos(cameraYaw));
        const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
        moveDir = fwd.multiplyScalar(ax.y).addScaledVector(right, ax.x).normalize();
        targetSpeed = this.input.held('run') ? WALK_SPEED : RUN_SPEED;
      }
    }

    this.speed = damp(this.speed, targetSpeed, targetSpeed > this.speed ? 7 : 10, dt);
    if (moveDir) {
      const targetHeading = Math.atan2(moveDir.x, moveDir.z);
      // turn faster when changing direction sharply, slower when nearly aligned
      c.setHeading(dampAngle(c.heading, targetHeading, 14, dt));
    }
    // move along the facing direction so turns arc naturally
    const dir = new THREE.Vector3(Math.sin(c.heading), 0, Math.cos(c.heading));
    if (moveDir) {
      // blend facing and input dir to avoid sliding while turning
      dir.lerp(moveDir, 0.5).normalize();
    }
    const step = dir.multiplyScalar(this.speed * dt);
    const p = c.root.position;
    p.x += step.x;
    p.z += step.z;
    this.resolveCollisions(p);

    // animation selection
    let want = 'idle';
    let ts = 1;
    if (this.speed > 2.3) {
      want = 'jog';
      ts = clamp(this.speed / 5.0, 0.6, 1.1);
    } else if (this.speed > 0.15) {
      want = 'walk';
      ts = clamp(this.speed / 1.0, 0.5, 1.6);
    }
    if (want !== this.anim) {
      c.play(want, { fade: want === 'idle' ? 0.35 : 0.22 });
      this.anim = want;
    }
    c.setTimeScale(ts);
  }

  resolveCollisions(p) {
    for (let iter = 0; iter < 2; iter++) {
      for (const b of this.world.colliders) {
        const cx = clamp(p.x, b.minX, b.maxX);
        const cz = clamp(p.z, b.minZ, b.maxZ);
        const dx = p.x - cx;
        const dz = p.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 < RADIUS * RADIUS) {
          if (d2 > 1e-8) {
            const d = Math.sqrt(d2);
            p.x = cx + (dx / d) * RADIUS;
            p.z = cz + (dz / d) * RADIUS;
          } else {
            // centre inside box: push out along smallest axis
            const pen = [p.x - b.minX, b.maxX - p.x, p.z - b.minZ, b.maxZ - p.z];
            const i = pen.indexOf(Math.min(...pen));
            if (i === 0) p.x = b.minX - RADIUS;
            if (i === 1) p.x = b.maxX + RADIUS;
            if (i === 2) p.z = b.minZ - RADIUS;
            if (i === 3) p.z = b.maxZ + RADIUS;
          }
        }
      }
      for (const c of this.dynamicColliders) {
        const o = c.obj.position;
        const dx = p.x - o.x;
        const dz = p.z - o.z;
        const min = c.r + RADIUS;
        const d2 = dx * dx + dz * dz;
        if (d2 < min * min && d2 > 1e-8) {
          const d = Math.sqrt(d2);
          p.x = o.x + (dx / d) * min;
          p.z = o.z + (dz / d) * min;
        }
      }
    }
  }

  stop() {
    this.speed = 0;
    if (this.anim !== 'idle') {
      this.char.play('idle', { fade: 0.3 });
      this.anim = 'idle';
    }
    this.char.setTimeScale(1);
  }
}
