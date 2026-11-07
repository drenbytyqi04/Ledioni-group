import { site } from '../data/site.mjs';
import { imgUrl, srcset } from '../data/images.mjs';
import { categories } from '../data/content.mjs';
import { page, esc, organizationLd } from '../lib/layout.mjs';
import { icon } from '../lib/icons.mjs';
import { logoMark } from '../lib/logo.mjs';
import { sortedProjects, projectCard } from './home.mjs';

const credit = (img) =>
  img.unsplash
    ? `Foto ilustruese: <a href="${img.authorUrl}" target="_blank" rel="noopener">${esc(img.author)}</a> / <a href="https://unsplash.com/?utm_source=ledioni_group&amp;utm_medium=referral" target="_blank" rel="noopener">Unsplash</a>`
    : '';

const pageHero = ({ eyebrow, title, lead, crumbs, img }) => `
<section class="page-hero${img ? ' page-hero--image' : ''}">
  ${img ? `<div class="page-hero__media"><img src="${imgUrl(img, 1920)}" srcset="${srcset(img, [768, 1280, 1920, 2560])}" sizes="100vw" alt="${esc(img.alt)}" fetchpriority="high" decoding="async"></div><div class="page-hero__overlay"></div>` : ''}
  <div class="container page-hero__inner">
    <nav class="breadcrumbs" aria-label="Gjurma e navigimit">
      <ol>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<li><a href="${c.href}">${c.label}</a></li>` : `<li aria-current="page">${c.label}</li>`)).join('')}</ol>
    </nav>
    ${eyebrow ? `<p class="eyebrow eyebrow--light">${eyebrow}</p>` : ''}
    <h1 class="page-hero__title">${title}</h1>
    ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
  </div>
</section>`;

export function projectPage(p) {
  const root = '../../';
  const others = sortedProjects.filter((o) => o.slug !== p.slug).slice(0, 3);
  const gallery = [p.image, ...p.gallery];
  const idx = sortedProjects.findIndex((o) => o.slug === p.slug);
  const prev = sortedProjects[(idx - 1 + sortedProjects.length) % sortedProjects.length];
  const next = sortedProjects[(idx + 1) % sortedProjects.length];

  const body = `
${pageHero({
  eyebrow: `${categories[p.category]} <span class="hero__eyebrow-sep"></span> ${p.year}`,
  title: p.title,
  lead: `${p.municipality}`,
  crumbs: [
    { label: 'Ballina', href: root },
    { label: 'Projektet', href: `${root}#projektet` },
    { label: p.title },
  ],
  img: p.image,
})}

<section class="section project">
  <div class="container project__grid">
    <div class="project__content">
      <p class="eyebrow">Përshkrimi i projektit</p>
      <h2 class="section-title section-title--sm">${p.work} — ${p.location}</h2>
      ${p.description.map((d) => `<p>${d}</p>`).join('')}
      <p class="project__credit">${credit(p.image)}</p>
    </div>
    <aside class="project__facts" aria-label="Të dhënat e projektit">
      <dl>
        <div><dt>${icon('landmark', { size: 20 })} Klienti</dt><dd>${p.municipality}</dd></div>
        <div><dt>${icon('pin', { size: 20 })} Lokacioni</dt><dd>${p.location}, Kosovë</dd></div>
        <div><dt>${icon('calendar', { size: 20 })} Viti</dt><dd>${p.year}</dd></div>
        <div><dt>${icon('tool', { size: 20 })} Lloji i punimeve</dt><dd>${p.work}</dd></div>
        <div><dt>${icon('bridge', { size: 20 })} Kategoria</dt><dd>${categories[p.category]}</dd></div>
      </dl>
      <a class="btn btn--gold btn--block" href="${root}#kontakti">Diskutoni projektin tuaj ${icon('arrowRight', { size: 18 })}</a>
    </aside>
  </div>
</section>

