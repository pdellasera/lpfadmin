import type { EligibilityAlert, EligibilityFilterOptions } from '@/types'
import { ELIGIBILITY_RULE_CODES, ELIGIBILITY_RULE_LABEL } from '@/lib/eligibility'
import { clubById, clubs } from './clubs'
import { players } from './players'
import { staff } from './staff'

const CANONICAL: EligibilityAlert[] = [
  { id: 'al-01', code: 'AL-2026-041', rule: 'acumulacion-amarillas', severity: 'critica', status: 'activa', targetType: 'jugador', subjectName: 'A. Cooper', position: 'MED', club: clubById('tauro'), matchLabel: 'Semifinal Vuelta · Tauro FC vs Árabe Unido', deadline: '2026-01-28', impact: 'Suspensión 1 partido', headline: 'Acumula 3 amarillas y queda fuera de la vuelta', explanation: 'Sumó su tercera amonestación del torneo en el partido de ida; según el reglamento debe cumplir una fecha de suspensión.', recommendation: 'Excluir de la convocatoria y marcar como no elegible en el acta digital.', source: 'automático', detectedAt: '2026-01-26' },
  { id: 'al-02', code: 'AL-2026-042', rule: 'roja-pendiente', severity: 'critica', status: 'activa', targetType: 'jugador', subjectName: 'Kevin Galván', position: 'MED', club: clubById('sanfrancisco'), matchLabel: 'J6 · San Francisco vs Veraguas United', deadline: '2026-01-28', impact: 'Suspensión 3 partidos', headline: 'Expulsión directa sin sanción cumplida', explanation: 'Fue expulsado con tarjeta roja directa y aún no cumple las tres fechas de suspensión dictadas.', recommendation: 'Verificar la resolución D-2026-021 y bloquear su alineación.', source: 'automático', detectedAt: '2026-01-26' },
  { id: 'al-03', code: 'AL-2026-043', rule: 'licencia-vencida', severity: 'advertencia', status: 'activa', targetType: 'cuerpo-tecnico', subjectName: 'D. Madariaga', role: 'DT', club: clubById('universitario'), deadline: '2026-01-27', impact: 'No podrá ejercer en la próxima jornada', headline: 'Licencia PRO vencida hace 5 días', explanation: 'La licencia del director técnico venció y no ha sido renovada ante la comisión de licencias.', recommendation: 'Solicitar la renovación de licencia de forma inmediata.', actionLabel: 'Notificar al club', source: 'automático', detectedAt: '2026-01-25' },
  { id: 'al-04', code: 'AL-2026-044', rule: 'minutos-promocion', severity: 'advertencia', status: 'activa', targetType: 'club', subjectName: 'Sporting SM', club: clubById('sporting'), deadline: '2026-01-31', impact: 'Riesgo de −3 pts', headline: 'Minutos de promoción: 1.140 / 1.200 acumulados', explanation: 'Acumula 1.140 de 1.200 minutos de jugadores nacidos en 2006 o después; si no completa el mínimo, aplica descuento de puntos.', recommendation: 'Alinear más jugadores sub-23 en las fechas restantes.', source: 'automático', detectedAt: '2026-01-25' },
  { id: 'al-05', code: 'AL-2026-045', rule: 'fifa-connect', severity: 'info', status: 'activa', targetType: 'club', subjectName: 'Herrera FC', club: clubById('herrera'), impact: 'Bloqueo de inscripción', headline: '12 registros FIFA Connect pendientes', explanation: 'Doce nuevos registros de jugadores están pendientes de validación antes del cierre del lunes a las 17:00.', recommendation: 'Validar los registros pendientes en FIFA Connect.', source: 'manual', detectedAt: '2026-01-24' },
  { id: 'al-06', code: 'AL-2026-046', rule: 'alineacion-indebida', severity: 'critica', status: 'activa', targetType: 'jugador', subjectName: 'Ricardo Phillips Jr.', position: 'DEL', club: clubById('sporting'), matchLabel: 'J5 · Sporting SM vs Herrera FC', deadline: '2026-01-25', impact: 'Posible pérdida de puntos', headline: 'Riesgo de alineación indebida detectado', explanation: 'El jugador figura en la planilla del partido sin estar habilitado en el sistema de licencias.', recommendation: 'Corregir la planilla y confirmar la elegibilidad antes del cierre.', source: 'en vivo', detectedAt: '2026-01-24' },
  { id: 'al-07', code: 'AL-2026-047', rule: 'fair-play', severity: 'info', status: 'activa', targetType: 'club', subjectName: 'Árabe Unido', club: clubById('arabe'), impact: 'Sin impacto directo', headline: 'Fair play en zona crítica', explanation: 'El club acumula 38 puntos de fair play y se acerca al límite que condiciona la clasificación.', recommendation: 'Mantener la disciplina en las próximas fechas.', source: 'automático', detectedAt: '2026-01-23' },
  { id: 'al-08', code: 'AL-2026-048', rule: 'acumulacion-amarillas', severity: 'advertencia', status: 'activa', targetType: 'jugador', subjectName: 'Carlos Pérez', position: 'DEF', club: clubById('herrera'), impact: 'A una tarjeta de la suspensión', headline: 'Acumula 2 amarillas', explanation: 'Suma dos amonestaciones; una más implica suspensión automática de una fecha.', recommendation: 'Tener en cuenta para la rotación de la próxima jornada.', source: 'automático', detectedAt: '2026-01-24' },
  { id: 'al-09', code: 'AL-2026-049', rule: 'roja-pendiente', severity: 'critica', status: 'en-revision', targetType: 'jugador', subjectName: 'Ernesto Sinclair', position: 'MED', club: clubById('sporting'), impact: 'Suspensión 4 partidos', headline: 'Sanción de 4 fechas en revisión', explanation: 'La sanción de cuatro partidos por agresión está siendo revisada tras la apelación del club.', recommendation: 'Esperar la resolución del tribunal antes de habilitarlo.', source: 'manual', detectedAt: '2026-01-23' },
  { id: 'al-10', code: 'AL-2026-050', rule: 'licencia-vencida', severity: 'advertencia', status: 'en-revision', targetType: 'cuerpo-tecnico', subjectName: 'R. Arosemena', role: 'PF', club: clubById('herrera'), impact: 'Sin efecto en la próxima fecha', headline: 'Licencia B por vencer en 3 días', explanation: 'La licencia del preparador físico vence en tres días.', recommendation: 'Iniciar el trámite de renovación.', actionLabel: 'Notificar al club', source: 'automático', detectedAt: '2026-01-24' },
  { id: 'al-11', code: 'AL-2026-051', rule: 'fifa-connect', severity: 'info', status: 'resuelta', targetType: 'jugador', subjectName: 'Gabriel Torres', position: 'DEL', club: clubById('arabe'), impact: 'Inscripción validada', headline: 'Registro FIFA Connect completado', explanation: 'El registro del jugador fue validado y quedó habilitado para competir.', recommendation: '—', source: 'manual', detectedAt: '2026-01-22' },
  { id: 'al-12', code: 'AL-2026-052', rule: 'minutos-promocion', severity: 'advertencia', status: 'resuelta', targetType: 'club', subjectName: 'Veraguas United', club: clubById('veraguas'), impact: 'Mínimo cumplido', headline: 'Mínimo de minutos completado', explanation: 'El club alcanzó los 1.200 minutos requeridos de jugadores sub-23.', recommendation: '—', source: 'automático', detectedAt: '2026-01-21' },
  { id: 'al-13', code: 'AL-2026-053', rule: 'acumulacion-amarillas', severity: 'advertencia', status: 'resuelta', targetType: 'jugador', subjectName: 'Luis Rodríguez', position: 'DEF', club: clubById('universitario'), impact: 'Suspensión cumplida', headline: 'Suspensión por acumulación cumplida', explanation: 'Cumplió la fecha de suspensión y queda habilitado.', recommendation: '—', source: 'automático', detectedAt: '2026-01-20' },
  { id: 'al-14', code: 'AL-2026-054', rule: 'licencia-vencida', severity: 'advertencia', status: 'descartada', targetType: 'cuerpo-tecnico', subjectName: 'J. Navarro', role: 'AT', club: clubById('tauro'), impact: 'Falso positivo corregido', headline: 'Alerta de licencia descartada', explanation: 'La licencia estaba renovada; la alerta se generó por un retraso de sincronización.', recommendation: '—', source: 'automático', detectedAt: '2026-01-19' },
]

