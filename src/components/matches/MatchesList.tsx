import { motion } from 'framer-motion'
import { MatchRow } from './MatchRow'
import { Skeleton } from '@/components/ui/Skeleton'
import { stagger } from '@/lib/motion'
import type { MatchFixture } from '@/types'

interface MatchesListProps {
  matches?: MatchFixture[]
  isLoading: boolean
}

export function MatchesList({ matches, isLoading }: MatchesListProps) {
  if (isLoading || !matches) {
    return (
      <div className="space-y-1.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-[78px] w-full rounded-card" />
        ))}
      </div>
    )
  }

  return (
    <motion.div variants={stagger(0.05)} initial="hidden" animate="visible" className="space-y-1.5">
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </motion.div>
  )
}
