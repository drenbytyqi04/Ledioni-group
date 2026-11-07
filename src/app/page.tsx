import { AboutMedia, ContactForm, Cta, FaqList, Hero, ProcessSteps, ProjectsFilter } from '@/components/home';
import { Counter, Eyebrow, Reveal, SplitTitle, StaggerGrid } from '@/components/motion';
import { Picture } from '@/components/Picture';
import { faq, partners, projects, services, stats, values, whyUs } from '@/data/content';
import { site } from '@/data/site';
import { Icon } from '@/lib/icons';

const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

export default function HomePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const websiteLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.legalName, url: `${site.url}/`, inLanguage: 'sq' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteLd, faqLd]) }} />
      <Hero />

      {/* Statistikat */}
      <section className="stats" id="statistika" aria-label="Ledioni Group në shifra">
        <div className="container">
          <StaggerGrid cols={4} className="stats__grid" sides={false} step={0.15}>
            {stats.map((s) => (
              <div className="stats__item" key={s.label}>
                <p className="stats__value">
                  {s.prefix && <span className="stats__prefix">{s.prefix}</span>}
                  <Counter value={s.value} from={s.plain ? s.value - 25 : 0} />
                  {s.suffix && <span className="stats__suffix">{s.suffix}</span>}
                </p>
                <p className="stats__label">{s.label}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Rreth nesh */}
      <section className="section about" id="rreth-nesh" aria-labelledby="about-title">
        <div className="container about__grid">
          <AboutMedia />
          <div className="about__content">
            <div className="section-head">
              <Eyebrow>Rreth Nesh</Eyebrow>
              <SplitTitle className="section-title" id="about-title" text={'Infrastrukturë e ndërtuar\nme përgjegjësi'} />
            </div>
            <Reveal className="about__text" dir="right">
              <p className="about__lead">
                Ledioni Group është një kompani ndërtimi nga Kosova, e themeluar në vitin 2021 dhe e udhëhequr nga drejtoresha menaxhuese <strong>Lendita Kryeziu</strong>.
              </p>
              <p>
                E specializuar në ndërtimin dhe rehabilitimin e urave, kompania realizon edhe ndërtimin e rrugëve, objekteve banesore dhe afariste, ujësjellësve dhe kanalizimeve. Puna jonë mbështetet në planifikim të kujdesshëm, zbatim të saktë dhe komunikim të hapur me investitorin.
              </p>
            </Reveal>
            <StaggerGrid cols={2} className="values" step={0.18}>
              {values.map((v) => (
                <div className="values__item" key={v.title}>
                  <span className="values__icon">
                    <Icon name={v.icon} />
                  </span>
                  <div>
                    <h3 className="values__title">{v.title}</h3>
                    <p className="values__text">{v.text}</p>
                  </div>
                </div>
              ))}
            </StaggerGrid>
            <Reveal dir="right">
              <a className="link-arrow" href="#sherbimet">
                Zbuloni shërbimet tona <Icon name="arrowRight" size={18} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Shërbimet */}
      <section className="section section--alt services" id="sherbimet" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <Eyebrow>Shërbimet</Eyebrow>
              <SplitTitle className="section-title" id="services-title" text={'Gjithçka që i duhet\nnjë projekti ndërtimor'} />
            </div>
            <Reveal as="p" className="section-head-row__text" dir="right">
              Nga projektimi deri te punimet përfundimtare — me fokus të veçantë te urat dhe infrastruktura publike.
            </Reveal>
          </div>
          <StaggerGrid cols={3} className="services__grid" itemClassNames={services.map((s) => (s.featured ? 'is-featured' : ''))}>
            {services.map((s) => (
              <div className={`service-card${s.featured ? ' service-card--featured' : ''}`} key={s.id}>
                <div className="service-card__media">
                  <Picture
                    img={s.image}
                    widths={s.featured ? [640, 960, 1280] : [400, 600, 800]}
                    sizes={s.featured ? '(min-width: 1100px) 780px, 100vw' : '(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw'}
                    ratio={s.featured ? 0.66 : 0.62}
                  />
                </div>
                <div className="service-card__body">
                  <span className="service-card__icon">
                    <Icon name={s.icon} size={26} />
                  </span>
                  {s.featured && <p className="service-card__label">Specializimi ynë</p>}
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__text">{s.text}</p>
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Si punojmë */}
      <section className="section process" id="si-punojme" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head section-head--center">
            <Eyebrow center>Si Punojmë</Eyebrow>
            <SplitTitle className="section-title" id="process-title" text={'Një proces i qartë,\nnga ideja te dorëzimi'} />
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* Projektet */}
      <section className="section section--alt projects" id="projektet" aria-labelledby="projects-title">
        <div className="container">
          <ProjectsFilter projects={sortedProjects} />
          <p className="projects__note">Fotot e projekteve janë ilustruese.</p>
        </div>
      </section>

      {/* Pse ne */}
      <section className="section why" aria-labelledby="why-title">
        <div className="container why__grid">
          <div className="why__intro">
            <div className="section-head">
              <Eyebrow>Pse Ne?</Eyebrow>
              <SplitTitle className="section-title" id="why-title" text="Partner i besueshëm për infrastrukturën publike" />
              <Reveal as="p" className="section-lead" dir="left">
                Institucionet dhe investitorët na besojnë projekte ku cilësia dhe siguria nuk janë opsionale.
              </Reveal>
            </div>
            <Reveal dir="left" delay={0.2}>
              <a className="btn btn--dark" href="#kontakti">
                Kërkoni një ofertë <Icon name="arrowRight" size={18} />
              </a>
            </Reveal>
          </div>
          <StaggerGrid cols={2} className="why__list">
            {whyUs.map((w) => (
              <div className="why__item" key={w.title}>
                <span className="why__icon">
                  <Icon name={w.icon} size={28} />
                </span>
                <h3 className="why__title">{w.title}</h3>
                <p className="why__text">{w.text}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Partnerët */}
      <section className="partners" aria-labelledby="partners-title">
        <div className="container partners__inner">
          <Reveal as="h2" className="partners__title" id="partners-title" dir="left">
            Kemi bashkëpunuar me
          </Reveal>
          <StaggerGrid cols={3} className="partners__list" sides={false} step={0.18}>
            {partners.map((p) => (
              <span className="partners__item" key={p}>
                <Icon name="landmark" size={26} />
                <span>{p}</span>
              </span>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="pyetje" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div>
            <div className="section-head">
              <Eyebrow>Pyetje të Shpeshta</Eyebrow>
              <SplitTitle className="section-title" id="faq-title" text="Përgjigje për pyetjet më të zakonshme" />
              <Reveal as="p" className="section-lead" dir="left">
                Nuk e gjeni përgjigjen që kërkoni? Na kontaktoni dhe do t’ju përgjigjemi sa më shpejt.
              </Reveal>
            </div>
            <Reveal dir="left" delay={0.2}>
              <a className="link-arrow" href="#kontakti">
                Bëni një pyetje <Icon name="arrowRight" size={18} />
              </a>
            </Reveal>
          </div>
          <FaqList />
        </div>
      </section>

      <Cta />

      {/* Kontakti */}
      <section className="section section--alt contact" id="kontakti" aria-labelledby="contact-title">
        <div className="container">
          <div className="section-head section-head--center">
            <Eyebrow center>Kontakti</Eyebrow>
            <SplitTitle className="section-title" id="contact-title" text="Le të flasim për projektin tuaj" />
            <Reveal as="p" className="section-lead">
              Na shkruani dhe do t’ju kontaktojmë sa më shpejt. Mund të na telefononi ose të na shkruani edhe në WhatsApp.
            </Reveal>
          </div>
          <div className="contact__grid">
            <ContactForm />
            <Reveal as="aside" className="contact__info" dir="right">
              <ul className="contact__list">
                <li className="contact__item">
                  <span className="contact__icon">
                    <Icon name="pin" />
                  </span>
                  <div>
                    <p className="contact__label">Adresa</p>
                    <p className="contact__value">
                      {site.address.street}
                      <br />
                      {site.address.village}, {site.address.municipality}, {site.address.country}
                    </p>
                  </div>
                </li>
                <li className="contact__item">
                  <span className="contact__icon">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <p className="contact__label">Telefoni</p>
                    <p className="contact__value">
                      <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                    </p>
                  </div>
                </li>
              </ul>
              <a className="btn btn--whatsapp" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
                Na shkruani në WhatsApp
              </a>
              <div className="contact__map">
                <iframe
                  title={`Harta e lokacionit: ${site.mapQuery}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed&hl=sq`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = { alternates: { canonical: '/' } };
