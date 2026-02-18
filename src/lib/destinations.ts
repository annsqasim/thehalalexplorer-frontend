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
    halalFoodRating: 5,
    prayerFacilities: 1,
    bestTimeToVisit: s.bestTimeToVisit ?? "",
    details: [],
    image: s.image?.asset?.url ? { asset: { url: s.image.asset.url } } : undefined,
    isFeatured: s.isFeatured,
  };
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const sanity = await getSanityDestinations();
    if (Array.isArray(sanity) && sanity.length > 0) {
      const sanitySlugs = new Set(sanity.map((d: Destination) => d.slug?.current).filter(Boolean));
      const staticOnly = STATIC_DESTINATIONS.filter((s) => !sanitySlugs.has(s.slug.current));
      const staticAsDest = staticOnly.map(staticToDestination);
      return [...sanity, ...staticAsDest];
    }
  } catch (_) {
    // Sanity not configured or error; use static only
  }
  return STATIC_DESTINATIONS.map(staticToDestination);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const fromSanity = await getSanityDestinationBySlug(slug);
    if (fromSanity) return fromSanity;
  } catch (_) {}
  const staticOne = STATIC_DESTINATIONS.find((d) => d.slug.current === slug);
  return staticOne ? staticToDestination(staticOne) : null;
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanitySlugs();
    if (Array.isArray(sanity) && sanity.length > 0) {
      const staticSlugs = STATIC_DESTINATIONS.map((d) => d.slug.current);
      return [...new Set([...sanity, ...staticSlugs])];
    }
  } catch (_) {}
  return STATIC_DESTINATIONS.map((d) => d.slug.current);
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const all = await getAllDestinations();
  const featured = all.filter((d) => (d as { isFeatured?: boolean }).isFeatured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}
