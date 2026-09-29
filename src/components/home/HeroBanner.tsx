import { motion } from 'framer-motion'
import { FaShieldHalved, FaUsers } from 'react-icons/fa6'
import { GiSoccerBall, GiSoccerField } from 'react-icons/gi'
import { useHomeStats } from '@/hooks/useHomeQueries'
import { Skeleton } from '@/components/ui/Skeleton'
import { StatChip } from '@/components/ui/StatChip'
import { fadeUp, stagger } from '@/lib/motion'

export function HeroBanner() {
  const { data, isLoading } = useHomeStats()

  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
    >
      <img
        src="/images/hero-banner.png"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover object-top dark:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/75 to-scrim/30 dark:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-scrim/80 via-transparent to-transparent dark:block" />

      <div className="relative flex min-h-[270px] flex-col justify-between p-5 lg:p-7 xl:min-h-[290px]">
        <div>
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-300"
          >
            Pasión que nos une
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-2 font-display text-3xl leading-[0.95] text-content-primary sm:text-4xl xl:text-[2.75rem] dark:text-white"
          >
            <span className="mb-2 block">EL FÚTBOL</span>
            <span className="mb-2 block">DE PANAMÁ</span>
            <span className="block text-brand-600 dark:text-brand-400">EN UN SOLO LUGAR</span>
          </motion.h1>
        </div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
          {isLoading || !data ? (
            <>
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </>
          ) : (
            <>
              <StatChip icon={<FaShieldHalved />} value={data.teams} label="Equipos" />
              <StatChip icon={<GiSoccerBall />} value={data.matches} label="Partidos" />
              <StatChip icon={<FaUsers />} value={data.players} label="Jugadores" />
              <StatChip icon={<GiSoccerField />} value={data.stadiums} label="Estadios" />
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
