import { useState } from 'react'
import { DistributionCard } from '@/components/transparency/DistributionCard'
import { DetailTableCard } from '@/components/transparency/DetailTableCard'
import { FileListCard } from '@/components/transparency/FileListCard'
import { FinanceEvolutionCard } from '@/components/transparency/FinanceEvolutionCard'
import { IndicatorsCard } from '@/components/transparency/IndicatorsCard'
import { KpiRow } from '@/components/transparency/KpiRow'
import { SapIntegrationCard } from '@/components/transparency/SapIntegrationCard'
import { TransparencyHero } from '@/components/transparency/TransparencyHero'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useTransparency } from '@/hooks/useTransparencyQueries'
import { useSeason } from '@/providers/SeasonContext'
import type { TransparencyKpi, TransparencyKpiId, TransparencySummary, TransparencyTabId } from '@/types'

function kpisFor(tab: TransparencyTabId, data: TransparencySummary): TransparencyKpi[] {
  const byId = Object.fromEntries(data.kpis.map((kpi) => [kpi.id, kpi])) as Record<
    TransparencyKpiId,
    TransparencyKpi
  >

  if (tab === 'ingresos') {
    const promedio = data.indicators.find((indicator) => indicator.id === 'ingresos-promedio')
    return [
      byId.ingresos,
      byId.resultado,
      promedio
        ? {
            id: 'ingresos-promedio',
            label: 'Ingresos promedio por partido',
            value: promedio.value,
            format: 'money',
            tone: 'brand',
            delta: { direction: 'up', tone: 'emerald', label: '12%', caption: 'vs. 2025' },
          }
        : byId.clubes,
      byId.clubes,
    ]
  }

  if (tab === 'pagos') {
    const matchday = data.paymentDetails.find((row) => row.id === 'matchday')
    return [
      byId.pagos,
      byId.resultado,
      matchday
        ? {
            id: 'gastos-matchday',
            label: 'Gastos de match day',
            value: matchday.amount,
            format: 'money',
            tone: 'brand',
            delta: { direction: 'up', tone: 'rose', label: '5%', caption: 'vs. 2025' },
          }
        : byId.clubes,
      byId.clubes,
    ]
  }

  return data.kpis
}

function LoadingSkeletons() {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[112px] rounded-card" />
        ))}
      </div>
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-3">
        <Skeleton className="h-[252px] rounded-card" />
        <Skeleton className="h-[252px] rounded-card" />
        <Skeleton className="h-[252px] rounded-card" />
      </div>
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-3">
        <Skeleton className="h-[300px] rounded-card" />
        <Skeleton className="h-[300px] rounded-card" />
        <Skeleton className="h-[300px] rounded-card" />
      </div>
    </>
  )
}

function TabContent({ tab, data }: { tab: TransparencyTabId; data: TransparencySummary }) {
  if (tab === 'ingresos') {
    return (
      <>
        <KpiRow kpis={kpisFor(tab, data)} />
        <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <FinanceEvolutionCard data={data.monthly} series="ingresos" title="Evolución de ingresos" />
          <DistributionCard
            title="Distribución de ingresos 2026"
            tone="income"
            total={data.incomeTotal}
            centerLabel="ingresos"
            items={data.incomeDistribution}
          />
        </div>
        <DetailTableCard
          title="Detalle de ingresos 2026"
          rows={data.incomeDetails}
          total={data.incomeTotal}
          totalLabel="Total ingresos"
        />
      </>
    )
  }

  if (tab === 'pagos') {
    return (
      <>
        <KpiRow kpis={kpisFor(tab, data)} />
        <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <FinanceEvolutionCard data={data.monthly} series="pagos" title="Evolución de pagos" />
          <DistributionCard
            title="Distribución de pagos 2026"
            tone="payment"
            total={data.paymentTotal}
            centerLabel="pagos"
            items={data.paymentDistribution}
          />
        </div>
        <DetailTableCard
          title="Detalle de pagos 2026"
          rows={data.paymentDetails}
          total={data.paymentTotal}
          totalLabel="Total pagos"
        />
      </>
    )
  }

  if (tab === 'informes') {
    return <FileListCard title="Informes recientes" variant="label" items={data.reports} />
  }

  if (tab === 'integracion-sap') {
    return <SapIntegrationCard sap={data.sap} />
  }

  if (tab === 'documentos') {
    return <FileListCard title="Documentos institucionales" variant="icon" items={data.documents} />
  }

  if (tab === 'indicadores') {
    return <IndicatorsCard indicators={data.indicators} />
  }

  return (
    <>
      <KpiRow kpis={data.kpis} />

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
        <FinanceEvolutionCard data={data.monthly} />
        <DistributionCard
          title="Distribución de ingresos 2026"
          tone="income"
          total={data.incomeTotal}
          centerLabel="ingresos"
          items={data.incomeDistribution}
        />
        <DistributionCard
          title="Distribución de pagos 2026"
          tone="payment"
          total={data.paymentTotal}
          centerLabel="pagos"
          items={data.paymentDistribution}
        />
      </div>

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)_minmax(0,1.15fr)]">
        <DetailTableCard
          title="Detalle de ingresos 2026"
          rows={data.incomeDetails}
          total={data.incomeTotal}
          totalLabel="Total ingresos"
        />
        <DetailTableCard
          title="Detalle de pagos 2026"
          rows={data.paymentDetails}
          total={data.paymentTotal}
          totalLabel="Total pagos"
        />
        <SapIntegrationCard sap={data.sap} />
      </div>

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)_minmax(0,1.15fr)]">
        <FileListCard title="Informes recientes" variant="label" items={data.reports} />
        <FileListCard title="Documentos institucionales" variant="icon" items={data.documents} />
        <IndicatorsCard indicators={data.indicators} compact />
      </div>
    </>
  )
}

export default function TransparencyPage() {
  const { season } = useSeason()
  const [period, setPeriod] = useState(season)
  const [tab, setTab] = useState<TransparencyTabId>('resumen')

  const { data, isLoading, isError, refetch } = useTransparency(period)

  return (
    <div className="space-y-3 lg:space-y-4">
      <TransparencyHero period={period} onPeriodChange={setPeriod} tab={tab} onTabChange={setTab} />

      {isError ? (
        <ErrorState message="No se pudieron cargar los datos de Transparencia." onRetry={() => refetch()} />
      ) : isLoading || !data ? (
        <LoadingSkeletons />
      ) : (
        <TabContent tab={tab} data={data} />
      )}
    </div>
  )
}
