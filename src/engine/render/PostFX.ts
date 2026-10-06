import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';

/**
 * The HD-2D post stack:
 *
 *   scene ─► HDR target (MSAA, depth texture)
 *        ─► CoC + half-res downsample ─► bokeh gather (half res)
 *        ─► composite (sharp ↔ blurred by circle of confusion)
 *        ─► bloom (dual-filter down / up chain)
 *        ─► final: exposure, ACES, colour grade, vignette, grain, scene transition ─► screen
 *
 * Depth of field is depth based (so the diorama's near ground and far rooftops blur like a macro lens)
 * plus an optional screen-space tilt-shift band that pushes the top and bottom of the frame further
 * out of focus.
 */

export interface DofSettings {
  /** Distance from the camera to the plane of perfect focus (world units). */
  focusDistance: number;
  /** Half-width of the fully sharp band around the focus plane (world units). */
  focusRange: number;
  /** Blur growth per unit beyond the band, in front of / behind the focus plane. */
  nearScale: number;
  farScale: number;
  /** Maximum blur radius as a fraction of the screen height. */
  maxBlur: number;
  /** Extra blur toward the top / bottom edges of the screen (0 = none). */
  tiltShift: number;
  /** Where the tilt-shift band is centred (0 bottom .. 1 top) and its sharp half-height. */
  tiltCenter: number;
  tiltBand: number;
  /** How much bright pixels dominate the gather (bokeh discs). */
  bokehBoost: number;
}

export interface GradeSettings {
  exposure: number;
  contrast: number;
  saturation: number;
  /** Tint added to the shadows (linear RGB, small values). */
  shadowTint: THREE.Color;
  /** Multiplier on the highlights. */
  highlightTint: THREE.Color;
  vignette: number;
  grain: number;
  bloomStrength: number;
  bloomThreshold: number;
}

export const DEFAULT_DOF: DofSettings = {
  focusDistance: 30,
  focusRange: 2.5,
  nearScale: 0.16,
  farScale: 0.07,
  maxBlur: 0.011,
  tiltShift: 0.35,
  tiltCenter: 0.45,
  tiltBand: 0.28,
  bokehBoost: 2.5,
};

export const DEFAULT_GRADE: GradeSettings = {
  exposure: 1.0,
  contrast: 1.08,
  saturation: 1.08,
  shadowTint: new THREE.Color(0.0, 0.012, 0.022),
  highlightTint: new THREE.Color(1.04, 1.0, 0.94),
  vignette: 0.32,
  grain: 0.035,
  bloomStrength: 0.55,
  bloomThreshold: 0.72,
};

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const COC_FRAG = /* glsl */ `
#include <packing>
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform sampler2D tAO;
uniform float aoMix;
uniform float cameraNear, cameraFar;
uniform float focusDistance, focusRange, nearScale, farScale, maxBlurPx;
uniform float tiltShift, tiltCenter, tiltBand;
uniform vec2 texel; // full-res texel
varying vec2 vUv;

float coc(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  float z = -perspectiveDepthToViewZ(d, cameraNear, cameraFar);
  float dz = z - focusDistance;
  float c = dz < 0.0 ? -max(0.0, -dz - focusRange) * nearScale : max(0.0, dz - focusRange) * farScale;
  float t = smoothstep(tiltBand, tiltBand + 0.45, abs(uv.y - tiltCenter)) * tiltShift;
  c = c < 0.0 ? min(c, -t) : max(c, t);
  return clamp(c, -1.0, 1.0); // fraction of the max blur radius, signed (negative = in front)
}

void main() {
  // 2x2 downsample of colour; CoC takes the nearest-signed (most negative) / max of the four
  vec2 o = texel * 0.5;
  vec3 c = texture2D(tColor, vUv + vec2(-o.x, -o.y)).rgb + texture2D(tColor, vUv + vec2(o.x, -o.y)).rgb
         + texture2D(tColor, vUv + vec2(-o.x, o.y)).rgb + texture2D(tColor, vUv + vec2(o.x, o.y)).rgb;
  float a = coc(vUv + vec2(-o.x, -o.y)), b = coc(vUv + vec2(o.x, -o.y));
  float e = coc(vUv + vec2(-o.x, o.y)), f = coc(vUv + vec2(o.x, o.y));
  float mn = min(min(a, b), min(e, f));
  float mx = max(max(a, b), max(e, f));
  float cc = mn < 0.0 ? mn : mx;
  gl_FragColor = vec4(c * 0.25 * mix(1.0, texture2D(tAO, vUv).r, aoMix), cc);
}
`;

