import { FaEllipsisVertical, FaEye } from 'react-icons/fa6'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { TeamCrest } from '@/components/ui/TeamCrest'
import { formatDocDate } from '@/lib/format'
import type { LpfPostulante } from '@/types'
import { PostuladosEstadoBadge } from './PostuladosEstadoBadge'
import { UniversityCrest } from './UniversityCrest'

interface PostuladosRecientesCardProps {
  postulados: LpfPostulante[]
}

export function PostuladosRecientesCard({ postulados }: PostuladosRecientesCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line/60 px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Postulados recientes</h3>
            <p className="mt-0.5 text-xs text-content-faint">Últimas aplicaciones a vacantes de pasantías</p>
          </div>
          <button type="button" className="text-xs font-medium text-brand-400 transition-colors hover:text-brand-300">
            Ver todos
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line/60 text-[11px] font-semibold uppercase tracking-wide text-content-faint">
              <th className="px-4 py-2.5">Candidato</th>
              <th className="px-4 py-2.5">Universidad</th>
              <th className="px-4 py-2.5">Vacante</th>
              <th className="px-4 py-2.5">Club</th>
              <th className="px-4 py-2.5">Fecha</th>
              <th className="px-4 py-2.5">Estado</th>
              <th className="px-4 py-2.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {postulados.map((postulante) => (
              <tr key={postulante.id} className="border-b border-line/40 last:border-b-0 hover:bg-overlay-subtle">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={postulante.name} color={postulante.university.color} size={34} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-content-primary">{postulante.name}</p>
                      <p className="truncate text-xs text-content-faint">{postulante.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UniversityCrest university={postulante.university} size={24} rounded="md" />
                    <span className="whitespace-nowrap text-content-secondary">{postulante.university.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-content-secondary">{postulante.vacante}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TeamCrest club={postulante.club} size={22} />
                    <span className="whitespace-nowrap text-content-secondary">{postulante.club.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-content-secondary">{formatDocDate(postulante.date)}</td>
                <td className="px-4 py-3">
                  <PostuladosEstadoBadge state={postulante.state} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-raised hover:text-content-primary"
                      aria-label="Ver detalle"
                    >
                      <FaEye className="text-sm" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-content-faint transition-colors hover:bg-surface-raised hover:text-content-primary"
                      aria-label="Más opciones"
                    >
                      <FaEllipsisVertical className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
