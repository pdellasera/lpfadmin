import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function MicrosoftLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" className={className} aria-hidden="true" fill="none">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}

interface SocialButtonProps {
  icon: ReactNode
  label: string
  className?: string
}

export function SocialButton({ icon, label, className }: SocialButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#4d5e79] bg-[#04101f]/70 text-[14px] font-medium text-white',
        'transition-colors hover:border-brand-500/50 hover:bg-scrim/60',
        className,
      )}
    >
      {icon}
      {label}
    </button>
  )
}
