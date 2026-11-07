'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { imgUrl, srcset, type Img } from '@/data/images';
import { Icon } from '@/lib/icons';
import { EASE, Reveal } from './motion';

const isWide = (i: number) => i % 4 === 0 || i % 4 === 3;

export function Gallery({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (index === null) return;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [index, close, go]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="gallery">
        {images.map((g, i) => (
          <Reveal as="li" key={i} className="gallery__item" dir="zoom" delay={(i % 3) * 0.15}>
            <a
              className="gallery__link"
              href={imgUrl(g, 2000, undefined, 82)}
              onClick={(e) => {
                e.preventDefault();
                open(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl(g, 900, isWide(i) ? 450 : 765)}
                srcSet={srcset(g, [480, 900, 1300], isWide(i) ? 0.5 : 0.85)}
                sizes={isWide(i) ? '(min-width: 900px) 66vw, 100vw' : '(min-width: 900px) 33vw, 50vw'}
                alt={g.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="gallery__zoom">
                <Icon name="zoom" size={22} />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Shikuesi i fotove"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <button ref={closeRef} className="lightbox__close" type="button" aria-label="Mbyll" onClick={close}>
              <Icon name="close" size={26} />
            </button>
            <button className="lightbox__nav lightbox__nav--prev" type="button" aria-label="Fotoja e mëparshme" onClick={() => go(-1)}>
              <Icon name="arrowLeft" size={26} />
            </button>
            <figure className="lightbox__figure">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={index}
                  src={imgUrl(current, 2000, undefined, 82)}
                  alt={current.alt}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -80 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(1);
                    else if (info.offset.x > 70) go(-1);
                  }}
                />
              </AnimatePresence>
              <figcaption>
                {current.alt}
                {current.author ? ` — Foto ilustruese: ${current.author} / Unsplash` : ''} ({index + 1} / {images.length})
              </figcaption>
            </figure>
            <button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Fotoja tjetër" onClick={() => go(1)}>
              <Icon name="arrowRight" size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
