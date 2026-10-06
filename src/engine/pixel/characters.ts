import { PixelCanvas } from './PixelCanvas';
import { shade, mix } from './color';

/**
 * Procedural character art.
 *
 * Every character is a 2D puppet (hip, chest, head, two arms, two legs) drawn pixel by pixel with
 * shaded primitives and a soft outline. Poses are joint angles, so new animations are a few numbers
 * and every outfit automatically works in every pose.
 *
 * Two sheet formats share the same world scale (16 texels per unit):
 *  - overworld: 32 × 32 frames, 3 view rows (down / up / side) — the side row is mirrored for right;
 *  - battle:    64 × 64 frames, side view only, with plenty of transparent room for weapons, wide
 *               attack poses, jumps and knockback.
 */

export type HairStyle = 'short' | 'long' | 'ponytail' | 'spiky' | 'bob' | 'bun' | 'none';
export type Outfit = 'tunic' | 'robe' | 'dress' | 'coat' | 'armor' | 'apron';
export type Hat = 'none' | 'hood' | 'wide' | 'cap' | 'helmet' | 'kerchief';
export type Weapon = 'none' | 'sword' | 'staff' | 'bow' | 'dagger' | 'spear' | 'axe';

export interface CharacterLook {
  skin: number;
  hair: number;
  hairStyle: HairStyle;
  eyes?: number;
  outfit: Outfit;
  top: number;
  bottom: number;
  boots: number;
  accent: number;
  cape?: number;
  hat?: Hat;
  hatColor?: number;
  beard?: number;
  weapon?: Weapon;
  /** 0.85 child … 1 adult … 1.1 tall. Scales limb lengths. */
  height?: number;
  /** 1 normal, >1 stout. */
  girth?: number;
}

export type View = 'down' | 'up' | 'side';

/** Joint angles in radians. 0 = limb hanging straight down; positive swings toward the facing side. */
export interface Pose {
  /** Torso lean (positive = forward). */
  lean: number;
  /** Hip offset in px (x forward, y down). */
  hipX: number;
  hipY: number;
  headTilt: number;
  armN: [number, number];
  armF: [number, number];
  legN: [number, number];
  legF: [number, number];
  /** Front / back view: foot lift in px for each leg (n = screen-left leg). */
  liftN?: number;
  liftF?: number;
  /** Rotate the whole figure about its centre (KO, flips). */
  roll?: number;
  /** Squash (<1) / stretch (>1) applied around the feet. */
  squash?: number;
  /** Weapon angle relative to the near hand (side view). */
  weaponAngle?: number;
  /** Hide the weapon. */
  sheathed?: boolean;
  /** Eyes closed. */
  blink?: boolean;
  /** Hair / cape trailing offset (px, positive = behind). */
  flow?: number;
}

export const NEUTRAL: Pose = {
  lean: 0, hipX: 0, hipY: 0, headTilt: 0,
  armN: [0.05, -0.1], armF: [-0.05, -0.1],
  legN: [0, 0], legF: [0, 0],
};

interface Proportions {
  headR: number;
  headRy: number;
  torso: number;
  torsoW: number;
  leg: number;
  arm: number;
  limbR: number;
  armR: number;
  foot: number;
  ground: number;
}

const OVERWORLD: Proportions = { headR: 5.6, headRy: 5.3, torso: 7, torsoW: 3.6, leg: 7, arm: 7, limbR: 1.5, armR: 1.3, foot: 3, ground: 30 };
const BATTLE: Proportions = { headR: 7.2, headRy: 6.8, torso: 10, torsoW: 4.6, leg: 11, arm: 10.5, limbR: 2.0, armR: 1.75, foot: 4, ground: 60 };

type V2 = { x: number; y: number };
const v = (x: number, y: number): V2 => ({ x, y });
const add = (a: V2, b: V2): V2 => ({ x: a.x + b.x, y: a.y + b.y });
/** A limb segment of length l hanging at angle a (0 = down, + = toward +x). */
const seg = (l: number, a: number): V2 => ({ x: Math.sin(a) * l, y: Math.cos(a) * l });

/** Cylindrical shading across a limb: `side` -1..1 across, light from the upper-left / front. */
function limbShade(c: number, side: number, t: number, k = 0.55): number {
  return shade(c, -side * k * 0.8 + (side < -0.55 ? 0.18 : 0) - t * 0.12);
}

class PuppetPainter {
  constructor(
    private pc: PixelCanvas,
    private look: CharacterLook,
    private P: Proportions,
    private ox: number,
    private oy: number,
  ) {}

  private hs(): number {
    return this.look.height ?? 1;
  }

  draw(view: View, pose: Pose): void {
    if (view === 'side') this.drawSide(pose);
    else this.drawFront(pose, view === 'up');
  }

  // ------------------------------------------------------------------------------------------
  // side view (facing +x)
  // ------------------------------------------------------------------------------------------
  private drawSide(p: Pose): void {
    const { P, look } = this;
    const hs = this.hs();
    const girth = look.girth ?? 1;
    const legL = P.leg * hs, armL = P.arm * hs, torsoL = P.torso * hs;
    const cx = this.ox, ground = this.oy + P.ground;
    const hip = v(cx + p.hipX, ground - legL - 1 + p.hipY);
    const chest = add(hip, { x: Math.sin(p.lean) * torsoL, y: -Math.cos(p.lean) * torsoL });
    const headC = add(chest, { x: Math.sin(p.lean + p.headTilt) * (P.headRy * 0.95) + 0.5, y: -Math.cos(p.lean + p.headTilt) * (P.headRy * 0.95) });
    const shoulder = add(chest, { x: Math.sin(p.lean) * -1.2, y: Math.cos(p.lean) * 1.6 });

    const leg = (a: [number, number]) => {
      const knee = add(hip, seg(legL * 0.5, a[0]));
      const foot = add(knee, seg(legL * 0.5, a[0] + a[1]));
      return { knee, foot };
    };
    const arm = (a: [number, number], sh: V2) => {
      const elbow = add(sh, seg(armL * 0.5, a[0] + p.lean));
      const hand = add(elbow, seg(armL * 0.5, a[0] + a[1] + p.lean));
      return { elbow, hand };
    };
    const lf = leg(p.legF), ln = leg(p.legN);
    const shF = add(shoulder, v(-0.8, 0)), shN = add(shoulder, v(0.6, 0));
    const af = arm(p.armF, shF), an = arm(p.armN, shN);
    const flow = p.flow ?? 0;

    // cape behind everything
    if (look.cape !== undefined) this.sideCape(chest, hip, p.lean, flow);
    // far arm + far leg, darker
    this.sideArm(shF, af.elbow, af.hand, true);
    this.sideLeg(hip, lf.knee, lf.foot, true);
    if (look.hairStyle === 'long' || look.hairStyle === 'ponytail') this.sideHairBack(headC, chest, flow);
    this.sideLeg(hip, ln.knee, ln.foot, false);
    this.sideTorso(hip, chest, p.lean, girth);
    this.sideHead(headC, p);
    if (!p.sheathed && look.weapon && look.weapon !== 'none') this.weapon(an.hand, (p.weaponAngle ?? 0.9) + p.lean, false);
    this.sideArm(shN, an.elbow, an.hand, false);
  }

