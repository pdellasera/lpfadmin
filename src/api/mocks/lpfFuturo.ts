import type {
  LpfAreaDemand,
  LpfFuturoFilterOptions,
  LpfFuturoKpi,
  LpfFuturoSummary,
  LpfPostulante,
  LpfRankingItem,
  LpfUniversity,
  LpfUniversityStat,
  LpfVacante,
  LpfVacanteFilterOptions,
} from '@/types'
import { clubById, clubs } from './clubs'

export const universities: LpfUniversity[] = [
  { id: 'utp', name: 'Universidad Tecnológica de Panamá', shortName: 'UTP', color: '#f59e0b' },
  { id: 'usma', name: 'Universidad Católica Santa María La Antigua', shortName: 'USMA', color: '#0ea5e9' },
  { id: 'up', name: 'Universidad de Panamá', shortName: 'UP', color: '#2563eb' },
  { id: 'ulacit', name: 'ULACIT', shortName: 'ULACIT', color: '#7c3aed' },
  { id: 'uip', name: 'Universidad Interamericana de Panamá', shortName: 'UIP', color: '#10b981' },
  { id: 'udelas', name: 'Universidad Especializada de las Américas', shortName: 'UDELAS', color: '#ef4444' },
  { id: 'ulat', name: 'Universidad Latina de Panamá', shortName: 'ULAT', color: '#f43f5e' },
  { id: 'isae', name: 'ISAE Universidad', shortName: 'ISAE', color: '#6366f1' },
  { id: 'uam', name: 'Universidad Americana', shortName: 'UAM', color: '#14b8a6' },
  { id: 'udi', name: 'Universidad del Istmo', shortName: 'UDI', color: '#3b82f6' },
  { id: 'qlu', name: 'Quality Leadership University', shortName: 'QLU', color: '#eab308' },
  { id: 'udla', name: 'Universidad de las Américas', shortName: 'UDLA', color: '#a855f7' },
  { id: 'unesa', name: 'UNESA', shortName: 'UNESA', color: '#06b6d4' },
  { id: 'upsm', name: 'Universidad Politécnica San Miguelito', shortName: 'UPSM', color: '#fb923c' },
  { id: 'uf', name: 'Universidad Fundepos', shortName: 'UF', color: '#22c55e' },
  { id: 'ucc', name: 'Universidad Ciencias y Comercio', shortName: 'UCC', color: '#f472b6' },
]

export function universityById(id: string): LpfUniversity {
  return universities.find((university) => university.id === id) ?? universities[0]
}

const KPIS: LpfFuturoKpi[] = [
  {
    id: 'vacantes',
    label: 'Vacantes activas',
    value: 28,
    tone: 'violet',
    delta: { direction: 'up', tone: 'emerald', label: '12%', caption: 'vs. 2025' },
  },
  {
    id: 'postulados',
    label: 'Postulados totales',
    value: 342,
    tone: 'emerald',
    delta: { direction: 'up', tone: 'emerald', label: '28%', caption: 'vs. 2025' },
  },
  {
    id: 'universidades',
    label: 'Universidades',
    value: 16,
    tone: 'brand',
    delta: { direction: 'up', tone: 'brand', label: '+2', caption: 'vs. 2025' },
  },
  {
    id: 'clubes',
    label: 'Clubes participantes',
    value: 12,
    tone: 'indigo',
    caption: '100% de la LPF',
  },
  {
    id: 'pasantes',
    label: 'Pasantías iniciadas',
    value: 74,
    tone: 'sky',
    delta: { direction: 'up', tone: 'emerald', label: '18%', caption: 'vs. 2025' },
  },
]

