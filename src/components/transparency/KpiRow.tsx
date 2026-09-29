import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaChevronRight,
  FaFutbol,
  FaSackDollar,
  FaScaleBalanced,
  FaUsers,
} from 'react-icons/fa6'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatMoney, formatNumber } from '@/lib/format'
import { cn } from '@/lib/cn'
import { DeltaTag } from './DeltaTag'
import type { KpiTileTone, TransparencyKpi, TransparencyKpiId } from '@/types'

const KPI_ICONS: Record<TransparencyKpiId, IconType> = {
  ingresos: FaArrowTrendUp,
  pagos: FaArrowTrendDown,
  resultado: FaScaleBalanced,
  clubes: FaUsers,
  'ingresos-promedio': FaSackDollar,
  'gastos-matchday': FaFutbol,
}

const TILE_TONES: Record<KpiTileTone, string> = {
  emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.7)]',
  rose: 'bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-[0_8px_20px_-8px_rgba(244,63,94,0.7)]',
  brand: 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(46,139,255,0.7)]',
}

function KpiCard({ kpi }: { kpi: TransparencyKpi }) {
  const Icon = KPI_ICONS[kpi.id]
  const format = kpi.format === 'money' ? formatMoney : formatNumber

  const content = (
    <div className="flex h-full items-center gap-3.5 p-4">
      <span className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl', TILE_TONES[kpi.tone])}>
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold uppercase tracking-wide text-content-secondary">{kpi.label}</p>
        <div className="mt-1 flex items-center gap-2.5">
          <span className="text-[26px] font-extrabold leading-none text-content-primary">
            <AnimatedNumber value={kpi.value} format={format} />
          </span>
          {kpi.delta && (
            <span className="flex flex-col gap-0.5 leading-none">
              <DeltaTag direction={kpi.delta.direction} tone={kpi.delta.tone} label={kpi.delta.label} />
              {kpi.delta.caption && <span className="text-[10px] text-content-muted">{kpi.delta.caption}</span>}
            </span>
          )}
        </div>
        {kpi.caption && <p className="mt-1 text-xs font-medium text-content-secondary">{kpi.caption}</p>}
      </div>
      {kpi.href && <FaChevronRight className="shrink-0 text-content-faint" />}
    </div>
  )

  const className =
    'surface-kpi block h-full rounded-card border border-line/60 shadow-card transition-colors'

  if (kpi.href) {
    return (
      <Link to={kpi.href} className={cn(className, 'hover:border-brand-600/50')}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}

export function KpiRow({ kpis }: { kpis: TransparencyKpi[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  )
}
