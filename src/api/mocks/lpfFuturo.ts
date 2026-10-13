import type {
  LpfAreaDemand,
  LpfFuturoFilterOptions,
  LpfFuturoKpi,
  LpfFuturoSummary,
  LpfPostulante,
  LpfPostuladosFilterOptions,
  LpfRankingItem,
  LpfUniversidadContacto,
  LpfUniversidadEstado,
  LpfUniversidadEstudiante,
  LpfUniversidadReview,
  LpfUniversidadTipo,
  LpfUniversidadVacanteResumen,
  LpfUniversidadesFilterOptions,
  LpfUniversity,
  LpfUniversityStat,
  LpfVacante,
  LpfVacanteFilterOptions,
} from '@/types'
import { clubById, clubs } from './clubs'

interface UniversidadSeed {
  id: string
  name: string
  shortName: string
  color: string
  estado: LpfUniversidadEstado
  tipo: LpfUniversidadTipo
  ciudad: string
  website: string
  description: string
  estudiantes: number
  vacantes: number
  postulados: number
  rating: number
  reviewsCount: number
  areas: string[]
  contacto: LpfUniversidadContacto
  partnerSince: string
}

const UNIVERSIDAD_SEEDS: UniversidadSeed[] = [
  {
    id: 'utp',
    name: 'Universidad Tecnológica de Panamá',
    shortName: 'UTP',
    color: '#f59e0b',
    estado: 'activa',
    tipo: 'Pública',
    ciudad: 'Ciudad de Panamá',
    website: 'https://utp.ac.pa',
    description:
      'Universidad pública líder en la formación de ingenieros y tecnólogos, aliada estratégica de la LPF en analítica, preparación física y gestión deportiva.',
    estudiantes: 342,
    vacantes: 12,
    postulados: 86,
    rating: 4.6,
    reviewsCount: 128,
    areas: ['Análisis de Datos', 'Preparación Física', 'Video Análisis', 'Marketing Deportivo', 'Administración'],
    contacto: {
      name: 'María Fernández',
      role: 'Coordinadora de Convenios',
      email: 'convenios@utp.ac.pa',
      phone: '+507 560-3000',
    },
    partnerSince: '2025-03-12',
  },
  {
    id: 'usma',
    name: 'Universidad Católica Santa María La Antigua',
    shortName: 'USMA',
    color: '#0ea5e9',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://usma.ac.pa',
    description:
      'Universidad católica con amplia trayectoria en administración, comunicación y negocios, activa en los programas de pasantías de la LPF.',
    estudiantes: 248,
    vacantes: 8,
    postulados: 76,
    rating: 4.5,
    reviewsCount: 104,
    areas: ['Administración', 'Marketing Deportivo', 'Comunicación'],
    contacto: {
      name: 'Ana Quintero',
      role: 'Enlace de Convenios',
      email: 'convenios@usma.ac.pa',
      phone: '+507 230-8000',
    },
    partnerSince: '2024-08-20',
  },
  {
    id: 'up',
    name: 'Universidad de Panamá',
    shortName: 'UP',
    color: '#2563eb',
    estado: 'activa',
    tipo: 'Pública',
    ciudad: 'Ciudad de Panamá',
    website: 'https://up.ac.pa',
    description:
      'Primera casa de estudios superiores del país, con fuerte presencia en ciencias de la salud y ciencias sociales aplicadas al deporte.',
    estudiantes: 280,
    vacantes: 9,
    postulados: 64,
    rating: 4.4,
    reviewsCount: 112,
    areas: ['Fisioterapia Deportiva', 'Nutrición Deportiva', 'Comunicación'],
    contacto: {
      name: 'Ricardo Bolaños',
      role: 'Coordinador de Prácticas',
      email: 'practicas@up.ac.pa',
      phone: '+507 523-6000',
    },
    partnerSince: '2024-11-05',
  },
  {
    id: 'ulacit',
    name: 'ULACIT',
    shortName: 'ULACIT',
    color: '#7c3aed',
    estado: 'activa',
    tipo: 'Internacional',
    ciudad: 'San José, Costa Rica',
    website: 'https://ulacit.ac.cr',
    description:
      'Universidad costarricense de vocación internacional, referente en innovación y marketing deportivo en la región.',
    estudiantes: 186,
    vacantes: 6,
    postulados: 52,
    rating: 4.7,
    reviewsCount: 96,
    areas: ['Marketing Deportivo', 'Análisis de Datos', 'Comunicación'],
    contacto: {
      name: 'Laura Campos',
      role: 'Coordinadora Académica',
      email: 'practicas@ulacit.ac.cr',
      phone: '+506 2523-6000',
    },
    partnerSince: '2024-03-18',
  },
  {
    id: 'uip',
    name: 'Universidad Interamericana de Panamá',
    shortName: 'UIP',
    color: '#10b981',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://uip.edu.pa',
    description:
      'Institución privada enfocada en ciencias de la comunicación, negocios y derecho, con convenios activos de prácticas profesionales.',
    estudiantes: 120,
    vacantes: 5,
    postulados: 28,
    rating: 4.2,
    reviewsCount: 74,
    areas: ['Comunicación', 'Marketing Deportivo', 'Administración'],
    contacto: {
      name: 'Jorge Saldaña',
      role: 'Coordinador de Prácticas',
      email: 'practicas@uip.edu.pa',
      phone: '+507 391-3000',
    },
    partnerSince: '2023-10-02',
  },
  {
    id: 'udelas',
    name: 'Universidad Especializada de las Américas',
    shortName: 'UDELAS',
    color: '#ef4444',
    estado: 'activa',
    tipo: 'Pública',
    ciudad: 'Ciudad de Panamá',
    website: 'https://udelas.ac.pa',
    description:
      'Universidad pública especializada en salud, educación y tecnologías, con programas vinculados al deporte y la rehabilitación.',
    estudiantes: 68,
    vacantes: 3,
    postulados: 12,
    rating: 4.0,
    reviewsCount: 39,
    areas: ['Fisioterapia Deportiva', 'Preparación Física', 'Nutrición Deportiva'],
    contacto: {
      name: 'Paola Vega',
      role: 'Enlace de Convenios',
      email: 'convenios@udelas.ac.pa',
      phone: '+507 501-4000',
    },
    partnerSince: '2022-09-09',
  },
  {
    id: 'ulat',
    name: 'Universidad Latina de Panamá',
    shortName: 'ULAT',
    color: '#f43f5e',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://ulat.edu.pa',
    description:
      'Universidad con programas orientados a la práctica profesional y al emprendimiento, aliada en la formación de talento para los clubes.',
    estudiantes: 98,
    vacantes: 4,
    postulados: 21,
    rating: 4.3,
    reviewsCount: 61,
    areas: ['Administración', 'Comunicación', 'Marketing Deportivo'],
    contacto: {
      name: 'Melissa Rojas',
      role: 'Enlace de Convenios',
      email: 'convenios@ulat.edu.pa',
      phone: '+507 230-1000',
    },
    partnerSince: '2023-06-15',
  },
  {
    id: 'isae',
    name: 'ISAE Universidad',
    shortName: 'ISAE',
    color: '#6366f1',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://isae.edu.pa',
    description:
      'Universidad con sedes en todo el país, orientada a administración y educación continua, participante activa del programa LPF Futuro.',
    estudiantes: 62,
    vacantes: 3,
    postulados: 11,
    rating: 3.9,
    reviewsCount: 34,
    areas: ['Administración', 'Comunicación'],
    contacto: {
      name: 'Daniel Arias',
      role: 'Coordinador de Prácticas',
      email: 'practicas@isae.edu.pa',
      phone: '+507 278-9000',
    },
    partnerSince: '2022-04-11',
  },
  {
    id: 'uam',
    name: 'Universidad Americana',
    shortName: 'UAM',
    color: '#14b8a6',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://uam.edu.pa',
    description:
      'Universidad con programas bilingües y enfoque internacional en negocios y salud.',
    estudiantes: 58,
    vacantes: 2,
    postulados: 10,
    rating: 3.9,
    reviewsCount: 30,
    areas: ['Administración', 'Comunicación', 'Marketing Deportivo'],
    contacto: {
      name: 'Gabriela Santos',
      role: 'Enlace de Convenios',
      email: 'convenios@uam.edu.pa',
      phone: '+507 391-7000',
    },
    partnerSince: '2021-12-01',
  },
  {
    id: 'udi',
    name: 'Universidad del Istmo',
    shortName: 'UDI',
    color: '#3b82f6',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Panamá Oeste',
    website: 'https://udi.edu.pa',
    description:
      'Universidad comprometida con la formación técnica y administrativa en la zona oeste del país.',
    estudiantes: 76,
    vacantes: 3,
    postulados: 15,
    rating: 4.1,
    reviewsCount: 48,
    areas: ['Administración', 'Análisis de Datos'],
    contacto: {
      name: 'Carlos Navarro',
      role: 'Coordinador de Prácticas',
      email: 'practicas@udi.edu.pa',
      phone: '+507 244-2000',
    },
    partnerSince: '2023-01-27',
  },
  {
    id: 'qlu',
    name: 'Quality Leadership University',
    shortName: 'QLU',
    color: '#eab308',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://qlu.edu.pa',
    description:
      'Universidad internacional que combina programas locales con alianzas académicas extranjeras, enfocada en liderazgo y analítica.',
    estudiantes: 51,
    vacantes: 2,
    postulados: 9,
    rating: 4.2,
    reviewsCount: 27,
    areas: ['Análisis de Datos', 'Administración', 'Marketing Deportivo'],
    contacto: {
      name: 'Andrés Pittí',
      role: 'Coordinador de Prácticas',
      email: 'practicas@qlu.edu.pa',
      phone: '+507 264-5000',
    },
    partnerSince: '2021-07-19',
  },
  {
    id: 'udla',
    name: 'Universidad de las Américas',
    shortName: 'UDLA',
    color: '#a855f7',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://udla.edu.pa',
    description:
      'Universidad con énfasis en artes, comunicación y ciencias sociales aplicadas al deporte.',
    estudiantes: 47,
    vacantes: 2,
    postulados: 8,
    rating: 4.0,
    reviewsCount: 22,
    areas: ['Comunicación', 'Marketing Deportivo'],
    contacto: {
      name: 'Karina López',
      role: 'Enlace de Convenios',
      email: 'convenios@udla.edu.pa',
      phone: '+507 380-1000',
    },
    partnerSince: '2021-02-23',
  },
  {
    id: 'unesa',
    name: 'UNESA',
    shortName: 'UNESA',
    color: '#06b6d4',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://unesa.edu.pa',
    description: 'Institución privada orientada a la empleabilidad y la formación profesional continua.',
    estudiantes: 43,
    vacantes: 1,
    postulados: 7,
    rating: 3.8,
    reviewsCount: 18,
    areas: ['Administración'],
    contacto: {
      name: 'Félix Márquez',
      role: 'Coordinador de Prácticas',
      email: 'practicas@unesa.edu.pa',
      phone: '+507 236-8000',
    },
    partnerSince: '2020-10-30',
  },
  {
    id: 'upsm',
    name: 'Universidad Politécnica San Miguelito',
    shortName: 'UPSM',
    color: '#fb923c',
    estado: 'activa',
    tipo: 'Pública',
    ciudad: 'San Miguelito',
    website: 'https://upsm.edu.pa',
    description:
      'Universidad politécnica enfocada en ingenierías y tecnología aplicada, con campus en San Miguelito.',
    estudiantes: 38,
    vacantes: 1,
    postulados: 6,
    rating: 3.8,
    reviewsCount: 15,
    areas: ['Análisis de Datos', 'Preparación Física', 'Video Análisis'],
    contacto: {
      name: 'Diana Ortega',
      role: 'Enlace de Convenios',
      email: 'convenios@upsm.edu.pa',
      phone: '+507 204-3000',
    },
    partnerSince: '2020-06-08',
  },
  {
    id: 'uf',
    name: 'Universidad Fundepos',
    shortName: 'UF',
    color: '#22c55e',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://uf.edu.pa',
    description:
      'Universidad orientada a la educación superior accesible y la vinculación con el sector productivo.',
    estudiantes: 31,
    vacantes: 1,
    postulados: 5,
    rating: 3.7,
    reviewsCount: 11,
    areas: ['Administración', 'Comunicación'],
    contacto: {
      name: 'Rolando Cedeño',
      role: 'Coordinador de Prácticas',
      email: 'practicas@uf.edu.pa',
      phone: '+507 269-2000',
    },
    partnerSince: '2019-11-14',
  },
  {
    id: 'ucc',
    name: 'Universidad Ciencias y Comercio',
    shortName: 'UCC',
    color: '#f472b6',
    estado: 'activa',
    tipo: 'Privada',
    ciudad: 'Ciudad de Panamá',
    website: 'https://ucc.edu.pa',
    description: 'Universidad de ciencias y comercio con programas de administración, comercio y mercadeo.',
    estudiantes: 26,
    vacantes: 1,
    postulados: 4,
    rating: 3.7,
    reviewsCount: 9,
    areas: ['Administración', 'Marketing Deportivo', 'Comunicación'],
    contacto: {
      name: 'Nadia Herrera',
      role: 'Enlace de Convenios',
      email: 'convenios@ucc.edu.pa',
      phone: '+507 214-7000',
    },
    partnerSince: '2019-08-22',
  },
]

