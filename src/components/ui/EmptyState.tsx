import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line py-10 text-center">
      {icon && <div className="text-3xl text-content-faint">{icon}</div>}
      <p className="text-sm font-semibold text-content-secondary">{title}</p>
      {description && <p className="max-w-sm text-xs text-content-faint">{description}</p>}
    </div>
  )
}
