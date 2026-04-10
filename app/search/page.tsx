import type { Metadata } from 'next'
import { Suspense } from 'react'
import { searchCryptos } from '@/lib/api/endpoints/crypto'
import { SearchBar } from '@/components/crypto/SearchBar'
import { formatMarketCap, formatPrice, formatPercent, getChangeDirection } from '@/lib/utils/formatters'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Search',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

function SearchResultRow({
  id,
  rank,
  symbol,
  name,
  price_usd,
  change_percent_24hr,
  market_cap_usd,
}: {
  id: string
  rank: string
  symbol: string
  name: string
  price_usd?: string | null
  change_percent_24hr?: string | null
  market_cap_usd?: string | null
}) {
  const direction = getChangeDirection(change_percent_24hr)
  return (
    <Link
      href={`/crypto/${id}`}
      className="flex items-center justify-between rounded-xl border border-white/8 bg-[#1a1a2e] px-4 py-3 transition-all hover:border-indigo-500/40 hover:bg-[#1e1e38]"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-7 shrink-0 text-xs text-slate-500 text-right">
          #{rank}
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-300">
          {symbol.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white truncate">{name}</p>
          <p className="text-xs text-slate-500 uppercase">{symbol}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0 ml-4">
        <div className="hidden sm:block text-right">
          <p className="text-xs text-slate-500">Market Cap</p>
          <p className="text-xs font-medium text-slate-300">
            {formatMarketCap(market_cap_usd)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            {formatPrice(price_usd)}
          </p>
          {change_percent_24hr && (
            <Badge
              variant={
                direction === 'up'
                  ? 'success'
                  : direction === 'down'
                    ? 'danger'
                    : 'default'
              }
              className="text-[10px]"
            >
              {formatPercent(change_percent_24hr)}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  const results =
    query.length >= 2 ? await searchCryptos(query) : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Search</h1>

      <Suspense>
        <SearchBar />
      </Suspense>

      <div className="mt-6">
        {!query && (
          <p className="py-12 text-center text-sm text-slate-500">
            Type at least 2 characters to search
          </p>
        )}

        {query && query.length < 2 && (
          <p className="py-12 text-center text-sm text-slate-500">
            Keep typing…
          </p>
        )}

        {results && results.count === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {results && results.count > 0 && (
          <>
            <p className="mb-3 text-xs text-slate-500">
              {results.count} result{results.count !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="flex flex-col gap-2">
              {results.data.map((crypto) => (
                <SearchResultRow
                  key={crypto.id}
                  id={crypto.id}
                  rank={crypto.rank}
                  symbol={crypto.symbol}
                  name={crypto.name}
                  price_usd={crypto.price_usd}
                  market_cap_usd={crypto.market_cap_usd}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
