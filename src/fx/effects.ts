// Pooled, event-driven cosmetic effects. Nothing here can affect damage, enemies or shots:
// pool exhaustion only drops visuals. Combat effects age with (interpolated) simulation time so
// they freeze in place during drafts; placement pulses and ambient dust use presentation time.
import * as THREE from 'three';
import type { ProjectileState, SimEvent, Vec2, WeaponId } from '../game/types';
import { Rng } from '../game/rng';
import { EMITTER_POS, LID_TOP } from '../view/layout';
import { footprintGap } from '../game/simulation';
import * as art from '../view/art';

const hdr = (hex: number, k: number) => new THREE.Color(hex).multiplyScalar(k);

export const WEAPON_COLORS: Record<WeaponId, THREE.Color> = {
  needle: hdr(0x69dad0, 3.0),
  light: hdr(0xf3dfae, 3.0),
  thread: hdr(0x7fa8ff, 3.2),
  bell: hdr(0xe8a07a, 2.6),
};

// ---------------------------------------------------------------- ribbons
const ribbonVert = /* glsl */ `
attribute float aAlong;
attribute float aSide;
varying float vAlong;
varying float vSide;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const ribbonFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uHead; // 0..1 portion of the ribbon revealed
varying float vAlong;
varying float vSide;
void main() {
  float edge = 1.0 - pow(abs(vSide), 1.6);
  float reveal = 1.0 - smoothstep(uHead - 0.02, uHead, vAlong);
  float a = edge * uAlpha * reveal;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(uColor * a, a);
}`;

const MAX_RIBBON_POINTS = 32;

class Ribbon {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  geo: THREE.BufferGeometry;
  pos: Float32Array;
  active = false;
  born = 0;
  life = 0.3;
  width = 0.1;
  points: THREE.Vector3[] = [];
  color = new THREE.Color();
  revealTime = 0.04;
  flicker = 0;
  presentation = false;

