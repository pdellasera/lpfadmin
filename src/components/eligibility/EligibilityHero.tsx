import { motion } from 'framer-motion'
import { PillTabs, type PillTabOption } from '@/components/ui/PillTabs'
import { fadeUp, stagger } from '@/lib/motion'
import type { EligibilityCounts, EligibilitySeverityTabId } from '@/types'

interface EligibilityHeroProps {
  tab: EligibilitySeverityTabId
  onTabChange: (value: EligibilitySeverityTabId) => void
  counts: EligibilityCounts
}

const COUNTER_CLASS = 'text-content-muted dark:text-white/60'

export function EligibilityHero({ tab, onTabChange, counts }: EligibilityHeroProps) {
  const options: PillTabOption<EligibilitySeverityTabId>[] = [
    {
      id: 'todas',
      label: (
        <>
          Todas <span className={COUNTER_CLASS}>({counts.total})</span>
        </>
      ),
    },
    {
      id: 'critica',
      label: (
        <>
          Críticas <span className={COUNTER_CLASS}>({counts.criticas})</span>
        </>
      ),
    },
    {
      id: 'advertencia',
      label: (
        <>
          Advertencias <span className={COUNTER_CLASS}>({counts.advertencias})</span>
        </>
      ),
    },
    {
      id: 'info',
      label: (
        <>
          Informativas <span className={COUNTER_CLASS}>({counts.informativas})</span>
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
            ALERTAS ELEGIBLES
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
          >
            ELEGIBILIDAD · CONTROL PREVENTIVO
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="mt-4">
          <PillTabs value={tab} onChange={onTabChange} options={options} dividers />
        </motion.div>
      </div>
    </motion.section>
  )
}
