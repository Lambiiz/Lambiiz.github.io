import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const here = fileURLToPath(new URL('.', import.meta.url));

// GitHub Pages serves this branch straight from the repository root, so the dev entry lives in
// src/index.html and `npm run build` writes dist/, then tools/publish.mjs copies the built
// index.html + assets/ to the root. Relative base: the game works at / or any subpath.
export default defineConfig({
  root: 'src',
  base: './',
  publicDir: false,
  build: {
    target: 'es2022',
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
  test: {
    root: here,
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
