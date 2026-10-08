// Top-level orchestrator: owns the renderer, scene, cast and the state machine
// title → explore → dialogue → transition → battle → result.
import * as THREE from 'three';
import { Input } from './Input.js';
import { Post } from './Post.js';
import { Tasks } from './Tasks.js';
import { CameraRig } from './CameraRig.js';
import { AssetLoader } from '../assets/AssetLoader.js';
import { Character } from '../characters/Character.js';
import { applyEchoLook, applyHeroRim } from '../characters/EchoLook.js';
import { SchoolHallway } from '../world/SchoolHallway.js';
import { PlayerController } from '../explore/PlayerController.js';
import { FollowCamera } from '../explore/FollowCamera.js';
import { HUD } from '../ui/HUD.js';
import { DialogueBox } from '../ui/DialogueBox.js';
import { DialogueSystem } from '../dialogue/DialogueSystem.js';
import { AudioEngine } from '../audio/Audio.js';
import { Effects } from '../fx/Effects.js';
import { BattleTransition } from '../transition/BattleTransition.js';
import { BattleDirector } from '../battle/BattleDirector.js';
import { damp } from './math.js';
import { SPOTS } from '../data/spots.js';

export { SPOTS };


export class Game {
  constructor(canvas, uiRoot) {
    this.canvas = canvas;
    this.uiRoot = uiRoot;
    this.state = 'loading';
    this.tasks = new Tasks();
    this.input = new Input(canvas);
    this.audio = new AudioEngine();
    this.hud = new HUD(uiRoot);
    this.timeScale = 1;
    this.frame = 0;
    this.fpsAvg = 60;
  }

