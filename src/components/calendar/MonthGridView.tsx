import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { CalendarGrid } from './CalendarGrid'
import { formatMonthTitle, monthMatrix } from '@/lib/format'
import type { CalendarFixture } from '@/types'

interface MonthGridViewProps {
  month: Date
  onMonthChange: (date: Date) => void
  todayIso: string
  fixturesByDate: Map<string, CalendarFixture[]>
  selectedDay: string
  onSelectDay: (iso: string) => void
}

export function MonthGridView({
  month,
  onMonthChange,
  todayIso,
  fixturesByDate,
  selectedDay,
  onSelectDay,
}: MonthGridViewProps) {
  const cells = monthMatrix(month.getFullYear(), month.getMonth())

  const shiftMonth = (delta: number) => onMonthChange(new Date(month.getFullYear(), month.getMonth() + delta, 1))

  const goToday = () => {
    const [year, monthIndex] = todayIso.split('-').map(Number)
    onMonthChange(new Date(year, monthIndex - 1, 1))
    onSelectDay(todayIso)
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-border-strong bg-surface-panel shadow-card">
      <div className="flex items-center justify-between border-b border-border-faint px-4 py-3">
        <h2 className="text-[17px] font-bold text-content-primary">
          {formatMonthTitle(month.getFullYear(), month.getMonth())}
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Mes anterior"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-surface-panel text-content-secondary transition-colors hover:text-content-primary"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            type="button"
            onClick={goToday}
            className="h-9 rounded-lg border border-border-strong bg-surface-panel px-3 text-[13px] font-semibold text-content-secondary transition-colors hover:text-content-primary"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Mes siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-surface-panel text-content-secondary transition-colors hover:text-content-primary"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      <CalendarGrid cells={cells} fixturesByDate={fixturesByDate} selectedDay={selectedDay} onSelectDay={onSelectDay} />
    </div>
  )
}
