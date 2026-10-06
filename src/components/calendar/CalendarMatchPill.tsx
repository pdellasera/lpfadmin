import { cn } from '@/lib/cn'
import type { CalendarFixture } from '@/types'

export function CalendarMatchPill({ match }: { match: CalendarFixture }) {
  const live = match.phase === 'en-vivo'
  const label = match.label ?? (match.homeClub && match.awayClub ? `${match.homeClub.shortName} vs ${match.awayClub.shortName}` : '')

  return (
    <span
      className={cn(
        'flex h-[26px] w-full items-center rounded-md px-2.5 text-[12px] font-semibold leading-none',
        live ? 'bg-pill-danger text-white' : 'bg-pill-steel text-pill-steel-text',
      )}
    >
      <span className="truncate">{label}</span>
    </span>
  )
}
