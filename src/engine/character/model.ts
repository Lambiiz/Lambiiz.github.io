import * as THREE from 'three';
import { shade, mix, rgb } from '../pixel/color';
import type { CharacterLook } from './look';

/**
 * A character as a small rigged 3D model built from primitives, used only to bake pixel-art sprite
 * sheets (bake.ts). Rendering a model instead of drawing each frame by hand is what makes 8
 * directions, 3/4 views and arbitrary poses cheap. The cel material below quantises lighting into
 * four hue-shifted bands, so the low-resolution render reads as pixel art, not as a tiny 3D image.
 *
 * Coordinates: Y up, the model faces +Z, the feet at the origin, about 1.75 units tall.
 * The character's right side is -X (it faces the viewer at yaw 0).
 */

// ---------------------------------------------------------------------------------------------
// cel material
// ---------------------------------------------------------------------------------------------

const CEL_VERT = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const CEL_FRAG = /* glsl */ `
uniform vec3 c0, c1, c2, c3;
uniform vec3 lightDir;
uniform float cut0, cut1, cut2;
varying vec3 vNormal;
void main() {
  vec3 n = normalize(vNormal);
  if (!gl_FrontFacing) n = -n;
  float d = dot(n, lightDir);
  vec3 c = d > cut2 ? c3 : d > cut1 ? c2 : d > cut0 ? c1 : c0;
  gl_FragColor = vec4(c, 1.0);
}`;

/** Light in view space: from the upper left, a little in front (the classic pixel-art key). */
export const BAKE_LIGHT = new THREE.Vector3(-0.62, 0.66, 0.42).normalize();

const v3 = (c: number) => {
  const [r, g, b] = rgb(c);
  return new THREE.Vector3(r / 255, g / 255, b / 255);
};

const matCache = new Map<string, THREE.ShaderMaterial>();

/** Four-band cel material in exact sRGB (no colour management: the bake reads the bytes back). */
export function celMaterial(base: number, kind: 'cloth' | 'skin' | 'hair' | 'metal' | 'glow' = 'cloth'): THREE.ShaderMaterial {
  const key = `${base}-${kind}`;
  let m = matCache.get(key);
  if (m) return m;
  let ramp: number[];
  let cuts = [-0.12, 0.3, 0.64];
  switch (kind) {
    case 'skin':
      ramp = [shade(base, -0.45), shade(base, -0.22), base, shade(base, 0.2)];
      cuts = [-0.35, 0.12, 0.68];
      break;
    case 'hair':
      ramp = [shade(base, -0.75), shade(base, -0.4), base, shade(base, 0.48)];
      cuts = [-0.1, 0.3, 0.7];
      break;
    case 'metal':
      ramp = [shade(base, -0.75), shade(base, -0.35), base, mix(base, 0xffffff, 0.65)];
      cuts = [-0.2, 0.25, 0.72];
      break;
    case 'glow':
      ramp = [shade(base, 0.1), shade(base, 0.3), mix(base, 0xffffff, 0.45), 0xffffff];
      break;
    default:
      ramp = [shade(base, -0.75), shade(base, -0.38), base, shade(base, 0.32)];
  }
  m = new THREE.ShaderMaterial({
    vertexShader: CEL_VERT,
    fragmentShader: CEL_FRAG,
    uniforms: {
      c0: { value: v3(ramp[0]) }, c1: { value: v3(ramp[1]) }, c2: { value: v3(ramp[2]) }, c3: { value: v3(ramp[3]) },
      lightDir: { value: BAKE_LIGHT },
      cut0: { value: cuts[0] }, cut1: { value: cuts[1] }, cut2: { value: cuts[2] },
    },
    side: THREE.DoubleSide,
  });
  matCache.set(key, m);
  return m;
}

// ---------------------------------------------------------------------------------------------
// rig
// ---------------------------------------------------------------------------------------------

