import { FaEllipsisVertical, FaEye, FaLocationDot, FaPenToSquare } from 'react-icons/fa6'
import { StadiumStatusBadge } from '@/components/stadiums/StadiumStatusBadge'
import { StadiumSurfaceBadge } from '@/components/stadiums/StadiumSurfaceBadge'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import type { Stadium } from '@/types'

interface StadiumsTableProps {
  stadiums?: Stadium[]
  isLoading: boolean
  startIndex?: number
}

const HEADERS = ['#', 'Estadio', 'Club local', 'Superficie', 'Capacidad', 'Dimensiones', 'Año', 'Partidos', 'Asist. prom.', 'Estado', 'Acciones']
const NUMERIC_HEADERS = new Set(['Capacidad', 'Año', 'Partidos', 'Asist. prom.'])

function headerClass(header: string): string {
  if (header === '#') return 'w-12 text-center'
  if (header === 'Acciones') return 'text-right'
  if (NUMERIC_HEADERS.has(header)) return 'text-center'
  return ''
}

export function StadiumsTable({ stadiums, isLoading, startIndex = 0 }: StadiumsTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-strong bg-surface-deep shadow-card">
      <div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-faint bg-surface-sunken">
              {HEADERS.map((header) => (
                <th
                  key={header}
                  className={cn(
                    'h-11 whitespace-nowrap px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-content-faint first:pl-4 last:pr-4',
                    headerClass(header),
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading || !stadiums ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border-faint last:border-0">
                  {HEADERS.map((header) => (
                    <td key={header} className="h-[52px] px-2.5 first:pl-4 last:pr-4">
                      <Skeleton
                        className={cn(
                          'h-3.5',
                          header === '#'
                            ? 'w-6'
                            : header === 'Estadio'
                              ? 'w-28'
                              : header === 'Club local'
                                ? 'w-24'
                                : header === 'Superficie'
                                  ? 'w-16'
                                  : header === 'Estado'
                                    ? 'w-16'
                                    : 'w-12',
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              stadiums.map((stadium, index) => (
                <tr key={stadium.id} className="border-b border-border-faint transition-colors last:border-0 hover:bg-surface-sunken">
                  <td className="h-[52px] pl-4 text-center text-[13px] font-medium tabular-nums text-content-faint">
                    {startIndex + index + 1}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <p className="truncate text-[14px] font-bold text-content-primary">{stadium.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-content-muted">
                      <FaLocationDot className="text-[10px]" />
                      {stadium.city}, {stadium.province}
                    </p>
                  </td>
                  <td className="h-[52px] px-2.5">
                    {stadium.club ? (
                      <div className="flex items-center gap-2">
                        <TeamCrest club={stadium.club} size={24} />
                        <span className="truncate text-[13px] font-semibold text-content-secondary">{stadium.club.name}</span>
                      </div>
                    ) : (
                      <span className="text-[12px] italic text-content-faint">Sede neutral</span>
                    )}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <StadiumSurfaceBadge surface={stadium.surface} />
                  </td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] font-semibold tabular-nums text-content-primary">
                    {formatNumber(stadium.capacity)}
                  </td>
                  <td className="h-[52px] px-2.5 text-center text-[12px] text-content-secondary">{stadium.dimensions}</td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{stadium.openedYear}</td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] font-semibold tabular-nums text-content-primary">{stadium.matches}</td>
                  <td className="h-[52px] px-2.5 text-center">
                    <p className="text-[13px] font-semibold tabular-nums text-content-primary">{formatNumber(stadium.avgAttendance)}</p>
                    <p className="text-[10px] text-content-muted">{stadium.occupancy}% ocup.</p>
                  </td>
                  <td className="h-[52px] px-2.5">
                    <StadiumStatusBadge status={stadium.status} />
                  </td>
                  <td className="h-[52px] px-2.5 pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label="Ver detalle"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-faint bg-surface-input text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        type="button"
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-faint bg-surface-input text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
                      >
                        <FaPenToSquare className="text-xs" />
                      </button>
                      <button
                        type="button"
                        aria-label="Más acciones"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-content-faint transition-colors hover:text-content-primary"
                      >
                        <FaEllipsisVertical className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
