import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import {
  FaBriefcase,
  FaCakeCandles,
  FaCalendarDays,
  FaCircleCheck,
  FaClock,
  FaEnvelope,
  FaFile,
  FaFileLines,
  FaFilePen,
  FaFolderOpen,
  FaGraduationCap,
  FaLocationDot,
  FaPhone,
  FaVideo,
} from 'react-icons/fa6'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/cn'
import { formatDocDate } from '@/lib/format'
import type {
  LpfInterviewStatus,
  LpfPostulante,
  LpfPostulanteDocument,
  LpfPostulanteEvent,
} from '@/types'

const DOC_ICONS: Record<LpfPostulanteDocument['kind'], IconType> = {
  cv: FaFileLines,
  carta: FaFilePen,
  transcripto: FaGraduationCap,
  portafolio: FaFolderOpen,
  otro: FaFile,
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border-faint bg-surface-raised/40 px-3 py-2">
      <span className="text-content-faint">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-content-faint">{label}</span>
        <span className="block truncate text-sm font-medium text-content-primary">{value}</span>
      </span>
    </div>
  )
}

export function PostuladosInfoTab({ postulante }: { postulante: LpfPostulante }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <InfoRow icon={<FaEnvelope />} label="Correo" value={postulante.email} />
        <InfoRow icon={<FaPhone />} label="Teléfono" value={postulante.phone} />
        <InfoRow icon={<FaLocationDot />} label="Ubicación" value={postulante.location} />
        <InfoRow
          icon={<FaCakeCandles />}
          label="Nacimiento"
          value={postulante.birthDate ? formatDocDate(postulante.birthDate) : undefined}
        />
        <InfoRow icon={<FaGraduationCap />} label="Carrera" value={postulante.career} />
        <InfoRow icon={<FaBriefcase />} label="Disponibilidad" value={postulante.availability} />
        {postulante.semester && <InfoRow icon={<FaCalendarDays />} label="Semestre" value={postulante.semester} />}
        {postulante.gpa && <InfoRow icon={<FaCircleCheck />} label="Índice académico" value={postulante.gpa} />}
      </div>

      {postulante.coverLetter && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-content-primary">Carta de motivación</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">{postulante.coverLetter}</p>
        </div>
      )}

      {(postulante.skills?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-content-primary">Habilidades</h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {(postulante.skills ?? []).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-surface-raised px-2 py-1 text-[11px] font-semibold text-content-secondary ring-1 ring-inset ring-line"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function PostuladosDocumentsTab({ postulante }: { postulante: LpfPostulante }) {
  const documents = postulante.documents ?? []

  if (documents.length === 0) {
    return <EmptyState title="Sin documentos" description="Este postulante aún no ha adjuntado documentos." />
  }

  return (
    <ul className="space-y-2">
      {documents.map((document) => {
        const Icon = DOC_ICONS[document.kind] ?? FaFile
        return (
          <li
            key={document.id}
            className="flex items-center gap-3 rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-brand-600 dark:text-brand-300">
              <Icon className="text-sm" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-content-primary">{document.name}</p>
              <p className="text-[11px] text-content-faint">
                {[document.size, document.uploadedAt ? formatDocDate(document.uploadedAt) : null]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            {document.verified ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/30 dark:text-emerald-300">
                <FaCircleCheck className="text-[9px]" />
                Verificado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-inset ring-amber-500/30 dark:text-amber-300">
                <FaClock className="text-[9px]" />
                Pendiente
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

const INTERVIEW_STATUS: Record<LpfInterviewStatus, { label: string; className: string }> = {
  pendiente: { label: 'Pendiente', className: 'bg-amber-500/15 text-amber-600 ring-amber-500/30 dark:text-amber-300' },
  confirmada: { label: 'Confirmada', className: 'bg-sky-500/15 text-sky-600 ring-sky-500/30 dark:text-sky-300' },
  completada: { label: 'Completada', className: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300' },
}

export function PostuladosInterviewsTab({ postulante }: { postulante: LpfPostulante }) {
  const interviews = postulante.interviews ?? []

  if (interviews.length === 0) {
    return <EmptyState title="Sin entrevistas" description="Aún no se han programado entrevistas para este postulante." />
  }

  return (
    <ul className="space-y-2">
      {interviews.map((interview) => (
        <li key={interview.id} className="rounded-xl border border-border-faint bg-surface-raised/40 px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-input text-content-secondary">
                {interview.mode === 'virtual' ? <FaVideo className="text-sm" /> : <FaLocationDot className="text-sm" />}
              </span>
              <div>
                <p className="text-sm font-medium text-content-primary">
                  {formatDocDate(interview.date)} · {interview.time}
                </p>
                <p className="text-[11px] text-content-faint">
                  {interview.mode === 'virtual' ? 'Entrevista virtual' : 'Entrevista presencial'}
                </p>
              </div>
            </div>
            <span
              className={cn(
                'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
                INTERVIEW_STATUS[interview.status].className,
              )}
            >
              {INTERVIEW_STATUS[interview.status].label}
            </span>
          </div>
          {interview.interviewer && <p className="mt-1.5 text-xs text-content-faint">Entrevistador: {interview.interviewer}</p>}
          {interview.notes && <p className="mt-1 text-xs text-content-secondary">{interview.notes}</p>}
        </li>
      ))}
    </ul>
  )
}

const HISTORY_DOT: Record<LpfPostulanteEvent['tone'], string> = {
  neutral: 'bg-content-faint',
  success: 'bg-emerald-400',
  danger: 'bg-rose-400',
}

export function PostuladosHistoryTab({ postulante }: { postulante: LpfPostulante }) {
  const history = postulante.history ?? []

  if (history.length === 0) {
    return <EmptyState title="Sin historial" description="Aún no hay movimientos registrados para este postulante." />
  }

  return (
    <ol className="relative space-y-4 pl-4">
      {history.map((event, index) => (
        <li key={event.id} className="relative">
          {index < history.length - 1 && <span className="absolute left-[-13px] top-2 h-full w-px bg-line" />}
          <span
            className={cn(
              'absolute left-[-18px] top-1 h-2.5 w-2.5 rounded-full ring-2 ring-surface-card-solid',
              HISTORY_DOT[event.tone],
            )}
          />
          <p className="text-sm font-semibold text-content-primary">{event.title}</p>
          <p className="text-[11px] text-content-faint">{formatDocDate(event.date)}</p>
          {event.description && <p className="mt-0.5 text-xs leading-relaxed text-content-secondary">{event.description}</p>}
        </li>
      ))}
    </ol>
  )
}

