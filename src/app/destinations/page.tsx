import { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";
import { DestinationCard } from "@/components/DestinationCard";
import { getAllDestinations } from "@/lib/destinations";
import { Destination } from "@/types";
import _get from "lodash/get";
import { destinationsPageContent } from "@/data/destinations";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Muslim-Friendly Destinations | The Halal Explorer - 50+ Halal Travel Guides",
  description:
    "Explore 50+ Muslim-friendly travel destinations with halal food, prayer facilities, and local customs. Kuala Lumpur, Istanbul, Dubai, Tokyo, London and more.",
  keywords: [
    "halal destinations",
    "Muslim-friendly travel",
    "halal food",
    "prayer facilities",
    "Islamic travel",
    "halal tourism",
    "Muslim travel guide",
  ],
  openGraph: {
    title: "Muslim-Friendly Destinations | The Halal Explorer",
    description: "Explore our curated list of Muslim-friendly travel destinations",
  },
};

export default async function DestinationsPage() {
  const destinations: Destination[] = await getAllDestinations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-emerald-600 to-emerald-700 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/80 hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Destinations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Muslim-Friendly Destinations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Discover destinations that welcome and accommodate Muslim travelers with halal food, prayer facilities, and cultural understanding.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Intro Section */}
      <Section className="bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {destinationsPageContent.seoIntro}
            </p>
          </div>
        </div>
      </Section>

      {/* Destinations Grid */}
      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination: Destination, index: number) => (
            <DestinationCard
              key={destination._id}
              name={destination.name}
              country={destination.country}
              description={destination.description}
              imageUrl={_get(destination, "image.asset.url", PLACEHOLDER_IMAGE)}
              slug={destination.slug.current}
              index={index}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
