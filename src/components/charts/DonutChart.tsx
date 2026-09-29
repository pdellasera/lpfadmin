import { motion } from 'framer-motion'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

interface DonutChartProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  label: string
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function DonutChart({ value, size = 150, strokeWidth = 14, label }: DonutChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} role="img" aria-label={`${label}: ${value}%`}>
          <defs>
            <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-brand-500)" />
              <stop offset="1" stopColor="var(--color-glow)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={strokeWidth}
          />
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#donut-grad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold text-content-primary">
            <AnimatedNumber value={value} format={(v) => `${Math.round(v)}%`} />
          </span>
        </div>
      </div>
      <p className="text-center text-xs font-medium text-content-muted">{label}</p>
    </div>
  )
}
