import { FaCopy, FaKey, FaPlus } from 'react-icons/fa6'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatNumber } from '@/lib/format'
import { ApiStatusBadge, type ApiStatusTone } from './ApiStatusBadge'
import type { ApiKeyItem } from '@/types'

const STATUS: Record<ApiKeyItem['status'], { label: string; tone: ApiStatusTone }> = {
  activa: { label: 'Activa', tone: 'success' },
  revocada: { label: 'Revocada', tone: 'danger' },
  expirada: { label: 'Expirada', tone: 'warning' },
}

export function ApiKeysCard({ keys }: { keys: ApiKeyItem[] }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-content-primary">
          <FaKey className="text-brand-400" /> Llaves de API
        </h3>
        <Button className="h-8 rounded-lg px-3 text-xs">
          <FaPlus className="text-[11px]" /> Crear llave
        </Button>
      </div>

      <div className="mt-3 flex-1 space-y-2">
        {keys.map((key) => {
          const status = STATUS[key.status]
          return (
            <div key={key.id} className="rounded-xl border border-line/50 bg-surface-sunken px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-content-primary">{key.name}</p>
                <ApiStatusBadge label={status.label} tone={status.tone} />
              </div>
              <div className="mt-1 flex items-center gap-2">
                <code className="font-mono text-[12px] text-brand-300">{key.prefix}…</code>
                <button
                  type="button"
                  aria-label="Copiar llave"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-content-faint transition-colors hover:text-content-primary"
                >
                  <FaCopy className="text-[11px]" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {key.scopes.map((scope) => (
                  <Badge key={scope} tone="neutral">
                    {scope}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-content-muted">
                <span>
                  Creada {key.createdAt} · Usada {key.lastUsedAt}
                </span>
                <span className="font-semibold tabular-nums text-content-secondary">{formatNumber(key.requests30d)} req (30 d)</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
