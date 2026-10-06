import { cn } from '@/lib/cn'
import { STADIUM_SURFACE_LABEL } from '@/lib/stadiums'
import type { StadiumSurface } from '@/types'

const TONE: Record<StadiumSurface, string> = {
  natural: 'bg-emerald-400/15 text-emerald-600 ring-emerald-400/30 dark:text-emerald-300',
  sintetico: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
  hibrido: 'bg-violet-400/15 text-violet-600 ring-violet-400/30 dark:text-violet-300',
}

interface StadiumSurfaceBadgeProps {
  surface: StadiumSurface
  className?: string
}

export function StadiumSurfaceBadge({ surface, className }: StadiumSurfaceBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center justify-center whitespace-nowrap rounded-md px-2 text-[11px] font-semibold ring-1 ring-inset',
        TONE[surface],
        className,
      )}
    >
      {STADIUM_SURFACE_LABEL[surface]}
    </span>
  )
}
