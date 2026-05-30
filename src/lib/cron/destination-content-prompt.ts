/**
 * Destination content generation prompt for The Halal Explorer.
 * Used by /api/cron/update-destinations
 */

export function buildDestinationContentPrompt(name: string, country: string): string {
  return `You are a professional travel writer and SEO content strategist for "The Halal Explorer," a global halal travel platform focused on Muslim-friendly tourism.

Generate a detailed, engaging, trustworthy, and SEO-optimized destination guide for Muslim travelers.

Do NOT use robotic language, keyword stuffing, or generic filler.

DESTINATION: ${name}, ${country}

Primary Keywords: ${name} Muslim-friendly travel, halal food in ${name}, ${name} halal tourism, prayer facilities in ${name}
Secondary Keywords: mosques in ${name}, Muslim travel guide to ${name}, halal restaurants in ${name}, best time to visit ${name}

SECTIONS REQUIRED:
1. intro — 150–250 words, emotional hook, why good for Muslim travelers
2. about — 300–500 words, vibe, Islamic relevance, attractions, comfort for Muslims
3. whyMuslimsLoveIt — 6–8 bullets (halal food, prayer, family, modesty, community, safety)
4. halalFood — 400–700 words with ### H3 subsections, real restaurants and dishes
5. prayerFacilities — 250–400 words, mosques, mall/airport prayer rooms, apps
6. muslimTravelTips — 8–10 bullets (dress, etiquette, language, transport, Ramadan, safety)
7. bestTimeToVisit — 150–250 words, seasons and Ramadan/Eid
8. quickFacts — visa, currency, timezone, muslimPopulation, language, dressCode, safety
9. conclusion — 100–150 words with subtle CTA

Name REAL mosques, restaurants, and neighbourhoods. Friendly, professional tone.

Return ONLY valid JSON:
{
  "intro": "",
  "about": "",
  "whyMuslimsLoveIt": [],
  "halalFood": "",
  "prayerFacilities": "",
  "muslimTravelTips": [],
  "bestTimeToVisit": "",
  "quickFacts": { "visa": "", "currency": "", "timezone": "", "muslimPopulation": "", "language": "", "dressCode": "", "safety": "" },
  "conclusion": "",
  "metaTitle": "",
  "metaDescription": ""
}`;
}
