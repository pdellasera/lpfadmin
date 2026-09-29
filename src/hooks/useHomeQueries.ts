import { useQuery } from '@tanstack/react-query'
import {
  getAttendance,
  getHomeStats,
  getNews,
  getNextMatch,
  getRecentResults,
  getStandings,
  getTopScorers,
} from '@/api/endpoints'
import { useSeason } from '@/providers/SeasonContext'

export function useHomeStats() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['home', 'stats', season],
    queryFn: () => getHomeStats(season),
  })
}

export function useNextMatch() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['home', 'next-match', season],
    queryFn: () => getNextMatch(season),
  })
}

export function useStandings() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['standings', season],
    queryFn: () => getStandings(season),
  })
}

export function useTopScorers() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['scorers', season],
    queryFn: () => getTopScorers(season),
  })
}

export function useRecentResults() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['results', season],
    queryFn: () => getRecentResults(season),
  })
}

export function useAttendance() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['attendance', season],
    queryFn: () => getAttendance(season),
  })
}

export function useNews() {
  const { season } = useSeason()
  return useQuery({
    queryKey: ['news', season],
    queryFn: () => getNews(season),
  })
}
