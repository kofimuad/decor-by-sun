import { sanityClient } from './sanity'

export async function getPortfolioItems(category?: string) {
  const filter = category && category !== 'All'
    ? `&& category == "${category}"`
    : ''
  return sanityClient.fetch(
    `*[_type == "portfolioItem" ${filter}] | order(date desc) { _id, title, category, image, featured, date }`
  )
}

export async function getFeaturedPortfolio() {
  return sanityClient.fetch(
    `*[_type == "portfolioItem" && featured == true] | order(date desc)[0..5] { _id, title, category, image }`
  )
}

export async function getServices() {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) { _id, name, description, icon, slug, order }`
  )
}

export async function getTestimonials() {
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) { _id, author, service, quote, rating }`
  )
}
