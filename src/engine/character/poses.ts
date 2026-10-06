import type { Rig } from './model';
import type { CharacterLook } from './look';

/**
 * Poses are joint angles in radians. Conventions (all from the character's own point of view):
 *  - arm / leg `swing` > 0 moves the limb forward, `raise` / `spread` > 0 moves it outward;
 *  - `elbow` > 0 bends the forearm forward, `knee` > 0 bends the shin backward;
 *  - `lean` > 0 tips the upper body forward, `twist` > 0 turns it to the character's left.
 */
export interface Pose3 {
  /** Hip height offset (units). */
  y?: number;
  /** Body offset forward (units). */
  fwd?: number;
  lean?: number;
  twist?: number;
  tilt?: number;
  hipYaw?: number;
  /** Head nod (> 0 looks down) and turn (> 0 to its left). */
  nod?: number;
  turn?: number;
  armR?: [number, number, number];
  armL?: [number, number, number];
  legR?: [number, number, number];
  legL?: [number, number, number];
  /** Weapon rotation about the hand's X axis (π/2 = pointing forward when the arm hangs). */
  weapon?: number;
  weaponRoll?: number;
  /** Cape swing backward. */
  cape?: number;
  blink?: boolean;
  /** Lie down backward (KO): 0..1. */
  down?: number;
  /** Hide the weapon (overworld: weapons are put away). */
  sheathed?: boolean;
}

const DEF_ARM: [number, number, number] = [0, 0.2, 0.15];
const DEF_LEG: [number, number, number] = [0, 0.04, 0];

export function applyPose(rig: Rig, p: Pose3, look: CharacterLook): void {
  rig.hips.position.y = rig.dims.hipY + (p.y ?? 0);
  rig.hips.position.z = p.fwd ?? 0;
  rig.hips.rotation.set(0, p.hipYaw ?? 0, 0);
  rig.spine.rotation.set(p.lean ?? 0, p.twist ?? 0, p.tilt ?? 0);
  rig.neck.rotation.set(p.nod ?? 0, p.turn ?? 0, 0);
  const arm = (sh: typeof rig.shoulderR, el: typeof rig.elbowR, side: number, a: [number, number, number]) => {
    sh.rotation.set(-a[0], 0, side * a[1]);
    el.rotation.set(-a[2], 0, 0);
  };
  arm(rig.shoulderR, rig.elbowR, -1, p.armR ?? DEF_ARM);
  arm(rig.shoulderL, rig.elbowL, 1, p.armL ?? DEF_ARM);
  const leg = (th: typeof rig.thighR, kn: typeof rig.kneeR, side: number, l: [number, number, number]) => {
    th.rotation.set(-l[0], 0, side * l[1]);
    kn.rotation.set(l[2], 0, 0);
  };
  leg(rig.thighR, rig.kneeR, -1, p.legR ?? DEF_LEG);
  leg(rig.thighL, rig.kneeL, 1, p.legL ?? DEF_LEG);
  if (rig.weapon) {
    const bow = look.weapon === 'bow';
    rig.weapon.rotation.set(p.weapon ?? (bow ? 0 : Math.PI / 2), 0, p.weaponRoll ?? 0);
    rig.weapon.visible = !p.sheathed;
  }
  if (rig.cape) rig.cape.rotation.x = 0.12 + (p.cape ?? 0);
  if (rig.coat) rig.coat.rotation.x = -(p.lean ?? 0) * 0.3;
  const down = p.down ?? 0;
  rig.body.rotation.x = -down * (Math.PI / 2 - 0.08);
  rig.body.position.y = down * 0.14;
  rig.body.position.z = down * 0.5;
}

export interface AnimSpec {
  name: string;
  frames: number;
  fps: number;
  loop: boolean;
  pose: (i: number, n: number) => Pose3;
}

const TAU = Math.PI * 2;

// ---------------------------------------------------------------------------------------------
// overworld
// ---------------------------------------------------------------------------------------------

