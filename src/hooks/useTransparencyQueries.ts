import { useQuery } from '@tanstack/react-query'
import { getTransparency } from '@/api/endpoints'

export function useTransparency(season: string) {
  return useQuery({
    queryKey: ['transparency', season],
    queryFn: () => getTransparency(season),
  })
}
