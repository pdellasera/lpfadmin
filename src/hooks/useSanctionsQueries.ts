import { useQuery } from '@tanstack/react-query'
import { getSanctionFilters, getSanctions } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { SanctionFilters } from '@/types'

export function useSanctions(filters?: SanctionFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['sanctions', season, filters?.status, filters?.club, filters?.infraction, filters?.search],
    queryFn: () => getSanctions(season, filters),
  })
}

export function useSanctionFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['sanctions', 'filters', season],
    queryFn: () => getSanctionFilters(season),
  })
}
