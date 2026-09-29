import { useMemo, useState } from 'react'
import { TeamsCardGrid } from '@/components/teams/TeamsCardGrid'
import { TeamsHero } from '@/components/teams/TeamsHero'
import { TeamsTable } from '@/components/teams/TeamsTable'
import { TeamsToolbar } from '@/components/teams/TeamsToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useTeamFilters, useTeams } from '@/hooks/useTeamsQueries'
import type { TeamDivisionTabId, TeamFilters, TeamsView } from '@/types'

const EMPTY_FILTERS: TeamFilters = { competition: 'todos', status: 'todos', search: '' }

export default function TeamsPage() {
  const [division, setDivision] = useState<TeamDivisionTabId>('todos')
  const [view, setView] = useState<TeamsView>('list')
  const [applied, setApplied] = useState<TeamFilters>(EMPTY_FILTERS)

  const { data: teams, isLoading } = useTeams()
  const { data: options, isLoading: optionsLoading } = useTeamFilters()

  const filtered = useMemo(() => {
    if (!teams) return []
    return teams.filter((team) => {
      if (division === 'primera' && !team.competition.includes('Primera')) return false
      if (division === 'segunda' && !team.competition.includes('Segunda')) return false
      if (applied.competition !== 'todos' && team.competition !== applied.competition) return false
      if (applied.status !== 'todos' && team.status !== applied.status) return false
      if (applied.search) {
        const haystack = `${team.club.name} ${team.club.fullName ?? ''} ${team.city} ${team.stadium}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [teams, division, applied])

  return (
    <div className="space-y-3">
      <TeamsHero division={division} onDivisionChange={setDivision} totalTeams={teams?.length ?? 12} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <TeamsToolbar
          options={options}
          applied={applied}
          view={view}
          onViewChange={setView}
          onChange={setApplied}
          onClear={() => setApplied(EMPTY_FILTERS)}
        />
      )}

      {view === 'cards' ? (
        <TeamsCardGrid teams={filtered} isLoading={isLoading} />
      ) : (
        <TeamsTable teams={filtered} isLoading={isLoading} />
      )}

      {!isLoading && teams && filtered.length === 0 && (
        <EmptyState
          title="No hay equipos que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
