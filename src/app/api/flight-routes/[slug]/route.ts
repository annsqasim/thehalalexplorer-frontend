import { NextResponse } from "next/server";
import { getFlightRoute } from "@/lib/flight-routes";
import { getRouteFares } from "@/lib/travel-data";

export const revalidate = 3600;

/**
 * GET /api/flight-routes/[slug]: one route with its guide content and, when
 * the travel provider has data, the cheapest fares by month (`fares`, or null).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = await getFlightRoute(slug);
  if (!route) return NextResponse.json({ error: "Route not found" }, { status: 404 });
  const fares = await getRouteFares(route.origin.iata, route.destination.iata);
  return NextResponse.json({ route, fares });
}
