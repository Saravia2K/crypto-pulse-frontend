import { API_BASE_URL } from '@/lib/constants'

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

export async function apiFetch<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }))
    throw new ApiClientError(res.status, body.detail ?? res.statusText)
  }

  return res.json() as Promise<T>
}
