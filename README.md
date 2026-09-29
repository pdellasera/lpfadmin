# LPF STATS

Panel de administración de la Liga Panameña de Fútbol (LPF), construido con React + Vite + Tailwind CSS v4.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (build + dev server)
- **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- **react-router-dom 7** (SPA con `createBrowserRouter`)
- **TanStack Query**, **Framer Motion**, **react-icons**

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` (requerimiento de Vite 8)

## Setup local

```bash
npm install
npm run dev        # http://localhost:5173
```

El proyecto usa **datos mock** por defecto (no requiere backend).

### Variables de entorno

| Variable | Descripción | Default |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API real (solo aplica si `VITE_USE_MOCK_DATA=false`) | `''` |
| `VITE_USE_MOCK_DATA` | `false` para usar la API real; cualquier otro valor activa los mocks | mocks ON |

```bash
cp .env.example .env.development   # para desarrollo local
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Typecheck (`tsc`) + build de producción |
| `npm run typecheck` | Solo chequeo de tipos |
| `npm run lint` | ESLint |
| `npm run preview` | Previsualiza el build de `dist` |

## Deploy en Vercel

El repo incluye un `vercel.json` que configura:

- Framework **Vite** (autodetectado)
- `installCommand: npm ci`
- `buildCommand: npm run build`
- `outputDirectory: dist`
- **Rewrite SPA** `/(.*) → /index.html` (necesario para las rutas profundas como `/panel/partidos/:id/acta`)
- Headers de caché: `immutable` para `/assets/*`, 7 días para `/images/*`

Pasos:

1. Push a `main` en GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project → Import Git Repository** → `pdellasera/lpfadmin`.
3. Framework Preset **Vite** (se autodetecta). Root Directory `./`.
4. Agrega las variables de entorno en **Settings → Environment Variables** (Production + Preview):
   - `VITE_USE_MOCK_DATA=true`
   - `VITE_API_URL=https://api.lpf-stats.example.com`
5. **Deploy**. Cada push a `main` despliega a producción automáticamente; cada PR genera una Preview URL.

> ⚠️ El deploy es público y actualmente sirve solo datos mock (sin backend ni autenticación real).
