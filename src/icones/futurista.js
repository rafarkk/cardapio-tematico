// Tema futurista: latas de neon, cápsulas, orbes em gravidade zero; comidas como hologramas.

import { BASE, T, vapor, circuloOndulado } from './base.js';
import { uid, tom, bolhas, aura } from './util.js';

const CIANO = '#37f0ff';

/** Comida projetada: base emissora + feixe + ícone com varredura. */
function holograma(desenho) {
  const feixe = uid('fx');
  const clip = uid('hc');
  const linhas = uid('ln');
  return `
    <defs>
      <linearGradient id="${feixe}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="${CIANO}" stop-opacity=".35"/><stop offset="1" stop-color="${CIANO}" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="${clip}"><path d="M22 90 L6 8 H94 L78 90Z"/></clipPath>
      <pattern id="${linhas}" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="${CIANO}" opacity=".22"/></pattern>
    </defs>
    <path d="M22 90 L6 8 H94 L78 90Z" fill="url(#${feixe})"/>
    <g class="fx-holo">
      <g transform="translate(9 3) scale(0.82)">${desenho}</g>
    </g>
    <g clip-path="url(#${clip})">
      <rect x="0" y="0" width="100" height="92" fill="url(#${linhas})"/>
      <rect class="fx-varredura" x="0" y="0" width="100" height="6" fill="${CIANO}" opacity=".35"/>
    </g>
    <ellipse cx="50" cy="91" rx="31" ry="6" fill="#141d3a" stroke="${CIANO}" stroke-width="1.6"/>
    <ellipse class="fx-pulsa" cx="50" cy="90" rx="20" ry="3" fill="${CIANO}"/>`;
}

function lata(cor) {
  const clip = uid('lc');
  const corpo = 'M30 26 q0 -4 4 -4 h32 q4 0 4 4 v58 q0 4 -4 4 H34 q-4 0 -4 -4z';
  return `
    ${aura(cor, 50, 56, 44, 0.45)}
    <defs><clipPath id="${clip}"><path d="${corpo}"/></clipPath></defs>
    ${T(`<path d="${corpo}" fill="${tom(cor, -0.35)}"/>`)}
    <g clip-path="url(#${clip})">
      <rect x="30" y="40" width="40" height="22" fill="${cor}"/>
      <path d="M52 42 l-8 10 h6 l-4 10 l10 -13 h-6 l4 -7z" fill="#fff"/>
      <rect x="30" y="38" width="40" height="2.5" fill="${CIANO}" class="fx-pulsa"/>
      <rect x="30" y="62" width="40" height="2.5" fill="${CIANO}" class="fx-pulsa"/>
      <g transform="skewX(-20)"><rect class="fx-reflexo" x="0" y="0" width="8" height="100" fill="rgba(255,255,255,.4)"/></g>
    </g>
    ${T(`<ellipse cx="50" cy="22" rx="20" ry="4" fill="#c9d3e6"/>`)}
    <path d="M48 20 h8" stroke="#6b7690" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M35 28 v54" stroke="rgba(255,255,255,.35)" stroke-width="2.5" stroke-linecap="round"/>
    <g fill="rgba(255,255,255,.55)"><circle cx="62" cy="72" r="1.2"/><circle cx="58" cy="78" r="1"/><circle cx="64" cy="32" r="1"/></g>`;
}

function capsula(cor, { largura = 28, nivel = 36, marcas = false } = {}) {
  const x = 50 - largura / 2;
  const clip = uid('cc');
  const tubo = `M${x} 26 h${largura} v54 h${-largura}z`;
  return `
    ${aura(cor, 50, 56, 42, 0.5)}
    <defs><clipPath id="${clip}"><path d="${tubo}"/></clipPath></defs>
    <path d="${tubo}" fill="rgba(180,230,255,.14)"/>
    <g clip-path="url(#${clip})">
      <g class="fx-liquido" style="transform-origin:50px ${nivel + 10}px"><rect x="20" y="${nivel}" width="60" height="60" fill="${cor}"/>
      <ellipse cx="50" cy="${nivel}" rx="30" ry="2" fill="${tom(cor, 0.45)}"/></g>
      ${bolhas(5, { x0: x + 5, x1: x + largura - 5, base: 80, sobe: 80 - nivel, cor: tom(cor, 0.6) })}
    </g>
    ${T(`<path d="${tubo}" fill="none"/>
      <rect x="${x - 3}" y="14" width="${largura + 6}" height="13" rx="4" fill="#c9d3e6"/>
      <rect x="${x - 3}" y="79" width="${largura + 6}" height="11" rx="4" fill="#c9d3e6"/>`)}
    <rect class="fx-pulsa" x="${x + 2}" y="19" width="${largura - 4}" height="3" rx="1.5" fill="${CIANO}"/>
    <path d="M${x + 5} 30 v46" stroke="rgba(255,255,255,.5)" stroke-width="2.4" stroke-linecap="round"/>
    ${marcas ? [40, 50, 60, 70].map((y) => `<path d="M${x + largura - 7} ${y} h5" stroke="#fff" stroke-width="1.4" opacity=".7"/>`).join('') : ''}`;
}

