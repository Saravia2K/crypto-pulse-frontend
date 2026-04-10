import { Skeleton } from '@/components/ui/Skeleton'

export default function CryptoDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-6 h-4 w-32" />
      <div className="mb-8 flex items-start gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div>
          <Skeleton className="h-7 w-40 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="mb-6 rounded-xl border border-white/8 bg-[#1a1a2e] p-4">
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
