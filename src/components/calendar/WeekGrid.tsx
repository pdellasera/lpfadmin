import { CalendarGrid } from './CalendarGrid'
import { formatDayMonthShort, weekMatrix } from '@/lib/format'
import type { CalendarFixture } from '@/types'

interface WeekGridProps {
  anchorIso: string
  fixturesByDate: Map<string, CalendarFixture[]>
  selectedDay: string
  onSelectDay: (iso: string) => void
}

export function WeekGrid({ anchorIso, fixturesByDate, selectedDay, onSelectDay }: WeekGridProps) {
  const anchor = new Date(`${anchorIso}T00:00:00`)
  const cells = weekMatrix(anchor)
  const first = cells[0].iso
  const last = cells[cells.length - 1].iso

  return (
    <div className="overflow-hidden rounded-[12px] border border-border-strong bg-surface-panel shadow-card">
      <div className="flex items-center justify-between border-b border-border-faint px-4 py-3">
        <h2 className="text-[15px] font-bold text-content-primary">
          Semana del {formatDayMonthShort(first)} al {formatDayMonthShort(last)}
        </h2>
      </div>

      <CalendarGrid cells={cells} fixturesByDate={fixturesByDate} selectedDay={selectedDay} onSelectDay={onSelectDay} />
    </div>
  )
}
