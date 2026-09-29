import { motion } from 'framer-motion'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { Skeleton } from '@/components/ui/Skeleton'
import { fadeUp, stagger } from '@/lib/motion'
import type { Team } from '@/types'

interface TeamsCardGridProps {
  teams?: Team[]
  isLoading: boolean
}

export function TeamsCardGrid({ teams, isLoading }: TeamsCardGridProps) {
  if (isLoading || !teams) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-card" />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={stagger(0.04)}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {teams.map((team) => (
        <motion.article
          key={team.id}
          variants={fadeUp}
          className="rounded-card border border-border-strong bg-surface-card-deep p-4 shadow-card"
        >
          <div className="flex items-center gap-3">
            <TeamCrest club={team.club} size={44} />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight text-content-primary">{team.club.name}</p>
              <p className="truncate text-xs leading-tight text-content-muted">{team.club.fullName}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border-faint pt-3">
            <span className="truncate text-xs text-content-muted">{team.competition}</span>
            <span className="shrink-0 font-display text-lg text-content-primary">
              {team.points} <span className="text-[10px] font-medium text-content-faint">PTS</span>
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="truncate text-xs text-content-muted">
              {team.city} · {team.stadium}
            </span>
            <span className="ml-3 flex shrink-0 items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Activo</span>
            </span>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}
