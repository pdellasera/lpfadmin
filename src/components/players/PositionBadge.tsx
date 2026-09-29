import { cn } from '@/lib/cn'
import type { PlayerPosition } from '@/types'

const TONES: Record<PlayerPosition, string> = {
  POR: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300',
  DEF: 'bg-sky-400/15 text-sky-600 ring-sky-400/30 dark:text-sky-300',
  MED: 'bg-emerald-400/15 text-emerald-600 ring-emerald-400/30 dark:text-emerald-300',
  DEL: 'bg-rose-400/15 text-rose-600 ring-rose-400/30 dark:text-rose-300',
}

interface PositionBadgeProps {
  position: PlayerPosition
  className?: string
}

export function PositionBadge({ position, className }: PositionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-[46px] items-center justify-center rounded-md px-2 text-[11px] font-bold tracking-wide ring-1 ring-inset',
        TONES[position],
        className,
      )}
    >
      {position}
    </span>
  )
}
