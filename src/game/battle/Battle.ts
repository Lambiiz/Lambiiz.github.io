import * as THREE from 'three';
import type { GameScene, SceneEvent } from '../SceneTypes';
import type { UI } from '../ui/UI';
import type { Input } from '../../engine/core/Input';
import type { PostFX } from '../../engine/render/PostFX';
import { Lighting } from '../../engine/render/Lighting';
import { Motes } from '../../engine/render/Motes';
import { Sky } from '../../engine/render/Sky';
import { cameraYaw } from '../../engine/render/globals';
import { buildStage } from './Stage';
import { FighterView, ProjectileView, TeamRing, ActorMarker, laneZ } from './Views';
import { HoloPreview } from './Hologram';
import { BattleUI, type MenuItem } from './BattleUI';
import { createBattle } from './sim/encounters';
import { decide, step, fighter, canUse, jumpToApex, ballistic, muzzle, PHYS, FRAMES, RECOVERY } from './sim/sim';
import { predict, type Prediction } from './sim/predict';
import { think } from './sim/ai';
import { DT, type BattleState, type Command, type Fighter, type Skill } from './sim/types';

type Mode = 'run' | 'menu' | 'aim' | 'over';

const SKILL_INFO: Record<Skill | 'flee', { label: string; desc: string; aimed: boolean }> = {
  move: { label: 'Move', desc: 'Run to a spot on the ground. Aim with the mouse.', aimed: true },
  jump: { label: 'Jump', desc: 'Leap. Point at where the top of the arc should be.', aimed: true },
  slash: { label: 'Slash', desc: `A lunging sword cut. ${FRAMES.slash.damage} damage, short reach.`, aimed: false },
  fireball: { label: 'Fireball', desc: `A bolt of flame flying straight at the aim point. ${FRAMES.fireball.damage} damage. Can be cast mid-air.`, aimed: true },
  arrow: { label: 'Arrow', desc: `An arcing shot that lands on the aim point. ${FRAMES.arrow.damage} damage.`, aimed: true },
  guard: { label: 'Guard', desc: 'Brace against attacks from the front. Takes 70% less damage.', aimed: false },
  wait: { label: 'Wait', desc: 'Keep doing what you are doing. Your next turn comes quickly.', aimed: false },
  flee: { label: 'Flee', desc: 'Leave the battle (prototype).', aimed: false },
};

/**
 * A battle: the side-view arena, the sim, the views, and the turn flow.
 *
 * Time runs in real time at the sim's fixed tick. When an enemy's gauge fills its brain decides
 * immediately; when a party member's gauge fills, time stops and the command menu opens. Every
 * highlighted command is previewed exactly (see sim/predict.ts) and aimed commands re-preview as the
 * aim moves.
 */
