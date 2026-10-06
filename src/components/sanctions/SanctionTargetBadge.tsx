import { cn } from '@/lib/cn'
import { SANCTION_TARGET_LABEL } from '@/lib/sanctions'
import type { SanctionTargetType } from '@/types'

const TONE: Record<SanctionTargetType, string> = {
  jugador: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
  'cuerpo-tecnico': 'bg-violet-400/15 text-violet-600 ring-violet-400/30 dark:text-violet-300',
  club: 'bg-rose-400/15 text-rose-600 ring-rose-400/30 dark:text-rose-300',
}

interface SanctionTargetBadgeProps {
  targetType: SanctionTargetType
  className?: string
}

export function SanctionTargetBadge({ targetType, className }: SanctionTargetBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center justify-center whitespace-nowrap rounded-md px-1.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        TONE[targetType],
        className,
      )}
    >
      {SANCTION_TARGET_LABEL[targetType]}
    </span>
  )
}
