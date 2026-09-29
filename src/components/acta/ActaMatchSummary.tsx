import { FaChevronDown } from 'react-icons/fa6'
import { TbBuildingStadium } from 'react-icons/tb'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { parseMatchDate } from '@/lib/format'
import type { ActaDetail, MatchFixture } from '@/types'

interface ActaMatchSummaryProps {
  match: MatchFixture
  detail: ActaDetail
}

const STATUS_ROWS: { label: string; get: (detail: ActaDetail) => string }[] = [
  { label: 'ID Partido', get: (detail) => detail.code },
  { label: 'Competencia', get: (detail) => detail.competition },
  { label: 'Jornada', get: (detail) => String(detail.round) },
  { label: 'Estado', get: (detail) => detail.draftLabel },
]

export function ActaMatchSummary({ match, detail }: ActaMatchSummaryProps) {
  const date = parseMatchDate(match.date)

  return (
    <section className="relative overflow-hidden rounded-card border border-[#072c4c] bg-[#051728] shadow-card">
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/partido-hero.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.22] [object-position:65%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051728] via-[#051728]/80 to-[#051728]/40" />
      </div>

      <div className="relative flex items-center gap-5 px-5 py-4 lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <TeamCrest club={match.homeClub} size={68} className="drop-shadow-[0_8px_16px_rgba(2,8,20,0.6)]" />
          <div className="min-w-0">
            <span className="inline-flex rounded-md bg-[#0178ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Local
            </span>
            <p className="mt-1 truncate text-[15px] font-bold leading-tight text-white">{match.homeClub.name}</p>
            <p className="truncate text-xs text-slate-400">{match.homeClub.fullName}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center px-2 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#31c3ee]">
            {match.competition} • JORNADA {match.round} | {detail.division}
          </span>
          <span className="mt-1.5 font-display text-[22px] leading-none text-white">
            {date.weekday} {date.day} {date.month} {date.year}
          </span>
          <span className="mt-1 font-display text-[26px] leading-none text-white">{match.time}</span>
          <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-scrim/50 px-3 py-1.5 ring-1 ring-white/10">
            <TbBuildingStadium className="text-sm text-brand-300" />
            <span className="text-[12px] font-semibold text-slate-200">{match.stadium}</span>
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
          <div className="min-w-0 text-right">
            <span className="inline-flex rounded-md bg-[#0178ff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Visitante
            </span>
            <p className="mt-1 truncate text-[15px] font-bold leading-tight text-white">{match.awayClub.name}</p>
            <p className="truncate text-xs text-slate-400">{match.awayClub.fullName}</p>
          </div>
          <TeamCrest club={match.awayClub} size={68} className="drop-shadow-[0_8px_16px_rgba(2,8,20,0.6)]" />
        </div>

        <div className="ml-2 flex w-[206px] shrink-0 flex-col rounded-xl border border-white/10 bg-scrim/45 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#22e68f]" />
              <span className="text-xs font-semibold text-[#46e3a2]">{detail.estadoLabel}</span>
            </span>
            <FaChevronDown className="text-xs text-slate-500" />
          </div>
          <dl className="mt-2 space-y-1.5 border-t border-white/5 pt-2">
            {STATUS_ROWS.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <dt className="text-[11px] text-slate-500">{row.label}</dt>
                <dd className="text-right text-[12px] font-semibold text-white">{row.get(detail)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}