const ESTUDIANTE_POOL = [
  { name: 'Carlos Mendoza', career: 'Ing. en Sistemas Computacionales', semester: '7.º semestre', avatarColor: '#1d4ed8' },
  { name: 'Ana Pérez', career: 'Lic. en Comunicación Social', semester: '8.º semestre', avatarColor: '#7c3aed' },
  { name: 'Luis Cedeño', career: 'Lic. en Fisioterapia', semester: '9.º semestre', avatarColor: '#2563eb' },
  { name: 'Valeria Santos', career: 'Lic. en Administración', semester: '6.º semestre', avatarColor: '#0ea5e9' },
  { name: 'Ricardo Mena', career: 'Ing. Industrial', semester: '8.º semestre', avatarColor: '#f43f5e' },
  { name: 'Sofía Rojas', career: 'Lic. en Marketing', semester: '7.º semestre', avatarColor: '#10b981' },
]

const REVIEW_POOL = [
  {
    author: 'Jorge Arosemena',
    role: 'Coordinador de Convenios',
    rating: 5,
    date: '2026-09-28',
    comment: 'Excelente acompañamiento del club durante todo el proceso de pasantía.',
  },
  {
    author: 'Lía Castillo',
    role: 'Estudiante de Analítica',
    rating: 5,
    date: '2026-09-15',
    comment: 'Una experiencia que conecta el aula con la cancha de forma real.',
  },
  {
    author: 'Miguel Barrios',
    role: 'Responsable de Marketing',
    rating: 4,
    date: '2026-08-30',
    comment: 'Muy buen flujo de comunicación con la LPF y los clubes.',
  },
]

