import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa6'
import { cn } from '@/lib/cn'

interface SectionHeaderProps {
  title: string
  icon?: ReactNode
  linkLabel?: string
  linkTo?: string
  className?: string
}

export function SectionHeader({ title, icon, linkLabel, linkTo, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="flex items-center gap-2.5">
        {icon && <span className="text-brand-400">{icon}</span>}
        <h2 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h2>
      </div>
      {linkLabel && linkTo && (
        <Link
          to={linkTo}
          className="group flex items-center gap-1 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300"
        >
          {linkLabel}
          <FaChevronRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