const POSTULADOS: LpfPostulante[] = [
  { id: 'post-1', name: 'Carlos Mendoza', email: 'carlos.mendoza@utp.ac.pa', university: universityById('utp'), vacante: 'Analista de datos', area: 'Análisis de datos', club: clubById('tauro'), date: '2026-01-24', state: 'en-revision' },
  { id: 'post-2', name: 'María Torres', email: 'maria.torres@usma.ac.pa', university: universityById('usma'), vacante: 'Marketing digital', area: 'Marketing digital', club: clubById('arabe'), date: '2026-01-24', state: 'nuevo' },
  { id: 'post-3', name: 'Luis Cedeño', email: 'luis.cedeno@up.ac.pa', university: universityById('up'), vacante: 'Fisioterapia deportiva', area: 'Fisioterapia deportiva', club: clubById('sporting'), date: '2026-01-23', state: 'preseleccionado' },
  { id: 'post-4', name: 'Ana Pérez', email: 'ana.perez@ulacit.ac.pa', university: universityById('ulacit'), vacante: 'Asistente de prensa', area: 'Comunicación', club: clubById('universitario'), date: '2026-01-23', state: 'en-revision' },
  { id: 'post-5', name: 'Jorge Batista', email: 'jorge.batista@uip.ac.pa', university: universityById('uip'), vacante: 'Análisis de rendimiento', area: 'Análisis de datos', club: clubById('tauro'), date: '2026-01-22', state: 'aceptado' },
  { id: 'post-6', name: 'Sofía Ramos', email: 'sofia.ramos@utp.ac.pa', university: universityById('utp'), vacante: 'Diseño gráfico', area: 'Marketing digital', club: clubById('sanfrancisco'), date: '2026-01-22', state: 'nuevo' },
  { id: 'post-7', name: 'Diego Fernández', email: 'diego.fernandez@usma.ac.pa', university: universityById('usma'), vacante: 'Redes sociales', area: 'Marketing digital', club: clubById('veraguas'), date: '2026-01-21', state: 'rechazado' },
  { id: 'post-8', name: 'Valentina Gutiérrez', email: 'valentina.gutierrez@up.ac.pa', university: universityById('up'), vacante: 'Nutrición deportiva', area: 'Fisioterapia deportiva', club: clubById('herrera'), date: '2026-01-21', state: 'en-revision' },
  { id: 'post-9', name: 'Andrés Herrera', email: 'andres.herrera@ulacit.ac.pa', university: universityById('ulacit'), vacante: 'Videoanálisis', area: 'Análisis de datos', club: clubById('tauro'), date: '2026-01-20', state: 'preseleccionado' },
  { id: 'post-10', name: 'Gabriela Molina', email: 'gabriela.molina@uip.ac.pa', university: universityById('uip'), vacante: 'Coordinadora de logística', area: 'Operaciones', club: clubById('sporting'), date: '2026-01-20', state: 'nuevo' },
]

const POSTULADOS_POR_CLUB: LpfRankingItem[] = [
  { id: 'cai', label: 'CAI', value: 62, club: clubById('cai') },
  { id: 'arabe', label: 'Árabe Unido', value: 48, club: clubById('arabe') },
  { id: 'plaza-amador', label: 'Plaza Amador', value: 41, club: clubById('plaza-amador') },
  { id: 'universitario', label: 'CD Universitario', value: 36, club: clubById('universitario') },
  { id: 'sanfrancisco', label: 'San Francisco', value: 32, club: clubById('sanfrancisco') },
]

const POSTULADOS_POR_UNIVERSIDAD: LpfRankingItem[] = [
  { id: 'utp', label: 'Universidad Tecnológica de Panamá', value: 88, university: universityById('utp') },
  { id: 'usma', label: 'Universidad Católica Santa María La Antigua', value: 76, university: universityById('usma') },
  { id: 'up', label: 'Universidad de Panamá', value: 64, university: universityById('up') },
  { id: 'ulacit', label: 'ULACIT', value: 52, university: universityById('ulacit') },
  { id: 'uip', label: 'Universidad Interamericana de Panamá', value: 28, university: universityById('uip') },
]

const VACANTES_DESTACADAS: LpfVacante[] = [
  { id: 'vac-1', role: 'Analista de datos', area: 'Análisis', modality: 'Presencial', club: clubById('tauro'), postedLabel: 'hace 2 días' },
  { id: 'vac-2', role: 'Fisioterapeuta deportivo', area: 'Deporte', modality: 'Híbrida', club: clubById('arabe'), postedLabel: 'hace 3 días' },
  { id: 'vac-3', role: 'Community manager', area: 'Marketing', modality: 'Remota', club: clubById('sporting'), postedLabel: 'hace 4 días' },
  { id: 'vac-4', role: 'Coordinador de logística', area: 'Operaciones', modality: 'Presencial', club: clubById('universitario'), postedLabel: 'hace 5 días' },
]

const UNIVERSIDADES_ACTIVAS: LpfUniversityStat[] = [
  { university: universityById('utp'), count: 62 },
  { university: universityById('usma'), count: 76 },
  { university: universityById('up'), count: 64 },
  { university: universityById('ulacit'), count: 52 },
  { university: universityById('uip'), count: 28 },
]

