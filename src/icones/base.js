// Ícones base (viewBox 0 0 100 100, "chão" em y≈90). Estilo cartum com contorno.
// Os temas reaproveitam estes desenhos e aplicam molduras/efeitos por cima.
// Tudo dentro de <g class="traco"> recebe o contorno definido pelo tema (CSS).

import { uid } from './util.js';

export const T = (conteudo) => `<g class="traco">${conteudo}</g>`;

/** Três fios de vapor animados, partindo de (x, y) para cima. */
export function vapor(x, y, cor = 'rgba(255,255,255,.75)') {
  return `<g class="fx-vapor" fill="none" stroke="${cor}" stroke-width="2.6" stroke-linecap="round">
    <path d="M${x - 9} ${y} q-4 -6 0 -12 q4 -6 0 -12" style="--atraso:0s"/>
    <path d="M${x} ${y - 3} q-4 -6 0 -12 q4 -6 0 -12" style="--atraso:.7s"/>
    <path d="M${x + 9} ${y} q-4 -6 0 -12 q4 -6 0 -12" style="--atraso:1.4s"/>
  </g>`;
}

/** Contorno circular ondulado (para coberturas, glacês, etc.). */
export function circuloOndulado(cx, cy, r, ondas, amp, fase = 0) {
  const pts = [];
  const passos = ondas * 8;
  for (let i = 0; i <= passos; i++) {
    const a = (i / passos) * Math.PI * 2;
    const rr = r + amp * Math.sin(a * ondas + fase);
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')}Z`;
}

const prato = (cy = 76) =>
  T(`<ellipse cx="50" cy="${cy}" rx="45" ry="14" fill="#eef1f4"/>`) +
  `<ellipse cx="50" cy="${cy - 1}" rx="35" ry="9" fill="#dde2e8"/>`;

export const BASE = {
  hamburguer: () => `
    ${T(`
      <path d="M14 72 h72 q4 0 3 5 q-3 11 -15 11 H26 q-12 0 -15 -11 q-1 -5 3 -5z" fill="#e3a052"/>
      <rect x="11" y="60" width="78" height="13" rx="6.5" fill="#6b3a1f"/>
      <path d="M13 58 h74 l-5 9 l-7 -5 l-8 8 l-9 -7 l-9 8 l-9 -8 l-9 7 l-8 -7 l-7 5z" fill="#ffc933"/>
      <path d="M10 56 q5 -7 11 -1 q5 -7 11 -1 q5 -7 11 -1 q6 -7 11 -1 q6 -7 11 -1 q6 -7 11 -1 q5 -6 9 1 l-1 4 H11z" fill="#72c04b"/>
      <rect x="15" y="48" width="70" height="7" rx="3.5" fill="#e8412c"/>
      <path d="M11 50 q0 -34 39 -34 q39 0 39 34 q0 3 -3 3 H14 q-3 0 -3 -3z" fill="#f0b25e"/>
    `)}
    <path d="M22 38 q5 -13 20 -16" stroke="#ffd79a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g fill="#fff3d6">
      <ellipse cx="38" cy="28" rx="3" ry="1.6" transform="rotate(-20 38 28)"/>
      <ellipse cx="52" cy="24" rx="3" ry="1.6" transform="rotate(10 52 24)"/>
      <ellipse cx="64" cy="31" rx="3" ry="1.6" transform="rotate(25 64 31)"/>
      <ellipse cx="46" cy="36" rx="3" ry="1.6" transform="rotate(-5 46 36)"/>
      <ellipse cx="72" cy="40" rx="3" ry="1.6" transform="rotate(30 72 40)"/>
    </g>`,

  hotdog: () => `
    ${T(`
      <path d="M8 60 q42 -22 84 0 v4 H8z" fill="#c98238"/>
      <rect x="4" y="50" width="92" height="17" rx="8.5" fill="#b8432a"/>
      <path d="M8 62 q42 32 84 0 q3 8 -2 14 q-40 22 -80 0 q-5 -6 -2 -14z" fill="#eeb05c"/>
    `)}
    <path d="M14 54 h56" stroke="#e57a5c" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M12 58 q5 -6 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#ffd23f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,

  pizza: () => `
    ${T(`<ellipse cx="50" cy="70" rx="44" ry="20" fill="#d9913f"/><ellipse cx="50" cy="68" rx="37" ry="15.5" fill="#e0482c"/>`)}
    <path d="M18 67 q8 -10 20 -8 q10 -6 22 -2 q14 -2 22 8 q-4 10 -18 12 q-16 4 -30 0 q-14 -3 -16 -10z" fill="#ffd66b"/>
    <g fill="#b3261e"><ellipse cx="34" cy="65" rx="5.5" ry="3.2"/><ellipse cx="57" cy="60" rx="5.5" ry="3.2"/><ellipse cx="67" cy="72" rx="5.5" ry="3.2"/><ellipse cx="42" cy="75" rx="5.5" ry="3.2"/></g>
    <g fill="#3f9b3a"><ellipse cx="49" cy="67" rx="4" ry="2" transform="rotate(-25 49 67)"/><ellipse cx="74" cy="63" rx="4" ry="2" transform="rotate(20 74 63)"/><ellipse cx="27" cy="72" rx="4" ry="2" transform="rotate(10 27 72)"/></g>
    <path d="M50 68 L50 53 M50 68 L16 74 M50 68 L84 76" stroke="rgba(110,35,10,.35)" stroke-width="1.5"/>
    ${vapor(50, 46)}`,

  batata_frita: () => `
    ${T(`
      <rect x="27" y="22" width="8" height="40" rx="2" fill="#ffd257" transform="rotate(-14 31 42)"/>
      <rect x="43" y="26" width="8" height="36" rx="2" fill="#f5c542" transform="rotate(-20 47 44)"/>
      <rect x="37" y="15" width="8" height="45" rx="2" fill="#ffd257" transform="rotate(-5 41 38)"/>
      <rect x="48" y="12" width="8" height="48" rx="2" fill="#ffdb6e" transform="rotate(3 52 36)"/>
      <rect x="57" y="18" width="8" height="42" rx="2" fill="#ffd257" transform="rotate(10 61 39)"/>
      <rect x="65" y="26" width="8" height="36" rx="2" fill="#f5c542" transform="rotate(18 69 44)"/>
      <path d="M20 46 q30 10 60 0 l-7 44 H27z" fill="#d62828"/>
    `)}
    <path d="M30 57 l4 27" stroke="#ff6b5b" stroke-width="3" stroke-linecap="round"/>
    <path d="M42 70 q8 -9 16 0" stroke="#ffd257" stroke-width="4" fill="none" stroke-linecap="round"/>`,

  frango: () => `
    ${T(`
      <path d="M54 58 l22 22 l-6 6 l-22 -22z" fill="#f4ead2"/>
      <circle cx="80" cy="80" r="6.5" fill="#f4ead2"/>
      <circle cx="73" cy="88" r="6.5" fill="#f4ead2"/>
      <path d="M24 22 c16 -10 40 -4 44 16 c3 14 -4 24 -12 28 c-8 5 -18 4 -26 0 c-12 -6 -18 -18 -16 -28 c1 -7 4 -12 10 -16z" fill="#c9702e"/>
    `)}
    <path d="M28 31 q10 -9 23 -5" stroke="#eba868" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g fill="#9c4f1c"><circle cx="40" cy="44" r="2"/><circle cx="52" cy="38" r="1.6"/><circle cx="32" cy="52" r="1.8"/><circle cx="56" cy="52" r="2"/><circle cx="46" cy="58" r="1.6"/></g>`,

  carne: () => `
    ${prato(76)}
    ${T(`<path d="M20 68 c-2 -12 12 -21 31 -21 c18 0 31 6 29 17 c-1 8 -12 12 -31 12 c-16 0 -28 -2 -29 -8z" fill="#8c3b1c"/>`)}
    <path d="M23 63 c2 -9 14 -14 28 -14" stroke="#f0d9b5" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <g stroke="#4a1a08" stroke-width="3" stroke-linecap="round"><path d="M33 57 l9 12"/><path d="M46 53 l11 14"/><path d="M60 53 l9 12"/></g>
    <path d="M70 76 q8 -6 16 -4" stroke="#3f7d2c" stroke-width="2.2" fill="none"/>
    <g fill="#5aa83e"><ellipse cx="74" cy="72" rx="3" ry="1.2" transform="rotate(-30 74 72)"/><ellipse cx="80" cy="71" rx="3" ry="1.2" transform="rotate(20 80 71)"/></g>
    ${vapor(50, 42)}`,

  peixe: () => `
    ${prato(78)}
    ${T(`<path d="M16 66 q20 -24 50 -9 l15 -11 v27 l-15 -10 q-30 14 -50 3z" fill="#f08a5d"/>`)}
    <path d="M24 62 q16 -10 36 -4" stroke="#ffc2a1" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="26" cy="61" r="2.6" fill="#2a1810"/>
    <g stroke="#9b4a26" stroke-width="2.5" stroke-linecap="round"><path d="M38 56 l5 14"/><path d="M48 55 l5 14"/><path d="M58 57 l4 11"/></g>
    ${T(`<path d="M66 80 a9 9 0 0 1 18 0z" fill="#ffe14d"/>`)}`,

  salada: () => `
    ${T(`<path d="M20 56 q-3 -18 13 -21 q2 -11 15 -9 q10 -10 21 2 q15 0 13 17 q6 4 4 11z" fill="#6fbf4a"/>`)}
    <path d="M30 46 q8 -8 18 -6 M52 38 q8 2 12 10" stroke="#9adb6e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${T(`<circle cx="36" cy="49" r="5.5" fill="#e8412c"/><circle cx="62" cy="45" r="5.5" fill="#e8412c"/>`)}
    <g fill="#f3d27a"><rect x="46" y="48" width="6" height="6" rx="1.5" transform="rotate(15 49 51)"/><rect x="70" y="52" width="6" height="6" rx="1.5"/></g>
    ${T(`<path d="M12 56 h76 q-2 31 -38 33 q-36 -2 -38 -33z" fill="#e9eef2"/>`)}
    <path d="M18 65 q32 8 64 0" stroke="#5fa8d3" stroke-width="3" fill="none"/>`,

  sopa: () => `
    ${T(`<path d="M12 54 h76 q-2 32 -38 34 q-36 -2 -38 -34z" fill="#9c5a33"/><ellipse cx="50" cy="54" rx="38" ry="8" fill="#f29a2e"/>`)}
    <path d="M38 54 q12 -5 24 0" stroke="#fff1cf" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g fill="#3f9b3a"><circle cx="30" cy="54" r="1.6"/><circle cx="66" cy="52" r="1.6"/><circle cx="56" cy="57" r="1.4"/></g>
    <path d="M22 66 q28 12 56 0" stroke="#b97446" stroke-width="3" fill="none"/>
    ${vapor(50, 40)}`,

  massa: () => `
    ${prato(78)}
    ${T(`<path d="M20 72 q0 -26 30 -28 q30 2 30 28z" fill="#f5cf6a"/>`)}
    <g stroke="#d9a93a" stroke-width="2" fill="none"><path d="M26 66 q10 -14 22 -6 q10 6 20 -6"/><path d="M28 72 q14 -8 26 0 q10 6 20 -4"/><path d="M36 54 q10 8 26 -2"/></g>
    <path d="M32 52 q18 -13 36 0 q-6 9 -18 8 q-12 1 -18 -8z" fill="#d33b22"/>
    ${T(`<circle cx="42" cy="52" r="6.5" fill="#7a3b1c"/><circle cx="59" cy="49" r="6.5" fill="#7a3b1c"/>`)}
    <g fill="#fffaf0"><circle cx="50" cy="45" r="1.4"/><circle cx="46" cy="42" r="1.2"/><circle cx="55" cy="43" r="1.2"/></g>
    ${vapor(50, 34)}`,

  sanduiche: () => `
    <path d="M50 12 v26" stroke="#c9a46a" stroke-width="2.5" stroke-linecap="round"/>
    ${T(`
      <rect x="10" y="66" width="80" height="18" rx="7" fill="#e9c27f"/>
      <path d="M12 66 h76 l-4 7 l-7 -5 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-7 -5z" fill="#ffc933"/>
      <path d="M10 62 q40 -8 80 0 v6 q-40 6 -80 0z" fill="#f29aa0"/>
      <path d="M9 58 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q5 -6 10 0 q2 4 -1 6 H10z" fill="#72c04b"/>
      <rect x="10" y="34" width="80" height="24" rx="9" fill="#e9c27f"/>
      <circle cx="50" cy="14" r="5" fill="#4d8f2e"/>
    `)}
    <rect x="16" y="39" width="68" height="14" rx="6" fill="#f7deb0"/>
    <g stroke="#b9853f" stroke-width="2.5" stroke-linecap="round"><path d="M26 42 l6 8"/><path d="M42 42 l6 8"/><path d="M58 42 l6 8"/></g>`,

  porcao: () => `
    ${T(`
      <ellipse cx="32" cy="52" rx="11" ry="8" fill="#e0a040" transform="rotate(-15 32 52)"/>
      <ellipse cx="68" cy="52" rx="11" ry="8" fill="#e0a040" transform="rotate(15 68 52)"/>
      <ellipse cx="50" cy="46" rx="12" ry="8.5" fill="#eab04e"/>
      <ellipse cx="42" cy="38" rx="10" ry="7" fill="#e0a040" transform="rotate(-25 42 38)"/>
      <ellipse cx="60" cy="38" rx="10" ry="7" fill="#eab04e" transform="rotate(20 60 38)"/>
      <path d="M14 58 h72 l-8 30 H22z" fill="#c98a45"/>
    `)}
    <path d="M14 58 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5z" fill="#fff" stroke="#e05a4a" stroke-width="1.2"/>
    <g stroke="#9c6630" stroke-width="2"><path d="M20 68 h60"/><path d="M22 78 h56"/><path d="M34 60 l-3 26"/><path d="M50 60 v26"/><path d="M66 60 l3 26"/></g>
    <g fill="#c7862e"><circle cx="48" cy="44" r="1.4"/><circle cx="36" cy="50" r="1.3"/><circle cx="64" cy="37" r="1.3"/></g>`,

  pastel: () => {
    const marcas = [];
    for (let i = 1; i < 12; i++) {
      const a = Math.PI + (i / 12) * Math.PI;
      const x1 = 50 + 38 * Math.cos(a), y1 = 80 + 40 * Math.sin(a);
      const x2 = 50 + 32 * Math.cos(a), y2 = 80 + 34 * Math.sin(a);
      marcas.push(`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`);
    }
    return `
      ${T(`<path d="M10 80 q0 -44 40 -44 q40 0 40 44z" fill="#f0c15e"/>`)}
      <g stroke="#c98e2e" stroke-width="2.4" stroke-linecap="round">${marcas.join('')}</g>
      <g fill="#f8dc95"><circle cx="40" cy="62" r="3"/><circle cx="58" cy="58" r="2.2"/><circle cx="50" cy="70" r="2.6"/><circle cx="66" cy="68" r="1.8"/></g>
      ${vapor(50, 30)}`;
  },

  bolo: () => `
    ${T(`
      <path d="M56 62 L86 46 L86 72 L56 88z" fill="#4f2914"/>
      <path d="M18 50 L56 62 L56 88 L18 76z" fill="#6b3b1f"/>
      <path d="M18 50 L50 36 L86 46 L56 62z" fill="#3e1d0c"/>
    `)}
    <g stroke="#f3e1c7" stroke-width="3.2"><path d="M19 59 L55 71"/><path d="M19 67.5 L55 79.5"/></g>
    <path d="M18 50 L56 62 l0 5 q-3 5 -6 0 q-3 7 -7 -1 q-4 5 -7 -2 q-3 6 -7 -2 q-4 4 -6 -3 q-3 4 -5 -2z" fill="#3e1d0c"/>
    <path d="M30 46 L52 40" stroke="#7a4a2c" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M54 38 q2 -8 8 -12" stroke="#3f7d2c" stroke-width="2" fill="none"/>
    ${T(`<circle cx="53" cy="42" r="6" fill="#d7263d"/>`)}
    <circle cx="51" cy="40" r="1.8" fill="#ff8a99"/>`,

  sorvete: () => `
    ${T(`<path d="M32 52 L50 94 L68 52z" fill="#e6a857"/>`)}
    <g stroke="#b97a33" stroke-width="1.6"><path d="M36 58 l20 24"/><path d="M44 54 l18 22"/><path d="M58 56 l-16 26"/><path d="M66 56 l-14 22"/></g>
    ${T(`
      <path d="M28 55 q-4 -21 22 -23 q26 2 22 23 q-4 4 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-4 4 -8 0z" fill="#ff9ec4"/>
      <circle cx="50" cy="25" r="14.5" fill="#fff1c9"/>
    `)}
    <path d="M42 20 q4 -6 10 -6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke-width="2.4" stroke-linecap="round"><path d="M44 30 l3 -2" stroke="#e8412c"/><path d="M55 27 l2 3" stroke="#3aa0ff"/><path d="M50 34 l3 0" stroke="#5fbf4a"/><path d="M38 44 l2 2" stroke="#ffd23f"/><path d="M60 42 l-2 3" stroke="#fff"/></g>`,

  pudim: () => `
    ${prato(84)}
    ${T(`<path d="M24 82 L30 44 q20 -8 40 0 L76 82 q-26 8 -52 0z" fill="#f2c46b"/>`)}
    <path d="M30 44 q20 -8 40 0 q0 4 -1 10 q-3 -4 -5 3 q-2 -7 -5 1 q-3 -6 -6 2 q-2 -7 -5 0 q-3 -6 -6 1 q-3 -6 -5 2 q-3 -9 -7 -9z" fill="#a4561b"/>
    <ellipse cx="50" cy="44" rx="20" ry="4.5" fill="#7e3e10"/>
    <path d="M34 60 l-2 16" stroke="#fbe0a4" stroke-width="3" stroke-linecap="round"/>`,

  torta: () => {
    const bordas = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      bordas.push(`<circle cx="${(50 + 37 * Math.cos(a)).toFixed(1)}" cy="${(62 + 12.5 * Math.sin(a)).toFixed(1)}" r="3.6"/>`);
    }
    // Treliça de massa por cima do recheio (sem sabor específico).
    const tiras = [];
    for (const x of [34, 50, 66]) {
      const dy = 10 * Math.sqrt(1 - ((x - 50) / 33) ** 2);
      tiras.push(`<path d="M${x} ${(62 - dy).toFixed(1)} L${x} ${(62 + dy).toFixed(1)}"/>`);
    }
    for (const y of [57, 62, 67]) {
      const dx = 33 * Math.sqrt(1 - ((y - 62) / 10) ** 2);
      tiras.push(`<path d="M${(50 - dx).toFixed(1)} ${y} L${(50 + dx).toFixed(1)} ${y}"/>`);
    }
    return `
      ${T(`<path d="M9 64 h82 l-6 16 q-35 9 -70 0z" fill="#c9d1d9"/><ellipse cx="50" cy="62" rx="41" ry="14.5" fill="#e3a75a"/>`)}
      <ellipse cx="50" cy="62" rx="33" ry="10" fill="#9c2a3a"/>
      <g stroke="#f0c07e" stroke-width="4.5" stroke-linecap="round">${tiras.join('')}</g>
      <g fill="#f0bd78">${bordas.join('')}</g>
      <path d="M22 66 q8 5 18 5" stroke="#fff3d6" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  },

  cookie: () => `
    ${T(`<path d="M80.1 45.1 A32 32 0 1 1 66 28.3 A6 6 0 0 0 72 38 A6 6 0 0 0 80.1 45.1z" fill="#d9a05b"/>`)}
    <g fill="#4a2412"><ellipse cx="38" cy="46" rx="4" ry="3"/><ellipse cx="56" cy="58" rx="4.5" ry="3.2"/><ellipse cx="36" cy="68" rx="3.5" ry="3"/><ellipse cx="62" cy="76" rx="4" ry="3"/><ellipse cx="48" cy="80" rx="3" ry="2.4"/><ellipse cx="68" cy="56" rx="3" ry="2.6"/><ellipse cx="50" cy="38" rx="3" ry="2.4"/></g>
    <path d="M28 44 q6 -12 18 -16" stroke="#efc485" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g fill="#d9a05b"><circle cx="84" cy="36" r="2"/><circle cx="80" cy="28" r="1.4"/></g>`,

  chocolate: () => `
    ${T(`
      <path d="M68 66 L82 56 L82 76 L68 86z" fill="#3c1c0b"/>
      <path d="M18 66 H68 V86 H18z" fill="#5a2e17"/>
      <path d="M18 66 L32 56 H82 L68 66z" fill="#6f3a1d"/>
      <path d="M72 44 L84 36 L84 54 L72 62z" fill="#3c1c0b"/>
      <path d="M26 44 H72 V62 H26z" fill="#5a2e17"/>
      <path d="M26 44 L38 36 H84 L72 44z" fill="#6f3a1d"/>
    `)}
    <g fill="#c9965a"><path d="M44 39 l5 -2 l3 3 l-5 2z"/><path d="M60 38 l5 -1 l2 3 l-5 1z"/><path d="M34 60 l4 -2 l3 3 l-4 1z"/></g>
    <g fill="#f5eee6" opacity=".8"><circle cx="50" cy="40" r=".9"/><circle cx="56" cy="41" r=".8"/><circle cx="68" cy="39" r=".9"/><circle cx="42" cy="42" r=".7"/></g>
    <path d="M22 70 v12" stroke="#7b4424" stroke-width="2.5" stroke-linecap="round"/>`,

  acai: () => `
    ${T(`<path d="M12 54 h76 q-2 32 -38 34 q-36 -2 -38 -34z" fill="#eef0f2"/><ellipse cx="50" cy="54" rx="38" ry="9" fill="#5b1f5e"/>`)}
    <g fill="#d9a55a"><circle cx="24" cy="54" r="2.4"/><circle cx="29" cy="51" r="2"/><circle cx="30" cy="56" r="2.2"/><circle cx="35" cy="53" r="1.8"/><circle cx="26" cy="58" r="1.6"/></g>
    ${T(`<ellipse cx="58" cy="51" rx="5" ry="3" fill="#fff2b0"/><ellipse cx="68" cy="55" rx="5" ry="3" fill="#fff2b0"/><path d="M42 50 q4 -8 8 0 q-4 4 -8 0z" fill="#e8412c"/>`)}
    <path d="M22 66 q28 12 56 0" stroke="#8a4d9e" stroke-width="3" fill="none"/>`,

  donut: () => {
    const cores = ['#fff', '#3aa0ff', '#ffd23f', '#5fbf4a', '#7a3b1c'];
    const conf = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + 0.3;
      const r = i % 2 ? 19 : 24;
      const x = 50 + r * Math.cos(a), y = 56 + r * Math.sin(a);
      conf.push(`<rect x="${(x - 2.5).toFixed(1)}" y="${(y - 1).toFixed(1)}" width="5" height="2" rx="1" fill="${cores[i % cores.length]}" transform="rotate(${(i * 47) % 180} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
    }
    return `
      ${T(`<path d="M50 23 a33 33 0 1 0 0.1 0z M50 46 a10 10 0 1 1 -0.1 0z" fill="#e3a45a" fill-rule="evenodd"/>`)}
      <path d="${circuloOndulado(50, 56, 27, 9, 2.8)} M50 44 a12 12 0 1 1 -0.1 0z" fill="#ff7eb3" fill-rule="evenodd"/>
      <path d="M32 44 q8 -12 22 -13" stroke="#ffc2dc" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${conf.join('')}`;
  },

  // Fruteira com frutas variadas (o tipo "fruta" pode ser qualquer fruta).
  fruta: () => `
    ${T(`
      <path d="M18 54 q8 -30 42 -32 q-3 4 -1 7 q-28 4 -34 25z" fill="#ffd84a"/>
      <circle cx="64" cy="36" r="5" fill="#7d2e91"/><circle cx="72" cy="38" r="5" fill="#8e3bb0"/>
      <circle cx="60" cy="44" r="5" fill="#8e3bb0"/><circle cx="68" cy="45" r="5" fill="#7d2e91"/>
      <circle cx="76" cy="46" r="5" fill="#7d2e91"/><circle cx="64" cy="52" r="5" fill="#8e3bb0"/>
      <circle cx="56" cy="50" r="11" fill="#ff9a1f"/>
      <circle cx="36" cy="50" r="11" fill="#e0342b"/>
      <path d="M40 36 q8 -8 14 -2 q-6 6 -14 2z" fill="#5fb548"/>
      <path d="M12 56 h76 q-2 30 -38 32 q-36 -2 -38 -32z" fill="#c98a45"/>
    `)}
    <path d="M36 39 q1 -5 3 -7" stroke="#5a3a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="46" r="2.6" fill="#fff" opacity=".5"/>
    <g fill="#e07d10"><circle cx="52" cy="48" r=".9"/><circle cx="58" cy="54" r=".9"/><circle cx="60" cy="46" r=".9"/></g>
    <path d="M18 66 q32 10 64 0" stroke="#9c6630" stroke-width="2.4" fill="none"/>
    <path d="M22 76 q28 8 56 0" stroke="#9c6630" stroke-width="2.4" fill="none"/>`,

  coxinha: () => `
    ${T(`<path d="M50 16 C45 30 22 46 22 66 C22 82 36 90 50 90 C64 90 78 82 78 66 C78 46 55 30 50 16Z" fill="#d98c3a"/>`)}
    <path d="M34 62 q2 -14 12 -24" stroke="#f2b666" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g fill="#b8661f"><circle cx="44" cy="54" r="1.6"/><circle cx="58" cy="62" r="1.8"/><circle cx="40" cy="72" r="1.6"/><circle cx="62" cy="78" r="1.4"/><circle cx="52" cy="44" r="1.4"/><circle cx="66" cy="68" r="1.5"/><circle cx="50" cy="82" r="1.5"/></g>
    ${vapor(50, 14)}`,

  pao_de_queijo: () => `
    ${T(`
      <circle cx="40" cy="42" r="11" fill="#f2c46b"/>
      <circle cx="60" cy="42" r="11" fill="#eab755"/>
      <circle cx="30" cy="54" r="12" fill="#eab755"/>
      <circle cx="70" cy="54" r="12" fill="#f2c46b"/>
      <circle cx="50" cy="50" r="13" fill="#f2c46b"/>
      <path d="M12 58 h76 q-3 30 -38 32 q-35 -2 -38 -32z" fill="#c98a45"/>
    `)}
    <g fill="#fff3c9" opacity=".85"><circle cx="46" cy="45" r="3"/><circle cx="26" cy="50" r="2.5"/><circle cx="66" cy="50" r="2.6"/><circle cx="37" cy="38" r="2"/><circle cx="57" cy="38" r="2"/></g>
    <path d="M12 58 l8 7 l8 -7 l8 7 l8 -7 l8 7 l8 -7 l8 7 l8 -7 l8 7 l4 -4 V58z" fill="#d7263d"/>
    <g stroke="#9c6630" stroke-width="2" fill="none"><path d="M18 74 q32 8 64 0"/><path d="M26 82 q24 6 48 0"/></g>
    ${vapor(50, 30)}`,

  sushi: () => `
    ${T(`
      <rect x="18" y="22" width="72" height="4" rx="2" fill="#c9975a" transform="rotate(14 18 22)"/>
      <rect x="14" y="30" width="72" height="4" rx="2" fill="#c9975a" transform="rotate(10 14 30)"/>
      <rect x="6" y="74" width="88" height="9" rx="2" fill="#c9975a"/>
      <rect x="14" y="83" width="10" height="7" fill="#9c6c3a"/>
      <rect x="76" y="83" width="10" height="7" fill="#9c6c3a"/>
      <rect x="10" y="60" width="34" height="15" rx="7.5" fill="#f7f4ec"/>
      <path d="M8 62 q18 -14 38 -2 q2 4 -4 5 q-16 -4 -32 2 q-4 -1 -2 -5z" fill="#f7875a"/>
      <rect x="50" y="56" width="19" height="19" rx="3" fill="#1f3a2a"/>
      <ellipse cx="59.5" cy="56" rx="9.5" ry="4" fill="#f7f4ec"/>
      <rect x="72" y="56" width="19" height="19" rx="3" fill="#1f3a2a"/>
      <ellipse cx="81.5" cy="56" rx="9.5" ry="4" fill="#f7f4ec"/>
    `)}
    <path d="M18 57 q4 -3 6 -1 M28 55 q4 -3 6 -1 M37 56 q3 -2 5 0" stroke="#ffd2bf" stroke-width="1.8" fill="none"/>
    <ellipse cx="59.5" cy="56" rx="3.5" ry="1.7" fill="#f7875a"/>
    <ellipse cx="81.5" cy="56" rx="3.5" ry="1.7" fill="#7cc242"/>`,

  temaki: () => `
    ${T(`<path d="M20 38 L82 26 L56 92 Z" fill="#1f3a2a"/>`)}
    <path d="M30 44 L60 86 M44 42 L62 80 M58 38 L66 70" stroke="#2f5a40" stroke-width="2"/>
    ${T(`<path d="M20 38 Q20 24 32 25 Q40 14 52 18 Q62 8 72 14 Q84 14 82 26 Z" fill="#f7f4ec"/>`)}
    ${T(`<path d="M34 24 q10 -14 24 -6 q-4 9 -24 6z" fill="#f7875a"/>`)}
    <path d="M40 21 q5 -3 9 -2 M47 19 q4 -2 7 0" stroke="#ffd2bf" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    ${T(`<rect x="60" y="6" width="6" height="20" rx="2" fill="#7cc242" transform="rotate(20 63 16)"/>`)}
    <g fill="#fff8e1"><ellipse cx="28" cy="30" rx="1.2" ry=".7"/><ellipse cx="72" cy="20" rx="1.2" ry=".7"/><ellipse cx="54" cy="26" rx="1.2" ry=".7"/></g>`,

  lasanha: () => `
    ${prato(80)}
    ${T(`<rect x="20" y="48" width="60" height="30" rx="3" fill="#f2c46b"/>`)}
    <rect x="21" y="57" width="58" height="5" fill="#c9302c"/>
    <rect x="21" y="62" width="58" height="3" fill="#fff1c9"/>
    <rect x="21" y="67" width="58" height="5" fill="#c9302c"/>
    <rect x="21" y="72" width="58" height="2.5" fill="#fff1c9"/>
    ${T(`<path d="M17 52 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 q5.5 -8 11 0 v4 h-66z" fill="#f7d774"/>`)}
    <g fill="#c98a2e"><ellipse cx="30" cy="50" rx="3" ry="1.6"/><ellipse cx="52" cy="49" rx="3.4" ry="1.6"/><ellipse cx="70" cy="51" rx="2.6" ry="1.4"/></g>
    <path d="M62 56 q2 8 -1 12" stroke="#c9302c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="42" cy="46" rx="4" ry="2" fill="#3f9b3a" transform="rotate(-20 42 46)"/>
    ${vapor(50, 36)}`,

  prato_feito: () => `
    ${prato(76)}
    ${T(`<path d="M24 58 q4 -10 14 -6 q6 -8 12 0 q-4 6 -26 6z" fill="#6fbf4a"/><circle cx="40" cy="54" r="4" fill="#e8412c"/>`)}
    ${T(`<ellipse cx="62" cy="63" rx="18" ry="8" fill="#5a2e17"/>`)}
    <g fill="#3a1a0a"><circle cx="56" cy="62" r="1.4"/><circle cx="64" cy="60" r="1.4"/><circle cx="70" cy="64" r="1.4"/><circle cx="60" cy="66" r="1.2"/></g>
    ${T(`<path d="M15 68 q-2 -14 16 -16 q16 -2 20 10 q2 10 -12 12 q-16 2 -24 -6z" fill="#fbf8f0"/>`)}
    <g fill="#e2dccb"><ellipse cx="26" cy="62" rx="1.6" ry=".8"/><ellipse cx="34" cy="58" rx="1.6" ry=".8"/><ellipse cx="40" cy="64" rx="1.6" ry=".8"/><ellipse cx="30" cy="68" rx="1.6" ry=".8"/></g>
    ${T(`<path d="M44 76 c-2 -8 8 -12 20 -12 c12 0 18 4 16 10 c-2 6 -10 8 -20 8 c-10 0 -15 -2 -16 -6z" fill="#8c3b1c"/>`)}
    <g stroke="#4a1a08" stroke-width="2.4" stroke-linecap="round"><path d="M54 68 l6 8"/><path d="M64 66 l6 8"/></g>
    ${vapor(50, 40)}`,

  camarao: () => {
    const corpo = 'M34 30 C14 42 20 74 48 76 C64 77 74 66 72 54';
    return `
      ${T(`<path d="M14 82 q10 -14 36 -12 q26 -2 36 12 q-36 10 -72 0z" fill="#6fbf4a"/>`)}
      ${T(`<path d="M32 34 L28 12 L39 24 L50 14 L44 36z" fill="#f28a5a"/>`)}
      <path d="${corpo}" fill="none" stroke-width="21" stroke-linecap="round" style="stroke:var(--contorno, #2a1810)"/>
      <path d="${corpo}" fill="none" stroke="#f28a5a" stroke-width="16.5" stroke-linecap="round"/>
      <path d="${corpo}" fill="none" stroke="#ffb38a" stroke-width="16.5" stroke-dasharray="2.5 7"/>
      <circle cx="71" cy="57" r="2.4" fill="#2a1810"/>
      <path d="M74 50 q10 -16 20 -14 M72 49 q4 -18 14 -22" stroke="#c9602e" stroke-width="1.6" fill="none"/>
      ${T(`<path d="M72 86 a9 9 0 0 1 18 0z" fill="#ffe14d"/>`)}`;
  },

  wrap: () => `
    ${T(`<rect x="14" y="44" width="66" height="30" rx="15" fill="#f0d8a0" transform="rotate(-18 47 59)"/>`)}
    <g stroke="#c9975a" stroke-width="2.5" stroke-linecap="round"><path d="M24 70 l6 -12"/><path d="M36 66 l6 -12"/><path d="M48 62 l6 -12"/></g>
    ${T(`<ellipse cx="77" cy="48.5" rx="9" ry="15" fill="#f7e9c6" transform="rotate(-18 77 48.5)"/>`)}
    <circle cx="75" cy="43" r="3.2" fill="#d7263d"/><circle cx="79" cy="50" r="3" fill="#6fbf4a"/>
    <circle cx="73" cy="53" r="2.8" fill="#8c3b1c"/><circle cx="80" cy="42" r="2.2" fill="#ffc933"/><circle cx="76" cy="58" r="2.2" fill="#6fbf4a"/>`,

  espetinho: () => {
    const pedacos = [
      [27.5, 74.3, '#8c3b1c'],
      [43.8, 59.6, '#d7263d'],
      [60.2, 44.9, '#8c3b1c'],
      [76.5, 30.2, '#ece2c6'],
    ];
    return `
      ${T(`<rect x="6" y="50" width="92" height="4.5" rx="2" fill="#d9b27a" transform="rotate(-42 52 52.25)"/>`)}
      ${T(pedacos.map(([x, y, c]) => `<rect x="-8.5" y="-8.5" width="17" height="17" rx="4" fill="${c}" transform="translate(${x} ${y}) rotate(-42)"/>`).join(''))}
      <g stroke="#4a1a08" stroke-width="2" stroke-linecap="round"><path d="M24 72 l6 4"/><path d="M57 43 l6 4"/></g>
      ${vapor(52, 24)}`;
  },

  croissant: () => `
    ${T(`
      <ellipse cx="18" cy="78" rx="9" ry="7" fill="#d98c3a" transform="rotate(35 18 78)"/>
      <ellipse cx="82" cy="78" rx="9" ry="7" fill="#d98c3a" transform="rotate(-35 82 78)"/>
      <ellipse cx="31" cy="68" rx="13" ry="14" fill="#e0a052" transform="rotate(25 31 68)"/>
      <ellipse cx="69" cy="68" rx="13" ry="14" fill="#e0a052" transform="rotate(-25 69 68)"/>
      <ellipse cx="50" cy="62" rx="15" ry="18" fill="#eab25e"/>
    `)}
    <g stroke="#f7d08a" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M44 52 q6 -4 12 0"/><path d="M26 60 q4 -3 9 -1"/><path d="M64 59 q5 -2 9 1"/></g>`,

  cupcake: () => `
    ${T(`<path d="M28 60 h44 l-6 28 h-32z" fill="#7ec8e3"/>`)}
    <g stroke="#4f9fbd" stroke-width="2"><path d="M36 61 l2 26"/><path d="M44 61 l1 26"/><path d="M52 61 v26"/><path d="M60 61 l-1 26"/><path d="M67 61 l-2 26"/></g>
    ${T(`
      <path d="M22 62 q-3 -15 14 -15 h28 q17 0 14 15z" fill="#ffb6d3"/>
      <path d="M30 49 q0 -13 20 -13 q20 0 20 13z" fill="#ffc6dd"/>
      <path d="M38 38 q2 -13 12 -15 q10 2 12 15z" fill="#ffb6d3"/>
      <circle cx="50" cy="20" r="5.5" fill="#d7263d"/>
    `)}
    <g stroke-width="2.2" stroke-linecap="round"><path d="M32 54 l3 -1" stroke="#3aa0ff"/><path d="M58 52 l2 2" stroke="#ffd23f"/><path d="M44 42 l3 0" stroke="#5fbf4a"/><path d="M66 56 l-2 2" stroke="#fff"/><path d="M52 32 l2 -2" stroke="#3aa0ff"/></g>
    <path d="M48 18 l2 -1" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`,

  picole: () => `
    ${T(`<rect x="45" y="66" width="10" height="24" rx="4" fill="#e6c28a"/>`)}
    ${T(`<path d="M30 70 V32 a20 20 0 0 1 40 0 V70 q0 4 -4 4 H34 q-4 0 -4 -4z" fill="#ff6b8a"/>`)}
    <path d="M31 42 V32 a19 19 0 0 1 38 0 V42 q-3.17 6 -6.33 0 q-3.17 8 -6.33 0 q-3.17 6 -6.33 0 q-3.17 8 -6.33 0 q-3.17 6 -6.33 0 q-3.17 8 -6.33 0z" fill="#5a2e17"/>
    <g fill="#e8c9a0"><circle cx="40" cy="26" r="1.3"/><circle cx="50" cy="20" r="1.3"/><circle cx="58" cy="30" r="1.3"/><circle cx="46" cy="34" r="1.2"/><circle cx="62" cy="22" r="1.1"/></g>
    <path d="M36 50 v16" stroke="#ffb3c4" stroke-width="3.5" stroke-linecap="round"/>`,

  waffle: () => {
    const quadros = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) quadros.push(`<rect x="${24 + i * 11}" y="${41 + j * 9.5}" width="8" height="7" rx="1.5"/>`);
    return `
      ${prato(84)}
      ${T(`<rect x="20" y="37" width="60" height="44" rx="8" fill="#e0a052"/>`)}
      <g fill="#c98534">${quadros.join('')}</g>
      <path d="M26 39 q24 -6 48 0 q2 8 -4 10 q-2 10 -6 0 q-8 6 -14 0 q-4 12 -8 1 q-8 4 -14 -4 q-4 -2 -2 -7z" fill="#a4561b" opacity=".92"/>
      ${T(`<rect x="44" y="30" width="12" height="9" rx="2" fill="#fff3b0"/>`)}
      ${T(`<path d="M72 86 q-9 -12 1 -15 q11 2 1 15z" fill="#e8412c"/>`)}`;
  },

  mousse: () => {
    const clip = uid('ms');
    const taca = 'M26 32 h48 q0 30 -24 34 q-24 -4 -24 -34z';
    return `
      <defs><clipPath id="${clip}"><path d="${taca}"/></clipPath></defs>
      ${T(`<rect x="46" y="64" width="8" height="18" fill="#dce9f2"/><path d="M32 90 q18 -12 36 0z" fill="#dce9f2"/>`)}
      <path d="${taca}" fill="rgba(220,240,255,.35)"/>
      <g clip-path="url(#${clip})">
        <rect x="20" y="38" width="60" height="40" fill="#5a2e17"/>
        <rect x="20" y="47" width="60" height="7" fill="#f3e1c7"/>
      </g>
      ${T(`<path d="${taca}" fill="none"/>`)}
      ${T(`<path d="M34 34 q0 -12 16 -12 q16 0 16 12z" fill="#fff8ec"/>`)}
      <g fill="#3c1c0b"><rect x="44" y="22" width="4" height="2" rx="1" transform="rotate(30 46 23)"/><rect x="53" y="25" width="4" height="2" rx="1" transform="rotate(-20 55 26)"/></g>
      <path d="M58 22 q8 -8 12 -2 q-6 6 -12 2z" fill="#4caf50"/>
      <path d="M31 40 q2 14 10 20" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>`;
  },

  brigadeiro: () => {
    const granulado = [[-5, -4, 30], [3, -6, -20], [6, 2, 60], [-2, 4, 10], [-7, 3, -40], [1, -1, 80], [5, 7, -10], [-4, -9, 45], [8, -3, 20]];
    const um = (x, y) => `
      ${T(`<path d="M${x - 13} ${y + 8} h26 l-3 16 h-20z" fill="#b3261e"/>`)}
      <g stroke="#7d1717" stroke-width="1.5"><path d="M${x - 8} ${y + 9} l1 14"/><path d="M${x - 3} ${y + 9} v15"/><path d="M${x + 2} ${y + 9} v15"/><path d="M${x + 7} ${y + 9} l-1 14"/></g>
      ${T(`<circle cx="${x}" cy="${y}" r="12" fill="#4a2412"/>`)}
      <g stroke="#2a1208" stroke-width="1.6" stroke-linecap="round">${granulado
        .map(([dx, dy, a]) => `<path d="M${x + dx} ${y + dy} l${(2.4 * Math.cos((a * Math.PI) / 180)).toFixed(2)} ${(2.4 * Math.sin((a * Math.PI) / 180)).toFixed(2)}"/>`)
        .join('')}</g>
      <path d="M${x - 7} ${y - 5} q3 -4 7 -4" stroke="#8a5a3a" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    return um(50, 48) + um(27, 62) + um(73, 62);
  },

  churros: () => {
    const palito = (x, y, a) => `
      <g transform="rotate(${a} ${x + 6} ${y + 54})">
        ${T(`<rect x="${x}" y="${y}" width="12" height="54" rx="6" fill="#d9913f"/>`)}
        <path d="M${x + 4} ${y + 6} v42 M${x + 8} ${y + 6} v42" stroke="#b86f25" stroke-width="1.5"/>
        <g fill="#fffaf0"><circle cx="${x + 3}" cy="${y + 12}" r="1"/><circle cx="${x + 9}" cy="${y + 20}" r="1"/><circle cx="${x + 5}" cy="${y + 28}" r="1"/><circle cx="${x + 8}" cy="${y + 8}" r="1"/></g>
      </g>`;
    return `
      ${palito(30, 12, -12)}${palito(56, 12, 12)}${palito(44, 6, 0)}
      ${T(`<path d="M26 58 h48 l-8 32 h-32z" fill="#f4efe6"/>`)}
      <path d="M37 59 l3 30 M50 59 v30 M63 59 l-3 30" stroke="#d7263d" stroke-width="4"/>`;
  },

  generico: () => `
    ${prato(80)}
    ${T(`<path d="M16 76 q0 -36 34 -36 q34 0 34 36z" fill="#c7cdd6"/><circle cx="50" cy="36" r="5" fill="#c7cdd6"/>`)}
    <path d="M26 66 q2 -16 18 -20" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>`,

  /** Copo simples com canudo — usado só como reserva. */
  copo: (cor) => `
    <path d="M58 10 l-6 30" stroke="#ff4d6d" stroke-width="4" stroke-linecap="round"/>
    ${T(`<path d="M26 26 h48 l-6 62 H32z" fill="rgba(220,240,255,.45)"/>`)}
    <path d="M28.5 44 h43 l-4.3 42 H32.8z" fill="${cor}"/>
    <path d="M34 32 l3 50" stroke="rgba(255,255,255,.6)" stroke-width="3" stroke-linecap="round"/>`,
};

export function iconeBase(tipo, info) {
  if (BASE[tipo]) return BASE[tipo](info);
  if (info?.grupo === 'bebida') return BASE.copo(info.cor);
  return BASE.generico();
}
