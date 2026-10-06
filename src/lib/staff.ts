import type { StaffRoleCode, StaffRoleGroupId } from '@/types'

export const STAFF_ROLE_LABEL: Record<StaffRoleCode, string> = {
  DT: 'Director Técnico',
  AT: 'Asistente Técnico',
  PF: 'Preparador Físico',
  EP: 'Entrenador de Porteros',
  AN: 'Analista',
  MED: 'Médico',
  FIS: 'Fisioterapeuta',
  NUT: 'Nutricionista',
  DEL: 'Delegado',
  UTI: 'Utilero',
}

export const STAFF_ROLE_GROUP: Record<StaffRoleCode, StaffRoleGroupId> = {
  DT: 'tecnico',
  AT: 'tecnico',
  PF: 'tecnico',
  EP: 'tecnico',
  AN: 'tecnico',
  MED: 'medico',
  FIS: 'medico',
  NUT: 'medico',
  DEL: 'administrativo',
  UTI: 'administrativo',
}
