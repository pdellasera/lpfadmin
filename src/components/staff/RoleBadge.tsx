import { cn } from '@/lib/cn'
import { STAFF_ROLE_GROUP } from '@/lib/staff'
import type { StaffRoleCode, StaffRoleGroupId } from '@/types'

const GROUP_TONE: Record<StaffRoleGroupId, string> = {
  tecnico: 'bg-sky-400/15 text-sky-600 ring-sky-400/30 dark:text-sky-300',
  medico: 'bg-emerald-400/15 text-emerald-600 ring-emerald-400/30 dark:text-emerald-300',
  administrativo: 'bg-violet-400/15 text-violet-600 ring-violet-400/30 dark:text-violet-300',
  todos: 'bg-slate-400/15 text-slate-600 ring-slate-400/30 dark:text-slate-300',
}

interface RoleBadgeProps {
  role: StaffRoleCode
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-[40px] items-center justify-center rounded-md px-2 text-[11px] font-bold tracking-wide ring-1 ring-inset',
        GROUP_TONE[STAFF_ROLE_GROUP[role]],
        className,
      )}
    >
      {role}
    </span>
  )
}
