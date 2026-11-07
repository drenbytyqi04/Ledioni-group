'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { LogoMark } from './Logo';
import { EASE } from './motion';

/** Faqe e thjeshtë statusi (404, faleminderit) me hyrje të animuar. */
export function StatusPage({ code, eyebrow, title, text, actions }: { code?: string; eyebrow?: string; title: string; text: string; actions: ReactNode }) {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  };
  return (
    <section className="status-page">
      <motion.div
        className="container status-page__inner"
        initial={reduce ? false : 'hidden'}
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
      >
        <motion.div variants={item}>
          <LogoMark className="status-page__mark" />
        </motion.div>
        {code && (
          <motion.p className="status-page__code" aria-hidden="true" variants={{ hidden: { opacity: 0, scale: 0.8 }, shown: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12 } } }}>
            {code}
          </motion.p>
        )}
        {eyebrow && (
          <motion.p className="eyebrow" variants={item}>
            <span className="eyebrow-line" />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 className="status-page__title" variants={item}>
          {title}
        </motion.h1>
        <motion.p className="status-page__text" variants={item}>
          {text}
        </motion.p>
        <motion.div className="status-page__actions" variants={item}>
          {actions}
        </motion.div>
      </motion.div>
    </section>
  );
}
