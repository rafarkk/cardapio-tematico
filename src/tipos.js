// Registro dos tipos de item. O campo "tipo" do produto aponta para uma destas chaves;
// cada tema usa a chave (e a "forma"/"cor") para escolher o ícone certo.

export const TIPOS = {
  // Bebidas (a "forma" escolhe o recipiente em cada tema; a "cor" pinta o líquido)
  suco_laranja: { grupo: 'bebida', forma: 'suco', cor: '#ff9a1f', nome: 'Suco de laranja' },
  suco_uva: { grupo: 'bebida', forma: 'suco', cor: '#7d2e91', nome: 'Suco de uva' },
  suco_limao: { grupo: 'bebida', forma: 'suco', cor: '#a6e22e', nome: 'Suco de limão / limonada' },
  suco_morango: { grupo: 'bebida', forma: 'suco', cor: '#ff4d6d', nome: 'Suco de morango' },
  suco_maracuja: { grupo: 'bebida', forma: 'suco', cor: '#ffd21f', nome: 'Suco de maracujá' },
  suco_abacaxi: { grupo: 'bebida', forma: 'suco', cor: '#f5d547', nome: 'Suco de abacaxi' },
  suco_melancia: { grupo: 'bebida', forma: 'suco', cor: '#ff5a6e', nome: 'Suco de melancia' },
  suco_manga: { grupo: 'bebida', forma: 'suco', cor: '#ffae2e', nome: 'Suco de manga' },
  suco_detox: { grupo: 'bebida', forma: 'suco', cor: '#6fbf4a', nome: 'Suco verde / detox' },
  refrigerante_cola: { grupo: 'bebida', forma: 'refri', cor: '#5a220e', nome: 'Refrigerante de cola' },
  refrigerante_guarana: { grupo: 'bebida', forma: 'refri', cor: '#e39a1c', nome: 'Guaraná' },
  refrigerante_laranja: { grupo: 'bebida', forma: 'refri', cor: '#ff7b00', nome: 'Refrigerante de laranja' },
  refrigerante_limao: { grupo: 'bebida', forma: 'refri', cor: '#c8f25a', nome: 'Refrigerante de limão' },
  refrigerante_uva: { grupo: 'bebida', forma: 'refri', cor: '#8e3bb0', nome: 'Refrigerante de uva' },
  energetico: { grupo: 'bebida', forma: 'refri', cor: '#b6ff3b', nome: 'Energético' },
  cha_gelado: { grupo: 'bebida', forma: 'suco', cor: '#c9772f', nome: 'Chá gelado / mate' },
  agua: { grupo: 'bebida', forma: 'agua', cor: '#9fdcff', nome: 'Água' },
  agua_gas: { grupo: 'bebida', forma: 'agua', cor: '#c4ecff', nome: 'Água com gás', gas: true },
  agua_coco: { grupo: 'bebida', forma: 'agua', cor: '#e6f4d8', nome: 'Água de coco' },
  cerveja: { grupo: 'bebida', forma: 'cerveja', cor: '#f0a82a', nome: 'Cerveja / chope' },
  cerveja_escura: { grupo: 'bebida', forma: 'cerveja', cor: '#5a2a10', nome: 'Cerveja escura' },
  vinho: { grupo: 'bebida', forma: 'vinho', cor: '#8a1034', nome: 'Vinho tinto' },
  vinho_branco: { grupo: 'bebida', forma: 'vinho', cor: '#f0dc82', nome: 'Vinho branco / espumante' },
  drink: { grupo: 'bebida', forma: 'drink', cor: '#b8f0dc', nome: 'Drink / coquetel' },
  caipirinha: { grupo: 'bebida', forma: 'drink', cor: '#c8f25a', nome: 'Caipirinha' },
  cafe: { grupo: 'bebida', forma: 'quente', cor: '#4a2a18', nome: 'Café' },
  cappuccino: { grupo: 'bebida', forma: 'quente', cor: '#b07a4a', nome: 'Cappuccino / latte' },
  cha: { grupo: 'bebida', forma: 'quente', cor: '#b5652b', nome: 'Chá quente' },
  chocolate_quente: { grupo: 'bebida', forma: 'quente', cor: '#6b3b1f', nome: 'Chocolate quente' },
  milkshake: { grupo: 'bebida', forma: 'shake', cor: '#f6a8c8', nome: 'Milkshake' },
  smoothie: { grupo: 'bebida', forma: 'shake', cor: '#e0457b', nome: 'Smoothie' },
  vitamina: { grupo: 'bebida', forma: 'shake', cor: '#f3c27a', nome: 'Vitamina' },

  // Comidas
  hamburguer: { grupo: 'comida', nome: 'Hambúrguer / X' },
  hotdog: { grupo: 'comida', nome: 'Cachorro-quente' },
  pizza: { grupo: 'comida', nome: 'Pizza' },
  batata_frita: { grupo: 'comida', nome: 'Batata frita' },
  frango: { grupo: 'comida', nome: 'Frango' },
  carne: { grupo: 'comida', nome: 'Carne / bife' },
  peixe: { grupo: 'comida', nome: 'Peixe' },
  camarao: { grupo: 'comida', nome: 'Camarão / frutos do mar' },
  salada: { grupo: 'comida', nome: 'Salada' },
  sopa: { grupo: 'comida', nome: 'Sopa / caldo' },
  massa: { grupo: 'comida', nome: 'Massa' },
  lasanha: { grupo: 'comida', nome: 'Lasanha / gratinado' },
  prato_feito: { grupo: 'comida', nome: 'Prato feito / executivo' },
  sanduiche: { grupo: 'comida', nome: 'Sanduíche' },
  wrap: { grupo: 'comida', nome: 'Wrap / burrito' },
  porcao: { grupo: 'comida', nome: 'Porção / petisco' },
  pastel: { grupo: 'comida', nome: 'Pastel / empanada' },
  coxinha: { grupo: 'comida', nome: 'Coxinha / salgado' },
  pao_de_queijo: { grupo: 'comida', nome: 'Pão de queijo' },
  sushi: { grupo: 'comida', nome: 'Sushi / combinado' },
  temaki: { grupo: 'comida', nome: 'Temaki' },
  espetinho: { grupo: 'comida', nome: 'Espetinho' },
  croissant: { grupo: 'comida', nome: 'Croissant / padaria' },

  // Sobremesas
  bolo: { grupo: 'sobremesa', nome: 'Bolo' },
  cupcake: { grupo: 'sobremesa', nome: 'Cupcake / muffin' },
  sorvete: { grupo: 'sobremesa', nome: 'Sorvete' },
  picole: { grupo: 'sobremesa', nome: 'Picolé' },
  pudim: { grupo: 'sobremesa', nome: 'Pudim' },
  mousse: { grupo: 'sobremesa', nome: 'Mousse / taça' },
  torta: { grupo: 'sobremesa', nome: 'Torta doce' },
  cookie: { grupo: 'sobremesa', nome: 'Cookie / biscoito' },
  chocolate: { grupo: 'sobremesa', nome: 'Chocolate / brownie' },
  brigadeiro: { grupo: 'sobremesa', nome: 'Brigadeiro / docinho' },
  churros: { grupo: 'sobremesa', nome: 'Churros' },
  waffle: { grupo: 'sobremesa', nome: 'Waffle / panqueca' },
  acai: { grupo: 'sobremesa', nome: 'Açaí' },
  donut: { grupo: 'sobremesa', nome: 'Donut / rosquinha' },
  fruta: { grupo: 'sobremesa', nome: 'Frutas' },

  generico: { grupo: 'comida', nome: 'Genérico' },
};

