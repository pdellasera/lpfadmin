import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import MatchesPage from '@/pages/MatchesPage'
import MatchActaPage from '@/pages/MatchActaPage'
import PlayersPage from '@/pages/PlayersPage'
import TeamsPage from '@/pages/TeamsPage'
import TransparencyPage from '@/pages/TransparencyPage'
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
      { path: 'equipos', element: <TeamsPage /> },
      { path: 'jugadores', element: <PlayersPage /> },
      { path: 'competencias', element: <PlaceholderPage title="Competencias" /> },
      { path: 'estadios', element: <PlaceholderPage title="Estadios" /> },
      { path: 'boletos', element: <PlaceholderPage title="Boletos" /> },
      { path: 'abonos', element: <PlaceholderPage title="Abonos" /> },
      { path: 'finanzas', element: <PlaceholderPage title="Finanzas" /> },
      { path: 'reportes', element: <PlaceholderPage title="Reportes" /> },
      { path: 'transparencia', element: <TransparencyPage /> },
      { path: 'apis', element: <PlaceholderPage title="APIs" /> },
      { path: 'auditoria', element: <PlaceholderPage title="Auditoría" /> },
      { path: 'noticias', element: <PlaceholderPage title="Noticias" /> },
      { path: 'usuarios', element: <PlaceholderPage title="Usuarios" /> },
      { path: 'configuracion', element: <PlaceholderPage title="Configuración" /> },
      { path: '*', element: <PlaceholderPage title="Página no encontrada" /> },
    ],
  },
])
