import { defineConfig } from 'vite';

// Source lives in src/ (src/index.html is the dev entry). `npm run build` writes dist/ and then
// tools/publish.mjs copies it to the repository root, so GitHub Pages can serve the game straight
// from the branch with no build step on GitHub. Relative base: works at any URL path.
export default defineConfig({
  root: 'src',
  base: './',
  server: { host: '127.0.0.1', port: 5173 },
  build: { target: 'es2022', outDir: '../dist', emptyOutDir: true, chunkSizeWarningLimit: 1500 },
});
