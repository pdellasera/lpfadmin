import { FaBookmark, FaBriefcase, FaClock } from 'react-icons/fa6'
import { UniversityCrest } from '@/components/lpf-futuro/UniversityCrest'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import type { LpfVacante } from '@/types'
import { VacanteAreaBadge } from './VacanteAreaBadge'
import { VacanteTypeBadge } from './VacanteTypeBadge'

interface VacanteListItemProps {
  vacante: LpfVacante
  selected: boolean
  onSelect: (id: string) => void
}

export function VacanteListItem({ vacante, selected, onSelect }: VacanteListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vacante.id)}
      className={cn(
        'flex min-h-[112px] w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors',
        selected
          ? 'border-brand-600/70 bg-surface-raised ring-1 ring-brand-600/40'
          : 'border-transparent hover:border-border-faint hover:bg-surface-raised/60',
      )}
    >
      <TeamCrest club={vacante.club} size={40} className="mt-0.5" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-content-primary">{vacante.role}</p>
            <p className="truncate text-xs text-content-faint">{vacante.club.name}</p>
          </div>
          <FaBookmark
            className={cn('shrink-0 text-xs', selected ? 'text-brand-400' : 'text-content-faint/60')}
          />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <VacanteAreaBadge area={vacante.area} />
          {vacante.type && <VacanteTypeBadge type={vacante.type} />}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-content-faint">
          {vacante.university && (
            <span className="inline-flex items-center gap-1.5">
              <UniversityCrest university={vacante.university} size={16} rounded="md" />
              <span className="truncate">{vacante.university.name}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <FaClock className="text-[10px] text-content-faint" />
            {vacante.postedLabel}
          </span>
          {typeof vacante.applicants === 'number' && (
            <span className="inline-flex items-center gap-1">
              <FaBriefcase className="text-[10px] text-content-faint" />
              {vacante.applicants} postulaciones
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
