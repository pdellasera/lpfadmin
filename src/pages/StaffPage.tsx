import { useMemo, useState } from 'react'
import { StaffHero } from '@/components/staff/StaffHero'
import { StaffTable } from '@/components/staff/StaffTable'
import { StaffToolbar } from '@/components/staff/StaffToolbar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { TablePagination } from '@/components/ui/TablePagination'
import { useStaff, useStaffFilters } from '@/hooks/useStaffQueries'
import { STAFF_ROLE_GROUP, STAFF_ROLE_LABEL } from '@/lib/staff'
import type { StaffFilters, StaffRoleCounts, StaffRoleGroupId } from '@/types'

const EMPTY_FILTERS: StaffFilters = { club: 'todos', role: 'todos', status: 'todos', search: '' }

const FALLBACK_COUNTS: StaffRoleCounts = { total: 63, tecnico: 32, medico: 17, administrativo: 14 }

export default function StaffPage() {
  const [tab, setTab] = useState<StaffRoleGroupId>('todos')
  const [applied, setApplied] = useState<StaffFilters>(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { data: staff, isLoading } = useStaff()
  const { data: options, isLoading: optionsLoading } = useStaffFilters()

  const counts = useMemo<StaffRoleCounts>(() => {
    if (!staff) return FALLBACK_COUNTS
    return {
      total: staff.length,
      tecnico: staff.filter((member) => STAFF_ROLE_GROUP[member.role] === 'tecnico').length,
      medico: staff.filter((member) => STAFF_ROLE_GROUP[member.role] === 'medico').length,
      administrativo: staff.filter((member) => STAFF_ROLE_GROUP[member.role] === 'administrativo').length,
    }
  }, [staff])

  const filtered = useMemo(() => {
    if (!staff) return []
    return staff.filter((member) => {
      if (tab !== 'todos' && STAFF_ROLE_GROUP[member.role] !== tab) return false
      if (applied.club !== 'todos' && member.club.id !== applied.club) return false
      if (applied.role !== 'todos' && member.role !== applied.role) return false
      if (applied.status !== 'todos' && member.status !== applied.status) return false
      if (applied.search) {
        const haystack =
          `${member.name} ${member.club.name} ${member.club.fullName ?? ''} ${STAFF_ROLE_LABEL[member.role]}`.toLowerCase()
        if (!haystack.includes(applied.search.toLowerCase())) return false
      }
      return true
    })
  }, [staff, tab, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
    [filtered, currentPage, perPage],
  )

  const handleTabChange = (value: StaffRoleGroupId) => {
    setTab(value)
    setPage(1)
  }

  const handleFiltersChange = (filters: StaffFilters) => {
    setApplied(filters)
    setPage(1)
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
    setPage(1)
  }

  return (
    <div className="space-y-3">
      <StaffHero tab={tab} onTabChange={handleTabChange} counts={counts} />

      {optionsLoading || !options ? (
        <Skeleton className="h-[70px] w-full rounded-card" />
      ) : (
        <StaffToolbar
          options={options}
          applied={applied}
          onChange={handleFiltersChange}
          onClear={() => handleFiltersChange(EMPTY_FILTERS)}
        />
      )}

      <StaffTable staff={pageRows} isLoading={isLoading} startIndex={(currentPage - 1) * perPage} />

      {!isLoading && staff && filtered.length > 0 && (
        <TablePagination
          page={currentPage}
          perPage={perPage}
          total={filtered.length}
          itemLabel="miembros"
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}

      {!isLoading && staff && filtered.length === 0 && (
        <EmptyState
          title="No hay miembros que coincidan"
          description="Prueba con otra combinación de filtros o selecciona otra pestaña."
        />
      )}
    </div>
  )
}
