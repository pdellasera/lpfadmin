import type { RefereeReport } from '@/types'
import { matches } from './matches'

const DEFAULT_OFFICIALS: RefereeReport['officials'] = {
  referee: 'Carlos Rodríguez',
  assistant1: 'Miguel Santos',
  assistant2: 'Luis Pérez',
  fourthOfficial: 'Andrés Moreno',
  assessor: 'Héctor Villarreal',
  commissioner: 'Roberto Sánchez',
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function longDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  const formatted = new Intl.DateTimeFormat('es-PA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
  return capitalize(formatted)
}

interface SampleReport {
  scoreHome: number
  scoreAway: number
  halfTimeHome: number
  halfTimeAway: number
  goalsHome: RefereeReport['goalsHome']
  goalsAway: RefereeReport['goalsAway']
  penaltiesHome: RefereeReport['penaltiesHome']
  penaltiesAway: RefereeReport['penaltiesAway']
  subsHome: RefereeReport['subsHome']
  subsAway: RefereeReport['subsAway']
  incidents: string[]
}

const SAMPLE_REPORTS: Record<string, SampleReport> = {
  'j6-universitario-tauro': {
    scoreHome: 2,
    scoreAway: 1,
    halfTimeHome: 1,
    halfTimeAway: 0,
    goalsHome: [
      { number: '9', player: 'José Fajardo', penalty: false, ownGoal: false, minute: 18 },
      { number: '10', player: 'Ricardo Buitrago', penalty: true, ownGoal: false, minute: 54 },
    ],
    goalsAway: [{ number: '7', player: 'Abdiel Ayarza', penalty: false, ownGoal: false, minute: 61 }],
    penaltiesHome: [{ number: '10', scored: true }],
    penaltiesAway: [],
    subsHome: [
      { minute: 64, outNumber: '11', outPlayer: 'Andrés Vega', inNumber: '18', inPlayer: 'Juan Rivera' },
      { minute: 78, outNumber: '14', outPlayer: 'Ricardo Guzmán', inNumber: '19', inPlayer: 'Ángel Sánchez' },
    ],
    subsAway: [
      { minute: 58, outNumber: '17', outPlayer: 'Cristian Martínez', inNumber: '16', inPlayer: 'Víctor Medina' },
    ],
    incidents: [
      'Amonestación a G. Torres (#10, CD Universitario) al min. 33 por juego brusco.',
      'Amonestación a A. Arroyo (#8, Tauro FC) al min. 49 por sujetar al rival.',
      'Atención médica breve a L. Mejía (#12) al min. 72; el jugador continuó en cancha.',
    ],
  },
  'j6-sanfrancisco-veraguas': {
    scoreHome: 0,
    scoreAway: 0,
    halfTimeHome: 0,
    halfTimeAway: 0,
    goalsHome: [],
    goalsAway: [],
    penaltiesHome: [],
    penaltiesAway: [],
    subsHome: [
      { minute: 46, outNumber: '15', outPlayer: 'Aníbal Castillo', inNumber: '22', inPlayer: 'Luis Rivera' },
    ],
    subsAway: [],
    incidents: [
      'Amonestación a R. Dinolis (#14, Veraguas United) al min. 29 por falta táctica.',
      'Partido transcurre con normalidad; sin expulsiones.',
    ],
  },
}

const EMPTY_REPORT: SampleReport = {
  scoreHome: 0,
  scoreAway: 0,
  halfTimeHome: 0,
  halfTimeAway: 0,
  goalsHome: [],
  goalsAway: [],
  penaltiesHome: [],
  penaltiesAway: [],
  subsHome: [],
  subsAway: [],
  incidents: [],
}

function winner(homeName: string, awayName: string, home: number, away: number): string {
  if (home === away) return 'Empate'
  return home > away ? homeName : awayName
}

export function buildRefereeReport(matchId: string): RefereeReport {
  const match = matches.find((item) => item.id === matchId)
  if (!match) throw new Error('El partido no existe o no está disponible')

  const sample = SAMPLE_REPORTS[matchId] ?? EMPTY_REPORT
  const homeName = match.homeClub.name
  const awayName = match.awayClub.name

  return {
    gameNumber: `LPF-2026-${String(match.round).padStart(3, '0')}`,
    round: match.round,
    home: match.homeClub,
    away: match.awayClub,
    playedAt: match.city,
    stadium: match.stadium,
    date: longDate(match.date),
    time: match.time,
    scoreHome: sample.scoreHome,
    scoreAway: sample.scoreAway,
    halfTimeHome: sample.halfTimeHome,
    halfTimeAway: sample.halfTimeAway,
    firstHalfWinner: winner(homeName, awayName, sample.halfTimeHome, sample.halfTimeAway),
    fullTimeWinner: winner(homeName, awayName, sample.scoreHome, sample.scoreAway),
    officials: DEFAULT_OFFICIALS,
    goalsHome: sample.goalsHome,
    goalsAway: sample.goalsAway,
    penaltiesHome: sample.penaltiesHome,
    penaltiesAway: sample.penaltiesAway,
    subsHome: sample.subsHome,
    subsAway: sample.subsAway,
    incidents: sample.incidents,
  }
}
