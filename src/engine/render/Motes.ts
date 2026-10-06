import * as THREE from 'three';
import { GLOBALS } from './globals';

/**
 * Floating light specks (dust in sunbeams by day, fireflies at night). One draw call; the drift is
 * computed in the vertex shader from a per-point seed, so there is no CPU work per frame. Out of the
 * focus plane they become soft bokeh discs through the depth of field.
 */
export class Motes extends THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> {
  constructor(count: number, box: THREE.Box3, opts: { color?: number; size?: number; intensity?: number } = {}) {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = box.getSize(new THREE.Vector3());
    for (let i = 0; i < count; i++) {
      pos[i * 3] = box.min.x + Math.random() * size.x;
      pos[i * 3 + 1] = box.min.y + Math.random() * size.y;
      pos[i * 3 + 2] = box.min.z + Math.random() * size.z;
      seed[i] = Math.random() * 100;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: GLOBALS.uTime,
        uColor: { value: new THREE.Color(opts.color ?? 0xffe0a0) },
        uSize: { value: opts.size ?? 9 },
        uIntensity: { value: opts.intensity ?? 1.5 },
        uPixelRatio: { value: 1 },
      },
      vertexShader: /* glsl */ `
        attribute float seed;
        uniform float uTime, uSize, uPixelRatio;
        varying float vTw;
        void main() {
          vec3 p = position;
          float t = uTime * 0.25 + seed;
          p.x += sin(t * 1.3 + seed) * 0.6;
          p.y += sin(t * 0.9 + seed * 2.0) * 0.4;
          p.z += cos(t * 1.1 + seed * 3.0) * 0.6;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * uPixelRatio * (12.0 / -mv.z);
          vTw = 0.55 + 0.45 * sin(uTime * 2.0 + seed * 7.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying float vTw;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = smoothstep(1.0, 0.0, d);
          a *= a;
          gl_FragColor = vec4(uColor * uIntensity * vTw * a, a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    super(geo, mat);
    this.frustumCulled = false;
  }

  set intensity(v: number) {
    this.material.uniforms.uIntensity.value = v;
  }

  set color(c: number) {
    this.material.uniforms.uColor.value.set(c);
  }
}
