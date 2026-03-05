'use client'

import { signOut } from 'next-auth/react'

export default function AdminLogout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(245,240,232,0.6)', cursor: 'pointer',
        padding: '0.65rem 1rem', borderRadius: '3px',
        fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
        letterSpacing: '0.1em', width: '100%', textAlign: 'left',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; e.currentTarget.style.color = '#ff9a9a' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(245,240,232,0.6)' }}
    >
      ⎋ Sign Out
    </button>
  )
}
