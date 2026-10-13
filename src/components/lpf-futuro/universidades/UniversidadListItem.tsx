import { FaBriefcase, FaChevronRight, FaFileLines, FaLocationDot, FaUserGroup } from 'react-icons/fa6'
import { UniversidadEstadoBadge } from '@/components/lpf-futuro/UniversidadEstadoBadge'
import { UniversityCrest } from '@/components/lpf-futuro/UniversityCrest'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import type { LpfUniversity } from '@/types'

interface UniversidadListItemProps {
  university: LpfUniversity
  selected: boolean
  onSelect: (id: string) => void
}

export function UniversidadListItem({ university, selected, onSelect }: UniversidadListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(university.id)}
      className={cn(
        'flex min-h-[76px] w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors',
        selected
          ? 'border-brand-600/70 bg-surface-raised ring-1 ring-brand-600/40'
          : 'border-transparent hover:border-border-faint hover:bg-surface-raised/60',
      )}
    >
      <UniversityCrest university={university} size={44} className="mt-0.5" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-content-primary">{university.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-content-faint">
          <FaLocationDot className="shrink-0 text-[10px]" />
          <span className="truncate">{university.ciudad}</span>
        </p>
      </div>

      <div className="hidden shrink-0 items-center gap-4 md:flex">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-content-faint">
          <FaUserGroup className="text-[11px]" />
          <span>
            <span className="font-semibold text-content-secondary">{formatNumber(university.estudiantes ?? 0)}</span> estudiantes
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-content-faint">
          <FaBriefcase className="text-[11px]" />
          <span>
            <span className="font-semibold text-content-secondary">{university.vacantes ?? 0}</span> vacantes
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-content-faint">
          <FaFileLines className="text-[11px]" />
          <span>
            <span className="font-semibold text-content-secondary">{university.postulados ?? 0}</span> postulados
          </span>
        </span>
      </div>

      <UniversidadEstadoBadge estado={university.estado} />

      <FaChevronRight className={cn('shrink-0 text-xs', selected ? 'text-brand-400' : 'text-content-faint/60')} />
    </button>
  )
}
