# Lumen Road (working title)

A 2.5D pixel-art RPG for the browser: an HD-2D (Octopath-style) overworld and a side-view battle
system where time runs in real time, turns come from ATB gauges, and on your turn time stops and
an **exact preview** shows what will happen.

Built with three.js, TypeScript and Vite. Every texture, sprite and character is drawn by code at
runtime: the repository has no image files.

```bash
npm install
npm run dev        # http://127.0.0.1:5173/
npm test           # battle-sim determinism tests
npm run build      # typecheck + production build → dist/
```

Useful URLs while developing:

| URL | What |
| --- | --- |
| `/` | The game (starts in the town of Brightwater) |
| `/?scene=battle` | Jump straight into a battle |
| `/?time=night` | Start at `day`, `golden`, `dusk` or `night` |
| `/?nofade` | Skip the intro fade and banner (screenshots) |
| `/?view=sprites&scale=4` | Every character sheet, scaled up (`&only=hero,mage`) |

`node tools/screenshots.mjs '<path>' out.png [waitMs] [w] [h] ['key:KeyW:800|wait:500|eval:…']`
takes headless screenshots of the dev server. `window.__game` exposes hooks (`teleport`, `setTime`,
`startBattle`, `battle.fastForward()`, …).

## Controls

**Overworld:** WASD / arrows move · Shift run · Space talk / advance · Q / E rotate the camera ·
Z / X zoom · T time of day · B start a battle. Captain Ardel on the low road offers a fight, and
walking off the east end of the low road enters the Wilds.

**Battle:** ↑ ↓ choose a command (the preview updates as you move) · Space select. Aimed commands
(Move, Jump, Fireball, Arrow): aim with the mouse or WASD, click / Space to confirm, Esc /
right-click to go back.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. In the
repository settings set **Pages → Build and deployment → Source** to **GitHub Actions** once.

---

## Architecture

```
src/
  main.ts                 entry: the game, or ?view=sprites
  engine/                 reusable, game-agnostic
    core/                 Input, CameraRig (diorama follow camera), seeded Rng + noise
    pixel/                PixelCanvas (software pixel surface with height + emissive channels)
                          color (hue-shifted shading) · surfaces (cobble, grass, bricks, roof tiles…)
                          characters (the puppet rig + sheets) · foliage (trees, bushes, signs…)
                          texture (canvas → three.js textures / lit pixel materials)
    render/               PostFX (DoF, bloom, grade, transitions, overlay pass) · Lighting
                          (time-of-day presets, sun shadows, lamps) · Sky · Motes · globals
    sprite/               Sprite3D (lit billboard + shadow proxy) · BillboardBatch · Atlas
    world/                Terrain (tile heights, stairs, walls, walk map) · House · Props
  game/
    Game.ts               renderer, loop, scene switching, battle transition
    overworld/            Town (map + set dressing), Actor (walkers), Overworld (NPCs, dialog)
    battle/
      sim/                ← the rules. Pure data + functions, no three.js
        types.ts          BattleState, Fighter, Projectile, Command, events
        sim.ts            step(), decide(), frame data, physics
        predict.ts        the exact preview
        ai.ts             enemy brains
        encounters.ts     party + enemy definitions
      Battle.ts           turn flow (time stop, menus, aiming) and rendering of the sim
      Stage.ts            the battle diorama
      Views.ts            fighter / projectile / preview visuals
      BattleUI.ts         DOM HUD (party, plates, menu, timeline)
    ui/                   dialog box, prompts, banners
tests/sim.test.ts         preview == reality, tick by tick
```

### The HD-2D look

- **One pixel scale everywhere:** 16 texels per world unit, nearest-filtered. Ground, walls, roofs
  and characters all share it, so nothing looks higher-resolution than anything else.
- **Lit billboards.** Characters are upright quads that turn to the camera's yaw. Their shading
  normal leans upward, so the sun and lanterns light them like the ground they stand on. A second,
  invisible quad turned toward the sun casts the shadow (it lives on a layer only the shadow
  camera renders), so the shadow is always the full silhouette.
