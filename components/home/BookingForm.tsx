'use client'

import { useState, useRef, useEffect } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: '2px', padding: '0.8rem 1rem',
  fontFamily: 'Jost, sans-serif', fontSize: '0.88rem',
  color: 'var(--cream)', outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box' as const,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.68rem', letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(245,240,232,0.6)',
  marginBottom: '0.5rem',
}

const focusIn = (e: React.FocusEvent<any>) => {
  e.currentTarget.style.borderColor = 'var(--gold)'
  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
}
const focusOut = (e: React.FocusEvent<any>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
}

const contactDetails = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Location',
    text: 'Serving Kumasi & Accra, Ghana',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    title: 'WhatsApp',
    text: 'Available for quick inquiries',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    title: 'Instagram',
    text: '@decorbysun — See our latest work',
  },
]

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '',
    style: '', eventDate: '', eventLocation: '', message: '',
  })
  const [files, setFiles]       = useState<File[]>([])
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const fileInputRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFiles(Array.from(e.target.files).slice(0, 5))
  }
  const removeFile = (i: number) => setFiles(f => f.filter((_, idx) => idx !== i))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service) return
    setStatus('loading')
    try {
      // Send everything as one multipart request — form fields + image files together
      console.log('[SUBMIT] files in state:', files.length, files.map(f => f.name))
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      files.forEach(file => fd.append('images', file))
      
      // Log FormData contents
      const fdKeys: string[] = []
      fd.forEach((v, k) => fdKeys.push(k + (v instanceof File ? `(File:${(v as File).name})` : '')))

      const res  = await fetch('/api/bookings', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) setStatus('success')
      else { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error') }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const radioStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: 'pointer',
    padding: '0.55rem 0.9rem',
    border: `1px solid ${selected ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '2px',
    background: selected ? 'rgba(201,168,76,0.08)' : 'transparent',
    transition: 'all 0.2s',
  })

  return (
    <section id="booking" style={{ background: 'var(--green)', padding: isMobile ? '4rem 1.2rem' : '7rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Two columns on desktop, single column on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
        gap: isMobile ? '2.5rem' : '5rem',
        alignItems: 'start',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>

        {/* Left info */}
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem', fontFamily: 'Jost, sans-serif' }}>Get in Touch</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--cream)', lineHeight: 1.15, marginBottom: '1rem' }}>
            Let's Create Something <em style={{ fontStyle: 'italic' }}>Beautiful</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.8, fontWeight: 300, fontFamily: 'Jost, sans-serif', marginBottom: '2rem', maxWidth: '400px' }}>
            Fill in your details and we'll get back to you within 24 hours to confirm your booking.
          </p>

          {contactDetails.map(d => (
            <div key={d.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '36px', flexShrink: 0, border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                {d.icon}
              </div>
              <div>
                <strong style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--cream)', display: 'block', marginBottom: '0.15rem' }}>{d.title}</strong>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'rgba(245,240,232,0.6)' }}>{d.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '6px', padding: isMobile ? '1.5rem' : '2.5rem' }}>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.2rem' }}>✓</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', color: 'var(--cream)', marginBottom: '0.6rem' }}>Inquiry Sent!</h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'rgba(245,240,232,0.6)', lineHeight: 1.7 }}>Thank you! We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '1.8rem' }}>Book a Service</p>

              {/* Name + Phone — stack on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input style={inputStyle} type="text" value={form.name} onChange={set('name')} placeholder="Your name" required onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={labelStyle}>Phone / WhatsApp *</label>
                  <input style={inputStyle} type="tel" value={form.phone} onChange={set('phone')} placeholder="+233 xx xxx xxxx" required onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" onFocus={focusIn} onBlur={focusOut} />
              </div>

              {/* Service */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>What would you like to book? *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Graduation Cap Topper','Floral / Balloon Bouquet','Topper + Bouquet Set','Balloon / Event Styling','Bridal Bouquet / Wedding Favors / Souvenirs'].map(s => (
                    <label key={s} style={radioStyle(form.service === s)}>
                      <input type="radio" name="service" value={s} checked={form.service === s} onChange={set('service')} style={{ accentColor: 'var(--gold)', width: '15px', height: '15px', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'rgba(245,240,232,0.8)' }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>Preferred Style</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Minimal & Elegant','Floral & Feminine','Photo Memory','Fully Custom Concept'].map(s => (
                    <label key={s} style={radioStyle(form.style === s)}>
                      <input type="radio" name="style" value={s} checked={form.style === s} onChange={set('style')} style={{ accentColor: 'var(--gold)', width: '15px', height: '15px', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'rgba(245,240,232,0.8)' }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Event Date + Location — stack on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Event Date</label>
                  <input style={inputStyle} type="date" value={form.eventDate} onChange={set('eventDate')} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={labelStyle}>Event Location</label>
                  <input style={inputStyle} type="text" value={form.eventLocation} onChange={set('eventLocation')} placeholder="e.g. Kumasi City Hotel" onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              {/* File upload */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>Upload Inspiration Image (Optional)</label>
                <div onClick={() => fileInputRef.current?.click()}
                  style={{ border: '1px dashed rgba(255,255,255,0.22)', borderRadius: '2px', padding: '1.4rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.04)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.5)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.22)' }}
                >
                  <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.4rem', color: 'rgba(245,240,232,0.4)' }}>↑</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.76rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6 }}>
                    Click to add files · Up to 5 images · Max 10MB each
                  </span>
                  <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={handleFiles} />
                </div>
                {files.length > 0 && (
                  <div style={{ marginTop: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {files.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.8rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'rgba(245,240,232,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>📎 {f.name}</span>
                        <button type="button" onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer', fontSize: '0.85rem', padding: '0 0.2rem', flexShrink: 0 }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={labelStyle}>Additional Notes</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }} value={form.message} onChange={set('message')} placeholder="Tell us more about your vision, colors, theme..." onFocus={focusIn} onBlur={focusOut} />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#ff8a8a', marginBottom: '0.8rem' }}>{errorMsg}</p>
              )}

              <button type="submit" disabled={status === 'loading'}
                style={{ width: '100%', marginTop: '1rem', background: 'var(--gold)', color: 'var(--green)', padding: '1rem', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, borderRadius: '2px', transition: 'all 0.2s', opacity: status === 'loading' ? 0.7 : 1 }}
                onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold-light)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)', textAlign: 'center', marginTop: '0.8rem', lineHeight: 1.6 }}>
                We'll respond within 24 hours · No payment required to inquire
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
