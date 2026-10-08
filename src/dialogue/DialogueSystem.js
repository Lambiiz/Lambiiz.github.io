// Runs scripted conversations: stages the actors, cuts between camera shots,
// types out lines with voice blips and fires story cues.
import * as THREE from 'three';
import { ENCOUNTER, SPEAKERS } from '../data/dialogue.js';
import { SPOTS } from '../data/spots.js';
import { easeOutCubic } from '../core/math.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export class DialogueSystem {
  constructor(game) {
    this.game = game;
    this.box = game.dialogueBox;
    this.active = false;
    this.waiting = null;
    this.charAcc = 0;
    this.cps = 46; // characters per second
    this.box.onClick = () => this._advance();
  }

  /** Shot library, relative to the student's spot. zs mirrors along the corridor. */
  shot(name) {
    const M = SPOTS.student;
    const zs = this.zs;
    const g = this.game;
    const P = g.player.root.position;
    const at = (dx, y, dz) => V(M.x + dx, y, M.z + dz * zs);
    const shots = {
      onMio: [at(-1.66, 1.6, -1.57), at(0, 1.45, 0), 34],
      onKaito: [at(0.68, 1.6, -0.08), V(P.x, 1.62, P.z), 34],
      two: [at(-1.95, 1.4, 1.85), at(-0.62, 1.25, -0.38), 42],
      closeMio: [at(-0.95, 1.5, -0.18), at(0.1, 1.44, 0.05), 30],
      window: [at(-1.2, 1.5, -1.62), at(1.95, 1.35, 0.05), 40],
      closeEcho: [at(0.42, 1.48, -0.42), at(2.05, 1.42, 0), 30],
      pushEcho: [at(0.55, 1.46, -0.1), at(2.05, 1.44, 0), 24],
    };
    return shots[name];
  }

  _applyShot(name, smooth = false) {
    const s = this.shot(name);
    if (!s) return;
    const rig = this.game.rig;
    if (smooth) rig.move(s[0], s[1], 0.9, { fov: s[2] });
    else rig.cut(s[0], s[1], s[2]);
    // a slow push keeps static framing alive
    const dir = s[1].clone().sub(s[0]).setY(0).normalize().multiplyScalar(0.05);
    rig.setDrift(name === 'pushEcho' ? dir.multiplyScalar(2.5) : dir);
  }

  async runEncounter() {
    const g = this.game;
    const P = g.player;
    const M = g.student;
    this.active = true;
    this.revealed = false;
    this.zs = P.root.position.z <= SPOTS.student.z + 0.3 ? 1 : -1;
    document.body.classList.add('letterbox');
    requestAnimationFrame(() => document.body.classList.add('on'));

    // walk the player to the conversation mark
    const target = SPOTS.student.clone().add(V(-1.28, 0, -0.72 * this.zs));
    const start = P.root.position.clone();
    const dist = start.distanceTo(target);
    g.rig.active = true;
    g.rig.cut(g.camera.position.clone(), M.root.position.clone().setY(1.3), g.camera.fov);
    this._applyShot('onMio', true);
    M.lookAt(P.bone('head'), 1);
    g.tasks.until((dt) => {
      M.faceTowards(P.root.position, dt, 5);
      return !this.active || this.revealed;
    });
    if (dist > 0.05) {
      P.play('walk', { fade: 0.2 });
      const t0 = Math.max(0.35, dist / 1.4);
      await g.tasks.tween(t0, (t) => {
        P.root.position.lerpVectors(start, target, t);
        P.faceTowards(target.clone().lerp(M.root.position, t), 1 / 60, 8);
      });
    }
    P.play('idle', { fade: 0.3 });
    M.lookAt(P.bone('head'), 1);
    P.lookAt(M.bone('head'), 0.8);
    g.tasks.until((dt) => {
      P.faceTowards(M.root.position, dt, 6);
      return !this.active || this.revealed;
    });

    this.box.show(true);
    g.audio.setMusicFilter(2400);
    for (const line of ENCOUNTER) await this.say(line);
    this.box.show(false);
    this.active = false;
    document.body.classList.remove('on');
    setTimeout(() => document.body.classList.remove('letterbox'), 650);
  }

  /** Play an arbitrary list of lines (used for the epilogue). */
  async runLines(lines, shotFn) {
    this.active = true;
    this.box.show(true);
    for (const line of lines) await this.say(line, shotFn);
    this.box.show(false);
    this.active = false;
  }

  async say(line, shotFn) {
    const g = this.game;
    const spk = SPEAKERS[line.who];
    if (line.shot) {
      if (shotFn) {
        const s = shotFn(line.shot);
        if (s) {
          g.rig.cut(s[0], s[1], s[2]);
          g.rig.setDrift(s[1].clone().sub(s[0]).setY(0).normalize().multiplyScalar(0.04));
        }
      } else this._applyShot(line.shot);
    }
    if (line.music) g.audio.setMusic(line.music, { fade: 1.5 });
    const actor = line.who === 'mio' ? g.student : line.who === 'kaito' ? g.player : line.who === 'echo' ? g.echo : null;
    if (line.expr && actor) {
      actor.clearExpressions();
      for (const [k, v] of Object.entries(line.expr)) actor.setExpression(k, v);
    }
    if (line.cue) this.cue(line.cue);
    if (actor && actor !== g.echo) actor.play('talk', { fade: 0.35 });

    const label = line.who === 'echo' ? '???' : spk.label;
    this.box.setLine(line.who, label, spk.sub, line.text);
    this.voice = spk.voice;
    this.charAcc = 0;
    await new Promise((resolve) => (this.waiting = resolve));
    if (actor && actor !== g.echo && this.game.state === 'dialogue') actor.play('idle', { fade: 0.4 });
  }

  _advance() {
    if (!this.waiting) return;
    if (this.box.typing) {
      this.box.finish();
      return;
    }
    this.game.audio.play('uiMove');
    const w = this.waiting;
    this.waiting = null;
    w();
  }

  cue(name) {
    const g = this.game;
    const M = g.student;
    const E = g.echo;
    switch (name) {
      case 'turnToPlayer':
        M.setExpression('relaxed', 0);
        break;
      case 'glanceWindow':
        M.lookAt(V(4.5, 1.5, M.root.position.z), 1);
        break;
      case 'reveal': {
        // Mio turns back to the glass; her reflection is already there.
        this.revealed = true; // stop the face-each-other behaviour
        g.tasks.until((dt) => {
          M.faceTowards(V(4, 0, M.root.position.z + 0.2), dt, 3);
          g.player.faceTowards(M.root.position, dt, 4);
          return g.state !== 'dialogue';
        });
        M.lookAt(V(4, 1.45, M.root.position.z), 1);
        E.root.visible = true;
        E.root.position.copy(SPOTS.echoReflection);
        E.root.position.z = M.root.position.z;
        E.setHeading(-Math.PI / 2);
        E.play('idle', { fade: 0 });
        E.clearExpressions();
        E.setExpression('relaxed', 0.6);
        E.lookAt(g.player.bone('head'), 0.6);
        g.audio.play('heartbeat');
        g.audio.setMusicFilter(900, 1.5);
        g.post.u.chroma.value = 0.15;
        g.tasks.tween(1.6, (t) => g.world.setMood(t * 0.26), easeOutCubic);
        g.tasks.tween(1.5, (t) => (g.post.u.saturation.value = 1.1 - t * 0.35), easeOutCubic);
        break;
      }
      case 'echoGrin':
        E.clearExpressions();
        E.setExpression('happy', 0.55);
        E.setExpression('angry', 0.35);
        E.lookAt(g.camera, 1);
        g.audio.play('heartbeat');
        g.post.u.chroma.value = 0.3;
        g.rig.shake(0.02);
        break;
      case 'echoTalk':
        E.play('talk', { fade: 0.4 });
        E.setExpression('happy', 0.6);
        E.setExpression('angry', 0.5);
        g.audio.play('heartbeat');
        g.post.u.chroma.value = 0.45;
        g.rig.shake(0.03);
        break;
      case 'mioScared':
        M.lookAt(g.player.bone('head'), 1);
        M.play('talk', { fade: 0.3 });
        g.post.u.chroma.value = 0.25;
        break;
    }
  }

  update(dt) {
    if (!this.waiting) return;
    const g = this.game;
    if (g.input.pressed('confirm')) this._advance();
    if (this.box.typing) {
      this.charAcc += dt * this.cps;
      const n = Math.floor(this.charAcc);
      if (n > 0) {
        this.charAcc -= n;
        const chars = this.box.reveal(n);
        if (this.voice && chars.some((c) => /[a-z0-9]/i.test(c)) && Math.random() < 0.6) g.audio.play('blip', { pitch: this.voice });
      }
    }
  }
}