export interface Rig {
  /** Turned to face a direction (yaw). */
  root: THREE.Group;
  /** Inside root: tips over for knock-outs. */
  body: THREE.Object3D;
  hips: THREE.Object3D;
  spine: THREE.Object3D;
  neck: THREE.Object3D;
  head: THREE.Object3D;
  shoulderR: THREE.Object3D;
  elbowR: THREE.Object3D;
  handR: THREE.Object3D;
  shoulderL: THREE.Object3D;
  elbowL: THREE.Object3D;
  handL: THREE.Object3D;
  thighR: THREE.Object3D;
  kneeR: THREE.Object3D;
  thighL: THREE.Object3D;
  kneeL: THREE.Object3D;
  cape: THREE.Object3D | null;
  coat: THREE.Object3D | null;
  weapon: THREE.Object3D | null;
  /** Points on the face where eyes / mouth are painted after the render (see bake.ts). */
  eyeR: THREE.Object3D;
  eyeL: THREE.Object3D;
  mouth: THREE.Object3D;
  dims: { hipY: number; headR: number };
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

function joint(parent: THREE.Object3D, x = 0, y = 0, z = 0): THREE.Object3D {
  const o = new THREE.Object3D();
  o.position.set(x, y, z);
  parent.add(o);
  return o;
}

/** Capsule hanging down from its joint: top cap centred on the joint. */
function limb(r: number, len: number, rBottom = r): THREE.BufferGeometry {
  if (Math.abs(rBottom - r) < 1e-4) {
    const g = new THREE.CapsuleGeometry(r, len, 4, 10);
    g.translate(0, -len / 2, 0);
    return g;
  }
  // tapered: a cylinder plus two spheres, merged by a lathe profile
  const pts: THREE.Vector2[] = [];
  const seg = 6;
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.sin(a) * rBottom, -len - Math.cos(a) * rBottom));
  }
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
  }
  return new THREE.LatheGeometry(pts, 12);
}

