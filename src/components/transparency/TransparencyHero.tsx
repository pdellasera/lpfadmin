import { motion } from 'framer-motion'
import { FaCalendarDays, FaChevronDown, FaDownload } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { SEASONS } from '@/providers/SeasonContext'
import { fadeUp, stagger } from '@/lib/motion'
import { Breadcrumb } from './Breadcrumb'
import { TransparencyTabs } from './TransparencyTabs'
import type { TransparencyTabId } from '@/types'

interface TransparencyHeroProps {
  period: string
  onPeriodChange: (period: string) => void
  tab: TransparencyTabId
  onTabChange: (tab: TransparencyTabId) => void
}

export function TransparencyHero({ period, onPeriodChange, tab, onTabChange }: TransparencyHeroProps) {
  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-brand-700/15 blur-3xl"
      />

      <div className="relative">
        <motion.div variants={fadeUp}>
          <Breadcrumb items={['Inicio', 'Transparencia']} />
        </motion.div>

        <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <motion.h1
              variants={fadeUp}
              className="bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text font-display text-4xl leading-[0.95] text-transparent dark:from-white dark:to-slate-300 sm:text-5xl xl:text-[3.5rem]"
            >
              TRANSPARENCIA
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-2 max-w-xl text-sm text-content-secondary sm:text-base">
              Gestión abierta, datos claros, un fútbol más fuerte
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-end gap-2.5">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-content-faint">
                Periodo
              </span>
              <span className="relative flex h-[42px] w-40 items-center gap-2 rounded-xl border border-border-faint bg-surface-input px-3 transition-colors focus-within:border-brand-600">
                <FaCalendarDays className="shrink-0 text-sm text-content-faint" />
                <select
                  value={period}
                  onChange={(event) => onPeriodChange(event.target.value)}
                  aria-label="Periodo"
                  className="h-full flex-1 appearance-none bg-transparent pr-6 text-sm font-semibold text-content-primary focus:outline-none"
                >
                  {SEASONS.map((item) => (
                    <option key={item} value={item} className="bg-ink-800">
                      Año {item}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 text-xs text-content-faint" />
              </span>
            </label>

            <Button className="h-[42px]">
              <FaDownload /> Exportar informe
            </Button>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-5">
          <TransparencyTabs value={tab} onChange={onTabChange} />
        </motion.div>
      </div>
    </motion.section>
  )
}
