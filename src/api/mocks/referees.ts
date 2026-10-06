import type { Referee, RefereeCategory, RefereeFilterOptions, RefereeRoleCode, RefereeStatus } from '@/types'

// Deterministic PRNG (mulberry32) so the referee list stays identical across reloads.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIRST_NAMES = [
  'Abel', 'Adrián', 'Alberto', 'Alexis', 'Amílcar', 'Aníbal', 'Ariel', 'Armando', 'Camilo', 'César',
  'Cristóbal', 'Daniel', 'Darío', 'David', 'Diego', 'Eduardo', 'Emilio', 'Enrique', 'Ernesto', 'Fabián',
  'Felipe', 'Fernando', 'Gabriel', 'Gerardo', 'Guillermo', 'Héctor', 'Hernán', 'Hugo', 'Iván', 'Jaime',
  'Javier', 'Jorge', 'José', 'Juan', 'Julio', 'Leonardo', 'Luis', 'Manuel', 'Marco', 'Marcos',
  'Mario', 'Martín', 'Mauricio', 'Miguel', 'Néstor', 'Óscar', 'Pablo', 'Rafael', 'Ramón', 'Raúl',
  'Ricardo', 'Roberto', 'Rodrigo', 'Rolando', 'Rubén', 'Samuel', 'Santiago', 'Sergio', 'Tomás', 'Víctor',
]

const LAST_NAMES = [
  'Aguilar', 'Alvarado', 'Araúz', 'Arosemena', 'Barrios', 'Batista', 'Benítez', 'Blanco', 'Bolaños', 'Bonilla',
  'Cáceres', 'Camargo', 'Carrasquilla', 'Castillo', 'Cedeño', 'Chávez', 'Correa', 'Cortés', 'De Gracia', 'Delgado',
  'Domínguez', 'Espinosa', 'Fernández', 'Figueroa', 'Fuentes', 'García', 'Gómez', 'González', 'Guerra', 'Guevara',
  'Herrera', 'Hidalgo', 'Jiménez', 'Lara', 'López', 'Lozano', 'Márquez', 'Martínez', 'Medina', 'Mejía',
  'Mendoza', 'Miranda', 'Molina', 'Montero', 'Morales', 'Moreno', 'Mosquera', 'Navarro', 'Núñez', 'Ortega',
  'Palacios', 'Paz', 'Pérez', 'Pimentel', 'Quintero', 'Ramos', 'Reyes', 'Rivera', 'Rodríguez', 'Rojas',
  'Romero', 'Salazar', 'Sánchez', 'Serrano', 'Solís', 'Tejada', 'Torres', 'Urriola', 'Valdés', 'Vargas',
  'Vega', 'Villarreal', 'Zapata',
]

const PROVINCES = [
  'Panamá', 'Panamá Oeste', 'Colón', 'Chiriquí', 'Veraguas', 'Coclé', 'Herrera', 'Los Santos', 'Darién',
]

const FOREIGN_NATIONALITIES = ['Costa Rica', 'Colombia', 'Honduras', 'Nicaragua', 'Guatemala', 'México']

// Canonical names already used across the app (referee report / match acta).
const CANONICAL: Array<Pick<Referee, 'name' | 'role' | 'category'>> = [
  { name: 'Carlos Rodríguez', role: 'CEN', category: 'FIFA' },
  { name: 'Miguel Santos', role: 'AR1', category: 'FIFA' },
  { name: 'Luis Pérez', role: 'AR2', category: 'Nacional' },
  { name: 'Andrés Moreno', role: 'CU4', category: 'Nacional' },
  { name: 'Héctor Villarreal', role: 'ASE', category: 'Nacional' },
  { name: 'Roberto Sánchez', role: 'COM', category: 'Nacional' },
]

const ROLE_POOL: RefereeRoleCode[] = [
  ...Array<RefereeRoleCode>(16).fill('CEN'),
  ...Array<RefereeRoleCode>(8).fill('AR1'),
  ...Array<RefereeRoleCode>(8).fill('AR2'),
  ...Array<RefereeRoleCode>(6).fill('CU4'),
  ...Array<RefereeRoleCode>(5).fill('VAR'),
  ...Array<RefereeRoleCode>(5).fill('AVAR'),
  ...Array<RefereeRoleCode>(4).fill('ASE'),
  ...Array<RefereeRoleCode>(4).fill('COM'),
]

