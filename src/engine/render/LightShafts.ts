import * as THREE from 'three';
import { GLOBALS } from './globals';

/**
 * Volumetric-looking sunbeams: long soft additive ribbons that slant down along the sun direction
 * from above the scene to the ground, turned around their own axis to face the camera. Their
 * brightness follows the time of day (strong at golden hour, gone at noon overcast, faint and blue
 * by moonlight). Buildings occlude them through the depth test, which sells the effect.
 */

const VERT = /* glsl */ `
attribute float seed;
uniform vec3 sunDir;
uniform float uTime;
varying vec2 vUv;
varying float vSeed;
varying float vFog;
void main() {
  vUv = uv;
  vSeed = seed;
  // shaft axis: from the ground point (instance position) up toward the sun
  vec3 base = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float len = length((instanceMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
  float wid = length((instanceMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
  vec3 axis = normalize(sunDir);
  vec3 toCam = normalize(cameraPosition - base);
  vec3 side = normalize(cross(axis, toCam));
  vec3 p = base + axis * (position.y * len) + side * (position.x * wid);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  vFog = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 color;
uniform float intensity, uTime;
varying vec2 vUv;
varying float vSeed;
varying float vFog;
void main() {
  float across = 1.0 - abs(vUv.x * 2.0 - 1.0);
  across = smoothstep(0.0, 0.9, across);
  float along = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
  // slow drifting dust stripes inside the beam
  float stripes = 0.7 + 0.3 * sin(vUv.x * 9.0 + vSeed * 13.0 + uTime * 0.35) * sin(vUv.y * 5.0 - uTime * 0.2 + vSeed * 7.0);
  float flicker = 0.85 + 0.15 * sin(uTime * 0.6 + vSeed * 20.0);
  float a = across * along * stripes * flicker * intensity;
  a *= smoothstep(4.0, 10.0, vFog); // fade when the camera is inside it
  gl_FragColor = vec4(color * a, 1.0);
}`;

export class LightShafts extends THREE.InstancedMesh<THREE.PlaneGeometry, THREE.ShaderMaterial> {
  /** Per-scene strength multiplier on top of the time of day's. */
  gain = 1;

  constructor(spots: { x: number; y: number; z: number; width: number; length: number }[]) {
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.translate(0, 0.5, 0); // from the ground point upward
    const seeds = new Float32Array(spots.length);
    spots.forEach((_, i) => (seeds[i] = Math.random()));
    geo.setAttribute('seed', new THREE.InstancedBufferAttribute(seeds, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        sunDir: { value: new THREE.Vector3(0, 1, 0) },
        color: { value: new THREE.Color(1, 0.8, 0.5) },
        intensity: { value: 0.3 },
        uTime: GLOBALS.uTime,
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    super(geo, mat, spots.length);
    const m = new THREE.Matrix4();
    spots.forEach((s, i) => {
      m.compose(new THREE.Vector3(s.x, s.y, s.z), new THREE.Quaternion(), new THREE.Vector3(s.width, s.length, 1));
      this.setMatrixAt(i, m);
    });
    this.frustumCulled = false;
    this.renderOrder = 3;
  }

  /** Follow the light: direction toward the sun, beam colour and strength. */
  setLight(sunDir: THREE.Vector3, color: THREE.Color, intensity: number): void {
    const u = this.material.uniforms;
    u.sunDir.value.copy(sunDir);
    u.color.value.copy(color);
    u.intensity.value = intensity * this.gain;
    this.visible = intensity * this.gain > 0.005;
  }
}
