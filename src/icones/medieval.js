// Tema medieval: canecas, cálices, chifres e jarros de barro; comidas servidas na tábua.

import { BASE, T, vapor } from './base.js';
import { tom, bolhas, faiscas } from './util.js';

const tabua = () => `
  ${T(`<path d="M4 82 q0 -5 5 -5 h82 q5 0 5 5 v3 H4z" fill="#a8743f"/><rect x="4" y="85" width="92" height="5" rx="1.5" fill="#6e4523"/>`)}
  <path d="M14 81 h26 M52 80 h30" stroke="#8a5a2e" stroke-width="1.4" stroke-linecap="round"/>`;

/** Ícone base reduzido e apoiado sobre a tábua de madeira. */
const naTabua = (desenho, escala = 0.84) =>
  `${tabua()}<g transform="translate(${50 - 50 * escala} ${80 - 90 * escala}) scale(${escala})">${desenho}</g>`;

const calice = (cor, metal = '#b8bec6', joia = '#3aa0ff') => `
  ${T(`
    <path d="M30 90 q20 -14 40 0z" fill="${metal}"/>
    <rect x="46" y="60" width="8" height="24" fill="${metal}"/>
    <ellipse cx="50" cy="70" rx="7" ry="3.5" fill="${metal}"/>
    <path d="M24 28 h52 q0 32 -26 36 q-26 -4 -26 -36z" fill="${metal}"/>
  `)}
  <ellipse cx="50" cy="28" rx="26" ry="5.5" fill="${tom(metal, -0.35)}" stroke="#2a1810" stroke-width="2"/>
  <ellipse cx="50" cy="29" rx="22" ry="3.8" fill="${cor}"/>
  <path d="M32 36 q2 16 12 22" stroke="rgba(255,255,255,.6)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M28 40 h44" stroke="${tom(metal, -0.25)}" stroke-width="2"/>
  ${T(`<path d="M50 44 l5 5 l-5 6 l-5 -6z" fill="${joia}"/>`)}
  <path d="M48 47 l2 -1.6" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`;

const garrafaBarro = (cor) => `
  <g>${bolhas(5, { x0: 42, x1: 58, base: 14, sobe: 14, rapido: true, cor: tom(cor, 0.5), r: [1.4, 2.6] })}</g>
  ${T(`
    <path d="M68 44 q12 0 12 10 q0 10 -12 12" fill="none" stroke-width="5"/>
    <path d="M42 22 v8 q-18 8 -18 30 v18 q0 10 10 10 h32 q10 0 10 -10 v-18 q0 -22 -18 -30 v-8z" fill="#b5653a"/>
    <rect x="40" y="13" width="20" height="10" rx="2" fill="#d9b27a"/>
    <rect x="28" y="54" width="44" height="18" rx="3" fill="#efe0bd"/>
  `)}
  <circle cx="50" cy="63" r="6" fill="${cor}" stroke="#2a1810" stroke-width="1.6"/>
  <path d="M30 42 q-2 10 -2 12" stroke="#d98a5a" stroke-width="3" stroke-linecap="round"/>
  <path d="M40 30 h20" stroke="#7d3f1f" stroke-width="2"/>`;

const jarro = (cor) => `
  ${T(`
    <path d="M70 40 q14 2 12 16 q-2 12 -14 14" fill="none" stroke-width="5"/>
    <path d="M36 22 h28 l-4 10 q18 10 18 32 q0 24 -28 24 q-28 0 -28 -24 q0 -22 18 -32z" fill="#c9834f"/>
    <path d="M36 22 l-10 -4 l6 8z" fill="#c9834f"/>
  `)}
  <ellipse cx="50" cy="23" rx="13" ry="3" fill="${cor}"/>
  <path d="M26 56 q24 8 48 0" stroke="#8a4e27" stroke-width="2.4" fill="none"/>
  <path d="M28 64 q24 8 48 0" stroke="#8a4e27" stroke-width="2.4" fill="none"/>
  <path d="M30 48 q0 20 8 28" stroke="#e4a877" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path class="fx-gota" d="M27 22 q-2 4 0 6 q2 -2 0 -6z" fill="${tom(cor, -0.1)}"/>`;

