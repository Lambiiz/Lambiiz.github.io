# Octolion

A 2.5D pixel-art RPG for the browser: an HD-2D (Octopath-style) overworld and a side-view battle
system where time runs in real time, turns come from ATB gauges, and on your turn time stops and
an **exact preview** shows what will happen.

**Play:** https://lambiiz.github.io/ (desktop browser, keyboard + mouse). Nothing to install.

Built with three.js, TypeScript and Vite. Every texture, sprite and character is drawn by code at
runtime: the repository has no image files.

## How it is published

GitHub Pages serves the repository root as a static site. `index.html` and `assets/` at the root
are the **built** game (generated, don't edit), so the page works without any build step on
GitHub. The source is in `src/`.

To change the game (on any computer with Node.js, or in a Claude Code cloud session):

```bash
npm install
npm run dev        # live-reloading dev server at http://127.0.0.1:5173/
npm test           # battle-sim determinism tests
npm run build      # typecheck + build + copy the result to the repo root — commit it
```

The `Build` GitHub Action re-runs the tests and the build on every push to `main` and commits the
result if someone forgot, so the published game is never stale.

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

**Battle:** ← → (or ↑ ↓) choose a command (the preview updates as you move) · Space select. Aimed
commands (Move, Jump, Fireball, Arrow): aim with the mouse or WASD, click / Space to confirm, Esc /
right-click to go back.

Reading a battle: the **turn-order bar** at the top shows who acts when (portraits on a time axis).
On your turn it also shows where the highlighted command puts your next turn ("next"). The
fighter whose turn it is stands on a pulsing gold ring under a chevron. While you choose, the
**holograms** replay exactly what will happen in the next 2.5 s. They turn grey once someone
else gets to decide, because from there it may change. The **What happens** list spells the same
thing out, knock-backs included.

---

## Architecture

```
src/
  index.html, main.ts     dev entry: the game, or ?view=sprites
  engine/                 reusable, game-agnostic
    core/                 Input, CameraRig (diorama follow camera), seeded Rng + noise
    character/            look (what a character wears) · model (rigged 3D model from primitives,
                          cel material) · poses (joint-angle animations) · bake (render → pixel
                          sprite sheets) · sheets (bake-once cache)
    pixel/                PixelCanvas (software pixel surface with height + emissive channels)
                          color (hue-shifted shading) · surfaces (cobble, grass, bricks, roof tiles…)
                          foliage (trees, bushes, signs…) · texture (canvas → three.js textures)
    render/               PostFX (AO, DoF, bloom, grade, transitions, overlay pass) · Lighting
                          (time-of-day presets, sun shadows, lamps) · LightShafts · Sky · Motes
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
      Views.ts            fighters, projectiles, team rings, the acting-fighter marker
      Hologram.ts         the preview: hologram replay of the predicted future
      BattleUI.ts         DOM HUD (turn order, what-happens list, plates, command bar)
    ui/                   dialog box, prompts, banners
tests/sim.test.ts         preview == reality, tick by tick
```

### The HD-2D look

- **Pixel density:** characters are 28 texels per world unit, and ground, walls and roofs are 32.
  House facades are painted at 16. Everything is nearest-filtered.
- **Lit billboards.** Characters are upright quads that turn to the camera's yaw. Their shading
  normal leans upward, so the sun and lanterns light them like the ground they stand on. A second,
  invisible quad turned toward the sun casts the shadow (it lives on a layer only the shadow
  camera renders), so the shadow is always the full silhouette.
- **Normal-mapped pixel textures.** Every procedural surface also paints a height channel that
  becomes a normal map, so cobbles, bricks and timber catch the low sun.
- **Post stack** (`PostFX`): HDR + MSAA scene → screen-space ambient occlusion (from depth) →
  circle-of-confusion from depth (plus a screen-space tilt-shift band) → half-res bokeh gather
  (bright pixels bloom into discs) → composite → dual-filter bloom → exposure, ACES, grade
  (teal-lifted shadows, warm highlights), vignette, grain.
- **Light shafts:** soft additive ribbons along the real sun direction, occluded by buildings. Their
  strength and colour follow the time of day.
- **Overlay pass:** world-space UI (the battle preview) renders after post-processing, sharp and
  ungraded, on top of everything.

### Characters: baked from 3D models

Characters are not drawn frame by frame. Each one is a small rigged 3D model built from
primitives (`character/model.ts`): head, hair locks and fringe, torso, skirt or coat, cape, limbs,
hat and weapon. A pose is a set of joint angles (`poses.ts`). At load time `bake.ts` renders every
frame at its final pixel size with an orthographic camera and a four-band cel material: flat,
hue-shifted colour bands and no anti-aliasing, so it reads as pixel art. A CPU pass then finishes
each frame like a pixel artist would:

- contour lines where a nearer part overlaps a farther one (from a depth pass);
- eyes, mouth and blush painted pixel by pixel at the face's projected position;
- a soft coloured outline.

That is what makes **8 directions** and **three-quarter views** cheap. The sideways views are
turned toward the camera (east is drawn at 72°), so faces stay visible, as in HD-2D games.
Battle sprites face right or left at 58°. Sheets: overworld 64×64 frames (8 directions × idle,
walk); battle 96×96 frames (2 facings × 10 animations), with room for weapons and big poses.
Characters are about 48 px tall.

To add a character, add a `LOOKS` entry in `character/look.ts`. To add an animation, add an
`AnimSpec` in `poses.ts`. `/?view=sprites&scale=4&only=hero&strip=idle:0` shows the result (every
direction side by side).

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
the prediction with what really happens, tick by tick, with `===`: every fighter's position and
animation, and every projectile. It also checks that soft collision never lets two fighters
overlap.

**Turn flow:** gauges fill in real time (`atbRate` per second). When one fills, `step()` sets
`state.awaiting` and stops. Enemy turns are answered at once by `ai.think`, with a short
slow-motion beat and a callout so you see what was chosen. A party turn stops time, opens the
command bar and previews the highlighted command live. `decide()` hands over the command and time
runs again. Each command sets where the gauge restarts (`RECOVERY` in `sim.ts`: Wait 0.5 so the
next turn comes quickly, Fireball −0.2 so it comes late). Choosing an action is therefore also
choosing when you act next. 'Wait' keeps the current action, so you can let a jump or a run play
out.

**Soft collision:** fighters closer than `SEPARATION` are nudged apart a little every tick (friend
or foe). They can shove and brush past but never stand inside each other. It is part of the sim,
so the preview includes it.

**The preview, on screen** (`Hologram.ts`): the prediction records every tick. While you choose,
translucent team-tinted copies of everyone who will move or act replay it on a loop. Impacts
flash and damage pops out at the moment they happen. Rings mark where hits land, with damage and
time. After the first moment anyone else gets to decide, the replay turns grey. Dotted paths are
only drawn for the acting fighter's own aimed command.

**Extending it:**

- A new action: add a `Command` variant (`types.ts`), its frame data and a `case` in `runAction`
  (`sim.ts`), a `Skill` name, then a menu entry and default aim in `Battle.ts`. The preview,
  timeline and tests pick it up with no extra work.
- A new enemy: a `look` in `character/look.ts` plus a spec in `encounters.ts`; a new brain goes in
  `ai.ts`.

### Things deliberately left for later

- Real combat design: damage formulas, resources, more actions, status effects, combos and
  cancels, interrupts, multi-hit. The sim is shaped for these but they are placeholders now.
- Enemy brains are simple. Party turn order is first-come.
- Interiors, map transitions, saving, audio.
- Touch / gamepad aiming in battle (gamepad works in the overworld).
- Art is still procedural. The model rig can take much more per-character detail, and hand-drawn
  sheets in the same layout could replace the bake for key characters.
