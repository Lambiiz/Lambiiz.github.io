# Asset and license manifest

PALIMPSEST ships **no image, model, audio or HDRI files**. Every visual and sound is generated at
runtime by code in this repository. Nothing is fetched from a remote service at runtime.

## Original procedural assets (this repository, MIT — see `LICENSE`)

| Asset | Where it is made | Notes |
|---|---|---|
| Card faces (4 towers, 5 placeholder actives/passives) | `src/view/art.ts` → `drawCardFace` | Type-coloured frames (tower dark blue, active dark red, passive dark brown), wax-seal cost pip, engraved illustrations on aged paper (needle stitching a broken dish, fractured sun in a double lens, paired masks joined by thread, inverted bell over water, hand mirror, kintsugi vase, tipped ash urn, hourglass, weight on a feather). Finished with an ordered-dither "print" pass. Drawn once per definition. |
| Card back, socket floors, lock covers, brass, dark wood, bone, die faces | `src/view/art.ts` | Procedural canvases; colour maps are sRGB. |
| Wooden tabletop and inked arena circle with runes | `src/view/art.ts` → `drawWoodTable`, `drawArenaDecal` | Planks, grain, knots, nails, scratches, wax drips. |
| Table props (candles, dice, book, coins), reliquary Base, sockets, emitter, return aperture | `src/view/board.ts` | Primitive/lathe/extrude/rounded-box geometry. |
| Game-piece foes (Veiled Echo, Folded Moth, Burden Urn) | `src/view/enemies.ts` | Lathed bone pieces on wooden bases, peg-and-wing moth, banded urn. |
| Charge overlay shader, stylize post pass | `src/view/chargeMaterial.ts`, `src/view/scene.ts` | Original GLSL. |
| Effects (ribbons, rings, particles, shards, needle trails) | `src/fx/effects.ts` | Original GLSL and pooled meshes. |
| All sound | `src/fx/audio.ts` | Synthesized live with Web Audio; no samples. |
| Metal reflections | `three/addons/environments/RoomEnvironment.js` → PMREM | Procedural room built locally by three.js. |

## Third-party resources bundled locally

| Package | Version | License | Use |
|---|---|---|---|
| [three](https://github.com/mrdoob/three.js) | 0.186.1 | MIT | Renderer, post-processing addons (EffectComposer, RenderPass, UnrealBloomPass, OutputPass), RoomEnvironment, RoundedBoxGeometry, BufferGeometryUtils |
| [@fontsource/cormorant-garamond](https://fontsource.org/fonts/cormorant-garamond) | 5.3.0 | SIL OFL 1.1 (Cormorant Project Authors) | Title / card-name serif (latin 600, 700 subsets bundled by Vite) |
| [@fontsource/inter](https://fontsource.org/fonts/inter) | 5.3.0 | SIL OFL 1.1 (Inter Project Authors) | UI text and card rules text (latin 400/500/600/700) |

Fonts are imported from `node_modules` and emitted into `dist/assets` by Vite; there are no
hotlinked font URLs.

## Development-only tools (not shipped)

TypeScript, Vite, Vitest, Playwright and `@types/*` are dev dependencies used to build and test.

## Inspiration and originality

The combat/turn rhythm draws on the general structure of defense deckbuilders such as
*Heretic's Fork*, and the candle-lit tabletop mood on *Inscryption*. No art, names, text, sounds,
code or branding from those games or any other product were used or copied. All card names, creature names, illustrations and
sounds were designed for this project.
