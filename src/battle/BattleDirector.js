// Stages the turn-based battle: arena setup, camera choreography, animation,
// VFX, hit-stop and UI updates for every event the BattleSystem produces.
import * as THREE from 'three';
import { BattleSystem } from './BattleSystem.js';
import { BattleUI } from '../ui/BattleUI.js';
import { SPOTS } from '../data/spots.js';
import { VICTORY_LINES } from '../data/dialogue.js';
import { easeOutCubic, easeInOutCubic, easeOutBack } from '../core/math.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

// Procedural poses (VRM1 convention, radians) layered over animations.
const POSES = {
  guard: {
    leftUpperArm: [0.0, -0.95, -0.55],
    leftLowerArm: [0.0, -2.0, 0.0],
    rightUpperArm: [0.0, 0.95, 0.55],
    rightLowerArm: [0.0, 2.0, 0.0],
    spine: [0.12, 0, 0],
    head: [0.12, 0, 0],
  },
  victory: {
    rightUpperArm: [0.0, 1.25, 0.32],
    rightLowerArm: [0.0, 0.25, 0.0],
    rightHand: [0, 0, 0.25],
    leftUpperArm: [0.0, -0.2, -1.22],
    leftLowerArm: [0.0, -0.35, 0.0],
    head: [-0.08, -0.15, 0],
  },
};

export class BattleDirector {
  constructor(game) {
    this.game = game;
    this.ui = new BattleUI(game.uiRoot, game.audio);
    this.active = false;
    this.arena = SPOTS.arena.clone();
    this.P = this.arena.clone().add(V(0, 0, -3.3));
    this.E = this.arena.clone().add(V(0, 0, 3.2));
    this.M = V(2.05, 0, this.arena.z + 4.4);

    // battle lights are created up-front (intensity 0) so shaders never recompile mid-fight
    this.lightE = new THREE.PointLight(0xff2d6a, 0, 9, 1.6);
    this.lightP = new THREE.PointLight(0x2cf2d4, 0, 7, 1.6);
    game.scene.add(this.lightE, this.lightP);
    this._buildCrystal();
    this._buildHalo();
  }

