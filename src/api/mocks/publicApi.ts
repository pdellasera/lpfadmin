import type { PublicApiSummary } from '@/types'

export const publicApi: PublicApiSummary = {
  season: '2026',
  environment: 'produccion',
  version: 'v2.1',
  baseUrl: 'https://api.lpf-stats.example.com/v2',
  status: 'operativa',
  metrics: [
    {
      id: 'solicitudes',
      label: 'Solicitudes',
      value: 1_284_930,
      format: 'number',
      tone: 'brand',
      delta: { direction: 'up', tone: 'emerald', label: '18%', caption: 'vs. 30 días previos' },
    },
    {
      id: 'uptime',
      label: 'Uptime',
      value: 99.98,
      format: 'percent',
      tone: 'emerald',
      caption: 'Últimos 90 días',
    },
    {
      id: 'latencia',
      label: 'Latencia p95',
      value: 142,
      format: 'millis',
      tone: 'brand',
      caption: 'Promedio global',
    },
    {
      id: 'limite',
      label: 'Límite por llave',
      value: 120,
      format: 'number',
      tone: 'brand',
      caption: 'req / minuto',
    },
  ],
  endpointGroups: [
    {
      id: 'competicion',
      label: 'Competición',
      endpoints: [
        { id: 'tabla-posiciones', method: 'GET', path: '/competicion/tabla-posiciones', summary: 'Tabla de posiciones de ambas conferencias con goles, diferencia y puntos.' },
        { id: 'calendario', method: 'GET', path: '/competicion/calendario', summary: 'Fixtures por jornada con sede, horario y fase.' },
        { id: 'resultados', method: 'GET', path: '/competicion/resultados', summary: 'Resultados finales de la jornada seleccionada.' },
      ],
    },
    {
      id: 'clubes',
      label: 'Clubes y planteles',
      endpoints: [
        { id: 'clubes', method: 'GET', path: '/clubes', summary: 'Listado de clubes afiliados con escudo, ciudad y estadio.' },
        { id: 'plantel', method: 'GET', path: '/clubes/{clubId}/plantel', summary: 'Plantel activo por club: jugadores, dorsal y posición.' },
        { id: 'cuerpo-tecnico', method: 'GET', path: '/clubes/{clubId}/cuerpo-tecnico', summary: 'Cuerpo técnico y licencias vigentes.' },
      ],
    },
    {
      id: 'jugadores',
      label: 'Jugadores',
      endpoints: [
        { id: 'jugadores', method: 'GET', path: '/jugadores', summary: 'Ficha de jugadores con estadísticas individuales.' },
        { id: 'goleadores', method: 'GET', path: '/jugadores/goleadores', summary: 'Tabla de goleadores y asistentes de la temporada.' },
      ],
    },
    {
      id: 'partidos',
      label: 'Partidos y arbitraje',
      endpoints: [
        { id: 'partidos', method: 'GET', path: '/partidos', summary: 'Detalle de partidos con alineaciones y eventos.' },
        { id: 'arbitros', method: 'GET', path: '/arbitros', summary: 'Designaciones arbitrales por jornada.' },
      ],
    },
    {
      id: 'disciplina',
      label: 'Disciplina',
      endpoints: [
        { id: 'sanciones', method: 'GET', path: '/disciplina/sanciones', summary: 'Sanciones vigentes con motivo, regla y duración.' },
        { id: 'resoluciones', method: 'GET', path: '/disciplina/resoluciones', summary: 'Resoluciones del tribunal disciplinario.' },
      ],
    },
    {
      id: 'datos',
      label: 'Datos y reportes',
      endpoints: [
        { id: 'reportes', method: 'GET', path: '/reportes', summary: 'Catálogo de reportes oficiales descargables.' },
        { id: 'transparencia', method: 'GET', path: '/transparencia', summary: 'Indicadores financieros de transparencia institucional.' },
        { id: 'webhooks', method: 'POST', path: '/webhooks', summary: 'Registra un endpoint para recibir eventos en tiempo real.' },
      ],
    },
  ],
  codeSamples: [
    {
      id: 'curl',
      label: 'cURL',
      code: 'curl -X GET "https://api.lpf-stats.example.com/v2/competicion/tabla-posiciones?temporada=2026" -H "Authorization: Bearer lpf_live_9f8...e2d1"',
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      code: 'await fetch("https://api.lpf-stats.example.com/v2/competicion/tabla-posiciones?temporada=2026", { headers: { Authorization: "Bearer lpf_live_9f8...e2d1" } })',
    },
    {
      id: 'python',
      label: 'Python',
      code: 'requests.get("https://api.lpf-stats.example.com/v2/competicion/tabla-posiciones", params={"temporada": "2026"}, headers={"Authorization": "Bearer lpf_live_9f8...e2d1"})',
    },
    {
      id: 'php',
      label: 'PHP',
      code: 'curl_setopt($ch, CURLOPT_URL, "https://api.lpf-stats.example.com/v2/competicion/tabla-posiciones?temporada=2026");',
    },
  ],
  keys: [
    { id: 'key-1', name: 'Producción — Web oficial', prefix: 'lpf_live_9f8', scopes: ['lectura', 'partidos', 'clubes'], createdAt: '2026-01-04', lastUsedAt: '2026-10-06', requests30d: 482_310, status: 'activa' },
    { id: 'key-2', name: 'App móvil LPF', prefix: 'lpf_live_2c1', scopes: ['lectura', 'noticias'], createdAt: '2026-02-18', lastUsedAt: '2026-10-06', requests30d: 316_844, status: 'activa' },
    { id: 'key-3', name: 'Medio — TV partner', prefix: 'lpf_live_7b4', scopes: ['lectura', 'reportes'], createdAt: '2026-03-02', lastUsedAt: '2026-09-28', requests30d: 98_120, status: 'activa' },
    { id: 'key-4', name: 'Integración sandbox', prefix: 'lpf_test_1a9', scopes: ['lectura'], createdAt: '2026-06-11', lastUsedAt: '2026-08-14', requests30d: 2_410, status: 'revocada' },
  ],
  ratePlans: [
    { id: 'free', name: 'Free', description: 'Datos públicos de jornada en curso.', requestsPerMinute: 30, requestsPerDay: 10_000 },
    { id: 'club', name: 'Club', description: 'Acceso completo para clubes afiliados.', requestsPerMinute: 120, requestsPerDay: 250_000, highlight: true },
    { id: 'prensa', name: 'Prensa', description: 'Datos históricos y reportes para medios.', requestsPerMinute: 60, requestsPerDay: 100_000 },
  ],
  webhooks: [
    { id: 'wh-1', event: 'partido.finalizado', url: 'https://api.partner-club.com/lpf/webhook', status: 'activo', lastDelivery: '2026-10-06 21:48', successRate: 99.2 },
    { id: 'wh-2', event: 'gol.registrado', url: 'https://hooks.media-tv.com/lpf/eventos', status: 'activo', lastDelivery: '2026-10-06 21:47', successRate: 98.7 },
    { id: 'wh-3', event: 'sancion.emitida', url: 'https://webhooks.app-movil.com/lpf/disciplina', status: 'pausado', lastDelivery: '2026-09-30 12:03', successRate: 94.1 },
  ],
  usage: [
    { label: 'Lun', requests: 128_400, errors: 1_120 },
    { label: 'Mar', requests: 142_900, errors: 1_380 },
    { label: 'Mié', requests: 165_200, errors: 1_540 },
    { label: 'Jue', requests: 138_700, errors: 1_210 },
    { label: 'Vie', requests: 176_300, errors: 1_690 },
    { label: 'Sáb', requests: 224_500, errors: 2_310 },
    { label: 'Dom', requests: 308_930, errors: 2_890 },
  ],
  resources: [
    { id: 'guia', title: 'Guía de inicio rápido', description: 'Tu primera llamada en menos de 5 minutos.', kind: 'docs', href: '#' },
    { id: 'openapi', title: 'Referencia OpenAPI', description: 'Especificación Swagger 3.0 completa.', kind: 'openapi', href: '#' },
    { id: 'changelog', title: 'Changelog v2.1', description: 'Cambios y deprecaciones recientes.', kind: 'changelog', href: '#' },
    { id: 'sdk', title: 'SDKs oficiales', description: 'Librerías para JS, Python y PHP.', kind: 'sdk', href: '#' },
    { id: 'status', title: 'Estado del servicio', description: 'Uptime e incidentes en tiempo real.', kind: 'status', href: '#' },
  ],
}
