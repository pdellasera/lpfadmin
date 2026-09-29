import { FaPenToSquare } from 'react-icons/fa6'
import { PositionBadge } from '@/components/players/PositionBadge'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import type { ActaPlayerRow, ActaStaffRow, ActaTeamSheet } from '@/types'
import { ActaSectionCard } from './ActaSectionCard'

function CardChip({ tone, count }: { tone: 'yellow' | 'red'; count: number }) {
  return (
    <span
      title={tone === 'yellow' ? 'Tarjetas amarillas' : 'Tarjetas rojas'}
      className={cn(
        'inline-flex h-3.5 min-w-[15px] items-center justify-center rounded-[3px] px-0.5 text-[8px] font-bold',
        tone === 'yellow' ? 'bg-amber-400 text-black' : 'bg-rose-500 text-white',
      )}
    >
      {count}
    </span>
  )
}

function PlayerTable({ title, rows }: { title: string; rows: ActaPlayerRow[] }) {
  return (
    <div>
      <div className="px-4 pb-1 pt-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-content-muted">
          {title} ({rows.length})
        </span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y border-border-faint bg-surface-sunken">
            <th className="w-8 px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-wide text-content-faint">#</th>
            <th className="px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-wide text-content-faint">Jugador</th>
            <th className="w-14 px-2 py-1 text-right text-[10px] font-semibold uppercase tracking-wide text-content-faint">Pos</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((player) => (
            <tr key={`${player.number}-${player.name}`} className="border-b border-border-faint last:border-0">
              <td className="px-2 py-[3px] text-[12px] font-semibold tabular-nums text-content-muted">{player.number}</td>
              <td className="px-2 py-[3px]">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[12px] font-semibold text-content-primary">{player.name}</span>
                  {player.yellowCards ? <CardChip tone="yellow" count={player.yellowCards} /> : null}
                  {player.redCards ? <CardChip tone="red" count={player.redCards} /> : null}
                </span>
              </td>
              <td className="px-2 py-[3px] text-right">
                <PositionBadge position={player.position} className="ml-auto h-4 min-w-[36px] px-1 text-[9px]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StaffBlock({ staff }: { staff: ActaStaffRow[] }) {
  return (
    <div className="border-t border-border-faint px-4 py-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-content-muted">Cuerpo técnico</span>
      <ul className="mt-1.5 space-y-1">
        {staff.map((member) => (
          <li key={member.code} className="flex items-center gap-2">
            <span className="inline-flex h-5 w-8 shrink-0 items-center justify-center rounded bg-surface-control text-[9px] font-bold text-accent">
              {member.code}
            </span>
            <span className="truncate text-[12px] font-semibold text-content-primary">{member.name}</span>
            <span className="ml-auto truncate text-[11px] text-content-faint">{member.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface ActaLineupCardProps {
  sheet: ActaTeamSheet
  className?: string
}

export function ActaLineupCard({ sheet, className }: ActaLineupCardProps) {
  return (
    <ActaSectionCard
      title={sheet.club.fullName ?? sheet.club.name}
      icon={<TeamCrest club={sheet.club} size={18} />}
      className={className}
      bodyClassName="p-0"
      action={
        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md border border-border-action bg-surface-control px-2.5 text-[11px] font-semibold text-content-primary transition-colors hover:bg-surface-control-hover"
        >
          <FaPenToSquare className="text-[10px]" />
          Editar
        </button>
      }
    >
      <PlayerTable title="Titulares" rows={sheet.starters} />
      <PlayerTable title="Suplentes" rows={sheet.substitutes} />
      <StaffBlock staff={sheet.staff} />
    </ActaSectionCard>
  )
}