function copoLed(cor) {
  const clip = uid('cp');
  const copo = 'M32 18 h36 l-6 64 H38z';
  return `
    ${aura(cor, 50, 56, 42, 0.45)}
    <defs><clipPath id="${clip}"><path d="${copo}"/></clipPath></defs>
    <path d="${copo}" fill="rgba(200,235,255,.15)"/>
    <g clip-path="url(#${clip})">
      <rect x="20" y="30" width="60" height="60" fill="${cor}"/>
      ${bolhas(7, { x0: 40, x1: 60, base: 80, sobe: 48, rapido: true })}
      <rect x="20" y="22" width="60" height="9" fill="#fffaf0"/>
    </g>
    ${T(`<path d="${copo}" fill="none"/><rect x="30" y="82" width="40" height="8" rx="3" fill="#1b2542"/>`)}
    <rect class="fx-pulsa" x="34" y="85" width="32" height="2" rx="1" fill="${CIANO}"/>
    <path d="M37 26 l3 50" stroke="rgba(255,255,255,.5)" stroke-width="2.4" stroke-linecap="round"/>`;
}

function orbe(cor, { tripe = false } = {}) {
  const clip = uid('ob');
  return `
    ${aura(cor, 50, 44, 46, 0.6)}
    <g class="${tripe ? '' : 'fx-flutua'}">
      <defs><clipPath id="${clip}"><circle cx="50" cy="44" r="22"/></clipPath></defs>
      <circle cx="50" cy="44" r="22" fill="rgba(200,235,255,.14)"/>
      <g clip-path="url(#${clip})"><g class="fx-giro" style="transform-origin:50px 44px">
        <path d="${circuloOndulado(50, 50, 20, 5, 2.2)}" fill="${cor}"/>
      </g></g>
      ${T(`<circle cx="50" cy="44" r="22" fill="none"/>`)}
      <path d="M36 36 q4 -8 12 -10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g class="fx-orbita" style="transform-origin:50px 44px"><ellipse cx="50" cy="44" rx="34" ry="8" fill="none" stroke="${CIANO}" stroke-width="1.6" stroke-dasharray="4 5"/></g>
    </g>
    ${tripe
      ? T(`<path d="M50 66 v8 M50 74 l-16 16 M50 74 l16 16 M50 74 v16" fill="none" stroke-width="3"/><rect x="38" y="64" width="24" height="5" rx="2" fill="#c9d3e6"/>`)
      : `<ellipse cx="50" cy="88" rx="18" ry="3.5" fill="${cor}" opacity=".35" class="fx-pulsa"/>`}`;
}

function termico(cor) {
  return `
    ${T(`
      <path d="M32 30 h36 l-4 56 q0 3 -3 3 H39 q-3 0 -3 -3z" fill="#dfe6f2"/>
      <rect x="29" y="22" width="42" height="10" rx="4" fill="#3a4666"/>
      <rect x="44" y="16" width="12" height="7" rx="2" fill="#3a4666"/>
    `)}
    <rect x="38" y="46" width="24" height="12" rx="2" fill="#0d1530"/>
    <text x="50" y="55.5" text-anchor="middle" font-size="8.5" font-family="monospace" fill="${CIANO}" class="fx-pulsa">85°</text>
    <rect x="36" y="66" width="28" height="4" fill="${cor}"/>
    <path d="M37 34 l2 48" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    ${vapor(50, 10, 'rgba(160,240,255,.7)')}`;
}

function sache(cor) {
  return `
    <path d="M58 8 l-4 22" stroke="${CIANO}" stroke-width="3.4" stroke-linecap="round"/>
    ${T(`<path d="M30 24 q20 -8 40 0 l4 60 q-24 6 -48 0z" fill="${cor}"/>`)}
    <rect x="34" y="46" width="32" height="18" rx="3" fill="#0d1530" opacity=".85"/>
    <path d="M38 55 h6 l3 -5 l4 10 l3 -5 h8" stroke="${CIANO}" stroke-width="1.8" fill="none" class="fx-pulsa"/>
    <path d="M34 30 l-2 50" stroke="rgba(255,255,255,.45)" stroke-width="3" stroke-linecap="round"/>`;
}

const DESENHOS = {
  refri: (i) => lata(i.cor),
  suco: (i) => capsula(i.cor),
  agua: (i) => capsula(i.cor, { largura: 36, nivel: 34, marcas: true }),
  cerveja: (i) => copoLed(i.cor),
  vinho: (i) => orbe(i.cor, { tripe: true }),
  drink: (i) => orbe(i.cor),
  quente: (i) => termico(i.cor),
  shake: (i) => sache(i.cor),
};

export function iconeFuturista(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return holograma(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
