// Configuração de cada tema: textos, ícones, receptáculo (o "carrinho"), decoração e partículas.
// Para criar um tema novo: adicione uma entrada aqui, um arquivo em src/icones e um CSS em src/estilos.

import { infoTipo } from './tipos.js';
import { estado } from './loja.js';
import { APELIDOS } from './apelidos.js';
import { iconeBruxo } from './icones/bruxo.js';
import { iconeMedieval } from './icones/medieval.js';
import { iconeFuturista } from './icones/futurista.js';

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

export const TEMAS = {
  bruxo: {
    id: 'bruxo',
    nome: 'Bruxo',
    titulo: 'O Caldeirão Encantado',
    lema: 'Poções, quitutes e feitiços de cozinha',
    icone: iconeBruxo,
    receptaculo: CALDEIRAO,
    boca: [0.5, 0.42],
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
