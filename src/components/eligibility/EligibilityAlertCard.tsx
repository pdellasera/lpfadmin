import type { IconType } from 'react-icons'
import { FaCircleExclamation, FaCircleInfo, FaClock, FaPaperPlane, FaTriangleExclamation } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatShortDate } from '@/lib/format'
import { ELIGIBILITY_POSITION_LABEL, ELIGIBILITY_ROLE_LABEL } from '@/lib/eligibility'
import { EligibilityRuleBadge } from './EligibilityRuleBadge'
import { EligibilitySeverityBadge } from './EligibilitySeverityBadge'
import { EligibilityStatusBadge } from './EligibilityStatusBadge'
import type { EligibilityAlert, EligibilitySeverity } from '@/types'

const SEVERITY_ICON: Record<EligibilitySeverity, { icon: IconType; className: string }> = {
  critica: { icon: FaCircleExclamation, className: 'bg-rose-400/15 text-rose-500 ring-rose-400/30 dark:text-rose-300' },
  advertencia: { icon: FaTriangleExclamation, className: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300' },
  info: { icon: FaCircleInfo, className: 'bg-brand-600/15 text-brand-400 ring-brand-600/30' },
}

function subjectLabel(alert: EligibilityAlert): string {
  if (alert.targetType === 'club') return 'Club'
  if (alert.position) return `${alert.subjectName} · ${ELIGIBILITY_POSITION_LABEL[alert.position]}`
  if (alert.role) return `${alert.subjectName} · ${ELIGIBILITY_ROLE_LABEL[alert.role]}`
  return alert.subjectName
}

export function EligibilityAlertCard({ alert }: { alert: EligibilityAlert }) {
  const meta = SEVERITY_ICON[alert.severity]
  const Icon = meta.icon

  return (
    <Card className="p-4">
      <div className="flex gap-3.5">
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
            meta.className,
          )}
        >
          <Icon className="text-base" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <EligibilityRuleBadge rule={alert.rule} />
            <span className="font-mono text-[11px] text-content-faint">{alert.code}</span>
            <div className="ml-auto flex items-center gap-2.5">
              <EligibilityStatusBadge status={alert.status} />
              <EligibilitySeverityBadge severity={alert.severity} />
            </div>
          </div>

          <p className="mt-2 text-[15px] font-semibold leading-snug text-content-primary">{alert.headline}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-content-muted">{alert.explanation}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-content-secondary">
            <span className="flex items-center gap-1.5 font-medium">
              <TeamCrest club={alert.club} size={18} className="rounded-sm" />
              {alert.club.name}
            </span>
            <span>{subjectLabel(alert)}</span>
            {alert.matchLabel && <span className="text-content-muted">{alert.matchLabel}</span>}
            {alert.deadline && (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300">
                <FaClock className="text-[10px]" /> Vence {formatShortDate(alert.deadline)}
              </span>
            )}
            {alert.source && <span className="text-content-faint">· {alert.source}</span>}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line/50 pt-3">
            <span className="rounded-md bg-ink-700 px-2 py-0.5 text-[11px] font-semibold text-content-secondary ring-1 ring-inset ring-line">
              {alert.impact}
            </span>
            <span className="text-[12px] text-content-muted">
              Acción: <span className="font-medium text-content-secondary">{alert.recommendation}</span>
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="text-xs font-semibold text-brand-400 transition-colors hover:text-brand-300">
                Marcar resuelta
              </button>
              <button
                type="button"
                className="rounded-lg border border-border-faint bg-surface-input px-3 py-1.5 text-xs font-semibold text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
              >
                Ver relación
              </button>
              {alert.actionLabel && (
                <Button className="h-8 rounded-lg px-3 text-xs">
                  <FaPaperPlane className="text-[11px]" />
                  {alert.actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
