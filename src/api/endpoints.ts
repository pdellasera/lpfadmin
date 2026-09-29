import type {
  AttendanceSummary,
  HomeStats,
  MatchFilterOptions,
  MatchFilters,
  MatchActa,
  MatchFixture,
  MatchResult,
  NewsItem,
  NextMatch,
  Player,
  PlayerFilterOptions,
  PlayerFilters,
  Scorer,
  StandingRow,
  Team,
  TeamFilters,
  TeamFilterOptions,
  TransparencySummary,
} from '@/types'
import { USE_MOCK, delay, request } from './client'
import { getActaDetail } from './mocks/acta'
import { attendance } from './mocks/attendance'
import { homeStats, nextMatch } from './mocks/home'
import { matchFilterOptions, matches } from './mocks/matches'
import { news } from './mocks/news'
import { playerFilterOptions, players } from './mocks/players'
import { recentResults } from './mocks/results'
import { scorers } from './mocks/scorers'
import { standings } from './mocks/standings'
import { teams, teamFilterOptions } from './mocks/teams'
import { transparency } from './mocks/transparency'

export async function getHomeStats(season: string): Promise<HomeStats> {
  if (USE_MOCK) return delay(homeStats)
  return request<HomeStats>('/home/stats', { season })
}

export async function getNextMatch(season: string): Promise<NextMatch> {
  if (USE_MOCK) return delay(nextMatch)
  return request<NextMatch>('/home/next-match', { season })
}

export async function getStandings(season: string): Promise<StandingRow[]> {
  if (USE_MOCK) return delay(standings)
  return request<StandingRow[]>('/standings', { season })
}

export async function getTopScorers(season: string): Promise<Scorer[]> {
  if (USE_MOCK) return delay(scorers)
  return request<Scorer[]>('/scorers', { season })
}

export async function getRecentResults(season: string): Promise<MatchResult[]> {
  if (USE_MOCK) return delay(recentResults)
  return request<MatchResult[]>('/results/recent', { season })
}

export async function getAttendance(season: string): Promise<AttendanceSummary> {
  if (USE_MOCK) return delay(attendance)
  return request<AttendanceSummary>('/attendance', { season })
}

export async function getNews(season: string): Promise<NewsItem[]> {
  if (USE_MOCK) return delay(news)
  return request<NewsItem[]>('/news', { season })
}

export async function getMatches(season: string, filters?: MatchFilters): Promise<MatchFixture[]> {
  if (USE_MOCK) return delay(matches)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<MatchFixture[]>('/matches', params)
}

export async function getMatchFilters(season: string): Promise<MatchFilterOptions> {
  if (USE_MOCK) return delay(matchFilterOptions)
  return request<MatchFilterOptions>('/matches/filters', { season })
}

export async function getTeams(season: string, filters?: TeamFilters): Promise<Team[]> {
  if (USE_MOCK) return delay(teams)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<Team[]>('/teams', params)
}

export async function getTeamFilters(season: string): Promise<TeamFilterOptions> {
  if (USE_MOCK) return delay(teamFilterOptions)
  return request<TeamFilterOptions>('/teams/filters', { season })
}

export async function getPlayers(season: string, filters?: PlayerFilters): Promise<Player[]> {
  if (USE_MOCK) return delay(players)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<Player[]>('/players', params)
}

export async function getPlayerFilters(season: string): Promise<PlayerFilterOptions> {
  if (USE_MOCK) return delay(playerFilterOptions)
  return request<PlayerFilterOptions>('/players/filters', { season })
}

export async function getMatchActa(matchId: string): Promise<MatchActa> {
  if (USE_MOCK) {
    const match = matches.find((item) => item.id === matchId)
    if (!match) throw new Error('El partido no existe o no está disponible')
    return delay({ match, detail: getActaDetail(matchId) })
  }
  return request<MatchActa>(`/matches/${matchId}/acta`)
}

export async function getTransparency(season: string): Promise<TransparencySummary> {
  if (USE_MOCK) return delay({ ...transparency, period: season })
  return request<TransparencySummary>('/transparency', { season })
}
