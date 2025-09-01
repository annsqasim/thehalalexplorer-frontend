// src/types/index.ts

export interface Destination {
    _id: Key | null | undefined;
    _type: string;
    id: number;
    name: string;
    country: string;
    slug: {
      current: string;
    };
    description: string;
    halalFoodInfo: string;
    halalFoodRating: number;
    prayerFacilities: number;
    bestTimeToVisit: string;
    details: {
      _type: string;
      children: {
        _type: string;
        text: string;
      }[];
    }[];
    image?: string; // Optional
    isFeatured?: boolean; // Optional
  }
  