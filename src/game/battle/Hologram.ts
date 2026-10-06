import * as THREE from 'three';
import type { SheetTexture } from '../../engine/sprite/Sprite3D';
import { PixelCanvas } from '../../engine/pixel/PixelCanvas';
import { spriteTexture } from '../../engine/pixel/texture';
import type { Fighter } from './sim/types';
import { TPS } from './sim/types';
import type { Prediction, PredFrame } from './sim/predict';
import { battleSheetFor, dirFor, laneZ } from './Views';

/**
 * The battle preview, drawn as a hologram replay of the predicted future.
 *
 * While you choose, translucent copies of every fighter who will move or act play the next
 * seconds out on a loop, exactly as the simulation says they will: running, jumping, getting hit,
 * flying back. Impacts flash where and when they land. After the first moment someone else gets to
 * decide, the replay turns grey: from there on it can change. Dotted lines are only used for the
 * acting character's own aim, where they help.
 */

const HOLO_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const HOLO_FRAG = /* glsl */ `
uniform sampler2D map;
uniform vec4 rect;      // u0, v0, du, dv of the frame in the sheet
uniform vec2 texel;     // one sheet texel in uv
uniform vec3 tint;
uniform float opacity, time, grey, flash;
varying vec2 vUv;
varying vec3 vPos;
float a(vec2 uv) { return texture2D(map, uv).a; }
void main() {
  vec2 uv = rect.xy + vUv * rect.zw;
  vec4 c = texture2D(map, uv);
  // silhouette edge: transparent pixels next to the sprite glow
  float edge = 0.0;
  if (c.a < 0.5) {
    edge = max(max(a(uv + vec2(texel.x, 0.0)), a(uv - vec2(texel.x, 0.0))), max(a(uv + vec2(0.0, texel.y)), a(uv - vec2(0.0, texel.y))));
    if (edge < 0.5) discard;
  }
  float l = dot(c.rgb, vec3(0.3, 0.55, 0.15));
  vec3 col = edge > 0.5 ? tint : mix(tint * (0.3 + l * 0.9), c.rgb, 0.2);
  // scanlines drifting upward
  float scan = 0.82 + 0.18 * step(0.5, fract(vPos.y * 9.0 - time * 1.5));
  col *= scan;
  col = mix(col, vec3(dot(col, vec3(0.33))) * vec3(0.8, 0.85, 0.95), grey);
  col += flash * vec3(1.0, 0.9, 0.7);
  float alpha = (edge > 0.5 ? 0.95 : opacity) * (1.0 - grey * 0.45);
  gl_FragColor = vec4(col, alpha);
}`;

export const TEAM_TINT = { party: new THREE.Color(0.35, 0.8, 1.0), enemy: new THREE.Color(1.0, 0.36, 0.3) };

class HoloSprite {
  readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  constructor(readonly sheet: SheetTexture, tint: THREE.Color) {
    const { cols, rows } = sheet.info;
    const mat = new THREE.ShaderMaterial({
      vertexShader: HOLO_VERT,
      fragmentShader: HOLO_FRAG,
      uniforms: {
        map: { value: sheet.texture },
        rect: { value: new THREE.Vector4(0, 0, 1 / cols, 1 / rows) },
        texel: { value: new THREE.Vector2(1 / sheet.info.canvas.w, 1 / sheet.info.canvas.h) },
        tint: { value: tint.clone() },
        opacity: { value: 0.55 },
        time: { value: 0 },
        grey: { value: 0 },
        flash: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(sheet.geometry(1.02), mat);
    this.mesh.renderOrder = 10;
  }

  show(anim: string, seconds: number, dir: number): void {
    const f = this.sheet.frame(anim, seconds, dir);
    const { cols, rows } = this.sheet.info;
    this.mesh.material.uniforms.rect.value.set(f.col / cols, 1 - (f.row + 1) / rows, 1 / cols, 1 / rows);
  }
}

function dotCanvas(): PixelCanvas {
  const pc = new PixelCanvas(8, 8);
  pc.ellipse(4, 4, 3.5, 3.5, 0xffffff);
  return pc;
}

function burstCanvas(): PixelCanvas {
  const pc = new PixelCanvas(32, 32);
  const c = 16;
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + (i % 2) * 0.15;
    const r = i % 2 ? 9 : 15;
    pc.thickLine(c, c, c + Math.cos(a) * r, c + Math.sin(a) * r, i % 2 ? 1.0 : 1.6, 0xffffff);
  }
  pc.ellipse(c, c, 4.5, 4.5, 0xffffff);
  return pc;
}

function ringCanvas(): PixelCanvas {
  const pc = new PixelCanvas(32, 32);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    const d = Math.hypot(x + 0.5 - 16, y + 0.5 - 16);
    if (d > 12.5 && d < 15.5) pc.set(x, y, 0xffffff);
  }
  return pc;
}

function arrowCanvas(): PixelCanvas {
  const pc = new PixelCanvas(20, 6);
  for (let x = 3; x < 16; x++) { pc.set(x, 2, 0xffffff); pc.set(x, 3, 0xffffff); }
  for (let i = 0; i < 3; i++) { pc.set(16 + i, 1 + Math.min(i, 2), 0xffffff); pc.set(16 + i, 4 - Math.min(i, 2), 0xffffff); }
  pc.set(19, 2, 0xffffff); pc.set(19, 3, 0xffffff);
  for (const [x, y] of [[0, 0], [1, 1], [2, 2], [0, 5], [1, 4], [2, 3]]) pc.set(x, y, 0xffffff);
  return pc;
}

interface Burst {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  age: number;
}

export interface HoloOptions {
  /** Draw dotted paths for the acting fighter (aimed commands). */
  aimPath: boolean;
}

export class HoloPreview {
  readonly group = new THREE.Group();
  private holos = new Map<number, HoloSprite>();
  private projHolos: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
  private dots: THREE.InstancedMesh;
  private bursts: Burst[] = [];
  private markers: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
  private dotTex = spriteTexture(dotCanvas());
  private burstTex = spriteTexture(burstCanvas());
  private ringTex = spriteTexture(ringCanvas());
  private arrowTex = spriteTexture(arrowCanvas());
  private pred: Prediction | null = null;
  private movers = new Set<number>();
  private start = 0;
  private lastTick = -1;
  /** Current replay position in ticks (for the timeline's playhead). */
  playhead = 0;
  onImpact: ((x: number, y: number, z: number, text: string, certain: boolean) => void) | null = null;