export function buildRig(look: CharacterLook): Rig {
  const hs = look.height ?? 1;
  const girth = look.girth ?? 1;
  const child = hs < 0.9;
  const root = new THREE.Group();

  // proportions (chibi: about 2.8 heads tall)
  const headR = child ? 0.35 : 0.335;
  const thigh = 0.23 * hs, shin = 0.22 * hs;
  const footH = 0.07;
  const hipY = thigh + shin + footH;
  const torsoLen = (child ? 0.33 : 0.4) * hs;
  const shoulderX = 0.175 * girth * (child ? 0.88 : 1);
  const upperArm = 0.19 * hs, forearm = 0.17 * hs;

  const M = {
    skin: celMaterial(look.skin, 'skin'),
    hair: celMaterial(look.hair, 'hair'),
    top: celMaterial(look.top),
    second: celMaterial(look.second ?? shade(look.top, -0.3)),
    bottom: celMaterial(look.bottom),
    boots: celMaterial(look.boots),
    accent: celMaterial(look.accent),
    gloves: celMaterial(look.gloves ?? look.skin, look.gloves ? 'cloth' : 'skin'),
    gold: celMaterial(0xe0b050, 'metal'),
    steel: celMaterial(0xb8c0cc, 'metal'),
    wood: celMaterial(0x7a5034),
  };

  const body = joint(root);
  const hips = joint(body, 0, hipY, 0);
  const spine = joint(hips);

  // ---- torso ------------------------------------------------------------------------------------
  const torsoProfile = [
    [0.0, -0.02], [0.13, -0.02], [0.145, 0.06], [0.13, 0.16], [0.15, 0.28], [0.16, 0.36], [0.14, torsoLen - 0.02], [0.06, torsoLen + 0.01], [0.0, torsoLen + 0.01],
  ].map(([x, y]) => new THREE.Vector2(x * girth * (child ? 0.9 : 1), y * (torsoLen / 0.45)));
  const torsoGeo = new THREE.LatheGeometry(torsoProfile, 16);
  torsoGeo.scale(1, 1, 0.78);
  const torsoMat = look.outfit === 'armor' ? celMaterial(look.second ?? 0xb8c0cc, 'metal') : M.top;
  mesh(torsoGeo, torsoMat, spine);
  // the lower part of an armour wearer's torso is the tunic under the plate
  if (look.outfit === 'armor') {
    const under = new THREE.CylinderGeometry(0.15 * girth, 0.155 * girth, 0.14, 14, 1, false);
    under.scale(1, 1, 0.8);
    mesh(under, M.top, spine, 0, 0.05, 0);
  }
  // apron front
  if (look.outfit === 'apron') {
    const apron = new THREE.CylinderGeometry(0.162 * girth, 0.2 * girth, torsoLen * 0.62, 12, 1, true, -0.8, 1.6);
    apron.scale(1, 1, 0.82);
    mesh(apron, M.second, spine, 0, torsoLen * 0.3, 0.005);
  }
  // coat lapels: a darker V down the chest
  if (look.outfit === 'coat') {
    const lap = new THREE.CylinderGeometry(0.155 * girth, 0.15 * girth, torsoLen * 0.7, 12, 1, true, -0.35, 0.7);
    lap.scale(1, 1, 0.8);
    mesh(lap, M.second, spine, 0, torsoLen * 0.62, 0.006);
  }
  // collar and belt
  const collar = new THREE.TorusGeometry(0.075, 0.03, 6, 14);
  collar.rotateX(Math.PI / 2);
  mesh(collar, look.outfit === 'armor' ? M.top : M.accent, spine, 0, torsoLen - 0.005, 0);
  const belt = new THREE.CylinderGeometry(0.148 * girth, 0.148 * girth, 0.05, 16, 1, true);
  belt.scale(1, 1, 0.8);
  mesh(belt, M.accent, spine, 0, 0.05, 0);
  if (look.outfit !== 'robe') mesh(new THREE.BoxGeometry(0.05, 0.045, 0.02), M.gold, spine, 0, 0.05, 0.12 * girth);
  // a strap across the chest for anyone who carries a weapon
  if (look.weapon && look.weapon !== 'none' && look.outfit !== 'robe' && look.outfit !== 'armor') {
    const strap = new THREE.TorusGeometry(0.17 * girth, 0.016, 4, 20);
    strap.scale(1, 1.35, 0.82);
    const st = mesh(strap, celMaterial(shade(look.accent, -0.2)), spine, 0, torsoLen * 0.55, 0);
    st.rotation.set(0, 0, 0.75);
  }
  // buttons down a coat or tunic front
  if (look.outfit === 'coat' || look.outfit === 'tunic') {
    for (let i = 0; i < 3; i++) mesh(new THREE.SphereGeometry(0.014, 5, 4), M.gold, spine, 0, torsoLen * (0.42 + i * 0.16), 0.122 * girth);
  }
  if (look.scarf !== undefined) {
    const sc = new THREE.TorusGeometry(0.09, 0.045, 6, 14);
    sc.rotateX(Math.PI / 2 - 0.15);
    mesh(sc, celMaterial(look.scarf), spine, 0, torsoLen - 0.02, 0.005);
    const tail = new THREE.BoxGeometry(0.06, 0.18, 0.025);
    tail.translate(0, -0.09, 0);
    const t = mesh(tail, celMaterial(look.scarf), spine, -0.05, torsoLen - 0.04, 0.1);
    t.rotation.z = 0.15;
  }
  if (look.outfit === 'armor') {
    // pauldrons
    for (const s of [-1, 1]) {
      const p = new THREE.SphereGeometry(0.085, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const pm = mesh(p, celMaterial(look.second ?? 0xb8c0cc, 'metal'), spine, s * (shoulderX + 0.01), torsoLen - 0.06, 0);
      pm.rotation.z = -s * 0.35;
    }
  }

  // ---- skirt / coat tails ----------------------------------------------------------------------
  let coat: THREE.Object3D | null = null;
  {
    const len = look.outfit === 'robe' || look.outfit === 'dress' ? thigh + shin * 0.9 : look.outfit === 'coat' ? thigh + shin * 0.35 : look.outfit === 'apron' ? thigh * 0.9 : thigh * 0.55;
    const rTop = 0.15 * girth;
    const rBot = rTop + (look.outfit === 'dress' ? 0.17 : look.outfit === 'robe' ? 0.12 : look.outfit === 'coat' ? 0.09 : 0.05);
    const open = look.outfit === 'coat' ? 0.9 : 0;
    const g = new THREE.CylinderGeometry(rTop, rBot, len, 18, 3, true, open / 2, Math.PI * 2 - open);
    g.translate(0, -len / 2, 0);
    g.scale(1, 1, 0.85);
    coat = joint(hips, 0, 0.06, 0);
    mesh(g, look.outfit === 'apron' ? M.top : look.outfit === 'armor' ? M.top : M.top, coat);
    if (look.outfit === 'apron') {
      const a = new THREE.CylinderGeometry(rTop + 0.004, rBot + 0.004, len * 0.95, 12, 1, true, -0.85, 1.7);
      a.translate(0, -len * 0.475, 0);
      a.scale(1, 1, 0.86);
      mesh(a, M.second, coat);
    }
    {
      // a trim band at the hem
      const hem = new THREE.CylinderGeometry(rBot + 0.003, rBot + 0.006, 0.045, 18, 1, true, open / 2, Math.PI * 2 - open);
      hem.translate(0, -len + 0.02, 0);
      hem.scale(1, 1, 0.85);
      mesh(hem, look.outfit === 'robe' || look.outfit === 'tunic' ? M.second : M.accent, coat);
    }
    // a pouch on the hip
    if (look.outfit !== 'robe' && look.outfit !== 'dress') {
      const pouch = new THREE.BoxGeometry(0.07, 0.08, 0.05);
      mesh(pouch, celMaterial(shade(look.accent, -0.15)), hips, 0.15 * girth, 0.0, 0.05).rotation.y = 0.5;
    }
  }

  // ---- cape ---------------------------------------------------------------------------------------
  let cape: THREE.Object3D | null = null;
  if (look.cape !== undefined) {
    cape = joint(spine, 0, torsoLen - 0.02, -0.06);
    const len = torsoLen + thigh + 0.1;
    const g = new THREE.CylinderGeometry(0.15, 0.26, len, 14, 4, true, Math.PI * 0.62, Math.PI * 0.76);
    g.translate(0, -len / 2, 0);
    g.scale(1, 1, 0.75);
    mesh(g, celMaterial(look.cape), cape);
  }

  // ---- head -----------------------------------------------------------------------------------------
  const neck = joint(spine, 0, torsoLen, 0);
  mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 8), M.skin, neck, 0, 0.02, 0);
  const head = joint(neck, 0, headR * 0.92, 0.01);
  const skull = new THREE.SphereGeometry(headR, 22, 16);
  skull.scale(1, 0.94, 0.95);
  mesh(skull, M.skin, head);
  // cheeks / jaw: a little volume low in front
  const jaw = new THREE.SphereGeometry(headR * 0.7, 14, 10);
  jaw.scale(1, 0.8, 0.85);
  mesh(jaw, M.skin, head, 0, -headR * 0.32, headR * 0.16);
  for (const s of [-1, 1]) mesh(new THREE.SphereGeometry(0.045, 8, 6), M.skin, head, s * headR * 0.96, -0.02, -0.01);

  const eyeR = joint(head, -headR * 0.36, -headR * 0.08, headR * 0.86);
  const eyeL = joint(head, headR * 0.36, -headR * 0.08, headR * 0.86);
  const mouth = joint(head, 0, -headR * 0.5, headR * 0.86);

  buildHair(look, head, headR, M.hair);
  if (look.beard !== undefined) {
    const b = new THREE.SphereGeometry(headR * 0.62, 14, 10, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65);
    b.scale(1, 1.1, 0.9);
    mesh(b, celMaterial(look.beard, 'hair'), head, 0, -headR * 0.42, headR * 0.3);
  }
  buildHat(look, head, headR);

  // ---- arms --------------------------------------------------------------------------------------------
  const sleeve = look.outfit === 'armor' ? M.top : look.outfit === 'apron' ? M.top : M.top;
  const arm = (side: -1 | 1) => {
    const sh = joint(spine, side * shoulderX, torsoLen - 0.07, 0);
    mesh(limb(0.056 * girth, upperArm, 0.05), sleeve, sh);
    const el = joint(sh, 0, -upperArm, 0);
    const cuffMat = look.outfit === 'robe' ? M.top : look.gloves !== undefined ? M.gloves : sleeve;
    mesh(limb(0.05, forearm * 0.75, 0.047), look.outfit === 'robe' ? M.top : sleeve, el);
    const cuff = look.outfit === 'robe' ? new THREE.CylinderGeometry(0.058, 0.085, 0.1, 10, 1, true) : new THREE.CylinderGeometry(0.054, 0.056, 0.04, 10, 1, true);
    mesh(cuff, M.second, el, 0, -forearm * (look.outfit === 'robe' ? 0.7 : 0.72), 0);
    const hand = joint(el, 0, -forearm, 0);
    mesh(new THREE.SphereGeometry(0.055, 10, 8), look.gloves !== undefined ? M.gloves : M.skin, hand);
    void cuffMat;
    return { sh, el, hand };
  };
  const R = arm(-1), L = arm(1);

  // ---- legs ---------------------------------------------------------------------------------------------
  const leg = (side: -1 | 1) => {
    const th = joint(hips, side * 0.078 * girth, 0, 0);
    mesh(limb(0.07 * girth, thigh, 0.06), M.bottom, th);
    const kn = joint(th, 0, -thigh, 0);
    mesh(limb(0.06, shin * 0.35, 0.058), M.bottom, kn);
    // boot shaft and foot
    const boot = limb(0.064, shin * 0.6, 0.06);
    boot.translate(0, -shin * 0.36, 0);
    mesh(boot, M.boots, kn);
    mesh(new THREE.CylinderGeometry(0.072, 0.07, 0.035, 10, 1, true), celMaterial(shade(look.boots, 0.25)), kn, 0, -shin * 0.32, 0);
    const foot = new THREE.CapsuleGeometry(0.058, 0.09, 4, 8);
    foot.rotateX(Math.PI / 2);
    foot.scale(1, 0.75, 1);
    mesh(foot, M.boots, kn, 0, -shin - 0.01, 0.045);
    return { th, kn };
  };
  const LR = leg(-1), LL = leg(1);

  // ---- weapon ----------------------------------------------------------------------------------------------
  let weapon: THREE.Object3D | null = null;
  const w = look.weapon ?? 'none';
  if (w !== 'none') {
    weapon = joint(w === 'bow' ? L.hand : R.hand);
    buildWeapon(w, weapon, M);
  }

  return {
    root, body, hips, spine, neck, head,
    shoulderR: R.sh, elbowR: R.el, handR: R.hand,
    shoulderL: L.sh, elbowL: L.el, handL: L.hand,
    thighR: LR.th, kneeR: LR.kn, thighL: LL.th, kneeL: LL.kn,
    cape, coat, weapon, eyeR, eyeL, mouth,
    dims: { hipY, headR },
  };
}

