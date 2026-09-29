import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaCalendarDays,
  FaChartColumn,
  FaChevronRight,
  FaShieldHalved,
  FaTicket,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { Card } from '@/components/ui/Card'
import { fadeUp, stagger } from '@/lib/motion'

interface QuickAction {
  label: string
  description: string
  to: string
  icon: IconType
}

const actions: QuickAction[] = [
  { label: 'Gestionar partidos', description: 'Crea y programa jornadas', to: '/panel/partidos', icon: FaCalendarDays },
  { label: 'Administrar equipos', description: 'Plantillas y clubes', to: '/panel/equipos', icon: FaShieldHalved },
  { label: 'Boletos y abonos', description: 'Ventas y localidades', to: '/panel/boletos', icon: FaTicket },
  { label: 'Reportes', description: 'Métricas y finanzas', to: '/panel/reportes', icon: FaChartColumn },
]

export function QuickActions() {
  return (
    <motion.section
      variants={stagger(0.06)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {actions.map((action) => (
        <motion.div key={action.to} variants={fadeUp}>
          <Link to={action.to} className="group block">
            <Card interactive className="flex items-center gap-3 px-3.5 py-3 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400 ring-1 ring-brand-600/30 transition-transform duration-200 group-hover:scale-105">
                <action.icon className="text-xl" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-content-primary">{action.label}</p>
                <p className="truncate text-xs text-content-faint">{action.description}</p>
              </div>
              <FaChevronRight className="shrink-0 text-sm text-content-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-400" />
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  )
}
