// Tema bruxo: bebidas viram poções, comidas viram criaturas e objetos encantados.

import { BASE, T, vapor } from './base.js';
import { uid, tom, faisca, faiscas, bolhas, aura } from './util.js';

// Silhuetas de frasco. "nivel" é a altura da superfície do líquido.
const FRASCOS = {
  redondo: {
    corpo: 'M44 20 h12 v17 q18 6 18 27 a24 24 0 1 1 -48 0 q0 -21 18 -27z',
    nivel: 52,
    rolha: '<rect x="42" y="11" width="16" height="11" rx="2.5" fill="#a0703f"/>',
    brilho: 'M33 60 q1 -11 11 -16',
    etiqueta: [58, 30],
  },
  alto: {
    corpo: 'M42 20 h16 v6 h2 q4 0 4 4 v50 q0 8 -8 8 h-12 q-8 0 -8 -8 v-50 q0 -4 4 -4 h2z',
    nivel: 40,
    rolha: '<circle cx="50" cy="15" r="7" fill="rgba(210,235,255,.55)"/><rect x="45" y="18" width="10" height="5" rx="1" fill="rgba(210,235,255,.55)"/>',
    brilho: 'M40 38 v38',
    etiqueta: [60, 26],
  },
  cristal: {
    corpo: 'M44 20 h12 v6 l14 14 l-4 44 q0 4 -4 4 H38 q-4 0 -4 -4 l-4 -44 l14 -14z',
    nivel: 44,
    rolha: '<path d="M43 11 h14 l-2 10 h-10z" fill="#8fd6ff"/>',
    brilho: 'M37 44 l3 36',
    etiqueta: null,
  },
  coracao: {
    corpo: 'M50 88 C20 70 13 54 19 42 C25 30 41 30 46 39 V22 h8 V39 C59 30 75 30 81 42 C87 54 80 70 50 88Z',
    nivel: 50,
    rolha: '<rect x="44" y="13" width="12" height="11" rx="2.5" fill="#c1446a"/>',
    brilho: 'M25 48 q2 -9 11 -11',
    etiqueta: null,
  },
  conico: {
    corpo: 'M43 18 h14 v22 l20 40 q3 8 -5 8 H28 q-8 0 -5 -8 l20 -40z',
    nivel: 58,
    rolha: '<rect x="41" y="9" width="18" height="11" rx="2.5" fill="#7c5a3a"/>',
    brilho: 'M36 72 l8 -16',
    etiqueta: [58, 30],
  },
};

const RUNAS = ['M0 -4 v8 M-3 -1 l3 -3 l3 3', 'M-3 -4 l6 8 M3 -4 l-6 8', 'M0 -4 v8 M0 0 l3 -3 M0 2 l-3 -3', 'M-3 4 v-8 l6 8 v-8'];

function etiqueta([x, y], i) {
  return `<path d="M${x - 4} ${y - 4} q6 2 8 8" stroke="#8b6b3a" stroke-width="1.4" fill="none"/>
    <g transform="translate(${x + 8} ${y + 9}) rotate(12)">
      <rect x="-8" y="-6" width="16" height="12" rx="1.5" fill="#efe0bd" stroke="#8b6b3a" stroke-width="1.2"/>
      <path d="${RUNAS[i % RUNAS.length]}" stroke="#7a2e1f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>`;
}

