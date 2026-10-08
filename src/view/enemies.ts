// Enemy miniatures, batched per archetype with InstancedMesh. Each logical enemy keeps a stable
// instance index (free-list) until its dissolve finishes. Visual sway/recoil never feeds back
// into simulation; all motion here is driven by interpolated simulation time.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { EnemyKind, EnemyState, SimEvent } from '../game/types';
import * as art from './art';

const CAPACITY = 600;
/** Visual-only scale per archetype (logical radii live in game/content.ts). */
/** Pieces are modelled at the first-slice radii (0.32 / 0.26 / 0.44) and scaled to the logic radii. */
const VISUAL_SCALE: Record<EnemyKind, number> = { echo: 1.4, moth: 1.6, urn: 1.4 };
const UP = new THREE.Vector3(0, 1, 0);

interface Part {
  mesh: THREE.InstancedMesh;
  /** Local transform for a given enemy at time t. */
  local: (out: THREE.Matrix4, t: number, phase: number, hit: number) => void;
}

interface Archetype {
  kind: EnemyKind;
  parts: Part[];
  free: number[];
  high: number;
  map: Map<number, number>;
}

interface Visual {
  id: number;
  kind: EnemyKind;
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  radius: number;
  phase: number;
  lastHitAt: number;
  liftAt: number;
  diedAt: number | null;
  arrived: boolean;
  seen: boolean;
}

const tmpM = new THREE.Matrix4();
const rootM = new THREE.Matrix4();
const partM = new THREE.Matrix4();
const q = new THREE.Quaternion();
const e = new THREE.Euler();
const v = new THREE.Vector3();
const s = new THREE.Vector3();
const white = new THREE.Color(1, 1, 1);
const flash = new THREE.Color(2.4, 2.1, 1.9);
const tmpColor = new THREE.Color();

function compose(out: THREE.Matrix4, x: number, y: number, z: number, rx: number, ry: number, rz: number, sx = 1, sy = sx, sz = sx): THREE.Matrix4 {
  e.set(rx, ry, rz, 'YXZ');
  q.setFromEuler(e);
  v.set(x, y, z);
  s.set(sx, sy, sz);
  return out.compose(v, q, s);
}

export class EnemiesView {
  readonly root = new THREE.Group();
  private arch = new Map<EnemyKind, Archetype>();
  private visuals = new Map<number, Visual>();
  private blob: THREE.InstancedMesh;
  private hpBack: THREE.InstancedMesh;
  private hpFill: THREE.InstancedMesh;
  private blobFree: number[] = [];
  private disposables: { dispose(): void }[] = [];
  private hpCount = 0;

