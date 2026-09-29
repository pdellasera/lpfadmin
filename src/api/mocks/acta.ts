import type { ActaDetail, ActaInfoItem, ActaOfficial, ActaSignature, MatchFixture } from '@/types'
import { clubById } from './clubs'
import { matches } from './matches'

const cai = clubById('cai')
const tauro = clubById('tauro')

const DEFAULT_SIGNATURES: ActaSignature[] = [
  { role: 'Árbitro central', status: 'pendiente' },
  { role: 'Comisario de partido', status: 'pendiente' },
  { role: 'Delegado LPF', status: 'pendiente' },
]

const DEFAULT_OFFICIALS: ActaOfficial[] = [
  { kind: 'arbitro', role: 'Árbitro central', name: 'Carlos Rodríguez', badge: 'FIFA' },
  { kind: 'asistente1', role: 'Asistente 1', name: 'Miguel Santos', badge: 'FIFA' },
  { kind: 'asistente2', role: 'Asistente 2', name: 'Luis Pérez' },
  { kind: 'cuarto', role: 'Cuarto árbitro', name: 'Andrés Moreno' },
  { kind: 'comisario', role: 'Comisario de partido', name: 'Roberto Sánchez' },
  { kind: 'delegado', role: 'Delegado de la LPF', name: 'María González' },
  { kind: 'seguridad', role: 'Oficial de seguridad', name: 'Jorge Herrera' },
  { kind: 'medico', role: 'Médico del partido', name: 'Dr. Luis Castillo' },
]

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

function buildInfo(match: MatchFixture): ActaInfoItem[] {
  return [
    { id: 'fecha', label: 'Fecha', value: longDate(match.date) },
    { id: 'hora', label: 'Hora', value: match.time },
    { id: 'estadio', label: 'Estadio', value: match.stadium },
    { id: 'ciudad', label: 'Ciudad', value: match.city },
    { id: 'campo', label: 'Campo', value: 'Principal' },
    { id: 'condiciones', label: 'Condiciones', value: 'Césped natural - Buen estado' },
    { id: 'clima', label: 'Clima', value: '28°C - Despejado' },
  ]
}

