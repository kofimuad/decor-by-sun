'use client'

import { useEffect, useState, useRef } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

const DEFAULT_HERO       = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85'
const DEFAULT_ABOUT_HERO = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [msg, setMsg]         = useState<Record<string, string>>({})

  // Homepage hero (URL input)
  const [heroUrl, setHeroUrl]         = useState('')
  const [heroPreview, setHeroPreview] = useState('')

  // About hero (URL input)
  const [aboutHeroUrl, setAboutHeroUrl]         = useState('')
  const [aboutHeroPreview, setAboutHeroPreview] = useState('')

  // About portrait photo (file upload)
  const [aboutPhotoPreview, setAboutPhotoPreview] = useState<string | null>(null)
  const [aboutPhotoUploading, setAboutPhotoUploading] = useState(false)
  const [aboutPhotoUrl, setAboutPhotoUrl]         = useState('')
  const aboutFileRef  = useRef<HTMLInputElement>(null)
  const logoFileRef   = useRef<HTMLInputElement>(null)

  // Logo
  const [logoPreview, setLogoPreview]     = useState<string | null>(null)
  const [logoUploading, setLogoUploading] = useState(false)
  const [logoUrl, setLogoUrl]             = useState('')

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      const s = data.settings || {}
      setHeroUrl(s.hero_image || DEFAULT_HERO)
      setHeroPreview(s.hero_image || DEFAULT_HERO)
      setAboutHeroUrl(s.about_hero || DEFAULT_ABOUT_HERO)
      setAboutHeroPreview(s.about_hero || DEFAULT_ABOUT_HERO)
      setAboutPhotoUrl(s.about_photo || '')
      setLogoUrl(s.custom_logo || '')
      setLogoPreview(s.custom_logo || null)
      setAboutPhotoPreview(s.about_photo || null)
      setLoading(false)
    })
  }, [])

  const saveSetting = async (key: string, value: string, msgKey: string, successMsg: string) => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
    setMsg(m => ({ ...m, [msgKey]: res.ok ? `✓ ${successMsg}` : 'Failed to save. Please try again.' }))
  }

  const handleAboutPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setAboutPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    setAboutPhotoUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok) {
      setAboutPhotoUrl(data.url)
      setMsg(m => ({ ...m, aboutPhoto: '✓ Uploaded! Click Save Photo to apply.' }))
    } else {
      setMsg(m => ({ ...m, aboutPhoto: `Upload failed: ${data.error}` }))
    }
    setAboutPhotoUploading(false)
  }


  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setLogoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    setLogoUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok) {
      setLogoUrl(data.url)
      setMsg(m => ({ ...m, logo: '✓ Uploaded! Click Save Logo to apply.' }))
      // Clear session cache so logo reloads everywhere
      if (typeof window !== 'undefined') sessionStorage.removeItem('custom_logo')
    } else {
      setMsg(m => ({ ...m, logo: `Upload failed: ${data.error}` }))
    }
    setLogoUploading(false)
  }

  // ── Styles ──────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem',
    border: '1px solid rgba(27,67,50,0.2)', borderRadius: '2px',
    fontFamily: 'Jost, sans-serif', fontSize: '0.85rem',
    color: 'var(--green)', background: '#fff', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'Jost, sans-serif',
    fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'var(--green-light)', marginBottom: '0.5rem',
  }
  const card: React.CSSProperties = {
    background: '#fff', border: '1px solid rgba(27,67,50,0.1)',
    borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem',
  }
  const cardHead: React.CSSProperties = {
    padding: '1.2rem 1.8rem', borderBottom: '1px solid rgba(27,67,50,0.07)',
    background: 'rgba(27,67,50,0.02)',
  }
  const cardBody: React.CSSProperties = { padding: '1.8rem' }
  const msgBox = (m: string): React.CSSProperties => ({
    padding: '0.7rem 1rem', marginBottom: '1rem', borderRadius: '2px',
    background: m.startsWith('✓') ? 'rgba(45,106,79,0.08)' : 'rgba(192,57,43,0.08)',
    border: `1px solid ${m.startsWith('✓') ? 'rgba(45,106,79,0.2)' : 'rgba(192,57,43,0.2)'}`,
    fontFamily: 'Jost, sans-serif', fontSize: '0.8rem',
    color: m.startsWith('✓') ? '#2D6A4F' : '#c0392b',
  })
  const btn: React.CSSProperties = {
    background: 'var(--green)', color: 'var(--cream)', padding: '0.75rem 2rem',
    border: 'none', cursor: 'pointer', borderRadius: '2px',
    fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
    letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
  }
  const btnGhost: React.CSSProperties = {
    ...btn, background: 'transparent', color: 'var(--green-light)',
    border: '1px solid rgba(27,67,50,0.2)',
  }
  const tip: React.CSSProperties = {
    background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '3px', padding: '1rem 1.2rem', marginBottom: '1.2rem',
  }

  const UrlImageCard = ({
    title, subtitle, previewUrl, inputValue, onInputChange, onBlur, onSave, onReset,
    msgKey, overlayText, previewPosition = 'center 30%',
  }: {
    title: string, subtitle: string, previewUrl: string,
    inputValue: string, onInputChange: (v: string) => void, onBlur: () => void,
    onSave: () => void, onReset: () => void, msgKey: string,
    overlayText: string, previewPosition?: string,
  }) => (
    <div style={card}>
      <div style={cardHead}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', fontWeight: 400, margin: 0 }}>{title}</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>{subtitle}</p>
      </div>
      <div style={cardBody}>
        {/* Live preview */}
        <div style={{ width: '100%', height: '180px', borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(27,67,50,0.1)', marginBottom: '1.2rem', position: 'relative', background: '#ddd' }}>
          {previewUrl && <img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: previewPosition }} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,15,10,0.45)', display: 'flex', alignItems: 'center', paddingLeft: '1.5rem', pointerEvents: 'none' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', color: 'var(--cream)' }}>{overlayText}</p>
          </div>
        </div>
        {/* Tip */}
        <div style={tip}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'var(--green)', fontWeight: 500, marginBottom: '0.4rem' }}>📷 How to use your own photo:</p>
          <ol style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'var(--green-light)', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
            <li>Go to <strong>imgur.com</strong> — upload your photo (free, no account needed)</li>
            <li>Right-click the uploaded image → <strong>"Copy image address"</strong></li>
            <li>Paste the URL below and click Save</li>
          </ol>
        </div>
        {/* Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Image URL</label>
          <input type="url" style={inputStyle} value={inputValue} onChange={e => onInputChange(e.target.value)} onBlur={onBlur} placeholder="https://i.imgur.com/yourphoto.jpg" />
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.7rem', color: 'var(--green-light)', marginTop: '0.4rem' }}>Tab out of this field to see a live preview above.</p>
        </div>
        {msg[msgKey] && <div style={msgBox(msg[msgKey])}>{msg[msgKey]}</div>}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={btn} onClick={onSave}>Save Image</button>
          <button style={btnGhost} onClick={onReset}>Reset to Default</button>
        </div>
      </div>
    </div>
  )

  return (
    <AdminLayout>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--green)', fontWeight: 400 }}>Site Settings</h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>Manage images and content across your website.</p>
        </div>

        {loading ? <p style={{ fontFamily: 'Jost, sans-serif', color: 'var(--green-light)' }}>Loading...</p> : (
          <div style={{ maxWidth: '800px' }}>

            {/* 1 — Homepage Hero */}
            <UrlImageCard
              title="Homepage Hero Image"
              subtitle="The large full-screen background photo on your homepage."
              previewUrl={heroPreview}
              inputValue={heroUrl}
              onInputChange={setHeroUrl}
              onBlur={() => setHeroPreview(heroUrl)}
              onSave={() => saveSetting('hero_image', heroUrl, 'hero', 'Homepage hero updated!')}
              onReset={() => { setHeroUrl(DEFAULT_HERO); setHeroPreview(DEFAULT_HERO) }}
              msgKey="hero"
              overlayText={`Elevate Your Moments — with Timeless Elegance.`}
            />

            {/* 2 — About Page Hero */}
            <UrlImageCard
              title="About Page Hero Image"
              subtitle="The background photo behind the frosted glass card on your About page."
              previewUrl={aboutHeroPreview}
              inputValue={aboutHeroUrl}
              onInputChange={setAboutHeroUrl}
              onBlur={() => setAboutHeroPreview(aboutHeroUrl)}
              onSave={() => saveSetting('about_hero', aboutHeroUrl, 'aboutHero', 'About page hero updated!')}
              onReset={() => { setAboutHeroUrl(DEFAULT_ABOUT_HERO); setAboutHeroPreview(DEFAULT_ABOUT_HERO) }}
              msgKey="aboutHero"
              overlayText={`Crafting Memories, One Detail at a Time.`}
              previewPosition="center 40%"
            />

            {/* 3 — About Portrait Photo */}
            <div style={card}>
              <div style={cardHead}>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', fontWeight: 400, margin: 0 }}>About Page — Your Portrait Photo</h2>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>Your photo shown next to your story on the About page.</p>
              </div>
              <div style={cardBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start', marginBottom: '1.2rem' }}>
                  {/* Upload zone */}
                  <div>
                    <label style={labelStyle}>Upload from Laptop</label>
                    <div
                      onClick={() => aboutFileRef.current?.click()}
                      style={{ border: `2px dashed ${aboutPhotoUrl ? 'rgba(45,106,79,0.4)' : 'rgba(27,67,50,0.2)'}`, borderRadius: '4px', cursor: 'pointer', background: aboutPhotoUrl ? 'rgba(45,106,79,0.03)' : 'rgba(27,67,50,0.02)', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'all 0.2s' }}
                    >
                      {aboutPhotoPreview ? (
                        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                          <img src={aboutPhotoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(27,67,50,0.7)', padding: '0.5rem', textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'var(--cream)' }}>
                              {aboutPhotoUploading ? '⏳ Uploading...' : '✓ Click to change'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(27,67,50,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.7rem' }}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green)', fontWeight: 500, marginBottom: '0.25rem' }}>Click to upload</p>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'var(--green-light)' }}>JPG, PNG — max 10MB</p>
                        </div>
                      )}
                      <input ref={aboutFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAboutPhotoUpload} disabled={aboutPhotoUploading} />
                    </div>
                  </div>
                  {/* Preview */}
                  <div>
                    <label style={labelStyle}>Preview on About Page</label>
                    <div style={{ aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(27,67,50,0.1)', background: 'linear-gradient(135deg, #1B4332, #0a2a18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {aboutPhotoPreview
                        ? <img src={aboutPhotoPreview} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', color: 'rgba(245,240,232,0.3)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>Your photo will appear here</p>
                      }
                    </div>
                  </div>
                </div>
                {msg.aboutPhoto && <div style={msgBox(msg.aboutPhoto)}>{msg.aboutPhoto}</div>}
                <button
                  style={{ ...btn, opacity: (!aboutPhotoUrl || aboutPhotoUploading) ? 0.5 : 1, cursor: (!aboutPhotoUrl || aboutPhotoUploading) ? 'not-allowed' : 'pointer' }}
                  disabled={!aboutPhotoUrl || aboutPhotoUploading}
                  onClick={() => saveSetting('about_photo', aboutPhotoUrl, 'aboutPhoto', 'Portrait photo saved!')}
                >
                  Save Photo
                </button>
              </div>
            </div>

            {/* 4 — Logo */}
            <div style={card}>
              <div style={cardHead}>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', fontWeight: 400, margin: 0 }}>Site Logo</h2>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>Upload your PNG logo — it replaces the default sun icon everywhere on the site.</p>
              </div>
              <div style={cardBody}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start', marginBottom: '1.2rem' }}>
                  {/* Upload zone */}
                  <div>
                    <label style={labelStyle}>Upload Logo (PNG recommended)</label>
                    <div
                      onClick={() => logoFileRef.current?.click()}
                      style={{ border: `2px dashed ${logoUrl ? 'rgba(45,106,79,0.4)' : 'rgba(27,67,50,0.2)'}`, borderRadius: '4px', cursor: 'pointer', background: logoUrl ? 'rgba(45,106,79,0.03)' : 'rgba(27,67,50,0.02)', minHeight: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'all 0.2s' }}
                    >
                      {logoPreview ? (
                        <div style={{ padding: '1.5rem', textAlign: 'center', width: '100%' }}>
                          <img src={logoPreview} alt="Logo preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', display: 'block', margin: '0 auto 0.8rem' }} />
                          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'var(--green-light)' }}>{logoUploading ? '⏳ Uploading...' : '✓ Click to change'}</span>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(27,67,50,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.6rem' }}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--green)', fontWeight: 500, marginBottom: '0.2rem' }}>Click to upload</p>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'var(--green-light)' }}>PNG with transparent background works best</p>
                        </div>
                      )}
                      <input ref={logoFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} disabled={logoUploading} />
                    </div>
                  </div>
                  {/* Preview in navbar context */}
                  <div>
                    <label style={labelStyle}>Preview in Navbar</label>
                    <div style={{ background: 'var(--green)', borderRadius: '4px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                      ) : (
                        <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
                          <path d="M5 28 Q19 6 33 28" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          <path d="M10 28 Q19 12 28 28" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
                          <line x1="19" y1="3" x2="19" y2="7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="8" y1="6" x2="10" y2="9" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
                          <line x1="30" y1="6" x2="28" y2="9" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      )}
                      <div style={{ fontFamily: '"Cormorant Garamond", serif', color: 'var(--cream)', lineHeight: 1.2 }}>
                        <span style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55 }}>Decor by</span>
                        <span style={{ display: 'block', fontSize: '1.1rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Sun</span>
                      </div>
                    </div>
                  </div>
                </div>
                {msg.logo && <div style={msgBox(msg.logo)}>{msg.logo}</div>}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{ ...btn, opacity: (!logoUrl || logoUploading) ? 0.5 : 1, cursor: (!logoUrl || logoUploading) ? 'not-allowed' : 'pointer' }} disabled={!logoUrl || logoUploading}
                    onClick={() => saveSetting('custom_logo', logoUrl, 'logo', 'Logo saved! Refresh the site to see it.')}>
                    Save Logo
                  </button>
                  {logoUrl && (
                    <button style={btnGhost} onClick={async () => {
                      await saveSetting('custom_logo', '', 'logo', 'Logo reset to default.')
                      setLogoUrl(''); setLogoPreview(null)
                      if (typeof window !== 'undefined') sessionStorage.removeItem('custom_logo')
                    }}>
                      Remove Logo
                    </button>
                  )}
                </div>
              </div>
            </div>


          </div>
        )}
      </AdminLayout>

  )
}
