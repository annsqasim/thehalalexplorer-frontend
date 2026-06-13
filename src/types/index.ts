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

export interface Destination {
  _id: Key | null | undefined;
  _type: string;
  id: number;
  name: string;
  country: string;
  slug: {
    current: string;
  };
  description?: string;
  intro?: string;
  about?: string;
  whyMuslimsLoveIt?: string[];
  halalFoodInfo?: string;
  halalFoodRating?: number;
  prayerFacilities?: string;
  bestTimeToVisit?: string;
  travelTips?: string[];
  quickFacts?: DestinationQuickFacts;
  conclusion?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  details?: {
    _type: string;
    style?: string;
    children: {
      _type: string;
      text: string;
    }[];
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
  author?: string;
  categories?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  body: {
    _type: string;
    children: {
      _type: string;
      text: string;
    }[];
  }[];
  publishedAt: string;
}
