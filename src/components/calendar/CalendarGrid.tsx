import { cn } from '@/lib/cn'
import { WEEKDAYS_SHORT } from '@/lib/format'
import type { CalendarCell } from '@/lib/format'
import type { CalendarFixture } from '@/types'
import { CalendarMatchPill } from './CalendarMatchPill'

interface CalendarGridProps {
  cells: CalendarCell[]
  fixturesByDate: Map<string, CalendarFixture[]>
  selectedDay: string
  onSelectDay: (iso: string) => void
}

export function CalendarGrid({ cells, fixturesByDate, selectedDay, onSelectDay }: CalendarGridProps) {
  const rows: CalendarCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-border-faint">
        {WEEKDAYS_SHORT.map((day) => (
          <div
            key={day}
            className="flex h-11 items-center justify-center text-[11px] font-bold uppercase tracking-[0.08em] text-content-faint"
          >
            {day}
          </div>
        ))}
      </div>

      {rows.map((row, rowIndex) => (
        <div key={row[0]?.iso ?? rowIndex} className="grid grid-cols-7">
          {row.map((cell) => {
            const items = fixturesByDate.get(cell.iso) ?? []
            const selected = cell.iso === selectedDay

            return (
              <button
                key={cell.iso}
                type="button"
                onClick={() => onSelectDay(cell.iso)}
                className={cn(
                  'min-h-[118px] border-b border-r border-border-faint p-1.5 text-left align-top transition-colors hover:bg-overlay-subtle',
                  rowIndex === rows.length - 1 && 'border-b-0',
                  'last:border-r-0',
                  !cell.inMonth && 'bg-surface-sunken',
                )}
              >
                <span className="flex h-6 items-center">
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-semibold',
                      selected
                        ? 'bg-cta-navy text-white'
                        : cell.inMonth
                          ? 'text-content-primary'
                          : 'text-content-faint',
                    )}
                  >
                    {cell.day}
                  </span>
                </span>

                <span className="mt-1 flex flex-col gap-1">
                  {items.map((match) => (
                    <CalendarMatchPill key={match.id} match={match} />
                  ))}
                </span>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
