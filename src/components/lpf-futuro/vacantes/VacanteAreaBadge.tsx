import { cn } from '@/lib/cn'

const TONES: Record<string, string> = {
  Analítica: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
  Marketing: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
  Deportivo: 'bg-amber-500/15 text-amber-600 ring-amber-500/30 dark:text-amber-300',
  Comunicación: 'bg-violet-500/15 text-violet-600 ring-violet-500/30 dark:text-violet-300',
  Scouting: 'bg-sky-500/15 text-sky-600 ring-sky-500/30 dark:text-sky-300',
  Administración: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
}

const FALLBACK = 'bg-surface-raised text-content-secondary ring-line'

export function VacanteAreaBadge({ area }: { area: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
        TONES[area] ?? FALLBACK,
      )}
    >
      {area}
    </span>
  )
}
