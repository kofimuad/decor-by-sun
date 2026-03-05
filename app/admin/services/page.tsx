'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Service {
  _id: string
  name: string
  description: string
  icon: string
  order: number
}

const DEFAULT_SERVICES = [
  { name: 'Graduation Cap Topper', description: 'Custom-designed toppers that capture your achievement and make your graduation photos unforgettable.', icon: '🎓', order: 1 },
  { name: 'Floral & Balloon Bouquet', description: 'Lush, hand-crafted bouquets blending fresh florals and elegant balloons for a truly special gift.', icon: '💐', order: 2 },
  { name: 'Topper + Bouquet Set', description: 'The perfect combo — a matching cap topper and bouquet set designed together for a cohesive look.', icon: '🌸', order: 3 },
  { name: 'Balloon & Event Styling', description: 'Full-scale installations and event décor — from balloon arches to complete venue transformations.', icon: '🎈', order: 4 },
  { name: 'Bridal Bouquet / Wedding Favors / Souvenirs', description: 'Exquisite bridal bouquets, wedding favors, and keepsakes designed to reflect your love story.', icon: '💍', order: 5 },
]

export default function AdminServicesPage() {
  const [services, setServices]   = useState<Service[]>([])
  const [loading, setLoading]     = useState(true)
  const [editing, setEditing]     = useState<Service | null>(null)
  const [saving, setSaving]       = useState(false)
  const [msg, setMsg]             = useState('')
  const [showAdd, setShowAdd]     = useState(false)
  const [newService, setNewService] = useState({ name: '', description: '', icon: '✦', order: 0 })

  const fetchServices = async () => {
    const res = await fetch('/api/services')
    const data = await res.json()
    setServices(data.services || [])
    setLoading(false)
  }

  useEffect(() => { fetchServices() }, [])

  const handleSeedDefaults = async () => {
    setSaving(true)
    for (const s of DEFAULT_SERVICES) {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      })
    }
    setMsg('Default services added!')
    fetchServices()
    setSaving(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    const res = await fetch(`/api/services/${editing._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editing.name, description: editing.description, icon: editing.icon, order: editing.order }),
    })
    if (res.ok) { setMsg('Service updated!'); setEditing(null); fetchServices() }
    else setMsg('Failed to update.')
    setSaving(false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    })
    if (res.ok) {
      setMsg('Service added!')
      setNewService({ name: '', description: '', icon: '✦', order: 0 })
      setShowAdd(false)
      fetchServices()
    } else setMsg('Failed to add service.')
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const fetchItems = fetchServices

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.7rem 1rem',
    border: '1px solid rgba(27,67,50,0.2)', borderRadius: '2px',
    fontFamily: 'Jost, sans-serif', fontSize: '0.88rem',
    color: 'var(--green)', background: '#fff', outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'Jost, sans-serif',
    fontSize: '0.68rem', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '0.4rem',
  }

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--green)', fontWeight: 400 }}>Services</h1>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)', marginTop: '0.3rem' }}>Edit the services shown on your website.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {services.length === 0 && (
              <button onClick={handleSeedDefaults} disabled={saving} style={{ background: 'rgba(27,67,50,0.1)', color: 'var(--green)', padding: '0.65rem 1.2rem', border: '1px solid rgba(27,67,50,0.2)', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px' }}>
                Load Defaults
              </button>
            )}
            <button onClick={() => setShowAdd(!showAdd)} style={{ background: 'var(--green)', color: 'var(--cream)', padding: '0.65rem 1.2rem', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px' }}>
              + Add Service
            </button>
          </div>
        </div>

        {msg && <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: msg.includes('Failed') ? '#c0392b' : '#2D6A4F', marginBottom: '1rem', padding: '0.75rem 1rem', background: msg.includes('Failed') ? 'rgba(192,57,43,0.08)' : 'rgba(45,106,79,0.08)', borderRadius: '2px' }}>{msg}</p>}

        {/* Add new service form */}
        {showAdd && (
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '4px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'var(--green)', marginBottom: '1.2rem', fontWeight: 400 }}>New Service</h3>
            <form onSubmit={handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Service Name *</label>
                  <input style={inputStyle} type="text" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} placeholder="e.g. Graduation Cap Topper" required />
                </div>
                <div>
                  <label style={labelStyle}>Icon (emoji)</label>
                  <input style={inputStyle} type="text" value={newService.icon} onChange={e => setNewService(s => ({ ...s, icon: e.target.value }))} placeholder="🎓" />
                </div>
                <div>
                  <label style={labelStyle}>Order</label>
                  <input style={inputStyle} type="number" value={newService.order} onChange={e => setNewService(s => ({ ...s, order: Number(e.target.value) }))} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Description *</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={newService.description} onChange={e => setNewService(s => ({ ...s, description: e.target.value }))} placeholder="Describe this service..." required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" disabled={saving} style={{ background: 'var(--green)', color: 'var(--cream)', padding: '0.65rem 1.5rem', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : 'Add Service'}
                </button>
                <button type="button" onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: 'var(--green-light)', padding: '0.65rem 1rem', border: '1px solid rgba(27,67,50,0.2)', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', borderRadius: '2px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services list */}
        {loading ? (
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>Loading...</p>
        ) : services.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: 'var(--green-light)', marginBottom: '1rem' }}>No services yet.</p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'var(--green-light)', opacity: 0.7 }}>Click "Load Defaults" to populate with your 5 standard services, or add them manually.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {services.map(service => (
              <div key={service._id} style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '1.5rem' }}>
                {editing?._id === service._id ? (
                  // Edit form
                  <form onSubmit={handleUpdate}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Service Name</label>
                        <input style={inputStyle} type="text" value={editing.name} onChange={e => setEditing(ed => ed ? { ...ed, name: e.target.value } : ed)} required />
                      </div>
                      <div>
                        <label style={labelStyle}>Icon</label>
                        <input style={inputStyle} type="text" value={editing.icon} onChange={e => setEditing(ed => ed ? { ...ed, icon: e.target.value } : ed)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Order</label>
                        <input style={inputStyle} type="number" value={editing.order} onChange={e => setEditing(ed => ed ? { ...ed, order: Number(e.target.value) } : ed)} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Description</label>
                      <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={editing.description} onChange={e => setEditing(ed => ed ? { ...ed, description: e.target.value } : ed)} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" disabled={saving} style={{ background: 'var(--green)', color: 'var(--cream)', padding: '0.6rem 1.5rem', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}>
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', color: 'var(--green-light)', padding: '0.6rem 1rem', border: '1px solid rgba(27,67,50,0.2)', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', borderRadius: '2px' }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display mode
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1 }}>
                      <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: '2px' }}>{service.icon}</span>
                      <div>
                        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'var(--green)', fontWeight: 400, marginBottom: '0.3rem' }}>{service.name}</h3>
                        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.83rem', color: 'var(--green-light)', lineHeight: 1.7 }}>{service.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button onClick={() => setEditing(service)} style={{ padding: '0.45rem 1rem', border: '1px solid rgba(27,67,50,0.2)', background: 'transparent', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green)', borderRadius: '2px' }}>Edit</button>
                      <button onClick={() => handleDelete(service._id)} style={{ padding: '0.45rem 0.75rem', border: '1px solid rgba(192,57,43,0.3)', background: 'transparent', cursor: 'pointer', fontSize: '0.82rem', color: '#c0392b', borderRadius: '2px' }}>✕</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminLayout>

  )
}
