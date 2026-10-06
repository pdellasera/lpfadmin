import { cn } from '@/lib/cn'
import { REFEREE_CATEGORY_LABEL } from '@/lib/referees'
import type { RefereeCategory } from '@/types'

const CATEGORY_TONE: Record<RefereeCategory, string> = {
  FIFA: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300',
  Nacional: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
  Regional: 'bg-slate-400/15 text-slate-600 ring-slate-400/30 dark:text-slate-300',
}

interface RefereeCategoryBadgeProps {
  category: RefereeCategory
  className?: string
}

export function RefereeCategoryBadge({ category, className }: RefereeCategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center justify-center rounded-md px-2 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset',
        CATEGORY_TONE[category],
        className,
      )}
    >
      {REFEREE_CATEGORY_LABEL[category]}
    </span>
  )
}