  _buildCrystal() {
    const g = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0.62, 0.7, 2.15, 6, 1, true);
    this.crystalMat = new THREE.MeshStandardMaterial({
      color: 0x8ff7ff, emissive: 0x1ad8ff, emissiveIntensity: 0.35, transparent: true, opacity: 0.2,
      roughness: 0.05, metalness: 0.4, side: THREE.DoubleSide, depthWrite: false,
    });
    const shell = new THREE.Mesh(geo, this.crystalMat);
    shell.position.y = 1.08;
    shell.renderOrder = 5;
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x9ffcff, transparent: true, opacity: 0.9 }));
    edges.position.y = 1.08;
    g.add(shell, edges);
    g.visible = false;
    this.crystal = g;
    this.crystalEdges = edges;
    this.game.scene.add(g);
  }

  _buildHalo() {
    // ring of slowly orbiting shards behind the Echo's head
    const g = new THREE.Group();
    const geo = new THREE.TetrahedronGeometry(0.09, 0);
    geo.scale(0.5, 2.4, 0.3);
    this.haloMat = new THREE.MeshBasicMaterial({ color: 0xff5c8a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < 9; i++) {
      const m = new THREE.Mesh(geo, this.haloMat);
      const a = (i / 9) * Math.PI * 2;
      m.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0);
      m.rotation.z = a - Math.PI / 2;
      g.add(m);
    }
    g.visible = false;
    this.halo = g;
    this.game.scene.add(g);
  }

  reset() {
    this.ui.hideResult();
    this.ui.show(false);
    this.stopCharge?.();
    this.stopCharge = null;
    this.shieldFx?.dispose();
    this.shieldFx = null;
  }

  teardown() {
    this.reset();
    this.active = false;
    this.crystal.visible = false;
    this.halo.visible = false;
    this.lightE.intensity = 0;
    this.lightP.intensity = 0;
    this.stopAura?.();
    this.stopAura = null;
    this.game.echo.root.scale.setScalar(1);
    this.game.echo.root.visible = false;
    this.game.player.setOverlay(null, 0);
  }

  // ------------------------------------------------------------------ arena
  /** Places everyone in the otherworld arena (called behind the shatter overlay). */
  setupArena() {
    const g = this.game;
    g.world.setMood(1);
    g.world.setFocus(this.arena);
    g.world.setArena(this.arena);

    const p = g.player;
    p.root.position.copy(this.P);
    p.setHeading(0);
    p.lookAt(null);
    p.clearExpressions();
    p.setExpression('angry', 0.25);
    p.play('battleIdle', { fade: 0, force: true });

    const e = g.echo;
    e.root.visible = true;
    e.root.position.copy(this.E).add(V(0, 0.32, 0));
    e.root.scale.setScalar(1.22);
    e.setHeading(Math.PI);
    e.clearExpressions();
    e.setExpression('happy', 0.45);
    e.setExpression('angry', 0.4);
    e.lookAt(p.bone('head'), 0.8);
    e.play('castIdle', { fade: 0, force: true });
    this.halo.visible = true;
    this.haloMat.color.set(0xff5c8a);
    this._echoRim(new THREE.Color(1.0, 0.24, 0.42));

    const m = g.student;
    m.root.position.copy(this.M).add(V(0, 0.12, 0));
    m.setHeading(-2.6);
    m.lookAt(null);
    m.clearExpressions();
    m.setExpression('relaxed', 1);
    m.play('castIdle', { fade: 0, force: true });
    this.crystal.visible = true;
    this.crystal.position.copy(this.M);
    this.crystal.scale.setScalar(1);
    this.crystalMat.opacity = 0.2;

    this.lightE.position.copy(this.E).add(V(0.4, 2.4, 1.4));
    this.lightE.intensity = 4;
    this.lightP.position.copy(this.P).add(V(0.6, 2.0, -1.0));
    this.lightP.intensity = 3;

    // drifting dark motes around the Echo
    this.stopAura?.();
    let acc = 0;
    const fx = g.fx;
    const aura = fx.addEmitter((dt) => {
      acc += dt;
      while (acc > 0.03) {
        acc -= 0.03;
        const a = Math.random() * Math.PI * 2;
        const pos = g.echo.root.position.clone().add(V(Math.cos(a) * 0.5, Math.random() * 1.8, Math.sin(a) * 0.5));
        fx.particles.emit(pos, V(0, 0.5 + Math.random() * 0.5, 0), { life: 1.2, size: 0.12, color: new THREE.Color().setHSL(0.93 + Math.random() * 0.06, 0.9, 0.45), drag: 0.6 });
      }
      return true;
    });
    this.stopAura = () => fx.removeEmitter(aura);
    this.active = true;
  }

  _echoRim(color) {
    this.game.echo.vrm.scene.traverse((o) => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        if (m.isMToonMaterial && !/Eye/.test(m.name)) m.parametricRimColorFactor.copy(color);
      });
    });
  }

  // ------------------------------------------------------------------ cameras
  cam(name, dur = 0) {
    const P = this.game.player.root.position;
    const E = this.game.echo.root.position;
    const shots = {
      default: [P.clone().add(V(1.3, 1.55, -2.35)), E.clone().add(V(-0.7, 0.95, 0)), 45],
      menu: [P.clone().add(V(0.9, 1.5, -2.3)), E.clone().add(V(1.6, 0.9, 0)), 42],
      castClose: [P.clone().add(V(-1.0, 1.05, 1.55)), P.clone().add(V(0.1, 1.35, 0)), 38],
      enemyClose: [E.clone().add(V(1.3, 1.4, -2.6)), E.clone().add(V(0, 1.25, 0)), 36],
      enemyAction: [E.clone().add(V(-1.25, 2.0, 2.4)), P.clone().add(V(0.3, 1.0, 0)), 44],
      side: [V(2.45, 1.45, (P.z + E.z) / 2 - 0.4), V(-0.4, 1.15, (P.z + E.z) / 2), 52],
      wide: [V(2.3, 2.4, P.z - 3.4), V(-0.3, 1.2, E.z), 50],
      heroLow: [P.clone().add(V(0.55, 0.6, 1.9)), P.clone().add(V(0, 1.5, 0)), 40],
    };
    const s = shots[name];
    const rig = this.game.rig;
    if (dur > 0) return rig.move(s[0], s[1], dur, { fov: s[2] });
    rig.cut(s[0], s[1], s[2]);
    return Promise.resolve();
  }

  // ------------------------------------------------------------------ intro
  /** The dramatic camera swoop and battle stance (runs during the shatter). */
  async intro() {
    const g = this.game;
    const rig = g.rig;
    rig.active = true;
    rig.cut(this.E.clone().add(V(1.6, 3.2, 4.2)), this.arena.clone().add(V(0, 1.2, 0)), 55);
    g.audio.setMusic('battle', { fade: 0.4 });
    const swoop = rig.move(this.E.clone().add(V(0.9, 1.5, -2.2)), this.E.clone().add(V(0, 1.55, 0)), 1.6, { fov: 34, ease: easeOutCubic });
    await swoop;
    g.echo.play('cast', { fade: 0.2 });
    g.audio.play('glass');
    g.fx.burst(g.echo.root.position.clone().add(V(0, 1.3, 0)), { count: 90, color: 0xff3d6e, speed: 4, life: 0.9, size: 0.18 });
    await g.tasks.sleep(0.9);
    g.echo.play('castIdle', { fade: 0.4 });
    // hero answers
    await this.cam('heroLow');
    g.rig.setDrift(V(0, 0.05, 0.1));
    g.player.play('battleIntro', { fade: 0.15 });
    g.audio.play('lumen');
    g.post.u.speedLines.value = 0.9;
    g.tasks.tween(0.8, (t) => (g.post.u.speedLines.value = 0.9 * (1 - t)));
    g.fx.ring(g.player.root.position, { color: 0x2cf2d4, radius: 2.6, dur: 0.8 });
    g.fx.burst(g.player.root.position.clone().add(V(0, 1.0, 0)), { count: 80, color: 0x2cf2d4, speed: 3.5, life: 0.8, size: 0.14, up: 0.6 });
    await g.tasks.sleep(1.1);
    g.player.play('battleIdle', { fade: 0.4 });
    await this.cam('default', 0.9);
  }

  // ------------------------------------------------------------------ loop
  async run({ retry = false } = {}) {
    const g = this.game;
    if (retry) {
      g.fx.reset();
      this.setupArena();
      g.world.setMood(1);
      g.post.u.duotone.value = 0;
      g.post.u.saturation.value = 1.1;
      g.audio.setMusic('battle', { fade: 0.6 });
      g.audio.setMusicFilter(18000);
      await this.cam('default');
    }
    const sys = (this.sys = new BattleSystem({ seed: window.__battleSeed }));
    this.view = { php: sys.player.hp, psp: sys.player.sp, ehp: sys.enemy.hp };
    this.stats = { dealt: 0, weakHits: 0, maxHit: 0, items: 0 };
    this._pushUI(true);
    this.ui.setAffinities(sys.known[0]);
    this.ui.setEnemyStatus('');
    this.ui.setPlayerStatus('');
    this.ui.setTurn(sys.turn, sys.upcoming());
    if (!this.portraitUrl) this.portraitUrl = this.makePortrait(g.player);
    this.ui.setPortrait(this.portraitUrl);
    this.ui.show(true);
    g.rig.sway = 0.025;

    while (!sys.over) {
      // ---------------- player phase
      this.ui.setTurn(sys.turn, sys.upcoming());
      this.ui.turnBanner('player', `TURN ${sys.turn}`);
      g.audio.play('turn');
      await this.cam('menu', 0.6);
      g.rig.setDrift(V(-0.03, 0, 0.02));
      this.choosing = true;
      const action = await this.ui.chooseCommand(sys);
      this.choosing = false;
      g.rig.setDrift(null);
      const events = sys.playerAction(action);
      if (events[0]?.type === 'invalid') continue;
      await this.stagePlayer(action, events);
      if (sys.over) break;
      const phase = events.find((e) => e.type === 'phase');
      if (phase) await this.stagePhase();

      // ---------------- enemy phase
      await g.tasks.sleep(0.25);
      const stunned = sys.enemy.stunned;
      this.ui.setTurn(sys.turn, sys.upcoming().slice(1));
      this.ui.turnBanner('enemy', stunned ? 'CRACKED — CANNOT ACT' : '');
      g.audio.play('enemyTurn');
      await g.tasks.sleep(0.75);
      const ev2 = sys.enemyTurn();
      await this.stageEnemy(ev2);
      this.shieldFx?.dispose();
      this.shieldFx = null;
      g.player.setOverlay(null, 0, 6);
      this.ui.setPlayerStatus('');
    }
    this.ui.hideCallout();
    return sys.over;
  }

  _pushUI(instant = false) {
    const s = this.sys;
    this.ui.setPlayer({ hp: this.view.php, sp: this.view.psp, maxHp: s.player.maxHp, maxSp: s.player.maxSp }, instant);
    this.ui.setEnemy({ hp: this.view.ehp, maxHp: s.enemy.maxHp }, instant);
  }

  update(dt) {
    const g = this.game;
    this.ui.updateResult(g.input);
    if (!this.active) return;
    if (this.choosing) this.ui.update(g.input);
    const e = g.echo;
    // floating bob + halo
    if (e.root.visible && !this.echoMoving) {
      e.root.position.y = this.E.y + 0.32 + Math.sin(g.tasks.time * 1.6) * 0.06;
    }
    if (this.halo.visible) {
      const head = e.bone('head').getWorldPosition(new THREE.Vector3());
      const fwd = V(Math.sin(e.heading), 0, Math.cos(e.heading));
      this.halo.position.copy(head).addScaledVector(fwd, -0.25).add(V(0, 0.1, 0));
      this.halo.lookAt(this.halo.position.clone().add(fwd));
      this.halo.rotateZ(g.tasks.time * 0.4);
      this.halo.scale.setScalar(e.root.scale.x);
    }
    if (this.crystal.visible) {
      this.crystal.rotation.y += dt * 0.15;
      this.crystalEdges.material.opacity = 0.6 + Math.sin(g.tasks.time * 2) * 0.3;
    }
  }

  // ------------------------------------------------------------------ helpers
  chest(char) {
    return char.bone('chest').getWorldPosition(new THREE.Vector3());
  }

  async hitStop(sec = 0.07) {
    const g = this.game;
    g.timeScale = 0.04;
    await new Promise((r) => setTimeout(r, sec * 1000));
    g.timeScale = 1;
  }

  flash(color = 0xffffff, amount = 0.6, dur = 0.25) {
    const u = this.game.post.u;
    u.flashColor.value.set(color);
    this.game.tasks.tween(dur, (t) => (u.flash.value = amount * (1 - t)));
  }

  /** Apply one damage event with numbers, reactions and feedback. */
  async applyDamage(ev) {
    const g = this.game;
    const toEnemy = ev.target === 'enemy';
    const char = toEnemy ? g.echo : g.player;
    const at = this.chest(char).add(V(0, 0.45, 0));
    if (toEnemy) {
      this.view.ehp = Math.max(0, this.view.ehp - ev.amount);
      this.stats.dealt += ev.amount;
      this.stats.maxHit = Math.max(this.stats.maxHit, ev.amount);
      if (ev.affinity === 'weak') this.stats.weakHits++;
    } else this.view.php = Math.max(0, this.view.php - ev.amount);
    this._pushUI();
    this.ui.shakeCard(toEnemy ? 'enemy' : 'player');

    const heavy = ev.affinity === 'weak' || ev.crit || ev.heavy;
    g.fx.popText(at, String(ev.amount), toEnemy ? (heavy ? 'big' : 'dmg') : 'hurt', { offset: (ev.hit || 0) * 40 });
    if (toEnemy && ev.hit === 0) {
      if (ev.affinity === 'weak') {
        g.fx.popText(at.clone().add(V(0, 0.45, 0)), 'WEAK!', 'weak', { delay: 0.05 });
        g.audio.play('weak');
      } else if (ev.affinity === 'resist') {
        g.fx.popText(at.clone().add(V(0, 0.45, 0)), 'RESIST', 'resist', { delay: 0.05 });
        g.audio.play('resist');
      }
      if (ev.discovered) {
        this.ui.setAffinities(this.sys.known[this.sys.enemy.phase]);
        this.ui.revealAffinity(ev.element);
      }
    }
    if (ev.crit) {
      g.fx.popText(at.clone().add(V(0.3, 0.6, 0)), 'CRITICAL', 'crit', { delay: 0.05 });
      g.audio.play('crit');
    }
    if (!toEnemy && ev.guarded) {
      g.fx.popText(at.clone().add(V(0, 0.45, 0)), 'GUARDED', 'resist');
      g.audio.play('block');
      this.shieldFx?.pulse();
    }
    g.audio.play('hit', { heavy });
    g.rig.shake(heavy ? 0.12 : ev.guarded ? 0.03 : 0.06);
    this.flash(toEnemy ? 0xffffff : 0xff2d55, heavy ? 0.45 : 0.22, 0.2);
    g.fx.burst(at.clone().add(V(0, -0.3, 0)), { count: heavy ? 50 : 25, color: toEnemy ? 0xffffff : 0xff4060, speed: 4, life: 0.4, size: 0.1 });
    if (char === g.player && ev.guarded) {
      // stays in guard pose
    } else {
      char.play(Math.random() < 0.5 ? 'hit' : 'hitHead', { fade: 0.06, force: true }).then(() => {
        if (this.active && !this.sys?.over) char.play(char === g.echo ? 'castIdle' : 'battleIdle', { fade: 0.3 });
      });
    }
    await this.hitStop(heavy ? 0.12 : 0.06);
  }

  // ------------------------------------------------------------------ player staging
  async stagePlayer(action, events) {
    const g = this.game;
    const P = g.player;
    const use = events.find((e) => e.type === 'use');
    const dmg = events.filter((e) => e.type === 'damage');
    if (use) {
      this.view.psp = Math.max(0, this.view.psp - use.cost);
      this._pushUI();
      this.ui.callSkill(use.name, use.element, 'player');
    }

    if (action.kind === 'attack') {
      await this.cam('side', 0.35);
      const start = P.root.position.clone();
      const target = g.echo.root.position.clone().setY(0).add(V(0, 0, -1.05));
      g.audio.play('whoosh');
      P.play('jog', { fade: 0.1 });
      await g.tasks.tween(0.28, (t) => {
        P.root.position.lerpVectors(start, target, t);
      }, easeInOutCubic);
      g.fx.streak(start, target);
      P.play('jab', { fade: 0.08, force: true });
      await g.tasks.sleep(0.2);
      g.audio.play('swing');
      g.fx.slash(this.chest(g.echo), { color: 0xffffff, yaw: Math.PI, tilt: 0.2, roll: 0.6, radius: 0.55, width: 0.22 });
      await this.applyDamage(dmg[0]);
      P.play('cross', { fade: 0.08, force: true });
      await g.tasks.sleep(0.24);
      g.audio.play('swing');
      g.fx.slash(this.chest(g.echo), { color: 0x2cf2d4, yaw: Math.PI, tilt: -0.2, roll: -0.5, radius: 0.65, width: 0.3 });
      await this.applyDamage(dmg[1]);
      await this._afterHit(events);
      await g.tasks.sleep(0.25);
      P.play('jog', { fade: 0.1, timeScale: -1 });
      await g.tasks.tween(0.3, (t) => P.root.position.lerpVectors(target, start, t), easeInOutCubic);
      P.play('battleIdle', { fade: 0.2 });
    } else if (action.kind === 'skill' && action.id === 'lumenEdge') {
      await this.cam('castClose');
      g.rig.setDrift(V(0.15, 0.02, 0));
      P.play('cast', { fade: 0.12, force: true });
      g.audio.play('lumen');
      g.post.u.speedLines.value = 0.6;
      g.tasks.tween(0.6, (t) => (g.post.u.speedLines.value = 0.6 * (1 - t)));
      const blade = g.fx.lightBlade(P.root.position, this.chest(g.echo));
      await g.tasks.sleep(0.5);
      await this.cam('enemyClose');
      await blade;
      g.audio.play('lumenHit');
      const hit = this.chest(g.echo);
      g.fx.flare(hit, { color: 0x2cf2d4, size: 3.4 });
      g.fx.shock(hit, { color: 0x9ffff0, radius: 2 });
      g.fx.burst(hit, { count: 110, color: 0x2cf2d4, speed: 5.5, life: 0.8, size: 0.14 });
      await this.applyDamage(dmg[0]);
      await this._afterHit(events);
      P.play('battleIdle', { fade: 0.3 });
      await g.tasks.sleep(0.45);
    } else if (action.kind === 'skill' && action.id === 'cinderVerse') {
      await this.cam('castClose');
      g.rig.setDrift(V(0.12, 0.03, -0.05));
      P.play('cast', { fade: 0.12, force: true });
      g.audio.play('fire');
      const front = P.root.position.clone().add(V(0, 1.3, 0.7));
      const glyph = await g.fx.glyphCircle(front, V(0, 0, 1), { size: 1.5 });
      await this.cam('side');
      const hit = this.chest(g.echo);
      await g.fx.fireStream(front, hit, 0.4);
      glyph.dispose();
      g.audio.play('fireHit');
      g.fx.fireball(hit);
      this.flash(0xff8a3d, 0.35, 0.3);
      await this.applyDamage(dmg[0]);
      await this._afterHit(events);
      P.play('battleIdle', { fade: 0.3 });
      await g.tasks.sleep(0.45);
    } else if (action.kind === 'guard') {
      this.ui.callSkill('Guard', 'phys', 'player');
      await this.cam('menu', 0.3);
      P.setOverlay(POSES.guard, 1, 10);
      g.audio.play('guard');
      this.shieldFx = g.fx.shield(P.root.position.clone().add(V(0, 1.2, 0.55)), 0);
      g.fx.ring(P.root.position, { color: 0x2cf2d4, radius: 1.4, dur: 0.5 });
      const sp = events.find((e) => e.type === 'guard').sp;
      if (sp) {
        this.view.psp += sp;
        this._pushUI();
        g.fx.popText(this.chest(P).add(V(0, 0.6, 0)), `+${sp} SP`, 'sp');
      }
      this.ui.setPlayerStatus('GUARDING');
      await g.tasks.sleep(0.8);
    } else if (action.kind === 'item') {
      const it = events.find((e) => e.type === 'item');
      this.ui.callSkill(it.name, null, 'player');
      this.stats.items++;
      await this.cam('heroLow', 0.3);
      P.play('interact', { fade: 0.15, force: true });
      g.audio.play('can');
      await g.tasks.sleep(0.55);
      const heal = events.find((e) => e.type === 'heal');
      const spg = events.find((e) => e.type === 'spgain');
      if (heal) {
        this.view.php += heal.amount;
        g.fx.rise(P.root.position, 0x9cff6e);
        g.fx.popText(this.chest(P).add(V(0, 0.6, 0)), `+${heal.amount}`, 'heal');
      }
      if (spg) {
        this.view.psp += spg.amount;
        g.fx.rise(P.root.position, 0x3fd2ff);
        g.fx.popText(this.chest(P).add(V(0, 0.6, 0)), `+${spg.amount} SP`, 'sp');
      }
      g.audio.play('heal');
      this._pushUI();
      await g.tasks.sleep(0.9);
      P.play('battleIdle', { fade: 0.3 });
    }
    this.ui.hideCallout();
  }

  async _afterHit(events) {
    const g = this.game;
    if (events.some((e) => e.type === 'stun')) {
      await g.tasks.sleep(0.15);
      g.audio.play('stun');
      g.fx.popText(this.chest(g.echo).add(V(0, 1.0, 0)), 'CRACKED!', 'stun');
      g.fx.burst(this.chest(g.echo).add(V(0, 0.4, 0)), { count: 70, color: 0xbff7ff, speed: 3, life: 1, size: 0.1, gravity: 4 });
      this.ui.setEnemyStatus('CRACKED · SKIPS NEXT TURN', 'stun');
      this.stopCharge?.();
      this.stopCharge = null;
      g.post.u.chroma.value = 0.5;
      g.tasks.tween(0.6, (t) => (g.post.u.chroma.value = 0.5 * (1 - t) + 0.1 * t));
      await g.tasks.sleep(0.5);
    }
    if (events.some((e) => e.type === 'end' && e.result === 'victory')) {
      await g.tasks.sleep(0.2);
    }
  }

  // ------------------------------------------------------------------ phase 2
  async stagePhase() {
    const g = this.game;
    const E = g.echo;
    this.ui.setEnemyStatus('');
    await g.tasks.sleep(0.4);
    await this.cam('enemyClose', 0.4);
    g.rig.setDrift(V(0, 0, 0.18));
    this.ui.callSkill('Mirror Glaze', null, 'enemy');
    E.play('castExit', { fade: 0.2, force: true });
    g.audio.play('glass');
    g.audio.play('charge');
    this.flash(0xdffcff, 0.7, 0.6);
    this._echoRim(new THREE.Color(0.75, 0.95, 1.0));
    this.haloMat.color.set(0x9ffcff);
    g.fx.burst(this.chest(E), { count: 120, color: 0xdffcff, speed: 4, life: 1.1, size: 0.12 });
    g.fx.shock(this.chest(E), { color: 0xdffcff, radius: 2.4, dur: 0.6 });
    await g.tasks.sleep(1.0);
    E.play('castIdle', { fade: 0.3 });
    this.ui.setAffinities(this.sys.known[1]);
    this.ui.narrate("The Echo's surface hardens into polished glass. Its affinities have changed!", 2600);
    this.ui.hideCallout();
    await g.tasks.sleep(1.4);
    // Mio's hint from inside the crystal
    await this.cam('wide', 0.6);
    this.ui.narrate('MIO (from the crystal): "Sena… glass cracks when it gets too hot…!"', 3000);
    await g.tasks.sleep(1.8);
  }

  // ------------------------------------------------------------------ enemy staging
  async stageEnemy(events) {
    const g = this.game;
    const E = g.echo;
    const P = g.player;
    const use = events.find((e) => e.type === 'use');
    const dmg = events.find((e) => e.type === 'damage');

    if (events[0]?.type === 'recover') {
      await this.cam('enemyClose', 0.4);
      this.ui.narrate('The Echo pulls its cracked surface back together…', 1600);
      E.play('castExit', { fade: 0.2, force: true });
      await g.tasks.sleep(1.3);
      E.play('castIdle', { fade: 0.3 });
      this.ui.setEnemyStatus('');
      return;
    }
    if (!use) return;
    this.ui.callSkill(use.name, use.element, 'enemy');

    if (use.skill === 'redInk') {
      await this.cam('enemyAction', 0.4);
      const start = E.root.position.clone();
      const target = P.root.position.clone().add(V(0, 0.32, 1.25));
      this.echoMoving = true;
      g.audio.play('whoosh');
      await g.tasks.tween(0.32, (t) => E.root.position.lerpVectors(start, target, t), easeInOutCubic);
      E.play('slash', { fade: 0.08, force: true });
      await g.tasks.sleep(0.36);
      g.audio.play('inkSlash');
      g.fx.slash(this.chest(P).add(V(0, 0.1, 0.2)), { color: 0xff2d55, yaw: 0, tilt: 0.3, roll: 2.4, radius: 0.85, width: 0.42, arc: 2.8 });
      await this.applyDamage(dmg);
      await g.tasks.sleep(0.45);
      E.play('castIdle', { fade: 0.25 });
      await g.tasks.tween(0.35, (t) => E.root.position.lerpVectors(target, start, t), easeInOutCubic);
      this.echoMoving = false;
    } else if (use.skill === 'glassChoir') {
      await this.cam('enemyAction', 0.4);
      E.play('cast', { fade: 0.12, force: true });
      g.audio.play('glass');
      await g.fx.shardVolley(this.chest(E).add(V(0, 0.3, -0.3)), this.chest(P), { count: 14 });
      await this.applyDamage(dmg);
      await g.tasks.sleep(0.5);
      E.play('castIdle', { fade: 0.3 });
    } else if (use.skill === 'gather') {
      await this.cam('enemyClose', 0.4);
      E.play('castIdle', { fade: 0.2 });
      g.audio.play('charge');
      this.stopCharge?.();
      this.stopCharge = g.fx.chargeAura(E.root.position.clone().setY(0));
      this.lightE.intensity = 9;
      this.ui.setEnemyStatus('HOLDING ITS BREATH · BIG ATTACK NEXT', 'warn');
      this.ui.narrate('The Echo draws the light out of the room… Brace for impact — GUARD!', 2600);
      await g.tasks.sleep(1.8);
    } else if (use.skill === 'perfectScore') {
      this.ui.setEnemyStatus('');
      await this.cam('wide', 0.3);
      E.play('cast', { fade: 0.1, force: true });
      g.audio.play('riser', { dur: 0.8 });
      g.post.u.duoA.value.set(0x05010c);
      g.post.u.duoB.value.set(0xff2d55);
      await g.tasks.tween(0.5, (t) => (g.post.u.duotone.value = t * 0.85));
      this.stopCharge?.();
      this.stopCharge = null;
      this.lightE.intensity = 4;
      await g.fx.shardVolley(this.chest(E).add(V(0, 0.5, -0.4)), this.chest(P), { count: 26, color: 0xff6a8a });
      g.audio.play('boom');
      g.fx.flare(this.chest(P), { color: 0xff2d55, size: 4 });
      g.fx.shock(this.chest(P), { color: 0xff2d55, radius: 2.6 });
      await this.applyDamage(dmg);
      g.tasks.tween(0.6, (t) => (g.post.u.duotone.value = 0.85 * (1 - t)));
      await g.tasks.sleep(0.7);
      E.play('castIdle', { fade: 0.3 });
    }
    this.ui.hideCallout();
    if (this.sys.over === 'defeat') {
      P.play('death', { fade: 0.2, force: true });
      await g.tasks.sleep(1.2);
    }
  }

  // ------------------------------------------------------------------ portrait
  makePortrait(char) {
    const g = this.game;
    const r = g.renderer;
    const size = 256;
    const rt = new THREE.WebGLRenderTarget(size, size, { samples: 4 });
    rt.texture.colorSpace = THREE.SRGBColorSpace;
    const cam = new THREE.PerspectiveCamera(22, 1, 0.05, 20);
    const head = char.bone('head').getWorldPosition(new THREE.Vector3());
    const fwd = V(Math.sin(char.heading), 0, Math.cos(char.heading));
    cam.position.copy(head).addScaledVector(fwd, 0.9).add(V(0.12, 0.02, 0));
    cam.lookAt(head.clone().add(V(0, -0.02, 0)));
    const prevFog = g.scene.fog;
    g.scene.fog = null;
    const hidden = [g.echo.root, this.halo, this.crystal, g.fx.group, g.fx.particles.points].filter((o) => o.visible);
    hidden.forEach((o) => (o.visible = false));
    r.setRenderTarget(rt);
    r.render(g.scene, cam);
    r.setRenderTarget(null);
    hidden.forEach((o) => (o.visible = true));
    g.scene.fog = prevFog;
    const px = new Uint8Array(size * size * 4);
    r.readRenderTargetPixels(rt, 0, 0, size, size, px);
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size * 4; x++) img.data[y * size * 4 + x] = px[(size - 1 - y) * size * 4 + x];
    }
    ctx.putImageData(img, 0, 0);
    rt.dispose();
    return c.toDataURL();
  }

  // ------------------------------------------------------------------ results
  async showResult(result) {
    const g = this.game;
    const sys = this.sys;
    this.ui.show(false);
    if (result === 'victory') {
      await this.victorySequence();
      const choice = await this.ui.showResult(
        'victory',
        [
          ['TURNS', String(sys.turn)],
          ['DAMAGE DEALT', String(this.stats.dealt)],
          ['WEAKNESS HITS', String(this.stats.weakHits)],
          ['BEST HIT', String(this.stats.maxHit)],
        ],
        [{ id: 'restart', label: 'PLAY AGAIN' }]
      );
      this.ui.hideResult();
      g.restart(choice);
    } else {
      g.audio.setMusic(null);
      g.audio.play('defeat');
      g.post.u.duoA.value.set(0x020208);
      g.post.u.duoB.value.set(0x5a6a9a);
      g.tasks.tween(1.2, (t) => (g.post.u.duotone.value = t * 0.9));
      await this.cam('wide', 1.2);
      const choice = await this.ui.showResult(
        'defeat',
        [
          ['TURNS SURVIVED', String(sys.turn)],
          ['DAMAGE DEALT', String(this.stats.dealt)],
          ['HINT', sys.enemy.phase === 0 ? 'TRY LUMEN' : 'TRY CINDER'],
        ],
        [
          { id: 'retry', label: 'RETRY BATTLE' },
          { id: 'restart', label: 'BACK TO THE CORRIDOR' },
        ]
      );
      this.ui.hideResult();
      g.post.u.duotone.value = 0;
      g.restart(choice);
    }
  }

  async victorySequence() {
    const g = this.game;
    const E = g.echo;
    const P = g.player;
    const M = g.student;
    g.audio.setMusic(null, { fade: 0.4 });
    this.stopAura?.();
    this.stopAura = null;
    this.stopCharge?.();
    await this.cam('enemyClose', 0.3);
    g.rig.setDrift(V(0, 0, -0.25));
    E.play('death', { fade: 0.1, force: true });
    E.clearExpressions();
    E.setExpression('sad', 1);
    g.audio.play('shatter');
    this.flash(0xffffff, 0.8, 0.8);
    const chest = this.chest(E);
    g.fx.burst(chest, { count: 220, color: 0xff5c8a, speed: 6, life: 1.4, size: 0.14, gravity: 2 });
    g.fx.burst(chest, { count: 120, color: 0xdffcff, speed: 3, life: 1.6, size: 0.1 });
    g.fx.shock(chest, { color: 0xffffff, radius: 3, dur: 0.7 });
    this.echoMoving = true;
    const s0 = E.root.scale.x;
    await g.tasks.tween(1.4, (t) => {
      E.root.scale.setScalar(s0 * (1 - easeOutCubic(t) * 0.999));
      E.root.position.y = this.E.y + 0.32 + t * 0.6;
      this.halo.scale.setScalar(1 - t);
    });
    E.root.visible = false;
    this.halo.visible = false;
    this.echoMoving = false;
    this.lightE.intensity = 0;

    // crystal shatters, the corridor returns to golden hour
    await this.cam('wide', 0.5);
    g.audio.play('shatter');
    g.fx.burst(this.M.clone().add(V(0, 1.1, 0)), { count: 160, color: 0x9ffcff, speed: 4, life: 1.2, size: 0.12, gravity: 3 });
    this.crystal.visible = false;
    M.setExpression('relaxed', 0);
    M.play('land', { fade: 0.2, force: true });
    g.tasks.tween(0.4, (t) => (M.root.position.y = this.M.y + 0.12 * (1 - t)));
    g.audio.play('victory');
    g.tasks.tween(2.2, (t) => g.world.setMood(1 - t), easeInOutCubic);
    g.tasks.tween(2.2, (t) => (this.lightP.intensity = 3 * (1 - t)));
    await g.tasks.sleep(0.6);
    await this.cam('heroLow', 0.6);
    P.clearExpressions();
    P.setExpression('happy', 0.3);
    P.play('idle', { fade: 0.3 });
    P.setOverlay(POSES.victory, 1, 6);
    g.post.u.speedLines.value = 0.7;
    g.tasks.tween(1.0, (t) => (g.post.u.speedLines.value = 0.7 * (1 - t)));
    g.fx.ring(P.root.position, { color: 0xffb36b, radius: 2.4, dur: 0.9 });
    g.fx.burst(P.root.position.clone().add(V(0, 1, 0)), { count: 70, color: 0xffd38a, speed: 2.5, life: 1.2, size: 0.12, up: 0.8 });
    M.play('idle', { fade: 0.4 });
    await g.tasks.sleep(1.8);
    P.setOverlay(null, 0, 4);
    g.audio.setMusic('explore', { fade: 1.5 });

    // epilogue
    g.tasks.until((dt) => {
      P.faceTowards(M.root.position, dt, 3);
      M.faceTowards(P.root.position, dt, 3);
      return !g.dialogue.active && g.state !== 'result';
    });
    M.lookAt(P.bone('head'), 1);
    P.lookAt(M.bone('head'), 0.8);
    await g.tasks.sleep(0.6);
    const shotFn = (name) => {
      const p = P.root.position;
      const m = M.root.position;
      const mid = p.clone().lerp(m, 0.5);
      const axis = m.clone().sub(p).setY(0).normalize();
      const perp = V(-axis.z, 0, axis.x);
      if (perp.x > 0) perp.negate();
      if (name === 'afterMio') return [p.clone().addScaledVector(axis, -0.8).addScaledVector(perp, 0.5).setY(1.6), m.clone().setY(1.42), 34];
      if (name === 'afterKaito') return [m.clone().addScaledVector(axis, 0.75).addScaledVector(perp, 0.45).setY(1.55), p.clone().setY(1.62), 34];
      return [mid.clone().addScaledVector(perp, 2.6).setY(1.4), mid.clone().setY(1.25), 42];
    };
    await g.dialogue.runLines(VICTORY_LINES, shotFn);
    M.lookAt(null);
    P.lookAt(null);
    await this.cam('wide', 1.2);
    this.active = false;
  }
}

export { POSES };
