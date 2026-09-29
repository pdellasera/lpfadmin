import { useMemo, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { FinanceChart, type FinanceSeries } from '@/components/charts/FinanceChart'
import type { TransparencyMonthPoint } from '@/types'

type Granularity = 'mensual' | 'trimestral' | 'anual'

interface FinanceEvolutionCardProps {
  data: TransparencyMonthPoint[]
  series?: FinanceSeries
  title?: string
}

function aggregate(data: TransparencyMonthPoint[], granularity: Granularity): TransparencyMonthPoint[] {
  if (granularity === 'mensual') return data
  if (granularity === 'anual') {
    return [
      {
        label: '2026',
        ingresos: data.reduce((acc, d) => acc + d.ingresos, 0),
        pagos: data.reduce((acc, d) => acc + d.pagos, 0),
      },
    ]
  }
  const quarters: TransparencyMonthPoint[] = []
  for (let i = 0; i < data.length; i += 3) {
    const chunk = data.slice(i, i + 3)
    quarters.push({
      label: `T${i / 3 + 1}`,
      ingresos: chunk.reduce((acc, d) => acc + d.ingresos, 0),
      pagos: chunk.reduce((acc, d) => acc + d.pagos, 0),
    })
  }
  return quarters
}

export function FinanceEvolutionCard({ data, series = 'both', title = 'Evolución financiera' }: FinanceEvolutionCardProps) {
  const [granularity, setGranularity] = useState<Granularity>('mensual')
  const chartData = useMemo(() => aggregate(data, granularity), [data, granularity])

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>
        <div className="relative">
          <select
            value={granularity}
            onChange={(event) => setGranularity(event.target.value as Granularity)}
            aria-label="Granularidad"
            className="h-8 appearance-none rounded-lg border border-line/70 bg-ink-700/60 pl-3 pr-8 text-xs font-semibold text-content-secondary focus:border-brand-600 focus:outline-none"
          >
            <option value="mensual" className="bg-ink-800">Mensual</option>
            <option value="trimestral" className="bg-ink-800">Trimestral</option>
            <option value="anual" className="bg-ink-800">Anual</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-content-faint" />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] font-medium text-content-muted">
        {series !== 'pagos' && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-chart-income)' }} />
            Ingresos
          </span>
        )}
        {series !== 'ingresos' && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-chart-payment)' }} />
            Pagos
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rotate-45 rounded-[1px]" style={{ backgroundColor: 'var(--color-chart-result)' }} />
          Resultado
        </span>
      </div>

      <div className="mt-2 flex-1">
        <FinanceChart
          data={chartData}
          series={series}
          ariaLabel={`${title}: comparativa mensual de ingresos, pagos y resultado`}
        />
      </div>
    </Card>
  )
}
