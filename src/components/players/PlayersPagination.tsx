import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { cn } from '@/lib/cn'

interface PlayersPaginationProps {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

type PageItem = number | 'ellipsis'

function getPages(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const start = Math.max(1, Math.min(current - 2, total - 4))
  const end = Math.min(total, start + 4)

  const pages: PageItem[] = []
  if (start > 1) pages.push(1)
  if (start > 2) pages.push('ellipsis')
  for (let index = start; index <= end; index += 1) pages.push(index)
  if (end < total - 1) pages.push('ellipsis')
  if (end < total) pages.push(total)

  return pages
}

const PAGE_BUTTON =
  'flex h-[34px] min-w-[34px] items-center justify-center rounded-lg border border-border-faint bg-surface-input px-2 text-xs font-semibold text-content-secondary transition-colors hover:text-content-primary disabled:cursor-not-allowed disabled:opacity-40'

export function PlayersPagination({ page, perPage, total, onPageChange, onPerPageChange }: PlayersPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = total === 0 ? 0 : (page - 1) * perPage + 1
  const end = Math.min(total, page * perPage)
  const pages = getPages(page, totalPages)

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-card border border-border-strong bg-surface-deep px-4 py-3 shadow-card sm:flex-row">
      <p className="text-sm text-content-muted">
        Mostrando <span className="font-semibold text-content-primary">{start}</span> -{' '}
        <span className="font-semibold text-content-primary">{end}</span> de{' '}
        <span className="font-semibold text-content-primary">{total}</span> jugadores
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={PAGE_BUTTON}
        >
          <FaChevronLeft className="text-[10px]" />
        </button>

        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-1 text-xs text-content-faint">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(PAGE_BUTTON, item === page && 'border-transparent bg-action text-white')}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Página siguiente"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={PAGE_BUTTON}
        >
          <FaChevronRight className="text-[10px]" />
        </button>

        <label className="relative ml-1 inline-flex items-center rounded-lg border border-border-faint bg-surface-input">
          <select
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            className="h-[34px] appearance-none bg-transparent pl-3 pr-8 text-xs font-semibold text-content-secondary focus:outline-none"
          >
            <option value={10} className="bg-ink-800">10 por página</option>
            <option value={25} className="bg-ink-800">25 por página</option>
            <option value={50} className="bg-ink-800">50 por página</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute right-2 text-[10px] text-content-faint" />
        </label>
      </div>
    </div>
  )
}
