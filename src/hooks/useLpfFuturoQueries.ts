import { useQuery } from '@tanstack/react-query'
import { getLpfFuturo, getLpfFuturoFilters, getLpfVacanteFilters } from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useLpfFuturo() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['lpf-futuro', season],
    queryFn: () => getLpfFuturo(season),
  })
}

export function useLpfFuturoFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['lpf-futuro-filters', season],
    queryFn: () => getLpfFuturoFilters(season),
  })
}

export function useLpfVacanteFilters() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['lpf-futuro-vacante-filters', season],
    queryFn: () => getLpfVacanteFilters(season),
  })
}
