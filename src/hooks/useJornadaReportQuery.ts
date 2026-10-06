import { useQuery } from '@tanstack/react-query'
import { getJornadaReport } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useJornadaReport() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['jornada-report', season],
    queryFn: () => getJornadaReport(season),
  })
}
