import { useState } from 'react'
import { cn } from '@/lib/cn'

const STAR = 'M0,-5 L1.2,-1.5 L5,-1.5 L1.9,0.6 L3.1,4.1 L0,2 L-3.1,4.1 L-1.9,0.6 L-5,-1.5 L-1.2,-1.5 Z'

interface PanamaCrestProps {
  className?: string
}

/**
 * Escudo Nacional de Panamá para el encabezado del informe. Intenta cargar
 * `escudo-panama.png` y, si no existe, dibuja un blasón estilizado en SVG
 * (monocromo, acorde al formulario impreso).
 */
export function PanamaCrest({ className }: PanamaCrestProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/images/escudo-panama.png"
        alt="Escudo de Panamá"
        width={72}
        height={86}
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('object-contain', className)}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 60 78"
      role="img"
      aria-label="Escudo de Panamá"
      className={cn('text-black', className)}
    >
      {/* Cinta superior con el nombre del país */}
      <path d="M6 10 Q30 2 54 10 L51.5 18 Q30 12 8.5 18 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="30"
        y="15.5"
        textAnchor="middle"
        fontSize="6.4"
        fontWeight="800"
        letterSpacing="1.4"
        fill="currentColor"
        fontFamily="inherit"
      >
        PANAMÁ
      </text>
      {/* Blasón con cuarteles y estrellas */}
      <path d="M10 20 H50 V50 Q50 72 30 76 Q10 72 10 50 Z" fill="#ffffff" stroke="currentColor" strokeWidth="1.8" />
      <path d={STAR} transform="translate(20 27.5) scale(0.9)" fill="currentColor" />
      <path d={STAR} transform="translate(40 42.5) scale(0.9)" fill="currentColor" />
    </svg>
  )
}