export const actaDetails: Record<string, ActaDetail> = {
  'j6-cai-tauro': {
    code: 'LPF-2026-006',
    competition: 'Primera División',
    division: 'Primera División',
    round: 6,
    estado: 'en-preparacion',
    estadoLabel: 'En preparación',
    draftLabel: 'Borrador',
    info: [
      { id: 'fecha', label: 'Fecha', value: 'Sábado 24 de enero de 2026' },
      { id: 'hora', label: 'Hora', value: '7:00 p.m.' },
      { id: 'estadio', label: 'Estadio', value: 'Rommel Fernández' },
      { id: 'ciudad', label: 'Ciudad', value: 'Ciudad de Panamá' },
      { id: 'campo', label: 'Campo', value: 'Principal' },
      { id: 'condiciones', label: 'Condiciones', value: 'Césped natural - Buen estado' },
      { id: 'clima', label: 'Clima', value: '28°C - Despejado' },
    ],
    officials: DEFAULT_OFFICIALS,
    home: {
      club: cai,
      starters: [
        { number: 1, name: 'Daniel Ríos', position: 'POR' },
        { number: 4, name: 'Carlos Mendoza', position: 'DEF' },
        { number: 2, name: 'Luis Torres', position: 'DEF' },
        { number: 6, name: 'Mateo Sánchez', position: 'DEF' },
        { number: 8, name: 'Diego Castillo', position: 'MED' },
        { number: 10, name: 'Gabriel Torres', position: 'MED', yellowCards: 3 },
        { number: 11, name: 'Andrés Vega', position: 'DEL' },
        { number: 14, name: 'Ricardo Guzmán', position: 'DEL' },
        { number: 17, name: 'Javier Morales', position: 'DEL' },
        { number: 18, name: 'Kevin Rodríguez', position: 'MED' },
        { number: 23, name: 'Luis Díaz', position: 'DEL' },
      ],
      substitutes: [
        { number: 12, name: 'Fernando López', position: 'POR' },
        { number: 2, name: 'José Martínez', position: 'DEF' },
        { number: 7, name: 'Pedro Sánchez', position: 'MED' },
        { number: 15, name: 'Aníbal Castillo', position: 'MED' },
        { number: 16, name: 'Elías Pérez', position: 'DEL' },
        { number: 19, name: 'Roberto Ruiz', position: 'DEL' },
        { number: 20, name: 'Alan Flores', position: 'DEL' },
      ],
      staff: [
        { code: 'DT', name: 'Juan Pérez', role: 'Director Técnico' },
        { code: 'AT', name: 'Carlos Gómez', role: 'Asistente Técnico' },
        { code: 'PF', name: 'Miguel Díaz', role: 'Preparador Físico' },
      ],
    },
    away: {
      club: tauro,
      starters: [
        { number: 1, name: 'José Guerra', position: 'POR' },
        { number: 4, name: 'Ricardo Phillips', position: 'DEF' },
        { number: 5, name: 'Omar Córdoba', position: 'DEF' },
        { number: 6, name: 'Jonathan Medina', position: 'DEF' },
        { number: 13, name: 'Erick Davis', position: 'DEF' },
        { number: 8, name: 'Abdiel Arroyo', position: 'MED' },
        { number: 10, name: 'Alberto Quintero', position: 'MED' },
        { number: 11, name: 'Ismael Díaz', position: 'MED' },
        { number: 17, name: 'Cristian Martínez', position: 'DEL' },
        { number: 19, name: 'Gabriel Brown', position: 'DEL' },
        { number: 21, name: 'Eduardo Guerrero', position: 'DEL' },
      ],
      substitutes: [
        { number: 12, name: 'Luis Mejía', position: 'POR' },
        { number: 2, name: 'Félix Báez', position: 'DEF' },
        { number: 5, name: 'José Murillo', position: 'DEF' },
        { number: 14, name: 'Rodolfo Dinolis', position: 'MED' },
        { number: 16, name: 'Víctor Medina', position: 'MED' },
        { number: 18, name: 'Juan Rivera', position: 'DEL' },
        { number: 23, name: 'Ángel Sánchez', position: 'DEL' },
      ],
      staff: [
        { code: 'DT', name: 'Ricardo Lee', role: 'Director Técnico' },
        { code: 'AT', name: 'Marvin Solano', role: 'Asistente Técnico' },
        { code: 'PF', name: 'Anel Sánchez', role: 'Preparador Físico' },
      ],
    },
    events: [],
    commissionerNotes: '',
    signatures: DEFAULT_SIGNATURES,
  },
}

export function getActaDetail(matchId: string): ActaDetail {
  const match = matches.find((item) => item.id === matchId)
  if (actaDetails[matchId]) return actaDetails[matchId]

  if (!match) {
    return {
      code: 'LPF-2026-000',
      competition: 'Primera División',
      division: 'Primera División',
      round: 1,
      estado: 'en-preparacion',
      estadoLabel: 'En preparación',
      draftLabel: 'Borrador',
      info: buildInfo(matches[0]),
      officials: DEFAULT_OFFICIALS,
      home: { club: cai, starters: [], substitutes: [], staff: [] },
      away: { club: tauro, starters: [], substitutes: [], staff: [] },
      events: [],
      commissionerNotes: '',
      signatures: DEFAULT_SIGNATURES,
    }
  }

  return {
    code: `LPF-2026-${String(match.round).padStart(3, '0')}`,
    competition: 'Primera División',
    division: 'Primera División',
    round: match.round,
    estado: 'en-preparacion',
    estadoLabel: 'En preparación',
    draftLabel: 'Borrador',
    info: buildInfo(match),
    officials: DEFAULT_OFFICIALS,
    home: { club: match.homeClub, starters: [], substitutes: [], staff: [] },
    away: { club: match.awayClub, starters: [], substitutes: [], staff: [] },
    events: [],
    commissionerNotes: '',
    signatures: DEFAULT_SIGNATURES,
  }
}