const caneca = (cor, espuma = true) => `
  ${T(`
    <path d="M70 44 q16 0 16 14 q0 16 -16 16 v-7 q9 0 9 -9 q0 -7 -9 -7z" fill="#8a5a2b"/>
    <path d="M26 34 h44 v50 q0 4 -4 4 H30 q-4 0 -4 -4z" fill="#8a5a2b"/>
    <rect x="24" y="42" width="48" height="6" rx="2" fill="#6f7780"/>
    <rect x="24" y="74" width="48" height="6" rx="2" fill="#6f7780"/>
  `)}
  <g stroke="#6b4220" stroke-width="2"><path d="M37 50 v22"/><path d="M48 50 v22"/><path d="M59 50 v22"/></g>
  <g fill="#b9c0c8"><circle cx="30" cy="45" r="1.2"/><circle cx="66" cy="45" r="1.2"/><circle cx="30" cy="77" r="1.2"/><circle cx="66" cy="77" r="1.2"/></g>
  ${espuma
    ? `${T(`<path d="M22 38 q-2 -10 8 -10 q2 -8 12 -6 q6 -8 14 -2 q10 -4 12 6 q9 0 7 12z" fill="#fff8e6"/>`)}
       <path class="fx-escorre" d="M31 38 v7 q0 3 3 3 q3 0 3 -3 v-7z" fill="#fff8e6"/>`
    : `<ellipse cx="48" cy="34" rx="22" ry="4" fill="${cor}" stroke="#2a1810" stroke-width="2"/>${vapor(48, 26)}`}`;

const chifre = (cor) => `
  ${T(`
    <path d="M40 90 l8 -22 M66 90 l-8 -22" fill="none" stroke-width="4"/>
    <path d="M56 20 L86 30 Q76 62 32 84 Q22 88 24 80 Q46 60 56 20z" fill="#efe3c8"/>
    <ellipse cx="71" cy="25" rx="16" ry="5.5" fill="#d9a441" transform="rotate(18 71 25)"/>
  `)}
  <ellipse cx="71" cy="25.5" rx="12" ry="3.4" fill="${cor}" transform="rotate(18 71 25.5)"/>
  <path d="M60 38 q10 6 20 0" stroke="#d9a441" stroke-width="4" fill="none"/>
  <path d="M44 62 q8 5 14 -2" stroke="#d9a441" stroke-width="3.4" fill="none"/>
  <path d="M34 78 q10 -10 18 -30" stroke="#fffaf0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>`;

const copoLeite = (cor) => `
  ${T(`
    <path d="M28 40 h44 l-4 44 q0 4 -4 4 H36 q-4 0 -4 -4z" fill="#c9834f"/>
    <path d="M26 42 q0 -18 24 -18 q24 0 24 18z" fill="${cor}"/>
    <circle cx="56" cy="22" r="5" fill="#d7263d"/>
  `)}
  <path d="M34 36 q8 -8 18 -8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M30 60 h40" stroke="#8a4e27" stroke-width="2.4"/>`;

const DESENHOS = {
  suco: (i) => calice(i.cor),
  vinho: (i) => calice(i.cor, '#d9a441', '#d7263d') + faiscas('#ffe7a0', [[16, 30, 3.5, 0.4], [86, 50, 3, 1.4]]),
  refri: (i) => garrafaBarro(i.cor),
  agua: (i) => jarro(i.cor),
  cerveja: (i) => caneca(i.cor, true),
  quente: (i) => caneca(i.cor, false),
  drink: (i) => chifre(i.cor),
  shake: (i) => copoLeite(i.cor),

  hamburguer: () => naTabua(`
    ${BASE.hamburguer()}
    <path d="M50 20 V2" stroke="#6e4523" stroke-width="2.5"/>
    <path class="fx-bandeira" d="M50 3 h22 l-5 5 l5 5 h-22z" fill="#b3261e" stroke="#2a1810" stroke-width="1.6"/>`),

  frango: () => naTabua(`
    ${BASE.frango()}
    <path d="M26 30 q10 -8 20 -6" stroke="#f7c78e" stroke-width="2" fill="none" opacity=".7"/>
    ${vapor(40, 16)}`, 0.9),

  sopa: () => naTabua(`
    <path d="M70 32 L90 12" stroke="#2a1810" stroke-width="7" stroke-linecap="round"/>
    <path d="M70 32 L90 12" stroke="#c09060" stroke-width="4" stroke-linecap="round"/>
    ${T(`<path d="M12 54 h76 q-2 32 -38 34 q-36 -2 -38 -34z" fill="#8a5a2b"/><ellipse cx="50" cy="54" rx="38" ry="8" fill="#c9772f"/>`)}
    <g fill="#f29a2e"><circle cx="36" cy="54" r="3"/><circle cx="58" cy="52" r="3.4"/></g>
    <g fill="#3f9b3a"><circle cx="46" cy="56" r="1.8"/><circle cx="66" cy="55" r="1.6"/></g>
    <g stroke="#6b4220" stroke-width="2"><path d="M24 64 q26 10 52 0"/><path d="M28 74 q22 8 44 0"/></g>
    ${vapor(46, 40)}`, 0.95),
};

export function iconeMedieval(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return naTabua(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
