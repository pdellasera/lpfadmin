import type { IconType } from 'react-icons'
import { FaBookOpen, FaClockRotateLeft, FaCode, FaFileLines, FaServer } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import type { ApiResource, ApiResourceKind } from '@/types'

const RESOURCE_ICONS: Record<ApiResourceKind, IconType> = {
  docs: FaBookOpen,
  openapi: FaFileLines,
  changelog: FaClockRotateLeft,
  sdk: FaCode,
  status: FaServer,
}

export function ApiResourcesCard({ resources }: { resources: ApiResource[] }) {
  return (
    <Card className="flex h-full flex-col p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Recursos</h3>
      <div className="mt-2 flex-1 space-y-1">
        {resources.map((resource) => {
          const Icon = RESOURCE_ICONS[resource.kind]
          return (
            <a
              key={resource.id}
              href={resource.href}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-ink-700/40"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-brand-300 ring-1 ring-brand-600/30">
                <Icon className="text-sm" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-content-primary">{resource.title}</p>
                <p className="truncate text-[11px] text-content-faint">{resource.description}</p>
              </div>
            </a>
          )
        })}
      </div>
    </Card>
  )
}