function buildHair(look: CharacterLook, head: THREE.Object3D, r: number, mat: THREE.Material): void {
  const style = look.hairStyle;
  const hat = look.hat ?? 'none';
  if (style === 'none' || hat === 'helmet' || hat === 'hood') {
    if (hat === 'hood' || hat === 'helmet') {
      // a fringe still shows under a hood
      if (hat === 'hood') bangs(head, r, mat, 5, 0.75);
    }
    return;
  }
  // a hat that covers the crown replaces the top of the hair
  const covered = hat === 'kerchief' || hat === 'cap' || hat === 'wide';
  // crown: covers the top, front edge at the hairline
  if (!covered) {
  const crown = new THREE.SphereGeometry(r * 1.1, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.42);
  mesh(crown, mat, head, 0, r * 0.03, -r * 0.03);
  }
  // back of the head, down to the nape
  const backLen = style === 'bob' ? 0.84 : style === 'long' ? 0.82 : 0.72;
  const back = new THREE.SphereGeometry(r * 1.11, 22, 14, Math.PI, Math.PI, 0, Math.PI * backLen);
  mesh(back, mat, head, 0, 0, -r * 0.03);
  // chunky locks around the crown edge give the silhouette some texture
  const clumps = covered ? 0 : 11;
  for (let i = 0; i < clumps; i++) {
    const a = (i / clumps) * Math.PI * 2 + 0.3;
    if (Math.cos(a) > 0.55) continue; // the front is the fringe's job
    const g = new THREE.ConeGeometry(r * 0.24, r * 0.55, 5);
    g.rotateX(Math.PI);
    g.scale(1, 1, 0.6);
    g.translate(0, -r * 0.16, 0);
    const m = mesh(g, mat, head, Math.sin(a) * r * 0.9, r * 0.14, Math.cos(a) * r * 0.9 - r * 0.04);
    m.rotation.set(Math.cos(a) * 0.3, a, -Math.sin(a) * 0.3);
  }
  // sides: locks over the ears
  for (const s of [-1, 1]) {
    const lockLen = style === 'bob' ? 0.36 : style === 'long' ? 0.42 : 0.24;
    const g = new THREE.ConeGeometry(r * 0.3, r * (0.75 + lockLen * 1.6), 6);
    g.rotateX(Math.PI);
    g.scale(0.7, 1, 1);
    const m = mesh(g, mat, head, s * r * 0.86, -r * 0.12 - lockLen * r * 0.5, r * 0.3);
    m.rotation.z = s * 0.08;
  }
  bangs(head, r, mat, style === 'spiky' ? 7 : 9, style === 'swept' ? 0.9 : 1);
  if (style === 'swept') {
    // a swoop of fringe across the forehead
    const sw = new THREE.SphereGeometry(r * 0.55, 12, 8);
    sw.scale(1.5, 0.55, 0.7);
    const m = mesh(sw, mat, head, r * 0.18, r * 0.42, r * 0.62);
    m.rotation.z = -0.35;
  }
  if (style === 'spiky') {
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const g = new THREE.ConeGeometry(r * 0.2, r * 0.6, 6);
      const m = mesh(g, mat, head, Math.sin(a) * r * 0.7, r * 0.72, Math.cos(a) * r * 0.55 - r * 0.15);
      m.rotation.set(Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9);
    }
  }
  if (style === 'long') {
    const g = new THREE.CylinderGeometry(r * 0.95, r * 0.75, r * 2.2, 14, 3, true, Math.PI * 0.55, Math.PI * 0.9);
    g.translate(0, -r * 1.1, 0);
    g.scale(1, 1, 0.75);
    mesh(g, mat, head, 0, -r * 0.1, -r * 0.08);
  }
  if (style === 'ponytail') {
    const tie = joint(head, 0, r * 0.25, -r * 0.95);
    const g = limb(r * 0.25, r * 1.0, r * 0.1);
    const m = mesh(g, mat, tie);
    m.rotation.x = 0.3;
    mesh(new THREE.SphereGeometry(r * 0.16, 8, 6), celMaterial(look.accent), tie);
  }
  if (style === 'bun') mesh(new THREE.SphereGeometry(r * 0.42, 12, 10), mat, head, 0, r * 0.65, -r * 0.65);
}

