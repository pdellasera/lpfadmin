import type { Player, PlayerCategory, PlayerFilterOptions, PlayerPosition, PlayerStatus } from '@/types'
import { clubById, clubs } from './clubs'

// Only 3 player photos exist in the project, so every player reuses them
// (placeholder pool) to keep the photo avatars of the reference design.
const PHOTO_POOL = [
  '/images/players/jose-fajardo.jpg',
  '/images/players/ricardo-buitrago.jpg',
  '/images/players/abdiel-ayarza.jpg',
]

// Deterministic PRNG (mulberry32) so the 482 players stay identical across reloads.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(input: T[], rand: () => number): T[] {
  const result = [...input]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const FIRST_NAMES = [
  'Adalberto', 'Alfredo', 'Andrés', 'Ángel', 'Aníbal', 'Ariel', 'Armando', 'Bryan', 'César',
  'Cristian', 'Darío', 'David', 'Diego', 'Eduardo', 'Elías', 'Emilio', 'Enrique', 'Felipe',
  'Fernando', 'Guillermo', 'Héctor', 'Ismael', 'Jaime', 'Javier', 'Jorge', 'Juan', 'Leonardo',
  'Marcos', 'Mario', 'Mauricio', 'Miguel', 'Néstor', 'Óscar', 'Pablo', 'Rafael', 'Ramón',
  'Roberto', 'Rodrigo', 'Ronald', 'Samuel', 'Sebastián', 'Tomás', 'Vicente', 'Víctor',
]

const LAST_NAMES = [
  'Arosemena', 'Barahona', 'Batista', 'Benítez', 'Bonilla', 'Camargo', 'Carrasquilla', 'Casasola',
  'Castillo', 'Cedeño', 'Cisneros', 'Clarke', 'Córdoba', 'Correa', 'De León', 'Díaz', 'Espinoza',
  'Fernández', 'Fuentes', 'Gaitán', 'García', 'Gómez', 'González', 'Guevara', 'Hernández', 'Herrera',
  'Hurtado', 'Jiménez', 'Lara', 'López', 'Lozano', 'Martínez', 'Medina', 'Mejía', 'Mendoza', 'Miranda',
  'Molina', 'Montero', 'Morales', 'Moreno', 'Mosquera', 'Murillo', 'Navarro', 'Ortega', 'Palacios',
  'Pérez', 'Pimentel', 'Pinzón', 'Quintero', 'Ramos', 'Reyes', 'Rivera', 'Rodríguez', 'Rojas', 'Romero',
  'Salazar', 'Sánchez', 'Santamaría', 'Serrano', 'Tejada', 'Torres', 'Urriola', 'Valdés', 'Vargas',
  'Vega', 'Villarreal', 'Zapata',
]

interface ReferenceRow {
  name: string
  clubId: string
  position: PlayerPosition
  age: number
  played: number
  goals: number
  assists: number
  yellow: number
  red: number
  heightCm: number
  weightKg: number
  salary: number
}

// The 10 players shown on the first page of the reference screenshot.
// Columns: AÑO NACIMIENTO · CATEGORÍA · PJ · GOLES · ASIST · TA · TR (in that order).
const REFERENCE_ROWS: ReferenceRow[] = [
  { name: 'Gabriel Torres', clubId: 'arabe', position: 'DEL', age: 29, played: 18, goals: 12, assists: 5, yellow: 3, red: 0, heightCm: 180, weightKg: 76, salary: 4500 },
  { name: 'José Martínez', clubId: 'tauro', position: 'POR', age: 31, played: 16, goals: 0, assists: 0, yellow: 1, red: 0, heightCm: 189, weightKg: 85, salary: 3800 },
  { name: 'Luis Rodríguez', clubId: 'universitario', position: 'DEF', age: 27, played: 15, goals: 1, assists: 3, yellow: 4, red: 1, heightCm: 184, weightKg: 81, salary: 3200 },
  { name: 'Ernesto Sinclair', clubId: 'sporting', position: 'MED', age: 25, played: 17, goals: 6, assists: 4, yellow: 2, red: 0, heightCm: 176, weightKg: 72, salary: 3000 },
  { name: 'Carlos Pérez', clubId: 'herrera', position: 'DEF', age: 24, played: 14, goals: 0, assists: 1, yellow: 3, red: 0, heightCm: 182, weightKg: 79, salary: 2600 },
  { name: 'Jair Catuy', clubId: 'veraguas', position: 'DEL', age: 28, played: 16, goals: 7, assists: 2, yellow: 1, red: 0, heightCm: 178, weightKg: 74, salary: 3400 },
  { name: 'Kevin Galván', clubId: 'sanfrancisco', position: 'MED', age: 23, played: 15, goals: 2, assists: 3, yellow: 2, red: 1, heightCm: 174, weightKg: 70, salary: 2400 },
  { name: 'Ricardo Phillips Jr.', clubId: 'sporting', position: 'DEL', age: 21, played: 13, goals: 4, assists: 2, yellow: 0, red: 0, heightCm: 172, weightKg: 68, salary: 4200 },
  { name: 'Manuel Gamboa', clubId: 'universitario', position: 'DEF', age: 26, played: 14, goals: 1, assists: 0, yellow: 5, red: 1, heightCm: 186, weightKg: 83, salary: 2500 },
  { name: 'Andrés Vega', clubId: 'veraguas', position: 'MED', age: 21, played: 15, goals: 3, assists: 5, yellow: 2, red: 0, heightCm: 177, weightKg: 73, salary: 2300 },
]

