import { motion } from 'framer-motion'
import { FaCheck, FaCircleInfo, FaRegClock, FaTriangleExclamation } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useHomeEvents } from '@/hooks/useHomeQueries'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'
import type { HomeEventKind } from '@/types'

const KIND_META: Record<HomeEventKind, { icon: IconType; className: string }> = {
  alerta: {
    icon: FaTriangleExclamation,
    className: 'bg-rose-400/15 text-rose-500 ring-rose-400/30 dark:text-rose-300',
  },
  pendiente: {
    icon: FaRegClock,
    className: 'bg-amber-400/15 text-amber-600 ring-amber-400/30 dark:text-amber-300',
  },
  validado: {
    icon: FaCheck,
    className: 'bg-emerald-400/15 text-emerald-600 ring-emerald-400/30 dark:text-emerald-300',
  },
  info: {
    icon: FaCircleInfo,
    className: 'bg-brand-600/15 text-brand-400 ring-brand-600/30',
  },
}

export function EventsInboxCard() {
  const { data: events, isLoading } = useHomeEvents()

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="h-full p-4">
        <SectionHeader
          title="Bandeja de eventos"
          linkLabel="Ver todo"
          linkTo="/panel/auditoria"
        />

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          animate="visible"
          className="mt-3 divide-y divide-line/50"
        >
          {isLoading || !events
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="py-2.5">
                  <Skeleton className="h-14 w-full" />
                </li>
              ))
            : events.map((event) => {
                const meta = KIND_META[event.kind]
                const Icon = meta.icon

                return (
                  <motion.li
                    key={event.id}
                    variants={fadeUp}
                    className="flex items-start gap-3 py-2.5"
                  >
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset',
                        meta.className,
                      )}
                    >
                      <Icon className="text-sm" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold leading-snug text-content-primary">
                        {event.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-content-muted">
                        {event.description}
                      </p>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-content-faint">
                        {event.timeLabel}
                        {event.source && (
                          <span className="text-brand-400"> · {event.source}</span>
                        )}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
        </motion.ul>
      </Card>
    </motion.section>
  )
}
