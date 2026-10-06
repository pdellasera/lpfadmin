import { ELIGIBILITY_RULE_LABEL } from '@/lib/eligibility'
import type { EligibilityRuleCode } from '@/types'

export function EligibilityRuleBadge({ rule }: { rule: EligibilityRuleCode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-ink-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-content-secondary ring-1 ring-inset ring-line">
      {ELIGIBILITY_RULE_LABEL[rule]}
    </span>
  )
}
