// Ficha do item: o ícone sai da prateleira, a ficha aparece; ao adicionar, o item voa até o receptáculo.

import { estado, produtoPorId, adicionarAoCarrinho } from '../loja.js';
import { svgIcone, apelido } from '../temas.js';
import { tocar } from '../sons.js';
import { voar } from '../efeitos.js';
import { itemNaEstante } from './estante.js';
import { alvoBoca, receber } from './carrinho.js';
import { $, brl, escapar, textos, avisar, abrirCamada, fecharCamada, esperarAnimacao } from './comum.js';

let atual = null; // { produto, qtd, elItem }
let ocupado = false;

const camada = () => $('.camada-ficha');

function preencher(produto) {
  const t = textos();
  const ficha = $('.ficha', camada());
  $('.ficha-icone', ficha).innerHTML = svgIcone(estado.tema, produto.tipo);
  $('#ficha-nome', ficha).textContent = produto.nome;
  $('.ficha-apelido', ficha).textContent = apelido(estado.tema, produto);
  $('.ficha-desc', ficha).textContent = produto.descricao || 'Sem descrição.';
  $('.ficha-preco', ficha).textContent = brl(produto.preco);
  $('[data-acao="voltar"]', ficha).textContent = t.voltar;
  $('[data-acao="adicionar"]', ficha).innerHTML = `${escapar(t.adicionar)} <span class="btn-valor">${brl(produto.preco)}</span>`;
  atualizarQtd(1);
}

function atualizarQtd(qtd) {
  atual.qtd = Math.max(1, Math.min(99, qtd));
  const ficha = $('.ficha', camada());
  $('.ficha .qtd output').textContent = atual.qtd;
  $('[data-acao="menos"]', ficha).disabled = atual.qtd <= 1;
  $('.btn-valor', ficha).textContent = brl(atual.qtd * atual.produto.preco);
}

export async function abrirFicha(id, elItem) {
  if (ocupado || atual) return;
  const produto = produtoPorId(id);
  if (!produto) return;
  ocupado = true;
  atual = { produto, qtd: 1, elItem };
  tocar('pegar');

  const iconeItem = $('.item-icone', elItem);
  const de = iconeItem.getBoundingClientRect();
  preencher(produto);

  const c = camada();
  c.classList.remove('saindo', 'entrando');
  abrirCamada(c, { aoFechar: voltar, focar: $('[data-acao="adicionar"]', c) });
  const slot = $('.ficha-icone', c);
  slot.style.visibility = 'hidden';
  const para = slot.getBoundingClientRect(); // medido antes da animação de entrada
  c.classList.add('entrando');
  elItem.classList.add('fora');

  const voador = await voar(svgIcone(estado.tema, produto.tipo), de, para, { arco: 40, duracao: 520 });
  slot.style.visibility = '';
  voador.remove();
  ocupado = false;
}

async function fecharFicha() {
  const c = camada();
  c.classList.remove('entrando');
  c.classList.add('saindo');
  await esperarAnimacao($('.ficha', c), 400);
  c.classList.remove('saindo');
  fecharCamada(c);
}

export async function voltar() {
  if (ocupado || !atual) return;
  ocupado = true;
  const { produto, elItem } = atual;
  tocar('voltar');
  const slot = $('.ficha-icone', camada());
  const de = slot.getBoundingClientRect();
  slot.style.visibility = 'hidden';
  const fechando = fecharFicha();

  // O item pode ter sido re-renderizado (ex.: redimensionamento); procura de novo.
  const destinoEl = document.contains(elItem) ? elItem : itemNaEstante(produto.id);
  if (destinoEl) {
    const para = $('.item-icone', destinoEl).getBoundingClientRect();
    const v = await voar(svgIcone(estado.tema, produto.tipo), de, para, { arco: 20, duracao: 460 });
    destinoEl.classList.remove('fora');
    v.remove();
  }
  await fechando;
  slot.style.visibility = '';
  atual = null;
  ocupado = false;
}

async function adicionar() {
  if (ocupado || !atual) return;
  ocupado = true;
  const { produto, qtd, elItem } = atual;
  const slot = $('.ficha-icone', camada());
  const de = slot.getBoundingClientRect();
  slot.style.visibility = 'hidden';
  const fechando = fecharFicha();

  const v = await voar(svgIcone(estado.tema, produto.tipo), de, alvoBoca(40), {
    arco: 180,
    duracao: 760,
    girar: 240,
    opacidadeFinal: 0.3,
    easing: 'cubic-bezier(.35,0,.65,1)',
  });
  v.remove();
  adicionarAoCarrinho(produto.id, qtd);
  receber(produto);
  avisar(`${qtd > 1 ? `${qtd}× ` : ''}${textos().adicionado(produto.nome)}`);

  // Um "novo" item reaparece na prateleira.
  const repor = document.contains(elItem) ? elItem : itemNaEstante(produto.id);
  repor?.classList.remove('fora');
  repor?.classList.add('reposto');
  setTimeout(() => repor?.classList.remove('reposto'), 700);

  await fechando;
  slot.style.visibility = '';
  atual = null;
  ocupado = false;
}

export function iniciarFicha() {
  camada().addEventListener('click', (e) => {
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (!acao || !atual) return;
    if (acao === 'voltar') voltar();
    if (acao === 'adicionar') adicionar();
    if (acao === 'mais') { atualizarQtd(atual.qtd + 1); tocar('nav'); }
    if (acao === 'menos') { atualizarQtd(atual.qtd - 1); tocar('nav'); }
  });
}
