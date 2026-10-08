# Assets, licences and trade-offs

Everything in this project is either original (made for this project) or
distributed under licences that allow use, modification and redistribution.

## Characters (VRM, VRoid Studio sample models, all **CC0**)

| Role in game | File | Source model | Licence |
|---|---|---|---|
| Kaito Sena (player) | `assets/models/player.vrm` | VRoid Studio beta sample "Sakurada Fumiriya" | CC0 (embedded VRM meta: `licenseName: CC0`, commercial use allowed) |
| Mio Tachibana (student NPC) | `assets/models/student.vrm` | VRoid Studio beta sample "Sendagaya Shibu" | CC0 |
| Mio's Echo (enemy) | `assets/models/echo.vrm` | VRoid Studio beta sample "Darkness Shibu" | CC0 |

Mirror: <https://github.com/madjin/vrm-samples> (`vroid/beta/`). Licence notes:
<https://vroid.pixiv.help/hc/en-us/articles/4402614652569>.

The game gives these models new names, roles and story. The Echo is restyled at
runtime (`src/characters/EchoLook.js`): darkened porcelain materials, black
sclera with glowing irises and a coral rim light. It also gets an original
orbiting shard halo, a particle aura, levitation and a 1.22× scale.

**Why these models:** they are properly textured, rigged humanoids with spring-bone
hair and skirts. They have expression blend shapes (blink, joy, anger, sorrow…) and
slim, older-teen proportions. Two of them wear matching summer school uniforms (vest,
shirt, tie or ribbon), so the player and NPC read as students of the same school. The
"dark" variant of the NPC model gives the enemy a story reason to look like her.

## Animation (**CC0**)

Quaternius **Universal Animation Library – Standard** (`assets/anim/ual1_standard.glb`,
43 clips, licence in `assets/anim/LICENSE-UAL.txt`). Source:
<https://quaternius.itch.io/universal-animation-library>.

The clips use a UE-mannequin-style skeleton. `src/assets/retarget.js` retargets them
at load time onto each VRM's normalized humanoid rig. It uses the library's
`A_TPose` clip as the reference rest pose and converts each bone to a world-space
delta, so the same clip set drives all three characters.

| Need | Clip(s) used |
|---|---|
| idle / walk / run | `Idle_Loop`, `Walk_Loop`, `Jog_Fwd_Loop` (speed-matched to movement) |
| turning | smooth heading damping over the locomotion clips (no dedicated turn clip) |
| conversation | `Idle_Talking_Loop`, `Interact` |
| battle intro | `Spell_Simple_Enter` |
| battle idle | `Sword_Idle` (player), `Spell_Simple_Idle_Loop` (Echo, levitating) |
| attacks | `Punch_Jab`, `Punch_Cross`, `Spell_Simple_Shoot`, `Sword_Attack` |
| hit reactions | `Hit_Chest`, `Hit_Head` |
| defend / react | **procedural** crossed-arms guard pose layered over `Sword_Idle` |
| victory | **procedural** pointing pose layered over `Idle_Loop` |
| defeat | `Death01` |

**Limitations:**
- The library has no dedicated guard or victory clip. Those two are procedural
  pose overlays blended in and out by `Character.setOverlay()`.
- Turning on the spot uses rotation smoothing rather than turn-in-place clips.
- The Echo's "dissolve" on defeat is a shrink, rise and particle burst, not a
  shader dissolve.

## Fonts (SIL Open Font License 1.1)

- **Anton** (display), licence `assets/fonts/OFL-Anton.txt`
- **Barlow Condensed** (UI), licence `assets/fonts/OFL-BarlowCondensed.txt`

Both are self-hosted as woff2, so the game works offline.

## Original to this project

- **Environment.** The whole corridor is built procedurally: lockers, sliding doors,
  windows, ceiling and props. All textures are painted at runtime on canvas,
  including floor tile, plaster, wood, lockers, the sunset and otherworld sky,
  every poster, the room plates, the motto banner, the clock and the battle sigil
  (`src/world/textures.js`). No third-party textures are used.
- **Audio.** Every sound effect and all music (lo-fi corridor theme, tension bed,
  150 BPM battle theme, victory and defeat stings) are synthesised live with the
  Web Audio API (`src/audio/Audio.js`).
- **VFX, UI, typography layout, story and dialogue** are original. No franchise
  names, logos, menus, symbols or music are reproduced.

## Libraries

- three.js r170 (MIT): `vendor/three/`
- @pixiv/three-vrm 3.x (MIT): `vendor/three-vrm.module.js`
