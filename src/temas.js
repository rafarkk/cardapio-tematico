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

const BARRIL = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="160" rx="80" ry="9"/>
  <path d="M54 50 q-12 50 0 102 h92 q12 -52 0 -102z" fill="#8a5a2b" stroke="#2a1810" stroke-width="3"/>
  <path d="M74 52 q-7 50 0 98 M93 52 v98 M107 52 v98 M126 52 q7 50 0 98" stroke="#6b4220" stroke-width="2" fill="none"/>
  <path d="M47 70 q53 9 106 0 M47 132 q53 9 106 0" stroke="#3b3f45" stroke-width="7" fill="none"/>
  <path d="M88 90 l24 24 M112 90 l-24 24" stroke="#e8dcc0" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="100" cy="50" rx="46" ry="11" fill="#3b2211" stroke="#2a1810" stroke-width="3"/>
  <g class="moedas" fill="#e8b53a" stroke="#9a6b12" stroke-width="1.5">
    <ellipse cx="84" cy="50" rx="8" ry="3.5"/><ellipse cx="100" cy="48" rx="8" ry="3.5"/><ellipse cx="116" cy="51" rx="8" ry="3.5"/>
  </g>
  <g class="tampa">
    <ellipse cx="100" cy="47" rx="49" ry="12" fill="#a8743f" stroke="#2a1810" stroke-width="3"/>
    <path d="M62 44 h76 M58 50 h84" stroke="#6b4220" stroke-width="2"/>
  </g>
  <g class="ondas"><path d="M-40 154 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 v22 h-280z" fill="#1f5f86" opacity=".9"/></g>
</svg>`;

const CARRINHO_MINA = `
<svg class="receptaculo-svg" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse class="brilho-chao" cx="100" cy="162" rx="84" ry="7"/>
  <g fill="#6b4220">${repetir(8, (i) => `<rect x="${4 + i * 25}" y="150" width="14" height="14" rx="2"/>`)}</g>
  <path d="M0 152 H200 M0 160 H200" stroke="#5b5f66" stroke-width="4"/>
  <g class="vagonete">
    <g class="pepitas">
      <path d="M56 70 q6 -18 20 -12 q8 -12 20 -2 q14 -10 22 4 q14 -4 20 10z" fill="#e8b53a" stroke="#9a6b12" stroke-width="2"/>
      <g fill="#fff6c8"><circle cx="78" cy="60" r="2.2"/><circle cx="106" cy="58" r="2.2"/><circle cx="126" cy="64" r="1.8"/></g>
    </g>
    <path d="M42 72 h116 l-12 58 H54z" fill="#7d858f" stroke="#2a1810" stroke-width="3"/>
    <rect x="36" y="64" width="128" height="12" rx="3" fill="#5b5f66" stroke="#2a1810" stroke-width="3"/>
    <path d="M72 78 v50 M100 78 v52 M128 78 v50" stroke="#5b5f66" stroke-width="3"/>
    <g fill="#3b3f45">${repetir(6, (i) => `<circle cx="${46 + i * 21.6}" cy="70" r="2.2"/>`)}</g>
    <g class="roda" style="transform-origin:72px 138px"><circle cx="72" cy="138" r="14" fill="#3b3f45" stroke="#2a1810" stroke-width="3"/><path d="M72 125 v26 M59 138 h26" stroke="#9aa3ad" stroke-width="3"/><circle cx="72" cy="138" r="4" fill="#9aa3ad"/></g>
    <g class="roda" style="transform-origin:128px 138px"><circle cx="128" cy="138" r="14" fill="#3b3f45" stroke="#2a1810" stroke-width="3"/><path d="M128 125 v26 M115 138 h26" stroke="#9aa3ad" stroke-width="3"/><circle cx="128" cy="138" r="4" fill="#9aa3ad"/></g>
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
    titulo: 'O Galeão Faminto',
    lema: 'Comida farta para toda a tripulação',
    icone: iconePirata,
    receptaculo: BARRIL,
    boca: [0.5, 0.28],
    selo: SELOS.pirata,
    explosao: ['#e8b53a', '#fff3c2', '#7fd3ff'],
    textos: {
      receptaculo: 'Barril',
      prateleira: 'Prateleira',
      adicionar: 'Jogar no barril',
      voltar: 'Deixar na prateleira',
      adicionado: (nome) => `${nome} foi para o barril`,
      vazio: 'O barril está vazio. Escolha algo nas prateleiras do navio.',
      esvaziar: 'Esvaziar barril',
      esvaziado: 'Barril esvaziado',
      fechar: 'Fechar pedido',
      confirmar: 'Zarpar pedido',
      sucessoTitulo: 'Pedido zarpou!',
      sucessoTexto: 'O cozinheiro de bordo já está no fogão. Guarde o número do seu pedido.',
      novo: 'Começar novo pedido',
    },
    decoracao: `
      <div class="lua"></div>
      <div class="lanterna esq"><i class="luz"></i></div>
      <div class="lanterna dir"><i class="luz"></i></div>
      <div class="onda onda-1"></div><div class="onda onda-2"></div><div class="onda onda-3"></div>`,
    particulas: { cores: ['#fffbe8', '#cfe6ff', '#ffe7a0'], qtd: 70, vy: [-0.03, 0.03], vx: [-0.04, 0.04], tam: [0.6, 1.8], cintila: true, forma: 'ponto' },
  },

  faroeste: {
    id: 'faroeste',
    nome: 'Faroeste',
    titulo: 'Saloon Poeira Vermelha',
    lema: 'Comida quente e bebida gelada, forasteiro',
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
      <svg class="mesas" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 220 V120 h90 l20 -40 h120 l18 40 h160 l30 -70 h150 l26 70 h200 l14 -30 h110 l16 30 h256 V220z" fill="#d98050"/>
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
