'use client'

import { useEffect, useState } from 'react'


export default function Hero() {
  const [bgImage, setBgImage] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setBgImage(data.settings?.hero_image || null)
      })
      .catch(() => {}) // silently use default if API fails
  }, [])

  return (
    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '110px', paddingBottom: '120px', boxSizing: 'border-box' }}>

      {/* Background */}
      {bgImage && <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        animation: 'heroZoom 20s ease-in-out infinite alternate',
        transform: 'scale(1.06)',
        transition: 'background-image 0.5s ease',
      }} />}

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%),
                     linear-gradient(to bottom, rgba(8,15,10,0.3) 0%, rgba(8,15,10,0.1) 40%, rgba(8,15,10,0.5) 100%)`,
      }} />

      {/* Frosted glass card */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '1.6rem 2.4rem',
        maxWidth: '420px', width: '90%',
        background: 'rgba(8,15,10,0.38)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: '2px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        animation: 'fadeUp 1.1s ease both',
      }}>
        <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '0 auto 1rem', opacity: 0.7 }} />

        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
          fontWeight: 300, lineHeight: 1.12,
          color: 'var(--cream)', marginBottom: '0.8rem',
        }}>
          Elevate Your Moments<br />
          with <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Timeless</em> Elegance.
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '0.9rem' }}>
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.6 }} />
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
        </div>

        <p style={{ fontSize: 'clamp(0.82rem, 2vw, 0.9rem)', color: 'rgba(245,240,232,0.65)', maxWidth: '320px', margin: '0 auto 1.2rem', lineHeight: 1.9, fontWeight: 300, fontFamily: 'Jost, sans-serif' }}>
          Specializing in bespoke graduation cap toppers, lush bouquets,
          stunning balloon installations, and full-scale event styling.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#booking" style={{
            background: 'var(--gold)', color: 'var(--green-dark)',
            padding: 'clamp(0.75rem,2vw,1rem) clamp(1.5rem,3vw,2.4rem)',
            borderRadius: '1px', textDecoration: 'none',
            fontFamily: 'Jost, sans-serif', fontSize: 'clamp(0.65rem,1.5vw,0.72rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
            transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Book a Service
          </a>
          <a href="/portfolio" style={{
            background: 'transparent', border: '1px solid rgba(245,240,232,0.3)',
            color: 'rgba(245,240,232,0.85)',
            padding: 'clamp(0.75rem,2vw,1rem) clamp(1.5rem,3vw,2.4rem)',
            borderRadius: '1px', textDecoration: 'none',
            fontFamily: 'Jost, sans-serif', fontSize: 'clamp(0.65rem,1.5vw,0.72rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View Portfolio
          </a>
        </div>

        <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '1.4rem auto 0', opacity: 0.7 }} />
      </div>

      {/* Scroll */}
      <div style={{
        position: 'absolute', bottom: '2.2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
        animation: 'bounce 2.5s ease-in-out infinite',
      }}>
        <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)' }} />
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', fontFamily: 'Jost, sans-serif' }}>Scroll</span>
      </div>
    </section>
  )
}
