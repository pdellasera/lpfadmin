import type { StadiumRegionId, StadiumStatus, StadiumSurface } from '@/types'

export const STADIUM_SURFACE_LABEL: Record<StadiumSurface, string> = {
  natural: 'Césped natural',
  sintetico: 'Césped sintético',
  hibrido: 'Césped híbrido',
}

export const STADIUM_STATUS_LABEL: Record<StadiumStatus, string> = {
  operativo: 'Operativo',
  mantenimiento: 'Mantenimiento',
  clausurado: 'Clausurado',
}

export type StadiumRegion = Exclude<StadiumRegionId, 'todos'>

export const STADIUM_REGION_LABEL: Record<StadiumRegion, string> = {
  capital: 'Ciudad de Panamá',
  occidente: 'Occidente',
  azuero: 'Azuero',
  oriente: 'Oriente',
}

export const STADIUM_PROVINCE_REGION: Record<string, StadiumRegion> = {
  Panamá: 'capital',
  'Panamá Oeste': 'capital',
  Colón: 'oriente',
  Chiriquí: 'occidente',
  Veraguas: 'occidente',
  'Bocas del Toro': 'occidente',
  'Ngäbe-Buglé': 'occidente',
  Herrera: 'azuero',
  'Los Santos': 'azuero',
  Coclé: 'azuero',
  Darién: 'oriente',
  'Panamá Este': 'oriente',
}
