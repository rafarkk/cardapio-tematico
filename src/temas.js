// Configuração de cada tema: textos, ícones, receptáculo (o "carrinho"), decoração e partículas.
// Para criar um tema novo: adicione uma entrada aqui, um arquivo em src/icones e um CSS em src/estilos.

import { infoTipo } from './tipos.js';
import { estado } from './loja.js';
import { APELIDOS } from './apelidos.js';
import { iconeBruxo } from './icones/bruxo.js';
import { iconeMedieval } from './icones/medieval.js';
import { iconeFuturista } from './icones/futurista.js';
import { iconePirata } from './icones/pirata.js';
import { iconeFaroeste } from './icones/faroeste.js';
import { iconeMar } from './icones/mar.js';
import { iconeGuilda } from './icones/guilda.js';

const repetir = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');

const CALDEIRAO = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="158" rx="80" ry="10"/>
  <g class="fogo">
    <path d="M60 162 l80 -10 M62 152 l78 10" stroke="#5a3a22" stroke-width="7" stroke-linecap="round"/>
    <path class="fx-chama" d="M76 158 q-8 -14 4 -24 q0 10 8 8 q-4 -12 8 -20 q-2 14 8 18 q4 -8 2 -14 q14 10 6 30z" fill="#ff8a1f"/>
    <path class="fx-chama lenta" d="M88 158 q-4 -10 4 -16 q2 6 6 4 q0 -6 6 -10 q0 10 6 12 q6 6 -2 12z" fill="#ffe14d"/>
  </g>
  <path d="M46 128 l-8 22 M154 128 l8 22" stroke="#1a1820" stroke-width="7" stroke-linecap="round"/>
  <path class="corpo" d="M28 70 q-6 72 72 80 q78 -8 72 -80z"/>
  <path d="M40 92 q4 34 40 46" stroke="rgba(255,255,255,.12)" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="24" cy="84" r="9" fill="none" stroke="#3a3645" stroke-width="5"/>
  <circle cx="176" cy="84" r="9" fill="none" stroke="#3a3645" stroke-width="5"/>
  <ellipse class="borda" cx="100" cy="70" rx="76" ry="17"/>
  <ellipse class="caldo" cx="100" cy="71" rx="65" ry="11"/>
  <g class="borbulhas">
    ${[[70, 70, 5, 0], [96, 74, 7, 0.6], [124, 69, 4, 1.1], [112, 76, 5, 1.7], [82, 76, 4, 2.2]]
      .map(([x, y, r, a]) => `<circle class="borbulha" cx="${x}" cy="${y}" r="${r}" style="--atraso:${a}s"/>`)
      .join('')}
  </g>
  <g class="fumaca">${repetir(3, (i) => `<circle cx="${80 + i * 20}" cy="56" r="${10 + i * 2}" style="--atraso:${i * 0.9}s"/>`)}</g>
</svg>`;

const BAU = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="160" rx="84" ry="9"/>
  <g class="luz-bau">${repetir(5, (i) => `<path d="M100 84 L${40 + i * 30} 0 L${56 + i * 30} 0Z"/>`)}</g>
  <rect x="34" y="84" width="132" height="68" rx="5" fill="#7a4a22" stroke="#2a1810" stroke-width="3"/>
  <path d="M34 102 h132 M34 124 h132" stroke="#5a3417" stroke-width="2"/>
  <rect x="52" y="84" width="12" height="68" fill="#6f7780" stroke="#2a1810" stroke-width="2"/>
  <rect x="136" y="84" width="12" height="68" fill="#6f7780" stroke="#2a1810" stroke-width="2"/>
  <g class="moedas" fill="#f2c14e" stroke="#9a6b12" stroke-width="1.5">
    <ellipse cx="80" cy="84" rx="9" ry="4"/><ellipse cx="96" cy="82" rx="9" ry="4"/><ellipse cx="116" cy="84" rx="9" ry="4"/>
  </g>
  <g class="tampa">
    <path d="M34 86 v-22 q0 -32 66 -32 q66 0 66 32 v22z" fill="#8a5a2b" stroke="#2a1810" stroke-width="3"/>
    <path d="M40 56 q60 -20 120 0" stroke="#6b4220" stroke-width="2" fill="none"/>
    <path d="M52 86 v-44 q0 -6 6 -8 h6 v52z M136 86 v-52 h6 q6 2 6 8 v44z" fill="#6f7780" stroke="#2a1810" stroke-width="2"/>
  </g>
  <rect x="88" y="78" width="24" height="26" rx="4" fill="#d9a441" stroke="#2a1810" stroke-width="2.5"/>
  <path d="M100 86 a3 3 0 1 1 -0.1 0z M98.5 90 h3 l1 7 h-5z" fill="#2a1810"/>
</svg>`;

const TELEPORTADOR = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <defs>
    <linearGradient id="feixe-tp" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#37f0ff" stop-opacity=".55"/><stop offset="1" stop-color="#37f0ff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path class="feixe" d="M46 140 L60 6 H140 L154 140Z" fill="url(#feixe-tp)"/>
  <g class="aneis">${repetir(3, (i) => `<ellipse cx="100" cy="130" rx="46" ry="8" style="--atraso:${i * 0.8}s"/>`)}</g>
  <rect x="14" y="70" width="14" height="76" rx="4" fill="#1b2542" stroke="#6b7690" stroke-width="2"/>
  <rect x="172" y="70" width="14" height="76" rx="4" fill="#1b2542" stroke="#6b7690" stroke-width="2"/>
  <g class="leds">${repetir(4, (i) => `<rect x="18" y="${80 + i * 14}" width="6" height="6" rx="1" style="--atraso:${i * 0.25}s"/><rect x="176" y="${80 + i * 14}" width="6" height="6" rx="1" style="--atraso:${i * 0.25 + 0.5}s"/>`)}</g>
  <ellipse cx="100" cy="148" rx="84" ry="18" fill="#141d3a" stroke="#6b7690" stroke-width="2.5"/>
  <ellipse cx="100" cy="142" rx="70" ry="13" fill="#0d1530" stroke="#37f0ff" stroke-width="2"/>
  <ellipse class="plataforma" cx="100" cy="142" rx="54" ry="9"/>