export class Battle implements GameScene {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.5, 220);
  readonly overlay = new THREE.Scene();
  readonly lighting: Lighting;
  private state: BattleState;
  private views = new Map<number, FighterView>();
  private projViews = new Map<number, ProjectileView>();
  private prevF = new Map<number, { x: number; y: number }>();
  private prevP = new Map<number, { x: number; y: number }>();
  private holo = new HoloPreview();
  private rings = new Map<number, TeamRing>();
  private marker = new ActorMarker();
  /** Seconds of slow motion left (after an enemy commits to an action). */
  private slowmo = 0;
  private orderClock = 0;
  private pred: Prediction | null = null;
  private bui: BattleUI;
  private mode: Mode = 'run';
  private acc = 0;
  private time = 0;
  private aim = new THREE.Vector2();
  private aimSkill: Skill | null = null;
  private mouseDirty = false;
  private overT = 0;
  private hitStop = 0;
  private shake = 0;
  private camX = 0;
  private leave: SceneEvent | null = null;
  private stopK = 0;
  private listeners: [string, EventListener][] = [];
  private aimMarker: THREE.Mesh;

  constructor(private ui: UI, preset: string, encounter: string) {
    this.lighting = new Lighting(this.scene, preset);
    this.lighting.shadowSize = 16;
    this.lighting.sky = new Sky(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.lighting.sky);
    buildStage(this.scene, this.lighting);
    const seed = (Math.random() * 2 ** 31) >>> 0;
    this.state = createBattle(encounter, seed);
    for (const f of this.state.fighters) {
      const v = new FighterView(f.id, f.look);
      this.views.set(f.id, v);
      this.scene.add(v.sprite);
    }
    for (const f of this.state.fighters) {
      const r = new TeamRing(f.team);
      this.rings.set(f.id, r);
      this.scene.add(r.mesh);
    }
    this.scene.add(this.marker.ring);
    this.overlay.add(this.holo.group, this.marker.chevron);
    this.holo.onImpact = (x, y, z, text, certain) => {
      const p = this.project(x, y, z);
      this.bui.holoImpact(p.x, p.y, text, certain);
    };
    this.scene.add(new Motes(140, new THREE.Box3(new THREE.Vector3(-14, 0.4, -8), new THREE.Vector3(14, 6, 5)), { color: 0xffe2a8, size: 6, intensity: 1.0 }));
    this.aimMarker = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.24, 20), new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 1.8, 1.2), depthTest: false, transparent: true, fog: false }));
    this.aimMarker.renderOrder = 30;
    this.aimMarker.visible = false;
    this.overlay.add(this.aimMarker);
    this.camera.position.set(0, 3.8, 18);
    this.camera.lookAt(0, 1.45, 0);
    this.bui = new BattleUI(document.body, this.state);
    this.bui.onPick = (i) => this.pick(i);
    this.bui.onHover = () => this.previewSelected();
    this.snapshot();
  }

  // ---------------------------------------------------------------------------------------------
  // GameScene
  // ---------------------------------------------------------------------------------------------

  enter(): void {
    this.ui.setHelp('');
    const on = (type: string, fn: EventListener) => {
      window.addEventListener(type, fn);
      this.listeners.push([type, fn]);
    };
    on('mousemove', ((e: MouseEvent) => this.onMouse(e)) as EventListener);
    on('mousedown', ((e: MouseEvent) => {
      if (this.mode !== 'aim') return;
      if (e.button === 0) this.confirmAim();
      if (e.button === 2) this.backToMenu();
    }) as EventListener);
    on('contextmenu', ((e: Event) => e.preventDefault()) as EventListener);
    this.bui.setHint('');
  }

  exit(): void {
    for (const [t, fn] of this.listeners) window.removeEventListener(t, fn);
    this.bui.dispose();
    // free per-battle GPU buffers (materials and textures are shared caches and stay alive)
    for (const root of [this.scene, this.overlay]) {
      root.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
      });
    }
  }

  dof(post: PostFX): void {
    this.lighting.applyGrade(post);
    // time stop: drain colour, cool the shadows, close the vignette
    const k = this.stopK;
    post.grade.saturation *= 1 - 0.55 * k;
    post.grade.contrast = 1.08 + 0.06 * k;
    post.grade.shadowTint.lerp(new THREE.Color(0.0, 0.02, 0.07), k);
    post.grade.vignette = 0.32 + 0.22 * k;
    const d = post.dof;
    d.focusDistance = this.camera.position.distanceTo(new THREE.Vector3(this.camX, 1.4, 0));
    d.focusRange = 1.6;
    d.nearScale = 0.16;
    d.farScale = 0.075;
    d.maxBlur = 0.012;
    d.tiltShift = 0.12;
    d.tiltCenter = 0.5;
    d.tiltBand = 0.35;
    d.bokehBoost = 3;
  }

  update(dt: number, time: number, input: Input): SceneEvent | null {
    this.time = time;
    const s = this.state;
    this.stopK += ((this.mode === 'menu' || this.mode === 'aim' ? 1 : 0) - this.stopK) * (1 - Math.exp(-10 * dt));

    // ---- input per mode ----
    if (this.mode === 'menu') {
      if (input.hit('up') || input.hit('left')) { this.bui.moveSel(-1); this.previewSelected(); }
      if (input.hit('down') || input.hit('right')) { this.bui.moveSel(1); this.previewSelected(); }
      if (input.hit('confirm')) this.pick(this.bui.sel);
    } else if (this.mode === 'aim') {
      const m = input.move();
      if (m.x || m.y) {
        this.aim.x += m.x * 6 * dt;
        this.aim.y -= m.y * 6 * dt;
        this.clampAim();
        this.previewAim();
      }
      if (this.mouseDirty) { this.mouseDirty = false; this.previewAim(); }
      if (input.hit('confirm')) this.confirmAim();
      else if (input.hit('cancel')) this.backToMenu();
    }

    // ---- simulation ----
    if (this.mode === 'run' && dt > 0) {
      if (this.hitStop > 0) this.hitStop -= dt;
      else {
        // a beat of slow motion after an enemy commits, so you see what it chose
        this.slowmo = Math.max(0, this.slowmo - dt);
        this.acc += this.slowmo > 0 ? dt * 0.3 : dt;
        let guard = 0;
        while (this.acc >= DT && guard++ < 8) {
          this.snapshot();
          step(s);
          this.acc -= DT;
          this.consumeEvents();
          if (s.awaiting !== null || s.outcome || this.hitStop > 0) break;
        }
        this.resolveTurns();
      }
    }
    if (s.outcome && this.mode !== 'over') this.finish();
    if (this.mode === 'over') {
      this.overT += dt;
      if (this.overT > 3 && !this.leave) this.leave = { type: 'leaveBattle', result: s.outcome === 'win' ? 'win' : 'lose' };
    }

    this.render(dt);
    const ev = this.leave;
    this.leave = null;
    return ev;
  }

  /** Debug / automation: run the sim until a party member's turn (or `maxSeconds`). */
  fastForward(maxSeconds = 10): void {
    const s = this.state;
    for (let i = 0; i < maxSeconds * 60 && this.mode === 'run' && !s.outcome; i++) {
      this.snapshot();
      step(s);
      this.consumeEvents();
      this.resolveTurns();
    }
    this.hitStop = 0;
  }

  /** Debug / automation: highlight menu entry `i`, or pick it with an aim point. */
  debugMenu(i: number, aim?: { x: number; y: number }): void {
    if (this.mode !== 'menu') return;
    this.bui.sel = i;
    this.bui.moveSel(0);
    this.previewSelected();
    if (aim) {
      this.pick(i);
      if ((this.mode as Mode) === 'aim') {
        this.aim.set(aim.x, aim.y);
        this.clampAim();
        this.previewAim();
      }
    }
  }

  // ---------------------------------------------------------------------------------------------
  // turns
  // ---------------------------------------------------------------------------------------------

  /** Enemy turns resolve at once; a party turn stops time and opens the menu. */
  private resolveTurns(): void {
    const s = this.state;
    let guard = 0;
    while (s.awaiting !== null && guard++ < 10) {
      const f = fighter(s, s.awaiting);
      if (f.team === 'enemy') {
        const cmd = think(s, f);
        if (!decide(s, f.id, cmd)) decide(s, f.id, { kind: 'wait' });
        else if (cmd.kind !== 'wait') {
          const p = this.project(f.x, f.y + 2.6, laneZ(f.lane));
          this.bui.callout(p.x, p.y, `${f.name}: ${SKILL_INFO[cmd.kind].label}`, 'enemy');
          this.views.get(f.id)?.hit(0.5);
          this.slowmo = 0.4;
        }
        continue;
      }
      this.openMenu(f);
      return;
    }
  }

  private openMenu(f: Fighter): void {
    this.mode = 'menu';
    this.acc = 0;
    const items: MenuItem[] = (f.skills as (Skill | 'flee')[]).concat('flee').map((sk, i) => {
      const next = sk === 'flee' ? 0 : (1 - RECOVERY[sk]) / f.atbRate;
      return {
        skill: sk,
        label: SKILL_INFO[sk].label,
        key: `${i + 1}`,
        desc: SKILL_INFO[sk].desc + (sk === 'flee' ? '' : `<br><b>Next turn in ${next.toFixed(1)} s</b>`),
        enabled: sk === 'flee' || canUse(f, this.defaultCommand(f, sk as Skill)),
      };
    });
    this.bui.showMenu(`${f.name}'s turn`, items);
    this.bui.setStopped(true);
    this.bui.setHint('<kbd>←</kbd><kbd>→</kbd> choose · <kbd>Space</kbd> select<br>The holograms replay exactly what will happen; grey = someone else may change it');
    this.previewSelected();
  }

  private get actor(): Fighter {
    return fighter(this.state, this.state.awaiting!);
  }

  private nearestFoe(f: Fighter): Fighter | null {
    let best: Fighter | null = null;
    for (const o of this.state.fighters) {
      if (o.team === f.team || o.ko) continue;
      if (!best || Math.abs(o.x - f.x) < Math.abs(best.x - f.x)) best = o;
    }
    return best;
  }

  /** The aim each aimed command starts from. */
  private defaultAim(f: Fighter, sk: Skill): THREE.Vector2 {
    const foe = this.nearestFoe(f);
    const dir = foe ? Math.sign(foe.x - f.x) || 1 : f.facing;
    switch (sk) {
      case 'move': return new THREE.Vector2(f.x + dir * 2.5, 0);
      case 'jump': return new THREE.Vector2(f.x + dir * 2.2, f.y + 2.2);
      case 'fireball': return foe ? new THREE.Vector2(foe.x, foe.y + 1.1) : new THREE.Vector2(f.x + dir * 5, f.y + 1.4);
      case 'arrow': return foe ? new THREE.Vector2(foe.x, foe.y + 1.0) : new THREE.Vector2(f.x + dir * 5, 0.5);
      default: return new THREE.Vector2(f.x, f.y);
    }
  }

  private commandFor(f: Fighter, sk: Skill, aim: THREE.Vector2): Command {
    switch (sk) {
      case 'move': return { kind: 'move', x: aim.x };
      case 'jump': return { kind: 'jump', ...jumpToApex(f, aim.x, aim.y) };
      case 'fireball': return { kind: 'fireball', tx: aim.x, ty: aim.y };
      case 'arrow': {
        const dir = aim.x >= f.x ? 1 : -1;
        return { kind: 'arrow', ...ballistic(muzzle({ ...f, facing: dir }), { x: aim.x, y: aim.y }, PHYS.gravity * PHYS.arrowGravity) };
      }
      case 'slash': {
        const foe = this.nearestFoe(f);
        return { kind: 'slash', dir: foe ? (foe.x >= f.x ? 1 : -1) : f.facing };
      }
      case 'guard': return { kind: 'guard' };
      default: return { kind: 'wait' };
    }
  }

  private defaultCommand(f: Fighter, sk: Skill): Command {
    return this.commandFor(f, sk, this.defaultAim(f, sk));
  }

  private previewSelected(): void {
    if (this.mode !== 'menu') return;
    const it = this.bui.items[this.bui.sel];
    if (!it || it.skill === 'flee') { this.setPrediction(null); return; }
    const f = this.actor;
    const cmd = this.defaultCommand(f, it.skill);
    this.setPrediction(predict(this.state, f.id, cmd), cmd);
  }

  private pick(i: number): void {
    const it = this.bui.items[i];
    if (!it?.enabled) return;
    if (it.skill === 'flee') {
      this.bui.hideMenu();
      this.mode = 'over';
      this.overT = 2.4;
      this.bui.showResult('Escaped', 'You slip away down the road');
      this.setPrediction(null);
      return;
    }
    const f = this.actor;
    if (SKILL_INFO[it.skill].aimed) {
      this.mode = 'aim';
      this.aimSkill = it.skill;
      this.aim.copy(this.defaultAim(f, it.skill));
      this.bui.hideMenu();
      this.bui.setHint(`<b>${SKILL_INFO[it.skill].label}</b> — aim with the mouse or <kbd>WASD</kbd> · <kbd>Click</kbd>/<kbd>Space</kbd> confirm · <kbd>Esc</kbd>/<kbd>Right-click</kbd> back`);
      this.previewAim();
      return;
    }
    this.commit(this.defaultCommand(f, it.skill));
  }

  private clampAim(): void {
    const f = this.actor;
    this.aim.x = THREE.MathUtils.clamp(this.aim.x, this.state.arena.left, this.state.arena.right);
    this.aim.y = THREE.MathUtils.clamp(this.aim.y, this.aimSkill === 'jump' ? f.y + 0.5 : 0, 7);
    if (this.aimSkill === 'move') this.aim.y = 0;
  }

  private previewAim(): void {
    if (this.mode !== 'aim' || !this.aimSkill) return;
    const f = this.actor;
    const cmd = this.commandFor(f, this.aimSkill, this.aim);
    this.setPrediction(predict(this.state, f.id, cmd), cmd);
  }

  private confirmAim(): void {
    if (this.mode !== 'aim' || !this.aimSkill) return;
    this.commit(this.commandFor(this.actor, this.aimSkill, this.aim));
  }

  private backToMenu(): void {
    if (this.mode !== 'aim') return;
    this.openMenu(this.actor);
  }

  private commit(cmd: Command): void {
    const f = this.actor;
    if (!decide(this.state, f.id, cmd)) return;
    this.bui.hideMenu();
    this.bui.setStopped(false);
    this.bui.setHint('');
    this.setPrediction(null);
    this.mode = 'run';
    this.aimSkill = null;
    this.resolveTurns();
  }

  private setPrediction(p: Prediction | null, cmd?: Command): void {
    this.pred = p;
    const s = this.state;
    const actorId = s.awaiting;
    this.holo.set(p, s.fighters, actorId ?? -1, this.time, { aimPath: this.mode === 'aim' });
    this.bui.showOrder(s, p, cmd ? RECOVERY[cmd.kind] : null);
    const label = this.mode === 'aim' && this.aimSkill ? SKILL_INFO[this.aimSkill].label : this.bui.items[this.bui.sel]?.label ?? '';
    this.bui.showLog(p, actorId !== null ? fighter(s, actorId).name : '', label);
  }

  private finish(): void {
    this.mode = 'over';
    this.bui.hideMenu();
    this.bui.setStopped(false);
    this.setPrediction(null);
    if (this.state.outcome === 'win') this.bui.showResult('Victory', 'The road east is clear');
    else this.bui.showResult('Defeat', 'You stagger back to town');
  }

  // ---------------------------------------------------------------------------------------------
  // events, rendering
  // ---------------------------------------------------------------------------------------------

  private snapshot(): void {
    for (const f of this.state.fighters) this.prevF.set(f.id, { x: f.x, y: f.y });
    this.prevP.clear();
    for (const p of this.state.projectiles) this.prevP.set(p.id, { x: p.x, y: p.y });
  }

  private consumeEvents(): void {
    for (const e of this.state.events) {
      if (e.type === 'hit') {
        this.views.get(e.target)?.hit(1);
        const p = this.project(e.x, e.y + 0.4, 1);
        this.bui.damage(p.x, p.y, e.damage, e.guarded);
        this.hitStop = e.guarded ? 0.04 : 0.09;
        this.shake = Math.max(this.shake, e.guarded ? 0.05 : 0.14);
      }
    }
    this.state.events = [];
  }

  private render(dt: number): void {
    const s = this.state;
    const alpha = this.mode === 'run' && this.hitStop <= 0 ? Math.min(1, this.acc / DT) : 1;
    // camera drifts gently toward the action
    const alive = s.fighters.filter((f) => !f.ko);
    const cx = alive.reduce((a, f) => a + f.x, 0) / Math.max(1, alive.length);
    const target = this.mode === 'menu' || this.mode === 'aim' ? cx * 0.3 + this.actor.x * 0.2 : cx * 0.35;
    this.camX += (THREE.MathUtils.clamp(target, -3, 3) - this.camX) * (1 - Math.exp(-2.5 * dt));
    this.shake = Math.max(0, this.shake - dt * 0.6);
    const sh = this.shake * this.shake * 6;
    this.camera.position.set(this.camX + (Math.random() - 0.5) * sh, 3.8 + (Math.random() - 0.5) * sh, 18 - this.stopK * 0.7);
    this.camera.lookAt(this.camX, 1.45, 0);
    this.camera.updateMatrixWorld();

    const camYaw = cameraYaw(this.camera);
    const sunYaw = this.lighting.sunYaw;
    const choosing = this.mode === 'menu' || this.mode === 'aim';
    for (const f of s.fighters) {
      const prev = this.prevF.get(f.id) ?? f;
      const v = this.views.get(f.id)!;
      v.highlight = choosing && s.awaiting === f.id ? 0.5 + 0.5 * Math.sin(this.time * 6) : 0;
      v.sync({ ...f, x: prev.x, y: prev.y }, f, alpha, camYaw, sunYaw, dt);
      const r = this.rings.get(f.id)!.mesh;
      r.position.set(v.sprite.position.x, 0.025, v.sprite.position.z);
      r.visible = !f.ko;
    }
    if (choosing && s.awaiting !== null) {
      const a = this.views.get(s.awaiting)!.sprite;
      this.marker.show(a.position.x, a.lift, a.position.z, this.time);
    } else this.marker.hide();
    // projectiles
    const live = new Set<number>();
    for (const p of s.projectiles) {
      live.add(p.id);
      let v = this.projViews.get(p.id);
      if (!v) {
        v = new ProjectileView(p.id, p.kind);
        this.projViews.set(p.id, v);
        this.scene.add(v.obj, ...v.extras);
      }
      const pr = this.prevP.get(p.id);
      v.sync(pr ? { ...p, x: pr.x, y: pr.y } : undefined, p, alpha, this.time);
    }
    for (const [id, v] of this.projViews) {
      if (!live.has(id)) { v.dispose(); this.projViews.delete(id); }
    }
    // preview
    if (this.pred && choosing) {
      this.holo.update(this.time, s.fighters);
      this.bui.setPlayhead(this.holo.playhead);
      this.bui.showPreviewDamage(this.pred, (x, y, z) => this.project(x, y, z));
    } else {
      this.bui.showPreviewDamage(null, (x, y, z) => this.project(x, y, z));
      // keep the turn order live while time runs
      this.orderClock -= dt;
      if (this.orderClock <= 0) {
        this.orderClock = 0.1;
        this.bui.showOrder(s, null, null);
      }
    }
    this.aimMarker.visible = this.mode === 'aim';
    if (this.mode === 'aim') {
      this.aimMarker.position.set(this.aim.x, this.aim.y + (this.aimSkill === 'move' ? 0.05 : 0), 1);
      this.aimMarker.rotation.z = this.time * 2;
    }
    this.lighting.update(dt, this.time, new THREE.Vector3(this.camX, 0, 0));
    this.bui.update(s, (x, y, z) => this.project(x, y, z), (f) => {
      const v = this.views.get(f.id)!;
      return { x: v.sprite.position.x, z: v.sprite.position.z };
    });
  }

  private project(x: number, y: number, z: number): { x: number; y: number } {
    const v = new THREE.Vector3(x, y, z).project(this.camera);
    return { x: (v.x * 0.5 + 0.5) * innerWidth, y: (-v.y * 0.5 + 0.5) * innerHeight };
  }

  private onMouse(e: MouseEvent): void {
    if (this.mode !== 'aim') return;
    const ndc = new THREE.Vector2((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit)) {
      this.aim.set(hit.x, hit.y);
      this.clampAim();
      this.mouseDirty = true;
    }
  }
}
