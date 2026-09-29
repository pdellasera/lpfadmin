import type { Scorer } from '@/types'
import { clubById } from './clubs'

export const scorers: Scorer[] = [
  { id: 's1', name: 'Ismael Díaz', club: clubById('cai'), goals: 8 },
  { id: 's2', name: 'Ricardo Buitrago', club: clubById('tauro'), goals: 6, photoUrl: '/images/players/ricardo-buitrago.jpg' },
  { id: 's3', name: 'Abdiel Ayarza', club: clubById('plaza'), goals: 5, photoUrl: '/images/players/abdiel-ayarza.jpg' },
  { id: 's4', name: 'Ernesto Walker', club: clubById('sporting'), goals: 4 },
  { id: 's5', name: 'José Fajardo', club: clubById('cai'), goals: 4, photoUrl: '/images/players/jose-fajardo.jpg' },
]
