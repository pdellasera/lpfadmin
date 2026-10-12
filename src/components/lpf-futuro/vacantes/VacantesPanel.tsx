import { useMemo, useRef, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { TablePagination } from '@/components/ui/TablePagination'
import { cn } from '@/lib/cn'
import type { LpfVacante, LpfVacanteFilterOptions, LpfVacanteFilters } from '@/types'
import { VacanteDetailCard } from './VacanteDetailCard'
import { VacanteFilterBar } from './VacanteFilterBar'
import { VacanteListCard, type VacanteSort } from './VacanteListCard'

const EMPTY_FILTERS: LpfVacanteFilters = {
  search: '',
  area: 'todas',
  club: 'todos',
  modalidad: 'todas',
  tipo: 'todos',
}

interface VacantesPanelProps {
  vacantes: LpfVacante[]
  total: number
  options: LpfVacanteFilterOptions
}

export function VacantesPanel({ vacantes, total, options }: VacantesPanelProps) {
  const [selectedId, setSelectedId] = useState<string>('')
  const [filters, setFilters] = useState<LpfVacanteFilters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<VacanteSort>('recientes')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [toastOpen, setToastOpen] = useState(false)
  const [applicantIncrements, setApplicantIncrements] = useState<Record<string, number>>({})
  const toastTimer = useRef<number | null>(null)

  const enriched = useMemo(
    () =>
      vacantes.map((vacante) => ({
        ...vacante,
        applicants: (vacante.applicants ?? 0) + (applicantIncrements[vacante.id] ?? 0),
      })),
    [vacantes, applicantIncrements],
  )

  const hasActiveFilters =
    filters.search !== '' ||
    filters.area !== 'todas' ||
    filters.club !== 'todos' ||
    filters.modalidad !== 'todas' ||
    filters.tipo !== 'todos'

  const filtered = useMemo(() => {
    return enriched.filter((vacante) => {
      if (filters.area !== 'todas' && vacante.area !== filters.area) return false
      if (filters.club !== 'todos' && vacante.club.id !== filters.club) return false
      if (filters.modalidad !== 'todas' && vacante.modality !== filters.modalidad) return false
      if (filters.tipo !== 'todos' && vacante.type !== filters.tipo) return false
      if (filters.search) {
        const haystack =
          `${vacante.role} ${vacante.club.name} ${vacante.area} ${vacante.university?.name ?? ''}`.toLowerCase()
        if (!haystack.includes(filters.search.toLowerCase())) return false
      }
      return true
    })
  }, [enriched, filters])

  const sorted = useMemo(() => {
    const list = [...filtered]
    if (sort === 'recientes') list.sort((a, b) => (a.postedDaysAgo ?? 0) - (b.postedDaysAgo ?? 0))
    if (sort === 'antiguas') list.sort((a, b) => (b.postedDaysAgo ?? 0) - (a.postedDaysAgo ?? 0))
    if (sort === 'postulaciones') list.sort((a, b) => (b.applicants ?? 0) - (a.applicants ?? 0))
    return list
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageItems = useMemo(
    () => sorted.slice((currentPage - 1) * perPage, currentPage * perPage),
    [sorted, currentPage, perPage],
  )

  const selected = sorted.find((vacante) => vacante.id === selectedId)
  const similares = sorted.filter((vacante) => vacante.id !== selected?.id).slice(0, 3)
  const count = hasActiveFilters ? sorted.length : total

  const handleFiltersChange = (next: LpfVacanteFilters) => {
    setFilters(next)
    setPage(1)
  }

  const handleSortChange = (next: VacanteSort) => {
    setSort(next)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  const handleApply = () => {
    if (!selected) return
    setApplicantIncrements((prev) => ({
      ...prev,
      [selected.id]: (prev[selected.id] ?? 0) + 1,
    }))
    setSelectedId('')
    setToastOpen(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastOpen(false), 3200)
  }

  return (
    <div className="space-y-3">
      <VacanteFilterBar
        options={options}
        applied={filters}
        onChange={handleFiltersChange}
        onClear={() => handleFiltersChange(EMPTY_FILTERS)}
      />

      <div
        className={cn(
          'grid items-start gap-3',
          selected && 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]',
        )}
      >
        <div className="space-y-3">
          <VacanteListCard
            vacantes={pageItems}
            count={count}
            selectedId={selected?.id ?? ''}
            sort={sort}
            onSortChange={handleSortChange}
            onSelect={setSelectedId}
          />
          {pageItems.length > 0 && (
            <TablePagination
              page={currentPage}
              perPage={perPage}
              total={sorted.length}
              itemLabel="vacantes"
              onPageChange={setPage}
              onPerPageChange={handlePerPageChange}
            />
          )}
        </div>
        {selected && (
          <VacanteDetailCard
            vacante={selected}
            similares={similares}
            onSelect={setSelectedId}
            onApply={handleApply}
          />
        )}
      </div>

      {toastOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 shadow-card backdrop-blur">
          <FaCircleCheck className="mt-0.5 text-base text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Postulación enviada</p>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-300/80">
              Tu postulación se registró con éxito.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
