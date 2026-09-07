/**
 * Related content utilities for internal linking between
 * destination pages and blog posts (SEO cross-linking).
 */

import { getAllBlogPosts } from '@/lib/blog';
import type { Blog } from '@/types';

interface RelatedBlogResult {
  title: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string;
}

/**
 * Finds blog posts related to a destination by matching the destination
 * name or country against blog titles and descriptions.
 *
 * Returns up to `limit` matching blog posts, sorted by relevance.
 */
export async function getRelatedBlogPosts(
  destinationName: string,
  destinationCountry: string,
  limit = 3
): Promise<RelatedBlogResult[]> {
  let posts: Blog[] = [];
  try {
    posts = await getAllBlogPosts();
  } catch {
    return [];
  }

  if (!Array.isArray(posts) || posts.length === 0) return [];

  const nameLower = destinationName.toLowerCase();
  const countryLower = destinationCountry.toLowerCase();

  // Score each blog post by how relevant it is to this destination
  const scored = posts
    .map((post) => {
      let score = 0;
      const titleLower = (post.title || '').toLowerCase();
      const descLower = (post.shortDescription || '').toLowerCase();

      // Strong match: destination name appears in title
      if (titleLower.includes(nameLower)) score += 10;
      // Medium match: destination name appears in description
      if (descLower.includes(nameLower)) score += 5;
      // Weaker match: country name appears in title
      if (titleLower.includes(countryLower)) score += 3;
      // Weakest match: country name appears in description
      if (descLower.includes(countryLower)) score += 1;

      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ post }) => ({
    title: post.title,
    slug: post.slug?.current || '',
    shortDescription: post.shortDescription,
    imageUrl: post.mainImage?.asset?.url,
  }));
}
