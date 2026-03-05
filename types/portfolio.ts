export interface PortfolioItem {
  _id: string
  title: string
  category: 'Cap Toppers' | 'Bouquets' | 'Events' | 'Bridal'
  image: { asset: { _ref: string } }
  featured: boolean
  date?: string
}

export interface Service {
  _id: string
  name: string
  description: string
  icon: string
  slug: { current: string }
  order: number
}

export interface Testimonial {
  _id: string
  author: string
  service: string
  quote: string
  rating: number
}
