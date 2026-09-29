import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import type { ActaStepId } from '@/types'

interface ActaStepDef {
  id: ActaStepId
  label: string
  sublabel: string
}

const STEPS: ActaStepDef[] = [
  { id: 'preparacion', label: 'Preparación', sublabel: 'Datos del partido' },
  { id: 'alineaciones', label: 'Alineaciones', sublabel: 'Titulares y suplentes' },
  { id: 'incidencias', label: 'Incidencias', sublabel: 'Eventos del partido' },
  { id: 'cierre', label: 'Cierre', sublabel: 'Firmas y validación' },
]

const ACTIVE_GRADIENT =
  'bg-[linear-gradient(90deg,#00d9fe_0%,#0178ff_18%,#003b98_60%,#062f6b_100%)]'

interface ActaStepperProps {
  value: ActaStepId
  onChange: (value: ActaStepId) => void
}

export function ActaStepper({ value, onChange }: ActaStepperProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex min-w-0 flex-1 items-center rounded-xl border border-border-faint bg-surface-track p-1">
        {STEPS.map((step, index) => {
          const active = step.id === value
          return (
            <div key={step.id} className="flex min-w-0 flex-1 items-center">
              {index > 0 && (
                <span aria-hidden="true" className="mx-2 h-6 w-px shrink-0 rotate-[14deg] bg-overlay-border" />
              )}
              <button
                type="button"
                onClick={() => onChange(step.id)}
                className={cn(
                  'relative flex h-9 min-w-0 flex-1 items-center gap-2.5 rounded-lg px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
                  active ? 'text-content-primary' : 'text-content-primary/80 hover:bg-overlay-subtle',
                )}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 rounded-lg [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%)]',
                      ACTIVE_GRADIENT,
                    )}
                  />
                )}
                <span className="relative z-10 flex min-w-0 items-center gap-2.5">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                      active
                        ? 'bg-action text-white ring-1 ring-accent-glow/60'
                        : 'bg-surface-control text-content-secondary ring-1 ring-overlay-ring',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className={cn('block truncate text-[13px] font-semibold', active ? 'text-content-primary' : 'text-content-secondary')}>
                      {step.label}
                    </span>
                    <span className={cn('block truncate text-[10px]', active ? 'text-content-secondary' : 'text-content-faint')}>
                      {step.sublabel}
                    </span>
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </div>

      <Link
        to="/panel/partidos"
        className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-border-faint bg-surface-control px-4 text-[13px] font-semibold text-content-primary transition-colors hover:bg-surface-control-hover"
      >
        <FaArrowLeft className="text-xs" />
        Volver a partidos
      </Link>
    </div>
  )
}