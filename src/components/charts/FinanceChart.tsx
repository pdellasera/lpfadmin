import { useState } from 'react'
import { motion } from 'framer-motion'
import { useElementSize } from '@/hooks/useElementSize'
import { formatAxisValue, formatMoney } from '@/lib/format'
import { barPath, diamondPath, linePath, niceCeil, ticks } from './chart-utils'
import type { TransparencyMonthPoint } from '@/types'

export type FinanceSeries = 'both' | 'ingresos' | 'pagos'

interface FinanceChartProps {
  data: TransparencyMonthPoint[]
  series?: FinanceSeries
  height?: number
  ariaLabel: string
}

const PAD_LEFT = 44
const PAD_BOTTOM = 24
const PAD_TOP = 12
const PAD_RIGHT = 8

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function niceStep(max: number): number {
  if (max <= 0) return 1
  const rough = max / 4
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const normalized = rough / magnitude
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return factor * magnitude
}

export function FinanceChart({ data, series = 'both', height = 220, ariaLabel }: FinanceChartProps) {
  const { ref, width } = useElementSize<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)

  const maxValue = Math.max(...data.map((d) => Math.max(d.ingresos, d.pagos)), 1)
  const step = niceStep(maxValue)
  const yMax = niceCeil(maxValue, step)
  const tickCount = Math.max(2, Math.round(yMax / step))
  const yTicks = ticks(yMax, tickCount)

  const plotHeight = height - PAD_TOP - PAD_BOTTOM
  const plotWidth = Math.max(width - PAD_LEFT - PAD_RIGHT, 1)
  const slot = plotWidth / Math.max(data.length, 1)

  const yFor = (value: number) => PAD_TOP + plotHeight - (Math.max(value, 0) / yMax) * plotHeight
  const barH = (value: number) => (Math.max(value, 0) / yMax) * plotHeight

  const grouped = series === 'both'
  const groupW = grouped ? Math.min(slot * 0.72, 46) : Math.min(slot * 0.5, 34)
  const barW = grouped ? (groupW - 4) / 2 : groupW

  const centerX = (index: number) => PAD_LEFT + slot * index + slot / 2
  const incomeX = (index: number) => (grouped ? centerX(index) - groupW / 2 : centerX(index) - barW / 2)
  const paymentX = (index: number) => incomeX(index) + barW + 4

  const linePoints = data.map((d, index) => ({
    x: centerX(index),
    y: yFor(d.ingresos - d.pagos),
  }))

  const activePoint = active !== null ? data[active] : null

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id="fin-income-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-chart-income)" />
            <stop offset="1" stopColor="var(--color-brand-700)" />
          </linearGradient>
          <linearGradient id="fin-payment-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-chart-p2)" />
            <stop offset="1" stopColor="var(--color-chart-payment)" />
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
                {formatAxisValue(tick)}
              </text>
            </g>
          )
        })}
        {data.map((d, index) => {
          const showIncome = series !== 'pagos'
          const showPayment = series !== 'ingresos'
          return (
            <g key={`${d.label}-${index}`}>
              {showIncome && (
                <motion.path
                  d={barPath(incomeX(index), yFor(d.ingresos), barW, barH(d.ingresos), 3)}
                  fill="url(#fin-income-grad)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.55, delay: index * 0.035, ease: EASE }}
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              )}
              {showPayment && (
                <motion.path
                  d={barPath(paymentX(index), yFor(d.pagos), barW, barH(d.pagos), 3)}
                  fill="url(#fin-payment-grad)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.55, delay: index * 0.035 + 0.05, ease: EASE }}
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              )}
            </g>
          )
        })}

        <motion.path
          d={linePath(linePoints)}
          fill="none"
          stroke="var(--color-chart-result)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 5px var(--color-chart-result))' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
        />
        {linePoints.map((point, index) => (
          <motion.path
            key={`diamond-${index}`}
            d={diamondPath(point.x, point.y, 3.5)}
            fill="var(--color-chart-result)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.05, ease: EASE }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {data.map((d, index) => (
          <text
            key={`label-${d.label}-${index}`}
            x={centerX(index)}
            y={height - 8}
            textAnchor="middle"
            fontSize="9"
            fill="var(--color-content-faint)"
          >
            {d.label}
          </text>
        ))}

        {data.map((d, index) => (
          <rect
            key={`hit-${d.label}-${index}`}
            x={centerX(index) - slot / 2}
            y={PAD_TOP}
            width={slot}
            height={plotHeight}
            fill="transparent"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            role="graphics-symbol"
            aria-label={`${d.label}: ingresos ${formatMoney(d.ingresos)}, pagos ${formatMoney(d.pagos)}`}
          />
        ))}
      </svg>

      {activePoint && active !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-brand-600/40 bg-ink-900/95 px-3 py-1.5 shadow-card"
          style={{
            left: centerX(active),
            top: Math.min(yFor(activePoint.ingresos), yFor(activePoint.pagos)) - 6,
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-content-muted">{activePoint.label}</p>
          <p className="text-xs font-bold text-content-primary">
            {series !== 'pagos' && <span>Ingresos {formatMoney(activePoint.ingresos)}</span>}
            {series !== 'pagos' && series !== 'ingresos' && <span className="mx-1 text-content-faint">·</span>}
            {series !== 'ingresos' && <span>Pagos {formatMoney(activePoint.pagos)}</span>}
          </p>
          <p className="text-xs font-semibold text-content-secondary">
            Resultado {formatMoney(activePoint.ingresos - activePoint.pagos)}
          </p>
        </div>
      )}
    </div>
  )
}
