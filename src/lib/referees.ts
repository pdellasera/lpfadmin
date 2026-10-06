import type { RefereeCategory, RefereeRoleCode, RefereeRoleGroupId, RefereeStatus } from '@/types'

export const REFEREE_ROLE_LABEL: Record<RefereeRoleCode, string> = {
  CEN: 'Árbitro central',
  AR1: 'Asistente 1',
  AR2: 'Asistente 2',
  CU4: 'Cuarto árbitro',
  VAR: 'Árbitro VAR',
  AVAR: 'AVAR',
  ASE: 'Asesor',
  COM: 'Comisario',
}

export const REFEREE_ROLE_GROUP: Record<RefereeRoleCode, RefereeRoleGroupId> = {
  CEN: 'centrales',
  AR1: 'asistentes',
  AR2: 'asistentes',
  CU4: 'asistentes',
  VAR: 'var',
  AVAR: 'var',
  ASE: 'comisarios',
  COM: 'comisarios',
}

export const REFEREE_CATEGORY_LABEL: Record<RefereeCategory, string> = {
  FIFA: 'FIFA',
  Nacional: 'Nacional',
  Regional: 'Regional',
}

export const REFEREE_STATUS_LABEL: Record<RefereeStatus, string> = {
  disponible: 'Disponible',
  lesionado: 'Lesionado',
  suspendido: 'Suspendido',
  inactivo: 'Inactivo',
}
