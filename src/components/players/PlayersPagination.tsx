import { TablePagination } from '@/components/ui/TablePagination'

interface PlayersPaginationProps {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

export function PlayersPagination(props: PlayersPaginationProps) {
  return <TablePagination {...props} itemLabel="jugadores" />
}

