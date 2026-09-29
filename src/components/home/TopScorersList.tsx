import { motion } from 'framer-motion'
import { FaMedal } from 'react-icons/fa6'
import { GiSoccerBall } from 'react-icons/gi'
import { useTopScorers } from '@/hooks/useHomeQueries'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'

export function TopScorersList() {
  const { data: scorers, isLoading } = useTopScorers()

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="h-full p-4">
        <SectionHeader title="Goleadores" icon={<FaMedal />} linkLabel="Ver todos" linkTo="/panel/jugadores" />

        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          animate="visible"
          className="mt-3 space-y-0.5"
        >
          {isLoading || !scorers
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center gap-3 py-1">
                  <Skeleton className="h-10 w-full" />
                </li>
              ))
            : scorers.map((scorer, index) => (
                <motion.li
                  key={scorer.id}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-ink-700/50"
                >
                  <span
                    className={cn(
                      'w-5 shrink-0 text-center text-sm font-bold',
                      index === 0 ? 'text-brand-600 dark:text-brand-300' : 'text-content-faint',
                    )}
                  >
                    {index + 1}
                  </span>
                  <Avatar name={scorer.name} color={scorer.club.primaryColor} src={scorer.photoUrl} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-content-primary">{scorer.name}</p>
                    <p className="truncate text-xs text-content-faint">{scorer.club.name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-base font-bold text-content-primary">{scorer.goals}</span>
                    <GiSoccerBall className="text-sm text-brand-400" />
                  </div>
                </motion.li>
              ))}
        </motion.ul>
      </Card>
    </motion.section>
  )
}
