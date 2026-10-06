const root = document.getElementById('app')!;
const q = new URLSearchParams(location.search);

if (q.has('debug')) {
  import('./debug').then(({ debugView }) => debugView(root, q));
} else {
  import('./debug').then(({ debugView }) => debugView(root, q));
}
