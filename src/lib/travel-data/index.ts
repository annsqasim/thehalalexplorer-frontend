/**
 * Single entry point for booking links, widgets and fare data.
 *
 * The provider is picked by NEXT_PUBLIC_TRAVEL_PROVIDER ("travelpayouts" by
 * default, or "none"). It is NEXT_PUBLIC because client components build links
 * too. To drop a provider: set the env var to another id, then delete its file
 * in ./providers and its line in PROVIDERS below.
 */

import { none } from "./providers/none";
import { travelpayouts } from "./providers/travelpayouts";
import type { BookingProduct, BookingQuery, RouteFares, TravelProvider, WidgetKind } from "./types";

export type * from "./types";
export { getIATA } from "./iata";

const PROVIDERS: Record<string, TravelProvider> = {
  travelpayouts,
  none,
};

const provider: TravelProvider = PROVIDERS[process.env.NEXT_PUBLIC_TRAVEL_PROVIDER ?? "travelpayouts"] ?? none;

export const travelProvider = {
  id: provider.id,
  attribution: provider.attribution,
} as const;

export function bookingLink(product: BookingProduct, query?: BookingQuery): string | null {
  return provider.bookingLink(product, query);
}

export function widgetScript(kind: WidgetKind, query?: BookingQuery): string | null {
  return provider.widgetScript(kind, query);
}

/** Server only: the fare API token is not exposed to the browser. */
export function getRouteFares(origin: string, destination: string): Promise<RouteFares | null> {
  return provider.getRouteFares(origin.toUpperCase(), destination.toUpperCase());
}

/** rel/target for links to the booking provider. */
export const bookingLinkProps = {
  target: "_blank" as const,
  rel: provider.isAffiliate ? "noopener noreferrer sponsored" : "noopener noreferrer",
};

/** Hostnames whose links earn commission: the active provider's plus other affiliate programmes on the site. */
export const AFFILIATE_HOSTS = [...provider.affiliateHosts, "amazon.", "amzn.to", "booking.com"];
