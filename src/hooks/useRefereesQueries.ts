import { useQuery } from '@tanstack/react-query'
import { getRefereeFilters, getReferees } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { RefereeFilters } from '@/types'

export function useReferees(filters?: RefereeFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['referees', season, filters?.role, filters?.category, filters?.status, filters?.search],
    queryFn: () => getReferees(season, filters),
  })
}

export function useRefereeFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['referees', 'filters', season],
    queryFn: () => getRefereeFilters(season),
  })
}
