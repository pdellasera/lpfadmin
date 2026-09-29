import { Card } from '@/components/ui/Card'
import { BreakdownDonut, type BreakdownSlice } from '@/components/charts/BreakdownDonut'
import type { TransparencyDistributionItem } from '@/types'

type DistributionTone = 'income' | 'payment'

const PALETTES: Record<DistributionTone, string[]> = {
  income: [
    'var(--color-chart-i1)',
    'var(--color-chart-i2)',
    'var(--color-chart-i3)',
    'var(--color-chart-i4)',
    'var(--color-chart-i5)',
    'var(--color-chart-i6)',
  ],
  payment: [
    'var(--color-chart-p1)',
    'var(--color-chart-p2)',
    'var(--color-chart-p3)',
    'var(--color-chart-p4)',
    'var(--color-chart-p5)',
    'var(--color-chart-p6)',
  ],
}

interface DistributionCardProps {
  title: string
  tone: DistributionTone
  total: number
  centerLabel: string
  items: TransparencyDistributionItem[]
}

export function DistributionCard({ title, tone, total, centerLabel, items }: DistributionCardProps) {
  const palette = PALETTES[tone]
  const slices: BreakdownSlice[] = items.map((item, index) => ({
    id: item.id,
    label: item.label,
    value: item.value,
    percent: item.percent,
    color: palette[index % palette.length],
  }))

  return (
    <Card className="flex h-full flex-col p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>

      <div className="mt-4 flex flex-1 flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
        <BreakdownDonut items={slices} total={total} centerLabel={centerLabel} ariaLabel={`${title}: desglose porcentual`} />

        <ul className="min-w-0 flex-1 space-y-2">
          {slices.map((slice) => (
            <li key={slice.id} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
              <span className="min-w-0 flex-1 truncate text-content-secondary">{slice.label}</span>
              <span className="font-semibold tabular-nums text-content-primary">{slice.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