const FIFA_ELIGIBLE: RefereeRoleCode[] = ['CEN', 'AR1', 'AR2', 'CU4', 'VAR', 'AVAR', 'ASE']

const MATCH_RANGE: Record<RefereeRoleCode, [number, number]> = {
  CEN: [60, 180],
  AR1: [45, 150],
  AR2: [40, 145],
  CU4: [35, 140],
  VAR: [30, 120],
  AVAR: [25, 110],
  ASE: [20, 90],
  COM: [20, 90],
}

function pickCategory(role: RefereeRoleCode, rand: () => number): RefereeCategory {
  const roll = rand()
  if (FIFA_ELIGIBLE.includes(role) && roll < 0.12) return 'FIFA'
  if (roll < 0.62) return 'Nacional'
  return 'Regional'
}

function pickStatus(rand: () => number): RefereeStatus {
  const roll = rand()
  if (roll < 0.8) return 'disponible'
  if (roll < 0.87) return 'lesionado'
  if (roll < 0.93) return 'suspendido'
  return 'inactivo'
}

function buildReferees(): Referee[] {
  const rand = mulberry32(20262027)
  const used = new Set<string>()
  const result: Referee[] = []

  const pushReferee = (seed: Pick<Referee, 'name' | 'role' | 'category'>, index: number) => {
    const foreign = rand() < 0.06
    const [minMatches, maxMatches] = MATCH_RANGE[seed.role]
    const matches = minMatches + Math.floor(rand() * (maxMatches - minMatches + 1))
    result.push({
      id: `ref-${String(index + 1).padStart(3, '0')}`,
      name: seed.name,
      role: seed.role,
      category: seed.category,
      province: foreign ? '' : PROVINCES[Math.floor(rand() * PROVINCES.length)],
      nationality: foreign
        ? FOREIGN_NATIONALITIES[Math.floor(rand() * FOREIGN_NATIONALITIES.length)]
        : 'Panamá',
      foreign,
      license:
        seed.category === 'FIFA' ? `FIFA-${String(index + 1).padStart(2, '0')}` : `LPF-${String(index + 1).padStart(3, '0')}`,
      birthYear: 1975 + Math.floor(rand() * 20),
      matches,
      yellowCards: Math.round(matches * (2.2 + rand() * 1.8)),
      redCards: Math.round(matches * (0.03 + rand() * 0.09)),
      rating: Math.round((7 + rand() * 2.5) * 10) / 10,
      status: pickStatus(rand),
    })
  }

  CANONICAL.forEach((item, index) => {
    used.add(item.name)
    pushReferee(item, index)
  })

  const count = ROLE_POOL.length
  for (let index = CANONICAL.length; index < count; index += 1) {
    const role = ROLE_POOL[index]
    let name = ''
    for (let attempt = 0; attempt < 120; attempt += 1) {
      const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
      const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
      const candidate = `${first} ${last}`
      if (!used.has(candidate)) {
        name = candidate
        used.add(name)
        break
      }
    }
    if (!name) name = `Árbitro ${index + 1}`

    pushReferee({ name, role, category: pickCategory(role, rand) }, index)
  }

  return result
}

export const referees: Referee[] = buildReferees()

export const refereeFilterOptions: RefereeFilterOptions = {
  roles: [
    { id: 'todos', label: 'Todos' },
    { id: 'CEN', label: 'Árbitro central' },
    { id: 'AR1', label: 'Asistente 1' },
    { id: 'AR2', label: 'Asistente 2' },
    { id: 'CU4', label: 'Cuarto árbitro' },
    { id: 'VAR', label: 'Árbitro VAR' },
    { id: 'AVAR', label: 'AVAR' },
    { id: 'ASE', label: 'Asesor' },
    { id: 'COM', label: 'Comisario' },
  ],
  categories: [
    { id: 'todos', label: 'Todos' },
    { id: 'FIFA', label: 'FIFA' },
    { id: 'Nacional', label: 'Nacional' },
    { id: 'Regional', label: 'Regional' },
  ],
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'disponible', label: 'Disponible' },
    { id: 'lesionado', label: 'Lesionado' },
    { id: 'suspendido', label: 'Suspendido' },
    { id: 'inactivo', label: 'Inactivo' },
  ],
}

