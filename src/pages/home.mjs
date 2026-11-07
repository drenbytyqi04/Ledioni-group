import { site } from '../data/site.mjs';
import { images, imgUrl, srcset } from '../data/images.mjs';
import { stats, values, services, processSteps, whyUs, partners, faq, projects, categories } from '../data/content.mjs';
import { page, esc, organizationLd } from '../lib/layout.mjs';
import { icon } from '../lib/icons.mjs';

const sectionHead = ({ eyebrow, title, text, center = false, light = false }) => `
<div class="section-head${center ? ' section-head--center' : ''}${light ? ' section-head--light' : ''}" data-reveal>
  <p class="eyebrow">${eyebrow}</p>
  <h2 class="section-title">${title}</h2>
  ${text ? `<p class="section-lead">${text}</p>` : ''}
</div>`;

const picture = (img, { widths, sizes, ratio, cls = '', lazy = true, priority = false }) => `
<img class="${cls}" src="${imgUrl(img, widths[1] || widths[0], ratio ? Math.round((widths[1] || widths[0]) * ratio) : undefined)}"
  srcset="${srcset(img, widths, ratio)}" sizes="${sizes}" alt="${esc(img.alt)}"
  ${lazy ? 'loading="lazy"' : ''} ${priority ? 'fetchpriority="high"' : ''} decoding="async">`;

export const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