export const OVERWORLD_ANIMS: AnimSpec[] = [
  {
    name: 'idle', frames: 4, fps: 2.4, loop: true,
    pose: (i) => {
      const b = [0, -0.008, -0.016, -0.008][i];
      return { y: b, armR: [0.04, 0.2 - b * 2, 0.22], armL: [0.04, 0.2 - b * 2, 0.22], nod: 0.04, blink: i === 3, sheathed: true };
    },
  },
  {
    name: 'walk', frames: 6, fps: 9, loop: true,
    pose: (i, n) => {
      const p = (i / n) * TAU, s = Math.sin(p);
      const bob = -Math.abs(Math.cos(p)) * 0.025 + 0.012;
      return {
        y: bob, lean: 0.05,
        legR: [s * 0.5, 0.03, Math.max(0, -s) * 0.75 + 0.1], legL: [-s * 0.5, 0.03, Math.max(0, s) * 0.75 + 0.1],
        armR: [-s * 0.45, 0.18, 0.35], armL: [s * 0.45, 0.18, 0.35],
        twist: s * 0.06, cape: 0.15 + Math.abs(s) * 0.08, nod: 0.03, sheathed: true,
      };
    },
  },
];

// ---------------------------------------------------------------------------------------------
// battle
// ---------------------------------------------------------------------------------------------

/** Weapon-dependent ready stance. */
function stance(look: CharacterLook, b = 0): Pose3 {
  const w = look.weapon ?? 'none';
  if (w === 'bow') return { y: -0.02 + b, legR: [-0.25, 0.08, 0.2], legL: [0.25, 0.08, 0.15], armL: [1.15, 0.2, 0.15], armR: [0.5, 0.1, 1.3], weapon: Math.PI / 2, twist: 0.2, cape: 0.1 };
  if (w === 'staff') return { y: -0.02 + b, legR: [-0.22, 0.08, 0.2], legL: [0.25, 0.08, 0.15], armR: [0.55, 0.18, 0.9], armL: [0.3, 0.15, 0.6], weapon: 1.75, twist: 0.1, cape: 0.1 };
  if (w === 'spear') return { y: -0.03 + b, legR: [-0.3, 0.08, 0.25], legL: [0.3, 0.08, 0.2], armR: [0.6, 0.15, 0.8], armL: [0.9, 0.1, 0.5], weapon: 2.3, twist: 0.25, lean: 0.08, cape: 0.12 };
  return { y: -0.035 + b, lean: 0.1, legR: [-0.3, 0.1, 0.3], legL: [0.32, 0.1, 0.25], armR: [0.75, 0.2, 1.0], armL: [0.2, 0.25, 0.6], weapon: 2.2, twist: 0.25, cape: 0.15 };
}

