// Receptáculo (caldeirão/baú/teleportador), gaveta com os itens e fechamento do pedido.

import {
  estado, linhasCarrinho, totalItens, totalCarrinho, alterarQuantidade, removerDoCarrinho,
  esvaziarCarrinho, fecharPedido,
} from '../loja.js';
import { svgIcone, apelido } from '../temas.js';
import { infoTipo } from '../tipos.js';
import { tocar } from '../sons.js';
import { pulsarClasse, voar } from '../efeitos.js';
import { $, $$, app, brl, escapar, plural, tema, textos, avisar, abrirCamada, fecharCamada, esperarAnimacao } from './comum.js';

// ---------- Receptáculo ----------

export function renderizarReceptaculo() {
  $('.receptaculo-arte').innerHTML = tema().receptaculo;
  atualizarReceptaculo();
}

export function atualizarReceptaculo() {
  const n = totalItens();
  const t = textos();
  const botao = $('.receptaculo');
  const contador = $('.contador', botao);
  contador.textContent = n;
  contador.hidden = n === 0;
  botao.classList.toggle('cheio', n > 0);
  botao.setAttribute('aria-label', `${t.receptaculo}: ${n ? `${plural(n, 'item', 'itens')}, ${brl(totalCarrinho())}` : 'vazio'}. Abrir`);
  $('.receptaculo-rotulo strong').textContent = t.receptaculo;
  $('.receptaculo-total').textContent = n ? `${plural(n, 'item', 'itens')} · ${brl(totalCarrinho())}` : 'vazio';
}

/** Retângulo pequeno na "boca" do receptáculo, alvo do voo dos itens. */
export function alvoBoca(tamanho = 44) {
  const r = $('.receptaculo-svg').getBoundingClientRect();
  const [fx, fy] = tema().boca;
  const x = r.left + r.width * fx, y = r.top + r.height * fy;
  return { left: x - tamanho / 2, top: y - tamanho / 2, width: tamanho, height: tamanho, x, y };
}

const CORES_EXPLOSAO = {
  bruxo: ['#7cff6b', '#c8ffb0', '#fff3b0'],
  medieval: ['#f2c14e', '#ffe7a0', '#ff9a3c'],
  futurista: ['#37f0ff', '#ffffff', '#ff3ea5'],
};

/** Efeito de chegada de um item no receptáculo. */
export function receber(produto) {
  const botao = $('.receptaculo');
  const info = infoTipo(produto.tipo);
  if (estado.tema === 'bruxo' && info.cor) botao.style.setProperty('--caldo', info.cor);
  pulsarClasse(botao, 'recebendo', 900);
  pulsarClasse($('.contador'), 'saltando', 500);
  const boca = alvoBoca();
  const cores = [...CORES_EXPLOSAO[estado.tema], ...(info.cor ? [info.cor] : [])];
  app.particulas.explodir(boca.x, boca.y, { cores, qtd: 34, forca: 6, subir: true, gravidade: 0.16 });
  tocar('adicionar');
}

// ---------- Gaveta ----------

const camadaGaveta = () => $('.camada-gaveta');
let confirmandoEsvaziar = null;

function htmlLinha(l) {
  return `
    <li class="linha" data-id="${l.produto.id}">
      <span class="linha-icone">${svgIcone(estado.tema, l.produto.tipo)}</span>
      <div class="linha-info">
        <span class="linha-nome">${escapar(l.produto.nome)}</span>
        <span class="linha-apelido">${escapar(apelido(estado.tema, l.produto))}</span>
        <span class="linha-unit">${brl(l.produto.preco)} cada</span>
      </div>
      <div class="qtd" role="group" aria-label="Quantidade de ${escapar(l.produto.nome)}">
        <button data-acao="menos" aria-label="Diminuir">−</button>
        <output aria-live="polite">${l.qtd}</output>
        <button data-acao="mais" aria-label="Aumentar">+</button>
      </div>
      <span class="linha-subtotal">${brl(l.qtd * l.produto.preco)}</span>
      <button class="linha-remover" data-acao="remover" aria-label="Tirar ${escapar(l.produto.nome)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      </button>
    </li>`;
}

