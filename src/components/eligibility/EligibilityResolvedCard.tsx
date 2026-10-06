import { FaCircleCheck } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { formatShortDate } from '@/lib/format'
import type { EligibilityAlert } from '@/types'

export function EligibilityResolvedCard({ alerts }: { alerts: EligibilityAlert[] }) {
  const resolved = alerts.filter((alert) => alert.status === 'resuelta').slice(0, 4)

  return (
    <Card className="p-4">
      <SectionHeader title="Resueltas recientemente" icon={<FaCircleCheck className="text-emerald-400" />} />
      <div className="mt-3 space-y-2.5">
        {resolved.length === 0 ? (
          <p className="text-sm text-content-faint">Sin alertas resueltas.</p>
        ) : (
          resolved.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2.5">
              <TeamCrest club={alert.club} size={20} className="mt-0.5 rounded-sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-content-primary">{alert.headline}</p>
                <p className="truncate text-[11px] text-content-faint">
                  {alert.club.name} · {formatShortDate(alert.detectedAt)}
                </p>
              </div>
              <FaCircleCheck className="mt-1 shrink-0 text-xs text-emerald-400" />
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
