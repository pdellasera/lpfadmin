import { useState } from 'react'
import { FaCircleCheck, FaCircleXmark, FaPaperPlane } from 'react-icons/fa6'
import { PostuladosEstadoBadge } from '@/components/lpf-futuro/PostuladosEstadoBadge'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import type { LpfFuturoState, LpfPostulante } from '@/types'
import {
  PostuladosDocumentsTab,
  PostuladosHistoryTab,
  PostuladosInfoTab,
  PostuladosInterviewsTab,
} from './PostuladosDetailTabs'

type DetailTab = 'informacion' | 'documentos' | 'entrevistas' | 'historial'

const TABS: { id: DetailTab; label: string }[] = [
  { id: 'informacion', label: 'Información' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'entrevistas', label: 'Entrevistas' },
  { id: 'historial', label: 'Historial' },
]

export function PostuladosDetailCard({ postulante }: { postulante: LpfPostulante }) {
  const [tab, setTab] = useState<DetailTab>('informacion')
  const [state, setState] = useState<LpfFuturoState>(postulante.state)
  const [toast, setToast] = useState('')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const handleReject = () => {
    setState('rechazado')
    notify('Postulación rechazada')
  }

  const handleAccept = () => {
    setState('aceptado')
    notify('Postulación aceptada')
  }

  const handleMessage = () => notify('Mensaje enviado al postulante')

  return (
    <Card className="relative flex h-full flex-col gap-4 p-4">
      <div className="flex items-start gap-3">
        <Avatar name={postulante.name} color={postulante.avatarColor} size={56} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-bold leading-tight text-content-primary">{postulante.name}</h2>
          <p className="truncate text-sm text-content-faint">{postulante.email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <PostuladosEstadoBadge state={state} />
            <span className="inline-flex items-center gap-1 rounded-md bg-surface-raised px-2 py-0.5 text-[11px] font-semibold text-content-secondary ring-1 ring-inset ring-line">
              {postulante.type}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleReject}
          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
        >
          <FaCircleXmark className="text-[11px]" />
          Rechazar
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          <FaCircleCheck className="text-[11px]" />
          Aceptar
        </button>
        <button
          type="button"
          onClick={handleMessage}
          className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border-faint bg-surface-input text-xs font-semibold text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
        >
          <FaPaperPlane className="text-[11px]" />
          Mensaje
        </button>
      </div>

      <div className="flex items-center gap-1 rounded-xl bg-surface-track p-1 ring-1 ring-border-faint">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'flex-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors',
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
        {tab === 'informacion' && <PostuladosInfoTab postulante={postulante} />}
        {tab === 'documentos' && <PostuladosDocumentsTab postulante={postulante} />}
        {tab === 'entrevistas' && <PostuladosInterviewsTab postulante={postulante} />}
        {tab === 'historial' && <PostuladosHistoryTab postulante={postulante} />}
      </div>

      {toast && (
        <div className="absolute bottom-3 right-3 rounded-lg bg-surface-deep px-3 py-2 text-xs font-semibold text-content-primary shadow-card ring-1 ring-border-strong">
          {toast}
        </div>
      )}
    </Card>
  )
}
