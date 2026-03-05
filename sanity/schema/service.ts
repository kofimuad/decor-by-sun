import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'name',        title: 'Service Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description',  type: 'text',   validation: r => r.required() }),
    defineField({ name: 'icon',        title: 'Icon (emoji)', type: 'string' }),
    defineField({ name: 'slug',        title: 'Slug',         type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'order',       title: 'Display Order', type: 'number' }),
  ],
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author',  title: 'Client Name',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'service', title: 'Service Used', type: 'string' }),
    defineField({ name: 'quote',   title: 'Quote',        type: 'text',   validation: r => r.required() }),
    defineField({ name: 'rating',  title: 'Rating (1-5)', type: 'number', validation: r => r.min(1).max(5) }),
  ],
})
