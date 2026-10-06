import type { SanctionGroupId, SanctionInfractionCode, SanctionStatus, SanctionTargetType } from '@/types'

export const SANCTION_TARGET_LABEL: Record<SanctionTargetType, string> = {
  jugador: 'Jugador',
  'cuerpo-tecnico': 'Cuerpo técnico',
  club: 'Club',
}

export const SANCTION_GROUP: Record<SanctionTargetType, SanctionGroupId> = {
  jugador: 'jugadores',
  'cuerpo-tecnico': 'cuerpo-tecnico',
  club: 'clubes',
}

export const SANCTION_INFRACTION_LABEL: Record<SanctionInfractionCode, string> = {
  'roja-directa': 'Roja directa',
  'doble-amarilla': 'Doble amarilla',
  'acumulacion-amarillas': 'Acumulación de amarillas',
  conducta: 'Conducta antideportiva',
  agresion: 'Agresión',
  retraso: 'Retraso',
  incomparecencia: 'Incomparecencia',
  otros: 'Otros',
}

export const SANCTION_STATUS_LABEL: Record<SanctionStatus, string> = {
  pendiente: 'Pendiente',
  cumplida: 'Cumplida',
  apelada: 'Apelada',
  reducida: 'Reducida',
  anulada: 'Anulada',
}
