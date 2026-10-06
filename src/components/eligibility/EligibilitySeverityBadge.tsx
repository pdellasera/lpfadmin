import { cn } from '@/lib/cn'
import { ELIGIBILITY_SEVERITY_LABEL } from '@/lib/eligibility'
import type { EligibilitySeverity } from '@/types'

const TONE: Record<EligibilitySeverity, { chip: string; dot: string }> = {
  critica: { chip: 'bg-rose-500/15 text-rose-600 ring-rose-500/30 dark:text-rose-300', dot: 'bg-rose-500' },
  advertencia: { chip: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300', dot: 'bg-amber-400' },
  info: { chip: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300', dot: 'bg-brand-500' },
}

export function EligibilitySeverityBadge({ severity }: { severity: EligibilitySeverity }) {
  const tone = TONE[severity]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        tone.chip,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      {ELIGIBILITY_SEVERITY_LABEL[severity]}
    </span>
  )
}
