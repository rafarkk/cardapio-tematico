// Estado da aplicação: produtos, carrinho, tema e preferências.
// Persistido no localStorage para sobreviver a recarregamentos durante os testes.

import { resolverTipo } from './tipos.js';

const CHAVES = {
  produtos: 'cardapio.produtos',
  carrinho: 'cardapio.carrinho',
  tema: 'cardapio.tema',
  som: 'cardapio.som',
  pedidos: 'cardapio.pedidos',
};

function ler(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto == null ? padrao : JSON.parse(bruto);
  } catch {
    return padrao;
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* modo privado ou armazenamento cheio: segue só em memória */
  }
}

const ouvintes = new Set();

export const estado = {
  produtos: [],
  carrinho: [], // [{ id, qtd }]
  tema: 'bruxo',
  som: true,
};

export function assinar(fn) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

function emitir(motivo) {
  for (const fn of ouvintes) fn(motivo);
}

// ---------- Produtos ----------

let sequencia = 0;
function novoId(nome) {
  sequencia += 1;
  const base = String(nome).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${base.slice(0, 24)}-${Date.now().toString(36)}${sequencia.toString(36)}`;
}

function campo(obj, ...nomes) {
  for (const n of nomes) if (obj[n] !== undefined && obj[n] !== null) return obj[n];
  return undefined;
}

function lerPreco(valor) {
  if (typeof valor === 'number') return valor;
  if (typeof valor !== 'string') return NaN;
  const limpo = valor.replace(/[^\d,.-]/g, '');
  // "1.234,56" -> 1234.56 ; "24,90" -> 24.90 ; "24.90" -> 24.90
  const normal = limpo.includes(',') ? limpo.replace(/\./g, '').replace(',', '.') : limpo;
  return Number(normal);
}

/**
 * Valida e normaliza um produto vindo do JSON.
 * Retorna { produto, erros, avisos }; produto é null quando há erros.
 */
export function normalizarProduto(bruto, indice) {
  const erros = [];
  const avisos = [];
  const rotulo = `Item ${indice + 1}`;

  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) {
    return { produto: null, erros: [`${rotulo}: não é um objeto.`], avisos };
  }

  const categoria = String(campo(bruto, 'categoria', 'category') ?? '').trim();
  const nome = String(campo(bruto, 'nome', 'name') ?? '').trim();
  const descricao = String(campo(bruto, 'descricao', 'descrição', 'description') ?? '').trim();
  const preco = lerPreco(campo(bruto, 'preco', 'preço', 'price'));
  const tipoInformado = campo(bruto, 'tipo', 'type', 'tipo_item');

  if (!nome) erros.push(`${rotulo}: falta o campo "nome".`);
  if (!categoria) erros.push(`${rotulo}${nome ? ` (${nome})` : ''}: falta o campo "categoria".`);
  if (!Number.isFinite(preco) || preco < 0) {
    erros.push(`${rotulo}${nome ? ` (${nome})` : ''}: "preco" precisa ser um número, ex.: 24.9 ou "24,90".`);
  }

  let tipo = resolverTipo(tipoInformado);
  if (!tipo) {
    avisos.push(
      `${rotulo}${nome ? ` (${nome})` : ''}: tipo "${tipoInformado ?? ''}" não reconhecido, usando ícone genérico.`
    );
    tipo = 'generico';
  }

  if (erros.length) return { produto: null, erros, avisos };

  return {
    produto: {
      id: novoId(nome),
      categoria,
      nome,
      descricao,
      preco: Math.round(preco * 100) / 100,
      tipo,
      tipoOriginal: String(tipoInformado ?? ''),
    },
    erros,
    avisos,
  };
}

/** Aceita um array de produtos ou um objeto { produtos: [...] }. */
export function analisarLote(dados) {
  const lista = Array.isArray(dados) ? dados : dados?.produtos ?? dados?.itens ?? dados?.products;
  if (!Array.isArray(lista)) {
    return {
      produtos: [],
      erros: ['O JSON precisa ser uma lista de produtos ou um objeto com a chave "produtos".'],
      avisos: [],
    };
  }
  const produtos = [];
  const erros = [];
  const avisos = [];
  lista.forEach((bruto, i) => {
    const r = normalizarProduto(bruto, i);
    if (r.produto) produtos.push(r.produto);
    erros.push(...r.erros);
    avisos.push(...r.avisos);
  });
  return { produtos, erros, avisos };
}

export function definirProdutos(produtos, modo = 'substituir') {
  estado.produtos = modo === 'adicionar' ? [...estado.produtos, ...produtos] : produtos;
  const ids = new Set(estado.produtos.map((p) => p.id));
  estado.carrinho = estado.carrinho.filter((l) => ids.has(l.id));
  gravar(CHAVES.produtos, estado.produtos);
  gravar(CHAVES.carrinho, estado.carrinho);
  emitir('produtos');
}

export function produtoPorId(id) {
  return estado.produtos.find((p) => p.id === id);
}

/** Categorias na ordem em que aparecem nos produtos. */
export function categorias() {
  const vistas = [];
  for (const p of estado.produtos) if (!vistas.includes(p.categoria)) vistas.push(p.categoria);
  return vistas;
}

// ---------- Carrinho ----------

export function adicionarAoCarrinho(id, qtd = 1) {
  const linha = estado.carrinho.find((l) => l.id === id);
  if (linha) linha.qtd += qtd;
  else estado.carrinho.push({ id, qtd });
  gravar(CHAVES.carrinho, estado.carrinho);
  emitir('carrinho');
}

export function alterarQuantidade(id, delta) {
  const linha = estado.carrinho.find((l) => l.id === id);
  if (!linha) return;
  linha.qtd += delta;
  if (linha.qtd <= 0) estado.carrinho = estado.carrinho.filter((l) => l.id !== id);
  gravar(CHAVES.carrinho, estado.carrinho);
  emitir('carrinho');
}

export function removerDoCarrinho(id) {
  estado.carrinho = estado.carrinho.filter((l) => l.id !== id);
  gravar(CHAVES.carrinho, estado.carrinho);
  emitir('carrinho');
}

export function esvaziarCarrinho() {
  estado.carrinho = [];
  gravar(CHAVES.carrinho, estado.carrinho);
  emitir('carrinho');
}

export function linhasCarrinho() {
  return estado.carrinho
    .map((l) => ({ ...l, produto: produtoPorId(l.id) }))
    .filter((l) => l.produto);
}

export function totalItens() {
  return linhasCarrinho().reduce((s, l) => s + l.qtd, 0);
}

export function totalCarrinho() {
  return linhasCarrinho().reduce((s, l) => s + l.qtd * l.produto.preco, 0);
}

// ---------- Pedido ----------

export function fecharPedido(identificacao) {
  const pedidos = ler(CHAVES.pedidos, []);
  const numero = (pedidos.at(-1)?.numero ?? 0) + 1;
  const pedido = {
    numero,
    identificacao: identificacao?.trim() || null,
    tema: estado.tema,
    itens: linhasCarrinho().map((l) => ({ nome: l.produto.nome, qtd: l.qtd, preco: l.produto.preco })),
    total: totalCarrinho(),
    em: new Date().toISOString(),
  };
  pedidos.push(pedido);
  gravar(CHAVES.pedidos, pedidos.slice(-50));
  esvaziarCarrinho();
  return pedido;
}

// ---------- Preferências ----------

export function definirTema(tema) {
  estado.tema = tema;
  gravar(CHAVES.tema, tema);
  emitir('tema');
}

export function alternarSom() {
  estado.som = !estado.som;
  gravar(CHAVES.som, estado.som);
  emitir('som');
}

// ---------- Inicialização ----------

export function iniciarLoja(temasValidos) {
  const salvos = ler(CHAVES.produtos, []);
  estado.produtos = Array.isArray(salvos) ? salvos : [];
  // Recalcula o tipo a partir do texto original do JSON, para que ajustes no
  // registro de tipos (novos tipos, sinônimos) valham também para o que já foi importado.
  for (const p of estado.produtos) {
    if (p.tipoOriginal) p.tipo = resolverTipo(p.tipoOriginal) || 'generico';
  }
  const ids = new Set(estado.produtos.map((p) => p.id));
  estado.carrinho = ler(CHAVES.carrinho, []).filter((l) => ids.has(l.id) && l.qtd > 0);

  const doEndereco = new URLSearchParams(location.search).get('tema');
  const salvo = ler(CHAVES.tema, 'bruxo');
  estado.tema = temasValidos.includes(doEndereco) ? doEndereco : temasValidos.includes(salvo) ? salvo : temasValidos[0];
  estado.som = ler(CHAVES.som, true);
}
