import { FaEllipsisVertical, FaPenToSquare } from 'react-icons/fa6'
import { PositionBadge } from '@/components/players/PositionBadge'
import { Avatar } from '@/components/ui/Avatar'
import { PanamaFlag } from '@/components/ui/PanamaFlag'
import { Skeleton } from '@/components/ui/Skeleton'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import type { Player, PlayerStatus } from '@/types'

interface PlayersTableProps {
  players?: Player[]
  isLoading: boolean
  startIndex?: number
}

const HEADERS = ['#', 'Jugador', 'Equipo', 'Posición', 'Edad', 'PJ', 'Goles', 'Asist.', 'TA', 'TR', 'Estado', 'Acciones']
const NUMERIC_HEADERS = new Set(['Edad', 'PJ', 'Goles', 'Asist.', 'TA', 'TR'])

const STATUS_LABEL: Record<PlayerStatus, string> = {
  disponible: 'Disponible',
  lesionado: 'Lesionado',
  suspendido: 'Suspendido',
}

const STATUS_DOT: Record<PlayerStatus, string> = {
  disponible: 'bg-emerald-400',
  lesionado: 'bg-amber-400',
  suspendido: 'bg-rose-500',
}

const STATUS_TEXT: Record<PlayerStatus, string> = {
  disponible: 'text-emerald-600 dark:text-emerald-300',
  lesionado: 'text-amber-600 dark:text-amber-300',
  suspendido: 'text-rose-600 dark:text-rose-300',
}

function headerClass(header: string): string {
  if (header === '#') return 'w-12 text-center'
  if (header === 'Acciones') return 'text-right'
  if (NUMERIC_HEADERS.has(header)) return 'text-center'
  return ''
}

export function PlayersTable({ players, isLoading, startIndex = 0 }: PlayersTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-strong bg-surface-deep shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1260px] border-collapse text-left">
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
            {isLoading || !players ? (
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border-faint last:border-0">
                  {HEADERS.map((header) => (
                    <td key={header} className="h-[50px] px-2.5 first:pl-4 last:pr-4">
                      <Skeleton
                        className={cn(
                          'h-3.5',
                          header === '#' || header === 'Posición'
                            ? 'w-8'
                            : header === 'Jugador' || header === 'Equipo'
                              ? 'w-24'
                              : 'w-10',
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              players.map((player, index) => (
                <tr key={player.id} className="border-b border-border-faint transition-colors last:border-0 hover:bg-surface-sunken">
                  <td className="h-[50px] pl-4 text-center text-[13px] font-medium tabular-nums text-content-faint">
                    {startIndex + index + 1}
                  </td>
                  <td className="h-[50px] px-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={player.name} src={player.photoUrl} size={36} />
                      <div className="min-w-0 leading-tight">
                        <p className="truncate text-[14px] font-bold text-content-primary">{player.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-content-muted">
                          <PanamaFlag size={12} className="rounded-[2px]" />
                          Panamá
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="h-[50px] px-2.5">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest club={player.club} size={28} />
                      <span className="truncate text-[13px] font-semibold text-content-secondary">{player.club.name}</span>
                    </div>
                  </td>
                  <td className="h-[50px] px-2.5">
                    <PositionBadge position={player.position} />
                  </td>
                  <td className="h-[50px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{player.age}</td>
                  <td className="h-[50px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{player.played}</td>
                  <td className="h-[50px] px-2.5 text-center text-[13px] font-bold tabular-nums text-content-primary">{player.goals}</td>
                  <td className="h-[50px] px-2.5 text-center text-[13px] tabular-nums text-content-secondary">{player.assists}</td>
                  <td className="h-[50px] px-2.5 text-center">
                    {player.yellowCards > 0 ? (
                      <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-amber-400 px-1 text-[11px] font-bold text-black">
                        {player.yellowCards}
                      </span>
                    ) : (
                      <span className="text-[13px] text-content-faint">0</span>
                    )}
                  </td>
                  <td className="h-[50px] px-2.5 text-center">
                    {player.redCards > 0 ? (
                      <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-rose-500 px-1 text-[11px] font-bold text-white">
                        {player.redCards}
                      </span>
                    ) : (
                      <span className="text-[13px] text-content-faint">0</span>
                    )}
                  </td>
                  <td className="h-[50px] px-2.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[player.status])} />
                      <span className={cn('text-[12px] font-semibold', STATUS_TEXT[player.status])}>
                        {STATUS_LABEL[player.status]}
                      </span>
                    </div>
                  </td>
                  <td className="h-[50px] px-2.5 pr-4">
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
