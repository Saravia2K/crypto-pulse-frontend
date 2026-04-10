import type { ChangeDirection } from '@/types/common'

export function formatPrice(value?: string | null): string {
  if (!value) return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'

  if (num >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  if (num >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(num)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 8,
  }).format(num)
}

export function formatMarketCap(value?: string | null): string {
  if (!value) return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'

  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toFixed(2)}`
}

export function formatVolume(value?: string | null): string {
  return formatMarketCap(value)
}

export function formatPercent(value?: string | null): string {
  if (!value) return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`
}

export function getChangeDirection(value?: string | null): ChangeDirection {
  if (!value) return 'neutral'
  const num = parseFloat(value)
  if (isNaN(num)) return 'neutral'
  if (num > 0) return 'up'
  if (num < 0) return 'down'
  return 'neutral'
}

export function formatSupply(value?: string | null): string {
  if (!value) return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toFixed(2)
}
