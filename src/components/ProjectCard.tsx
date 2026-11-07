import { categories, type Project } from '@/data/content';
import { Icon } from '@/lib/icons';
import { Picture } from './Picture';

export function ProjectCard({ p, headingLevel = 3 }: { p: Project; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="project-card" data-category={p.category}>
      <a className="project-card__link" href={`/projektet/${p.slug}/`}>
        <div className="project-card__media">
          <Picture img={p.image} widths={[480, 720, 960]} sizes="(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw" ratio={0.72} />
          <span className="project-card__tag">{categories[p.category]}</span>
        </div>
        <div className="project-card__body">
          <p className="project-card__meta">
            <Icon name="pin" size={16} /> {p.location} <span className="dot" /> {p.year}
          </p>
          <H className="project-card__title">{p.title}</H>
          <p className="project-card__text">{p.summary}</p>
          <span className="project-card__more">
            Shiko projektin <Icon name="arrowRight" size={18} />
          </span>
        </div>
      </a>
    </article>
  );
}
