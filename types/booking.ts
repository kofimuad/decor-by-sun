export type BookingStatus = 'pending' | 'confirmed' | 'rejected'

export interface IBooking {
  _id: string
  name: string
  phone: string
  email?: string
  service: string
  style?: string
  eventDate?: string
  eventLocation?: string
  message?: string
  status: BookingStatus
  createdAt: string
}

export interface CreateBookingPayload {
  name: string
  phone: string
  email?: string
  service: string
  style?: string
  eventDate?: string
  eventLocation?: string
  message?: string
}
