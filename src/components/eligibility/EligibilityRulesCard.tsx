import { FaListCheck } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ELIGIBILITY_RULE_CODES, ELIGIBILITY_RULE_SOURCE } from '@/lib/eligibility'
import { EligibilityRuleBadge } from './EligibilityRuleBadge'
import type { EligibilityAlert } from '@/types'

export function EligibilityRulesCard({ alerts }: { alerts: EligibilityAlert[] }) {
  return (
    <Card className="p-4">
      <SectionHeader title="Reglas monitoreadas" icon={<FaListCheck />} />
      <div className="mt-3 space-y-2">
        {ELIGIBILITY_RULE_CODES.map((rule) => {
          const count = alerts.filter((alert) => alert.rule === rule && alert.status !== 'descartada').length
          return (
            <div
              key={rule}
              className="flex items-center justify-between gap-2 rounded-xl border border-line/50 bg-surface-sunken px-3 py-2.5"
            >
              <EligibilityRuleBadge rule={rule} />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">
                  {ELIGIBILITY_RULE_SOURCE[rule]}
                </span>
                <span className="min-w-[26px] rounded-md bg-ink-700 px-1.5 py-0.5 text-center text-[11px] font-bold tabular-nums text-content-secondary ring-1 ring-inset ring-line">
                  {count}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
