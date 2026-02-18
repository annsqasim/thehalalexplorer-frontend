import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section, SectionHeader } from '@/components/Section';
import { DestinationCard } from '@/components/DestinationCard';
import { FeatureCard } from '@/components/FeatureCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedDestinations, getAllDestinations } from '@/lib/destinations';
import { getHomepageData } from '@/lib/sanity/queries';
import { Destination } from "@/types";
import _get from 'lodash/get';
import { homepageContent } from '@/data/homepage';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import DestinationAutocomplete from '@/components/DestinationAutocomplete';

export async function generateMetadata(): Promise<Metadata> {
  let homepageData;
  try {
    homepageData = await getHomepageData();
  } catch {
    homepageData = null;
  }
  return {
    title: homepageData?.metaTitle || "The Halal Explorer - Muslim-Friendly Travel Destinations",
    description: homepageData?.metaDescription || "Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.",
    keywords: homepageData?.metaKeywords || ["Halal Travel", "Muslim-Friendly Destinations", "Halal Food", "Islamic Travel"],
    openGraph: {
      title: homepageData?.metaTitle || "The Halal Explorer - Muslim-Friendly Travel Destinations",
      description: homepageData?.metaDescription || "Discover Muslim-friendly travel destinations around the world",
      images: homepageData?.heroImage?.asset?.url
        ? [{ url: homepageData.heroImage.asset.url, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: homepageData?.metaTitle || "The Halal Explorer - Muslim-Friendly Travel Destinations",
      description: homepageData?.metaDescription || "Discover Muslim-friendly travel destinations around the world",
      images: homepageData?.heroImage?.asset?.url
        ? [homepageData.heroImage.asset.url]
        : [],
    },
  };
}

export default async function HomePage() {
  let homepageData;
  try {
    homepageData = await getHomepageData();
  } catch {
    homepageData = null;
  }
  const featuredDestinations = await getFeaturedDestinations();
  const allDestinations = await getAllDestinations();
  const heroImage = homepageData?.heroImage?.asset?.url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600";
  const placeholderImage = PLACEHOLDER_IMAGE;

  // Get up to 6 featured destinations
  const displayDestinations = featuredDestinations.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={homepageContent.hero.headline}
        subtext={homepageContent.hero.subtext}
        primaryCta={homepageContent.hero.primaryCta}
        secondaryCta={homepageContent.hero.secondaryCta}
        backgroundImage={heroImage}
      />

      {/* Search Bar Section */}
      <Section className="bg-white -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
            <DestinationAutocomplete destinations={allDestinations} />
          </div>
        </div>
      </Section>

      {/* Featured Destinations */}
      <Section className="bg-white dark:bg-slate-900">
        <SectionHeader
          title="Featured Destinations"
          description="Discover handpicked Muslim-friendly destinations that offer authentic experiences, halal cuisine, and welcoming communities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayDestinations.map((destination: Destination, index: number) => (
            <DestinationCard
              key={destination._id}
              name={destination.name}
              country={destination.country}
              description={destination.description}
              imageUrl={_get(destination, 'image.asset.url', placeholderImage)}
              slug={destination.slug.current}
              index={index}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Link href="/destinations">
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Why The Halal Explorer */}
      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <SectionHeader
          title={homepageContent.whySection.title}
          subtitle={homepageContent.whySection.subtitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepageContent.whySection.features.map((feature, index) => {
            let Icon;
            switch (feature.icon) {
              case 'trust':
                Icon = Shield;
                break;
              case 'faith':
                Icon = Heart;
                break;
              case 'community':
                Icon = Users;
                break;
              default:
                Icon = Shield;
            }
            return (
              <FeatureCard
                key={index}
                icon={<Icon className="h-10 w-10 text-primary" />}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            );
          })}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-emerald-50/50 dark:bg-emerald-950/20">
        <SectionHeader
          title="What Our Community Says"
          description="Real experiences from Muslim travelers around the world"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepageContent.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* About Preview */}
      <Section className="bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            {homepageContent.aboutPreview.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {homepageContent.aboutPreview.description}
          </p>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-xl">
            <Link href={homepageContent.aboutPreview.cta.href}>
              {homepageContent.aboutPreview.cta.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
