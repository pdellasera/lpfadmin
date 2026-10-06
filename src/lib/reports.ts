import type { ReportCategoryId, ReportFormat, ReportStatus } from '@/types'

export const REPORT_CATEGORY_LABEL: Record<ReportCategoryId, string> = {
  jornada: 'Reportes de jornada',
  competicion: 'Reportes de competición',
  disciplinarios: 'Reportes disciplinarios',
  administrativos: 'Reportes administrativos',
}

export const REPORT_FORMAT_LABEL: Record<ReportFormat, string> = {
  pdf: 'PDF',
  xlsx: 'Excel',
  csv: 'CSV',
}

export const REPORT_STATUS_LABEL: Record<ReportStatus, string> = {
  actualizado: 'Actualizado',
  programado: 'Programado',
  obsoleto: 'Obsoleto',
}