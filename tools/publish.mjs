// Copies the Vite build (dist/) to the repository root so GitHub Pages can serve the game
// directly from the branch: root index.html + assets/. Never edit those by hand.
import fs from 'node:fs';

if (!fs.existsSync('dist/index.html')) throw new Error('dist/index.html missing — run vite build first');
fs.rmSync('assets', { recursive: true, force: true });
fs.cpSync('dist/assets', 'assets', { recursive: true });
fs.copyFileSync('dist/index.html', 'index.html');
fs.writeFileSync('.nojekyll', '');
console.log(`published dist/ → index.html + assets/ (${fs.readdirSync('assets').length} files)`);
