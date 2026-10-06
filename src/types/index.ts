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

// ===== Bandeja de eventos (Home) =====

export type HomeEventKind = 'alerta' | 'pendiente' | 'validado' | 'info'

export interface HomeEvent {
  id: string
  kind: HomeEventKind
  title: string
  description: string
  timeLabel: string // e.g. "hace 12 min", "hoy 09:14"
  source?: string // e.g. "automático", "en vivo"
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

export type CompetitionCategory = 'LPF' | 'LIGA-PROM' | 'FEMENINA' | 'JUVENIL'

export type CalendarView = 'mensual' | 'semanal' | 'lista'

export interface CalendarFixture {
  id: string
  date: string // ISO (YYYY-MM-DD)
  time?: string
  phase: MatchPhase
  category: CompetitionCategory
  stadium?: string
  referee?: string
  homeClub?: Club
  awayClub?: Club
  label?: string // e.g. "Final ida"
  note?: string // e.g. "ganadores semifinales"
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

export type PlayerCategory = 'sub-17' | 'sub-20' | 'sub-23' | 'mayor'

export interface Player {
  id: string
  name: string
  club: Club
  position: PlayerPosition
  birthYear: number
  category: PlayerCategory
  played: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  heightCm: number
  weightKg: number
  salary: number
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

// ===== Informe del Árbitro =====

export interface RefereeGoalRow {
  number: string
  player: string
  penalty: boolean
  ownGoal: boolean
  minute: number | null
}

export interface RefereeSubRow {
  minute: number | null
  outNumber: string
  outPlayer: string
  inNumber: string
  inPlayer: string
}

export interface RefereePenaltyKick {
  number: string
  scored: boolean
}

export interface RefereeOfficials {
  referee: string
  assistant1: string
  assistant2: string
  fourthOfficial: string
  assessor: string
  commissioner: string
}

export interface RefereeReport {
  gameNumber: string
  round: number
  home: Club
  away: Club
  playedAt: string
  stadium: string
  date: string
  time: string
  scoreHome: number
  scoreAway: number
  halfTimeHome: number
  halfTimeAway: number
  firstHalfWinner: string
  fullTimeWinner: string
  officials: RefereeOfficials
  goalsHome: RefereeGoalRow[]
  goalsAway: RefereeGoalRow[]
  penaltiesHome: RefereePenaltyKick[]
  penaltiesAway: RefereePenaltyKick[]
  subsHome: RefereeSubRow[]
  subsAway: RefereeSubRow[]
  incidents: string[]
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

// ===== Cuerpo técnico =====

export type StaffRoleCode = 'DT' | 'AT' | 'PF' | 'EP' | 'AN' | 'MED' | 'FIS' | 'NUT' | 'DEL' | 'UTI'

export type StaffRoleGroupId = 'todos' | 'tecnico' | 'medico' | 'administrativo'

export type StaffStatus = 'activo' | 'inactivo'

export interface StaffMember {
  id: string
  name: string
  role: StaffRoleCode
  club: Club
  nationality: string
  foreign: boolean
  license: string
  birthYear: number
  joinedYear: number
  salary: number
  status: StaffStatus
  photoUrl?: string
}

export interface StaffFilters {
  club: string
  role: string
  status: string
  search: string
}

export interface StaffFilterOptions {
  clubs: MatchFilterOption[]
  roles: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export interface StaffRoleCounts {
  total: number
  tecnico: number
  medico: number
  administrativo: number
}

// ===== Árbitros =====

export type RefereeRoleCode = 'CEN' | 'AR1' | 'AR2' | 'CU4' | 'VAR' | 'AVAR' | 'ASE' | 'COM'

export type RefereeRoleGroupId = 'todos' | 'centrales' | 'asistentes' | 'var' | 'comisarios'

export type RefereeCategory = 'FIFA' | 'Nacional' | 'Regional'

export type RefereeStatus = 'disponible' | 'lesionado' | 'suspendido' | 'inactivo'

export interface Referee {
  id: string
  name: string
  role: RefereeRoleCode
  category: RefereeCategory
  province: string
  nationality: string
  foreign: boolean
  license: string
  birthYear: number
  matches: number
  yellowCards: number
  redCards: number
  rating: number
  status: RefereeStatus
  photoUrl?: string
}

export interface RefereeFilters {
  role: string
  category: string
  status: string
  search: string
}

export interface RefereeFilterOptions {
  roles: MatchFilterOption[]
  categories: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export interface RefereeRoleCounts {
  total: number
  centrales: number
  asistentes: number
  var: number
  comisarios: number
}

// ===== Estadios =====

export type StadiumSurface = 'natural' | 'sintetico' | 'hibrido'

export type StadiumStatus = 'operativo' | 'mantenimiento' | 'clausurado'

export type StadiumRegionId = 'todos' | 'capital' | 'occidente' | 'azuero' | 'oriente'

export interface Stadium {
  id: string
  name: string
  city: string
  province: string
  region: Exclude<StadiumRegionId, 'todos'>
  club?: Club
  capacity: number
  surface: StadiumSurface
  dimensions: string
  openedYear: number
  matches: number
  avgAttendance: number
  occupancy: number
  status: StadiumStatus
  imageUrl?: string
}

export interface StadiumFilters {
  province: string
  surface: string
  status: string
  search: string
}

export interface StadiumFilterOptions {
  provinces: MatchFilterOption[]
  surfaces: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export interface StadiumCounts {
  total: number
  capital: number
  occidente: number
  azuero: number
  oriente: number
}

// ===== Sanciones =====

export type SanctionTargetType = 'jugador' | 'cuerpo-tecnico' | 'club'

export type SanctionGroupId = 'todas' | 'jugadores' | 'cuerpo-tecnico' | 'clubes'

export type SanctionInfractionCode =
  | 'roja-directa'
  | 'doble-amarilla'
  | 'acumulacion-amarillas'
  | 'conducta'
  | 'agresion'
  | 'retraso'
  | 'incomparecencia'
  | 'otros'

export type SanctionStatus = 'pendiente' | 'cumplida' | 'apelada' | 'reducida' | 'anulada'

export interface Sanction {
  id: string
  code: string
  targetType: SanctionTargetType
  name: string
  position?: PlayerPosition
  role?: StaffRoleCode
  club: Club
  infraction: SanctionInfractionCode
  card?: 'amarilla' | 'roja'
  matchId?: string
  matchLabel?: string
  matchDate?: string
  matches: number
  fine: number
  status: SanctionStatus
  issuedDate: string
  resolution?: string
}

export interface SanctionFilters {
  status: string
  club: string
  infraction: string
  search: string
}

export interface SanctionFilterOptions {
  statuses: MatchFilterOption[]
  clubs: MatchFilterOption[]
  infractions: MatchFilterOption[]
}

export interface SanctionGroupCounts {
  total: number
  jugadores: number
  cuerpoTecnico: number
  clubes: number
  pendientes: number
}

// ===== Reportes =====

export type ReportCategoryId = 'jornada' | 'competicion' | 'disciplinarios' | 'administrativos'

export type ReportFormat = 'pdf' | 'xlsx' | 'csv'

export type ReportStatus = 'actualizado' | 'programado' | 'obsoleto'

export interface ReportCatalogItem {
  id: string
  category: ReportCategoryId
  title: string
  description: string
  formats: ReportFormat[]
  updatedAt: string // ISO date (YYYY-MM-DD)
  records: number
  status: ReportStatus
  href?: string
}

export interface ReportGroup {
  id: ReportCategoryId
  label: string
  items: ReportCatalogItem[]
}

export interface ReportsCatalog {
  season: string
  groups: ReportGroup[]
  total: number
}

// ===== Reporte: Resumen de jornada =====

export interface JornadaStandingRow {
  position: number
  club: string // short code (PLA, ALI, UME, …)
  points: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  renderPct: string
  promGf: string
  promGc: string
  ppj: string
}

export interface JornadaConferenceTable {
  label: string
  rows: JornadaStandingRow[]
}

export interface JornadaPanel {
  key: string
  title: string
}

export interface JornadaRoundRow {
  position: number
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export interface JornadaPhaseScore {
  phase: string
  scores: string[]
}

export interface JornadaPlayoffMatch {
  date: string
  phase: 'PO' | 'SI' | 'SV'
  home: string
  homeGoals: number
  awayGoals: number
  away: string
  stadium: string
}

export interface JornadaScorerRow {
  position: number
  player: string
  number: number | null
  club: string
  goals: number
}

export interface JornadaRoundScorer {
  player: string
  number: number
  minute: string
  club: string
  goals: number
}

export interface JornadaDisciplinaryRow {
  club: string
  number: string
  player: string
  qty: string
  sanction: string
}

export interface JornadaSuspensionRow {
  club: string
  number: string
  player: string
  role: string
  sanction: string
  rounds: string
  remaining: string
}

export interface JornadaBannedRow {
  player: string
  role: string
  resolution: string
}

export interface JornadaYouthMinutesRow {
  position: number
  club: string
  roundMinutes: string | null
  totalMinutes: string
  percent: string
}

export interface JornadaReport {
  season: string
  league: string
  tournament: string
  round: string
  conferences: JornadaConferenceTable[]
  acumulada: JornadaStandingRow[]
  panels: JornadaPanel[]
  concacafNote: string[]
  roundTable: JornadaRoundRow[]
  phaseScores: JornadaPhaseScore[]
  playoffs: JornadaPlayoffMatch[]
  scorers: JornadaScorerRow[]
  roundScorers: JornadaRoundScorer[]
  disciplinary: JornadaDisciplinaryRow[]
  suspensions: JornadaSuspensionRow[]
  suspensions2025: JornadaSuspensionRow[]
  banned: JornadaBannedRow[]
  noClubBan: JornadaBannedRow
  youthMinutes: JornadaYouthMinutesRow[]
}

// ===== API pública =====

export type ApiEnvironment = 'produccion' | 'sandbox'

export type ApiServiceStatus = 'operativa' | 'degradada' | 'mantenimiento'

export type ApiKeyStatus = 'activa' | 'revocada' | 'expirada'

export type ApiMethod = 'GET' | 'POST'

export type ApiLanguage = 'curl' | 'javascript' | 'python' | 'php'

export type ApiMetricId = 'solicitudes' | 'uptime' | 'latencia' | 'limite'

export interface ApiMetric {
  id: ApiMetricId
  label: string
  value: number
  format: 'number' | 'percent' | 'millis'
  tone: KpiTileTone
  delta?: TransparencyDelta
  caption?: string
}

export interface ApiKeyItem {
  id: string
  name: string
  prefix: string
  scopes: string[]
  createdAt: string
  lastUsedAt: string
  requests30d: number
  status: ApiKeyStatus
}

export interface ApiEndpoint {
  id: string
  method: ApiMethod
  path: string
  summary: string
}

export interface ApiEndpointGroup {
  id: string
  label: string
  endpoints: ApiEndpoint[]
}

export interface ApiCodeSample {
  id: ApiLanguage
  label: string
  code: string
}

export interface ApiRatePlan {
  id: string
  name: string
  description: string
  requestsPerMinute: number
  requestsPerDay: number
  highlight?: boolean
}

export interface ApiWebhook {
  id: string
  event: string
  url: string
  status: 'activo' | 'pausado'
  lastDelivery: string
  successRate: number
}

export interface ApiUsagePoint {
  label: string
  requests: number
  errors: number
}

export type ApiResourceKind = 'docs' | 'openapi' | 'changelog' | 'sdk' | 'status'

export interface ApiResource {
  id: string
  title: string
  description: string
  kind: ApiResourceKind
  href: string
}

export interface PublicApiSummary {
  season: string
  environment: ApiEnvironment
  version: string
  baseUrl: string
  status: ApiServiceStatus
  metrics: ApiMetric[]
  endpointGroups: ApiEndpointGroup[]
  codeSamples: ApiCodeSample[]
  keys: ApiKeyItem[]
  ratePlans: ApiRatePlan[]
  webhooks: ApiWebhook[]
  usage: ApiUsagePoint[]
  resources: ApiResource[]
}

// ===== Alertas de elegibilidad =====

export type EligibilitySeverity = 'critica' | 'advertencia' | 'info'

export type EligibilityStatus = 'activa' | 'en-revision' | 'resuelta' | 'descartada'

export type EligibilityTargetType = 'jugador' | 'cuerpo-tecnico' | 'club'

export type EligibilityRuleCode =
  | 'acumulacion-amarillas'
  | 'roja-pendiente'
  | 'licencia-vencida'
  | 'minutos-promocion'
  | 'fifa-connect'
  | 'alineacion-indebida'
  | 'fair-play'

export type EligibilitySeverityTabId = 'todas' | EligibilitySeverity

export interface EligibilityAlert {
  id: string
  code: string
  rule: EligibilityRuleCode
  severity: EligibilitySeverity
  status: EligibilityStatus
  targetType: EligibilityTargetType
  subjectName: string
  position?: PlayerPosition
  role?: StaffRoleCode
  club: Club
  matchLabel?: string
  deadline?: string
  impact: string
  headline: string
  explanation: string
  recommendation: string
  actionLabel?: string
  source?: string
  detectedAt: string
}

export interface EligibilityFilters {
  rule: string
  club: string
  status: string
  search: string
}

export interface EligibilityFilterOptions {
  rules: MatchFilterOption[]
  clubs: MatchFilterOption[]
  statuses: MatchFilterOption[]
}

export interface EligibilityCounts {
  total: number
  activas: number
  criticas: number
  advertencias: number
  informativas: number
  porVencer: number
  resueltas: number
}

