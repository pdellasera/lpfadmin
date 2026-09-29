import type { IconType } from 'react-icons'
import { FaCircleCheck, FaCircleDot, FaFutbol, FaIdCard, FaSackDollar, FaUsers } from 'react-icons/fa6'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { Card } from '@/components/ui/Card'
import { formatMoney, formatNumber } from '@/lib/format'
import { cn } from '@/lib/cn'
import { DeltaTag } from './DeltaTag'
import type { TransparencyIndicator } from '@/types'

const ICONS: Record<string, IconType> = {
  partidos: FaFutbol,
  goles: FaCircleDot,
  asistencia: FaUsers,
  tarjetas: FaIdCard,
  'ingresos-promedio': FaSackDollar,
  licencias: FaCircleCheck,
}

function IndicatorTile({ indicator }: { indicator: TransparencyIndicator }) {
  const Icon = ICONS[indicator.id]
  const format = indicator.format === 'money' ? formatMoney : formatNumber

  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-line/50 bg-surface-sunken p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-sm text-brand-300 ring-1 ring-brand-600/30">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium leading-tight text-content-muted">{indicator.label}</p>
        <div className="mt-0.5 flex items-baseline justify-between gap-2">
          <span className="text-lg font-extrabold leading-none text-content-primary">
            <AnimatedNumber value={indicator.value} format={format} />
          </span>
          <DeltaTag direction={indicator.delta.direction} tone={indicator.delta.tone} label={indicator.delta.label} />
        </div>
      </div>
    </div>
  )
}

interface IndicatorsCardProps {
  indicators: TransparencyIndicator[]
  compact?: boolean
}

export function IndicatorsCard({ indicators, compact = false }: IndicatorsCardProps) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Indicadores clave</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Ver más
        </button>
      </div>

      <div className={cn('mt-3 grid gap-3', compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3')}>
        {indicators.map((indicator) => (
          <IndicatorTile key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </Card>
  )
}
