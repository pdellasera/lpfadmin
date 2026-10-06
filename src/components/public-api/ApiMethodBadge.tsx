import { cn } from '@/lib/cn'
import type { ApiMethod } from '@/types'

const STYLES: Record<ApiMethod, string> = {
  GET: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
  POST: 'bg-brand-600/15 text-brand-600 ring-brand-600/30 dark:text-brand-300',
}

export function ApiMethodBadge({ method }: { method: ApiMethod }) {
  return (
    <span
      className={cn(
        'inline-flex w-12 shrink-0 justify-center rounded-md px-1 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset',
        STYLES[method],
      )}
    >
      {method}
    </span>
  )
}