export function battleAnims(look: CharacterLook): AnimSpec[] {
  const bow = look.weapon === 'bow';
  const staff = look.weapon === 'staff';
  return [
    {
      name: 'idle', frames: 4, fps: 5, loop: true,
      pose: (i) => ({ ...stance(look, [0, -0.008, -0.016, -0.008][i]), blink: i === 2 }),
    },
    {
      name: 'run', frames: 6, fps: 12, loop: true,
      pose: (i, n) => {
        const p = (i / n) * TAU, s = Math.sin(p);
        return {
          y: -Math.abs(Math.cos(p)) * 0.04 + 0.02, lean: 0.32,
          legR: [s * 0.8, 0.04, Math.max(0, -s) * 1.3 + 0.25], legL: [-s * 0.8, 0.04, Math.max(0, s) * 1.3 + 0.25],
          armR: [-s * 0.7 + 0.2, 0.15, 1.1], armL: [s * 0.7 + 0.2, 0.15, 1.1],
          weapon: bow ? 0.4 : 0.6, cape: 0.6 + Math.abs(s) * 0.2, nod: -0.1,
        };
      },
    },
    {
      name: 'jump', frames: 2, fps: 8, loop: false,
      pose: (i) => i === 0
        ? { y: 0.02, lean: 0.15, legR: [0.4, 0.06, 0.5], legL: [-0.3, 0.06, 0.3], armR: [1.8, 0.4, 0.3], armL: [1.5, 0.5, 0.3], weapon: bow ? 0.3 : 2.4, cape: -0.1 }
        : { y: 0.05, lean: 0.25, legR: [1.0, 0.08, 1.6], legL: [0.4, 0.08, 1.4], armR: [2.2, 0.5, 0.2], armL: [1.6, 0.6, 0.3], weapon: bow ? 0.3 : 2.6, cape: -0.2 },
    },
    {
      name: 'fall', frames: 2, fps: 8, loop: true,
      pose: (i) => ({ y: 0.03, lean: -0.05, legR: [0.45, 0.1, 0.6 + i * 0.1], legL: [-0.2, 0.1, 0.4], armR: [0.6, 0.9 + i * 0.1, 0.4], armL: [0.4, 1.0, 0.4], weapon: bow ? 0.3 : 1.6, cape: 0.7 + i * 0.1 }),
    },
    {
      name: 'cast', frames: 3, fps: 8, loop: false,
      pose: (i) => (<Pose3[]>[
        { ...stance(look), lean: -0.12, armR: [0.4, 0.3, 1.6], armL: [0.6, 0.3, 1.4], weapon: staff ? 2.6 : 2.2, nod: -0.1, cape: 0.2 },
        { ...stance(look), lean: -0.05, armR: [2.6, 0.2, 0.2], armL: [2.2, 0.4, 0.3], weapon: staff ? 0.2 : 2.6, nod: -0.25, cape: 0.3 },
        { ...stance(look), lean: 0.28, fwd: 0.05, armR: [1.5, 0.05, 0.05], armL: [1.4, 0.15, 0.1], weapon: staff ? 1.5 : 1.6, nod: 0.05, cape: 0.5, legR: [-0.45, 0.1, 0.4], legL: [0.45, 0.1, 0.1] },
      ])[i],
    },
    {
      name: 'shoot', frames: 3, fps: 9, loop: false,
      pose: (i) => (<Pose3[]>[
        { ...stance(look), armL: [1.5, 0.05, 0.0], armR: [1.4, 0.05, 1.8], weapon: Math.PI / 2, twist: 0.5 },
        { ...stance(look), armL: [1.55, 0.0, 0.0], armR: [1.35, 0.35, 2.4], weapon: Math.PI / 2, twist: 0.7, lean: -0.08 },
        { ...stance(look), armL: [1.55, 0.0, 0.0], armR: [0.6, 0.5, 0.6], weapon: Math.PI / 2, twist: 0.5, lean: -0.12 },
      ])[i],
    },
    {
      name: 'slash', frames: 3, fps: 12, loop: false,
      pose: (i) => (<Pose3[]>[
        { ...stance(look), lean: -0.15, twist: 0.6, armR: [2.7, 0.5, 0.4], armL: [0.5, 0.4, 0.4], weapon: 2.8, cape: 0.1 },
        { ...stance(look), lean: 0.4, fwd: 0.12, twist: -0.35, armR: [1.6, 0.15, 0.1], armL: [0.1, 0.5, 0.3], weapon: 1.6, cape: 0.5, legR: [-0.55, 0.1, 0.5], legL: [0.6, 0.1, 0.3] },
        { ...stance(look), lean: 0.5, fwd: 0.16, twist: -0.6, armR: [0.6, 0.35, 0.1], armL: [-0.2, 0.5, 0.3], weapon: 0.9, cape: 0.6, legR: [-0.6, 0.1, 0.6], legL: [0.65, 0.1, 0.3] },
      ])[i],
    },
    {
      name: 'hurt', frames: 2, fps: 6, loop: false,
      pose: (i) => ({ y: -0.02, lean: -0.35 - i * 0.12, fwd: -0.05 * i, nod: -0.3, armR: [-0.4, 0.6, 0.6], armL: [-0.3, 0.7, 0.6], legR: [0.25, 0.1, 0.3], legL: [-0.3, 0.1, 0.2], weapon: 1.2, cape: -0.2, blink: true }),
    },
    {
      name: 'guard', frames: 1, fps: 1, loop: true,
      pose: () => ({ ...stance(look), lean: 0.15, y: -0.06, armR: [1.3, 0.1, 1.5], armL: [1.4, 0.1, 1.6], weapon: bow || staff ? 1.0 : 2.9, weaponRoll: 1.2, legR: [-0.4, 0.12, 0.5], legL: [0.45, 0.12, 0.4], cape: 0.2 }),
    },
    {
      name: 'ko', frames: 1, fps: 1, loop: false,
      pose: () => ({ down: 1, armR: [0.3, 1.1, 0.3], armL: [0.1, 0.9, 0.4], legR: [0.2, 0.15, 0.3], legL: [0.05, 0.1, 0.1], weapon: 1.2, blink: true, cape: -0.4 }),
    },
  ];
}
