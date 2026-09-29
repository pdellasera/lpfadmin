import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface SegmentedOption<T extends string> {
  id: T
  label: string
  icon?: ReactNode
}

interface SegmentedToggleProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: SegmentedOption<T>[]
  label?: string
}

export function SegmentedToggle<T extends string>({ value, onChange, options, label }: SegmentedToggleProps<T>) {
  return (
    <div className="flex items-center gap-2.5">
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-content-muted">{label}:</span>}
      <div className="inline-flex items-center gap-1 rounded-lg bg-surface-tile p-1 ring-1 ring-line/60">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3.5 py-1 text-xs font-semibold transition-colors',
              value === option.id ? 'bg-action text-white' : 'text-content-secondary hover:text-content-primary',
            )}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
