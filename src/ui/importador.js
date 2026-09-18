// Importador de produtos: colar ou arrastar um JSON para montar o cardápio (substituindo ou adicionando).

import { analisarLote, definirProdutos, estado } from '../loja.js';
import { TIPOS } from '../tipos.js';
import { svgIcone } from '../temas.js';
import { $, $$, escapar, avisar, abrirCamada, fecharCamada, plural } from './comum.js';

const camada = () => $('.camada-importador');

function mostrarResultado(html, tipo = '') {
  const r = $('.resultado', camada());
  r.className = `resultado ${tipo}`;
  r.innerHTML = html;
}

function listaMensagens(lista, max = 8) {
  const extras = lista.length > max ? `<li>…e mais ${lista.length - max}.</li>` : '';
  return `<ul>${lista.slice(0, max).map((m) => `<li>${escapar(m)}</li>`).join('')}${extras}</ul>`;
}

function importarTexto(texto) {
  let dados;
  try {
    dados = JSON.parse(texto);
  } catch (e) {
    mostrarResultado(`<p><strong>JSON inválido.</strong> ${escapar(e.message)}</p><p>Confira vírgulas, aspas e colchetes.</p>`, 'erro');
    return;
  }
  const { produtos, erros, avisos } = analisarLote(dados);
  if (!produtos.length) {
    mostrarResultado(`<p><strong>Nenhum produto importado.</strong></p>${listaMensagens(erros)}`, 'erro');
    return;
  }
  const modo = $('input[name="modo"]:checked', camada()).value;
  definirProdutos(produtos, modo);
  const partes = [`<p><strong>${plural(produtos.length, 'produto importado', 'produtos importados')}</strong> (${modo === 'adicionar' ? 'adicionados ao cardápio' : 'cardápio substituído'}).</p>`];
  if (erros.length) partes.push(`<p>${plural(erros.length, 'item ignorado', 'itens ignorados')}:</p>${listaMensagens(erros)}`);
  if (avisos.length) partes.push(`<p>Avisos:</p>${listaMensagens(avisos)}`);
  mostrarResultado(partes.join(''), erros.length ? 'alerta' : 'ok');
  avisar(`${plural(produtos.length, 'produto importado', 'produtos importados')}`);
}

function lerArquivo(arquivo) {
  if (!arquivo) return;
  arquivo.text().then((texto) => {
    $('textarea', camada()).value = texto;
    importarTexto(texto);
  });
}

function renderizarTipos() {
  $('.tipos-grade', camada()).innerHTML = Object.entries(TIPOS)
    .map(
      ([chave, info]) => `
      <button class="tipo" data-tipo="${chave}" title="Copiar &quot;${chave}&quot;">
        <span class="tipo-icone">${svgIcone(estado.tema, chave)}</span>
        <code>${chave}</code><span>${escapar(info.nome)}</span>
      </button>`
    )
    .join('');
}

export function abrirImportador() {
  const c = camada();
  mostrarResultado('');
  $('.tipos-grade', c).innerHTML = '';
  $('details', c).open = false;
  $('.importador-contagem', c).textContent = `O cardápio tem ${plural(estado.produtos.length, 'produto', 'produtos')} agora.`;
  abrirCamada(c, { aoFechar: fecharImportador });
}

export function fecharImportador() {
  fecharCamada(camada());
}

export function iniciarImportador() {
  const c = camada();

  c.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-acao], .tipo');
    if (!alvo) return;
    if (alvo.classList.contains('tipo')) {
      navigator.clipboard?.writeText(alvo.dataset.tipo).then(() => avisar(`"${alvo.dataset.tipo}" copiado`));
      return;
    }
    switch (alvo.dataset.acao) {
      case 'fechar-importador': fecharImportador(); break;
      case 'importar-json': {
        const texto = $('textarea', c).value.trim();
        if (!texto) mostrarResultado('<p>Cole um JSON na caixa ou escolha um arquivo.</p>', 'erro');
        else importarTexto(texto);
        break;
      }
      case 'limpar':
        definirProdutos([], 'substituir');
        mostrarResultado('<p>Cardápio limpo. Importe um JSON para montar as prateleiras de novo.</p>', 'alerta');
        break;
    }
    $('.importador-contagem', c).textContent = `O cardápio tem ${plural(estado.produtos.length, 'produto', 'produtos')} agora.`;
  });

  $('input[type="file"]', c).addEventListener('change', (e) => lerArquivo(e.target.files[0]));

  const zona = $('.zona-arquivo', c);
  ['dragenter', 'dragover'].forEach((ev) => zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.add('sobre'); }));
  ['dragleave', 'drop'].forEach((ev) => zona.addEventListener(ev, () => zona.classList.remove('sobre')));
  zona.addEventListener('drop', (e) => { e.preventDefault(); lerArquivo(e.dataTransfer.files[0]); });

  $('details', c).addEventListener('toggle', (e) => {
    if (e.target.open && !$$('.tipo', c).length) renderizarTipos();
  });
}