const BOKEH_FRAG = /* glsl */ `
uniform sampler2D tCoc; // rgb colour, a signed CoC (fraction of max)
uniform vec2 texel;     // half-res texel
uniform float maxBlurPx; // in half-res pixels
uniform float bokehBoost;
varying vec2 vUv;
const float GOLDEN = 2.39996323;

float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  vec4 center = texture2D(tCoc, vUv);
  float centerSize = abs(center.a) * maxBlurPx;
  float w0 = 1.0 + bokehBoost * lum(center.rgb) * lum(center.rgb);
  vec3 acc = center.rgb * w0;
  float tot = w0;
  float nearCover = max(0.0, -center.a);
  float radius = 0.6;
  for (int i = 0; i < 72; i++) {
    if (radius >= maxBlurPx) break;
    float ang = float(i) * GOLDEN;
    vec2 tc = vUv + vec2(cos(ang), sin(ang)) * texel * radius;
    vec4 s = texture2D(tCoc, tc);
    float sSize = abs(s.a) * maxBlurPx;
    // a sharper sample behind the centre must not bleed onto it
    if (s.a > center.a) sSize = min(sSize, centerSize * 2.0);
    float m = smoothstep(radius - 0.5, radius + 0.5, sSize);
    float l = lum(s.rgb);
    float w = 1.0 + bokehBoost * l * l;
    acc += mix(acc / tot, s.rgb, m) * w;
    tot += w;
    if (s.a < 0.0) nearCover = max(nearCover, -s.a * m);
    radius += 0.6 / max(radius, 0.6) * 1.2 + 0.25;
  }
  gl_FragColor = vec4(acc / tot, nearCover);
}
`;

/**
 * Screen-space ambient occlusion from the depth buffer (half resolution): soft contact shading in
 * corners, under eaves and around props. Normals are rebuilt from depth, picking the smaller of
 * the two neighbour differences so depth edges stay crisp.
 */
const AO_FRAG = /* glsl */ `
#include <packing>
uniform sampler2D tDepth;
uniform float cameraNear, cameraFar;
uniform vec2 tanFov;
uniform vec2 texel;
uniform float radius, intensity;
varying vec2 vUv;
vec3 viewPos(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  float z = -perspectiveDepthToViewZ(d, cameraNear, cameraFar);
  return vec3((uv * 2.0 - 1.0) * tanFov * z, -z);
}
void main() {
  vec3 P = viewPos(vUv);
  if (-P.z > cameraFar * 0.9) { gl_FragColor = vec4(1.0); return; }
  vec3 pr = viewPos(vUv + vec2(texel.x, 0.0)) - P, pl = P - viewPos(vUv - vec2(texel.x, 0.0));
  vec3 pu = viewPos(vUv + vec2(0.0, texel.y)) - P, pd = P - viewPos(vUv - vec2(0.0, texel.y));
  vec3 dx = abs(pr.z) < abs(pl.z) ? pr : pl;
  vec3 dy = abs(pu.z) < abs(pd.z) ? pu : pd;
  vec3 N = normalize(cross(dx, dy));
  vec2 sr = radius / (-P.z) / tanFov * 0.5;
  float rot = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 6.2831;
  float occ = 0.0;
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    float a = fi * 2.39996 + rot;
    float r = sqrt((fi + 0.5) / 14.0);
    vec3 S = viewPos(vUv + vec2(cos(a), sin(a)) * r * sr);
    vec3 v = S - P;
    float dist = length(v) + 1e-4;
    occ += max(0.0, dot(N, v / dist) - 0.12) * (1.0 - smoothstep(radius * 0.6, radius * 1.6, dist));
  }
  gl_FragColor = vec4(vec3(clamp(1.0 - occ / 14.0 * intensity, 0.0, 1.0)), 1.0);
}
`;

