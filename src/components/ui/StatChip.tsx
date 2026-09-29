import type { ReactNode } from 'react'
import { AnimatedNumber } from './AnimatedNumber'

interface StatChipProps {
  icon: ReactNode
  value: number
  label: string
}

export function StatChip({ icon, value, label }: StatChipProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-sunken text-brand-600 ring-1 ring-border-faint backdrop-blur-sm dark:bg-overlay-ring dark:text-brand-300 dark:ring-overlay-ring">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-lg font-bold text-content-primary">
          <AnimatedNumber value={value} />
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wide text-content-muted">{label}</div>
      </div>
    </div>
  )
}
