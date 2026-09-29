import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MatchesCalendar } from '@/components/matches/MatchesCalendar'
import { MatchesFilterBar } from '@/components/matches/MatchesFilterBar'
import { MatchesHero } from '@/components/matches/MatchesHero'
import { MatchesList } from '@/components/matches/MatchesList'
import { MatchesViewToggle } from '@/components/matches/MatchesViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useMatchFilters, useMatches } from '@/hooks/useMatchesQueries'
import { fadeUp } from '@/lib/motion'
import type { MatchFilters, MatchStatusTabId, MatchesView } from '@/types'

const EMPTY_FILTERS: MatchFilters = { competition: 'todos', team: 'todos', stadium: 'todos', date: '' }

const HEADINGS: Record<MatchStatusTabId, string> = {
  todos: 'PRÓXIMOS PARTIDOS',
  proximos: 'PRÓXIMOS PARTIDOS',
  'en-vivo': 'PARTIDOS EN VIVO',
  finalizados: 'PARTIDOS FINALIZADOS',
}

export default function MatchesPage() {
  const [status, setStatus] = useState<MatchStatusTabId>('todos')
  const [view, setView] = useState<MatchesView>('list')
  const [applied, setApplied] = useState<MatchFilters>(EMPTY_FILTERS)

  const { data: matches, isLoading } = useMatches()
  const { data: options, isLoading: optionsLoading } = useMatchFilters()

  const filtered = useMemo(() => {
    if (!matches) return []
    return matches.filter((match) => {
      if (status === 'proximos' && match.phase !== 'proximo') return false
      if (status === 'en-vivo' && match.phase !== 'en-vivo') return false
      if (status === 'finalizados' && match.phase !== 'finalizado') return false
      if (applied.competition !== 'todos' && match.competition !== applied.competition) return false
      if (applied.team !== 'todos' && match.homeClub.id !== applied.team && match.awayClub.id !== applied.team) {
        return false
      }
      if (applied.stadium !== 'todos' && match.stadium !== applied.stadium) return false
      if (applied.date && match.date !== applied.date) return false
      return true
    })
  }, [matches, status, applied])

  return (
    <div className="space-y-3">
      <MatchesHero status={status} onStatusChange={setStatus} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <MatchesFilterBar
          key={JSON.stringify(applied)}
          options={options}
          applied={applied}
          onApply={setApplied}
          onClear={() => setApplied(EMPTY_FILTERS)}
        />
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between gap-4"
      >
        <h2 className="font-display text-xl uppercase tracking-wide text-content-primary xl:text-[22px]">
          {HEADINGS[status]}
        </h2>
        <MatchesViewToggle value={view} onChange={setView} />
      </motion.div>

      {view === 'calendar' ? (
        <MatchesCalendar matches={filtered} />
      ) : (
        <MatchesList matches={filtered} isLoading={isLoading} />
      )}

      {!isLoading && matches && filtered.length === 0 && view === 'list' && (
        <EmptyState
          title="No hay partidos que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
