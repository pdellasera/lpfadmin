import { FaCalendarDays, FaList } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import type { MatchesView } from '@/types'

interface MatchesViewToggleProps {
  value: MatchesView
  onChange: (value: MatchesView) => void
}

export function MatchesViewToggle({ value, onChange }: MatchesViewToggleProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-content-muted">Vista:</span>
      <div className="inline-flex items-center gap-1 rounded-lg bg-surface-tile p-1 ring-1 ring-line/60">
        <button
          type="button"
          onClick={() => onChange('list')}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3.5 py-1 text-xs font-semibold transition-colors',
            value === 'list' ? 'bg-action text-white' : 'text-content-secondary hover:text-content-primary',
          )}
        >
          <FaList className="text-[11px]" />
          Lista
        </button>
        <button
          type="button"
          onClick={() => onChange('calendar')}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3.5 py-1 text-xs font-semibold transition-colors',
            value === 'calendar' ? 'bg-action text-white' : 'text-content-secondary hover:text-content-primary',
          )}
        >
          <FaCalendarDays className="text-[11px]" />
          Calendario
        </button>
      </div>
    </div>
  )
}
