import { motion } from 'framer-motion'
import { FaClipboardList, FaFileLines, FaRegClock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { parseMatchDate } from '@/lib/format'
import { fadeUp } from '@/lib/motion'
import type { MatchFixture } from '@/types'

interface MatchRowProps {
  match: MatchFixture
}

export function MatchRow({ match }: MatchRowProps) {
  const date = parseMatchDate(match.date)
  const hasActa = match.status === 'acta-disponible'

  return (
    <motion.div
      variants={fadeUp}
      className="flex min-h-[78px] items-center rounded-card border border-border-strong bg-surface-card-deep px-5 py-2 shadow-card"
    >
      {/* Bloque de fecha */}
      <div className="flex w-[76px] shrink-0 flex-col items-center leading-none">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-content-primary">{date.weekday}</span>
        <span className="mt-1.5 text-[22px] font-bold leading-none text-content-primary">{date.day}</span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-content-primary">
          {date.month} {date.year}
        </span>
      </div>

      <div className="mx-4 h-10 w-px shrink-0 bg-border-faint" />

      {/* Enfrentamiento */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {match.competition} • JORNADA {match.round}
        </span>
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <TeamCrest
              club={match.homeClub}
              size={44}
              className="drop-shadow-[0_8px_16px_rgba(2,8,20,0.6)]"
            />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight text-content-primary">{match.homeClub.name}</p>
              <p className="truncate text-xs leading-tight text-content-muted">{match.homeClub.fullName}</p>
            </div>
          </div>

          <span className="mx-1 shrink-0 font-display text-sm text-content-muted">VS</span>

          <div className="flex min-w-0 items-center gap-3">
            <TeamCrest
              club={match.awayClub}
              size={44}
              className="drop-shadow-[0_8px_16px_rgba(2,8,20,0.6)]"
            />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight text-content-primary">{match.awayClub.name}</p>
              <p className="truncate text-xs leading-tight text-content-muted">{match.awayClub.fullName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sede */}
      <div className="ml-5 w-[178px] shrink-0">
        <div className="flex items-center gap-2">
          <FaRegClock className="text-[13px] text-brand-300" />
          <span className="text-[13px] font-semibold text-content-primary">{match.time}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-content-secondary">{match.stadium}</p>
        <p className="truncate text-[11px] text-content-muted">{match.city}</p>
      </div>

      {/* Estado + acciones */}
      <div className="ml-8 flex shrink-0 flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', hasActa ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400')} />
          <span className={cn('text-xs font-semibold', hasActa ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400')}>
            {hasActa ? 'Acta disponible' : 'Sin acta'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/panel/partidos/${match.id}/acta`}
            className="flex h-9 w-[150px] items-center justify-center gap-2 rounded-lg border border-border-action bg-surface-control text-[13px] font-semibold text-content-primary transition-colors hover:bg-surface-control-hover"
          >
            <FaFileLines className="text-xs" />
            Ver actas
          </Link>
          <button
            type="button"
            className="flex h-9 w-[150px] items-center justify-center gap-2 rounded-lg bg-action text-[13px] font-semibold text-white transition-colors hover:bg-action-hover"
          >
            <FaClipboardList className="text-xs" />
            Tablero Árbitro
          </button>
        </div>
      </div>
    </motion.div>
  )
}
