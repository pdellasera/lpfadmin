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

// ===== Calendario =====

const MONTHS_LONG = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const

const MONTHS_SHORT_LOWER = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'] as const

export const WEEKDAYS_SHORT = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'] as const

export interface CalendarCell {
  iso: string
  day: number
  inMonth: boolean
}

export function formatMonthTitle(year: number, monthIndex: number): string {
  return `${MONTHS_LONG[monthIndex]} ${year}`
}

export function formatDayMonthShort(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return `${date.getDate()} ${MONTHS_SHORT_LOWER[date.getMonth()]}`
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Devuelve el lunes de la semana de la fecha dada. */
export function startOfWeekMonday(date: Date): Date {
  const result = new Date(date)
  const day = (result.getDay() + 6) % 7 // Lunes=0 … Domingo=6
  result.setDate(result.getDate() - day)
  return result
}

/** Rejilla de 42 celdas (6 semanas) empezando en lunes. */
export function monthMatrix(year: number, monthIndex: number): CalendarCell[] {
  const start = startOfWeekMonday(new Date(year, monthIndex, 1))
  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    cells.push({ iso: toIsoDate(date), day: date.getDate(), inMonth: date.getMonth() === monthIndex })
  }
  return cells
}

/** Rejilla de 7 celdas (una semana) empezando en lunes. */
export function weekMatrix(date: Date): CalendarCell[] {
  const start = startOfWeekMonday(date)
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    return { iso: toIsoDate(day), day: day.getDate(), inMonth: true }
  })
}
