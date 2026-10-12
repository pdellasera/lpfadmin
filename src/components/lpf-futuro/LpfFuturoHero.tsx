import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/transparency/Breadcrumb'
import { PillTabs, type PillTabOption } from '@/components/ui/PillTabs'
import { fadeUp, stagger } from '@/lib/motion'
import type { LpfFuturoTabId } from '@/types'

const TABS: PillTabOption<LpfFuturoTabId>[] = [
  { id: 'vacantes', label: 'Vacantes' },
  { id: 'postulados', label: 'Postulados' },
  { id: 'universidades', label: 'Universidades' },
  { id: 'equipos', label: 'Equipos' },
  { id: 'resumen', label: 'Resumen' },
]

interface LpfFuturoHeroProps {
  tab: LpfFuturoTabId
  onTabChange: (tab: LpfFuturoTabId) => void
}

export function LpfFuturoHero({ tab, onTabChange }: LpfFuturoHeroProps) {
  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-brand-700/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="relative px-6 py-6 lg:px-7">
        <motion.div variants={fadeUp}>
          <Breadcrumb items={['Inicio', 'LPF Futuro']} />
        </motion.div>

        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl leading-[0.95] text-content-primary dark:text-white sm:text-5xl xl:text-[3.5rem]"
            >
              LPF Futuro
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-2 max-w-xl text-sm text-content-secondary sm:text-base">
              Conectando talento universitario con el fútbol panameño
            </motion.p>
          </div>

          <motion.p
            variants={fadeUp}
            className="shrink-0 text-right text-[11px] font-bold uppercase leading-relaxed tracking-[0.25em] text-content-muted"
          >
            Formación
            <br />
            Oportunidades
            <br />
            El futuro del fútbol
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="mt-6 border-t border-line/60 pt-4">
          <PillTabs value={tab} onChange={onTabChange} options={TABS} />
        </motion.div>
      </div>
    </motion.section>
  )
}