const AREAS_MAS_SOLICITADAS: LpfAreaDemand[] = [
  { id: 'analisis', label: 'Análisis de datos', percent: 28 },
  { id: 'marketing', label: 'Marketing digital', percent: 22 },
  { id: 'fisioterapia', label: 'Fisioterapia deportiva', percent: 18 },
  { id: 'comunicacion', label: 'Comunicación', percent: 14 },
  { id: 'operaciones', label: 'Operaciones', percent: 10 },
  { id: 'otros', label: 'Otros', percent: 8 },
]

const VACANTE_CLUBS = [
  clubById('cai'),
  clubById('tauro'),
  clubById('plaza-amador'),
  clubById('sanfrancisco'),
  clubById('sporting'),
  clubById('arabe'),
]

const VACANTE_UNIVERSITIES = [
  'utp',
  'usma',
  'up',
  'ulacit',
  'uip',
  'udelas',
  'ulat',
  'isae',
  'uam',
  'udi',
  'qlu',
  'udla',
  'unesa',
  'upsm',
  'uf',
  'ucc',
]

const VACANTE_MODALITIES = ['Presencial', 'Híbrida', 'Remota'] as const
const VACANTE_DURATIONS = ['3 meses', '4 meses', '6 meses', '12 meses']

interface VacanteSeed {
  role: string
  area: string
  applicants: number
  deadline: string
}

// 24 vacantes repartidas de forma pareja entre las 6 áreas (4 por área),
// rotando clubes, universidades, modalidades y duraciones de forma determinista.
const VACANTE_SEEDS: VacanteSeed[] = [
  { role: 'Análisis de Datos Deportivos', area: 'Analítica', applicants: 15, deadline: '2026-10-30' },
  { role: 'Marketing Digital', area: 'Marketing', applicants: 8, deadline: '2026-11-15' },
  { role: 'Preparación Física', area: 'Deportivo', applicants: 12, deadline: '2026-10-20' },
  { role: 'Comunicación Institucional', area: 'Comunicación', applicants: 6, deadline: '2026-11-05' },
  { role: 'Scouting / Visoría', area: 'Scouting', applicants: 9, deadline: '2026-12-01' },
  { role: 'Administración Deportiva', area: 'Administración', applicants: 11, deadline: '2026-11-20' },
  { role: 'Ciencia de Datos del Rendimiento', area: 'Analítica', applicants: 7, deadline: '2026-11-30' },
  { role: 'Diseño Gráfico y Contenido', area: 'Marketing', applicants: 10, deadline: '2026-10-25' },
  { role: 'Fisioterapia Deportiva', area: 'Deportivo', applicants: 14, deadline: '2026-11-10' },
  { role: 'Prensa y Redes Sociales', area: 'Comunicación', applicants: 5, deadline: '2026-12-10' },
  { role: 'Análisis de Rivales', area: 'Scouting', applicants: 13, deadline: '2026-10-15' },
  { role: 'Logística de Partidos', area: 'Administración', applicants: 4, deadline: '2026-11-25' },
  { role: 'Videoanálisis Táctico', area: 'Analítica', applicants: 16, deadline: '2026-12-05' },
  { role: 'Marketing de Marca', area: 'Marketing', applicants: 9, deadline: '2026-11-01' },
  { role: 'Nutrición Deportiva', area: 'Deportivo', applicants: 6, deadline: '2026-10-28' },
  { role: 'Producción Audiovisual', area: 'Comunicación', applicants: 8, deadline: '2026-12-15' },
  { role: 'Captación de Talentos', area: 'Scouting', applicants: 12, deadline: '2026-11-18' },
  { role: 'Gestión de Recursos Humanos', area: 'Administración', applicants: 7, deadline: '2026-10-22' },
  { role: 'Inteligencia Deportiva', area: 'Analítica', applicants: 11, deadline: '2026-12-20' },
  { role: 'E-commerce y Ventas', area: 'Marketing', applicants: 5, deadline: '2026-11-08' },
  { role: 'Metodología de Entrenamiento', area: 'Deportivo', applicants: 10, deadline: '2026-10-18' },
  { role: 'Relaciones Públicas', area: 'Comunicación', applicants: 3, deadline: '2026-12-12' },
  { role: 'Data Scouting', area: 'Scouting', applicants: 15, deadline: '2026-11-28' },
  { role: 'Finanzas y Presupuesto', area: 'Administración', applicants: 9, deadline: '2026-10-26' },
]

function postedLabelFor(daysAgo: number): string {
  if (daysAgo <= 0) return 'Hoy'
  if (daysAgo === 1) return 'Hace 1 día'
  if (daysAgo < 7) return `Hace ${daysAgo} días`
  const weeks = Math.floor(daysAgo / 7)
  return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
}

