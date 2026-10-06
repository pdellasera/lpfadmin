import type { IconType } from 'react-icons'
import { FaChartLine, FaFileLines, FaFileSignature, FaUsers } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import type { ReportCategoryId } from '@/types'

const ICONS: Record<ReportCategoryId, IconType> = {
  jornada: FaFileLines,
  competicion: FaChartLine,
  disciplinarios: FaFileSignature,
  administrativos: FaUsers,
}

interface ReportIconProps {
  category: ReportCategoryId
  className?: string
}

export function ReportIcon({ category, className }: ReportIconProps) {
  const Icon = ICONS[category]
  return (
    <span
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/15 text-lg text-brand-600 ring-1 ring-brand-600/30 dark:text-brand-300',
        className,
      )}
    >
      <Icon />
    </span>
  )
}