'use client'

import { useMemo } from 'react'
import type { HistoryPoint } from '@/types/crypto'
import { formatPrice } from '@/lib/utils/formatters'

interface PriceChartProps {
  data: HistoryPoint[]
  days: number
}

const WIDTH = 800
const HEIGHT = 200
const PADDING = { top: 10, right: 60, bottom: 30, left: 10 }

function buildPath(
  points: { x: number; y: number }[],
  close = false,
  height = HEIGHT,
): string {
  if (points.length === 0) return ''
  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)},${p.y.toFixed(1)}`
    const prev = points[i - 1]
    const cpx = ((prev.x + p.x) / 2).toFixed(1)
    return `${acc} C ${cpx},${prev.y.toFixed(1)} ${cpx},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }, '')
  if (!close) return path
  const last = points[points.length - 1]
  const first = points[0]
  return `${path} L ${last.x.toFixed(1)},${(height - PADDING.bottom).toFixed(1)} L ${first.x.toFixed(1)},${(height - PADDING.bottom).toFixed(1)} Z`
}

export function PriceChart({ data, days }: PriceChartProps) {
  const { points, minPrice, maxPrice, currentPrice, startPrice, dateLabels } =
    useMemo(() => {
      if (data.length < 2)
        return {
          points: [],
          minPrice: 0,
          maxPrice: 0,
          currentPrice: 0,
          startPrice: 0,
          dateLabels: [],
        }

      const prices = data.map((d) => parseFloat(d.price_usd))
      const min = Math.min(...prices)
      const max = Math.max(...prices)
      const range = max - min || 1

      const plotW = WIDTH - PADDING.left - PADDING.right
      const plotH = HEIGHT - PADDING.top - PADDING.bottom

      const pts = data.map((d, i) => ({
        x: PADDING.left + (i / (data.length - 1)) * plotW,
        y:
          PADDING.top +
          plotH -
          ((parseFloat(d.price_usd) - min) / range) * plotH,
      }))

      // Date labels: start, middle, end
      const labelIndices = [0, Math.floor(data.length / 2), data.length - 1]
      const labels = labelIndices.map((idx) => ({
        x: pts[idx].x,
        label: new Date(data[idx].time).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      }))

      return {
        points: pts,
        minPrice: min,
        maxPrice: max,
        currentPrice: prices[prices.length - 1],
        startPrice: prices[0],
        dateLabels: labels,
      }
    }, [data])

  if (points.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-slate-500 text-sm">
        No chart data available
      </div>
    )
  }

  const isPositive = currentPrice >= startPrice
  const lineColor = isPositive ? '#10b981' : '#ef4444'
  const gradientStart = isPositive ? '#10b98130' : '#ef444430'
  const gradientId = `chart-gradient-${days}`

  const linePath = buildPath(points)
  const areaPath = buildPath(points, true, HEIGHT)

  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: '200px' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PADDING.top + t * (HEIGHT - PADDING.top - PADDING.bottom)
          return (
            <line
              key={t}
              x1={PADDING.left}
              y1={y}
              x2={WIDTH - PADDING.right}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          )
        })}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Start point */}
        <circle
          cx={firstPoint.x}
          cy={firstPoint.y}
          r="3"
          fill={lineColor}
          opacity="0.6"
        />

        {/* End point (current price indicator) */}
        <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={lineColor} />
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="8"
          fill={lineColor}
          opacity="0.2"
        />

        {/* Price labels on right axis */}
        <text
          x={WIDTH - PADDING.right + 6}
          y={PADDING.top + 4}
          fill="#94a3b8"
          fontSize="9"
          dominantBaseline="hanging"
        >
          {formatPrice(String(maxPrice))}
        </text>
        <text
          x={WIDTH - PADDING.right + 6}
          y={HEIGHT - PADDING.bottom}
          fill="#94a3b8"
          fontSize="9"
          dominantBaseline="auto"
        >
          {formatPrice(String(minPrice))}
        </text>

        {/* Date labels on bottom */}
        {dateLabels.map(({ x, label }, i) => (
          <text
            key={i}
            x={x}
            y={HEIGHT - 4}
            fill="#64748b"
            fontSize="9"
            textAnchor={i === 0 ? 'start' : i === dateLabels.length - 1 ? 'end' : 'middle'}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  )
}
