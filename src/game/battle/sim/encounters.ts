import type { BattleState, Fighter, Skill } from './types';

type Spec = Pick<Fighter, 'look' | 'name' | 'team' | 'maxHp' | 'atbRate' | 'skills' | 'brain'> & { x: number; atb?: number };

const PARTY: Spec[] = [
  { look: 'hero', name: 'Alden', team: 'party', maxHp: 110, atbRate: 0.42, skills: ['move', 'jump', 'slash', 'guard', 'wait'] as Skill[], x: -4.2, atb: 0.55 },
  { look: 'mage', name: 'Seris', team: 'party', maxHp: 80, atbRate: 0.36, skills: ['move', 'jump', 'fireball', 'wait'] as Skill[], x: -6.4, atb: 0.3 },
  { look: 'ranger', name: 'Tamsin', team: 'party', maxHp: 90, atbRate: 0.39, skills: ['move', 'jump', 'arrow', 'wait'] as Skill[], x: -2.4, atb: 0.15 },
];

const ENCOUNTERS: Record<string, Spec[]> = {
  bandits: [
    { look: 'bandit', name: 'Bandit', team: 'enemy', maxHp: 70, atbRate: 0.38, skills: ['move', 'jump', 'slash', 'guard'] as Skill[], brain: 'brawler', x: 3.6, atb: 0.45 },
    { look: 'archer', name: 'Bandit Archer', team: 'enemy', maxHp: 55, atbRate: 0.34, skills: ['move', 'arrow'] as Skill[], brain: 'archer', x: 6.6, atb: 0.8 },
    { look: 'bandit', name: 'Bandit', team: 'enemy', maxHp: 70, atbRate: 0.33, skills: ['move', 'jump', 'slash', 'guard'] as Skill[], brain: 'brawler', x: 5.0, atb: 0.1 },
  ],
};

export function createBattle(encounter: string, seed = 1): BattleState {
  const specs = [...PARTY, ...(ENCOUNTERS[encounter] ?? ENCOUNTERS.bandits)];
  const fighters: Fighter[] = specs.map((sp, i) => ({
    id: i + 1,
    look: sp.look,
    name: sp.name,
    team: sp.team,
    maxHp: sp.maxHp,
    hp: sp.maxHp,
    x: sp.x,
    y: 0,
    vx: 0,
    vy: 0,
    facing: sp.team === 'party' ? 1 : -1,
    grounded: true,
    atb: sp.atb ?? 0,
    atbRate: sp.atbRate,
    action: null,
    anim: 'idle',
    animT: i * 7,
    stun: 0,
    ko: false,
    skills: sp.skills,
    brain: sp.brain,
    hw: 0.4,
    h: 2.1,
    lane: 0,
  }));
  // cosmetic depth lanes so overlapping fighters layer instead of z-fighting
  let pi = 0, ei = 0;
  for (const f of fighters) f.lane = f.team === 'party' ? [0, -0.5, 0.5][pi++ % 3] : [0, -0.5, 0.5][ei++ % 3];
  return {
    tick: 0,
    fighters,
    projectiles: [],
    nextId: 100,
    rng: seed >>> 0,
    arena: { left: -8, right: 8 },
    turnQueue: [],
    awaiting: null,
    outcome: null,
    events: [],
  };
}
