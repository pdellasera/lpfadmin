import { cn } from '@/lib/cn'
import { REFEREE_ROLE_GROUP } from '@/lib/referees'
import type { RefereeRoleCode, RefereeRoleGroupId } from '@/types'

const GROUP_TONE: Record<RefereeRoleGroupId, string> = {
  centrales: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300',
  asistentes: 'bg-sky-400/15 text-sky-600 ring-sky-400/30 dark:text-sky-300',
  var: 'bg-violet-400/15 text-violet-600 ring-violet-400/30 dark:text-violet-300',
  comisarios: 'bg-emerald-400/15 text-emerald-600 ring-emerald-400/30 dark:text-emerald-300',
  todos: 'bg-slate-400/15 text-slate-600 ring-slate-400/30 dark:text-slate-300',
}

interface RefereeRoleBadgeProps {
  role: RefereeRoleCode
  className?: string
}

export function RefereeRoleBadge({ role, className }: RefereeRoleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-[40px] items-center justify-center rounded-md px-2 text-[11px] font-bold tracking-wide ring-1 ring-inset',
        GROUP_TONE[REFEREE_ROLE_GROUP[role]],
        className,
      )}
    >
      {role}
    </span>
  )
}
