import type { IconType } from 'react-icons'
import { FaBolt, FaChartLine, FaCircleCheck, FaKey } from 'react-icons/fa6'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { DeltaTag } from '@/components/transparency/DeltaTag'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import type { ApiMetric, ApiMetricId, KpiTileTone } from '@/types'

const METRIC_ICONS: Record<ApiMetricId, IconType> = {
  solicitudes: FaChartLine,
  uptime: FaCircleCheck,
  latencia: FaBolt,
  limite: FaKey,
}

const TILE_TONES: Record<KpiTileTone, string> = {
  emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.7)]',
  rose: 'bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-[0_8px_20px_-8px_rgba(244,63,94,0.7)]',
  brand: 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(46,139,255,0.7)]',
}

function formatMetric(value: number, format: ApiMetric['format']): string {
  if (format === 'percent') return `${value.toFixed(2)}%`
  if (format === 'millis') return `${formatNumber(value)} ms`
  return formatNumber(value)
}

function MetricValue({ value, format }: { value: number; format: ApiMetric['format'] }) {
  if (format === 'number') {
    return <AnimatedNumber value={value} />
  }
  return <>{formatMetric(value, format)}</>
}

export function ApiMetricsRow({ metrics }: { metrics: ApiMetric[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = METRIC_ICONS[metric.id]
        return (
          <div
            key={metric.id}
            className="surface-kpi flex h-full items-center gap-3.5 rounded-card border border-line/60 p-4 shadow-card"
          >
            <span
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl',
                TILE_TONES[metric.tone],
              )}
            >
              <Icon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold uppercase tracking-wide text-content-secondary">{metric.label}</p>
              <div className="mt-1 flex items-center gap-2.5">
                <span className="text-[26px] font-extrabold leading-none text-content-primary">
                  <MetricValue value={metric.value} format={metric.format} />
                </span>
                {metric.delta && (
                  <span className="flex flex-col gap-0.5 leading-none">
                    <DeltaTag direction={metric.delta.direction} tone={metric.delta.tone} label={metric.delta.label} />
                    {metric.delta.caption && <span className="text-[10px] text-content-muted">{metric.delta.caption}</span>}
                  </span>
                )}
              </div>
              {metric.caption && <p className="mt-1 text-xs font-medium text-content-secondary">{metric.caption}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
