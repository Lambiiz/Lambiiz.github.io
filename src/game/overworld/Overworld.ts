import * as THREE from 'three';
import { CameraRig } from '../../engine/core/CameraRig';
import { Lighting } from '../../engine/render/Lighting';
import type { PostFX } from '../../engine/render/PostFX';
import type { Input } from '../../engine/core/Input';
import { Motes } from '../../engine/render/Motes';
import { Sky } from '../../engine/render/Sky';
import { cameraYaw } from '../../engine/render/globals';
import { LOOKS, type CharacterLook } from '../../engine/character/look';
import { speechBubble } from '../../engine/pixel/foliage';
import { spriteTexture } from '../../engine/pixel/texture';
import { buildTown, TOWN_W, type TownBuild } from './Town';
import { Actor } from './Actor';
import type { UI, DialogLine } from '../ui/UI';
import type { GameScene, SceneEvent } from '../SceneTypes';

interface NpcDef {
  id: string;
  name: string;
  look: CharacterLook;
  x: number;
  z: number;
  /** Wander radius (0 = stands still). */
  wander?: number;
  heading?: number;
  lines: DialogLine[] | (() => DialogLine[]);
  /** Called with the last choice when the conversation ends. */
  after?: (choice: number) => SceneEvent | void;
}

interface Npc {
  def: NpcDef;
  actor: Actor;
  home: THREE.Vector2;
  goal: THREE.Vector2 | null;
  wait: number;
  bubble: THREE.Sprite;
}

const HELP = `<kbd>WASD</kbd> move · <kbd>Shift</kbd> run · <kbd>Space</kbd> talk<br><kbd>Q</kbd><kbd>E</kbd> rotate · <kbd>Z</kbd><kbd>X</kbd> zoom · <kbd>T</kbd> time of day · <kbd>B</kbd> battle`;

export class Overworld implements GameScene {
  readonly scene = new THREE.Scene();
  readonly rig = new CameraRig({ fov: 27, pitch: 27, distance: 27, minDistance: 16, maxDistance: 36, lookAhead: 3.2, lookHeight: 1.4 });
  readonly lighting: Lighting;
  readonly town: TownBuild;
  readonly player: Actor;
  private npcs: Npc[] = [];
  private motes: Motes;
  private fireflies: Motes;
  private pending: SceneEvent | null = null;
  private interactTarget: { pos: THREE.Vector3; label: string; act: () => void } | null = null;
  private inWilds = false;
  locked = false;

  get camera(): THREE.PerspectiveCamera {
    return this.rig.camera;
  }

  constructor(private ui: UI) {
    this.lighting = new Lighting(this.scene, 'golden');
    this.lighting.shadowSize = 24;
    this.lighting.sky = new Sky(new THREE.Vector3(TOWN_W / 2, 0, 12));
    this.scene.add(this.lighting.sky);
    this.town = buildTown(this.scene, this.lighting);
    this.player = new Actor(LOOKS.hero, this.town.terrain);
    this.player.place(this.town.start.x, this.town.start.z);
    this.player.heading = Math.PI;
    this.scene.add(this.player.sprite);

    for (const def of this.npcDefs()) this.addNpc(def);

    this.rig.bounds = new THREE.Box2(new THREE.Vector2(9, 6), new THREE.Vector2(TOWN_W - 9, 22));
    this.rig.setTarget(this.player.pos, true);

    this.motes = new Motes(260, new THREE.Box3(new THREE.Vector3(-4, 1, -4), new THREE.Vector3(TOWN_W + 4, 7, 28)), { color: 0xffe2a8, size: 7, intensity: 1.2 });
    this.scene.add(this.motes);
    this.fireflies = new Motes(120, new THREE.Box3(new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(TOWN_W, 4, 27)), { color: 0xc8ff90, size: 6, intensity: 0 });
    this.scene.add(this.fireflies);
  }

