export type Season = string

export interface Club {
  id: string
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
  crestUrl?: string
  fullName?: string
}

export interface HomeStats {
  teams: number
  matches: number
  players: number
  stadiums: number
}

export interface NextMatch {
  id: string
  round: number
  homeClub: Club
  awayClub: Club
  date: string // ISO date (YYYY-MM-DD)
  time: string // e.g. "7:00 p.m."
  stadium: string
}

export interface StandingRow {
  position: number
  club: Club
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface Scorer {
  id: string
  name: string
  club: Club
  goals: number
  photoUrl?: string
}

export interface MatchResult {
  id: string
  homeClub: Club
  awayClub: Club
  homeScore: number
  awayScore: number
  date: string // ISO date (YYYY-MM-DD)
  competition: string
}

export interface AttendancePoint {
  round: number
  attendance: number
}

export interface AttendanceSummary {
  points: AttendancePoint[]
  occupancy: number // 0-100
  highlightRound: number
}

export interface NewsItem {
  id: string
  tag: string
  title: string
  date: string // ISO date (YYYY-MM-DD)
  excerpt?: string
  featured: boolean
}

export type MatchStatus = 'acta-disponible' | 'sin-acta'

export type MatchPhase = 'proximo' | 'en-vivo' | 'finalizado'

export type MatchStatusTabId = 'todos' | 'proximos' | 'en-vivo' | 'finalizados'

export type MatchesView = 'list' | 'calendar'

export interface MatchFixture {
  id: string
  competition: string
  round: number
  homeClub: Club
  awayClub: Club
  date: string // ISO date (YYYY-MM-DD)
  time: string
  stadium: string
  city: string
  status: MatchStatus
  phase: MatchPhase
}

export interface MatchFilterOption {
  id: string
  label: string
}

export interface MatchFilters {
  competition: string
  team: string
  stadium: string
  date: string
}

export interface MatchFilterOptions {
  competitions: MatchFilterOption[]
  teams: MatchFilterOption[]
  stadiums: MatchFilterOption[]
}

export interface Team {
  id: string
  club: Club
  competition: string
  city: string
  stadium: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  status: 'activo' | 'inactivo'
}

export type TeamDivisionTabId = 'todos' | 'primera' | 'segunda'

export type TeamsView = 'list' | 'cards'

export interface TeamFilters {
  competition: string
  status: string
  search: string
}

export interface TeamFilterOptions {
  competitions: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export type PlayerPosition = 'POR' | 'DEF' | 'MED' | 'DEL'

export type PlayerPositionTabId = 'todos' | 'porteros' | 'defensas' | 'mediocampistas' | 'delanteros'

export type PlayerStatus = 'disponible' | 'lesionado' | 'suspendido'

export interface Player {
  id: string
  name: string
  club: Club
  position: PlayerPosition
  age: number
  played: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  status: PlayerStatus
  photoUrl?: string
}

export interface PlayerFilters {
  club: string
  position: string
  status: string
  search: string
}

export interface PlayerFilterOptions {
  clubs: MatchFilterOption[]
  positions: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export interface PlayerPositionCounts {
  total: number
  porteros: number
  defensas: number
  mediocampistas: number
  delanteros: number
}

// ===== Acta de Partido =====

export type ActaStepId = 'preparacion' | 'alineaciones' | 'incidencias' | 'cierre'

export type ActaEventType = 'gol' | 'amarilla' | 'roja' | 'sustitucion' | 'lesion'

export type ActaSignatureStatus = 'pendiente' | 'firmado'

export interface ActaPlayerRow {
  number: number
  name: string
  position: PlayerPosition
  yellowCards?: number
  redCards?: number
}

export interface ActaStaffRow {
  code: 'DT' | 'AT' | 'PF'
  name: string
  role: string
}

export interface ActaTeamSheet {
  club: Club
  starters: ActaPlayerRow[]
  substitutes: ActaPlayerRow[]
  staff: ActaStaffRow[]
}

export type ActaOfficialKind =
  | 'arbitro'
  | 'asistente1'
  | 'asistente2'
  | 'cuarto'
  | 'comisario'
  | 'delegado'
  | 'seguridad'
  | 'medico'

export interface ActaOfficial {
  kind: ActaOfficialKind
  role: string
  name: string
  badge?: string
}

export interface ActaInfoItem {
  id: 'fecha' | 'hora' | 'estadio' | 'ciudad' | 'campo' | 'condiciones' | 'clima'
  label: string
  value: string
}

export interface ActaEvent {
  id: string
  type: ActaEventType
  minute: number
  clubId: string
  player?: string
  detail?: string
}

export interface ActaSignature {
  role: string
  status: ActaSignatureStatus
}

export interface ActaDetail {
  code: string
  competition: string
  division: string
  round: number
  estadoLabel: string
  draftLabel: string
  estado: 'en-preparacion' | 'validada' | 'cerrada'
  info: ActaInfoItem[]
  officials: ActaOfficial[]
  home: ActaTeamSheet
  away: ActaTeamSheet
  events: ActaEvent[]
  commissionerNotes: string
  signatures: ActaSignature[]
}

export interface MatchActa {
  match: MatchFixture
  detail: ActaDetail
}

// ===== Transparencia =====

export type TransparencyTabId =
  | 'resumen'
  | 'ingresos'
  | 'pagos'
  | 'informes'
  | 'integracion-sap'
  | 'documentos'
  | 'indicadores'

export type TransparencyKpiId =
  | 'ingresos'
  | 'pagos'
  | 'resultado'
  | 'clubes'
  | 'ingresos-promedio'
  | 'gastos-matchday'

export type KpiTileTone = 'emerald' | 'rose' | 'brand'

export type DeltaDirection = 'up' | 'down' | 'ok'

export interface TransparencyDelta {
  direction: DeltaDirection
  tone: 'emerald' | 'rose'
  label: string
  caption?: string
}

export interface TransparencyKpi {
  id: TransparencyKpiId
  label: string
  value: number
  format: 'money' | 'number'
  tone: KpiTileTone
  delta?: TransparencyDelta
  caption?: string
  href?: string
}

export interface TransparencyMonthPoint {
  label: string
  ingresos: number
  pagos: number
}

export interface TransparencyDistributionItem {
  id: string
  label: string
  value: number
  percent: number
}

export interface TransparencyDetailRow {
  id: string
  concept: string
  note?: string
  amount: number
  percent: number
  icon: string
}

export type FileKind = 'pdf' | 'xlsx'

export interface TransparencyFileRow {
  id: string
  title: string
  kind: FileKind
  size: string
  date: string // ISO date (YYYY-MM-DD)
}

export interface TransparencyIndicator {
  id: string
  label: string
  value: number
  format: 'money' | 'number'
  delta: TransparencyDelta
}

export interface SapSyncRow {
  id: string
  label: string
  code?: string
  note?: string
  updatedAt: string
}

export interface SapStatus {
  connected: boolean
  lastSync: string
  rows: SapSyncRow[]
}

export interface TransparencySummary {
  period: string
  incomeTotal: number
  paymentTotal: number
  kpis: TransparencyKpi[]
  monthly: TransparencyMonthPoint[]
  incomeDistribution: TransparencyDistributionItem[]
  paymentDistribution: TransparencyDistributionItem[]
  incomeDetails: TransparencyDetailRow[]
  paymentDetails: TransparencyDetailRow[]
  reports: TransparencyFileRow[]
  documents: TransparencyFileRow[]
  indicators: TransparencyIndicator[]
  sap: SapStatus
}

