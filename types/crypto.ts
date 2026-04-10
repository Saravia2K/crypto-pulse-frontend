export interface CryptoAsset {
  id: string
  rank: string
  symbol: string
  name: string
  supply?: string | null
  max_supply?: string | null
  market_cap_usd?: string | null
  volume_usd_24hr?: string | null
  price_usd?: string | null
  change_percent_24hr?: string | null
  vwap_24hr?: string | null
  explorer?: string | null
}

export interface TopCryptosResponse {
  data: CryptoAsset[]
  timestamp: number
  limit: number
  offset: number
}

export interface CryptoDetailResponse {
  data: CryptoAsset
  timestamp: number
}

export interface HistoryPoint {
  price_usd: string
  time: number
  date: string
}

export interface HistoryResponse {
  data: HistoryPoint[]
  id: string
  days: number
}

export interface SearchResult {
  id: string
  rank: string
  symbol: string
  name: string
  price_usd?: string | null
  market_cap_usd?: string | null
}

export interface SearchResponse {
  data: SearchResult[]
  query: string
  count: number
}
