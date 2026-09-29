import { motion } from 'framer-motion'
import { FaArrowRight, FaNewspaper } from 'react-icons/fa6'
import { useNews } from '@/hooks/useHomeQueries'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatFullDate } from '@/lib/format'
import { fadeUp, stagger } from '@/lib/motion'

export function NewsHighlights() {
  const { data: items, isLoading } = useNews()

  const featured = items?.find((item) => item.featured)
  const others = items?.filter((item) => !item.featured) ?? []

  return (
    <motion.section variants={fadeUp} initial="hidden" animate="visible">
      <Card className="h-full p-4">
        <SectionHeader
          title="Noticias y destacados"
          icon={<FaNewspaper />}
          linkLabel="Ver todas"
          linkTo="/panel/noticias"
        />

        {isLoading || !items ? (
          <div className="mt-3 space-y-3">
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="visible"
            className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
          >
            {featured && (
              <motion.article
                variants={fadeUp}
                className="group relative min-h-[150px] cursor-pointer overflow-hidden rounded-xl border border-line"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-scrim/85 to-scrim/70 transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <Badge tone="brand">{featured.tag}</Badge>
                  <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base">
                    {featured.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-400">{formatFullDate(featured.date)}</p>
                </div>
              </motion.article>
            )}

            <div className="flex flex-col divide-y divide-line/50 overflow-hidden rounded-xl border border-line">
              {others.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  className="group flex flex-1 cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-ink-700/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-700 text-brand-400">
                    <FaNewspaper />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                      {item.tag}
                    </p>
                    <h4 className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-content-primary">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-content-faint">{formatFullDate(item.date)}</p>
                  </div>
                  <FaArrowRight className="shrink-0 text-xs text-content-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-400" />
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.section>
  )
}
