import { cn } from '@/lib/cn'
import { SANCTION_STATUS_LABEL } from '@/lib/sanctions'
import type { SanctionStatus } from '@/types'

const TONE: Record<SanctionStatus, { dot: string; text: string }> = {
  pendiente: { dot: 'bg-amber-400', text: 'text-amber-600 dark:text-amber-300' },
  cumplida: { dot: 'bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-300' },
  apelada: { dot: 'bg-sky-400', text: 'text-sky-600 dark:text-sky-300' },
  reducida: { dot: 'bg-fuchsia-400', text: 'text-fuchsia-600 dark:text-fuchsia-300' },
  anulada: { dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
}

interface SanctionStatusBadgeProps {
  status: SanctionStatus
}

export function SanctionStatusBadge({ status }: SanctionStatusBadgeProps) {
  const tone = TONE[status]
  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      <span className={cn('text-[12px] font-semibold', tone.text)}>{SANCTION_STATUS_LABEL[status]}</span>
    </div>
  )
}
