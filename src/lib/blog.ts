/**
 * Blog data access. Posts come from Sanity only.
 *
 * The old hard-coded placeholder posts were removed: they had no body, and
 * every one of their URLs is permanently redirected in next.config.ts, so
 * listing them only produced dead cards and internal links to redirects.
 */

import {
  getAllBlogPosts as getSanityPosts,
  getBlogBySlug as getSanityPostBySlug,
  getAllBlogSlugs as getSanitySlugs,
} from "@/lib/sanity/queries";
import type { Blog } from "@/types";

export async function getAllBlogPosts(): Promise<Blog[]> {
  try {
    const posts = await getSanityPosts();
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    return (await getSanityPostBySlug(slug)) ?? null;
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const slugs = await getSanitySlugs();
    return Array.isArray(slugs) ? slugs : [];
  } catch {
    return [];
  }
}

/** True when a post belongs to the Umrah cluster (category "Umrah"). */
export function isUmrahPost(post: Pick<Blog, "categories">): boolean {
  return (post.categories ?? []).some((c) => c.trim().toLowerCase() === "umrah");
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "your", "how", "what", "best", "guide",
  "halal", "muslim", "travel", "travellers", "travelers", "complete", "tips",
  "2024", "2025", "2026", "2027",
]);

function titleWords(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

/**
 * Picks the posts most related to `post`: shared categories count most,
 * shared title words next, and newer posts win ties. Replaces the old
 * behaviour of showing the same three posts under every article.
 */
export function pickRelatedPosts(post: Blog, allPosts: Blog[], limit = 3): Blog[] {
  const categories = new Set((post.categories ?? []).map((c) => c.toLowerCase()));
  const words = titleWords(post.title ?? "");

  return allPosts
    .filter((p) => p._id !== post._id && p.slug?.current && p.slug.current !== post.slug?.current)
    .map((p, index) => {
      let score = 0;
      for (const c of p.categories ?? []) {
        if (categories.has(c.toLowerCase())) score += 5;
      }
      for (const w of titleWords(p.title ?? "")) {
        if (words.has(w)) score += 2;
      }
      return { p, score, index };
    })
    // allPosts is already newest-first, so index breaks ties by recency
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ p }) => p);
}

interface FaqEntry {
  question: string;
  answer: string;
}

type BodyBlock = Blog["body"][number];

function blockText(block: BodyBlock): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("").trim();
}

/**
 * Reads FAQ pairs out of a post body so FAQPage structured data can be
 * emitted without a schema change. Convention: an h2 whose text contains
 * "frequently asked" or "FAQ", followed by h3 questions, each followed by
 * one or more normal paragraphs. Stops at the next h2.
 */
export function extractFaqsFromBody(body: Blog["body"] | undefined): FaqEntry[] {
  if (!Array.isArray(body)) return [];
  const faqs: FaqEntry[] = [];
  let inFaq = false;
  let current: FaqEntry | null = null;

  for (const block of body) {
    if (block?._type !== "block") continue;
    const text = blockText(block);
    if (block.style === "h2") {
      if (inFaq) break;
      inFaq = /frequently asked|\bfaqs?\b/i.test(text);
      continue;
    }
    if (!inFaq || !text) continue;
    if (block.style === "h3") {
      if (current?.answer) faqs.push(current);
      current = { question: text, answer: "" };
    } else if (current) {
      current.answer = current.answer ? `${current.answer} ${text}` : text;
    }
  }
  if (current?.answer) faqs.push(current);
  return faqs;
}
