// Tema faroeste: potes de vidro, garrafas com chapinha, copos de dose, canecas esmaltadas;
// comidas servidas sobre uma manta listrada.

import { BASE, T } from './base.js';
import { pote, garrafa, copoBaixo, canecaVidro, cantil, canecaEsmaltada, taca } from './recipientes.js';

const LISTRAS = ['#b23a2a', '#f2e2c0', '#e0703c', '#3aa6a0', '#f2e2c0', '#b23a2a'];

const manta = () => {
  const faixas = LISTRAS.map((c, i) => `<rect x="${6 + i * 14.7}" y="77" width="14.7" height="12" fill="${c}"/>`).join('');
  return `
    ${faixas}
    <path d="M6 83 h88" stroke="#3b2415" stroke-width="1.2" stroke-dasharray="3 3" opacity=".5"/>
    ${T('<rect x="6" y="77" width="88" height="12" rx="1.5" fill="none"/>')}
    <path d="M6 89 v4 M10 89 v4 M14 89 v4 M86 89 v4 M90 89 v4 M94 89 v4" stroke="#b23a2a" stroke-width="1.6"/>`;
};

/** Ícone base reduzido, apoiado sobre a manta. */
const naManta = (desenho, escala = 0.82) =>
  `${manta()}<g transform="translate(${50 - 50 * escala} ${80 - 90 * escala}) scale(${escala})">${desenho}</g>`;

const estrela = '<path d="M50 60 l2.4 5 l5.4 .6 l-4 3.7 l1.1 5.4 l-4.9 -2.7 l-4.9 2.7 l1.1 -5.4 l-4 -3.7 l5.4 -.6z" fill="#f2c14e" stroke="#3b2415" stroke-width="1"/>';

const DESENHOS = {
  suco: (i) => pote(i.cor),
  shake: (i) => pote(i.cor, { creme: true }),
  refri: (i) => garrafa(i.cor, { tampa: 'chapinha', gas: true, rotulo: '#b23a2a', simbolo: estrela }),
  agua: (i) => cantil(i.cor, { corpo: '#9aa3ad', costura: '#dfe4ea' }),
  cerveja: (i) => canecaVidro(i.cor),
  vinho: (i) => taca(i.cor),
  drink: (i) => copoBaixo(i.cor),
  quente: (i) => canecaEsmaltada(i.cor),
};

export function iconeFaroeste(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return naManta(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
