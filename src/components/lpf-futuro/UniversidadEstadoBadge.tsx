import { cn } from '@/lib/cn'
import type { LpfUniversidadEstado } from '@/types'

const STATE_STYLES: Record<LpfUniversidadEstado, string> = {
  activa: 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-300',
  inactiva: 'bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/30 dark:text-rose-300',
  'en-convenio': 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-300',
}

const STATE_LABELS: Record<LpfUniversidadEstado, string> = {
  activa: 'Activa',
  inactiva: 'Inactiva',
  'en-convenio': 'En convenio',
}

export function UniversidadEstadoBadge({ estado }: { estado?: LpfUniversidadEstado }) {
  const state = estado ?? 'activa'

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
