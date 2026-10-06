// Copy the production build (dist/) into this folder so GitHub Pages serves it directly:
// index.html and assets/ next to this script's parent are generated files — edit src/, then `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('run vite build first');
fs.rmSync(path.join(root, 'assets'), { recursive: true, force: true });
fs.cpSync(path.join(dist, 'assets'), path.join(root, 'assets'), { recursive: true });
fs.copyFileSync(path.join(dist, 'index.html'), path.join(root, 'index.html'));
console.log('published dist/ → character-creator/index.html + assets/');
