import { AttendanceCard } from '@/components/home/AttendanceCard'
import { EventsInboxCard } from '@/components/home/EventsInboxCard'
import { HeroBanner } from '@/components/home/HeroBanner'
import { NewsHighlights } from '@/components/home/NewsHighlights'
import { NextMatchCard } from '@/components/home/NextMatchCard'
import { QuickActions } from '@/components/home/QuickActions'
import { RecentResultsList } from '@/components/home/RecentResultsList'
import { StandingsTable } from '@/components/home/StandingsTable'

export default function HomePage() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <HeroBanner />
        <NextMatchCard />
      </div>

      <QuickActions />

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.05fr)_minmax(0,1.45fr)]">
        <StandingsTable />
        <RecentResultsList />
        <EventsInboxCard />
      </div>

      <div className="grid gap-3 lg:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.09fr)]">
        <AttendanceCard />
        <NewsHighlights />
      </div>
    </div>
  )
}
