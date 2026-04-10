import Link from 'next/link'
import type { CryptoAsset } from '@/types/crypto'
import {
  formatPrice,
  formatMarketCap,
  formatPercent,
  getChangeDirection,
} from '@/lib/utils/formatters'
import { Badge } from '@/components/ui/Badge'
import { FavoriteButton } from '@/components/crypto/FavoriteButton'

interface CryptoCardProps {
  crypto: CryptoAsset
}

function CryptoLogo({ symbol, name }: { symbol: string; name: string }) {
  const colors = [
    'from-indigo-500 to-purple-600',
    'from-orange-500 to-amber-500',
    'from-sky-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-rose-500 to-pink-500',
    'from-violet-500 to-fuchsia-500',
  ]
  const index =
    name.charCodeAt(0) % colors.length
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colors[index]} text-white text-sm font-bold`}
    >
      {symbol.slice(0, 2).toUpperCase()}
    </div>
  )
}

function ChangeIndicator({ value }: { value?: string | null }) {
  const direction = getChangeDirection(value)
  const label = formatPercent(value)

  if (direction === 'up') {
    return (
      <Badge variant="success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-0.5"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        {label}
      </Badge>
    )
  }
  if (direction === 'down') {
    return (
      <Badge variant="danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-0.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        {label}
      </Badge>
    )
  }
  return <Badge variant="default">{label}</Badge>
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/8 bg-[#1a1a2e] p-4 transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#1e1e38]">
      <div className="mb-3 flex items-start justify-between">
        <Link href={`/crypto/${crypto.id}`} className="flex items-center gap-3">
          <CryptoLogo symbol={crypto.symbol} name={crypto.name} />
          <div>
            <p className="font-semibold text-white leading-none">{crypto.name}</p>
            <p className="mt-1 text-xs text-slate-400 uppercase">{crypto.symbol}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <Badge variant="default" className="text-xs">#{crypto.rank}</Badge>
          <FavoriteButton cryptoId={crypto.id} />
        </div>
      </div>

      <Link href={`/crypto/${crypto.id}`} className="block">
        <p className="text-xl font-bold text-white">
          {formatPrice(crypto.price_usd)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <ChangeIndicator value={crypto.change_percent_24hr} />
          <span className="text-xs text-slate-500">24h</span>
        </div>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-x-4 border-t border-white/6 pt-3">
        <div>
          <p className="text-xs text-slate-500">Market Cap</p>
          <p className="text-xs font-medium text-slate-300">
            {formatMarketCap(crypto.market_cap_usd)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Volume 24h</p>
          <p className="text-xs font-medium text-slate-300">
            {formatMarketCap(crypto.volume_usd_24hr)}
          </p>
        </div>
      </div>
    </div>
  )
}
