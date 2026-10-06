import { BarChart } from '@/components/charts/BarChart'
import { Card } from '@/components/ui/Card'
import type { ApiUsagePoint } from '@/types'

export function ApiUsageChartCard({ usage }: { usage: ApiUsagePoint[] }) {
  const data = usage.map((point) => ({ label: point.label, value: point.requests }))

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Solicitudes por día</h3>
        <span className="text-xs text-content-muted">Últimos 7 días</span>
      </div>
      <div className="mt-2 flex-1">
        <BarChart data={data} ariaLabel="Solicitudes por día" unitLabel="solicitudes" />
      </div>
    </Card>
  )
}
