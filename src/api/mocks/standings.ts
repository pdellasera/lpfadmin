import type { StandingRow } from '@/types'
import { clubById } from './clubs'

export const standings: StandingRow[] = [
  { position: 1, club: clubById('tauro'), played: 5, won: 4, drawn: 1, lost: 0, goalsFor: 13, goalsAgainst: 5, goalDifference: 8, points: 13 },
  { position: 2, club: clubById('sporting'), played: 5, won: 3, drawn: 2, lost: 0, goalsFor: 11, goalsAgainst: 5, goalDifference: 6, points: 11 },
  { position: 3, club: clubById('herrera'), played: 5, won: 3, drawn: 1, lost: 1, goalsFor: 9, goalsAgainst: 5, goalDifference: 4, points: 10 },
  { position: 4, club: clubById('sanfrancisco'), played: 5, won: 2, drawn: 3, lost: 0, goalsFor: 7, goalsAgainst: 5, goalDifference: 2, points: 9 },
  { position: 5, club: clubById('veraguas'), played: 5, won: 2, drawn: 2, lost: 1, goalsFor: 8, goalsAgainst: 7, goalDifference: 1, points: 8 },
]
