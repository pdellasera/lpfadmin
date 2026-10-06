import { cn } from '@/lib/cn'
import type { CompetitionCategory } from '@/types'

export type CategoryFilterId = 'todas' | CompetitionCategory

const CATEGORIES: { id: CategoryFilterId; label: string }[] = [
  { id: 'todas', label: 'Todas las categorías' },
  { id: 'LPF', label: 'LPF' },
  { id: 'LIGA-PROM', label: 'LIGA PROM' },
  { id: 'FEMENINA', label: 'Liga Femenina' },
  { id: 'JUVENIL', label: 'Liga Juvenil' },
]

interface CalendarCategoryPillsProps {
  value: CategoryFilterId
  onChange: (value: CategoryFilterId) => void
}

export function CalendarCategoryPills({ value, onChange }: CalendarCategoryPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={cn(
            'h-9 rounded-lg px-3.5 text-[13px] font-semibold transition-colors',
            value === category.id
              ? 'bg-cta-navy text-white'
              : 'border border-border-strong bg-surface-panel text-content-secondary hover:text-content-primary',
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