function bangs(head: THREE.Object3D, r: number, mat: THREE.Material, n: number, len: number): void {
  for (let i = 0; i < n; i++) {
    const a = -0.95 + (i / (n - 1)) * 1.9; // azimuth across the forehead
    const polar = 0.95; // from the top
    const x = Math.sin(a) * Math.sin(polar) * r * 1.04;
    const y = Math.cos(polar) * r * 1.04;
    const z = Math.cos(a) * Math.sin(polar) * r * 1.04;
    const g = new THREE.ConeGeometry(r * 0.22, r * 0.6 * len * (i % 3 === 1 ? 0.72 : i % 3 === 2 ? 0.88 : 1), 4);
    g.rotateX(Math.PI); // point down
    g.scale(1, 1, 0.45);
    g.translate(0, -r * 0.18, 0);
    const m = mesh(g, mat, head, x, y, z);
    m.rotation.set(-0.22, a * 0.9, -a * 0.3);
  }
}

function buildHat(look: CharacterLook, head: THREE.Object3D, r: number): void {
  const hat = look.hat ?? 'none';
  if (hat === 'none') return;
  const c = look.hatColor ?? look.accent;
  const m = celMaterial(c, hat === 'helmet' || hat === 'circlet' ? 'metal' : 'cloth');
  switch (hat) {
    case 'wide': {
      mesh(new THREE.CylinderGeometry(r * 1.75, r * 1.75, 0.03, 20), m, head, 0, r * 0.5, 0);
      mesh(new THREE.CylinderGeometry(r * 0.78, r * 0.95, r * 0.75, 16), m, head, 0, r * 0.85, 0);
      mesh(new THREE.CylinderGeometry(r * 0.97, r * 0.97, r * 0.16, 16, 1, true), celMaterial(look.accent), head, 0, r * 0.58, 0);
      break;
    }
    case 'cap': {
      mesh(new THREE.SphereGeometry(r * 1.1, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.42), m, head, 0, r * 0.05, 0);
      const visor = new THREE.CylinderGeometry(r * 0.55, r * 0.55, 0.025, 14, 1, false, -Math.PI / 2, Math.PI);
      visor.scale(1, 1, 1.2);
      mesh(visor, m, head, 0, r * 0.42, r * 0.85);
      break;
    }
    case 'kerchief': {
      mesh(new THREE.SphereGeometry(r * 1.12, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.45), m, head, 0, 0, -r * 0.03);
      const knot = new THREE.SphereGeometry(r * 0.2, 8, 6);
      mesh(knot, m, head, 0, r * 0.1, -r * 1.05);
      break;
    }
    case 'hood': {
      const g = new THREE.SphereGeometry(r * 1.2, 20, 14);
      // carve the face opening by dropping the front-lower triangles
      const pos = g.attributes.position as THREE.BufferAttribute;
      const idx = g.index!;
      const keep: number[] = [];
      for (let i = 0; i < idx.count; i += 3) {
        let front = 0;
        for (let k = 0; k < 3; k++) {
          const v = idx.getX(i + k);
          const x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v);
          if (z > r * 0.45 && y < r * 0.55 && Math.abs(x) < r * 0.85) front++;
        }
        if (front < 2) keep.push(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
      }
      g.setIndex(keep);
      mesh(g, m, head, 0, r * 0.06, -r * 0.05);
      const drape = new THREE.CylinderGeometry(r * 0.9, r * 1.25, r * 0.9, 16, 1, true);
      mesh(drape, m, head, 0, -r * 1.05, -r * 0.08);
      break;
    }
    case 'helmet': {
      mesh(new THREE.SphereGeometry(r * 1.13, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), m, head, 0, 0, 0);
      mesh(new THREE.BoxGeometry(r * 0.16, r * 1.0, r * 0.2), m, head, 0, -r * 0.1, r * 1.0);
      mesh(new THREE.TorusGeometry(r * 1.1, r * 0.06, 6, 20), m, head, 0, r * 0.12, 0).rotation.x = Math.PI / 2;
      const crest = new THREE.BoxGeometry(r * 0.12, r * 0.35, r * 1.3);
      mesh(crest, celMaterial(0xb03a3a), head, 0, r * 1.15, -r * 0.05);
      break;
    }
    case 'circlet': {
      const t = new THREE.TorusGeometry(r * 1.03, r * 0.05, 6, 22);
      t.rotateX(Math.PI / 2 - 0.2);
      mesh(t, m, head, 0, r * 0.32, 0);
      mesh(new THREE.OctahedronGeometry(r * 0.12), celMaterial(0x60c0ff, 'glow'), head, 0, r * 0.45, r * 1.02);
      break;
    }
  }
}

