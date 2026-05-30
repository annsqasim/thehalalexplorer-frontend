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
import { getDestinationBySlug, getAllDestinationSlugs } from "@/lib/destinations";
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
    openGraph: {
      title,
      description,
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

  const imageUrl = _get(destination, "image.asset.url", PLACEHOLDER_IMAGE);
  const intro = getDestinationIntro(destination);
  const about = getDestinationAbout(destination);
  const whyMuslimsLoveIt = getWhyMuslimsLoveIt(destination);
  const travelTips = getMuslimTravelTips(destination);
  const hasDetails = hasPortableText(destination.details);
  const hasHalalFood = Boolean(destination.halalFoodInfo);
  const hasPrayerFacilities = Boolean(destination.prayerFacilities);
  const safetyLevel = destination.quickFacts?.safety;

  const navSections = [
    intro && { id: "intro", label: "Introduction" },
    about && { id: "about", label: "About" },
    whyMuslimsLoveIt.length > 0 && { id: "why-muslims-love", label: "Why Muslims Love It" },
    hasHalalFood && { id: "halal-food", label: "Halal Food" },
    hasPrayerFacilities && { id: "prayer-facilities", label: "Prayer Facilities" },
    travelTips.length > 0 && { id: "travel-tips", label: "Travel Tips" },
    destination.bestTimeToVisit && { id: "best-time", label: "Best Time to Visit" },
    destination.conclusion && { id: "conclusion", label: "Plan Your Trip" },
    hasDetails && { id: "guide", label: "Full Guide" },
    { id: "quick-facts", label: "Quick Facts" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
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
                <FormattedProse text={destination.halalFoodInfo!} />
              </ContentSection>
            )}

            {hasPrayerFacilities && (
              <ContentSection
                id="prayer-facilities"
                title="Prayer Facilities"
                icon={<MapPin className="h-6 w-6" />}
              >
                <FormattedProse text={destination.prayerFacilities!} />
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

            {destination.conclusion && (
              <ContentSection id="conclusion" title="Plan Your Trip" icon={<Compass className="h-6 w-6" />}>
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

            <PrayerTimes city={destination.name} country={destination.country} />

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
