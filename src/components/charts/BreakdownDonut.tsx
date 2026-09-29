import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatMillions, formatMoney } from '@/lib/format'

export interface BreakdownSlice {
  id: string
  label: string
  value: number
  percent: number
  color: string
}

interface BreakdownDonutProps {
  items: BreakdownSlice[]
  total: number
  centerLabel: string
  size?: number
  strokeWidth?: number
  ariaLabel: string
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function BreakdownDonut({
  items,
  total,
  centerLabel,
  size = 150,
  strokeWidth = 15,
  ariaLabel,
}: BreakdownDonutProps) {
  const [active, setActive] = useState<number | null>(null)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const segments = items.map((item, index) => {
    const start = items.slice(0, index).reduce((sum, prev) => sum + prev.percent / 100, 0)
    return { item, fraction: item.percent / 100, start }
  })

  const activeItem = active !== null ? items[active] : null

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={ariaLabel}>
        <g transform={`rotate(-90 ${center} ${center})`}>
          {segments.map((segment, index) => {
            const dash = Math.max(segment.fraction * circumference - 1.5, 0.5)
            return (
              <motion.circle
                key={segment.item.id}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-segment.start * circumference}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${segment.item.label}: ${segment.item.percent}%`}
              />
            )
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <span className="text-[19px] font-extrabold leading-none text-content-primary">
          {activeItem ? formatMoney(activeItem.value) : formatMillions(total)}
        </span>
        <span className="mt-1 text-[11px] leading-tight text-content-muted">
          {activeItem ? `${activeItem.label} · ${activeItem.percent}%` : centerLabel}
        </span>
      </div>
    </div>
  )
}
