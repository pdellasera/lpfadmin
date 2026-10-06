import { FaArrowsRotate, FaMagnifyingGlass, FaPlus } from 'react-icons/fa6'
import { FilterSelect } from '@/components/matches/FilterSelect'
import type { StaffFilterOptions, StaffFilters } from '@/types'

interface StaffToolbarProps {
  options: StaffFilterOptions
  applied: StaffFilters
  onChange: (filters: StaffFilters) => void
  onClear: () => void
}

export function StaffToolbar({ options, applied, onChange, onClear }: StaffToolbarProps) {
  const set = (key: keyof StaffFilters, value: string) => onChange({ ...applied, [key]: value })

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.35fr)]">
          <FilterSelect
            label="Equipo"
            value={applied.club}
            onChange={(value) => set('club', value)}
            options={options.clubs}
          />
          <FilterSelect
            label="Cargo"
            value={applied.role}
            onChange={(value) => set('role', value)}
            options={options.roles}
          />
          <FilterSelect
            label="Estado"
            value={applied.status}
            onChange={(value) => set('status', value)}
            options={options.statuses}
          />
          <label className="relative block h-[46px] w-full rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
            <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
            <input
              type="text"
              value={applied.search}
              onChange={(event) => set('search', event.target.value)}
              placeholder="Buscar miembro..."
              className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">
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
            Registrar miembro
          </button>
        </div>
      </div>
    </div>
  )
}
