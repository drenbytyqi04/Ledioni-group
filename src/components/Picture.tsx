import { imgUrl, srcset, type Img } from '@/data/images';

/** Foto responsive nga Unsplash (ose lokale), me srcset dhe ngarkim të vonuar. */
export function Picture({
  img,
  widths,
  sizes,
  ratio,
  className,
  priority = false,
}: {
  img: Img;
  widths: number[];
  sizes: string;
  ratio?: number;
  className?: string;
  priority?: boolean;
}) {
  const w = widths[1] ?? widths[0];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={imgUrl(img, w, ratio ? Math.round(w * ratio) : undefined)}
      srcSet={srcset(img, widths, ratio) || undefined}
      sizes={sizes}
      alt={img.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
