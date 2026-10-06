import * as THREE from 'three';

/** Uniforms shared by every custom shader: time, camera yaw, wind. Updated once per frame. */
export const GLOBALS = {
  uTime: { value: 0 },
  uCamYaw: { value: 0 },
  uWind: { value: 1 },
  uNight: { value: 0 },
};

export function updateGlobals(time: number, camera: THREE.Camera): void {
  GLOBALS.uTime.value = time;
  const e = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
  GLOBALS.uCamYaw.value = e.y;
}

export function cameraYaw(camera: THREE.Camera): number {
  return new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ').y;
}
