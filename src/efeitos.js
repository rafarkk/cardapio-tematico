// Partículas de ambiente (canvas), explosões pontuais e o voo dos itens pela tela.

export const movimentoReduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const aleatorio = (a, b) => a + Math.random() * (b - a);
const escolher = (lista) => lista[Math.floor(Math.random() * lista.length)];

export function criarParticulas(canvas) {
  const ctx = canvas.getContext('2d');
  let largura = 0, altura = 0, dpr = 1;
  let config = null;
  let ambiente = [];
  const explosoes = [];

  function redimensionar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = window.innerWidth;
    altura = window.innerHeight;
    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function nova(inicio) {
    const c = config;
    const o = c.origem;
    // "baixo": nasce embaixo e sobe; "esquerda": atravessa a tela da esquerda para a direita;
    // sem origem: espalhada pela tela e, ao sair, renasce embaixo.
    return {
      x: o === 'esquerda' && !inicio ? -10 : aleatorio(0, largura),
      y: o === 'esquerda' ? aleatorio(0, altura) : inicio ? aleatorio(0, altura) : altura + 10,
      vx: aleatorio(...c.vx),
      vy: aleatorio(...c.vy),
      tam: aleatorio(...c.tam),
      cor: escolher(c.cores),
      fase: Math.random() * Math.PI * 2,
      vida: 1,
      decai: o === 'baixo' && c.forma === 'brasa' ? aleatorio(0.0015, 0.004) : 0,
    };
  }

  function definir(novaConfig) {
    config = novaConfig;
    const qtd = movimentoReduzido() ? Math.round(novaConfig.qtd / 4) : novaConfig.qtd;
    ambiente = Array.from({ length: qtd }, () => nova(true));
  }

  /** Explosão de partículas em (x, y) — usada quando algo cai no receptáculo. */
  function explodir(x, y, { cores = ['#fff'], qtd = 26, forca = 5, gravidade = 0.12, subir = false, tam = [1.5, 4] } = {}) {
    if (movimentoReduzido()) qtd = Math.round(qtd / 3);
    for (let i = 0; i < qtd; i++) {
      const ang = subir ? aleatorio(-Math.PI * 0.9, -Math.PI * 0.1) : aleatorio(0, Math.PI * 2);
      const v = aleatorio(forca * 0.3, forca);
      explosoes.push({
        x, y,
        vx: Math.cos(ang) * v,
        vy: Math.sin(ang) * v,
        tam: aleatorio(...tam),
        cor: escolher(cores),
        vida: 1,
        decai: aleatorio(0.012, 0.025),
        gravidade,
      });
    }
  }

  function desenharPonto(p, alfa) {
    ctx.globalAlpha = alfa;
    ctx.fillStyle = p.cor;
    if (config.forma === 'traco') {
      ctx.fillRect(p.x, p.y, 1.2, p.tam * 6);
    } else if (config.forma === 'bolha') {
      ctx.strokeStyle = p.cor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.tam, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.tam, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let t = 0;
  function quadro() {
    t += 1;
    ctx.clearRect(0, 0, largura, altura);
    if (config) {
      ctx.shadowBlur = 8;
      for (let i = 0; i < ambiente.length; i++) {
        const p = ambiente[i];
        p.x += p.vx + (config.forma === 'brasa' || config.forma === 'bolha' ? Math.sin(t * 0.02 + p.fase) * 0.3 : 0);
        p.y += p.vy;
        p.vida -= p.decai;
        if (p.y < -20 || p.y > altura + 30 || p.vida <= 0 || p.x < -20 || p.x > largura + 20) {
          ambiente[i] = nova(false);
          continue;
        }
        const brilho = config.cintila ? 0.35 + 0.65 * Math.abs(Math.sin(t * 0.03 + p.fase)) : 1;
        ctx.shadowColor = p.cor;
        desenharPonto(p, Math.max(0, brilho * p.vida * 0.9));
      }
    }
    for (let i = explosoes.length - 1; i >= 0; i--) {
      const p = explosoes[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravidade;
      p.vx *= 0.98;
      p.vida -= p.decai;
      if (p.vida <= 0) { explosoes.splice(i, 1); continue; }
      ctx.shadowColor = p.cor;
      ctx.globalAlpha = p.vida;
      ctx.fillStyle = p.cor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.tam * (0.5 + p.vida / 2), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(quadro);
  }

  redimensionar();
  window.addEventListener('resize', redimensionar);
  requestAnimationFrame(quadro);
  return { definir, explodir };
}

/**
 * Faz um clone do ícone voar de um retângulo para outro, em arco.
 * Resolve com o elemento voador (quem chamou decide quando removê-lo).
 */
export function voar(html, de, para, { arco = 0, duracao = 650, girar = 0, opacidadeFinal = 1, easing = 'cubic-bezier(.45,0,.25,1)', atras = false } = {}) {
  const el = document.createElement('div');
  el.className = atras ? 'voador atras' : 'voador';
  el.innerHTML = html;
  Object.assign(el.style, { left: `${de.left}px`, top: `${de.top}px`, width: `${de.width}px`, height: `${de.height}px` });
  document.body.appendChild(el);

  const dx = para.left + para.width / 2 - (de.left + de.width / 2);
  const dy = para.top + para.height / 2 - (de.top + de.height / 2);
  const escala = para.width / de.width;
  const cx = dx / 2;
  const cy = Math.min(0, dy) / 2 - arco;

  const passos = 18;
  const quadros = [];
  for (let i = 0; i <= passos; i++) {
    const t = i / passos;
    const u = 1 - t;
    const x = 2 * u * t * cx + t * t * dx;
    const y = 2 * u * t * cy + t * t * dy;
    const s = 1 + (escala - 1) * t;
    const o = t < 0.75 ? 1 : 1 + (opacidadeFinal - 1) * ((t - 0.75) / 0.25);
    quadros.push({ transform: `translate(${x}px, ${y}px) scale(${s}) rotate(${girar * t}deg)`, opacity: o });
  }
  const anim = el.animate(quadros, {
    duration: movimentoReduzido() ? Math.min(duracao, 200) : duracao,
    easing,
    fill: 'forwards',
  });
  return anim.finished.then(() => el);
}

/** Reinicia uma animação CSS baseada em classe. */
export function pulsarClasse(el, classe, duracao = 700) {
  el.classList.remove(classe);
  void el.offsetWidth;
  el.classList.add(classe);
  clearTimeout(el[`_t_${classe}`]);
  el[`_t_${classe}`] = setTimeout(() => el.classList.remove(classe), duracao);
}
