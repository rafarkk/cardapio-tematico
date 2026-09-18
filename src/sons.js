// Efeitos sonoros sintetizados com Web Audio (sem arquivos de áudio).

import { estado } from './loja.js';

let ctx = null;
function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tom({ f = 440, f2 = null, dur = 0.15, tipo = 'sine', vol = 0.12, atraso = 0 }) {
  const a = audio();
  const t0 = a.currentTime + atraso;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(f, t0);
  if (f2) osc.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function ruido({ dur = 0.2, vol = 0.1, freq = 1200, q = 1, atraso = 0 }) {
  const a = audio();
  const t0 = a.currentTime + atraso;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
  const dados = buf.getChannelData(0);
  for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource();
  src.buffer = buf;
  const filtro = a.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.value = freq;
  filtro.Q.value = q;
  const g = a.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filtro).connect(g).connect(a.destination);
  src.start(t0);
}

const arpejo = (notas, opts) =>
  notas.forEach((f, i) => tom({ ...opts, f, atraso: (opts.atraso ?? 0) + i * (opts.passo ?? 0.09) }));

const PERFIS = {
  bruxo: {
    nav: () => tom({ f: 1320, dur: 0.08, tipo: 'triangle', vol: 0.05 }),
    pegar: () => tom({ f: 660, f2: 1100, dur: 0.18, vol: 0.08 }),
    voltar: () => tom({ f: 900, f2: 500, dur: 0.18, vol: 0.07 }),
    adicionar: () => {
      tom({ f: 320, f2: 110, dur: 0.22, vol: 0.18 });
      tom({ f: 480, f2: 160, dur: 0.16, vol: 0.12, atraso: 0.1 });
      arpejo([1568, 2093], { tipo: 'triangle', dur: 0.35, vol: 0.05, atraso: 0.18 });
    },
    esvaziar: () => {
      ruido({ dur: 0.6, vol: 0.12, freq: 500 });
      tom({ f: 200, f2: 60, dur: 0.5, vol: 0.15 });
    },
    confirmar: () => arpejo([523, 659, 784, 1047, 1319], { tipo: 'triangle', dur: 0.6, vol: 0.08, passo: 0.1 }),
  },
  medieval: {
    nav: () => ruido({ dur: 0.05, vol: 0.12, freq: 900, q: 4 }),
    pegar: () => { ruido({ dur: 0.06, vol: 0.18, freq: 700, q: 3 }); tom({ f: 180, dur: 0.06, tipo: 'square', vol: 0.04 }); },
    voltar: () => ruido({ dur: 0.08, vol: 0.15, freq: 500, q: 3 }),
    adicionar: () => {
      ruido({ dur: 0.12, vol: 0.25, freq: 300, q: 2 });
      tom({ f: 2400, dur: 0.12, tipo: 'triangle', vol: 0.06, atraso: 0.12 });
      tom({ f: 3100, dur: 0.18, tipo: 'triangle', vol: 0.05, atraso: 0.2 });
    },
    esvaziar: () => [0, 0.08, 0.15, 0.24].forEach((a, i) => tom({ f: 2200 + i * 300, dur: 0.12, tipo: 'triangle', vol: 0.05, atraso: a })),
    confirmar: () => arpejo([392, 523, 659, 784, 784], { tipo: 'square', dur: 0.28, vol: 0.05, passo: 0.14 }),
  },
  futurista: {
    nav: () => tom({ f: 1800, dur: 0.04, tipo: 'square', vol: 0.03 }),
    pegar: () => tom({ f: 400, f2: 1400, dur: 0.12, tipo: 'sawtooth', vol: 0.04 }),
    voltar: () => tom({ f: 1400, f2: 400, dur: 0.12, tipo: 'sawtooth', vol: 0.04 }),
    adicionar: () => {
      tom({ f: 1800, f2: 180, dur: 0.3, tipo: 'sawtooth', vol: 0.05 });
      tom({ f: 200, f2: 2400, dur: 0.35, tipo: 'sine', vol: 0.08, atraso: 0.15 });
    },
    esvaziar: () => tom({ f: 1200, f2: 60, dur: 0.6, tipo: 'sawtooth', vol: 0.06 }),
    confirmar: () => {
      tom({ f: 200, f2: 1600, dur: 0.8, tipo: 'sine', vol: 0.08 });
      arpejo([1760, 2093, 2637], { tipo: 'square', dur: 0.08, vol: 0.03, passo: 0.08, atraso: 0.8 });
    },
  },
  pirata: {
    nav: () => ruido({ dur: 0.07, vol: 0.1, freq: 400, q: 6 }),
    pegar: () => { ruido({ dur: 0.06, vol: 0.16, freq: 650, q: 3 }); tom({ f: 150, dur: 0.07, tipo: 'triangle', vol: 0.06 }); },
    voltar: () => ruido({ dur: 0.09, vol: 0.12, freq: 450, q: 3 }),
    adicionar: () => {
      ruido({ dur: 0.45, vol: 0.18, freq: 900, q: 0.8 });
      tom({ f: 2600, dur: 0.12, tipo: 'triangle', vol: 0.05, atraso: 0.18 });
      tom({ f: 3300, dur: 0.18, tipo: 'triangle', vol: 0.04, atraso: 0.26 });
    },
    esvaziar: () => { ruido({ dur: 0.9, vol: 0.2, freq: 600, q: 0.6 }); tom({ f: 180, f2: 70, dur: 0.5, vol: 0.1 }); },
    confirmar: () => [0, 0.45].forEach((a) => { tom({ f: 880, dur: 0.9, tipo: 'sine', vol: 0.09, atraso: a }); tom({ f: 1760, dur: 0.6, tipo: 'sine', vol: 0.03, atraso: a }); }),
  },
  faroeste: {
    nav: () => { tom({ f: 2800, dur: 0.05, tipo: 'triangle', vol: 0.04 }); tom({ f: 3400, dur: 0.05, tipo: 'triangle', vol: 0.03, atraso: 0.05 }); },
    pegar: () => ruido({ dur: 0.05, vol: 0.16, freq: 1100, q: 4 }),
    voltar: () => ruido({ dur: 0.07, vol: 0.12, freq: 700, q: 4 }),
    adicionar: () => {
      tom({ f: 140, dur: 0.12, tipo: 'square', vol: 0.06 });
      ruido({ dur: 0.18, vol: 0.14, freq: 2500, q: 2, atraso: 0.02 });
      tom({ f: 2400, dur: 0.14, tipo: 'triangle', vol: 0.05, atraso: 0.14 });
    },
    esvaziar: () => [0, 0.07, 0.13, 0.21, 0.3].forEach((a, i) => tom({ f: 1800 + i * 250, dur: 0.1, tipo: 'triangle', vol: 0.05, atraso: a })),
    confirmar: () => arpejo([392, 494, 587, 784, 587, 784], { tipo: 'square', dur: 0.2, vol: 0.04, passo: 0.12 }),
  },
  mar: {
    nav: () => tom({ f: 600, f2: 950, dur: 0.07, vol: 0.06 }),
    pegar: () => tom({ f: 420, f2: 900, dur: 0.12, vol: 0.08 }),
    voltar: () => tom({ f: 900, f2: 420, dur: 0.12, vol: 0.07 }),
    adicionar: () => {
      [0, 0.06, 0.13, 0.19, 0.27].forEach((a, i) => tom({ f: 500 + i * 140, f2: 900 + i * 180, dur: 0.07, vol: 0.07, atraso: a }));
      arpejo([1568, 2093], { tipo: 'sine', dur: 0.4, vol: 0.04, atraso: 0.3 });
    },
    esvaziar: () => { ruido({ dur: 0.8, vol: 0.1, freq: 300, q: 0.7 }); tom({ f: 700, f2: 200, dur: 0.6, vol: 0.06 }); },
    confirmar: () => arpejo([784, 988, 1175, 1568, 1976], { tipo: 'sine', dur: 0.5, vol: 0.06, passo: 0.09 }),
  },
  guilda: {
    nav: () => tom({ f: 2100, dur: 0.06, tipo: 'triangle', vol: 0.04 }),
    pegar: () => ruido({ dur: 0.08, vol: 0.14, freq: 320, q: 2 }),
    voltar: () => ruido({ dur: 0.08, vol: 0.12, freq: 260, q: 2 }),
    adicionar: () => {
      ruido({ dur: 0.1, vol: 0.14, freq: 280, q: 2 });
      arpejo([880, 1175, 1760], { tipo: 'square', dur: 0.1, vol: 0.035, passo: 0.07, atraso: 0.08 });
    },
    esvaziar: () => [0, 0.06, 0.11, 0.18, 0.24, 0.33].forEach((a, i) => tom({ f: 2000 + (i % 3) * 400, dur: 0.1, tipo: 'triangle', vol: 0.045, atraso: a })),
    confirmar: () => {
      arpejo([523, 659, 784, 1047], { tipo: 'square', dur: 0.16, vol: 0.04, passo: 0.1 });
      tom({ f: 1568, dur: 0.6, tipo: 'triangle', vol: 0.06, atraso: 0.42 });
    },
  },
};

export function tocar(evento) {
  if (!estado.som) return;
  try {
    PERFIS[estado.tema]?.[evento]?.();
  } catch {
    /* áudio indisponível: segue em silêncio */
  }
}
