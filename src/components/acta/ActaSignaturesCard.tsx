import { FaCircleCheck, FaFloppyDisk, FaLock, FaSignature } from 'react-icons/fa6'
import { cn } from '@/lib/cn'
import type { ActaSignature } from '@/types'
import { ActaSectionCard } from './ActaSectionCard'

interface ActaSignaturesCardProps {
  signatures: ActaSignature[]
}

export function ActaSignaturesCard({ signatures }: ActaSignaturesCardProps) {
  return (
    <ActaSectionCard title="Validación y firmas">
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {signatures.map((signature) => (
            <div key={signature.role} className="rounded-lg border border-border-faint bg-surface-sunken p-3">
              <FaSignature className="text-[18px] text-accent" />
              <p className="mt-2 text-[11px] font-semibold leading-tight text-content-primary">{signature.role}</p>
              <p
                className={cn(
                  'mt-0.5 text-[10px] font-semibold',
                  signature.status === 'pendiente' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400',
                )}
              >
                {signature.status === 'pendiente' ? 'Pendiente' : 'Firmado'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-border-faint bg-surface-control px-4 text-[12px] font-semibold text-content-primary transition-colors hover:bg-surface-control-hover"
          >
            <FaFloppyDisk className="text-xs" />
            Guardar borrador
          </button>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg bg-action px-4 text-[12px] font-semibold text-white transition-colors hover:bg-action-hover"
          >
            <FaCircleCheck className="text-xs" />
            Validar acta
          </button>
          <button
            type="button"
            disabled
            className="flex h-9 items-center gap-2 rounded-lg border border-border-faint bg-surface-control px-4 text-[12px] font-semibold text-content-primary/50"
          >
            <FaLock className="text-xs" />
            Cerrar acta
          </button>
        </div>
      </div>
    </ActaSectionCard>
  )
}