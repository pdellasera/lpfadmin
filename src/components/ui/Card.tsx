import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-line/60 bg-surface-card-solid shadow-card',
        interactive && 'transition-colors hover:border-brand-600/50',
        className,
      )}
      {...props}
    />
  )
}
