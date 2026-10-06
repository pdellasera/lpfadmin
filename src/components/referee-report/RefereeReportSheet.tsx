import { useLayoutEffect, useRef, useState } from 'react'
import type { RefereeGoalRow, RefereePenaltyKick, RefereeReport, RefereeSubRow } from '@/types'
import { PanamaCrest } from './PanamaCrest'

const TH = 'border border-black px-1.5 py-1 text-left text-[8px] font-bold uppercase tracking-wider'
const TD = 'border border-black px-1.5 py-0.5 text-[10px] leading-tight'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide">{label}:</span>
      <span className="min-w-0 flex-1 border-b border-black pb-px text-[11px] font-semibold leading-tight">
        {value}
      </span>
    </div>
  )
}

function FieldPair({
  a,
  b,
}: {
  a: { label: string; value: string }
  b: { label: string; value: string }
}) {
  return (
    <div className="grid grid-cols-2 gap-x-6">
      <Field label={a.label} value={a.value} />
      <Field label={b.label} value={b.value} />
    </div>
  )
}

function GoalsTable({ team, goals }: { team: string; goals: RefereeGoalRow[] }) {
  const rows: RefereeGoalRow[] = [...goals]
  while (rows.length < 10) rows.push({ number: '', player: '', penalty: false, ownGoal: false, minute: null })

  return (
    <div>
      <div className="mb-1 text-center">
        <p className="text-[11px] font-bold uppercase leading-tight tracking-wide">{team}</p>
        <p className="text-[11px] font-bold uppercase leading-tight tracking-wide">Goles</p>
      </div>
      <table className="w-full border-collapse text-black">
        <thead>
          <tr>
            <th className={TH}>Nº</th>
            <th className={TH}>Jugador</th>
            <th className={`${TH} text-center`}>P</th>
            <th className={`${TH} text-center`}>AO</th>
            <th className={`${TH} text-center`}>Min</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((goal, index) => (
            <tr key={index}>
              <td className={`${TD} text-center`}>{goal.number}</td>
              <td className={TD}>{goal.player}</td>
              <td className={`${TD} text-center`}>{goal.penalty ? 'X' : ''}</td>
              <td className={`${TD} text-center`}>{goal.ownGoal ? 'X' : ''}</td>
              <td className={`${TD} text-center tabular-nums`}>{goal.minute ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PenaltyKicks({ kicks }: { kicks: RefereePenaltyKick[] }) {
  const slots: (RefereePenaltyKick | undefined)[] = Array.from({ length: 10 }, (_, index) => kicks[index])

  return (
    <table className="w-full border-collapse text-black">
      <tbody>
        <tr>
          <th className={`${TH} w-8`}>Nº</th>
          {slots.map((kick, index) => (
            <td key={index} className={`${TD} h-5 text-center`}>
              {kick?.number ?? ''}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`${TH} w-8`}>x / 0</th>
          {slots.map((kick, index) => (
            <td key={index} className={`${TD} h-5 text-center`}>
              {kick ? (kick.scored ? 'x' : '0') : ''}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

function SubsTable({ subs }: { subs: RefereeSubRow[] }) {
  const rows: RefereeSubRow[] = [...subs]
  while (rows.length < 5) rows.push({ minute: null, outNumber: '', outPlayer: '', inNumber: '', inPlayer: '' })

  return (
    <div>
      <p className="mb-1 text-center text-[11px] font-bold uppercase leading-tight tracking-wide">Sustituciones</p>
      <table className="w-full border-collapse text-black">
        <thead>
          <tr>
            <th className={`${TH} text-center`}>Min</th>
            <th className={`${TH} text-center`}>Nº</th>
            <th className={TH}>Jugador-Sale</th>
            <th className={`${TH} text-center`}>Nº</th>
            <th className={TH}>Jugador-Entra</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((sub, index) => (
            <tr key={index}>
              <td className={`${TD} text-center tabular-nums`}>{sub.minute ?? ''}</td>
              <td className={`${TD} text-center`}>{sub.outNumber}</td>
              <td className={TD}>{sub.outPlayer}</td>
              <td className={`${TD} text-center`}>{sub.inNumber}</td>
              <td className={TD}>{sub.inPlayer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Incidents({ incidents }: { incidents: string[] }) {
  const lines = [...incidents]
  while (lines.length < 5) lines.push('')

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide">Incidentes del partido:</p>
      <div className="mt-1">
        {lines.map((line, index) => (
          <div key={index} className="flex min-h-[18px] items-center border-b border-black">
            <span className="text-[10px] leading-tight">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SheetHeader() {
  return (
    <header className="flex items-start justify-between gap-6">
      <img src="/images/lpf-logo.png" alt="Liga Panameña de Fútbol" className="h-12 w-auto" />
      <h1 className="pt-1 text-center text-[22px] font-extrabold uppercase leading-none tracking-[0.08em]">
        Informe del Árbitro
      </h1>
      <PanamaCrest className="h-14 w-auto" />
    </header>
  )
}

export function RefereeReportSheet({ report }: { report: RefereeReport }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const compute = () => {
      const contentW = content.scrollWidth
      const contentH = content.scrollHeight
      const availW = container.clientWidth
      const availH = container.clientHeight
      if (!contentW || !contentH || !availW || !availH) return
      setScale(Math.min(availW / contentW, availH / contentH))
    }

    compute()
    const observer = new ResizeObserver(compute)
    observer.observe(content)
    window.addEventListener('resize', compute)
    document.fonts?.ready.then(compute).catch(() => {})
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [report])

  return (
    <div
      ref={containerRef}
      className="report-sheet mx-auto my-6 h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl ring-1 ring-black/10"
    >
      <div
        ref={contentRef}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        className="w-[210mm] bg-white px-10 py-8 text-black"
      >
        <SheetHeader />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wide">Número de Juego:</span>
          <span className="inline-flex min-w-[180px] items-center justify-center border border-black px-2 py-0.5 text-[11px] font-bold">
            {report.gameNumber}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wide">Jornada Nº:</span>
          <span className="inline-flex min-w-[48px] items-center justify-center border border-black px-2 py-0.5 text-[11px] font-bold">
            {report.round}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-wide">Equipo A</p>
        <p className="text-center text-[11px] font-bold uppercase tracking-wide">Equipo B</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2">
        <div className="space-y-2">
          <Field label="Jugado en" value={report.playedAt} />
          <Field label="Estadio" value={report.stadium} />
          <Field
            label="Resultado"
            value={`${report.home.name} ${report.scoreHome} — ${report.scoreAway} ${report.away.name}`}
          />
          <Field label="Resultado Medio Tiempo" value={`${report.halfTimeHome} — ${report.halfTimeAway}`} />
          <FieldPair
            a={{ label: 'Árbitro', value: report.officials.referee }}
            b={{ label: 'Asistente Nº 1', value: report.officials.assistant1 }}
          />
          <FieldPair
            a={{ label: 'Cuarto Árbitro', value: report.officials.fourthOfficial }}
            b={{ label: 'Asesor', value: report.officials.assessor }}
          />
        </div>
        <div className="space-y-2">
          <Field label="Fecha" value={report.date} />
          <Field label="Hora" value={report.time} />
          <Field label="A favor de" value={report.firstHalfWinner} />
          <Field label="A favor de" value={report.fullTimeWinner} />
          <Field label="Asistente Nº 2" value={report.officials.assistant2} />
          <Field label="Comisario" value={report.officials.commissioner} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-8">
        <GoalsTable team={report.home.name} goals={report.goalsHome} />
        <GoalsTable team={report.away.name} goals={report.goalsAway} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-8">
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wide">
            Tiros desde el punto penal x=Gol / 0=no anota
          </p>
          <PenaltyKicks kicks={report.penaltiesHome} />
        </div>
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wide">
            Tiros desde el punto penal x=Gol / 0=no anota
          </p>
          <PenaltyKicks kicks={report.penaltiesAway} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-8">
        <SubsTable subs={report.subsHome} />
        <SubsTable subs={report.subsAway} />
      </div>

      <div className="mt-5">
        <Incidents incidents={report.incidents} />
      </div>

        <footer className="mt-6 border-t border-black pt-2 text-center text-[10px] font-semibold uppercase tracking-wide">
          Página 1
        </footer>
      </div>
    </div>
  )
}

