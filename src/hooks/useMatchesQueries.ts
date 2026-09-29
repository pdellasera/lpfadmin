import { useQuery } from '@tanstack/react-query'
import { getMatchFilters, getMatches } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { MatchFilters } from '@/types'

export function useMatches(filters?: MatchFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['matches', season, filters?.competition, filters?.team, filters?.stadium, filters?.date],
    queryFn: () => getMatches(season, filters),
  })
}

export function useMatchFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['matches', 'filters', season],
    queryFn: () => getMatchFilters(season),
  })
}
