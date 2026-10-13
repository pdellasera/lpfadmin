import { FaUserCheck } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { LpfPostulante } from '@/types'
import { PostuladosTableRow } from './PostuladosTableRow'

interface PostuladosTableCardProps {
  postulantes: LpfPostulante[]
  total: number
  selectedId: string
  checkedIds: string[]
  onSelect: (id: string) => void
  onToggle: (id: string) => void
  onToggleAll: () => void
  onClearSelection: () => void
}

export function PostuladosTableCard({
  postulantes,
  total,
  selectedId,
  checkedIds,
  onSelect,
  onToggle,
  onToggleAll,
  onClearSelection,
}: PostuladosTableCardProps) {
  const allChecked = postulantes.length > 0 && postulantes.every((postulante) => checkedIds.includes(postulante.id))

  return (
    <Card className="flex min-h-[560px] flex-col overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 px-4 py-3">
        <p className="text-sm font-semibold text-content-primary">
          {total} {total === 1 ? 'postulante encontrado' : 'postulantes encontrados'}
        </p>

        {checkedIds.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600/15 px-2.5 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
              <FaUserCheck className="text-[11px]" />
              {checkedIds.length} seleccionados
            </span>
            <button
              type="button"
              onClick={onClearSelection}
              className="text-xs font-semibold text-content-muted transition-colors hover:text-content-primary"
            >
              Limpiar selección
            </button>
          </div>
        ) : (
          <span className="text-xs text-content-faint">Marca las casillas para acciones en lote</span>
        )}
      </div>

      {postulantes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line/60 bg-surface-raised/40 text-[11px] font-semibold uppercase tracking-wide text-content-faint">
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={onToggleAll}
                    aria-label="Seleccionar todos"
                    className="h-4 w-4 cursor-pointer rounded border-border-faint bg-surface-input accent-brand-600"
                  />
                </th>
                <th className="px-4 py-3">Postulante</th>
                <th className="px-4 py-3">Vacante</th>
                <th className="px-4 py-3">Universidad</th>
                <th className="px-4 py-3">Club</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Postulado</th>
              </tr>
            </thead>
            <tbody>
              {postulantes.map((postulante) => (
                <PostuladosTableRow
                  key={postulante.id}
                  postulante={postulante}
                  selected={postulante.id === selectedId}
                  checked={checkedIds.includes(postulante.id)}
                  onSelect={onSelect}
                  onToggle={onToggle}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4">
          <EmptyState title="No hay postulados que coincidan" description="Prueba con otra combinación de filtros." />
        </div>
      )}
    </Card>
  )
}
