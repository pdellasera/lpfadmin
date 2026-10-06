import type { StaffFilterOptions, StaffMember, StaffRoleCode } from '@/types'
import { clubs } from './clubs'

// Deterministic PRNG (mulberry32) so the staff list stays identical across reloads.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
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

const FOREIGN_LAST_NAMES = [
  'Álvarez', 'Bianchi', 'Carvajal', 'Demichelis', 'Ferreira', 'Giovagnoli', 'Lombardi',
  'Mancuso', 'Osorio', 'Paternostro', 'Quiñones', 'Riquelme', 'Salas', 'Togni', 'Villalba', 'Zambrano',
]

const FOREIGN_NATIONALITIES = ['Argentina', 'Colombia', 'Uruguay', 'España', 'Costa Rica', 'Venezuela']

const ROLE_SALARY: Record<StaffRoleCode, number> = {
  DT: 6500,
  AT: 3200,
  PF: 2800,
  EP: 2000,
  AN: 2200,
  MED: 3500,
  FIS: 2000,
  NUT: 1600,
  DEL: 1600,
  UTI: 1100,
}

const ROLE_LICENSE: Record<StaffRoleCode, string> = {
  DT: 'PRO',
  AT: 'A',
  PF: 'B',
  EP: 'A',
  AN: 'B',
  MED: '—',
  FIS: '—',
  NUT: '—',
  DEL: '—',
  UTI: '—',
}

// Base staff per club; clubs with an even index also carry an analyst,
// odd-index clubs carry a nutritionist instead.
const BASE_ROLES: StaffRoleCode[] = ['DT', 'AT', 'PF', 'EP', 'MED', 'FIS', 'DEL', 'UTI']

function uniqueName(rand: () => number, used: Set<string>, foreign: boolean): string {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
    const pool = foreign ? FOREIGN_LAST_NAMES : LAST_NAMES
    const last = pool[Math.floor(rand() * pool.length)]
    const name = `${first} ${last}`
    if (!used.has(name)) {
      used.add(name)
      return name
    }
  }
  const fallback = `Staff ${used.size + 1}`
  used.add(fallback)
  return fallback
}

function buildStaff(): StaffMember[] {
  const rand = mulberry32(20262026)
  const used = new Set<string>()
  const result: StaffMember[] = []
  let counter = 0

  clubs.forEach((club, clubIndex) => {
    const roles: StaffRoleCode[] = [...BASE_ROLES, clubIndex % 2 === 0 ? 'AN' : 'NUT']

    roles.forEach((role) => {
      counter += 1
      const foreign = rand() < 0.22
      const salary = ROLE_SALARY[role] + Math.floor(rand() * 5) * 100
      result.push({
        id: `staff-${String(counter).padStart(3, '0')}`,
        name: uniqueName(rand, used, foreign),
        role,
        club,
        nationality: foreign
          ? FOREIGN_NATIONALITIES[Math.floor(rand() * FOREIGN_NATIONALITIES.length)]
          : 'Panamá',
        foreign,
        license: ROLE_LICENSE[role],
        birthYear: 1965 + Math.floor(rand() * 31),
        joinedYear: 2016 + Math.floor(rand() * 10),
        salary,
        status: rand() < 0.88 ? 'activo' : 'inactivo',
      })
    })
  })

  return result
}

export const staff: StaffMember[] = buildStaff()

export const staffFilterOptions: StaffFilterOptions = {
  clubs: [{ id: 'todos', label: 'Todos' }, ...clubs.map((club) => ({ id: club.id, label: club.name }))],
  roles: [
    { id: 'todos', label: 'Todos' },
    { id: 'DT', label: 'Director Técnico' },
    { id: 'AT', label: 'Asistente Técnico' },
    { id: 'PF', label: 'Preparador Físico' },
    { id: 'EP', label: 'Entrenador de Porteros' },
    { id: 'AN', label: 'Analista' },
    { id: 'MED', label: 'Médico' },
    { id: 'FIS', label: 'Fisioterapeuta' },
    { id: 'NUT', label: 'Nutricionista' },
    { id: 'DEL', label: 'Delegado' },
    { id: 'UTI', label: 'Utilero' },
  ],
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'activo', label: 'Activo' },
    { id: 'inactivo', label: 'Inactivo' },
  ],
}
