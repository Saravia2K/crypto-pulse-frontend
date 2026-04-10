import Link from 'next/link'
import { SearchIconLink } from '@/components/layout/SearchIconLink'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0f0f1a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-lg tracking-tight"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black">
            CP
          </span>
          <span>CryptoPulse</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/8 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/search"
            className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/8 rounded-lg transition-colors"
          >
            Search
          </Link>
          <Link
            href="/favorites"
            className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/8 rounded-lg transition-colors"
          >
            Favorites
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchIconLink />
          {/* Mobile nav */}
          <nav className="flex sm:hidden items-center gap-1">
            <Link
              href="/"
              className="p-2 text-slate-400 hover:text-slate-200"
              aria-label="Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
            </Link>
            <Link
              href="/favorites"
              className="p-2 text-slate-400 hover:text-slate-200"
              aria-label="Favorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
