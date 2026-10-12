import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { LpfUniversity } from '@/types'

interface UniversityCrestProps {
  university: LpfUniversity
  size?: number
  className?: string
  rounded?: 'md' | 'lg' | 'full'
}

export function UniversityCrest({ university, size = 32, className, rounded = 'lg' }: UniversityCrestProps) {
  const [failed, setFailed] = useState(false)

  if (university.logoUrl && !failed) {
    return (
      <img
        src={university.logoUrl}
        alt={`Logo de ${university.name}`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('shrink-0 object-contain', className)}
      />
    )
  }

  const radius = rounded === 'full' ? 'rounded-full' : rounded === 'md' ? 'rounded-lg' : 'rounded-xl'

  return (
    <span
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center font-bold text-white ring-1 ring-white/10',
        radius,
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.34),
        background: `linear-gradient(135deg, ${university.color}, #0b1e33)`,
      }}
      aria-hidden="true"
    >
      {university.shortName}
    </span>
  )
}
