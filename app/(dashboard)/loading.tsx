import { CryptoCardSkeleton } from '@/components/ui/Skeleton'
import { DEFAULT_TOP_LIMIT } from '@/lib/constants'

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <div className="h-7 w-48 animate-pulse rounded-md bg-white/8" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-white/6" />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: DEFAULT_TOP_LIMIT }).map((_, i) => (
          <CryptoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
