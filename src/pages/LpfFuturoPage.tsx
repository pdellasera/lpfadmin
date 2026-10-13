import { useMemo, useState } from 'react'
import { AreasMasSolicitadasCard } from '@/components/lpf-futuro/AreasMasSolicitadasCard'
import { LpfFuturoHero } from '@/components/lpf-futuro/LpfFuturoHero'
import { LpfFuturoKpiRow } from '@/components/lpf-futuro/LpfFuturoKpiRow'
import { LpfFuturoSkeleton } from '@/components/lpf-futuro/LpfFuturoSkeleton'
import { LpfFuturoToolbar } from '@/components/lpf-futuro/LpfFuturoToolbar'
import { PostuladosPanel } from '@/components/lpf-futuro/postulados/PostuladosPanel'
import { PostuladosRankingCard } from '@/components/lpf-futuro/PostuladosRankingCard'
import { PostuladosRecientesCard } from '@/components/lpf-futuro/PostuladosRecientesCard'
import { UniversidadesActivasCard } from '@/components/lpf-futuro/UniversidadesActivasCard'
import { VacantesDestacadasCard } from '@/components/lpf-futuro/VacantesDestacadasCard'
import { UniversidadesPanel } from '@/components/lpf-futuro/universidades/UniversidadesPanel'
import { VacantesPanel } from '@/components/lpf-futuro/vacantes/VacantesPanel'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useLpfFuturo, useLpfFuturoFilters, useLpfVacanteFilters, usePostuladosFilterOptions, useUniversidadesFilterOptions } from '@/hooks/useLpfFuturoQueries'
import PlaceholderPage from '@/pages/PlaceholderPage'
import type { LpfFuturoFilters, LpfFuturoTabId } from '@/types'

const EMPTY_FILTERS: LpfFuturoFilters = {
  estado: 'todos',
  universidad: 'todas',
  club: 'todos',
  area: 'todas',
  search: '',
}

const TAB_TITLES: Record<Exclude<LpfFuturoTabId, 'vacantes' | 'resumen' | 'universidades'>, string> = {
  postulados: 'Postulados',
  equipos: 'Equipos',
}

export default function LpfFuturoPage() {
  const [tab, setTab] = useState<LpfFuturoTabId>('vacantes')
  const [applied, setApplied] = useState<LpfFuturoFilters>(EMPTY_FILTERS)

  const { data, isLoading, isError, refetch } = useLpfFuturo()
  const { data: options, isLoading: optionsLoading } = useLpfFuturoFilters()
  const { data: vacanteOptions, isLoading: vacanteOptionsLoading } = useLpfVacanteFilters()
  const { data: postuladosOptions, isLoading: postuladosOptionsLoading } = usePostuladosFilterOptions()
  const { data: universidadesOptions, isLoading: universidadesOptionsLoading } = useUniversidadesFilterOptions()

  const heroTitle = tab === 'postulados' ? 'Postulados' : tab === 'universidades' ? 'Universidades' : 'LPF Futuro'
  const heroSubtitle =
    tab === 'postulados'
      ? 'Gestiona y evalúa las postulaciones de los universitarios'
      : tab === 'universidades'
        ? 'Instituciones aliadas en la formación de talento para el fútbol panameño.'
        : 'Conectando talento universitario con el fútbol panameño'

  const filtered = useMemo(() => {
    if (!data) return []
    return data.postulados.filter((postulante) => {
      if (applied.estado !== 'todos' && postulante.state !== applied.estado) return false
      if (applied.universidad !== 'todas' && postulante.university.id !== applied.universidad) return false
      if (applied.club !== 'todos' && postulante.club.id !== applied.club) return false
      if (applied.area !== 'todas' && postulante.area !== applied.area) return false
      if (applied.search) {
        const haystack = `${postulante.name} ${postulante.email} ${postulante.university.name} ${postulante.club.name} ${postulante.vacante}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [data, applied])

  return (
    <div className="space-y-3">
      <LpfFuturoHero tab={tab} onTabChange={setTab} title={heroTitle} subtitle={heroSubtitle} />

      {tab === 'vacantes' ? (
        isError ? (
          <ErrorState message="No se pudieron cargar los datos de LPF Futuro." onRetry={() => refetch()} />
        ) : isLoading || !data ? (
          <LpfFuturoSkeleton />
        ) : vacanteOptionsLoading || !vacanteOptions ? (
          <Skeleton className="h-[70px] w-full rounded-card" />
        ) : (
          <VacantesPanel vacantes={data.vacantes} total={data.vacantesTotal} options={vacanteOptions} />
        )
      ) : tab === 'postulados' ? (
        isError ? (
          <ErrorState message="No se pudieron cargar los datos de LPF Futuro." onRetry={() => refetch()} />
        ) : isLoading || !data ? (
          <LpfFuturoSkeleton />
        ) : postuladosOptionsLoading || !postuladosOptions ? (
          <Skeleton className="h-[70px] w-full rounded-card" />
        ) : (
          <PostuladosPanel postulados={data.postulados} kpis={data.postuladosKpis} options={postuladosOptions} />
        )
      ) : tab === 'universidades' ? (
        isError ? (
          <ErrorState message="No se pudieron cargar los datos de LPF Futuro." onRetry={() => refetch()} />
        ) : isLoading || !data ? (
          <LpfFuturoSkeleton />
        ) : universidadesOptionsLoading || !universidadesOptions ? (
          <Skeleton className="h-[70px] w-full rounded-card" />
        ) : (
          <UniversidadesPanel
            universities={data.universidades}
            kpis={data.universidadesKpis}
            options={universidadesOptions}
            vacantes={data.vacantes}
            postulantes={data.postulados}
          />
        )
      ) : tab !== 'resumen' ? (
        <PlaceholderPage title={TAB_TITLES[tab]} />
      ) : isError ? (
        <ErrorState message="No se pudieron cargar los datos de LPF Futuro." onRetry={() => refetch()} />
      ) : isLoading || !data ? (
        <LpfFuturoSkeleton />
      ) : (
        <>
          <LpfFuturoKpiRow kpis={data.kpis} />

          {optionsLoading || !options ? (
            <Skeleton className="h-[70px] w-full rounded-card" />
          ) : (
            <LpfFuturoToolbar
              options={options}
              applied={applied}
              onChange={setApplied}
              onClear={() => setApplied(EMPTY_FILTERS)}
            />
          )}

          <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {filtered.length > 0 ? (
              <PostuladosRecientesCard postulados={filtered} />
            ) : (
              <EmptyState
                title="No hay postulados que coincidan"
                description="Prueba con otra combinación de filtros."
              />
            )}

            <div className="grid gap-3">
              <PostuladosRankingCard title="Postulados por club" items={data.postuladosPorClub} tone="brand" />
              <PostuladosRankingCard
                title="Postulados por universidad"
                items={data.postuladosPorUniversidad}
                tone="violet"
              />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <VacantesDestacadasCard vacantes={data.vacantesDestacadas} />
            <UniversidadesActivasCard universities={data.universidadesActivas} total={data.universidadesTotales} />
            <AreasMasSolicitadasCard areas={data.areasMasSolicitadas} />
          </div>
        </>
      )}
    </div>
  )
}
