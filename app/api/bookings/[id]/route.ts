import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import transporter from '@/lib/mailer'

// GET /api/bookings/:id — get single booking (admin only)
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const booking = await Booking.findById(params.id)
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    return NextResponse.json({ booking })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booking.' }, { status: 500 })
  }
}

// PATCH /api/bookings/:id — update booking status (admin only)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { status } = await req.json()

    if (!['confirmed', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 })
    }

    await connectDB()
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    )

    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

    // If confirmed and client has email, send them a confirmation
    if (status === 'confirmed' && booking.email) {
      await transporter.sendMail({
        from: `"Decor by Sun" <${process.env.GMAIL_USER}>`,
        to: booking.email,
        subject: `Your booking is confirmed — Decor by Sun 🌿`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
            <h2 style="color: #1B4332;">Your booking is confirmed! 🎉</h2>
            <p style="color: #333; line-height: 1.8;">
              Dear ${booking.name},<br/><br/>
              We're thrilled to confirm your booking for <strong>${booking.service}</strong>.
              We'll be in touch shortly with the next steps.<br/><br/>
              We can't wait to create something beautiful for you!
            </p>
            <p style="color: #52796F; font-size: 14px;">— Sun, Decor by Sun</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('PATCH /api/bookings/:id error:', error)
    return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 })
  }
}
