import { FaChevronRight } from 'react-icons/fa6'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatDayMonthShort } from '@/lib/format'
import type { CalendarFixture, Club } from '@/types'

const HEADERS = ['Fecha', 'Partido', 'Categoría', 'Estadio', 'Árbitro principal', 'Acción']

function MatchCrest({ club }: { club?: Club }) {
  if (!club) return null
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken ring-1 ring-border-strong">
      <TeamCrest club={club} size={22} />
    </span>
  )
}

export function UpcomingMatchesTable({ matches }: { matches: CalendarFixture[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-content-faint">Próximos partidos</h2>

      <div className="overflow-hidden rounded-[12px] border border-border-strong bg-surface-panel shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border-faint">
                {HEADERS.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      'h-11 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-content-faint',
                      index === 3 && 'hidden 2xl:table-cell',
                      index === 4 && 'hidden 2xl:table-cell',
                      index === 5 && 'text-right',
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="border-b border-border-faint last:border-0">
                  <td className="h-[72px] px-4 py-2.5 align-middle">
                    <div className="flex flex-col leading-tight">
                      <span className="text-[13px] font-semibold text-content-primary">
                        {formatDayMonthShort(match.date)}
                      </span>
                      <span className="text-[12px] text-content-muted">{match.time ?? '—'}</span>
                    </div>
                  </td>

                  <td className="h-[72px] px-4 py-2.5 align-middle">
                    {match.label ? (
                      <div className="flex min-w-0 flex-col leading-tight">
                        <span className="text-[13px] font-bold text-content-primary">{match.label}</span>
                        {match.note && <span className="text-[12px] text-content-muted">{match.note}</span>}
                      </div>
                    ) : (
                      <div className="flex min-w-0 items-center gap-2">
                        <MatchCrest club={match.homeClub} />
                        <span className="truncate text-[13px] font-semibold text-content-primary">
                          {match.homeClub?.name}
                        </span>
                        <span className="shrink-0 text-[12px] italic text-content-muted">vs</span>
                        <MatchCrest club={match.awayClub} />
                        <span className="truncate text-[13px] font-semibold text-content-primary">
                          {match.awayClub?.name}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="h-[72px] px-4 py-2.5 align-middle">
                    <span className="inline-flex rounded-md bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-content-secondary">
                      {match.category}
                    </span>
                  </td>

                  <td className="hidden h-[72px] px-4 py-2.5 align-middle 2xl:table-cell">
                    <span className="text-[13px] text-content-secondary">{match.stadium ?? '—'}</span>
                  </td>

                  <td className="hidden h-[72px] px-4 py-2.5 align-middle 2xl:table-cell">
                    <span className="text-[13px] text-content-secondary">{match.referee ?? '—'}</span>
                  </td>

                  <td className="h-[72px] px-4 py-2.5 text-right align-middle">
                    <FaChevronRight className="ml-auto text-xs text-content-faint" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
