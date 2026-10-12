import { FaChevronDown } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { LpfVacante } from '@/types'
import { VacanteListItem } from './VacanteListItem'

export type VacanteSort = 'recientes' | 'antiguas' | 'postulaciones'

interface VacanteListCardProps {
  vacantes: LpfVacante[]
  count: number
  selectedId: string
  sort: VacanteSort
  onSortChange: (sort: VacanteSort) => void
  onSelect: (id: string) => void
}

export function VacanteListCard({
  vacantes,
  count,
  selectedId,
  sort,
  onSortChange,
  onSelect,
}: VacanteListCardProps) {
  return (
    <Card className="flex min-h-[560px] flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-3">
        <p className="text-sm font-semibold text-content-primary">
          {count} {count === 1 ? 'vacante encontrada' : 'vacantes encontradas'}
        </p>
        <label className="relative">
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as VacanteSort)}
            className="appearance-none rounded-lg border border-border-faint bg-surface-input py-1.5 pl-3 pr-8 text-xs font-semibold text-content-secondary transition-colors focus:border-brand-600 focus:outline-none"
          >
            <option value="recientes">Más recientes</option>
            <option value="antiguas">Más antiguas</option>
            <option value="postulaciones">Más postulaciones</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-content-faint" />
        </label>
      </div>

      {vacantes.length > 0 ? (
        <div className="space-y-2 p-3">
          {vacantes.map((vacante) => (
            <VacanteListItem
              key={vacante.id}
              vacante={vacante}
              selected={vacante.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <EmptyState title="No hay vacantes que coincidan" description="Prueba con otra combinación de filtros." />
        </div>
      )}
    </Card>
  )
}
