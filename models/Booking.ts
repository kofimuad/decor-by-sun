import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBookingDocument extends Document {
  name: string
  phone: string
  email?: string
  service: string
  style?: string
  eventDate?: Date
  eventLocation?: string
  message?: string
  inspirationImages?: string[]
  status: 'pending' | 'confirmed' | 'rejected'
  createdAt: Date
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    name:      { type: String, required: true, trim: true },
    phone:     { type: String, required: true, trim: true },
    email:     { type: String, trim: true, lowercase: true },
    service:   { type: String, required: true },
    style:     { type: String },
    eventDate:         { type: Date },
    eventLocation:     { type: String, trim: true },
    message:           { type: String, trim: true },
    inspirationImages: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

// Delete cached model to force schema refresh on every hot-reload in dev
if (process.env.NODE_ENV === 'development') {
  delete (mongoose.models as any).Booking
}

const Booking: Model<IBookingDocument> =
  mongoose.models.Booking || mongoose.model<IBookingDocument>('Booking', BookingSchema)

export default Booking
