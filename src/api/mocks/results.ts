import type { MatchResult } from '@/types'
import { clubById } from './clubs'

export const recentResults: MatchResult[] = [
  { id: 'r1', homeClub: clubById('umecit'), awayClub: clubById('plaza'), homeScore: 1, awayScore: 1, date: '2026-01-20', competition: 'Liga Panameña de Fútbol' },
  { id: 'r2', homeClub: clubById('herrera'), awayClub: clubById('cai'), homeScore: 0, awayScore: 2, date: '2026-01-19', competition: 'Liga Panameña de Fútbol' },
  { id: 'r3', homeClub: clubById('tauro'), awayClub: clubById('sanfrancisco'), homeScore: 3, awayScore: 1, date: '2026-01-18', competition: 'Liga Panameña de Fútbol' },
  { id: 'r4', homeClub: clubById('veraguas'), awayClub: clubById('alianza'), homeScore: 1, awayScore: 0, date: '2026-01-18', competition: 'Liga Panameña de Fútbol' },
  { id: 'r5', homeClub: clubById('sporting'), awayClub: clubById('potros'), homeScore: 2, awayScore: 2, date: '2026-01-17', competition: 'Liga Panameña de Fútbol' },
]
