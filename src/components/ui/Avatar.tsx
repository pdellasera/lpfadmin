import { useState } from 'react'
import { cn } from '@/lib/cn'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

interface AvatarProps {
  name: string
  color?: string
  size?: number
  src?: string
  className?: string
}

export function Avatar({ name, color = '#1b7bf0', size = 36, src, className }: AvatarProps) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('shrink-0 select-none rounded-full object-cover object-top ring-2 ring-overlay-ring', className)}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ring-2 ring-overlay-ring',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: `linear-gradient(135deg, ${color}, #0b4fa8)`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