function buildGenerated(): EligibilityAlert[] {
  const result: EligibilityAlert[] = []
  let counter = 100

  players
    .filter((player) => player.redCards > 0)
    .slice(0, 3)
    .forEach((player) => {
      counter += 1
      result.push({
        id: `al-${counter}`,
        code: `AL-2026-${counter}`,
        rule: 'roja-pendiente',
        severity: 'critica',
        status: 'activa',
        targetType: 'jugador',
        subjectName: player.name,
        position: player.position,
        club: player.club,
        impact: 'Suspensión pendiente',
        headline: 'Expulsión registrada sin sanción cumplida',
        explanation: 'El jugador registra una expulsión directa y aún no cumple la sanción correspondiente.',
        recommendation: 'Bloquear su alineación hasta confirmar el cumplimiento.',
        source: 'automático',
        detectedAt: '2026-01-23',
      })
    })

  players
    .filter((player) => player.redCards === 0 && player.yellowCards >= 2)
    .slice(0, 3)
    .forEach((player) => {
      counter += 1
      result.push({
        id: `al-${counter}`,
        code: `AL-2026-${counter}`,
        rule: 'acumulacion-amarillas',
        severity: 'advertencia',
        status: 'activa',
        targetType: 'jugador',
        subjectName: player.name,
        position: player.position,
        club: player.club,
        impact: 'A una tarjeta de la suspensión',
        headline: 'Acumulación de amonestaciones',
        explanation: 'El jugador está a una tarjeta amarilla de cumplir suspensión por acumulación.',
        recommendation: 'Considerar la rotación en la próxima jornada.',
        source: 'automático',
        detectedAt: '2026-01-23',
      })
    })

  staff
    .filter((member) => member.role === 'DT' || member.role === 'AT')
    .slice(0, 2)
    .forEach((member) => {
      counter += 1
      result.push({
        id: `al-${counter}`,
        code: `AL-2026-${counter}`,
        rule: 'licencia-vencida',
        severity: 'advertencia',
        status: 'activa',
        targetType: 'cuerpo-tecnico',
        subjectName: member.name,
        role: member.role,
        club: member.club,
        impact: 'No podrá ejercer en la próxima jornada',
        headline: 'Licencia del cuerpo técnico por vencer',
        explanation: 'La licencia del integrante del cuerpo técnico vence antes de la próxima fecha.',
        recommendation: 'Gestionar la renovación de la licencia.',
        actionLabel: 'Notificar al club',
        source: 'automático',
        detectedAt: '2026-01-22',
      })
    })

  clubs.slice(0, 2).forEach((club) => {
    counter += 1
    result.push({
      id: `al-${counter}`,
      code: `AL-2026-${counter}`,
      rule: 'fifa-connect',
      severity: 'info',
      status: 'activa',
      targetType: 'club',
      subjectName: club.name,
      club,
      impact: 'Registros pendientes',
      headline: 'Registros FIFA Connect por validar',
      explanation: 'El club tiene registros de jugadores pendientes de validación en FIFA Connect.',
      recommendation: 'Completar la validación antes del cierre semanal.',
      source: 'manual',
      detectedAt: '2026-01-22',
    })
  })

  return result
}

export const eligibilityAlerts: EligibilityAlert[] = [...CANONICAL, ...buildGenerated()]

export const eligibilityFilterOptions: EligibilityFilterOptions = {
  rules: [
    { id: 'todas', label: 'Todas' },
    ...ELIGIBILITY_RULE_CODES.map((rule) => ({ id: rule, label: ELIGIBILITY_RULE_LABEL[rule] })),
  ],
  clubs: [{ id: 'todos', label: 'Todos' }, ...clubs.map((club) => ({ id: club.id, label: club.name }))],
  statuses: [
    { id: 'todos', label: 'Todos' },
    { id: 'activa', label: 'Activa' },
    { id: 'en-revision', label: 'En revisión' },
    { id: 'resuelta', label: 'Resuelta' },
    { id: 'descartada', label: 'Descartada' },
  ],
}
