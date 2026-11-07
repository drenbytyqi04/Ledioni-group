'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import type { Img } from '@/data/images';
import { EASE } from './motion';
import { Picture } from './Picture';

type Crumb = { label: string; href?: string };

export function PageHero({ title, lead, eyebrow, crumbs, img }: { title: string; lead?: string; eyebrow?: ReactNode; crumbs: Crumb[]; img?: Img }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '25%']);
  const up = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease: EASE, delay } };

  return (
    <section className={`page-hero${img ? ' page-hero--image' : ''}`} ref={ref}>
      {img && (
        <>
          <motion.div className="page-hero__media" style={{ y }}>
            <motion.div style={{ height: '100%' }} initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 12, ease: EASE }}>
              <Picture img={img} widths={[768, 1280, 1920, 2560]} sizes="100vw" priority />
            </motion.div>
          </motion.div>
          <div className="page-hero__overlay" />
        </>
      )}
      <div className="container page-hero__inner">
        <motion.nav className="breadcrumbs" aria-label="Gjurma e navigimit" {...up(0.1)}>
          <ol>
            {crumbs.map((c, i) =>
              c.href ? (
                <li key={i}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ) : (
                <li key={i} aria-current="page">
                  {c.label}
                </li>
              )
            )}
          </ol>
        </motion.nav>
        {eyebrow && (
          <motion.p className="eyebrow eyebrow--light" {...up(0.2)}>
            <span className="eyebrow-line" />
            {eyebrow}
          </motion.p>
        )}
        <h1 className="page-hero__title">
          <span className="hero__line">
            <motion.span {...(reduce ? {} : { initial: { y: '110%' }, animate: { y: '0%' }, transition: { duration: 1.2, ease: EASE, delay: 0.3 } })}>{title}</motion.span>
          </span>
        </h1>
        {lead && (
          <motion.p className="page-hero__lead" {...up(0.55)}>
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
