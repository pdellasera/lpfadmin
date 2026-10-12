import { FaGraduationCap } from 'react-icons/fa6'

export function VacanteTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-brand-600/15 px-2 py-0.5 text-[11px] font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/30 dark:text-brand-300">
      <FaGraduationCap className="text-[9px]" />
      {type}
    </span>
  )
}
