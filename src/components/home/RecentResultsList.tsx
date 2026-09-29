import { motion } from 'framer-motion'
import { FaCalendarDays } from 'react-icons/fa6'
import { useRecentResults } from '@/hooks/useHomeQueries'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { formatShortDate } from '@/lib/format'
import { fadeUp, stagger } from '@/lib/motion'

export function RecentResultsList() {
  const { data: results, isLoading } = useRecentResults()

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="h-full p-4">
        <SectionHeader
          title="Últimos resultados"
          icon={<FaCalendarDays />}
          linkLabel="Todos"
          linkTo="/panel/partidos"
        />

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          animate="visible"
          className="mt-3 divide-y divide-line/50"
        >
          {isLoading || !results
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="py-1.5">
                  <Skeleton className="h-10 w-full" />
                </li>
              ))
            : results.map((result) => (
                <motion.li
                  key={result.id}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 py-1.5"
                >
                  <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5">
                    <span className="truncate text-sm font-medium text-content-secondary">
                      {result.homeClub.name}
                    </span>
                    <TeamCrest club={result.homeClub} size={22} />
                  </div>

                  <div className="shrink-0 text-center">
                    <div className="rounded-md bg-ink-700 px-2 py-0.5 text-sm font-bold text-content-primary">
                      {result.homeScore} - {result.awayScore}
                    </div>
                    <div className="mt-0.5 text-[10px] text-content-faint">
                      {formatShortDate(result.date)}
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <TeamCrest club={result.awayClub} size={22} />
                    <span className="truncate text-sm font-medium text-content-secondary">
                      {result.awayClub.name}
                    </span>
                  </div>
                </motion.li>
              ))}
        </motion.ul>
      </Card>
    </motion.section>
  )
}
