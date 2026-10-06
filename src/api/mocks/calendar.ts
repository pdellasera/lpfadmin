import type { CalendarFixture } from '@/types'
import { clubById } from './clubs'

/** Día de referencia "hoy" para el resaltado del calendario. */
export const referenceToday = '2026-05-18'

/** Mes inicial del calendario (mayo 2026). */
export const referenceMonth = new Date(2026, 4, 1)

const c = (id: string) => clubById(id)

export const calendarFixtures: CalendarFixture[] = [
  {
    id: 'cal-05',
    date: '2026-05-05',
    phase: 'finalizado',
    category: 'LPF',
    homeClub: c('herrera'),
    awayClub: c('tauro'),
  },
  {
    id: 'cal-06',
    date: '2026-05-06',
    phase: 'finalizado',
    category: 'LPF',
    homeClub: c('sporting'),
    awayClub: c('universitario'),
  },
  {
    id: 'cal-09',
    date: '2026-05-09',
    phase: 'finalizado',
    category: 'LPF',
    homeClub: c('veraguas'),
    awayClub: c('herrera'),
  },
  {
    id: 'cal-15',
    date: '2026-05-15',
    time: '20:30',
    phase: 'proximo',
    category: 'LPF',
    stadium: 'Estadio Universidad Latina',
    referee: 'J. Pinzón',
    homeClub: c('universitario'),
    awayClub: c('arabe'),
  },
  {
    id: 'cal-16',
    date: '2026-05-16',
    time: '20:30',
    phase: 'proximo',
    category: 'LPF',
    stadium: 'Estadio Aristocles Castillo',
    referee: 'A. Escobar',
    homeClub: c('herrera'),
    awayClub: c('veraguas'),
  },
  {
    id: 'cal-18a',
    date: '2026-05-18',
    phase: 'en-vivo',
    category: 'LPF',
    homeClub: c('arabe'),
    awayClub: c('universitario'),
  },
  {
    id: 'cal-18b',
    date: '2026-05-18',
    phase: 'en-vivo',
    category: 'LPF',
    homeClub: c('tauro'),
    awayClub: c('sanfrancisco'),
  },
  {
    id: 'cal-23',
    date: '2026-05-23',
    time: '19:00',
    phase: 'proximo',
    category: 'LPF',
    stadium: 'Por designar',
    referee: 'Por designar',
    label: 'Final ida',
    note: 'ganadores semifinales',
  },
  {
    id: 'cal-24',
    date: '2026-05-24',
    time: '19:00',
    phase: 'proximo',
    category: 'LPF',
    stadium: 'Por designar',
    referee: 'Por designar',
    label: 'Final vuelta',
    note: 'ganadores semifinales',
  },
]
