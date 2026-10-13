import type { IconType } from 'react-icons'
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaBriefcase,
  FaBuildingColumns,
  FaCircleCheck,
  FaFileLines,
  FaUserGroup,
} from 'react-icons/fa6'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import type { LpfFuturoDelta, LpfFuturoKpi, LpfKpiTone } from '@/types'

const ICONS: Record<string, IconType> = {
  universidades: FaBuildingColumns,
  estudiantes: FaUserGroup,
  vacantes: FaBriefcase,
  postulados: FaFileLines,
}

const TILE_TONES: Record<LpfKpiTone, string> = {
  violet: 'bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.7)]',
  emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.7)]',
  brand: 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(46,139,255,0.7)]',
  indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_8px_20px_-8px_rgba(99,102,241,0.7)]',
  sky: 'bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-[0_8px_20px_-8px_rgba(14,165,233,0.7)]',
}

const DELTA_TONES: Record<LpfFuturoDelta['tone'], string> = {
  emerald: 'text-emerald-500 dark:text-emerald-300',
  rose: 'text-rose-500 dark:text-rose-300',
  brand: 'text-brand-500 dark:text-brand-300',
  sky: 'text-sky-500 dark:text-sky-300',
}

function Delta({ delta }: { delta: LpfFuturoDelta }) {
  const Icon = delta.direction === 'ok' ? FaCircleCheck : delta.direction === 'up' ? FaArrowTrendUp : FaArrowTrendDown

  return (
    <span className="flex shrink-0 flex-col items-end gap-0.5 text-right leading-none">
      <span className={cn('inline-flex items-center gap-1 text-[11px] font-bold leading-none', DELTA_TONES[delta.tone])}>
        <Icon className="text-[10px]" />
        {delta.label}
      </span>
      {delta.caption && <span className="text-[10px] text-content-muted">{delta.caption}</span>}
    </span>
  )
}

function KpiCard({ kpi }: { kpi: LpfFuturoKpi }) {
  const Icon = ICONS[kpi.id] ?? FaBuildingColumns

  return (
    <div className="surface-kpi flex h-full items-center gap-3.5 rounded-card border border-line/60 p-4 shadow-card">
      <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl', TILE_TONES[kpi.tone])}>
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold tracking-wide text-content-secondary">{kpi.label}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-[26px] font-extrabold leading-none text-content-primary">
            <AnimatedNumber value={kpi.value} format={formatNumber} />
          </span>
          {kpi.delta && <Delta delta={kpi.delta} />}
        </div>
        {kpi.caption && <p className="mt-1 text-xs font-medium text-content-secondary">{kpi.caption}</p>}
      </div>
    </div>
  )
}

export function UniversidadesKpiRow({ kpis }: { kpis: LpfFuturoKpi[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  )
}