  constructor(renderer: THREE.WebGLRenderer) {
    const track = <T extends { dispose(): void }>(x: T): T => {
      this.disposables.push(x);
      return x;
    };
    // Foes are small turned game pieces: bone bodies on dark wooden bases.
    const boneTex = track(art.colorTexture(art.drawBone(), renderer));
    const bone = track(new THREE.MeshStandardMaterial({ color: 0xe6dac0, map: boneTex, roughness: 0.55 }));
    const woodTex = track(art.colorTexture(art.drawDarkWood(), renderer));
    const baseWood = track(new THREE.MeshStandardMaterial({ color: 0x6a4a34, map: woodTex, roughness: 0.7 }));
    const ink = track(new THREE.MeshStandardMaterial({ color: 0x0b0806, roughness: 0.6 }));
    const darkBrass = track(new THREE.MeshStandardMaterial({ color: 0xb08a4a, metalness: 0.7, roughness: 0.4 }));
    const pearl = track(new THREE.MeshStandardMaterial({ color: 0x1c1a22, metalness: 0.35, roughness: 0.18, emissive: 0x0e3a3a, emissiveIntensity: 0.5 }));
    const wingTex = track(art.colorTexture(art.drawMothWing(), renderer));
    const wing = track(new THREE.MeshStandardMaterial({ map: wingTex, color: 0xfff4dc, emissive: 0x2a2418, roughness: 0.7, side: THREE.DoubleSide }));

    const mk = (geo: THREE.BufferGeometry, mat: THREE.Material) => {
      track(geo);
      const m = new THREE.InstancedMesh(geo, mat, CAPACITY);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.setColorAt(0, white);
      m.count = 0;
      m.castShadow = true; // pieces throw real shadows away from the candle
      // conservative bounds covering the whole arena; instances move every frame
      m.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, 0), 40);
      m.frustumCulled = false;
      this.root.add(m);
      return m;
    };

    const lathe = (pts: number[][], seg = 20) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
    const disc = (r: number) => {
      const g = new THREE.CylinderGeometry(r, r * 1.05, 0.08, 20);
      g.translate(0, 0.04, 0);
      return g;
    };
    // hop-and-slide gait: a piece lifts slightly and tips forward, like being moved by a hand
    const hop = (t: number, ph: number, f: number, h: number) => Math.abs(Math.sin(t * f + ph)) * h;
    const tip = (t: number, ph: number, f: number, a: number) => Math.sin(t * f + ph) * a;

    // ---------------- Veiled Echo: hooded pawn-like piece with a dark mask face
    const echoBody = lathe([
      [0.29, 0.08],
      [0.27, 0.14],
      [0.2, 0.3],
      [0.15, 0.5],
      [0.13, 0.6],
      [0.18, 0.68],
      [0.19, 0.79],
      [0.15, 0.9],
      [0.07, 0.96],
      [0, 0.97],
    ]);
    const echoFace = new THREE.CircleGeometry(0.105, 18);
    echoFace.scale(1, 1.25, 1);
    echoFace.translate(0, 0.78, 0.172);
    const eF = 5;
    this.addArch('echo', [
      { mesh: mk(disc(0.32), baseWood), local: (o, t, ph) => compose(o, 0, hop(t, ph, eF, 0.07), 0, tip(t, ph, eF * 2, 0.06), 0, 0) },
      { mesh: mk(echoBody, bone), local: (o, t, ph, hit) => compose(o, 0, hop(t, ph, eF, 0.07), 0, tip(t, ph, eF * 2, 0.06) - hit * 0.25, 0, 0, 1, 1 - hit * 0.08, 1) },
      { mesh: mk(echoFace, ink), local: (o, t, ph, hit) => compose(o, 0, hop(t, ph, eF, 0.07), 0, tip(t, ph, eF * 2, 0.06) - hit * 0.25, 0, 0, 1, 1 - hit * 0.08, 1) },
    ]);

    // ---------------- Folded Moth: a peg piece carrying wing plates and a dark pearl
    const peg = new THREE.CylinderGeometry(0.03, 0.04, 0.5, 8);
    peg.translate(0, 0.33, 0);
    const pearlGeo = new THREE.SphereGeometry(0.1, 14, 10);
    pearlGeo.translate(0, 0.62, 0);
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.bezierCurveTo(0.12, 0.22, 0.34, 0.3, 0.42, 0.15);
    wingShape.bezierCurveTo(0.45, 0.05, 0.34, 0.0, 0.26, 0.0);
    wingShape.bezierCurveTo(0.34, -0.06, 0.32, -0.2, 0.2, -0.23);
    wingShape.bezierCurveTo(0.1, -0.22, 0.04, -0.1, 0, 0);
    const wingGeo = new THREE.ShapeGeometry(wingShape, 8);
    {
      const uv = wingGeo.attributes.uv as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 0.45, (uv.getY(i) + 0.23) / 0.53);
    }
    const mF = 8;
    const mothRoot = (o: THREE.Matrix4, t: number, ph: number) => compose(o, 0, hop(t, ph, mF, 0.05), 0, tip(t, ph, mF * 2, 0.05), 0, 0);
    // wings stay mostly spread so they read from the high camera; a quick shallow flutter
    const flap = (t: number, ph: number) => 0.12 + Math.sin(t * 18 + ph * 3) * 0.22;
    this.addArch('moth', [
      { mesh: mk(disc(0.26), baseWood), local: (o, t, ph) => mothRoot(o, t, ph) },
      { mesh: mk(peg, darkBrass), local: (o, t, ph) => mothRoot(o, t, ph) },
      { mesh: mk(pearlGeo, pearl), local: (o, t, ph, hit) => mothRoot(o, t, ph).multiply(compose(tmpM, 0, 0, 0, 0, 0, 0, 1 - hit * 0.12)) },
      {
        mesh: mk(wingGeo, wing),
        local: (o, t, ph) => mothRoot(o, t, ph).multiply(compose(tmpM, 0.02, 0.6, 0, 0, -0.3, flap(t, ph))),
      },
      {
        mesh: mk(wingGeo.clone(), wing),
        local: (o, t, ph) => mothRoot(o, t, ph).multiply(compose(tmpM, -0.02, 0.6, 0, 0, 0.3, -flap(t, ph), -1, 1, 1)),
      },
    ]);

    // ---------------- Burden Urn: a squat stacked-jar piece with dark brass bands
    const urnBody = lathe(
      [
        [0.37, 0.08],
        [0.41, 0.2],
        [0.43, 0.36],
        [0.35, 0.5],
        [0.3, 0.56],
        [0.36, 0.62],
        [0.39, 0.74],
        [0.31, 0.86],
        [0.22, 0.9],
        [0.25, 0.96],
        [0, 0.97],
      ],
      24,
    );
    const b1 = new THREE.TorusGeometry(0.43, 0.035, 6, 24);
    b1.rotateX(Math.PI / 2);
    b1.translate(0, 0.36, 0);
    const b2 = new THREE.TorusGeometry(0.39, 0.03, 6, 24);
    b2.rotateX(Math.PI / 2);
    b2.translate(0, 0.74, 0);
    const knob = new THREE.SphereGeometry(0.08, 10, 8);
    knob.translate(0, 1.02, 0);
    const bandsGeo = mergeGeometries([b1, b2, knob])!;
    [b1, b2, knob].forEach((g) => g.dispose());
    const uF = 3.4;
    const urnRoot = (o: THREE.Matrix4, t: number, ph: number, hit: number) =>
      compose(o, 0, hop(t, ph, uF, 0.05), 0, tip(t, ph, uF * 2, 0.05) - hit * 0.12, 0, Math.sin(t * uF + ph) * 0.05, 1, 1 - hit * 0.06, 1);
    this.addArch('urn', [
      { mesh: mk(disc(0.44), baseWood), local: (o, t, ph, hit) => urnRoot(o, t, ph, hit) },
      { mesh: mk(urnBody, bone), local: (o, t, ph, hit) => urnRoot(o, t, ph, hit) },
      { mesh: mk(bandsGeo, darkBrass), local: (o, t, ph, hit) => urnRoot(o, t, ph, hit) },
    ]);

    // blob shadows (pooled)
    const blobTex = track(art.colorTexture(art.drawRadial('rgba(0,0,0,0.5)', 'rgba(0,0,0,0)', 64), renderer));
    const blobGeo = track(new THREE.PlaneGeometry(1, 1));
    blobGeo.rotateX(-Math.PI / 2);
    this.blob = new THREE.InstancedMesh(blobGeo, track(new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false })), CAPACITY * 3);
    this.blob.count = 0;
    this.blob.frustumCulled = false;
    this.blob.renderOrder = 1;
    this.root.add(this.blob);
    for (let i = CAPACITY * 3 - 1; i >= 0; i--) this.blobFree.push(i);

    // damaged-only health indicators
    const hpGeo = track(new THREE.PlaneGeometry(1, 1));
    hpGeo.translate(0.5, 0, 0);
    this.hpBack = new THREE.InstancedMesh(hpGeo, track(new THREE.MeshBasicMaterial({ color: 0x0a0d16, transparent: true, opacity: 0.8, depthWrite: false })), CAPACITY);
    this.hpFill = new THREE.InstancedMesh(hpGeo, track(new THREE.MeshBasicMaterial({ color: 0xffffff, depthWrite: false, transparent: true })), CAPACITY);
    for (const m of [this.hpBack, this.hpFill]) {
      m.count = 0;
      m.frustumCulled = false;
      m.renderOrder = 5;
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.root.add(m);
    }
    this.hpFill.setColorAt(0, white);
  }

  private addArch(kind: EnemyKind, parts: Part[]): void {
    const free: number[] = [];
    for (let i = CAPACITY - 1; i >= 0; i--) free.push(i);
    this.arch.set(kind, { kind, parts, free, high: 0, map: new Map() });
  }

  onEvent(ev: SimEvent): void {
    if (ev.type === 'damaged') {
      const vis = this.visuals.get(ev.enemyId);
      if (vis) {
        vis.lastHitAt = ev.t;
        vis.hp = ev.hp;
        if (ev.source === 'bell') vis.liftAt = ev.t; // gentle radial lift, visual only
      }
    } else if (ev.type === 'died') {
      const vis = this.visuals.get(ev.enemyId);
      if (vis) {
        vis.diedAt = ev.t;
        vis.x = ev.x;
        vis.z = ev.z;
      }
    } else if (ev.type === 'arrived') {
      const vis = this.visuals.get(ev.enemyId);
      if (vis) {
        vis.diedAt = ev.t;
        vis.arrived = true;
        vis.x = ev.x;
        vis.z = ev.z;
      }
    }
  }

  private acquire(kind: EnemyKind, id: number): number {
    const a = this.arch.get(kind)!;
    let idx = a.map.get(id);
    if (idx === undefined) {
      idx = a.free.pop();
      if (idx === undefined) return -1; // pool exhausted: purely cosmetic
      a.map.set(id, idx);
      a.high = Math.max(a.high, idx + 1);
    }
    return idx;
  }

  private release(kind: EnemyKind, id: number): void {
    const a = this.arch.get(kind)!;
    const idx = a.map.get(id);
    if (idx === undefined) return;
    a.map.delete(id);
    a.free.push(idx);
    for (const p of a.parts) {
      p.mesh.setMatrixAt(idx, tmpM.makeScale(0, 0, 0));
      p.mesh.instanceMatrix.needsUpdate = true;
    }
  }

  /** Instance index for a logical enemy (for tests/debug). */
  instanceIndexOf(kind: EnemyKind, id: number): number | undefined {
    return this.arch.get(kind)!.map.get(id);
  }

  update(enemies: EnemyState[], alpha: number, simTime: number, camera: THREE.Camera): void {
    for (const vis of this.visuals.values()) vis.seen = false;
    for (const en of enemies) {
      let vis = this.visuals.get(en.id);
      if (!vis) {
        vis = {
          id: en.id,
          kind: en.kind,
          x: en.x,
          z: en.z,
          hp: en.hp,
          maxHp: en.maxHp,
          radius: en.radius,
          phase: (en.id * 2.399) % (Math.PI * 2),
          lastHitAt: -100,
          liftAt: -100,
          diedAt: null,
          arrived: false,
          seen: true,
        };
        this.visuals.set(en.id, vis);
      }
      vis.seen = true;
      vis.x = en.prevX + (en.x - en.prevX) * alpha;
      vis.z = en.prevZ + (en.z - en.prevZ) * alpha;
      vis.hp = en.hp;
    }

    const camQ = (camera as THREE.Camera).quaternion;
    let blobN = 0;
    this.hpCount = 0;
    for (const vis of [...this.visuals.values()]) {
      if (!vis.seen && vis.diedAt === null) vis.diedAt = simTime; // removed without an event (restart safety)
      let dissolve = 0;
      if (vis.diedAt !== null) {
        const dur = vis.arrived ? 0.32 : 0.42;
        dissolve = Math.min(1, Math.max(0, (simTime - vis.diedAt) / dur));
        if (dissolve >= 1) {
          this.release(vis.kind, vis.id);
          this.visuals.delete(vis.id);
          continue;
        }
      }
      const idx = this.acquire(vis.kind, vis.id);
      if (idx < 0) continue;
      const a = this.arch.get(vis.kind)!;
      const hitAge = simTime - vis.lastHitAt;
      const hit = hitAge >= 0 && hitAge < 0.12 ? 1 - hitAge / 0.12 : 0;
      const yaw = Math.atan2(-vis.x, -vis.z); // face the Base centre
      const sink = vis.arrived ? dissolve * 0.6 : -dissolve * 0.5;
      const sc = (1 - dissolve * dissolve) * (1 + hit * 0.06) * VISUAL_SCALE[vis.kind];
      const spin = vis.arrived ? 0 : dissolve * 2.5;
      // small recoil away from the Base on hit, purely visual
      const back = hit * 0.08;
      const dirX = -Math.sin(yaw) * back;
      const dirZ = -Math.cos(yaw) * back;
      const liftAge = simTime - vis.liftAt;
      const lift = liftAge >= 0 && liftAge < 0.45 ? Math.sin((liftAge / 0.45) * Math.PI) * 0.28 : 0;
      compose(rootM, vis.x + dirX, -sink + lift, vis.z + dirZ, 0, yaw + spin, 0, sc);
      for (const p of a.parts) {
        p.local(partM, simTime, vis.phase, hit);
        tmpM.multiplyMatrices(rootM, partM);
        p.mesh.setMatrixAt(idx, tmpM);
        tmpColor.copy(white).lerp(flash, hit);
        if (vis.arrived) tmpColor.lerp(new THREE.Color(2.2, 0.9, 0.8), Math.min(1, dissolve * 1.5));
        p.mesh.setColorAt(idx, tmpColor);
      }
      // small contact shadow under the base (the candle casts the long one)
      if (blobN < CAPACITY * 3) {
        const r = vis.radius * 1.7 * (1 - dissolve);
        this.blob.setMatrixAt(blobN++, compose(tmpM, vis.x, 0.012, vis.z, 0, 0, 0, r, 1, r));
      }
      // damaged-only health indicator
      if (vis.diedAt === null && vis.hp < vis.maxHp && this.hpCount < CAPACITY) {
        const frac = Math.max(0, vis.hp / vis.maxHp);
        const h = vis.kind === 'urn' ? 1.75 : vis.kind === 'moth' ? 1.35 : 1.6;
        const w = vis.kind === 'urn' ? 1.0 : 0.7;
        v.set(vis.x, h, vis.z);
        const off = new THREE.Vector3(-w / 2, 0, 0).applyQuaternion(camQ);
        tmpM.compose(v.clone().add(off), camQ, s.set(w, 0.07, 1));
        this.hpBack.setMatrixAt(this.hpCount, tmpM);
        tmpM.compose(v.clone().add(off).add(new THREE.Vector3(0, 0, 0.001).applyQuaternion(camQ)), camQ, s.set(w * frac, 0.07, 1));
        this.hpFill.setMatrixAt(this.hpCount, tmpM);
        tmpColor.setHex(frac > 0.5 ? 0xe8dcb8 : 0xe28174);
        this.hpFill.setColorAt(this.hpCount, tmpColor);
        this.hpCount++;
      }
    }
    for (const a of this.arch.values()) {
      for (const p of a.parts) {
        p.mesh.count = a.high;
        p.mesh.instanceMatrix.needsUpdate = true;
        if (p.mesh.instanceColor) p.mesh.instanceColor.needsUpdate = true;
      }
    }
    this.blob.count = blobN;
    this.blob.instanceMatrix.needsUpdate = true;
    this.hpBack.count = this.hpCount;
    this.hpFill.count = this.hpCount;
    this.hpBack.instanceMatrix.needsUpdate = true;
    this.hpFill.instanceMatrix.needsUpdate = true;
    if (this.hpFill.instanceColor) this.hpFill.instanceColor.needsUpdate = true;
    void UP;
  }

  /** Visual position of an enemy (for VFX targeting); falls back to null when unknown. */
  positionOf(id: number): { x: number; z: number; kind: EnemyKind } | null {
    const vis = this.visuals.get(id);
    return vis ? { x: vis.x, z: vis.z, kind: vis.kind } : null;
  }

  liveVisuals(): number {
    return this.visuals.size;
  }

  reset(): void {
    for (const vis of [...this.visuals.values()]) this.release(vis.kind, vis.id);
    this.visuals.clear();
    for (const a of this.arch.values()) {
      a.high = 0;
      a.free.length = 0;
      for (let i = CAPACITY - 1; i >= 0; i--) a.free.push(i);
      a.map.clear();
      for (const p of a.parts) p.mesh.count = 0;
    }
    this.blob.count = 0;
    this.hpBack.count = 0;
    this.hpFill.count = 0;
  }

  dispose(): void {
    for (const a of this.arch.values()) for (const p of a.parts) p.mesh.dispose();
    this.blob.dispose();
    this.hpBack.dispose();
    this.hpFill.dispose();
    for (const d of this.disposables) d.dispose();
  }
}
