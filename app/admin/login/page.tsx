'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SunLogo from '@/components/ui/SunLogo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email, password, redirect: false,
    })

    if (res?.ok) {
      router.push('/admin')
    } else {
      setError('Invalid email or password.')
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '2px', color: 'var(--cream)',
    fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
            <SunLogo size={48} />
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: 'var(--cream)', fontWeight: 400 }}>
            Admin Portal
          </h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em', marginTop: '0.3rem' }}>
            Decor by Sun
          </p>
        </div>

        {/* Form */}
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(16px)', borderRadius: '6px', padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle} placeholder="admin@decorbysun.com" required
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                style={inputStyle} placeholder="••••••••" required
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            {error && (
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#ff8a8a', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button
              type="submit" disabled={loading}
              style={{ width: '100%', background: 'var(--gold)', color: 'var(--green)', padding: '0.95rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, borderRadius: '2px', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)' }}>
          <a href="/" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none' }}>← Back to website</a>
        </p>
      </div>
    </div>
  )
}
