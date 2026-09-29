import type { IconType } from 'react-icons'
import { FaBriefcaseMedical, FaFlag, FaIdBadge, FaUserShield, FaUserTie } from 'react-icons/fa6'
import { Badge } from '@/components/ui/Badge'
import type { ActaOfficial, ActaOfficialKind } from '@/types'
import { ActaSectionCard } from './ActaSectionCard'

const OFFICIAL_ICONS: Record<ActaOfficialKind, IconType> = {
  arbitro: FaUserShield,
  asistente1: FaFlag,
  asistente2: FaFlag,
  cuarto: FaFlag,
  comisario: FaUserTie,
  delegado: FaIdBadge,
  seguridad: FaUserShield,
  medico: FaBriefcaseMedical,
}

interface ActaOfficialsCardProps {
  officials: ActaOfficial[]
}

export function ActaOfficialsCard({ officials }: ActaOfficialsCardProps) {
  return (
    <ActaSectionCard title="Oficiales del partido">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {officials.map((official) => {
          const Icon = OFFICIAL_ICONS[official.kind]
          return (
            <div key={official.kind} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-sunken text-[14px] text-accent ring-1 ring-border-faint">
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">{official.role}</p>
                <p className="flex items-center gap-2 text-[13px] font-semibold text-content-primary">
                  <span className="truncate">{official.name}</span>
                  {official.badge && (
                    <Badge tone="brand" className="h-4 px-1.5 py-0 text-[9px]">
                      {official.badge}
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </ActaSectionCard>
  )
}