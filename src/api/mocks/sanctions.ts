import type {
  Club,
  PlayerPosition,
  Sanction,
  SanctionFilterOptions,
  SanctionInfractionCode,
  SanctionStatus,
  SanctionTargetType,
  StaffRoleCode,
} from '@/types'
import { clubById, clubs } from './clubs'
import { matches } from './matches'
import { players } from './players'
import { staff } from './staff'

// Deterministic PRNG (mulberry32) so the sanctions list stays identical across reloads.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MATCH_LABEL = matches.map((match) => `J${match.round} · ${match.homeClub.shortName} vs ${match.awayClub.shortName}`)

interface SanctionSeed {
  targetType: SanctionTargetType
  name: string
  clubId: string
  position?: PlayerPosition
  role?: StaffRoleCode
  infraction: SanctionInfractionCode
  card?: 'amarilla' | 'roja'
  matchIndex?: number
  matches: number
  fine: number
  status: SanctionStatus
  issuedDate: string
  resolution?: string
}

// Canonical cases aligned with known players/staff/clubs across the app.
const CANONICAL: SanctionSeed[] = [
  { targetType: 'jugador', name: 'Luis Rodríguez', clubId: 'universitario', position: 'DEF', infraction: 'roja-directa', card: 'roja', matchIndex: 0, matches: 2, fine: 0, status: 'pendiente', issuedDate: '2026-01-25', resolution: 'D-2026-018' },
  { targetType: 'jugador', name: 'Kevin Galván', clubId: 'sanfrancisco', position: 'MED', infraction: 'roja-directa', card: 'roja', matchIndex: 5, matches: 3, fine: 250, status: 'apelada', issuedDate: '2026-01-26', resolution: 'D-2026-021' },
  { targetType: 'jugador', name: 'Manuel Gamboa', clubId: 'universitario', position: 'DEF', infraction: 'doble-amarilla', card: 'amarilla', matchIndex: 2, matches: 1, fine: 0, status: 'cumplida', issuedDate: '2026-01-19', resolution: 'D-2026-009' },
  { targetType: 'jugador', name: 'Gabriel Torres', clubId: 'arabe', position: 'DEL', infraction: 'acumulacion-amarillas', card: 'amarilla', matches: 1, fine: 0, status: 'cumplida', issuedDate: '2026-01-12', resolution: 'D-2026-004' },
  { targetType: 'jugador', name: 'Jair Catuy', clubId: 'veraguas', position: 'DEL', infraction: 'conducta', matches: 2, fine: 500, status: 'pendiente', issuedDate: '2026-01-28', resolution: 'D-2026-026' },
  { targetType: 'jugador', name: 'Ernesto Sinclair', clubId: 'sporting', position: 'MED', infraction: 'agresion', card: 'roja', matchIndex: 4, matches: 4, fine: 750, status: 'apelada', issuedDate: '2026-01-24', resolution: 'D-2026-020' },
  { targetType: 'jugador', name: 'Carlos Pérez', clubId: 'herrera', position: 'DEF', infraction: 'acumulacion-amarillas', card: 'amarilla', matches: 1, fine: 0, status: 'reducida', issuedDate: '2026-01-15', resolution: 'D-2026-006' },
  { targetType: 'jugador', name: 'Ricardo Phillips Jr.', clubId: 'sporting', position: 'DEL', infraction: 'conducta', matches: 1, fine: 300, status: 'cumplida', issuedDate: '2026-01-08', resolution: 'D-2026-002' },
  { targetType: 'cuerpo-tecnico', name: '', clubId: 'arabe', role: 'DT', infraction: 'conducta', matches: 2, fine: 1000, status: 'pendiente', issuedDate: '2026-01-27', resolution: 'D-2026-024' },
  { targetType: 'cuerpo-tecnico', name: '', clubId: 'tauro', role: 'AT', infraction: 'retraso', matches: 1, fine: 400, status: 'cumplida', issuedDate: '2026-01-14', resolution: 'D-2026-005' },
  { targetType: 'club', name: '', clubId: 'arabe', infraction: 'incomparecencia', matches: 0, fine: 2500, status: 'pendiente', issuedDate: '2026-01-22', resolution: 'D-2026-016' },
  { targetType: 'club', name: '', clubId: 'sporting', infraction: 'retraso', matches: 0, fine: 1200, status: 'cumplida', issuedDate: '2026-01-10', resolution: 'D-2026-003' },
]

