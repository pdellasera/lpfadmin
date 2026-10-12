import { cn } from '@/lib/cn'
import type { LpfFuturoState } from '@/types'

const STATE_STYLES: Record<LpfFuturoState, string> = {
  nuevo: 'bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/30 dark:text-sky-300',
  'en-revision': 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-300',
  preseleccionado: 'bg-violet-500/15 text-violet-600 ring-1 ring-violet-500/30 dark:text-violet-300',
  aceptado: 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-300',
  rechazado: 'bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/30 dark:text-rose-300',
}

const STATE_LABELS: Record<LpfFuturoState, string> = {
  nuevo: 'Nuevo',
  'en-revision': 'En revisión',
  preseleccionado: 'Preseleccionado',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
}

export function PostuladosEstadoBadge({ state }: { state: LpfFuturoState }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold',
        STATE_STYLES[state],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATE_LABELS[state]}
    </span>
  )
}
