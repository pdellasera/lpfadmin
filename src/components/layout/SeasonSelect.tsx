import { FaChevronDown } from 'react-icons/fa6'
import { SEASONS, useSeason } from '@/providers/SeasonContext'

export function SeasonSelect() {
  const { season, setSeason } = useSeason()

  return (
    <div className="relative">
      <select
        value={season}
        onChange={(event) => setSeason(event.target.value)}
        aria-label="Temporada"
        className="appearance-none rounded-xl border border-line/70 bg-ink-700/60 py-2 pl-3 pr-8 text-xs font-semibold text-content-secondary focus:border-brand-600 focus:outline-none"
      >
        {SEASONS.map((item) => (
          <option key={item} value={item} className="bg-ink-800">
            Temporada {item}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-content-faint" />
    </div>
  )
}