function buildSanctions(): Sanction[] {
  const rand = mulberry32(20263029)
  const result: Sanction[] = []
  let index = 0

  const push = (sanction: Omit<Sanction, 'id' | 'code'>) => {
    index += 1
    result.push({
      ...sanction,
      id: `san-${String(index).padStart(3, '0')}`,
      code: `SAN-2026-${String(index).padStart(3, '0')}`,
    })
  }

  CANONICAL.forEach((seed) => {
    const club: Club = clubById(seed.clubId)
    let name = seed.name
    if (seed.targetType === 'cuerpo-tecnico') {
      const member = staff.find((item) => item.club.id === seed.clubId && item.role === seed.role)
      name = member?.name ?? 'Cuerpo técnico'
    }
    if (seed.targetType === 'club') name = club.name
    const match = seed.matchIndex !== undefined ? matches[seed.matchIndex % matches.length] : undefined
    push({
      targetType: seed.targetType,
      name,
      position: seed.position,
      role: seed.role,
      club,
      infraction: seed.infraction,
      card: seed.card,
      matchId: match?.id,
      matchLabel: seed.matchIndex !== undefined ? MATCH_LABEL[seed.matchIndex % matches.length] : undefined,
      matchDate: match?.date,
      matches: seed.matches,
      fine: seed.fine,
      status: seed.status,
      issuedDate: seed.issuedDate,
      resolution: seed.resolution,
    })
  })

  const STATUSES: SanctionStatus[] = ['pendiente', 'pendiente', 'cumplida', 'cumplida', 'cumplida', 'apelada', 'reducida', 'anulada']

  for (let i = 0; i < 36; i += 1) {
    const status = STATUSES[Math.floor(rand() * STATUSES.length)]
    const issuedDate = `2026-01-${String(2 + Math.floor(rand() * 28)).padStart(2, '0')}`
    const resolution = `D-2026-${String(30 + Math.floor(rand() * 60)).padStart(3, '0')}`
    const roll = rand()

    if (roll < 0.68) {
      const player = players[Math.floor(rand() * players.length)]
      const red = player.redCards > 0
      const infraction: SanctionInfractionCode = red
        ? rand() < 0.6 ? 'roja-directa' : 'doble-amarilla'
        : rand() < 0.5 ? 'acumulacion-amarillas' : 'conducta'
      const card: 'amarilla' | 'roja' | undefined =
        infraction === 'roja-directa' ? 'roja' : infraction === 'doble-amarilla' || infraction === 'acumulacion-amarillas' ? 'amarilla' : undefined
      const matchIndex = rand() < 0.7 ? Math.floor(rand() * matches.length) : undefined
      push({
        targetType: 'jugador',
        name: player.name,
        position: player.position,
        club: player.club,
        infraction,
        card,
        matchId: matchIndex !== undefined ? matches[matchIndex].id : undefined,
        matchLabel: matchIndex !== undefined ? MATCH_LABEL[matchIndex] : undefined,
        matchDate: matchIndex !== undefined ? matches[matchIndex].date : undefined,
        matches: infraction === 'roja-directa' ? 1 + Math.floor(rand() * 3) : 1,
        fine: infraction === 'conducta' ? [150, 300, 500, 750][Math.floor(rand() * 4)] : rand() < 0.25 ? 150 : 0,
        status,
        issuedDate,
        resolution,
      })
    } else if (roll < 0.9) {
      const member = staff[Math.floor(rand() * staff.length)]
      const infraction: SanctionInfractionCode = rand() < 0.5 ? 'conducta' : 'retraso'
      push({
        targetType: 'cuerpo-tecnico',
        name: member.name,
        role: member.role,
        club: member.club,
        infraction,
        card: undefined,
        matchId: undefined,
        matchLabel: undefined,
        matchDate: undefined,
        matches: infraction === 'conducta' ? 1 + Math.floor(rand() * 2) : 1,
        fine: 300 + Math.floor(rand() * 7) * 100,
        status,
        issuedDate,
        resolution,
      })
    } else {
      const club = clubs[Math.floor(rand() * clubs.length)]
      const infraction: SanctionInfractionCode = rand() < 0.5 ? 'retraso' : rand() < 0.7 ? 'incomparecencia' : 'otros'
      push({
        targetType: 'club',
        name: club.name,
        club,
        infraction,
        card: undefined,
        matchId: undefined,
        matchLabel: undefined,
        matchDate: undefined,
        matches: 0,
        fine: 500 + Math.floor(rand() * 20) * 250,
        status,
        issuedDate,
        resolution,
      })
    }
  }

  return result
}

export const sanctions: Sanction[] = buildSanctions()

export const sanctionFilterOptions: SanctionFilterOptions = {
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'pendiente', label: 'Pendiente' },
    { id: 'cumplida', label: 'Cumplida' },
    { id: 'apelada', label: 'Apelada' },
    { id: 'reducida', label: 'Reducida' },
    { id: 'anulada', label: 'Anulada' },
  ],
  clubs: [{ id: 'todos', label: 'Todos' }, ...clubs.map((club) => ({ id: club.id, label: club.name }))],
  infractions: [
    { id: 'todos', label: 'Todas' },
    { id: 'roja-directa', label: 'Roja directa' },
    { id: 'doble-amarilla', label: 'Doble amarilla' },
    { id: 'acumulacion-amarillas', label: 'Acumulación de amarillas' },
    { id: 'conducta', label: 'Conducta antideportiva' },
    { id: 'agresion', label: 'Agresión' },
    { id: 'retraso', label: 'Retraso' },
    { id: 'incomparecencia', label: 'Incomparecencia' },
    { id: 'otros', label: 'Otros' },
  ],
}

