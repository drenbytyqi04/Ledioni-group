// Gjeneron ikonat PNG dhe imazhin për rrjetet sociale (og-image.jpg) nga logoja.
// Duhet vetëm kur ndryshon logoja. Kërkon Playwright:  npm run images
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { faviconSvg, logoLight } from '../src/lib/logo.mjs';
import { images, imgUrl } from '../src/data/images.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const out = (f) => fileURLToPath(new URL(`../src/assets/img/${f}`, import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-512.png', 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${faviconSvg()}`);
  writeFileSync(out(file), await page.screenshot({ omitBackground: false }));
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#1a1a1a}
  .bg{position:absolute;inset:0;background:url('${imgUrl(images.hero, 1400, 735, 80)}') center/cover}
  .ov{position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,13,12,.92) 0%,rgba(14,13,12,.75) 50%,rgba(14,13,12,.35) 100%)}
  .logo{position:absolute;left:90px;top:50%;transform:translateY(-50%);width:420px}
  .line{position:absolute;left:0;right:0;bottom:0;height:8px;background:#B8912F}
</style></head><body><div class="bg"></div><div class="ov"></div>${logoLight('logo')}<div class="line"></div></body></html>`, { waitUntil: 'networkidle' });
writeFileSync(out('og-image.jpg'), await page.screenshot({ type: 'jpeg', quality: 86 }));

await browser.close();
console.log('✔ Ikonat dhe og-image.jpg u gjeneruan në src/assets/img/');
