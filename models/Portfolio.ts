import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPortfolioDocument extends Document {
  title: string
  imageUrl: string
  category: 'Cap Toppers' | 'Bouquets' | 'Events' | 'Bridal'
  featured: boolean
  createdAt: Date
}

const PortfolioSchema = new Schema<IPortfolioDocument>(
  {
    title:    { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Cap Toppers', 'Bouquets', 'Events', 'Bridal'],
      required: true,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Portfolio: Model<IPortfolioDocument> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolioDocument>('Portfolio', PortfolioSchema)

export default Portfolio
