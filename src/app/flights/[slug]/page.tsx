import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { BookingCtaCard } from "@/components/booking/BookingCtaCard";
import { FlightSearchWidget } from "@/components/booking/FlightSearchWidget";
import { FLIGHT_ROUTES, getFlightRoute, type FlightRoute } from "@/data/flight-routes";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants/site";
import { getRouteFares, travelProvider, type RouteFares } from "@/lib/travel-data";

// Fares are cached for a day by the provider; the page itself can refresh hourly.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return FLIGHT_ROUTES.map((route) => ({ slug: route.slug }));
}

function titleFor(route: FlightRoute) {
  return `Flights from ${route.origin.city} to ${route.destination.city}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = getFlightRoute(slug);
  if (!route) return {};
  const title = `${titleFor(route)}: Fares, Halal Meals${route.umrah ? " & Ihram Guide" : " & Prayer Rooms"}`;
  const description = `${route.flightTime.split(";")[0]}. Cheapest months to fly ${route.origin.city} to ${route.destination.city}, ${
    route.umrah ? "when to enter ihram on the plane, " : ""
  }halal meals on board and prayer rooms at both airports.`;
  const url = `${SITE_URL}/flights/${route.slug}`;
  return {
    title: `${title} | The Halal Explorer`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: "The Halal Explorer" },
  };
}

const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function stopsLabel(transfers?: number) {
  if (transfers === undefined) return "—";
  return transfers === 0 ? "Non-stop" : `${transfers} stop${transfers > 1 ? "s" : ""}`;
}

function FareTable({ data, route }: { data: RouteFares; route: FlightRoute }) {
  const cheapest = Math.min(...data.fares.map((f) => f.price));
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Cheapest months to fly</h2>
        <p className="mb-6 text-sm text-gray-600">
          Lowest fares travellers found recently from {route.origin.city} to {route.destination.city}, by
          departure month. Fares change constantly; use them to pick a month, then check live prices.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Departure month</th>
                <th scope="col" className="px-4 py-3 font-semibold">From</th>
                <th scope="col" className="px-4 py-3 font-semibold">Stops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.fares.map((fare) => (
                <tr key={fare.month} className={fare.price === cheapest ? "bg-[#E8F5F1]" : undefined}>
                  <td className="px-4 py-3 text-gray-900">{monthFormat.format(new Date(`${fare.month}-01T00:00:00Z`))}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {money(fare.price)}
                    {fare.price === cheapest && (
                      <span className="ml-2 rounded-full bg-[#1D6A5B] px-2 py-0.5 text-xs font-medium text-white">Cheapest</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{stopsLabel(fare.transfers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Source: {data.source}. Updated {dateFormat.format(new Date(data.fetchedAt))}. Prices in US dollars.
        </p>
      </div>
    </section>
  );
}

export default async function FlightRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getFlightRoute(slug);
  if (!route) notFound();

  const pageUrl = `${SITE_URL}/flights/${route.slug}`;
  const title = titleFor(route);
  const [fares, posts] = await Promise.all([
    getRouteFares(route.origin.iata, route.destination.iata),
    getAllBlogPosts().catch(() => []),
  ]);
  const relatedPosts = route.relatedPosts
    .map((s) => posts.find((p) => p.slug?.current === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const cheapest = fares ? Math.min(...fares.fares.map((f) => f.price)) : null;
  const otherRoutes = FLIGHT_ROUTES.filter((r) => r.slug !== route.slug);

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Flights", item: `${SITE_URL}/flights` },
            { "@type": "ListItem", position: 3, name: title, item: pageUrl },
          ],
        }}
      />
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: route.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/flights" className="hover:text-white">Flights</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{route.origin.city} to {route.destination.city}</span>
            </nav>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">{route.tagline}</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">{route.intro}</p>
            {cheapest !== null && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Plane className="h-4 w-4 text-[#F59E0B]" aria-hidden />
                Fares seen recently from <strong className="text-white">{money(cheapest)}</strong>
              </p>
            )}
          </div>
          <div className="self-start">
            <FlightSearchWidget
              originIATA={route.origin.iata}
              destinationIATA={route.destination.iata}
              destinationName={route.destination.city}
            />
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="border-b border-gray-200 bg-[#F9FAFB] py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1D6A5B]" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-gray-900">Flight time</p>
              <p className="text-sm text-gray-600">{route.flightTime}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <PlaneTakeoff className="mt-0.5 h-5 w-5 shrink-0 text-[#1D6A5B]" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-gray-900">{route.origin.city} airports</p>
              <p className="text-sm text-gray-600">
                {route.origin.airports.map((a) => `${a.name} (${a.code})`).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <PlaneLanding className="mt-0.5 h-5 w-5 shrink-0 text-[#1D6A5B]" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-gray-900">Arriving at</p>
              <p className="text-sm text-gray-600">
                {route.destination.airports.map((a) => `${a.name} (${a.code})`).join(", ")}
              </p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl px-4 text-sm text-gray-600 sm:px-6 lg:px-8">
          <strong className="text-gray-900">Non-stop flights:</strong> {route.nonStop}
        </p>
      </section>

      {fares && <FareTable data={fares} route={route} />}

      {/* Route guide */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {route.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mb-4 leading-relaxed text-gray-700">{p}</p>
              ))}
              {section.links && (
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1D6A5B] hover:underline">
                        {link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section className="bg-[#F9FAFB] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Book your trip</h2>
          {travelProvider.id !== "none" && (
            <p className="mb-8 max-w-2xl text-sm text-gray-500">
              These are affiliate links. You pay nothing extra, and we earn a small commission that keeps this guide free.
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BookingCtaCard type="flights" destinationName={route.destination.city} destinationIATA={route.destination.iata} />
            <BookingCtaCard type="hotels" destinationName={route.umrah ? "Makkah" : route.destination.city} />
            <BookingCtaCard type="insurance" />
          </div>
        </div>
      </section>

      {/* Further reading */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Plan the rest of your trip</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {route.umrah && (
              <Link href="/umrah" className="rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md">
                <p className="font-semibold text-gray-900">Umrah Guide</p>
                <p className="mt-1 text-sm text-gray-600">Costs, visas, Nusuk permits and the rites, step by step.</p>
              </Link>
            )}
            {route.destination.destinationSlug && (
              <Link href={`/destinations/${route.destination.destinationSlug}`} className="rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md">
                <p className="font-semibold text-gray-900">
                  {route.umrah ? "Makkah" : route.destination.city} city guide
                </p>
                <p className="mt-1 text-sm text-gray-600">Halal food, prayer times and getting around.</p>
              </Link>
            )}
            {relatedPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="rounded-xl border border-gray-200 p-5 transition-shadow hover:shadow-md">
                <p className="font-semibold text-gray-900">{post.title}</p>
                {post.shortDescription && <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.shortDescription}</p>}
              </Link>
            ))}
          </div>
          {otherRoutes.length > 0 && (
            <p className="mt-8 text-sm text-gray-600">
              Other routes:{" "}
              {otherRoutes.map((r, i) => (
                <span key={r.slug}>
                  {i > 0 && " · "}
                  <Link href={`/flights/${r.slug}`} className="font-semibold text-[#1D6A5B] hover:underline">
                    {r.origin.city} to {r.destination.city}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F9FAFB] py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            {route.origin.city} to {route.destination.city}: common questions
          </h2>
          <div className="space-y-3">
            {route.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[#1D6A5B] transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-500">
            Last checked: {route.lastChecked}. Schedules and rules change, so confirm with your airline before you travel.
          </p>
        </div>
      </section>
    </>
  );
}
