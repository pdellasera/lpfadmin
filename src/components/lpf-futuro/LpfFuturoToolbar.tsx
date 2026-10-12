import { FaArrowsRotate, FaMagnifyingGlass } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { LpfFuturoFilterOptions, LpfFuturoFilters } from '@/types'

interface LpfFuturoToolbarProps {
  options: LpfFuturoFilterOptions
  applied: LpfFuturoFilters
  onChange: (filters: LpfFuturoFilters) => void
  onClear: () => void
}

export function LpfFuturoToolbar({ options, applied, onChange, onClear }: LpfFuturoToolbarProps) {
  const set = (key: keyof LpfFuturoFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative block h-[46px] w-full min-w-0 flex-1 rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
          <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
          <input
            type="text"
            value={applied.search}
            onChange={(event) => set('search', event.target.value)}
            placeholder="Buscar nombre, universidad o club..."
            className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
          />
        </label>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 xl:grid-cols-4">
          <FilterSelect
            label="Estado"
            value={applied.estado}
            onChange={(value) => set('estado', value)}
            options={options.estados}
          />
          <FilterSelect
            label="Universidad"
            value={applied.universidad}
            onChange={(value) => set('universidad', value)}
            options={options.universidades}
          />
          <FilterSelect
            label="Club"
            value={applied.club}
            onChange={(value) => set('club', value)}
            options={options.clubes}
          />
          <FilterSelect
            label="Área"
            value={applied.area}
            onChange={(value) => set('area', value)}
            options={options.areas}
          />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 whitespace-nowrap px-2 text-sm font-semibold text-accent transition-colors hover:text-accent-glow"
        >
          <FaArrowsRotate className="text-xs" />
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}
