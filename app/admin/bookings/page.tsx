import AdminLayout from '@/components/admin/AdminLayout'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Link from 'next/link'

async function getBookings(status?: string) {
  await connectDB()
  const filter = status && status !== 'all' ? { status } : {}
  return Booking.find(filter).sort({ createdAt: -1 }).lean()
}

const statusColors: Record<string, string> = {
  pending:   '#C9A84C',
  confirmed: '#2D6A4F',
  rejected:  '#c0392b',
}

export default async function BookingsPage({ searchParams }: { searchParams: { status?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const status = searchParams.status || 'all'
  const bookings = await getBookings(status)
  const tabs = ['all', 'pending', 'confirmed', 'rejected']

  return (
    <AdminLayout>
      {/* Main */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--green)', fontWeight: 400 }}>Bookings</h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>
            {bookings.length} {status === 'all' ? 'total' : status} booking{bookings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <Link key={t} href={`/admin/bookings?status=${t}`} style={{
              padding: '0.42rem 1rem',
              background: status === t ? 'var(--green)' : '#fff',
              color: status === t ? 'var(--cream)' : 'var(--green-light)',
              border: `1px solid ${status === t ? 'var(--green)' : 'rgba(27,67,50,0.2)'}`,
              borderRadius: '2px', textDecoration: 'none',
              fontFamily: 'Jost, sans-serif', fontSize: '0.7rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              {t}
            </Link>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'rgba(27,67,50,0.04)' }}>
                {['Name', 'Phone', 'Service', 'Style', 'Event Date', 'Received', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.63rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-light)', textAlign: 'left', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(bookings as any[]).map((b) => (
                <tr key={b._id.toString()} style={{ borderTop: '1px solid rgba(27,67,50,0.06)' }}>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.83rem', color: 'var(--green)', fontWeight: 500, whiteSpace: 'nowrap' }}>{b.name}</td>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', whiteSpace: 'nowrap' }}>{b.phone}</td>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', maxWidth: '150px' }}>{b.service}</td>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)' }}>{b.style || '—'}</td>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', whiteSpace: 'nowrap' }}>
                    {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '0.85rem 1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', whiteSpace: 'nowrap' }}>
                    {new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>
                  <td style={{ padding: '0.85rem 1.2rem' }}>
                    <span style={{ background: `${statusColors[b.status]}22`, color: statusColors[b.status], padding: '0.22rem 0.7rem', borderRadius: '20px', fontSize: '0.68rem', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1.2rem' }}>
                    <Link href={`/admin/bookings/${b._id}`} style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.73rem', color: 'var(--green)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>

  )
}
