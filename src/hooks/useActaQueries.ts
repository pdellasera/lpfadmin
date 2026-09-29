import { useQuery } from '@tanstack/react-query'
import { getMatchActa } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useMatchActa(matchId?: string) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['acta', season, matchId],
    queryFn: () => getMatchActa(matchId ?? ''),
    enabled: Boolean(matchId),
  })
}