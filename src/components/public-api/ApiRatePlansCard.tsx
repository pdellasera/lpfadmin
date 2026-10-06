import { FaCircleCheck } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import type { ApiRatePlan } from '@/types'

export function ApiRatePlansCard({ plans }: { plans: ApiRatePlan[] }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Límites y planes</h3>
      <div className="mt-3 flex-1 space-y-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'rounded-xl border px-3 py-3',
              plan.highlight ? 'border-brand-600/50 bg-brand-600/10' : 'border-line/50 bg-surface-sunken',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-content-primary">
                {plan.name}
                {plan.highlight && <FaCircleCheck className="text-xs text-brand-400" />}
              </p>
              <span className="truncate text-[11px] text-content-muted">{plan.description}</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-[12px] text-content-secondary">
              <span>
                <span className="font-bold tabular-nums text-content-primary">{formatNumber(plan.requestsPerMinute)}</span> req/min
              </span>
              <span>
                <span className="font-bold tabular-nums text-content-primary">{formatNumber(plan.requestsPerDay)}</span> req/día
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
