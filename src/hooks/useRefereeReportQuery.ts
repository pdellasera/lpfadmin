import { useQuery } from '@tanstack/react-query'
import { getRefereeReport } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useRefereeReport(matchId?: string) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['referee-report', season, matchId],
    queryFn: () => getRefereeReport(matchId ?? ''),
    enabled: Boolean(matchId),
  })
}