  constructor() {
    const mat = new THREE.MeshBasicMaterial({ map: this.dotTex, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.dots = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, 600);
    this.dots.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(600 * 3), 3);
    this.dots.count = 0;
    this.dots.renderOrder = 8;
    this.dots.frustumCulled = false;
    this.group.add(this.dots);
  }

  /** Length of one replay loop in ticks (the prediction plus a short hold at the end). */
  get loopTicks(): number {
    return (this.pred?.ticks ?? 0) + Math.round(TPS * 0.6);
  }

  set(pred: Prediction | null, fighters: Fighter[], actorId: number, time: number, opts: HoloOptions): void {
    const fresh = !this.pred || !pred;
    this.pred = pred;
    if (fresh) { this.start = time; this.lastTick = -1; }
    this.clearStatic();
    if (!pred) {
      for (const h of this.holos.values()) h.mesh.visible = false;
      for (const p of this.projHolos) p.visible = false;
      this.dots.count = 0;
      return;
    }
    // who changes during the prediction? Only they get a hologram.
    this.movers.clear();
    const f0 = new Map(pred.frames[0].fighters.map((f) => [f.id, f]));
    for (const fr of pred.frames) {
      for (const f of fr.fighters) {
        const a = f0.get(f.id)!;
        if (Math.abs(f.x - a.x) > 0.06 || Math.abs(f.y - a.y) > 0.06 || (f.anim !== 'idle' && f.anim !== a.anim) || f.id === actorId) this.movers.add(f.id);
      }
    }
    for (const f of fighters) {
      if (!this.holos.has(f.id)) {
        const h = new HoloSprite(battleSheetFor(f.look), TEAM_TINT[f.team]);
        this.holos.set(f.id, h);
        this.group.add(h.mesh);
      }
    }
    this.buildStatic(pred, fighters, actorId, opts);
  }

  private clearStatic(): void {
    for (const m of this.markers) m.visible = false;
    this.dots.count = 0;
  }

