// Tema guilda de aventureiros: poções de vida e mana, odres, canecas e frascos de viagem;
// comidas servidas sobre um escudo redondo de madeira.

import { BASE, T } from './base.js';
import { garrafaBojuda, garrafa, cantil, canecaBarril, taca, copoBaixo, canecaLata, pote } from './recipientes.js';

const escudo = () => `
  ${T('<path d="M8 84 v4 q42 12 84 0 v-4z" fill="#5a3417"/><ellipse cx="50" cy="84" rx="42" ry="9" fill="#8a5a2b"/>')}
  <path d="M22 78.5 v11 M36 76 v16 M64 76 v16 M78 78.5 v11" stroke="#6b4220" stroke-width="1.6"/>
  <ellipse cx="50" cy="84" rx="42" ry="9" fill="none" stroke="#9aa3ad" stroke-width="3"/>`;

/** Ícone base reduzido, servido sobre o escudo. */
const noEscudo = (desenho, escala = 0.82) =>
  `${escudo()}<g transform="translate(${50 - 50 * escala} ${84 - 90 * escala}) scale(${escala})">${desenho}</g>`;

const coracao = '<path d="M50 71 q-8 -5 -8 -9.5 q0 -4 4 -4 q3 0 4 3 q1 -3 4 -3 q4 0 4 4 q0 4.5 -8 9.5z" fill="#d7263d"/>';
const espada = '<path d="M50 60 v13 M45.5 69 h9" stroke="#3b2616" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="75" r="1.6" fill="#3b2616"/>';

const DESENHOS = {
  suco: (i) => garrafaBojuda(i.cor, { lacre: '#6b4220', simbolo: coracao }),
  shake: (i) => pote(i.cor, { creme: true }),
  refri: (i) => garrafa(i.cor, { tampa: 'rolha', gas: true, rotulo: '#e9d6a8', simbolo: espada }),
  agua: (i) => cantil(i.cor),
  cerveja: (i) => canecaBarril(i.cor),
  vinho: (i) => taca(i.cor),
  drink: (i) => copoBaixo(i.cor),
  quente: (i) => canecaLata(i.cor, { quente: true }),
};

export function iconeGuilda(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return noEscudo(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
