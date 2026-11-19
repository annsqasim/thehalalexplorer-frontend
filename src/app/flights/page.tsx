import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { FLIGHT_ROUTES } from "@/data/flight-routes";
import { SITE_URL } from "@/lib/constants/site";

const PAGE_URL = `${SITE_URL}/flights`;
const TITLE = "Flight Guides for Muslim Travellers";
const DESCRIPTION =
  "Route guides with the cheapest months to fly, halal meals on board, prayer rooms at each airport and, for Umrah routes, when to enter ihram.";

export const metadata: Metadata = {
  title: `${TITLE} | The Halal Explorer`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website", siteName: "The Halal Explorer" },
};

export default function FlightsIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Flights", item: PAGE_URL },
          ],
        }}
      />
      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Flights</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{TITLE}</h1>
          <p className="max-w-2xl text-lg text-white/85">{DESCRIPTION}</p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {FLIGHT_ROUTES.map((route) => (
            <Link
              key={route.slug}
              href={`/flights/${route.slug}`}
              className="group rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1D6A5B]">
                {route.origin.iata} → {route.destination.iata}
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {route.origin.city} to {route.destination.city}
              </p>
              <p className="mt-1 text-sm text-gray-600">{route.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1D6A5B]">
                Route guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
