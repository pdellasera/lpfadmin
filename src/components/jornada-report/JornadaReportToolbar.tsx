import { FaArrowLeft, FaDownload, FaUpRightFromSquare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { JORNADA_REPORTE_PDF_URL } from '@/lib/jornadaReportPdf'

const baseLink =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200'

const primaryLink = `${baseLink} bg-brand-600 text-white shadow-glow hover:bg-brand-500`
const outlineLink =
  `${baseLink} border border-line bg-transparent text-content-secondary hover:border-brand-600/60 hover:text-content-primary`

export function JornadaReportToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link to="/panel/reportes" className={outlineLink}>
        <FaArrowLeft className="text-xs" /> Volver a reportes
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <a href={JORNADA_REPORTE_PDF_URL} download="Reporte de Estadisticas LPF_SV_TC2026.pdf" className={outlineLink}>
          <FaDownload /> Descargar PDF
        </a>
        <a href={JORNADA_REPORTE_PDF_URL} target="_blank" rel="noreferrer" className={primaryLink}>
          <FaUpRightFromSquare /> Abrir PDF
        </a>
      </div>
    </div>
  )
}
