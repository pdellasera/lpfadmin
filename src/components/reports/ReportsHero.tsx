import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/transparency/Breadcrumb'
import { fadeUp, stagger } from '@/lib/motion'

export function ReportsHero() {
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
          <Breadcrumb items={['Inicio', 'Reportes']} />
        </motion.div>

        <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <motion.h1
              variants={fadeUp}
              className="bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text font-display text-4xl leading-[0.95] text-transparent dark:from-white dark:to-slate-300 sm:text-5xl xl:text-[3.5rem]"
            >
              REPORTES
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-2 max-w-xl text-sm text-content-secondary sm:text-base">
              Reportes prediseñados y ad hoc · Exportables a PDF, Excel y CSV
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-end">
            <Button className="h-[42px]">
              <FaPlus className="text-sm" /> Reporte personalizado
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}