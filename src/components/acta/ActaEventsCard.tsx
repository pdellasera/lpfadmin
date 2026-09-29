import { useState } from 'react'
import { FaBriefcaseMedical, FaPlus, FaRightLeft } from 'react-icons/fa6'
import { GiSoccerBall, GiWhistle } from 'react-icons/gi'
import { cn } from '@/lib/cn'
import type { ActaEvent, ActaEventType } from '@/types'
import { ActaSectionCard } from './ActaSectionCard'

type EventFilter = 'todos' | 'gol' | 'tarjetas' | 'sustitucion' | 'lesion'

const TILES: { type: ActaEventType; label: string; sublabel: string }[] = [
  { type: 'gol', label: 'Gol', sublabel: 'Registrar gol' },
  { type: 'amarilla', label: 'Tarjeta amarilla', sublabel: 'Amonestación' },
  { type: 'roja', label: 'Tarjeta roja', sublabel: 'Expulsión' },
  { type: 'sustitucion', label: 'Sustitución', sublabel: 'Cambio de jugador' },
  { type: 'lesion', label: 'Lesión', sublabel: 'Parte médico' },
]

function EventGlyph({ type }: { type: ActaEventType }) {
  switch (type) {
    case 'gol':
      return <GiSoccerBall className="text-[17px] text-accent-glow" />
    case 'amarilla':
      return <span className="h-[16px] w-[11px] rounded-[2px] bg-amber-400 ring-1 ring-amber-300/40" />
    case 'roja':
      return <span className="h-[16px] w-[11px] rounded-[2px] bg-rose-500 ring-1 ring-rose-400/40" />
    case 'sustitucion':
      return <FaRightLeft className="text-[15px] text-emerald-400" />
    case 'lesion':
      return <FaBriefcaseMedical className="text-[15px] text-rose-400" />
  }
}

const EVENT_LABEL: Record<ActaEventType, string> = {
  gol: 'Gol',
  amarilla: 'Tarjeta amarilla',
  roja: 'Tarjeta roja',
  sustitucion: 'Sustitución',
  lesion: 'Lesión',
}

interface ActaEventsCardProps {
  events: ActaEvent[]
  className?: string
}

export function ActaEventsCard({ events, className }: ActaEventsCardProps) {
  const [filter, setFilter] = useState<EventFilter>('todos')

  const count = (predicate: (type: ActaEventType) => boolean) =>
    events.filter((event) => predicate(event.type)).length

  const tabs: { id: EventFilter; label: string }[] = [
    { id: 'todos', label: `Todos (${events.length})` },
    { id: 'gol', label: `Goles (${count((type) => type === 'gol')})` },
    { id: 'tarjetas', label: `Tarjetas (${count((type) => type === 'amarilla' || type === 'roja')})` },
    { id: 'sustitucion', label: `Sustituciones (${count((type) => type === 'sustitucion')})` },
    { id: 'lesion', label: `Lesiones (${count((type) => type === 'lesion')})` },
  ]

  const filtered = events.filter((event) => {
    if (filter === 'todos') return true
    if (filter === 'gol') return event.type === 'gol'
    if (filter === 'tarjetas') return event.type === 'amarilla' || event.type === 'roja'
    if (filter === 'sustitucion') return event.type === 'sustitucion'
    return event.type === 'lesion'
  })

  return (
    <ActaSectionCard
      title="Eventos del partido"
      className={className}
      action={
        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md border border-border-action bg-surface-control px-2.5 text-[11px] font-semibold text-content-primary transition-colors hover:bg-surface-control-hover"
        >
          <FaPlus className="text-[10px]" />
          Agregar evento
        </button>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="grid grid-cols-5 gap-1.5">
          {TILES.map((tile) => (
            <button
              key={tile.type}
              type="button"
              className="flex h-[86px] flex-col items-center justify-center gap-1 rounded-lg border border-overlay-border bg-surface-tile p-1.5 text-center transition-colors hover:border-border-action hover:bg-surface-tile-hover"
            >
              <span className="flex h-7 items-center justify-center">
                <EventGlyph type={tile.type} />
              </span>
              <span className="text-[10px] font-semibold leading-tight text-content-primary">{tile.label}</span>
              <span className="text-[9px] leading-tight text-content-faint">{tile.sublabel}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-0.5 rounded-lg bg-surface-sunken p-0.5 ring-1 ring-border-faint">
          {tabs.map((tab) => {
            const active = tab.id === filter
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={cn(
                  'h-7 flex-1 rounded-md px-1 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
                  active ? 'bg-action text-white' : 'text-content-primary/80 hover:bg-overlay-subtle hover:text-content-primary',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="relative overflow-hidden rounded-xl border border-[#0d2a47]">
            <img
              src="/images/partido-hero.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
            />
            <div className="relative flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
              <GiWhistle className="text-[34px] text-content-faint" />
              <p className="text-[13px] font-semibold text-content-primary">Aún no hay eventos registrados</p>
              <p className="max-w-[240px] text-[11px] leading-relaxed text-content-muted">
                Registra las incidencias del partido con los botones de arriba.
              </p>
            </div>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {filtered.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-2.5 rounded-lg border border-border-faint bg-surface-sunken px-3 py-2"
              >
                <span className="tabular-nums text-[12px] font-bold text-accent">{event.minute}'</span>
                <span className="flex h-6 w-6 items-center justify-center">
                  <EventGlyph type={event.type} />
                </span>
                <span className="truncate text-[12px] font-semibold text-content-primary">
                  {event.player ?? EVENT_LABEL[event.type]}
                </span>
                <span className="ml-auto truncate text-[11px] text-content-faint">{event.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ActaSectionCard>
  )
}