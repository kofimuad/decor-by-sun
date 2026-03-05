'use client'

import SunLogo from '@/components/ui/SunLogo'

export default function Footer() {
  return (
    <footer style={{ background: '#080f0a', padding: '5rem 5rem 2.5rem', color: 'rgba(245,240,232,0.55)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>

        {/* Brand */}
        <div>
          <div style={{ marginBottom: '1.4rem' }}>
            <SunLogo size={64} />
          </div>

          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(245,240,232,0.35)', lineHeight: 1.85, maxWidth: '250px', marginBottom: '1.8rem' }}>
            "Elevating your most cherished moments with timeless, bespoke elegance."
          </p>

          {/* Social icons - proper SVGs */}
          <div style={{ display: 'flex', gap: '0.7rem' }}>
            {/* Instagram */}
            <a href="https://instagram.com/decorbysun" target="_blank" rel="noreferrer"
              style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,240,232,0.5)', textDecoration: 'none', transition: 'all 0.25s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(245,240,232,0.5)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/233XXXXXXXXX" target="_blank" rel="noreferrer"
              style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,240,232,0.5)', textDecoration: 'none', transition: 'all 0.25s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(245,240,232,0.5)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.6rem', fontFamily: 'Jost, sans-serif', fontWeight: 500 }}>Quick Links</p>
          <ul style={{ listStyle: 'none' }}>
            {[['Services','/#services'],['Portfolio','/portfolio'],['About','/about'],['Contact','/contact'],['Book Now','/#booking']].map(([l,h]) => (
              <li key={l} style={{ marginBottom: '0.85rem' }}>
                <a href={h} style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none', fontSize: '0.84rem', fontFamily: 'Jost, sans-serif', fontWeight: 300, letterSpacing: '0.02em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.45)')}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.6rem', fontFamily: 'Jost, sans-serif', fontWeight: 500 }}>Services</p>
          <ul style={{ listStyle: 'none' }}>
            {['Graduation Cap Toppers','Floral Bouquets','Balloon & Event Styling','Topper + Bouquet Sets','Bridal & Wedding'].map(s => (
              <li key={s} style={{ marginBottom: '0.85rem' }}>
                <a href="/#booking" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none', fontSize: '0.84rem', fontFamily: 'Jost, sans-serif', fontWeight: 300, letterSpacing: '0.02em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.45)')}
                >{s}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginBottom: '2.2rem' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.74rem', fontFamily: 'Jost, sans-serif', fontWeight: 300, letterSpacing: '0.04em' }}>© {new Date().getFullYear()} Decor by Sun. All rights reserved.</span>
        <span style={{ fontSize: '0.74rem', fontFamily: 'Jost, sans-serif', fontWeight: 300, letterSpacing: '0.04em' }}>Kumasi, Ashanti Region, Ghana</span>
      </div>
    </footer>
  )
}
