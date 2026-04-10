'use client'

import { useState } from 'react'
import { PriceChart } from '@/components/crypto/PriceChart'
import type { HistoryPoint } from '@/types/crypto'

interface ClientChartProps {
  initialData: HistoryPoint[]
  cryptoId: string
  initialDays: number
}

const DAY_OPTIONS = [7, 14, 30] as const

export function ClientChart({ initialData, cryptoId, initialDays }: ClientChartProps) {
  const [days, setDays] = useState(initialDays)
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  async function handleDaysChange(d: number) {
    if (d === days) return
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/crypto/${cryptoId}/history?days=${d}`,
      )
      if (res.ok) {
        const json = await res.json()
        setData(json.data)
        setDays(d)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {DAY_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => handleDaysChange(d)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              days === d
                ? 'bg-indigo-600 text-white'
                : 'bg-white/8 text-slate-400 hover:bg-white/12 hover:text-slate-200'
            }`}
          >
            {d}d
          </button>
        ))}
      </div>
      <div className={loading ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        <PriceChart data={data} days={days} />
      </div>
    </div>
  )
}
