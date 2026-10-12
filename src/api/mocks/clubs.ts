import type { Club } from '@/types'

export const clubs: Club[] = [
  { id: 'arabe', name: 'Árabe Unido', shortName: 'DAU', primaryColor: '#003DA5', secondaryColor: '#C8102E', crestUrl: '/images/crests/arabe-unido.webp', fullName: 'Club Deportivo Árabe Unido' },
  { id: 'herrera', name: 'Herrera FC', shortName: 'HER', primaryColor: '#FFC72C', secondaryColor: '#111827', crestUrl: '/images/crests/HerreraFC.png', fullName: 'Herrera Fútbol Club' },
  { id: 'sanfrancisco', name: 'San Francisco', shortName: 'SFF', primaryColor: '#B01E24', secondaryColor: '#111827', crestUrl: '/images/crests/sanfrancisco.png', fullName: 'San Francisco FC' },
  { id: 'sporting', name: 'Sporting SM', shortName: 'SSM', primaryColor: '#E4002B', secondaryColor: '#111827', crestUrl: '/images/crests/SportingSM.png', fullName: 'Sporting San Miguelito' },
  { id: 'tauro', name: 'Tauro FC', shortName: 'TAU', primaryColor: '#111827', secondaryColor: '#D4AF37', crestUrl: '/images/crests/tauro.png', fullName: 'Tauro Fútbol Club' },
  { id: 'universitario', name: 'CD Universitario', shortName: 'CDU', primaryColor: '#005BAC', secondaryColor: '#F8FAFC', crestUrl: '/images/crests/CDU.png', fullName: 'Club Deportivo Universitario' },
  { id: 'veraguas', name: 'Veraguas United', shortName: 'VER', primaryColor: '#D71E28', secondaryColor: '#FFD100', crestUrl: '/images/crests/VeraguasUD.png', fullName: 'Veraguas United FC' },
  { id: 'cai', name: 'CAI', shortName: 'CAI', primaryColor: '#1e3a8a', secondaryColor: '#fbbf24', crestUrl: '/images/crests/cai.png', fullName: 'Club Atlético Independiente' },
  { id: 'plaza-amador', name: 'Plaza Amador', shortName: 'PLA', primaryColor: '#1d4ed8', secondaryColor: '#f8fafc', crestUrl: '/images/crests/plaza-amador.png', fullName: 'Club Deportivo Plaza Amador' },
]

export function clubById(id: string): Club {
  return clubs.find((club) => club.id === id) ?? clubs[0]
}
