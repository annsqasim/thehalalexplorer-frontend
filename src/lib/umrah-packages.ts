/**
 * Umrah packages listed by agencies (/umrah/packages, /umrah/agencies).
 * Spec: docs/umrah-packages-module.md. Schemas live in the
 * thehalalexplorer-cms repo (agency, umrahPackage, inquiry).
 *
 * Visibility rules are enforced here, in every query: a package shows only
 * when it is published and active, not past validUntil, and its agency is
 * active and verified.
 */

import { client } from "@/lib/sanity";
import type { PackageCurrency } from "@/lib/umrah-packages-format";

export * from "@/lib/umrah-packages-format";

export type Sharing = "quad" | "triple" | "double" | "single";

export const DEPARTURE_CITIES = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Multan", "Singapore", "Other"] as const;
export const CURRENCIES: PackageCurrency[] = ["PKR", "USD"];
export const SHARING_ORDER: Sharing[] = ["quad", "triple", "double", "single"];

export interface PackageHotel {
  name: string;
  stars: number;
  distanceMeters?: number;
}

export interface AgencySummary {
  name: string;
  slug: string;
  city?: string;
  country?: string;
  isVerified: boolean;
  logoUrl?: string;
}

export interface PackageCard {
  _id: string;
  title: string;
  slug: string;
  agency: AgencySummary;
  departureCity: string;
  currency: PackageCurrency;
  months: string[];
  makkahNights: number;
  madinahNights: number;
  totalNights: number;
  makkahHotel: PackageHotel;
  madinahHotel: PackageHotel;
  priceFrom: number;
  hotelStars: number;
  includes: string[];
  isFeatured: boolean;
  imageUrl?: string;
}

export interface PackageDetail extends PackageCard {
  departureDates: string[];
  prices: { sharing: Sharing; amount: number }[];
  notes?: string;
  imageUrls: string[];
  validUntil?: string;
  agency: AgencySummary & { about?: string; whatsapp?: string; website?: string; registrationNumber?: string; saudiPartner?: string };
  updatedAt: string;
}

export interface AgencyProfile extends AgencySummary {
  about?: string;
  whatsapp?: string;
  website?: string;
  registrationNumber?: string;
  saudiPartner?: string;
  updatedAt: string;
}

export interface PackageFilters {
  /** Lower-case departure city, e.g. "karachi". */
  from?: string;
  /** YYYY-MM */
  month?: string;
  /** Maximum "from" price per person, in `currency`. */
  max?: number;
  /** Minimum star level of the lower-rated hotel. */
  stars?: number;
  currency?: PackageCurrency;
  agencySlug?: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const VISIBLE_AGENCY = `_type == "agency" && !(_id in path("drafts.**")) && isActive != false && isVerified == true`;
const VISIBLE_PACKAGE = `
  _type == "umrahPackage" && defined(slug.current) && !(_id in path("drafts.**"))
  && isActive != false
  && (!defined(validUntil) || validUntil >= $today)
  && agency->isActive != false && agency->isVerified == true
`;

const agencyFields = `
  name,
  "slug": slug.current,
  city,
  country,
  "isVerified": coalesce(isVerified, false),
  "logoUrl": logo.asset->url
`;
const agencySummary = `{${agencyFields}}`;

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  "agency": agency->${agencySummary},
  departureCity,
  currency,
  "months": coalesce(months, []),
  makkahNights,
  madinahNights,
  "totalNights": makkahNights + madinahNights,
  makkahHotel{name, stars, distanceMeters},
  madinahHotel{name, stars, distanceMeters},
  "priceFrom": math::min(prices[].amount),
  "hotelStars": math::min([makkahHotel.stars, madinahHotel.stars]),
  "includes": coalesce(includes, []),
  "isFeatured": coalesce(isFeatured, false),
  "imageUrl": images[0].asset->url
`;

// Listings change rarely; inquiries are never cached.
const CACHE = { next: { revalidate: 300, tags: ["umrahPackage"] } };

export async function getPackages(filters: PackageFilters = {}): Promise<PackageCard[]> {
  const params = {
    today: today(),
    from: filters.from?.toLowerCase() ?? "",
    month: filters.month ?? "",
    currency: filters.currency ?? "",
    max: filters.max ?? 0,
    stars: filters.stars ?? 0,
    agency: filters.agencySlug ?? "",
  };
  try {
    return await client.fetch<PackageCard[]>(
      `*[${VISIBLE_PACKAGE}
        && ($from == "" || lower(departureCity) == $from)
        && ($month == "" || $month in months)
        && ($currency == "" || currency == $currency)
        && ($agency == "" || agency->slug.current == $agency)
      ]{${cardFields}}
      [($max == 0 || priceFrom <= $max) && ($stars == 0 || hotelStars >= $stars)]
      | order(isFeatured desc, priceFrom asc)`,
      params,
      CACHE
    );
  } catch {
    return [];
  }
}

export async function getPackage(slug: string): Promise<PackageDetail | null> {
  try {
    return await client.fetch<PackageDetail | null>(
      `*[${VISIBLE_PACKAGE} && slug.current == $slug][0]{
        ${cardFields},
        "departureDates": coalesce(departureDates, []),
        "prices": coalesce(prices[]{sharing, amount}, []),
        notes,
        "imageUrls": coalesce(images[].asset->url, []),
        validUntil,
        "agency": agency->{
          ${agencyFields},
          about, whatsapp, website, registrationNumber, saudiPartner
        },
        "updatedAt": _updatedAt
      }`,
      { slug, today: today() },
      CACHE
    );
  } catch {
    return null;
  }
}

export async function getAgency(slug: string): Promise<AgencyProfile | null> {
  try {
    return await client.fetch<AgencyProfile | null>(
      `*[${VISIBLE_AGENCY} && slug.current == $slug][0]{
        ${agencyFields},
        about, whatsapp, website, registrationNumber, saudiPartner,
        "updatedAt": _updatedAt
      }`,
      { slug },
      CACHE
    );
  } catch {
    return null;
  }
}

/** Slugs and edit dates for the sitemap. */
export async function getPackageSitemapEntries(): Promise<{
  packages: { slug: string; updatedAt: string }[];
  agencies: { slug: string; updatedAt: string }[];
}> {
  try {
    return await client.fetch(
      `{
        "packages": *[${VISIBLE_PACKAGE}]{"slug": slug.current, "updatedAt": _updatedAt},
        "agencies": *[${VISIBLE_AGENCY} && defined(slug.current)]{"slug": slug.current, "updatedAt": _updatedAt}
      }`,
      { today: today() },
      CACHE
    );
  } catch {
    return { packages: [], agencies: [] };
  }
}