  /** Aim paths for the acting fighter and rings where hits will land. */
  private buildStatic(pred: Prediction, fighters: Fighter[], actorId: number, opts: HoloOptions): void {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion();
    let n = 0;
    const put = (x: number, y: number, size: number, c: THREE.Color) => {
      if (n >= 600) return;
      m.compose(new THREE.Vector3(x, y, 1.2), q, new THREE.Vector3(size, size, size));
      this.dots.setMatrixAt(n, m);
      this.dots.setColorAt(n, c);
      n++;
    };
    const actor = fighters.find((f) => f.id === actorId)!;
    const tint = TEAM_TINT[actor.team];
    if (opts.aimPath) {
      // the actor's own body path
      let last: { x: number; y: number } | null = null;
      for (const fr of pred.frames) {
        const f = fr.fighters.find((g) => g.id === actorId)!;
        if (last && Math.hypot(f.x - last.x, f.y - last.y) < 0.28) continue;
        if (fr.tick > pred.certainUntil) break;
        put(f.x, f.y + 1.0, 0.11, tint.clone().multiplyScalar(0.7));
        last = f;
      }
      // the actor's projectiles
      const seen = new Map<number, { x: number; y: number }>();
      for (const fr of pred.frames) {
        for (const p of fr.projectiles) {
          if (p.owner !== actorId) continue;
          const prev = seen.get(p.id);
          if (prev && Math.hypot(p.x - prev.x, p.y - prev.y) < 0.32) continue;
          put(p.x, p.y, fr.tick > pred.certainUntil ? 0.08 : 0.12, (p.kind === 'fireball' ? new THREE.Color(1.6, 0.8, 0.25) : new THREE.Color(0.8, 1.4, 0.7)).multiplyScalar(fr.tick > pred.certainUntil ? 0.35 : 0.8));
          seen.set(p.id, p);
        }
      }
    }
    this.dots.count = n;
    this.dots.instanceMatrix.needsUpdate = true;
    if (this.dots.instanceColor) this.dots.instanceColor.needsUpdate = true;

    // a ring where every hit lands (kept on screen, unlike the replay's flashes)
    let k = 0;
    for (const e of pred.events) {
      if (e.type !== 'hit') continue;
      let r = this.markers[k];
      if (!r) {
        r = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75), new THREE.MeshBasicMaterial({ map: this.ringTex, transparent: true, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
        r.renderOrder = 9;
        this.markers.push(r);
        this.group.add(r);
      }
      r.visible = true;
      r.position.set(e.x, e.y, 1.1);
      r.material.color.setRGB(e.certain ? 1.8 : 0.6, e.certain ? 0.75 : 0.6, e.certain ? 0.25 : 0.6);
      k++;
    }
  }

  /** Advance the replay. */
  update(time: number, fighters: Fighter[]): void {
    const pred = this.pred;
    if (!pred) return;
    const loop = this.loopTicks;
    const tick = Math.floor((time - this.start) * TPS) % loop;
    const t = Math.min(tick, pred.frames.length - 1);
    this.playhead = t;
    const frame: PredFrame = pred.frames[t];
    const grey = t > pred.certainUntil ? 1 : 0;
    const byId = new Map(fighters.map((f) => [f.id, f]));

    for (const [id, h] of this.holos) {
      const f = frame.fighters.find((g) => g.id === id);
      const real = byId.get(id);
      if (!f || !real || !this.movers.has(id) || (real.ko && f.ko)) { h.mesh.visible = false; continue; }
      h.mesh.visible = true;
      h.mesh.position.set(f.x, f.y, laneZ(real.lane) + 0.4);
      h.show(f.anim, f.animT / TPS, dirFor(f.facing));
      const u = h.mesh.material.uniforms;
      u.time.value = time;
      u.grey.value = grey;
      u.opacity.value = 0.5;
      u.flash.value = Math.max(0, u.flash.value - 0.08);
    }

    // projectiles
    frame.projectiles.forEach((p, i) => {
      let m = this.projHolos[i];
      if (!m) {
        m = new THREE.Mesh(new THREE.PlaneGeometry(20 / 16, 6 / 16), new THREE.MeshBasicMaterial({ map: this.arrowTex, transparent: true, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
        m.renderOrder = 11;
        this.projHolos.push(m);
        this.group.add(m);
      }
      m.visible = true;
      m.position.set(p.x, p.y, 1.0);
      m.rotation.z = Math.atan2(p.vy, p.vx);
      const c = p.kind === 'fireball' ? [2.0, 1.0, 0.3] : p.team === 'party' ? [0.8, 1.6, 0.8] : [1.8, 0.5, 0.4];
      const k = grey ? 0.45 : 1;
      m.material.color.setRGB(c[0] * k, c[1] * k, c[2] * k);
      m.scale.setScalar(p.kind === 'fireball' ? 0.9 : 1);
    });
    for (let i = frame.projectiles.length; i < this.projHolos.length; i++) this.projHolos[i].visible = false;

    // impacts flash as the replay reaches them
    if (tick < this.lastTick) this.lastTick = -1; // looped
    for (const e of pred.events) {
      if (e.type !== 'hit' || e.tick <= this.lastTick || e.tick > t) continue;
      this.burst(e.x, e.y, e.certain);
      const h = this.holos.get(e.target);
      if (h) h.mesh.material.uniforms.flash.value = 0.8;
      const ko = pred.events.some((k) => k.type === 'ko' && k.target === e.target && k.tick === e.tick);
      this.onImpact?.(e.x, e.y + 0.6, 1, `${e.damage}${ko ? ' KO' : ''}`, e.certain);
    }
    this.lastTick = t;
    for (const b of this.bursts) {
      if (!b.mesh.visible) continue;
      b.age += 1 / 60;
      const k = b.age / 0.35;
      b.mesh.scale.setScalar(0.6 + k * 1.1);
      b.mesh.material.opacity = Math.max(0, 1 - k);
      if (k >= 1) b.mesh.visible = false;
    }
    for (const r of this.markers) if (r.visible) r.rotation.z = time * 1.5;
  }

  private burst(x: number, y: number, certain: boolean): void {
    let b = this.bursts.find((q) => !q.mesh.visible);
    if (!b) {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), new THREE.MeshBasicMaterial({ map: this.burstTex, transparent: true, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
      mesh.renderOrder = 12;
      this.group.add(mesh);
      b = { mesh, age: 0 };
      this.bursts.push(b);
    }
    b.age = 0;
    b.mesh.visible = true;
    b.mesh.position.set(x, y, 1.3);
    b.mesh.material.color.setRGB(certain ? 2.2 : 0.8, certain ? 1.2 : 0.8, certain ? 0.4 : 0.8);
  }
}
