import { cn } from '@/lib/cn'
import { STADIUM_STATUS_LABEL } from '@/lib/stadiums'
import type { StadiumStatus } from '@/types'

const TONE: Record<StadiumStatus, { dot: string; text: string }> = {
  operativo: { dot: 'bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-300' },
  mantenimiento: { dot: 'bg-amber-400', text: 'text-amber-600 dark:text-amber-300' },
  clausurado: { dot: 'bg-rose-400', text: 'text-rose-600 dark:text-rose-300' },
}

interface StadiumStatusBadgeProps {
  status: StadiumStatus
}

export function StadiumStatusBadge({ status }: StadiumStatusBadgeProps) {
  const tone = TONE[status]
  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      <span className={cn('text-[12px] font-semibold', tone.text)}>{STADIUM_STATUS_LABEL[status]}</span>
    </div>
  )
}
