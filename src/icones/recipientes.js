// Recipientes de bebida paramétricos (viewBox 0 0 100 100, fundo em y≈90).
// A "cor" é sempre a do líquido; os temas combinam estes recipientes com seus próprios detalhes.

import { T, vapor } from './base.js';
import { tom, bolhas } from './util.js';

const VIDRO = 'rgba(220,240,255,.3)';
const brilho = (d, largura = 2.6) =>
  `<path d="${d}" stroke="rgba(255,255,255,.6)" stroke-width="${largura}" fill="none" stroke-linecap="round"/>`;

/** Canudo com contorno do tema. */
export const canudo = (x1, y1, x2, y2, cor = '#ff5a6e') => `
  <path d="M${x1} ${y1} L${x2} ${y2}" stroke-width="6" stroke-linecap="round" style="stroke:var(--contorno, #2a1810)"/>
  <path d="M${x1} ${y1} L${x2} ${y2}" stroke="${cor}" stroke-width="3.6" stroke-linecap="round"/>`;

/** Copo alto de vidro, com canudo, gelo e (opcional) chantilly. */
export function copoAlto(cor, { corCanudo = '#ff5a6e', gelo = true, creme = false } = {}) {
  return `
    ${canudo(56, 44, 66, 6, corCanudo)}
    <path d="M28 22 h44 l-5 66 H33z" fill="${VIDRO}"/>
    <path d="M29.4 40 h41.2 l-3.6 48 H33z" fill="${cor}"/>
    <ellipse cx="50" cy="40" rx="20.6" ry="2.4" fill="${tom(cor, 0.35)}"/>
    ${gelo ? `<rect x="36" y="43" width="10" height="10" rx="2" fill="rgba(255,255,255,.45)" transform="rotate(-12 41 48)"/>
              <rect x="50" y="47" width="9" height="9" rx="2" fill="rgba(255,255,255,.4)" transform="rotate(15 54 51)"/>` : ''}
    ${bolhas(4, { x0: 36, x1: 62, base: 86, sobe: 42, cor: tom(cor, 0.6) })}
    ${T('<path d="M28 22 h44 l-5 66 H33z" fill="none"/>')}
    ${creme ? T('<path d="M26 24 q0 -14 14 -14 q4 -8 10 -8 q6 0 10 8 q14 0 14 14z" fill="#fffaf0"/>') + '<circle cx="50" cy="4" r="4" fill="#d7263d"/>' : ''}
    ${brilho('M33 28 l3 54')}`;
}

/** Copo baixo (de dose), com gelo e rodela de limão. */
export function copoBaixo(cor) {
  return `
    <path d="M24 44 h52 l-4 44 H28z" fill="${VIDRO}"/>
    <path d="M25.3 58 h49.4 l-2.7 30 H28z" fill="${cor}"/>
    <ellipse cx="50" cy="58" rx="24.7" ry="2.6" fill="${tom(cor, 0.35)}"/>
    <rect x="32" y="50" width="14" height="14" rx="3" fill="rgba(255,255,255,.5)" transform="rotate(-10 39 57)"/>
    <rect x="50" y="52" width="13" height="13" rx="3" fill="rgba(255,255,255,.42)" transform="rotate(14 56 58)"/>
    ${bolhas(3, { x0: 32, x1: 68, base: 86, sobe: 26, cor: tom(cor, 0.6) })}
    ${T('<path d="M24 44 h52 l-4 44 H28z" fill="none"/>')}
    ${T('<path d="M62 45 a11 11 0 0 1 22 0z" fill="#c8f25a"/>')}
    <path d="M73 45 l-6 -8 M73 45 v-10 M73 45 l6 -8" stroke="#8fbf2a" stroke-width="1.4"/>
    ${brilho('M29 50 l2 32')}`;
}

/** Caneca de vidro com espuma (cerveja). */
export function canecaVidro(cor, { espuma = true } = {}) {
  return `
    ${T(`<path d="M70 40 q18 0 18 18 q0 18 -18 18 v-7 q11 0 11 -11 q0 -11 -11 -11z" fill="${VIDRO}"/>`)}
    <rect x="26" y="26" width="44" height="62" rx="5" fill="${VIDRO}"/>
    <rect x="28.5" y="${espuma ? 36 : 30}" width="39" height="${espuma ? 49.5 : 55.5}" rx="3" fill="${cor}"/>
    ${bolhas(6, { x0: 33, x1: 63, base: 84, sobe: 44, rapido: true, cor: tom(cor, 0.55) })}
    ${T('<rect x="26" y="26" width="44" height="62" rx="5" fill="none"/>')}
    ${espuma ? `${T('<path d="M23 34 q-2 -10 8 -10 q2 -8 12 -6 q6 -8 14 -2 q10 -4 12 6 q9 0 5 12z" fill="#fffaf0"/>')}
      <path class="fx-escorre" d="M30 34 v7 q0 3 3 3 q3 0 3 -3 v-7z" fill="#fffaf0"/>` : ''}
    ${brilho('M32 42 v38')}`;
}

