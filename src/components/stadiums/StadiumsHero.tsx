import { motion } from 'framer-motion'
import { PillTabs, type PillTabOption } from '@/components/ui/PillTabs'
import { fadeUp, stagger } from '@/lib/motion'
import type { StadiumCounts, StadiumRegionId } from '@/types'

interface StadiumsHeroProps {
  tab: StadiumRegionId
  onTabChange: (value: StadiumRegionId) => void
  counts: StadiumCounts
}

const COUNTER_CLASS = 'text-content-muted dark:text-white/60'

export function StadiumsHero({ tab, onTabChange, counts }: StadiumsHeroProps) {
  const options: PillTabOption<StadiumRegionId>[] = [
    {
      id: 'todos',
      label: (
        <>
          Todos <span className={COUNTER_CLASS}>({counts.total})</span>
        </>
      ),
    },
    {
      id: 'capital',
      label: (
        <>
          Ciudad de Panamá <span className={COUNTER_CLASS}>({counts.capital})</span>
        </>
      ),
    },
    {
      id: 'occidente',
      label: (
        <>
          Occidente <span className={COUNTER_CLASS}>({counts.occidente})</span>
        </>
      ),
    },
    {
      id: 'azuero',
      label: (
        <>
          Azuero <span className={COUNTER_CLASS}>({counts.azuero})</span>
        </>
      ),
    },
    {
      id: 'oriente',
      label: (
        <>
          Oriente <span className={COUNTER_CLASS}>({counts.oriente})</span>
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
        className="absolute inset-0 hidden h-full w-full object-cover object-[center_30%] dark:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/70 to-scrim/25 dark:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-scrim/60 via-transparent to-transparent dark:block" />

      <div className="relative flex min-h-[158px] flex-col justify-between px-6 py-5 lg:px-7 lg:py-5">
        <div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl leading-[0.95] text-content-primary dark:text-white sm:text-5xl xl:text-[3.5rem]"
          >
            ESTADIOS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
          >
            DONDE SE VIVE EL FÚTBOL
          </motion.p>
        </div>

        <motion.div variants={fadeUp}>
          <PillTabs value={tab} onChange={onTabChange} options={options} dividers />
        </motion.div>
      </div>
    </motion.section>
  )
}
