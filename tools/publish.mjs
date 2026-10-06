// Copy the production build (dist/) to the repository root so GitHub Pages serves it directly:
// /index.html and /assets/ are generated files — edit src/, then `npm run build`.
import fs from 'node:fs';

if (!fs.existsSync('dist/index.html')) throw new Error('run vite build first');
fs.rmSync('assets', { recursive: true, force: true });
fs.cpSync('dist/assets', 'assets', { recursive: true });
fs.copyFileSync('dist/index.html', 'index.html');
fs.writeFileSync('.nojekyll', '');
console.log('published dist/ → index.html + assets/');
