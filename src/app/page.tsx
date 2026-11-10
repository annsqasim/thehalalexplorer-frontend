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
import { TpCtaCard } from '@/components/travelpayouts/TpCtaCard';

export async function generateMetadata(): Promise<Metadata> {
  let homepageData;
  try {
    homepageData = await getHomepageData();
  } catch {
    homepageData = null;
  }

  const TITLE = 'The Halal Explorer — Halal Travel Guides for Muslim Travellers';
  const DESCRIPTION =
    'Honest halal travel guides for Muslim travellers. Halal food, mosque locations, prayer facilities and destination ratings for 53+ cities worldwide. Start exploring.';

  return buildPageMetadata({
    data: {
      ...homepageData,
      // Always use the hardcoded title/description to prevent CMS overrides
      // that could break the meta description (Google rendering issue)
      metaTitle: TITLE,
      metaDescription: DESCRIPTION,
    },
    path: '/',
    fallbackTitle: TITLE,
    fallbackDescription: DESCRIPTION,
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

      {/* The search used to sit in a tall section with a negative margin that
          covered the stats bar labels. It now leads the destinations section. */}
      <Section className="bg-white dark:bg-slate-900 py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="bg-white rounded-2xl shadow-md p-3 sm:p-4 border border-slate-200 dark:border-slate-800">
            <DestinationAutocomplete destinations={allDestinations} />
          </div>
        </div>

        <SectionHeader
          title="Featured Destinations"
          description="Discover handpicked Muslim-friendly destinations that offer authentic experiences, halal cuisine, and welcoming communities."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
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
        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Link href="/destinations">
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* HOMEPAGE — Plan Your Next Trip section */}
      <section className="bg-[#F9FAFB] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#1D6A5B] text-xs font-semibold uppercase tracking-widest mb-2">
            Book Your Trip
          </p>
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-serif font-bold mb-2">
            Everything in one place
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-lg">
            Flights, hotels, tours, and insurance — all with our affiliate partners.
            You pay nothing extra. We earn a small commission that keeps this site running.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <TpCtaCard type="flights" />
            <TpCtaCard type="hotels" destinationName="Dubai" />
            <TpCtaCard type="tours" />
            <TpCtaCard type="insurance" />
          </div>
        </div>
      </section>

      <AffiliateStrip products={homepageData?.featuredAffiliateProducts} />

      <Section className="bg-slate-50 dark:bg-slate-900/50 py-12 md:py-16 lg:py-20">
        <SectionHeader
          title={homepageContent.whySection.title}
          subtitle={homepageContent.whySection.subtitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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

      <Section className="bg-emerald-50/50 dark:bg-emerald-950/20 py-12 md:py-16 lg:py-20">
        <SectionHeader
          title="What Our Community Says"
          description="Real experiences from Muslim travelers around the world"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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

      <Section className="bg-white dark:bg-slate-900 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            {homepageContent.aboutPreview.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
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
