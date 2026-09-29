import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import type { TransparencyTabId } from '@/types'

const TABS: { id: TransparencyTabId; label: string }[] = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'ingresos', label: 'Ingresos' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'informes', label: 'Informes' },
  { id: 'integracion-sap', label: 'Integración SAP' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'indicadores', label: 'Indicadores' },
]

interface TransparencyTabsProps {
  value: TransparencyTabId
  onChange: (value: TransparencyTabId) => void
}

export function TransparencyTabs({ value, onChange }: TransparencyTabsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = TABS.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      onChange(TABS[nextIndex].id)
      const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      buttons?.[nextIndex]?.focus()
    }
  }

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Secciones de Transparencia"
      className="scrollbar-slim -mb-px flex items-center gap-0.5 overflow-x-auto border-b border-line/60"
    >
      {TABS.map((tab, index) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              'relative whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
              active ? 'text-content-primary' : 'text-content-muted hover:text-content-secondary',
            )}
          >
            {tab.label}
            {active && (
              <motion.span
                layoutId="transparency-tab-indicator"
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand-500"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
