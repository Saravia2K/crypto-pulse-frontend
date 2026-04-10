'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCryptoStore } from '@/stores/cryptoStore'
import type { CryptoAsset } from '@/types/crypto'
import { CryptoGrid } from '@/components/crypto/CryptoGrid'
import { CryptoCardSkeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { API_BASE_URL } from '@/lib/constants'

export default function FavoritesPage() {
  const favorites = useCryptoStore((s) => s.favorites)
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (favorites.length === 0) {
      setCryptos([])
      return
    }

    setLoading(true)
    Promise.all(
      favorites.map((id) =>
        fetch(`${API_BASE_URL}/api/crypto/${id}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((j) => (j ? j.data : null))
          .catch(() => null),
      ),
    )
      .then((results) => {
        setCryptos(results.filter(Boolean) as CryptoAsset[])
      })
      .finally(() => setLoading(false))
  }, [favorites])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Favorites</h1>
        <p className="mt-1 text-sm text-slate-400">
          {favorites.length === 0
            ? 'No favorites yet'
            : `${favorites.length} saved`}
        </p>
      </div>

      {loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((id) => (
            <CryptoCardSkeleton key={id} />
          ))}
        </div>
      )}

      {!loading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 opacity-40"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <p className="mb-4 text-sm">Add favorites from the dashboard</p>
          <Link href="/">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </div>
      )}

      {!loading && cryptos.length > 0 && <CryptoGrid cryptos={cryptos} />}
    </div>
  )
}
