import type { ReportGroup } from '@/types'
import { ReportCard } from './ReportCard'

interface ReportsGroupSectionProps {
  group: ReportGroup
}

export function ReportsGroupSection({ group }: ReportsGroupSectionProps) {
  return (
    <section>
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-content-muted">
        {group.label}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {group.items.map((item) => (
          <ReportCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}