const AO_BLUR_FRAG = /* glsl */ `
#include <packing>
uniform sampler2D tAO;
uniform sampler2D tDepth;
uniform float cameraNear, cameraFar;
uniform vec2 texel;
varying vec2 vUv;
float lz(vec2 uv) { return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar); }
void main() {
  float zc = lz(vUv);
  float sum = 0.0, wsum = 0.0;
  for (int y = -2; y <= 2; y++) {
    for (int x = -2; x <= 2; x++) {
      vec2 uv = vUv + vec2(float(x), float(y)) * texel;
      float w = exp(-abs(lz(uv) - zc) * 4.0);
      sum += texture2D(tAO, uv).r * w;
      wsum += w;
    }
  }
  gl_FragColor = vec4(vec3(sum / wsum), 1.0);
}
`;

const COMPOSITE_FRAG = /* glsl */ `
#include <packing>
uniform sampler2D tColor;
uniform sampler2D tBlur;
uniform sampler2D tCocHalf;
uniform sampler2D tDepth;
uniform sampler2D tAO;
uniform float aoMix;
uniform float cameraNear, cameraFar;
uniform float focusDistance, focusRange, nearScale, farScale, maxBlurPx;
uniform float tiltShift, tiltCenter, tiltBand;
varying vec2 vUv;
float coc(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  float z = -perspectiveDepthToViewZ(d, cameraNear, cameraFar);
  float dz = z - focusDistance;
  float c = dz < 0.0 ? max(0.0, -dz - focusRange) * nearScale : max(0.0, dz - focusRange) * farScale;
  float t = smoothstep(tiltBand, tiltBand + 0.45, abs(uv.y - tiltCenter)) * tiltShift;
  return clamp(max(c, t), 0.0, 1.0);
}
void main() {
  vec3 sharp = texture2D(tColor, vUv).rgb * mix(1.0, texture2D(tAO, vUv).r, aoMix);
  vec4 blur = texture2D(tBlur, vUv);
  float c = coc(vUv) * maxBlurPx;           // in full-res pixels
  float k = smoothstep(0.8, 2.6, c);
  k = max(k, smoothstep(0.05, 0.35, blur.a)); // blurred foreground spills over sharp pixels
  gl_FragColor = vec4(mix(sharp, blur.rgb, k), 1.0);
}
`;

const BRIGHT_FRAG = /* glsl */ `
uniform sampler2D tInput;
uniform vec2 texel;
uniform float threshold;
varying vec2 vUv;
void main() {
  vec2 o = texel;
  vec3 c = (texture2D(tInput, vUv + vec2(-o.x, -o.y)).rgb + texture2D(tInput, vUv + vec2(o.x, -o.y)).rgb
          + texture2D(tInput, vUv + vec2(-o.x, o.y)).rgb + texture2D(tInput, vUv + vec2(o.x, o.y)).rgb) * 0.25;
  float l = max(c.r, max(c.g, c.b));
  float knee = threshold * 0.8;
  float soft = clamp(l - threshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee + 1e-4);
  float contrib = max(soft, l - threshold) / max(l, 1e-4);
  gl_FragColor = vec4(c * contrib, 1.0);
}
`;

const DOWN_FRAG = /* glsl */ `
uniform sampler2D tInput;
uniform vec2 texel; // source texel
varying vec2 vUv;
void main() {
  vec3 s = texture2D(tInput, vUv).rgb * 4.0;
  s += texture2D(tInput, vUv - texel).rgb;
  s += texture2D(tInput, vUv + texel).rgb;
  s += texture2D(tInput, vUv + vec2(texel.x, -texel.y)).rgb;
  s += texture2D(tInput, vUv - vec2(texel.x, -texel.y)).rgb;
  gl_FragColor = vec4(s / 8.0, 1.0);
}
`;

