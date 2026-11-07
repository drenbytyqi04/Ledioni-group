'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, type FormEvent } from 'react';
import { categories, faq, processSteps, type Project } from '@/data/content';
import { images } from '@/data/images';
import { site } from '@/data/site';
import { Icon } from '@/lib/icons';
import { EASE, EASE_INOUT, Eyebrow, Reveal, SplitTitle, VIEWPORT } from './motion';
import { Picture } from './Picture';
import { ProjectCard } from './ProjectCard';

/* ---------------- Hero ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%']);

  const up = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.2, ease: EASE, delay } };
  const line = (delay: number) =>
    reduce ? {} : { initial: { y: '110%' }, animate: { y: '0%' }, transition: { duration: 1.3, ease: EASE, delay } };

  return (
    <section className="hero" id="ballina" aria-labelledby="hero-title" ref={ref}>
      <motion.div className="hero__media" style={{ y }}>
        <motion.div style={{ height: '100%' }} initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: EASE }}>
          <Picture img={images.hero} widths={[768, 1280, 1920, 2560]} sizes="100vw" className="hero__img" priority />
        </motion.div>
      </motion.div>
      <div className="hero__overlay" />
      <motion.div className="container hero__inner" style={{ opacity: fade, y: lift }}>
        <motion.p className="eyebrow eyebrow--light hero__eyebrow" {...up(0.3)}>
          <motion.span className="eyebrow-line" style={{ originX: 1 }} {...(reduce ? {} : { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 1.2, ease: EASE, delay: 0.6 } })} />
          Arkitekturë &amp; Ndërtim
          <span className="hero__eyebrow-loc">
            <span className="hero__eyebrow-sep" /> Suharekë, Kosovë
          </span>
        </motion.p>
        <h1 className="hero__title" id="hero-title">
          <span className="hero__line">
            <motion.span {...line(0.35)}>Ndërtojmë ura.</motion.span>
          </span>{' '}
          <span className="hero__line hero__line--gold">
            <motion.span {...line(0.55)}>Ndërtojmë të ardhmen.</motion.span>
          </span>
        </h1>
        <motion.p className="hero__lead" {...up(0.85)}>
          Arkitekturë, ndërtim dhe infrastrukturë publike me cilësi dhe përgjegjësi.
        </motion.p>
        <motion.div className="hero__actions" {...up(1.05)}>
          <a className="btn btn--gold btn--lg" href="#projektet">
            Shiko Projektet <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--outline-light btn--lg" href="#kontakti">
            Na Kontaktoni
          </a>
        </motion.div>
      </motion.div>
      <motion.a className="hero__scroll" href="#statistika" aria-label="Lëviz poshtë" {...up(1.6)} style={{ x: '-50%' }}>
        <span>Lëviz</span>
        <span className="hero__scroll-line" />
      </motion.a>
    </section>
  );
}

/* ---------------- Rreth nesh: foto me perde të artë ---------------- */
export function AboutMedia() {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div className="about__media">
        <div className="about__frame" />
        <Picture img={images.about} widths={[480, 720, 1080]} sizes="(min-width: 1000px) 540px, 100vw" ratio={1.15} className="about__img" />
        <div className="about__badge">
          <span className="about__badge-year">2021</span>
          <span className="about__badge-text">
            Viti i<br />themelimit
          </span>
        </div>
      </div>
    );
  return (
    <motion.div className="about__media" initial="hidden" whileInView="shown" viewport={VIEWPORT}
      variants={{ hidden: { opacity: 0, x: -60, transition: { duration: 0.8 } }, shown: { opacity: 1, x: 0, transition: { duration: 1.4, ease: EASE } } }}>
      <motion.div className="about__frame" variants={{ hidden: { x: '-1.75rem', y: '-1.75rem', opacity: 0 }, shown: { x: 0, y: 0, opacity: 1, transition: { duration: 1.8, ease: EASE, delay: 1.5 } } }} />
      <Picture img={images.about} widths={[480, 720, 1080]} sizes="(min-width: 1000px) 540px, 100vw" ratio={1.15} className="about__img" />
      <motion.div className="about__curtain" style={{ originX: 1 }} variants={{ hidden: { scaleX: 1, transition: { duration: 0.6 } }, shown: { scaleX: 0, transition: { duration: 1.9, ease: EASE_INOUT, delay: 0.4 } } }} />
      <motion.div className="about__badge" variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE, delay: 2 } } }}>
        <span className="about__badge-year">2021</span>
        <span className="about__badge-text">
          Viti i<br />themelimit
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Si punojmë ---------------- */
export function ProcessSteps() {
  const reduce = useReducedMotion();
  return (
    <motion.ol className="process__list" initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      <motion.span
        className="process__line"
        aria-hidden="true"
        variants={reduce ? {} : { hidden: { scaleX: 0, scaleY: 0 }, shown: { scaleX: 1, scaleY: 1, transition: { duration: 2.8, ease: EASE, delay: 0.3 } } }}
      />
      {processSteps.map((s, i) => (
        <motion.li
          key={s.title}
          className="process__step"
          variants={reduce ? {} : { hidden: { opacity: 0, y: 40, transition: { duration: 0.6 } }, shown: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE, delay: 0.2 + i * 0.22 } } }}
        >
          <span className="process__num">0{i + 1}</span>
          <motion.span
            className="process__icon-wrap"
            variants={reduce ? {} : { hidden: { scale: 0.4, rotate: -45 }, shown: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 160, damping: 14, delay: 0.5 + i * 0.22 } } }}
          >
            <span className="process__icon">
              <Icon name={s.icon} size={28} />
            </span>
          </motion.span>
          <h3 className="process__title">{s.title}</h3>
          <p className="process__text">{s.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/* ---------------- Projektet me filtër ---------------- */
export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');
  const shown = projects.filter((p) => filter === 'all' || p.category === filter);
  const options: ['all' | Project['category'], string][] = [['all', 'Të gjitha'], ...(Object.entries(categories) as [Project['category'], string][])];
  return (
    <>
      <div className="section-head-row">
        <div className="section-head">
          <Eyebrow>Projektet</Eyebrow>
          <SplitTitle className="section-title" id="projects-title" text="Projekte publike të realizuara" />
        </div>
        <Reveal className="filters" dir="right" role="group" aria-label="Filtro projektet">
          {options.map(([k, label]) => (
            <button key={k} type="button" className={`filters__btn${filter === k ? ' is-active' : ''}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {filter === k && <motion.span layoutId="filter-pill" className="filters__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="filters__label">{label}</span>
            </button>
          ))}
        </Reveal>
      </div>
      <motion.div className="projects__grid" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Reveal dir={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'} delay={(i % 3) * 0.2} className="stagger-item">
                <ProjectCard p={p} />
              </Reveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ---------------- Pyetjet e shpeshta ---------------- */
export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Reveal className="faq__list" dir="right">
      {faq.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
            <h3 className="faq__h">
              <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{f.q}</span>
                <span className="faq__toggle" aria-hidden="true">
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }} style={{ display: 'grid' }}>
                    <Icon name="plus" size={20} />
                  </motion.span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="faq__a-wrap"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div className="faq__a">
                    <p>{f.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </Reveal>
  );
}

/* ---------------- CTA me paralaks ---------------- */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['-60px', '60px']);
  return (
    <section className="cta" aria-labelledby="cta-title" ref={ref}>
      <motion.div className="cta__media" style={{ y }}>
        <Picture img={images.cta} widths={[768, 1280, 1920]} sizes="100vw" />
      </motion.div>
      <div className="cta__overlay" />
      <Reveal className="container cta__inner" dir="zoom">
        <motion.span
          className="cta__line"
          aria-hidden="true"
          style={{ originY: 0 }}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
        />
        <SplitTitle className="cta__title" id="cta-title" text={'Keni një projekt në mendje?'} />
        <SplitTitle as="h3" className="cta__title cta__title--gold" text="Le ta ndërtojmë së bashku." delay={0.5} />
        <div className="cta__actions">
          <a className="btn btn--gold btn--lg" href="#kontakti">
            Na Kontaktoni <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--outline-light btn--lg" href={`tel:${site.phoneHref}`}>
            <Icon name="phone" size={18} /> {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Formulari i kontaktit ---------------- */
type Errors = Partial<Record<'emri' | 'email' | 'telefoni' | 'mesazhi' | 'pelqimi', string>>;

const validate = (d: FormData): Errors => {
  const e: Errors = {};
  const v = (k: string) => String(d.get(k) ?? '').trim();
  if (v('emri').length < 3) e.emri = 'Ju lutemi shkruani emrin dhe mbiemrin.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) e.email = 'Ju lutemi shkruani një adresë email të vlefshme.';
  if (v('telefoni') && !/^[0-9 +()\-]{6,20}$/.test(v('telefoni'))) e.telefoni = 'Numri i telefonit nuk është i vlefshëm.';
  if (v('mesazhi').length < 10) e.mesazhi = 'Mesazhi duhet të ketë të paktën 10 karaktere.';
  if (!d.get('pelqimi')) e.pelqimi = 'Ju lutemi pranoni Politikën e Privatësisë.';
  return e;
};

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<null | { ok: boolean; title: string; text: string }>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('adresa-web')) return; // spam
    const errs = validate(data);
    setErrors(errs);
    setStatus(null);
    const first = Object.keys(errs)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!site.formEndpoint) {
      const text =
        `Përshëndetje, ju shkruaj nga faqja e Ledioni Group.\n\nEmri: ${data.get('emri')}\nEmail: ${data.get('email')}\nTelefoni: ${data.get('telefoni') || '-'}\n\n${data.get('mesazhi')}`;
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus({ ok: true, title: 'Po hapet WhatsApp.', text: 'Mesazhi juaj është i plotësuar — mjafton ta dërgoni. Nëse WhatsApp nuk hapet, na telefononi direkt.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ ok: true, title: 'Faleminderit! Mesazhi juaj u dërgua.', text: 'Do t’ju kontaktojmë sa më shpejt.' });
    } catch {
      setStatus({ ok: false, title: 'Mesazhi nuk u dërgua.', text: 'Ju lutemi provoni përsëri ose na kontaktoni direkt në telefon ose WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

  const recheck = (name: keyof Errors) => {
    if (!errors[name] || !formRef.current) return;
    const errs = validate(new FormData(formRef.current));
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const field = (name: keyof Errors) => ({
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': `f-${name}-err`,
    onChange: () => recheck(name),
  });
  const err = (name: keyof Errors) => (
    <AnimatePresence>
      {errors[name] && (
        <motion.p className="field__error" id={`f-${name}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <Reveal as="div" dir="left">
      <form className="form" name="kontakt" ref={formRef} onSubmit={onSubmit} noValidate>
        <p className="form__hp" aria-hidden="true">
          <label>
            Mos e plotësoni këtë fushë: <input name="adresa-web" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="form__row">
          <div className={`field${errors.emri ? ' has-error' : ''}`}>
            <label className="field__label" htmlFor="f-emri">
              Emri dhe Mbiemri <span aria-hidden="true">*</span>
            </label>
            <input className="field__input" id="f-emri" type="text" autoComplete="name" required placeholder="p.sh. Arben Krasniqi" {...field('emri')} />
            {err('emri')}
          </div>
          <div className={`field${errors.telefoni ? ' has-error' : ''}`}>
            <label className="field__label" htmlFor="f-telefoni">
              Telefoni
            </label>
            <input className="field__input" id="f-telefoni" type="tel" autoComplete="tel" inputMode="tel" placeholder="+383 4X XXX XXX" {...field('telefoni')} />
            {err('telefoni')}
          </div>
        </div>
        <div className={`field${errors.email ? ' has-error' : ''}`}>
          <label className="field__label" htmlFor="f-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input className="field__input" id="f-email" type="email" autoComplete="email" required placeholder="emri@shembull.com" {...field('email')} />
          {err('email')}
        </div>
        <div className={`field${errors.mesazhi ? ' has-error' : ''}`}>
          <label className="field__label" htmlFor="f-mesazhi">
            Mesazhi <span aria-hidden="true">*</span>
          </label>
          <textarea className="field__input field__input--area" id="f-mesazhi" rows={5} required placeholder="Përshkruani shkurt projektin, lokacionin dhe afatin e dëshiruar…" {...field('mesazhi')} />
          {err('mesazhi')}
        </div>
        <div className={`field field--check${errors.pelqimi ? ' has-error' : ''}`}>
          <input className="check" id="f-pelqimi" type="checkbox" value="Po" required {...field('pelqimi')} />
          <label htmlFor="f-pelqimi">
            Pajtohem që të dhënat e mia të përdoren për t’u kontaktuar, sipas{' '}
            <a href="/politika-e-privatesise/" target="_blank">
              Politikës së Privatësisë
            </a>
            . <span aria-hidden="true">*</span>
          </label>
          {err('pelqimi')}
        </div>
        <div className="form__foot">
          <motion.button className={`btn btn--gold btn--lg form__submit${loading ? ' is-loading' : ''}`} type="submit" disabled={loading} whileTap={{ scale: 0.97 }}>
            <span>{loading ? 'Duke u dërguar…' : 'Dërgo Mesazhin'}</span>
            <Icon name="arrowRight" size={18} />
          </motion.button>
          <p className="form__required">
            <span aria-hidden="true">*</span> Fushat e detyrueshme
          </p>
        </div>
        <div className="form__status" role="status" aria-live="polite">
          <AnimatePresence>
            {status && (
              <motion.div
                className={`form__alert form__alert--${status.ok ? 'ok' : 'err'}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div>
                  <strong>{status.title}</strong>
                  <span>{status.text}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Reveal>
  );
}
