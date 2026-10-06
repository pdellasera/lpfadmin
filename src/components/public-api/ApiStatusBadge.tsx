import { cn } from '@/lib/cn'

export type ApiStatusTone = 'success' | 'danger' | 'warning' | 'neutral'

const TONES: Record<ApiStatusTone, string> = {
  success: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
  danger: 'bg-rose-500/15 text-rose-600 ring-rose-500/30 dark:text-rose-300',
  warning: 'bg-amber-500/15 text-amber-600 ring-amber-500/30 dark:text-amber-300',
  neutral: 'bg-ink-700 text-content-secondary ring-line',
}

const DOTS: Record<ApiStatusTone, string> = {
  success: 'bg-emerald-500',
  danger: 'bg-rose-500',
  warning: 'bg-amber-500',
  neutral: 'bg-slate-500',
}

interface ApiStatusBadgeProps {
  label: string
  tone?: ApiStatusTone
}

export function ApiStatusBadge({ label, tone = 'neutral' }: ApiStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
        TONES[tone],
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', DOTS[tone])} />
      {label}
    </span>
  )
}