function buildVacantesRecientes(university: UniversidadSeed, index: number): LpfUniversidadVacanteResumen[] {
  const roles = ['Análisis de Datos Deportivos', 'Marketing Digital', 'Producción Audiovisual']
  const areas = ['Analítica', 'Marketing', 'Comunicación']
  const labels = ['Publicado hace 2 días', 'Publicado hace 4 días', 'Publicado hace 1 semana']
  const counts = [8, 6, 4]
  return roles.map((role, i) => ({
    id: `${university.id}-vac-${i + 1}`,
    role,
    area: areas[i],
    postedLabel: labels[i],
    postulados: Math.max(1, counts[i] - index),
  }))
}

function buildEstudiantes(university: UniversidadSeed, index: number): LpfUniversidadEstudiante[] {
  return Array.from({ length: 3 }, (_, i) => {
    const source = ESTUDIANTE_POOL[(index + i) % ESTUDIANTE_POOL.length]
    const email = `${source.name.toLowerCase().replace(/\s+/g, '.')}@${university.shortName.toLowerCase()}.edu.pa`
    return {
      id: `${university.id}-est-${i + 1}`,
      name: source.name,
      email,
      career: source.career,
      semester: source.semester,
      avatarColor: source.avatarColor,
    }
  })
}

function buildReviews(university: UniversidadSeed, index: number): LpfUniversidadReview[] {
  return [0, 1].map((offset) => {
    const item = REVIEW_POOL[(index + offset) % REVIEW_POOL.length]
    return { ...item, id: `${university.id}-rev-${offset + 1}` }
  })
}

