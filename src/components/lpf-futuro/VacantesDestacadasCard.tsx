import { FaBriefcase } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { TeamCrest } from '@/components/ui/TeamCrest'
import type { LpfVacante } from '@/types'

interface VacantesDestacadasCardProps {
  vacantes: LpfVacante[]
}

export function VacantesDestacadasCard({ vacantes }: VacantesDestacadasCardProps) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Vacantes destacadas</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Ver todos
        </button>
      </div>

      <ul className="mt-3 flex-1 divide-y divide-line/50">
        {vacantes.map((vacante) => (
          <li key={vacante.id} className="flex items-center gap-3 py-3">
            <TeamCrest club={vacante.club} size={34} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-content-primary">{vacante.role}</p>
              <p className="truncate text-xs text-content-faint">{vacante.club.name}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-surface-raised px-2 py-0.5 text-[11px] font-semibold text-content-secondary">
                  <FaBriefcase className="text-[9px] text-brand-400" />
                  Área: {vacante.area}
                </span>
                <span className="inline-flex items-center rounded-md bg-surface-raised px-2 py-0.5 text-[11px] font-semibold text-content-secondary">
                  Modalidad: {vacante.modality}
                </span>
              </div>
            </div>
            <span className="shrink-0 text-xs font-medium text-content-faint">{vacante.postedLabel}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
