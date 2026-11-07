import { services } from '@/data/content';
import { navItems } from '@/data/nav';
import { site } from '@/data/site';
import { Icon } from '@/lib/icons';
import { Reveal } from './motion';

const socialNames = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn' } as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <Reveal className="site-footer__brand" dir="left">
            <a href="/" aria-label="Ledioni Group — Ballina">
              <img className="site-footer__logo" src="/logo-light.svg" alt="Ledioni Group — Architecture & Construction" width={190} height={148} loading="lazy" decoding="async" />
            </a>
            <p>Kompani ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave dhe në infrastrukturën publike.</p>
            <div className="site-footer__social">
              {(Object.keys(site.social) as (keyof typeof socialNames)[]).map((k) =>
                site.social[k] ? (
                  <a key={k} className="social" href={site.social[k]} target="_blank" rel="noopener" aria-label={socialNames[k]}>
                    <Icon name={k} size={18} />
                  </a>
                ) : (
                  <span key={k} className="social social--soon" title={`${socialNames[k]} — së shpejti`} aria-label={`${socialNames[k]} — së shpejti`}>
                    <Icon name={k} size={18} />
                  </span>
                )
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="site-footer__title">Navigimi</h2>
            <ul className="site-footer__links">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="/#pyetje">Pyetje të Shpeshta</a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="site-footer__title">Shërbimet</h2>
            <ul className="site-footer__links">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href="/#sherbimet">{s.short || s.title}</a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} dir="right">
            <h2 className="site-footer__title">Kontakti</h2>
            <ul className="site-footer__contact">
              <li>
                <Icon name="pin" size={18} />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.village}, {site.address.municipality}, {site.address.country}
                </span>
              </li>
              <li>
                <Icon name="phone" size={18} />
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {year} {site.legalName} <span className="sep">|</span> NUI: {site.nui} <span className="sep">|</span> Të gjitha të drejtat e rezervuara.
          </p>
          <p>
            <a href="/politika-e-privatesise/">Politika e Privatësisë</a> <span className="sep">|</span> Fotot:{' '}
            <a href="https://unsplash.com/?utm_source=ledioni_group&utm_medium=referral" target="_blank" rel="noopener">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
