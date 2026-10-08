// Tunable battle data: combatants, skills, items and enemy behaviour.

export const AFFINITY = {
  NORMAL: 'normal',
  WEAK: 'weak',
  RESIST: 'resist',
};

export const ELEMENTS = {
  phys: { label: 'PHYS', glyph: '✦', color: '#f6f2e8' },
  light: { label: 'LUMEN', glyph: '◇', color: '#2cf2d4' },
  fire: { label: 'CINDER', glyph: '▲', color: '#ff8a3d' },
};

export const PLAYER = {
  id: 'player',
  name: 'Kaito Sena',
  short: 'KAITO',
  maxHp: 140,
  maxSp: 60,
  atk: 10,
  def: 10,
};

export const ENEMY = {
  id: 'echo',
  name: "Mio's Echo",
  title: 'The Flawless One',
  short: 'ECHO',
  maxHp: 240,
  atk: 10,
  def: 10,
  // affinities per phase
  phases: [
    { phys: AFFINITY.NORMAL, light: AFFINITY.WEAK, fire: AFFINITY.RESIST },
    { phys: AFFINITY.NORMAL, light: AFFINITY.RESIST, fire: AFFINITY.WEAK },
  ],
  phase2At: 0.5, // fraction of HP
};

export const SKILLS = {
  strike: {
    id: 'strike',
    name: 'Strike',
    element: 'phys',
    power: 17,
    cost: 0,
    hits: 2,
    crit: 0.12,
    desc: 'A sharp two-hit combo. Free to use.',
  },
  lumenEdge: {
    id: 'lumenEdge',
    name: 'Lumen Edge',
    element: 'light',
    power: 30,
    cost: 8,
    hits: 1,
    crit: 0,
    desc: 'Fold the sunset into a blade of light. Lumen damage.',
  },
  cinderVerse: {
    id: 'cinderVerse',
    name: 'Cinder Verse',
    element: 'fire',
    power: 30,
    cost: 10,
    hits: 1,
    crit: 0,
    desc: 'Write a line of burning script in the air. Cinder damage.',
  },
};

export const ITEMS = {
  soda: { id: 'soda', name: 'Melon Soda', count: 2, heal: 45, desc: 'Fizzy and far too green. Restores 45 HP.' },
  mints: { id: 'mints', name: 'Mint Drops', count: 1, sp: 22, desc: 'Sharp enough to clear the head. Restores 22 SP.' },
};

export const ENEMY_SKILLS = {
  redInk: { id: 'redInk', name: 'Red Ink', element: 'phys', power: 14, desc: 'Slashes with a quill of crimson glass.' },
  glassChoir: { id: 'glassChoir', name: 'Glass Choir', element: 'light', power: 18, desc: 'A volley of singing shards.' },
  gather: { id: 'gather', name: 'Hold Your Breath', charge: true, desc: 'The Echo draws the light out of the room…' },
  perfectScore: { id: 'perfectScore', name: 'Perfect Score', element: 'light', power: 44, desc: 'A flawless, crushing verdict.' },
  mirrorGlaze: { id: 'mirrorGlaze', name: 'Mirror Glaze', desc: 'Its surface hardens into polished glass.' },
};

export const GUARD = { damageMul: 0.5, spGain: 5 };
export const WEAK_MUL = 1.5;
export const RESIST_MUL = 0.5;
export const CRIT_MUL = 1.5;
export const PHASE2_ATK_MUL = 1.15;
