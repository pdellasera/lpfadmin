import { FaEllipsisVertical, FaGlobe, FaPenToSquare } from 'react-icons/fa6'
import { RoleBadge } from '@/components/staff/RoleBadge'
import { Avatar } from '@/components/ui/Avatar'
import { PanamaFlag } from '@/components/ui/PanamaFlag'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatMoney } from '@/lib/format'
import { STAFF_ROLE_LABEL } from '@/lib/staff'
import type { StaffMember } from '@/types'

interface StaffTableProps {
  staff?: StaffMember[]
  isLoading: boolean
  startIndex?: number
}

const HEADERS = ['#', 'Miembro', 'Cargo', 'Equipo', 'Licencia', 'Año nac.', 'Ingreso', 'Salario', 'Estado', 'Acciones']
const NUMERIC_HEADERS = new Set(['Licencia', 'Año nac.', 'Ingreso', 'Salario'])

function headerClass(header: string): string {
  if (header === '#') return 'w-12 text-center'
  if (header === 'Acciones') return 'text-right'
  if (NUMERIC_HEADERS.has(header)) return 'text-center'
  return ''
}

export function StaffTable({ staff, isLoading, startIndex = 0 }: StaffTableProps) {
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
            {isLoading || !staff ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border-faint last:border-0">
                  {HEADERS.map((header) => (
                    <td key={header} className="h-[52px] px-2.5 first:pl-4 last:pr-4">
                      <Skeleton
                        className={cn(
                          'h-3.5',
                          header === '#'
                            ? 'w-6'
                            : header === 'Miembro'
                              ? 'w-28'
                              : header === 'Cargo'
                                ? 'w-20'
                                : header === 'Equipo'
                                  ? 'w-24'
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
              staff.map((member, index) => (
                <tr key={member.id} className="border-b border-border-faint transition-colors last:border-0 hover:bg-surface-sunken">
                  <td className="h-[52px] pl-4 text-center text-[13px] font-medium tabular-nums text-content-faint">
                    {startIndex + index + 1}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} color={member.club.primaryColor} size={36} />
                      <div className="min-w-0 leading-tight">
                        <p className="truncate text-[14px] font-bold text-content-primary">{member.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-content-muted">
                          {member.foreign ? (
                            <FaGlobe className="text-[10px]" />
                          ) : (
                            <PanamaFlag size={12} className="rounded-[2px]" />
                          )}
                          {member.nationality}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-2">
                      <RoleBadge role={member.role} />
                      <span className="truncate text-[12px] text-content-secondary">{STAFF_ROLE_LABEL[member.role]}</span>
                    </div>
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest club={member.club} size={28} />
                      <span className="truncate text-[13px] font-semibold text-content-secondary">{member.club.name}</span>
                    </div>
                  </td>
                  <td className="h-[52px] px-2.5 text-center">
                    <span
                      className={cn(
                        'inline-flex h-6 min-w-[40px] items-center justify-center rounded-md px-2 text-[11px] font-bold ring-1 ring-inset',
                        member.license === '—'
                          ? 'bg-surface-sunken text-content-faint ring-border-faint'
                          : 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
                      )}
                    >
                      {member.license}
                    </span>
                  </td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{member.birthYear}</td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{member.joinedYear}</td>
                  <td className="h-[52px] px-2.5 text-center text-[13px] font-semibold tabular-nums text-content-primary">
                    {formatMoney(member.salary)}
                  </td>
                  <td className="h-[52px] px-2.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-1.5 w-1.5 rounded-full', member.status === 'activo' ? 'bg-emerald-400' : 'bg-slate-400')} />
                      <span
                        className={cn(
                          'text-[12px] font-semibold',
                          member.status === 'activo' ? 'text-emerald-600 dark:text-emerald-300' : 'text-content-muted',
                        )}
                      >
                        {member.status === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
