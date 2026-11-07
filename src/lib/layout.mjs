import { site } from '../data/site.mjs';
import { services } from '../data/content.mjs';
import { icon, whatsappIcon } from './icons.mjs';
import { logoHorizontal } from './logo.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const navItems = [
  { id: 'ballina', label: 'Ballina' },
  { id: 'rreth-nesh', label: 'Rreth Nesh' },
  { id: 'sherbimet', label: 'Shërbimet' },
  { id: 'projektet', label: 'Projektet' },
  { id: 'kontakti', label: 'Kontakti' },
];

/**
 * Faqja e plotë HTML.
 * @param {object} o
 * @param {string} o.root     prefiksi relativ drejt rrënjës ('./', '../../')
 * @param {string} o.path     shtegu kanonik i faqes ('/', '/projektet/x/')
 */
export function page({ root, path, title, description, body, ogImage, jsonLd = [], headerSolid = false, bodyClass = '', preload = '', noindex = false }) {
  const canonical = site.url + path;
  const og = ogImage || `${site.url}/assets/img/og-image.jpg`;
  return `<!doctype html>
<html lang="sq">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#1A1A1A">
<meta name="format-detection" content="telephone=no">

<meta property="og:type" content="website">
<meta property="og:locale" content="sq_AL">
<meta property="og:site_name" content="${esc(site.legalName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logoja e Ledioni Group mbi një foto ure">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">

<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${root}favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${root}apple-touch-icon.png">
<link rel="manifest" href="${root}site.webmanifest">

<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${preload}
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@500;600;700&display=swap">
<link rel="stylesheet" href="${root}assets/css/style.css">
${jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n')}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Kalo te përmbajtja</a>
<div class="scroll-progress" aria-hidden="true" data-progress></div>
${header({ root, solid: headerSolid })}
<main id="main">
${body}
</main>
${footer({ root })}
${floating()}
<script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;
}

function header({ root, solid }) {
  const links = navItems
    .map((n) => `<li><a class="nav__link" href="${root}#${n.id}" data-nav="${n.id}">${n.label}</a></li>`)
    .join('');
  return `<header class="site-header${solid ? ' is-solid' : ''}" data-header>
  <div class="container site-header__inner">
    <a class="site-header__brand" href="${root}" aria-label="Ledioni Group — Ballina">${logoHorizontal()}</a>
    <nav class="nav" aria-label="Menyja kryesore">
      <ul class="nav__list" id="nav-list">${links}</ul>
    </nav>
    <a class="btn btn--gold btn--sm site-header__cta" href="${root}#kontakti">Na Kontaktoni</a>
    <button class="nav-toggle" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Hap menynë" data-nav-toggle>
      <span class="nav-toggle__bar"></span><span class="nav-toggle__bar"></span><span class="nav-toggle__bar"></span>
    </button>
  </div>
</header>
${mobileMenu({ root })}`;
}

// Menyja e celularit: panel që rrëshqet nga e djathta. Qëndron jashtë <header>
// që të mbulojë gjithë lartësinë e ekranit edhe kur header-i ka efekt blur.
function mobileMenu({ root }) {
  return `<div class="mobile-menu" id="mobile-menu" data-mobile-menu inert aria-hidden="true">
  <div class="mobile-menu__overlay" data-menu-close></div>
  <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Menyja">
    <div class="mobile-menu__head">
      <img class="mobile-menu__logo" src="${root}assets/img/logo-light.svg" alt="Ledioni Group" width="88" height="69">
      <button class="mobile-menu__close" type="button" aria-label="Mbyll menynë" data-menu-close>${icon('close', { size: 24 })}</button>
    </div>
    <nav aria-label="Menyja në celular">
      <ul class="mobile-menu__list">
        ${navItems
          .map(
            (n, i) => `<li style="--i:${i}"><a href="${root}#${n.id}" data-nav="${n.id}"><span class="mobile-menu__num">0${i + 1}</span><span class="mobile-menu__label">${n.label}</span>${icon('arrowRight', { size: 20 })}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
    <div class="mobile-menu__foot">
      <a class="btn btn--gold btn--block" href="${root}#kontakti">Na Kontaktoni ${icon('arrowRight', { size: 18 })}</a>
      <div class="mobile-menu__quick">
        <a href="tel:${site.phoneHref}">${icon('phone', { size: 18 })}<span>Telefono</span></a>
        <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${whatsappIcon(18)}<span>WhatsApp</span></a>
      </div>
      <p class="mobile-menu__address">${icon('pin', { size: 16 })} ${site.address.village}, ${site.address.municipality}, ${site.address.country}</p>
    </div>
  </div>
</div>`;
}

function footer({ root }) {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.social)
    .map(([k, url]) => {
      const name = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn' }[k];
      return url
        ? `<a class="social" href="${esc(url)}" target="_blank" rel="noopener" aria-label="${name}">${icon(k, { size: 18 })}</a>`
        : `<span class="social social--soon" title="${name} — së shpejti" aria-label="${name} — së shpejti">${icon(k, { size: 18 })}</span>`;
    })
    .join('');
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <a href="${root}" aria-label="Ledioni Group — Ballina"><img class="site-footer__logo" src="${root}assets/img/logo-light.svg" alt="Ledioni Group — Architecture &amp; Construction" width="190" height="148" loading="lazy" decoding="async"></a>
        <p>Kompani ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave dhe në infrastrukturën publike.</p>
        <div class="site-footer__social">${socials}</div>
      </div>
      <div>
        <h2 class="site-footer__title">Navigimi</h2>
        <ul class="site-footer__links">
          ${navItems.map((n) => `<li><a href="${root}#${n.id}">${n.label}</a></li>`).join('')}
          <li><a href="${root}#pyetje">Pyetje të Shpeshta</a></li>
        </ul>
      </div>
      <div>
        <h2 class="site-footer__title">Shërbimet</h2>
        <ul class="site-footer__links">
          ${services.slice(0, 6).map((s) => `<li><a href="${root}#sherbimet">${s.short || s.title}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h2 class="site-footer__title">Kontakti</h2>
        <ul class="site-footer__contact">
          <li>${icon('pin', { size: 18 })}<span>${site.address.street}<br>${site.address.village}, ${site.address.municipality}, ${site.address.country}</span></li>
          <li>${icon('phone', { size: 18 })}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${year} ${site.legalName} <span class="sep">|</span> NUI: ${site.nui} <span class="sep">|</span> Të gjitha të drejtat e rezervuara.</p>
      <p><a href="${root}politika-e-privatesise/">Politika e Privatësisë</a> <span class="sep">|</span> Fotot: <a href="https://unsplash.com/?utm_source=ledioni_group&amp;utm_medium=referral" target="_blank" rel="noopener">Unsplash</a></p>
    </div>
  </div>
</footer>`;
}

function floating() {
  return `<a class="whatsapp-float" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="Na shkruani në WhatsApp">${whatsappIcon(28)}<span class="whatsapp-float__label">Na shkruani</span></a>
<button class="to-top" type="button" aria-label="Kthehu lart" data-to-top>${icon('arrowUp', { size: 20 })}</button>`;
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['GeneralContractor', 'LocalBusiness'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: `${site.url}/assets/img/logo.svg`,
    image: `${site.url}/assets/img/og-image.jpg`,
    description: 'Kompani arkitekture dhe ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave dhe në infrastrukturën publike.',
    telephone: site.phoneHref,
    foundingDate: site.foundingDate,
    taxID: site.nui,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.village,
      addressRegion: site.address.municipality,
      addressCountry: site.address.countryCode,
    },
    areaServed: { '@type': 'Country', name: 'Kosovë' },
    knowsAbout: services.map((s) => s.title),
    sameAs: Object.values(site.social).filter(Boolean),
  };
}
