import type { ReactNode } from 'react'
import {
  FaBookmark,
  FaCalendarDays,
  FaChevronRight,
  FaCircleCheck,
  FaClock,
  FaLocationDot,
  FaUsers,
} from 'react-icons/fa6'
import { UniversityCrest } from '@/components/lpf-futuro/UniversityCrest'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatDocDate } from '@/lib/format'
import type { LpfVacante } from '@/types'
import { VacanteAreaBadge } from './VacanteAreaBadge'
import { VacanteTypeBadge } from './VacanteTypeBadge'

interface VacanteDetailCardProps {
  vacante: LpfVacante
  similares: LpfVacante[]
  onSelect: (id: string) => void
  onApply: () => void
}

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-xs font-semibold uppercase tracking-wide text-content-primary', className)}>
      {children}
    </h3>
  )
}

function Divider() {
  return <div className="border-t border-line/60" />
}

function DetailStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-faint bg-surface-raised/40 p-2.5">
      <div className="flex items-center gap-1.5 text-content-faint">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-content-primary">{value}</p>
    </div>
  )
}

export function VacanteDetailCard({ vacante, similares, onSelect, onApply }: VacanteDetailCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-start gap-3">
        <TeamCrest club={vacante.club} size={56} />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-tight text-content-primary">{vacante.role}</h2>
          <p className="text-sm text-content-faint">{vacante.club.name}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <VacanteAreaBadge area={vacante.area} />
            {vacante.type && <VacanteTypeBadge type={vacante.type} />}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            aria-label="Guardar vacante"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-faint bg-surface-input text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
          >
            <FaBookmark className="text-xs" />
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-action px-3.5 text-xs font-semibold text-white shadow-action transition-colors hover:bg-action-hover"
          >
            Postularme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <DetailStat icon={<FaLocationDot />} label="Modalidad" value={vacante.modality} />
        <DetailStat icon={<FaClock />} label="Duración" value={vacante.durationLabel ?? '—'} />
        <DetailStat
          icon={<FaCalendarDays />}
          label="Fecha límite"
          value={vacante.deadline ? formatDocDate(vacante.deadline).toLowerCase() : '—'}
        />
        <DetailStat
          icon={<FaUsers />}
          label="Postulaciones"
          value={typeof vacante.applicants === 'number' ? String(vacante.applicants) : '—'}
        />
      </div>

      <Divider />

      <div>
        <SectionTitle>Descripción</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">{vacante.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <SectionTitle>Requisitos</SectionTitle>
          <ul className="mt-2 space-y-2">
            {(vacante.requirements ?? []).map((requirement) => (
              <li key={requirement} className="flex items-start gap-2 text-sm text-content-secondary">
                <FaCircleCheck className="mt-0.5 shrink-0 text-xs text-emerald-400" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Responsabilidades</SectionTitle>
          <ul className="mt-2 space-y-2">
            {(vacante.responsibilities ?? []).map((responsibility) => (
              <li key={responsibility} className="flex items-start gap-2 text-sm text-content-secondary">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-content-faint" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Divider />

      <div>
        <SectionTitle>Universidades elegibles</SectionTitle>
        <ul className="mt-2 space-y-2">
          {(vacante.eligibleUniversities ?? []).map((university) => (
            <li
              key={university.id}
              className="flex items-center gap-2.5 rounded-lg border border-border-faint bg-surface-raised/50 px-3 py-2"
            >
              <UniversityCrest university={university} size={28} rounded="md" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-content-primary">
                {university.name}
              </span>
              <Badge tone="brand">Universidad elegible</Badge>
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      <div className="flex items-center justify-between gap-3">
        <SectionTitle>Vacantes similares</SectionTitle>
        <button
          type="button"
          className="group flex items-center gap-1 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300"
        >
          Ver todas
          <FaChevronRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {similares.map((similar) => (
          <button
            key={similar.id}
            type="button"
            onClick={() => onSelect(similar.id)}
            className="group flex flex-col items-start gap-2 rounded-xl border border-border-faint bg-surface-raised/40 p-3 text-left transition-colors hover:border-brand-600/50 hover:bg-surface-raised"
          >
            <TeamCrest club={similar.club} size={28} />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-content-primary">{similar.role}</p>
              <p className="truncate text-[11px] text-content-faint">{similar.club.name}</p>
            </div>
            <VacanteAreaBadge area={similar.area} />
          </button>
        ))}
      </div>
    </Card>
  )
}
