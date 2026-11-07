// Ndërton variantet e logos (horizontale për header-in, e çelët për footer-in)
// direkt nga skedari origjinal src/assets/img/logo.svg — kështu nëse logoja
// përditësohet, përditësohen automatikisht edhe variantet.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = readFileSync(fileURLToPath(new URL('../assets/img/logo.svg', import.meta.url)), 'utf8');
const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
const els = inner.match(/<(polyline|rect|line|path)\b[^>]*\/>/g) || [];

const GOLD = '#B8912F';
const recolor = (el, map) => Object.entries(map).reduce((s, [from, to]) => s.split(`"${from}"`).join(`"${to}"`), el);

// Elementet sipas renditjes në skedarin origjinal
const [roof, pillarL, pillarR, base, wordLedioni, lineL, wordGroup, lineR, wordTagline] = els;
const mark = [roof, pillarL, pillarR, base];

// Ikona (shtëpia) — pjesët e zeza marrin ngjyrën e tekstit (currentColor)
const markInner = mark.map((e) => recolor(e, { '#1A1A1A': 'currentColor' })).join('');
const wordInner = [wordLedioni, lineL, wordGroup, lineR]
  .map((e) => recolor(e, { '#1A1A1A': 'currentColor', '#8A6A1F': GOLD }))
  .join('');

/** Logo horizontale për header: ikona + LEDIONI GROUP. Ngjyra e tekstit = currentColor. */
export const logoHorizontal = () => `
<span class="logo" aria-hidden="true">
  <svg class="logo__mark" viewBox="130 8 140 104" focusable="false">${markInner}</svg>
  <svg class="logo__word" viewBox="48 134 304 72" focusable="false">${wordInner}</svg>
</span>`;

/** Logo e plotë në version të çelët (për sfond të errët). */
export const logoLight = (cls = '') =>
  `<svg class="${cls}" viewBox="40 0 320 250" role="img" aria-label="Ledioni Group — Architecture &amp; Construction">${[
    ...mark.map((e) => recolor(e, { '#1A1A1A': '#FFFFFF' })),
    recolor(wordLedioni, { '#1A1A1A': '#FFFFFF' }),
    lineL,
    recolor(wordGroup, { '#8A6A1F': GOLD }),
    lineR,
    recolor(wordTagline, { '#4A4A4A': '#A8A49C' }),
  ].join('')}</svg>`;

/** Vetëm ikona me ngjyrat origjinale (p.sh. për preloader / 404). */
export const logoMark = (cls = '') =>
  `<svg class="${cls}" viewBox="130 8 140 104" aria-hidden="true" focusable="false">${markInner}</svg>`;

/** SVG i plotë i ikonës për favicon (me sfond të bardhë që të duket edhe në tab të errët). */
export const faviconSvg = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#FFFFFF"/><g transform="translate(6 12.7) scale(0.3714)"><g transform="translate(-130 -8)">${mark.join('')}</g></g></svg>`;
