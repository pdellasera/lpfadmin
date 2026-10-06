import { useQuery } from '@tanstack/react-query'
import { getCalendarFixtures, getUpcomingFixtures } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useCalendarFixtures() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['calendar', season],
    queryFn: () => getCalendarFixtures(season),
  })
}

export function useUpcomingFixtures() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['calendar', 'upcoming', season],
    queryFn: () => getUpcomingFixtures(season),
  })
}
