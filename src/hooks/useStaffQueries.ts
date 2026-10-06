import { useQuery } from '@tanstack/react-query'
import { getStaff, getStaffFilters } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'
import type { StaffFilters } from '@/types'

export function useStaff(filters?: StaffFilters) {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['staff', season, filters?.club, filters?.role, filters?.status, filters?.search],
    queryFn: () => getStaff(season, filters),
  })
}

export function useStaffFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['staff', 'filters', season],
    queryFn: () => getStaffFilters(season),
  })
}
