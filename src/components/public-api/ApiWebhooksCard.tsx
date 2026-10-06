import { Card } from '@/components/ui/Card'
import { ApiStatusBadge, type ApiStatusTone } from './ApiStatusBadge'
import type { ApiWebhook } from '@/types'

const STATUS: Record<ApiWebhook['status'], { label: string; tone: ApiStatusTone }> = {
  activo: { label: 'Activo', tone: 'success' },
  pausado: { label: 'Pausado', tone: 'warning' },
}

export function ApiWebhooksCard({ webhooks }: { webhooks: ApiWebhook[] }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Webhooks</h3>
        <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
          Añadir
        </button>
      </div>

      <div className="mt-2 flex-1 space-y-2">
        {webhooks.map((webhook) => {
          const status = STATUS[webhook.status]
          return (
            <div key={webhook.id} className="rounded-xl border border-line/50 bg-surface-sunken px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <code className="truncate font-mono text-[12px] font-semibold text-content-primary">{webhook.event}</code>
                <ApiStatusBadge label={status.label} tone={status.tone} />
              </div>
              <p className="mt-1 truncate text-[11px] text-content-faint">{webhook.url}</p>
              <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-content-muted">
                <span>Última entrega {webhook.lastDelivery}</span>
                <span className="font-semibold tabular-nums text-content-secondary">{webhook.successRate}% éxito</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
