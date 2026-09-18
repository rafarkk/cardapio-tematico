import { estado, assinar, iniciarLoja, definirTema, alternarSom } from './loja.js';
import { TEMAS, LISTA_TEMAS } from './temas.js';
import { criarParticulas, movimentoReduzido } from './efeitos.js';
import { tocar } from './sons.js';
import { $, $$, app, textos, camadaAberta } from './ui/comum.js';
import { iniciarEstante, renderizarEstante } from './ui/estante.js';
import { iniciarFicha, abrirFicha } from './ui/ficha.js';
import { iniciarCarrinho, renderizarReceptaculo, atualizarReceptaculo, renderizarGaveta } from './ui/carrinho.js';
import { iniciarImportador, abrirImportador } from './ui/importador.js';

const SETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SOM = {
  ligado: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  desligado: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

function montarEstrutura() {
  $('#app').innerHTML = `
    <div class="ambiente" aria-hidden="true">
      <div class="decoracao"></div>
      <canvas class="particulas"></canvas>
    </div>

    <header class="topo">
      <div class="marca">
        <h1 class="titulo"></h1>
        <p class="lema"></p>
      </div>
      <div class="controles">
        <button class="btn-icone" data-acao="som"></button>
        <button class="btn-icone btn-texto" data-acao="importar">Importar</button>
      </div>
    </header>

    <main class="salao">
      <nav class="navegacao" aria-label="Categorias">
        <button class="seta" data-acao="anterior">${SETA}</button>
        <div class="abas" role="tablist"></div>
        <button class="seta proxima" data-acao="proxima">${SETA}</button>
      </nav>
      <section class="estante" id="estante" role="tabpanel">
        <div class="estante-conteudo"></div>
      </section>
      <button class="indicador-mais" data-acao="rolar-mais" tabindex="-1" aria-hidden="true">
        <span class="indicador-texto"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </main>

    <div class="doca">
      <button class="receptaculo">
        <span class="receptaculo-arte"></span>
        <span class="contador" hidden>0</span>
      </button>
      <div class="receptaculo-rotulo" aria-hidden="true"><strong></strong><span class="receptaculo-total"></span></div>
    </div>

    <div class="camada camada-ficha" hidden>
      <div class="fundo" data-acao="voltar"></div>
      <div class="ficha" role="dialog" aria-modal="true" aria-labelledby="ficha-nome">
        <div class="ficha-palco"><div class="ficha-icone"></div></div>
        <div class="ficha-texto">
          <h2 id="ficha-nome"></h2>
          <p class="ficha-apelido"></p>
          <p class="ficha-desc"></p>
          <div class="ficha-linha">
            <span class="ficha-preco"></span>
            <div class="qtd" role="group" aria-label="Quantidade">
              <button data-acao="menos" aria-label="Diminuir">−</button>
              <output aria-live="polite">1</output>
              <button data-acao="mais" aria-label="Aumentar">+</button>
            </div>
          </div>
          <div class="ficha-acoes">
            <button class="btn secundario" data-acao="voltar"></button>
            <button class="btn primario" data-acao="adicionar"></button>
          </div>
        </div>
      </div>
    </div>

    <div class="camada camada-gaveta" hidden>
      <div class="fundo" data-acao="fechar-gaveta"></div>
      <aside class="gaveta" role="dialog" aria-modal="true" aria-labelledby="gaveta-titulo">
        <header class="gaveta-topo">
          <h2 id="gaveta-titulo"></h2>
          <button class="btn-fechar" data-acao="fechar-gaveta" aria-label="Fechar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
          </button>
        </header>
        <div class="gaveta-corpo"></div>
        <footer class="gaveta-rodape"></footer>
      </aside>
    </div>

    <div class="camada camada-pedido" hidden>
      <div class="fundo"></div>
      <div class="painel painel-pedido" role="dialog" aria-modal="true" aria-labelledby="pedido-titulo"></div>
    </div>

    <div class="camada camada-importador" hidden>
      <div class="fundo" data-acao="fechar-importador"></div>
      <div class="painel painel-importador" role="dialog" aria-modal="true" aria-labelledby="importador-titulo">
        <header class="painel-topo">
          <h2 id="importador-titulo">Importar produtos</h2>
          <button class="btn-fechar" data-acao="fechar-importador" aria-label="Fechar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
          </button>
        </header>
        <p class="nota">Os produtos ficam salvos neste navegador. <span class="importador-contagem"></span></p>
        <label class="zona-arquivo">
          <input type="file" accept=".json,application/json" />
          <span>Arraste um arquivo <code>.json</code> aqui ou <u>escolha um arquivo</u></span>
        </label>
        <label class="campo">
          <span>Ou cole o JSON</span>
          <textarea rows="8" spellcheck="false" placeholder='{ "produtos": [ { "categoria": "Lanches", "nome": "X-Salada", "descricao": "Pão, hambúrguer, queijo, alface e tomate", "preco": 26.9, "tipo": "hamburguer" } ] }'></textarea>
        </label>
        <fieldset class="modo">
          <legend>Ao importar</legend>
          <label><input type="radio" name="modo" value="substituir" checked /> Substituir o cardápio</label>
          <label><input type="radio" name="modo" value="adicionar" /> Adicionar ao cardápio</label>
        </fieldset>
        <div class="resultado" aria-live="polite"></div>
        <div class="acoes">
          <button class="btn primario" data-acao="importar-json">Importar produtos</button>
          <button class="btn secundario" data-acao="limpar">Limpar cardápio</button>
        </div>
        <details>
          <summary>Tipos de item aceitos no campo "tipo"</summary>
          <p class="nota">Toque em um tipo para copiar o nome. O ícone muda conforme o tema.</p>
          <div class="tipos-grade"></div>
        </details>
      </div>
    </div>

    <div class="painel-teste">
      <div class="painel-teste-lista" id="painel-teste-lista" hidden>
        <p>Tema (teste)</p>
        ${LISTA_TEMAS.map(
          (id) => `<button data-escolha="${id}" aria-pressed="false"><i class="amostra amostra-${id}" aria-hidden="true"></i>${TEMAS[id].nome}</button>`
        ).join('')}
      </div>
      <button class="painel-teste-botao" data-acao="painel-teste" aria-expanded="false" aria-controls="painel-teste-lista" aria-label="Trocar tema (teste)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.7-1.3-.7-2.1 0-.9.8-1.5 1.7-1.5H17a4 4 0 0 0 4-4c0-4.9-4-8.8-9-8.8z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7.5" cy="11" r="1.4" fill="currentColor"/><circle cx="10.5" cy="7" r="1.4" fill="currentColor"/><circle cx="15" cy="7.5" r="1.4" fill="currentColor"/></svg>
      </button>
    </div>

    <div class="avisos" aria-live="polite"></div>
    <div class="cortina" aria-hidden="true"></div>`;
}

function atualizarBotaoSom() {
  const b = $('[data-acao="som"]');
  b.innerHTML = estado.som ? SOM.ligado : SOM.desligado;
  b.setAttribute('aria-label', estado.som ? 'Desligar sons' : 'Ligar sons');
  b.setAttribute('aria-pressed', String(estado.som));
}

function aplicarTema() {
  const t = TEMAS[estado.tema];
  document.body.dataset.tema = t.id;
  document.title = `${t.titulo} · Cardápio`;
  $('.titulo').textContent = t.titulo;
  $('.lema').textContent = t.lema;
  $('.decoracao').innerHTML = t.decoracao;
  $$('.painel-teste [data-escolha]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.escolha === t.id)));
  $('[data-acao="anterior"]').setAttribute('aria-label', `${textos().prateleira} anterior`);
  $('[data-acao="proxima"]').setAttribute('aria-label', `Próxima ${textos().prateleira.toLowerCase()}`);
  renderizarReceptaculo();
  renderizarEstante(0);
  app.particulas.definir(t.particulas);
}

let trocando = false;
async function trocarTema(id) {
  if (id === estado.tema || trocando || camadaAberta()) return;
  trocando = true;
  const cortina = $('.cortina');
  const espera = movimentoReduzido() ? 0 : 320;
  cortina.classList.add('fechada');
  await new Promise((r) => setTimeout(r, espera));
  definirTema(id);
  aplicarTema();
  history.replaceState(null, '', `?tema=${id}`);
  tocar('confirmar');
  cortina.classList.remove('fechada');
  trocando = false;
}

function alternarPainelTeste(abrir) {
  const botao = $('.painel-teste-botao');
  const aberto = abrir ?? botao.getAttribute('aria-expanded') !== 'true';
  botao.setAttribute('aria-expanded', String(aberto));
  $('.painel-teste-lista').hidden = !aberto;
}

function iniciar() {
  iniciarLoja(LISTA_TEMAS);
  montarEstrutura();
  app.particulas = criarParticulas($('.particulas'));

  iniciarEstante({ aoEscolher: abrirFicha });
  iniciarFicha();
  iniciarCarrinho();
  iniciarImportador();

  // Troca de tema pelo painel de teste flutuante.
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-escolha]');
    if (b) trocarTema(b.dataset.escolha);
  });

  document.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (acao === 'som') alternarSom();
    if (acao === 'importar') abrirImportador();
    if (acao === 'painel-teste') alternarPainelTeste();
    else if (!e.target.closest('.painel-teste')) alternarPainelTeste(false);
  });

  assinar((motivo) => {
    if (motivo === 'carrinho' || motivo === 'produtos') {
      atualizarReceptaculo();
      renderizarGaveta();
    }
    if (motivo === 'produtos') renderizarEstante(0);
    if (motivo === 'som') atualizarBotaoSom();
  });

  atualizarBotaoSom();
  aplicarTema();
  document.body.classList.add('pronto');
}

iniciar();
