import { useMemo, useState } from 'react'
import type {
  LpfFuturoKpi,
  LpfPostulante,
  LpfUniversidadesFilterOptions,
  LpfUniversidadesFilters,
  LpfUniversity,
  LpfVacante,
} from '@/types'
import { UniversidadDetailCard } from './UniversidadDetailCard'
import { UniversidadesFilterBar } from './UniversidadesFilterBar'
import { UniversidadesKpiRow } from './UniversidadesKpiRow'
import { UniversidadesListCard, type UniversidadSort } from './UniversidadesListCard'

const EMPTY_FILTERS: LpfUniversidadesFilters = {
  search: '',
  ciudad: 'todas',
  tipo: 'todas',
  estado: 'todas',
}

interface UniversidadesPanelProps {
  universities: LpfUniversity[]
  kpis: LpfFuturoKpi[]
  options: LpfUniversidadesFilterOptions
  vacantes: LpfVacante[]
  postulantes: LpfPostulante[]
}

export function UniversidadesPanel({ universities, kpis, options, vacantes, postulantes }: UniversidadesPanelProps) {
  const [filters, setFilters] = useState<LpfUniversidadesFilters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<UniversidadSort>('recientes')
  const [selectedId, setSelectedId] = useState('')

  const filtered = useMemo(() => {
    const result = universities.filter((university) => {
      if (filters.ciudad !== 'todas' && university.ciudad !== filters.ciudad) return false
      if (filters.tipo !== 'todas' && university.tipo !== filters.tipo) return false
      if (filters.estado !== 'todas' && (university.estado ?? 'activa') !== filters.estado) return false
      if (filters.search) {
        const haystack = `${university.name} ${university.shortName} ${university.ciudad}`.toLowerCase()
        if (!haystack.includes(filters.search.toLowerCase())) return false
      }
      return true
    })

    return [...result].sort((a, b) => {
      if (sort === 'antiguas') return (a.partnerSince ?? '').localeCompare(b.partnerSince ?? '')
      if (sort === 'estudiantes') return (b.estudiantes ?? 0) - (a.estudiantes ?? 0)
      if (sort === 'postulados') return (b.postulados ?? 0) - (a.postulados ?? 0)
      return (b.partnerSince ?? '').localeCompare(a.partnerSince ?? '')
    })
  }, [universities, filters, sort])

  const selected = filtered.find((university) => university.id === selectedId) ?? filtered[0]

  return (
    <div className="space-y-3">
      <UniversidadesKpiRow kpis={kpis} />
      <UniversidadesFilterBar options={options} applied={filters} onChange={setFilters} onClear={() => setFilters(EMPTY_FILTERS)} />

      <div
        className={
          selected ? 'grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]' : 'grid items-start gap-3'
        }
      >
        <UniversidadesListCard
          universities={filtered}
          count={filtered.length}
          selectedId={selected?.id ?? ''}
          sort={sort}
          onSortChange={setSort}
          onSelect={setSelectedId}
        />
        {selected && (
          <UniversidadDetailCard
            key={selected.id}
            universidad={selected}
            vacantes={vacantes}
            postulantes={postulantes}
          />
        )}
      </div>
    </div>
  )
}
