import { cn } from '@/lib/cn'
import { ELIGIBILITY_STATUS_LABEL } from '@/lib/eligibility'
import type { EligibilityStatus } from '@/types'

const TONE: Record<EligibilityStatus, { dot: string; text: string }> = {
  activa: { dot: 'bg-rose-400', text: 'text-rose-600 dark:text-rose-300' },
  'en-revision': { dot: 'bg-amber-400', text: 'text-amber-600 dark:text-amber-300' },
  resuelta: { dot: 'bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-300' },
  descartada: { dot: 'bg-slate-400', text: 'text-content-muted' },
}

export function EligibilityStatusBadge({ status }: { status: EligibilityStatus }) {
  const tone = TONE[status]
  return (
    <div className="flex items-center gap-2">
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      <span className={cn('text-[12px] font-semibold', tone.text)}>{ELIGIBILITY_STATUS_LABEL[status]}</span>
    </div>
  )
}
