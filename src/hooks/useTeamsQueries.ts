import { useQuery } from '@tanstack/react-query'
import { getTeamFilters, getTeams } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { TeamFilters } from '@/types'

export function useTeams(filters?: TeamFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['teams', season, filters?.competition, filters?.status, filters?.search],
    queryFn: () => getTeams(season, filters),
  })
}

export function useTeamFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['teams', 'filters', season],
    queryFn: () => getTeamFilters(season),
  })
}
