import { useState } from 'react'
import { ApiCodeSampleCard } from '@/components/public-api/ApiCodeSampleCard'
import { ApiEndpointsCard } from '@/components/public-api/ApiEndpointsCard'
import { ApiKeysCard } from '@/components/public-api/ApiKeysCard'
import { ApiMetricsRow } from '@/components/public-api/ApiMetricsRow'
import { ApiRatePlansCard } from '@/components/public-api/ApiRatePlansCard'
import { ApiResourcesCard } from '@/components/public-api/ApiResourcesCard'
import { ApiUsageChartCard } from '@/components/public-api/ApiUsageChartCard'
import { ApiWebhooksCard } from '@/components/public-api/ApiWebhooksCard'
import { PublicApiHero } from '@/components/public-api/PublicApiHero'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { usePublicApi } from '@/hooks/usePublicApiQuery'
import type { ApiEnvironment } from '@/types'

function ApiSkeleton() {
  return (
    <div className="space-y-3 lg:space-y-4">
      <Skeleton className="h-[140px] w-full rounded-card" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[112px] rounded-card" />
        ))}
      </div>
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Skeleton className="h-[420px] rounded-card" />
        <Skeleton className="h-[420px] rounded-card" />
      </div>
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-2">
        <Skeleton className="h-[300px] rounded-card" />
        <Skeleton className="h-[300px] rounded-card" />
      </div>
    </div>
  )
}

export default function PublicApiPage() {
  const { data, isLoading, isError, refetch } = usePublicApi()
  const [environment, setEnvironment] = useState<ApiEnvironment>('produccion')

  if (isError) {
    return <ErrorState message="No se pudieron cargar los datos de la API pública." onRetry={() => refetch()} />
  }

  if (isLoading || !data) {
    return <ApiSkeleton />
  }

  return (
    <div className="space-y-3 lg:space-y-4">
      <PublicApiHero
        environment={environment}
        onEnvironmentChange={setEnvironment}
        status={data.status}
        version={data.version}
        baseUrl={data.baseUrl}
      />

      <ApiMetricsRow metrics={data.metrics} />

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ApiEndpointsCard groups={data.endpointGroups} />
        <div className="grid gap-3 lg:gap-4">
          <ApiRatePlansCard plans={data.ratePlans} />
          <ApiResourcesCard resources={data.resources} />
        </div>
      </div>

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-2">
        <ApiCodeSampleCard samples={data.codeSamples} />
        <ApiKeysCard keys={data.keys} />
      </div>

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ApiUsageChartCard usage={data.usage} />
        <ApiWebhooksCard webhooks={data.webhooks} />
      </div>
    </div>
  )
}
