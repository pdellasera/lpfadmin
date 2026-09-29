import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaChartColumn,
  FaClipboardCheck,
  FaDisplay,
  FaGear,
  FaHouse,
  FaMoneyBillTrendUp,
  FaNewspaper,
  FaShieldHalved,
  FaTicket,
  FaUserGroup,
  FaUsers,
  FaWallet,
} from 'react-icons/fa6'
import { GiSoccerKick, GiTrophy } from 'react-icons/gi'
import { TbBuildingStadium } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import { cn } from '@/lib/cn'
import { PanamaFlag } from '@/components/ui/PanamaFlag'

interface NavItem {
  label: string
  to: string
  icon: IconType
}

interface NavGroup {
  label?: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    items: [
      { label: 'Inicio', to: '/panel', icon: FaHouse },
      { label: 'Partidos', to: '/panel/partidos', icon: GiSoccerKick },
      { label: 'Equipos', to: '/panel/equipos', icon: FaShieldHalved },
      { label: 'Jugadores', to: '/panel/jugadores', icon: FaUsers },
      { label: 'Competencias', to: '/panel/competencias', icon: GiTrophy },
      { label: 'Estadios', to: '/panel/estadios', icon: TbBuildingStadium },
      { label: 'Boletos', to: '/panel/boletos', icon: FaTicket },
      { label: 'Abonos', to: '/panel/abonos', icon: FaWallet },
      { label: 'Finanzas', to: '/panel/finanzas', icon: FaMoneyBillTrendUp },
      { label: 'Reportes', to: '/panel/reportes', icon: FaChartColumn },
      { label: 'Transparencia', to: '/panel/transparencia', icon: FaDisplay },
      { label: 'Auditoría', to: '/panel/auditoria', icon: FaClipboardCheck },
      { label: 'Noticias', to: '/panel/noticias', icon: FaNewspaper },
      { label: 'Usuarios', to: '/panel/usuarios', icon: FaUserGroup },
      { label: 'Configuración', to: '/panel/configuracion', icon: FaGear },
    ],
  },
]

interface SidebarLinkProps {
  item: NavItem
  onNavigate?: () => void
}

function SidebarLink({ item, onNavigate }: SidebarLinkProps) {
  return (
    <NavLink
      to={item.to}
      end={item.to === '/panel'}
      onClick={onNavigate}
      className="group relative flex h-11 items-center gap-3 px-6 text-sm font-medium transition-colors hover:bg-ink-800/70"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active"
              className="absolute inset-0 bg-[linear-gradient(90deg,#00d9fe_0%,#00d9fe_3.2%,#0052ec_4.5%,#0044b1_18%,#003b98_27%,#003481_36%,#003372_45%,#003067_55%,#003067_100%)]"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <item.icon
            className={cn(
              'relative z-10 text-base transition-colors',
              isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300',
            )}
          />
          <span
            className={cn(
              'relative z-10 transition-colors',
              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200',
            )}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  )
}

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="relative flex h-full w-[232px] flex-col overflow-hidden border-r border-line/70 bg-scrim">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/images/sidebar-bg.png')", backgroundPosition: '82% top' }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-scrim/45" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-scrim via-scrim/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-scrim/85 to-transparent"
      />

      <div className="relative z-10 px-6 pb-4 pt-6">
        <p className="font-display text-[24px] leading-none text-white">
          LPF{' '}
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            STATS
          </span>
        </p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Administrador Oficial LPF
        </p>
      </div>

      <nav className="scrollbar-slim relative z-10 mt-1 flex-1 overflow-y-auto pb-4">
        <ul className="flex flex-col gap-1">
          {navGroups.map((group, index) => (
            <li key={group.label ?? `group-${index}`}>
              {group.label && (
                <p className="mt-2 border-t border-line/60 px-6 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {group.label}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <SidebarLink item={item} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 px-6 pb-6">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Más que fútbol <span className="text-brand-400">es Panamá</span>
        </p>
        <PanamaFlag size={20} className="rounded-[3px] ring-1 ring-white/25" />
      </div>
    </div>
  )
}
