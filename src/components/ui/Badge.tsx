import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'neutral' | 'danger' | 'success'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  brand: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
  neutral: 'bg-ink-700 text-content-secondary ring-line',
  danger: 'bg-rose-500/15 text-rose-600 ring-rose-500/30 dark:text-rose-300',
  success: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
