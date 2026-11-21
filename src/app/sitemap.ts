import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants/site';
import { client } from '@/lib/sanity';
import { getFlightRoutes } from '@/lib/flight-routes';

export const revalidate = 3600;

// /search is left out on purpose: it is a thin utility page, not a landing page.
const STATIC_PAGES: { path: string; priority: number; weekly?: boolean }[] = [
  { path: '', priority: 1, weekly: true },
  { path: '/destinations', priority: 0.9 },
  { path: '/blog', priority: 0.9, weekly: true },
  { path: '/umrah', priority: 0.9, weekly: true },
  { path: '/flights', priority: 0.7 },
  { path: '/travel-tips', priority: 0.7 },
  { path: '/about', priority: 0.5 },
  { path: '/contact', priority: 0.5 },
  { path: '/faq', priority: 0.6 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
];

interface SitemapDoc {
  slug: string;
  lastModified?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Same filters as the listing pages, so every published page is included.
  // lastModified uses the real edit time; publishedAt alone went stale and
  // was missing on some posts, which made them report "modified just now".
  const [destinations, blogs, flightRoutes] = await Promise.all([
    client.fetch<SitemapDoc[]>(
      `*[_type == "destination" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, "lastModified": _updatedAt }`
    ),
    client.fetch<SitemapDoc[]>(
      `*[_type == "blog" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, "lastModified": coalesce(_updatedAt, publishedAt) }`
    ),
    getFlightRoutes(),
  ]);

  const newestBlog = blogs
    .map((b) => b.lastModified)
    .filter(Boolean)
    .sort()
    .at(-1);
  const now = new Date().toISOString();
  const newest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1);
  // Listing pages change when their content does. Other static pages get no
  // lastmod: stamping them with the request time on every fetch teaches
  // Google to ignore our lastmod values.
  const LISTING_LASTMOD: Record<string, string | undefined> = {
    '': newestBlog,
    '/blog': newestBlog,
    '/umrah': newestBlog,
    '/destinations': newest(destinations.map((d) => d.lastModified)),
    '/flights': newest(flightRoutes.map((r) => r.updatedAt)),
  };

  return [
    ...STATIC_PAGES.map(({ path, priority, weekly }) => ({
      url: `${SITE_URL}${path}`,
      ...(LISTING_LASTMOD[path] ? { lastModified: LISTING_LASTMOD[path] } : {}),
      changeFrequency: weekly ? ('weekly' as const) : ('monthly' as const),
      priority,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}`,
      lastModified: d.lastModified || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogs.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.lastModified || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...flightRoutes.map((r) => ({
      url: `${SITE_URL}/flights/${r.slug}`,
      lastModified: r.updatedAt || now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
