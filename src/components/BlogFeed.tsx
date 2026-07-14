import Link from 'next/link';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

export interface BlogFeedItem {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  categories?: string[];
  mainImage?: { asset?: { url?: string } };
  readTime?: number;
}

export function BlogFeed({ posts }: { posts: BlogFeedItem[] }) {
  if (!posts.length) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#1D6A5B] text-xs font-semibold uppercase tracking-widest mb-1">
              From the Blog
            </p>
            <h2 className="text-gray-900 text-2xl font-bold">Latest Travel Guides</h2>
          </div>
          <Link href="/blog" className="text-[#1D6A5B] font-medium text-sm hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                {post.categories?.[0] && (
                  <span className="bg-[#E8F5F1] text-[#1D6A5B] text-xs font-medium rounded-full px-3 py-1 inline-block mb-2">
                    {post.categories[0]}
                  </span>
                )}
                <h3 className="text-gray-900 font-semibold text-base leading-snug line-clamp-2 group-hover:text-[#1D6A5B] transition-colors">
                  {post.title}
                </h3>
                {post.shortDescription && (
                  <p className="text-gray-500 text-sm leading-relaxed mt-1 line-clamp-2">
                    {post.shortDescription}
                  </p>
                )}
                {post.readTime && (
                  <p className="text-gray-400 text-xs mt-3">{post.readTime} min read</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
