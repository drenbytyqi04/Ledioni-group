'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/nav';
import { site } from '@/data/site';
import { Icon, WhatsappIcon } from '@/lib/icons';
import type { LogoParts } from '@/lib/logo';
import { LogoHorizontal } from './Logo';
import { EASE, EASE_INOUT } from './motion';

export function Header({ logo }: { logo: LogoParts }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const transparentTop = isHome || pathname.startsWith('/projektet/');
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('ballina');
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));
  useEffect(() => setScrolled(window.scrollY > 40), []);

  // Seksioni aktiv në menu (vetëm në ballinë)
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Menyja: bllokon scroll-in, Esc e mbyll, fokusi brenda panelit
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const panel = document.querySelector('.mobile-menu__panel');
        const f = panel ? Array.from(panel.querySelectorAll<HTMLElement>('a, button')) : [];
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    const onResize = () => window.innerWidth > 1100 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) toggleRef.current?.focus({ preventScroll: true });
  };

  const solid = !transparentTop || scrolled;

  return (
    <>
      <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />
      <header className={`site-header${solid ? ' is-solid' : ''}${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <a className="site-header__brand" href="/" aria-label="Ledioni Group — Ballina">
            <LogoHorizontal parts={logo} />
          </a>
          <nav className="nav" aria-label="Menyja kryesore">
            <ul className="nav__list">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={reduce ? false : { opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.4 + i * 0.07 }}
                >
                  <a className={`nav__link${isHome && active === n.id ? ' is-active' : ''}`} href={`/#${n.id}`} aria-current={isHome && active === n.id ? 'location' : undefined}>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.a
            className="btn btn--gold btn--sm site-header__cta"
            href="/#kontakti"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          >
            Na Kontaktoni
          </motion.a>
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? 'Mbyll menynë' : 'Hap menynë'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" id="mobile-menu" initial="closed" animate="open" exit="closed">
            <motion.div
              className="mobile-menu__overlay"
              onClick={() => close()}
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.45, ease: EASE }}
            />
            <motion.div
              className="mobile-menu__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menyja"
              variants={{ closed: { x: '105%' }, open: { x: 0 } }}
              transition={{ duration: 0.6, ease: EASE_INOUT }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={(_, info) => (info.offset.x > 80 || info.velocity.x > 500) && close(false)}
            >
              <div className="mobile-menu__head">
                <img className="mobile-menu__logo" src="/logo-light.svg" alt="Ledioni Group" width={88} height={69} />
                <motion.button
                  ref={closeRef}
                  className="mobile-menu__close"
                  type="button"
                  aria-label="Mbyll menynë"
                  onClick={() => close()}
                  variants={{ closed: { rotate: -90, opacity: 0 }, open: { rotate: 0, opacity: 1 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                >
                  <Icon name="close" size={24} />
                </motion.button>
              </div>
              <nav aria-label="Menyja në celular">
                <motion.ul
                  className="mobile-menu__list"
                  variants={{ open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } }, closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } }}
                >
                  {navItems.map((n, i) => (
                    <motion.li key={n.id} variants={{ closed: { opacity: 0, x: 40 }, open: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: EASE }}>
                      <a className={isHome && active === n.id ? 'is-active' : ''} href={`/#${n.id}`} onClick={() => close(false)}>
                        <span className="mobile-menu__num">0{i + 1}</span>
                        <span className="mobile-menu__label">{n.label}</span>
                        <Icon name="arrowRight" size={20} />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
              <motion.div
                className="mobile-menu__foot"
                variants={{ closed: { opacity: 0, y: 20 }, open: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              >
                <a className="btn btn--gold btn--block" href="/#kontakti" onClick={() => close(false)}>
                  Na Kontaktoni <Icon name="arrowRight" size={18} />
                </a>
                <div className="mobile-menu__quick">
                  <a href={`tel:${site.phoneHref}`}>
                    <Icon name="phone" size={18} />
                    <span>Telefono</span>
                  </a>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
                    <WhatsappIcon size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <p className="mobile-menu__address">
                  <Icon name="pin" size={16} /> {site.address.village}, {site.address.municipality}, {site.address.country}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
