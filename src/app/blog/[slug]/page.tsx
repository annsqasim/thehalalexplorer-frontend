import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, User, ArrowRight } from "lucide-react";
import { getAllBlogSlugs, getBlogBySlug, getAllBlogPosts } from "@/lib/blog";
import BlogRichText from "@/components/BlogRichText";
import { extractTocFromBlocks } from "@/lib/portable-text-toc";
import { BlogTocSidebar } from "@/components/BlogTocSidebar";
import { DestinationCard } from "@/components/DestinationCard";
import { getDestinationExcerpt } from "@/lib/destination-content";
import type { Blog, AffiliateProductField, NearbyDestinationRef } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { AffiliateProductCard } from "@/components/affiliate";
import type { PortableTextBlock } from "@portabletext/types";
import _get from "lodash/get";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | The Halal Explorer",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.shortDescription,
    alternates: {
      canonical: post.canonicalUrl || `/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.shortDescription,
      url: post.canonicalUrl || `/blog/${slug}`,
      images: post?.mainImage?.asset?.url
        ? [{ url: post.mainImage.asset.url }]
        : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p: Blog) => p._id !== post._id)
    .slice(0, 3);

  const bodyBlocks = (post.body as PortableTextBlock[]) || [];
  const tocItems = extractTocFromBlocks(bodyBlocks);

  return (
    <>
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={post?.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(post.categories) &&
                post.categories.map((cat: string) => (
                  <Badge
                    key={cat}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                  >
                    {cat}
                  </Badge>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>By {post.author}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div className="min-w-0">
              {post.hasAffiliateLinks && (
                <div className="bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-lg px-4 py-3 text-sm text-[#92400E] mb-6">
                  Affiliate Disclosure: This post contains Amazon affiliate links. If you purchase through our links, we may earn a small commission at no extra cost to you. We only recommend products we genuinely use.
                </div>
              )}

              {post.shortDescription && (
                <div className="mb-8 p-6 bg-brand-emerald-50 border-l-4 border-brand-emerald-600 rounded-r-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {post.shortDescription}
                  </p>
                </div>
              )}

              <article className="prose prose-lg prose-emerald max-w-none">
                {bodyBlocks.length > 0 ? (
                  <BlogRichText value={bodyBlocks} />
                ) : (
                  post?.shortDescription && (
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  )
                )}
              </article>

              {/* Recommended Affiliate Products */}
              {post.affiliateProducts && post.affiliateProducts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span>🛒</span> Our Top Picks
                  </h2>
                  <div className="space-y-4">
                    {post.affiliateProducts.map((product: AffiliateProductField, index: number) => (
                      <AffiliateProductCard key={index} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TOC & Email CTA Sidebar */}
            <BlogTocSidebar
              items={tocItems}
              ctaTitle={post.sidebarCtaTitle}
              ctaDescription={post.sidebarCtaDescription}
            />
          </div>

          <Separator className="my-12" />

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: Blog) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug?.current}`}
                  >
                    <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost?.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-brand-emerald-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.shortDescription && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.shortDescription}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Destinations Row */}
          {post.relatedDestinations && post.relatedDestinations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Destinations Mentioned in This Guide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {post.relatedDestinations.map((dest: NearbyDestinationRef & { description?: string; intro?: string; image?: { asset?: { url?: string } } }) => (
                  <DestinationCard
                    key={dest._id}
                    name={dest.name}
                    country={dest.country}
                    description={getDestinationExcerpt(dest as unknown as import('@/types').Destination)}
                    imageUrl={_get(dest, 'image.asset.url', PLACEHOLDER_IMAGE)}
                    slug={dest.slug.current}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-brand-emerald-50 to-brand-emerald-100 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Explore?
            </h2>
            <p className="text-gray-700 mb-6">
              Discover Muslim-friendly destinations around the world.
            </p>
            <Button asChild size="lg" className="bg-brand-emerald-600 hover:bg-brand-emerald-700">
              <Link href="/destinations">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
