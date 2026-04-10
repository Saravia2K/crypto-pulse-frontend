export interface ApiError {
  detail: string
  status: number
}

export interface RateLimitStatus {
  limit: number
  period_seconds: number
  requests_remaining?: number | null
  reset_at?: number | null
}

export interface HealthDependency {
  status: string
  detail?: string | null
}

export interface HealthResponse {
  status: string
  redis: HealthDependency
  coincap_api: HealthDependency
  timestamp: number
}
