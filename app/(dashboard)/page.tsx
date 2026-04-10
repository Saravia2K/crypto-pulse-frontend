import type { Metadata } from 'next'
import { fetchTopCryptos } from '@/lib/api/endpoints/crypto'
import { CryptoGrid } from '@/components/crypto/CryptoGrid'
import { DEFAULT_TOP_LIMIT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const { data: cryptos } = await fetchTopCryptos(DEFAULT_TOP_LIMIT)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Market Overview</h1>
          <p className="mt-1 text-sm text-slate-400">
            Top {DEFAULT_TOP_LIMIT} cryptocurrencies by market cap
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live data
        </div>
      </div>

      <CryptoGrid cryptos={cryptos} />
    </div>
  )
}