  private sideLeg(hip: V2, knee: V2, foot: V2, far: boolean): void {
    const { look, P } = this;
    const k = far ? -0.28 : 0;
    const pants = shade(look.bottom, k);
    const boot = shade(look.boots, k);
    const r = P.limbR;
    this.pc.thickLine(hip.x, hip.y, knee.x, knee.y, r + 0.2, (_x, _y, t, s) => limbShade(pants, s, t));
    const bootStart = add(knee, { x: (foot.x - knee.x) * 0.35, y: (foot.y - knee.y) * 0.35 });
    this.pc.thickLine(knee.x, knee.y, bootStart.x, bootStart.y, r, (_x, _y, t, s) => limbShade(pants, s, t));
    this.pc.thickLine(bootStart.x, bootStart.y, foot.x, foot.y, r, (_x, _y, t, s) => limbShade(boot, s, t));
    // foot points forward
    const fl = P.foot;
    this.pc.thickLine(foot.x - 0.5, foot.y, foot.x + fl * 0.7, foot.y + 0.3, r * 0.8, (_x, _y, _t, s) => limbShade(boot, s, 0.2));
  }

  private sideArm(sh: V2, elbow: V2, hand: V2, far: boolean): void {
    const { look, P } = this;
    const k = far ? -0.3 : 0;
    const sleeve = shade(look.outfit === 'armor' ? look.accent : look.top, k);
    const r = P.armR;
    this.pc.thickLine(sh.x, sh.y, elbow.x, elbow.y, r + 0.25, (_x, _y, t, s) => limbShade(sleeve, s, t));
    const wrist = add(elbow, { x: (hand.x - elbow.x) * 0.7, y: (hand.y - elbow.y) * 0.7 });
    this.pc.thickLine(elbow.x, elbow.y, wrist.x, wrist.y, r, (_x, _y, t, s) => limbShade(sleeve, s, t));
    this.pc.ellipse(hand.x, hand.y, r * 0.95 + 0.2, r * 0.95 + 0.2, (_x, _y, nx, ny) => shade(shade(look.skin, k), -(nx + ny) * 0.25));
  }

  private sideTorso(hip: V2, chest: V2, lean: number, girth: number): void {
    const { look, P } = this;
    const w = P.torsoW * girth;
    const top = look.top;
    // body
    this.pc.thickLine(hip.x, hip.y - 0.5, chest.x, chest.y + 1, w, (x, _y, t, s) => {
      const across = -s; // + toward the front
      let c = limbShade(top, -across * 0.9, t * 0.6, 0.5);
      if (look.outfit === 'armor' && t > 0.45) c = shade(look.accent, across * 0.4 + 0.1);
      if (look.outfit === 'coat' && Math.abs(x - (chest.x + w * 0.55)) < 0.7) c = shade(look.accent, 0);
      if (look.outfit === 'apron' && across > 0.15) c = shade(look.accent, across * 0.25);
      return c;
    });
    // skirt / tunic hem below the hip
    const hemLen = look.outfit === 'robe' || look.outfit === 'dress' ? P.leg * 0.85 : look.outfit === 'coat' ? P.leg * 0.55 : P.leg * 0.3;
    const hemCol = look.outfit === 'apron' ? look.top : top;
    for (let j = 0; j <= hemLen; j++) {
      const t = j / Math.max(1, hemLen);
      const flare = w + 0.3 + t * (look.outfit === 'dress' || look.outfit === 'robe' ? 2.2 : 1.2);
      const yy = Math.round(hip.y + j - 1);
      const xc = hip.x - Math.sin(lean) * j * 0.5;
      for (let x = Math.floor(xc - flare); x <= Math.ceil(xc + flare); x++) {
        const s = (x + 0.5 - xc) / flare;
        if (Math.abs(s) > 1) continue;
        let c = limbShade(hemCol, -s * 0.9, t, 0.45);
        if (j === Math.floor(hemLen)) c = shade(c, -0.25);
        if (look.outfit === 'apron' && s > 0) c = shade(look.accent, s * 0.2 - t * 0.1);
        this.pc.set(x, yy, c);
      }
    }
    // belt
    const by = Math.round(hip.y - 1);
    for (let x = Math.floor(hip.x - w); x <= Math.ceil(hip.x + w); x++) {
      if (this.pc.alpha(x, by) > 0) this.pc.set(x, by, shade(look.accent, x > hip.x ? 0.1 : -0.2));
    }
    if (look.outfit !== 'robe') this.pc.set(Math.round(hip.x + w * 0.6), by, 0xe8c860);
  }

  private sideCape(chest: V2, hip: V2, lean: number, flow: number): void {
    const { look, P } = this;
    const c = look.cape!;
    const len = P.torso + P.leg * 0.7;
    for (let j = 0; j < len; j++) {
      const t = j / len;
      const yy = Math.round(chest.y + j);
      const back = chest.x - P.torsoW - 0.5 - t * (2.5 + flow) - Math.sin(lean) * j * 0.6;
      const front = chest.x - P.torsoW * 0.2 - t * 1.0 + (hip.x - chest.x) * t;
      for (let x = Math.floor(back); x <= Math.ceil(front); x++) {
        const s = (x - back) / Math.max(1, front - back);
        this.pc.set(x, yy, shade(c, -0.35 + s * 0.3 - t * 0.2 + (j % 5 === 0 ? -0.08 : 0)));
      }
    }
  }

