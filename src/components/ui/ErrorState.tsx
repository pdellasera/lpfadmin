import { FaArrowRight } from 'react-icons/fa6'
import { Button } from './Button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = 'No se pudieron cargar los datos.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-line bg-surface-card-solid py-10 text-center">
      <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Reintentar <FaArrowRight className="text-xs" />
        </Button>
      )}
    </div>
  )
}
