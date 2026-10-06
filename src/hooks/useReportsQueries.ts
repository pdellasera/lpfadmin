import { useQuery } from '@tanstack/react-query'
import { getReports } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useReports() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['reports', season],
    queryFn: () => getReports(season),
  })
}