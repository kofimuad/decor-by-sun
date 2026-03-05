'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RevealWrapper, SectionLabel } from '@/components/ui'

interface PortfolioItem {
  _id: string
  title: string
  imageUrl: string
  category: string
  featured: boolean
}

export default function PortfolioPreview() {
  const [items, setItems]   = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        // Only show featured items, max 6
        const featured = (data.items || []).filter((i: PortfolioItem) => i.featured).slice(0, 6)
        // If no featured, show latest 6
        setItems(featured.length > 0 ? featured : (data.items || []).slice(0, 6))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: 'var(--cream)', padding: '8rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <SectionLabel>Our Work</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: 'var(--green)', lineHeight: 1.12 }}>
            Moments We've <em style={{ fontStyle: 'italic' }}>Crafted</em>
          </h2>
        </div>
        <Link href="/portfolio" style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', textDecoration: 'none', borderBottom: '1px solid rgba(27,67,50,0.3)', paddingBottom: '2px', transition: 'border-color 0.2s' }}>
          View Full Gallery →
        </Link>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>
          Loading...
        </div>
      )}

      {!loading && items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed rgba(27,67,50,0.2)', borderRadius: '4px' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', marginBottom: '0.5rem' }}>Your portfolio will appear here</p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)' }}>
            Add photos from the <a href="/admin/portfolio" style={{ color: 'var(--gold)' }}>admin dashboard</a>, then mark them as featured to show here.
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {items.map((item, i) => (
            <RevealWrapper key={item._id} delay={(i % 4 + 1) as 1|2|3|4}>
              <Link href="/portfolio" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', aspectRatio: '4/3', background: '#e8e8e8', cursor: 'pointer' }}>
                  <img
                    src={item.imageUrl} alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.7) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', padding: '1.2rem' }}>
                    <div>
                      <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', color: 'var(--cream)', display: 'block' }}>{item.title}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.6rem', color: 'var(--gold-light)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', display: 'block' }}>{item.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      )}
    </section>
  )
}
