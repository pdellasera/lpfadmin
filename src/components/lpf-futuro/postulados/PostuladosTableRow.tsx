import { PostuladosEstadoBadge } from '@/components/lpf-futuro/PostuladosEstadoBadge'
import { UniversityCrest } from '@/components/lpf-futuro/UniversityCrest'
import { Avatar } from '@/components/ui/Avatar'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { cn } from '@/lib/cn'
import { formatDocDate } from '@/lib/format'
import type { LpfPostulante } from '@/types'

interface PostuladosTableRowProps {
  postulante: LpfPostulante
  selected: boolean
  checked: boolean
  onSelect: (id: string) => void
  onToggle: (id: string) => void
}

export function PostuladosTableRow({
  postulante,
  selected,
  checked,
  onSelect,
  onToggle,
}: PostuladosTableRowProps) {
  return (
    <tr
      onClick={() => onSelect(postulante.id)}
      className={cn(
        'cursor-pointer border-b border-line/60 transition-colors',
        selected ? 'bg-surface-raised/70' : 'hover:bg-surface-raised/40',
      )}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={checked}
          onClick={(event) => event.stopPropagation()}
          onChange={() => onToggle(postulante.id)}
          aria-label={`Seleccionar a ${postulante.name}`}
          className="h-4 w-4 cursor-pointer rounded border-border-faint bg-surface-input accent-brand-600"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={postulante.name} color={postulante.avatarColor} size={40} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-content-primary">{postulante.name}</p>
            <p className="truncate text-xs text-content-faint">{postulante.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="truncate text-sm font-medium text-content-primary">{postulante.vacante}</p>
        <p className="truncate text-xs text-content-faint">{postulante.area}</p>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-2">
          <UniversityCrest university={postulante.university} size={24} rounded="md" />
          <span className="truncate text-sm text-content-secondary">{postulante.university.shortName}</span>
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-2">
          <TeamCrest club={postulante.club} size={24} />
          <span className="truncate text-sm text-content-secondary">{postulante.club.name}</span>
        </span>
      </td>
      <td className="px-4 py-3">
        <PostuladosEstadoBadge state={postulante.state} />
      </td>
      <td className="px-4 py-3 text-sm text-content-muted">{formatDocDate(postulante.date)}</td>
    </tr>
  )
}
