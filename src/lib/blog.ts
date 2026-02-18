/**
 * Unified blog data: Sanity + static fallback.
 */

import { getAllBlogPosts as getSanityPosts, getBlogBySlug as getSanityPostBySlug, getAllBlogSlugs as getSanitySlugs } from "@/lib/sanity/queries";
import { STATIC_BLOG_POSTS } from "@/data/static-blog";
import type { Blog } from "@/types";

function staticToBlog(s: (typeof STATIC_BLOG_POSTS)[0]): Blog {
  return {
    _id: s._id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    mainImage: s.mainImage,
    author: s.author,
    publishedAt: s.publishedAt,
    categories: s.categories,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    body: s.body ?? [],
  };
}

export async function getAllBlogPosts(): Promise<Blog[]> {
  try {
    const sanity = await getSanityPosts();
    if (Array.isArray(sanity) && sanity.length > 0) {
      const sanitySlugs = new Set(sanity.map((p: Blog) => p.slug?.current).filter(Boolean));
      const staticOnly = STATIC_BLOG_POSTS.filter((s) => !sanitySlugs.has(s.slug.current));
      return [...sanity, ...staticOnly.map(staticToBlog)];
    }
  } catch (_) {}
  return STATIC_BLOG_POSTS.map(staticToBlog);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const fromSanity = await getSanityPostBySlug(slug);
    if (fromSanity) return fromSanity;
  } catch (_) {}
  const staticOne = STATIC_BLOG_POSTS.find((p) => p.slug.current === slug);
  return staticOne ? staticToBlog(staticOne) : null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanitySlugs();
    if (Array.isArray(sanity) && sanity.length > 0) {
      const staticSlugs = STATIC_BLOG_POSTS.map((p) => p.slug.current);
      return [...new Set([...sanity, ...staticSlugs])];
    }
  } catch (_) {}
  return STATIC_BLOG_POSTS.map((p) => p.slug.current);
}
