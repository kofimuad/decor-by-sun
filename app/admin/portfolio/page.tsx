'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const categories = ['Cap Toppers', 'Bouquets', 'Events', 'Bridal']

interface PortfolioItem {
  _id: string
  title: string
  imageUrl: string
  category: string
  featured: boolean
}

export default function AdminPortfolioPage() {
  const [items, setItems]         = useState<PortfolioItem[]>([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]       = useState(false)
  const [msg, setMsg]             = useState('')
  const [preview, setPreview]     = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [form, setForm]           = useState({ title: '', category: 'Bouquets', featured: false })
  const fileInputRef              = useRef<HTMLInputElement>(null)

  const fetchItems = async () => {
    const res = await fetch('/api/portfolio')
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    // Upload to server
    setUploading(true)
    setMsg('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok) {
      setUploadedUrl(data.url)
      setMsg('✓ Photo uploaded! Fill in the title and category, then click Add Photo.')
    } else {
      setMsg(`Upload failed: ${data.error}`)
      setPreview(null)
    }
    setUploading(false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadedUrl) { setMsg('Please upload a photo first.'); return }
    if (!form.title)  { setMsg('Please enter a title.'); return }
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, imageUrl: uploadedUrl, category: form.category, featured: form.featured }),
    })
    if (res.ok) {
      setMsg('✓ Photo added to portfolio!')
      setForm({ title: '', category: 'Bouquets', featured: false })
      setPreview(null)
      setUploadedUrl('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      fetchItems()
    } else {
      setMsg('Failed to save. Please try again.')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return
    await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const toggleFeatured = async (item: PortfolioItem) => {
    await fetch(`/api/portfolio/${item._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !item.featured }),
    })
    fetchItems()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    border: '1px solid rgba(27,67,50,0.2)', borderRadius: '2px',
    fontFamily: 'Jost, sans-serif', fontSize: '0.88rem',
    color: 'var(--green)', background: '#fff', outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'Jost, sans-serif',
    fontSize: '0.65rem', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '0.4rem',
  }

  return (
    <AdminLayout>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--green)', fontWeight: 400 }}>Portfolio</h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>Upload photos from your laptop — they'll appear instantly on your website.</p>
        </div>

        {/* Upload form */}
        <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', fontWeight: 400, marginBottom: '1.5rem' }}>Add New Photo</h2>
          <form onSubmit={handleAdd}>

            {/* File drop zone */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Photo *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${uploadedUrl ? 'rgba(45,106,79,0.4)' : 'rgba(27,67,50,0.2)'}`,
                  borderRadius: '4px', cursor: 'pointer',
                  background: uploadedUrl ? 'rgba(45,106,79,0.04)' : 'rgba(27,67,50,0.02)',
                  transition: 'all 0.2s', overflow: 'hidden',
                  minHeight: preview ? 'auto' : '160px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => { if (!uploadedUrl) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(27,67,50,0.4)' }}
                onMouseLeave={e => { if (!uploadedUrl) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(27,67,50,0.2)' }}
              >
                {preview ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    <img src={preview} alt="preview" style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(27,67,50,0.7)', padding: '0.6rem 1rem' }}>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--cream)' }}>
                        {uploading ? '⏳ Uploading...' : '✓ Uploaded — click to change'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2.5rem' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(27,67,50,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.8rem' }}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green)', marginBottom: '0.3rem', fontWeight: 500 }}>
                      {uploading ? 'Uploading...' : 'Click to upload a photo'}
                    </p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: 'var(--green-light)' }}>
                      JPG, PNG, WEBP — max 10MB
                    </p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} disabled={uploading} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input style={inputStyle} type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Graduation Bouquet" required />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select style={{ ...inputStyle, WebkitAppearance: 'none' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginBottom: '1.2rem', fontFamily: 'Jost, sans-serif', fontSize: '0.83rem', color: 'var(--green)' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} style={{ accentColor: 'var(--green)', width: '15px', height: '15px' }} />
              Show on homepage (featured)
            </label>

            {msg && (
              <div style={{ padding: '0.7rem 1rem', marginBottom: '1rem', borderRadius: '2px', background: msg.startsWith('✓') ? 'rgba(45,106,79,0.08)' : 'rgba(192,57,43,0.08)', border: `1px solid ${msg.startsWith('✓') ? 'rgba(45,106,79,0.2)' : 'rgba(192,57,43,0.2)'}`, fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: msg.startsWith('✓') ? '#2D6A4F' : '#c0392b' }}>
                {msg}
              </div>
            )}

            <button type="submit" disabled={saving || uploading || !uploadedUrl}
              style={{ background: 'var(--green)', color: 'var(--cream)', padding: '0.75rem 2rem', border: 'none', cursor: (saving || uploading || !uploadedUrl) ? 'not-allowed' : 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '2px', opacity: (saving || uploading || !uploadedUrl) ? 0.5 : 1 }}>
              {saving ? 'Saving...' : 'Add Photo'}
            </button>
          </form>
        </div>

        {/* Photo grid */}
        <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '2rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: 'var(--green)', fontWeight: 400, marginBottom: '1.5rem' }}>
            All Photos <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)', fontWeight: 400 }}>({items.length})</span>
          </h2>
          {loading ? (
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>Loading...</p>
          ) : items.length === 0 ? (
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>No photos yet — upload your first one above.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {items.map(item => (
                <div key={item._id} style={{ border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.8rem' }}>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green)', fontWeight: 500, marginBottom: '0.2rem' }}>{item.title}</p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', color: 'var(--green-light)', marginBottom: '0.7rem' }}>{item.category}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => toggleFeatured(item)} style={{ flex: 1, padding: '0.4rem', border: '1px solid rgba(27,67,50,0.2)', background: item.featured ? 'rgba(201,168,76,0.1)' : 'transparent', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: item.featured ? 'var(--gold)' : 'var(--green-light)', borderRadius: '2px' }}>
                        {item.featured ? '★ Featured' : '☆ Feature'}
                      </button>
                      <button onClick={() => handleDelete(item._id)} style={{ padding: '0.4rem 0.7rem', border: '1px solid rgba(192,57,43,0.3)', background: 'transparent', cursor: 'pointer', color: '#c0392b', borderRadius: '2px', fontSize: '0.82rem' }}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>

  )
}
