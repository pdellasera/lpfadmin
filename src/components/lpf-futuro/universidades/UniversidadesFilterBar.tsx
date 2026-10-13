import { FaArrowsRotate, FaMagnifyingGlass } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { LpfUniversidadesFilterOptions, LpfUniversidadesFilters } from '@/types'

interface UniversidadesFilterBarProps {
  options: LpfUniversidadesFilterOptions
  applied: LpfUniversidadesFilters
  onChange: (filters: LpfUniversidadesFilters) => void
  onClear: () => void
}

export function UniversidadesFilterBar({ options, applied, onChange, onClear }: UniversidadesFilterBarProps) {
  const set = (key: keyof LpfUniversidadesFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative block h-[46px] w-full min-w-0 flex-1 rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
          <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
          <input
            type="text"
            value={applied.search}
            onChange={(event) => set('search', event.target.value)}
            placeholder="Buscar universidad..."
            className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
          />
        </label>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
          <FilterSelect
            label="Ciudad"
            value={applied.ciudad}
            onChange={(value) => set('ciudad', value)}
            options={options.ciudades}
          />
          <FilterSelect
            label="Tipo"
            value={applied.tipo}
            onChange={(value) => set('tipo', value)}
            options={options.tipos}
          />
          <FilterSelect
            label="Estado"
            value={applied.estado}
            onChange={(value) => set('estado', value)}
            options={options.estados}
          />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="ml-auto flex h-[46px] items-center gap-1.5 rounded-xl border border-border-faint bg-surface-input px-3.5 text-sm font-semibold text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
        >
          <FaArrowsRotate className="text-xs" />
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}
