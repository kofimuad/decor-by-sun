'use client'

import { useState, useEffect } from 'react'
import { SectionLabel } from '@/components/ui'

const categories = ['All', 'Cap Toppers', 'Bouquets', 'Events', 'Bridal']

interface PortfolioItem {
  _id: string
  title: string
  imageUrl: string
  category: string
  featured: boolean
}

export default function PortfolioPage() {
  const [active, setActive]     = useState('All')
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null)
  const [items, setItems]       = useState<PortfolioItem[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => { setItems(data.items || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? items : items.filter(p => p.category === active)

  return (
    <>
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--cream)' }}>

        {/* Header */}
        <div style={{ padding: '4rem 2rem 3rem', textAlign: 'center' }}>
          <SectionLabel center>Our Portfolio</SectionLabel>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--green)', lineHeight: 1.1 }}>
            A Gallery of <em style={{ fontStyle: 'italic' }}>Beautiful</em> Moments
          </h1>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', padding: '0 2rem 3rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '0.5rem 1.2rem',
              border: `1px solid ${active === cat ? 'var(--green)' : 'rgba(27,67,50,0.25)'}`,
              background: active === cat ? 'var(--green)' : 'transparent',
              color: active === cat ? 'var(--cream)' : 'var(--green-light)',
              cursor: 'pointer', fontFamily: 'Jost, sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              borderRadius: '2px', transition: 'all 0.2s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>
            Loading portfolio...
          </div>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: 'var(--green)', marginBottom: '0.5rem' }}>No photos yet</p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>
              Add photos from the <a href="/admin/portfolio" style={{ color: 'var(--gold)' }}>admin dashboard</a>.
            </p>
          </div>
        )}

        {/* No results for filter */}
        {!loading && items.length > 0 && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>No photos in this category yet.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div style={{
            padding: '0 2rem 6rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {filtered.map(p => (
              <div key={p._id} onClick={() => setLightbox(p)}
                style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', cursor: 'pointer', aspectRatio: '4/3', background: '#e8e8e8' }}
              >
                <img
                  src={p.imageUrl} alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(27,67,50,0.75) 0%, transparent 55%)',
                  display: 'flex', alignItems: 'flex-end', padding: '1.2rem',
                }}>
                  <div>
                    <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', color: 'var(--cream)', display: 'block' }}>{p.title}</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.62rem', color: 'var(--gold-light)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', display: 'block' }}>{p.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(8,15,10,0.94)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '840px', width: '100%' }}>
            <img src={lightbox.imageUrl} alt={lightbox.title} style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '3px', display: 'block' }} />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: 'var(--cream)' }}>{lightbox.title}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', color: 'var(--gold-light)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{lightbox.category}</p>
              </div>
              <button onClick={() => setLightbox(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--cream)', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '2px', fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em' }}>
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