</svg>`;

const BAU_TESOURO = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="158" rx="84" ry="9"/>
  <ellipse cx="100" cy="152" rx="94" ry="16" fill="#e9d3a0"/>
  <path d="M152 146 l12 8 M164 146 l-12 8" stroke="#a8322b" stroke-width="3.5" stroke-linecap="round"/>
  <g class="luz-tesouro">${repetir(5, (i) => `<path d="M100 76 L${46 + i * 27} 0 L${58 + i * 27} 0Z"/>`)}</g>
  <g class="tampa">
    <path d="M40 80 q0 -44 60 -46 q60 2 60 46z" fill="#7a4424" stroke="#2a1810" stroke-width="3"/>
    <path d="M48 78 q2 -32 52 -34 q50 2 52 34" fill="none" stroke="#c9962e" stroke-width="5"/>
    <path d="M70 38 v40 M130 38 v40" stroke="#c9962e" stroke-width="6"/>
  </g>
  <g class="tesouro">
    <path d="M40 86 q10 -18 26 -14 q8 -12 22 -6 q10 -10 22 -2 q12 -8 24 2 q14 -4 26 20z" fill="#e8b53a" stroke="#9a6b12" stroke-width="2"/>
    <g fill="#f5d36a" stroke="#9a6b12" stroke-width="1.5">
      <ellipse cx="62" cy="76" rx="7" ry="3"/><ellipse cx="96" cy="70" rx="7" ry="3"/><ellipse cx="130" cy="75" rx="7" ry="3"/>
      <ellipse cx="80" cy="82" rx="6" ry="2.6"/><ellipse cx="114" cy="80" rx="6" ry="2.6"/>
    </g>
    <path d="M84 66 l6 -8 l6 8 l-6 8z" fill="#d7263d" stroke="#2a1810" stroke-width="1.5"/>
    <path d="M120 64 l5 -7 l5 7 l-5 7z" fill="#3fbf8a" stroke="#2a1810" stroke-width="1.5"/>
    <circle cx="68" cy="68" r="4.5" fill="#3aa0ff" stroke="#2a1810" stroke-width="1.5"/>
    <path d="M100 52 h14 q0 8 -7 10 q-7 -2 -7 -10z M107 62 v6 M102 69 h10" fill="#e8b53a" stroke="#9a6b12" stroke-width="1.6"/>
  </g>
  <rect x="38" y="84" width="124" height="62" rx="6" fill="#6b3a1c" stroke="#2a1810" stroke-width="3"/>
  <path d="M38 104 h124 M38 124 h124" stroke="#4a2612" stroke-width="2"/>
  <g fill="#c9962e" stroke="#2a1810" stroke-width="2">
    <rect x="38" y="84" width="124" height="8"/><rect x="38" y="138" width="124" height="8"/>
    <rect x="52" y="84" width="10" height="62"/><rect x="138" y="84" width="10" height="62"/>
  </g>
  <path d="M62 88 q18 20 38 14 q20 6 38 -14" fill="none" stroke="#f5f0ff" stroke-width="4" stroke-dasharray="0.1 6" stroke-linecap="round"/>
  <rect x="86" y="96" width="28" height="30" rx="4" fill="#e8b53a" stroke="#2a1810" stroke-width="2.5"/>
  <circle cx="100" cy="106" r="6" fill="#2a1810"/><rect x="96.5" y="110" width="7" height="5" rx="1" fill="#2a1810"/>
  <circle cx="97.6" cy="105.5" r="1.6" fill="#e8b53a"/><circle cx="102.4" cy="105.5" r="1.6" fill="#e8b53a"/>
  <path d="M91 118 l18 5 M109 118 l-18 5" stroke="#2a1810" stroke-width="2.4" stroke-linecap="round"/>
  <g class="faiscas-bau" fill="#fff6c8">${[[64, 62], [108, 54], [142, 70], [86, 80]]
    .map(([x, y], i) => `<path d="M${x} ${y - 5} l1.3 3.7 l3.7 1.3 l-3.7 1.3 l-1.3 3.7 l-1.3 -3.7 l-3.7 -1.3 l3.7 -1.3z" style="--atraso:${i * 0.5}s"/>`)
    .join('')}</g>
</svg>`;

