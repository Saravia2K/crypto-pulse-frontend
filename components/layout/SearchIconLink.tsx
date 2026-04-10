'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SearchIconLink() {
  const pathname = usePathname()
  if (pathname === '/search') return null
  return (
    <Link
      href="/search"
      className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/8 transition-colors"
      aria-label="Search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </Link>
  )
}
