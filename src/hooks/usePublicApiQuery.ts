import { useQuery } from '@tanstack/react-query'
import { getPublicApi } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function usePublicApi() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['public-api', season],
    queryFn: () => getPublicApi(season),
  })
}
