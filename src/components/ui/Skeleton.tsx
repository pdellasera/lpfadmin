import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-lg bg-ink-700/70', className)} aria-hidden="true" />
}
