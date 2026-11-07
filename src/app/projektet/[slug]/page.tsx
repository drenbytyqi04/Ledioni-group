import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/Gallery';
import { Eyebrow, Reveal, SplitTitle, StaggerGrid } from '@/components/motion';
import { PageHero } from '@/components/PageHero';
import { ProjectCard } from '@/components/ProjectCard';
import { categories, projects } from '@/data/content';
import { site } from '@/data/site';
import { Icon } from '@/lib/icons';

const sorted = [...projects].sort((a, b) => b.year - a.year);

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.title} — ${p.location} ${p.year}`;
  const description = `${p.summary} Projekt i realizuar nga Ledioni Group SH.P.K. për ${p.municipality} në vitin ${p.year}.`;
  return {
    title,
    description,
    alternates: { canonical: `/projektet/${p.slug}/` },
    openGraph: { title, description, url: `/projektet/${p.slug}/` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = sorted.findIndex((o) => o.slug === p.slug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];
  const others = sorted.filter((o) => o.slug !== p.slug).slice(0, 3);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ballina', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Projektet', item: `${site.url}/#projektet` },
      { '@type': 'ListItem', position: 3, name: p.title, item: `${site.url}/projektet/${p.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHero
        title={p.title}
        lead={p.municipality}
        eyebrow={
          <>
            {categories[p.category]} <span className="hero__eyebrow-sep" /> {p.year}
          </>
        }
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Projektet', href: '/#projektet' }, { label: p.title }]}
        img={p.image}
      />

      <section className="section project">
        <div className="container project__grid">
          <Reveal className="project__content" dir="left">
            <Eyebrow>Përshkrimi i projektit</Eyebrow>
            <h2 className="section-title section-title--sm">
              {p.work} — {p.location}
            </h2>
            {p.description.map((d) => (
              <p key={d}>{d}</p>
            ))}
            {p.image.unsplash && (
              <p className="project__credit">
                Foto ilustruese:{' '}
                <a href={p.image.authorUrl} target="_blank" rel="noopener">
                  {p.image.author}
                </a>{' '}
                /{' '}
                <a href="https://unsplash.com/?utm_source=ledioni_group&utm_medium=referral" target="_blank" rel="noopener">
                  Unsplash
                </a>
              </p>
            )}
          </Reveal>
          <Reveal as="aside" className="project__facts" dir="right" aria-label="Të dhënat e projektit">
            <dl>
              {[
                ['landmark', 'Klienti', p.municipality],
                ['pin', 'Lokacioni', `${p.location}, Kosovë`],
                ['calendar', 'Viti', String(p.year)],
                ['tool', 'Lloji i punimeve', p.work],
                ['bridge', 'Kategoria', categories[p.category]],
              ].map(([ic, k, v]) => (
                <div key={k}>
                  <dt>
                    <Icon name={ic} size={20} /> {k}
                  </dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a className="btn btn--gold btn--block" href="/#kontakti">
              Diskutoni projektin tuaj <Icon name="arrowRight" size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt gallery-section" aria-labelledby="gallery-title">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <Eyebrow>Galeria</Eyebrow>
              <SplitTitle className="section-title section-title--sm" id="gallery-title" text="Fotot e projektit" />
            </div>
            <Reveal as="p" className="section-head-row__text" dir="right">
              Fotot janë ilustruese dhe do të zëvendësohen me fotot reale të projektit.
            </Reveal>
          </div>
          <Gallery images={[p.image, ...p.gallery]} />
          <Reveal as="nav" className="project-nav" aria-label="Projektet e tjera">
            <a className="project-nav__link" href={`/projektet/${prev.slug}/`}>
              <Icon name="arrowLeft" size={18} />
              <span>
                <small>Projekti i mëparshëm</small>
                {prev.title} · {prev.year}
              </span>
            </a>
            <a className="project-nav__link project-nav__link--next" href={`/projektet/${next.slug}/`}>
              <span>
                <small>Projekti tjetër</small>
                {next.title} · {next.year}
              </span>
              <Icon name="arrowRight" size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div className="section-head">
              <Eyebrow>Portofoli</Eyebrow>
              <SplitTitle className="section-title section-title--sm" text="Projekte të tjera" />
            </div>
            <Reveal dir="right">
              <a className="link-arrow" href="/#projektet">
                Të gjitha projektet <Icon name="arrowRight" size={18} />
              </a>
            </Reveal>
          </div>
          <StaggerGrid cols={3} as="div" className="projects__grid">
            {others.map((o) => (
              <ProjectCard key={o.slug} p={o} />
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
