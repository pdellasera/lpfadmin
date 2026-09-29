import { motion } from 'framer-motion'
import { PillTabs, type PillTabOption } from '@/components/ui/PillTabs'
import { fadeUp, stagger } from '@/lib/motion'
import type { PlayerPositionCounts, PlayerPositionTabId } from '@/types'

interface PlayersHeroProps {
  tab: PlayerPositionTabId
  onTabChange: (value: PlayerPositionTabId) => void
  counts: PlayerPositionCounts
}

const COUNTER_CLASS = 'text-content-muted dark:text-white/60'

export function PlayersHero({ tab, onTabChange, counts }: PlayersHeroProps) {
  const options: PillTabOption<PlayerPositionTabId>[] = [
    {
      id: 'todos',
      label: (
        <>
          Todos los jugadores <span className={COUNTER_CLASS}>({counts.total})</span>
        </>
      ),
    },
    {
      id: 'porteros',
      label: (
        <>
          Porteros <span className={COUNTER_CLASS}>({counts.porteros})</span>
        </>
      ),
    },
    {
      id: 'defensas',
      label: (
        <>
          Defensas <span className={COUNTER_CLASS}>({counts.defensas})</span>
        </>
      ),
    },
    {
      id: 'mediocampistas',
      label: (
        <>
          Mediocampistas <span className={COUNTER_CLASS}>({counts.mediocampistas})</span>
        </>
      ),
    },
    {
      id: 'delanteros',
      label: (
        <>
          Delanteros <span className={COUNTER_CLASS}>({counts.delanteros})</span>
        </>
      ),
    },
  ]

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
        className="absolute inset-0 hidden h-full w-full object-cover object-center dark:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/70 to-scrim/25 dark:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-scrim/60 via-transparent to-transparent dark:block" />

      <div className="relative flex min-h-[210px] flex-col justify-between px-6 py-6 lg:px-7">
        <div>
          <motion.h1
            variants={fadeUp}
            className="bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text font-display text-5xl leading-[0.95] text-transparent dark:from-white dark:to-slate-300 xl:text-[56px]"
          >
            JUGADORES
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
          >
            TALENTO QUE HACE HISTORIA
          </motion.p>
        </div>

        <motion.div variants={fadeUp}>
          <PillTabs value={tab} onChange={onTabChange} options={options} dividers />
        </motion.div>
      </div>
    </motion.section>
  )
}
