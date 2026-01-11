import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section, SectionHeader } from '@/components/Section';
import { DestinationCard } from '@/components/DestinationCard';
import { FeatureCard } from '@/components/FeatureCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedDestinations, getHomepageData, getAllDestinations } from '@/lib/sanity/queries';
import { Destination } from "@/types";
import _get from 'lodash/get';
import { homepageContent } from '@/data/homepage';
import DestinationAutocomplete from '@/components/DestinationAutocomplete';

export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomepageData();

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
  const homepageData = await getHomepageData();
  const featuredDestinations = await getFeaturedDestinations();
  const allDestinations = await getAllDestinations();
  const heroImage = homepageData?.heroImage?.asset?.url || 'https://source.unsplash.com/1600x900/?travel,muslim';

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
          <div className="bg-white rounded-2xl shadow-large p-6 border border-gray-100">
            <DestinationAutocomplete destinations={allDestinations} />
          </div>
        </div>
      </Section>

      {/* Featured Destinations */}
      <Section className="bg-gray-50">
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
              imageUrl={_get(destination, 'image.asset.url', 'https://source.unsplash.com/600x400/?travel,muslim')}
              slug={destination.slug.current}
              index={index}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-brand-emerald-600 hover:bg-brand-emerald-700">
            <Link href="/destinations">
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Why The Halal Explorer */}
      <Section className="bg-white">
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
                icon={<Icon className="h-10 w-10" />}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            );
          })}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-brand-sand-50">
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
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {homepageContent.aboutPreview.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {homepageContent.aboutPreview.description}
          </p>
          <Button asChild size="lg" variant="outline" className="border-brand-emerald-600 text-brand-emerald-600 hover:bg-brand-emerald-50">
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
