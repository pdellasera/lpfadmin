import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface PillTabOption<T extends string> {
  id: T
  label: ReactNode
}

interface PillTabsProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: PillTabOption<T>[]
  className?: string
  dividers?: boolean
}

export function PillTabs<T extends string>({ value, onChange, options, className, dividers = false }: PillTabsProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-xl bg-surface-track p-1 ring-1 ring-border-faint dark:bg-[#041728] dark:ring-[#0d2a47]',
        className,
      )}
    >
      {options.map((tab, index) => {
        const active = tab.id === value
        return (
          <div key={tab.id} className="flex items-center">
            {dividers && index > 0 && (
              <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-overlay-border dark:bg-white/10" />
            )}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'h-10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
                active
                  ? 'bg-action px-6 text-[15px] font-bold text-white shadow-tab'
                  : 'px-5 text-[13px] font-semibold text-content-secondary hover:bg-overlay-subtle hover:text-content-primary dark:text-white/90 dark:hover:bg-white/5 dark:hover:text-white',
              )}
            >
              {tab.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
