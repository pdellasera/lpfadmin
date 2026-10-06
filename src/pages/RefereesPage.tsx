import { useMemo, useState } from 'react'
import { RefereesHero } from '@/components/referees/RefereesHero'
import { RefereesTable } from '@/components/referees/RefereesTable'
import { RefereesToolbar } from '@/components/referees/RefereesToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { TablePagination } from '@/components/ui/TablePagination'
import { useReferees, useRefereeFilters } from '@/hooks/useRefereesQueries'
import { REFEREE_ROLE_GROUP, REFEREE_ROLE_LABEL } from '@/lib/referees'
import type { RefereeFilters, RefereeRoleCounts, RefereeRoleGroupId } from '@/types'

const EMPTY_FILTERS: RefereeFilters = { role: 'todos', category: 'todos', status: 'todos', search: '' }

const FALLBACK_COUNTS: RefereeRoleCounts = { total: 56, centrales: 16, asistentes: 22, var: 10, comisarios: 8 }

export default function RefereesPage() {
  const [tab, setTab] = useState<RefereeRoleGroupId>('todos')
  const [applied, setApplied] = useState<RefereeFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data: referees, isLoading } = useReferees()
  const { data: options, isLoading: optionsLoading } = useRefereeFilters()

  const counts = useMemo<RefereeRoleCounts>(() => {
    if (!referees) return FALLBACK_COUNTS
    return {
      total: referees.length,
      centrales: referees.filter((referee) => REFEREE_ROLE_GROUP[referee.role] === 'centrales').length,
      asistentes: referees.filter((referee) => REFEREE_ROLE_GROUP[referee.role] === 'asistentes').length,
      var: referees.filter((referee) => REFEREE_ROLE_GROUP[referee.role] === 'var').length,
      comisarios: referees.filter((referee) => REFEREE_ROLE_GROUP[referee.role] === 'comisarios').length,
    }
  }, [referees])

  const filtered = useMemo(() => {
    if (!referees) return []
    return referees.filter((referee) => {
      if (tab !== 'todos' && REFEREE_ROLE_GROUP[referee.role] !== tab) return false
      if (applied.role !== 'todos' && referee.role !== applied.role) return false
      if (applied.category !== 'todos' && referee.category !== applied.category) return false
      if (applied.status !== 'todos' && referee.status !== applied.status) return false
      if (applied.search) {
        const haystack =
          `${referee.name} ${referee.province} ${referee.nationality} ${REFEREE_ROLE_LABEL[referee.role]}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [referees, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: RefereeRoleGroupId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: RefereeFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="space-y-3">
      <RefereesHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <RefereesToolbar
          options={options}
          applied={applied}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <RefereesTable referees={pageRows} isLoading={isLoading} startIndex={(currentPage - 1) * perPage} />

      {!isLoading && referees && filtered.length > 0 && (
        <TablePagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          itemLabel="árbitros"
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {!isLoading && referees && filtered.length === 0 && (
        <EmptyState
          title="No hay árbitros que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
