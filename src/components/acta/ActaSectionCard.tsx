import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ActaSectionCardProps {
  title: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
  bodyClassName?: string
  children?: ReactNode
}

export function ActaSectionCard({
  title,
  icon,
  action,
  className,
  bodyClassName,
  children,
}: ActaSectionCardProps) {
  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-card border border-border-strong bg-surface-card-deep shadow-card',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border-faint px-4 py-2.5">
        <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-content-secondary">
          {icon && <span className="flex items-center">{icon}</span>}
          {title}
        </h2>
        {action}
      </header>
      <div className={cn('flex-1 p-4', bodyClassName)}>{children}</div>
    </section>
  )
}