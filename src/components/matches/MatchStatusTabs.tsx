import { cn } from '@/lib/cn'
import type { MatchStatusTabId } from '@/types'

interface MatchStatusTabsProps {
  value: MatchStatusTabId
  onChange: (value: MatchStatusTabId) => void
  className?: string
}

const TABS: { id: MatchStatusTabId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'proximos', label: 'Próximos' },
  { id: 'en-vivo', label: 'En vivo' },
  { id: 'finalizados', label: 'Finalizados' },
]

export function MatchStatusTabs({ value, onChange, className }: MatchStatusTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-xl bg-surface-track p-1 ring-1 ring-border-faint dark:bg-[#041728] dark:ring-[#0d2a47]',
        className,
      )}
    >
      {TABS.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'h-9 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
              active
                ? 'bg-action px-5 text-sm font-bold text-white shadow-tab'
                : 'px-5 text-[13px] font-semibold text-content-secondary hover:bg-overlay-subtle hover:text-content-primary dark:text-white/90 dark:hover:bg-white/5 dark:hover:text-white',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
