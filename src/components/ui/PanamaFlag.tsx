import { cn } from '@/lib/cn'

const STAR = 'M8,2 L9.4,6.1 L13.7,6.2 L10.3,8.7 L11.5,12.9 L8,10.4 L4.5,12.9 L5.7,8.7 L2.3,6.2 L6.6,6.1 Z'

interface PanamaFlagProps {
  size?: number
  className?: string
}

export function PanamaFlag({ size = 18, className }: PanamaFlagProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="Bandera de Panamá"
    >
      <rect width="32" height="32" fill="#ffffff" />
      <rect x="16" width="16" height="16" fill="#D21034" />
      <rect y="16" width="16" height="16" fill="#005293" />
      <path d={STAR} fill="#005293" />
      <g transform="translate(16 16)">
        <path d={STAR} fill="#D21034" />
      </g>
    </svg>
  )
}
