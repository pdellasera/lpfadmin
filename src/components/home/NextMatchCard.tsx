import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarDays, FaClock, FaLocationDot } from 'react-icons/fa6'
import { useNextMatch } from '@/hooks/useHomeQueries'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { formatShortDate } from '@/lib/format'
import { fadeUp } from '@/lib/motion'

export function NextMatchCard() {
  const { data: match, isLoading } = useNextMatch()

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="h-full">
      <Card className="relative flex h-full flex-col overflow-hidden p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-[radial-gradient(closest-side,rgb(46_139_255_/_0.20),transparent)]"
        />

        <div className="relative flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Próximo partido</h2>
          <Badge tone="brand">Jornada {match?.round ?? ''}</Badge>
        </div>

        {isLoading || !match ? (
          <div className="relative flex flex-1 flex-col gap-3 py-4">
            <div className="flex items-end justify-center gap-6">
              <Skeleton className="h-20 w-20 rounded-2xl" />
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-20 w-20 rounded-2xl" />
            </div>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <div className="relative flex flex-1 items-center justify-center gap-4 py-3">
              <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-content-faint">Local</span>
                <TeamCrest club={match.homeClub} size={76} className="drop-shadow-[0_10px_20px_rgba(2,8,20,0.7)]" />
                <span className="w-full truncate text-center text-sm font-bold text-content-primary">{match.homeClub.name}</span>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-700/80 font-display text-sm text-content-secondary ring-1 ring-line">
                VS
              </span>

              <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-content-faint">Visitante</span>
                <TeamCrest club={match.awayClub} size={76} className="drop-shadow-[0_10px_20px_rgba(2,8,20,0.7)]" />
                <span className="w-full truncate text-center text-sm font-bold text-content-primary">{match.awayClub.name}</span>
              </div>
            </div>

            <div className="relative grid grid-cols-3 divide-x divide-line/60 overflow-hidden rounded-xl border border-line/60 bg-ink-900/50">
              <div className="flex min-w-0 flex-col items-center gap-1 px-2 py-2.5 text-center">
                <FaCalendarDays className="text-xs text-brand-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">Fecha</span>
                <span className="truncate text-xs font-semibold text-content-primary">{formatShortDate(match.date)}</span>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-1 px-2 py-2.5 text-center">
                <FaClock className="text-xs text-brand-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">Hora</span>
                <span className="truncate text-xs font-semibold text-content-primary">{match.time}</span>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-1 px-2 py-2.5 text-center">
                <FaLocationDot className="text-xs text-brand-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">Estadio</span>
                <span className="truncate text-xs font-semibold text-content-primary" title={match.stadium}>
                  {match.stadium}
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label={`Ver detalles del partido ${match.homeClub.name} vs ${match.awayClub.name}`}
              className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-500"
            >
              Ver detalles <FaArrowRight className="text-xs" />
            </button>
          </>
        )}
      </Card>
    </motion.div>
  )
}
