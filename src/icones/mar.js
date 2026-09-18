// Tema fundo do mar: bebidas em copos, taças e bolhas d'água; comidas flutuando dentro de bolhas.

import { BASE } from './base.js';
import { bolhas } from './util.js';
import { copoAlto, copoBaixo, garrafa, canecaVidro, taca, xicara, bolhaAgua } from './recipientes.js';

/** Bolhinhas subindo ao redor do ícone. */
const bolhinhas = () =>
  `<g>${bolhas(2, { x0: 10, x1: 18, base: 80, sobe: 60, cor: 'rgba(220,250,255,.7)', r: [1.6, 3] })}
     ${bolhas(2, { x0: 82, x1: 90, base: 70, sobe: 56, cor: 'rgba(220,250,255,.7)', r: [1.4, 2.6] })}</g>`;

/** Ícone base dentro de uma bolha flutuante. */
const naBolha = (desenho) => `
  <g class="fx-flutua">
    <circle cx="50" cy="50" r="44" fill="rgba(190,240,255,.12)" stroke="rgba(220,250,255,.6)" stroke-width="1.6"/>
    <g transform="translate(14 12) scale(0.72)">${desenho}</g>
    <path d="M20 34 q8 -16 26 -18" stroke="#fff" stroke-width="3" opacity=".7" fill="none" stroke-linecap="round"/>
    <circle cx="74" cy="22" r="3" fill="#fff" opacity=".6"/>
  </g>
  ${bolhinhas()}`;

const comBolhas = (desenho) => desenho + bolhinhas();

const DESENHOS = {
  suco: (i) => comBolhas(copoAlto(i.cor, { corCanudo: '#ff7a8a' })),
  shake: (i) => comBolhas(copoAlto(i.cor, { corCanudo: '#ff7a8a', gelo: false, creme: true })),
  drink: (i) => comBolhas(copoBaixo(i.cor)),
  refri: (i) => comBolhas(garrafa(i.cor, { tampa: 'chapinha', gas: true, rotulo: '#7ae0d0' })),
  agua: (i) => comBolhas(bolhaAgua(i.cor)),
  cerveja: (i) => comBolhas(canecaVidro(i.cor)),
  vinho: (i) => comBolhas(taca(i.cor)),
  quente: (i) => comBolhas(xicara(i.cor, { detalhe: '#ff7a8a' })),
};

export function iconeMar(tipo, info) {
  if (DESENHOS[tipo]) return DESENHOS[tipo](info);
  if (info.forma && DESENHOS[info.forma]) return DESENHOS[info.forma](info);
  return naBolha(BASE[tipo] ? BASE[tipo](info) : BASE.generico());
}