function buildWeapon(w: string, parent: THREE.Object3D, M: Record<string, THREE.Material>): void {
  // local frame: the grip is at the origin; the weapon extends along +Y
  switch (w) {
    case 'sword': {
      mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.13, 6), M.wood, parent, 0, -0.02, 0);
      mesh(new THREE.BoxGeometry(0.17, 0.035, 0.05), M.gold, parent, 0, 0.06, 0);
      const blade = new THREE.BoxGeometry(0.06, 0.62, 0.016);
      blade.translate(0, 0.38, 0);
      mesh(blade, M.steel, parent);
      const tip = new THREE.ConeGeometry(0.043, 0.09, 4);
      tip.rotateY(Math.PI / 4);
      tip.scale(1, 1, 0.38);
      mesh(tip, M.steel, parent, 0, 0.735, 0);
      break;
    }
    case 'dagger': {
      mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6), M.wood, parent, 0, -0.01, 0);
      mesh(new THREE.BoxGeometry(0.1, 0.03, 0.04), M.gold, parent, 0, 0.05, 0);
      const blade = new THREE.BoxGeometry(0.05, 0.28, 0.015);
      blade.translate(0, 0.2, 0);
      mesh(blade, M.steel, parent);
      break;
    }
    case 'staff': {
      const s = new THREE.CylinderGeometry(0.022, 0.026, 1.45, 6);
      s.translate(0, 0.3, 0);
      mesh(s, M.wood, parent);
      mesh(new THREE.TorusGeometry(0.075, 0.018, 6, 12), M.gold, parent, 0, 1.06, 0);
      mesh(new THREE.OctahedronGeometry(0.075, 1), celMaterial(0x70d0ff, 'glow'), parent, 0, 1.06, 0);
      break;
    }
    case 'spear': {
      const s = new THREE.CylinderGeometry(0.02, 0.02, 1.6, 6);
      s.translate(0, 0.35, 0);
      mesh(s, M.wood, parent);
      const head = new THREE.ConeGeometry(0.05, 0.22, 4);
      head.scale(1, 1, 0.4);
      mesh(head, M.steel, parent, 0, 1.25, 0);
      break;
    }
    case 'axe': {
      const s = new THREE.CylinderGeometry(0.022, 0.022, 0.75, 6);
      s.translate(0, 0.25, 0);
      mesh(s, M.wood, parent);
      const head = new THREE.CylinderGeometry(0.16, 0.16, 0.025, 12, 1, false, 0, Math.PI);
      head.rotateZ(Math.PI / 2);
      mesh(head, M.steel, parent, 0, 0.52, 0);
      break;
    }
    case 'bow': {
      // held vertically in the left hand; the limbs curve forward (+Z)
      const R = 0.42;
      const arc = new THREE.TorusGeometry(R, 0.02, 5, 18, Math.PI * 0.9);
      arc.rotateZ(-Math.PI * 0.45);
      arc.rotateY(-Math.PI / 2);
      arc.translate(0, 0, -R);
      mesh(arc, M.wood, parent);
      const string = new THREE.CylinderGeometry(0.005, 0.005, 2 * R * Math.sin(Math.PI * 0.45), 3);
      mesh(string, celMaterial(0xe8e0d0), parent, 0, 0, -R + R * Math.cos(Math.PI * 0.45));
      break;
    }
  }
}
