// Post-processing stack: bloom + a custom "grade" pass that drives the game's
// colour identity and all screen-space transition effects.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    saturation: { value: 1.1 },
    contrast: { value: 1.08 },
    tint: { value: new THREE.Color(1, 1, 1) },
    tintAmount: { value: 0 },
    duoA: { value: new THREE.Color(0x0a0420) },
    duoB: { value: new THREE.Color(0xff3d6e) },
    duotone: { value: 0 },
    vignette: { value: 0.32 },
    chroma: { value: 0.0 },
    invert: { value: 0 },
    flash: { value: 0 },
    flashColor: { value: new THREE.Color(1, 1, 1) },
    zoomBlur: { value: 0 },
    speedLines: { value: 0 },
    grain: { value: 0.035 },
    aspect: { value: 1 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time, saturation, contrast, tintAmount, duotone, vignette, chroma, invert, flash, zoomBlur, speedLines, grain, aspect;
    uniform vec3 tint, duoA, duoB, flashColor;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    vec3 sampleRGB(vec2 uv) {
      vec2 dir = uv - 0.5;
      float r = texture2D(tDiffuse, uv + dir * chroma * 0.035).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - dir * chroma * 0.035).b;
      return vec3(r, g, b);
    }
    void main() {
      vec2 uv = vUv;
      vec3 col;
      if (zoomBlur > 0.001) {
        vec3 acc = vec3(0.0);
        vec2 d = (uv - 0.5) * zoomBlur * 0.12;
        for (int i = 0; i < 10; i++) acc += sampleRGB(uv - d * float(i) / 10.0);
        col = acc / 10.0;
      } else {
        col = sampleRGB(uv);
      }
      // grade
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, saturation);
      col = (col - 0.5) * contrast + 0.5;
      col = mix(col, col * tint, tintAmount);
      vec3 duo = mix(duoA, duoB, smoothstep(0.05, 0.85, l));
      col = mix(col, duo, duotone);
      // speed lines radiating from centre (manga-style emphasis)
      if (speedLines > 0.001) {
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
        float a = atan(p.y, p.x);
        float rays = step(0.82, hash(vec2(floor(a * 60.0), floor(time * 18.0))));
        float rad = smoothstep(0.25, 0.75, length(p));
        col = mix(col, vec3(1.0), rays * rad * speedLines * 0.65);
      }
      // vignette
      vec2 vv = (uv - 0.5) * vec2(aspect, 1.0);
      col *= 1.0 - vignette * smoothstep(0.35, 1.05, length(vv) * 1.25);
      col = mix(col, 1.0 - col, invert);
      col = mix(col, flashColor, flash);
      col += (hash(uv * 1000.0 + time) - 0.5) * grain;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export class Post {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    const size = renderer.getSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
    this.composer = new EffectComposer(renderer, rt);
    this.renderPass = new RenderPass(scene, camera);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.45, 0.6, 0.86);
    this.grade = new ShaderPass(GradeShader);
    this.output = new OutputPass();
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloom);
    this.composer.addPass(this.output);
    this.composer.addPass(this.grade);
    this.u = this.grade.uniforms;
  }

  setCamera(camera) {
    this.renderPass.camera = camera;
  }

  setSize(w, h) {
    this.composer.setSize(w, h);
    this.u.aspect.value = w / h;
  }

  render(dt) {
    this.u.time.value += dt;
    this.composer.render(dt);
  }
}
