import { useState } from 'react'
import { motion } from 'framer-motion'
import { useElementSize } from '@/hooks/useElementSize'
import { formatNumber } from '@/lib/format'
import { barPath, niceCeil, ticks } from './chart-utils'

interface BarChartDatum {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartDatum[]
  highlightIndex?: number
  height?: number
  formatValue?: (value: number) => string
  unitLabel?: string
  ariaLabel: string
}

const PAD_LEFT = 46
const PAD_BOTTOM = 24
const PAD_TOP = 44
const PAD_RIGHT = 8

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function BarChart({
  data,
  highlightIndex = -1,
  height = 230,
  formatValue = formatNumber,
  unitLabel = 'espectadores',
  ariaLabel,
}: BarChartProps) {
  const { ref, width } = useElementSize<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)

  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const yMax = niceCeil(maxValue, 5000)
  const yTicks = ticks(yMax, 5)

  const plotHeight = height - PAD_TOP - PAD_BOTTOM
  const plotWidth = Math.max(width - PAD_LEFT - PAD_RIGHT, 1)
  const slot = plotWidth / data.length
  const barWidth = Math.min(slot * 0.5, 36)

  const xFor = (index: number) => PAD_LEFT + slot * index + (slot - barWidth) / 2
  const yFor = (value: number) => PAD_TOP + plotHeight - (value / yMax) * plotHeight
  const barH = (value: number) => (value / yMax) * plotHeight

  const displayIndex = active ?? (highlightIndex >= 0 ? highlightIndex : null)

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-brand-500)" />
            <stop offset="1" stopColor="var(--color-brand-700)" />
          </linearGradient>
          <linearGradient id="bar-grad-hot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-brand-300)" />
            <stop offset="1" stopColor="var(--color-brand-600)" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = yFor(tick)
          return (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={width - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--color-line)"
                strokeDasharray="3 4"
                strokeWidth="1"
              />
              <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end" fontSize="9" fill="var(--color-content-faint)">
                {formatNumber(tick)}
              </text>
            </g>
          )
        })}

        {data.map((datum, index) => {
          const x = xFor(index)
          const h = barH(datum.value)
          const isHot = index === displayIndex
          return (
            <motion.path
              key={`${datum.label}-${index}`}
              d={barPath(x, yFor(datum.value), barWidth, h, 4)}
              fill={isHot ? 'url(#bar-grad-hot)' : 'url(#bar-grad)'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: '50% 100%',
                filter: isHot ? 'drop-shadow(0 0 8px rgba(46,139,255,0.7))' : undefined,
              }}
              tabIndex={0}
              role="graphics-symbol"
              aria-label={`${datum.label}: ${formatValue(datum.value)} ${unitLabel}`}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            />
          )
        })}

        {data.map((datum, index) => (
          <text
            key={`label-${datum.label}-${index}`}
            x={xFor(index) + barWidth / 2}
            y={height - 8}
            textAnchor="middle"
            fontSize="9"
            fill="var(--color-content-faint)"
          >
            {datum.label}
          </text>
        ))}
      </svg>

      {displayIndex !== null && data[displayIndex] && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-brand-600/40 bg-ink-900/95 px-3 py-1.5 shadow-card"
          style={{
            left: xFor(displayIndex) + barWidth / 2,
            top: yFor(data[displayIndex].value) - 6,
          }}
        >
          <span className="text-xs font-bold text-content-primary">
            {formatValue(data[displayIndex].value)}
          </span>
          <span className="ml-1 text-xs text-content-muted">{unitLabel}</span>
        </div>
      )}
    </div>
  )
}
