import { motion } from 'framer-motion'
import { FaKey, FaUpRightFromSquare } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { SegmentedToggle, type SegmentedOption } from '@/components/ui/SegmentedToggle'
import { Breadcrumb } from '@/components/transparency/Breadcrumb'
import { fadeUp, stagger } from '@/lib/motion'
import { ApiStatusBadge, type ApiStatusTone } from './ApiStatusBadge'
import type { ApiEnvironment, ApiServiceStatus } from '@/types'

const ENV_OPTIONS: SegmentedOption<ApiEnvironment>[] = [
  { id: 'produccion', label: 'Producción' },
  { id: 'sandbox', label: 'Sandbox' },
]

const STATUS_LABEL: Record<ApiServiceStatus, string> = {
  operativa: 'Operativa',
  degradada: 'Degradada',
  mantenimiento: 'Mantenimiento',
}

const STATUS_TONE: Record<ApiServiceStatus, ApiStatusTone> = {
  operativa: 'success',
  degradada: 'warning',
  mantenimiento: 'neutral',
}

interface PublicApiHeroProps {
  environment: ApiEnvironment
  onEnvironmentChange: (environment: ApiEnvironment) => void
  status: ApiServiceStatus
  version: string
  baseUrl: string
}

export function PublicApiHero({ environment, onEnvironmentChange, status, version, baseUrl }: PublicApiHeroProps) {
  return (
    <motion.section
      variants={stagger(0.08)}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-brand-700/15 blur-3xl"
      />

      <div className="relative">
        <motion.div variants={fadeUp}>
          <Breadcrumb items={['Inicio', 'API pública']} />
        </motion.div>

        <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <motion.h1
              variants={fadeUp}
              className="bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text font-display text-4xl leading-[0.95] text-transparent dark:from-white dark:to-slate-300 sm:text-5xl xl:text-[3.5rem]"
            >
              API PÚBLICA
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-2 max-w-xl text-sm text-content-secondary sm:text-base">
              Datos oficiales de la LPF para clubes, medios y desarrolladores · {version}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-end gap-2.5">
            <SegmentedToggle label="Entorno" value={environment} onChange={onEnvironmentChange} options={ENV_OPTIONS} />
            <Button variant="outline" className="h-[42px]">
              <FaUpRightFromSquare /> Ver documentación
            </Button>
            <Button className="h-[42px]">
              <FaKey /> Crear llave
            </Button>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-3">
          <ApiStatusBadge label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          <span className="font-mono text-[13px] text-content-muted">{baseUrl}</span>
        </motion.div>
      </div>
    </motion.section>
  )
}
