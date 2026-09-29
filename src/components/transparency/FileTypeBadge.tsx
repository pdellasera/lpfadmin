import { FaFileExcel, FaFilePdf } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import type { FileKind } from '@/types'

interface FileTypeBadgeProps {
  kind: FileKind
  variant?: 'label' | 'icon'
}

export function FileTypeBadge({ kind, variant = 'label' }: FileTypeBadgeProps) {
  if (variant === 'icon') {
    const Icon = kind === 'pdf' ? FaFilePdf : FaFileExcel
    return (
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ring-1',
          kind === 'pdf'
            ? 'bg-rose-500/15 text-rose-500 ring-rose-500/30 dark:text-rose-300'
            : 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
        )}
      >
        <Icon />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[9px] font-extrabold tracking-tight text-white',
        kind === 'pdf'
          ? 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-[0_6px_16px_-8px_rgba(244,63,94,0.7)]'
          : 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_6px_16px_-8px_rgba(16,185,129,0.7)]',
      )}
    >
      {kind === 'pdf' ? 'PDF' : 'XLSX'}
    </span>
  )
}
