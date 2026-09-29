import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { cn } from '@/lib/cn'

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  type?: 'text' | 'email' | 'password'
}

export function AuthField({ icon, type = 'text', className, ...props }: AuthFieldProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-[26px] top-1/2 -translate-y-1/2 text-[18px] text-white/85">
        {icon}
      </span>
      <input
        type={inputType}
        className={cn(
          'h-[57px] w-full rounded-xl border border-[#53779e] bg-[#0c151f]/70 pl-[56px] text-[15px] text-white placeholder:text-slate-400',
          'transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          isPassword ? 'pr-12' : 'pr-4',
          className,
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          tabIndex={-1}
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[16px] text-slate-400 transition-colors hover:text-white"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  )
}
