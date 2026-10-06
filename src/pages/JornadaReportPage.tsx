import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ReportePdfViewer } from '@/components/jornada-report/ReportePdfViewer'
import { JornadaReportToolbar } from '@/components/jornada-report/JornadaReportToolbar'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useJornadaReport } from '@/hooks/useJornadaReportQuery'
import { fadeUp, stagger } from '@/lib/motion'

export default function JornadaReportPage() {
  const { data, isLoading, isError, refetch } = useJornadaReport()

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
    return <ErrorState message="No se pudo cargar el resumen de jornada." onRetry={() => refetch()} />
  }

  return (
    <div className="space-y-3">
      <motion.section
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className="print:hidden relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
      >
        <div className="relative flex min-h-[128px] flex-col justify-center gap-2 px-6 py-4 lg:px-7">
          <motion.nav
            variants={fadeUp}
            aria-label="Migas de pan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted"
          >
            <Link to="/panel/reportes" className="transition-colors hover:text-content-primary">
              Reportes
            </Link>
            <span className="text-content-faint">›</span>
            <span className="text-content-secondary">Resumen de jornada</span>
          </motion.nav>
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[32px] leading-[0.95] text-content-primary xl:text-[44px]"
            >
              RESUMEN DE JORNADA
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary xl:text-xs"
            >
              Reporte de estadísticas · {data.tournament} · {data.round}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="print:hidden">
        <JornadaReportToolbar />
      </div>

      <ReportePdfViewer />
    </div>
  )
}
