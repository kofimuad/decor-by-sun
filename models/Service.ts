import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IServiceDocument extends Document {
  name: string
  description: string
  icon: string
  order: number
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon:        { type: String, default: '✦' },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Service: Model<IServiceDocument> =
  mongoose.models.Service ||
  mongoose.model<IServiceDocument>('Service', ServiceSchema)

export default Service
