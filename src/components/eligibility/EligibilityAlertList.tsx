import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { fadeUp, stagger } from '@/lib/motion'
import { EligibilityAlertCard } from './EligibilityAlertCard'
import type { EligibilityAlert } from '@/types'

interface EligibilityAlertListProps {
  alerts: EligibilityAlert[]
  isLoading: boolean
  total: number
}

export function EligibilityAlertList({ alerts, isLoading, total }: EligibilityAlertListProps) {
  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="flex h-full flex-col p-4">
        <SectionHeader title={`Alertas de elegibilidad (${total})`} />

        {isLoading ? (
          <div className="mt-3 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-xl" />
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="No hay alertas" description="Ninguna alerta coincide con los filtros seleccionados." />
          </div>
        ) : (
          <motion.div variants={stagger(0.05)} initial="hidden" animate="visible" className="mt-3 space-y-3">
            {alerts.map((alert) => (
              <EligibilityAlertCard key={alert.id} alert={alert} />
            ))}
          </motion.div>
        )}
      </Card>
    </motion.section>
  )
}
