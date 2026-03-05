import AdminLayout from '@/components/admin/AdminLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Link from 'next/link'

async function getStats() {
  await connectDB()
  const [total, pending, confirmed, rejected] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Booking.countDocuments({ status: 'rejected' }),
  ])
  const recent = await Booking.find().sort({ createdAt: -1 }).limit(5).lean()
  return { total, pending, confirmed, rejected, recent }
}

const statusColors: Record<string, string> = {
  pending:   '#C9A84C',
  confirmed: '#2D6A4F',
  rejected:  '#c0392b',
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const { total, pending, confirmed, rejected, recent } = await getStats()

  const stats = [
    { label: 'Total Bookings', value: total,     color: 'var(--green)' },
    { label: 'Pending Review', value: pending,   color: '#C9A84C' },
    { label: 'Confirmed',      value: confirmed, color: '#2D6A4F' },
    { label: 'Rejected',       value: rejected,  color: '#c0392b' },
  ]

  return (
    <AdminLayout>
      <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--green)', fontWeight: 400 }}>
            Welcome back, {session?.user?.name} 🌿
          </h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>
            Here's an overview of your bookings.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '1.5rem', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 400, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-light)', marginTop: '0.4rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent bookings */}
        <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(27,67,50,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: 'var(--green)', fontWeight: 400 }}>Recent Bookings</h2>
            <Link href="/admin/bookings" style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>View All →</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(27,67,50,0.04)' }}>
                {['Name', 'Service', 'Date', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-light)', textAlign: 'left', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(recent as any[]).map((b) => (
                <tr key={b._id.toString()} style={{ borderTop: '1px solid rgba(27,67,50,0.06)' }}>
                  <td style={{ padding: '0.9rem 1.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green)', fontWeight: 500 }}>{b.name}</td>
                  <td style={{ padding: '0.9rem 1.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)' }}>{b.service}</td>
                  <td style={{ padding: '0.9rem 1.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)' }}>
                    {new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '0.9rem 1.5rem' }}>
                    <span style={{ background: `${statusColors[b.status]}22`, color: statusColors[b.status], padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.72rem', fontFamily: 'Jost, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1.5rem' }}>
                    <Link href={`/admin/bookings/${b._id}`} style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'var(--green)', textDecoration: 'none' }}>View →</Link>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>

  )
}
