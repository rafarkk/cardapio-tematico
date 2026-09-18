// Tema pirata: bebidas em cocos, garrafas, cantis e canecas de lata; comidas servidas na tampa de um barril.

import { BASE, T, vapor } from './base.js';
import { faiscas } from './util.js';
import { coco, garrafa, garrafaBojuda, cantil, canecaBarril, canecaLata } from './recipientes.js';

const tampaBarril = () => `
  ${T(`<path d="M8 84 v5 q42 13 84 0 v-5z" fill="#5a3417"/><ellipse cx="50" cy="84" rx="42" ry="8" fill="#9c6a38"/>`)}
  <path d="M24 78 l-3 12 M40 76.5 l-1 14 M60 76.5 l1 14 M76 78 l3 12" stroke="#6b4220" stroke-width="1.6"/>
  <ellipse cx="50" cy="84" rx="42" ry="8" fill="none" stroke="#3b3f45" stroke-width="2.4"/>`;

/** Ícone base reduzido, apoiado sobre a tampa de um barril. */
const naTampa = (desenho, escala = 0.82) =>
  `${tampaBarril()}<g transform="translate(${50 - 50 * escala} ${84 - 90 * escala}) scale(${escala})">${desenho}</g>`;

const caveira = `<g transform="translate(50 67)">
  <circle cx="0" cy="-2" r="5.5" fill="#3b2616"/><rect x="-3" y="2" width="6" height="4" rx="1" fill="#3b2616"/>
  <circle cx="-2" cy="-2" r="1.4" fill="#efe0bd"/><circle cx="2" cy="-2" r="1.4" fill="#efe0bd"/></g>`;

const DESENHOS = {
  suco: (i) => coco(i.cor),
  shake: (i) => coco(i.cor, { creme: true }),
  drink: (i) => coco(i.cor, { guardaChuva: true }),
  refri: (i) => garrafa(i.cor, { tampa: 'rolha', gas: true, simbolo: caveira }),
  agua: (i) => cantil(i.cor),
  cerveja: (i) => canecaBarril(i.cor),
  vinho: (i) => garrafaBojuda(i.cor) + faiscas('#ffe7a0', [[16, 30, 3.5, 0.4], [86, 50, 3, 1.4]]),
  quente: (i) => canecaLata(i.cor, { quente: true }),

  peixe: () => naTampa(`${BASE.peixe()}${vapor(50, 44)}`),
};

export function iconePirata(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return naTampa(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