const UP_FRAG = /* glsl */ `
uniform sampler2D tInput;   // smaller level
uniform sampler2D tPrev;    // same-size level from the down chain
uniform vec2 texel;          // source texel
varying vec2 vUv;
void main() {
  vec3 s = vec3(0.0);
  s += texture2D(tInput, vUv + vec2(-texel.x * 2.0, 0.0)).rgb;
  s += texture2D(tInput, vUv + vec2(-texel.x, texel.y)).rgb * 2.0;
  s += texture2D(tInput, vUv + vec2(0.0, texel.y * 2.0)).rgb;
  s += texture2D(tInput, vUv + vec2(texel.x, texel.y)).rgb * 2.0;
  s += texture2D(tInput, vUv + vec2(texel.x * 2.0, 0.0)).rgb;
  s += texture2D(tInput, vUv + vec2(texel.x, -texel.y)).rgb * 2.0;
  s += texture2D(tInput, vUv + vec2(0.0, -texel.y * 2.0)).rgb;
  s += texture2D(tInput, vUv + vec2(-texel.x, -texel.y)).rgb * 2.0;
  gl_FragColor = vec4(s / 12.0 + texture2D(tPrev, vUv).rgb, 1.0);
}
`;

const FINAL_FRAG = /* glsl */ `
uniform sampler2D tInput;
uniform sampler2D tBloom;
uniform float exposure, contrast, saturation, vignette, grain, bloomStrength, time;
uniform vec3 shadowTint, highlightTint;
uniform float transition;   // 0 = none .. 1 = fully covered
uniform float transitionMode; // 0 fade to black, 1 battle swirl
uniform vec2 resolution;
varying vec2 vUv;

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = vUv;
  float tr = transition;
  if (transitionMode > 0.5 && tr > 0.0) {
    // battle intro: the frame twists and shatters toward the centre
    vec2 p = uv - 0.5;
    p.x *= resolution.x / resolution.y;
    float r = length(p);
    float a = atan(p.y, p.x) + tr * tr * 6.0 * (1.0 - r);
    r *= 1.0 + tr * 0.6;
    p = vec2(cos(a), sin(a)) * r;
    p.x /= resolution.x / resolution.y;
    uv = p + 0.5;
  }
  vec3 c = texture2D(tInput, uv).rgb + texture2D(tBloom, uv).rgb * bloomStrength;
  c *= exposure;
  c = aces(c);
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, saturation);
  c = (c - 0.5) * contrast + 0.5;
  c += shadowTint * (1.0 - smoothstep(0.0, 0.5, l));
  c *= mix(vec3(1.0), highlightTint, smoothstep(0.4, 1.0, l));
  vec2 v = vUv - 0.5;
  c *= 1.0 - vignette * smoothstep(0.25, 0.85, length(v * vec2(1.0, 0.85)) * 1.35);
  c = clamp(c, 0.0, 1.0);
  c = toSRGB(c);
  c += (hash(vUv * resolution + fract(time) * 100.0) - 0.5) * grain;
  if (tr > 0.0) {
    if (transitionMode > 0.5) {
      float flash = smoothstep(0.0, 0.25, tr) * (1.0 - smoothstep(0.25, 0.6, tr));
      c = mix(c, vec3(1.0, 0.97, 0.9), flash * 0.7);
      c = mix(c, vec3(0.0), smoothstep(0.55, 1.0, tr));
    } else {
      c = mix(c, vec3(0.0), tr);
    }
  }
  gl_FragColor = vec4(c, 1.0);
}
`;

function rt(w: number, h: number, opts: THREE.RenderTargetOptions = {}): THREE.WebGLRenderTarget {
  return new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    ...opts,
  });
}

function mat(frag: string, uniforms: Record<string, THREE.IUniform>): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
}

