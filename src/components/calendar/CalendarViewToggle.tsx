import { cn } from '@/lib/cn'
import type { CalendarView } from '@/types'

const OPTIONS: { id: CalendarView; label: string }[] = [
  { id: 'mensual', label: 'Mensual' },
  { id: 'semanal', label: 'Semanal' },
  { id: 'lista', label: 'Lista' },
]

interface CalendarViewToggleProps {
  value: CalendarView
  onChange: (value: CalendarView) => void
}

export function CalendarViewToggle({ value, onChange }: CalendarViewToggleProps) {
  return (
    <div className="inline-flex items-center rounded-[10px] border border-border-strong bg-surface-panel p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            'h-9 rounded-lg px-4 text-[13px] font-semibold transition-colors',
            value === option.id ? 'bg-cta-navy text-white' : 'text-content-secondary hover:text-content-primary',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
