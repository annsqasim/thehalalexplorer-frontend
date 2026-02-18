import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts } from "@/lib/blog";
import type { Blog } from "@/types";
import { blogPageContent } from "@/data/blog";
import { Clock, User } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Travel Blog | The Halal Explorer - Halal Travel Tips & Guides",
  description: "Insights, guides, and halal-friendly travel stories from Muslim travelers. Food guides, prayer tips, and destination guides.",
  keywords: [
    "halal travel blog",
    "Muslim travel tips",
    "halal food guides",
    "prayer while traveling",
    "Islamic travel blog",
  ],
  openGraph: {
    title: "Travel Blog | The Halal Explorer",
    description: "Insights, guides, and halal-friendly travel stories",
  },
};

export default async function BlogIndexPage() {
  const posts: Blog[] = await getAllBlogPosts();
  const featured = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const rest = Array.isArray(posts) && posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-emerald-600 via-brand-emerald-700 to-brand-emerald-800 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Travel Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Insights, guides, and halal-friendly travel stories from Muslim travelers around the world.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Intro */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {blogPageContent.seoIntro}
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Post */}
      {featured && (
        <Section className="bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Link href={`/blog/${featured.slug?.current}`}>
              <Card className="overflow-hidden border-0 shadow-large hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-[400px] md:h-[500px]">
                  <Image
                    src={featured?.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(featured.categories) &&
                        featured.categories.map((cat: string) => (
                          <Badge
                            key={cat}
                            className="bg-white/90 text-gray-900 hover:bg-white"
                          >
                            {cat}
                          </Badge>
                        ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-brand-emerald-300 transition-colors">
                      {featured.title}
                    </h2>
                    {featured.shortDescription && (
                      <p className="text-lg text-white/90 mb-4 max-w-3xl">
                        {featured.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      {featured.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{featured.author}</span>
                        </div>
                      )}
                      {featured.publishedAt && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <time dateTime={featured.publishedAt}>
                            {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </Section>
      )}

      {/* Blog Grid */}
      {rest.length > 0 && (
        <Section className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current}`}>
                <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post?.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(post.categories) &&
                        post.categories.slice(0, 2).map((cat: string) => (
                          <Badge
                            key={cat}
                            variant="outline"
                            className="text-xs"
                          >
                            {cat}
                          </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.shortDescription && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </time>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
