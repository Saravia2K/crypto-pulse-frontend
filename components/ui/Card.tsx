import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-white/8 bg-[#1a1a2e] p-4 ${
        hover ? 'transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#1e1e38]' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
