import type { ReactNode } from 'react'
import { FaBriefcase, FaEnvelope, FaFileLines, FaPhone, FaStar, FaUser, FaUserGroup } from 'react-icons/fa6'
import { PostuladosEstadoBadge } from '@/components/lpf-futuro/PostuladosEstadoBadge'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/cn'
import { formatDocDate, formatNumber } from '@/lib/format'
import type { LpfPostulante, LpfUniversity, LpfVacante } from '@/types'
import { VacanteAreaBadge } from '../vacantes/VacanteAreaBadge'

function ResumenStat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
      <span className="shrink-0 text-lg text-content-faint">{icon}</span>
      <span className="min-w-0">
        <span className="block text-base font-bold leading-tight text-content-primary">{value}</span>
        <span className="block truncate text-[11px] text-content-faint">{label}</span>
      </span>
    </div>
  )
}

export function UniversidadResumenTab({ universidad }: { universidad: LpfUniversity }) {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-content-secondary">{universidad.description}</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ResumenStat icon={<FaUserGroup />} value={formatNumber(universidad.estudiantes ?? 0)} label="Estudiantes" />
        <ResumenStat icon={<FaBriefcase />} value={String(universidad.vacantes ?? 0)} label="Vacantes activas" />
        <ResumenStat icon={<FaFileLines />} value={String(universidad.postulados ?? 0)} label="Postulados" />
        <ResumenStat icon={<FaStar className="text-amber-400" />} value={(universidad.rating ?? 0).toFixed(1)} label="Calificación" />
      </div>

      {(universidad.areas?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-content-primary">Áreas de interés</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(universidad.areas ?? []).map((area) => (
              <span
                key={area}
                className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-600 dark:text-violet-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {universidad.contacto && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-content-primary">Contacto</h4>
          <ul className="mt-2 space-y-2.5">
            <li className="flex items-start gap-2.5">
              <FaUser className="mt-0.5 shrink-0 text-xs text-content-faint" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-content-primary">{universidad.contacto.name}</span>
                <span className="block text-xs text-content-faint">{universidad.contacto.role}</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="shrink-0 text-xs text-content-faint" />
              <span className="truncate text-sm text-content-secondary">{universidad.contacto.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhone className="shrink-0 text-xs text-content-faint" />
              <span className="text-sm text-content-secondary">{universidad.contacto.phone}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export function UniversidadVacantesTab({ universidad, vacantes }: { universidad: LpfUniversity; vacantes: LpfVacante[] }) {
  const list = vacantes.filter((vacante) => vacante.university?.id === universidad.id)

  if (list.length === 0) {
    return <EmptyState title="Sin vacantes activas" description="Esta universidad no tiene vacantes publicadas en este momento." />
  }

  return (
    <ul className="space-y-2">
      {list.map((vacante) => (
        <li key={vacante.id} className="flex items-center gap-3 rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-input text-content-secondary">
            <FaBriefcase className="text-sm" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-content-primary">{vacante.role}</p>
            <p className="truncate text-xs text-content-faint">
              {vacante.club.name} · {vacante.postedLabel}
            </p>
          </div>
          <VacanteAreaBadge area={vacante.area} />
        </li>
      ))}
    </ul>
  )
}

export function UniversidadPostuladosTab({ universidad, postulantes }: { universidad: LpfUniversity; postulantes: LpfPostulante[] }) {
  const list = postulantes.filter((postulante) => postulante.university.id === universidad.id)

  if (list.length === 0) {
    return <EmptyState title="Sin postulados" description="Aún no hay postulados registrados de esta universidad." />
  }

  return (
    <ul className="space-y-2">
      {list.map((postulante) => (
        <li key={postulante.id} className="flex items-center gap-3 rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
          <Avatar name={postulante.name} color={postulante.avatarColor} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-content-primary">{postulante.name}</p>
            <p className="truncate text-xs text-content-faint">
              {postulante.career} · {postulante.vacante}
            </p>
          </div>
          <PostuladosEstadoBadge state={postulante.state} />
        </li>
      ))}
    </ul>
  )
}

export function UniversidadEstudiantesTab({ universidad }: { universidad: LpfUniversity }) {
  const list = universidad.estudiantesDestacados ?? []

  if (list.length === 0) {
    return <EmptyState title="Sin estudiantes registrados" description="Aún no hay estudiantes registrados en esta universidad." />
  }

  return (
    <ul className="space-y-2">
      {list.map((estudiante) => (
        <li key={estudiante.id} className="flex items-center gap-3 rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
          <Avatar name={estudiante.name} color={estudiante.avatarColor} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-content-primary">{estudiante.name}</p>
            <p className="truncate text-xs text-content-faint">
              {estudiante.career} · {estudiante.semester}
            </p>
          </div>
          <span className="hidden truncate text-xs text-content-faint sm:block">{estudiante.email}</span>
        </li>
      ))}
    </ul>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar key={index} className={cn('text-xs', index < Math.round(rating) ? 'text-amber-400' : 'text-line')} />
      ))}
    </span>
  )
}

export function UniversidadReviewsTab({ universidad }: { universidad: LpfUniversity }) {
  const reviews = universidad.reviews ?? []

  if (reviews.length === 0) {
    return <EmptyState title="Sin reseñas" description="Aún no hay reseñas registradas para esta universidad." />
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-border-faint bg-surface-raised/40 px-4 py-3">
        <span className="text-3xl font-extrabold text-content-primary">{(universidad.rating ?? 0).toFixed(1)}</span>
        <div className="min-w-0">
          <Stars rating={universidad.rating ?? 0} />
          <p className="text-xs text-content-faint">{formatNumber(universidad.reviewsCount ?? 0)} reseñas</p>
        </div>
      </div>

      <ul className="space-y-2">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-content-primary">{review.author}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                <FaStar className="text-[10px]" />
                {review.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-[11px] text-content-faint">
              {review.role} · {formatDocDate(review.date)}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-content-secondary">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}


