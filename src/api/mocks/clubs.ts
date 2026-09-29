import type { Club } from '@/types'

export const clubs: Club[] = [
  { id: 'cai', name: 'CAI', shortName: 'CAI', primaryColor: '#D62727', secondaryColor: '#111827', crestUrl: '/images/crests/cai.png', fullName: 'Club Atlético Independiente' },
  { id: 'tauro', name: 'Tauro FC', shortName: 'TAU', primaryColor: '#111827', secondaryColor: '#D4AF37', crestUrl: '/images/crests/tauro.png', fullName: 'Tauro Fútbol Club' },
  { id: 'plaza', name: 'Plaza Amador', shortName: 'PLA', primaryColor: '#C8102E', secondaryColor: '#F8FAFC', crestUrl: '/images/crests/plaza.png', fullName: 'Club Deportivo Plaza Amador' },
  { id: 'sporting', name: 'Sporting SM', shortName: 'SSM', primaryColor: '#E4002B', secondaryColor: '#111827', crestUrl: '/images/crests/sporting.png', fullName: 'Sporting San Miguelito' },
  { id: 'herrera', name: 'Herrera FC', shortName: 'HER', primaryColor: '#FFC72C', secondaryColor: '#111827', crestUrl: '/images/crests/herrera.png', fullName: 'Herrera Fútbol Club' },
  { id: 'umecit', name: 'UMECIT', shortName: 'UME', primaryColor: '#1B7BF0', secondaryColor: '#F8FAFC', crestUrl: '/images/crests/umecit.png', fullName: 'UMECIT FC' },
  { id: 'sanfrancisco', name: 'San Francisco', shortName: 'SFF', primaryColor: '#B01E24', secondaryColor: '#111827', crestUrl: '/images/crests/sanfrancisco.png', fullName: 'San Francisco FC' },
  { id: 'veraguas', name: 'Veraguas United', shortName: 'VER', primaryColor: '#D71E28', secondaryColor: '#FFD100', crestUrl: '/images/crests/veraguas.png', fullName: 'Veraguas United FC' },
  { id: 'alianza', name: 'Alianza FC', shortName: 'ALI', primaryColor: '#16A34A', secondaryColor: '#F8FAFC', crestUrl: '/images/crests/alianza.png', fullName: 'Alianza Fútbol Club' },
  { id: 'potros', name: 'Potros del Este', shortName: 'POT', primaryColor: '#111827', secondaryColor: '#C8102E', crestUrl: '/images/crests/potros.png', fullName: 'Potros del Este FC' },
  { id: 'arabe', name: 'Árabe Unido', shortName: 'DAU', primaryColor: '#003DA5', secondaryColor: '#C8102E', crestUrl: '/images/crests/arabe.png', fullName: 'Club Deportivo Árabe Unido' },
  { id: 'universitario', name: 'CD Universitario', shortName: 'CDU', primaryColor: '#005BAC', secondaryColor: '#F8FAFC', crestUrl: '/images/crests/universitario.png', fullName: 'Club Deportivo Universitario' },
  { id: 'atletico-nacional', name: 'Atlético Nacional', shortName: 'ATN', primaryColor: '#0B5EAB', secondaryColor: '#F8FAFC', fullName: 'Atlético Nacional' },
]

export function clubById(id: string): Club {
  return clubs.find((club) => club.id === id) ?? clubs[0]
}