export function renderizarGaveta() {
  const camada = camadaGaveta();
  if (camada.hidden) return;
  const t = textos();
  const linhas = linhasCarrinho();
  $('#gaveta-titulo').textContent = t.receptaculo;
  $('.gaveta-corpo', camada).innerHTML = linhas.length
    ? `<ul class="linhas">${linhas.map(htmlLinha).join('')}</ul>`
    : `<p class="gaveta-vazia">${t.vazio}</p>`;
  $('.gaveta-rodape', camada).innerHTML = `
    <div class="total"><span>Total</span><strong>${brl(totalCarrinho())}</strong></div>
    <div class="acoes">
      <button class="btn secundario" data-acao="esvaziar" ${linhas.length ? '' : 'disabled'}>${t.esvaziar}</button>
      <button class="btn primario" data-acao="fechar-pedido" ${linhas.length ? '' : 'disabled'}>${t.fechar}</button>
    </div>`;
}

export function abrirGaveta() {
  const camada = camadaGaveta();
  camada.classList.remove('saindo');
  abrirCamada(camada, { aoFechar: fecharGaveta });
  renderizarGaveta();
  $('.gaveta-topo .btn-fechar', camada).focus();
  tocar('pegar');
  $('.receptaculo').classList.add('aberto');
}

export async function fecharGaveta() {
  const camada = camadaGaveta();
  if (camada.hidden) return;
  camada.classList.add('saindo');
  await esperarAnimacao($('.gaveta', camada), 400);
  camada.classList.remove('saindo');
  fecharCamada(camada);
  $('.receptaculo').classList.remove('aberto');
  cancelarEsvaziar();
}

function cancelarEsvaziar() {
  clearTimeout(confirmandoEsvaziar);
  confirmandoEsvaziar = null;
}

async function esvaziar(botao) {
  if (!confirmandoEsvaziar) {
    botao.textContent = 'Toque de novo para confirmar';
    botao.classList.add('alerta');
    confirmandoEsvaziar = setTimeout(() => {
      cancelarEsvaziar();
      renderizarGaveta();
    }, 3000);
    return;
  }
  cancelarEsvaziar();
  tocar('esvaziar');
  $$('.gaveta .linha').forEach((li, i) => {
    li.style.setProperty('--i', i);
    li.classList.add('sumindo');
  });
  pulsarClasse($('.receptaculo'), 'esvaziando', 900);
  const boca = alvoBoca();
  app.particulas.explodir(boca.x, boca.y, { cores: ['#9aa3ad', '#6b7690', '#cfd6de'], qtd: 30, forca: 5, subir: true, gravidade: 0.05 });
  await new Promise((r) => setTimeout(r, 450));
  esvaziarCarrinho();
  $('.receptaculo').style.removeProperty('--caldo');
  avisar(textos().esvaziado);
}

// ---------- Fechamento do pedido ----------

const camadaPedido = () => $('.camada-pedido');

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
};

function htmlRevisao() {
  const t = textos();
  const linhas = linhasCarrinho();
  return `
    <h2 id="pedido-titulo">Revise seu pedido</h2>
    <ul class="resumo">${linhas
      .map((l) => `<li><span>${l.qtd}× ${escapar(l.produto.nome)}</span><span>${brl(l.qtd * l.produto.preco)}</span></li>`)
      .join('')}</ul>
    <div class="total"><span>Total</span><strong>${brl(totalCarrinho())}</strong></div>
    <label class="campo"><span>Nome ou mesa (opcional)</span><input name="identificacao" maxlength="40" autocomplete="off" /></label>
    <div class="acoes">
      <button class="btn secundario" data-acao="voltar-pedido">Voltar</button>
      <button class="btn primario" data-acao="confirmar-pedido">${t.confirmar}</button>
    </div>`;
}

