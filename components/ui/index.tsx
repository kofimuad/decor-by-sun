'use client'

import { useEffect, useRef, ReactNode } from 'react'

// ── SectionLabel ──────────────────────────────────────────
interface SectionLabelProps {
  children: ReactNode
  light?: boolean
  center?: boolean
}

export function SectionLabel({ children, light = false, center = false }: SectionLabelProps) {
  return (
    <p
      className={`text-[0.68rem] tracking-[0.32em] uppercase font-sans mb-3 ${
        light ? 'text-gold-light' : 'text-gold'
      } ${center ? 'text-center' : ''}`}
    >
      {children}
    </p>
  )
}

// ── RevealWrapper ─────────────────────────────────────────
interface RevealWrapperProps {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
}

const delayMap = {
  0: '',
  1: 'reveal-delay-1',
  2: 'reveal-delay-2',
  3: 'reveal-delay-3',
  4: 'reveal-delay-4',
}

export function RevealWrapper({ children, delay = 0, className = '' }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${delayMap[delay]} ${className}`}>
      {children}
    </div>
  )
}
