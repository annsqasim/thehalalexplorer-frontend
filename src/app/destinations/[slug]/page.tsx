import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { DestinationDetailHero } from "@/components/DestinationDetailHero";
import { StickyNav } from "@/components/StickyNav";
import { ContentSection } from "@/components/ContentSection";
import { CalloutBox } from "@/components/CalloutBox";
import { FormattedProse } from "@/components/FormattedProse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DestinationAffiliateGrid } from "@/components/DestinationAffiliateGrid";
import { RatingRow, FoodItem, MosqueItem } from "@/components/destination-items";
import { BookingComCard, NearbyDestinationsCard } from "@/components/destination-sidebar";
import {
  Info,
  Utensils,
  MapPin,
  Calendar,
  Lightbulb,
  Heart,
  ArrowRight,
  Compass,
} from "lucide-react";
import {
  getIATA,
} from "@/lib/travelpayouts";
import { TpCtaCard } from "@/components/travelpayouts/TpCtaCard";
import { FlightSearchWidget } from "@/components/travelpayouts/FlightSearchWidget";
import { HotelSearchWidget } from "@/components/travelpayouts/HotelSearchWidget";
import { getDestinationBySlug, getAllDestinationSlugs } from "@/lib/destinations";
import { getRelatedBlogPosts } from "@/lib/related-content";
import {
  getDestinationIntro,
  getDestinationAbout,
  getMuslimTravelTips,
  getWhyMuslimsLoveIt,
  getMetaDescription,
  hasQuickFacts,
} from "@/lib/destination-content";
import _get from "lodash/get";
import PrayerTimes from "@/components/PrayerTimes";
import { SITE_URL } from "@/lib/constants/site";
import { JsonLd } from "@/components/JsonLd";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { AdBanner } from "@/components/AdBanner";
import RichText from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";
import type { DestinationQuickFacts } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found | The Halal Explorer" };
  }

  const imageUrl = _get(destination, "image.asset.url", "");
  const title =
    destination.metaTitle ||
    `${destination.name} Muslim-Friendly Travel Guide | The Halal Explorer`;
  const description = getMetaDescription(destination);

  return {
    title,
    description,
    alternates: {
      canonical: destination.canonicalUrl || `${SITE_URL}/destinations/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: destination.canonicalUrl || `${SITE_URL}/destinations/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

function hasPortableText(value: unknown): value is PortableTextBlock[] {
  return Array.isArray(value) && value.length > 0;
}

function QuickFactRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <>
      <Separator />
      <div>
        <p className="text-sm font-semibold text-brand-emerald-600 mb-1">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </>
  );
}

