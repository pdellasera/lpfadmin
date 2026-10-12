import { Skeleton } from '@/components/ui/Skeleton'

export function LpfFuturoSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-[104px] rounded-card" />
        ))}
      </div>
      <Skeleton className="h-[70px] w-full rounded-card" />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Skeleton className="h-[400px] rounded-card" />
        <div className="grid gap-3">
          <Skeleton className="h-[180px] rounded-card" />
          <Skeleton className="h-[180px] rounded-card" />
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Skeleton className="h-[220px] rounded-card" />
        <Skeleton className="h-[220px] rounded-card" />
        <Skeleton className="h-[220px] rounded-card" />
      </div>
    </div>
  )
}
