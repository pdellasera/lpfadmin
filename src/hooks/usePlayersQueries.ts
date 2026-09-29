import { useQuery } from '@tanstack/react-query'
import { getPlayerFilters, getPlayers } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { PlayerFilters } from '@/types'

export function usePlayers(filters?: PlayerFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['players', season, filters?.club, filters?.position, filters?.status, filters?.search],
    queryFn: () => getPlayers(season, filters),
  })
}

export function usePlayerFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['players', 'filters', season],
    queryFn: () => getPlayerFilters(season),
  })
}
