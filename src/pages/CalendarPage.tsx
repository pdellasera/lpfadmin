import { useMemo, useState } from 'react'
import { referenceMonth, referenceToday } from '@/api/mocks/calendar'
import { CalendarCategoryPills } from '@/components/calendar/CalendarCategoryPills'
import type { CategoryFilterId } from '@/components/calendar/CalendarCategoryPills'
import { CalendarToolbar } from '@/components/calendar/CalendarToolbar'
import { CalendarViewToggle } from '@/components/calendar/CalendarViewToggle'
import { MonthGridView } from '@/components/calendar/MonthGridView'
import { UpcomingMatchesTable } from '@/components/calendar/UpcomingMatchesTable'
import { WeekGrid } from '@/components/calendar/WeekGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCalendarFixtures, useUpcomingFixtures } from '@/hooks/useCalendarQueries'
import { formatDayMonthShort } from '@/lib/format'
import type { CalendarFixture, CalendarView } from '@/types'

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>('mensual')
  const [category, setCategory] = useState<CategoryFilterId>('todas')
  const [month, setMonth] = useState<Date>(referenceMonth)
  const [selectedDay, setSelectedDay] = useState<string>(referenceToday)

  const { data: fixtures, isLoading } = useCalendarFixtures()
  const { data: upcoming, isLoading: upcomingLoading } = useUpcomingFixtures()

  const fixturesByDate = useMemo(() => {
    const map = new Map<string, CalendarFixture[]>()
    const filtered = (fixtures ?? []).filter((fixture) => category === 'todas' || fixture.category === category)
    for (const fixture of filtered) {
      const list = map.get(fixture.date) ?? []
      list.push(fixture)
      map.set(fixture.date, list)
    }
    return map
  }, [fixtures, category])

  const filteredCount = [...fixturesByDate.values()].reduce((acc, list) => acc + list.length, 0)

  return (
    <div className="space-y-4">
      <CalendarToolbar />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CalendarCategoryPills value={category} onChange={setCategory} />
        <CalendarViewToggle value={view} onChange={setView} />
      </div>

      {isLoading || !fixtures ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <Skeleton className="h-[560px] w-full rounded-[12px]" />
          <Skeleton className="h-[560px] w-full rounded-[12px]" />
        </div>
      ) : view === 'lista' ? (
        <CalendarList fixtures={[...fixturesByDate.values()].flat()} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            {view === 'semanal' ? (
              <WeekGrid
                anchorIso={selectedDay}
                fixturesByDate={fixturesByDate}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            ) : (
              <MonthGridView
                month={month}
                onMonthChange={setMonth}
                todayIso={referenceToday}
                fixturesByDate={fixturesByDate}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            )}
          </div>

          <div className="min-w-0">
            {upcomingLoading || !upcoming ? (
              <Skeleton className="h-[400px] w-full rounded-[12px]" />
            ) : (
              <UpcomingMatchesTable
                matches={upcoming.filter((fixture) => category === 'todas' || fixture.category === category)}
              />
            )}
          </div>
        </div>
      )}

      {!isLoading && filteredCount === 0 && (
        <EmptyState
          title="No hay partidos en esta categoría"
          description="Selecciona otra categoría para ver el calendario."
        />
      )}
    </div>
  )
}

function CalendarList({ fixtures }: { fixtures: CalendarFixture[] }) {
  const sorted = [...fixtures].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="overflow-hidden rounded-[12px] border border-border-strong bg-surface-panel shadow-card">
      <ul className="divide-y divide-border-faint">
        {sorted.map((match) => (
          <li key={match.id} className="flex items-center gap-4 px-5 py-3">
            <span className="w-16 shrink-0 text-[13px] font-semibold text-content-primary">
              {formatDayMonthShort(match.date)}
            </span>
            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-content-primary">
              {match.label ??
                (match.homeClub && match.awayClub
                  ? `${match.homeClub.name} vs ${match.awayClub.name}`
                  : '')}
            </span>
            <span className="shrink-0 text-[12px] text-content-muted">
              {match.time ? `${match.time}` : ''}
              {match.stadium ? ` · ${match.stadium}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