function htmlSucesso(pedido) {
  const t = textos();
  const numero = String(pedido.numero).padStart(3, '0');
  return `
    <div class="selo">${SELOS[estado.tema]}</div>
    <h2 id="pedido-titulo">${t.sucessoTitulo}</h2>
    <p class="numero-pedido">Pedido nº <strong>${numero}</strong>${pedido.identificacao ? `<span class="pedido-id">${escapar(pedido.identificacao)}</span>` : ''}</p>
    <p class="sucesso-texto">${t.sucessoTexto}</p>
    <p class="sucesso-total">${plural(pedido.itens.reduce((s, i) => s + i.qtd, 0), 'item', 'itens')} · ${brl(pedido.total)}</p>
    <div class="acoes"><button class="btn primario" data-acao="novo-pedido">${t.novo}</button></div>`;
}

async function abrirPedido() {
  await fecharGaveta();
  const camada = camadaPedido();
  const painel = $('.painel-pedido', camada);
  painel.classList.remove('sucesso');
  painel.innerHTML = htmlRevisao();
  abrirCamada(camada, { aoFechar: fecharPedidoCamada, focar: $('[data-acao="confirmar-pedido"]', painel) });
}

async function fecharPedidoCamada() {
  const camada = camadaPedido();
  camada.classList.add('saindo');
  await esperarAnimacao($('.painel-pedido', camada), 400);
  camada.classList.remove('saindo');
  fecharCamada(camada);
}

async function confirmar() {
  const painel = $('.painel-pedido');
  const identificacao = $('input[name="identificacao"]', painel)?.value;
  const pedido = fecharPedido(identificacao);
  tocar('confirmar');

  // Ícones dos itens sobem do receptáculo como numa "entrega".
  const boca = alvoBoca(56);
  pedido.itens.slice(0, 6).forEach((item, i) => {
    const produto = estado.produtos.find((p) => p.nome === item.nome);
    if (!produto) return;
    setTimeout(async () => {
      const destino = { left: boca.left + (i - 2.5) * 70, top: -120, width: 56, height: 56 };
      const v = await voar(svgIcone(estado.tema, produto.tipo), boca, destino, {
        arco: 40, duracao: 900, girar: (i % 2 ? 1 : -1) * 90, opacidadeFinal: 0, atras: true,
      });
      v.remove();
    }, i * 90);
  });

  document.body.classList.add('celebrando');
  pulsarClasse($('.receptaculo'), 'enviando', 1400);
  app.particulas.explodir(boca.x, boca.y, { cores: CORES_EXPLOSAO[estado.tema], qtd: 90, forca: 11, subir: true, gravidade: 0.14, tam: [2, 5] });
  setTimeout(() => document.body.classList.remove('celebrando'), 1600);
  $('.receptaculo').style.removeProperty('--caldo');

  painel.classList.add('sucesso');
  painel.innerHTML = htmlSucesso(pedido);
  $('[data-acao="novo-pedido"]', painel).focus();
}

// ---------- Eventos ----------

export function iniciarCarrinho() {
  $('.receptaculo').addEventListener('click', abrirGaveta);

  camadaGaveta().addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const id = alvo.closest('.linha')?.dataset.id;
    switch (alvo.dataset.acao) {
      case 'fechar-gaveta': fecharGaveta(); break;
      case 'mais': alterarQuantidade(id, 1); tocar('nav'); break;
      case 'menos': alterarQuantidade(id, -1); tocar('nav'); break;
      case 'remover': {
        const li = alvo.closest('.linha');
        li.classList.add('sumindo');
        tocar('voltar');
        setTimeout(() => removerDoCarrinho(id), 280);
        break;
      }
      case 'esvaziar': esvaziar(alvo); break;
      case 'fechar-pedido': abrirPedido(); break;
    }
  });

  camadaPedido().addEventListener('click', (e) => {
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (acao === 'voltar-pedido') { fecharPedidoCamada().then(abrirGaveta); }
    if (acao === 'confirmar-pedido') confirmar();
    if (acao === 'novo-pedido' || acao === 'fechar-pedido-fundo') fecharPedidoCamada();
  });
  camadaPedido().addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.name === 'identificacao') confirmar();
  });
}