  async init() {
    const r = (this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, powerPreference: 'high-performance' }));
    const params = new URLSearchParams(location.search);
    this.quality = params.get('q') || 'high';
    r.setPixelRatio(this.quality === 'low' ? 0.6 : Math.min(window.devicePixelRatio, 1.5));
    r.setSize(innerWidth, innerHeight);
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1.0;
    r.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1230);
    this.camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.05, 200);
    this.scene.add(this.camera);
    this.rig = new CameraRig(this.camera, this.tasks);
    this.post = new Post(r, this.scene, this.camera);
    this.post.setSize(innerWidth, innerHeight);
    addEventListener('resize', () => this.onResize());

    await document.fonts.load('40px Anton').catch(() => {});
    await document.fonts.load('italic 800 20px "Barlow Condensed"').catch(() => {});
    await document.fonts.load('600 20px "Barlow Condensed"').catch(() => {});

    this.world = new SchoolHallway(r, { quality: this.quality });
    this.scene.add(this.world.group);
    this.world.attachFog(this.scene);
    this.world.setArena(SPOTS.arena);

    this.hud.setLoading(0.05, 'Opening the school gates…');
    const loader = new AssetLoader((f) => this.hud.setLoading(0.05 + f * 0.9, f < 0.98 ? 'Loading students…' : 'Retargeting animations…'));
    const assets = await loader.loadAll();
    this.assets = assets;

    this.player = new Character(assets.player, 'player');
    this.student = new Character(assets.student, 'student');
    this.echo = new Character(assets.echo, 'echo');
    applyHeroRim(this.player.vrm, new THREE.Color(0.22, 0.26, 0.42));
    applyHeroRim(this.student.vrm, new THREE.Color(0.3, 0.24, 0.38));
    applyEchoLook(this.echo.vrm);
    this.scene.add(this.player.root, this.student.root, this.echo.root);

    this.fx = new Effects(this.scene, this.camera, this.tasks, this.uiRoot);
    this.controller = new PlayerController(this.player, this.world, this.input);
    this.controller.addCircle(this.student.root, 0.32);
    this.follow = new FollowCamera(this.camera, this.input);
    this.dialogueBox = new DialogueBox(this.uiRoot);
    this.dialogue = new DialogueSystem(this);
    this.transition = new BattleTransition(this);
    this.battle = new BattleDirector(this);

    this.resetWorld();
    // compile shaders up-front so the first battle frame doesn't hitch
    this.echo.root.visible = true;
    this.renderer.compile(this.scene, this.camera);
    this.echo.root.visible = false;

    this.hud.setLoading(1, 'Ready');
    this.clock = new THREE.Clock();
    this.renderer.setAnimationLoop(() => this.loop());
    this.hud.hideLoading();
    this.enterTitle();

    addEventListener('keydown', (e) => {
      if (e.code === 'KeyM') {
        const m = this.audio.toggleMute();
        this.hud.flashToast(m ? 'SOUND OFF' : 'SOUND ON', 1200);
      }
    });
    window.__ready = true;
  }

  /** Place everyone for a fresh run of the vertical slice. */
  resetWorld() {
    this.tasks.clear();
    this.world.setMood(0);
    const p = this.player;
    p.root.position.copy(SPOTS.playerStart);
    p.setHeading(0);
    p.root.visible = true;
    p.clearExpressions();
    p.setOverlay(null, 0);
    p.lookAt(null);
    p.play('idle', { fade: 0, force: true });
    this.controller.anim = 'idle';
    this.controller.speed = 0;

    const s = this.student;
    s.root.position.copy(SPOTS.student);
    s.setHeading(Math.PI / 2 + 0.25); // gazing out of the window
    s.root.visible = true;
    s.clearExpressions();
    s.setExpression('relaxed', 0.25);
    s.lookAt(null);
    s.play('idle', { fade: 0, force: true });

    const e = this.echo;
    e.root.visible = false;
    e.root.position.copy(SPOTS.echoReflection);
    e.setHeading(-Math.PI / 2);
    e.play('idle', { fade: 0, force: true });
    this.fx.reset?.();
    this.battle.reset?.();
    this.talked = false;
  }

  onResize() {
    const w = innerWidth;
    const h = innerHeight;
    this.renderer.setSize(w, h);
    this.post.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.transition?.onResize?.();
  }

  setState(s) {
    this.state = s;
    document.body.dataset.state = s;
  }

  // ---------------------------------------------------------------- title
  enterTitle() {
    this.setState('title');
    this.hud.showTitle(true);
    this.hud.showExplore(false);
    this.rig.active = true;
    this.rig.cut(new THREE.Vector3(-1.6, 1.25, 22.5), new THREE.Vector3(1.6, 1.25, 17.4), 40);
    this.rig.setDrift(new THREE.Vector3(0.0, 0.0, -0.18));
    this.post.u.vignette.value = 0.45;
    const begin = () => {
      if (this.state !== 'title') return;
      this.audio.unlock();
      this.audio.play('uiConfirm');
      this.startExplore(true);
    };
    this.hud.title.onclick = begin;
    this._titleBegin = begin;
    this.audio.setMusic('explore');
  }

  // ---------------------------------------------------------------- explore
  async startExplore(fromTitle = false) {
    this.setState('explore-intro');
    if (fromTitle) {
      this.hud.title.classList.add('leaving');
      this.audio.setMusic('explore');
      // swoop from the title shot to behind the player
      const p = this.player.root.position;
      await this.rig.move(new THREE.Vector3(p.x + 0.4, 1.9, p.z - 3.6), new THREE.Vector3(p.x, 1.3, p.z + 2), 1.4, { fov: 50 });
      this.hud.showTitle(false);
      this.hud.title.classList.remove('leaving');
    }
    this.follow.snap(this.player);
    this.follow.pitch = 0.16;
    this.rig.active = false;
    this.post.u.vignette.value = 0.32;
    this.hud.showExplore(true);
    this.controller.enabled = true;
    this.setState('explore');
  }

  updateExplore(dt) {
    const moving = this.input.moveAxis().active;
    this.controller.update(dt, this.follow.yaw);
    this.follow.update(dt, this.player, moving);
    this.world.setFocus(this.player.root.position);

    // student notices you as you approach
    const d = this.player.root.position.distanceTo(this.student.root.position);
    if (d < 4.5) this.student.lookAt(this.player.bone('head'), Math.min(1, (4.5 - d) / 2));
    else this.student.lookAt(null);

    const canTalk = d < 1.9 && this.state === 'explore';
    if (canTalk) {
      const v = this.student.root.position.clone().add(new THREE.Vector3(0, 1.95, 0)).project(this.camera);
      const x = (v.x * 0.5 + 0.5) * innerWidth;
      const y = (-v.y * 0.5 + 0.5) * innerHeight;
      this.hud.setPrompt(v.z < 1, x - 20, y - 20);
      if (this.input.pressed('confirm')) this.startDialogue();
    } else this.hud.setPrompt(false);
  }

  // ---------------------------------------------------------------- dialogue → battle
  async startDialogue() {
    this.setState('dialogue');
    this.hud.setPrompt(false);
    this.hud.showExplore(false);
    this.controller.enabled = false;
    this.controller.stop();
    this.audio.play('interact');
    await this.dialogue.runEncounter();
    // dialogue system hands off to the transition at its climax
    this.setState('transition');
    await this.transition.run();
    this.setState('battle');
    const result = await this.battle.run();
    this.setState('result');
    await this.battle.showResult(result);
  }

  /** Called from the result screen. */
  async restart(mode) {
    if (mode === 'retry') {
      this.setState('battle');
      this.battle.reset();
      const result = await this.battle.run({ retry: true });
      this.setState('result');
      await this.battle.showResult(result);
      return;
    }
    // full restart from the corridor
    this.battle.teardown();
    this.resetWorld();
    this.post.u.duotone.value = 0;
    this.post.u.tintAmount.value = 0;
    this.post.u.flash.value = 0;
    this.post.u.saturation.value = 1.1;
    this.post.u.chroma.value = 0;
    this.post.u.speedLines.value = 0;
    this.post.u.zoomBlur.value = 0;
    this.post.u.invert.value = 0;
    this.camera.fov = 50;
    this.camera.updateProjectionMatrix();
    this.audio.setMusic('explore');
    this.audio.setMusicFilter(18000);
    this.rig.active = false;
    this.startExplore(false);
  }

  // ---------------------------------------------------------------- loop
  loop() {
    const rawDt = Math.min(this.clock.getDelta(), 1 / 15);
    const dt = rawDt * this.timeScale;
    this.frame++;
    this.fpsAvg = damp(this.fpsAvg, 1 / Math.max(rawDt, 1e-4), 3, rawDt);

    if (this.state === 'title' && this.input.pressed('confirm')) this._titleBegin?.();
    this.tasks.update(dt);
    if (this.state === 'explore') this.updateExplore(dt);
    else if (this.state !== 'explore-intro') this.input.consumeMouse();

    this.dialogue.update(dt);
    this.battle.update(dt);
    this.player.update(dt);
    this.student.update(dt);
    if (this.echo.root.visible) this.echo.update(dt);
    this.world.update(dt);
    this.fx.update(dt);
    this.rig.update(dt);
    this.post.render(dt);
    this.transition.afterRender();
    this.input.endFrame();
  }
}
