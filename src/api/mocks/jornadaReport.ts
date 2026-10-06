import type { JornadaReport, JornadaStandingRow } from '@/types'

// Datos deterministas extraídos del reporte oficial
// "Reporte de Estadísticas LPF — Torneo Clausura 2026 — Jornada #16".

function standing(
  position: number,
  club: string,
  points: number,
  played: number,
  won: number,
  drawn: number,
  lost: number,
  goalsFor: number,
  goalsAgainst: number,
  renderPct: string,
  promGf: string,
  promGc: string,
  ppj: string,
): JornadaStandingRow {
  return { position, club, points, played, won, drawn, lost, goalsFor, goalsAgainst, renderPct, promGf, promGc, ppj }
}

export function buildJornadaReport(season: string): JornadaReport {
  return {
    season,
    league: 'LIGA PANAMEÑA DE FÚTBOL',
    tournament: `TORNEO CLAUSURA ${season}`,
    round: 'JORNADA # 16',

    conferences: [
      {
        label: 'CONFERENCIA ESTE',
        rows: [
          standing(1, 'PLA', 31, 16, 9, 4, 3, 28, 16, '64.6%', '1.8', '1.0', '1.9'),
          standing(2, 'ALI', 27, 16, 6, 9, 1, 26, 20, '56.3%', '1.6', '1.3', '1.7'),
          standing(3, 'UME', 25, 16, 6, 7, 3, 28, 20, '52.1%', '1.8', '1.3', '1.6'),
          standing(4, 'TAU', 21, 16, 5, 6, 5, 22, 19, '43.8%', '1.4', '1.2', '1.3'),
          standing(5, 'DAU', 21, 16, 6, 3, 7, 16, 20, '43.8%', '1.0', '1.3', '1.3'),
          standing(6, 'SSM', 18, 16, 4, 6, 6, 19, 21, '37.5%', '1.2', '1.3', '1.1'),
        ],
      },
      {
        label: 'CONFERENCIA OESTE',
        rows: [
          standing(1, 'VER', 25, 16, 7, 4, 5, 26, 23, '52.1%', '1.6', '1.4', '1.6'),
          standing(2, 'COC', 23, 16, 5, 8, 3, 16, 11, '47.9%', '1.0', '0.7', '1.4'),
          standing(3, 'CAI', 20, 16, 4, 8, 4, 18, 14, '41.7%', '1.1', '0.9', '1.3'),
          standing(4, 'SFC', 20, 16, 5, 5, 6, 22, 25, '41.7%', '1.4', '1.6', '1.3'),
          standing(5, 'CDU', 14, 16, 3, 5, 8, 19, 27, '29.2%', '1.2', '1.7', '0.9'),
          standing(6, 'HER', 8, 16, 1, 5, 10, 13, 37, '16.7%', '0.8', '2.3', '0.5'),
        ],
      },
    ],

    acumulada: [
      standing(1, 'PLA', 67, 32, 20, 7, 5, 65, 33, '69.8%', '2.0', '1.0', '2.1'),
      standing(2, 'ALI', 55, 32, 14, 13, 5, 51, 39, '57.3%', '1.6', '1.2', '1.7'),
      standing(3, 'UME', 48, 32, 12, 12, 8, 44, 38, '50.0%', '1.4', '1.2', '1.5'),
      standing(4, 'SFC', 45, 32, 11, 12, 9, 43, 41, '46.9%', '1.3', '1.3', '1.4'),
      standing(5, 'DAU', 45, 32, 12, 9, 11, 34, 33, '46.9%', '1.1', '1.0', '1.4'),
      standing(6, 'CAI', 43, 32, 10, 13, 9, 42, 31, '44.8%', '1.3', '1.0', '1.3'),
      standing(7, 'SSM', 43, 32, 10, 13, 9, 36, 33, '44.8%', '1.1', '1.0', '1.3'),
      standing(8, 'VER', 43, 32, 12, 7, 13, 45, 48, '44.8%', '1.4', '1.5', '1.3'),
      standing(9, 'CDU', 35, 32, 8, 11, 13, 35, 43, '36.5%', '1.1', '1.3', '1.1'),
      standing(10, 'TAU', 34, 32, 8, 10, 14, 39, 47, '35.4%', '1.2', '1.5', '1.1'),
      standing(11, 'COC', 23, 16, 5, 8, 3, 16, 11, '47.9%', '1.0', '0.7', '1.4'),
      standing(12, 'NAC', 17, 16, 4, 5, 7, 22, 31, '35.4%', '1.4', '1.9', '1.1'),
      standing(13, 'HER', 14, 32, 2, 8, 22, 22, 66, '14.6%', '0.7', '2.1', '0.4'),
    ],

    panels: [
      { key: 'PAN 1', title: 'CAMPEÓN DEL TORNEO CLAUSURA 2025' },
      { key: 'PAN 2', title: 'CAMPEÓN DEL TORNEO CLAUSURA 2026' },
      { key: 'PAN 3', title: 'MAYOR CANTIDAD DE PUNTOS EN TABLA ACUMULADA' },
    ],
    concacafNote: ['ARTÍCULO 15 - ANEXO II REGLAMENTO DE COMPETENCIAS', 'CLASIFICACIÓN A TORNEOS CONCACAF'],

    roundTable: [
      { position: 1, club: 'PLA', played: 32, won: 20, drawn: 7, lost: 5, goalsFor: 65, goalsAgainst: 33, points: 67 },
      { position: 2, club: 'ALI', played: 32, won: 14, drawn: 13, lost: 5, goalsFor: 51, goalsAgainst: 39, points: 55 },
      { position: 3, club: 'UME', played: 32, won: 12, drawn: 12, lost: 8, goalsFor: 44, goalsAgainst: 38, points: 48 },
      { position: 4, club: 'SFC', played: 32, won: 11, drawn: 12, lost: 9, goalsFor: 43, goalsAgainst: 41, points: 45 },
      { position: 5, club: 'DAU', played: 32, won: 12, drawn: 9, lost: 11, goalsFor: 34, goalsAgainst: 33, points: 45 },
      { position: 6, club: 'CAI', played: 32, won: 10, drawn: 13, lost: 9, goalsFor: 42, goalsAgainst: 31, points: 43 },
      { position: 7, club: 'SSM', played: 32, won: 10, drawn: 13, lost: 9, goalsFor: 36, goalsAgainst: 33, points: 43 },
      { position: 8, club: 'VER', played: 32, won: 12, drawn: 7, lost: 13, goalsFor: 45, goalsAgainst: 48, points: 43 },
      { position: 9, club: 'CDU', played: 32, won: 8, drawn: 11, lost: 13, goalsFor: 35, goalsAgainst: 43, points: 35 },
      { position: 10, club: 'TAU', played: 32, won: 8, drawn: 10, lost: 14, goalsFor: 39, goalsAgainst: 47, points: 34 },
      { position: 11, club: 'COC', played: 16, won: 5, drawn: 8, lost: 3, goalsFor: 16, goalsAgainst: 11, points: 23 },
      { position: 12, club: 'NAC', played: 16, won: 4, drawn: 5, lost: 7, goalsFor: 22, goalsAgainst: 31, points: 17 },
      { position: 13, club: 'HER', played: 32, won: 2, drawn: 8, lost: 22, goalsFor: 22, goalsAgainst: 66, points: 14 },
    ],

    phaseScores: [
      { phase: 'PO', scores: ['3 - 3', '1 - 1'] },
      { phase: 'SI', scores: ['0 - 0', '2 - 2'] },
      { phase: 'SV', scores: ['3 - 0', '2 - 2'] },
    ],
    playoffs: [
      { date: '05-may-26', phase: 'PO', home: 'ALI', homeGoals: 3, awayGoals: 3, away: 'CAI', stadium: 'ESTADIO ROMEL FERNANDEZ' },
      { date: '06-may-26', phase: 'PO', home: 'COC', homeGoals: 1, awayGoals: 1, away: 'UME', stadium: 'ESTADIO VIRGILIO TEJEIRA' },
      { date: '09-may-26', phase: 'SI', home: 'ALI', homeGoals: 0, awayGoals: 0, away: 'VER', stadium: 'ROMMEL FERNANDEZ G.' },
      { date: '10-may-26', phase: 'SI', home: 'UME', homeGoals: 2, awayGoals: 2, away: 'PLA', stadium: 'AGUSTIN MUQUITA SANCHEZ' },
      { date: '15-may-26', phase: 'SV', home: 'PLA', homeGoals: 3, awayGoals: 0, away: 'UME', stadium: 'COS SPORT PLAZA' },
      { date: '16-may-26', phase: 'SV', home: 'VER', homeGoals: 2, awayGoals: 2, away: 'ALI', stadium: 'TOCO CASTILLO' },
    ],

    scorers: [
      { position: 1, player: 'HEUYIN GUARDIA', number: 7, club: 'ALI', goals: 9 },
      { position: 2, player: 'JOSE MURILLO', number: 20, club: 'PLA', goals: 8 },
      { position: 3, player: 'OSCAR BECERRA', number: 29, club: 'UME', goals: 7 },
      { position: 4, player: 'GABRIEL TORRES', number: 9, club: 'VER', goals: 7 },
      { position: 5, player: 'RONALDO DINOLIS', number: 9, club: 'SFC', goals: 7 },
      { position: 6, player: 'SAED DIAZ', number: 18, club: 'TAU', goals: 6 },
      { position: 7, player: '', number: 16, club: 'CAI', goals: 6 },
      { position: 8, player: 'ANDRICK EDWARDS', number: 17, club: 'UME', goals: 5 },
      { position: 9, player: 'ERICK RODRIGUEZ', number: 11, club: 'UME', goals: 5 },
      { position: 10, player: 'JOHNJAIRO ALVARADO', number: 28, club: 'ALI', goals: 5 },
      { position: 11, player: 'ALESSANDRO CANALES', number: 99, club: 'DAU', goals: 5 },
      { position: 12, player: 'DAVIS CONTRERAS', number: 25, club: 'CAI', goals: 5 },
      { position: 13, player: 'NEDWAR ZUNIGA', number: 15, club: 'VER', goals: 4 },
      { position: 14, player: 'MARIO CARMONA', number: 7, club: 'COC', goals: 4 },
      { position: 15, player: 'MIGUEL CAMARGO', number: 7, club: 'VER', goals: 4 },
      { position: 16, player: 'CARLOS RIVERA', number: 14, club: 'VER', goals: 4 },
      { position: 17, player: 'RASHEEN MATHEWS', number: 27, club: 'ALI', goals: 4 },
      { position: 18, player: 'HIBERTO PERALTA', number: 7, club: 'UME', goals: 4 },
      { position: 19, player: 'VICTOR AVILA', number: 99, club: 'CDU', goals: 3 },
      { position: 20, player: 'ADRIAN OLIVARDIA', number: 21, club: 'TAU', goals: 3 },
      { position: 21, player: 'SIMAO GARCES', number: 99, club: 'SFC', goals: 3 },
      { position: 22, player: 'ESTEVIZ LOPEZ', number: 23, club: 'VER', goals: 3 },
      { position: 23, player: 'FREDDY GONDOLA', number: 7, club: 'PLA', goals: 3 },
      { position: 24, player: 'RODRIGO TELLO', number: 22, club: 'SSM', goals: 3 },
      { position: 25, player: 'ALBERTO QUINTERO', number: 19, club: 'PLA', goals: 3 },
      { position: 26, player: 'DAIVIS MURILLO', number: 21, club: 'PLA', goals: 3 },
      { position: 27, player: 'ANGEL DIAZ', number: 4, club: 'TAU', goals: 3 },
      { position: 28, player: 'JUAN SAGEL', number: 11, club: 'VER', goals: 3 },
      { position: 29, player: 'ROGELIO RODRIGUEZ', number: 11, club: 'COC', goals: 3 },
      { position: 30, player: 'ROLANDO HERRERA', number: 31, club: 'COC', goals: 3 },
    ],
    roundScorers: [
      { player: 'HECTOR RIOS', number: 27, minute: "7'", club: 'PLA', goals: 1 },
      { player: 'DEIVIS MURILLO', number: 21, minute: "63'", club: 'PLA', goals: 1 },
      { player: 'JOEL LARA', number: 6, minute: "84'", club: 'PLA', goals: 1 },
      { player: 'GABRIEL TORRES', number: 9, minute: "73'", club: 'VER', goals: 1 },
      { player: 'GABRIEL TORRES', number: 9, minute: "97'", club: 'VER', goals: 1 },
      { player: 'JOHNJAIRO ALVARADO', number: 28, minute: "69'", club: 'ALI', goals: 1 },
      { player: 'ANTHONY STEWART', number: 29, minute: "94'", club: 'ALI', goals: 1 },
    ],

    disciplinary: [
      { club: 'UME', number: '5', player: 'VLADIMIR EDGHILL', qty: '1', sanction: '' },
      { club: 'UME', number: '26', player: 'JESUS ARAYA', qty: 'X', sanction: 'ACUMULACIÓN' },
      { club: 'UME', number: '29', player: 'OSCAR BECERRA', qty: 'X', sanction: 'ACUMULACIÓN' },
      { club: 'UME', number: '22', player: 'ANDRES PALMEZANO', qty: '1', sanction: '' },
      { club: 'UME', number: '17', player: 'ANDRICK EDWARDS', qty: '2', sanction: 'ADVERTENCIA POR ACUMULACIÓN' },
      { club: 'UME', number: '19', player: 'ALBERTO SALDAÑA', qty: '2', sanction: 'ADVERTENCIA POR ACUMULACIÓN' },
      { club: 'PLA', number: '19', player: 'ALBERTO QUINTERO', qty: '1', sanction: '' },
      { club: 'PLA', number: '29', player: 'OVIDIO LOPEZ', qty: '1', sanction: '' },
      { club: 'PLA', number: '31', player: 'ERIC DAVIS', qty: '1', sanction: '' },
      { club: 'PLA', number: '1', player: 'SAMUEL CASTAÑEDA', qty: '1', sanction: '' },
      { club: 'VER', number: '7', player: 'MIGUEL CAMARGO', qty: '2', sanction: 'ADVERTENCIA POR ACUMULACIÓN' },
      { club: 'VER', number: '11', player: 'JUAN SAGEL', qty: '2', sanction: 'ADVERTENCIA POR ACUMULACIÓN' },
      { club: 'ALI', number: '29', player: 'ANTHONY STEWART', qty: '1', sanction: '' },
    ],

    suspensions: [
      { club: 'COC', number: '31', player: 'ROLANDO HERRERA', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'COC', number: '19', player: 'JAMEEL LYNCH', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'CDU', number: '21', player: 'VALENTIN PIMENTEL', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'CDU', number: '20', player: 'UZIEL MALTEZ', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'DAU', number: 'DT', player: 'JUAN GUZMAN', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'UME', number: '26', player: 'JESUS ARAYA', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
      { club: 'UME', number: '29', player: 'OSCAR BECERRA', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 JORNADA', remaining: '1 RESTANTES' },
    ],

    suspensions2025: [
      { club: 'CDU', number: '1', player: 'ANDRES PEREZ', role: 'JUGADOR', sanction: 'ACUMULACIÓN', rounds: '1 RESTANTE', remaining: 'TC2025' },
      { club: 'DAU', number: 'PP', player: 'SALOMON CEDEÑO', role: 'C. TÉCNICO', sanction: 'ROJA DIRECTA', rounds: '2 RESTANTES', remaining: 'TC2025' },
      { club: 'HER', number: '69', player: 'CARLOS NOVILLE', role: 'JUGADOR', sanction: 'ROJA DIRECTA', rounds: '1 RESTANTE', remaining: 'TC2025' },
      { club: 'SFC', number: 'DT', player: 'NILTON BERNAL NO REG', role: 'C.TÉCNICO', sanction: 'RD + RES#71-TA-DIS-2025', rounds: '4 RESTANTES', remaining: 'TC2025' },
    ],

    banned: [
      { player: 'JOSÉ CALDERÓN', role: 'JUGADOR', resolution: 'RES.04-INT-DIS-2026' },
      { player: 'SHAQUILLE CORONADO', role: 'JUGADOR', resolution: 'RES#71-TA-DIS-2024' },
      { player: 'EDGARDO ALEXANDER', role: 'JUGADOR', resolution: 'RES#70-TA-DIS-2024' },
      { player: 'CHRISTOPHER CRAGWELL', role: 'JUGADOR', resolution: 'RES#69-TA-DIS-2024' },
      { player: 'LILIO MENA', role: 'JUGADOR', resolution: 'RES#133-TC-DIS-2024' },
      { player: 'OSCAR MC FARLANE', role: 'JUGADOR', resolution: 'RES#133-TC-DIS-2024' },
      { player: 'JAVIER MILLER', role: 'C. TÉCNICO', resolution: 'RES#156-TC-DIS-2024' },
      { player: 'ROLANDO GUMBS', role: 'JUGADOR', resolution: 'RES#133-TC-DIS-2024' },
      { player: 'LUIS ANTONIO CASAZOLA', role: 'JUGADOR', resolution: 'ONAD PAN' },
    ],

    noClubBan: { player: 'JORGE AMADOR', role: 'C. TÉCNICO', resolution: 'RES#98-TA-DIS-2024' },

    youthMinutes: [
      { position: 1, club: 'ALI', roundMinutes: null, totalMinutes: "1394'", percent: '116%' },
      { position: 2, club: 'CAI', roundMinutes: null, totalMinutes: "1331'", percent: '111%' },
      { position: 3, club: 'COC', roundMinutes: "180'", totalMinutes: "1208'", percent: '101%' },
      { position: 4, club: 'CDU', roundMinutes: null, totalMinutes: "1399'", percent: '117%' },
      { position: 5, club: 'DAU', roundMinutes: null, totalMinutes: "1531'", percent: '128%' },
      { position: 6, club: 'HER', roundMinutes: null, totalMinutes: "1798'", percent: '150%' },
      { position: 7, club: 'PLA', roundMinutes: null, totalMinutes: "1641'", percent: '137%' },
      { position: 8, club: 'SFC', roundMinutes: null, totalMinutes: "1262'", percent: '105%' },
      { position: 9, club: 'SSM', roundMinutes: null, totalMinutes: "1736'", percent: '145%' },
      { position: 10, club: 'TAU', roundMinutes: "62'", totalMinutes: "1237'", percent: '103%' },
      { position: 11, club: 'UME', roundMinutes: null, totalMinutes: "1214'", percent: '101%' },
      { position: 12, club: 'VER', roundMinutes: null, totalMinutes: "1677'", percent: '140%' },
    ],
  }
}
