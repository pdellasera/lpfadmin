import { FaFilePdf, FaFilter, FaPlus } from 'react-icons/fa6'

const OUTLINE_BTN =
  'flex h-11 items-center gap-2 rounded-[10px] border border-border-strong bg-surface-panel px-4 text-sm font-semibold text-content-secondary transition-colors hover:border-content-faint hover:text-content-primary'

export function CalendarToolbar() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[30px] font-bold leading-tight text-content-primary xl:text-[34px]">
          Calendario de competencia
        </h1>
        <p className="mt-1 text-sm text-content-muted">
          Clausura 2026 <span className="mx-0.5">·</span> Fase de semifinales
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" className={OUTLINE_BTN}>
          <FaFilter className="text-xs" />
          Filtros
        </button>
        <button type="button" className={OUTLINE_BTN}>
          <FaFilePdf className="text-xs" />
          Exportar PDF
        </button>
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-[10px] bg-cta-navy px-4 text-sm font-semibold text-white transition-colors hover:brightness-110"
        >
          <FaPlus className="text-xs" />
          Nueva jornada
        </button>
      </div>
    </div>
  )
}
