import { FaArrowTrendDown, FaArrowTrendUp, FaCircleCheck } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import type { DeltaDirection } from '@/types'

interface DeltaTagProps {
  direction: DeltaDirection
  tone: 'emerald' | 'rose'
  label: string
  className?: string
}

export function DeltaTag({ direction, tone, label, className }: DeltaTagProps) {
  const Icon = direction === 'ok' ? FaCircleCheck : direction === 'up' ? FaArrowTrendUp : FaArrowTrendDown

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[11px] font-bold leading-none',
        tone === 'emerald' ? 'text-emerald-500 dark:text-emerald-300' : 'text-rose-500 dark:text-rose-300',
        className,
      )}
    >
      <Icon className="text-[10px]" />
      {label}
    </span>
  )
}
