import { ReportsCatalog } from '@/components/reports/ReportsCatalog'
import { ReportsHero } from '@/components/reports/ReportsHero'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useReports } from '@/hooks/useReportsQueries'

function ReportsSkeleton() {
  return (
    <div className="space-y-7">
      {Array.from({ length: 4 }).map((_, groupIndex) => (
        <div key={groupIndex}>
          <Skeleton className="mb-3 h-4 w-48" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: groupIndex === 1 ? 4 : 3 }).map((__, cardIndex) => (
              <Skeleton key={cardIndex} className="h-[132px] rounded-card" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  const { data, isLoading, isError, refetch } = useReports()

  return (
    <div className="space-y-3 lg:space-y-4">
      <ReportsHero />

      {isError ? (
        <ErrorState message="No se pudieron cargar los reportes." onRetry={() => refetch()} />
      ) : isLoading || !data ? (
        <ReportsSkeleton />
      ) : (
        <ReportsCatalog catalog={data} />
      )}
    </div>
  )
}