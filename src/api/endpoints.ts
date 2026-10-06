import type {
  AttendanceSummary,
  CalendarFixture,
  EligibilityAlert,
  EligibilityFilterOptions,
  HomeEvent,
  HomeStats,
  JornadaReport,
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
  PublicApiSummary,
  Referee,
  RefereeFilterOptions,
  RefereeFilters,
  RefereeReport,
  ReportsCatalog,
  Sanction,
  SanctionFilterOptions,
  SanctionFilters,
  Scorer,
  Stadium,
  StadiumFilterOptions,
  StadiumFilters,
  StaffFilterOptions,
  StaffFilters,
  StaffMember,
  StandingRow,
  Team,
  TeamFilters,
  TeamFilterOptions,
  TransparencySummary,
} from '@/types'
import { USE_MOCK, delay, request } from './client'
import { getActaDetail } from './mocks/acta'
import { buildJornadaReport } from './mocks/jornadaReport'
import { buildRefereeReport } from './mocks/refereeReport'
import { attendance } from './mocks/attendance'
import { calendarFixtures } from './mocks/calendar'
import { eligibilityAlerts, eligibilityFilterOptions } from './mocks/eligibilityAlerts'
import { homeEvents, homeStats, nextMatch } from './mocks/home'
import { matchFilterOptions, matches } from './mocks/matches'
import { news } from './mocks/news'
import { playerFilterOptions, players } from './mocks/players'
import { publicApi } from './mocks/publicApi'
import { recentResults } from './mocks/results'
import { referees, refereeFilterOptions } from './mocks/referees'
import { reportsCatalog } from './mocks/reports'
import { sanctions, sanctionFilterOptions } from './mocks/sanctions'
import { scorers } from './mocks/scorers'
import { stadiums, stadiumFilterOptions } from './mocks/stadiums'
import { staff, staffFilterOptions } from './mocks/staff'
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

export async function getHomeEvents(season: string): Promise<HomeEvent[]> {
  if (USE_MOCK) return delay(homeEvents)
  return request<HomeEvent[]>('/home/events', { season })
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

export async function getCalendarFixtures(season: string): Promise<CalendarFixture[]> {
  if (USE_MOCK) return delay(calendarFixtures)
  return request<CalendarFixture[]>('/calendar', { season })
}

export async function getUpcomingFixtures(season: string): Promise<CalendarFixture[]> {
  if (USE_MOCK) {
    return delay(
      calendarFixtures
        .filter((fixture) => fixture.phase === 'proximo')
        .sort((a, b) => a.date.localeCompare(b.date)),
    )
  }
  return request<CalendarFixture[]>('/calendar/upcoming', { season })
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

export async function getStaff(season: string, filters?: StaffFilters): Promise<StaffMember[]> {
  if (USE_MOCK) return delay(staff)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<StaffMember[]>('/staff', params)
}

export async function getStaffFilters(season: string): Promise<StaffFilterOptions> {
  if (USE_MOCK) return delay(staffFilterOptions)
  return request<StaffFilterOptions>('/staff/filters', { season })
}

export async function getReferees(season: string, filters?: RefereeFilters): Promise<Referee[]> {
  if (USE_MOCK) return delay(referees)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<Referee[]>('/referees', params)
}

export async function getRefereeFilters(season: string): Promise<RefereeFilterOptions> {
  if (USE_MOCK) return delay(refereeFilterOptions)
  return request<RefereeFilterOptions>('/referees/filters', { season })
}

export async function getStadiums(season: string, filters?: StadiumFilters): Promise<Stadium[]> {
  if (USE_MOCK) return delay(stadiums)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<Stadium[]>('/stadiums', params)
}

export async function getStadiumFilters(season: string): Promise<StadiumFilterOptions> {
  if (USE_MOCK) return delay(stadiumFilterOptions)
  return request<StadiumFilterOptions>('/stadiums/filters', { season })
}

export async function getSanctions(season: string, filters?: SanctionFilters): Promise<Sanction[]> {
  if (USE_MOCK) return delay(sanctions)
  const params: Record<string, string | number> = { season }
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value
    }
  }
  return request<Sanction[]>('/sanctions', params)
}

export async function getSanctionFilters(season: string): Promise<SanctionFilterOptions> {
  if (USE_MOCK) return delay(sanctionFilterOptions)
  return request<SanctionFilterOptions>('/sanctions/filters', { season })
}

export async function getMatchActa(matchId: string): Promise<MatchActa> {
  if (USE_MOCK) {
    const match = matches.find((item) => item.id === matchId)
    if (!match) throw new Error('El partido no existe o no está disponible')
    return delay({ match, detail: getActaDetail(matchId) })
  }
  return request<MatchActa>(`/matches/${matchId}/acta`)
}

export async function getRefereeReport(matchId: string): Promise<RefereeReport> {
  if (USE_MOCK) return delay(buildRefereeReport(matchId))
  return request<RefereeReport>(`/matches/${matchId}/referee-report`)
}

export async function getTransparency(season: string): Promise<TransparencySummary> {
  if (USE_MOCK) return delay({ ...transparency, period: season })
  return request<TransparencySummary>('/transparency', { season })
}

export async function getReports(season: string): Promise<ReportsCatalog> {
  if (USE_MOCK) return delay({ ...reportsCatalog, season })
  return request<ReportsCatalog>('/reports', { season })
}

export async function getJornadaReport(season: string): Promise<JornadaReport> {
  if (USE_MOCK) return delay(buildJornadaReport(season))
  return request<JornadaReport>('/reports/resumen-jornada', { season })
}

export async function getPublicApi(season: string): Promise<PublicApiSummary> {
  if (USE_MOCK) return delay({ ...publicApi, season })
  return request<PublicApiSummary>('/public-api', { season })
}

export async function getEligibilityAlerts(season: string): Promise<EligibilityAlert[]> {
  if (USE_MOCK) return delay(eligibilityAlerts)
  return request<EligibilityAlert[]>('/eligibility-alerts', { season })
}

export async function getEligibilityFilters(season: string): Promise<EligibilityFilterOptions> {
  if (USE_MOCK) return delay(eligibilityFilterOptions)
  return request<EligibilityFilterOptions>('/eligibility-alerts/filters', { season })
}
