import type { HomeEvent, HomeStats, NextMatch } from '@/types'
import { clubById } from './clubs'

export const homeStats: HomeStats = {
  teams: 7,
  matches: 132,
  players: 276,
  stadiums: 8,
}

export const nextMatch: NextMatch = {
  id: 'jornada-6',
  round: 6,
  homeClub: clubById('tauro'),
  awayClub: clubById('arabe'),
  date: '2026-01-24',
  time: '7:00 p.m.',
  stadium: 'Estadio Rommel Fernández',
}

export const homeEvents: HomeEvent[] = [
  {
    id: 'ev-1',
    kind: 'alerta',
    title: 'Tauro F.C. — Riesgo de alineación indebida',
    description:
      'A. Cooper (#10) acumula 3 amarillas; queda suspendido para la Semifinal Vuelta. Marcado como no elegible.',
    timeLabel: 'hace 12 min',
    source: 'automático',
  },
  {
    id: 'ev-2',
    kind: 'pendiente',
    title: 'Minutos de promoción — Plaza Amador',
    description:
      'Acumula 1.140 / 1.200 min de jugadores nacidos 2006+. Riesgo de −3 pts si no se completa al cierre del torneo.',
    timeLabel: 'hace 1 h',
  },
  {
    id: 'ev-3',
    kind: 'validado',
    title: 'Acta digital validada — UMECIT vs Plaza Amador',
    description: 'Cuarto árbitro G. Domínguez registró sustitución 3 de PLA. Sincronizado.',
    timeLabel: 'hace 2 min',
    source: 'en vivo',
  },
  {
    id: 'ev-4',
    kind: 'info',
    title: 'Registro FIFA Connect ID — lunes',
    description: '12 nuevos registros pendientes de validación previo al cierre del lunes 17:00.',
    timeLabel: 'hoy 09:14',
  },
  {
    id: 'ev-5',
    kind: 'pendiente',
    title: 'Licencia vencida — DT D. Madariaga',
    description: 'CD Universitario. Renovación vencida hace 5 días. No podrá ejercer en próxima jornada.',
    timeLabel: 'hace 3 h',
  },
]
