import { FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-400">En construcción</p>
      <h1 className="text-2xl font-bold text-content-primary">{title}</h1>
      <p className="max-w-md text-sm text-content-faint">
        Esta sección estará disponible próximamente. Vuelve al panel de inicio para ver los datos
        del torneo.
      </p>
      <Link
        to="/panel"
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
      >
        <FaHouse /> Volver al inicio
      </Link>
    </Card>
  )
}
