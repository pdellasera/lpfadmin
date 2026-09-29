import { useState } from 'react'
import type { Club } from '@/types'
import { cn } from '@/lib/cn'

interface TeamCrestProps {
  club: Club
  size?: number
  className?: string
}

export function TeamCrest({ club, size = 40, className }: TeamCrestProps) {
  const [failed, setFailed] = useState(false)

  if (club.crestUrl && !failed) {
    return (
      <img
        src={club.crestUrl}
        alt={`Escudo de ${club.name}`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('shrink-0 object-contain', className)}
      />
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={cn('shrink-0', className)}
      role="img"
      aria-label={`Escudo de ${club.name}`}
    >
      <path
        d="M20 2 L35 7 V20 C35 29 28.5 35.5 20 39 C11.5 35.5 5 29 5 20 V7 Z"
        fill={club.primaryColor}
        stroke={club.secondaryColor}
        strokeWidth="2"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={club.secondaryColor}
        fontFamily="inherit"
      >
        {club.shortName}
      </text>
    </svg>
  )
}
