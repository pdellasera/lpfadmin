import type { IconType } from 'react-icons'
import {
  FaBuildingColumns,
  FaChartColumn,
  FaChevronRight,
  FaCircleNodes,
  FaCoins,
  FaFutbol,
  FaHandshake,
  FaMoneyBill,
  FaSitemap,
  FaTicket,
  FaTv,
  FaUserGroup,
  FaUserTie,
} from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { formatMoney } from '@/lib/format'
import type { TransparencyDetailRow } from '@/types'

const DETAIL_ICONS: Record<string, IconType> = {
  tv: FaTv,
  ticket: FaTicket,
  sponsor: FaHandshake,
  pandepartes: FaCircleNodes,
  marketing: FaChartColumn,
  otros: FaCoins,
  clubes: FaUserGroup,
  personal: FaUserTie,
  matchday: FaFutbol,
  admin: FaBuildingColumns,
  competiciones: FaSitemap,
  'otros-pagos': FaMoneyBill,
}

interface DetailTableCardProps {
  title: string
  rows: TransparencyDetailRow[]
  total: number
  totalLabel: string
}

export function DetailTableCard({ title, rows, total, totalLabel }: DetailTableCardProps) {
  return (
    <Card className="flex h-full flex-col p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>

      <div className="mt-2 flex-1 overflow-x-auto">
        <table className="w-full">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-line/60 text-[10px] font-semibold uppercase tracking-wide text-content-faint">
              <th scope="col" className="py-1.5 text-left font-semibold">Concepto</th>
              <th scope="col" className="py-1.5 text-right font-semibold">Monto (USD)</th>
              <th scope="col" className="w-12 py-1.5 text-right font-semibold">%</th>
              <th scope="col" className="w-5" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const Icon = DETAIL_ICONS[row.icon]
              return (
                <tr key={row.id} className="border-b border-line/40 transition-colors hover:bg-ink-700/40">
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-overlay-ring text-[13px] text-brand-300 ring-1 ring-overlay-ring">
                        <Icon />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-content-primary">{row.concept}</p>
                        {row.note && <p className="truncate text-[11px] text-content-faint">{row.note}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-2.5 text-right text-[13px] font-semibold tabular-nums text-content-primary">
                    {formatMoney(row.amount)}
                  </td>
                  <td className="py-2.5 text-right text-[13px] tabular-nums text-content-muted">{row.percent}%</td>
                  <td className="py-2.5 text-right text-content-faint">
                    <FaChevronRight className="ml-auto text-[10px]" />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="text-[13px] font-bold">
              <td className="pt-2.5 text-content-primary">{totalLabel}</td>
              <td className="whitespace-nowrap pt-2.5 text-right tabular-nums text-content-primary">{formatMoney(total)}</td>
              <td className="pt-2.5 text-right tabular-nums text-content-primary">100%</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  )
}
