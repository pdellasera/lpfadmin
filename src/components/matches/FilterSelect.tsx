import { useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import { parseMatchDate } from '@/lib/format'
import type { MatchFilterOption } from '@/types'

const fieldClass =
  'relative block h-[46px] w-full rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600'

const labelClass =
  'pointer-events-none absolute left-3 top-1 text-[10px] font-semibold uppercase tracking-wide text-content-faint'

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: MatchFilterOption[]
}

export function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className={cn(fieldClass, 'cursor-pointer')}>
      <span className={labelClass}>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full appearance-none bg-transparent px-3 pb-1.5 pt-5 text-sm font-semibold text-content-primary focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-ink-800">
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
    </label>
  )
}

interface FilterDateFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function FilterDateField({ label, value, onChange }: FilterDateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const parts = value ? parseMatchDate(value) : null

  return (
    <label className={cn(fieldClass, 'cursor-pointer')}>
      <span className={labelClass}>{label}</span>
      <span
        className={cn(
          'block truncate px-3 pb-1.5 pt-5 text-sm',
          value ? 'font-semibold text-content-primary' : 'text-content-faint',
        )}
      >
        {parts ? `${parts.day} ${parts.month} ${parts.year}` : 'Seleccionar fecha'}
      </span>
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onClick={(event) => {
          const target = event.currentTarget
          if (typeof target.showPicker === 'function') target.showPicker()
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={label}
      />
    </label>
  )
}
