// Cinematic camera controller used for dialogue, transitions and battle.
// Supports cuts, eased moves, slow orbits, handheld sway and impulse shake.
import * as THREE from 'three';
import { easeInOutCubic } from './math.js';

export class CameraRig {
  constructor(camera, tasks) {
    this.camera = camera;
    this.tasks = tasks;
    this.pos = new THREE.Vector3();
    this.look = new THREE.Vector3();
    this.fov = camera.fov;
    this.sway = 0.0; // handheld amplitude
    this.shakeAmt = 0;
    this.roll = 0;
    this.time = 0;
    this.active = false;
    this.drift = null; // {vel: Vector3} slow continuous push
    this._moveId = 0;
  }

  cut(pos, look, fov) {
    this._moveId++;
    this.pos.copy(pos);
    this.look.copy(look);
    if (fov) this.fov = fov;
    this.drift = null;
  }

  /** Eased move; returns a promise. A newer move/cut cancels older ones. */
  move(pos, look, dur, { fov, ease = easeInOutCubic, roll } = {}) {
    const id = ++this._moveId;
    const p0 = this.pos.clone();
    const l0 = this.look.clone();
    const f0 = this.fov;
    const r0 = this.roll;
    this.drift = null;
    return this.tasks.tween(
      dur,
      (t) => {
        if (id !== this._moveId) return;
        this.pos.lerpVectors(p0, pos, t);
        this.look.lerpVectors(l0, look, t);
        if (fov) this.fov = f0 + (fov - f0) * t;
        if (roll !== undefined) this.roll = r0 + (roll - r0) * t;
      },
      ease
    );
  }

  /** Slow constant push (adds life to static shots). */
  setDrift(vel) {
    this.drift = vel ? vel.clone() : null;
  }

  shake(amount) {
    this.shakeAmt = Math.max(this.shakeAmt, amount);
  }

  update(dt) {
    this.time += dt;
    if (!this.active) return;
    if (this.drift) this.pos.addScaledVector(this.drift, dt);
    const c = this.camera;
    c.position.copy(this.pos);
    if (this.sway > 0) {
      c.position.x += Math.sin(this.time * 0.7) * this.sway;
      c.position.y += Math.sin(this.time * 1.1 + 1) * this.sway * 0.6;
    }
    if (this.shakeAmt > 0.0005) {
      c.position.x += (Math.random() - 0.5) * this.shakeAmt;
      c.position.y += (Math.random() - 0.5) * this.shakeAmt;
      c.position.z += (Math.random() - 0.5) * this.shakeAmt;
      this.shakeAmt *= Math.exp(-dt * 9);
    }
    c.lookAt(this.look);
    if (this.roll) c.rotateZ(this.roll);
    if (Math.abs(c.fov - this.fov) > 0.01) {
      c.fov = this.fov;
      c.updateProjectionMatrix();
    }
  }
}
