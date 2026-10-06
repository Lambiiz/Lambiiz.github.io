import { spritePreview } from './debug/spritePreview';

const root = document.getElementById('app')!;
const view = new URLSearchParams(location.search).get('view');

if (view === 'sprites') {
  spritePreview(root);
} else {
  import('./game/Game').then(({ Game }) => new Game(root).start());
}
