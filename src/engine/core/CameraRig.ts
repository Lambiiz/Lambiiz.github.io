import * as THREE from 'three';

export interface RigSettings {
  fov: number;
  pitch: number;
  distance: number;
  minDistance: number;
  maxDistance: number;
  /** Follow stiffness (higher = snappier). */
  follow: number;
  /** World-space height of the point the camera looks at above the target's feet. */
  lookHeight: number;
  /** Look this far past the target along the view direction (shows more of what lies ahead). */
  lookAhead: number;
}

/**
 * The diorama camera: a narrow lens, pitched down, held back at a distance so the world reads like a
 * miniature. It follows a target with damping, can orbit in yaw steps and zoom, and stays inside
 * optional bounds.
 */
export class CameraRig {
  readonly camera: THREE.PerspectiveCamera;
  readonly settings: RigSettings;
  yaw = 0;
  private targetYaw = 0;
  distance: number;
  private targetDistance: number;
  readonly focus = new THREE.Vector3();
  private goal = new THREE.Vector3();
  bounds: THREE.Box2 | null = null;
  private shakeT = 0;
  private shakeAmp = 0;

  constructor(settings: Partial<RigSettings> = {}) {
    this.settings = { fov: 28, pitch: 31, distance: 25, minDistance: 15, maxDistance: 36, follow: 5, lookHeight: 0.9, lookAhead: 0, ...settings };
    this.camera = new THREE.PerspectiveCamera(this.settings.fov, 16 / 9, 1, 220);
    this.distance = this.targetDistance = this.settings.distance;
  }

  setTarget(p: THREE.Vector3, snap = false): void {
    this.goal.copy(p);
    if (this.bounds) {
      this.goal.x = THREE.MathUtils.clamp(this.goal.x, this.bounds.min.x, this.bounds.max.x);
      this.goal.z = THREE.MathUtils.clamp(this.goal.z, this.bounds.min.y, this.bounds.max.y);
    }
    if (snap) this.focus.copy(this.goal);
  }

  rotate(steps: number): void {
    this.targetYaw += steps * THREE.MathUtils.degToRad(15);
    this.targetYaw = THREE.MathUtils.clamp(this.targetYaw, -0.6, 0.6);
  }

  zoom(delta: number): void {
    this.targetDistance = THREE.MathUtils.clamp(this.targetDistance + delta, this.settings.minDistance, this.settings.maxDistance);
  }

  shake(amp: number, time = 0.3): void {
    this.shakeAmp = Math.max(this.shakeAmp, amp);
    this.shakeT = Math.max(this.shakeT, time);
  }

  /** Distance from the camera to the focus point: the depth-of-field focus distance. */
  get focusDistance(): number {
    return this.camera.position.distanceTo(this.lookPoint);
  }

  private lookPoint = new THREE.Vector3();

  update(dt: number): void {
    const k = 1 - Math.exp(-this.settings.follow * dt);
    this.focus.lerp(this.goal, k);
    this.yaw += (this.targetYaw - this.yaw) * (1 - Math.exp(-8 * dt));
    this.distance += (this.targetDistance - this.distance) * (1 - Math.exp(-6 * dt));
    const pitch = THREE.MathUtils.degToRad(this.settings.pitch);
    this.lookPoint.copy(this.focus);
    this.lookPoint.y += this.settings.lookHeight;
    this.lookPoint.x -= Math.sin(this.yaw) * this.settings.lookAhead;
    this.lookPoint.z -= Math.cos(this.yaw) * this.settings.lookAhead;
    const off = new THREE.Vector3(Math.sin(this.yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(this.yaw) * Math.cos(pitch)).multiplyScalar(this.distance);
    this.camera.position.copy(this.lookPoint).add(off);
    if (this.shakeT > 0) {
      this.shakeT -= dt;
      const a = this.shakeAmp * Math.max(0, this.shakeT) * 3;
      this.camera.position.x += (Math.random() - 0.5) * a;
      this.camera.position.y += (Math.random() - 0.5) * a;
      if (this.shakeT <= 0) this.shakeAmp = 0;
    }
    this.camera.lookAt(this.lookPoint);
  }

  resize(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
