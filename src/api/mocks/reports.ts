import type { ReportsCatalog } from '@/types'

export const reportsCatalog: ReportsCatalog = {
  season: '2026',
  groups: [
    {
      id: 'jornada',
      label: 'Reportes de jornada',
      items: [
        {
          id: 'resumen-jornada',
          category: 'jornada',
          title: 'Resumen de jornada',
          description:
            'Resultados, goleadores, asistencias, amonestaciones y expulsiones de la jornada seleccionada.',
          formats: ['pdf', 'xlsx', 'csv'],
          updatedAt: '2026-01-26',
          records: 12,
          status: 'actualizado',
          href: '/panel/reportes/resumen-jornada',
        },
        {
          id: 'acta-arbitral',
          category: 'jornada',
          title: 'Acta arbitral consolidada',
          description:
            'Compilación de actas firmadas digitalmente por los árbitros, lista para archivo o auditoría.',
          formats: ['pdf'],
          updatedAt: '2026-01-25',
          records: 96,
          status: 'actualizado',
        },
        {
          id: 'comunicado-prensa',
          category: 'jornada',
          title: 'Comunicado de prensa',
          description:
            'Plantilla con resultados, posiciones, MVP y próximos partidos lista para envío a medios.',
          formats: ['pdf'],
          updatedAt: '2026-01-24',
          records: 1,
          status: 'programado',
        },
      ],
    },
    {
      id: 'competicion',
      label: 'Reportes de competición',
      items: [
        {
          id: 'tabla-posiciones',
          category: 'competicion',
          title: 'Tabla de posiciones',
          description:
            'Tabla actualizada de ambas conferencias con goles a favor, en contra, diferencia y puntos.',
          formats: ['pdf', 'xlsx', 'csv'],
          updatedAt: '2026-01-26',
          records: 12,
          status: 'actualizado',
        },
        {
          id: 'estadisticas-individuales',
          category: 'competicion',
          title: 'Estadísticas individuales',
          description:
            'Goleadores, asistentes, líderes de amarillas, vallas menos vencidas, MVPs por jornada.',
          formats: ['pdf', 'xlsx', 'csv'],
          updatedAt: '2026-01-25',
          records: 180,
          status: 'actualizado',
        },
        {
          id: 'minutos-promocion',
          category: 'competicion',
          title: 'Minutos de promoción',
          description:
            'Reporte por club del cumplimiento del Art. 6 Anexo II — Mínimo 1,200 min de jugadores 2006+.',
          formats: ['pdf', 'xlsx'],
          updatedAt: '2026-01-24',
          records: 42,
          status: 'actualizado',
        },
        {
          id: 'cupo-extranjeros',
          category: 'competicion',
          title: 'Cupo de extranjeros',
          description:
            'Conteo de jugadores extranjeros por club entre LPF y PROM, validación de Art. 7 Anexo II.',
          formats: ['pdf', 'xlsx'],
          updatedAt: '2026-01-23',
          records: 14,
          status: 'actualizado',
        },
      ],
    },
    {
      id: 'disciplinarios',
      label: 'Reportes disciplinarios',
      items: [
        {
          id: 'sanciones-torneo',
          category: 'disciplinarios',
          title: 'Sanciones del torneo',
          description:
            'Listado completo de sanciones aplicadas durante el torneo con motivo, regla y duración.',
          formats: ['pdf', 'xlsx', 'csv'],
          updatedAt: '2026-01-26',
          records: 48,
          status: 'actualizado',
        },
        {
          id: 'historico-jugador',
          category: 'disciplinarios',
          title: 'Histórico por jugador',
          description:
            'Trayectoria disciplinaria individual: amarillas, rojas, suspensiones, multas, resoluciones.',
          formats: ['pdf'],
          updatedAt: '2026-01-22',
          records: 120,
          status: 'actualizado',
        },
        {
          id: 'tendencias-arbitrales',
          category: 'disciplinarios',
          title: 'Tendencias arbitrales',
          description:
            'Distribución de tarjetas por árbitro, club y minuto. Útil para detectar patrones inusuales.',
          formats: ['pdf', 'xlsx'],
          updatedAt: '2026-01-20',
          records: 24,
          status: 'programado',
        },
      ],
    },
    {
      id: 'administrativos',
      label: 'Reportes administrativos',
      items: [
        {
          id: 'registro-jugadores',
          category: 'administrativos',
          title: 'Registro de jugadores',
          description:
            'Listado completo por club con FIFA Connect ID, edad, posición, nacionalidad, estado contractual.',
          formats: ['pdf', 'xlsx', 'csv'],
          updatedAt: '2026-01-26',
          records: 482,
          status: 'actualizado',
        },
        {
          id: 'licencias-tecnicas',
          category: 'administrativos',
          title: 'Licencias técnicas',
          description:
            'Status de licencias de cuerpos técnicos: vigentes, por vencer en 30 días, vencidas.',
          formats: ['pdf', 'xlsx'],
          updatedAt: '2026-01-21',
          records: 32,
          status: 'actualizado',
        },
        {
          id: 'inspeccion-estadios',
          category: 'administrativos',
          title: 'Inspección de estadios',
          description:
            'Estado de inspecciones de sedes conforme Art. 79 del Reglamento de Competencia.',
          formats: ['pdf'],
          updatedAt: '2026-01-18',
          records: 15,
          status: 'actualizado',
        },
      ],
    },
  ],
  total: 13,
}