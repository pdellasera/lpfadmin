import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import EligibilityAlertsPage from '@/pages/EligibilityAlertsPage'
import LoginPage from '@/pages/LoginPage'
import MatchesPage from '@/pages/MatchesPage'
import CalendarPage from '@/pages/CalendarPage'
import MatchActaPage from '@/pages/MatchActaPage'
import MatchRefereeReportPage from '@/pages/MatchRefereeReportPage'
import PlayersPage from '@/pages/PlayersPage'
import PublicApiPage from '@/pages/PublicApiPage'
import TeamsPage from '@/pages/TeamsPage'
import StaffPage from '@/pages/StaffPage'
import RefereesPage from '@/pages/RefereesPage'
import SanctionsPage from '@/pages/SanctionsPage'
import StadiumsPage from '@/pages/StadiumsPage'
import TransparencyPage from '@/pages/TransparencyPage'
import ReportsPage from '@/pages/ReportsPage'
import JornadaReportPage from '@/pages/JornadaReportPage'
import PlaceholderPage from '@/pages/PlaceholderPage'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/login', element: <Navigate to="/" replace /> },
  {
    path: '/panel',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'partidos', element: <MatchesPage /> },
      { path: 'partidos/:matchId/acta', element: <MatchActaPage /> },
      { path: 'partidos/:matchId/informe-arbitro', element: <MatchRefereeReportPage /> },
      { path: 'equipos', element: <TeamsPage /> },
      { path: 'jugadores', element: <PlayersPage /> },
      { path: 'competencias', element: <PlaceholderPage title="Competencias" /> },
      { path: 'estadios', element: <StadiumsPage /> },
      { path: 'calendario', element: <CalendarPage /> },
      { path: 'cuerpo-tecnico', element: <StaffPage /> },
      { path: 'arbitros', element: <RefereesPage /> },
      { path: 'sanciones', element: <SanctionsPage /> },
      { path: 'alertas-elegibilidad', element: <EligibilityAlertsPage /> },
      { path: 'resoluciones', element: <PlaceholderPage title="Resoluciones" /> },
      { path: 'boletos', element: <PlaceholderPage title="Boletos" /> },
      { path: 'abonos', element: <PlaceholderPage title="Abonos" /> },
      { path: 'finanzas', element: <PlaceholderPage title="Finanzas" /> },
      { path: 'reportes', element: <ReportsPage /> },
      { path: 'reportes/resumen-jornada', element: <JornadaReportPage /> },
      { path: 'transparencia', element: <TransparencyPage /> },
      { path: 'apis', element: <PublicApiPage /> },
      { path: 'auditoria', element: <PlaceholderPage title="Auditoría" /> },
      { path: 'noticias', element: <PlaceholderPage title="Noticias" /> },
      { path: 'usuarios', element: <PlaceholderPage title="Usuarios" /> },
      { path: 'configuracion', element: <PlaceholderPage title="Configuración" /> },
      { path: '*', element: <PlaceholderPage title="Página no encontrada" /> },
    ],
  },
])