export const universities: LpfUniversity[] = UNIVERSIDAD_SEEDS.map((seed, index) => ({
  id: seed.id,
  name: seed.name,
  shortName: seed.shortName,
  color: seed.color,
  estado: seed.estado,
  tipo: seed.tipo,
  ciudad: seed.ciudad,
  website: seed.website,
  description: seed.description,
  estudiantes: seed.estudiantes,
  vacantes: seed.vacantes,
  postulados: seed.postulados,
  rating: seed.rating,
  reviewsCount: seed.reviewsCount,
  areas: seed.areas,
  contacto: seed.contacto,
  partnerSince: seed.partnerSince,
  vacantesRecientes: buildVacantesRecientes(seed, index),
  estudiantesDestacados: buildEstudiantes(seed, index),
  reviews: buildReviews(seed, index),
}))

export function universityById(id: string): LpfUniversity {
  return universities.find((university) => university.id === id) ?? universities[0]
}

const UNIVERSIDADES_KPIS: LpfFuturoKpi[] = [
  {
    id: 'universidades',
    label: 'Universidades activas',
    value: 16,
    tone: 'brand',
    delta: { direction: 'up', tone: 'brand', label: '+2', caption: 'vs. 2025' },
  },
  {
    id: 'estudiantes',
    label: 'Estudiantes registrados',
    value: 1243,
    tone: 'emerald',
    delta: { direction: 'up', tone: 'emerald', label: '28%', caption: 'vs. 2025' },
  },
  {
    id: 'vacantes',
    label: 'Vacantes publicadas',
    value: 48,
    tone: 'brand',
    delta: { direction: 'up', tone: 'emerald', label: '33%', caption: 'vs. 2025' },
  },
  {
    id: 'postulados',
    label: 'Postulados totales',
    value: 342,
    tone: 'violet',
    delta: { direction: 'up', tone: 'emerald', label: '28%', caption: 'vs. 2025' },
  },
]

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
  {
    id: 'post-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@utp.ac.pa',
    phone: '+507 6123-4567',
    avatarColor: '#1d4ed8',
    type: 'Pasantía',
    university: universityById('utp'),
    career: 'Ing. en Sistemas Computacionales',
    semester: '7.º semestre',
    gpa: '3.9 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2002-03-14',
    availability: 'Tiempo completo',
    vacante: 'Analista de datos',
    area: 'Análisis de datos',
    club: clubById('tauro'),
    date: '2026-01-24',
    state: 'en-revision',
    coverLetter:
      'Estudiante con dominio de análisis de datos y visualización, con interés en aportar al área de rendimiento deportivo del club.',
    skills: ['Excel avanzado', 'SQL', 'Power BI', 'Python'],
    documents: [
      { id: 'doc-1', name: 'Currículum Vitae', kind: 'cv', size: '240 KB', uploadedAt: '2026-01-20', verified: true },
      { id: 'doc-2', name: 'Carta de motivación', kind: 'carta', size: '96 KB', uploadedAt: '2026-01-21', verified: true },
      { id: 'doc-3', name: 'Créditos académicos', kind: 'transcripto', size: '320 KB', uploadedAt: '2026-01-22', verified: false },
    ],
    interviews: [
      { id: 'ent-1', date: '2026-02-02', time: '10:00 a. m.', mode: 'virtual', interviewer: 'Juan Ríos (Scouting)', status: 'confirmada' },
    ],
    history: [
      { id: 'hist-1', date: '2026-01-24', title: 'Postulación recibida', description: 'Aplicó a la vacante Analista de datos.', tone: 'neutral' },
      { id: 'hist-2', date: '2026-01-26', title: 'Documentos verificados', description: 'El equipo de admisiones validó el CV y la carta.', tone: 'success' },
      { id: 'hist-3', date: '2026-01-28', title: 'En revisión', description: 'Perfil en evaluación por el club.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-2',
    name: 'María Torres',
    email: 'maria.torres@usma.ac.pa',
    phone: '+507 6234-8912',
    avatarColor: '#0ea5e9',
    type: 'Pasantía',
    university: universityById('usma'),
    career: 'Lic. en Marketing y Publicidad',
    semester: '6.º semestre',
    gpa: '3.7 / 4.0',
    location: 'Colón, Panamá',
    birthDate: '2002-08-22',
    availability: 'Medio tiempo',
    vacante: 'Marketing digital',
    area: 'Marketing digital',
    club: clubById('arabe'),
    date: '2026-01-24',
    state: 'nuevo',
    coverLetter:
      'Apasionada por las marcas deportivas y el contenido digital, busca crecer en el área de marketing de un club de fútbol.',
    skills: ['Meta Ads', 'Canva', 'Google Analytics', 'Redacción'],
    documents: [
      { id: 'doc-4', name: 'Currículum Vitae', kind: 'cv', size: '210 KB', uploadedAt: '2026-01-19', verified: true },
      { id: 'doc-5', name: 'Portafolio de campañas', kind: 'portafolio', size: '1.4 MB', uploadedAt: '2026-01-20', verified: true },
      { id: 'doc-6', name: 'Carta de motivación', kind: 'carta', size: '88 KB', uploadedAt: '2026-01-22', verified: false },
    ],
    interviews: [],
    history: [
      { id: 'hist-4', date: '2026-01-24', title: 'Postulación recibida', description: 'Aplicó a la vacante Marketing digital.', tone: 'neutral' },
      { id: 'hist-5', date: '2026-01-25', title: 'Perfil nuevo', description: 'Pendiente de revisión por el club.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-3',
    name: 'Luis Cedeño',
    email: 'luis.cedeno@up.ac.pa',
    phone: '+507 6345-1209',
    avatarColor: '#2563eb',
    type: 'Práctica profesional',
    university: universityById('up'),
    career: 'Lic. en Fisioterapia',
    semester: '9.º semestre',
    gpa: '3.6 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2001-11-02',
    availability: 'Tiempo completo',
    vacante: 'Fisioterapia deportiva',
    area: 'Fisioterapia deportiva',
    club: clubById('sporting'),
    date: '2026-01-23',
    state: 'preseleccionado',
    coverLetter:
      'Futuro fisioterapeuta con experiencia en clínicas deportivas, enfocado en la prevención y recuperación de lesiones.',
    skills: ['Evaluación funcional', 'Vendaje neuromuscular', 'Rehabilitación'],
    documents: [
      { id: 'doc-7', name: 'Currículum Vitae', kind: 'cv', size: '230 KB', uploadedAt: '2026-01-18', verified: true },
      { id: 'doc-8', name: 'Créditos académicos', kind: 'transcripto', size: '300 KB', uploadedAt: '2026-01-20', verified: true },
      { id: 'doc-9', name: 'Carta de motivación', kind: 'carta', size: '92 KB', uploadedAt: '2026-01-21', verified: false },
    ],
    interviews: [
      { id: 'ent-2', date: '2026-01-29', time: '2:00 p. m.', mode: 'presencial', interviewer: 'Marta Gil (Cuerpo médico)', status: 'completada' },
    ],
    history: [
      { id: 'hist-6', date: '2026-01-23', title: 'Postulación recibida', description: 'Aplicó a la vacante Fisioterapia deportiva.', tone: 'neutral' },
      { id: 'hist-7', date: '2026-01-25', title: 'Preseleccionado', description: 'Avanzó a la siguiente etapa del proceso.', tone: 'success' },
      { id: 'hist-8', date: '2026-01-29', title: 'Entrevista completada', description: 'Entrevista presencial con el cuerpo médico.', tone: 'success' },
    ],
  },
  {
    id: 'post-4',
    name: 'Ana Pérez',
    email: 'ana.perez@ulacit.ac.pa',
    phone: '+507 6456-7788',
    avatarColor: '#7c3aed',
    type: 'Pasantía',
    university: universityById('ulacit'),
    career: 'Lic. en Comunicación Social',
    semester: '8.º semestre',
    gpa: '3.8 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2002-01-30',
    availability: 'Medio tiempo',
    vacante: 'Asistente de prensa',
    area: 'Comunicación',
    club: clubById('universitario'),
    date: '2026-01-23',
    state: 'en-revision',
    coverLetter:
      'Interés por la comunicación institucional y la relación con medios en el ámbito deportivo.',
    skills: ['Redacción', 'Gestión de prensa', 'Adobe Premiere'],
    documents: [
      { id: 'doc-10', name: 'Currículum Vitae', kind: 'cv', size: '200 KB', uploadedAt: '2026-01-18', verified: true },
      { id: 'doc-11', name: 'Carta de motivación', kind: 'carta', size: '85 KB', uploadedAt: '2026-01-21', verified: false },
    ],
    interviews: [],
    history: [
      { id: 'hist-9', date: '2026-01-23', title: 'Postulación recibida', description: 'Aplicó a la vacante Asistente de prensa.', tone: 'neutral' },
      { id: 'hist-10', date: '2026-01-26', title: 'En revisión', description: 'Perfil en evaluación por el club.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-5',
    name: 'Jorge Batista',
    email: 'jorge.batista@uip.ac.pa',
    phone: '+507 6567-3345',
    avatarColor: '#10b981',
    type: 'Pasantía',
    university: universityById('uip'),
    career: 'Lic. en Ciencias del Deporte',
    semester: '10.º semestre',
    gpa: '3.9 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2001-05-17',
    availability: 'Tiempo completo',
    vacante: 'Análisis de rendimiento',
    area: 'Análisis de datos',
    club: clubById('tauro'),
    date: '2026-01-22',
    state: 'aceptado',
    coverLetter:
      'Perfil analítico orientado al rendimiento físico y al seguimiento de métricas deportivas.',
    skills: ['Rendimiento deportivo', 'GPS Catapult', 'Excel', 'SPSS'],
    documents: [
      { id: 'doc-12', name: 'Currículum Vitae', kind: 'cv', size: '250 KB', uploadedAt: '2026-01-17', verified: true },
      { id: 'doc-13', name: 'Créditos académicos', kind: 'transcripto', size: '310 KB', uploadedAt: '2026-01-18', verified: true },
    ],
    interviews: [
      { id: 'ent-3', date: '2026-01-27', time: '11:00 a. m.', mode: 'virtual', interviewer: 'Raúl Pino (Rendimiento)', status: 'completada' },
    ],
    history: [
      { id: 'hist-11', date: '2026-01-22', title: 'Postulación recibida', description: 'Aplicó a la vacante Análisis de rendimiento.', tone: 'neutral' },
      { id: 'hist-12', date: '2026-01-24', title: 'Preseleccionado', description: 'Avanzó a la etapa de entrevistas.', tone: 'success' },
      { id: 'hist-13', date: '2026-01-27', title: 'Entrevista completada', description: 'Entrevista virtual con el área de rendimiento.', tone: 'success' },
      { id: 'hist-14', date: '2026-01-30', title: 'Aceptado', description: 'El club confirmó la postulación.', tone: 'success' },
    ],
  },
  {
    id: 'post-6',
    name: 'Sofía Ramos',
    email: 'sofia.ramos@utp.ac.pa',
    phone: '+507 6678-9921',
    avatarColor: '#f59e0b',
    type: 'Pasantía',
    university: universityById('utp'),
    career: 'Lic. en Diseño Gráfico',
    semester: '5.º semestre',
    gpa: '3.5 / 4.0',
    location: 'San Miguelito, Panamá',
    birthDate: '2003-04-09',
    availability: 'Medio tiempo',
    vacante: 'Diseño gráfico',
    area: 'Marketing digital',
    club: clubById('sanfrancisco'),
    date: '2026-01-22',
    state: 'nuevo',
    coverLetter:
      'Diseñadora con enfoque en identidad visual y piezas gráficas para redes sociales.',
    skills: ['Illustrator', 'Photoshop', 'Figma', 'Motion básico'],
    documents: [
      { id: 'doc-14', name: 'Currículum Vitae', kind: 'cv', size: '190 KB', uploadedAt: '2026-01-17', verified: true },
      { id: 'doc-15', name: 'Portafolio de diseño', kind: 'portafolio', size: '2.1 MB', uploadedAt: '2026-01-18', verified: true },
    ],
    interviews: [],
    history: [
      { id: 'hist-15', date: '2026-01-22', title: 'Postulación recibida', description: 'Aplicó a la vacante Diseño gráfico.', tone: 'neutral' },
      { id: 'hist-16', date: '2026-01-23', title: 'Perfil nuevo', description: 'Pendiente de revisión por el club.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-7',
    name: 'Diego Fernández',
    email: 'diego.fernandez@usma.ac.pa',
    phone: '+507 6789-1122',
    avatarColor: '#ef4444',
    type: 'Pasantía',
    university: universityById('usma'),
    career: 'Lic. en Comunicación Digital',
    semester: '7.º semestre',
    gpa: '3.2 / 4.0',
    location: 'Santiago, Veraguas',
    birthDate: '2002-09-25',
    availability: 'Tiempo completo',
    vacante: 'Redes sociales',
    area: 'Marketing digital',
    club: clubById('veraguas'),
    date: '2026-01-21',
    state: 'rechazado',
    coverLetter:
      'Creador de contenido y community manager con experiencia en gestión de comunidades digitales.',
    skills: ['Community management', 'CapCut', 'Meta Business Suite'],
    documents: [
      { id: 'doc-16', name: 'Currículum Vitae', kind: 'cv', size: '180 KB', uploadedAt: '2026-01-16', verified: true },
    ],
    interviews: [
      { id: 'ent-4', date: '2026-01-26', time: '9:00 a. m.', mode: 'virtual', interviewer: 'Lucía Núñez (Marketing)', status: 'completada' },
    ],
    history: [
      { id: 'hist-17', date: '2026-01-21', title: 'Postulación recibida', description: 'Aplicó a la vacante Redes sociales.', tone: 'neutral' },
      { id: 'hist-18', date: '2026-01-24', title: 'En revisión', description: 'Perfil evaluado por el club.', tone: 'neutral' },
      { id: 'hist-19', date: '2026-01-27', title: 'Rechazado', description: 'El club decidió avanzar con otro perfil.', tone: 'danger' },
    ],
  },
  {
    id: 'post-8',
    name: 'Valentina Gutiérrez',
    email: 'valentina.gutierrez@up.ac.pa',
    phone: '+507 6890-4455',
    avatarColor: '#0ea5e9',
    type: 'Pasantía',
    university: universityById('up'),
    career: 'Lic. en Nutrición y Dietética',
    semester: '8.º semestre',
    gpa: '3.8 / 4.0',
    location: 'Chitré, Herrera',
    birthDate: '2002-02-11',
    availability: 'Tiempo completo',
    vacante: 'Nutrición deportiva',
    area: 'Fisioterapia deportiva',
    club: clubById('herrera'),
    date: '2026-01-21',
    state: 'en-revision',
    coverLetter:
      'Nutricionista en formación con interés en la alimentación y suplementación del deportista.',
    skills: ['Planes nutricionales', 'Antropometría', 'Educación alimentaria'],
    documents: [
      { id: 'doc-17', name: 'Currículum Vitae', kind: 'cv', size: '205 KB', uploadedAt: '2026-01-16', verified: true },
      { id: 'doc-18', name: 'Créditos académicos', kind: 'transcripto', size: '290 KB', uploadedAt: '2026-01-19', verified: false },
    ],
    interviews: [],
    history: [
      { id: 'hist-20', date: '2026-01-21', title: 'Postulación recibida', description: 'Aplicó a la vacante Nutrición deportiva.', tone: 'neutral' },
      { id: 'hist-21', date: '2026-01-24', title: 'En revisión', description: 'Perfil en evaluación por el club.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-9',
    name: 'Andrés Herrera',
    email: 'andres.herrera@ulacit.ac.pa',
    phone: '+507 6901-7788',
    avatarColor: '#7c3aed',
    type: 'Práctica profesional',
    university: universityById('ulacit'),
    career: 'Ing. en Multimedia',
    semester: '9.º semestre',
    gpa: '3.6 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2001-07-03',
    availability: 'Tiempo completo',
    vacante: 'Videoanálisis',
    area: 'Análisis de datos',
    club: clubById('tauro'),
    date: '2026-01-20',
    state: 'preseleccionado',
    coverLetter:
      'Perfil técnico en edición de video y análisis táctico para apoyar al cuerpo técnico.',
    skills: ['Videoanálisis', 'Hudl', 'Premiere Pro', 'After Effects'],
    documents: [
      { id: 'doc-19', name: 'Currículum Vitae', kind: 'cv', size: '215 KB', uploadedAt: '2026-01-15', verified: true },
      { id: 'doc-20', name: 'Portafolio de video', kind: 'portafolio', size: '3.2 MB', uploadedAt: '2026-01-16', verified: true },
      { id: 'doc-21', name: 'Carta de motivación', kind: 'carta', size: '90 KB', uploadedAt: '2026-01-18', verified: false },
    ],
    interviews: [
      { id: 'ent-5', date: '2026-01-28', time: '3:00 p. m.', mode: 'virtual', interviewer: 'Pablo Vega (Análisis)', status: 'confirmada' },
    ],
    history: [
      { id: 'hist-22', date: '2026-01-20', title: 'Postulación recibida', description: 'Aplicó a la vacante Videoanálisis.', tone: 'neutral' },
      { id: 'hist-23', date: '2026-01-23', title: 'Preseleccionado', description: 'Avanzó a la etapa de entrevistas.', tone: 'success' },
      { id: 'hist-24', date: '2026-01-25', title: 'Entrevista agendada', description: 'Entrevista virtual confirmada.', tone: 'neutral' },
    ],
  },
  {
    id: 'post-10',
    name: 'Gabriela Molina',
    email: 'gabriela.molina@uip.ac.pa',
    phone: '+507 6123-9988',
    avatarColor: '#10b981',
    type: 'Pasantía',
    university: universityById('uip'),
    career: 'Lic. en Administración de Empresas',
    semester: '6.º semestre',
    gpa: '3.7 / 4.0',
    location: 'Panamá, Panamá',
    birthDate: '2002-12-01',
    availability: 'Medio tiempo',
    vacante: 'Coordinadora de logística',
    area: 'Operaciones',
    club: clubById('sporting'),
    date: '2026-01-20',
    state: 'nuevo',
    coverLetter:
      'Organizada y orientada a la logística de eventos deportivos y operaciones de día a día.',
    skills: ['Logística', 'Excel', 'Coordinación de eventos'],
    documents: [
      { id: 'doc-22', name: 'Currículum Vitae', kind: 'cv', size: '195 KB', uploadedAt: '2026-01-15', verified: true },
      { id: 'doc-23', name: 'Carta de motivación', kind: 'carta', size: '84 KB', uploadedAt: '2026-01-18', verified: false },
    ],
    interviews: [],
    history: [
      { id: 'hist-25', date: '2026-01-20', title: 'Postulación recibida', description: 'Aplicó a la vacante Coordinadora de logística.', tone: 'neutral' },
      { id: 'hist-26', date: '2026-01-21', title: 'Perfil nuevo', description: 'Pendiente de revisión por el club.', tone: 'neutral' },
    ],
  },
]

const POSTULADOS_KPIS: LpfFuturoKpi[] = [
  { id: 'totales', label: 'Postulados totales', value: 342, tone: 'brand', delta: { direction: 'up', tone: 'emerald', label: '28%', caption: 'vs. 2025' } },
  { id: 'revision', label: 'En revisión', value: 78, tone: 'violet', delta: { direction: 'up', tone: 'emerald', label: '12%', caption: 'vs. 2025' } },
  { id: 'preseleccionados', label: 'Preseleccionados', value: 184, tone: 'indigo', delta: { direction: 'up', tone: 'emerald', label: '9%', caption: 'vs. 2025' } },
  { id: 'aceptados', label: 'Aceptados', value: 56, tone: 'emerald', delta: { direction: 'down', tone: 'rose', label: '4%', caption: 'vs. 2025' } },
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
  postuladosKpis: POSTULADOS_KPIS,
  postulados: POSTULADOS,
  postuladosPorClub: POSTULADOS_POR_CLUB,
  postuladosPorUniversidad: POSTULADOS_POR_UNIVERSIDAD,
  vacantesDestacadas: VACANTES_DESTACADAS,
  vacantes: VACANTES,
  vacantesTotal: VACANTES.length,
  universidadesActivas: UNIVERSIDADES_ACTIVAS,
  universidades: universities,
  universidadesKpis: UNIVERSIDADES_KPIS,
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

export const universidadesFilterOptions: LpfUniversidadesFilterOptions = {
  ciudades: [
    { id: 'todas', label: 'Todas' },
    ...[...new Set(universities.map((university) => university.ciudad).filter((ciudad): ciudad is string => Boolean(ciudad)))].map(
      (ciudad) => ({ id: ciudad, label: ciudad }),
    ),
  ],
  tipos: [
    { id: 'todas', label: 'Todas' },
    { id: 'Pública', label: 'Pública' },
    { id: 'Privada', label: 'Privada' },
    { id: 'Internacional', label: 'Internacional' },
  ],
  estados: [
    { id: 'todas', label: 'Todas' },
    { id: 'activa', label: 'Activa' },
    { id: 'inactiva', label: 'Inactiva' },
    { id: 'en-convenio', label: 'En convenio' },
  ],
}

export const postuladosFilterOptions: LpfPostuladosFilterOptions = {
  vacantes: [
    { id: 'todas', label: 'Todas' },
    { id: 'Analista de datos', label: 'Analista de datos' },
    { id: 'Análisis de rendimiento', label: 'Análisis de rendimiento' },
    { id: 'Marketing digital', label: 'Marketing digital' },
    { id: 'Diseño gráfico', label: 'Diseño gráfico' },
    { id: 'Redes sociales', label: 'Redes sociales' },
    { id: 'Fisioterapia deportiva', label: 'Fisioterapia deportiva' },
    { id: 'Nutrición deportiva', label: 'Nutrición deportiva' },
    { id: 'Videoanálisis', label: 'Videoanálisis' },
    { id: 'Asistente de prensa', label: 'Asistente de prensa' },
    { id: 'Coordinadora de logística', label: 'Coordinadora de logística' },
  ],
  universidades: [
    { id: 'todas', label: 'Todas' },
    ...universities.map((university) => ({ id: university.id, label: university.shortName })),
  ],
  clubes: [
    { id: 'todos', label: 'Todos' },
    ...clubs.map((club) => ({ id: club.id, label: club.name })),
  ],
  estados: [
    { id: 'todos', label: 'Todos' },
    { id: 'nuevo', label: 'Nuevo' },
    { id: 'en-revision', label: 'En revisión' },
    { id: 'preseleccionado', label: 'Preseleccionado' },
    { id: 'aceptado', label: 'Aceptado' },
    { id: 'rechazado', label: 'Rechazado' },
  ],
}


