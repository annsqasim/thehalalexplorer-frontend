import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safeParseJSON } from '@/lib/cron/safe-parse-json';
import { attachPortableTextKeys, type PortableTextBlock } from '@/lib/cron/portable-text';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const SANITY_API_TOKEN = process.env.NEXT_PUBLIC_SANITY_API_TOKEN!;
const CRON_SECRET = process.env.CRON_SECRET!;

interface SanityDestination {
  _id: string;
  name: string;
  country: string;
  description?: string;
  halalFoodInfo?: string;
  prayerFacilities?: string;
  bestTimeToVisit?: string;
}

interface UpdatedContent {
  description: string;
  halalFoodInfo: string;
  prayerFacilities: string;
  bestTimeToVisit: string;
  travelTips: string[];
  metaTitle: string;
  metaDescription: string;
  details: Omit<PortableTextBlock, '_key'>[];
}

async function fetchDestinations(): Promise<SanityDestination[]> {
  const query = encodeURIComponent(
    `*[_type == "destination"] | order(_updatedAt asc) [0..4] {
      _id, name, country, description,
      halalFoodInfo, prayerFacilities, bestTimeToVisit
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
  const details = attachPortableTextKeys(content.details);

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
            halalFoodInfo: content.halalFoodInfo,
            prayerFacilities: content.prayerFacilities,
            bestTimeToVisit: content.bestTimeToVisit,
            travelTips: content.travelTips,
            metaTitle: content.metaTitle,
            metaDescription: content.metaDescription,
            details,
          },
        },
      }],
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Sanity patch failed for ${id}: ${res.statusText} — ${errText}`);
  }
  return res.json();
}

async function refreshDestinationContent(dest: SanityDestination): Promise<UpdatedContent> {
  const prompt = `You are a senior travel writer and Muslim travel expert for TheHalalExplorer.com.

Our site was rejected by Google AdSense for "low value content." Your writing must meet Google's E-E-A-T standards (Experience, Expertise, Authoritativeness, Trustworthiness). Every sentence must earn its place.

DESTINATION: ${dest.name}, ${dest.country}
CURRENT CONTENT: ${dest.description ?? 'None — write from scratch'}

MANDATORY REQUIREMENTS:
1. DESCRIPTION: Write a 120-150 word intro paragraph for cards and meta descriptions.
2. HALAL FOOD INFO: 250-350 words naming real restaurants, certification bodies, and neighborhoods with the best halal options.
3. PRAYER FACILITIES: 200-300 words naming real mosques, prayer rooms in malls/airports, and qibla tips.
4. BEST TIME TO VISIT: One detailed paragraph covering weather, Ramadan/Eid, and peak seasons.
5. DETAILS: Full guide as portable text blocks — 600-800 words across 5-6 h2 sections (Islamic heritage, neighborhoods, practical tips, Ramadan/Eid, getting around). Use h2 for section headings and normal for paragraphs.
6. SPECIFICITY: Name REAL places — actual mosque names, real restaurant names, specific neighbourhoods. No generic phrases.
7. TRAVEL TIPS: 7 tips that only someone with genuine knowledge of ${dest.name} would know.

You MUST respond with ONLY a valid JSON object. No explanation, no markdown fences, no preamble. Start your response with { and end with }.

{
  "description": "120-150 word intro paragraph",
  "halalFoodInfo": "250-350 words about halal food with named restaurants",
  "prayerFacilities": "200-300 words about mosques and prayer rooms",
  "bestTimeToVisit": "Detailed paragraph about when to visit",
  "travelTips": [
    "Specific expert tip 1",
    "Specific expert tip 2",
    "Specific expert tip 3",
    "Specific expert tip 4",
    "Specific expert tip 5",
    "Specific expert tip 6",
    "Specific expert tip 7"
  ],
  "metaTitle": "Under 60 chars — destination name + halal travel",
  "metaDescription": "150-160 chars — specific benefit for Muslim travelers",
  "details": [
    { "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "Islamic Heritage & History" }] },
    { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "Substantial paragraph with specific details..." }] }
  ]
}

Include 14-18 blocks in details. Use style h2 for headings and normal for paragraphs only.`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  return safeParseJSON<UpdatedContent>(raw, dest.name);
}

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
