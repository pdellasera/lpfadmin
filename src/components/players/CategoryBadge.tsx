import { cn } from '@/lib/cn'
import type { PlayerCategory } from '@/types'

const LABEL: Record<PlayerCategory, string> = {
  'sub-17': 'Sub-17',
  'sub-20': 'Sub-20',
  'sub-23': 'Sub-23',
  mayor: 'Mayor',
}

const TONES: Record<PlayerCategory, string> = {
  'sub-17': 'bg-violet-400/15 text-violet-600 ring-violet-400/30 dark:text-violet-300',
  'sub-20': 'bg-cyan-400/15 text-cyan-600 ring-cyan-400/30 dark:text-cyan-300',
  'sub-23': 'bg-indigo-400/15 text-indigo-600 ring-indigo-400/30 dark:text-indigo-300',
  mayor: 'bg-slate-400/15 text-slate-600 ring-slate-400/30 dark:text-slate-300',
}

interface CategoryBadgeProps {
  category: PlayerCategory
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-[46px] items-center justify-center rounded-md px-2 text-[11px] font-bold tracking-wide ring-1 ring-inset',
        TONES[category],
        className,
      )}
    >
      {LABEL[category]}
    </span>
  )
}
