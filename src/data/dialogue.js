// The encounter script. Each line can set a camera shot, the speaker's
// animation and facial expression, plus optional cues for the director.

export const SPEAKERS = {
  kaito: { label: 'Kaito', sub: '2-B', voice: 0.85 },
  mio: { label: 'Mio Tachibana', sub: 'CLASS REP · 2-C', voice: 1.25 },
  echo: { label: '???', sub: 'IN THE GLASS', voice: 0.6 },
  narration: { label: '', voice: 0 },
};

export const ENCOUNTER = [
  { who: 'mio', shot: 'onMio', expr: { surprised: 0.6 }, cue: 'turnToPlayer', text: "Oh — Sena? You're still here? The festival committee went home an hour ago." },
  { who: 'kaito', shot: 'onKaito', text: 'Forgot my notebook. What about you, Class Rep? Staying late again?' },
  { who: 'mio', shot: 'two', expr: { happy: 0.8 }, text: "Someone has to finish the posters. If they aren't *perfect*, it reflects on all of us." },
  { who: 'mio', shot: 'closeMio', expr: { relaxed: 0.4 }, cue: 'glanceWindow', text: 'Hey… do you ever feel like the window is looking back? Around this time, when the sun hits it just right.' },
  { who: 'kaito', shot: 'onKaito', text: "Can't say I have." },
  { who: 'mio', shot: 'onMio', expr: { sad: 0.7 }, text: "Every evening my reflection gets a little more… *correct*. It smiles when I'm supposed to. It never gets tired." },
  { who: 'mio', shot: 'window', expr: { sad: 0.9 }, cue: 'reveal', music: 'tension', text: "And lately… it's been smiling when I'm *not*." },
  { who: 'narration', shot: 'closeEcho', cue: 'echoGrin', text: "In the glass, Mio's reflection doesn't move with her. It's grinning." },
  { who: 'echo', shot: 'closeEcho', cue: 'echoTalk', text: "Why stop there? Tell him how ~tired~ you are. …No. I'll tell him myself." },
  { who: 'mio', shot: 'onMio', expr: { surprised: 1 }, cue: 'mioScared', text: 'Sena, step back — it can *hear* us!' },
  { who: 'echo', shot: 'pushEcho', cue: 'echoTalk', text: "I'm the version of you that never fails. Let me ~OUT~, and I'll make everything perfect." },
];

export const VICTORY_LINES = [
  { who: 'mio', shot: 'afterMio', expr: { sad: 0.4 }, text: "It's… quiet. I can't hear it anymore." },
  { who: 'kaito', shot: 'afterKaito', text: "Your posters don't need to be perfect, you know. Nobody does." },
  { who: 'mio', shot: 'afterMio', expr: { happy: 1 }, text: "…Then help me finish them tomorrow? Badly. *Together.*" },
];
