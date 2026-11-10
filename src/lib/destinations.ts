/**
 * Unified destinations data: Sanity + static fallback.
 * Use this for all destination listing and detail pages for SEO and reliability.
 */

import { getAllDestinations as getSanityDestinations, getDestinationBySlug as getSanityDestinationBySlug, getAllDestinationSlugs as getSanitySlugs } from "@/lib/sanity/queries";
import { STATIC_DESTINATIONS } from "@/data/static-destinations";
import type { Destination } from "@/types";

function staticToDestination(s: (typeof STATIC_DESTINATIONS)[0]): Destination {
  return {
    _id: s._id,
    _type: "destination",
    id: 0,
    name: s.name,
    country: s.country,
    slug: s.slug,
    description: s.description,
    halalFoodInfo: s.halalFoodInfo ?? "",
    prayerFacilities: s.prayerFacilities ?? "",
    bestTimeToVisit: s.bestTimeToVisit ?? "",
    details: [],
    iataCode: s.iataCode,
    image: s.image?.asset?.url ? { asset: { url: s.image.asset.url } } : undefined,
    isFeatured: s.isFeatured,
  };
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const sanity = await getSanityDestinations();
    // Sanity is the source of truth. The static list is only an outage
    // fallback: mixing it in listed ~20 cities whose URLs are redirected in
    // next.config.ts (for example Penang, which redirects to Kuala Lumpur).
    if (Array.isArray(sanity) && sanity.length > 0) {
      return sanity.filter((d: Destination) => d.slug?.current);
    }
  } catch (_) {
    // Sanity not configured or error; use static only
  }
  return STATIC_DESTINATIONS.map(staticToDestination);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const fromSanity = await getSanityDestinationBySlug(slug);
    // A successful lookup that finds nothing is a real 404, not a reason to
    // serve a thin hard-coded page.
    return fromSanity ?? null;
  } catch (_) {}
  const staticOne = STATIC_DESTINATIONS.find((d) => d.slug.current === slug);
  return staticOne ? staticToDestination(staticOne) : null;
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanitySlugs();
    if (Array.isArray(sanity) && sanity.length > 0) {
      return sanity;
    }
  } catch (_) {}
  return STATIC_DESTINATIONS.map((d) => d.slug.current);
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const all = await getAllDestinations();
  const featured = all.filter((d) => (d as { isFeatured?: boolean }).isFeatured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

/**
 * Other destinations to link from a destination page: curated nearby ones are
 * shown in their own card, so this returns same-country, then same-region,
 * then featured destinations. Gives every destination page real internal
 * links instead of a single "view all" button.
 */
export async function getRelatedDestinations(
  destination: Destination,
  limit = 4
): Promise<Destination[]> {
  const all = await getAllDestinations();
  const exclude = new Set<string>([
    destination.slug.current,
    ...(destination.nearbyDestinations ?? []).map((d) => d.slug.current),
  ]);

  return all
    .filter((d) => d.slug?.current && !exclude.has(d.slug.current))
    .map((d, index) => {
      let score = 0;
      if (d.country === destination.country) score += 4;
      if (destination.region && d.region === destination.region) score += 2;
      if (d.isFeatured) score += 1;
      return { d, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ d }) => d);
}