  private headShade(base: number, nx: number, ny: number): number {
    return shade(base, -(nx * 0.35 + ny * 0.55) + 0.05);
  }

  private sideHead(c: V2, p: Pose): void {
    const { look, P } = this;
    const r = P.headR, ry = P.headRy;
    const skin = look.skin;
    // skull + face
    this.pc.ellipse(c.x, c.y, r, ry, (_x, _y, nx, ny) => this.headShade(skin, nx * 0.4 - 0.3, ny));
    // chin / jaw toward the front
    this.pc.ellipse(c.x + r * 0.35, c.y + ry * 0.45, r * 0.55, ry * 0.45, (_x, _y, nx, ny) => this.headShade(skin, nx * 0.2, ny * 0.6));
    // hair cap: covers the back and top
    const hair = look.hair;
    const style = look.hairStyle;
    const hat = look.hat ?? 'none';
    if (style !== 'none' && hat !== 'hood' && hat !== 'helmet') {
      this.pc.ellipse(c.x - 0.4, c.y - 0.6, r + 0.6, ry + 0.4, (x, y, nx, ny) => {
        // keep the face clear: front-lower quadrant shows skin
        const fx = (x + 0.5 - c.x) / r, fy = (y + 0.5 - c.y) / ry;
        const face = fx > -0.05 && fy > -0.25 - (style === 'spiky' ? 0.1 : 0);
        if (face) return -1;
        return this.headShade(hair, nx, ny);
      });
      // bangs: a jagged fringe over the forehead
      for (let i = 0; i < Math.ceil(r); i++) {
        const x = Math.round(c.x + i);
        const len = 1 + ((i * 5 + 3) % 3 === 0 ? 2 : 1) + (style === 'spiky' ? 1 : 0);
        for (let j = 0; j < len; j++) this.pc.set(x, Math.round(c.y - ry * 0.3) + j, shade(hair, -0.05 - j * 0.12));
      }
      // sideburn
      this.pc.rect(Math.round(c.x - 1), Math.round(c.y - 1), 2, Math.round(ry * 0.65), shade(hair, -0.25));
      if (style === 'spiky') {
        for (let i = -2; i <= 2; i++) {
          const bx = c.x + i * 2.4 - 1, by = c.y - ry - 0.5;
          this.pc.thickLine(bx, by + 2, bx - 2.5, by - 1.5 + Math.abs(i) * 0.5, 0.9, shade(hair, 0.1 - Math.abs(i) * 0.05));
        }
      }
      if (style === 'bun') this.pc.ellipse(c.x - r * 0.6, c.y - ry * 0.7, r * 0.42, ry * 0.42, (_x, _y, nx, ny) => this.headShade(hair, nx, ny));
      if (style === 'bob') this.pc.rect(Math.round(c.x - r), Math.round(c.y), Math.round(r * 0.9), Math.round(ry * 0.75), shade(hair, -0.15));
    }
    // eye
    if (hat !== 'helmet') {
      const ex = Math.round(c.x + r * 0.5), ey = Math.round(c.y + ry * 0.05);
      const eyeC = look.eyes ?? 0x2a2440;
      if (p.blink) this.pc.set(ex, ey + 1, shade(skin, -0.5));
      else {
        this.pc.set(ex, ey, eyeC);
        this.pc.set(ex, ey + 1, eyeC);
        if (P.headR > 6.5) {
          this.pc.set(ex - 1, ey, eyeC);
          this.pc.set(ex - 1, ey + 1, eyeC);
          this.pc.set(ex, ey, mix(eyeC, 0xffffff, 0.6));
          this.pc.set(ex, ey - 1, shade(look.hair, -0.4));
          this.pc.set(ex - 1, ey - 1, shade(look.hair, -0.4));
        }
      }
      // cheek blush
      this.pc.set(ex - 1, ey + 2 + (P.headR > 6.5 ? 1 : 0), mix(skin, 0xe07a7a, 0.4));
    }
    if (look.beard !== undefined) {
      this.pc.ellipse(c.x + r * 0.3, c.y + ry * 0.6, r * 0.6, ry * 0.45, (_x, _y, nx, ny) => this.headShade(look.beard!, nx, ny));
    }
    this.sideHat(c, r, ry);
  }

