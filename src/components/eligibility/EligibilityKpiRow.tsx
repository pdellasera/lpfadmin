import { FaCircleCheck, FaCircleExclamation, FaClock, FaListCheck } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { StatChip } from '@/components/ui/StatChip'
import type { EligibilityCounts } from '@/types'

export function EligibilityKpiRow({ counts }: { counts: EligibilityCounts }) {
  return (
    <Card className="grid grid-cols-2 gap-3 p-4 xl:grid-cols-4">
      <StatChip icon={<FaListCheck className="text-sm" />} value={counts.activas} label="Alertas activas" />
      <StatChip icon={<FaCircleExclamation className="text-sm" />} value={counts.criticas} label="Críticas" />
      <StatChip icon={<FaClock className="text-sm" />} value={counts.porVencer} label="Con plazo por vencer" />
      <StatChip icon={<FaCircleCheck className="text-sm" />} value={counts.resueltas} label="Resueltas" />
    </Card>
  )
}
