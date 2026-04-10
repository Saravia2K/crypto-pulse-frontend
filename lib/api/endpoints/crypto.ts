import { apiFetch } from '@/lib/api/client'
import type {
  CryptoDetailResponse,
  HistoryResponse,
  SearchResponse,
  TopCryptosResponse,
} from '@/types/crypto'
import type { HealthResponse } from '@/types/api'

export function fetchTopCryptos(
  limit = 10,
  offset = 0,
): Promise<TopCryptosResponse> {
  return apiFetch<TopCryptosResponse>(
    `/api/crypto/top/${limit}?offset=${offset}`,
  )
}

export function fetchCryptoDetail(id: string): Promise<CryptoDetailResponse> {
  return apiFetch<CryptoDetailResponse>(`/api/crypto/${id}`)
}

export function fetchCryptoHistory(
  id: string,
  days = 7,
): Promise<HistoryResponse> {
  return apiFetch<HistoryResponse>(`/api/crypto/${id}/history?days=${days}`)
}

export function searchCryptos(query: string): Promise<SearchResponse> {
  return apiFetch<SearchResponse>(
    `/api/crypto/search?q=${encodeURIComponent(query)}`,
  )
}

export function fetchHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>('/health')
}
