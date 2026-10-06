import { useMemo, useState } from 'react'
import { SanctionsHero } from '@/components/sanctions/SanctionsHero'
import { SanctionsTable } from '@/components/sanctions/SanctionsTable'
import { SanctionsToolbar } from '@/components/sanctions/SanctionsToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { TablePagination } from '@/components/ui/TablePagination'
import { useSanctionFilters, useSanctions } from '@/hooks/useSanctionsQueries'
import { SANCTION_GROUP, SANCTION_INFRACTION_LABEL } from '@/lib/sanctions'
import type { SanctionFilters, SanctionGroupCounts, SanctionGroupId } from '@/types'

const EMPTY_FILTERS: SanctionFilters = { status: 'todos', club: 'todos', infraction: 'todos', search: '' }

const FALLBACK_COUNTS: SanctionGroupCounts = { total: 48, jugadores: 32, cuerpoTecnico: 8, clubes: 8, pendientes: 7 }

export default function SanctionsPage() {
  const [tab, setTab] = useState<SanctionGroupId>('todas')
  const [applied, setApplied] = useState<SanctionFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data: sanctions, isLoading } = useSanctions()
  const { data: options, isLoading: optionsLoading } = useSanctionFilters()

  const counts = useMemo<SanctionGroupCounts>(() => {
    if (!sanctions) return FALLBACK_COUNTS
    return {
      total: sanctions.length,
      jugadores: sanctions.filter((sanction) => SANCTION_GROUP[sanction.targetType] === 'jugadores').length,
      cuerpoTecnico: sanctions.filter((sanction) => SANCTION_GROUP[sanction.targetType] === 'cuerpo-tecnico').length,
      clubes: sanctions.filter((sanction) => SANCTION_GROUP[sanction.targetType] === 'clubes').length,
      pendientes: sanctions.filter((sanction) => sanction.status === 'pendiente').length,
    }
  }, [sanctions])

  const filtered = useMemo(() => {
    if (!sanctions) return []
    return sanctions.filter((sanction) => {
      if (tab !== 'todas' && SANCTION_GROUP[sanction.targetType] !== tab) return false
      if (applied.status !== 'todos' && sanction.status !== applied.status) return false
      if (applied.club !== 'todos' && sanction.club.id !== applied.club) return false
      if (applied.infraction !== 'todos' && sanction.infraction !== applied.infraction) return false
      if (applied.search) {
        const haystack =
          `${sanction.name} ${sanction.club.name} ${sanction.code} ${SANCTION_INFRACTION_LABEL[sanction.infraction]}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [sanctions, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: SanctionGroupId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: SanctionFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="space-y-3">
      <SanctionsHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <SanctionsToolbar
          options={options}
          applied={applied}
          pendientes={counts.pendientes}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <SanctionsTable sanctions={pageRows} isLoading={isLoading} startIndex={(currentPage - 1) * perPage} />

      {!isLoading && sanctions && filtered.length > 0 && (
        <TablePagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          itemLabel="sanciones"
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {!isLoading && sanctions && filtered.length === 0 && (
        <EmptyState
          title="No hay sanciones que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
