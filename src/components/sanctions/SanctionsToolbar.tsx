import { FaArrowsRotate, FaMagnifyingGlass, FaPlus } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { SanctionFilterOptions, SanctionFilters } from '@/types'

interface SanctionsToolbarProps {
  options: SanctionFilterOptions
  applied: SanctionFilters
  pendientes: number
  onChange: (filters: SanctionFilters) => void
  onClear: () => void
}

export function SanctionsToolbar({ options, applied, pendientes, onChange, onClear }: SanctionsToolbarProps) {
  const set = (key: keyof SanctionFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.35fr)]">
          <FilterSelect
            label="Estado"
            value={applied.status}
            onChange={(value) => set('status', value)}
            options={options.statuses}
          />
          <FilterSelect
            label="Club"
            value={applied.club}
            onChange={(value) => set('club', value)}
            options={options.clubs}
          />
          <FilterSelect
            label="Infracción"
            value={applied.infraction}
            onChange={(value) => set('infraction', value)}
            options={options.infractions}
          />
          <label className="relative block h-[46px] w-full rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
            <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
            <input
              type="text"
              value={applied.search}
              onChange={(event) => set('search', event.target.value)}
              placeholder="Buscar sanción..."
              className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">
          {pendientes > 0 && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/30 dark:text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              {pendientes} pendientes
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
          <button
            type="button"
            className="flex h-[46px] items-center gap-2 whitespace-nowrap rounded-xl bg-action px-5 text-sm font-semibold text-white shadow-action transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <FaPlus className="text-xs" />
            Registrar sanción
          </button>
        </div>
      </div>
    </div>
  )
}
