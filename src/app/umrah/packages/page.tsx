import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PackageCard } from "@/components/umrah-packages/PackageCard";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants/site";
import {
  CURRENCIES,
  DEPARTURE_CITIES,
  DISCLAIMER,
  formatMonth,
  getPackages,
  type PackageCurrency,
  type PackageFilters,
} from "@/lib/umrah-packages";

export const revalidate = 300;

const PAGE_URL = `${SITE_URL}/umrah/packages`;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function parseFilters(sp: Record<string, string | string[] | undefined>): PackageFilters {
  const from = first(sp.from).toLowerCase();
  const month = first(sp.month);
  const currency = first(sp.currency).toUpperCase();
  const max = Number(first(sp.max));
  const stars = Number(first(sp.stars));
  return {
    from: DEPARTURE_CITIES.some((c) => c.toLowerCase() === from) ? from : undefined,
    month: /^\d{4}-(0[1-9]|1[0-2])$/.test(month) ? month : undefined,
    currency: CURRENCIES.includes(currency as PackageCurrency) ? (currency as PackageCurrency) : undefined,
    max: Number.isFinite(max) && max > 0 ? Math.round(max) : undefined,
    stars: Number.isInteger(stars) && stars >= 1 && stars <= 5 ? stars : undefined,
  };
}

const cityName = (from?: string) => DEPARTURE_CITIES.find((c) => c.toLowerCase() === from);

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  const city = cityName(filters.from);
  // Departure-city views are landing pages of their own; other filter
  // combinations canonicalise to them so they don't compete in search.
  const canonical = city ? `${PAGE_URL}?from=${filters.from}` : PAGE_URL;
  const title = city ? `Umrah Packages from ${city}: Compare Verified Agencies` : "Umrah Packages: Compare Verified Agencies";
  const description = city
    ? `Umrah packages departing from ${city}, from verified agencies. Compare hotels, distance to the Haram, nights and prices, then ask the agency directly.`
    : "Compare Umrah packages from verified agencies in Pakistan and Singapore. Filter by departure city, month, budget and hotel level, then send an inquiry.";
  return {
    title: `${title} | The Halal Explorer`,
    description,
    alternates: { canonical },
    openGraph: { images: [DEFAULT_OG_IMAGE], title, description, url: canonical, type: "website", siteName: "The Halal Explorer" },
  };
}

function nextMonths(count: number): string[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    return d.toISOString().slice(0, 7);
  });
}

const selectClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#1D6A5B] focus:outline-none";

export default async function UmrahPackagesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const city = cityName(filters.from);
  const hasFilters = Object.values(filters).some(Boolean);
  const packages = await getPackages(filters);
  // Distinguishes "no match for these filters" from "no packages listed yet"
  const anyPackages = packages.length > 0 || (hasFilters && (await getPackages()).length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Umrah Guide", item: `${SITE_URL}/umrah` },
            { "@type": "ListItem", position: 3, name: "Umrah Packages", item: PAGE_URL },
          ],
        }}
      />
      {packages.length > 0 && (
        <JsonLd
          data={{
            "@type": "ItemList",
            itemListElement: packages.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${PAGE_URL}/${p.slug}`,
              name: p.title,
            })),
          }}
        />
      )}

      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/umrah" className="hover:text-white">Umrah Guide</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Packages</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {city ? `Umrah packages from ${city}` : "Umrah packages"}
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Compare packages from verified agencies: hotels and their distance to the Haram, nights in Makkah and
            Madinah, what's included and the price per person. Then ask the agency directly.
          </p>
          <p className="mt-4 inline-flex items-start gap-2 text-sm text-white/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden />
            We only list agencies whose government registration and Saudi Umrah partner we have checked.
          </p>
        </div>
      </section>

      {/* Filters: a plain GET form, so filtered views are shareable and work without JavaScript */}
      <section className="border-b border-gray-200 bg-[#F9FAFB]">
        <form method="get" action="/umrah/packages" className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:px-6 md:grid-cols-6 lg:px-8">
          <label className="text-xs font-medium text-gray-700">
            Departing from
            <select name="from" defaultValue={filters.from ?? ""} className={`${selectClass} mt-1`}>
              <option value="">Any city</option>
              {DEPARTURE_CITIES.map((c) => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-gray-700">
            Month
            <select name="month" defaultValue={filters.month ?? ""} className={`${selectClass} mt-1`}>
              <option value="">Any month</option>
              {nextMonths(12).map((m) => (
                <option key={m} value={m}>{formatMonth(m)}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-gray-700">
            Currency
            <select name="currency" defaultValue={filters.currency ?? ""} className={`${selectClass} mt-1`}>
              <option value="">Any</option>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-gray-700">
            Max price per person
            <input
              name="max"
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              defaultValue={filters.max ?? ""}
              placeholder="No limit"
              className={`${selectClass} mt-1`}
            />
          </label>
          <label className="text-xs font-medium text-gray-700">
            Hotels
            <select name="stars" defaultValue={filters.stars ? String(filters.stars) : ""} className={`${selectClass} mt-1`}>
              <option value="">Any</option>
              <option value="3">3★ and up</option>
              <option value="4">4★ and up</option>
              <option value="5">5★</option>
            </select>
          </label>
          <div className="col-span-2 flex items-end gap-2 md:col-span-1">
            <button type="submit" className="flex-1 rounded-lg bg-[#1D6A5B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#16574A]">
              Filter
            </button>
            {hasFilters && (
              <Link href="/umrah/packages" className="rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900">
                Clear
              </Link>
            )}
          </div>
        </form>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {packages.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-gray-600">
                {packages.length} {packages.length === 1 ? "package" : "packages"}
                {filters.max && !filters.currency && " (budget applies to prices in each package's own currency)"}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} />
                ))}
              </div>
            </>
          ) : anyPackages ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-gray-700">No packages match these filters.</p>
              <Link href="/umrah/packages" className="font-semibold text-[#1D6A5B] hover:underline">See all packages</Link>
            </div>
          ) : (
            <div className="mx-auto max-w-xl py-16 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Packages are coming soon</h2>
              <p className="mb-6 text-gray-600">
                We're adding packages from verified agencies. Meanwhile, estimate your costs and read our Umrah guides.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/umrah" className="rounded-lg bg-[#1D6A5B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#16574A]">
                  Umrah Guide
                </Link>
                <Link href="/contact" className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#1D6A5B]">
                  Are you an agency? Get listed
                </Link>
              </div>
            </div>
          )}
          <p className="mt-10 rounded-xl bg-[#F9FAFB] p-4 text-xs leading-relaxed text-gray-600">{DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
