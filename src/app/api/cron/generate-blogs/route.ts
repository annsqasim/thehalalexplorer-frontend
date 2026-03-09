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

interface HalalRestaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  notes: string;
}

interface SanityDestination {
  _id: string;
  name: string;
  country: string;
  description: string;
  halalRestaurants: HalalRestaurant[];
  travelTips: string[];
  seoTitle: string;
  seoDescription: string;
}

interface UpdatedContent {
  description: string;
  halalRestaurants: HalalRestaurant[];
  travelTips: string[];
  seoTitle: string;
  seoDescription: string;
}

// ─── Sanity Helpers ───────────────────────────────────────────────────────────

async function fetchDestinations(): Promise<SanityDestination[]> {
  const query = encodeURIComponent(
    `*[_type == "destination"] | order(_updatedAt asc) [0..4] {
      _id, name, country, description,
      halalRestaurants, travelTips,
      seoTitle, seoDescription
    }`
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${query}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.statusText}`);
  const data = await res.json();
  return data.result as SanityDestination[];
}

async function patchDestination(id: string, content: UpdatedContent) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_DATASET}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [{
        patch: {
          id,
          set: {
            description: content.description,
            halalRestaurants: content.halalRestaurants,
            travelTips: content.travelTips,
            seoTitle: content.seoTitle,
            seoDescription: content.seoDescription,
          },
        },
      }],
    }),
  });
  if (!res.ok) throw new Error(`Sanity patch failed for ${id}: ${res.statusText}`);
  return res.json();
}

// ─── Gemini Helper ────────────────────────────────────────────────────────────

async function refreshDestinationContent(dest: SanityDestination): Promise<UpdatedContent> {
  const prompt = `You are a senior travel writer and Muslim travel expert for TheHalalExplorer.com.

Our site was rejected by Google AdSense for "low value content." Your writing must meet Google's E-E-A-T standards (Experience, Expertise, Authoritativeness, Trustworthiness). Every sentence must earn its place.

DESTINATION: ${dest.name}, ${dest.country}
CURRENT CONTENT: ${dest.description ?? 'None — write from scratch'}

MANDATORY REQUIREMENTS:
1. WORD COUNT: Description must be 700-900 words. Count carefully.
2. STRUCTURE: Use 5-6 sections with ## markdown headings (e.g. "## Islamic Heritage & History", "## Halal Food Scene", "## Mosques & Prayer Facilities", "## Muslim-Friendly Neighbourhoods", "## Best Time to Visit")
3. SPECIFICITY: Name REAL places — actual mosque names, real restaurant names, specific neighbourhoods. No generic phrases.
4. ISLAMIC CONTEXT: Include history of Islam in this destination — when it arrived, key figures, architecture, how faith shapes daily life.
5. HALAL DETAILS: Specify which halal certification body operates in this country, which areas have the most halal options.
6. PERSONAL VOICE: Write warmly as a knowledgeable Muslim friend. Use "you" to address the reader.
7. RAMADAN/EID: Include at least one paragraph about visiting during Ramadan or Eid.
8. RESTAURANTS: Provide 5 real, named restaurants with specific details.
9. TIPS: Write 7 tips that only someone with genuine knowledge of ${dest.name} would know.

You MUST respond with ONLY a valid JSON object. No explanation, no markdown fences, no preamble. Start your response with { and end with }.

{
  "description": "700-900 word description with ## section headings embedded in the text",
  "halalRestaurants": [
    { "name": "Real restaurant name", "cuisine": "Specific cuisine", "priceRange": "$|$$|$$$|$$$$", "notes": "Specific useful note about this restaurant" }
  ],
  "travelTips": [
    "Specific expert tip 1 naming a specific place, time, or insider detail",
    "Specific expert tip 2",
    "Specific expert tip 3",
    "Specific expert tip 4",
    "Specific expert tip 5",
    "Specific expert tip 6",
    "Specific expert tip 7"
  ],
  "seoTitle": "Under 60 chars — destination name + halal travel",
  "seoDescription": "150-160 chars — specific benefit for Muslim travelers"
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  // Strip any markdown fences Gemini might add despite instructions
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`No JSON in Gemini response for ${dest.name}`);
  return JSON.parse(match[0]) as UpdatedContent;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: { name: string; success: boolean; error?: string }[] = [];

  try {
    const destinations = await fetchDestinations();

    for (const dest of destinations) {
      try {
        const updated = await refreshDestinationContent(dest);
        await patchDestination(dest._id, updated);
        results.push({ name: dest.name, success: true });
        console.log(`✅ Updated: ${dest.name}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        results.push({ name: dest.name, success: false, error: msg });
        console.error(`❌ Failed: ${dest.name} — ${msg}`);
      }
    }

    return NextResponse.json({ ok: true, ran: new Date().toISOString(), results });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}