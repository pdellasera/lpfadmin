import { JORNADA_REPORTE_PDF_URL } from '@/lib/jornadaReportPdf'

export function ReportePdfViewer() {
  return (
    <div className="overflow-hidden rounded-card border border-line/60 bg-white shadow-card">
      <iframe
        src={JORNADA_REPORTE_PDF_URL}
        title="Reporte de estadísticas — Resumen de jornada"
        className="block h-[80vh] min-h-[600px] w-full"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 bg-surface-card-solid px-4 py-3 text-sm">
        <span className="text-content-muted">Si el PDF no carga, ábrelo directamente:</span>
        <a
          href={JORNADA_REPORTE_PDF_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-brand-400 transition-colors hover:text-brand-300"
        >
          Abrir PDF en una pestaña
        </a>
      </div>
    </div>
  )
}
