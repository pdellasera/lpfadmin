import { motion } from 'framer-motion'
import { FaTableList } from 'react-icons/fa6'
import { useStandings } from '@/hooks/useHomeQueries'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { fadeLeft, fadeUp, stagger } from '@/lib/motion'

export function StandingsTable() {
  const { data: rows, isLoading } = useStandings()

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="h-full p-4">
        <SectionHeader
          title="Tabla de posiciones"
          icon={<FaTableList />}
          linkLabel="Ver completa"
          linkTo="/panel/competencias"
        />

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[430px] text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-content-faint">
                <th className="py-1.5 pr-2 text-left font-medium">#</th>
                <th className="py-1.5 pr-2 text-left font-medium">Equipo</th>
                <th className="px-1 py-1.5 text-center font-medium">PJ</th>
                <th className="px-1 py-1.5 text-center font-medium">G</th>
                <th className="px-1 py-1.5 text-center font-medium">E</th>
                <th className="px-1 py-1.5 text-center font-medium">P</th>
                <th className="px-1 py-1.5 text-center font-medium">DG</th>
                <th className="py-1.5 pl-2 text-right font-medium">PTS</th>
              </tr>
            </thead>
            <motion.tbody variants={stagger(0.05)} initial="hidden" animate="visible">
              {isLoading || !rows
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-line/50 last:border-0">
                      <td colSpan={8} className="py-2">
                        <Skeleton className="h-6 w-full" />
                      </td>
                    </tr>
                  ))
                : rows.map((row) => (
                    <motion.tr
                      key={row.club.id}
                      variants={fadeLeft}
                      className={cn(
                        'border-b border-line/50 last:border-0',
                        row.position === 1 && 'bg-brand-600/10',
                      )}
                    >
                      <td className="py-1.5 pr-2">
                        <span
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold',
                            row.position === 1 ? 'bg-brand-600 text-white' : 'text-content-faint',
                          )}
                        >
                          {row.position}
                        </span>
                      </td>
                      <td className="py-1.5 pr-2">
                        <div className="flex items-center gap-2">
                          <TeamCrest club={row.club} size={24} />
                          <span className="font-semibold text-content-primary">{row.club.name}</span>
                        </div>
                      </td>
                      <td className="px-1 py-1.5 text-center text-content-muted">{row.played}</td>
                      <td className="px-1 py-1.5 text-center text-content-muted">{row.won}</td>
                      <td className="px-1 py-1.5 text-center text-content-muted">{row.drawn}</td>
                      <td className="px-1 py-1.5 text-center text-content-muted">{row.lost}</td>
                      <td
                        className={cn(
                          'px-1 py-1.5 text-center font-semibold',
                          row.goalDifference >= 0 ? 'text-brand-600 dark:text-brand-300' : 'text-rose-400',
                        )}
                      >
                        {row.goalDifference >= 0 ? `+${row.goalDifference}` : row.goalDifference}
                      </td>
                      <td className="py-1.5 pl-2 text-right font-bold text-content-primary">{row.points}</td>
                    </motion.tr>
                  ))}
            </motion.tbody>
          </table>
        </div>
      </Card>
    </motion.section>
  )
}
