import type { IconType } from 'react-icons'
import { FaCircleCheck, FaDatabase, FaFileInvoiceDollar, FaMoneyCheckDollar, FaSitemap } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SapLogo } from './SapLogo'
import type { SapStatus } from '@/types'

const ROW_ICONS: Record<string, IconType> = {
  ingresos: FaFileInvoiceDollar,
  pagos: FaMoneyCheckDollar,
  'centro-costos': FaSitemap,
  maestros: FaDatabase,
}

export function SapIntegrationCard({ sap }: { sap: SapStatus }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Integración con SAP</h3>
        <Button variant="outline" className="h-8 rounded-lg px-3 text-xs">
          Ver detalles
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-line/50 bg-surface-sunken px-3 py-3">
        <SapLogo />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-content-primary">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            {sap.connected ? 'Conectado' : 'Desconectado'}
          </p>
          <p className="truncate text-[11px] text-content-faint">Última sincronización: {sap.lastSync}</p>
        </div>
        <Button className="h-8 shrink-0 rounded-lg px-3 text-xs">Sincronizar ahora</Button>
      </div>

      <div className="mt-3 flex-1 space-y-1">
        {sap.rows.map((row) => {
          const Icon = ROW_ICONS[row.id]
          return (
            <div key={row.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-ink-700/40">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-brand-300 ring-1 ring-brand-600/30">
                <Icon className="text-sm" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-content-primary">
                  {row.label}
                  {row.code && <span className="font-normal text-content-faint"> ({row.code})</span>}
                </p>
                <p className="truncate text-[11px] text-content-faint">
                  {row.note ? `${row.note} — ` : ''}Última actualización: {row.updatedAt}
                </p>
              </div>
              <FaCircleCheck className="shrink-0 text-base text-emerald-500" />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
