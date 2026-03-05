import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import transporter from '@/lib/mailer'
import { clientConfirmationEmail } from '@/emails/clientConfirmation'
import { adminNotificationEmail } from '@/emails/adminNotification'

// Upload a file to Cloudinary using their unsigned upload API
async function uploadToCloudinary(file: File): Promise<string | null> {
  try {
    const cloudName  = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      console.error('Cloudinary not configured — set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in .env.local')
      return null
    }

    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', uploadPreset)
    fd.append('folder', 'decor-by-sun/inspiration')

    const res  = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: fd,
    })
    const data = await res.json()

    if (!res.ok) {
      console.error('Cloudinary upload failed:', data)
      return null
    }

    return data.secure_url as string
  } catch (err: any) {
    console.error('uploadToCloudinary error:', err?.message)
    return null
  }
}

// POST /api/bookings — accepts multipart/form-data (with images) or JSON
export async function POST(req: NextRequest) {
  try {
    let name = '', phone = '', email = '', service = '', style = ''
    let eventDate = '', eventLocation = '', message = ''
    let inspirationImages: string[] = []

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()

      name          = (formData.get('name')          as string) || ''
      phone         = (formData.get('phone')         as string) || ''
      email         = (formData.get('email')         as string) || ''
      service       = (formData.get('service')       as string) || ''
      style         = (formData.get('style')         as string) || ''
      eventDate     = (formData.get('eventDate')     as string) || ''
      eventLocation = (formData.get('eventLocation') as string) || ''
      message       = (formData.get('message')       as string) || ''

      const imageFiles = formData.getAll('images') as File[]
      for (const file of imageFiles) {
        console.log('[BOOKING] processing file:', (file as File).name, (file as File).size)
        if (file && (file as File).size > 0) {
          const url = await uploadToCloudinary(file as File)
          if (url) inspirationImages.push(url)
        }
      }
    } else {
      const body = await req.json()
      ;({ name, phone, email, service, style, eventDate, eventLocation, message } = body)
      inspirationImages = body.inspirationImages || []
    }

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Name, phone, and service are required.' }, { status: 400 })
    }

    await connectDB()

    const booking = await Booking.create({
      name, phone, email, service, style,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      eventLocation, message,
      inspirationImages,
    })

    try {
      if (email) {
        const { subject, html, text } = clientConfirmationEmail({ name, service, style, eventDate, eventLocation, message })
        await transporter.sendMail({ from: `"Decor by Sun" <${process.env.GMAIL_USER}>`, to: email, subject, html, text })
      }
      const adminMail = adminNotificationEmail({ name, phone, email, service, style, eventDate, eventLocation, message, bookingId: booking._id.toString() })
      await transporter.sendMail({ from: `"Decor by Sun Bookings" <${process.env.GMAIL_USER}>`, to: process.env.BUSINESS_EMAIL, subject: adminMail.subject, html: adminMail.html, text: adminMail.text })
    } catch (emailErr) {
      console.error('Email failed (booking saved):', emailErr)
    }

    return NextResponse.json({ success: true, bookingId: booking._id.toString() }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/bookings error:', error?.message || error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status  = searchParams.get('status')
    const service = searchParams.get('service')
    const filter: Record<string, string> = {}
    if (status)  filter.status  = status
    if (service) filter.service = service
    const bookings = await Booking.find(filter).sort({ createdAt: -1 })
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('GET /api/bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings.' }, { status: 500 })
  }
}
