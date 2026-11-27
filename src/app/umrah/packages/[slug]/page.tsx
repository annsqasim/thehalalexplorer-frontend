import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, Hotel, MapPin, Moon } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/umrah-packages/InquiryForm";
import { Stars, VerifiedBadge } from "@/components/umrah-packages/PackageCard";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants/site";
import {
  DISCLAIMER,
  SHARING_ORDER,
  formatDistance,
  formatMonth,
  formatPrice,
  getPackage,
  type PackageHotel,
} from "@/lib/umrah-packages";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return {};
  const url = `${SITE_URL}/umrah/packages/${pkg.slug}`;
  const description = `${pkg.totalNights} nights (${pkg.makkahNights} Makkah, ${pkg.madinahNights} Madinah) from ${pkg.departureCity} with ${pkg.agency.name}. From ${formatPrice(pkg.priceFrom, pkg.currency)} per person. Compare hotels and send an inquiry.`;
  return {
    title: `${pkg.title} | Umrah Packages | The Halal Explorer`,
    description,
    alternates: { canonical: url },
    openGraph: {
      images: [pkg.imageUrl ?? DEFAULT_OG_IMAGE],
      title: pkg.title,
      description,
      url,
      type: "website",
      siteName: "The Halal Explorer",
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function HotelCard({ city, hotel, nights }: { city: string; hotel: PackageHotel; nights: number }) {
  const distance = formatDistance(hotel.distanceMeters);
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#1D6A5B]">
        {city} · {nights} {nights === 1 ? "night" : "nights"}
      </p>
      <p className="flex items-start gap-2 font-semibold text-gray-900">
        <Hotel className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden /> {hotel.name}
      </p>
      <p className="mt-1 text-sm"><Stars count={hotel.stars} /></p>
      {distance && <p className="mt-1 text-sm text-gray-600">{distance}</p>}
    </div>
  );
}

export default async function UmrahPackagePage({ params }: { params: Params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();

  const url = `${SITE_URL}/umrah/packages/${pkg.slug}`;
  const prices = [...pkg.prices].sort((a, b) => SHARING_ORDER.indexOf(a.sharing) - SHARING_ORDER.indexOf(b.sharing));
  const amounts = prices.map((p) => p.amount);
  const upcomingDates = pkg.departureDates.filter((d) => d >= new Date().toISOString().slice(0, 10));

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Umrah Guide", item: `${SITE_URL}/umrah` },
            { "@type": "ListItem", position: 3, name: "Umrah Packages", item: `${SITE_URL}/umrah/packages` },
            { "@type": "ListItem", position: 4, name: pkg.title, item: url },
          ],
        }}
      />
      {/* Offer data only: no ratings until we have real, verified reviews */}
      <JsonLd
        data={{
          "@type": "Product",
          name: pkg.title,
          description: `${pkg.totalNights}-night Umrah package from ${pkg.departureCity}: ${pkg.makkahNights} nights in Makkah, ${pkg.madinahNights} in Madinah.`,
          image: pkg.imageUrls.length ? pkg.imageUrls : undefined,
          brand: { "@type": "Organization", name: pkg.agency.name },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: pkg.currency,
            lowPrice: Math.min(...amounts),
            highPrice: Math.max(...amounts),
            offerCount: amounts.length,
            url,
            seller: { "@type": "Organization", name: pkg.agency.name },
            ...(pkg.validUntil ? { priceValidUntil: pkg.validUntil } : {}),
          },
        }}
      />

      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/umrah" className="hover:text-white">Umrah Guide</Link>
            <span className="mx-2">/</span>
            <Link href="/umrah/packages" className="hover:text-white">Packages</Link>
          </nav>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <Link href={`/umrah/agencies/${pkg.agency.slug}`} className="font-semibold text-white hover:underline">
              {pkg.agency.name}
            </Link>
            {pkg.agency.isVerified && <VerifiedBadge />}
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" aria-hidden /> From {pkg.departureCity}</span>
            <span className="inline-flex items-center gap-1">
              <Moon className="h-4 w-4" aria-hidden /> {pkg.totalNights} nights
            </span>
          </div>
          <p className="mt-5 text-white/85">
            From <span className="text-3xl font-bold text-white">{formatPrice(pkg.priceFrom, pkg.currency)}</span> per person
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-10">
          {pkg.imageUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {pkg.imageUrls.slice(0, 6).map((src, i) => (
                <div key={src} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 h-64 sm:h-80" : "h-32 sm:h-[9.5rem]"}`}>
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority={i === 0} />
                </div>
              ))}
            </div>
          )}

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Hotels</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <HotelCard city="Makkah" hotel={pkg.makkahHotel} nights={pkg.makkahNights} />
              <HotelCard city="Madinah" hotel={pkg.madinahHotel} nights={pkg.madinahNights} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Price per person</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Room sharing</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">Price per person</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prices.map((p) => (
                    <tr key={p.sharing}>
                      <td className="px-4 py-3 capitalize text-gray-900">{p.sharing}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatPrice(p.amount, pkg.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">Prices are set by the agency. Confirm the final price before you pay.</p>
          </section>

          {(pkg.months.length > 0 || upcomingDates.length > 0) && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">When it departs</h2>
              {upcomingDates.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {upcomingDates.map((d) => (
                    <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5F1] px-3 py-1 text-sm text-[#1D6A5B]">
                      <CalendarDays className="h-4 w-4" aria-hidden /> {dateFormat.format(new Date(`${d}T00:00:00Z`))}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{pkg.months.map(formatMonth).join(", ")}</p>
              )}
              {pkg.validUntil && (
                <p className="mt-3 text-sm text-gray-500">Offer valid until {dateFormat.format(new Date(`${pkg.validUntil}T00:00:00Z`))}.</p>
              )}
            </section>
          )}

          {pkg.includes.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">What's included</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-[#1D6A5B]" aria-hidden />
                    <span className="first-letter:uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pkg.notes && (
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Notes from the agency</h2>
              <p className="whitespace-pre-line leading-relaxed text-gray-700">{pkg.notes}</p>
            </section>
          )}

          <section className="rounded-xl border border-gray-200 p-5">
            <div className="flex items-start gap-4">
              {pkg.agency.logoUrl && (
                <Image src={pkg.agency.logoUrl} alt="" width={56} height={56} className="rounded-lg object-contain" />
              )}
              <div>
                <p className="flex flex-wrap items-center gap-2 font-semibold text-gray-900">
                  {pkg.agency.name} {pkg.agency.isVerified && <VerifiedBadge />}
                </p>
                {pkg.agency.city && <p className="text-sm text-gray-500">{[pkg.agency.city, pkg.agency.country].filter(Boolean).join(", ")}</p>}
                {pkg.agency.about && <p className="mt-2 text-sm leading-relaxed text-gray-700">{pkg.agency.about}</p>}
                <dl className="mt-3 grid gap-1 text-sm text-gray-600">
                  {pkg.agency.registrationNumber && (
                    <div><dt className="inline font-medium text-gray-700">Registration: </dt><dd className="inline">{pkg.agency.registrationNumber}</dd></div>
                  )}
                  {pkg.agency.saudiPartner && (
                    <div><dt className="inline font-medium text-gray-700">Saudi partner: </dt><dd className="inline">{pkg.agency.saudiPartner}</dd></div>
                  )}
                </dl>
                <Link href={`/umrah/agencies/${pkg.agency.slug}`} className="mt-3 inline-block text-sm font-semibold text-[#1D6A5B] hover:underline">
                  All packages from {pkg.agency.name}
                </Link>
              </div>
            </div>
          </section>

          <p className="rounded-xl bg-[#F9FAFB] p-4 text-xs leading-relaxed text-gray-600">{DISCLAIMER}</p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-bold text-gray-900">Ask {pkg.agency.name}</h2>
            <p className="mb-4 text-sm text-gray-600">They usually reply by phone or WhatsApp.</p>
            <InquiryForm
              packageSlug={pkg.slug}
              packageTitle={pkg.title}
              agencyName={pkg.agency.name}
              agencyWhatsapp={pkg.agency.whatsapp}
              months={pkg.months}
            />
          </div>
        </aside>
      </div>
    </>
  );
}