const BLOOM_LEVELS = 5;

export class PostFX {
  readonly dof: DofSettings = { ...DEFAULT_DOF };
  readonly grade: GradeSettings = { ...DEFAULT_GRADE, shadowTint: DEFAULT_GRADE.shadowTint.clone(), highlightTint: DEFAULT_GRADE.highlightTint.clone() };
  enabled = true;
  transition = 0;
  transitionMode = 0;

  private renderer: THREE.WebGLRenderer;
  private sceneRT: THREE.WebGLRenderTarget;
  private cocRT: THREE.WebGLRenderTarget;
  private aoRT: THREE.WebGLRenderTarget;
  private aoBlurRT: THREE.WebGLRenderTarget;
  private aoMat: THREE.ShaderMaterial;
  private aoBlurMat: THREE.ShaderMaterial;
  /** Ambient occlusion: radius in world units, strength, and how much of it to apply (0 = off). */
  readonly ao = { radius: 0.8, intensity: 1.6, mix: 1 };
  private blurRT: THREE.WebGLRenderTarget;
  private compRT: THREE.WebGLRenderTarget;
  private down: THREE.WebGLRenderTarget[] = [];
  private up: THREE.WebGLRenderTarget[] = [];
  private quad = new FullScreenQuad();
  private cocMat: THREE.ShaderMaterial;
  private bokehMat: THREE.ShaderMaterial;
  private compMat: THREE.ShaderMaterial;
  private brightMat: THREE.ShaderMaterial;
  private downMat: THREE.ShaderMaterial;
  private upMat: THREE.ShaderMaterial;
  private finalMat: THREE.ShaderMaterial;
  private w = 1;
  private h = 1;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    const depthTexture = new THREE.DepthTexture(1, 1);
    depthTexture.type = THREE.UnsignedIntType;
    this.sceneRT = rt(1, 1, { depthBuffer: true, depthTexture, samples: 4 });
    this.cocRT = rt(1, 1);
    this.aoRT = rt(1, 1);
    this.aoBlurRT = rt(1, 1);
    this.blurRT = rt(1, 1);
    this.compRT = rt(1, 1);
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      this.down.push(rt(1, 1));
      this.up.push(rt(1, 1));
    }
    const dofU = () => ({
      cameraNear: { value: 0.1 }, cameraFar: { value: 100 },
      focusDistance: { value: 30 }, focusRange: { value: 2 }, nearScale: { value: 0.1 }, farScale: { value: 0.05 },
      maxBlurPx: { value: 8 }, tiltShift: { value: 0 }, tiltCenter: { value: 0.5 }, tiltBand: { value: 0.3 },
    });
    this.cocMat = mat(COC_FRAG, { tColor: { value: null }, tDepth: { value: null }, tAO: { value: null }, aoMix: { value: 1 }, texel: { value: new THREE.Vector2() }, ...dofU() });
    this.bokehMat = mat(BOKEH_FRAG, { tCoc: { value: null }, texel: { value: new THREE.Vector2() }, maxBlurPx: { value: 8 }, bokehBoost: { value: 2 } });
    this.compMat = mat(COMPOSITE_FRAG, { tColor: { value: null }, tBlur: { value: null }, tCocHalf: { value: null }, tDepth: { value: null }, tAO: { value: null }, aoMix: { value: 1 }, ...dofU() });
    this.aoMat = mat(AO_FRAG, { tDepth: { value: null }, cameraNear: { value: 0.1 }, cameraFar: { value: 100 }, tanFov: { value: new THREE.Vector2() }, texel: { value: new THREE.Vector2() }, radius: { value: 1 }, intensity: { value: 1 } });
    this.aoBlurMat = mat(AO_BLUR_FRAG, { tAO: { value: null }, tDepth: { value: null }, cameraNear: { value: 0.1 }, cameraFar: { value: 100 }, texel: { value: new THREE.Vector2() } });
    this.brightMat = mat(BRIGHT_FRAG, { tInput: { value: null }, texel: { value: new THREE.Vector2() }, threshold: { value: 1 } });
    this.downMat = mat(DOWN_FRAG, { tInput: { value: null }, texel: { value: new THREE.Vector2() } });
    this.upMat = mat(UP_FRAG, { tInput: { value: null }, tPrev: { value: null }, texel: { value: new THREE.Vector2() } });
    this.finalMat = mat(FINAL_FRAG, {
      tInput: { value: null }, tBloom: { value: null },
      exposure: { value: 1 }, contrast: { value: 1 }, saturation: { value: 1 }, vignette: { value: 0 }, grain: { value: 0 },
      bloomStrength: { value: 0.5 }, time: { value: 0 },
      shadowTint: { value: new THREE.Color() }, highlightTint: { value: new THREE.Color(1, 1, 1) },
      transition: { value: 0 }, transitionMode: { value: 0 }, resolution: { value: new THREE.Vector2() },
    });
  }

  setSize(w: number, h: number): void {
    this.w = Math.max(1, Math.floor(w));
    this.h = Math.max(1, Math.floor(h));
    this.sceneRT.setSize(this.w, this.h);
    const hw = Math.max(1, this.w >> 1), hh = Math.max(1, this.h >> 1);
    this.cocRT.setSize(hw, hh);
    this.aoRT.setSize(hw, hh);
    this.aoBlurRT.setSize(hw, hh);
    this.blurRT.setSize(hw, hh);
    this.compRT.setSize(this.w, this.h);
    let bw = hw, bh = hh;
    for (let i = 0; i < BLOOM_LEVELS; i++) {
      this.down[i].setSize(bw, bh);
      this.up[i].setSize(bw, bh);
      bw = Math.max(1, bw >> 1);
      bh = Math.max(1, bh >> 1);
    }
  }

  private pass(m: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null): void {
    this.quad.material = m;
    this.renderer.setRenderTarget(target);
    this.quad.render(this.renderer);
  }

  private applyDof(u: Record<string, THREE.IUniform>, camera: THREE.PerspectiveCamera, maxBlurPx: number): void {
    const d = this.dof;
    u.cameraNear.value = camera.near;
    u.cameraFar.value = camera.far;
    u.focusDistance.value = d.focusDistance;
    u.focusRange.value = d.focusRange;
    u.nearScale.value = d.nearScale;
    u.farScale.value = d.farScale;
    u.maxBlurPx.value = maxBlurPx;
    u.tiltShift.value = d.tiltShift;
    u.tiltCenter.value = d.tiltCenter;
    u.tiltBand.value = d.tiltBand;
  }

  /**
   * Render a frame. `overlay` (optional) is drawn after all post-processing, unblurred and
   * ungraded, on top of everything: UI-like world elements such as the battle preview.
   */
  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera, time: number, overlay?: THREE.Scene | null): void {
    const r = this.renderer;
    if (!this.enabled) {
      r.setRenderTarget(null);
      r.render(scene, camera);
      this.renderOverlay(overlay, camera);
      return;
    }
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);

    const maxBlurFull = this.dof.maxBlur * this.h;
    // 0. ambient occlusion (half res) + depth-aware blur
    const au = this.aoMat.uniforms;
    au.tDepth.value = this.sceneRT.depthTexture;
    au.cameraNear.value = camera.near;
    au.cameraFar.value = camera.far;
    const ty = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    au.tanFov.value.set(ty * camera.aspect, ty);
    au.texel.value.set(2 / this.w, 2 / this.h);
    au.radius.value = this.ao.radius;
    au.intensity.value = this.ao.intensity;
    this.pass(this.aoMat, this.aoRT);
    const bu = this.aoBlurMat.uniforms;
    bu.tAO.value = this.aoRT.texture;
    bu.tDepth.value = this.sceneRT.depthTexture;
    bu.cameraNear.value = camera.near;
    bu.cameraFar.value = camera.far;
    bu.texel.value.set(1 / this.aoRT.width, 1 / this.aoRT.height);
    this.pass(this.aoBlurMat, this.aoBlurRT);
    this.cocMat.uniforms.tAO.value = this.aoBlurRT.texture;
    this.cocMat.uniforms.aoMix.value = this.ao.mix;
    this.compMat.uniforms.tAO.value = this.aoBlurRT.texture;
    this.compMat.uniforms.aoMix.value = this.ao.mix;
    // 1. CoC + half-res colour
    this.cocMat.uniforms.tColor.value = this.sceneRT.texture;
    this.cocMat.uniforms.tDepth.value = this.sceneRT.depthTexture;
    this.cocMat.uniforms.texel.value.set(1 / this.w, 1 / this.h);
    this.applyDof(this.cocMat.uniforms, camera, maxBlurFull);
    this.pass(this.cocMat, this.cocRT);
    // 2. bokeh gather
    this.bokehMat.uniforms.tCoc.value = this.cocRT.texture;
    this.bokehMat.uniforms.texel.value.set(1 / this.cocRT.width, 1 / this.cocRT.height);
    this.bokehMat.uniforms.maxBlurPx.value = maxBlurFull * 0.5;
    this.bokehMat.uniforms.bokehBoost.value = this.dof.bokehBoost;
    this.pass(this.bokehMat, this.blurRT);
    // 3. composite
    const cu = this.compMat.uniforms;
    cu.tColor.value = this.sceneRT.texture;
    cu.tBlur.value = this.blurRT.texture;
    cu.tCocHalf.value = this.cocRT.texture;
    cu.tDepth.value = this.sceneRT.depthTexture;
    this.applyDof(cu, camera, maxBlurFull);
    this.pass(this.compMat, this.compRT);
    // 4. bloom
    this.brightMat.uniforms.tInput.value = this.compRT.texture;
    this.brightMat.uniforms.texel.value.set(0.5 / this.w, 0.5 / this.h);
    this.brightMat.uniforms.threshold.value = this.grade.bloomThreshold;
    this.pass(this.brightMat, this.down[0]);
    for (let i = 1; i < BLOOM_LEVELS; i++) {
      this.downMat.uniforms.tInput.value = this.down[i - 1].texture;
      this.downMat.uniforms.texel.value.set(1 / this.down[i - 1].width, 1 / this.down[i - 1].height);
      this.pass(this.downMat, this.down[i]);
    }
    let src = this.down[BLOOM_LEVELS - 1];
    for (let i = BLOOM_LEVELS - 2; i >= 0; i--) {
      this.upMat.uniforms.tInput.value = src.texture;
      this.upMat.uniforms.tPrev.value = this.down[i].texture;
      this.upMat.uniforms.texel.value.set(1 / src.width, 1 / src.height);
      this.pass(this.upMat, this.up[i]);
      src = this.up[i];
    }
    // 5. final
    const g = this.grade, fu = this.finalMat.uniforms;
    fu.tInput.value = this.compRT.texture;
    fu.tBloom.value = this.up[0].texture;
    fu.exposure.value = g.exposure;
    fu.contrast.value = g.contrast;
    fu.saturation.value = g.saturation;
    fu.vignette.value = g.vignette;
    fu.grain.value = g.grain;
    fu.bloomStrength.value = g.bloomStrength / BLOOM_LEVELS * 2;
    fu.shadowTint.value.copy(g.shadowTint);
    fu.highlightTint.value.copy(g.highlightTint);
    fu.time.value = time;
    fu.transition.value = this.transition;
    fu.transitionMode.value = this.transitionMode;
    fu.resolution.value.set(this.w, this.h);
    this.pass(this.finalMat, null);
    this.renderOverlay(overlay, camera);
  }

  private renderOverlay(overlay: THREE.Scene | null | undefined, camera: THREE.Camera): void {
    if (!overlay || this.transition > 0.5) return;
    const r = this.renderer;
    r.autoClear = false;
    r.clearDepth();
    r.render(overlay, camera);
    r.autoClear = true;
  }
}
