// Enemy miniatures, batched per archetype with InstancedMesh. Each logical enemy keeps a stable
// instance index (free-list) until its dissolve finishes. Visual sway/recoil never feeds back
// into simulation; all motion here is driven by interpolated simulation time.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { EnemyKind, EnemyState, SimEvent } from '../game/types';
import * as art from './art';

const CAPACITY = 160;
/** Visual-only scale per archetype (logical radii live in game/content.ts). */
const VISUAL_SCALE: Record<EnemyKind, number> = { echo: 1.12, moth: 1.35, urn: 1.12 };
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
    const ceramicTex = track(art.colorTexture(art.drawMaskFace(), renderer));
    const ceramic = track(new THREE.MeshStandardMaterial({ color: 0xe9e1c9, map: ceramicTex, roughness: 0.38, side: THREE.DoubleSide }));
    const brass = track(new THREE.MeshStandardMaterial({ color: 0xc2a46a, metalness: 0.85, roughness: 0.35 }));
    const ink = track(new THREE.MeshStandardMaterial({ color: 0x0c0f18, roughness: 0.5 }));
    const veil = track(
      new THREE.MeshStandardMaterial({ color: 0x6b7cab, emissive: 0x1a2a4a, roughness: 0.8, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false }),
    );
    const pearl = track(new THREE.MeshStandardMaterial({ color: 0x232638, metalness: 0.35, roughness: 0.14, emissive: 0x0e3a3a, emissiveIntensity: 0.6 }));
    const wingTex = track(art.colorTexture(art.drawMothWing(), renderer));
    const wing = track(new THREE.MeshStandardMaterial({ map: wingTex, roughness: 0.7, side: THREE.DoubleSide, transparent: true, opacity: 0.96 }));
    const urnBody = track(new THREE.MeshStandardMaterial({ color: 0xd9cfb3, map: ceramicTex, roughness: 0.5 }));
    const enamel = track(new THREE.MeshStandardMaterial({ color: 0x1d2a4c, roughness: 0.28, metalness: 0.25 }));
    const darkBrass = track(new THREE.MeshStandardMaterial({ color: 0x8c6a34, metalness: 0.9, roughness: 0.32 }));

    const mk = (geo: THREE.BufferGeometry, mat: THREE.Material, _shadow = false) => {
      track(geo);
      const m = new THREE.InstancedMesh(geo, mat, CAPACITY);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.setColorAt(0, white);
      m.count = 0;
      m.castShadow = false; // crowds use pooled blob shadows, never the realtime shadow map
      void _shadow;
      // conservative bounds covering the whole arena; instances move every frame
      m.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, 0), 16);
      m.frustumCulled = false;
      this.root.add(m);
      return m;
    };

    // ---------------- Veiled Echo: hollow ceramic mask above a tapering veil
    // front half-shell centred on +z (local forward); the hollow back stays open
    const maskGeo = new THREE.SphereGeometry(0.3, 24, 16, Math.PI * 0.08, Math.PI * 0.84, Math.PI * 0.06, Math.PI * 0.84);
    maskGeo.scale(1.12, 1.4, 0.78);
    const veilPts: THREE.Vector2[] = [];
    const veilProfile = [
      [0.015, 0.0],
      [0.06, 0.1],
      [0.15, 0.3],
      [0.26, 0.55],
      [0.33, 0.76],
      [0.31, 0.9],
      [0.2, 0.99],
    ];
    for (const [r, y] of veilProfile) veilPts.push(new THREE.Vector2(r, y));
    const veilGeo = new THREE.LatheGeometry(veilPts, 28);
    // rippled hem: modulate radius by angle near the bottom
    {
      const pos = veilGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const a = Math.atan2(z, x);
        const k = 1 + 0.16 * Math.sin(a * 7) * (1 - Math.min(1, y / 0.75));
        pos.setXYZ(i, x * k, y, z * k);
      }
      veilGeo.computeVertexNormals();
    }
    const eyeL = new THREE.SphereGeometry(0.075, 12, 8);
    eyeL.scale(1.55, 0.8, 0.45);
    eyeL.translate(-0.12, 0.07, 0.2);
    const eyeR = eyeL.clone();
    eyeR.translate(0.24, 0, 0);
    const mouth = new THREE.BoxGeometry(0.12, 0.022, 0.03);
    mouth.translate(0, -0.17, 0.205);
    const eyesGeo = mergeGeometries([eyeL, eyeR, mouth])!;
    [eyeL, eyeR, mouth].forEach((g) => g.dispose());
    const collarGeo = new THREE.TorusGeometry(0.2, 0.028, 8, 24);
    collarGeo.rotateX(Math.PI / 2);
    const haloRingGeo = new THREE.TorusGeometry(0.24, 0.018, 6, 32);
    haloRingGeo.rotateX(Math.PI / 2);

    const echoBob = (t: number, ph: number) => Math.sin(t * 2.1 + ph) * 0.06;
    this.addArch('echo', [
      {
        mesh: mk(veilGeo, veil),
        local: (o, t, ph) => compose(o, 0, 0.12 + echoBob(t, ph) * 0.5, 0, Math.sin(t * 2.1 + ph) * 0.06, Math.sin(t * 1.3 + ph) * 0.3, 0, 1, 1 + Math.sin(t * 4.2 + ph) * 0.04),
      },
      { mesh: mk(collarGeo, brass), local: (o, t, ph) => compose(o, 0, 1.03 + echoBob(t, ph), 0, 0, 0, 0) },
      {
        mesh: mk(maskGeo, ceramic, true),
        local: (o, t, ph, hit) => compose(o, 0, 1.3 + echoBob(t, ph), 0.03, -0.42 - hit * 0.3, 0, Math.sin(t * 1.7 + ph) * 0.08),
      },
      {
        mesh: mk(eyesGeo, ink),
        local: (o, t, ph, hit) => compose(o, 0, 1.3 + echoBob(t, ph), 0.03, -0.42 - hit * 0.3, 0, Math.sin(t * 1.7 + ph) * 0.08, 1.12, 1.4, 0.78),
      },
      {
        // ceremonial halo above the mask: a thin brass ring that makes the silhouette unmistakable
        mesh: mk(haloRingGeo, brass),
        local: (o, t, ph) => compose(o, 0, 1.78 + echoBob(t, ph) * 1.2, -0.05, -0.35, t * 0.6 + ph, 0),
      },
    ]);

    // ---------------- Folded Moth: fast folded wings around a dark pearl
    const pearlGeo = new THREE.SphereGeometry(0.16, 20, 14);
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.bezierCurveTo(0.18, 0.32, 0.5, 0.42, 0.62, 0.22);
    wingShape.bezierCurveTo(0.66, 0.08, 0.5, 0.02, 0.38, 0.0);
    wingShape.bezierCurveTo(0.5, -0.08, 0.48, -0.3, 0.3, -0.34);
    wingShape.bezierCurveTo(0.16, -0.32, 0.06, -0.16, 0, 0);
    const wingGeo = new THREE.ShapeGeometry(wingShape, 10);
    // shape lies in XY; lay it flat (XZ) with +y -> +z so the forewing leads
    wingGeo.rotateX(Math.PI / 2);
    {
      const uv = wingGeo.attributes.uv as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 0.66, (uv.getY(i) + 0.34) / 0.76);
    }
    const haloGeo = new THREE.TorusGeometry(0.24, 0.012, 6, 32);
    const flap = (t: number, ph: number) => Math.sin(t * 22 + ph * 3);
    const mothY = (t: number, ph: number) => 0.85 + Math.sin(t * 5 + ph) * 0.09;
    this.addArch('moth', [
      { mesh: mk(pearlGeo, pearl, true), local: (o, t, ph, hit) => compose(o, 0, mothY(t, ph), 0, 0, 0, 0, 1 - hit * 0.15) },
      {
        mesh: mk(wingGeo, wing),
        local: (o, t, ph) => compose(o, 0.06, mothY(t, ph), 0, 0, 0.15, 0.25 + flap(t, ph) * 0.85),
      },
      {
        mesh: mk(wingGeo.clone(), wing),
        local: (o, t, ph) => compose(o, -0.06, mothY(t, ph), 0, 0, -0.15, -(0.25 + flap(t, ph) * 0.85), -1, 1, 1),
      },
      { mesh: mk(haloGeo, brass), local: (o, t, ph) => compose(o, 0, mothY(t, ph), 0, Math.PI / 2 + 0.4, t * 2 + ph, 0) },
    ]);

    // ---------------- Burden Urn: armored urn with a lid and brass bands
    const urnProfile = [
      [0.0, 0.0],
      [0.26, 0.0],
      [0.28, 0.06],
      [0.22, 0.12],
      [0.36, 0.3],
      [0.48, 0.52],
      [0.46, 0.72],
      [0.32, 0.9],
      [0.24, 0.98],
      [0.27, 1.04],
      [0.0, 1.04],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const urnGeo = new THREE.LatheGeometry(urnProfile, 30);
    const band1 = new THREE.TorusGeometry(0.49, 0.055, 8, 32);
    band1.rotateX(Math.PI / 2);
    band1.translate(0, 0.58, 0);
    const band2 = new THREE.TorusGeometry(0.4, 0.045, 8, 32);
    band2.rotateX(Math.PI / 2);
    band2.translate(0, 0.32, 0);
    const band3 = new THREE.TorusGeometry(0.26, 0.03, 8, 24);
    band3.rotateX(Math.PI / 2);
    band3.translate(0, 0.96, 0);
    const bandsGeo = mergeGeometries([band1, band2, band3])!;
    [band1, band2, band3].forEach((g) => g.dispose());
    const lidProfile = [
      [0.0, 0.14],
      [0.08, 0.14],
      [0.06, 0.1],
      [0.18, 0.07],
      [0.3, 0.02],
      [0.3, 0.0],
      [0.0, 0.0],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const lidGeo = new THREE.LatheGeometry(lidProfile, 24);
    const knob = new THREE.SphereGeometry(0.07, 10, 8);
    knob.translate(0, 0.2, 0);
    const knobGeo = knob;
    const waddle = (t: number, ph: number) => Math.sin(t * 2.6 + ph);
    const urnRoot = (o: THREE.Matrix4, t: number, ph: number, hit: number, y = 0, extraRx = 0, sc = 1) =>
      compose(o, 0, y + Math.abs(waddle(t, ph)) * 0.05, 0, extraRx - hit * 0.12, 0, waddle(t, ph) * 0.09, sc, sc * (1 - hit * 0.08), sc);
    this.addArch('urn', [
      { mesh: mk(urnGeo, urnBody, true), local: (o, t, ph, hit) => urnRoot(o, t, ph, hit) },
      { mesh: mk(bandsGeo, darkBrass), local: (o, t, ph, hit) => urnRoot(o, t, ph, hit) },
      {
        mesh: mk(lidGeo, enamel, true),
        local: (o, t, ph, hit) => {
          urnRoot(o, t, ph, hit);
          const clatter = Math.max(0, Math.sin(t * 5.2 + ph)) * 0.03 + hit * 0.08;
          return o.multiply(compose(tmpM, 0, 1.03 + clatter, 0, clatter * 0.6, 0, 0));
        },
      },
      {
        mesh: mk(knobGeo, brass),
        local: (o, t, ph, hit) => {
          urnRoot(o, t, ph, hit);
          const clatter = Math.max(0, Math.sin(t * 5.2 + ph)) * 0.03 + hit * 0.08;
          return o.multiply(compose(tmpM, 0, 1.03 + clatter, 0, clatter * 0.6, 0, 0));
        },
      },
    ]);

    // blob shadows (pooled)
    const blobTex = track(art.colorTexture(art.drawRadial('rgba(0,0,0,0.6)', 'rgba(0,0,0,0)', 64), renderer));
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
      // blob shadow
      if (blobN < CAPACITY * 3) {
        const r = vis.radius * 2.4 * (1 - dissolve);
        this.blob.setMatrixAt(blobN++, compose(tmpM, vis.x, 0.012, vis.z, 0, 0, 0, r, 1, r));
      }
      // damaged-only health indicator
      if (vis.diedAt === null && vis.hp < vis.maxHp && this.hpCount < CAPACITY) {
        const frac = Math.max(0, vis.hp / vis.maxHp);
        const h = vis.kind === 'urn' ? 1.6 : vis.kind === 'moth' ? 1.6 : 2.0;
        const w = vis.kind === 'urn' ? 0.9 : 0.62;
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
