import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { WhatsappButton } from "@/components/umrah-packages/InquiryForm";
import { PackageCard, VerifiedBadge } from "@/components/umrah-packages/PackageCard";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants/site";
import { DISCLAIMER, getAgency, getPackages } from "@/lib/umrah-packages";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgency(slug);
  if (!agency) return {};
  const url = `${SITE_URL}/umrah/agencies/${agency.slug}`;
  const title = `${agency.name}: Umrah Packages${agency.city ? ` from ${agency.city}` : ""}`;
  const description =
    agency.about?.slice(0, 155) ||
    `Umrah packages from ${agency.name}, a verified agency${agency.city ? ` in ${agency.city}` : ""}. Compare hotels and prices, then send an inquiry.`;
  return {
    title: `${title} | The Halal Explorer`,
    description,
    alternates: { canonical: url },
    openGraph: { images: [agency.logoUrl ?? DEFAULT_OG_IMAGE], title, description, url, type: "website", siteName: "The Halal Explorer" },
  };
}

export default async function AgencyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const agency = await getAgency(slug);
  if (!agency) notFound();
  const packages = await getPackages({ agencySlug: agency.slug });
  const url = `${SITE_URL}/umrah/agencies/${agency.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Umrah Packages", item: `${SITE_URL}/umrah/packages` },
            { "@type": "ListItem", position: 3, name: agency.name, item: url },
          ],
        }}
      />
      <JsonLd
        data={{
          "@type": "TravelAgency",
          name: agency.name,
          url,
          ...(agency.logoUrl ? { logo: agency.logoUrl } : {}),
          ...(agency.website ? { sameAs: [agency.website] } : {}),
          ...(agency.city ? { address: { "@type": "PostalAddress", addressLocality: agency.city, addressCountry: agency.country } } : {}),
        }}
      />

      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/umrah/packages" className="hover:text-white">Umrah Packages</Link>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              {agency.logoUrl && (
                <Image src={agency.logoUrl} alt="" width={72} height={72} className="rounded-xl bg-white object-contain p-1" />
              )}
              <div>
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">{agency.name}</h1>
                <p className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                  {[agency.city, agency.country].filter(Boolean).join(", ")}
                  {agency.isVerified && <VerifiedBadge />}
                </p>
              </div>
            </div>
            {agency.whatsapp && (
              <div className="w-full md:w-60">
                <WhatsappButton number={agency.whatsapp} text={`Assalamu alaikum, I found ${agency.name} on The Halal Explorer and have a question about your Umrah packages.`} />
              </div>
            )}
          </div>
          {agency.about && <p className="mt-6 max-w-3xl leading-relaxed text-white/85">{agency.about}</p>}
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/75">
            {agency.registrationNumber && (
              <div><dt className="inline text-white">Registration: </dt><dd className="inline">{agency.registrationNumber}</dd></div>
            )}
            {agency.saudiPartner && (
              <div><dt className="inline text-white">Saudi partner: </dt><dd className="inline">{agency.saudiPartner}</dd></div>
            )}
            {agency.website && (
              <div>
                <a href={agency.website} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 underline hover:text-white">
                  Website <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Packages</h2>
          {packages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">This agency has no packages listed right now.</p>
          )}
          <p className="mt-10 rounded-xl bg-[#F9FAFB] p-4 text-xs leading-relaxed text-gray-600">{DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