// Apelidos aceitos na importação, para facilitar a vida de quem escreve o JSON.
const SINONIMOS = {
  suco: 'suco_laranja',
  limonada: 'suco_limao',
  suco_verde: 'suco_detox',
  detox: 'suco_detox',
  refrigerante: 'refrigerante_cola',
  refri: 'refrigerante_cola',
  coca: 'refrigerante_cola',
  guarana: 'refrigerante_guarana',
  energy: 'energetico',
  mate: 'cha_gelado',
  agua_com_gas: 'agua_gas',
  agua_de_coco: 'agua_coco',
  chope: 'cerveja',
  chopp: 'cerveja',
  cerveja_preta: 'cerveja_escura',
  stout: 'cerveja_escura',
  vinho_tinto: 'vinho',
  espumante: 'vinho_branco',
  coquetel: 'drink',
  caipira: 'caipirinha',
  capuccino: 'cappuccino',
  latte: 'cappuccino',
  lanche: 'hamburguer',
  burger: 'hamburguer',
  hamburger: 'hamburguer',
  x_salada: 'hamburguer',
  x_burguer: 'hamburguer',
  cachorro_quente: 'hotdog',
  hot_dog: 'hotdog',
  batata: 'batata_frita',
  fritas: 'batata_frita',
  bife: 'carne',
  churrasco: 'carne',
  frutos_do_mar: 'camarao',
  sanduiche_natural: 'sanduiche',
  misto: 'sanduiche',
  burrito: 'wrap',
  macarrao: 'massa',
  espaguete: 'massa',
  gratinado: 'lasanha',
  pf: 'prato_feito',
  executivo: 'prato_feito',
  prato_executivo: 'prato_feito',
  marmita: 'prato_feito',
  caldo: 'sopa',
  petisco: 'porcao',
  empanada: 'pastel',
  salgado: 'coxinha',
  paodequeijo: 'pao_de_queijo',
  japones: 'sushi',
  espeto: 'espetinho',
  churrasquinho: 'espetinho',
  padaria: 'croissant',
  muffin: 'cupcake',
  paleta: 'picole',
  brownie: 'chocolate',
  docinho: 'brigadeiro',
  churro: 'churros',
  panqueca: 'waffle',
  biscoito: 'cookie',
  sorvete_casquinha: 'sorvete',
  rosquinha: 'donut',
  frutas: 'fruta',
  salada_de_frutas: 'fruta',
};

export function normalizarChave(valor) {
  return String(valor ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/** Resolve o texto informado para uma chave de TIPOS (ou null se desconhecido). */
export function resolverTipo(valor) {
  const chave = normalizarChave(valor);
  // "suco_de_laranja" também vale como "suco_laranja".
  for (const c of [chave, chave.replace(/_(de|da|do|com)_/g, '_')]) {
    if (TIPOS[c]) return c;
    if (SINONIMOS[c]) return SINONIMOS[c];
  }
  return null;
}

export function infoTipo(chave) {
  return TIPOS[chave] || TIPOS.generico;
}
