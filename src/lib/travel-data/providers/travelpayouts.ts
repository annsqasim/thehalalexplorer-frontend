/**
 * Travelpayouts provider: Aviasales (flights), Hotellook (hotels), Klook (tours).
 *
 * This is the ONLY file that knows Travelpayouts exists. To remove it, set
 * NEXT_PUBLIC_TRAVEL_PROVIDER=none (or another provider) and delete this file
 * and its entry in ../index.ts.
 *
 * Short links come from Travelpayouts → Generate links → Copy short URL and
 * already contain the marker. Fare data needs TRAVELPAYOUTS_API_TOKEN (server
 * only; Travelpayouts dashboard → Tools → API).
 */

import type { BookingProduct, BookingQuery, MonthlyFare, RouteFares, TravelProvider, WidgetKind } from "../types";

const LINKS = {
  flights: "https://aviasales.tpx.gr/4Ren7XoF",
  tours: "https://klook.tpx.gr/Umtvtii4",
  // Add these once they are generated in the Travelpayouts dashboard
  hotels: "",
  insurance: "",
  cars: "",
};

const MARKER = process.env.NEXT_PUBLIC_TP_MARKER || "757826";
const TRS = process.env.NEXT_PUBLIC_TP_TRS || "556314";

/** Fare data is cached for a day; Aviasales prices are themselves up to 48 hours old. */
const FARE_REVALIDATE_SECONDS = 60 * 60 * 24;

function withParams(base: string, params: Record<string, string | undefined>): string {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

function bookingLink(product: BookingProduct, query: BookingQuery = {}): string | null {
  switch (product) {
    case "flights":
      return withParams(LINKS.flights, {
        origin: query.originIATA,
        destination: query.destinationIATA,
        depart_date: query.departDate,
      });
    case "tours":
      return withParams(LINKS.tours, { query: query.destinationName });
    // Untracked fallbacks until the tracked links are generated: these earn nothing
    case "hotels":
      return LINKS.hotels || "https://hotellook.com";
    case "insurance":
      return LINKS.insurance || "https://www.worldnomads.com";
    case "cars":
      return LINKS.cars || "https://www.kiwitaxi.com";
  }
}

function widgetScript(kind: WidgetKind): string | null {
  const common = `currency=USD&trs=${TRS}&shmarker=${MARKER}.thx&powered_by=true`;
  switch (kind) {
    // Hotellook widget (promo 4497). It does not take a city, so it shows the same list everywhere.
    case "hotels":
      return `https://tpwgts.com/content?${common}&locale=en&city_id=2&category=4&amount=3&campaign_id=137&promo_id=4497`;
    case "tours":
      return `https://tpwgts.com/content?${common}&product=&language=en&layout=horizontal&campaign_id=89&promo_id=3948`;
  }
}

/** Shape of one entry in Aviasales `v1/prices/monthly` responses. */
interface AviasalesMonthlyEntry {
  price: number;
  airline?: string;
  transfers?: number;
  departure_at?: string;
  return_at?: string;
}

async function getRouteFares(origin: string, destination: string): Promise<RouteFares | null> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token || !origin || !destination) return null;

  const url = withParams("https://api.travelpayouts.com/v1/prices/monthly", {
    origin,
    destination,
    currency: "USD",
  });

  try {
    const res = await fetch(url, {
      headers: { "X-Access-Token": token },
      next: { revalidate: FARE_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; data?: Record<string, AviasalesMonthlyEntry> };
    if (!json.success || !json.data) return null;

    const fares: MonthlyFare[] = Object.entries(json.data)
      .filter(([, entry]) => typeof entry?.price === "number" && entry.price > 0)
      .map(([month, entry]) => ({
        month: month.slice(0, 7),
        price: entry.price,
        currency: "USD" as const,
        airline: entry.airline,
        transfers: entry.transfers,
        departureAt: entry.departure_at,
        returnAt: entry.return_at,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    if (fares.length === 0) return null;
    return { origin, destination, fares, fetchedAt: new Date().toISOString(), source: "Aviasales" };
  } catch {
    return null;
  }
}

export const travelpayouts: TravelProvider = {
  id: "travelpayouts",
  attribution: "Powered by Aviasales via Travelpayouts",
  isAffiliate: true,
  affiliateHosts: ["tpx.gr", "aviasales.com", "hotellook.com", "klook.com", "kkday.com", "tpwgts.com"],
  bookingLink,
  widgetScript,
  getRouteFares,
};
