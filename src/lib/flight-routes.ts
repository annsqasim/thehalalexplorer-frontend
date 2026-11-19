/**
 * Flight route pages (/flights/[slug]) and the /api/flight-routes endpoints.
 *
 * Routes are `flightRoute` documents in Sanity. The schema lives in the
 * thehalalexplorer-cms repo (schemaTypes/flightRoute.js). Pages and the API both call
 * these functions, so they always agree. Only published documents are read.
 */

import { client } from "@/lib/sanity";

export interface RouteAirport {
  code: string;
  name: string;
}

export interface RoutePlace {
  city: string;
  /** IATA city code used for fare lookups and search links. */
  iata: string;
  airports: RouteAirport[];
  /** Slug of our /destinations page for this place, if we have one. */
  destinationSlug?: string;
}

export interface RouteSection {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
}

export interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
}

export interface FlightRouteSummary {
  slug: string;
  origin: Pick<RoutePlace, "city" | "iata">;
  destination: Pick<RoutePlace, "city" | "iata">;
  tagline: string;
  umrah: boolean;
  updatedAt: string;
}

export interface FlightRoute extends FlightRouteSummary {
  origin: RoutePlace;
  destination: RoutePlace;
  intro: string;
  flightTime: string;
  nonStop: string;
  sections: RouteSection[];
  faqs: { question: string; answer: string }[];
  relatedPosts: RelatedPost[];
  lastChecked: string;
}

const PUBLISHED = `_type == "flightRoute" && defined(slug.current) && !(_id in path("drafts.**"))`;

const summaryFields = `
  "slug": slug.current,
  "origin": origin{city, iata},
  "destination": destination{city, iata},
  tagline,
  "umrah": coalesce(umrah, false),
  "updatedAt": _updatedAt
`;

const place = (field: string) => `
  "${field}": ${field}{
    city,
    iata,
    "airports": coalesce(airports[]{code, name}, []),
    "destinationSlug": guide->slug.current
  }
`;

const fullFields = `
  ${summaryFields},
  ${place("origin")},
  ${place("destination")},
  intro,
  flightTime,
  nonStop,
  "sections": coalesce(sections[]{heading, "paragraphs": coalesce(paragraphs, []), links[]{label, href}}, []),
  "faqs": coalesce(faqs[]{question, answer}, []),
  // Filter before dereferencing: a filter after the projection nulls items instead of dropping them
  "relatedPosts": coalesce(relatedPosts[defined(@->slug.current)]->{_id, title, "slug": slug.current, shortDescription}, []),
  lastChecked
`;

// Routes change rarely; an hour of caching keeps Sanity requests low.
const CACHE = { next: { revalidate: 3600, tags: ["flightRoute"] } };

export async function getFlightRoutes(): Promise<FlightRouteSummary[]> {
  try {
    return await client.fetch<FlightRouteSummary[]>(
      `*[${PUBLISHED}] | order(umrah desc, origin.city asc, destination.city asc){${summaryFields}}`,
      {},
      CACHE
    );
  } catch {
    return [];
  }
}

export async function getFlightRoute(slug: string): Promise<FlightRoute | null> {
  try {
    return await client.fetch<FlightRoute | null>(
      `*[${PUBLISHED} && slug.current == $slug][0]{${fullFields}}`,
      { slug },
      CACHE
    );
  } catch {
    return null;
  }
}