  private npcDefs(): NpcDef[] {
    return [
      {
        id: 'elder', name: 'Elder Maren', look: LOOKS.elder, x: 18.7, z: 16.0, heading: 0,
        lines: [
          { name: 'Elder Maren', text: 'Ah, a traveler. Welcome to Brightwater.' },
          { name: 'Elder Maren', text: 'The well has never once run dry. Folk say a star fell into it, long ago, and it still keeps the water sweet.' },
          { name: 'Elder Maren', text: 'If you head east along the low road, mind the bandits. They have grown bold this season.' },
        ],
      },
      {
        id: 'merchant', name: 'Hollis', look: LOOKS.merchant, x: 10.4, z: 13.0, heading: 0,
        lines: [
          { name: 'Hollis', text: 'Apples! Oranges! Fresh from the orchards past the ridge!' },
          { name: 'Hollis', text: 'No coin? Hm. Well... come back when the road treats you kindly.' },
        ],
      },
      {
        id: 'baker', name: 'Wren', look: LOOKS.maid, x: 23.6, z: 13.0, heading: 0,
        lines: [{ name: 'Wren', text: 'The bread is still warm. Smell that? That is the smell of a five o\'clock start.' }],
      },
      {
        id: 'child', name: 'Pip', look: LOOKS.child, x: 14.6, z: 15.5, wander: 2.5,
        lines: [{ name: 'Pip', text: 'I can run all the way round the well twenty times without stopping! Wanna see?' }],
      },
      {
        id: 'innkeep', name: 'Dorrel', look: LOOKS.traveler, x: 24.0, z: 7.2, wander: 1.5,
        lines: [
          { name: 'Dorrel', text: 'The Lantern Inn has the softest beds this side of the mountains.' },
          { name: 'Dorrel', text: 'Want to watch the sky change? Press T and the hours slip by.' },
        ],
      },
      {
        id: 'mage', name: 'Seris', look: LOOKS.mage, x: 9.6, z: 7.3, wander: 1.2,
        lines: [{ name: 'Seris', text: 'There is something odd about the light in this town. Everything looks... smaller than it should. Like a model of itself.' }],
      },
      {
        id: 'captain', name: 'Captain Ardel', look: LOOKS.guard, x: 18.9, z: 22.4, heading: 0,
        lines: [
          { name: 'Captain Ardel', text: 'Halt. The road east leads to the Wilds. Bandits have been sighted.' },
          { name: 'Captain Ardel', text: 'You look like you can handle a blade. Care to prove it?', choices: ['Fight the bandits', 'Not yet'] },
        ],
        after: (c) => (c === 0 ? { type: 'battle', encounter: 'bandits' } : undefined),
      },
      {
        id: 'ranger', name: 'Tamsin', look: LOOKS.ranger, x: 4.4, z: 17.8, wander: 1.0,
        lines: [{ name: 'Tamsin', text: 'Archers loose before you see them. Watch the arc, then move.' }],
      },
    ];
  }

