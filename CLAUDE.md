# Notes for AI coding sessions

- The game is served by GitHub Pages **directly from the repository root**: `index.html` and
  `assets/` are generated build output. Never edit them by hand.
- Source lives in `src/` (dev entry: `src/index.html`). After changing anything in `src/`, run
  `npm run build` (typecheck → vite build → `tools/publish.mjs` copies `dist/` to the root) and
  commit the regenerated `index.html` + `assets/` together with the source change.
- `npm test` checks the battle sim's determinism (the exact preview); keep it passing.
- Battle rules in `src/game/battle/sim/` must stay pure and deterministic (see README).
- Headless screenshots: `npm run dev` in the background, then `node tools/screenshots.mjs`.
  Software rendering is ~1 fps, so allow long waits; `window.__game` has debug hooks.
