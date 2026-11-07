'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE } from './motion';
import type { LogoParts } from '@/lib/logo';

/** Logoja horizontale; çatia dhe baza vizatohen, shtyllat ngrihen, emri shfaqet. */
export function LogoHorizontal({ parts, animate = true }: { parts: LogoParts; animate?: boolean }) {
  const reduce = useReducedMotion();
  const play = animate && !reduce;
  const draw = (delay: number) =>
    play ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.3, ease: EASE, delay } } : {};
  const rise = (delay: number) =>
    play ? { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { duration: 0.9, ease: EASE, delay } } : {};
  return (
    <span className="logo" aria-hidden="true">
      <svg className="logo__mark" viewBox="130 8 140 104" focusable="false">
        <motion.polyline points="140,70 200,26 260,70" fill="none" stroke="#B8912F" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" {...draw(0.15)} />
        <motion.rect x="168" y="12" width="10" height="94" fill="currentColor" style={{ originY: 1 }} {...rise(0.75)} />
        <motion.rect x="222" y="62" width="10" height="44" fill="currentColor" style={{ originY: 1 }} {...rise(0.9)} />
        <motion.line x1="136" y1="106" x2="264" y2="106" stroke="#B8912F" strokeWidth="7" {...draw(0.55)} />
      </svg>
      <motion.svg
        className="logo__word"
        viewBox="48 134 304 72"
        focusable="false"
        {...(play ? { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1, ease: EASE, delay: 0.9 } } : {})}
      >
        <path d={parts.ledioni} fill="currentColor" />
        <line x1="50" y1="196" x2="148" y2="196" stroke="#B8912F" strokeWidth="1.5" />
        <path d={parts.group} fill="#B8912F" />
        <line x1="252" y1="196" x2="350" y2="196" stroke="#B8912F" strokeWidth="1.5" />
      </motion.svg>
    </span>
  );
}

/** Vetëm ikona (shtëpia) — për faqet 404 / faleminderit. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="130 8 140 104" aria-hidden="true" focusable="false">
      <polyline points="140,70 200,26 260,70" fill="none" stroke="#B8912F" strokeWidth="8" strokeLinejoin="miter" strokeLinecap="square" />
      <rect x="168" y="12" width="10" height="94" fill="currentColor" />
      <rect x="222" y="62" width="10" height="44" fill="currentColor" />
      <line x1="136" y1="106" x2="264" y2="106" stroke="#B8912F" strokeWidth="7" />
    </svg>
  );
}
