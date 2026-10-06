import type { Club, Stadium, StadiumFilterOptions, StadiumRegionId, StadiumStatus, StadiumSurface } from '@/types'
import { clubById } from './clubs'

// Deterministic PRNG (mulberry32) so the stadium list stays identical across reloads.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StadiumSeed {
  name: string
  city: string
  province: string
  region: Exclude<StadiumRegionId, 'todos'>
  club?: string
  capacity: number
  surface: StadiumSurface
  dimensions: string
  openedYear: number
  matches: number
  avgAttendance: number
  status: StadiumStatus
}

const CANONICAL: StadiumSeed[] = [
  { name: 'Estadio Rommel Fernández', city: 'Ciudad de Panamá', province: 'Panamá', region: 'capital', club: 'tauro', capacity: 32000, surface: 'natural', dimensions: '105 × 68 m', openedYear: 1970, matches: 4, avgAttendance: 12800, status: 'operativo' },
  { name: 'Estadio Armando Dely Valdés', city: 'Colón', province: 'Colón', region: 'oriente', club: 'arabe', capacity: 3000, surface: 'natural', dimensions: '105 × 68 m', openedYear: 1974, matches: 3, avgAttendance: 1800, status: 'operativo' },
  { name: 'Estadio Agustín Sánchez', city: 'La Chorrera', province: 'Panamá Oeste', region: 'capital', club: 'sanfrancisco', capacity: 3000, surface: 'natural', dimensions: '105 × 68 m', openedYear: 1970, matches: 4, avgAttendance: 2100, status: 'operativo' },
  { name: 'Estadio Los Andes', city: 'San Miguelito', province: 'Panamá', region: 'capital', club: 'sporting', capacity: 2000, surface: 'sintetico', dimensions: '100 × 64 m', openedYear: 2008, matches: 3, avgAttendance: 900, status: 'operativo' },
  { name: 'Estadio Los Milagros', city: 'Chitré', province: 'Herrera', region: 'azuero', club: 'herrera', capacity: 2000, surface: 'natural', dimensions: '100 × 64 m', openedYear: 1955, matches: 3, avgAttendance: 1400, status: 'operativo' },
  { name: 'Estadio Aristocles Castillo', city: 'Santiago', province: 'Veraguas', region: 'occidente', club: 'veraguas', capacity: 2000, surface: 'sintetico', dimensions: '102 × 65 m', openedYear: 2001, matches: 3, avgAttendance: 1600, status: 'mantenimiento' },
  { name: 'Estadio Virgilio Tejeira', city: 'Penonomé', province: 'Coclé', region: 'azuero', club: 'universitario', capacity: 1000, surface: 'natural', dimensions: '100 × 64 m', openedYear: 1970, matches: 3, avgAttendance: 700, status: 'operativo' },
  { name: 'Estadio Universidad Latina', city: 'Ciudad de Panamá', province: 'Panamá', region: 'capital', capacity: 1500, surface: 'sintetico', dimensions: '105 × 68 m', openedYear: 2016, matches: 2, avgAttendance: 600, status: 'operativo' },
]

const EXTRA: Array<Pick<StadiumSeed, 'name' | 'city' | 'province' | 'region'>> = [
  { name: 'Estadio Cascarita Tapia', city: 'Ciudad de Panamá', province: 'Panamá', region: 'capital' },
  { name: 'Cancha Sintética El Chorrillo', city: 'Ciudad de Panamá', province: 'Panamá', region: 'capital' },
  { name: 'Estadio San Cristóbal', city: 'David', province: 'Chiriquí', region: 'occidente' },
  { name: 'Cancha Sintética de Boquete', city: 'Boquete', province: 'Chiriquí', region: 'occidente' },
  { name: 'Estadio Roberto Flaco Bula', city: 'Las Tablas', province: 'Los Santos', region: 'azuero' },
  { name: 'Estadio Municipal de Colón', city: 'Colón', province: 'Colón', region: 'oriente' },
  { name: 'Cancha Sintética de Chepo', city: 'Chepo', province: 'Panamá Este', region: 'oriente' },
]

const SURFACES: StadiumSurface[] = ['natural', 'sintetico', 'hibrido']
const DIMENSIONS = ['105 × 68 m', '102 × 65 m', '100 × 64 m']

function buildStadiums(): Stadium[] {
  const rand = mulberry32(20263028)
  const result: Stadium[] = []
  let index = 0

  CANONICAL.forEach((seed) => {
    index += 1
    const club: Club | undefined = seed.club ? clubById(seed.club) : undefined
    result.push({
      id: `est-${String(index).padStart(3, '0')}`,
      name: seed.name,
      city: seed.city,
      province: seed.province,
      region: seed.region,
      club,
      capacity: seed.capacity,
      surface: seed.surface,
      dimensions: seed.dimensions,
      openedYear: seed.openedYear,
      matches: seed.matches,
      avgAttendance: seed.avgAttendance,
      occupancy: Math.round((seed.avgAttendance / seed.capacity) * 100),
      status: seed.status,
    })
  })

  EXTRA.forEach((seed) => {
    index += 1
    const capacity = 800 + Math.floor(rand() * 4) * 250
    const avgAttendance = Math.floor(capacity * (0.35 + rand() * 0.4))
    result.push({
      id: `est-${String(index).padStart(3, '0')}`,
      name: seed.name,
      city: seed.city,
      province: seed.province,
      region: seed.region,
      club: undefined,
      capacity,
      surface: SURFACES[Math.floor(rand() * SURFACES.length)],
      dimensions: DIMENSIONS[Math.floor(rand() * DIMENSIONS.length)],
      openedYear: 1995 + Math.floor(rand() * 28),
      matches: 1 + Math.floor(rand() * 3),
      avgAttendance,
      occupancy: Math.round((avgAttendance / capacity) * 100),
      status: rand() < 0.82 ? 'operativo' : rand() < 0.92 ? 'mantenimiento' : 'clausurado',
    })
  })

  return result
}

export const stadiums: Stadium[] = buildStadiums()

export const stadiumFilterOptions: StadiumFilterOptions = {
  provinces: [
    { id: 'todos', label: 'Todas' },
    ...Array.from(new Set(stadiums.map((stadium) => stadium.province))).map((province) => ({
      id: province,
      label: province,
    })),
  ],
  surfaces: [
    { id: 'todos', label: 'Todas' },
    { id: 'natural', label: 'Césped natural' },
    { id: 'sintetico', label: 'Césped sintético' },
    { id: 'hibrido', label: 'Césped híbrido' },
  ],
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'operativo', label: 'Operativo' },
    { id: 'mantenimiento', label: 'Mantenimiento' },
    { id: 'clausurado', label: 'Clausurado' },
  ],
}

