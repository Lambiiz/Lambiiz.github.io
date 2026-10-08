// A VRM character with cross-faded animation playback, blinking, expressions,
// procedural head-look and procedural pose overlays (used for guard / victory
// poses that the animation library doesn't contain).
import * as THREE from 'three';
import { damp } from '../core/math.js';

const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _v = new THREE.Vector3();

export class Character {
  /**
   * @param {{vrm: import('@pixiv/three-vrm').VRM, clips: Map<string, THREE.AnimationClip>, nativeHeight:number, def:{height:number}}} asset
   */
  constructor(asset, name) {
    this.name = name;
    this.vrm = asset.vrm;
    this.clips = asset.clips;
    this.root = new THREE.Group();
    this.root.name = `char:${name}`;
    this.scale = asset.def.height / asset.nativeHeight;
    this.vrm.scene.scale.setScalar(this.scale);
    this.root.add(this.vrm.scene);
    this.height = asset.def.height;
    this.isVRM0 = this.vrm.meta?.metaVersion === '0';

    this.mixer = new THREE.AnimationMixer(this.vrm.scene);
    this.actions = new Map();
    this.current = null;
    this.currentName = '';
    this._waiters = new Set();
    this.mixer.addEventListener('finished', (e) => {
      for (const w of [...this._waiters]) {
        if (w.action === e.action) {
          this._waiters.delete(w);
          w.resolve();
        }
      }
    });

    this.blinkTimer = 2 + Math.random() * 3;
    this.blinkPhase = 0;
    this.expressions = {};
    this.expressionTargets = {};

    this.headLook = { target: null, weight: 0, targetWeight: 0, yaw: 0, pitch: 0 };
    this.overlay = { pose: null, weight: 0, target: 0, speed: 8 };
    this.heading = 0;
  }

  get position() {
    return this.root.position;
  }

  bone(name) {
    return this.vrm.humanoid.getNormalizedBoneNode(name);
  }

  _action(name) {
    let a = this.actions.get(name);
    if (!a) {
      const clip = this.clips.get(name);
      if (!clip) throw new Error(`${this.name}: no clip ${name}`);
      a = this.mixer.clipAction(clip);
      if (clip.userData?.once) {
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true;
      }
      this.actions.set(name, a);
    }
    return a;
  }

  /**
   * Cross-fades to an animation. Returns a promise that resolves when a
   * one-shot clip finishes (or immediately for loops).
   */
  play(name, { fade = 0.25, timeScale = 1, from = 0, force = false } = {}) {
    const next = this._action(name);
    const prev = this.current;
    next.timeScale = timeScale;
    if (prev === next && !force) return Promise.resolve();
    next.reset();
    next.time = from;
    next.enabled = true;
    next.setEffectiveWeight(1);
    next.play();
    if (prev && prev !== next) prev.crossFadeTo(next, fade, false);
    else if (!prev) next.fadeIn(fade);
    this.current = next;
    this.currentName = name;
    if (next.loop === THREE.LoopOnce) {
      return new Promise((resolve) => this._waiters.add({ action: next, resolve }));
    }
    return Promise.resolve();
  }

  /** Duration of a clip in seconds at timescale 1. */
  clipDuration(name) {
    return this.clips.get(name)?.duration ?? 0;
  }

  setTimeScale(ts) {
    if (this.current) this.current.timeScale = ts;
  }

  setExpression(name, weight) {
    this.expressionTargets[name] = weight;
    if (!(name in this.expressions)) this.expressions[name] = 0;
  }

  clearExpressions() {
    for (const k of Object.keys(this.expressionTargets)) this.expressionTargets[k] = 0;
  }

  lookAt(target, weight = 1) {
    this.headLook.target = target;
    this.headLook.targetWeight = target ? weight : 0;
  }

  /** Blend towards a procedural pose: { boneName: [x, y, z] } euler radians (VRM1 convention). */
  setOverlay(pose, target = 1, speed = 8) {
    if (pose) this.overlay.pose = this._compilePose(pose);
    this.overlay.target = target;
    this.overlay.speed = speed;
  }

