// Loads the VRM cast and the shared animation library, then retargets the
// animation set onto each character's normalized humanoid rig.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { captureSourceRest, retargetClip } from './retarget.js';

export const CAST = {
  player: { url: 'assets/models/player.vrm', height: 1.78 },
  student: { url: 'assets/models/student.vrm', height: 1.62 },
  echo: { url: 'assets/models/echo.vrm', height: 1.65 },
};

// Logical animation name -> clip in the library (+ options).
export const ANIM_SET = {
  idle: { clip: 'Idle_Loop' },
  walk: { clip: 'Walk_Loop' },
  jog: { clip: 'Jog_Fwd_Loop' },
  talk: { clip: 'Idle_Talking_Loop' },
  interact: { clip: 'Interact', once: true },
  battleIntro: { clip: 'Spell_Simple_Enter', once: true },
  battleIdle: { clip: 'Sword_Idle' },
  castIdle: { clip: 'Spell_Simple_Idle_Loop' },
  jab: { clip: 'Punch_Jab', once: true },
  cross: { clip: 'Punch_Cross', once: true },
  cast: { clip: 'Spell_Simple_Shoot', once: true },
  castExit: { clip: 'Spell_Simple_Exit', once: true },
  slash: { clip: 'Sword_Attack', once: true },
  hit: { clip: 'Hit_Chest', once: true },
  hitHead: { clip: 'Hit_Head', once: true },
  death: { clip: 'Death01', once: true },
  crouch: { clip: 'Crouch_Idle_Loop' },
  roll: { clip: 'Roll', once: true },
  land: { clip: 'Jump_Land', once: true },
};

const ANIM_URL = 'assets/anim/ual1_standard.glb';

export class AssetLoader {
  constructor(onProgress = () => {}) {
    this.onProgress = onProgress;
    this.loader = new GLTFLoader();
    this.loader.register((parser) => new VRMLoaderPlugin(parser));
    this.progress = {};
  }

  _report(key, frac) {
    this.progress[key] = frac;
    const vals = Object.values(this.progress);
    this.onProgress(vals.reduce((a, b) => a + b, 0) / (Object.keys(CAST).length + 1));
  }

  async loadAll() {
    for (const k of [...Object.keys(CAST), 'anim']) this.progress[k] = 0;
    const animPromise = new GLTFLoader().loadAsync(ANIM_URL, (e) => e.total && this._report('anim', e.loaded / e.total));
    const vrmPromises = Object.entries(CAST).map(([key, def]) =>
      this.loader.loadAsync(def.url, (e) => e.total && this._report(key, (e.loaded / e.total) * 0.95)).then((gltf) => [key, gltf])
    );
    const anim = await animPromise;
    this._report('anim', 1);
    const restClip = anim.animations.find((c) => c.name === 'A_TPose');
    const rest = captureSourceRest(anim.scene, restClip);
    const library = new Map(anim.animations.map((c) => [c.name, c]));

    const result = {};
    for (const [key, gltf] of await Promise.all(vrmPromises)) {
      const vrm = gltf.userData.vrm;
      if (!vrm) throw new Error(`${key}: not a VRM file`);
      VRMUtils.removeUnnecessaryVertices(gltf.scene);
      VRMUtils.combineSkeletons(gltf.scene);
      VRMUtils.rotateVRM0(vrm);
      vrm.scene.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.frustumCulled = false;
        }
      });

      const clips = new Map();
      for (const [name, def] of Object.entries(ANIM_SET)) {
        const src = library.get(def.clip);
        if (!src) throw new Error(`Animation clip missing: ${def.clip}`);
        const clip = retargetClip(src, rest, vrm, { name });
        clip.userData = { once: !!def.once };
        clips.set(name, clip);
      }
      // Native model height (before any scaling) for normalisation.
      const box = new THREE.Box3().setFromObject(vrm.scene);
      result[key] = { vrm, clips, nativeHeight: box.max.y - box.min.y, def: CAST[key] };
      this._report(key, 1);
    }
    return result;
  }
}
