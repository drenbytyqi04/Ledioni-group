import type { MetadataRoute } from 'next';
import { projects } from '@/data/content';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projektet/${p.slug}/`, lastModified: now, priority: 0.7 })),
    { url: `${site.url}/politika-e-privatesise/`, lastModified: now, priority: 0.3 },
  ];
}
