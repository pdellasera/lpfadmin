import { cn } from '@/lib/cn'
import { SANCTION_INFRACTION_LABEL } from '@/lib/sanctions'
import type { SanctionInfractionCode } from '@/types'

const CARD_TONE: Record<'amarilla' | 'roja', string> = {
  amarilla: 'bg-amber-400',
  roja: 'bg-rose-500',
}

interface SanctionInfractionBadgeProps {
  infraction: SanctionInfractionCode
  card?: 'amarilla' | 'roja'
}

export function SanctionInfractionBadge({ infraction, card }: SanctionInfractionBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      {card && <span aria-hidden="true" className={cn('h-3.5 w-2.5 rounded-[3px] ring-1 ring-black/10', CARD_TONE[card])} />}
      <span className="text-[12px] font-semibold text-content-secondary">{SANCTION_INFRACTION_LABEL[infraction]}</span>
    </div>
  )
}