  private sideHat(c: V2, r: number, ry: number): void {
    const { look } = this;
    const hat = look.hat ?? 'none';
    const hc = look.hatColor ?? look.accent;
    if (hat === 'hood') {
      this.pc.ellipse(c.x - 0.6, c.y - 0.4, r + 1.2, ry + 1.0, (x, y, nx, ny) => {
        const fx = (x + 0.5 - c.x) / r, fy = (y + 0.5 - c.y) / ry;
        if (fx > 0.25 && fy > -0.45) return -1;
        return this.headShade(hc, nx, ny);
      });
    } else if (hat === 'wide') {
      this.pc.ellipse(c.x - 0.5, c.y - ry * 0.55, r + 0.8, ry * 0.65, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
      this.pc.rect(Math.round(c.x - r - 3), Math.round(c.y - ry * 0.35), Math.round(2 * r + 6), 2, shade(hc, -0.15));
      this.pc.rect(Math.round(c.x - r), Math.round(c.y - ry * 0.55), Math.round(2 * r), 1, shade(look.accent, 0.1));
    } else if (hat === 'cap') {
      this.pc.ellipse(c.x - 0.5, c.y - ry * 0.45, r + 0.4, ry * 0.65, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
      this.pc.rect(Math.round(c.x + r * 0.2), Math.round(c.y - ry * 0.35), Math.round(r * 1.1), 1, shade(hc, -0.3));
    } else if (hat === 'helmet') {
      this.pc.ellipse(c.x - 0.3, c.y - 0.3, r + 0.9, ry + 0.8, (x, y, nx, ny) => {
        const fx = (x + 0.5 - c.x) / r, fy = (y + 0.5 - c.y) / ry;
        if (fx > 0.35 && fy > -0.15 && fy < 0.45) return -1;
        return shade(hc, -(nx * 0.5 + ny * 0.6) + (nx < -0.3 && ny < -0.2 ? 0.4 : 0));
      });
      // visor slit
      this.pc.rect(Math.round(c.x + r * 0.35), Math.round(c.y), Math.round(r * 0.7), 1, 0x1a1828);
    } else if (hat === 'kerchief') {
      this.pc.ellipse(c.x - 0.4, c.y - ry * 0.4, r + 0.5, ry * 0.7, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
      this.pc.thickLine(c.x - r, c.y - 1, c.x - r - 2, c.y + 2, 0.8, shade(hc, -0.2));
    }
  }

  private sideHairBack(c: V2, chest: V2, flow: number): void {
    const { look, P } = this;
    if (look.hairStyle === 'long') {
      const len = P.torso * 0.9;
      for (let j = 0; j < len; j++) {
        const t = j / len;
        const yy = Math.round(c.y + j);
        const x0 = c.x - P.headR - 0.2 - t * (1.5 + flow), x1 = c.x - P.headR * 0.1 - t * 2;
        for (let x = Math.floor(x0); x <= Math.ceil(x1); x++) this.pc.set(x, yy, shade(look.hair, -0.25 - t * 0.2 + ((x * 3) % 4 === 0 ? -0.1 : 0)));
      }
    } else {
      // ponytail
      const base = v(c.x - P.headR * 0.85, c.y - P.headRy * 0.2);
      const tip = v(base.x - 2.5 - flow, base.y + P.torso * 0.7);
      this.pc.thickLine(base.x, base.y, tip.x, tip.y, 1.6, (_x, _y, t, s) => limbShade(look.hair, s, t, 0.4));
      this.pc.set(Math.round(base.x + 1), Math.round(base.y), look.accent);
    }
    void chest;
  }

  private weapon(hand: V2, ang: number, front: boolean): void {
    const { look } = this;
    const w = look.weapon!;
    const scale = this.P.headR / BATTLE.headR;
    const dir = v(Math.sin(ang), -Math.cos(ang)); // ang 0 = pointing up
    const L = (n: number) => n * scale;
    const metal = 0xd0d4e0, wood = 0x7a5034, gold = 0xe0b850;
    const line = (a: number, b: number, r: number, col: number | ((x: number, y: number, t: number, s: number) => number)) =>
      this.pc.thickLine(hand.x + dir.x * a, hand.y + dir.y * a, hand.x + dir.x * b, hand.y + dir.y * b, r, col);
    const blade = (x: number, y: number, t: number, s: number) => {
      void x; void y;
      return shade(metal, s > 0.2 ? 0.45 : s < -0.3 ? -0.35 : 0.05 - t * 0.1);
    };
    switch (w) {
      case 'sword':
        line(-L(3), 0, Math.max(0.6, L(0.9)), shade(wood, -0.1));
        line(-0.2, 0.3, L(2.2), gold); // cross-guard drawn as a short wide dab
        this.pc.thickLine(hand.x - dir.y * L(2.4), hand.y + dir.x * L(2.4), hand.x + dir.y * L(2.4), hand.y - dir.x * L(2.4), Math.max(0.6, L(0.8)), gold);
        line(L(1), L(17), Math.max(0.8, L(1.3)), blade);
        break;
      case 'dagger':
        line(-L(2), 0, Math.max(0.6, L(0.8)), wood);
        line(L(0.5), L(8), Math.max(0.7, L(1.0)), blade);
        break;
      case 'staff':
        line(-L(10), L(18), Math.max(0.7, L(1.0)), (_x, _y, _t, s) => shade(wood, -s * 0.4));
        this.pc.ellipse(hand.x + dir.x * L(20), hand.y + dir.y * L(20), L(2.4) + 0.4, L(2.4) + 0.4, (x, y, nx, ny) => {
          this.pc.setEmissive(x, y, 0x60c0ff);
          return shade(0x70d0ff, -(nx + ny) * 0.5 + 0.3);
        });
        break;
      case 'spear':
        line(-L(12), L(16), Math.max(0.6, L(0.9)), wood);
        line(L(16), L(22), Math.max(0.8, L(1.3)), blade);
        break;
      case 'axe':
        line(-L(4), L(12), Math.max(0.7, L(1.0)), wood);
        this.pc.ellipse(hand.x + dir.x * L(10) + dir.y * L(2.5), hand.y + dir.y * L(10) - dir.x * L(2.5), L(3.2), L(3.2), (_x, _y, nx, ny) => shade(metal, -(nx + ny) * 0.4));
        break;
      case 'bow': {
        // a bow is held vertically in front; ang is its tilt
        const perp = v(-dir.y, dir.x);
        const R = L(11);
        let prev: V2 | null = null;
        for (let i = 0; i <= 12; i++) {
          const a = -1 + (i / 12) * 2;
          const p = v(hand.x + dir.x * a * R + perp.x * (1 - a * a) * L(4), hand.y + dir.y * a * R + perp.y * (1 - a * a) * L(4));
          if (prev) this.pc.thickLine(prev.x, prev.y, p.x, p.y, Math.max(0.6, L(0.9)), shade(wood, 0.1));
          prev = p;
        }
        this.pc.line(hand.x - dir.x * R, hand.y - dir.y * R, hand.x + dir.x * R, hand.y + dir.y * R, 0xe8e0d0);
        break;
      }
    }
    void front;
  }

  // ------------------------------------------------------------------------------------------
  // front / back view
  // ------------------------------------------------------------------------------------------
  private drawFront(p: Pose, back: boolean): void {
    const { P, look } = this;
    const hs = this.hs();
    const girth = look.girth ?? 1;
    const legL = P.leg * hs, torsoL = P.torso * hs, armL = P.arm * hs;
    const cx = this.ox + 0.5 * 0, ground = this.oy + P.ground;
    const hip = v(cx, ground - legL - 1 + p.hipY);
    const chest = v(cx, hip.y - torsoL);
    const headC = v(cx, chest.y - P.headRy * 0.95);
    const w = P.torsoW * girth;

    // legs (screen-left leg first)
    const legX = [cx - w * 0.45, cx + w * 0.45];
    const lifts = [p.liftN ?? 0, p.liftF ?? 0];
    const legs = () => {
      for (let i = 0; i < 2; i++) {
        const lx = legX[i];
        const footY = ground - 1 - lifts[i];
        this.pc.thickLine(lx, hip.y, lx, footY - 2, P.limbR, (_x, _y, t, s) => limbShade(look.bottom, s * (i ? 1 : 1), t));
        this.pc.thickLine(lx, footY - 2.5, lx, footY, P.limbR + 0.1, (_x, _y, t, s) => limbShade(look.boots, s, t));
      }
    };
    // arms hang by the sides; swing shortens / lengthens them a touch
    const arms = (farOnly: boolean | null) => {
      for (let i = 0; i < 2; i++) {
        const sgn = i === 0 ? -1 : 1;
        const swing = i === 0 ? p.armN[0] : p.armF[0];
        if (farOnly !== null && farOnly !== (swing < 0)) continue;
        const sh = v(cx + sgn * (w + P.armR * 0.6), chest.y + 1.5);
        const hand = v(sh.x + sgn * 1.0, sh.y + armL * (0.92 - Math.abs(swing) * 0.15));
        const col = look.outfit === 'armor' ? look.accent : look.top;
        this.pc.thickLine(sh.x, sh.y, hand.x, hand.y - 1, P.armR, (_x, _y, t, s) => limbShade(col, s * sgn * -1 * -1, t));
        this.pc.ellipse(hand.x, hand.y, P.armR + 0.2, P.armR + 0.2, (_x, _y, nx, ny) => shade(look.skin, -(nx + ny) * 0.3));
      }
    };

    if (look.cape !== undefined && !back) this.frontCape(chest, w, P, false);
    if (back && (look.hairStyle === 'long')) {
      /* drawn after torso */
    }
    legs();
    arms(null);
    // torso
    this.pc.thickLine(cx, hip.y - 0.5, cx, chest.y + 1.2, w, (x, _y, t, s) => {
      let c = limbShade(look.top, s, t * 0.5, 0.45);
      if (!back) {
        if (look.outfit === 'coat' && Math.abs(x + 0.5 - cx) < 1) c = shade(look.accent, 0.05);
        if (look.outfit === 'armor' && t > 0.4) c = shade(look.accent, -s * 0.3 + 0.15);
        if (look.outfit === 'apron') c = shade(look.accent, -s * 0.2);
      }
      return c;
    });
    // collar
    if (!back) {
      this.pc.set(Math.round(cx - 1), Math.round(chest.y + 1), shade(look.top, 0.35));
      this.pc.set(Math.round(cx), Math.round(chest.y + 1), shade(look.top, 0.35));
    }
    // hem
    const hemLen = look.outfit === 'robe' || look.outfit === 'dress' ? legL * 0.82 : look.outfit === 'coat' ? legL * 0.5 : legL * 0.28;
    for (let j = 0; j <= hemLen; j++) {
      const t = j / Math.max(1, hemLen);
      const flare = w + 0.3 + t * (look.outfit === 'dress' || look.outfit === 'robe' ? 1.8 : 0.8);
      const yy = Math.round(hip.y + j - 1);
      for (let x = Math.floor(cx - flare); x <= Math.ceil(cx + flare); x++) {
        const s = (x + 0.5 - cx) / flare;
        if (Math.abs(s) > 1) continue;
        let c = limbShade(look.outfit === 'apron' ? look.top : look.top, s, t, 0.4);
        if (!back && look.outfit === 'apron' && Math.abs(s) < 0.6) c = shade(look.accent, -s * 0.2 - t * 0.1);
        if (!back && look.outfit === 'coat' && Math.abs(x + 0.5 - cx) < 1) c = shade(look.bottom, -0.2);
        if (j === Math.floor(hemLen)) c = shade(c, -0.25);
        this.pc.set(x, yy, c);
      }
    }
    // belt
    const by = Math.round(hip.y - 1);
    for (let x = Math.floor(cx - w); x <= Math.ceil(cx + w); x++) if (this.pc.alpha(x, by) > 0) this.pc.set(x, by, shade(look.accent, -0.1));
    if (!back && look.outfit !== 'robe') this.pc.set(Math.round(cx), by, 0xe8c860);

    if (look.cape !== undefined && back) this.frontCape(chest, w, P, true);
    this.frontHead(headC, back, p);
  }

  private frontCape(chest: V2, w: number, P: Proportions, back: boolean): void {
    const c = this.look.cape!;
    const len = P.torso + P.leg * (back ? 0.8 : 0.75);
    for (let j = 0; j < len; j++) {
      const t = j / len;
      const half = w + 1 + t * 2;
      const yy = Math.round(chest.y + j + 0.5);
      for (let x = Math.floor(this.ox - half); x <= Math.ceil(this.ox + half); x++) {
        const s = (x + 0.5 - this.ox) / half;
        if (!back && Math.abs(s) < 0.75) continue;
        this.pc.set(x, yy, shade(c, -s * 0.3 - t * 0.25 + (Math.abs(Math.round(s * 4)) % 2 ? -0.08 : 0) - (back ? 0 : 0.2)));
      }
    }
  }

  private frontHead(c: V2, back: boolean, p: Pose): void {
    const { look, P } = this;
    const r = P.headR, ry = P.headRy;
    const hat = look.hat ?? 'none';
    const style = look.hairStyle;
    if (back && style === 'long' && hat !== 'hood') {
      this.pc.ellipse(c.x, c.y + ry * 0.9, r * 0.95, ry * 1.1, (_x, _y, nx, ny) => this.headShade(look.hair, nx, ny * 0.5));
    }
    if (!back && style === 'long' && hat !== 'hood') {
      // locks either side of the face
      this.pc.rect(Math.round(c.x - r - 0.5), Math.round(c.y), 2, Math.round(ry * 1.3), shade(look.hair, -0.2));
      this.pc.rect(Math.round(c.x + r - 1.5), Math.round(c.y), 2, Math.round(ry * 1.3), shade(look.hair, -0.35));
    }
    this.pc.ellipse(c.x, c.y, r, ry, (_x, _y, nx, ny) => this.headShade(look.skin, nx, ny));
    if (style !== 'none' && hat !== 'hood' && hat !== 'helmet') {
      this.pc.ellipse(c.x, c.y - 0.6, r + 0.6, ry + 0.4, (x, y, nx, ny) => {
        if (back) return this.headShade(look.hair, nx, ny);
        const fy = (y + 0.5 - c.y) / ry, fx = (x + 0.5 - c.x) / r;
        // fringe line: jagged across the forehead, longer at the temples
        const fringe = -0.25 + Math.abs(fx) * 0.55 + (((x * 7) >>> 0) % 3 === 0 ? 0.12 : 0);
        if (fy > fringe && Math.abs(fx) < 0.92) return -1;
        return this.headShade(look.hair, nx, ny);
      });
      if (style === 'spiky') {
        for (let i = -2; i <= 2; i++) {
          const bx = c.x + i * 2.3;
          this.pc.thickLine(bx, c.y - ry + 1, bx + i * 0.7, c.y - ry - 2.2 + Math.abs(i) * 0.6, 0.9, shade(look.hair, 0.15 - Math.abs(i) * 0.08));
        }
      }
      if (style === 'bun') this.pc.ellipse(c.x, c.y - ry - 0.5, r * 0.45, ry * 0.4, (_x, _y, nx, ny) => this.headShade(look.hair, nx, ny));
      if (style === 'ponytail' && back) this.pc.thickLine(c.x, c.y, c.x, c.y + P.torso * 0.8, 1.6, (_x, _y, t, s) => limbShade(look.hair, s, t));
      if (style === 'bob') {
        this.pc.rect(Math.round(c.x - r - 0.5), Math.round(c.y - 1), 2, Math.round(ry * 0.9), shade(look.hair, -0.15));
        this.pc.rect(Math.round(c.x + r - 1.5), Math.round(c.y - 1), 2, Math.round(ry * 0.9), shade(look.hair, -0.3));
      }
    }
    if (!back && hat !== 'helmet') {
      const eyeC = look.eyes ?? 0x2a2440;
      const ey = Math.round(c.y + ry * 0.12);
      const dx = Math.round(r * 0.42);
      for (const sx of [-1, 1]) {
        const ex = Math.round(c.x + sx * dx - (sx < 0 ? 1 : 0));
        if (p.blink) this.pc.set(ex, ey + 1, shade(look.skin, -0.5));
        else {
          this.pc.set(ex, ey, eyeC);
          this.pc.set(ex, ey + 1, eyeC);
          if (P.headR > 6.5) this.pc.set(ex, ey, mix(eyeC, 0xffffff, 0.6));
        }
        this.pc.set(ex + (sx < 0 ? -1 : 1), ey + 2, mix(look.skin, 0xe07a7a, 0.35));
      }
      if (look.beard !== undefined) {
        this.pc.ellipse(c.x, c.y + ry * 0.62, r * 0.75, ry * 0.42, (_x, _y, nx, ny) => this.headShade(look.beard!, nx, ny));
      }
    }
    this.frontHat(c, r, ry, back);
  }

  private frontHat(c: V2, r: number, ry: number, back: boolean): void {
    const { look } = this;
    const hat = look.hat ?? 'none';
    const hc = look.hatColor ?? look.accent;
    if (hat === 'hood') {
      this.pc.ellipse(c.x, c.y - 0.3, r + 1.2, ry + 1.0, (x, y, nx, ny) => {
        if (!back) {
          const fx = (x + 0.5 - c.x) / r, fy = (y + 0.5 - c.y) / ry;
          if (Math.abs(fx) < 0.68 && fy > -0.45) return -1;
        }
        return this.headShade(hc, nx, ny);
      });
    } else if (hat === 'wide') {
      this.pc.ellipse(c.x, c.y - ry * 0.55, r + 0.6, ry * 0.62, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
      this.pc.ellipse(c.x, c.y - ry * 0.25, r + 3.2, 1.6, (_x, _y, nx, ny) => shade(hc, -ny * 0.3 - nx * 0.15 - 0.1));
    } else if (hat === 'cap') {
      this.pc.ellipse(c.x, c.y - ry * 0.45, r + 0.4, ry * 0.62, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
    } else if (hat === 'helmet') {
      this.pc.ellipse(c.x, c.y - 0.3, r + 0.9, ry + 0.8, (x, y, nx, ny) => {
        const fy = (y + 0.5 - c.y) / ry, fx = (x + 0.5 - c.x) / r;
        if (!back && Math.abs(fx) < 0.55 && fy > -0.1 && fy < 0.45) return -1;
        return shade(hc, -(nx * 0.5 + ny * 0.6) + (nx < -0.3 && ny < -0.2 ? 0.4 : 0));
      });
      if (!back) this.pc.rect(Math.round(c.x - r * 0.55), Math.round(c.y + 0.5), Math.round(r * 1.1), 1, 0x1a1828);
    } else if (hat === 'kerchief') {
      this.pc.ellipse(c.x, c.y - ry * 0.42, r + 0.5, ry * 0.66, (_x, _y, nx, ny) => this.headShade(hc, nx, ny));
    }
  }

}

/**
 * A PixelCanvas whose `set` ignores colour -1, so shape callbacks can carve holes (faces in hoods,
 * the visor of a helmet) without extra mask logic.
 */
class SkipCanvas extends PixelCanvas {
  override set(x: number, y: number, c: number, a = 255): void {
    if (c < 0) return;
    super.set(x, y, c, a);
  }
}

function newCanvas(w: number, h: number): PixelCanvas {
  return new SkipCanvas(w, h);
}

// ============================================================================================
// sheets
// ============================================================================================

export interface AnimDef {
  row: number;
  frames: number;
  fps: number;
  loop: boolean;
}

export interface SheetInfo {
  canvas: PixelCanvas;
  frameW: number;
  frameH: number;
  cols: number;
  rows: number;
  anims: Record<string, AnimDef>;
}

/** Overworld walk / idle poses. */
function walkPose(view: View, i: number, run = false): Pose {
  const ph = (i / 4) * Math.PI * 2;
  const s = Math.sin(ph);
  const bob = Math.abs(Math.cos(ph)) > 0.7 ? 0 : -1;
  if (view === 'side') {
    const amp = run ? 0.75 : 0.55;
    return {
      ...NEUTRAL,
      lean: run ? 0.15 : 0.04,
      hipY: bob,
      legN: [s * amp, -Math.max(0, -s) * 0.6 - 0.05],
      legF: [-s * amp, -Math.max(0, s) * 0.6 - 0.05],
      armN: [-s * amp * 0.9, -0.3],
      armF: [s * amp * 0.9, -0.3],
      sheathed: true,
    };
  }
  return { ...NEUTRAL, hipY: bob, liftN: s > 0.5 ? 1 : 0, liftF: s < -0.5 ? 1 : 0, armN: [s * 0.5, 0], armF: [-s * 0.5, 0], sheathed: true };
}

function idlePose(view: View, i: number): Pose {
  return { ...NEUTRAL, hipY: i === 1 ? 0.6 : 0, armN: view === 'side' ? [0.05, -0.15] : [0, 0], armF: [-0.05, -0.15], sheathed: true, blink: false };
}

export function overworldSheet(look: CharacterLook): SheetInfo {
  const F = 32, cols = 6, rows = 3;
  const pc = newCanvas(F * cols, F * rows);
  const views: View[] = ['down', 'up', 'side'];
  views.forEach((view, r) => {
    for (let c = 0; c < cols; c++) {
      const frame = newCanvas(F, F);
      const pose = c < 2 ? idlePose(view, c) : walkPose(view, c - 2);
      new PuppetPainter(frame, look, OVERWORLD, view === 'side' ? 15 : 15.5, 0).draw(view, pose);
      frame.outline(0.4);
      pc.blit(frame, c * F, r * F);
    }
  });
  return {
    canvas: pc, frameW: F, frameH: F, cols, rows,
    anims: {
      idle: { row: 0, frames: 2, fps: 1.6, loop: true },
      walk: { row: 0, frames: 4, fps: 8, loop: true },
    },
  };
}

/** Battle poses, keyed by animation name; each returns the pose for frame i of n. */
const BATTLE_ANIMS: Record<string, { frames: number; fps: number; loop: boolean; pose: (i: number, n: number) => Pose }> = {
  idle: {
    frames: 4, fps: 5, loop: true,
    pose: (i) => {
      const b = [0, 0.5, 1, 0.5][i];
      return { ...NEUTRAL, lean: 0.06, hipY: b, legN: [0.28, -0.22], legF: [-0.22, -0.15], armN: [0.55, -0.9], armF: [0.3, -0.7], weaponAngle: 0.55, headTilt: 0.02, flow: b * 0.5 };
    },
  },
  run: {
    frames: 6, fps: 12, loop: true,
    pose: (i, n) => {
      const ph = (i / n) * Math.PI * 2, s = Math.sin(ph);
      return {
        ...NEUTRAL, lean: 0.28, hipY: Math.abs(Math.cos(ph)) > 0.6 ? 0 : -1.5,
        legN: [s * 0.95, -Math.max(0, -s) * 1.3 - 0.15], legF: [-s * 0.95, -Math.max(0, s) * 1.3 - 0.15],
        armN: [-s * 0.9, -1.1], armF: [s * 0.9, -1.1], weaponAngle: 1.6, flow: 2.5,
      };
    },
  },
  jump: {
    frames: 2, fps: 8, loop: false,
    pose: (i) => i === 0
      ? { ...NEUTRAL, lean: 0.12, hipY: -2, legN: [0.4, -0.2], legF: [-0.6, 0.2], armN: [-2.4, -0.2], armF: [-2.1, -0.4], weaponAngle: 2.6, flow: -1 }
      : { ...NEUTRAL, lean: 0.2, hipY: -4, legN: [1.1, -1.7], legF: [0.5, -1.4], armN: [-2.6, -0.3], armF: [-2.2, -0.5], weaponAngle: 2.8, flow: -2 },
  },
  fall: {
    frames: 2, fps: 8, loop: true,
    pose: (i) => ({ ...NEUTRAL, lean: -0.05, hipY: -3, legN: [0.5, -0.5 - i * 0.1], legF: [-0.3, -0.3], armN: [1.6 + i * 0.1, -0.6], armF: [1.9, -0.5], weaponAngle: 1.2, flow: -2.5 - i }),
  },
  cast: {
    frames: 3, fps: 8, loop: false,
    pose: (i) => (<Pose[]>[
      { ...NEUTRAL, lean: -0.12, legN: [0.45, -0.3], legF: [-0.45, -0.1], armN: [-0.6, -1.5], armF: [-0.4, -1.3], weaponAngle: 0.2, flow: 0.5 },
      { ...NEUTRAL, lean: 0.05, legN: [0.55, -0.3], legF: [-0.5, -0.1], armN: [-2.2, -0.2], armF: [-1.8, -0.4], weaponAngle: 0.0, flow: 1.5 },
      { ...NEUTRAL, lean: 0.25, legN: [0.65, -0.4], legF: [-0.6, -0.05], armN: [1.65, -0.05], armF: [1.4, -0.2], weaponAngle: 1.6, flow: 2.5 },
    ])[i],
  },
  shoot: {
    frames: 3, fps: 9, loop: false,
    pose: (i) => (<Pose[]>[
      { ...NEUTRAL, lean: 0.0, legN: [0.45, -0.25], legF: [-0.4, -0.1], armN: [1.4, -0.1], armF: [1.0, -1.4], weaponAngle: 0, flow: 0.5 },
      { ...NEUTRAL, lean: -0.05, legN: [0.5, -0.25], legF: [-0.45, -0.1], armN: [1.55, 0], armF: [0.8, -1.9], weaponAngle: 0, flow: 0.8 },
      { ...NEUTRAL, lean: -0.12, legN: [0.5, -0.25], legF: [-0.45, -0.1], armN: [1.55, 0], armF: [0.2, -0.6], weaponAngle: 0, flow: 1 },
    ])[i],
  },
  slash: {
    frames: 3, fps: 12, loop: false,
    pose: (i) => (<Pose[]>[
      { ...NEUTRAL, lean: -0.1, legN: [0.5, -0.3], legF: [-0.5, -0.1], armN: [-2.6, -0.3], armF: [-2.2, -0.5], weaponAngle: -0.6, flow: 0.5 },
      { ...NEUTRAL, lean: 0.35, hipY: 1, legN: [0.8, -0.6], legF: [-0.7, 0], armN: [1.3, 0.2], armF: [0.9, -0.2], weaponAngle: 1.9, flow: 2 },
      { ...NEUTRAL, lean: 0.45, hipY: 1.5, legN: [0.85, -0.7], legF: [-0.75, 0], armN: [0.5, 0.3], armF: [0.2, 0], weaponAngle: 2.8, flow: 2.5 },
    ])[i],
  },
  hurt: {
    frames: 2, fps: 6, loop: false,
    pose: (i) => ({ ...NEUTRAL, lean: -0.35 - i * 0.1, hipX: -1 - i, legN: [0.35, -0.2], legF: [-0.5, 0.0], armN: [-0.9, -0.8], armF: [-0.7, -0.6], headTilt: -0.25, weaponAngle: -0.3, flow: -1, blink: true }),
  },
  guard: {
    frames: 1, fps: 1, loop: true,
    pose: () => ({ ...NEUTRAL, lean: 0.12, hipY: 1, legN: [0.6, -0.5], legF: [-0.45, -0.2], armN: [1.0, -1.8], armF: [0.8, -1.9], weaponAngle: 0.1, flow: 0.5 }),
  },
  ko: {
    frames: 1, fps: 1, loop: false,
    pose: () => ({ ...NEUTRAL, lean: -1.45, hipY: 8, hipX: -4, legN: [1.2, -0.2], legF: [1.4, -0.6], armN: [-2.4, 0.2], armF: [-2.0, 0.4], headTilt: -0.15, blink: true, sheathed: true }),
  },
};

export const BATTLE_ANIM_NAMES = Object.keys(BATTLE_ANIMS);

export function battleSheet(look: CharacterLook): SheetInfo {
  const F = 64;
  const names = BATTLE_ANIM_NAMES;
  const cols = Math.max(...names.map((n) => BATTLE_ANIMS[n].frames));
  const rows = names.length;
  const pc = newCanvas(F * cols, F * rows);
  const anims: Record<string, AnimDef> = {};
  names.forEach((name, r) => {
    const a = BATTLE_ANIMS[name];
    anims[name] = { row: r, frames: a.frames, fps: a.fps, loop: a.loop };
    for (let i = 0; i < a.frames; i++) {
      const frame = newCanvas(F, F);
      new PuppetPainter(frame, look, BATTLE, 30, 0).draw('side', a.pose(i, a.frames));
      frame.outline(0.38);
      pc.blit(frame, i * F, r * F);
    }
  });
  return { canvas: pc, frameW: F, frameH: F, cols, rows, anims };
}

// ============================================================================================
// cast
// ============================================================================================

export const LOOKS = {
  hero: {
    skin: 0xf2c9a0, hair: 0x5a3a2a, hairStyle: 'short', outfit: 'tunic', top: 0x3a6a9a, bottom: 0x4a4038,
    boots: 0x5a3a24, accent: 0x8a5a2a, cape: 0xa83a3a, weapon: 'sword',
  },
  mage: {
    skin: 0xf6d2b4, hair: 0xe8dcc8, hairStyle: 'long', outfit: 'robe', top: 0x5a3a7a, bottom: 0x3a2a4a,
    boots: 0x3a2a3a, accent: 0xd0a040, weapon: 'staff',
  },
  ranger: {
    skin: 0xd8a47a, hair: 0x2a2a30, hairStyle: 'ponytail', outfit: 'coat', top: 0x4a6a3a, bottom: 0x5a4a38,
    boots: 0x3a2a20, accent: 0x9a7a4a, weapon: 'bow', hat: 'none',
  },
  elder: {
    skin: 0xe8c0a0, hair: 0xd8d8d8, hairStyle: 'short', outfit: 'robe', top: 0x6a5a48, bottom: 0x4a4038,
    boots: 0x4a3828, accent: 0x9a7a3a, beard: 0xe0e0e0, height: 0.95,
  },
  merchant: {
    skin: 0xf0c8a0, hair: 0x7a4a2a, hairStyle: 'short', outfit: 'apron', top: 0xb05a3a, bottom: 0x4a3a30,
    boots: 0x4a3020, accent: 0xe8e0c8, hat: 'cap', hatColor: 0x3a5a3a, girth: 1.2,
  },
  maid: {
    skin: 0xf6d6b8, hair: 0xc87a3a, hairStyle: 'bun', outfit: 'dress', top: 0x4a6a8a, bottom: 0x3a3a4a,
    boots: 0x3a2a24, accent: 0xf0ece0, hat: 'kerchief', hatColor: 0xf0ece0,
  },
  guard: {
    skin: 0xe0b090, hair: 0x3a2a20, hairStyle: 'short', outfit: 'armor', top: 0x7a4a3a, bottom: 0x3a3a40,
    boots: 0x3a3030, accent: 0xa8b0bc, hat: 'helmet', hatColor: 0xa8b0bc, weapon: 'spear',
  },
  child: {
    skin: 0xf6d0b0, hair: 0xe8b850, hairStyle: 'bob', outfit: 'tunic', top: 0xc85a5a, bottom: 0x5a4a3a,
    boots: 0x5a3a2a, accent: 0x7a5a3a, height: 0.78,
  },
  traveler: {
    skin: 0xe8b890, hair: 0x2a2a2a, hairStyle: 'short', outfit: 'coat', top: 0x8a7050, bottom: 0x4a4038,
    boots: 0x3a2a20, accent: 0x5a3a2a, hat: 'wide', hatColor: 0x5a4030,
  },
  bandit: {
    skin: 0xd09a78, hair: 0x2a1a14, hairStyle: 'spiky', outfit: 'tunic', top: 0x5a3a3a, bottom: 0x3a3030,
    boots: 0x2a2020, accent: 0x6a5a4a, hat: 'hood', hatColor: 0x4a3a3a, weapon: 'dagger',
  },
  archer: {
    skin: 0xd09a78, hair: 0x5a2a1a, hairStyle: 'short', outfit: 'coat', top: 0x5a4a30, bottom: 0x3a3030,
    boots: 0x2a2020, accent: 0x7a3a2a, hat: 'hood', hatColor: 0x3a4a2a, weapon: 'bow',
  },
} satisfies Record<string, CharacterLook>;
