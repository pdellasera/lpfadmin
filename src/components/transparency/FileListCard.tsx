import { FaDownload } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDocDate } from '@/lib/format'
import { FileTypeBadge } from './FileTypeBadge'
import type { TransparencyFileRow } from '@/types'

interface FileListCardProps {
  title: string
  items: TransparencyFileRow[]
  variant?: 'label' | 'icon'
  onViewAll?: () => void
}

export function FileListCard({ title, items, variant = 'label', onViewAll }: FileListCardProps) {
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">{title}</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300"
        >
          Ver todos
        </button>
      </div>

      <div className="mt-2 flex-1 space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-ink-700/40"
          >
            <FileTypeBadge kind={item.kind} variant={variant} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-content-primary">{item.title}</p>
              <p className="text-[11px] text-content-faint">
                {item.kind.toUpperCase()} · {item.size} · {formatDocDate(item.date)}
              </p>
            </div>
            <Button variant="outline" className="h-8 shrink-0 rounded-lg px-3 text-xs">
              <FaDownload className="text-[11px]" /> Descargar
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