const CARRINHO_MINA = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="162" rx="84" ry="7"/>
  <g fill="#6b4220">${repetir(8, (i) => `<rect x="${4 + i * 25}" y="150" width="14" height="14" rx="2"/>`)}</g>
  <path d="M0 152 H200 M0 160 H200" stroke="#5b5f66" stroke-width="4"/>
  <g class="vagonete">
    <g class="pepitas">
      <path d="M56 70 q6 -18 20 -12 q8 -12 20 -2 q14 -10 22 4 q14 -4 20 10z" fill="#e8b53a" stroke="#9a6b12" stroke-width="2"/>
      <g fill="#fff6c8"><circle cx="78" cy="60" r="2.2"/><circle cx="104" cy="58" r="2.2"/><circle cx="92" cy="64" r="1.8"/></g>
    </g>
    <g class="dinamite">
      <path d="M131 40 q8 -10 2 -18 q-4 -5 2 -10" fill="none" stroke="#3b2415" stroke-width="2"/>
      <g fill="#c0392b" stroke="#2a1810" stroke-width="2"><rect x="118" y="38" width="9" height="30" rx="2"/><rect x="127" y="36" width="9" height="32" rx="2"/><rect x="136" y="40" width="9" height="28" rx="2"/></g>
      <rect x="116" y="52" width="31" height="6" rx="1" fill="#6b4220" stroke="#2a1810" stroke-width="1.6"/>
      <path class="pavio" d="M135 12 l2 4 l4 1 l-4 1 l-2 4 l-2 -4 l-4 -1 l4 -1z" fill="#ffd23f"/>
    </g>
    <path d="M42 72 h116 l-12 58 H54z" fill="#7d858f" stroke="#2a1810" stroke-width="3"/>
    <rect x="36" y="64" width="128" height="12" rx="3" fill="#5b5f66" stroke="#2a1810" stroke-width="3"/>
    <path d="M72 78 v50 M100 78 v52 M128 78 v50" stroke="#5b5f66" stroke-width="3"/>
    <g fill="#3b3f45">${repetir(6, (i) => `<circle cx="${46 + i * 21.6}" cy="70" r="2.2"/>`)}</g>
    <g class="roda" style="transform-origin:72px 138px"><circle cx="72" cy="138" r="14" fill="#3b3f45" stroke="#2a1810" stroke-width="3"/><path d="M72 125 v26 M59 138 h26" stroke="#9aa3ad" stroke-width="3"/><circle cx="72" cy="138" r="4" fill="#9aa3ad"/></g>
    <g class="roda" style="transform-origin:128px 138px"><circle cx="128" cy="138" r="14" fill="#3b3f45" stroke="#2a1810" stroke-width="3"/><path d="M128 125 v26 M115 138 h26" stroke="#9aa3ad" stroke-width="3"/><circle cx="128" cy="138" r="4" fill="#9aa3ad"/></g>
  </g>
</svg>`;

const MOCHILA = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="160" rx="70" ry="8"/>
  <g transform="rotate(-18 52 60)">
    <rect x="49" y="16" width="6" height="28" rx="2" fill="#6b4220" stroke="#2a1810" stroke-width="2"/>
    <rect x="40" y="42" width="24" height="6" rx="2" fill="#c9962e" stroke="#2a1810" stroke-width="2"/>
    <circle cx="52" cy="14" r="5" fill="#c9962e" stroke="#2a1810" stroke-width="2"/>
  </g>
  <g transform="rotate(16 148 50)">
    <rect x="140" y="18" width="12" height="36" rx="6" fill="#efe0bd" stroke="#2a1810" stroke-width="2"/>
    <path d="M140 34 h12" stroke="#a8322b" stroke-width="3"/>
  </g>
  <g class="saco-dormir">
    <rect x="56" y="28" width="88" height="22" rx="11" fill="#5f7f4f" stroke="#2a1810" stroke-width="3"/>
    <path d="M74 28 v22 M126 28 v22" stroke="#6b4220" stroke-width="4"/>
    <ellipse cx="144" cy="39" rx="5" ry="11" fill="#4a6a3c" stroke="#2a1810" stroke-width="2"/>
  </g>
  <path d="M52 64 q0 -16 16 -16 h64 q16 0 16 16 v76 q0 12 -12 12 h-72 q-12 0 -12 -12z" fill="#8a5a2b" stroke="#2a1810" stroke-width="3"/>
  <ellipse cx="100" cy="56" rx="40" ry="8" fill="#3b2211"/>
  <path d="M146 96 h14 q6 0 6 6 v24 q0 6 -6 6 h-14z" fill="#7a4a22" stroke="#2a1810" stroke-width="2.5"/>
  <path d="M42 102 q-10 4 -8 16 q2 10 12 10 q10 0 10 -10 q0 -12 -8 -16z" fill="#b8935a" stroke="#2a1810" stroke-width="2"/>
  <path d="M40 104 q6 4 12 0" stroke="#6b4220" stroke-width="2" fill="none"/>
  <rect x="70" y="104" width="60" height="38" rx="8" fill="#7a4a22" stroke="#2a1810" stroke-width="2.5"/>
  <rect x="94" y="100" width="12" height="18" rx="2" fill="#5a3417"/>
  <rect x="95" y="112" width="10" height="8" rx="1.5" fill="none" stroke="#c9962e" stroke-width="2"/>
  <g class="tampa">
    <path d="M52 60 q48 -14 96 0 v26 q-48 14 -96 0z" fill="#a8743f" stroke="#2a1810" stroke-width="3"/>
    <path d="M58 66 q42 -12 84 0" stroke="#c48a4d" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
    <rect x="93" y="80" width="14" height="12" rx="2" fill="#c9962e" stroke="#2a1810" stroke-width="2"/>
  </g>
</svg>`;

