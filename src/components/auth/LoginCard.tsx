import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { delay } from '@/api/client'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { AuthField } from './AuthField'
import { MicrosoftLogo, SocialButton } from './SocialButton'

export function LoginCard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('lpf@lpf.com')
  const [password, setPassword] = useState('lpf2026')
  const [remember, setRemember] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    await delay(null, 700)
    navigate('/panel')
  }

  return (
    <section className="relative w-full rounded-[14px] border border-[#0189eb]/50 bg-[linear-gradient(180deg,rgba(2,10,22,0.92),rgba(5,20,40,0.88))] px-12 pt-[35px] pb-[39px] shadow-[0_0_60px_-15px_rgba(1,137,235,0.55)] backdrop-blur-md">
      <BrandLogo />

      <div className="mt-[45px] pl-[30px]">
        <h1 className="text-[30px] font-bold leading-none tracking-tight text-white">
          INICIA SESIÓN
        </h1>
        <p className="mt-[10px] text-[16px] leading-[1.45] text-[#8ea1ba]">
          Accede a la plataforma oficial
          <br />
          de la Liga Panameña de Fútbol
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-[27px] space-y-[16px]">
        <AuthField
          type="email"
          icon={<FaEnvelope />}
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <AuthField
          type="password"
          icon={<FaLock />}
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between pt-[3px]">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="peer sr-only"
            />
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] border border-brand-400/70 bg-brand-600 text-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/40">
              <FaCheck className="text-[11px]" />
            </span>
            <span className="text-[14px] text-slate-300">Recordarme</span>
          </label>
          <a href="#" className="text-[14px] font-medium text-[#00e9ff] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="relative flex h-[60px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#0a6cff] to-[#00a5f4] text-[16px] font-semibold text-white shadow-glow transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <FaSpinner className="animate-spin text-lg" />
          ) : (
            <>
              Iniciar sesión
              <FaArrowRight className="absolute right-[30px] text-[15px]" />
            </>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-[13px] text-[#8ea1ba]">
        Cuenta demo: <span className="font-semibold text-[#00c8f5]">lpf@lpf.com</span> ·{' '}
        <span className="font-semibold text-[#00c8f5]">lpf2026</span>
      </p>

      <div className="mt-[22px] flex items-center gap-3">
        <span className="h-px flex-1 bg-line/70" />
        <span className="text-[13px] text-[#6b7790]">o ingresa con</span>
        <span className="h-px flex-1 bg-line/70" />
      </div>

      <div className="mt-[22px] grid grid-cols-2 gap-[20px]">
        <SocialButton icon={<FcGoogle className="text-[20px]" />} label="Google" />
        <SocialButton
          icon={<MicrosoftLogo className="h-[20px] w-[20px]" />}
          label="Microsoft"
        />
      </div>

      <p className="mt-[31px] text-center text-[14px] text-[#8ea1ba]">
        ¿No tienes una cuenta?{' '}
        <a href="#" className="font-semibold text-[#00c8f5] hover:underline">
          Contacta al administrador
        </a>
      </p>
    </section>
  )
}