<section class="section section--alt gallery-section" aria-labelledby="gallery-title">
  <div class="container">
    <div class="section-head-row">
      <div class="section-head">
        <p class="eyebrow">Galeria</p>
        <h2 class="section-title section-title--sm" id="gallery-title">Fotot e projektit</h2>
      </div>
      <p class="section-head-row__text">Fotot janë ilustruese dhe do të zëvendësohen me fotot reale të projektit.</p>
    </div>
    <ul class="gallery" data-gallery>
      ${gallery
        .map(
          (g, i) => `<li class="gallery__item">
        <a class="gallery__link" href="${imgUrl(g, 2000, undefined, 82)}" data-lightbox data-caption="${esc(g.alt)}" data-credit="${esc(g.author || '')}">
          <img src="${imgUrl(g, 900, (i % 4 === 0 || i % 4 === 3) ? 450 : 765)}" srcset="${srcset(g, [480, 900, 1300], (i % 4 === 0 || i % 4 === 3) ? 0.5 : 0.85)}" sizes="${(i % 4 === 0 || i % 4 === 3) ? '(min-width: 900px) 66vw, 100vw' : '(min-width: 900px) 33vw, 50vw'}" alt="${esc(g.alt)}" loading="lazy" decoding="async">
          <span class="gallery__zoom">${icon('zoom', { size: 22 })}</span>
        </a>
      </li>`
        )
        .join('')}
    </ul>
    <nav class="project-nav" aria-label="Projektet e tjera">
      <a class="project-nav__link" href="${root}projektet/${prev.slug}/">${icon('arrowLeft', { size: 18 })}<span><small>Projekti i mëparshëm</small>${prev.title} · ${prev.year}</span></a>
      <a class="project-nav__link project-nav__link--next" href="${root}projektet/${next.slug}/"><span><small>Projekti tjetër</small>${next.title} · ${next.year}</span>${icon('arrowRight', { size: 18 })}</a>
    </nav>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head-row">
      <div class="section-head">
        <p class="eyebrow">Portofoli</p>
        <h2 class="section-title section-title--sm">Projekte të tjera</h2>
      </div>
      <a class="link-arrow" href="${root}#projektet">Të gjitha projektet ${icon('arrowRight', { size: 18 })}</a>
    </div>
    <div class="projects__grid">${others.map((o) => projectCard(o, root)).join('')}</div>
  </div>
</section>

<div class="lightbox" data-lightbox-root hidden role="dialog" aria-modal="true" aria-label="Shikuesi i fotove">
  <button class="lightbox__close" type="button" aria-label="Mbyll" data-lb-close>${icon('close', { size: 26 })}</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Fotoja e mëparshme" data-lb-prev>${icon('arrowLeft', { size: 26 })}</button>
  <figure class="lightbox__figure"><img alt="" data-lb-img><figcaption data-lb-caption></figcaption></figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Fotoja tjetër" data-lb-next>${icon('arrowRight', { size: 26 })}</button>
</div>`;

  const path = `/projektet/${p.slug}/`;
  const ld = [
    organizationLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ballina', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Projektet', item: `${site.url}/#projektet` },
        { '@type': 'ListItem', position: 3, name: p.title, item: site.url + path },
      ],
    },
  ];

  return page({
    root,
    path,
    title: `${p.title} — ${p.location} ${p.year} | Ledioni Group`,
    description: `${p.summary} Projekt i realizuar nga Ledioni Group SH.P.K. për ${p.municipality} në vitin ${p.year}.`,
    body,
    jsonLd: ld,
    headerSolid: false,
    bodyClass: 'page-project',
  });
}

