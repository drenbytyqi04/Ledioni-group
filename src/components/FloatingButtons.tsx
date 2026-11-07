'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useState } from 'react';
import { site } from '@/data/site';
import { Icon, WhatsappIcon } from '@/lib/icons';
import { EASE } from './motion';

export function FloatingButtons() {
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();
  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 700));

  return (
    <>
      <motion.a
        className="whatsapp-float"
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener"
        aria-label="Na shkruani në WhatsApp"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.6 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.92 }}
      >
        <WhatsappIcon size={28} />
        <span className="whatsapp-float__label">Na shkruani</span>
      </motion.a>
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="to-top is-visible"
            type="button"
            aria-label="Kthehu lart"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            transition={{ duration: 0.4, ease: EASE }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="arrowUp" size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
