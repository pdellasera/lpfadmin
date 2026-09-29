import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActaCommissionerNotesCard } from '@/components/acta/ActaCommissionerNotesCard'
import { ActaEventsCard } from '@/components/acta/ActaEventsCard'
import { ActaHero } from '@/components/acta/ActaHero'
import { ActaInfoCard } from '@/components/acta/ActaInfoCard'
import { ActaLineupCard } from '@/components/acta/ActaLineupCard'
import { ActaMatchSummary } from '@/components/acta/ActaMatchSummary'
import { ActaOfficialsCard } from '@/components/acta/ActaOfficialsCard'
import { ActaSignaturesCard } from '@/components/acta/ActaSignaturesCard'
import { ActaStepper } from '@/components/acta/ActaStepper'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useMatchActa } from '@/hooks/useActaQueries'
import type { ActaStepId } from '@/types'

export default function MatchActaPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const [step, setStep] = useState<ActaStepId>('preparacion')
  const { data, isLoading, isError, refetch } = useMatchActa(matchId)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-[128px] w-full rounded-card" />
        <Skeleton className="h-[44px] w-full rounded-xl" />
        <Skeleton className="h-[150px] w-full rounded-card" />
        <div className="grid gap-3 xl:grid-cols-[1.18fr_1fr]">
          <Skeleton className="h-[172px] w-full rounded-card" />
          <Skeleton className="h-[172px] w-full rounded-card" />
        </div>
        <div className="grid gap-3 xl:grid-cols-[1.28fr_1fr_1.1fr]">
          <Skeleton className="h-[320px] w-full rounded-card" />
          <Skeleton className="h-[320px] w-full rounded-card" />
          <Skeleton className="h-[320px] w-full rounded-card" />
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return <ErrorState message="No se pudo cargar el acta del partido." onRetry={() => refetch()} />
  }

  const { match, detail } = data

  return (
    <div className="space-y-3">
      <ActaHero />
      <ActaStepper value={step} onChange={setStep} />
      <ActaMatchSummary match={match} detail={detail} />

      <div className="grid gap-3 xl:grid-cols-[1.18fr_1fr]">
        <ActaInfoCard info={detail.info} />
        <ActaOfficialsCard officials={detail.officials} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-[1.28fr_1fr_1.1fr]">
        <ActaLineupCard sheet={detail.home} />
        <ActaEventsCard events={detail.events} className="lg:order-3 lg:col-span-2 xl:order-2 xl:col-span-1" />
        <ActaLineupCard sheet={detail.away} className="lg:order-2 xl:order-3" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.28fr_2.13fr]">
        <ActaCommissionerNotesCard notes={detail.commissionerNotes} />
        <ActaSignaturesCard signatures={detail.signatures} />
      </div>
    </div>
  )
}