function QuickFactsCard({
  country,
  facts,
  hasHalalFood,
  hasPrayerFacilities,
}: {
  country: string;
  facts?: DestinationQuickFacts;
  hasHalalFood: boolean;
  hasPrayerFacilities: boolean;
}) {
  const showExtended = hasQuickFacts(facts);

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Quick Facts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Country</p>
          <p className="text-gray-900">{country}</p>
        </div>
        {showExtended ? (
          <>
            <QuickFactRow label="Visa Requirements" value={facts?.visa} />
            <QuickFactRow label="Currency" value={facts?.currency} />
            <QuickFactRow label="Time Zone" value={facts?.timezone} />
            <QuickFactRow label="Muslim Population" value={facts?.muslimPopulation} />
            <QuickFactRow label="Main Language" value={facts?.language} />
            <QuickFactRow label="Dress Code" value={facts?.dressCode} />
            <QuickFactRow label="Safety Level" value={facts?.safety} />
          </>
        ) : (
          <>
            {hasHalalFood && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Halal Food</p>
                  <Badge className="bg-brand-emerald-100 text-brand-emerald-800">Available</Badge>
                </div>
              </>
            )}
            {hasPrayerFacilities && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Prayer Facilities</p>
                  <Badge className="bg-brand-emerald-100 text-brand-emerald-800">Available</Badge>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const iata = getIATA(destination.slug.current, destination.iataCode);
  const imageUrl = _get(destination, "image.asset.url", PLACEHOLDER_IMAGE);
  const intro = getDestinationIntro(destination);
  const about = getDestinationAbout(destination);
  const whyMuslimsLoveIt = getWhyMuslimsLoveIt(destination);
  const travelTips = getMuslimTravelTips(destination);
  const hasDetails = hasPortableText(destination.details);
  const hasHalalFood = Boolean(destination.halalFoodInfo || destination.halalFoodItems?.length);
  const hasPrayerFacilities = Boolean(destination.prayerFacilities || destination.mosqueItems?.length);
  const safetyLevel = destination.quickFacts?.safety;

  // Fetch related blog posts for internal linking (SEO)
  const relatedBlogs = await getRelatedBlogPosts(destination.name, destination.country);

  const navSections = [
    intro && { id: "intro", label: "Introduction" },
    about && { id: "about", label: "About" },
    whyMuslimsLoveIt.length > 0 && { id: "why-muslims-love", label: "Why Muslims Love It" },
    hasHalalFood && { id: "halal-food", label: "Halal Food" },
    hasPrayerFacilities && { id: "prayer-facilities", label: "Prayer Facilities" },
    travelTips.length > 0 && { id: "travel-tips", label: "Travel Tips" },
    destination.bestTimeToVisit && { id: "best-time", label: "Best Time to Visit" },
    { id: "plan-your-trip", label: "Plan Your Trip" },
    destination.affiliateProducts && destination.affiliateProducts.length > 0 && { id: "pack-for-trip", label: "Pack for This Trip" },
    destination.conclusion && { id: "conclusion", label: "Conclusion" },
    hasDetails && { id: "guide", label: "Full Guide" },
    { id: "quick-facts", label: "Quick Facts" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      {/* TouristDestination JSON-LD structured data */}
      <JsonLd
        data={{
          '@type': 'TouristDestination',
          name: destination.name,
          description: getMetaDescription(destination),
          image: imageUrl !== PLACEHOLDER_IMAGE ? imageUrl : undefined,
          url: `${SITE_URL}/destinations/${destination.slug.current}`,
          touristType: 'Muslim traveler',
          containedInPlace: {
            '@type': 'Country',
            name: destination.country,
          },
        }}
      />
      {/* FAQPage JSON-LD structured data — only when destination has content */}
      {(hasHalalFood || hasPrayerFacilities) && (
        <JsonLd
          data={{
            '@type': 'FAQPage',
            mainEntity: [
              ...(hasHalalFood
                ? [
                    {
                      '@type': 'Question',
                      name: `Is food halal in ${destination.name}?`,
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text:
                          destination.halalFoodInfo ||
                          `${destination.name} offers halal food options for Muslim travellers. Visit our full guide for details on halal restaurants and dining.`,
                      },
                    },
                  ]
                : []),
              ...(hasPrayerFacilities
                ? [
                    {
                      '@type': 'Question',
                      name: `Where can Muslims pray in ${destination.name}?`,
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text:
                          destination.prayerFacilities ||
                          `${destination.name} has mosques and prayer facilities available for Muslim travellers. See our guide for locations and details.`,
                      },
                    },
                  ]
                : []),
              {
                '@type': 'Question',
                name: `Is ${destination.name} safe for Muslim travellers?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    safetyLevel ||
                    `${destination.name} is generally considered a welcoming destination for Muslim travellers. Check our full guide for the latest safety information and travel tips.`,
                },
              },
            ],
          }}
        />
      )}
      <DestinationDetailHero
        name={destination.name}
        country={destination.country}
        imageUrl={imageUrl}
        highlights={{
          halalFood: hasHalalFood ? "Available" : undefined,
          mosques: hasPrayerFacilities ? "Available" : undefined,
          safety: safetyLevel || (hasHalalFood ? "Muslim-friendly" : undefined),
        }}
      />

      <StickyNav sections={navSections} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RatingRow ratings={destination.ratings} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {intro && (
              <ContentSection id="intro" title="Introduction" icon={<Compass className="h-6 w-6" />}>
                <FormattedProse text={intro} />
              </ContentSection>
            )}

            {about && (
              <ContentSection
                id="about"
                title={`About ${destination.name}`}
                icon={<Info className="h-6 w-6" />}
              >
                <FormattedProse text={about} />
              </ContentSection>
            )}

            {whyMuslimsLoveIt.length > 0 && (
              <div id="why-muslims-love">
                <CalloutBox
                  title="Why Muslims Love This Destination"
                  variant="success"
                  icon={<Heart className="h-6 w-6" />}
                >
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {whyMuslimsLoveIt.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </CalloutBox>
              </div>
            )}

            <AdBanner slot="destination-content" format="banner" />

            {hasHalalFood && (
              <ContentSection
                id="halal-food"
                title={`Halal Food in ${destination.name}`}
                icon={<Utensils className="h-6 w-6" />}
              >
                {destination.halalFoodItems && destination.halalFoodItems.length > 0 ? (
                  <div className="space-y-3">
                    {destination.halalFoodItems.map((item, idx) => (
                      <FoodItem key={idx} item={item} />
                    ))}
                  </div>
                ) : (
                  <FormattedProse text={destination.halalFoodInfo!} />
                )}
              </ContentSection>
            )}

            {hasPrayerFacilities && (
              <ContentSection
                id="prayer-facilities"
                title="Prayer Facilities"
                icon={<MapPin className="h-6 w-6" />}
              >
                {destination.mosqueItems && destination.mosqueItems.length > 0 ? (
                  <div className="space-y-3">
                    {destination.mosqueItems.map((item, idx) => (
                      <MosqueItem key={idx} item={item} />
                    ))}
                  </div>
                ) : (
                  <FormattedProse text={destination.prayerFacilities!} />
                )}
              </ContentSection>
            )}

            {travelTips.length > 0 && (
              <div id="travel-tips">
                <CalloutBox
                  title="Muslim Travel Tips"
                  variant="info"
                  icon={<Lightbulb className="h-6 w-6" />}
                >
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {travelTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CalloutBox>
              </div>
            )}

            {destination.bestTimeToVisit && (
              <ContentSection
                id="best-time"
                title="Best Time to Visit"
                icon={<Calendar className="h-6 w-6" />}
              >
                <FormattedProse text={destination.bestTimeToVisit} />
              </ContentSection>
            )}

            {/* PLAN YOUR TRIP */}
            <section id="plan-your-trip" className="mb-10 pb-10 border-b border-gray-200">
              <p className="text-[#1D6A5B] text-xs font-semibold uppercase tracking-widest mb-2">
                Plan Your Trip
              </p>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">
                Book Flights, Hotels & Activities
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Everything you need to book your trip to {destination.name} in one place.
              </p>

              {/* 2x2 grid of CTA cards on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TpCtaCard type="flights" destinationName={destination.name} destinationIATA={iata} />
                <TpCtaCard type="hotels"  destinationName={destination.name} />
                <TpCtaCard type="tours"   destinationName={destination.name} />
                <TpCtaCard type="insurance" />
              </div>
            </section>

            {destination.affiliateProducts && destination.affiliateProducts.length > 0 && (
              <ContentSection
                id="pack-for-trip"
                title="Pack for This Trip"
                icon={<Compass className="h-6 w-6" />}
              >
                <DestinationAffiliateGrid products={destination.affiliateProducts} />
              </ContentSection>
            )}

            {destination.conclusion && (
              <ContentSection id="conclusion" title="Overview & Conclusion" icon={<Compass className="h-6 w-6" />}>
                <FormattedProse text={destination.conclusion} />
                <div className="mt-6">
                  <Button asChild className="bg-brand-emerald-600 hover:bg-brand-emerald-700">
                    <Link href="/destinations">
                      Explore More Halal-Friendly Destinations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ContentSection>
            )}

            {hasDetails && (
              <ContentSection
                id="guide"
                title={`${destination.name} Travel Guide`}
                icon={<Info className="h-6 w-6" />}
              >
                <div className="prose prose-lg prose-emerald max-w-none text-gray-700">
                  <RichText value={destination.details as PortableTextBlock[]} />
                </div>
              </ContentSection>
            )}
          </div>

          <div className="space-y-6" id="quick-facts">
            <AdBanner slot="destination-sidebar" format="rectangle" />

            <QuickFactsCard
              country={destination.country}
              facts={destination.quickFacts}
              hasHalalFood={hasHalalFood}
              hasPrayerFacilities={hasPrayerFacilities}
            />

            {/* FLIGHT SEARCH WIDGET */}
            <FlightSearchWidget
              originIATA="DXB"
              destinationIATA={iata}
              destinationName={destination.name}
            />

            {/* HOTEL SEARCH WIDGET */}
            <HotelSearchWidget destinationName={destination.name} />

            {/* TOURS CTA */}
            <TpCtaCard
              type="tours"
              destinationName={destination.name}
            />

            {/* INSURANCE CTA */}
            <TpCtaCard
              type="insurance"
            />

            <BookingComCard
              destinationName={destination.name}
              bookingComUrl={destination.bookingComUrl}
            />

            {destination.nearbyDestinations && destination.nearbyDestinations.length > 0 && (
              <NearbyDestinationsCard destinations={destination.nearbyDestinations} />
            )}

            <PrayerTimes city={destination.name} country={destination.country} />

            {/* Related Travel Guides — internal links for SEO */}
            {relatedBlogs.length > 0 && (
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">Related Travel Guides</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul>
                    {relatedBlogs.map((blog) => (
                      <li key={blog.slug} className="border-b border-gray-100 last:border-b-0">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="flex items-start gap-3 py-3 hover:text-[#1D6A5B] transition-colors group"
                        >
                          <span className="bg-[#E8F5F1] text-[#1D6A5B] text-[10px] rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                            Blog
                          </span>
                          <span className="text-gray-900 text-sm font-medium flex-1 group-hover:text-[#1D6A5B] line-clamp-2">
                            {blog.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-soft bg-gradient-to-br from-brand-emerald-50 to-brand-emerald-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Explore More Destinations</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Discover other Muslim-friendly destinations around the world.
                </p>
                <Button asChild className="w-full bg-brand-emerald-600 hover:bg-brand-emerald-700">
                  <Link href="/destinations">
                    View All Destinations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
