'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SunLogo from '@/components/ui/SunLogo'
import AdminLogout from '@/app/admin/AdminLogout'

const navLinks = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Bookings',  href: '/admin/bookings' },
  { label: 'Portfolio', href: '/admin/portfolio' },
  { label: 'Services',  href: '/admin/services' },
  { label: 'Settings',  href: '/admin/settings' },
  { label: 'View Site', href: '/' },
]

export default function AdminSidebar() {
  const pathname    = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const sidebarContent = (
    <>
      {/* Logo only */}
      <Link href="/admin" style={{ display: 'flex', alignItems: 'center', marginBottom: '2.8rem', textDecoration: 'none' }}>
        <SunLogo size={52} />
      </Link>

      <nav style={{ flex: 1 }}>
        {navLinks.map(l => {
          const active = isActive(l.href)
          return (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '0.72rem 1rem', borderRadius: '3px',
              marginBottom: '0.25rem',
              color: active ? 'var(--gold-light)' : 'rgba(245,240,232,0.65)',
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              textDecoration: 'none', fontFamily: 'Jost, sans-serif',
              fontSize: '0.8rem', letterSpacing: '0.06em',
              borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
              {l.label}
            </Link>
          )
        })}
      </nav>

      <AdminLogout />
    </>
  )

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: 'var(--green)',
        padding: '2rem 1.5rem',
        display: 'flex', flexDirection: 'column',
        minHeight: '100vh',
        position: 'sticky', top: 0,
        alignSelf: 'flex-start',
      }} className="admin-sidebar-desktop">
        {sidebarContent}
      </aside>

      {/* ── Mobile top bar ── */}
      <div style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--green)', padding: '0.9rem 1.2rem',
        alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }} className="admin-topbar">
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <SunLogo size={48} />
        </Link>
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', color: 'var(--cream)',
          fontSize: '1.4rem', cursor: 'pointer', padding: '0.2rem',
        }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Mobile slide-down menu ── */}
      {open && (
        <div style={{
          display: 'none', position: 'fixed', top: '52px', left: 0, right: 0,
          background: 'var(--green)', zIndex: 99,
          padding: '1rem 1.5rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }} className="admin-mobile-menu-open">
          {navLinks.map(l => {
            const active = isActive(l.href)
            return (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '0.75rem 1rem',
                color: active ? 'var(--gold-light)' : 'rgba(245,240,232,0.75)',
                textDecoration: 'none', fontFamily: 'Jost, sans-serif',
                fontSize: '0.85rem', letterSpacing: '0.06em',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderRadius: '3px', marginBottom: '0.2rem',
              }}>
                {l.label}
              </Link>
            )
          })}
          <div style={{ marginTop: '1rem' }}>
            <AdminLogout />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar { display: flex !important; }
          .admin-mobile-menu-open { display: block !important; }
        }
      `}</style>
    </>
  )
}