- **Normal-mapped pixel textures.** Every procedural surface also paints a height channel that
  becomes a normal map, so cobbles, bricks and timber catch the low sun.
- **Post stack** (`PostFX`): HDR + MSAA scene → circle-of-confusion from depth (plus a screen-space
  tilt-shift band) → half-res bokeh gather (bright pixels bloom into discs) → composite → dual-filter
  bloom → exposure, ACES, grade (teal-lifted shadows, warm highlights), vignette, grain.
- **Overlay pass:** world-space UI (the battle preview) renders after post-processing, sharp and
  ungraded, on top of everything.

### Sprite sizes

Following the tip about combat frames: **overworld frames are 32×32** (4 directions, idle + walk)
and **battle frames are 64×64**, side view. The body is about the same size in both. The battle
frames just have room for weapons, lunges, jumps, knock-back and big casts. Both come from the same
puppet rig in `characters.ts`: a pose is a set of joint angles, so every outfit works in every pose
automatically. Adding an animation means adding one entry to `BATTLE_ANIMS`. Adding a character
means adding one entry to `LOOKS`.

### The battle simulation and the exact preview

The design goal is *the preview is never a guess*. To make that true:

1. **The rules are pure.** `battle/sim/` never touches three.js, the DOM, the clock or
   `Math.random`. State is plain data, so `structuredClone` makes an exact copy.
2. **Fixed ticks.** Everything advances in 1/60 s steps. Rendering interpolates between ticks; the
   rules never see frame times.
3. **Seeded randomness** lives in the state (`state.rng`), so enemy brains are deterministic too.
4. **Deterministic math.** Only `+ − × ÷` and `sqrt` / `abs` / `min` / `max` in the sim (exact in
   IEEE 754 in every engine, no `sin` / `atan2`). That keeps replays and lockstep netplay possible.
5. **Prediction = the real thing on a copy.** `predict(state, id, cmd)` clones the state, applies
   the command and runs the same `step()` forward (2.5 s by default). Whenever someone's turn comes
   up inside the preview, nobody knows what they will choose, so they 'wait' (keep doing what they
   were doing). Everything after the first such turn is marked *uncertain*: it is drawn dimmer, and
   hits show a `?`.

`npm test` checks this claim. It plays 25 seeded battles, and at every player turn it compares
the prediction with what really happens, position by position, with `===`.

**Turn flow:** gauges fill in real time (`atbRate` per second). When one fills, `step()` sets
`state.awaiting` and stops. Enemy turns are answered at once by `ai.think`. A party turn stops
time, opens the menu and previews the highlighted command live. `decide()` hands over the command
and time runs again. 'Wait' keeps the current action, so you can let a jump or a run play out.

**Extending it:**

- A new action: add a `Command` variant (`types.ts`), its frame data and a `case` in `runAction`
  (`sim.ts`), a `Skill` name, then a menu entry and default aim in `Battle.ts`. The preview,
  timeline and tests pick it up with no extra work.
- A new enemy: a `look` in `characters.ts` plus a spec in `encounters.ts`; a new brain goes in
  `ai.ts`.

### Things deliberately left for later

- Real combat design: damage formulas, resources, more actions, status effects, combos and
  cancels, interrupts, multi-hit. The sim is shaped for these but they are placeholders now.
- Enemy brains are simple. Party turn order is first-come.
- Interiors, map transitions, saving, audio.
- Touch / gamepad aiming in battle (gamepad works in the overworld).
- Art is a procedural placeholder: the rig produces good silhouettes, and hand-tuned per-character
  details would be the next step.

The [Lumina](https://gitlab.com/stubborn-hug/lumina) project was a reference for techniques
(tilt-shift depth of field, sun-facing shadow proxies for billboards). It has no license, so none of
its code is used here.
