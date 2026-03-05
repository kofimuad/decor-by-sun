import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { portfolioItem } from './schema/portfolio'
import { service, testimonial } from './schema/service'

export default defineConfig({
  name: 'decor-by-sun',
  title: 'Decor by Sun',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [portfolioItem, service, testimonial],
  },
})
