import { FaArrowsRotate, FaMagnifyingGlass } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { LpfPostuladosFilterOptions, LpfPostuladosFilters } from '@/types'

interface PostuladosFilterBarProps {
  options: LpfPostuladosFilterOptions
  applied: LpfPostuladosFilters
  onChange: (filters: LpfPostuladosFilters) => void
  onClear: () => void
}

export function PostuladosFilterBar({ options, applied, onChange, onClear }: PostuladosFilterBarProps) {
  const set = (key: keyof LpfPostuladosFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative block h-[46px] w-full min-w-0 flex-1 rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
          <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
          <input
            type="text"
            value={applied.search}
            onChange={(event) => set('search', event.target.value)}
            placeholder="Buscar por nombre, correo o vacante..."
            className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
          />
        </label>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 xl:grid-cols-4">
          <FilterSelect
            label="Vacante"
            value={applied.vacante}
            onChange={(value) => set('vacante', value)}
            options={options.vacantes}
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
            label="Estado"
            value={applied.estado}
            onChange={(value) => set('estado', value)}
            options={options.estados}
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
