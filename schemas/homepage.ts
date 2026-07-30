import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'statsBar',
      title: 'Stats Bar — 4 Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Number (e.g. 53, $220B, 3.2K)' },
            { name: 'label', type: 'string', title: 'Label (e.g. Destinations Covered)' },
          ],
        },
      ],
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'emailCaptureTitle',
      type: 'string',
      title: 'Email Card — Title',
      initialValue: "The Halal Traveller's Starter Kit",
    }),
    defineField({
      name: 'emailCaptureDescription',
      type: 'text',
      title: 'Email Card — Description',
    }),
    defineField({
      name: 'emailCapturePerks',
      title: 'Email Card — Perk Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'emailCaptureCta',
      type: 'string',
      title: 'Email Card — Button Text',
      initialValue: 'Get the Free Guide →',
    }),
    defineField({
      name: 'emailCaptureNote',
      type: 'string',
      title: 'Email Card — Note (below button)',
      initialValue: 'No spam. Unsubscribe anytime.',
    }),
    defineField({
      name: 'featuredAffiliateProducts',
      title: 'Amazon Products — Homepage Strip (4 max)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'emoji', type: 'string', title: 'Emoji' },
            { name: 'productName', type: 'string', title: 'Product Name' },
            { name: 'description', type: 'text', title: 'Short Description (1 sentence)' },
            { name: 'amazonUrl', type: 'url', title: 'Amazon Affiliate URL' },
          ],
        },
      ],
      validation: Rule => Rule.max(4),
    }),
    defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
    defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description' }),
    defineField({ name: 'metaKeywords', type: 'string', title: 'Meta Keywords' }),
    defineField({ name: 'canonicalUrl', type: 'url', title: 'Canonical URL' }),
  ],
});
