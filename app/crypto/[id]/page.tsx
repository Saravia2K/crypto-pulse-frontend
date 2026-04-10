import type { Metadata } from 'next'
import Link from 'next/link'
import {
  fetchCryptoDetail,
  fetchCryptoHistory,
} from '@/lib/api/endpoints/crypto'
import {
  formatMarketCap,
  formatPercent,
  formatPrice,
  formatSupply,
  formatVolume,
  getChangeDirection,
} from '@/lib/utils/formatters'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FavoriteButton } from '@/components/crypto/FavoriteButton'
import { ClientChart } from './components/ClientChart'
import { DEFAULT_HISTORY_DAYS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { data } = await fetchCryptoDetail(id)
    return {
      title: `${data.name} (${data.symbol.toUpperCase()})`,
      description: `Price, charts, and market data for ${data.name}.`,
    }
  } catch {
    return { title: 'Cryptocurrency Detail' }
  }
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-white/6 bg-white/3 p-3">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-200">{value}</p>
    </div>
  )
}

export default async function CryptoDetailPage({ params }: PageProps) {
  const { id } = await params

  const [{ data: crypto }, history] = await Promise.all([
    fetchCryptoDetail(id),
    fetchCryptoHistory(id, DEFAULT_HISTORY_DAYS),
  ])

  const direction = getChangeDirection(crypto.change_percent_24hr)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-300">{crypto.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-lg font-bold">
            {crypto.symbol.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{crypto.name}</h1>
              <Badge variant="default">#{crypto.rank}</Badge>
            </div>
            <p className="mt-0.5 text-sm text-slate-400 uppercase tracking-wider">
              {crypto.symbol}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {crypto.explorer && (
            <a
              href={crypto.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Explorer
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          )}
          <FavoriteButton cryptoId={crypto.id} />
        </div>
      </div>

      {/* Price section */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            <p className="text-3xl font-bold text-white">
              {formatPrice(crypto.price_usd)}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={direction === 'up' ? 'success' : direction === 'down' ? 'danger' : 'default'}>
                {formatPercent(crypto.change_percent_24hr)}
              </Badge>
              <span className="text-xs text-slate-500">past 24h</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ClientChart
          initialData={history.data}
          cryptoId={id}
          initialDays={DEFAULT_HISTORY_DAYS}
        />
      </Card>

      {/* Stats grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-6">
        <StatCard label="Market Cap" value={formatMarketCap(crypto.market_cap_usd)} />
        <StatCard label="Volume 24h" value={formatVolume(crypto.volume_usd_24hr)} />
        <StatCard label="VWAP 24h" value={formatPrice(crypto.vwap_24hr)} />
        <StatCard label="Supply" value={formatSupply(crypto.supply)} />
        <StatCard label="Max Supply" value={crypto.max_supply ? formatSupply(crypto.max_supply) : 'Unlimited'} />
      </div>
    </div>
  )
}
