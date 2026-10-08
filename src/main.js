// Entry point: boot the game and surface fatal errors on the loading screen.
import { Game } from './core/Game.js';

const game = new Game(document.getElementById('view'), document.getElementById('ui'));
window.__game = game; // handy for debugging and automated tests

game.init().catch((err) => {
  console.error(err);
  const box = document.createElement('pre');
  box.className = 'fatal';
  box.textContent = `Something went wrong while loading:\n\n${err?.stack || err}`;
  document.body.append(box);
});
