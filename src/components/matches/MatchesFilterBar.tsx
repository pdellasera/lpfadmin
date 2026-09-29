import { useState } from 'react'
import { FaEraser, FaFilter } from 'react-icons/fa6'
import { FilterDateField, FilterSelect } from './FilterSelect'
import type { MatchFilters, MatchFilterOptions } from '@/types'

interface MatchesFilterBarProps {
  options: MatchFilterOptions
  applied: MatchFilters
  onApply: (filters: MatchFilters) => void
  onClear: () => void
}

export function MatchesFilterBar({ options, applied, onApply, onClear }: MatchesFilterBarProps) {
  const [draft, setDraft] = useState<MatchFilters>(applied)

  const set = (key: keyof MatchFilters, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Competencia"
            value={draft.competition}
            onChange={(value) => set('competition', value)}
            options={options.competitions}
          />
          <FilterSelect
            label="Equipo"
            value={draft.team}
            onChange={(value) => set('team', value)}
            options={options.teams}
          />
          <FilterSelect
            label="Estadio"
            value={draft.stadium}
            onChange={(value) => set('stadium', value)}
            options={options.stadiums}
          />
          <FilterDateField label="Fecha" value={draft.date} onChange={(value) => set('date', value)} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 whitespace-nowrap px-2 text-sm font-semibold text-accent transition-colors hover:text-accent-glow"
          >
            <FaEraser className="text-xs" />
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="flex h-[46px] items-center gap-2 whitespace-nowrap rounded-xl bg-action px-5 text-sm font-semibold text-white shadow-action transition-colors hover:bg-action-hover"
          >
            <FaFilter className="text-xs" />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
