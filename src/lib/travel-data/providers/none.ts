/**
 * No affiliate provider: plain search links, no widgets, no fare data.
 * Pages still work; price sections and widgets simply don't render.
 */

import type { BookingProduct, BookingQuery, TravelProvider } from "../types";

function bookingLink(product: BookingProduct, query: BookingQuery = {}): string | null {
  const place = query.destinationName ?? "";
  switch (product) {
    case "flights": {
      const q = place ? `Flights to ${place}` : "Flights";
      return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`;
    }
    case "hotels":
      return `https://www.google.com/travel/hotels/${encodeURIComponent(place)}`;
    default:
      return null;
  }
}

export const none: TravelProvider = {
  id: "none",
  attribution: "",
  isAffiliate: false,
  affiliateHosts: [],
  bookingLink,
  widgetScript: () => null,
  getRouteFares: async () => null,
};