/** Garrafa de vidro com líquido aparente e rótulo. */
export function garrafa(cor, { tampa = 'rolha', rotulo = '#efe0bd', simbolo = '', gas = false, vidro = VIDRO } = {}) {
  const corpo = 'M44 12 h12 v12 q12 6 12 20 v42 q0 4 -4 4 H36 q-4 0 -4 -4 V44 q0 -14 12 -20z';
  const topo =
    tampa === 'rolha'
      ? T('<rect x="43" y="4" width="14" height="10" rx="2" fill="#b98a55"/>')
      : T('<rect x="42" y="7" width="16" height="6" rx="1.5" fill="#c9d1d9"/>') +
        '<path d="M43 13 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2" stroke="#8a929c" stroke-width="1" fill="none"/>';
  return `
    ${gas ? bolhas(4, { x0: 44, x1: 56, base: 8, sobe: 12, rapido: true, cor: tom(cor, 0.5), r: [1.2, 2.2] }) : ''}
    <path d="${corpo}" fill="${vidro}"/>
    <path d="M34.5 48 h31 v37 q0 2.5 -2.5 2.5 h-26 q-2.5 0 -2.5 -2.5z" fill="${cor}"/>
    ${gas ? bolhas(5, { x0: 38, x1: 62, base: 84, sobe: 34, rapido: true, cor: tom(cor, 0.6) }) : ''}
    ${T(`<path d="${corpo}" fill="none"/><rect x="34" y="58" width="32" height="18" rx="2" fill="${rotulo}"/>`)}
    ${simbolo}
    ${topo}
    ${brilho('M38 50 v32')}`;
}

/** Garrafa bojuda com lacre de cera. */
export function garrafaBojuda(cor, { lacre = '#a8322b', simbolo = null } = {}) {
  const corpo = 'M44 10 h12 v20 q20 6 20 30 q0 28 -26 28 q-26 0 -26 -28 q0 -24 20 -30z';
  return `
    <path d="${corpo}" fill="rgba(60,90,70,.35)"/>
    <path d="M27 54 h46 q2 32 -23 33 q-25 -1 -23 -33z" fill="${cor}"/>
    ${T(`<path d="${corpo}" fill="none"/>`)}
    ${T(`<path d="M42 8 h16 v9 q-2 4 -4 0 q-2 5 -4 0 q-2 4 -4 0 q-2 3 -4 -1z" fill="${lacre}"/>`)}
    ${T('<circle cx="50" cy="66" r="10" fill="#efe0bd"/>')}
    ${simbolo ?? '<path d="M45 61 l10 10 M55 61 l-10 10" stroke="#3b2616" stroke-width="2.2" stroke-linecap="round"/>'}
    ${brilho('M31 52 q-2 14 4 24')}`;
}

/** Taça de vinho. */
export function taca(cor) {
  const bojo = 'M30 18 h40 q2 30 -20 38 q-22 -8 -20 -38z';
  return `
    ${T(`<rect x="48" y="55" width="4" height="27" fill="${VIDRO}"/><ellipse cx="50" cy="85" rx="16" ry="4.5" fill="${VIDRO}"/>`)}
    <path d="${bojo}" fill="${VIDRO}"/>
    <path d="M31.4 34 h37.2 q-1.5 17 -18.6 21 q-17.1 -4 -18.6 -21z" fill="${cor}"/>
    <ellipse cx="50" cy="34" rx="18.6" ry="2.2" fill="${tom(cor, 0.35)}"/>
    ${T(`<path d="${bojo}" fill="none"/>`)}
    ${brilho('M35 24 q0 16 8 24')}`;
}

