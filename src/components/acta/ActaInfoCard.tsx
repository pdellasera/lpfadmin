import type { IconType } from 'react-icons'
import { FaCalendarDays, FaCloudSun, FaLocationDot, FaRegClock, FaVectorSquare } from 'react-icons/fa6'
import { GiSoccerField } from 'react-icons/gi'
import { TbBuildingStadium } from 'react-icons/tb'
import type { ActaInfoItem } from '@/types'
import { ActaSectionCard } from './ActaSectionCard'

const INFO_ICONS: Record<ActaInfoItem['id'], IconType> = {
  fecha: FaCalendarDays,
  hora: FaRegClock,
  estadio: TbBuildingStadium,
  ciudad: FaLocationDot,
  campo: GiSoccerField,
  condiciones: FaVectorSquare,
  clima: FaCloudSun,
}

interface ActaInfoCardProps {
  info: ActaInfoItem[]
}

export function ActaInfoCard({ info }: ActaInfoCardProps) {
  return (
    <ActaSectionCard title="Información del partido">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
        {info.map((item) => {
          const Icon = INFO_ICONS[item.id]
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-sunken text-[15px] text-accent ring-1 ring-border-faint">
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-content-faint">{item.label}</p>
                <p className="truncate text-[13px] font-semibold text-content-primary">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </ActaSectionCard>
  )
}