import type {
  EligibilityRuleCode,
  EligibilitySeverity,
  EligibilityStatus,
  EligibilityTargetType,
  PlayerPosition,
  StaffRoleCode,
} from '@/types'

export const ELIGIBILITY_SEVERITY_LABEL: Record<EligibilitySeverity, string> = {
  critica: 'Crítica',
  advertencia: 'Advertencia',
  info: 'Informativa',
}

export const ELIGIBILITY_SEVERITY_ORDER: Record<EligibilitySeverity, number> = {
  critica: 0,
  advertencia: 1,
  info: 2,
}

export const ELIGIBILITY_RULE_LABEL: Record<EligibilityRuleCode, string> = {
  'acumulacion-amarillas': 'Acumulación de amarillas',
  'roja-pendiente': 'Expulsión sin cumplir',
  'licencia-vencida': 'Licencia vencida',
  'minutos-promocion': 'Minutos de promoción',
  'fifa-connect': 'Registro FIFA Connect',
  'alineacion-indebida': 'Alineación indebida',
  'fair-play': 'Fair play',
}

export const ELIGIBILITY_RULE_CODES: EligibilityRuleCode[] = [
  'acumulacion-amarillas',
  'roja-pendiente',
  'licencia-vencida',
  'minutos-promocion',
  'fifa-connect',
  'alineacion-indebida',
  'fair-play',
]

export const ELIGIBILITY_RULE_SOURCE: Record<EligibilityRuleCode, 'automático' | 'manual'> = {
  'acumulacion-amarillas': 'automático',
  'roja-pendiente': 'automático',
  'licencia-vencida': 'automático',
  'minutos-promocion': 'automático',
  'fifa-connect': 'manual',
  'alineacion-indebida': 'automático',
  'fair-play': 'automático',
}

export const ELIGIBILITY_STATUS_LABEL: Record<EligibilityStatus, string> = {
  activa: 'Activa',
  'en-revision': 'En revisión',
  resuelta: 'Resuelta',
  descartada: 'Descartada',
}

export const ELIGIBILITY_TARGET_LABEL: Record<EligibilityTargetType, string> = {
  jugador: 'Jugador',
  'cuerpo-tecnico': 'Cuerpo técnico',
  club: 'Club',
}

export const ELIGIBILITY_POSITION_LABEL: Record<PlayerPosition, string> = {
  POR: 'Portero',
  DEF: 'Defensa',
  MED: 'Mediocampista',
  DEL: 'Delantero',
}

export const ELIGIBILITY_ROLE_LABEL: Record<StaffRoleCode, string> = {
  DT: 'Director técnico',
  AT: 'Asistente técnico',
  PF: 'Preparador físico',
  EP: 'Entrenador de porteros',
  AN: 'Analista',
  MED: 'Médico',
  FIS: 'Fisioterapeuta',
  NUT: 'Nutricionista',
  DEL: 'Delegado',
  UTI: 'Utilero',
}
