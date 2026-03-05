'use client'

import { useState } from 'react'

interface SunLogoProps { size?: number; className?: string }

export default function SunLogo({ size = 38, className = '' }: SunLogoProps) {
  const [useFallback, setUseFallback] = useState(false)

  if (!useFallback) {
    return (
      <img
        src="/logo.png"
        alt="Decor by Sun"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', display: 'block' }}
        onError={() => setUseFallback(true)}
      />
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 28 Q19 6 33 28" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M10 28 Q19 12 28 28" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <line x1="19" y1="3"  x2="19" y2="7"  stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8"  y1="6"  x2="10" y2="9"  stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="30" y1="6"  x2="28" y2="9"  stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="3"  y1="16" x2="7"  y2="17" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="35" y1="16" x2="31" y2="17" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
