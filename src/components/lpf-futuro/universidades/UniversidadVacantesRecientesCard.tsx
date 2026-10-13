import { FaBriefcase } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import type { LpfUniversidadVacanteResumen } from '@/types'

interface UniversidadVacantesRecientesCardProps {
  vacantes: LpfUniversidadVacanteResumen[]
  onSeeAll: () => void
}

const TILE_TONES = [
  'bg-gradient-to-br from-brand-500 to-brand-700 text-white',
  'bg-gradient-to-br from-violet-500 to-violet-700 text-white',
  'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white',
]

export function UniversidadVacantesRecientesCard({ vacantes, onSeeAll }: UniversidadVacantesRecientesCardProps) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-3">
        <h3 className="text-sm font-semibold text-content-primary">Vacantes recientes</h3>
        <button
          type="button"
          onClick={onSeeAll}
          className="flex h-8 items-center rounded-lg border border-border-faint bg-surface-input px-3 text-xs font-semibold text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
        >
          Ver todas
        </button>
      </div>

      <ul>
        {vacantes.map((vacante, index) => (
          <li
            key={vacante.id}
            className={cn('flex items-center gap-3 px-4 py-3', index < vacantes.length - 1 && 'border-b border-line/60')}
          >
            <span
              className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm', TILE_TONES[index % TILE_TONES.length])}
            >
              <FaBriefcase />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-content-primary">{vacante.role}</span>
            <span className="hidden shrink-0 text-xs text-content-faint sm:block">{vacante.postedLabel}</span>
            <span className="shrink-0 whitespace-nowrap rounded-md bg-surface-raised px-2 py-1 text-[11px] font-semibold text-content-secondary ring-1 ring-inset ring-line">
              {vacante.postulados} postulados
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
