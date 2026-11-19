/**
 * Provider-neutral types for booking links, search widgets and fare data.
 *
 * Pages and components only use these types and the functions exported from
 * `@/lib/travel-data`. Nothing outside `providers/` may import a provider
 * directly, so a provider can be swapped or removed by changing one env var.
 */

export type BookingProduct = "flights" | "hotels" | "tours" | "insurance" | "cars";

export interface BookingQuery {
  /** City name shown to the user and used by keyword-based searches, e.g. "Istanbul". */
  destinationName?: string;
  /** IATA city or airport code, e.g. "IST". */
  destinationIATA?: string;
  originIATA?: string;
  /** YYYY-MM-DD */
  departDate?: string;
}

/** Cheapest fare found for one departure month. */
export interface MonthlyFare {
  /** YYYY-MM */
  month: string;
  price: number;
  currency: "USD";
  /** IATA airline code, when the source gives one. */
  airline?: string;
  /** 0 means non-stop. */
  transfers?: number;
  departureAt?: string;
  returnAt?: string;
}

export interface RouteFares {
  origin: string;
  destination: string;
  fares: MonthlyFare[];
  /** ISO timestamp of when the data was fetched. Shown to users as "last updated". */
  fetchedAt: string;
  /** Attribution line, e.g. "Aviasales". */
  source: string;
}

export type WidgetKind = "hotels" | "tours";

export interface TravelProvider {
  id: string;
  /** Short attribution shown under widgets, e.g. "Powered by Aviasales via Travelpayouts". */
  attribution: string;
  /** True when links earn commission, so they must carry rel="sponsored". */
  isAffiliate: boolean;
  /** Hostnames of this provider's tracking links, used to mark in-article links as sponsored. */
  affiliateHosts: string[];
  bookingLink(product: BookingProduct, query?: BookingQuery): string | null;
  /** Script URL for an embeddable widget, or null when the provider has none. */
  widgetScript(kind: WidgetKind, query?: BookingQuery): string | null;
  /** Server only. Resolves to null when there is no data or the provider has no fare API. */
  getRouteFares(origin: string, destination: string): Promise<RouteFares | null>;
}
