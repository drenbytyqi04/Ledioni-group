'use client';

// Blloqet bazë të animacioneve me Motion (ish Framer Motion).
// Të gjitha animacionet "hyjnë" kur elementi del në ekran dhe "dalin" kur largohet
// (slide in / slide out), dhe respektojnë cilësimin "reduce motion" të pajisjes.
import { animate, motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { Children, createElement, useEffect, useRef, useState, type ReactNode } from 'react';

export const EASE = [0.22, 0.61, 0.36, 1] as const;
export const EASE_INOUT = [0.77, 0, 0.18, 1] as const;

/** Zona e ekranit ku elementi konsiderohet "në pamje". */
export const VIEWPORT = { once: false, amount: 0.12, margin: '-6% 0px -10% 0px' } as const;

type Dir = 'up' | 'left' | 'right' | 'zoom' | 'fade';

const offset = (dir: Dir, distance: number) => {
  switch (dir) {
    case 'left':
      return { x: -distance, y: 0, scale: 1 };
    case 'right':
      return { x: distance, y: 0, scale: 1 };
    case 'zoom':
      return { x: 0, y: 0, scale: 0.88 };
    case 'fade':
      return { x: 0, y: 0, scale: 1 };
    default:
      return { x: 0, y: distance * 0.62, scale: 1 };
  }
};

function useDistance() {
  const [d, setD] = useState(90);
  useEffect(() => {
    const update = () => setD(window.innerWidth < 700 ? 40 : 90);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return d;
}

type RevealProps = {
  children?: ReactNode;
  as?: keyof typeof motion & string;
  dir?: Dir;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  [key: string]: unknown;
};

/** Element që rrëshqet brenda/jashtë sipas scroll-it. */
export function Reveal({ children, as = 'div', dir = 'up', delay = 0, duration = 1.5, className, once = false, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const distance = useDistance();
  const from = offset(dir, distance);
  const variants: Variants = {
    hidden: { opacity: 0, ...from, transition: { duration: duration * 0.6, ease: EASE } },
    shown: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration, ease: EASE, delay } },
  };
  const Tag = (motion as unknown as Record<string, typeof motion.div>)[as];
  if (reduce) return createElement(as, { className, ...rest }, children);
  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="shown" viewport={{ ...VIEWPORT, once }} {...rest}>
      {children}
    </Tag>
  );
}

/** Titull që shfaqet fjalë pas fjale (secila fjalë ngjitet nga poshtë). "\n" = rresht i ri. */
export function SplitTitle({ text, as = 'h2', className, id, delay = 0.15 }: { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; id?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const lines = text.split('\n');
  if (reduce) return createElement(as, { className, id }, lines.map((l, i) => [i ? <br key={'b' + i} /> : null, l]));
  let index = 0;
  const Tag = motion[as];
  return (
    <Tag className={className} id={id} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {lines.map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(' ').map((word, wi) => {
            const i = index++;
            return (
              <span key={wi}>
                {wi > 0 && ' '}
                <span className="w">
                  <motion.span
                    variants={{
                      hidden: { y: '105%', transition: { duration: 0.6, ease: EASE } },
                      shown: { y: '0%', transition: { duration: 1.4, ease: EASE, delay: delay + i * 0.08 } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Etiketa e vogël (eyebrow) me vijë ari që vizatohet. */
export function Eyebrow({ children, center = false, light = false, className = '' }: { children: ReactNode; center?: boolean; light?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const line = (origin: 'left' | 'right', key: string) =>
    reduce ? (
      <span key={key} className="eyebrow-line" />
    ) : (
      <motion.span
        key={key}
        className="eyebrow-line"
        style={{ originX: origin === 'left' ? 0 : 1 }}
        variants={{ hidden: { scaleX: 0, transition: { duration: 0.5 } }, shown: { scaleX: 1, transition: { duration: 1.4, ease: EASE, delay: 0.3 } } }}
      />
    );
  return (
    <motion.p className={`eyebrow${light ? ' eyebrow--light' : ''}${className ? ' ' + className : ''}`} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {line('right', 'a')}
      <motion.span variants={{ hidden: { opacity: 0, x: -10 }, shown: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE, delay: 0.2 } } }}>{children}</motion.span>
      {center && line('left', 'b')}
    </motion.p>
  );
}

/** Rrjetë ku fëmijët hyjnë njëri pas tjetrit; kolona e majtë nga e majta, e djathta nga e djathta. */
export function StaggerGrid({ children, cols, as = 'ul', className, sides = true, step = 0.2, itemClassNames = [] }: { children: ReactNode; cols: number; as?: 'ul' | 'div' | 'ol'; className?: string; sides?: boolean; step?: number; itemClassNames?: string[] }) {
  const items = Children.toArray(children);
  return createElement(
    as,
    { className },
    items.map((child, i) => {
      const col = i % cols;
      const dir: Dir = !sides ? 'up' : cols === 2 ? (col ? 'right' : 'left') : col === 0 ? 'left' : col === cols - 1 ? 'right' : 'up';
      return (
        <Reveal key={i} as={as === 'div' ? 'div' : 'li'} dir={dir} delay={col * step} className={`stagger-item${itemClassNames[i] ? ' ' + itemClassNames[i] : ''}`}>
          {child}
        </Reveal>
      );
    })
  );
}

/** Numër që numëron deri te vlera kur shfaqet. */
export function Counter({ value, from = 0, duration = 2.6 }: { value: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = String(value);
      return;
    }
    if (!inView) {
      el.textContent = String(from);
      return;
    }
    const controls = animate(from, value, { duration, ease: EASE, onUpdate: (v) => (el.textContent = String(Math.round(v))) });
    return () => controls.stop();
  }, [inView, value, from, duration, reduce]);
  return (
    <span ref={ref} className="stats__num">
      {value}
    </span>
  );
}
