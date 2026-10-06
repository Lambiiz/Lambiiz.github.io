# Pixel Creature Creator

A procedural pixel-art character and creature generator that runs entirely in the browser.
Live at **https://lambiiz.github.io/character-creator/** (served by GitHub Pages from this folder).

It is a standalone project: nothing here is shared with the game in the repository root.

## What it makes

Every creature is built from a **genome** (named genes in four random streams: anatomy, colour,
pattern, motion) and rendered from 3D primitives into hand-drawn-looking pixel art, in eight
directions, with a full set of procedural animations.

| Family | Archetypes | Animations |
| --- | --- | --- |
| Humans | villager, farmer, merchant, noble, guard, knight, ranger, rogue, mage, cleric, monk, barbarian, blacksmith | idle, ready, walk, run, sneak, jump, attack (slash / thrust / shoot / punch / spell), cast, block, hurt, die, sit, wave, cheer, pick up, talk |
| Humanoids | elf, dwarf, orc, goblin, troll, lizardfolk, catfolk, skeleton, zombie, imp | as humans (zombies shamble with their arms out) |
| Four-legged beasts | wolf, dog, fox, cat, big cat, bear, horse, deer, boar, ox, goat, dragon | idle, walk, trot, gallop, jump, bite / charge / kick / swipe / pounce / breath, howl or roar, hurt, die, sit or lie down, sleep, graze, fly (winged) |
| Serpents & worms | viper, cobra, python, banded snake, giant worm | idle, slither, fast slither, strike, spread hood / rattle / hiss / rear up, coil, hurt, die |
| Birds & bats | songbird, crow, owl, bird of prey, parrot, chicken, bat | idle, hop or walk (with head bob), fly, glide, take off, peck / talon strike / bite, call, peck food, hurt, die, sleep (bats hang) |
| Bugs & spiders | spider, ant, beetle, scorpion | idle, walk, scuttle, bite / ram / sting, rear up / threaten, fly (beetles), hurt, die (flip over) |
| Slimes & spirits | slime, ghost, wisp, floating eye, jellyfish | idle, hop / float / swim, big hops / dash, pounce / spook / flare / gaze beam / sting, cast, hurt, melt / vanish / fizzle / die, sleep |

Humans use natural proportions only (about 7.3 heads tall for adults, 5–6.5 for children and teens, varied by height, build and posture genes), with
hair styles, facial hair, layered clothing (shirts, tunics, vests, coats, robes, dresses, armour),
headwear, weapons, shields, bows, torches, lanterns, books, backpacks and quivers.

## Using it

- **New / Reroll** make a new creature or re-roll only the body, colours or motion; every gene can
  be edited and locked in the left panel. Undo / redo, save / load presets (JSON) and share links
  (`#g=…`, the genome deflated into the URL).
- **Variations** breeds offspring of the current creature (mutation strength slider);
  **Gallery** shows random creatures of the current family.
- **Animation / direction / view** on the right: clips, playback speed, eight facings or a
  turntable, camera elevation, sprite size, ground, zoom, shadow and outline.
- **Test drive**: WASD / arrows move, Shift runs, C sneaks, Space attacks, and F / G / J / H / K /
  X / V / B / E / T / R trigger the other clips (each family answers with its closest one).
- **Export**: a sprite sheet (PNG + JSON) of any clips × directions, an animated GIF, or the
  current pose as a PNG.

### Sprite sheet format

One row per (clip, direction), one column per frame; every cell has the same size and the
creature's ground point (pivot) at the same place. The JSON (`format: "pixel-creature-sheet"`)
lists the cell size, pivot, directions (`yawDeg`, 0 = east, 90 = north), and for every clip its
frame count, fps, loop flag, row per direction and **`speedPxPerSec`**: move the sprite at that
speed while the clip plays and the planted feet stay exactly on the ground. The genome is
included, so a sheet can always be regenerated.

## How it works

```
genome ──family.sample/build──▶ anatomy (bones + primitives + features) + materials + patterns + animator
pose = animator.pose(clip, t)  ──▶  rasteriser  ──▶  pixel frame
```

- **Anatomy** (`src/anatomy`): bones in a hierarchy, and primitives attached to them — ellipsoids,
  round cones spanning two bones (limbs stretch with their joints) and flat triangles (membranes)
  — optionally cut by planes (hairlines, hoods, a ghost's hem). Primitives in a group blend into one
  smooth shape (soft union with fillets); groups are depth-tested against each other.
- **Rasteriser** (`src/render/raster.ts`): analytic ray–primitive intersection per pixel (round
  cones via the exact convex-hull-of-two-spheres solution, ellipsoids as quadrics), toon shading
  with hue-shifted six-level colour ramps per material (OKLCH), material styles (fur, scales,
  feathers, chitin, metal, chain mail, slime, glow…), far-side darkening, contact shadows,
  pixel cleanup, interior contour lines, selective outlines, body-anchored patterns (stripes,
  spots, rosettes, diamonds, rings…) that stick to the body through every pose, stamped
  pixel-art eyes / brows / mouths, and a ground shadow.
- **Animators** (`src/anim`): clips are pure functions of normalised time, so every frame of a
  sheet is reproducible.
  - bipeds: planted-foot gait with heel and ball pivots, pelvis drop, counter-rotation, arm swing,
    IK arms that hold weapons with the right grip, gravity-aware hair and capes;
  - quadrupeds: three-segment legs, lateral-sequence walk, diagonal trot and gallop with spine
    flexion, the body lowered whenever a planted foot would be out of reach, strides capped by leg
    reach;
  - serpents: a chain integrated from per-segment heading and elevation (segments never stretch);
    slithering follows the serpenoid curve so the body slides along a path fixed on the ground;
  - birds and bats: head stabilised in world space (hence the head bob), ground-locked hops and
    steps, folded and spread feathered wings, flapping with a wrist fold on the upstroke;
  - bugs: alternating tripod / tetrapod gaits with a front-to-back ripple, knees above the body;
  - slimes and spirits: volume-preserving squash and stretch, tendrils driven in world space by
    gravity, drag and travelling waves.
- **Genome** (`src/genome`): a typed schema per family, rerolls that respect locks, mutation in
  OKLCH for colours, crossover by gene group, JSON presets and compact share codes.

The design follows the ideas of
[procedural-pixel-creatures](https://github.com/idlerunner00/procedural-pixel-creatures)
(genome → anatomy → animator → CPU rasteriser with stylised shading), reimplemented and extended
for natural human characters and many more body plans.

## Development

```sh
cd character-creator
npm install
npm run dev        # http://127.0.0.1:5174/ (add ?debug&family=…&arch=all&clip=all for art sheets)
npm test           # determinism, every creature builds and renders, seamless loops, no foot sliding
npm run build      # typecheck → vite build → copies dist/ to index.html + assets/ here
node tools/screenshot.mjs '/?debug&family=flyer&arch=all' shots/birds.png   # needs the dev server
```

`index.html` and `assets/` in this folder are **generated** by `npm run build` (that is what
GitHub Pages serves); edit `src/` and rebuild, and commit the regenerated files with the source.

Layout: `src/core` (maths, random streams, colour), `src/genome`, `src/anatomy`, `src/render`,
`src/anim`, `src/families` (one file per family plus shared human body / creature parts),
`src/model` (building, posing, cell sizes), `src/export` (sheets, GIF), `src/worker`,
`src/ui`, `src/debug.ts` (the `?debug` art sheets), `tests/run.ts`.
