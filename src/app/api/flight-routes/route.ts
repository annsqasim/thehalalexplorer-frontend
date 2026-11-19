import { NextResponse } from "next/server";
import { getFlightRoutes } from "@/lib/flight-routes";

export const revalidate = 3600;

/** GET /api/flight-routes: all published routes (summary fields). */
export async function GET() {
  const routes = await getFlightRoutes();
  return NextResponse.json({ routes });
}
