import { FaEllipsisVertical, FaEye, FaPenToSquare } from 'react-icons/fa6'
import { SanctionInfractionBadge } from '@/components/sanctions/SanctionInfractionBadge'
import { SanctionStatusBadge } from '@/components/sanctions/SanctionStatusBadge'
import { SanctionTargetBadge } from '@/components/sanctions/SanctionTargetBadge'
import { Avatar } from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatMoney, formatShortDate } from '@/lib/format'
import type { PlayerPosition, Sanction, StaffRoleCode } from '@/types'

interface SanctionsTableProps {
  sanctions?: Sanction[]
  isLoading: boolean
  startIndex?: number
}

const HEADERS = ['#', 'Sancionado', 'Club', 'Infracción', 'Origen', 'Fecha', 'Suspensión', 'Multa', 'Estado', 'Acciones']
const NUMERIC_HEADERS = new Set(['Suspensión', 'Multa'])

const POSITION_LABEL: Record<PlayerPosition, string> = {
  POR: 'Portero',
  DEF: 'Defensa',
  MED: 'Mediocampista',
  DEL: 'Delantero',
}

const ROLE_LABEL: Record<StaffRoleCode, string> = {
  DT: 'Director técnico',
  AT: 'Asistente técnico',
  PF: 'Preparador físico',
  EP: 'Entrenador de porteros',
  AN: 'Analista',
  MED: 'Médico',
  FIS: 'Fisioterapeuta',
  NUT: 'Nutricionista',
  DEL: 'Delegado',
  UTI: 'Utilero',
}

function headerClass(header: string): string {
  if (header === '#') return 'w-12 text-center'
  if (header === 'Acciones') return 'text-right'
  if (NUMERIC_HEADERS.has(header)) return 'text-center'
  return ''
}

function sublabel(sanction: Sanction): string | undefined {
  if (sanction.position) return POSITION_LABEL[sanction.position]
  if (sanction.role) return ROLE_LABEL[sanction.role]
  return sanction.resolution
}

export function SanctionsTable({ sanctions, isLoading, startIndex = 0 }: SanctionsTableProps) {
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
            {isLoading || !sanctions ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border-faint last:border-0">
                  {HEADERS.map((header) => (
                    <td key={header} className="h-[52px] px-2.5 first:pl-4 last:pr-4">
                      <Skeleton
                        className={cn(
                          'h-3.5',
                          header === '#'
                            ? 'w-6'
                            : header === 'Sancionado'
                              ? 'w-36'
                              : header === 'Club'
                                ? 'w-24'
                                : header === 'Infracción'
                                  ? 'w-28'
                                  : header === 'Origen'
                                    ? 'w-32'
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
              sanctions.map((sanction, index) => (
                <tr
                  key={sanction.id}
                  className="border-b border-border-faint transition-colors last:border-0 hover:bg-surface-sunken"
                >
                  <td className="h-[52px] pl-4 text-center text-[13px] font-medium tabular-nums text-content-faint">
                    {startIndex + index + 1}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={sanction.name} size={32} />
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-bold text-content-primary">{sanction.name}</p>
                        <p className="truncate text-[11px] text-content-muted">{sublabel(sanction) ?? sanction.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-2">
                      <TeamCrest club={sanction.club} size={22} />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-content-secondary">{sanction.club.name}</p>
                        <SanctionTargetBadge targetType={sanction.targetType} className="mt-0.5" />
                      </div>
                    </div>
                  </td>
                  <td className="h-[52px] px-2.5">
                    <SanctionInfractionBadge infraction={sanction.infraction} card={sanction.card} />
                  </td>
                  <td className="h-[52px] px-2.5">
                    <span className="block max-w-[180px] truncate text-[12px] text-content-secondary">
                      {sanction.matchLabel ?? '—'}
                    </span>
                  </td>
                  <td className="h-[52px] px-2.5 text-[12px] text-content-secondary">
                    {formatShortDate(sanction.issuedDate)}
                  </td>
                  <td className="h-[52px] px-2.5 text-center">
                    {sanction.matches > 0 ? (
                      <span className="text-[13px] font-semibold tabular-nums text-content-primary">
                        {sanction.matches} part.
                      </span>
                    ) : (
                      <span className="text-[12px] text-content-faint">—</span>
                    )}
                  </td>
                  <td className="h-[52px] px-2.5 text-center">
                    {sanction.fine > 0 ? (
                      <span className="text-[13px] font-semibold tabular-nums text-content-primary">
                        {formatMoney(sanction.fine)}
                      </span>
                    ) : (
                      <span className="text-[12px] text-content-faint">—</span>
                    )}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <SanctionStatusBadge status={sanction.status} />
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

