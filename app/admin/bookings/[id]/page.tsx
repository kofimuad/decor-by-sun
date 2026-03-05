import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { notFound } from 'next/navigation'
import BookingActions from './BookingActions'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'

async function getBooking(id: string) {
  await connectDB()
  try { return await Booking.findById(id).lean() }
  catch { return null }
}

const statusColors: Record<string, string> = {
  pending:   '#C9A84C',
  confirmed: '#2D6A4F',
  rejected:  '#c0392b',
}

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking: any = await getBooking(params.id)
  if (!booking) notFound()

  const fields = [
    { label: 'Full Name',      value: booking.name },
    { label: 'Phone',          value: booking.phone },
    { label: 'Email',          value: booking.email || '—' },
    { label: 'Service',        value: booking.service },
    { label: 'Style',          value: booking.style || '—' },
    { label: 'Event Date',     value: booking.eventDate ? new Date(booking.eventDate).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
    { label: 'Event Location', value: booking.eventLocation || '—' },
    { label: 'Received',       value: new Date(booking.createdAt).toLocaleString('en-GB') },
    { label: 'Notes',          value: booking.message || '—' },
  ]

  const images: string[] = booking.inspirationImages || []

  return (
    <AdminLayout>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/admin/bookings" style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green-light)', textDecoration: 'none', letterSpacing: '0.08em' }}>
          ← All Bookings
        </Link>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: 'var(--green)', fontWeight: 400 }}>
          {booking.name}
        </h1>
        <span style={{ background: `${statusColors[booking.status]}22`, color: statusColors[booking.status], padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.72rem', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
          {booking.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

        <div>
          {/* Booking Details */}
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: 'var(--green)', fontWeight: 400 }}>Booking Details</h2>
            </div>
            <div style={{ padding: '1.5rem' }}>
              {fields.map(f => (
                <div key={f.label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '0.8rem 0', borderBottom: '1px solid rgba(27,67,50,0.05)' }}>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green-light)', paddingTop: '2px' }}>{f.label}</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.88rem', color: 'var(--green)', lineHeight: 1.6 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspiration Images */}
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: 'var(--green)', fontWeight: 400 }}>
                Inspiration Images
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green-light)', fontWeight: 300, marginLeft: '0.6rem' }}>
                  ({images.length} {images.length === 1 ? 'image' : 'images'})
                </span>
              </h2>
            </div>
            <div style={{ padding: '1.5rem' }}>
              {images.length === 0 ? (
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)', fontStyle: 'italic' }}>
                  No inspiration images were uploaded with this booking.
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {images.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', borderRadius: '3px', overflow: 'hidden', aspectRatio: '1/1', border: '1px solid rgba(27,67,50,0.1)' }}
                      title="Click to open full size"
                    >
                      <img src={url} alt={`Inspiration ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <BookingActions bookingId={params.id} currentStatus={booking.status} clientEmail={booking.email} />
      </div>
    </AdminLayout>
  )
}
