// Pure turn-based battle rules. No rendering: every action returns a list of
// events that the BattleDirector stages with animation, VFX and UI.
import {
  PLAYER, ENEMY, SKILLS, ITEMS, ENEMY_SKILLS, AFFINITY, GUARD, WEAK_MUL, RESIST_MUL, CRIT_MUL, PHASE2_ATK_MUL,
} from '../data/battleData.js';
import { makeRng } from '../core/math.js';

export class BattleSystem {
  constructor({ seed } = {}) {
    this.rng = makeRng(seed ?? (Date.now() & 0xffffffff));
    this.player = { ...PLAYER, hp: PLAYER.maxHp, sp: PLAYER.maxSp, guarding: false };
    this.enemy = { ...ENEMY, hp: ENEMY.maxHp, phase: 0, stunned: false, stunImmune: false, charged: false, sinceCharge: 3, atkMul: 1 };
    this.items = Object.fromEntries(Object.values(ITEMS).map((i) => [i.id, i.count]));
    // what the player has learned about the enemy's affinities, per phase
    this.known = [{}, {}];
    this.turn = 1;
    this.over = null; // 'victory' | 'defeat'
    this.log = [];
  }

  affinityOf(element) {
    return this.enemy.phases[this.enemy.phase][element];
  }

  canUse(skillId) {
    const s = SKILLS[skillId];
    return s && this.player.sp >= s.cost;
  }

  /**
   * @param {{kind:'attack'|'skill'|'guard'|'item', id?:string}} action
   * @returns {Array<object>} events
   */
  playerAction(action) {
    if (this.over) return [];
    const ev = [];
    const p = this.player;
    const e = this.enemy;
    p.guarding = false;

    if (action.kind === 'attack' || action.kind === 'skill') {
      const skill = SKILLS[action.kind === 'attack' ? 'strike' : action.id];
      if (!skill) throw new Error(`Unknown skill ${action.id}`);
      if (p.sp < skill.cost) return [{ type: 'invalid', reason: 'Not enough SP' }];
      p.sp -= skill.cost;
      ev.push({ type: 'use', actor: 'player', skill: skill.id, name: skill.name, element: skill.element, cost: skill.cost });
      const aff = this.affinityOf(skill.element);
      const firstDiscovery = !this.known[e.phase][skill.element];
      this.known[e.phase][skill.element] = aff;
      let total = 0;
      for (let h = 0; h < skill.hits; h++) {
        let dmg = (skill.power / skill.hits) * (p.atk / e.def) * this.rng.range(0.9, 1.1);
        if (aff === AFFINITY.WEAK) dmg *= WEAK_MUL;
        if (aff === AFFINITY.RESIST) dmg *= RESIST_MUL;
        const crit = skill.crit > 0 && this.rng() < skill.crit;
        if (crit) dmg *= CRIT_MUL;
        dmg = Math.max(1, Math.round(dmg));
        e.hp = Math.max(0, e.hp - dmg);
        total += dmg;
        ev.push({ type: 'damage', target: 'enemy', amount: dmg, element: skill.element, affinity: aff, crit, hit: h, hits: skill.hits, discovered: firstDiscovery && h === 0 });
      }
      if (aff === AFFINITY.WEAK && e.hp > 0 && !e.stunned && !e.stunImmune) {
        e.stunned = true;
        e.charged = false;
        ev.push({ type: 'stun', target: 'enemy' });
      }
      this.log.push(`${p.short} used ${skill.name} for ${total}`);
    } else if (action.kind === 'guard') {
      p.guarding = true;
      const gain = Math.min(GUARD.spGain, p.maxSp - p.sp);
      p.sp += gain;
      ev.push({ type: 'guard', actor: 'player', sp: gain });
    } else if (action.kind === 'item') {
      const item = ITEMS[action.id];
      if (!item || !this.items[item.id]) return [{ type: 'invalid', reason: 'None left' }];
      this.items[item.id]--;
      ev.push({ type: 'item', actor: 'player', id: item.id, name: item.name });
      if (item.heal) {
        const amt = Math.min(item.heal, p.maxHp - p.hp);
        p.hp += amt;
        ev.push({ type: 'heal', target: 'player', amount: amt });
      }
      if (item.sp) {
        const amt = Math.min(item.sp, p.maxSp - p.sp);
        p.sp += amt;
        ev.push({ type: 'spgain', target: 'player', amount: amt });
      }
    } else {
      throw new Error(`Unknown action ${action.kind}`);
    }

    this._checkEnd(ev);
    if (!this.over && e.phase === 0 && e.hp <= e.maxHp * ENEMY.phase2At) {
      e.phase = 1;
      e.atkMul = PHASE2_ATK_MUL;
      e.stunned = false; // the glaze shrugs off the stagger
      e.stunImmune = false;
      ev.push({ type: 'phase', phase: 1, skill: ENEMY_SKILLS.mirrorGlaze });
    }
    return ev;
  }

  /** Decide and resolve the enemy's turn. */
  enemyTurn() {
    if (this.over) return [];
    const ev = [];
    const e = this.enemy;
    const p = this.player;

    if (e.stunned) {
      e.stunned = false;
      e.stunImmune = true;
      ev.push({ type: 'recover', actor: 'enemy' });
      this._endRound(ev);
      return ev;
    }
    e.stunImmune = false;

    let skill;
    if (e.charged) {
      skill = ENEMY_SKILLS.perfectScore;
      e.charged = false;
      e.sinceCharge = 0;
    } else {
      e.sinceCharge++;
      const r = this.rng();
      const canCharge = e.sinceCharge >= 3 && this.turn >= 2;
      if (canCharge && r < 0.38) skill = ENEMY_SKILLS.gather;
      else if (r < 0.7) skill = ENEMY_SKILLS.redInk;
      else skill = ENEMY_SKILLS.glassChoir;
    }

    ev.push({ type: 'use', actor: 'enemy', skill: skill.id, name: skill.name, element: skill.element });
    if (skill.charge) {
      e.charged = true;
      ev.push({ type: 'charge', actor: 'enemy' });
    } else {
      let dmg = skill.power * e.atkMul * (e.atk / p.def) * this.rng.range(0.9, 1.1);
      const guarded = p.guarding;
      if (guarded) dmg *= GUARD.damageMul;
      dmg = Math.max(1, Math.round(dmg));
      p.hp = Math.max(0, p.hp - dmg);
      ev.push({ type: 'damage', target: 'player', amount: dmg, element: skill.element, guarded, heavy: skill.id === 'perfectScore' });
    }
    this._checkEnd(ev);
    this._endRound(ev);
    return ev;
  }

  _endRound(ev) {
    this.player.guarding = false;
    if (!this.over) {
      this.turn++;
      ev.push({ type: 'round', turn: this.turn });
    }
  }

  _checkEnd(ev) {
    if (this.enemy.hp <= 0 && !this.over) {
      this.over = 'victory';
      ev.push({ type: 'end', result: 'victory' });
    } else if (this.player.hp <= 0 && !this.over) {
      this.over = 'defeat';
      ev.push({ type: 'end', result: 'defeat' });
    }
  }

  /** Preview list of upcoming turns for the turn-order strip. */
  upcoming(n = 4) {
    const out = [];
    let stunned = this.enemy.stunned;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) out.push('player');
      else {
        out.push(stunned ? 'enemy-stunned' : 'enemy');
        stunned = false;
      }
    }
    return out;
  }
}
