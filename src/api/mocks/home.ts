import type { HomeStats, NextMatch } from '@/types'
import { clubById } from './clubs'

export const homeStats: HomeStats = {
  teams: 12,
  matches: 132,
  players: 276,
  stadiums: 8,
}

export const nextMatch: NextMatch = {
  id: 'jornada-6',
  round: 6,
  homeClub: clubById('cai'),
  awayClub: clubById('tauro'),
  date: '2026-01-24',
  time: '7:00 p.m.',
  stadium: 'Estadio Rommel Fernández',
}