/** Xícara com pires. */
export function xicara(cor, { louca = '#f4efe6', detalhe = '#3aa0ff' } = {}) {
  return `
    ${T(`
      <ellipse cx="50" cy="84" rx="34" ry="7" fill="${louca}"/>
      <path d="M68 52 q14 0 14 12 q0 12 -14 12 v-6 q8 0 8 -6 q0 -6 -8 -6z" fill="${louca}"/>
      <path d="M24 46 h48 q0 34 -24 36 q-24 -2 -24 -36z" fill="${louca}"/>
      <ellipse cx="48" cy="46" rx="24" ry="5" fill="${tom(louca, -0.15)}"/>
    `)}
    <ellipse cx="48" cy="46.5" rx="20.5" ry="3.6" fill="${cor}"/>
    <path d="M26 56 q22 7 44 0" stroke="${detalhe}" stroke-width="2.6" fill="none"/>
    ${brilho('M30 52 q2 14 10 22')}
    ${vapor(48, 36)}`;
}

/** Caneca esmaltada com pintinhas (faroeste). */
export function canecaEsmaltada(cor, { esmalte = '#2f6db5' } = {}) {
  return `
    ${T(`
      <path d="M70 46 q16 0 16 14 q0 16 -16 16 v-7 q9 0 9 -9 q0 -7 -9 -7z" fill="${esmalte}"/>
      <path d="M26 36 h44 v44 q0 8 -8 8 H34 q-8 0 -8 -8z" fill="${esmalte}"/>
      <ellipse cx="48" cy="36" rx="22" ry="4.5" fill="#1d2433"/>
    `)}
    <ellipse cx="48" cy="36.6" rx="19" ry="3.2" fill="${cor}"/>
    <g fill="#fff" opacity=".85"><circle cx="34" cy="50" r="1.3"/><circle cx="46" cy="58" r="1.1"/><circle cx="58" cy="48" r="1.3"/><circle cx="38" cy="70" r="1.2"/><circle cx="62" cy="66" r="1.1"/><circle cx="52" cy="78" r="1.3"/><circle cx="76" cy="58" r="1"/></g>
    <path d="M29 42 q-1 20 2 34" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${vapor(48, 26)}`;
}

/** Caneca de lata (pirata). */
export function canecaLata(cor, { quente = false } = {}) {
  return `
    ${T(`
      <path d="M68 44 q16 0 16 14 q0 16 -16 16 v-7 q9 0 9 -9 q0 -7 -9 -7z" fill="#9aa3ad"/>
      <path d="M28 36 h40 v48 q0 4 -4 4 H32 q-4 0 -4 -4z" fill="#b8bec6"/>
      <ellipse cx="48" cy="36" rx="20" ry="4.2" fill="#7d858f"/>
    `)}
    <ellipse cx="48" cy="36.6" rx="17" ry="3" fill="${cor}"/>
    <path d="M28 46 h40 M28 76 h40" stroke="#8a929c" stroke-width="2"/>
    <g fill="#6b7480"><circle cx="31" cy="49" r="1.2"/><circle cx="65" cy="49" r="1.2"/><circle cx="31" cy="73" r="1.2"/><circle cx="65" cy="73" r="1.2"/></g>
    <path d="M33 52 q-1 12 1 20" stroke="rgba(255,255,255,.55)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M54 58 q4 4 2 9" stroke="#8a929c" stroke-width="1.6" fill="none"/>
    ${quente ? vapor(48, 26) : ''}`;
}

/** Caneca em forma de barril, com espuma (pirata). */
export function canecaBarril(cor) {
  return `
    ${T(`
      <path d="M70 44 q16 0 16 14 q0 16 -16 16 v-7 q9 0 9 -9 q0 -7 -9 -7z" fill="#8a5a2b"/>
      <path d="M28 32 q-5 28 0 56 h40 q5 -28 0 -56z" fill="#9c6a38"/>
    `)}
    <path d="M38 33 q-3 27 0 54 M48 33 v54 M58 33 q3 27 0 54" stroke="#6b4220" stroke-width="1.8" fill="none"/>
    ${T('<path d="M25.5 44 h45 M24.5 76 h47" fill="none"/>')}
    <path d="M25.5 44 h45 M24.5 76 h47" stroke="#3b3f45" stroke-width="4"/>
    ${T('<path d="M22 36 q-2 -10 8 -10 q2 -8 12 -6 q6 -8 14 -2 q10 -4 12 6 q9 0 8 12z" fill="#fffaf0"/>')}
    <ellipse cx="46" cy="30" rx="8" ry="2" fill="${tom(cor, 0.2)}" opacity=".6"/>
    <path class="fx-escorre" d="M30 36 v7 q0 3 3 3 q3 0 3 -3 v-7z" fill="#fffaf0"/>`;
}

