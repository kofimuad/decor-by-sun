'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/ui'

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    background: '#fff', border: '1px solid rgba(27,67,50,0.2)',
    borderRadius: '2px', color: 'var(--green)',
    fontFamily: 'Jost, sans-serif', fontSize: '0.88rem', outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ padding: '5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Info */}
        <div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--green)', fontWeight: 300, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            We'd love to hear from you.
          </h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: 'var(--green-light)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
            Have a question about our services or want to discuss your vision? Send us a message and we'll get back to you within 24 hours.
          </p>

          {[
            { icon: '📍', title: 'Location',  text: 'Kumasi, Ashanti Region, Ghana' },
            { icon: '📱', title: 'WhatsApp',  text: '+233 xx xxx xxxx' },
            { icon: '✉️', title: 'Email',     text: 'hello@decorbysun.com' },
            { icon: '📸', title: 'Instagram', text: '@decorbysun' },
          ].map(d => (
            <div key={d.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', flexShrink: 0, border: '1px solid rgba(201,168,76,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', background: 'rgba(201,168,76,0.08)' }}>
                {d.icon}
              </div>
              <div>
                <strong style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--green)', display: 'block', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.title}</strong>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)' }}>{d.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '4px', padding: '2.5rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', color: 'var(--green)', marginBottom: '0.6rem' }}>Message Sent!</h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--green-light)', lineHeight: 1.7 }}>Thank you for reaching out! We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: 'var(--green)', fontWeight: 400, marginBottom: '1.8rem' }}>Send a Message</h2>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your name', required: true },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com', required: false },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+233 xx xxx xxxx', required: false },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form]} onChange={set(f.key as keyof typeof form)} placeholder={f.placeholder} required={f.required} style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(27,67,50,0.2)')}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '0.5rem' }}>Message *</label>
                <textarea value={form.message} onChange={set('message')} required placeholder="How can we help you?" style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(27,67,50,0.2)')}
                />
              </div>
              {status === 'error' && <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#c0392b', marginBottom: '0.8rem' }}>Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: 'var(--green)', color: 'var(--cream)', padding: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '2px', transition: 'all 0.2s', opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
