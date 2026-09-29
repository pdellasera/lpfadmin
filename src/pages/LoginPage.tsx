import { motion } from 'framer-motion'
import { LoginCard } from '@/components/auth/LoginCard'
import { fadeUp } from '@/lib/motion'

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fondo de referencia (capa a pantalla completa, a prueba de desbordes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/login-bg.png')", backgroundPosition: 'center bottom' }}
      />

      {/* Oscurecimiento global + scrim superior izquierdo (como en la referencia) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-scrim/25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_16%_6%,rgba(2,8,20,0.75),rgba(2,8,20,0.35)_45%,transparent_72%)]"
      />

      {/* Contenido */}
      <div className="relative flex min-h-screen px-6 py-10 lg:px-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="my-auto mx-auto w-full max-w-[542px] lg:ml-[11.7vw] lg:mr-auto"
        >
          <LoginCard />
        </motion.div>
      </div>
    </main>
  )
}
