import { FaCalendarDays } from 'react-icons/fa6'
import { EmptyState } from '@/components/ui/EmptyState'
import { parseMatchDate } from '@/lib/format'
import type { MatchFixture } from '@/types'

interface MatchesCalendarProps {
  matches: MatchFixture[]
}

export function MatchesCalendar({ matches }: MatchesCalendarProps) {
  if (matches.length === 0) {
    return <EmptyState title="No hay partidos para mostrar" description="Ajusta los filtros o la temporada." />
  }

  const byDate = new Map<string, MatchFixture[]>()
  for (const match of matches) {
    const list = byDate.get(match.date) ?? []
    list.push(match)
    byDate.set(match.date, list)
  }

  return (
    <div className="space-y-[5px]">
      {[...byDate.entries()].map(([iso, items]) => {
        const date = parseMatchDate(iso)
        return (
          <div key={iso} className="rounded-card border border-border-strong bg-surface-card-deep p-4 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <FaCalendarDays className="text-brand-400" />
              <span className="font-display text-sm uppercase text-content-primary">
                {date.weekday} {date.day} {date.month} {date.year}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((match) => (
                <div
                  key={match.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line/40 pt-2 text-sm first:border-t-0 first:pt-0"
                >
                  <span className="font-semibold text-content-primary">{match.homeClub.name}</span>
                  <span className="text-xs uppercase text-content-faint">vs</span>
                  <span className="font-semibold text-content-primary">{match.awayClub.name}</span>
                  <span className="ml-auto text-xs text-content-muted">
                    {match.time} · {match.stadium}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