const CONCHA = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse cx="100" cy="150" rx="92" ry="16" fill="#e9d3a0"/>
  <path d="M34 152 q10 -8 20 0 M146 154 q8 -6 16 0" stroke="#c9b07a" stroke-width="2" fill="none"/>
  <path d="M166 140 l3 6 l7 1 l-5 4 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -4 l7 -1z" fill="#ff9a5a" stroke="#2a1810" stroke-width="1.6"/>
  <g class="tampa">
    <path d="M28 112 Q30 36 100 30 Q170 36 172 112 Q100 100 28 112Z" fill="#ffb3c1" stroke="#2a1810" stroke-width="3"/>
    <path d="M100 104 L100 34 M100 104 L68 40 M100 104 L132 40 M100 104 L44 64 M100 104 L156 64" stroke="#e8899a" stroke-width="2.4" fill="none"/>
  </g>
  <circle class="perola" cx="100" cy="112" r="15" fill="#f5f0ff" stroke="#2a1810" stroke-width="2"/>
  <circle cx="95" cy="107" r="4" fill="#fff"/>
  <path d="M28 112 Q100 172 172 112 Q100 128 28 112Z" fill="#ff9fb0" stroke="#2a1810" stroke-width="3"/>
  <path d="M100 150 L100 124 M100 150 L72 122 M100 150 L128 122 M100 150 L48 117 M100 150 L152 117" stroke="#e07a8e" stroke-width="2.4"/>
  <g class="borbulhas">${repetir(4, (i) => `<circle cx="${80 + i * 14}" cy="96" r="${3 + (i % 2) * 2}" style="--atraso:${i * 0.6}s"/>`)}</g>
</svg>`;

const SELOS = {
  bruxo: `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="#f4c35a" stroke-width="2">
      <circle cx="60" cy="60" r="52"/><circle cx="60" cy="60" r="44" stroke-dasharray="3 5"/>
      <path d="M60 14 L73 47 L106 60 L73 73 L60 106 L47 73 L14 60 L47 47Z" fill="rgba(244,195,90,.18)"/>
      <circle cx="60" cy="60" r="12" fill="#f4c35a"/></g></svg>`,
  medieval: `<svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 6 q14 4 22 2 q8 8 18 10 q2 12 10 20 q-2 12 4 22 q-6 10 -4 22 q-10 6 -12 18 q-12 0 -20 8 q-12 -4 -22 0 q-8 -8 -20 -8 q-2 -12 -12 -18 q2 -12 -4 -22 q6 -10 4 -22 q8 -8 10 -20 q10 -2 18 -10 q8 2 18 -2z" fill="#9e1b1b"/>
      <circle cx="60" cy="60" r="36" fill="#b92525" stroke="#7a1010" stroke-width="3"/>
      <text x="60" y="76" text-anchor="middle" font-family="UnifrakturMaguntia, serif" font-size="46" fill="#7a1010">D</text></svg>`,
  futurista: `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="#37f0ff" stroke-width="3">
      <path d="M60 8 L105 34 V86 L60 112 L15 86 V34Z"/><path d="M60 20 L95 40 V80 L60 100 L25 80 V40Z" stroke-width="1.5" stroke-dasharray="6 4"/>
      <path d="M40 60 l14 14 l28 -30" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
  pirata: `<svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="52" fill="#e8b53a" stroke="#9a6b12" stroke-width="4"/>
      <circle cx="60" cy="60" r="42" fill="none" stroke="#b8871f" stroke-width="2" stroke-dasharray="4 4"/>
      <g stroke="#7a4f0e" stroke-width="6" fill="none" stroke-linecap="round">
        <circle cx="60" cy="31" r="6"/><path d="M60 37 v48 M46 46 h28 M36 68 q0 18 24 20 q24 -2 24 -20 M36 68 l-6 6 M84 68 l6 6"/>
      </g></svg>`,
  faroeste: `<svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 8 L72 40 L106 40 L80 62 L90 96 L60 76 L30 96 L40 62 L14 40 L48 40Z" fill="#f2c14e" stroke="#7a4f0e" stroke-width="4" stroke-linejoin="round"/>
      <g fill="#f2c14e" stroke="#7a4f0e" stroke-width="3"><circle cx="60" cy="8" r="6"/><circle cx="106" cy="40" r="6"/><circle cx="90" cy="96" r="6"/><circle cx="30" cy="96" r="6"/><circle cx="14" cy="40" r="6"/></g>
      <circle cx="60" cy="56" r="15" fill="#e0a92a" stroke="#7a4f0e" stroke-width="3"/>
      <path d="M60 47 l2.6 5.4 l6 .8 l-4.3 4.2 l1 6 l-5.3 -2.8 l-5.3 2.8 l1 -6 l-4.3 -4.2 l6 -.8z" fill="#7a4f0e"/></svg>`,
  mar: `<svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M12 70 Q14 18 60 14 Q106 18 108 70 Q60 60 12 70Z" fill="#ffb3c1" stroke="#2a1810" stroke-width="3"/>
      <path d="M60 64 V18 M60 64 L36 24 M60 64 L84 24 M60 64 L20 44 M60 64 L100 44" stroke="#e8899a" stroke-width="2.4"/>
      <path d="M12 70 Q60 112 108 70 Q60 82 12 70Z" fill="#ff9fb0" stroke="#2a1810" stroke-width="3"/>
      <circle cx="60" cy="72" r="16" fill="#f5f0ff" stroke="#2a1810" stroke-width="2.4"/>
      <circle cx="54" cy="66" r="5" fill="#fff"/></svg>`,
  guilda: `<svg viewBox="0 0 120 120" aria-hidden="true"><g stroke="#2a1810" stroke-width="3">
      <path d="M20 20 L100 100 M100 20 L20 100" stroke="#9aa3ad" stroke-width="8" stroke-linecap="round"/>
      <path d="M60 12 L98 24 V56 Q98 90 60 108 Q22 90 22 56 V24Z" fill="#2f6b4f"/>
      <path d="M60 23 L88 32 V56 Q88 82 60 96 Q32 82 32 56 V32Z" fill="none" stroke="#c9962e" stroke-width="3"/>
      <path d="M60 40 l6 13 l14 1.5 l-10.5 9.5 l3 14 l-12.5 -7 l-12.5 7 l3 -14 l-10.5 -9.5 l14 -1.5z" fill="#c9962e" stroke-width="2"/>
    </g></svg>`,
};