function pocao(forma, cor, { gas = false, bolhasQtd = 5, extra = '', semente = 0 } = {}) {
  const f = FRASCOS[forma];
  const clip = uid('cl');
  const superficie = tom(cor, 0.35);
  return `
    ${aura(cor, 50, 62, 48, 0.5)}
    <defs><clipPath id="${clip}"><path d="${f.corpo}"/></clipPath></defs>
    <path d="${f.corpo}" fill="rgba(200,225,255,.14)"/>
    <g clip-path="url(#${clip})">
      <g class="fx-liquido" style="transform-origin:50px ${f.nivel + 10}px">
        <rect x="0" y="${f.nivel}" width="100" height="60" fill="${cor}"/>
        <rect x="0" y="${f.nivel + 18}" width="100" height="60" fill="${tom(cor, -0.25)}" opacity=".6"/>
        <ellipse cx="50" cy="${f.nivel}" rx="34" ry="2.6" fill="${superficie}"/>
      </g>
      ${bolhas(gas ? 9 : bolhasQtd, { base: 88, sobe: 88 - f.nivel, rapido: gas, cor: gas ? 'rgba(255,255,255,.85)' : tom(cor, 0.6) })}
      ${gas ? '<g transform="skewX(-20)"><rect class="fx-reflexo" x="0" y="0" width="9" height="100" fill="rgba(255,255,255,.45)"/></g>' : ''}
    </g>
    ${T(`<path d="${f.corpo}" fill="none"/>`)}
    ${T(f.rolha)}
    <path d="${f.brilho}" stroke="rgba(255,255,255,.65)" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${f.etiqueta ? etiqueta(f.etiqueta, semente) : ''}
    ${extra}`;
}

const caneca = (cor) => `
  ${T(`
    <path d="M70 46 q16 0 16 14 q0 14 -16 14 v-7 q9 0 9 -7 q0 -7 -9 -7z" fill="#5b4a7a"/>
    <path d="M24 38 h46 v38 q0 12 -12 12 H36 q-12 0 -12 -12z" fill="#5b4a7a"/>
  `)}
  <ellipse cx="47" cy="38" rx="21" ry="4.5" fill="${cor}"/>
  <path d="M40 54 l7 -7 l7 7 l-7 16z M47 47 v23" stroke="#f4c35a" stroke-width="2" fill="none" stroke-linejoin="round"/>
  <path d="M30 46 v26" stroke="rgba(255,255,255,.3)" stroke-width="3" stroke-linecap="round"/>
  ${vapor(47, 30, 'rgba(230,210,255,.8)')}`;

const hidromel = (cor) => `
  ${aura('#f4c35a', 50, 60, 44, 0.35)}
  ${T(`
    <path d="M70 46 q16 0 16 14 q0 14 -16 14 v-7 q9 0 9 -7 q0 -7 -9 -7z" fill="#8a5a2b"/>
    <path d="M26 36 h44 v48 q0 4 -4 4 H30 q-4 0 -4 -4z" fill="#8a5a2b"/>
    <rect x="24" y="44" width="48" height="6" rx="2" fill="#9aa3ad"/>
    <rect x="24" y="74" width="48" height="6" rx="2" fill="#9aa3ad"/>
  `)}
  <g stroke="#6b4220" stroke-width="2"><path d="M37 52 v20"/><path d="M48 52 v20"/><path d="M59 52 v20"/></g>
  ${T(`<path d="M22 40 q-2 -10 8 -10 q2 -8 12 -6 q6 -8 14 -2 q10 -4 12 6 q9 0 7 12z" fill="#fff8e6"/>`)}
  <path class="fx-escorre" d="M31 40 v7 q0 3 3 3 q3 0 3 -3 v-7z" fill="#fff8e6"/>
  <ellipse cx="44" cy="32" rx="6" ry="2" fill="#fff" opacity=".8"/>
  ${faiscas('#ffe7a0', [[14, 30, 4, 0.2], [86, 24, 3.5, 1.2]])}`;

