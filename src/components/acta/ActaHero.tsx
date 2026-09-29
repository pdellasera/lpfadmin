import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger } from '@/lib/motion'

export function ActaHero() {
  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card border border-line/60 bg-surface-card-solid shadow-card"
    >
      <img
        src="/images/partido-hero.png"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover [object-position:50%_42%] dark:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/95 via-scrim/70 to-scrim/25 dark:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-scrim/60 via-transparent to-transparent dark:block" />

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
          <span className="text-content-secondary dark:text-white/90">Acta del partido</span>
        </motion.nav>

        <div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-[32px] leading-[0.95] text-content-primary dark:text-white xl:text-[44px]"
          >
            ACTA DEL PARTIDO
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-content-secondary dark:text-white/90 xl:text-xs"
          >
            Registro oficial del encuentro y sus incidencias
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}