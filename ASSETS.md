# Asset and license manifest

PALIMPSEST ships **no image, model, audio or HDRI files**. Every visual and sound is generated at
runtime by code in this repository. Nothing is fetched from a remote service at runtime.

## Original procedural assets (this repository, MIT — see `LICENSE`)

| Asset | Where it is made | Notes |
|---|---|---|
| Card faces (Memory Needle, Last Light, Kindred Thread, Mercy Bell, Polished Memory, Mend the Vessel) | `src/view/art.ts` → `drawCardFace` | Layered Canvas 2D engravings: needle stitching a broken dish, fractured sun in a double lens, paired masks joined by thread, inverted bell over concentric water, hand mirror, kintsugi vase. Drawn once per definition, cached as `CanvasTexture` (sRGB). |
| Card back, card edge stock | `src/view/art.ts` | Used for the memory stack and card thickness. |
| Ornament motifs (soul glyph, lozenge chain, quarter rosette, dotted arcs) | `src/view/art.ts` | Repeated across cards, board rim, Base lid. Original designs. |
| Board slate, rim band, lid enamel guilloché, socket floors, ceramic crackle, brushed brass, void backdrop | `src/view/art.ts` | Procedural canvases; color maps are sRGB, masks are data. |
| Enemy miniatures (Veiled Echo, Folded Moth, Burden Urn) | `src/view/enemies.ts` | Assembled from lathe/shape/sphere/torus geometry; moth wing and mask textures from `art.ts`. |
| Base, sockets, emitter, return aperture, memory stack | `src/view/board.ts` | Extruded/lathed/rounded-box geometry. |
| Charge overlay shader | `src/view/chargeMaterial.ts` | Original GLSL. |
| Effects (ribbons, rings, particles, shards, needle trails) | `src/fx/effects.ts` | Original GLSL and pooled meshes. |
| All sound | `src/fx/audio.ts` | Synthesized live with Web Audio oscillators/noise; no samples. |
| Metal reflections | `three/addons/environments/RoomEnvironment.js` → PMREM | Procedural room built locally by three.js; no HDRI download. |

## Third-party resources bundled locally

| Package | Version | License | Use |
|---|---|---|---|
| [three](https://github.com/mrdoob/three.js) | 0.186.1 | MIT | Renderer, post-processing addons (EffectComposer, RenderPass, UnrealBloomPass, OutputPass), RoomEnvironment, RoundedBoxGeometry, BufferGeometryUtils |
| [@fontsource/cormorant-garamond](https://fontsource.org/fonts/cormorant-garamond) | 5.3.0 | SIL OFL 1.1 (Cormorant Project Authors) | Title / card-name serif (latin 600, 700 subsets bundled by Vite) |
| [@fontsource/inter](https://fontsource.org/fonts/inter) | 5.3.0 | SIL OFL 1.1 (Inter Project Authors) | UI text and card stat lines (latin 400/500/600) |

Fonts are imported from `node_modules` and emitted into `dist/assets` by Vite; there are no
hotlinked font URLs.

## Development-only tools (not shipped)

TypeScript, Vite, Vitest, Playwright and `@types/*` are dev dependencies used to build and test.

## Inspiration and originality

The combat/drafting rhythm draws on the general structure of defense deckbuilders such as
*Heretic's Fork*. No art, names, text, sounds, code or branding from that game or any other
product were used or referenced for copying. All card names, creature names, illustrations and
sounds were designed for this project.
