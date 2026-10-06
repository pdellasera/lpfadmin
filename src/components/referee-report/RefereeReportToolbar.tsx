import { FaArrowLeft, FaPrint } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function RefereeReportToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        to="/panel/partidos"
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-transparent px-4 py-2.5 text-sm font-semibold text-content-secondary transition-colors hover:border-brand-600/60 hover:text-content-primary"
      >
        <FaArrowLeft className="text-xs" /> Volver a partidos
      </Link>
      <Button onClick={() => window.print()}>
        <FaPrint /> Imprimir / Guardar PDF
      </Button>
    </div>
  )
}
