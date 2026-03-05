'use client'

import { useEffect, useState } from 'react'
import { SectionLabel } from '@/components/ui'


export default function AboutPage() {
  const [aboutPhoto, setAboutPhoto] = useState<string | null>(null)
  const [aboutHero, setAboutHero]   = useState<string | null>(null)
  const [isMobile, setIsMobile]     = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.settings?.about_photo) setAboutPhoto(data.settings.about_photo)
        setAboutHero(data.settings?.about_hero || null)
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* ── Hero — full bleed image, content padded below navbar ── */}
      <div style={{ position: 'relative', minHeight: isMobile ? '380px' : '500px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: aboutHero ? `url('${aboutHero}')` : 'none',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,20,14,0.62)' }} />

        {/* Frosted glass card */}
        <div style={{
          position: 'relative', zIndex: 2,
          margin: isMobile ? '0 1.2rem' : '0 5rem',
          marginTop: '80px',
          padding: isMobile ? '2rem 1.8rem' : '3rem 4rem',
          background: 'rgba(8,15,10,0.35)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: '2px',
          boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
          maxWidth: '580px',
          width: isMobile ? 'calc(100% - 2.4rem)' : 'auto',
        }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '1.5rem', opacity: 0.8 }} />
          <SectionLabel light>Our Story</SectionLabel>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginTop: '0.5rem',
          }}>
            Crafting Memories,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>One Detail at a Time.</em>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.4rem' }}>
            <div style={{ height: '1px', width: '32px', background: 'rgba(201,168,76,0.5)' }} />
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)' }}>Kumasi & Accra, Ghana</span>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginTop: '1.5rem', opacity: 0.8 }} />
        </div>
      </div>

      {/* ── Story + Photo ── */}
      <div style={{
        padding: isMobile ? '3rem 1.5rem' : '6rem 5rem',
        display: 'grid',
        // Photo on top on mobile, side by side on desktop
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2.5rem' : '5rem',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* Photo — comes first on mobile so it's at the top */}
        {isMobile && (
          <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '1/1', width: '72%', margin: '0 auto', boxShadow: '0 12px 40px rgba(27,67,50,0.18)' }}>
            <PhotoSlot aboutPhoto={aboutPhoto} />
          </div>
        )}

        {/* Text */}
        <div>
          <SectionLabel>About Sun</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--green)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.2rem', marginTop: '0.5rem' }}>
            Where Passion Meets <em style={{ fontStyle: 'italic' }}>Craft</em>
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', color: 'var(--green-light)', lineHeight: 1.95, marginBottom: '1.2rem', fontWeight: 300 }}>
            Decor by Sun was born from a deep love of creating beautiful, meaningful experiences. Based in Kumasi and serving all of Accra, we specialize in bespoke graduation cap toppers, lush bouquets, balloon installations, and full-scale event styling.
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', color: 'var(--green-light)', lineHeight: 1.95, fontWeight: 300, marginBottom: '2rem' }}>
            Every piece is designed with intention — to capture the emotion of your milestone, the personality of your celebration, and the elegance you deserve. We believe that the details tell the story.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(27,67,50,0.25)' }} />
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--green)', opacity: 0.7 }}>— Sun</span>
          </div>
        </div>

        {/* Photo — on desktop only (right column) */}
        {!isMobile && (
          <div style={{ borderRadius: '3px', overflow: 'hidden', aspectRatio: '4/5', position: 'relative', boxShadow: '0 20px 60px rgba(27,67,50,0.15)' }}>
            <PhotoSlot aboutPhoto={aboutPhoto} />
          </div>
        )}
      </div>

      {/* ── Values ── */}
      <div style={{ background: '#f0ede6', padding: isMobile ? '3.5rem 1.5rem' : '6rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SectionLabel center>What We Stand For</SectionLabel>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--green)', fontWeight: 400, marginTop: '0.4rem' }}>
            Our <em style={{ fontStyle: 'italic' }}>Values</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1rem', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { title: 'Intentional Design', desc: 'Every piece is thoughtfully crafted to reflect your unique story.' },
            { title: 'Timeless Elegance',  desc: 'Beautiful today, cherished forever.' },
            { title: 'Personal Touch',     desc: 'We take time to understand exactly what you want.' },
            { title: 'Local Pride',        desc: 'Proudly serving Kumasi and Accra with love.' },
          ].map((v, i) => (
            <div key={v.title} style={{ background: '#fff', padding: isMobile ? '1.4rem' : '2rem', borderRadius: '3px', border: '1px solid rgba(27,67,50,0.08)', borderTop: '2px solid var(--gold)' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', color: 'var(--gold)', opacity: 0.55, display: 'block', marginBottom: '0.7rem', fontStyle: 'italic' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: 'var(--green)', marginBottom: '0.5rem', fontWeight: 400 }}>{v.title}</h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green-light)', lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'var(--green)', padding: isMobile ? '3.5rem 1.5rem' : '5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto 2rem', opacity: 0.6 }} />
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--cream)', fontWeight: 300, lineHeight: 1.2 }}>
            Ready to Create Something <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Beautiful?</em>
          </h2>
          <a href="/#booking" style={{ display: 'inline-block', marginTop: '2rem', background: 'var(--gold)', color: 'var(--green)', padding: '1rem 2.5rem', borderRadius: '2px', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold-light)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
          >
            Book a Service
          </a>
        </div>
      </div>
    </div>
  )
}

function PhotoSlot({ aboutPhoto }: { aboutPhoto: string | null }) {
  return aboutPhoto ? (
    <img src={aboutPhoto} alt="Decor by Sun" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
  ) : (
    <div style={{ width: '100%', height: '100%', minHeight: '240px', background: 'linear-gradient(160deg, #1B4332 0%, #0a2a18 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.8rem' }}>
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', color: 'rgba(245,240,232,0.3)', fontStyle: 'italic' }}>
        Add your photo in<br />Admin → Settings
      </p>
    </div>
  )
}
