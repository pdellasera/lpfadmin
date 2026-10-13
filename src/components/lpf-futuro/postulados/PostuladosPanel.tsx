import { useMemo, useState } from 'react'
import { TablePagination } from '@/components/ui/TablePagination'
import type { LpfFuturoKpi, LpfPostuladosFilterOptions, LpfPostuladosFilters, LpfPostulante } from '@/types'
import { PostuladosDetailCard } from './PostuladosDetailCard'
import { PostuladosFilterBar } from './PostuladosFilterBar'
import { PostuladosKpiRow } from './PostuladosKpiRow'
import { PostuladosTableCard } from './PostuladosTableCard'

const EMPTY_FILTERS: LpfPostuladosFilters = {
  search: '',
  vacante: 'todas',
  universidad: 'todas',
  club: 'todos',
  estado: 'todos',
}

interface PostuladosPanelProps {
  postulados: LpfPostulante[]
  kpis: LpfFuturoKpi[]
  options: LpfPostuladosFilterOptions
}

export function PostuladosPanel({ postulados, kpis, options }: PostuladosPanelProps) {
  const [selectedId, setSelectedId] = useState('')
  const [filters, setFilters] = useState<LpfPostuladosFilters>(EMPTY_FILTERS)
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const filtered = useMemo(() => {
    return postulados.filter((postulante) => {
      if (filters.vacante !== 'todas' && postulante.vacante !== filters.vacante) return false
      if (filters.universidad !== 'todas' && postulante.university.id !== filters.universidad) return false
      if (filters.club !== 'todos' && postulante.club.id !== filters.club) return false
      if (filters.estado !== 'todos' && postulante.state !== filters.estado) return false
      if (filters.search) {
        const haystack =
          `${postulante.name} ${postulante.email} ${postulante.vacante} ${postulante.university.name} ${postulante.club.name}`.toLowerCase()
        if (!haystack.includes(filters.search.toLowerCase())) return false
      }
      return true
    })
  }, [postulados, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageItems = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const selected = filtered.find((postulante) => postulante.id === selectedId)

  const handleFiltersChange = (next: LpfPostuladosFilters) => {
    setFilters(next)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  const handleToggle = (id: string) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleToggleAll = () => {
    const pageIds = pageItems.map((postulante) => postulante.id)
    const allChecked = pageIds.every((id) => checkedIds.includes(id))
    setCheckedIds((prev) => {
      const withoutPage = prev.filter((id) => !pageIds.includes(id))
      return allChecked ? withoutPage : [...withoutPage, ...pageIds]
    })
  }

  return (
    <div className="space-y-3">
      <PostuladosKpiRow kpis={kpis} />
      <PostuladosFilterBar
        options={options}
        applied={filters}
        onChange={handleFiltersChange}
        onClear={() => handleFiltersChange(EMPTY_FILTERS)}
      />

      <div
        className={
          selected
            ? 'grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
            : 'grid items-start gap-3'
        }
      >
        <div className="space-y-3">
          <PostuladosTableCard
            postulantes={pageItems}
            total={filtered.length}
            selectedId={selected?.id ?? ''}
            checkedIds={checkedIds}
            onSelect={setSelectedId}
            onToggle={handleToggle}
            onToggleAll={handleToggleAll}
            onClearSelection={() => setCheckedIds([])}
          />
          {pageItems.length > 0 && (
            <TablePagination
              page={currentPage}
              perPage={perPage}
              total={filtered.length}
              itemLabel="postulados"
              onPageChange={setPage}
              onPerPageChange={handlePerPageChange}
            />
          )}
        </div>
        {selected && <PostuladosDetailCard key={selected.id} postulante={selected} />}
      </div>
    </div>
  )
}
