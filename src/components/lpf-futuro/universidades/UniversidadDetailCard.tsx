import { useState } from 'react'
import { FaGlobe, FaLocationDot, FaUpRightFromSquare } from 'react-icons/fa6'
import { UniversidadEstadoBadge } from '@/components/lpf-futuro/UniversidadEstadoBadge'
import { UniversityCrest } from '@/components/lpf-futuro/UniversityCrest'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import type { LpfPostulante, LpfUniversity, LpfVacante } from '@/types'
import {
  UniversidadEstudiantesTab,
  UniversidadPostuladosTab,
  UniversidadResumenTab,
  UniversidadReviewsTab,
  UniversidadVacantesTab,
} from './UniversidadDetailTabs'
import { UniversidadVacantesRecientesCard } from './UniversidadVacantesRecientesCard'

type DetailTab = 'resumen' | 'vacantes' | 'postulados' | 'estudiantes' | 'reviews'

const TABS: { id: DetailTab; label: string }[] = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'vacantes', label: 'Vacantes' },
  { id: 'postulados', label: 'Postulados' },
  { id: 'estudiantes', label: 'Estudiantes' },
  { id: 'reviews', label: 'Reviews' },
]

interface UniversidadDetailCardProps {
  universidad: LpfUniversity
  vacantes: LpfVacante[]
  postulantes: LpfPostulante[]
}

export function UniversidadDetailCard({ universidad, vacantes, postulantes }: UniversidadDetailCardProps) {
  const [tab, setTab] = useState<DetailTab>('resumen')
  const [toast, setToast] = useState('')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <Card className="relative flex h-full flex-col gap-4 p-4">
      <div className="flex items-start gap-3">
        <span className="shrink-0 rounded-full bg-surface-raised p-1 ring-1 ring-line">
          <UniversityCrest university={universidad} size={56} rounded="full" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-tight text-content-primary">{universidad.name}</h2>
        </div>
        <button
          type="button"
          onClick={() => notify('Perfil externo en construcción')}
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-action px-3.5 text-xs font-semibold text-white shadow-action transition-colors hover:bg-action-hover"
        >
          Ver perfil
          <FaUpRightFromSquare className="text-[10px]" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-content-faint">
        <UniversidadEstadoBadge estado={universidad.estado} />
        <span className="inline-flex items-center gap-1.5">
          <FaLocationDot className="text-[10px]" />
          {universidad.ciudad}
        </span>
        {universidad.website && (
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <FaGlobe className="shrink-0 text-[10px]" />
            <span className="truncate text-brand-400">{universidad.website.replace(/^https?:\/\//, '')}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 rounded-xl bg-surface-track p-1 ring-1 ring-border-faint">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'flex-1 rounded-lg px-1 py-2 text-[11px] font-semibold transition-colors',
              tab === item.id
                ? 'bg-action text-white shadow-tab'
                : 'text-content-secondary hover:bg-overlay-subtle hover:text-content-primary',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        {tab === 'resumen' && (
          <>
            <UniversidadResumenTab universidad={universidad} />
            {(universidad.vacantesRecientes?.length ?? 0) > 0 && (
              <div className="mt-5">
                <UniversidadVacantesRecientesCard
                  vacantes={universidad.vacantesRecientes ?? []}
                  onSeeAll={() => setTab('vacantes')}
                />
              </div>
            )}
          </>
        )}
        {tab === 'vacantes' && <UniversidadVacantesTab universidad={universidad} vacantes={vacantes} />}
        {tab === 'postulados' && <UniversidadPostuladosTab universidad={universidad} postulantes={postulantes} />}
        {tab === 'estudiantes' && <UniversidadEstudiantesTab universidad={universidad} />}
        {tab === 'reviews' && <UniversidadReviewsTab universidad={universidad} />}
      </div>

      {toast && (
        <div className="absolute bottom-3 right-3 rounded-lg bg-surface-deep px-3 py-2 text-xs font-semibold text-content-primary shadow-card ring-1 ring-border-strong">
          {toast}
        </div>
      )}
    </Card>
  )
}