// Distribution taken from the screenshot counters: 48 POR / 138 DEF / 162 MED / 134 DEL (482 players).
const DISTRIBUTION: Record<PlayerPosition, number> = {
  POR: 48,
  DEF: 138,
  MED: 162,
  DEL: 134,
}

const SEASON_YEAR = 2026

function categoryForAge(age: number): PlayerCategory {
  if (age < 17) return 'sub-17'
  if (age < 20) return 'sub-20'
  if (age < 23) return 'sub-23'
  return 'mayor'
}

function buildReferencePlayers(): Player[] {
  return REFERENCE_ROWS.map(
    (row, index): Player => ({
      id: `p-${String(index + 1).padStart(3, '0')}`,
      name: row.name,
      club: clubById(row.clubId),
      position: row.position,
      birthYear: SEASON_YEAR - row.age,
      category: categoryForAge(row.age),
      played: row.played,
      goals: row.goals,
      assists: row.assists,
      yellowCards: row.yellow,
      redCards: row.red,
      heightCm: row.heightCm,
      weightKg: row.weightKg,
      salary: row.salary,
      status: 'disponible',
      photoUrl: PHOTO_POOL[index % PHOTO_POOL.length],
    }),
  )
}

function uniqueName(rand: () => number, used: Set<string>): string {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
    const name = `${first} ${last}`
    if (!used.has(name)) {
      used.add(name)
      return name
    }
  }
  const fallback = `Jugador ${used.size + 1}`
  used.add(fallback)
  return fallback
}

function rollStatus(rand: () => number): PlayerStatus {
  const roll = rand()
  if (roll < 0.06) return 'lesionado'
  if (roll < 0.12) return 'suspendido'
  return 'disponible'
}

function buildGeneratedPlayers(): Player[] {
  const rand = mulberry32(20262026)

  const remaining: Record<PlayerPosition, number> = {
    POR: DISTRIBUTION.POR - REFERENCE_ROWS.filter((row) => row.position === 'POR').length,
    DEF: DISTRIBUTION.DEF - REFERENCE_ROWS.filter((row) => row.position === 'DEF').length,
    MED: DISTRIBUTION.MED - REFERENCE_ROWS.filter((row) => row.position === 'MED').length,
    DEL: DISTRIBUTION.DEL - REFERENCE_ROWS.filter((row) => row.position === 'DEL').length,
  }

  const positionPool: PlayerPosition[] = [
    ...Array<PlayerPosition>(remaining.POR).fill('POR'),
    ...Array<PlayerPosition>(remaining.DEF).fill('DEF'),
    ...Array<PlayerPosition>(remaining.MED).fill('MED'),
    ...Array<PlayerPosition>(remaining.DEL).fill('DEL'),
  ]
  const positions = shuffle(positionPool, rand)

  const usedNames = new Set(REFERENCE_ROWS.map((row) => row.name))
  const players: Player[] = []
  const offset = REFERENCE_ROWS.length

  for (let i = 0; i < positions.length; i += 1) {
    const position = positions[i]
    const isGoalkeeper = position === 'POR'
    const age = 17 + Math.floor(rand() * 20)
    const heightCm = 168 + Math.floor(rand() * 20)
    const weightKg = heightCm - 100 + Math.floor(rand() * 7) - 3
    const salary = 1200 + Math.floor(rand() * 21) * 150
    players.push({
      id: `p-${String(i + offset + 1).padStart(3, '0')}`,
      name: uniqueName(rand, usedNames),
      club: clubs[(i + 2) % clubs.length],
      position,
      birthYear: SEASON_YEAR - age,
      category: categoryForAge(age),
      played: 6 + Math.floor(rand() * 15),
      goals: isGoalkeeper ? 0 : Math.floor(rand() * 15),
      assists: isGoalkeeper ? Math.floor(rand() * 2) : Math.floor(rand() * 9),
      yellowCards: Math.floor(rand() * 7),
      redCards: rand() < 0.12 ? 1 : rand() < 0.03 ? 2 : 0,
      heightCm,
      weightKg,
      salary,
      status: rollStatus(rand),
      photoUrl: PHOTO_POOL[i % PHOTO_POOL.length],
    })
  }

  return players
}

export const players: Player[] = [...buildReferencePlayers(), ...buildGeneratedPlayers()]

export const playerFilterOptions: PlayerFilterOptions = {
  clubs: [{ id: 'todos', label: 'Todos' }, ...clubs.map((club) => ({ id: club.id, label: club.name }))],
  positions: [
    { id: 'todos', label: 'Todos' },
    { id: 'POR', label: 'Portero' },
    { id: 'DEF', label: 'Defensa' },
    { id: 'MED', label: 'Mediocampista' },
    { id: 'DEL', label: 'Delantero' },
  ],
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'disponible', label: 'Disponible' },
    { id: 'lesionado', label: 'Lesionado' },
    { id: 'suspendido', label: 'Suspendido' },
  ],
}