  _compilePose(pose) {
    const out = [];
    for (const [bone, rot] of Object.entries(pose)) {
      const node = this.bone(bone);
      if (!node) continue;
      _e.set(rot[0], rot[1], rot[2], 'XYZ');
      const q = new THREE.Quaternion().setFromEuler(_e);
      if (this.isVRM0) {
        q.x *= -1;
        q.z *= -1;
      }
      out.push({ node, q });
    }
    return out;
  }

  faceTowards(point, dt, rate = 10) {
    const dx = point.x - this.root.position.x;
    const dz = point.z - this.root.position.z;
    if (dx * dx + dz * dz < 1e-6) return;
    const target = Math.atan2(dx, dz);
    this.heading = dampAngle(this.heading, target, rate, dt);
    this.root.rotation.y = this.heading;
  }

  setHeading(h) {
    this.heading = h;
    this.root.rotation.y = h;
  }

  update(dt) {
    this.mixer.update(dt);

    // Procedural pose overlay (after animation, before VRM solves).
    const ov = this.overlay;
    ov.weight = damp(ov.weight, ov.target, ov.speed, dt);
    if (ov.pose && ov.weight > 0.001) {
      for (const { node, q } of ov.pose) node.quaternion.slerp(q, ov.weight);
    }

    // Procedural head look.
    const hl = this.headLook;
    hl.weight = damp(hl.weight, hl.targetWeight, 4, dt);
    if (hl.target && hl.weight > 0.001) {
      const head = this.bone('head');
      head.getWorldPosition(_v);
      const tp = hl.target.isVector3 ? hl.target : hl.target.getWorldPosition(new THREE.Vector3());
      const dx = tp.x - _v.x;
      const dz = tp.z - _v.z;
      const dy = tp.y - _v.y;
      let yaw = Math.atan2(dx, dz) - this.heading;
      yaw = Math.atan2(Math.sin(yaw), Math.cos(yaw));
      yaw = THREE.MathUtils.clamp(yaw, -1.1, 1.1);
      const pitch = THREE.MathUtils.clamp(-Math.atan2(dy, Math.hypot(dx, dz)), -0.5, 0.5);
      hl.yaw = damp(hl.yaw, yaw, 6, dt);
      hl.pitch = damp(hl.pitch, pitch, 6, dt);
      const w = hl.weight;
      const sign = this.isVRM0 ? -1 : 1;
      _q.setFromEuler(_e.set(sign * hl.pitch * 0.6 * w, hl.yaw * 0.55 * w, 0));
      this.bone('head').quaternion.premultiply(_q);
      _q.setFromEuler(_e.set(sign * hl.pitch * 0.3 * w, hl.yaw * 0.35 * w, 0));
      this.bone('neck').quaternion.premultiply(_q);
    }

    // Blinking.
    const em = this.vrm.expressionManager;
    if (em) {
      this.blinkTimer -= dt;
      if (this.blinkTimer <= 0) {
        this.blinkPhase = 0.16;
        this.blinkTimer = 2.2 + Math.random() * 3.5;
      }
      let blink = 0;
      if (this.blinkPhase > 0) {
        this.blinkPhase -= dt;
        blink = Math.sin((1 - this.blinkPhase / 0.16) * Math.PI);
      }
      for (const [k, target] of Object.entries(this.expressionTargets)) {
        this.expressions[k] = damp(this.expressions[k], target, 8, dt);
        em.setValue(k, this.expressions[k]);
      }
      const closed = Math.max(this.expressions.happy ?? 0, this.expressions.relaxed ?? 0);
      em.setValue('blink', Math.min(1, blink * (1 - closed)));
    }

    this.vrm.update(dt);
  }
}

export function dampAngle(a, b, rate, dt) {
  let d = b - a;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  return a + d * (1 - Math.exp(-rate * dt));
}
