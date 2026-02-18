import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
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
  Heart, 
  Lightbulb,
  ArrowRight,
  Shield
} from "lucide-react";
import { getDestinationBySlug, getAllDestinationSlugs } from "@/lib/destinations";
import { Destination } from "@/types";
import _get from "lodash/get";
import PrayerTimes from "@/components/PrayerTimes";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { AdBanner } from "@/components/AdBanner";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  
  if (!destination) {
    return {
      title: "Destination Not Found | The Halal Explorer",
    };
  }

  const imageUrl = _get(destination, "image.asset.url", "");
  return {
    title: `${destination.name}, ${destination.country} - Muslim-Friendly Travel Guide | The Halal Explorer`,
    description: destination.description || `Discover ${destination.name}, ${destination.country} - a Muslim-friendly destination with halal food, prayer facilities, and cultural insights.`,
    openGraph: {
      title: `${destination.name}, ${destination.country} - Muslim-Friendly Travel Guide`,
      description: destination.description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function DestinationDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const imageUrl = _get(destination, "image.asset.url", PLACEHOLDER_IMAGE);
  
  const navSections = [
    { id: "about", label: "About" },
    { id: "halal-food", label: "Halal Food" },
    { id: "prayer-facilities", label: "Prayer Facilities" },
    { id: "best-time", label: "Best Time to Visit" },
    { id: "quick-facts", label: "Quick Facts" },
  ];

  return (
    <>
      <DestinationDetailHero
        name={destination.name}
        country={destination.country}
        imageUrl={imageUrl}
        highlights={{
          halalFood: "Available",
          mosques: "Multiple locations",
          safety: "Muslim-friendly",
        }}
      />

      <StickyNav sections={navSections} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ContentSection
              id="about"
              title={`About ${destination.name}`}
              icon={<Info className="h-6 w-6" />}
            >
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                {destination.description}
              </p>
            </ContentSection>

            <AdBanner slot="destination-content" format="banner" />

            <ContentSection
              id="halal-food"
              title="Halal Food Scene"
              icon={<Utensils className="h-6 w-6" />}
            >
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  {destination.halalFoodInfo || `Halal food options are readily available throughout ${destination.name}. The city offers a diverse range of halal restaurants serving authentic local cuisine as well as international dishes.`}
                </p>
                <div className="bg-brand-emerald-50 border-l-4 border-brand-emerald-600 p-4 my-4">
                  <p className="text-sm font-semibold text-brand-emerald-900 mb-1">💡 Tip</p>
                  <p className="text-sm text-brand-emerald-800">
                    Look for halal certification logos or ask restaurant staff about halal options. Many restaurants in {destination.name} are Muslim-owned and serve halal food.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="prayer-facilities"
              title="Prayer Facilities"
              icon={<MapPin className="h-6 w-6" />}
            >
              <div className="text-gray-700 leading-relaxed">
                <p>
                  {destination.prayerFacilities || `${destination.name} has several mosques and prayer facilities throughout the city. Most shopping malls, airports, and major tourist areas have dedicated prayer rooms for Muslim travelers.`}
                </p>
              </div>
            </ContentSection>

            <ContentSection
              id="best-time"
              title="Best Time to Visit"
              icon={<Calendar className="h-6 w-6" />}
            >
              <div className="text-gray-700 leading-relaxed">
                <p>
                  {destination.bestTimeToVisit || `The best time to visit ${destination.name} depends on your preferences. The city offers pleasant weather and cultural experiences year-round.`}
                </p>
              </div>
            </ContentSection>

            <CalloutBox
              title="Why Muslims Love This Destination"
              variant="success"
              icon={<Heart className="h-6 w-6" />}
            >
              <p className="mb-2">
                {destination.name} is particularly popular among Muslim travelers for its welcoming atmosphere, abundance of halal food options, and rich Islamic heritage. The local community is friendly and accommodating to Muslim visitors.
              </p>
            </CalloutBox>

            <CalloutBox
              title="Travel Tips for Muslims"
              variant="info"
              icon={<Lightbulb className="h-6 w-6" />}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Download a prayer times app for accurate salah times</li>
                <li>Carry a prayer mat and hijab/scarf for convenience</li>
                <li>Research halal restaurants before your visit</li>
                <li>Respect local customs and dress modestly</li>
                <li>Keep contact information for local mosques handy</li>
              </ul>
            </CalloutBox>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Muslim Population</p>
                  <p className="text-gray-900">Significant Muslim community</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Halal Food</p>
                  <Badge className="bg-brand-emerald-100 text-brand-emerald-800">Widely Available</Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-brand-emerald-600 mb-1">Prayer Facilities</p>
                  <Badge className="bg-brand-emerald-100 text-brand-emerald-800">Multiple Locations</Badge>
                </div>
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
