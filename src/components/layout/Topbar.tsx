import { FaBell, FaChevronDown, FaMagnifyingGlass } from 'react-icons/fa6'
import { Avatar } from '@/components/ui/Avatar'
import { useTheme } from '@/providers/ThemeContext'
import { SeasonSelect } from './SeasonSelect'
import { ThemeToggle } from './ThemeToggle'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { resolvedTheme } = useTheme()

  return (
    <header className="relative z-20 flex h-20 shrink-0 items-center gap-3 border-b border-line/70 bg-ink-900/80 px-4 backdrop-blur-md dark:bg-[#00142e] lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-content-secondary hover:bg-surface-raised lg:hidden"
        aria-label="Abrir menú"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5">
        <img src={resolvedTheme === 'dark' ? '/images/lpf-logo-dark.png' : '/images/lpf-logo.png'} alt="Liga Panameña de Fútbol" className="h-16 w-auto rounded-md" />
      </div>

      <div className="relative ml-auto hidden w-full max-w-sm md:block">
        <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-faint" />
        <input
          type="search"
          placeholder="Buscar jugadores, equipos, partidos..."
          className="w-full rounded-xl border border-line/70 bg-ink-700/60 py-2 pl-9 pr-3 text-sm text-content-primary placeholder:text-content-faint focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <SeasonSelect />
        <ThemeToggle />
        <button
          type="button"
          className="relative rounded-xl p-2 text-content-secondary hover:bg-surface-raised"
          aria-label="Notificaciones"
        >
          <FaBell className="text-lg" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-ink-800"
          aria-label="Cuenta de administrador"
        >
          <Avatar name="Administrador" size={34} />
          <div className="hidden text-left leading-tight lg:block">
            <p className="text-xs font-semibold text-content-primary">Administrador</p>
          </div>
          <FaChevronDown className="hidden text-[10px] text-content-faint lg:block" />
        </button>
      </div>
    </header>
  )
}
