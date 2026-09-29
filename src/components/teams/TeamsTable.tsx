import { FaEye, FaPenToSquare, FaTrashCan } from 'react-icons/fa6'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import type { Team } from '@/types'

interface TeamsTableProps {
  teams?: Team[]
  isLoading: boolean
}

const HEADERS = ['#', 'Escudo', 'Equipo', 'Competencia', 'Ciudad / Estadio', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'PTS', 'Estado', 'Acciones']

const NUMERIC_HEADERS = new Set(['PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'PTS'])

export function TeamsTable({ teams, isLoading }: TeamsTableProps) {
  if (isLoading || !teams) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-card border border-border-strong bg-surface-card-deep shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-faint">
              {HEADERS.map((header) => (
                <th
                  key={header}
                  className={cn(
                    'h-10 whitespace-nowrap px-2.5 text-[11px] font-semibold uppercase tracking-wide text-content-muted',
                    NUMERIC_HEADERS.has(header) && 'text-right',
                    header === 'Acciones' && 'text-right',
                    header === '#' && 'w-12 text-center',
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id} className="border-b border-border-faint last:border-b-0 hover:bg-overlay-subtle">
                <td className="h-10 px-2.5 text-center text-sm font-semibold text-content-muted">{index + 1}</td>
                <td className="h-10 px-2.5">
                  <TeamCrest club={team.club} size={28} />
                </td>
                <td className="h-10 px-2.5">
                  <p className="truncate text-[14px] font-bold leading-tight text-content-primary">{team.club.name}</p>
                  <p className="truncate text-[11px] leading-tight text-content-muted">{team.club.fullName}</p>
                </td>
                <td className="h-10 px-2.5 text-[13px] text-content-secondary">{team.competition}</td>
                <td className="h-10 px-2.5">
                  <p className="truncate text-[13px] font-semibold leading-tight text-content-primary">{team.city}</p>
                  <p className="truncate text-[11px] leading-tight text-content-muted">{team.stadium}</p>
                </td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.played}</td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.won}</td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.drawn}</td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.lost}</td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.goalsFor}</td>
                <td className="h-10 px-2.5 text-right text-[13px] text-content-secondary tabular-nums">{team.goalsAgainst}</td>
                <td className="h-10 px-2.5 text-right text-[15px] font-bold text-content-primary tabular-nums">{team.points}</td>
                <td className="h-10 px-2.5">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2.5 w-2.5 rounded-full', team.status === 'activo' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-slate-500')} />
                    <span className={cn('text-xs font-semibold', team.status === 'activo' ? 'text-emerald-600 dark:text-emerald-400' : 'text-content-muted')}>
                      {team.status === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </td>
                <td className="h-10 px-2.5">
                  <div className="flex items-center justify-end gap-1.5">
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
                      aria-label="Eliminar"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-faint bg-surface-input text-content-secondary transition-colors hover:bg-rose-500/15 hover:text-rose-300"
                    >
                      <FaTrashCan className="text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