function buildVacante(seed: VacanteSeed, index: number): LpfVacante {
  const club = VACANTE_CLUBS[index % VACANTE_CLUBS.length]
  const university = universityById(VACANTE_UNIVERSITIES[index % VACANTE_UNIVERSITIES.length])
  const modality = VACANTE_MODALITIES[index % VACANTE_MODALITIES.length]
  const durationLabel = VACANTE_DURATIONS[index % VACANTE_DURATIONS.length]

  return {
    id: `vac-${index + 1}`,
    role: seed.role,
    area: seed.area,
    modality,
    type: 'Pasantía',
    club,
    university,
    postedLabel: postedLabelFor(index + 1),
    postedDaysAgo: index + 1,
    applicants: seed.applicants,
    durationLabel,
    deadline: seed.deadline,
    description:
      `Apoyar al ${club.name} como ${seed.role} dentro del área de ${seed.area}. El pasante participará en actividades reales del club, acompañado por un tutor, y desarrollará competencias profesionales vinculadas a ${seed.role.toLowerCase()}.`,
    requirements: [
      `Ser estudiante activo de la ${university.name}`,
      `Afinidad con el área de ${seed.area.toLowerCase()}`,
      'Interés en fútbol y gestión deportiva',
      'Disponibilidad para cumplir el horario de la vacante',
      'Manejo de herramientas ofimáticas (deseable)',
    ],
    responsibilities: [
      `Apoyo en las tareas propias de ${seed.role.toLowerCase()}`,
      `Colaboración con el equipo del ${club.name}`,
      'Elaboración de reportes y seguimiento de actividades',
      'Participación en reuniones de coordinación',
      'Propuestas de mejora en los procesos del área',
    ],
    eligibleUniversities: [university],
  }
}

const VACANTES: LpfVacante[] = VACANTE_SEEDS.map(buildVacante)

export const lpfFuturo: LpfFuturoSummary = {
  season: '2026',
  kpis: KPIS,
  postulados: POSTULADOS,
  postuladosPorClub: POSTULADOS_POR_CLUB,
  postuladosPorUniversidad: POSTULADOS_POR_UNIVERSIDAD,
  vacantesDestacadas: VACANTES_DESTACADAS,
  vacantes: VACANTES,
  vacantesTotal: VACANTES.length,
  universidadesActivas: UNIVERSIDADES_ACTIVAS,
  universidadesTotales: universities.length,
  areasMasSolicitadas: AREAS_MAS_SOLICITADAS,
}

export const lpfFuturoFilterOptions: LpfFuturoFilterOptions = {
  estados: [
    { id: 'todos', label: 'Todos' },
    { id: 'nuevo', label: 'Nuevo' },
    { id: 'en-revision', label: 'En revisión' },
    { id: 'preseleccionado', label: 'Preseleccionado' },
    { id: 'aceptado', label: 'Aceptado' },
    { id: 'rechazado', label: 'Rechazado' },
  ],
  universidades: [
    { id: 'todas', label: 'Todas' },
    ...universities.map((university) => ({ id: university.id, label: university.shortName })),
  ],
  clubes: [
    { id: 'todos', label: 'Todos' },
    ...clubs.map((club) => ({ id: club.id, label: club.name })),
  ],
  areas: [
    { id: 'todas', label: 'Todas' },
    { id: 'Análisis de datos', label: 'Análisis de datos' },
    { id: 'Marketing digital', label: 'Marketing digital' },
    { id: 'Fisioterapia deportiva', label: 'Fisioterapia deportiva' },
    { id: 'Comunicación', label: 'Comunicación' },
    { id: 'Operaciones', label: 'Operaciones' },
  ],
}

export const lpfVacanteFilterOptions: LpfVacanteFilterOptions = {
  areas: [
    { id: 'todas', label: 'Todas' },
    { id: 'Analítica', label: 'Analítica' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Deportivo', label: 'Deportivo' },
    { id: 'Comunicación', label: 'Comunicación' },
    { id: 'Scouting', label: 'Scouting' },
    { id: 'Administración', label: 'Administración' },
  ],
  clubes: [
    { id: 'todos', label: 'Todos' },
    ...VACANTE_CLUBS.map((club) => ({ id: club.id, label: club.name })),
  ],
  modalidades: [
    { id: 'todas', label: 'Todas' },
    { id: 'Presencial', label: 'Presencial' },
    { id: 'Híbrida', label: 'Híbrida' },
    { id: 'Remota', label: 'Remota' },
  ],
  tipos: [
    { id: 'todos', label: 'Todos' },
    { id: 'Pasantía', label: 'Pasantía' },
  ],
}


