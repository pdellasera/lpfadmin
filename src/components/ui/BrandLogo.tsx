import { useState } from 'react'
import { cn } from '@/lib/cn'

interface BrandLogoProps {
  className?: string
}

/**
 * Logotipo "LPF STATS — Administrador Oficial LPF". Se renderiza con
 * `mix-blend-screen` para que el fondo oscuro del recorte desaparezca sobre la
 * tarjeta. Incluye un fallback tipográfico si la imagen no está disponible.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/images/gamegate-logo.png"
        alt="LPF STATS — Administrador Oficial LPF"
        width={362}
        height={193}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className={cn('mx-auto w-[362px] select-none mix-blend-screen', className)}
      />
    )
  }

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
