import { motion } from 'framer-motion'
import { MatchStatusTabs } from './MatchStatusTabs'
import { fadeUp, stagger } from '@/lib/motion'
import type { MatchStatusTabId } from '@/types'

interface MatchesHeroProps {
  status: MatchStatusTabId
  onStatusChange: (value: MatchStatusTabId) => void
}

export function MatchesHero({ status, onStatusChange }: MatchesHeroProps) {
  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
    >
      <img
        src="/images/partido-hero.png"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover object-top dark:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/70 to-scrim/25 dark:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-scrim/60 via-transparent to-transparent dark:block" />

      <div className="relative flex min-h-[158px] flex-col justify-between px-6 py-5 lg:px-7 lg:py-5">
        <div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl leading-[0.95] text-content-primary dark:text-white sm:text-5xl xl:text-[3.5rem]"
          >
            PARTIDOS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
          >
            VIVE LA PASIÓN DEL FÚTBOL PANAMEÑO
          </motion.p>
        </div>

        <motion.div variants={fadeUp}>
          <MatchStatusTabs value={status} onChange={onStatusChange} />
        </motion.div>
      </div>
    </motion.section>
  )
}
