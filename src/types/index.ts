// src/types/index.ts

import { Key } from "react";

export interface DestinationQuickFacts {
  visa?: string;
  currency?: string;
  timezone?: string;
  muslimPopulation?: string;
  language?: string;
  dressCode?: string;
  safety?: string;
}

export interface DestinationRatings {
  halalFood?: number;
  mosques?: number;
  modestDress?: number;
  safety?: number;
}

export interface HalalFoodItem {
  emoji?: string;
  name: string;
  description?: string;
}

export interface MosqueItem {
  name: string;
  description?: string;
  isLandmark?: boolean;
}

export interface AffiliateProductField {
  emoji?: string;
  label?: string;
  productName: string;
  description?: string;
  amazonUrl: string;
  priceRange?: string;
  rank?: string;
  verdict?: string;
  pros?: string[];
  isBestPick?: boolean;
  image?: { asset?: { url?: string } };
}

export interface NearbyDestinationRef {
  _id: string;
  name: string;
  country: string;
  slug: { current: string };
}

export interface Destination {
  _id: Key | null | undefined;
  _type: string;
  id: number;
  name: string;
  country: string;
  slug: { current: string };
  description?: string;
  intro?: string;
  about?: string;
  whyMuslimsLoveIt?: string[];
  halalFoodInfo?: string;
  halalFoodItems?: HalalFoodItem[];
  halalFoodRating?: number;
  prayerFacilities?: string;
  mosqueItems?: MosqueItem[];
  bestTimeToVisit?: string;
  travelTips?: string[];
  quickFacts?: DestinationQuickFacts;
  conclusion?: string;
  muslimFriendlyScore?: number;
  ratings?: DestinationRatings;
  affiliateProducts?: AffiliateProductField[];
  bookingComUrl?: string;
  region?: string;
  nearbyDestinations?: NearbyDestinationRef[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  seoImage?: { asset?: { url?: string } };
  details?: {
    _type: string;
    style?: string;
    children: { _type: string; text: string }[];
  }[];
  image?: string | { asset?: { url?: string } };
  isFeatured?: boolean;
}

export interface PageProps {
  params: { slug: string };
}

export interface Blog {
  _id: Key | null | undefined;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  mainImage?: { asset?: { url?: string } };
  seoImage?: { asset?: { url?: string } };
  author?: string;
  categories?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  readTime?: number;
  hasAffiliateLinks?: boolean;
  affiliateProducts?: AffiliateProductField[];
  relatedDestinations?: NearbyDestinationRef[];
  sidebarCtaTitle?: string;
  sidebarCtaDescription?: string;
  body: {
    _type: string;
    style?: string;
    children: { _type: string; text: string }[];
  }[];
  publishedAt: string;
}
