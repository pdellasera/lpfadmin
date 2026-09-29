import { FaPaperclip } from 'react-icons/fa6'
import { ActaSectionCard } from './ActaSectionCard'

interface ActaCommissionerNotesCardProps {
  notes: string
}

export function ActaCommissionerNotesCard({ notes }: ActaCommissionerNotesCardProps) {
  return (
    <ActaSectionCard title="Observaciones del comisario" bodyClassName="flex">
      <div className="relative w-full">
        <textarea
          defaultValue={notes}
          placeholder="Ingrese aquí las observaciones del comisario del partido..."
          className="h-full min-h-[96px] w-full resize-none rounded-lg border border-border-faint bg-surface-sunken px-3 py-2 pr-10 text-[12px] leading-relaxed text-content-primary placeholder:text-content-faint focus:border-brand-600 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Adjuntar archivo"
          className="absolute right-2 top-2 rounded-md p-1.5 text-content-muted transition-colors hover:text-content-primary"
        >
          <FaPaperclip className="text-sm" />
        </button>
      </div>
    </ActaSectionCard>
  )
}