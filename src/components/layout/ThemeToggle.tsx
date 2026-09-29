import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCheck, FaCircleHalfStroke, FaMoon, FaSun } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import { useTheme } from '@/providers/ThemeContext'
import type { ThemePreference } from '@/providers/ThemeContext'

interface Option {
  id: ThemePreference
  label: string
  icon: typeof FaSun
}

const OPTIONS: Option[] = [
  { id: 'light', label: 'Claro', icon: FaSun },
  { id: 'dark', label: 'Oscuro', icon: FaMoon },
  { id: 'system', label: 'Sistema', icon: FaCircleHalfStroke },
]

export function ThemeToggle() {
  const { preference, resolvedTheme, setPreference } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const ActiveIcon = resolvedTheme === 'light' ? FaSun : FaMoon

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Cambiar tema"
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative rounded-xl p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70"
      >
        <ActiveIcon className="text-lg" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            role="menu"
            aria-label="Tema"
            className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-line/70 bg-surface-panel p-1.5 shadow-card backdrop-blur-md"
          >
            {OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="menuitemradio"
                aria-checked={preference === id}
                onClick={() => {
                  setPreference(id)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  preference === id
                    ? 'text-accent'
                    : 'text-content-secondary hover:bg-surface-raised hover:text-content-primary',
                )}
              >
                <Icon className="text-base" />
                <span className="flex-1 text-left">{label}</span>
                {preference === id && <FaCheck className="text-xs" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
