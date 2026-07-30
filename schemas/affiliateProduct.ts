import { defineType, defineField } from 'sanity';

export const affiliateProduct = defineType({
  name: 'affiliateProduct',
  title: 'Affiliate Product',
  type: 'document',
  fields: [
    defineField({ name: 'productName', type: 'string', title: 'Product Name', validation: Rule => Rule.required() }),
    defineField({ name: 'emoji', type: 'string', title: 'Emoji Icon' }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Prayer', value: 'prayer' },
          { title: 'Packing', value: 'packing' },
          { title: 'Tech', value: 'tech' },
          { title: 'Clothing', value: 'clothing' },
          { title: 'Food & Snacks', value: 'food' },
          { title: 'Books', value: 'books' },
        ],
      },
    }),
    defineField({ name: 'description', type: 'text', title: 'Short Description' }),
    defineField({ name: 'amazonUrlAE', type: 'url', title: 'Amazon.ae URL (UAE — primary)' }),
    defineField({ name: 'amazonUrlUK', type: 'url', title: 'Amazon.co.uk URL (UK)' }),
    defineField({ name: 'amazonUrlUS', type: 'url', title: 'Amazon.com URL (US)' }),
    defineField({ name: 'priceRangeAE', type: 'string', title: 'Price Range AED' }),
    defineField({ name: 'isFeatured', type: 'boolean', title: 'Show on Homepage Strip?' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'productName' } }),
  ],
  preview: {
    select: { title: 'productName', subtitle: 'category' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Category: ${subtitle}` : '' };
    },
  },
});
