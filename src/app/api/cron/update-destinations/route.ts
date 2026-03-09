import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// NEW - current free model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const SANITY_API_TOKEN = process.env.NEXT_PUBLIC_SANITY_API_TOKEN!;
const CRON_SECRET = process.env.CRON_SECRET!;

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h2' | 'h3' | 'blockquote';
  children: PortableTextSpan[];
  markDefs: unknown[];
}

interface BlogIdea {
  title: string;
  slug: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  tags: string[];
  outline: { heading: string; points: string[] }[];
}

interface BlogBody {
  body: Omit<PortableTextBlock, '_key'>[];
}

// ─── Sanity Helper ────────────────────────────────────────────────────────────

async function createBlogPost(blog: BlogIdea, body: PortableTextBlock[]) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_DATASET}`;

  const document = {
    _type: 'blogPost',
    title: blog.title,
    slug: { _type: 'slug', current: blog.slug },
    excerpt: blog.excerpt,
    body,
    tags: blog.tags,
    targetKeyword: blog.targetKeyword,
    seo: {
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
    },
    publishedAt: new Date().toISOString(),
    status: 'draft',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: [{ create: document }] }),
  });
  if (!res.ok) throw new Error(`Sanity create failed: ${res.statusText}`);
  return res.json();
}

// ─── Gemini Helpers ───────────────────────────────────────────────────────────

async function generateBlogIdeas(): Promise<BlogIdea[]> {
  const prompt = `You are a content director for TheHalalExplorer.com, a halal travel website.

Generate 2 blog post ideas that are highly specific, answer a real question a Muslim traveler would Google, and can be written with genuine depth (1,000+ words of useful content). Make the topics different from each other — one destination-specific, one practical/tips-based.

Topic pillars: halal food guides for specific cities, mosque guides for non-Muslim cities, Ramadan travel, Eid destinations, Muslim-friendly hotel guides, Islamic heritage sites, modest packing guides, visa guides, halal travel in Muslim-minority countries.

You MUST respond with ONLY a valid JSON object. No explanation, no markdown fences, no preamble. Start with { and end with }.

{
  "blogs": [
    {
      "title": "Specific compelling blog title",
      "slug": "url-friendly-slug",
      "targetKeyword": "specific long-tail SEO keyword",
      "metaTitle": "SEO title under 60 chars",
      "metaDescription": "150-160 chars with keyword and clear value",
      "excerpt": "2-3 compelling sentences that make a Muslim traveler want to read this",
      "tags": ["tag1", "tag2", "tag3"],
      "outline": [
        { "heading": "Introduction", "points": ["specific hook", "what reader will learn"] },
        { "heading": "Section 2 title", "points": ["point 1", "point 2", "point 3"] },
        { "heading": "Section 3 title", "points": ["point 1", "point 2"] },
        { "heading": "Section 4 title", "points": ["point 1", "point 2"] },
        { "heading": "Section 5 title", "points": ["point 1", "point 2"] },
        { "heading": "Conclusion", "points": ["summary", "call to action"] }
      ]
    },
    {
      "title": "Second blog title",
      "slug": "second-slug",
      "targetKeyword": "second keyword",
      "metaTitle": "Second meta title",
      "metaDescription": "Second meta description",
      "excerpt": "Second excerpt",
      "tags": ["tag1", "tag2"],
      "outline": [
        { "heading": "Introduction", "points": ["hook"] },
        { "heading": "Section", "points": ["point"] },
        { "heading": "Conclusion", "points": ["cta"] }
      ]
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in Gemini blog ideas response');
  const parsed = JSON.parse(match[0]) as { blogs: BlogIdea[] };
  return parsed.blogs;
}

async function writeBlogPost(idea: BlogIdea): Promise<PortableTextBlock[]> {
  const prompt = `You are an expert Muslim travel writer for TheHalalExplorer.com. Google rejected our site for "low value content" — this post must demonstrate genuine expertise and depth to pass Google's E-E-A-T quality review.

BLOG BRIEF:
Title: ${idea.title}
Target keyword: "${idea.targetKeyword}" — use naturally 4-5 times
Outline: ${JSON.stringify(idea.outline, null, 2)}

MANDATORY STANDARDS:
1. LENGTH: 1,100-1,300 words total. Every paragraph must contain specific, useful information.
2. SPECIFICITY: Name real places, use accurate details, give concrete advice — no filler sentences
3. NO FILLER: Never write "this city has much to offer" or "there are many options" — be specific always
4. MUSLIM PERSPECTIVE: Naturally weave in halal food, prayer, modest travel throughout — as narrative, not checklist
5. STRUCTURE: Each section needs 2-3 substantial prose paragraphs — no bullet points in body content
6. INTRO: First paragraph must open with a specific, vivid detail — not a generic travel statement
7. CONCLUSION: End with a warm call to action inviting readers to explore TheHalalExplorer for more guides

You MUST respond with ONLY a valid JSON object. No explanation, no markdown fences, no preamble. Start with { and end with }.

{
  "body": [
    { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "Full opening paragraph — minimum 4 sentences, specific and vivid..." }] },
    { "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "First Section Heading" }] },
    { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "Section paragraph 1..." }] },
    { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "Section paragraph 2..." }] }
  ]
}

Use "style": "h2" for headings, "style": "normal" for paragraphs. Include 18-22 blocks minimum. All body content must be prose paragraphs — no bullet-point style blocks.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`No JSON in Gemini blog body for "${idea.title}"`);

  const parsed = JSON.parse(match[0]) as BlogBody;

  // Attach required Sanity _key fields to every block and span
  return parsed.body.map((block, bi) => ({
    ...block,
    _key: `block-${bi}-${Date.now()}`,
    markDefs: [],
    children: block.children.map((span, si) => ({
      ...span,
      _key: `span-${bi}-${si}`,
      marks: span.marks ?? [],
    })),
  })) as PortableTextBlock[];
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: { title: string; success: boolean; error?: string }[] = [];

  try {
    const ideas = await generateBlogIdeas();

    for (const idea of ideas) {
      try {
        const body = await writeBlogPost(idea);
        await createBlogPost(idea, body);
        results.push({ title: idea.title, success: true });
        console.log(`✅ Created blog: ${idea.title}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        results.push({ title: idea.title, success: false, error: msg });
        console.error(`❌ Failed blog: ${idea.title} — ${msg}`);
      }
    }

    return NextResponse.json({
      ok: true,
      ran: new Date().toISOString(),
      blogsCreated: results.filter((r) => r.success).length,
      results,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}