import { useMemo, useState } from 'react'
import { PlayersHero } from '@/components/players/PlayersHero'
import { PlayersPagination } from '@/components/players/PlayersPagination'
import { PlayersTable } from '@/components/players/PlayersTable'
import { PlayersToolbar } from '@/components/players/PlayersToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { usePlayerFilters, usePlayers } from '@/hooks/usePlayersQueries'
import type { PlayerFilters, PlayerPosition, PlayerPositionCounts, PlayerPositionTabId } from '@/types'

const EMPTY_FILTERS: PlayerFilters = { club: 'todos', position: 'todos', status: 'todos', search: '' }

const FALLBACK_COUNTS: PlayerPositionCounts = {
  total: 482,
  porteros: 48,
  defensas: 138,
  mediocampistas: 162,
  delanteros: 134,
}

const TAB_POSITION: Record<Exclude<PlayerPositionTabId, 'todos'>, PlayerPosition> = {
  porteros: 'POR',
  defensas: 'DEF',
  mediocampistas: 'MED',
  delanteros: 'DEL',
}

export default function PlayersPage() {
  const [tab, setTab] = useState<PlayerPositionTabId>('todos')
  const [applied, setApplied] = useState<PlayerFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data: players, isLoading } = usePlayers()
  const { data: options, isLoading: optionsLoading } = usePlayerFilters()

  const counts = useMemo<PlayerPositionCounts>(() => {
    if (!players) return FALLBACK_COUNTS
    return {
      total: players.length,
      porteros: players.filter((player) => player.position === 'POR').length,
      defensas: players.filter((player) => player.position === 'DEF').length,
      mediocampistas: players.filter((player) => player.position === 'MED').length,
      delanteros: players.filter((player) => player.position === 'DEL').length,
    }
  }, [players])

  const filtered = useMemo(() => {
    if (!players) return []
    return players.filter((player) => {
      if (tab !== 'todos' && player.position !== TAB_POSITION[tab]) return false
      if (applied.club !== 'todos' && player.club.id !== applied.club) return false
      if (applied.position !== 'todos' && player.position !== applied.position) return false
      if (applied.status !== 'todos' && player.status !== applied.status) return false
      if (applied.search) {
        const haystack = `${player.name} ${player.club.name} ${player.club.fullName ?? ''}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [players, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: PlayerPositionTabId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: PlayerFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="space-y-3">
      <PlayersHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <PlayersToolbar
          options={options}
          applied={applied}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <PlayersTable players={pageRows} isLoading={isLoading} startIndex={(currentPage - 1) * perPage} />

      {!isLoading && players && filtered.length > 0 && (
        <PlayersPagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {!isLoading && players && filtered.length === 0 && (
        <EmptyState
          title="No hay jugadores que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
