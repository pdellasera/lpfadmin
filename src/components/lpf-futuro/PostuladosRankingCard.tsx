import { Card } from '@/components/ui/Card'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import type { LpfRankingItem } from '@/types'
import { UniversityCrest } from './UniversityCrest'

interface PostuladosRankingCardProps {
  title: string
  items: LpfRankingItem[]
  tone?: 'brand' | 'violet'
  max?: number
}

export function PostuladosRankingCard({ title, items, tone = 'brand', max }: PostuladosRankingCardProps) {
  const maxValue = max ?? Math.max(...items.map((item) => item.value), 1)

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Ver todos
        </button>
      </div>

      <ul className="mt-4 flex-1 space-y-3.5">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-2.5">
            <span className="w-4 shrink-0 text-center text-xs font-bold tabular-nums text-content-faint">
              {index + 1}
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center">
              {item.club ? (
                <TeamCrest club={item.club} size={26} />
              ) : item.university ? (
                <UniversityCrest university={item.university} size={26} rounded="md" />
              ) : null}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-content-secondary">{item.label}</span>
            <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-track">
              <span
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full',
                  tone === 'violet' ? 'bg-violet-500' : 'bg-brand-500',
                )}
                style={{ width: `${Math.round((item.value / maxValue) * 100)}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm font-bold tabular-nums text-content-primary">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
