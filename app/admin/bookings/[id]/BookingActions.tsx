'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  bookingId: string
  currentStatus: string
  clientEmail?: string
}

export default function BookingActions({ bookingId, currentStatus, clientEmail }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const updateStatus = async (status: string) => {
    setLoading(status)
    setMessage('')
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setMessage(status === 'confirmed'
          ? clientEmail ? 'Confirmed! Confirmation email sent to client.' : 'Booking confirmed.'
          : 'Booking rejected.'
        )
        router.refresh()
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setMessage('Network error.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '1.5rem' }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: 'var(--green)', fontWeight: 400, marginBottom: '1.2rem' }}>Actions</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={() => updateStatus('confirmed')}
          disabled={loading !== null || currentStatus === 'confirmed'}
          style={{
            width: '100%', padding: '0.85rem',
            background: currentStatus === 'confirmed' ? 'rgba(45,106,79,0.15)' : '#2D6A4F',
            color: currentStatus === 'confirmed' ? '#2D6A4F' : '#fff',
            border: `1px solid ${currentStatus === 'confirmed' ? '#2D6A4F' : 'transparent'}`,
            borderRadius: '2px', cursor: currentStatus === 'confirmed' || loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
            opacity: loading === 'confirmed' ? 0.7 : 1, transition: 'all 0.2s',
          }}
        >
          {loading === 'confirmed' ? 'Confirming...' : currentStatus === 'confirmed' ? '✓ Confirmed' : 'Confirm Booking'}
        </button>

        <button
          onClick={() => updateStatus('rejected')}
          disabled={loading !== null || currentStatus === 'rejected'}
          style={{
            width: '100%', padding: '0.85rem',
            background: currentStatus === 'rejected' ? 'rgba(192,57,43,0.1)' : 'transparent',
            color: currentStatus === 'rejected' ? '#c0392b' : '#c0392b',
            border: '1px solid rgba(192,57,43,0.4)',
            borderRadius: '2px', cursor: currentStatus === 'rejected' || loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
            opacity: loading === 'rejected' ? 0.7 : 1, transition: 'all 0.2s',
          }}
        >
          {loading === 'rejected' ? 'Rejecting...' : currentStatus === 'rejected' ? '✕ Rejected' : 'Reject Booking'}
        </button>

        {currentStatus !== 'pending' && (
          <button
            onClick={() => updateStatus('pending')}
            disabled={loading !== null}
            style={{
              width: '100%', padding: '0.85rem',
              background: 'transparent', color: 'var(--green-light)',
              border: '1px solid rgba(27,67,50,0.2)',
              borderRadius: '2px', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Jost, sans-serif', fontSize: '0.75rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            Reset to Pending
          </button>
        )}
      </div>

      {message && (
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', marginTop: '1rem', padding: '0.75rem', background: 'rgba(27,67,50,0.06)', borderRadius: '2px', lineHeight: 1.5 }}>
          {message}
        </p>
      )}

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'var(--green-light)', lineHeight: 1.6 }}>
          {clientEmail
            ? `✉ Confirming will send an email to ${clientEmail}`
            : '⚠ No email on file — client will not be notified automatically.'}
        </p>
      </div>
    </div>
  )
}