  private addNpc(def: NpcDef): void {
    const actor = new Actor(def.look, this.town.terrain);
    actor.place(def.x, def.z);
    actor.heading = def.heading ?? 0;
    this.scene.add(actor.sprite);
    const tex = spriteTexture(speechBubble());
    const bubble = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, fog: false }));
    bubble.scale.set(15 / 16 * 0.85, 11 / 16 * 0.85, 1);
    bubble.renderOrder = 5;
    this.scene.add(bubble);
    this.npcs.push({ def, actor, home: new THREE.Vector2(def.x, def.z), goal: null, wait: Math.random() * 3, bubble });
  }

  enter(): void {
    this.ui.setHelp(HELP);
  }

  dof(post: PostFX): void {
    this.lighting.applyGrade(post);
    const d = post.dof;
    d.focusDistance = this.rig.focusDistance;
    d.focusRange = 2.2;
    d.nearScale = 0.18;
    d.farScale = 0.11;
    d.maxBlur = 0.0105;
    d.tiltShift = 0.45;
    d.tiltCenter = 0.46;
    d.tiltBand = 0.26;
    d.bokehBoost = 3;
  }

  update(dt: number, time: number, input: Input): SceneEvent | null {
    const ui = this.ui;
    // ---- dialog / input ----
    const talking = ui.update(dt, input.hit('confirm'), input.hit('up'), input.hit('down'));
    const camYaw = cameraYaw(this.camera);
    if (!talking && !this.locked) {
      const m = input.move();
      const moving = Math.hypot(m.x, m.y) > 0.1;
      this.player.running = input.held('run');
      if (moving) {
        // camera-relative: screen up = away from the camera
        const sp = (this.player.running ? 5.6 : 3.3) * dt;
        const c = Math.cos(this.rig.yaw), s = Math.sin(this.rig.yaw);
        const dx = (m.x * c + m.y * s) * sp, dz = (-m.x * s + m.y * c) * sp;
        this.player.heading = Math.atan2(dx, dz);
        this.player.moving = this.moveWithNpcs(dx, dz);
      } else this.player.moving = false;

      if (input.hit('camLeft')) this.rig.rotate(-1);
      if (input.hit('camRight')) this.rig.rotate(1);
      if (input.held('zoomIn')) this.rig.zoom(-14 * dt);
      if (input.held('zoomOut')) this.rig.zoom(14 * dt);
      if (input.hit('time')) {
        const p = this.lighting.cycle();
        ui.toast({ golden: 'Golden hour', dusk: 'Dusk', night: 'Night', day: 'Midday' }[p] ?? p);
      }
      if (input.hit('battle')) this.pending = { type: 'battle', encounter: 'bandits' };
      if (input.hit('confirm') && this.interactTarget) this.interactTarget.act();
    } else {
      this.player.moving = false;
    }

    // wilds trigger
    const inW = this.town.wildsZone.containsPoint(new THREE.Vector2(this.player.pos.x, this.player.pos.z));
    if (inW && !this.inWilds && !talking) {
      this.pending = { type: 'battle', encounter: 'bandits' };
      this.player.place(TOWN_W - 1.6, 23);
    }
    this.inWilds = inW;

    // ---- NPCs ----
    for (const n of this.npcs) this.updateNpc(n, dt, talking);

    // ---- interaction target ----
    this.findInteraction(talking);

    // ---- camera, lighting, sprites ----
    this.rig.setTarget(this.player.pos);
    this.rig.update(dt);
    const sunYaw = this.lighting.sunYaw;
    this.player.update(dt, camYaw, sunYaw);
    for (const n of this.npcs) {
      n.actor.update(dt, camYaw, sunYaw);
      n.bubble.position.copy(n.actor.pos).add(new THREE.Vector3(0, 2.25 + Math.sin(time * 3 + n.home.x) * 0.05, 0));
      n.bubble.visible = !talking && n.actor.pos.distanceTo(this.player.pos) < 9;
    }
    this.lighting.update(dt, time, this.rig.focus);
    const night = THREE.MathUtils.clamp(this.lighting.state.lamps - 0.3, 0, 1);
    this.motes.intensity = 1.2 * (1 - night * 0.7);
    this.fireflies.intensity = night * 2.2;

    const ev = this.pending;
    this.pending = null;
    return ev;
  }

  /** Move the player, refusing steps that walk into a villager. */
  private moveWithNpcs(dx: number, dz: number): boolean {
    const before = this.player.pos.clone();
    if (!this.player.move(dx, dz)) return false;
    for (const n of this.npcs) {
      const d = n.actor.pos.distanceTo(this.player.pos);
      if (d < 0.62 && d < n.actor.pos.distanceTo(before)) {
        this.player.pos.copy(before);
        return false;
      }
    }
    return true;
  }

  private updateNpc(n: Npc, dt: number, talking: boolean): void {
    const a = n.actor;
    const wander = n.def.wander ?? 0;
    if (talking || wander <= 0) {
      a.moving = false;
      return;
    }
    if (!n.goal) {
      n.wait -= dt;
      a.moving = false;
      if (n.wait <= 0) {
        const ang = Math.random() * Math.PI * 2, r = Math.random() * wander;
        n.goal = new THREE.Vector2(n.home.x + Math.cos(ang) * r, n.home.y + Math.sin(ang) * r);
      }
      return;
    }
    const dx = n.goal.x - a.pos.x, dz = n.goal.y - a.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.1) {
      n.goal = null;
      n.wait = 1.5 + Math.random() * 3;
      return;
    }
    const sp = Math.min(d, 1.6 * dt);
    a.heading = Math.atan2(dx, dz);
    const nx = (dx / d) * sp, nz = (dz / d) * sp;
    const next = a.pos.clone().add(new THREE.Vector3(nx, 0, nz));
    if (next.distanceTo(this.player.pos) < 0.7 || !a.move(nx, nz)) {
      n.goal = null;
      n.wait = 1 + Math.random() * 2;
      a.moving = false;
      return;
    }
    a.moving = true;
  }

  private findInteraction(talking: boolean): void {
    this.interactTarget = null;
    if (talking || this.locked) {
      this.ui.showPrompt(null);
      return;
    }
    const p = this.player.pos;
    let best: Npc | null = null, bd = 1.6;
    for (const n of this.npcs) {
      const d = n.actor.pos.distanceTo(p);
      if (d < bd) { bd = d; best = n; }
    }
    if (best) {
      const n = best;
      this.interactTarget = {
        pos: n.actor.pos,
        label: 'Talk',
        act: () => {
          n.actor.faceToward(p);
          this.player.faceToward(n.actor.pos);
          n.goal = null;
          const lines = typeof n.def.lines === 'function' ? n.def.lines() : n.def.lines;
          this.ui.say(lines, (choice) => {
            const ev = n.def.after?.(choice);
            if (ev) this.pending = ev;
          });
        },
      };
    } else {
      for (const d of this.town.doors) {
        if (d.pos.distanceTo(p) < 1.2) {
          this.interactTarget = { pos: d.pos, label: 'Examine', act: () => this.ui.say([{ text: `The door to ${d.name} is locked. Nobody answers.` }]) };
          break;
        }
      }
      for (const s of this.town.signs) {
        if (Math.hypot(s.pos.x - p.x, s.pos.z - p.z) < 1.6) this.interactTarget = { pos: p, label: 'Read', act: () => this.ui.say([{ text: s.text }]) };
      }
    }
    if (this.interactTarget) {
      const w = this.interactTarget.pos.clone().add(new THREE.Vector3(0, 2.7, 0)).project(this.camera);
      this.ui.showPrompt(this.interactTarget.label, (w.x * 0.5 + 0.5) * innerWidth, (-w.y * 0.5 + 0.5) * innerHeight);
    } else this.ui.showPrompt(null);
  }

  exit(): void {
    this.ui.showPrompt(null);
  }
}
