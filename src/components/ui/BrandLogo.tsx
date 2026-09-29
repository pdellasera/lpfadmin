import { cn } from '@/lib/cn'

interface BrandLogoProps {
  className?: string
}

/**
 * Logotipo tipográfico "LPF STATS — Administrador Oficial LPF".
 */
export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-2.5', className)}
      role="img"
      aria-label="LPF STATS — Administrador Oficial LPF"
    >
      <p className="font-display text-[40px] leading-none text-white">
        LPF{' '}
        <span className="bg-gradient-to-r from-brand-300 to-brand-600 bg-clip-text text-transparent">
          STATS
        </span>
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Administrador Oficial LPF
      </p>
    </div>
  )
}
