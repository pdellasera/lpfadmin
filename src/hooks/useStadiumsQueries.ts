import { useQuery } from '@tanstack/react-query'
import { getStadiumFilters, getStadiums } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { StadiumFilters } from '@/types'

export function useStadiums(filters?: StadiumFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['stadiums', season, filters?.province, filters?.surface, filters?.status, filters?.search],
    queryFn: () => getStadiums(season, filters),
  })
}

export function useStadiumFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['stadiums', 'filters', season],
    queryFn: () => getStadiumFilters(season),
  })
}
