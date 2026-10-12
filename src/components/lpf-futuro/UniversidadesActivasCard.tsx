import { FaPlus } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import type { LpfUniversityStat } from '@/types'
import { UniversityCrest } from './UniversityCrest'

interface UniversidadesActivasCardProps {
  universities: LpfUniversityStat[]
  total: number
}

export function UniversidadesActivasCard({ universities, total }: UniversidadesActivasCardProps) {
  const remaining = Math.max(0, total - universities.length)

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Universidades activas</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Ver todos
        </button>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3">
        {universities.map(({ university, count }) => (
          <div
            key={university.id}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-line/60 bg-surface-raised px-2 py-3 text-center"
          >
            <UniversityCrest university={university} size={34} />
            <span className="text-xs font-semibold text-content-primary">{university.name}</span>
            <span className="text-[11px] text-content-faint">{count} postulados</span>
          </div>
        ))}

        {remaining > 0 && (
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line px-2 py-3 text-center">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-surface-track text-brand-400">
              <FaPlus className="text-sm" />
            </span>
            <span className="text-xs font-semibold text-content-secondary">+{remaining} más</span>
            <span className="text-[11px] text-content-faint">universidades</span>
          </div>
        )}
      </div>
    </Card>
  )
}
