'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f7f6f3', display: 'flex' }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        padding: isMobile ? '4.5rem 1rem 2rem' : '2.5rem 2.5rem',
        overflow: 'auto',
        // On mobile the sidebar is hidden and replaced by fixed topbar (52px)
        marginTop: isMobile ? '0' : '0',
      }}>
        {children}
      </main>
    </div>
  )
}
