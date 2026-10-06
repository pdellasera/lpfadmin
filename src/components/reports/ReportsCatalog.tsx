import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import type { ReportsCatalog as ReportsCatalogType } from '@/types'
import { ReportsGroupSection } from './ReportsGroupSection'

interface ReportsCatalogProps {
  catalog: ReportsCatalogType
}

export function ReportsCatalog({ catalog }: ReportsCatalogProps) {
  return (
    <motion.div variants={stagger(0.06)} initial="hidden" animate="visible" className="space-y-7">
      {catalog.groups.map((group) => (
        <motion.div key={group.id} variants={fadeUp}>
          <ReportsGroupSection group={group} />
        </motion.div>
      ))}
    </motion.div>
  )
}