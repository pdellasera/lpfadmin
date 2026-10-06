import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { RefereeReportSheet } from '@/components/referee-report/RefereeReportSheet'
import { RefereeReportToolbar } from '@/components/referee-report/RefereeReportToolbar'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useRefereeReport } from '@/hooks/useRefereeReportQuery'
import { fadeUp, stagger } from '@/lib/motion'

export default function MatchRefereeReportPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const { data, isLoading, isError, refetch } = useRefereeReport(matchId)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-[128px] w-full rounded-card" />
        <Skeleton className="h-[52px] w-full rounded-xl" />
        <Skeleton className="h-[900px] w-full rounded-card" />
      </div>
    )
  }

  if (isError || !data) {
    return <ErrorState message="No se pudo cargar el informe del árbitro." onRetry={() => refetch()} />
  }

  return (
    <div className="space-y-3">
      <motion.section
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className="print:hidden relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
      >
        <img
          src="/images/partido-hero.png"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover [object-position:50%_42%] dark:block"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/70 to-scrim/25 dark:block" />
        <div className="relative flex min-h-[128px] flex-col justify-center gap-2 px-6 py-4 lg:px-7">
          <motion.nav
            variants={fadeUp}
            aria-label="Migas de pan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted dark:text-white/70"
          >
            <Link to="/panel/partidos" className="transition-colors hover:text-content-primary dark:hover:text-white">
              Partidos
            </Link>
            <span className="text-content-faint dark:text-white/40">›</span>
            <span className="text-content-secondary dark:text-white/90">Informe del árbitro</span>
          </motion.nav>
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[32px] leading-[0.95] text-content-primary dark:text-white xl:text-[44px]"
            >
              INFORME DEL ÁRBITRO
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
            >
              Documento oficial del encuentro
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="print:hidden">
        <RefereeReportToolbar />
      </div>

      <RefereeReportSheet report={data} />
    </div>
  )
}