export function privacyPage() {
  const root = '../';
  const body = `
${pageHero({
  title: 'Politika e Privatësisë',
  lead: 'Si i mbledhim dhe i përdorim të dhënat tuaja personale.',
  crumbs: [{ label: 'Ballina', href: root }, { label: 'Politika e Privatësisë' }],
})}
<section class="section">
  <div class="container"><div class="prose">
    <p class="prose__updated">Përditësuar më: 7 nëntor 2026</p>

    <h2>1. Kush jemi</h2>
    <p>Kontrollues i të dhënave është <strong>${site.legalName}</strong>, NUI ${site.nui}, me adresë në ${site.address.street}, ${site.address.village}, ${site.address.municipality}, ${site.address.country}. Për çdo pyetje rreth të dhënave tuaja na telefononi në <a href="tel:${site.phoneHref}">${site.phone}</a> ose na shkruani në <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>.</p>

    <h2>2. Cilat të dhëna mbledhim</h2>
    <p>Kur plotësoni formularin e kontaktit në këtë faqe, ne marrim të dhënat që ju vetë na jepni:</p>
    <ul>
      <li>emrin dhe mbiemrin;</li>
      <li>adresën e email-it;</li>
      <li>numrin e telefonit (opsional);</li>
      <li>përmbajtjen e mesazhit tuaj.</li>
    </ul>
    <p>Kjo faqe nuk përdor cookies për reklamim ose ndjekje të vizitorëve.</p>

    <h2>3. Për çfarë i përdorim</h2>
    <p>Të dhënat i përdorim vetëm për t’iu përgjigjur kërkesës suaj dhe për komunikim në lidhje me projektin ose shërbimin për të cilin na keni kontaktuar. Nuk i shesim, nuk i japim me qira dhe nuk i përdorim për marketing pa pëlqimin tuaj.</p>

    <h2>4. Baza ligjore</h2>
    <p>Të dhënat përpunohen në bazë të pëlqimit tuaj, të cilin e jepni duke shënuar kutizën përkatëse para dërgimit të formularit, në përputhje me Ligjin Nr. 06/L-082 për Mbrojtjen e të Dhënave Personale. Pëlqimin mund ta tërhiqni në çdo kohë.</p>

    <h2>5. Sa kohë i ruajmë</h2>
    <p>Mesazhet i ruajmë për aq kohë sa është e nevojshme për komunikimin me ju dhe për realizimin e kërkesës suaj. Pas kësaj, të dhënat fshihen, përveç rasteve kur ligji kërkon ruajtjen e tyre.</p>

    <h2>6. Shërbime të palëve të treta</h2>
    <p>Për funksionimin e faqes përdoren disa shërbime të jashtme:</p>
    <ul>
      <li>shërbimi i hostimit dhe i formularëve, përmes të cilit dërgohen mesazhet;</li>
      <li>Google Maps, për shfaqjen e hartës së lokacionit;</li>
      <li>Google Fonts, për shkronjat e faqes;</li>
      <li>Unsplash, nga ku shfaqen fotot ilustruese.</li>
    </ul>
    <p>Këto shërbime mund të përpunojnë të dhëna teknike, si adresa IP, sipas politikave të tyre të privatësisë.</p>

    <h2>7. Të drejtat tuaja</h2>
    <p>Keni të drejtë të kërkoni qasje në të dhënat tuaja, korrigjimin ose fshirjen e tyre, kufizimin e përpunimit, si dhe të tërhiqni pëlqimin. Për këto kërkesa na kontaktoni në <a href="tel:${site.phoneHref}">${site.phone}</a> ose në <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>. Nëse mendoni se të drejtat tuaja janë shkelur, mund të ankoheni në Agjencinë për Informim dhe Privatësi (AIP).</p>

    <h2>8. Ndryshimet</h2>
    <p>Kjo politikë mund të përditësohet herë pas here. Versioni aktual publikohet gjithmonë në këtë faqe.</p>

    <p><a class="link-arrow" href="${root}#kontakti">Kthehu te formulari i kontaktit ${icon('arrowRight', { size: 18 })}</a></p>
  </div></div>
</section>`;
  return page({
    root,
    path: '/politika-e-privatesise/',
    title: 'Politika e Privatësisë | Ledioni Group',
    description: 'Politika e privatësisë së Ledioni Group SH.P.K.: si i mbledhim, përdorim dhe mbrojmë të dhënat personale që na dërgoni përmes formularit të kontaktit.',
    body,
    headerSolid: true,
    bodyClass: 'page-simple',
  });
}

export function thanksPage() {
  const root = '../';
  const body = `
<section class="status-page">
  <div class="container status-page__inner">
    ${logoMark('status-page__mark')}
    <p class="eyebrow">Mesazhi u dërgua</p>
    <h1 class="status-page__title">Faleminderit!</h1>
    <p class="status-page__text">Mesazhi juaj u pranua me sukses. Do t’ju kontaktojmë sa më shpejt.</p>
    <a class="btn btn--gold btn--lg" href="${root}">Kthehu në Ballina ${icon('arrowRight', { size: 18 })}</a>
  </div>
</section>`;
  return page({
    root,
    path: '/faleminderit/',
    title: 'Faleminderit | Ledioni Group',
    description: 'Mesazhi juaj u dërgua me sukses.',
    body,
    headerSolid: true,
    bodyClass: 'page-simple',
    noindex: true,
  });
}

export function notFoundPage() {
  // Faqja 404 shërbehet nga çdo shteg, prandaj përdor shtigje absolute.
  const root = '/';
  const body = `
<section class="status-page">
  <div class="container status-page__inner">
    ${logoMark('status-page__mark')}
    <p class="status-page__code" aria-hidden="true">404</p>
    <h1 class="status-page__title">Faqja nuk u gjet</h1>
    <p class="status-page__text">Faqja që kërkoni nuk ekziston ose është zhvendosur. Kthehuni në ballinë ose na kontaktoni.</p>
    <div class="status-page__actions">
      <a class="btn btn--gold btn--lg" href="${root}">Kthehu në Ballina</a>
      <a class="btn btn--outline btn--lg" href="${root}#kontakti">Na Kontaktoni</a>
    </div>
  </div>
</section>`;
  return page({
    root,
    path: '/404.html',
    title: 'Faqja nuk u gjet (404) | Ledioni Group',
    description: 'Faqja që kërkoni nuk u gjet.',
    body,
    headerSolid: true,
    bodyClass: 'page-simple',
    noindex: true,
  });
}
