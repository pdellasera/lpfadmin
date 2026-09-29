import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

interface ChartCardProps {
  title: string
  subtitle?: string
  linkLabel?: string
  linkTo?: string
  className?: string
  children: ReactNode
}

export function ChartCard({ title, subtitle, linkLabel, linkTo, className, children }: ChartCardProps) {
  return (
    <Card className={cn('h-full p-4', className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-content-faint">{subtitle}</p>}
        </div>
        {linkLabel && linkTo && (
          <Link
            to={linkTo}
            className="flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300"
          >
            {linkLabel} <FaArrowRight className="text-[10px]" />
          </Link>
        )}
      </div>
      {children}
    </Card>
  )
}
