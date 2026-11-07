// Ndërton faqen statike në dosjen dist/.  Përdorimi:  node build.mjs
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/data/site.mjs';
import { projects } from './src/data/content.mjs';
import { home } from './src/pages/home.mjs';
import { projectPage, privacyPage, thanksPage, notFoundPage } from './src/pages/other.mjs';
import { faviconSvg, logoLight } from './src/lib/logo.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');

const write = (rel, content) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'src/assets'), join(OUT, 'assets'), { recursive: true });

// Faqet
write('index.html', home());
for (const p of projects) write(`projektet/${p.slug}/index.html`, projectPage(p));
write('politika-e-privatesise/index.html', privacyPage());
write('faleminderit/index.html', thanksPage());
write('404.html', notFoundPage());

// Ikonat dhe manifest
write('assets/img/logo-light.svg', logoLight().replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
write('favicon.svg', faviconSvg());
for (const f of ['favicon-32.png', 'apple-touch-icon.png', 'icon-512.png']) {
  const src = join(ROOT, 'src/assets/img', f);
  if (existsSync(src)) cpSync(src, join(OUT, f));
}
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.legalName,
      short_name: site.name,
      lang: 'sq',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
      theme_color: '#1A1A1A',
      icons: [
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

// SEO
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...projects.map((p) => `/projektet/${p.slug}/`), '/politika-e-privatesise/'];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`
);
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /faleminderit/\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`✔ Faqja u ndërtua në dist/ (${urls.length + 2} faqe) — domeni: ${site.url}`);
