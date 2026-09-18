// Utilitários compartilhados pelos desenhos dos temas.

let contador = 0;
/** Id único para gradientes/clipPaths (cada SVG na tela precisa do seu). */
export const uid = (prefixo = 'i') => `${prefixo}${(++contador).toString(36)}`;

/** Clareia (+) ou escurece (-) uma cor hex. fator em [-1, 1]. */
export function tom(hex, fator) {
  const n = parseInt(hex.replace('#', ''), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const ajusta = (c) => Math.round(fator >= 0 ? c + (255 - c) * fator : c * (1 + fator));
  r = ajusta(r); g = ajusta(g); b = ajusta(b);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** Estrela de 4 pontas cintilante em (x, y). */
export function faisca(x, y, tamanho = 5, cor = '#fff6c9', atraso = 0) {
  const s = tamanho;
  const d = `M0 ${-s} L${s * 0.24} ${-s * 0.24} L${s} 0 L${s * 0.24} ${s * 0.24} L0 ${s} L${-s * 0.24} ${s * 0.24} L${-s} 0 L${-s * 0.24} ${-s * 0.24}Z`;
  return `<g transform="translate(${x} ${y})"><path class="fx-cintila" d="${d}" fill="${cor}" style="--atraso:${atraso}s"/></g>`;
}

/** Algumas faíscas espalhadas em volta do ícone. */
export function faiscas(cor = '#fff6c9', pontos = [[16, 22, 5, 0], [84, 30, 4, 0.8], [80, 76, 3.5, 1.6], [20, 64, 3, 2.2]]) {
  return pontos.map(([x, y, s, a]) => faisca(x, y, s, cor, a)).join('');
}

/** Bolhas que sobem dentro de um líquido. */
export function bolhas(qtd, { x0 = 38, x1 = 62, base = 86, sobe = 30, cor = 'rgba(255,255,255,.7)', r = [1.2, 2.6], rapido = false } = {}) {
  const lista = [];
  for (let i = 0; i < qtd; i++) {
    const x = x0 + ((x1 - x0) * ((i * 37) % 100)) / 100;
    const raio = r[0] + ((r[1] - r[0]) * ((i * 53) % 100)) / 100;
    const atraso = ((i * 0.61) % (rapido ? 1.2 : 2.6)).toFixed(2);
    const dur = rapido ? 1.1 + (i % 3) * 0.25 : 2.2 + (i % 4) * 0.4;
    lista.push(
      `<circle class="fx-bolha" cx="${x.toFixed(1)}" cy="${base}" r="${raio.toFixed(1)}" fill="${cor}" style="--atraso:${atraso}s;--dur:${dur}s;--sobe:${sobe}px"/>`
    );
  }
  return lista.join('');
}

/** Aura radial pulsante atrás do ícone. */
export function aura(cor, cx = 50, cy = 60, r = 46, opacidade = 0.55) {
  const id = uid('au');
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${cor}" stop-opacity="${opacidade}"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></radialGradient></defs>
    <circle class="fx-aura" cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
}
