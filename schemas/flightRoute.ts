import { defineType, defineField, defineArrayMember } from 'sanity';

// One page at /flights/[slug]. Only publish a route with real, checked content:
// near-identical pages made at scale are treated as spam by Google.

const place = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    validation: Rule => Rule.required(),
    fields: [
      defineField({ name: 'city', type: 'string', title: 'City', validation: Rule => Rule.required() }),
      defineField({
        name: 'iata',
        type: 'string',
        title: 'IATA city code',
        description: 'Used for fares and search links. Use the city code for multi-airport cities (LON, NYC, YTO).',
        validation: Rule => Rule.required().length(3).uppercase(),
      }),
      defineField({
        name: 'airports',
        type: 'array',
        title: 'Airports',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              { name: 'code', type: 'string', title: 'IATA code' },
              { name: 'name', type: 'string', title: 'Name' },
            ],
            preview: { select: { title: 'name', subtitle: 'code' } },
          }),
        ],
      }),
      defineField({
        name: 'guide',
        type: 'reference',
        title: 'City guide',
        description: 'Our destination page for this place, if we have one.',
        to: [{ type: 'destination' }],
      }),
    ],
  });

export const flightRoute = defineType({
  name: 'flightRoute',
  title: 'Flight Route',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'e.g. london-to-jeddah',
      validation: Rule => Rule.required(),
    }),
    place('origin', 'From'),
    place('destination', 'To'),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline', validation: Rule => Rule.required() }),
    defineField({ name: 'intro', type: 'text', rows: 4, title: 'Intro', validation: Rule => Rule.required() }),
    defineField({ name: 'flightTime', type: 'string', title: 'Flight time', validation: Rule => Rule.required() }),
    defineField({ name: 'nonStop', type: 'text', rows: 3, title: 'Non-stop flights', validation: Rule => Rule.required() }),
    defineField({
      name: 'umrah',
      type: 'boolean',
      title: 'Umrah route?',
      description: 'Lists the route on the Umrah hub and points hotel links at Makkah.',
      initialValue: false,
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Route guide sections',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'paragraphs', type: 'array', title: 'Paragraphs', of: [{ type: 'text', rows: 3 }] },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'Path', description: 'Internal path, e.g. /blog/umrah-step-by-step-guide' },
                  ],
                },
              ],
            },
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', rows: 3, title: 'Answer' },
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
    defineField({
      name: 'relatedPosts',
      type: 'array',
      title: 'Further reading',
      of: [{ type: 'reference', to: [{ type: 'blog' }] }],
      validation: Rule => Rule.max(6),
    }),
    defineField({
      name: 'lastChecked',
      type: 'string',
      title: 'Last checked',
      description: 'Month the facts were last verified, e.g. "November 2026".',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { from: 'origin.city', to: 'destination.city', subtitle: 'tagline' },
    prepare: ({ from, to, subtitle }) => ({ title: `${from} → ${to}`, subtitle }),
  },
});
