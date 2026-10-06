import { useMemo, useState } from 'react'
import { FaCopy, FaMagnifyingGlass } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { SegmentedToggle, type SegmentedOption } from '@/components/ui/SegmentedToggle'
import { ApiMethodBadge } from './ApiMethodBadge'
import type { ApiEndpointGroup, ApiMethod } from '@/types'

type MethodFilter = 'todos' | ApiMethod

const METHOD_OPTIONS: SegmentedOption<MethodFilter>[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'GET', label: 'GET' },
  { id: 'POST', label: 'POST' },
]

export function ApiEndpointsCard({ groups }: { groups: ApiEndpointGroup[] }) {
  const [query, setQuery] = useState('')
  const [method, setMethod] = useState<MethodFilter>('todos')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return groups
      .map((group) => ({
        ...group,
        endpoints: group.endpoints.filter((endpoint) => {
          const matchesMethod = method === 'todos' || endpoint.method === method
          const matchesQuery = !q || `${endpoint.path} ${endpoint.summary}`.toLowerCase().includes(q)
          return matchesMethod && matchesQuery
        }),
      }))
      .filter((group) => group.endpoints.length > 0)
  }, [groups, query, method])

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Referencia de endpoints</h3>
        <SegmentedToggle value={method} onChange={setMethod} options={METHOD_OPTIONS} />
      </div>

      <label className="relative mt-3 block h-[42px] w-full rounded-xl border border-border-faint bg-surface-input transition-colors focus-within:border-brand-600">
        <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-content-faint" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por ruta o descripción..."
          className="h-full w-full bg-transparent pl-9 pr-3 text-sm font-semibold text-content-primary placeholder:text-content-faint focus:outline-none"
        />
      </label>

      <div className="mt-3 flex-1 space-y-4">
        {filtered.length === 0 ? (
          <EmptyState title="Sin resultados" description="No hay endpoints que coincidan con la búsqueda." icon={<FaMagnifyingGlass />} />
        ) : (
          filtered.map((group) => (
            <div key={group.id}>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-content-muted">{group.label}</p>
              <div className="overflow-hidden rounded-xl border border-line/60">
                {group.endpoints.map((endpoint, index) => (
                  <div
                    key={endpoint.id}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-ink-700/40 ${index > 0 ? 'border-t border-line/50' : ''}`}
                  >
                    <ApiMethodBadge method={endpoint.method} />
                    <code className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-content-primary">
                      {endpoint.path}
                    </code>
                    <span className="hidden min-w-0 flex-1 truncate text-xs text-content-muted md:block">{endpoint.summary}</span>
                    <button
                      type="button"
                      aria-label="Copiar ruta"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-faint bg-surface-input text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
                    >
                      <FaCopy className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