export function projectCard(p, root, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="project-card" data-category="${p.category}" data-reveal>
  <a class="project-card__link" href="${root}projektet/${p.slug}/">
    <div class="project-card__media">
      ${picture(p.image, { widths: [480, 720, 960], sizes: '(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw', ratio: 0.72 })}
      <span class="project-card__tag">${categories[p.category]}</span>
    </div>
    <div class="project-card__body">
      <p class="project-card__meta">${icon('pin', { size: 16 })} ${p.location} <span class="dot"></span> ${p.year}</p>
      <${h} class="project-card__title">${p.title}</${h}>
      <p class="project-card__text">${p.summary}</p>
      <span class="project-card__more">Shiko projektin ${icon('arrowRight', { size: 18 })}</span>
    </div>
  </a>
</article>`;
}

export function home() {
  const root = './';

  const hero = `
<section class="hero" id="ballina" aria-labelledby="hero-title">
  <div class="hero__media">
    ${picture(images.hero, { widths: [768, 1280, 1920, 2560], sizes: '100vw', cls: 'hero__img', lazy: false, priority: true })}
  </div>
  <div class="hero__overlay"></div>
  <div class="container hero__inner">
    <p class="eyebrow eyebrow--light hero__eyebrow">Arkitekturë &amp; Ndërtim <span class="hero__eyebrow-loc"><span class="hero__eyebrow-sep"></span> Suharekë, Kosovë</span></p>
    <h1 class="hero__title" id="hero-title">Ndërtojmë ura.<br><span>Ndërtojmë të ardhmen.</span></h1>
    <p class="hero__lead">Arkitekturë, ndërtim dhe infrastrukturë publike me cilësi dhe përgjegjësi.</p>
    <div class="hero__actions">
      <a class="btn btn--gold btn--lg" href="#projektet">Shiko Projektet ${icon('arrowRight', { size: 18 })}</a>
      <a class="btn btn--outline-light btn--lg" href="#kontakti">Na Kontaktoni</a>
    </div>
  </div>
  <a class="hero__scroll" href="#statistika" aria-label="Lëviz poshtë">
    <span>Lëviz</span><span class="hero__scroll-line"></span>
  </a>
</section>`;

  const statsBar = `
<section class="stats" id="statistika" aria-label="Ledioni Group në shifra">
  <div class="container">
    <ul class="stats__grid">
      ${stats
        .map(
          (s) => `<li class="stats__item" data-reveal>
        <p class="stats__value">${s.prefix ? `<span class="stats__prefix">${s.prefix}</span>` : ''}<span class="stats__num" data-count="${s.value}" data-plain="${s.plain ? 1 : 0}">${s.value}</span>${s.suffix ? `<span class="stats__suffix">${s.suffix}</span>` : ''}</p>
        <p class="stats__label">${s.label}</p>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

  const about = `
<section class="section about" id="rreth-nesh" aria-labelledby="about-title">
  <div class="container about__grid">
    <div class="about__media" data-reveal>
      <div class="about__frame"></div>
      ${picture(images.about, { widths: [480, 720, 1080], sizes: '(min-width: 1000px) 540px, 100vw', ratio: 1.15, cls: 'about__img' })}
      <div class="about__badge">
        <span class="about__badge-year">2021</span>
        <span class="about__badge-text">Viti i<br>themelimit</span>
      </div>
    </div>
    <div class="about__content">
      <div class="section-head" data-reveal>
        <p class="eyebrow">Rreth Nesh</p>
        <h2 class="section-title" id="about-title">Infrastrukturë e ndërtuar me përgjegjësi</h2>
      </div>
      <div class="about__text" data-reveal>
        <p class="about__lead">Ledioni Group është një kompani ndërtimi nga Kosova, e themeluar në vitin 2021 dhe e udhëhequr nga drejtoresha menaxhuese <strong>Lendita Kryeziu</strong>.</p>
        <p>E specializuar në ndërtimin dhe rehabilitimin e urave, kompania realizon edhe ndërtimin e rrugëve, objekteve banesore dhe afariste, ujësjellësve dhe kanalizimeve. Puna jonë mbështetet në planifikim të kujdesshëm, zbatim të saktë dhe komunikim të hapur me investitorin.</p>
      </div>
      <ul class="values" data-reveal>
        ${values
          .map(
            (v) => `<li class="values__item">
          <span class="values__icon">${icon(v.icon)}</span>
          <div><h3 class="values__title">${v.title}</h3><p class="values__text">${v.text}</p></div>
        </li>`
          )
          .join('')}
      </ul>
      <a class="link-arrow" href="#sherbimet" data-reveal>Zbuloni shërbimet tona ${icon('arrowRight', { size: 18 })}</a>
    </div>
  </div>
</section>`;

  const servicesSection = `
<section class="section section--alt services" id="sherbimet" aria-labelledby="services-title">
  <div class="container">
    <div class="section-head-row">
      ${sectionHead({ eyebrow: 'Shërbimet', title: '<span id="services-title">Gjithçka që i duhet një projekti ndërtimor</span>' })}
      <p class="section-head-row__text" data-reveal>Nga projektimi deri te punimet përfundimtare — me fokus të veçantë te urat dhe infrastruktura publike.</p>
    </div>
    <ul class="services__grid">
      ${services
        .map(
          (s) => `<li class="service-card${s.featured ? ' service-card--featured' : ''}" data-reveal>
        <div class="service-card__media">
          ${picture(s.image, { widths: s.featured ? [640, 960, 1280] : [400, 600, 800], sizes: s.featured ? '(min-width: 1100px) 780px, 100vw' : '(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw', ratio: s.featured ? 0.66 : 0.62 })}
        </div>
        <div class="service-card__body">
          <span class="service-card__icon">${icon(s.icon, { size: 26 })}</span>
          ${s.featured ? '<p class="service-card__label">Specializimi ynë</p>' : ''}
          <h3 class="service-card__title">${s.title}</h3>
          <p class="service-card__text">${s.text}</p>
        </div>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

  const process = `
<section class="section process" id="si-punojme" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Si Punojmë', title: '<span id="process-title">Një proces i qartë, nga ideja te dorëzimi</span>', center: true })}
    <ol class="process__list">
      ${processSteps
        .map(
          (s, i) => `<li class="process__step" data-reveal style="--d:${i * 90}ms">
        <span class="process__num">0${i + 1}</span>
        <span class="process__icon">${icon(s.icon, { size: 28 })}</span>
        <h3 class="process__title">${s.title}</h3>
        <p class="process__text">${s.text}</p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>`;

  const projectsSection = `
<section class="section section--alt projects" id="projektet" aria-labelledby="projects-title">
  <div class="container">
    <div class="section-head-row">
      ${sectionHead({ eyebrow: 'Projektet', title: '<span id="projects-title">Projekte publike të realizuara</span>' })}
      <div class="filters" role="group" aria-label="Filtro projektet" data-reveal>
        <button class="filters__btn is-active" type="button" data-filter="all" aria-pressed="true">Të gjitha</button>
        ${Object.entries(categories).map(([k, v]) => `<button class="filters__btn" type="button" data-filter="${k}" aria-pressed="false">${v}</button>`).join('')}
      </div>
    </div>
    <div class="projects__grid" data-projects>
      ${sortedProjects.map((p) => projectCard(p, root)).join('')}
    </div>
    <p class="projects__note">Fotot e projekteve janë ilustruese.</p>
  </div>
</section>`;

  const why = `
<section class="section why" aria-labelledby="why-title">
  <div class="container why__grid">
    <div class="why__intro">
      ${sectionHead({ eyebrow: 'Pse Ne?', title: '<span id="why-title">Partner i besueshëm për infrastrukturën publike</span>', text: 'Institucionet dhe investitorët na besojnë projekte ku cilësia dhe siguria nuk janë opsionale.' })}
      <a class="btn btn--dark" href="#kontakti" data-reveal>Kërkoni një ofertë ${icon('arrowRight', { size: 18 })}</a>
    </div>
    <ul class="why__list">
      ${whyUs
        .map(
          (w, i) => `<li class="why__item" data-reveal style="--d:${i * 80}ms">
        <span class="why__icon">${icon(w.icon, { size: 28 })}</span>
        <h3 class="why__title">${w.title}</h3>
        <p class="why__text">${w.text}</p>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

  const partnersSection = `
<section class="partners" aria-labelledby="partners-title">
  <div class="container partners__inner">
    <h2 class="partners__title" id="partners-title">Kemi bashkëpunuar me</h2>
    <ul class="partners__list">
      ${partners.map((p) => `<li class="partners__item" data-reveal>${icon('landmark', { size: 26 })}<span>${p}</span></li>`).join('')}
    </ul>
  </div>
</section>`;

  const faqSection = `
<section class="section faq" id="pyetje" aria-labelledby="faq-title">
  <div class="container faq__grid">
    <div>
      ${sectionHead({ eyebrow: 'Pyetje të Shpeshta', title: '<span id="faq-title">Përgjigje për pyetjet më të zakonshme</span>', text: 'Nuk e gjeni përgjigjen që kërkoni? Na kontaktoni dhe do t’ju përgjigjemi sa më shpejt.' })}
      <a class="link-arrow" href="#kontakti" data-reveal>Bëni një pyetje ${icon('arrowRight', { size: 18 })}</a>
    </div>
    <div class="faq__list" data-reveal>
      ${faq
        .map(
          (f, i) => `<details class="faq__item"${i === 0 ? ' open' : ''}>
        <summary class="faq__q"><span>${f.q}</span><span class="faq__toggle" aria-hidden="true">${icon('plus', { size: 20 })}</span></summary>
        <div class="faq__a"><p>${f.a}</p></div>
      </details>`
        )
        .join('')}
    </div>
  </div>
</section>`;

  const cta = `
<section class="cta" aria-labelledby="cta-title">
  <div class="cta__media">${picture(images.cta, { widths: [768, 1280, 1920], sizes: '100vw' })}</div>
  <div class="cta__overlay"></div>
  <div class="container cta__inner" data-reveal>
    <span class="cta__line" aria-hidden="true"></span>
    <h2 class="cta__title" id="cta-title">Keni një projekt në mendje?<br><span>Le ta ndërtojmë së bashku.</span></h2>
    <div class="cta__actions">
      <a class="btn btn--gold btn--lg" href="#kontakti">Na Kontaktoni ${icon('arrowRight', { size: 18 })}</a>
      <a class="btn btn--outline-light btn--lg" href="tel:${site.phoneHref}">${icon('phone', { size: 18 })} ${site.phone}</a>
    </div>
  </div>
</section>`;

  const formAttrs =
    site.formMode === 'endpoint'
      ? `action="${esc(site.formEndpoint)}" method="POST" data-endpoint="${esc(site.formEndpoint)}"`
      : site.formMode === 'whatsapp'
        ? `action="https://wa.me/${site.whatsapp}" method="GET" data-endpoint="whatsapp" data-whatsapp="${site.whatsapp}"`
        : `action="${root}faleminderit/" method="POST" data-netlify="true" netlify-honeypot="adresa-web" data-endpoint="netlify"`;

  const contact = `
<section class="section section--alt contact" id="kontakti" aria-labelledby="contact-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Kontakti', title: '<span id="contact-title">Le të flasim për projektin tuaj</span>', text: 'Na shkruani dhe do t’ju kontaktojmë sa më shpejt. Mund të na telefononi ose të na shkruani edhe në WhatsApp.', center: true })}
    <div class="contact__grid">
      <form class="form" name="kontakt" ${formAttrs} novalidate data-form data-reveal>
        <input type="hidden" name="form-name" value="kontakt">
        <input type="hidden" name="_subject" value="Mesazh i ri nga faqja e Ledioni Group">
        <p class="form__hp" aria-hidden="true"><label>Mos e plotësoni këtë fushë: <input name="adresa-web" tabindex="-1" autocomplete="off"></label></p>
        <div class="form__row">
          <div class="field">
            <label class="field__label" for="f-name">Emri dhe Mbiemri <span aria-hidden="true">*</span></label>
            <input class="field__input" id="f-name" name="emri" type="text" autocomplete="name" required minlength="3" placeholder="p.sh. Arben Krasniqi" aria-describedby="f-name-err">
            <p class="field__error" id="f-name-err" aria-live="polite"></p>
          </div>
          <div class="field">
            <label class="field__label" for="f-phone">Telefoni</label>
            <input class="field__input" id="f-phone" name="telefoni" type="tel" autocomplete="tel" inputmode="tel" placeholder="+383 4X XXX XXX" aria-describedby="f-phone-err">
            <p class="field__error" id="f-phone-err" aria-live="polite"></p>
          </div>
        </div>
        <div class="field">
          <label class="field__label" for="f-email">Email <span aria-hidden="true">*</span></label>
          <input class="field__input" id="f-email" name="email" type="email" autocomplete="email" required placeholder="emri@shembull.com" aria-describedby="f-email-err">
          <p class="field__error" id="f-email-err" aria-live="polite"></p>
        </div>
        <div class="field">
          <label class="field__label" for="f-msg">Mesazhi <span aria-hidden="true">*</span></label>
          <textarea class="field__input field__input--area" id="f-msg" name="mesazhi" rows="5" required minlength="10" placeholder="Përshkruani shkurt projektin, lokacionin dhe afatin e dëshiruar…" aria-describedby="f-msg-err"></textarea>
          <p class="field__error" id="f-msg-err" aria-live="polite"></p>
        </div>
        <div class="field field--check">
          <input class="check" id="f-consent" name="pelqimi" type="checkbox" value="Po" required aria-describedby="f-consent-err">
          <label for="f-consent">Pajtohem që të dhënat e mia të përdoren për t’u kontaktuar, sipas <a href="${root}politika-e-privatesise/" target="_blank">Politikës së Privatësisë</a>. <span aria-hidden="true">*</span></label>
          <p class="field__error" id="f-consent-err" aria-live="polite"></p>
        </div>
        <div class="form__foot">
          <button class="btn btn--gold btn--lg form__submit" type="submit" data-submit>
            <span class="form__submit-text">Dërgo Mesazhin</span>${icon('arrowRight', { size: 18 })}
          </button>
          <p class="form__required"><span aria-hidden="true">*</span> Fushat e detyrueshme</p>
        </div>
        <div class="form__status" role="status" aria-live="polite" data-form-status></div>
      </form>

      <aside class="contact__info" data-reveal>
        <ul class="contact__list">
          <li class="contact__item">
            <span class="contact__icon">${icon('pin')}</span>
            <div><p class="contact__label">Adresa</p><p class="contact__value">${site.address.street}<br>${site.address.village}, ${site.address.municipality}, ${site.address.country}</p></div>
          </li>
          <li class="contact__item">
            <span class="contact__icon">${icon('phone')}</span>
            <div><p class="contact__label">Telefoni</p><p class="contact__value"><a href="tel:${site.phoneHref}">${site.phone}</a></p></div>
          </li>
        </ul>
        <a class="btn btn--whatsapp" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">Na shkruani në WhatsApp</a>
        <div class="contact__map">
          <iframe title="Harta e lokacionit: ${site.mapQuery}" src="https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&amp;z=13&amp;output=embed&amp;hl=sq" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
      </aside>
    </div>
  </div>
</section>`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.legalName,
    url: `${site.url}/`,
    inLanguage: 'sq',
    publisher: { '@id': `${site.url}/#organization` },
  };

  const heroPreload = `<link rel="preload" as="image" imagesrcset="${srcset(images.hero, [768, 1280, 1920, 2560])}" imagesizes="100vw" fetchpriority="high">`;

  return page({
    root,
    path: '/',
    title: 'Ledioni Group — Ndërtim urash dhe infrastrukture në Kosovë | Suharekë',
    description:
      'Ledioni Group SH.P.K. është kompani arkitekture dhe ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave, rrugëve dhe infrastrukturës publike në Kosovë.',
    body: hero + statsBar + about + servicesSection + process + projectsSection + why + partnersSection + faqSection + cta + contact,
    jsonLd: [organizationLd(), websiteLd, faqLd],
    bodyClass: 'page-home',
    preload: heroPreload,
  });
}
