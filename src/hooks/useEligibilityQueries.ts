import { useQuery } from '@tanstack/react-query'
import { getEligibilityAlerts, getEligibilityFilters } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useEligibilityAlerts() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['eligibility-alerts', season],
    queryFn: () => getEligibilityAlerts(season),
  })
}

export function useEligibilityFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['eligibility-alerts', 'filters', season],
    queryFn: () => getEligibilityFilters(season),
  })
}
