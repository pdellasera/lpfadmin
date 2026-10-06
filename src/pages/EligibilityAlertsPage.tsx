import { useMemo, useState } from 'react'
import { EligibilityAlertList } from '@/components/eligibility/EligibilityAlertList'
import { EligibilityHero } from '@/components/eligibility/EligibilityHero'
import { EligibilityKpiRow } from '@/components/eligibility/EligibilityKpiRow'
import { EligibilityResolvedCard } from '@/components/eligibility/EligibilityResolvedCard'
import { EligibilityRulesCard } from '@/components/eligibility/EligibilityRulesCard'
import { EligibilityToolbar } from '@/components/eligibility/EligibilityToolbar'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { TablePagination } from '@/components/ui/TablePagination'
import { useEligibilityAlerts, useEligibilityFilters } from '@/hooks/useEligibilityQueries'
import { ELIGIBILITY_RULE_LABEL, ELIGIBILITY_SEVERITY_ORDER } from '@/lib/eligibility'
import type { EligibilityCounts, EligibilityFilters, EligibilitySeverityTabId } from '@/types'

const EMPTY_FILTERS: EligibilityFilters = { rule: 'todas', club: 'todos', status: 'todos', search: '' }

const FALLBACK_COUNTS: EligibilityCounts = {
  total: 0,
  activas: 0,
  criticas: 0,
  advertencias: 0,
  informativas: 0,
  porVencer: 0,
  resueltas: 0,
}

function LoadingSkeletons() {
  return (
    <div className="space-y-3 lg:space-y-4">
      <Skeleton className="h-[158px] w-full rounded-card" />
      <Skeleton className="h-[92px] w-full rounded-card" />
      <Skeleton className="h-[70px] w-full rounded-card" />
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <Skeleton className="h-[420px] rounded-card" />
        <Skeleton className="h-[420px] rounded-card" />
      </div>
    </div>
  )
}

export default function EligibilityAlertsPage() {
  const [tab, setTab] = useState<EligibilitySeverityTabId>('todas')
  const [applied, setApplied] = useState<EligibilityFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)

  const { data: alerts, isLoading, isError, refetch } = useEligibilityAlerts()
  const { data: options, isLoading: optionsLoading } = useEligibilityFilters()

  const counts = useMemo<EligibilityCounts>(() => {
    if (!alerts) return FALLBACK_COUNTS
    return {
      total: alerts.length,
      activas: alerts.filter((alert) => alert.status === 'activa').length,
      criticas: alerts.filter((alert) => alert.severity === 'critica').length,
      advertencias: alerts.filter((alert) => alert.severity === 'advertencia').length,
      informativas: alerts.filter((alert) => alert.severity === 'info').length,
      porVencer: alerts.filter((alert) => alert.status === 'activa' && alert.deadline).length,
      resueltas: alerts.filter((alert) => alert.status === 'resuelta').length,
    }
  }, [alerts])

  const filtered = useMemo(() => {
    if (!alerts) return []
    const result = alerts.filter((alert) => {
      if (tab !== 'todas' && alert.severity !== tab) return false
      if (applied.rule !== 'todas' && alert.rule !== applied.rule) return false
      if (applied.club !== 'todos' && alert.club.id !== applied.club) return false
      if (applied.status !== 'todos' && alert.status !== applied.status) return false
      if (applied.search) {
        const haystack =
          `${alert.headline} ${alert.explanation} ${alert.subjectName} ${alert.club.name} ${alert.code} ${ELIGIBILITY_RULE_LABEL[alert.rule]}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
    return result.sort(
      (a, b) =>
        ELIGIBILITY_SEVERITY_ORDER[a.severity] - ELIGIBILITY_SEVERITY_ORDER[b.severity] ||
        b.detectedAt.localeCompare(a.detectedAt),
    )
  }, [alerts, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: EligibilitySeverityTabId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: EligibilityFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  if (isError) {
    return <ErrorState message="No se pudieron cargar las alertas de elegibilidad." onRetry={() => refetch()} />
  }

  if (isLoading || !alerts) {
    return <LoadingSkeletons />
  }

  return (
    <div className="space-y-3 lg:space-y-4">
      <EligibilityHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      <EligibilityKpiRow counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <EligibilityToolbar
          options={options}
          applied={applied}
          criticas={counts.criticas}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <EligibilityAlertList alerts={pageRows} isLoading={false} total={filtered.length} />
        <div className="space-y-3 lg:space-y-4">
          <EligibilityRulesCard alerts={alerts} />
          <EligibilityResolvedCard alerts={alerts} />
        </div>
      </div>

      {filtered.length > 0 && (
        <TablePagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          itemLabel="alertas"
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  )
}
