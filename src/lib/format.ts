const numberFormat = new Intl.NumberFormat('es-PA')
const compactFormat = new Intl.NumberFormat('es-PA', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

export function formatCompact(value: number): string {
  return compactFormat.format(value)
}

export function formatFullDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return new Intl.DateTimeFormat('es-PA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return new Intl.DateTimeFormat('es-PA', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

const MATCH_WEEKDAYS = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'] as const
const MATCH_MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'] as const

export interface MatchDateParts {
  weekday: string
  day: string
  month: string
  year: string
}

export function parseMatchDate(iso: string): MatchDateParts {
  const date = new Date(`${iso}T00:00:00`)
  return {
    weekday: MATCH_WEEKDAYS[date.getDay()],
    day: String(date.getDate()),
    month: MATCH_MONTHS[date.getMonth()],
    year: String(date.getFullYear()),
  }
}

export function formatMoney(value: number): string {
  return `$ ${formatNumber(value)}`
}

export function formatMillions(value: number): string {
  return `$${(value / 1_000_000).toFixed(2)}M`
}

export function formatAxisValue(value: number): string {
  if (value === 0) return '0'
  if (value >= 1_000_000) {
    const trimmed = (value / 1_000_000).toFixed(1).replace(/\.0$/, '')
    return `${trimmed}M`
  }
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return formatNumber(value)
}

export function formatDocDate(iso: string): string {
  const parts = parseMatchDate(iso)
  const month = parts.month.charAt(0) + parts.month.slice(1).toLowerCase()
  return `${parts.day} ${month} ${parts.year}`
}
