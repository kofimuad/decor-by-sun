'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const base = 'inline-flex items-center justify-center font-sans tracking-widest uppercase text-xs font-medium rounded-sm transition-all duration-200 cursor-pointer border-none'

const variants = {
  primary: 'bg-gold text-green hover:bg-gold-light active:scale-95',
  ghost:   'bg-white/10 border border-white/20 text-cream hover:bg-white/20 backdrop-blur-sm active:scale-95',
  danger:  'bg-red-700 text-white hover:bg-red-600 active:scale-95',
  outline: 'border border-green text-green hover:bg-green hover:text-cream active:scale-95',
}

const sizes = {
  sm: 'px-4 py-2 text-[0.68rem]',
  md: 'px-6 py-3 text-[0.75rem]',
  lg: 'px-8 py-4 text-[0.78rem]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