/** Cantil (couro ou metal). */
export function cantil(cor, { corpo = '#8a5a2b', costura = '#d9b27a' } = {}) {
  return `
    <path d="M26 44 q-6 -34 24 -36 q30 2 24 36" stroke="#5a3417" stroke-width="4" fill="none"/>
    ${T(`<circle cx="50" cy="60" r="27" fill="${corpo}"/><rect x="45" y="26" width="10" height="9" fill="#9aa3ad"/><rect x="43" y="20" width="14" height="7" rx="2" fill="#6b4220"/>`)}
    <circle cx="50" cy="60" r="22" fill="none" stroke="${costura}" stroke-width="1.6" stroke-dasharray="3 3"/>
    ${T(`<path d="M50 50 q-9 12 -9 17 a9 9 0 0 0 18 0 q0 -5 -9 -17z" fill="${cor}"/>`)}
    <path d="M36 50 q4 -8 12 -10" stroke="rgba(255,255,255,.4)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}

/** Meio coco servido como copo (pirata). */
export function coco(cor, { guardaChuva = false, creme = false } = {}) {
  return `
    ${canudo(58, 48, 70, 12, '#f2c14e')}
    ${guardaChuva ? `<path d="M36 46 L26 14" stroke="#8a5a2b" stroke-width="2"/>
      ${T('<path d="M8 20 q16 -16 36 -8 q-8 2 -12 8 q-6 -4 -12 2 q-6 -6 -12 -2z" fill="#ff5a6e"/>')}
      <path d="M26 14 l-4 10 M26 14 l6 8" stroke="#ffd0d8" stroke-width="1.4"/>` : ''}
    ${T(`<path d="M20 50 q0 38 30 38 q30 0 30 -38z" fill="#7a4a28"/><ellipse cx="50" cy="50" rx="30" ry="7" fill="#f4efe6"/>`)}
    <ellipse cx="50" cy="50.5" rx="25" ry="4.6" fill="${cor}"/>
    ${creme ? T('<path d="M30 50 q0 -12 20 -12 q20 0 20 12z" fill="#fffaf0"/>') : ''}
    <g stroke="#5a3417" stroke-width="1.6" fill="none"><path d="M28 62 q4 6 2 12"/><path d="M40 66 q3 6 1 12"/><path d="M58 66 q-2 7 1 13"/><path d="M70 60 q-3 7 -1 13"/></g>
    ${T('<path d="M68 50 a8 8 0 0 1 16 0z" fill="#ff9a1f"/>')}`;
}

/** Pote de vidro com tampa de rosca (faroeste). */
export function pote(cor, { creme = false } = {}) {
  return `
    ${canudo(58, 40, 68, 6, '#b23a2a')}
    <path d="M30 26 h40 v56 q0 6 -6 6 H36 q-6 0 -6 -6z" fill="${VIDRO}"/>
    <rect x="32.5" y="34" width="35" height="51.5" rx="4" fill="${cor}"/>
    ${bolhas(3, { x0: 38, x1: 62, base: 84, sobe: 44, cor: tom(cor, 0.6) })}
    ${T('<path d="M30 26 h40 v56 q0 6 -6 6 H36 q-6 0 -6 -6z" fill="none"/>')}
    ${creme
      ? T('<path d="M28 28 q0 -14 22 -14 q22 0 22 14z" fill="#fffaf0"/>')
      : T('<rect x="29" y="20" width="42" height="8" rx="2" fill="#c9a24a"/>')}
    <path d="M36 44 v34 M64 44 v34" stroke="rgba(255,255,255,.35)" stroke-width="1.6"/>
    ${brilho('M35 46 v30')}`;
}

/** Bolha de água flutuante (fundo do mar). */
export function bolhaAgua(cor) {
  return `
    <g class="fx-flutua">
      ${T(`<circle cx="50" cy="54" r="32" fill="${tom(cor, -0.05)}" fill-opacity=".75"/>`)}
      <circle cx="50" cy="60" r="24" fill="${tom(cor, 0.3)}" opacity=".5"/>
      <path d="M30 44 q6 -14 22 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
      <circle cx="68" cy="40" r="3.5" fill="#fff" opacity=".7"/>
    </g>`;
}
