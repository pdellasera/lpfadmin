import { useMemo, useState } from 'react'
import { StadiumsHero } from '@/components/stadiums/StadiumsHero'
import { StadiumsTable } from '@/components/stadiums/StadiumsTable'
import { StadiumsToolbar } from '@/components/stadiums/StadiumsToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { TablePagination } from '@/components/ui/TablePagination'
import { useStadiumFilters, useStadiums } from '@/hooks/useStadiumsQueries'
import type { StadiumCounts, StadiumFilters, StadiumRegionId } from '@/types'

const EMPTY_FILTERS: StadiumFilters = { province: 'todos', surface: 'todos', status: 'todos', search: '' }

const FALLBACK_COUNTS: StadiumCounts = { total: 15, capital: 6, occidente: 3, azuero: 3, oriente: 3 }

export default function StadiumsPage() {
  const [tab, setTab] = useState<StadiumRegionId>('todos')
  const [applied, setApplied] = useState<StadiumFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data: stadiums, isLoading } = useStadiums()
  const { data: options, isLoading: optionsLoading } = useStadiumFilters()

  const counts = useMemo<StadiumCounts>(() => {
    if (!stadiums) return FALLBACK_COUNTS
    return {
      total: stadiums.length,
      capital: stadiums.filter((stadium) => stadium.region === 'capital').length,
      occidente: stadiums.filter((stadium) => stadium.region === 'occidente').length,
      azuero: stadiums.filter((stadium) => stadium.region === 'azuero').length,
      oriente: stadiums.filter((stadium) => stadium.region === 'oriente').length,
    }
  }, [stadiums])

  const filtered = useMemo(() => {
    if (!stadiums) return []
    return stadiums.filter((stadium) => {
      if (tab !== 'todos' && stadium.region !== tab) return false
      if (applied.province !== 'todos' && stadium.province !== applied.province) return false
      if (applied.surface !== 'todos' && stadium.surface !== applied.surface) return false
      if (applied.status !== 'todos' && stadium.status !== applied.status) return false
      if (applied.search) {
        const haystack = `${stadium.name} ${stadium.city} ${stadium.province} ${stadium.club?.name ?? ''}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [stadiums, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: StadiumRegionId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: StadiumFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="space-y-3">
      <StadiumsHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <StadiumsToolbar
          options={options}
          applied={applied}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <StadiumsTable stadiums={pageRows} isLoading={isLoading} startIndex={(currentPage - 1) * perPage} />

      {!isLoading && stadiums && filtered.length > 0 && (
        <TablePagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          itemLabel="estadios"
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {!isLoading && stadiums && filtered.length === 0 && (
        <EmptyState
          title="No hay estadios que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
