import { defineType, defineField } from 'sanity';

export const blog = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Post Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'author', type: 'string', title: 'Author' }),
    defineField({ name: 'shortDescription', type: 'text', title: 'Short Description' }),
    defineField({ name: 'body', type: 'array', title: 'Article Body (Portable Text)', of: [{ type: 'block' }] }),
    defineField({ name: 'categories', type: 'array', title: 'Categories', of: [{ type: 'string' }] }),
    defineField({ name: 'mainImage', type: 'image', title: 'Main Image', options: { hotspot: true } }),
    defineField({ name: 'isFeatured', type: 'boolean', title: 'Featured Post?' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'hasAffiliateLinks',
      title: 'Contains Affiliate Links?',
      type: 'boolean',
      initialValue: false,
      description: 'If true, affiliate disclosure box appears at top of post',
    }),
    defineField({
      name: 'affiliateProducts',
      title: 'Amazon Product Cards (shown after article)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'rank', type: 'string', title: 'Rank Label (e.g. 🥇 Best Overall)' },
            { name: 'emoji', type: 'string', title: 'Product Emoji' },
            { name: 'productName', type: 'string', title: 'Product Name' },
            { name: 'verdict', type: 'text', title: 'Verdict (2–3 sentences)' },
            { name: 'pros', type: 'array', title: 'Pros / Bullet Points', of: [{ type: 'string' }] },
            { name: 'amazonUrl', type: 'url', title: 'Amazon Affiliate URL' },
            { name: 'priceRange', type: 'string', title: 'Price Range (e.g. AED 45–85)' },
            { name: 'isBestPick', type: 'boolean', title: "Editor's Choice?" },
          ],
          preview: { select: { title: 'productName', subtitle: 'rank' } },
        },
      ],
    }),
    defineField({
      name: 'relatedDestinations',
      title: 'Related Destinations (max 3)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
      validation: Rule => Rule.max(3),
    }),
    defineField({
      name: 'sidebarCtaTitle',
      title: 'Sidebar CTA Title (optional override)',
      type: 'string',
    }),
    defineField({
      name: 'sidebarCtaDescription',
      title: 'Sidebar CTA Description (optional override)',
      type: 'text',
    }),
    defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
    defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description' }),
    defineField({ name: 'metaKeywords', type: 'string', title: 'Meta Keywords' }),
    defineField({ name: 'canonicalUrl', type: 'url', title: 'Canonical URL' }),
  ],
});
