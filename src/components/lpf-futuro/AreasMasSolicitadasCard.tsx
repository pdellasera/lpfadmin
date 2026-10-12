import type { IconType } from 'react-icons'
import { FaBullhorn, FaChartLine, FaComments, FaEllipsis, FaGears, FaHeartPulse } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import type { LpfAreaDemand } from '@/types'

const AREA_ICONS: Record<string, IconType> = {
  analisis: FaChartLine,
  marketing: FaBullhorn,
  fisioterapia: FaHeartPulse,
  comunicacion: FaComments,
  operaciones: FaGears,
  otros: FaEllipsis,
}

interface AreasMasSolicitadasCardProps {
  areas: LpfAreaDemand[]
}

export function AreasMasSolicitadasCard({ areas }: AreasMasSolicitadasCardProps) {
  const max = Math.max(...areas.map((area) => area.percent), 1)

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Áreas más solicitadas</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Ver todos
        </button>
      </div>

      <ul className="mt-3 flex-1 space-y-3">
        {areas.map((area) => {
          const Icon = AREA_ICONS[area.id] ?? FaChartLine
          return (
            <li key={area.id} className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-brand-400">
                <Icon className="text-xs" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-content-secondary">{area.label}</span>
              <div className="relative h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-surface-track">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                  style={{ width: `${Math.round((area.percent / max) * 100)}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-content-primary">
                {area.percent}%
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
