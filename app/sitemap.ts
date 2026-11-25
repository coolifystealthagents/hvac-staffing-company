import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { blogPosts, researchPosts } from '@/lib/content';

const updated = (date: string) => new Date(`${date}T00:00:00.000Z`);
const editorialTemplateUpdatedAt = updated('2026-11-24');
const latestEditorialUpdate = (publishedAt: string) => {
  const contentDate = updated(publishedAt);
  return contentDate > editorialTemplateUpdatedAt ? contentDate : editorialTemplateUpdatedAt;
};
const staticRoutes = [
  { path: '/', lastModified: '2026-11-24' },
  { path: '/about', lastModified: '2026-11-17' },
  { path: '/services', lastModified: '2026-11-24' },
  { path: '/contact-us', lastModified: '2026-11-25' },
  { path: '/blog', lastModified: '2026-11-25' },
  { path: '/research', lastModified: '2026-11-25' },
  { path: '/privacy', lastModified: '2026-10-19' },
  { path: '/terms', lastModified: '2026-10-19' },
];
const updatedServiceSlugs = new Set(['installation-coordination', 'service-agreement-administration']);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return [
    ...staticRoutes.map(({ path, lastModified }) => ({ url: `${base}${path}`, lastModified: updated(lastModified) })),
    ...site.services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: updated(updatedServiceSlugs.has(service.slug) ? '2026-11-25' : '2026-11-24'),
    })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: latestEditorialUpdate(post.publishedAt) })),
    ...researchPosts.map((post) => ({ url: `${base}/research/${post.slug}`, lastModified: latestEditorialUpdate(post.publishedAt) })),
  ];
}
