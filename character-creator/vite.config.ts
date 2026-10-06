import { defineConfig } from 'vite';

// Source lives in src/ (src/index.html is the dev entry). `npm run build` writes dist/ and then
// tools/publish.mjs copies it into this folder (index.html + assets/), so GitHub Pages serves the
// creator straight from the branch with no build step. Relative base: works at any URL path.
export default defineConfig({
  root: 'src',
  base: './',
  server: { host: '127.0.0.1', port: 5174 },
  build: { target: 'es2022', outDir: '../dist', emptyOutDir: true },
  worker: { format: 'es' },
});
