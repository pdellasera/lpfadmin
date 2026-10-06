import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import type { ReportCatalogItem } from '@/types'
import { ReportIcon } from './ReportIcon'

interface ReportCardProps {
  item: ReportCatalogItem
}

export function ReportCard({ item }: ReportCardProps) {
  const content = (
    <>
      <ReportIcon category={item.category} />
      <div>
        <h3 className="text-[15px] font-bold text-content-primary">{item.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-content-secondary">{item.description}</p>
      </div>
    </>
  )

  if (item.href) {
    return (
      <Link to={item.href} className="group block h-full">
        <Card className="flex h-full flex-col gap-3 p-5 transition-colors group-hover:border-brand-600/60">
          {content}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[12px] font-semibold text-brand-400">
            Ver reporte
            <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </Card>
      </Link>
    )
  }

  return <Card className="flex h-full flex-col gap-3 p-5">{content}</Card>
}