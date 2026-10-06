import { FaEllipsisVertical, FaGlobe, FaPenToSquare, FaStar } from 'react-icons/fa6'
import { RefereeCategoryBadge } from '@/components/referees/RefereeCategoryBadge'
import { RefereeRoleBadge } from '@/components/referees/RefereeRoleBadge'
import { Avatar } from '@/components/ui/Avatar'
import { PanamaFlag } from '@/components/ui/PanamaFlag'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { REFEREE_ROLE_LABEL, REFEREE_STATUS_LABEL } from '@/lib/referees'
import type { Referee, RefereeStatus } from '@/types'

interface RefereesTableProps {
  referees?: Referee[]
  isLoading: boolean
  startIndex?: number
}

const HEADERS = ['#', 'Árbitro', 'Cargo', 'Categoría', 'Legajo', 'Edad', 'Partidos', 'Tarjetas', 'Evaluación', 'Estado', 'Acciones']
const NUMERIC_HEADERS = new Set(['Legajo', 'Edad', 'Partidos', 'Tarjetas', 'Evaluación'])

const STATUS_TONE: Record<RefereeStatus, { dot: string; text: string }> = {
  disponible: { dot: 'bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-300' },
  lesionado: { dot: 'bg-amber-400', text: 'text-amber-600 dark:text-amber-300' },
  suspendido: { dot: 'bg-rose-400', text: 'text-rose-600 dark:text-rose-300' },
  inactivo: { dot: 'bg-slate-400', text: 'text-content-muted' },
}

function headerClass(header: string): string {
  if (header === '#') return 'w-12 text-center'
  if (header === 'Acciones') return 'text-right'
  if (NUMERIC_HEADERS.has(header)) return 'text-center'
  return ''
}

function age(birthYear: number): number {
  return new Date().getFullYear() - birthYear
}

export function RefereesTable({ referees, isLoading, startIndex = 0 }: RefereesTableProps) {
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
            {isLoading || !referees ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border-faint last:border-0">
                  {HEADERS.map((header) => (
                    <td key={header} className="h-[52px] px-2.5 first:pl-4 last:pr-4">
                      <Skeleton
                        className={cn(
                          'h-3.5',
                          header === '#'
                            ? 'w-6'
                            : header === 'Árbitro'
                              ? 'w-28'
                              : header === 'Cargo'
                                ? 'w-20'
                                : header === 'Categoría'
                                ? 'w-16'
                                : header === 'Tarjetas'
                                  ? 'w-14'
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
              referees.map((referee, index) => {
                const tone = STATUS_TONE[referee.status]
                return (
                  <tr key={referee.id} className="border-b border-border-faint transition-colors last:border-0 hover:bg-surface-sunken">
                    <td className="h-[52px] pl-4 text-center text-[13px] font-medium tabular-nums text-content-faint">
                      {startIndex + index + 1}
                    </td>
                    <td className="h-[52px] px-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={referee.name} size={36} />
                        <div className="min-w-0 leading-tight">
                          <p className="truncate text-[14px] font-bold text-content-primary">{referee.name}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-content-muted">
                            {referee.foreign ? (
                              <FaGlobe className="text-[10px]" />
                            ) : (
                              <PanamaFlag size={12} className="rounded-[2px]" />
                            )}
                            {referee.foreign ? referee.nationality : referee.province}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="h-[52px] px-2.5">
                      <div className="flex items-center gap-2">
                        <RefereeRoleBadge role={referee.role} />
                        <span className="truncate text-[12px] text-content-secondary">{REFEREE_ROLE_LABEL[referee.role]}</span>
                      </div>
                    </td>
                    <td className="h-[52px] px-2.5">
                      <RefereeCategoryBadge category={referee.category} />
                    </td>
                    <td className="h-[52px] px-2.5 text-center">
                      <span
                        className={cn(
                          'inline-flex h-6 min-w-[40px] items-center justify-center rounded-md px-2 text-[11px] font-bold ring-1 ring-inset',
                          referee.category === 'FIFA'
                            ? 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300'
                            : 'bg-surface-sunken text-content-secondary ring-border-faint',
                        )}
                      >
                        {referee.license}
                      </span>
                    </td>
                    <td className="h-[52px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">
                      {age(referee.birthYear)}
                    </td>
                    <td className="h-[52px] px-2.5 text-center text-[13px] font-semibold tabular-nums text-content-primary">
                      {referee.matches}
                    </td>
                    <td className="h-[52px] px-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="inline-flex h-6 min-w-[34px] items-center justify-center gap-1.5 rounded-md bg-amber-400/15 px-2 text-[11px] font-bold tabular-nums text-amber-600 ring-1 ring-inset ring-amber-400/30 dark:text-amber-300">
                          <span className="h-2 w-2.5 rounded-[2px] bg-amber-400" />
                          {referee.yellowCards}
                        </span>
                        <span className="inline-flex h-6 min-w-[34px] items-center justify-center gap-1.5 rounded-md bg-rose-500/15 px-2 text-[11px] font-bold tabular-nums text-rose-600 ring-1 ring-inset ring-rose-500/30 dark:text-rose-300">
                          <span className="h-2 w-2.5 rounded-[2px] bg-rose-500" />
                          {referee.redCards}
                        </span>
                      </div>
                    </td>
                    <td className="h-[52px] px-2.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold tabular-nums text-content-primary">
                        <FaStar className="text-[10px] text-amber-400" />
                        {referee.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="h-[52px] px-2.5">
                      <div className="flex items-center gap-2">
                        <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
                        <span className={cn('text-[12px] font-semibold', tone.text)}>{REFEREE_STATUS_LABEL[referee.status]}</span>
                      </div>
                    </td>
                    <td className="h-[52px] px-2.5 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="whitespace-nowrap rounded-lg px-2 py-1 text-xs font-semibold text-accent transition-colors hover:text-content-primary"
                        >
                          Ver perfil
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
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
