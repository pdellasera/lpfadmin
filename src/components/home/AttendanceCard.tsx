import { motion } from 'framer-motion'
import { useAttendance } from '@/hooks/useHomeQueries'
import { BarChart } from '@/components/charts/BarChart'
import { ChartCard } from '@/components/charts/ChartCard'
import { DonutChart } from '@/components/charts/DonutChart'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatNumber } from '@/lib/format'
import { fadeUp } from '@/lib/motion'

export function AttendanceCard() {
  const { data, isLoading } = useAttendance()

  const maxAttendance = data ? Math.max(...data.points.map((point) => point.attendance)) : 0
  const highlightIndex = data ? data.highlightRound - 1 : -1

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <ChartCard
        title="Asistencia en estadios"
        subtitle="Temporada 2026"
        linkLabel="Ver reporte"
        linkTo="/panel/reportes"
      >
        {isLoading || !data ? (
          <Skeleton className="h-[160px] w-full" />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <BarChart
              data={data.points.map((point) => ({
                label: `J${point.round}`,
                value: point.attendance,
              }))}
              highlightIndex={highlightIndex}
              height={160}
              ariaLabel={`Asistencia por jornada. Máximo de ${formatNumber(maxAttendance)} espectadores en la jornada ${data.highlightRound}. Ocupación promedio del ${data.occupancy}%.`}
            />
            <DonutChart value={data.occupancy} size={112} strokeWidth={12} label="Ocupación promedio" />
          </div>
        )}
      </ChartCard>
    </motion.section>
  )
}