export const TEMAS = {
  bruxo: {
    id: 'bruxo',
    nome: 'Bruxo',
    titulo: 'O Caldeirão Encantado',
    lema: 'Poções, quitutes e feitiços de cozinha',
    icone: iconeBruxo,
    receptaculo: CALDEIRAO,
    boca: [0.5, 0.42],
    selo: SELOS.bruxo,
    explosao: ['#7cff6b', '#c8ffb0', '#fff3b0'],
    textos: {
      receptaculo: 'Caldeirão',
      prateleira: 'Prateleira',
      adicionar: 'Jogar no caldeirão',
      voltar: 'Devolver à prateleira',
      adicionado: (nome) => `${nome} caiu no caldeirão`,
      vazio: 'O caldeirão está vazio. Toque em algo nas prateleiras e jogue aqui dentro.',
      esvaziar: 'Esvaziar caldeirão',
      esvaziado: 'Caldeirão esvaziado',
      fechar: 'Fechar pedido',
      confirmar: 'Conjurar pedido',
      sucessoTitulo: 'Pedido conjurado!',
      sucessoTexto: 'A cozinha já está mexendo os caldeirões. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: repetir(
      6,
      (i) =>
        `<div class="vela" style="--x:${[2.5, 7, 4, 97.5, 93, 96][i]}%;--y:${[24, 44, 66, 30, 52, 72][i]}%;--atraso:${i * 0.7}s;--alt:${[1, 0.8, 0.9, 1.1, 0.85, 0.95][i]}"><i class="chama"></i></div>`
    ) + '<div class="nevoa"></div>',
    particulas: { cores: ['#fff3b0', '#ffd76b', '#c8f4ff'], qtd: 55, vy: [-0.25, -0.05], vx: [-0.12, 0.12], tam: [0.8, 2.2], cintila: true, forma: 'ponto' },
  },

  medieval: {
    id: 'medieval',
    nome: 'Medieval',
    titulo: 'Taverna do Dragão Dourado',
    lema: 'Comida farta e bebida gelada desde o ano 1214',
    icone: iconeMedieval,
    receptaculo: BAU,
    boca: [0.5, 0.5],
    selo: SELOS.medieval,
    explosao: ['#f2c14e', '#ffe7a0', '#ff9a3c'],
    textos: {
      receptaculo: 'Baú',
      prateleira: 'Estante',
      adicionar: 'Guardar no baú',
      voltar: 'Deixar na estante',
      adicionado: (nome) => `${nome} foi guardado no baú`,
      vazio: 'O baú está vazio. Escolha algo nas estantes da taverna.',
      esvaziar: 'Esvaziar baú',
      esvaziado: 'Baú esvaziado',
      fechar: 'Fechar pedido',
      confirmar: 'Selar pedido',
      sucessoTitulo: 'Pedido selado!',
      sucessoTexto: 'O taverneiro já mandou acender o forno. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <div class="estandarte esq"><svg viewBox="0 0 60 60"><path d="M30 10 l6 12 l13 2 l-9 9 l2 13 l-12 -6 l-12 6 l2 -13 l-9 -9 l13 -2z" fill="#d9a441"/></svg></div>
      <div class="estandarte dir"><svg viewBox="0 0 60 60"><path d="M30 8 q14 10 14 26 q0 12 -14 18 q-14 -6 -14 -18 q0 -16 14 -26z" fill="none" stroke="#d9a441" stroke-width="4"/><path d="M30 18 v26 M20 30 h20" stroke="#d9a441" stroke-width="4"/></svg></div>
      <div class="tocha esq"><i class="chama"></i></div>
      <div class="tocha dir"><i class="chama"></i></div>`,
    particulas: { cores: ['#ffb347', '#ff7a1a', '#ffd27a'], qtd: 45, vy: [-0.9, -0.35], vx: [-0.25, 0.25], tam: [0.8, 2], cintila: false, forma: 'brasa', origem: 'baixo' },
  },

  futurista: {
    id: 'futurista',
    nome: 'Futurista',
    titulo: 'Estação Nova-7',
    lema: 'Cozinha orbital, entrega por teleporte',
    icone: iconeFuturista,
    receptaculo: TELEPORTADOR,
    boca: [0.5, 0.78],
    selo: SELOS.futurista,
    explosao: ['#37f0ff', '#ffffff', '#ff3ea5'],
    textos: {
      receptaculo: 'Teleportador',
      prateleira: 'Expositor',
      adicionar: 'Teleportar',
      voltar: 'Voltar ao expositor',
      adicionado: (nome) => `${nome} foi teleportado`,
      vazio: 'Nada na plataforma ainda. Escolha algo nos expositores para teleportar.',
      esvaziar: 'Limpar plataforma',
      esvaziado: 'Plataforma limpa',
      fechar: 'Fechar pedido',
      confirmar: 'Transmitir pedido',
      sucessoTitulo: 'Pedido transmitido!',
      sucessoTexto: 'A cozinha recebeu o sinal e iniciou a síntese. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: '<div class="grade"></div><div class="horizonte"></div><div class="varredura-tela"></div>',
    particulas: { cores: ['#37f0ff', '#ff3ea5', '#9d8cff'], qtd: 60, vy: [-0.6, -0.15], vx: [0, 0], tam: [0.8, 1.8], cintila: true, forma: 'traco' },
  },

  pirata: {
    id: 'pirata',
    nome: 'Pirata',
    titulo: 'A Taverna do Kraken',
    lema: 'Comida e tesouros para toda a tripulação',
    icone: iconePirata,
    receptaculo: BAU_TESOURO,
    boca: [0.5, 0.4],
    selo: SELOS.pirata,
    explosao: ['#e8b53a', '#fff3c2', '#7fd3ff'],
    textos: {
      receptaculo: 'Baú do tesouro',
      prateleira: 'Prateleira',
      adicionar: 'Guardar no baú',
      voltar: 'Deixar na prateleira',
      adicionado: (nome) => `${nome} foi para o baú do tesouro`,
      vazio: 'O baú do tesouro está vazio. Escolha algo nas prateleiras do navio.',
      esvaziar: 'Esvaziar baú',
      esvaziado: 'Baú esvaziado',
      fechar: 'Fechar pedido',
      confirmar: 'Zarpar pedido',
      sucessoTitulo: 'Pedido zarpou!',
      sucessoTexto: 'O cozinheiro de bordo já está no fogão. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <div class="lua"></div>
      <svg class="navio" viewBox="0 0 120 80" aria-hidden="true"><g fill="currentColor">
        <path d="M6 54 h108 l-12 16 H20z"/><path d="M90 42 h20 v12 h-20z"/>
        <path d="M33 54 V8 M58 54 V4 M83 54 V12" stroke="currentColor" stroke-width="2.5"/>
        <path d="M20 14 q13 5 26 0 v14 q-13 5 -26 0z M20 32 q13 5 26 0 v14 q-13 5 -26 0z"/>
        <path d="M45 10 q13 5 26 0 v16 q-13 5 -26 0z M45 30 q13 5 26 0 v16 q-13 5 -26 0z"/>
        <path d="M71 18 q12 4 24 0 v12 q-12 4 -24 0z M71 34 q12 4 24 0 v12 q-12 4 -24 0z"/>
        <path d="M58 4 h12 l-3 3 l3 3 h-12z"/>
      </g></svg>
      <div class="mastro"><svg class="bandeira" viewBox="0 0 90 60" aria-hidden="true">
        <path d="M0 4 q22 -6 45 2 q22 8 45 0 v46 q-22 8 -45 0 q-23 -8 -45 -2z" fill="#141414"/>
        <g stroke="#f1e6cc" stroke-width="4" stroke-linecap="round"><path d="M28 36 l34 16 M62 36 l-34 16"/></g>
        <circle cx="45" cy="24" r="11" fill="#f1e6cc"/><rect x="39" y="31" width="12" height="7" rx="2" fill="#f1e6cc"/>
        <circle cx="41" cy="23" r="3" fill="#141414"/><circle cx="49" cy="23" r="3" fill="#141414"/>
        <path d="M43 34 v3 M47 34 v3" stroke="#141414" stroke-width="1.4"/>
      </svg></div>
      <div class="onda onda-1"></div>
      ${['esq', 'dir'].map((lado) => `<svg class="tentaculo ${lado}" viewBox="0 0 80 200" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke="#6e2848">
        <path d="M40 200 C30 160 26 130 38 104" stroke-width="26"/><path d="M38 104 C50 80 66 70 62 50" stroke-width="18"/><path d="M62 50 C58 32 42 30 42 42 C42 50 52 50 52 44" stroke-width="10"/></g>
        <g fill="#d98aa8">${[[27, 176, 4], [25, 156, 4], [27, 136, 3.6], [36, 116, 3.4], [46, 96, 3], [56, 80, 2.6], [58, 64, 2.2], [52, 46, 1.8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g></svg>`).join('')}
      <div class="onda onda-2"></div><div class="onda onda-3"></div>`,
    particulas: { cores: ['#fffbe8', '#cfe6ff', '#ffe7a0'], qtd: 70, vy: [-0.03, 0.03], vx: [-0.04, 0.04], tam: [0.6, 1.8], cintila: true, forma: 'ponto' },
  },

  faroeste: {
    id: 'faroeste',
    nome: 'Faroeste',
    titulo: 'Saloon Poeira Vermelha',
    lema: 'Comida quente para xerifes e foras da lei',
    icone: iconeFaroeste,
    receptaculo: CARRINHO_MINA,
    boca: [0.5, 0.37],
    selo: SELOS.faroeste,
    explosao: ['#e9c28a', '#d98c3a', '#f2e2c0'],
    textos: {
      receptaculo: 'Carrinho',
      prateleira: 'Prateleira',
      adicionar: 'Jogar no carrinho',
      voltar: 'Deixar no balcão',
      adicionado: (nome) => `${nome} foi para o carrinho`,
      vazio: 'O carrinho está vazio. Escolha algo nas prateleiras do saloon.',
      esvaziar: 'Esvaziar carrinho',
      esvaziado: 'Carrinho esvaziado',
      fechar: 'Fechar pedido',
      confirmar: 'Mandar para a cozinha',
      sucessoTitulo: 'Pedido na cozinha!',
      sucessoTexto: 'O cozinheiro já acendeu a chapa. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <div class="sol"></div>
      <div class="abutres">${repetir(2, (i) => `<svg class="abutre a${i + 1}" viewBox="0 0 40 16" aria-hidden="true"><path d="M1 12 q9 -12 19 -2 q10 -10 19 2" fill="none" stroke="#3b2415" stroke-width="2.6" stroke-linecap="round"/></svg>`)}</div>
      <svg class="trem" viewBox="0 0 300 76" aria-hidden="true">
        <g class="fumaca-trem">${repetir(3, (i) => `<circle cx="34" cy="14" r="${7 + i * 2}" style="--atraso:${i * 0.5}s"/>`)}</g>
        <g fill="#4a2016">
          <path d="M28 34 l-4 -14 h16 l-4 14z"/><rect x="18" y="32" width="62" height="24" rx="11"/>
          <rect x="72" y="18" width="30" height="38"/><rect x="68" y="14" width="38" height="6" rx="1"/>
          <path d="M18 56 l-14 12 h20z"/><rect x="112" y="26" width="76" height="30" rx="3"/><rect x="196" y="26" width="76" height="30" rx="3"/>
          <rect x="100" y="48" width="14" height="4"/><rect x="186" y="48" width="12" height="4"/>
          ${[[36, 64, 9], [60, 64, 9], [88, 62, 11], [128, 64, 7], [172, 64, 7], [212, 64, 7], [256, 64, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}
        </g>
        <g fill="#f2c14e" opacity=".8">${[124, 144, 164, 208, 228, 248].map((x) => `<rect x="${x}" y="32" width="12" height="10" rx="1"/>`).join('')}<rect x="80" y="24" width="14" height="12" rx="1"/></g>
      </svg>
      <svg class="mesas" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 220 V120 h90 l20 -40 h120 l18 40 h160 l30 -70 h150 l26 70 h200 l14 -30 h110 l16 30 h256 V220z" fill="#d98050"/>
        <g fill="#9a4428">${[500, 526, 552].map((x) => `<path d="M${x} 50 l11 -24 l11 24z"/><path d="M${x + 8} 22 l3 5 M${x + 14} 22 l-3 5" stroke="#9a4428" stroke-width="1.6"/>`).join('')}</g>
        <path d="M0 220 V170 h180 l24 -46 h140 l20 46 h330 l22 -56 h170 l24 56 h310 V220z" fill="#a8492c"/>
      </svg>
      <svg class="cacto esq" viewBox="0 0 60 120" aria-hidden="true"><path d="M24 120 V30 q0 -10 6 -10 q6 0 6 10 V120z M24 72 h-8 q-6 0 -6 -6 V46 q0 -5 4 -5 q4 0 4 5 v18 h6z M36 62 h8 q6 0 6 -6 V38 q0 -5 -4 -5 q-4 0 -4 5 v16 h-6z" fill="#4d7a3a" stroke="#2f4a24" stroke-width="2"/></svg>
      <svg class="cacto dir" viewBox="0 0 60 120" aria-hidden="true"><path d="M24 120 V30 q0 -10 6 -10 q6 0 6 10 V120z M24 72 h-8 q-6 0 -6 -6 V46 q0 -5 4 -5 q4 0 4 5 v18 h6z M36 62 h8 q6 0 6 -6 V38 q0 -5 -4 -5 q-4 0 -4 5 v16 h-6z" fill="#4d7a3a" stroke="#2f4a24" stroke-width="2"/></svg>
      <div class="rolador"><svg viewBox="0 0 60 60" aria-hidden="true"><g fill="none" stroke="#a8743f" stroke-width="2.2" stroke-linecap="round"><circle cx="30" cy="30" r="26"/><path d="M8 30 q22 -26 44 0 q-22 26 -44 0"/><path d="M14 16 q16 32 34 20"/><path d="M18 46 q10 -34 28 -28"/><path d="M30 6 q-10 24 4 48"/></g></svg></div>`,
    particulas: { cores: ['#fff1d6', '#e9c28a', '#d98c3a'], qtd: 50, vy: [-0.12, 0.12], vx: [0.3, 1.1], tam: [0.8, 2.2], cintila: false, forma: 'ponto', origem: 'esquerda' },
  },

  mar: {
    id: 'mar',
    nome: 'Fundo do mar',
    titulo: 'Cantina do Recife',
    lema: 'Pratos e bebidas das profundezas',
    icone: iconeMar,
    receptaculo: CONCHA,
    boca: [0.5, 0.64],
    selo: SELOS.mar,
    explosao: ['#bff4ff', '#ffffff', '#7ae0d0'],
    textos: {
      receptaculo: 'Concha',
      prateleira: 'Recife',
      adicionar: 'Guardar na concha',
      voltar: 'Devolver ao recife',
      adicionado: (nome) => `${nome} foi para a concha`,
      vazio: 'A concha está vazia. Escolha algo no recife e guarde aqui.',
      esvaziar: 'Esvaziar concha',
      esvaziado: 'Concha esvaziada',
      fechar: 'Fechar pedido',
      confirmar: 'Enviar pela correnteza',
      sucessoTitulo: 'Pedido enviado!',
      sucessoTexto: 'A correnteza já levou seu pedido até a cozinha. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <div class="raios">${repetir(5, (i) => `<i style="--x:${8 + i * 21}%;--atraso:${i * 1.3}s;--rot:${-14 + i * 7}deg"></i>`)}</div>
      <svg class="alga esq" viewBox="0 0 80 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M22 300 C2 250 42 200 22 150 C2 100 42 60 26 14" stroke="#2f9e6e" stroke-width="10"/><path d="M50 300 C34 260 66 220 50 180 C36 140 64 110 54 70" stroke="#3fbf8a" stroke-width="8"/></g></svg>
      <svg class="alga dir" viewBox="0 0 80 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M58 300 C78 250 38 200 58 150 C78 100 38 60 54 14" stroke="#2f9e6e" stroke-width="10"/><path d="M30 300 C46 260 14 220 30 180 C44 140 16 110 26 70" stroke="#3fbf8a" stroke-width="8"/></g></svg>
      ${repetir(3, (i) => `<svg class="peixe p${i + 1}" viewBox="0 0 40 20" aria-hidden="true"><path d="M38 10 q-14 -12 -28 0 l-8 -7 v14 l8 -7 q14 12 28 0z" fill="currentColor"/></svg>`)}
      <div class="areia"></div>`,
    particulas: { cores: ['#ffffff', '#bff4ff', '#8fe3ff'], qtd: 40, vy: [-0.9, -0.3], vx: [-0.1, 0.1], tam: [1.5, 4], cintila: false, forma: 'bolha', origem: 'baixo' },
  },

  guilda: {
    id: 'guilda',
    nome: 'Guilda',
    titulo: 'Guilda dos Aventureiros',
    lema: 'Refeições para heróis de todos os níveis',
    icone: iconeGuilda,
    receptaculo: MOCHILA,
    boca: [0.5, 0.36],
    selo: SELOS.guilda,
    explosao: ['#ffe27a', '#7cff9a', '#8fd3ff'],
    textos: {
      receptaculo: 'Mochila',
      prateleira: 'Prateleira',
      adicionar: 'Guardar na mochila',
      voltar: 'Deixar no mural',
      adicionado: (nome) => `${nome} foi para a mochila`,
      vazio: 'A mochila está vazia. Escolha algo nas prateleiras da guilda.',
      esvaziar: 'Esvaziar mochila',
      esvaziado: 'Mochila esvaziada',
      fechar: 'Fechar pedido',
      confirmar: 'Registrar pedido',
      sucessoTitulo: 'Pedido registrado!',
      sucessoTexto: 'O cozinheiro da guilda já partiu nessa missão. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <svg class="mural" viewBox="0 0 120 150" aria-hidden="true">
        <rect x="4" y="4" width="112" height="142" rx="4" fill="#6b4220" stroke="#2a1810" stroke-width="3"/>
        <rect x="12" y="12" width="96" height="126" fill="#b08850"/>
        <g stroke="#2a1810" stroke-width="1.5">
          <rect x="18" y="18" width="38" height="44" fill="#f4ecd8" transform="rotate(-4 37 40)"/>
          <rect x="62" y="22" width="40" height="36" fill="#efe0bd" transform="rotate(5 82 40)"/>
          <rect x="22" y="72" width="44" height="34" fill="#f4ecd8" transform="rotate(3 44 89)"/>
          <rect x="68" y="68" width="34" height="46" fill="#e9d6a8" transform="rotate(-6 85 91)"/>
          <rect x="30" y="110" width="40" height="24" fill="#efe0bd" transform="rotate(-2 50 122)"/>
        </g>
        <g stroke="#8a6a4a" stroke-width="1.6"><path d="M24 34 h24 M24 40 h20 M24 46 h24"/><path d="M68 34 h26 M68 40 h22"/><path d="M28 84 h32 M28 90 h26"/><path d="M74 84 h22 M74 90 h18 M74 96 h22"/></g>
        <g fill="#c0392b" stroke="#2a1810" stroke-width="1"><circle cx="37" cy="21" r="3"/><circle cx="82" cy="25" r="3"/><circle cx="44" cy="75" r="3"/><circle cx="85" cy="71" r="3"/><circle cx="50" cy="113" r="3"/></g>
      </svg>
      <svg class="armas" viewBox="0 0 140 140" aria-hidden="true">
        <g stroke="#2a1810" stroke-width="2.5">
          <path d="M20 20 L112 112" stroke="#9aa3ad" stroke-width="8" stroke-linecap="round"/>
          <path d="M120 20 L28 112" stroke="#9aa3ad" stroke-width="8" stroke-linecap="round"/>
          <rect x="96" y="100" width="24" height="7" rx="2" fill="#c9962e" transform="rotate(45 108 104)"/>
          <rect x="20" y="100" width="24" height="7" rx="2" fill="#c9962e" transform="rotate(-45 32 104)"/>
          <circle cx="70" cy="70" r="36" fill="#2f6b4f"/>
          <circle cx="70" cy="70" r="28" fill="none" stroke="#c9962e" stroke-width="3"/>
          <path d="M70 52 l5 11 l12 1 l-9 8 l3 12 l-11 -6 l-11 6 l3 -12 l-9 -8 l12 -1z" fill="#c9962e"/>
        </g>
      </svg>`,
    particulas: { cores: ['#7cff9a', '#ffe27a', '#8fd3ff'], qtd: 45, vy: [-0.35, -0.1], vx: [-0.1, 0.1], tam: [0.8, 2], cintila: true, forma: 'ponto' },
  },
};

export const LISTA_TEMAS = Object.keys(TEMAS);

let semente = 0;
/** SVG completo do ícone do produto no tema informado. */
export function svgIcone(tema, tipo, extraClasse = '') {
  const info = infoTipo(tipo);
  const corpo = TEMAS[tema].icone(tipo, info, semente++);
  return `<svg class="ic ${extraClasse}" viewBox="0 0 100 100" overflow="visible" aria-hidden="true">${corpo}</svg>`;
}

/**
 * Nome temático do produto. Itens do mesmo tipo recebem apelidos diferentes,
 * na ordem em que aparecem no cardápio (o 1º X usa o 1º apelido, o 2º X o 2º...).
 */
export function apelido(tema, produto) {
  const lista = APELIDOS[tema][produto.tipo] || APELIDOS[tema].generico;
  const mesmoTipo = estado.produtos.filter((p) => p.tipo === produto.tipo);
  const posicao = Math.max(0, mesmoTipo.findIndex((p) => p.id === produto.id));
  return lista[posicao % lista.length];
}
