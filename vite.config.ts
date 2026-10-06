import { defineConfig } from 'vite';

// The game is served from the root of lambiiz.github.io, so base stays '/'.
export default defineConfig({
  base: '/',
  server: { host: '127.0.0.1', port: 5173 },
  build: { target: 'es2022', chunkSizeWarningLimit: 1500 },
});
