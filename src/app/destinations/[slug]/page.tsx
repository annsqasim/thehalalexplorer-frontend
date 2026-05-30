import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { DestinationDetailHero } from "@/components/DestinationDetailHero";
import { StickyNav } from "@/components/StickyNav";
import { ContentSection } from "@/components/ContentSection";
import { CalloutBox } from "@/components/CalloutBox";
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
  ArrowRight,
} from "lucide-react";
import { getDestinationBySlug, getAllDestinationSlugs } from "@/lib/destinations";
import _get from "lodash/get";
import PrayerTimes from "@/components/PrayerTimes";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { AdBanner } from "@/components/AdBanner";
import RichText from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";

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
    return {
      title: "Destination Not Found | The Halal Explorer",
    };
  }

  const imageUrl = _get(destination, "image.asset.url", "");
  const title =
    destination.metaTitle ||
    `${destination.name}, ${destination.country} - Muslim-Friendly Travel Guide | The Halal Explorer`;
  const description =
    destination.metaDescription ||
    destination.description ||
    `Discover ${destination.name}, ${destination.country} — halal food, prayer facilities, and travel tips for Muslim visitors.`;

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

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const imageUrl = _get(destination, "image.asset.url", PLACEHOLDER_IMAGE);
  const travelTips = destination.travelTips?.filter(Boolean) ?? [];
  const hasDetails = hasPortableText(destination.details);

  const navSections = [
    destination.description && { id: "about", label: "About" },
    hasDetails && { id: "guide", label: "Full Guide" },
    destination.halalFoodInfo && { id: "halal-food", label: "Halal Food" },
    destination.prayerFacilities && { id: "prayer-facilities", label: "Prayer Facilities" },
    destination.bestTimeToVisit && { id: "best-time", label: "Best Time to Visit" },
    travelTips.length > 0 && { id: "travel-tips", label: "Travel Tips" },
    { id: "quick-facts", label: "Quick Facts" },
  ].filter(Boolean) as { id: string; label: string }[];

  const hasHalalFood = Boolean(destination.halalFoodInfo);
  const hasPrayerFacilities = Boolean(destination.prayerFacilities);

  return (
    <>
      <DestinationDetailHero
        name={destination.name}
        country={destination.country}
        imageUrl={imageUrl}
        highlights={{
          halalFood: hasHalalFood ? "Available" : undefined,
          mosques: hasPrayerFacilities ? "Available" : undefined,
          safety: "Muslim-friendly",
        }}
      />

      <StickyNav sections={navSections} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {destination.description && (
              <ContentSection
                id="about"
                title={`About ${destination.name}`}
                icon={<Info className="h-6 w-6" />}
              >
                <p className="text-gray-700 leading-relaxed text-lg">
                  {destination.description}
                </p>
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

            <AdBanner slot="destination-content" format="banner" />

            {destination.halalFoodInfo && (
              <ContentSection
                id="halal-food"
                title="Halal Food Scene"
                icon={<Utensils className="h-6 w-6" />}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {destination.halalFoodInfo}
                </p>
              </ContentSection>
            )}

            {destination.prayerFacilities && (
              <ContentSection
                id="prayer-facilities"
                title="Prayer Facilities"
                icon={<MapPin className="h-6 w-6" />}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {destination.prayerFacilities}
                </p>
              </ContentSection>
            )}

            {destination.bestTimeToVisit && (
              <ContentSection
                id="best-time"
                title="Best Time to Visit"
                icon={<Calendar className="h-6 w-6" />}
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {destination.bestTimeToVisit}
                </p>
              </ContentSection>
            )}

            {travelTips.length > 0 && (
              <div id="travel-tips">
                <CalloutBox
                  title="Travel Tips for Muslims"
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
          </div>

          <div className="space-y-6" id="quick-facts">
            <AdBanner slot="destination-sidebar" format="rectangle" />

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Country</p>
                  <p className="text-gray-900">{destination.country}</p>
                </div>
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
              </CardContent>
            </Card>

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
