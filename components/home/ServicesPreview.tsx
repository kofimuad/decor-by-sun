'use client'

import { RevealWrapper, SectionLabel } from '@/components/ui'

const GradCapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3.333 1.333 6.667 1.333 10 0v-5"/>
  </svg>
)
const BouquetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12"/>
    <path d="M12 12C12 12 8 10 8 6a4 4 0 018 0c0 4-4 6-4 6z"/>
    <path d="M9 17c-2 0-3.5-1.5-3.5-3.5S9 10 9 10"/>
    <path d="M15 17c2 0 3.5-1.5 3.5-3.5S15 10 15 10"/>
  </svg>
)
const BalloonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)
const BridalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
)
const SetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const services = [
  { Icon: GradCapIcon, name: 'Graduation Cap Topper',    desc: 'Custom-designed toppers that capture your achievement and make your graduation photos unforgettable.' },
  { Icon: BouquetIcon, name: 'Floral & Balloon Bouquet', desc: 'Lush, hand-crafted bouquets blending fresh florals and elegant balloons for a truly special gift.' },
  { Icon: BalloonIcon, name: 'Balloon & Event Styling',  desc: 'Full-scale installations and event décor — from balloon arches to complete venue transformations.' },
  { Icon: BridalIcon,  name: 'Bridal & Wedding Favors',  desc: 'Exquisite bridal bouquets, wedding favors, and keepsakes designed to reflect your love story.' },
  { Icon: SetIcon,     name: 'Topper + Bouquet Set',     desc: 'The perfect combo — a matching cap topper and bouquet set designed together for a cohesive look.' },
]

export default function ServicesPreview() {
  return (
    <section id="services" style={{
      background: 'var(--green)', padding: '8rem 5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-200px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <RevealWrapper className="mb-16">
        <SectionLabel light>What We Do</SectionLabel>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.12, marginBottom: '1rem' }}>
          Crafted for <em style={{ fontStyle: 'italic' }}>Every</em> Occasion
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'rgba(245,240,232,0.6)', maxWidth: '420px', lineHeight: 1.85, fontWeight: 300, fontFamily: 'Jost, sans-serif' }}>
          From intimate ceremonies to grand celebrations — each piece is designed with intention.
        </p>
      </RevealWrapper>

      {/* Liquid glass cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.2rem',
      }}>
        {services.map((s, i) => (
          <RevealWrapper key={s.name} delay={(i % 4 + 1) as 1|2|3|4}>
            <div
              style={{
                position: 'relative',
                padding: '2.8rem 2.4rem',
                height: '100%',
                cursor: 'default',
                borderRadius: '12px',
                overflow: 'hidden',
                // Liquid glass effect
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)',
                transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.background = 'rgba(255,255,255,0.12)'
                el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(0)'
                el.style.background = 'rgba(255,255,255,0.07)'
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)'
              }}
            >
              {/* Inner highlight streak — liquid glass detail */}
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Gold icon ring */}
              <div style={{
                width: '56px', height: '56px',
                border: '1px solid rgba(201,168,76,0.45)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)',
                marginBottom: '2rem',
                background: 'rgba(201,168,76,0.08)',
              }}>
                <s.Icon />
              </div>

              <h3 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.4rem',
                fontWeight: 400,
                color: 'var(--cream)',
                marginBottom: '0.9rem',
                lineHeight: 1.2,
                letterSpacing: '0.01em',
              }}>
                {s.name}
              </h3>

              <p style={{
                fontSize: '0.88rem',
                color: 'rgba(245,240,232,0.72)',
                lineHeight: 1.9,
                fontWeight: 300,
                fontFamily: 'Jost, sans-serif',
                marginBottom: '2rem',
              }}>
                {s.desc}
              </p>

              <a href="#booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold)', textDecoration: 'none',
                fontFamily: 'Jost, sans-serif', fontWeight: 500,
                transition: 'gap 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.gap = '0.9rem')}
                onMouseLeave={e => (e.currentTarget.style.gap = '0.5rem')}
              >
                Book this <span>→</span>
              </a>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
