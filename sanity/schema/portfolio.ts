import { defineType, defineField } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Cap Toppers', 'Bouquets', 'Events', 'Bridal'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
