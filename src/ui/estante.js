// Abas de categoria + prateleiras com os itens da categoria atual.

import { estado, categorias } from '../loja.js';
import { svgIcone } from '../temas.js';
import { tocar } from '../sons.js';
import { movimentoReduzido } from '../efeitos.js';
import { $, $$, brl, escapar, plural, camadaAberta } from './comum.js';

let indice = 0;
let colunasAtuais = 0;
let navegacao = 0; // descarta trocas antigas quando o usuário clica rápido

function colunas() {
  const estante = $('.estante');
  const largura = estante.clientWidth - 32;
  const minimo = largura < 560 ? 104 : Math.max(150, Math.min(190, window.innerWidth * 0.12));
  const gap = 12;
  return Math.max(2, Math.min(7, Math.floor((largura + gap) / (minimo + gap))));
}

function htmlItem(p, n) {
  return `
    <button class="item" data-id="${p.id}" style="--i:${n}" aria-label="${escapar(p.nome)}, ${brl(p.preco)}">
      <span class="item-icone">${svgIcone(estado.tema, p.tipo)}</span>
      <span class="item-placa"><span class="item-nome">${escapar(p.nome)}</span><span class="item-preco">${brl(p.preco)}</span></span>
    </button>`;
}

function renderizarAbas(cats) {
  const abas = $('.abas');
  abas.innerHTML = cats
    .map(
      (c, i) =>
        `<button class="aba" role="tab" id="aba-${i}" data-cat="${i}" aria-selected="${i === indice}" aria-controls="estante" tabindex="${i === indice ? 0 : -1}">${escapar(c)}</button>`
    )
    .join('');
  $('.aba[aria-selected="true"]', abas)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  const variasCats = cats.length > 1;
  $('[data-acao="anterior"]').hidden = !variasCats;
  $('[data-acao="proxima"]').hidden = !variasCats;
}

export function renderizarEstante(direcao = 0, { animarItens = true } = {}) {
  const cats = categorias();
  if (indice >= cats.length) indice = Math.max(0, cats.length - 1);
  renderizarAbas(cats);

  const conteudo = $('.estante-conteudo');
  const estante = $('.estante');
  if (!cats.length) {
    estante.removeAttribute('aria-labelledby');
    conteudo.innerHTML = `
      <div class="estante-vazia">
        <p>O cardápio está vazio. Importe um arquivo JSON com os produtos para montar as prateleiras.</p>
        <button class="btn primario" data-acao="importar">Importar produtos</button>
      </div>`;
    return;
  }

  estante.setAttribute('aria-labelledby', `aba-${indice}`);
  const produtos = estado.produtos.filter((p) => p.categoria === cats[indice]);
  colunasAtuais = colunas();
  const linhas = [];
  for (let i = 0; i < produtos.length; i += colunasAtuais) linhas.push(produtos.slice(i, i + colunasAtuais));

  let n = 0;
  conteudo.innerHTML = linhas
    .map(
      (linha) => `
      <div class="prateleira" style="--colunas:${colunasAtuais}">
        <div class="prateleira-itens">${linha.map((p) => htmlItem(p, n++)).join('')}</div>
        <div class="prateleira-tabua" aria-hidden="true"></div>
      </div>`
    )
    .join('');

  conteudo.classList.toggle('chegando', animarItens);
  if (direcao && !movimentoReduzido()) {
    conteudo.animate(
      [{ opacity: 0, transform: `translateX(${direcao * 60}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );
  }
  estante.scrollTop = 0;
  requestAnimationFrame(atualizarIndicador);
}

/** Mostra (ou esconde) o aviso de que há itens abaixo, com a contagem, e o esmaecimento das bordas. */
export function atualizarIndicador() {
  const estante = $('.estante');
  const indicador = $('.indicador-mais');
  const resto = estante.scrollHeight - estante.clientHeight - estante.scrollTop;
  const temMais = resto > 8;
  estante.classList.toggle('tem-mais', temMais);
  estante.classList.toggle('rolou', estante.scrollTop > 8);
  if (temMais) {
    const limite = estante.getBoundingClientRect().bottom - 30;
    const abaixo = $$('.item-icone', estante).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 > limite;
    }).length;
    $('.indicador-texto', indicador).textContent = abaixo ? `Mais ${plural(abaixo, 'item', 'itens')} abaixo` : 'Mais abaixo';
  }
  indicador.classList.toggle('visivel', temMais);
  indicador.setAttribute('aria-hidden', String(!temMais));
  indicador.tabIndex = temMais ? 0 : -1;
}

export async function irPara(pedido) {
  const cats = categorias();
  if (cats.length < 2) return;
  const novo = (pedido + cats.length) % cats.length;
  if (novo === indice) return;
  const direcao = pedido > indice ? 1 : -1;
  const minha = ++navegacao;
  tocar('nav');
  if (!movimentoReduzido()) {
    await $('.estante-conteudo').animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-direcao * 50}px)` }],
      { duration: 160, easing: 'ease-in', fill: 'forwards' }
    ).finished;
  }
  if (minha !== navegacao) return;
  indice = novo;
  $('.estante-conteudo').getAnimations().forEach((a) => a.cancel());
  renderizarEstante(direcao);
  $(`#aba-${indice}`)?.focus({ preventScroll: true });
}

export function itemNaEstante(id) {
  return $(`.estante .item[data-id="${CSS.escape(id)}"]`);
}

export function iniciarEstante({ aoEscolher }) {
  const estante = $('.estante');

  $('.abas').addEventListener('click', (e) => {
    const aba = e.target.closest('[data-cat]');
    if (aba) irPara(Number(aba.dataset.cat));
  });
  $('.abas').addEventListener('keydown', (e) => {
    if (e.key === 'Home') { e.preventDefault(); irPara(0); }
    if (e.key === 'End') { e.preventDefault(); irPara(categorias().length - 1); }
  });
  $('[data-acao="anterior"]').addEventListener('click', () => irPara(indice - 1));
  $('[data-acao="proxima"]').addEventListener('click', () => irPara(indice + 1));

  estante.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) aoEscolher(item.dataset.id, item);
  });

  let agendado = false;
  estante.addEventListener('scroll', () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      atualizarIndicador();
    });
  }, { passive: true });

  $('.indicador-mais').addEventListener('click', () => {
    estante.scrollBy({ top: estante.clientHeight * 0.75, behavior: movimentoReduzido() ? 'auto' : 'smooth' });
  });

  // Deslizar o dedo troca de prateleira.
  let inicio = null;
  estante.addEventListener('pointerdown', (e) => { inicio = { x: e.clientX, y: e.clientY }; });
  estante.addEventListener('pointerup', (e) => {
    if (!inicio) return;
    const dx = e.clientX - inicio.x, dy = e.clientY - inicio.y;
    inicio = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) irPara(indice + (dx < 0 ? 1 : -1));
  });

  document.addEventListener('keydown', (e) => {
    if (camadaAberta() || e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') irPara(indice + 1);
    if (e.key === 'ArrowLeft') irPara(indice - 1);
  });

  new ResizeObserver(() => {
    if (categorias().length && colunas() !== colunasAtuais) renderizarEstante(0, { animarItens: false });
    else atualizarIndicador();
  }).observe(estante);
}

