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
import { getDestinationExcerpt } from '@/lib/destination-content';
import { getHomepageData, getLatestBlogPosts } from '@/lib/sanity/queries';
import { Destination } from "@/types";
import _get from 'lodash/get';
import { homepageContent } from '@/data/homepage';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import DestinationAutocomplete from '@/components/DestinationAutocomplete';
import { AffiliateStrip } from '@/components/AffiliateStrip';
import { StatsBar } from '@/components/StatsBar';
import { BlogFeed } from '@/components/BlogFeed';
import { EmailCaptureCard } from '@/components/affiliate';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants/site';

export async function generateMetadata(): Promise<Metadata> {
  let homepageData;
  try {
    homepageData = await getHomepageData();
  } catch {
    homepageData = null;
  }
  return buildPageMetadata({
    data: homepageData || {},
    path: '/',
    fallbackTitle: 'The Halal Explorer - Muslim-Friendly Travel Destinations',
    fallbackDescription:
      'Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.',
  });
}

const DEFAULT_EMAIL_CAPTURE = {
  title: "The Halal Traveller's Starter Kit",
  description:
    'Get our free guide with halal travel checklists, prayer tips, and destination planning essentials.',
  perks: [
    'Halal travel packing checklist',
    'Prayer time & qibla app recommendations',
    'Top 10 Muslim-friendly destinations guide',
  ],
  ctaText: 'Get the Free Guide →',
  note: 'No spam. Unsubscribe anytime.',
};

export default async function HomePage() {
  let homepageData;
  try {
    homepageData = await getHomepageData();
  } catch {
    homepageData = null;
  }
  const [featuredDestinations, allDestinations, latestPosts] = await Promise.all([
    getFeaturedDestinations(),
    getAllDestinations(),
    getLatestBlogPosts(3),
  ]);
  const heroImage = homepageData?.heroImage?.asset?.url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600";
  const placeholderImage = PLACEHOLDER_IMAGE;
  const displayDestinations = featuredDestinations.slice(0, 6);

  const emailCapture = {
    title: homepageData?.emailCaptureTitle || DEFAULT_EMAIL_CAPTURE.title,
    description: homepageData?.emailCaptureDescription || DEFAULT_EMAIL_CAPTURE.description,
    perks: homepageData?.emailCapturePerks?.length
      ? homepageData.emailCapturePerks
      : DEFAULT_EMAIL_CAPTURE.perks,
    ctaText: homepageData?.emailCaptureCta || DEFAULT_EMAIL_CAPTURE.ctaText,
    note: homepageData?.emailCaptureNote || DEFAULT_EMAIL_CAPTURE.note,
  };

  return (
    <>
      <Hero
        headline={homepageContent.hero.headline}
        subtext={homepageContent.hero.subtext}
        primaryCta={homepageContent.hero.primaryCta}
        secondaryCta={homepageContent.hero.secondaryCta}
        backgroundImage={heroImage}
        aside={
          <EmailCaptureCard
            title={emailCapture.title}
            description={emailCapture.description}
            perks={emailCapture.perks}
            ctaText={emailCapture.ctaText}
            note={emailCapture.note}
          />
        }
      />

      <StatsBar stats={homepageData?.statsBar} />

      <Section className="bg-white -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
            <DestinationAutocomplete destinations={allDestinations} />
          </div>
        </div>
      </Section>

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
              description={getDestinationExcerpt(destination)}
              imageUrl={_get(destination, 'image.asset.url', placeholderImage)}
              slug={destination.slug.current}
              score={destination.muslimFriendlyScore}
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

      <AffiliateStrip products={homepageData?.featuredAffiliateProducts} />

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

      <BlogFeed posts={latestPosts || []} />

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
