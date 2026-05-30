import { SITE_URL } from '@/lib/constants/site';
import { client } from '@/lib/sanity';

export default async function sitemap() {
  const staticPages = [
    '',
    '/destinations',
    '/blog',
    '/travel-tips',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/search',
  ];

  interface Destination {
    slug: string;
    _updatedAt: string;
  }

  interface Blog {
    slug: string;
    publishedAt: string;
  }

  const destinations: Destination[] = await client.fetch(
    `*[_type == "destination" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );
  const blogs: Blog[] = await client.fetch(
    `*[_type == "blog" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
  );

  const now = new Date().toISOString();

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === '' || path === '/blog' ? 'weekly' as const : 'monthly' as const,
      priority: path === '' ? 1 : path === '/destinations' || path === '/blog' ? 0.9 : 0.7,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}`,
      lastModified: d._updatedAt || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogs.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.publishedAt || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
