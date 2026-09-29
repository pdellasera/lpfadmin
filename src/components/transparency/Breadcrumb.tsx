import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa6'

interface BreadcrumbProps {
  items: string[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="font-semibold text-content-primary">{item}</span>
              ) : (
                <>
                  <Link to="/panel" className="text-content-muted transition-colors hover:text-content-primary">
                    {item}
                  </Link>
                  <FaChevronRight className="text-[9px] text-content-faint" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