const DESENHOS = {
  // Bebidas por forma
  suco: (i, s) => pocao('redondo', i.cor, { semente: s }),
  refri: (i, s) => pocao('alto', i.cor, { gas: true, semente: s }),
  agua: (i, s) => pocao('cristal', i.cor, { gas: !!i.gas, extra: faiscas('#dff6ff', [[20, 30, 4, 0], [80, 50, 3.5, 1], [22, 78, 3, 1.8]]), semente: s }),
  vinho: (i, s) => pocao('coracao', i.cor, { semente: s, extra: faiscas('#ffc2d6', [[16, 26, 4, 0.4], [86, 70, 3, 1.4]]) }),
  drink: (i, s) => pocao('conico', i.cor, { semente: s, extra: vapor(50, 8, 'rgba(255,150,210,.7)') }),
  shake: (i, s) => pocao('conico', i.cor, { semente: s, bolhasQtd: 3, extra: '<path d="M34 76 q16 -10 32 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>' }),
  quente: (i) => caneca(i.cor),
  cerveja: (i) => hidromel(i.cor),

  // Comidas: o item continua reconhecível; a magia vem dos detalhes.
  hamburguer: () => `
    ${aura('#ffb36b', 50, 52, 44, 0.35)}
    <g class="fx-asa-e">${T('<path d="M18 46 C8 28 -6 20 -16 22 C-12 28 -11 31 -13 34 C-7 36 -5 39 -7 43 C-1 43 3 46 1 50 C7 50 12 50 18 46Z" fill="#f1e8ff"/>')}
      <path d="M12 44 q-10 -10 -22 -16 M8 46 q-6 -4 -14 -6" stroke="#b58ae0" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>
    <g class="fx-asa-d">${T('<path d="M82 46 C92 28 106 20 116 22 C112 28 111 31 113 34 C107 36 105 39 107 43 C101 43 97 46 99 50 C93 50 88 50 82 46Z" fill="#f1e8ff"/>')}
      <path d="M88 44 q10 -10 22 -16 M92 46 q6 -4 14 -6" stroke="#b58ae0" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>
    <g class="fx-flutua-lento">${BASE.hamburguer()}</g>
    ${faiscas('#fff6c9', [[50, 8, 4, 0.3], [90, 70, 3, 1.3], [10, 72, 3, 2]])}`,

  hotdog: () => `
    ${BASE.hotdog()}
    <g fill="#ffd23f" opacity=".85"><circle cx="30" cy="54" r="2"/><circle cx="60" cy="53" r="2.2"/><circle cx="78" cy="55" r="1.6"/></g>
    <g class="fx-chama"><path d="M94 58 q10 -8 4 -20 q-2 8 -6 6 q2 -8 -4 -12 q2 10 -4 16 q-2 6 10 10z" fill="#ff8a1f"/><path d="M95 56 q5 -4 2 -10 q-2 4 -5 4 q1 4 3 6z" fill="#ffe14d"/></g>`,

  batata_frita: () => `
    ${aura('#7cff6b', 50, 56, 40, 0.35)}
    ${T(`
      <rect x="29" y="18" width="8" height="40" rx="2" fill="#ffd257" transform="rotate(-14 33 38)"/>
      <rect x="43" y="22" width="8" height="36" rx="2" fill="#f5c542" transform="rotate(-20 47 40)"/>
      <rect x="38" y="12" width="8" height="44" rx="2" fill="#ffd257" transform="rotate(-5 42 34)"/>
      <rect x="48" y="9" width="8" height="46" rx="2" fill="#ffdb6e" transform="rotate(3 52 32)"/>
      <rect x="57" y="15" width="8" height="42" rx="2" fill="#ffd257" transform="rotate(10 61 36)"/>
      <rect x="64" y="22" width="8" height="36" rx="2" fill="#f5c542" transform="rotate(18 68 40)"/>
      <path d="M32 82 l-6 8 M68 82 l6 8" fill="none"/>
      <path d="M20 50 q-4 36 30 38 q34 -2 30 -38z" fill="#2d2a33"/>
      <ellipse cx="50" cy="50" rx="31" ry="6.5" fill="#3b3746"/>
    `)}
    <ellipse cx="50" cy="51" rx="25" ry="4" fill="#62e07a" opacity=".8"/>
    <path d="M28 60 q2 16 14 22" stroke="rgba(255,255,255,.18)" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${faiscas('#c8ffb0', [[14, 30, 4, 0.4], [86, 26, 3.5, 1.4]])}`,

  frango: () => `
    ${BASE.frango()}
    <g class="fx-pena" style="transform-origin:26px 28px">
      ${T('<path d="M26 28 q-16 -10 -14 -26 q14 6 18 22z" fill="#f4c35a"/>')}
      <path d="M26 27 q-8 -10 -11 -22" stroke="#b07a1e" stroke-width="1.4" fill="none"/>
    </g>
    ${faiscas('#fff6c9', [[86, 20, 4, 0.5], [14, 70, 3, 1.5]])}`,

  sanduiche: () => `
    <g class="fx-flutua-lento">
      ${BASE.sanduiche()}
      ${T('<path d="M50 5 l3 6.5 l7 1 l-5 5 l1.2 7 l-6.2 -3.3 l-6.2 3.3 l1.2 -7 l-5 -5 l7 -1z" fill="#f4c35a"/>')}
    </g>
    ${faiscas('#fff0c2', [[16, 22, 4, 0], [86, 24, 3, 1.1], [30, 8, 2.5, 1.8]])}`,

  sopa: () => `
    ${aura('#7cff6b', 50, 56, 40, 0.35)}
    ${T(`
      <path d="M26 80 l-6 10 M74 80 l6 10 M50 86 v6" fill="none" stroke-width="5"/>
      <ellipse cx="50" cy="44" rx="34" ry="8" fill="#2d2a33"/>
      <path d="M18 46 q-4 36 32 40 q36 -4 32 -40z" fill="#2d2a33"/>
      <ellipse cx="50" cy="45" rx="29" ry="6" fill="#f29a2e"/>
    `)}
    <path d="M24 60 q2 16 16 22" stroke="rgba(255,255,255,.2)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g>${bolhas(4, { x0: 32, x1: 68, base: 46, sobe: 10, cor: '#ffc46b', r: [2, 3.4] })}</g>
    ${vapor(50, 34, 'rgba(210,255,200,.75)')}`,

  sorvete: () => `
    ${aura('#9fe6ff', 50, 36, 40, 0.55)}
    <g class="fx-flutua-lento">${BASE.sorvete()}</g>
    ${faisca(18, 20, 5, '#e6fbff', 0)}${faisca(84, 26, 4, '#e6fbff', 0.9)}${faisca(80, 62, 3, '#e6fbff', 1.7)}${faisca(20, 58, 3, '#e6fbff', 2.3)}`,

  cookie: () => `
    ${aura('#f4c35a', 50, 52, 40, 0.35)}
    <g class="fx-gira-lento" style="transform-origin:50px 54px">
      ${T('<path d="M50 16 L60 42 L88 43 L66 60 L74 88 L50 72 L26 88 L34 60 L12 43 L40 42Z" fill="#d9a05b"/>')}
      <path d="M50 26 L57 44 L77 45 L61 57 L67 77 L50 66 L33 77 L39 57 L23 45 L43 44Z" fill="none" stroke="#fff4dc" stroke-width="2" stroke-dasharray="3 3"/>
      <g fill="#4a2412"><circle cx="48" cy="48" r="2.4"/><circle cx="56" cy="58" r="2"/><circle cx="42" cy="60" r="2"/></g>
    </g>
    ${faiscas('#fff6c9', [[14, 20, 4, 0.2], [88, 22, 3.5, 1], [86, 80, 3, 1.8]])}`,

};

// Itens sem desenho próprio: ícone base + levitação + faíscas mágicas.
function encantado(tipo, info) {
  return `<g class="fx-flutua-lento">${BASE[tipo] ? BASE[tipo](info) : BASE.generico()}</g>${faiscas()}`;
}

export function iconeBruxo(tipo, info, semente = 0) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info, semente);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info, semente);
  return encantado(tipo, info);
}
