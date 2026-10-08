// The card-surface charge overlay: an unlit ShaderMaterial drawn just above each card face.
// Each card owns its own material instance, so uniforms are never shared between cards.
//
// Card-local UV: y = 0 is the printed bottom, y = 1 the printed top.
// q = 0 -> nothing filled; q = 0.5 -> exactly the lower half; q = 1 -> entire face.
// Output is linear HDR with premultiplied alpha: a normal-blended turquoise tint over the art
// plus a controlled emissive meniscus/edge/filament term for bloom. OutputPass tone-maps later.
import * as THREE from 'three';

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uCharge;
uniform float uPulse;
uniform float uTime;
uniform float uSelect;
uniform float uDim;
uniform float uShade;
uniform vec2 uSize;
uniform float uRadius;
uniform vec3 uTint;
uniform vec3 uHot;
uniform vec3 uSelectColor;

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 p = (vUv - 0.5) * uSize;
  float d = sdRoundRect(p, uSize * 0.5 - 0.035, uRadius);
  float inside = 1.0 - smoothstep(-0.006, 0.0, d);

  float q = clamp(uCharge, 0.0, 1.0);
  float filled;
  float meniscus = 0.0;
  float boundary = q;
  if (q <= 0.0) {
    filled = 0.0;
  } else if (q >= 1.0) {
    filled = 1.0;
  } else {
    // soft meniscus whose amplitude vanishes toward both endpoints
    float amp = 0.011 * smoothstep(0.0, 0.08, q) * (1.0 - smoothstep(0.92, 1.0, q));
    boundary = q + amp * (0.6 * sin(vUv.x * 17.0 + uTime * 2.6) + 0.4 * sin(vUv.x * 29.0 - uTime * 3.9));
    filled = 1.0 - smoothstep(boundary - 0.0035, boundary + 0.0035, vUv.y);
    meniscus = exp(-pow((vUv.y - boundary) / 0.010, 2.0)) * (1.0 - smoothstep(0.985, 1.0, q));
  }
  filled *= inside;
  meniscus *= inside;

  // fine rising filaments inside the energized region
  float fil = pow(abs(sin(vUv.x * 46.0 + sin(vUv.y * 9.0 - uTime * 1.6) * 1.8)), 36.0);
  fil += 0.6 * pow(abs(sin(vUv.x * 23.0 - 1.3 + sin(vUv.y * 5.0 + uTime * 1.1) * 2.4)), 48.0);
  fil *= filled * (0.45 + 0.55 * smoothstep(0.0, 0.25, boundary - vUv.y + 0.25));

  // stronger edge light just inside the rounded border
  float edge = (1.0 - smoothstep(0.0, 0.07, -d)) * filled;

  // normal-blended tint keeps the artwork readable
  float a = filled * (0.36 + 0.04 * fil);
  vec3 color = uTint * a;
  vec3 emissive = uHot * (meniscus * 2.4 + edge * 0.55 + fil * 0.16);

  // release pulse on a real fire event (bounded, decays in simulation time)
  // edge-weighted so the artwork never washes out
  emissive += uHot * uPulse * (0.22 * inside + 1.2 * (1.0 - smoothstep(0.0, 0.09, -d)) * inside);
  a = max(a, uPulse * 0.18 * inside);

  // selection / inspection outline (presentation only)
  float ring = (1.0 - smoothstep(0.0, 0.028, abs(d + 0.012))) * uSelect;
  emissive += uSelectColor * ring * 1.6;
  a = max(a, ring * 0.6);

  // optional darkening (unaffordable cards in hand): premultiplied black over the face
  float shade = uShade * inside * (1.0 - a);
  gl_FragColor = vec4((color + emissive) * uDim, a + shade);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface ChargeUniforms {
  [k: string]: THREE.IUniform;
  uCharge: { value: number };
  uPulse: { value: number };
  uTime: { value: number };
  uSelect: { value: number };
  uDim: { value: number };
  uShade: { value: number };
  uSize: { value: THREE.Vector2 };
  uRadius: { value: number };
  uTint: { value: THREE.Color };
  uHot: { value: THREE.Color };
  uSelectColor: { value: THREE.Color };
}

export function createChargeMaterial(width: number, height: number): THREE.ShaderMaterial & { uniforms: ChargeUniforms } {
  const uniforms: ChargeUniforms = {
    uCharge: { value: 0 },
    uPulse: { value: 0 },
    uTime: { value: 0 },
    uSelect: { value: 0 },
    uDim: { value: 1 },
    uShade: { value: 0 },
    uSize: { value: new THREE.Vector2(width, height) },
    uRadius: { value: 0.16 },
    uTint: { value: new THREE.Color(0x2fa59c) }, // deep turquoise: ink stays dark under the tint
    uHot: { value: new THREE.Color(0x8ff5ea) },
    uSelectColor: { value: new THREE.Color(0xf2d79a) },
  };
  const m = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
    depthTest: true,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    toneMapped: true,
  });
  m.name = 'cardCharge';
  return m as THREE.ShaderMaterial & { uniforms: ChargeUniforms };
}
