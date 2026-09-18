// Utilidades compartilhadas pelos módulos de interface.

import { estado } from '../loja.js';
import { TEMAS } from '../temas.js';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const brl = (v) => moeda.format(v);

export const tema = () => TEMAS[estado.tema];
export const textos = () => tema().textos;

export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

export function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

/** Referências globais preenchidas pelo main.js (partículas etc.). */
export const app = { particulas: null };

let idAviso = 0;
export function avisar(texto) {
  const caixa = $('.avisos');
  if (!caixa) return;
  const el = document.createElement('div');
  el.className = 'aviso';
  el.id = `aviso-${++idAviso}`;
  el.textContent = texto;
  caixa.appendChild(el);
  setTimeout(() => el.classList.add('saindo'), 2400);
  setTimeout(() => el.remove(), 2900);
}

// ---------- Camadas modais ----------

const pilha = [];

/** Abre uma camada modal; Esc chama aoFechar. Guarda o foco para devolver depois. */
export function abrirCamada(camada, { aoFechar, focar } = {}) {
  const anterior = document.activeElement;
  camada.hidden = false;
  pilha.push({ camada, aoFechar, anterior });
  document.body.classList.add('com-camada');
  requestAnimationFrame(() => (focar ? focar.focus() : camada.querySelector('button, [href], input, textarea')?.focus()));
}

export function fecharCamada(camada) {
  const i = pilha.findIndex((c) => c.camada === camada);
  if (i === -1) return;
  const [{ anterior }] = pilha.splice(i, 1);
  camada.hidden = true;
  if (!pilha.length) document.body.classList.remove('com-camada');
  if (anterior && document.contains(anterior)) anterior.focus({ preventScroll: true });
}

export const camadaAberta = () => pilha.length > 0;

document.addEventListener('keydown', (e) => {
  const topo = pilha.at(-1);
  if (!topo) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    topo.aoFechar?.();
  } else if (e.key === 'Tab') {
    // Mantém o foco dentro da camada aberta.
    const focaveis = $$('button:not([disabled]), [href], input, textarea, summary, [tabindex="0"]', topo.camada).filter(
      (el) => el.offsetParent !== null
    );
    if (!focaveis.length) return;
    const primeiro = focaveis[0], ultimo = focaveis.at(-1);
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }
});

/** Espera o fim de uma animação CSS (com limite de segurança). */
export function esperarAnimacao(el, limite = 900) {
  return new Promise((resolve) => {
    const fim = (e) => {
      if (e && e.target !== el) return; // ignora animações dos filhos
      clearTimeout(t);
      el.removeEventListener('animationend', fim);
      resolve();
    };
    const t = setTimeout(fim, limite);
    el.addEventListener('animationend', fim);
  });
}

// ---------- Rolagem temática ----------

/** Botão com a seta do tema que indica (e rola para) o conteúdo escondido abaixo. */
export const htmlIndicadorMais = () => `
  <button class="indicador-mais" tabindex="-1" aria-hidden="true" aria-label="Ver mais itens abaixo">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>`;

/**
 * Liga uma lista rolável ao seu indicador: esmaece as bordas, mostra a seta quando há
 * mais conteúdo abaixo e rola ao tocar nela. Retorna a função que recalcula o estado.
 * `rotulo` (opcional) devolve o texto acessível do botão.
 */
export function ligarRolagem(lista, botao, { rotulo, observar = true } = {}) {
  const atualizar = () => {
    const temMais = lista.scrollHeight - lista.clientHeight - lista.scrollTop > 8;
    lista.classList.toggle('tem-mais', temMais);
    lista.classList.toggle('rolou', lista.scrollTop > 8);
    botao.classList.toggle('visivel', temMais);
    botao.setAttribute('aria-hidden', String(!temMais));
    botao.tabIndex = temMais ? 0 : -1;
    if (temMais && rotulo) botao.setAttribute('aria-label', rotulo());
  };
  let agendado = false;
  lista.addEventListener('scroll', () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      atualizar();
    });
  }, { passive: true });
  botao.addEventListener('click', () => {
    lista.scrollBy({ top: lista.clientHeight * 0.75, behavior: 'smooth' });
  });
  if (observar) new ResizeObserver(atualizar).observe(lista);
  requestAnimationFrame(atualizar);
  return atualizar;
}
