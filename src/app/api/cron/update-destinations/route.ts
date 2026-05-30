import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { safeParseJSON } from '@/lib/cron/safe-parse-json';
import { buildDestinationContentPrompt } from '@/lib/cron/destination-content-prompt';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN!;
const CRON_SECRET = process.env.CRON_SECRET!;

interface SanityDestination {
  _id: string;
  name: string;
  country: string;
  slug?: { current: string };
}

interface QuickFacts {
  visa: string;
  currency: string;
  timezone: string;
  muslimPopulation: string;
  language: string;
  dressCode: string;
  safety: string;
}

interface GeneratedDestination {
  intro: string;
  about: string;
  whyMuslimsLoveIt: string[];
  halalFood: string;
  prayerFacilities: string;
  muslimTravelTips: string[];
  bestTimeToVisit: string;
  quickFacts: QuickFacts;
  conclusion: string;
  metaTitle: string;
  metaDescription: string;
}

function buildPrompt(dest: SanityDestination): string {
  return buildDestinationContentPrompt(dest.name, dest.country);
}

async function fetchDestinations(): Promise<SanityDestination[]> {
  const query = encodeURIComponent(
    `*[_type == "destination"] | order(_updatedAt asc) [0..4] {
      _id, name, country, slug
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

async function patchDestination(id: string, content: GeneratedDestination) {
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
            description: content.intro.slice(0, 280),
            intro: content.intro,
            about: content.about,
            whyMuslimsLoveIt: content.whyMuslimsLoveIt,
            halalFoodInfo: content.halalFood,
            prayerFacilities: content.prayerFacilities,
            travelTips: content.muslimTravelTips,
            bestTimeToVisit: content.bestTimeToVisit,
            quickFacts: content.quickFacts,
            conclusion: content.conclusion,
            metaTitle: content.metaTitle,
            metaDescription: content.metaDescription,
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

async function refreshDestinationContent(dest: SanityDestination): Promise<GeneratedDestination> {
  const result = await model.generateContent(buildPrompt(dest));
  const raw = result.response.text();
  return safeParseJSON<GeneratedDestination>(raw, dest.name);
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
