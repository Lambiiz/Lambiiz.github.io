// Visual effects: pooled additive particles plus one-shot meshes (slash arcs,
// light blades, shock rings, shields, glyph circles, shard volleys) and DOM
// damage numbers projected from world space.
import * as THREE from 'three';
import { el } from '../ui/dom.js';
import { glowTexture } from '../world/textures.js';
import { easeOutCubic, easeOutBack } from '../core/math.js';

const MAX = 3000;

class ParticlePool {
  constructor(scene) {
    this.pos = new Float32Array(MAX * 3);
    this.col = new Float32Array(MAX * 3);
    this.size = new Float32Array(MAX);
    this.alpha = new Float32Array(MAX);
    this.vel = new Float32Array(MAX * 3);
    this.life = new Float32Array(MAX);
    this.maxLife = new Float32Array(MAX);
    this.baseSize = new Float32Array(MAX);
    this.drag = new Float32Array(MAX);
    this.grav = new Float32Array(MAX);
    this.count = 0;
    this.cursor = 0;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo = g;
    const mat = new THREE.ShaderMaterial({
      uniforms: { map: { value: glowTexture() }, scale: { value: innerHeight * 0.5 } },
      vertexShader: /* glsl */ `
        attribute float size; attribute float alpha; attribute vec3 color;
        varying vec3 vColor; varying float vAlpha; uniform float scale;
        void main() {
          vColor = color; vAlpha = alpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; varying vec3 vColor; varying float vAlpha;
        void main() {
          vec4 t = texture2D(map, gl_PointCoord);
          gl_FragColor = vec4(vColor * t.rgb * 1.6, t.a * vAlpha);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.mat = mat;
    this.points = new THREE.Points(g, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 10;
    scene.add(this.points);
  }

  emit(p, v, { life = 0.8, size = 0.12, color = new THREE.Color(1, 1, 1), drag = 1.5, gravity = 0 } = {}) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % MAX;
    this.pos.set([p.x, p.y, p.z], i * 3);
    this.vel.set([v.x, v.y, v.z], i * 3);
    this.col.set([color.r, color.g, color.b], i * 3);
    this.life[i] = life;
    this.maxLife[i] = life;
    this.baseSize[i] = size;
    this.drag[i] = drag;
    this.grav[i] = gravity;
  }

  update(dt) {
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) {
        this.alpha[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      const k = Math.exp(-this.drag[i] * dt);
      this.vel[i * 3] *= k;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * k - this.grav[i] * dt;
      this.vel[i * 3 + 2] *= k;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = Math.min(1, t * 2.2);
      this.size[i] = this.baseSize[i] * (0.4 + 0.6 * t);
    }
    for (const n of ['position', 'color', 'size', 'alpha']) this.geo.attributes[n].needsUpdate = true;
  }

  clear() {
    this.life.fill(0);
  }
}

function runeTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  g.translate(S / 2, S / 2);
  g.strokeStyle = '#fff';
  g.fillStyle = '#fff';
  g.lineWidth = 6;
  g.beginPath();
  g.arc(0, 0, 240, 0, Math.PI * 2);
  g.stroke();
  g.lineWidth = 3;
  g.beginPath();
  g.arc(0, 0, 190, 0, Math.PI * 2);
  g.stroke();
  // orbiting handwritten-style strokes (original glyph alphabet)
  for (let i = 0; i < 16; i++) {
    g.save();
    g.rotate((i / 16) * Math.PI * 2);
    g.translate(0, -215);
    g.lineWidth = 4;
    g.beginPath();
    const k = i % 4;
    if (k === 0) { g.moveTo(-10, -10); g.lineTo(10, 10); g.moveTo(10, -10); g.lineTo(0, 0); }
    if (k === 1) { g.arc(0, 0, 9, 0, Math.PI * 1.4); }
    if (k === 2) { g.moveTo(-10, 8); g.lineTo(0, -10); g.lineTo(10, 8); }
    if (k === 3) { g.moveTo(-10, 0); g.lineTo(10, 0); g.moveTo(0, -10); g.lineTo(0, 10); }
    g.stroke();
    g.restore();
  }
  // central flame-ish triangle
  g.lineWidth = 5;
  g.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
    g.lineTo(Math.cos(a) * 150, Math.sin(a) * 150);
  }
  g.closePath();
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function arcGeometry(radius, width, arc) {
  const seg = 48;
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const a = -arc / 2 + t * arc;
    const w = width * Math.sin(t * Math.PI); // tapered crescent
    for (const s of [0, 1]) {
      const r = radius + (s ? w / 2 : -w / 2);
      pos.push(Math.cos(a) * r, Math.sin(a) * r, 0);
      uv.push(t, s);
    }
    if (i < seg) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

const sweepMaterial = (color) =>
  new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(color) }, progress: { value: 0 }, fade: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 color; uniform float progress, fade; varying vec2 vUv;
      void main(){
        float head = smoothstep(progress - 0.55, progress, vUv.x) * step(vUv.x, progress);
        float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
        float core = smoothstep(0.0, 0.6, edge);
        vec3 c = mix(color, vec3(1.0), pow(edge, 4.0) * 0.8);
        gl_FragColor = vec4(c * 2.2, head * core * fade);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });

export class Effects {
  constructor(scene, camera, tasks, uiRoot) {
    this.scene = scene;
    this.camera = camera;
    this.tasks = tasks;
    this.particles = new ParticlePool(scene);
    this.group = new THREE.Group();
    scene.add(this.group);
    this.runeTex = runeTexture();
    this.glow = glowTexture();
    this.numbers = el('div', { class: 'dmg-layer' });
    uiRoot.append(this.numbers);
    this.emitters = [];
    this.tmp = new THREE.Vector3();
  }

  reset() {
    this.particles.clear();
    for (const c of [...this.group.children]) this._dispose(c);
    this.emitters.length = 0;
    this.numbers.innerHTML = '';
  }

  _dispose(o) {
    this.group.remove(o);
    o.traverse((m) => {
      if (m.geometry) m.geometry.dispose();
      if (m.material && !m.material.userData?.shared) m.material.dispose?.();
    });
  }

  /** Continuous emitter callback: fn(dt) returns false to stop. */
  addEmitter(fn) {
    this.emitters.push(fn);
    return fn;
  }

  removeEmitter(fn) {
    this.emitters = this.emitters.filter((e) => e !== fn);
  }

  burst(pos, { count = 40, color = 0xffffff, speed = 3, life = 0.7, size = 0.12, gravity = 0, drag = 3, spread = 1, up = 0 } = {}) {
    const col = new THREE.Color(color);
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      v.set(Math.random() - 0.5, Math.random() - 0.5 + up, Math.random() - 0.5).normalize().multiplyScalar(speed * (0.3 + Math.random() * 0.9));
      v.x *= spread;
      v.z *= spread;
      const c = col.clone().offsetHSL((Math.random() - 0.5) * 0.04, 0, (Math.random() - 0.5) * 0.15);
      this.particles.emit(pos, v, { life: life * (0.5 + Math.random() * 0.8), size: size * (0.5 + Math.random()), color: c, drag, gravity });
    }
  }

  /** Expanding ground ring. */
  ring(pos, { color = 0x2cf2d4, radius = 2.2, dur = 0.6, y = 0.03, width = 0.12 } = {}) {
    const geo = new THREE.RingGeometry(1 - width, 1, 64);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(pos.x, y, pos.z);
    this.group.add(m);
    return this.tasks.tween(dur, (t) => {
      m.scale.setScalar(0.1 + radius * easeOutCubic(t));
      mat.opacity = 1 - t;
      if (t >= 1) this._dispose(m);
    });
  }

  /** Vertical ring (shockwave facing the camera axis). */
  shock(pos, { color = 0xffffff, radius = 1.6, dur = 0.45, normal = null } = {}) {
    const geo = new THREE.RingGeometry(0.85, 1, 64);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos);
    if (normal) m.lookAt(pos.clone().add(normal));
    else m.lookAt(this.camera.position);
    this.group.add(m);
    return this.tasks.tween(dur, (t) => {
      m.scale.setScalar(0.05 + radius * easeOutCubic(t));
      mat.opacity = (1 - t) * 0.9;
      if (t >= 1) this._dispose(m);
    });
  }

  /** Bright billboard flash at a point. */
  flare(pos, { color = 0xffffff, size = 2.5, dur = 0.35 } = {}) {
    const mat = new THREE.SpriteMaterial({ map: this.glow, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const s = new THREE.Sprite(mat);
    s.position.copy(pos);
    this.group.add(s);
    return this.tasks.tween(dur, (t) => {
      s.scale.setScalar(size * (0.4 + easeOutCubic(t) * 0.8));
      mat.opacity = 1 - t;
      if (t >= 1) this._dispose(s);
    });
  }

  /** Crescent slash sweep. `basis` orients the arc in world space. */
  slash(pos, { color = 0xffffff, radius = 0.9, width = 0.35, arc = 2.4, dur = 0.28, yaw = 0, tilt = 0.5, roll = 0 } = {}) {
    const m = new THREE.Mesh(arcGeometry(radius, width, arc), sweepMaterial(color));
    m.position.copy(pos);
    m.rotation.set(tilt, yaw, roll, 'YXZ');
    m.renderOrder = 11;
    this.group.add(m);
    const u = m.material.uniforms;
    return this.tasks.tween(dur + 0.25, (t) => {
      const k = t * (dur + 0.25);
      u.progress.value = Math.min(1.4, (k / dur) * 1.4);
      u.fade.value = k < dur ? 1 : 1 - (k - dur) / 0.25;
      m.scale.setScalar(1 + t * 0.15);
      if (t >= 1) this._dispose(m);
    });
  }

  /** Lumen Edge: a blade of light forms above the caster and spears the target. */
  async lightBlade(from, to) {
    const len = 2.6;
    const geo = new THREE.PlaneGeometry(0.34, len);
    const mat = new THREE.ShaderMaterial({
      uniforms: { a: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);} `,
      fragmentShader: `
        uniform float a; varying vec2 vUv;
        void main(){
          float x = abs(vUv.x - 0.5) * 2.0;
          float tip = smoothstep(1.0, 0.75, vUv.y) * smoothstep(0.0, 0.08, vUv.y);
          float body = (1.0 - smoothstep(0.0, 1.0 - vUv.y * 0.6, x));
          vec3 col = mix(vec3(0.17, 0.95, 0.83), vec3(1.0), pow(1.0 - x, 6.0));
          gl_FragColor = vec4(col * 2.5, body * tip * a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const blade = new THREE.Group();
    const p1 = new THREE.Mesh(geo, mat);
    const p2 = new THREE.Mesh(geo, mat);
    p2.rotation.y = Math.PI / 2;
    blade.add(p1, p2);
    const start = from.clone().add(new THREE.Vector3(0, 2.4, 0));
    blade.position.copy(start);
    this.group.add(blade);
    // form
    const em = this.addEmitter(() => {
      this.particles.emit(blade.position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.3)), new THREE.Vector3(0, 0.6, 0), { life: 0.5, size: 0.08, color: new THREE.Color(0x9ffff0) });
      return true;
    });
    await this.tasks.tween(0.45, (t) => {
      mat.uniforms.a.value = t;
      blade.scale.set(1, easeOutBack(t), 1);
      blade.rotation.y += 0.25;
    });
    // aim and launch
    const dir = to.clone().sub(start).normalize();
    blade.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    await this.tasks.sleep(0.12);
    const s0 = blade.position.clone();
    await this.tasks.tween(0.16, (t) => {
      blade.position.lerpVectors(s0, to, t);
      this.particles.emit(blade.position, new THREE.Vector3(), { life: 0.35, size: 0.22, color: new THREE.Color(0x2cf2d4) });
    });
    this.removeEmitter(em);
    this._dispose(blade);
  }

  /** Cinder Verse: a burning glyph circle is written in the air, then erupts at the target. */
  async glyphCircle(at, facing, { color = 0xff8a3d, size = 1.6, dur = 0.7 } = {}) {
    const mat = new THREE.MeshBasicMaterial({ map: this.runeTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, opacity: 0 });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
    m.position.copy(at);
    m.lookAt(at.clone().add(facing));
    this.group.add(m);
    await this.tasks.tween(dur, (t) => {
      mat.opacity = Math.min(1, t * 2);
      m.rotateZ(0.06);
      m.scale.setScalar(0.4 + easeOutBack(Math.min(1, t * 1.4)) * 0.6);
    });
    return {
      mesh: m,
      dispose: () =>
        this.tasks.tween(0.3, (t) => {
          mat.opacity = 1 - t;
          m.scale.setScalar(1 + t * 0.6);
          if (t >= 1) this._dispose(m);
        }),
    };
  }

  /** Fire stream travelling between two points. */
  async fireStream(from, to, dur = 0.45) {
    const p = new THREE.Vector3();
    await this.tasks.tween(dur, (t) => {
      for (let i = 0; i < 14; i++) {
        const k = Math.max(0, t - Math.random() * 0.25);
        p.lerpVectors(from, to, k);
        p.x += Math.sin(k * 18 + i) * 0.18;
        p.y += Math.cos(k * 18 + i) * 0.18;
        const c = new THREE.Color().setHSL(0.03 + Math.random() * 0.07, 1, 0.55);
        this.particles.emit(p, new THREE.Vector3((Math.random() - 0.5) * 0.6, Math.random() * 0.8, (Math.random() - 0.5) * 0.6), { life: 0.45, size: 0.3, color: c, drag: 2 });
      }
    });
  }

  fireball(pos) {
    this.flare(pos, { color: 0xffa040, size: 4.2, dur: 0.5 });
    this.burst(pos, { count: 140, color: 0xff7a2a, speed: 5, life: 0.9, size: 0.3, gravity: -1.2, drag: 2.5 });
    this.burst(pos, { count: 60, color: 0xffe0a0, speed: 2, life: 0.5, size: 0.4, drag: 3 });
    this.shock(pos, { color: 0xff8a3d, radius: 2.2 });
    // lingering embers
    let n = 0;
    const em = this.addEmitter(() => {
      if (++n > 50) return false;
      const c = new THREE.Color().setHSL(0.05 + Math.random() * 0.05, 1, 0.6);
      this.particles.emit(pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.2)), new THREE.Vector3(0, 1.2, 0), { life: 0.9, size: 0.12, color: c, drag: 0.5 });
      return true;
    });
    void em;
  }

  /** Enemy: volley of glass shards. */
  async shardVolley(from, to, { count = 14, color = 0xbff7ff } = {}) {
    const geo = new THREE.TetrahedronGeometry(0.1, 0);
    geo.scale(0.5, 2.2, 0.5);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const shards = [];
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(geo, mat);
      const a = (i / count) * Math.PI * 2;
      const off = new THREE.Vector3(Math.cos(a) * 0.9, 0.6 + Math.sin(a) * 0.7, 0);
      m.position.copy(from).add(off);
      m.userData = { off, delay: Math.random() * 0.25, start: m.position.clone() };
      this.group.add(m);
      shards.push(m);
    }
    // hover / spin up
    await this.tasks.tween(0.5, (t) => {
      shards.forEach((m) => {
        m.rotation.y += 0.3;
        m.position.y = m.userData.start.y + Math.sin(t * Math.PI) * 0.15;
      });
    });
    await this.tasks.tween(0.55, (t) => {
      shards.forEach((m) => {
        const k = Math.max(0, Math.min(1, (t - m.userData.delay) / 0.6));
        const target = to.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.6, 0));
        m.position.lerpVectors(m.userData.start, target, k * k);
        m.lookAt(to);
        m.rotateX(Math.PI / 2);
        if (k > 0.05 && k < 1) this.particles.emit(m.position, new THREE.Vector3(), { life: 0.25, size: 0.08, color: new THREE.Color(color) });
      });
    });
    shards.forEach((m) => this.group.remove(m));
    geo.dispose();
    mat.dispose();
  }

  /** Enemy: dark gathering vortex. Returns a stop function. */
  chargeAura(target, color = 0xff2d6a) {
    const col = new THREE.Color(color);
    const v = new THREE.Vector3();
    const em = this.addEmitter(() => {
      for (let i = 0; i < 4; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.6 + Math.random() * 0.8;
        const p = target.clone().add(new THREE.Vector3(Math.cos(a) * r, Math.random() * 2.2, Math.sin(a) * r));
        v.copy(target).add(new THREE.Vector3(0, 1.1, 0)).sub(p).multiplyScalar(1.8);
        this.particles.emit(p, v, { life: 0.55, size: 0.14, color: col, drag: 0 });
      }
      return true;
    });
    return () => this.removeEmitter(em);
  }

  /** Hexagonal guard barrier in front of a character. */
  shield(pos, facingYaw, { color = 0x2cf2d4 } = {}) {
    const geo = new THREE.CircleGeometry(0.85, 6);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
    const g = new THREE.Group();
    const m = new THREE.Mesh(geo, mat);
    g.add(m, edge);
    g.position.copy(pos);
    g.rotation.y = facingYaw;
    this.group.add(g);
    this.tasks.tween(0.3, (t) => {
      mat.opacity = t * 0.22;
      edge.material.opacity = t;
      g.scale.setScalar(easeOutBack(t));
    });
    let alive = true;
    const em = this.addEmitter(() => {
      if (!alive) return false;
      g.rotation.z += 0.01;
      return true;
    });
    void em;
    return {
      pulse: () => {
        this.tasks.tween(0.25, (t) => {
          mat.opacity = 0.6 * (1 - t) + 0.22 * t;
          g.scale.setScalar(1.15 - t * 0.15);
        });
      },
      dispose: () =>
        this.tasks.tween(0.3, (t) => {
          mat.opacity = 0.22 * (1 - t);
          edge.material.opacity = 1 - t;
          if (t >= 1) {
            alive = false;
            this._dispose(g);
          }
        }),
    };
  }

  /** Rising sparkles (healing). */
  rise(pos, color = 0x9cff6e, count = 60) {
    const col = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.5;
      const p = pos.clone().add(new THREE.Vector3(Math.cos(a) * r, Math.random() * 0.4, Math.sin(a) * r));
      this.particles.emit(p, new THREE.Vector3(0, 1 + Math.random() * 1.6, 0), { life: 1.1, size: 0.1, color: col, drag: 0.8 });
    }
    this.ring(pos, { color, radius: 1.3, dur: 0.8 });
  }

  /** Afterimage streak between two points (dash). */
  streak(from, to, color = 0x2cf2d4) {
    const p = new THREE.Vector3();
    for (let i = 0; i < 40; i++) {
      p.lerpVectors(from, to, i / 40);
      p.y += 0.6 + Math.random() * 0.8;
      this.particles.emit(p, new THREE.Vector3((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3), { life: 0.35, size: 0.18, color: new THREE.Color(color), drag: 4 });
    }
  }

  /** Floating damage / status text anchored to a world point. */
  popText(worldPos, text, kind = 'dmg', { delay = 0, offset = 0 } = {}) {
    const node = el('div', { class: `pop pop--${kind}` }, text);
    node.style.setProperty('--dx', `${(Math.random() - 0.5) * 60 + offset}px`);
    node.style.animationDelay = `${delay}s`;
    this.numbers.append(node);
    const anchor = worldPos.clone();
    const place = () => {
      const v = anchor.clone().project(this.camera);
      node.style.left = `${(v.x * 0.5 + 0.5) * innerWidth}px`;
      node.style.top = `${(-v.y * 0.5 + 0.5) * innerHeight}px`;
    };
    place();
    let life = 1.6 + delay;
    this.addEmitter((dt) => {
      life -= dt;
      place();
      if (life <= 0) {
        node.remove();
        return false;
      }
      return true;
    });
  }

  update(dt) {
    for (const fn of [...this.emitters]) {
      if (fn(dt) === false) this.removeEmitter(fn);
    }
    this.particles.update(dt);
  }
}
