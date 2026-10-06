import { FaArrowsRotate, FaMagnifyingGlass } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { EligibilityFilterOptions, EligibilityFilters } from '@/types'

interface EligibilityToolbarProps {
  options: EligibilityFilterOptions
  applied: EligibilityFilters
  criticas: number
  onChange: (filters: EligibilityFilters) => void
  onClear: () => void
}

export function EligibilityToolbar({ options, applied, criticas, onChange, onClear }: EligibilityToolbarProps) {
  const set = (key: keyof EligibilityFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.35fr)]">
          <FilterSelect label="Regla" value={applied.rule} onChange={(value) => set('rule', value)} options={options.rules} />
          <FilterSelect label="Club" value={applied.club} onChange={(value) => set('club', value)} options={options.clubs} />
          <FilterSelect label="Estado" value={applied.status} onChange={(value) => set('status', value)} options={options.statuses} />
          <label className="relative block h-[46px] w-full rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
            <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
            <input
              type="text"
              value={applied.search}
              onChange={(event) => set('search', event.target.value)}
              placeholder="Buscar alerta..."
              className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">
          {criticas > 0 && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/30 dark:text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              {criticas} críticas
            </span>
          )}
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
    </div>
  )
}