  constructor(parent: THREE.Object3D) {
    this.geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(MAX_RIBBON_POINTS * 2 * 3);
    const along = new Float32Array(MAX_RIBBON_POINTS * 2);
    const side = new Float32Array(MAX_RIBBON_POINTS * 2);
    const idx: number[] = [];
    for (let i = 0; i < MAX_RIBBON_POINTS; i++) {
      side[i * 2] = -1;
      side[i * 2 + 1] = 1;
      if (i < MAX_RIBBON_POINTS - 1) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aAlong', new THREE.BufferAttribute(along, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSide', new THREE.BufferAttribute(side, 1));
    this.geo.setIndex(idx);
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: ribbonVert,
      fragmentShader: ribbonFrag,
      uniforms: { uColor: { value: new THREE.Color() }, uAlpha: { value: 0 }, uHead: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      premultipliedAlpha: true,
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
    this.mesh.renderOrder = 6;
    parent.add(this.mesh);
  }

  build(viewDir: THREE.Vector3): void {
    const n = Math.min(this.points.length, MAX_RIBBON_POINTS);
    const along = this.geo.attributes.aAlong as THREE.BufferAttribute;
    let total = 0;
    const lens = [0];
    for (let i = 1; i < n; i++) {
      total += this.points[i].distanceTo(this.points[i - 1]);
      lens.push(total);
    }
    const dir = new THREE.Vector3();
    const sideV = new THREE.Vector3();
    for (let i = 0; i < MAX_RIBBON_POINTS; i++) {
      const j = Math.min(i, n - 1);
      const p = this.points[j];
      const a = this.points[Math.max(0, j - 1)];
      const b = this.points[Math.min(n - 1, j + 1)];
      dir.subVectors(b, a).normalize();
      sideV.crossVectors(dir, viewDir).normalize();
      const taper = 0.55 + 0.45 * Math.sin((lens[j] / Math.max(total, 1e-4)) * Math.PI);
      const w = this.width * taper;
      this.pos.set([p.x - sideV.x * w, p.y - sideV.y * w, p.z - sideV.z * w], i * 6);
      this.pos.set([p.x + sideV.x * w, p.y + sideV.y * w, p.z + sideV.z * w], i * 6 + 3);
      const t = total > 0 ? lens[j] / total : 0;
      along.setX(i * 2, t);
      along.setX(i * 2 + 1, t);
    }
    (this.geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    along.needsUpdate = true;
    this.geo.setDrawRange(0, Math.max(0, (n - 1) * 6));
  }
}

// ---------------------------------------------------------------- rings (bell, landing, base hit)
const ringFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uWidth;
varying vec2 vUv;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float ring = exp(-pow((r - (1.0 - uWidth)) / uWidth, 2.0));
  // soft trailing ripple just inside the crest (no filled disc)
  float trail = exp(-pow((r - (1.0 - uWidth * 2.5)) / (uWidth * 1.5), 2.0)) * 0.22;
  float a = (ring + trail) * uAlpha;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(uColor * a, a);
}`;
const ringVert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

interface RingFx {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  active: boolean;
  born: number;
  life: number;
  r0: number;
  r1: number;
  presentation: boolean;
  alpha: number;
}

// ---------------------------------------------------------------- particles
const ptVert = /* glsl */ `
attribute float aSize;
attribute vec4 aColor;
varying vec4 vColor;
uniform float uScale;
void main() {
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale;
}`;
const ptFrag = /* glsl */ `
varying vec4 vColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c) * 4.0;
  float a = (1.0 - d) * vColor.a;
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vColor.rgb * a, a);
}`;

class ParticlePool {
  readonly points: THREE.Points;
  private mat: THREE.ShaderMaterial;
  private geo: THREE.BufferGeometry;
  private pos: Float32Array;
  private col: Float32Array;
  private size: Float32Array;
  private vel: Float32Array;
  private born: Float32Array;
  private life: Float32Array;
  private baseSize: Float32Array;
  private gravity: Float32Array;
  private rgb: Float32Array;
  private alive: Uint8Array;
  private cursor = 0;
  budget: number;
  readonly capacity: number;
  liveCount = 0;

  constructor(parent: THREE.Object3D, capacity: number, presentationTime: boolean) {
    this.capacity = capacity;
    this.budget = capacity;
    this.geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(capacity * 3);
    this.col = new Float32Array(capacity * 4);
    this.size = new Float32Array(capacity);
    this.vel = new Float32Array(capacity * 3);
    this.born = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.baseSize = new Float32Array(capacity);
    this.gravity = new Float32Array(capacity);
    this.rgb = new Float32Array(capacity * 3);
    this.alive = new Uint8Array(capacity);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: ptVert,
      fragmentShader: ptFrag,
      uniforms: { uScale: { value: 30 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      premultipliedAlpha: true,
    });
    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 7;
    void presentationTime;
    parent.add(this.points);
  }

  setScale(pxPerUnit: number): void {
    this.mat.uniforms.uScale.value = pxPerUnit;
  }

  emit(p: THREE.Vector3, vel: THREE.Vector3, color: THREE.Color, size: number, life: number, t: number, gravity = 0): void {
    if (this.liveCount >= this.budget) return; // cosmetic budget only
    // find a free slot from the cursor
    for (let n = 0; n < this.capacity; n++) {
      const i = (this.cursor + n) % this.capacity;
      if (!this.alive[i]) {
        this.cursor = (i + 1) % this.capacity;
        this.alive[i] = 1;
        this.liveCount++;
        this.pos.set([p.x, p.y, p.z], i * 3);
        this.vel.set([vel.x, vel.y, vel.z], i * 3);
        this.rgb.set([color.r, color.g, color.b], i * 3);
        this.born[i] = t;
        this.life[i] = life;
        this.baseSize[i] = size;
        this.gravity[i] = gravity;
        return;
      }
    }
  }

  update(t: number, dt: number): void {
    for (let i = 0; i < this.capacity; i++) {
      if (!this.alive[i]) {
        this.size[i] = 0;
        this.col[i * 4 + 3] = 0;
        continue;
      }
      const age = t - this.born[i];
      if (age >= this.life[i] || age < -0.001) {
        this.alive[i] = 0;
        this.liveCount--;
        this.size[i] = 0;
        this.col[i * 4 + 3] = 0;
        continue;
      }
      if (dt > 0) {
        const drag = Math.exp(-dt * 2.2);
        this.vel[i * 3] *= drag;
        this.vel[i * 3 + 2] *= drag;
        this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * drag - this.gravity[i] * dt;
        this.pos[i * 3] += this.vel[i * 3] * dt;
        this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
        this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      }
      const k = age / this.life[i];
      const fade = (1 - k) * (1 - k);
      this.size[i] = this.baseSize[i] * (1 - 0.5 * k);
      this.col[i * 4] = this.rgb[i * 3];
      this.col[i * 4 + 1] = this.rgb[i * 3 + 1];
      this.col[i * 4 + 2] = this.rgb[i * 3 + 2];
      this.col[i * 4 + 3] = fade;
    }
    (this.geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (this.geo.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
  }

  reset(): void {
    this.alive.fill(0);
    this.size.fill(0);
    this.liveCount = 0;
    this.cursor = 0;
    (this.geo.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    this.geo.dispose();
    this.mat.dispose();
  }
}

// ---------------------------------------------------------------- shards (ballistic, one bounce)
interface Shard {
  active: boolean;
  born: number;
  life: number;
  p: THREE.Vector3;
  v: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  size: number;
  bounced: boolean;
  color: THREE.Color;
}

const SHARD_CAP = 220;

export class Effects {
  readonly root = new THREE.Group();
  private ribbons: Ribbon[] = [];
  private rings: RingFx[] = [];
  private particles: ParticlePool;
  private dust: ParticlePool;
  private shards: Shard[] = [];
  private shardMesh: THREE.InstancedMesh;
  private needleHeads: THREE.InstancedMesh;
  private needleTrails: THREE.InstancedMesh;
  private flashes: THREE.InstancedMesh;
  private flashData: { active: boolean; born: number; life: number; p: THREE.Vector3; size: number; color: THREE.Color }[] = [];
  private lensRing: THREE.Mesh;
  private lensMat: THREE.MeshBasicMaterial;
  private lensBorn = -100;
  private rng: Rng;
  private viewDir = new THREE.Vector3(0, 1, 0);
  private disposables: { dispose(): void }[] = [];
  private lastSimTime = 0;
  private presentTime = 0;
  private particleScale = 1;
  stats = { ribbons: 0, rings: 0, particles: 0, shards: 0, dropped: 0 };

  constructor(renderer: THREE.WebGLRenderer, seed: number) {
    this.rng = new Rng(seed);
    for (let i = 0; i < 28; i++) this.ribbons.push(new Ribbon(this.root));
    const ringGeo = new THREE.PlaneGeometry(2, 2);
    ringGeo.rotateX(-Math.PI / 2);
    this.disposables.push(ringGeo);
    for (let i = 0; i < 16; i++) {
      const mat = new THREE.ShaderMaterial({
        vertexShader: ringVert,
        fragmentShader: ringFrag,
        uniforms: { uColor: { value: new THREE.Color() }, uAlpha: { value: 0 }, uWidth: { value: 0.06 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        premultipliedAlpha: true,
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.visible = false;
      mesh.renderOrder = 4;
      this.root.add(mesh);
      this.rings.push({ mesh, mat, active: false, born: 0, life: 0.4, r0: 0.5, r1: 6, presentation: false, alpha: 1 });
    }
    this.particles = new ParticlePool(this.root, 1200, false);
    this.dust = new ParticlePool(this.root, 300, true);

    // shards
    const shardGeo = new THREE.TetrahedronGeometry(0.09, 0);
    shardGeo.scale(1, 0.35, 1.4);
    const shardMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0.1 });
    this.disposables.push(shardGeo, shardMat);
    this.shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, SHARD_CAP);
    this.shardMesh.count = 0;
    this.shardMesh.frustumCulled = false;
    this.shardMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.shardMesh.setColorAt(0, new THREE.Color(1, 1, 1));
    this.root.add(this.shardMesh);
    for (let i = 0; i < SHARD_CAP; i++)
      this.shards.push({ active: false, born: 0, life: 1, p: new THREE.Vector3(), v: new THREE.Vector3(), rot: new THREE.Euler(), spin: new THREE.Vector3(), size: 1, bounced: false, color: new THREE.Color() });

    // needle projectiles: tapered head + ribbon-like trail quad
    const headGeo = new THREE.OctahedronGeometry(0.11, 0);
    headGeo.scale(0.7, 0.7, 4.2);
    const headMat = new THREE.MeshBasicMaterial({ color: WEAPON_COLORS.needle.clone().multiplyScalar(1.3) });
    this.needleHeads = new THREE.InstancedMesh(headGeo, headMat, 96);
    this.needleHeads.count = 0;
    this.needleHeads.frustumCulled = false;
    this.root.add(this.needleHeads);
    const trailGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
    trailGeo.translate(0, -0.5, 0);
    trailGeo.rotateX(-Math.PI / 2); // lies in XZ, extends toward +z (behind the head)
    const trailTex = art.colorTexture(trailCanvas(), renderer);
    const trailMat = new THREE.MeshBasicMaterial({ map: trailTex, color: WEAPON_COLORS.needle, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    this.needleTrails = new THREE.InstancedMesh(trailGeo, trailMat, 96);
    this.needleTrails.count = 0;
    this.needleTrails.frustumCulled = false;
    this.root.add(this.needleTrails);
    this.disposables.push(headGeo, headMat, trailGeo, trailMat, trailTex);

    // impact flashes (camera-facing quads)
    const flashGeo = new THREE.PlaneGeometry(1, 1);
    const flashTex = art.colorTexture(art.drawRadial('rgba(255,255,255,1)', 'rgba(255,255,255,0)', 64), renderer);
    const flashMat = new THREE.MeshBasicMaterial({ map: flashTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.flashes = new THREE.InstancedMesh(flashGeo, flashMat, 48);
    this.flashes.count = 0;
    this.flashes.frustumCulled = false;
    this.flashes.renderOrder = 8;
    this.flashes.setColorAt(0, new THREE.Color());
    this.root.add(this.flashes);
    for (let i = 0; i < 48; i++) this.flashData.push({ active: false, born: 0, life: 0.1, p: new THREE.Vector3(), size: 1, color: new THREE.Color() });
    this.disposables.push(flashGeo, flashTex, flashMat);

    // lens contraction ring at the emitter for Last Light
    this.lensMat = new THREE.MeshBasicMaterial({ color: WEAPON_COLORS.light, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    this.lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.03, 8, 48), this.lensMat);
    this.lensRing.position.set(EMITTER_POS.x, EMITTER_POS.y, EMITTER_POS.z);
    this.root.add(this.lensRing);
    this.disposables.push(this.lensRing.geometry, this.lensMat);

    this.seedDust();
  }

  setQuality(particleBudget: number, dustCount: number): void {
    this.particles.budget = particleBudget;
    this.dust.budget = dustCount;
  }

  setView(camera: THREE.OrthographicCamera, viewportHeight: number): void {
    camera.getWorldDirection(this.viewDir).negate();
    this.particleScale = viewportHeight / Math.max(1e-3, camera.top - camera.bottom);
    this.particles.setScale(this.particleScale);
    this.dust.setScale(this.particleScale);
    this.lensRing.quaternion.copy(camera.quaternion);
  }

  private seedDust(): void {
    for (let i = 0; i < 300; i++) this.spawnDust(this.rng.range(0, 14));
  }

  private spawnDust(age = 0): void {
    const a = this.rng.next() * Math.PI * 2;
    const r = this.rng.range(6, 18);
    const p = new THREE.Vector3(Math.cos(a) * r, this.rng.range(-8, -0.5), Math.sin(a) * r);
    const v = new THREE.Vector3(this.rng.range(-0.05, 0.05), this.rng.range(0.08, 0.25), this.rng.range(-0.05, 0.05));
    const c = new THREE.Color(0x69dad0).multiplyScalar(this.rng.range(0.25, 0.8));
    this.dust.emit(p, v, c, this.rng.range(0.05, 0.12), 14, this.presentTime - age, 0);
  }

  private ribbon(): Ribbon | null {
    const r = this.ribbons.find((x) => !x.active);
    if (!r) this.stats.dropped++;
    return r ?? null;
  }

  private ring(): RingFx | null {
    const r = this.rings.find((x) => !x.active);
    if (!r) this.stats.dropped++;
    return r ?? null;
  }

  flash(p: THREE.Vector3, color: THREE.Color, size: number, life: number, t: number): void {
    const f = this.flashData.find((x) => !x.active);
    if (!f) return;
    f.active = true;
    f.born = t;
    f.life = life;
    f.p.copy(p);
    f.size = size;
    f.color.copy(color);
  }

  private burst(p: THREE.Vector3, color: THREE.Color, n: number, speed: number, t: number, size = 0.1, life = 0.45, gravity = 2): void {
    for (let i = 0; i < n; i++) {
      const a = this.rng.next() * Math.PI * 2;
      const up = this.rng.range(0.2, 1);
      const sp = speed * this.rng.range(0.4, 1);
      const v = new THREE.Vector3(Math.cos(a) * sp, up * sp * 0.9, Math.sin(a) * sp);
      this.particles.emit(p, v, color, size * this.rng.range(0.6, 1.2), life * this.rng.range(0.6, 1.1), t, gravity);
    }
  }

  private shardBurst(p: THREE.Vector3, colors: number[], n: number, t: number, power = 2.2): void {
    let placed = 0;
    for (const s of this.shards) {
      if (placed >= n) break;
      if (s.active) continue;
      placed++;
      s.active = true;
      s.born = t;
      s.life = this.rng.range(0.55, 0.85);
      s.p.copy(p);
      const a = this.rng.next() * Math.PI * 2;
      const sp = this.rng.range(0.6, 1) * power;
      s.v.set(Math.cos(a) * sp, this.rng.range(1.5, 3.2), Math.sin(a) * sp);
      s.rot.set(this.rng.next() * 6, this.rng.next() * 6, this.rng.next() * 6);
      s.spin.set(this.rng.range(-12, 12), this.rng.range(-12, 12), this.rng.range(-12, 12));
      s.size = this.rng.range(0.7, 1.4);
      s.bounced = false;
      s.color.setHex(colors[this.rng.int(colors.length)]);
    }
    if (placed < n) this.stats.dropped += n - placed;
  }

  private emitterVec(): THREE.Vector3 {
    return new THREE.Vector3(EMITTER_POS.x, EMITTER_POS.y, EMITTER_POS.z);
  }

  /** Cosmetic conduit from the activated card to the shared emitter. */
  conduit(from: THREE.Vector3, defId: WeaponId, t: number): void {
    const r = this.ribbon();
    if (!r) return;
    const to = this.emitterVec();
    const mid = from.clone().lerp(to, 0.5);
    mid.y += 0.35;
    r.points = [];
    for (let i = 0; i <= 10; i++) {
      const k = i / 10;
      const a = from.clone().lerp(mid, k);
      const b = mid.clone().lerp(to, k);
      r.points.push(a.lerp(b, k));
    }
    r.active = true;
    r.born = t;
    r.life = 0.22;
    r.width = 0.045;
    r.color.copy(WEAPON_COLORS[defId]).multiplyScalar(0.7);
    r.revealTime = 0.05;
    r.flicker = 0;
    r.presentation = false;
    r.build(this.viewDir);
  }

  onSimEvent(ev: SimEvent, cardPos: (weaponId: number) => THREE.Vector3 | null): void {
    const t = ev.t;
    switch (ev.type) {
      case 'fired': {
        const from = cardPos(ev.weaponId);
        if (from) this.conduit(from, ev.defId, t);
        if (ev.defId === 'light') this.lance(ev.points[0], t);
        else if (ev.defId === 'thread') this.thread(ev.points, t);
        else if (ev.defId === 'bell') this.bell(t);
        else if (ev.defId === 'needle') this.burst(this.emitterVec(), WEAPON_COLORS.needle, 4, 1.2, t, 0.07, 0.2, 0);
        break;
      }
      case 'damaged': {
        const p = new THREE.Vector3(ev.x, 0.9, ev.z);
        const c = WEAPON_COLORS[ev.source];
        this.flash(p, c, ev.source === 'light' ? 1.3 : 0.7, ev.source === 'light' ? 0.12 : 0.08, t);
        this.burst(p, c, ev.source === 'needle' ? 5 : 7, 2.2, t, 0.08, 0.35, 3);
        break;
      }
      case 'died': {
        const p = new THREE.Vector3(ev.x, 0.7, ev.z);
        if (ev.kind === 'moth') this.shardBurst(p, [0xe7dfc8, 0xcfc4a6, 0x232638], 7, t, 1.6);
        else if (ev.kind === 'urn') this.shardBurst(p, [0xd9cfb3, 0xd9cfb3, 0xc2a46a, 0x223156], 14, t, 2.6);
        else this.shardBurst(p, [0xe9e1c9, 0xe9e1c9, 0x5a6a92], 9, t, 2.0);
        this.burst(p, hdr(0xe8dcb8, 1.6), 10, 1.5, t, 0.1, 0.5, -0.6);
        break;
      }
      case 'arrived': {
        const p = new THREE.Vector3(ev.x, 0.6, ev.z);
        this.burst(p, hdr(0xe28174, 2.4), 16, 2.6, t, 0.12, 0.5, 1);
        this.flash(p, hdr(0xe28174, 2.0), 1.6, 0.14, t);
        break;
      }
      case 'projectileExpired': {
        this.burst(new THREE.Vector3(ev.x, 0.9, ev.z), WEAPON_COLORS.needle, 5, 0.8, t, 0.06, 0.3, 0);
        break;
      }
      default:
        break;
    }
  }

  private lance(target: Vec2, t: number): void {
    this.lensBorn = t;
    const r = this.ribbon();
    const to = new THREE.Vector3(target.x, 0.9, target.z);
    const from = this.emitterVec();
    if (r) {
      r.points = [];
      for (let i = 0; i <= 12; i++) r.points.push(from.clone().lerp(to, i / 12));
      r.active = true;
      r.born = t;
      r.life = 0.34;
      r.width = 0.16;
      r.color.copy(WEAPON_COLORS.light);
      r.revealTime = 0.05;
      r.flicker = 0;
      r.presentation = false;
      r.build(this.viewDir);
    }
    const core = this.ribbon();
    if (core) {
      core.points = r ? r.points.map((p) => p.clone()) : [from, to];
      core.active = true;
      core.born = t;
      core.life = 0.26;
      core.width = 0.06;
      core.color.setRGB(4, 3.7, 3.1);
      core.revealTime = 0.05;
      core.flicker = 0;
      core.presentation = false;
      core.build(this.viewDir);
    }
    this.flash(to, WEAPON_COLORS.light, 1.8, 0.12, t);
    this.burst(to, WEAPON_COLORS.light, 12, 3.2, t, 0.1, 0.4, 2);
  }

  private thread(points: Vec2[], t: number): void {
    let prev = this.emitterVec();
    points.forEach((pt, hop) => {
      const to = new THREE.Vector3(pt.x, 0.9, pt.z);
      for (const layer of [0, 1]) {
        const r = this.ribbon();
        if (!r) return;
        r.points = [];
        const n = 10;
        const len = prev.distanceTo(to);
        const side = new THREE.Vector3().subVectors(to, prev).cross(new THREE.Vector3(0, 1, 0)).normalize();
        for (let i = 0; i <= n; i++) {
          const k = i / n;
          const p = prev.clone().lerp(to, k);
          if (i > 0 && i < n) {
            const j = Math.sin(k * Math.PI) * Math.min(0.45, len * 0.08);
            p.addScaledVector(side, this.rng.range(-1, 1) * j);
            p.y += this.rng.range(-0.5, 0.8) * j;
          }
          r.points.push(p);
        }
        r.active = true;
        r.born = t + hop * 0.035;
        r.life = 0.36;
        r.width = layer === 0 ? 0.13 : 0.035;
        r.color.copy(layer === 0 ? WEAPON_COLORS.thread : hdr(0xdfe9ff, 4.5));
        r.revealTime = 0.035;
        r.flicker = 1;
        r.presentation = false;
        r.build(this.viewDir);
      }
      this.flash(to, WEAPON_COLORS.thread, 0.8, 0.09, t);
      prev = to;
    });
  }

  private bell(t: number): void {
    // a small ring leaves the emitter above the lid ...
    const c = this.ring();
    if (c) {
      c.active = true;
      c.born = t;
      c.life = 0.22;
      c.r0 = 0.25;
      c.r1 = 1.3;
      c.presentation = false;
      c.alpha = 1;
      c.mat.uniforms.uColor.value.copy(WEAPON_COLORS.bell);
      c.mat.uniforms.uWidth.value = 0.08;
      c.mesh.position.set(EMITTER_POS.x, LID_TOP + 0.08, EMITTER_POS.z);
    }
    // ... and the thin pulse ring sweeps outward from the Base walls to the full 6.8 radius
    const a = this.ring();
    if (a) {
      a.active = true;
      a.born = t;
      a.life = 0.42;
      a.r0 = 3.6;
      a.r1 = 6.8;
      a.presentation = false;
      a.alpha = 1;
      a.mat.uniforms.uColor.value.copy(WEAPON_COLORS.bell);
      a.mat.uniforms.uWidth.value = 0.03;
      a.mesh.position.set(0, 0.07, 0);
    }
    const b = this.ring();
    if (b) {
      b.active = true;
      b.born = t + 0.06;
      b.life = 0.65;
      b.r0 = 3.4;
      b.r1 = 5.6;
      b.presentation = false;
      b.alpha = 0.5;
      b.mat.uniforms.uColor.value.copy(hdr(0xf2d79a, 1.6));
      b.mat.uniforms.uWidth.value = 0.05;
      b.mesh.position.set(0, 0.05, 0);
    }
    this.burst(this.emitterVec(), WEAPON_COLORS.bell, 14, 1.8, t, 0.09, 0.6, -1.0);
  }

  /** Placement landing pulse (presentation time). */
  landing(p: THREE.Vector3): void {
    const r = this.ring();
    if (!r) return;
    r.active = true;
    r.born = this.presentTime;
    r.life = 0.42;
    r.r0 = 0.8;
    r.r1 = 2.2;
    r.presentation = true;
    r.alpha = 0.9;
    r.mat.uniforms.uColor.value.copy(hdr(0x69dad0, 2.2));
    r.mat.uniforms.uWidth.value = 0.08;
    r.mesh.position.set(p.x, p.y + 0.05, p.z);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      this.particles.emit(new THREE.Vector3(p.x + Math.cos(a) * 1.0, p.y + 0.1, p.z + Math.sin(a) * 1.2), new THREE.Vector3(Math.cos(a) * 0.6, 1.2, Math.sin(a) * 0.6), hdr(0x69dad0, 2), 0.09, 0.5, this.lastSimTime, 0);
    }
  }

  /** Victory lift: rising motes from the emitter (presentation-only ceremony). */
  ceremony(kind: 'victory' | 'defeat'): void {
    const p = this.emitterVec();
    for (let i = 0; i < 60; i++) {
      const a = this.rng.next() * Math.PI * 2;
      const c = kind === 'victory' ? hdr(0x69dad0, 2.4) : hdr(0xe28174, 1.4);
      this.dust.emit(p.clone(), new THREE.Vector3(Math.cos(a) * 0.6, kind === 'victory' ? this.rng.range(1, 3) : this.rng.range(-0.2, 0.4), Math.sin(a) * 0.6), c, 0.12, 2.5, this.presentTime, 0);
    }
  }

  update(simTime: number, presentDt: number, projectiles: ProjectileState[], alpha: number): void {
    const simDt = Math.max(0, simTime - this.lastSimTime);
    this.lastSimTime = simTime;
    this.presentTime += presentDt;

    // ribbons
    let nr = 0;
    for (const r of this.ribbons) {
      if (!r.active) {
        r.mesh.visible = false;
        continue;
      }
      const now = r.presentation ? this.presentTime : simTime;
      const age = now - r.born;
      if (age > r.life || age < -0.5) {
        r.active = false;
        r.mesh.visible = false;
        continue;
      }
      nr++;
      r.mesh.visible = age >= 0;
      const k = Math.max(0, age) / r.life;
      const flick = r.flicker ? 0.75 + 0.25 * Math.sin(simTime * 90 + r.born * 13) : 1;
      r.mat.uniforms.uAlpha.value = (1 - k) * (1 - k * 0.5) * flick;
      r.mat.uniforms.uHead.value = Math.min(1, Math.max(0, age) / r.revealTime) * 1.02;
      r.mat.uniforms.uColor.value.copy(r.color);
    }
    // rings
    let ng = 0;
    for (const r of this.rings) {
      if (!r.active) {
        r.mesh.visible = false;
        continue;
      }
      const now = r.presentation ? this.presentTime : simTime;
      const age = now - r.born;
      if (age > r.life || age < -0.5) {
        r.active = false;
        r.mesh.visible = false;
        continue;
      }
      ng++;
      r.mesh.visible = age >= 0;
      const k = Math.max(0, age) / r.life;
      const ease = 1 - Math.pow(1 - k, 2.4);
      const rad = r.r0 + (r.r1 - r.r0) * ease;
      r.mesh.scale.set(rad, 1, rad);
      r.mat.uniforms.uAlpha.value = r.alpha * (1 - k) * Math.min(1, k * 8 + 0.2);
    }
    // lens contraction
    const lensAge = simTime - this.lensBorn;
    if (lensAge >= 0 && lensAge < 0.18) {
      const k = lensAge / 0.18;
      this.lensRing.visible = true;
      this.lensRing.scale.setScalar(1.6 - 1.3 * k);
      this.lensMat.opacity = (1 - k) * 0.9;
    } else this.lensRing.visible = false;

    // flashes
    let nf = 0;
    const m = new THREE.Matrix4();
    const qCam = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.viewDir);
    for (const f of this.flashData) {
      if (!f.active) continue;
      const age = simTime - f.born;
      if (age > f.life || age < -0.5) {
        f.active = false;
        continue;
      }
      if (age < 0) continue;
      const k = age / f.life;
      const sz = f.size * (0.6 + 0.6 * k);
      m.compose(f.p, qCam, new THREE.Vector3(sz, sz, sz));
      this.flashes.setMatrixAt(nf, m);
      this.flashes.setColorAt(nf, f.color.clone().multiplyScalar(1 - k));
      nf++;
    }
    this.flashes.count = nf;
    this.flashes.instanceMatrix.needsUpdate = true;
    if (this.flashes.instanceColor) this.flashes.instanceColor.needsUpdate = true;

    // shards: short ballistic arcs with one cosmetic bounce
    let ns = 0;
    const tmp = new THREE.Matrix4();
    const qq = new THREE.Quaternion();
    for (const s of this.shards) {
      if (!s.active) continue;
      const age = simTime - s.born;
      if (age > s.life) {
        s.active = false;
        continue;
      }
      if (simDt > 0) {
        s.v.y -= 9.5 * simDt;
        s.p.addScaledVector(s.v, simDt);
        if (s.p.y < 0.03 && !s.bounced) {
          s.p.y = 0.03;
          s.v.y = Math.abs(s.v.y) * 0.35;
          s.v.x *= 0.5;
          s.v.z *= 0.5;
          s.bounced = true;
        } else if (s.p.y < 0.03) {
          s.p.y = 0.03;
          s.v.set(0, 0, 0);
        }
        s.rot.x += s.spin.x * simDt;
        s.rot.y += s.spin.y * simDt;
        s.rot.z += s.spin.z * simDt;
      }
      const k = age / s.life;
      const sc = s.size * (k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1);
      qq.setFromEuler(s.rot);
      tmp.compose(s.p, qq, new THREE.Vector3(sc, sc, sc));
      this.shardMesh.setMatrixAt(ns, tmp);
      this.shardMesh.setColorAt(ns, s.color);
      ns++;
    }
    this.shardMesh.count = ns;
    this.shardMesh.instanceMatrix.needsUpdate = true;
    if (this.shardMesh.instanceColor) this.shardMesh.instanceColor.needsUpdate = true;

    // logical needle projectiles rendered from simulation state
    let np = 0;
    for (const p of projectiles) {
      if (np >= 96) break;
      const x = p.prevX + (p.x - p.prevX) * alpha;
      const z = p.prevZ + (p.z - p.prevZ) * alpha;
      const dx = p.x - p.prevX;
      const dz = p.z - p.prevZ;
      const yaw = Math.atan2(dx, dz);
      const age = simTime - p.bornAt;
      // leaves the emitter above the lid, then descends to body height once clear of the Base
      const gap = footprintGap(x, z);
      const y = Math.max(0.9, EMITTER_POS.y - gap * 0.5);
      qq.setFromEuler(new THREE.Euler(0, yaw, 0));
      tmp.compose(new THREE.Vector3(x, y, z), qq, new THREE.Vector3(1, 1, 1));
      this.needleHeads.setMatrixAt(np, tmp);
      const len = Math.min(1.8, 0.3 + age * 8);
      tmp.compose(new THREE.Vector3(x, y, z), qq, new THREE.Vector3(0.2, 1, -len));
      this.needleTrails.setMatrixAt(np, tmp);
      np++;
    }
    this.needleHeads.count = np;
    this.needleTrails.count = np;
    this.needleHeads.instanceMatrix.needsUpdate = true;
    this.needleTrails.instanceMatrix.needsUpdate = true;

    this.particles.update(simTime, simDt);
    this.dust.update(this.presentTime, presentDt);
    while (this.dust.liveCount < Math.min(this.dust.budget, 300)) this.spawnDust();

    this.stats.ribbons = nr;
    this.stats.rings = ng;
    this.stats.particles = this.particles.liveCount;
    this.stats.shards = ns;
  }

  /** Restart: return every pooled entry to its idle state. */
  reset(): void {
    for (const r of this.ribbons) {
      r.active = false;
      r.mesh.visible = false;
    }
    for (const r of this.rings) {
      r.active = false;
      r.mesh.visible = false;
    }
    for (const s of this.shards) s.active = false;
    for (const f of this.flashData) f.active = false;
    this.particles.reset();
    this.shardMesh.count = 0;
    this.flashes.count = 0;
    this.needleHeads.count = 0;
    this.needleTrails.count = 0;
    this.lensBorn = -100;
    this.lastSimTime = 0;
    this.stats.dropped = 0;
  }

  dispose(): void {
    for (const r of this.ribbons) {
      r.geo.dispose();
      r.mat.dispose();
    }
    for (const r of this.rings) r.mat.dispose();
    this.particles.dispose();
    this.dust.dispose();
    this.shardMesh.dispose();
    this.needleHeads.dispose();
    this.needleTrails.dispose();
    this.flashes.dispose();
    for (const d of this.disposables) d.dispose();
  }
}

function trailCanvas(): HTMLCanvasElement {
  const [c, ctx] = art.makeCanvas(32, 128);
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  // canvas top (uv v=1) is the head end of the trail: bright and wide, tapering to the tail
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(2, 0);
  ctx.lineTo(30, 0);
  ctx.lineTo(16, 128);
  ctx.closePath();
  ctx.fill();
  return c;
}
