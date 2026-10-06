import { useState } from 'react'
import { FaCopy } from 'react-icons/fa6'
import { Card } from '@/components/ui/Card'
import { SegmentedToggle, type SegmentedOption } from '@/components/ui/SegmentedToggle'
import type { ApiCodeSample, ApiLanguage } from '@/types'

interface ApiCodeSampleCardProps {
  samples: ApiCodeSample[]
}

export function ApiCodeSampleCard({ samples }: ApiCodeSampleCardProps) {
  const [lang, setLang] = useState<ApiLanguage>('curl')
  const active = samples.find((sample) => sample.id === lang) ?? samples[0]

  const options: SegmentedOption<ApiLanguage>[] = samples.map((sample) => ({
    id: sample.id,
    label: sample.label,
  }))

  if (!active) return null

  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-content-primary">Ejemplo de solicitud</h3>
        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-faint bg-surface-input px-3 text-xs font-semibold text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
        >
          <FaCopy className="text-[11px]" /> Copiar
        </button>
      </div>

      <div className="mt-3">
        <SegmentedToggle value={lang} onChange={setLang} options={options} />
      </div>

      <pre className="mt-3 flex-1 overflow-x-auto rounded-xl border border-line/60 bg-surface-deep p-4 text-[12.5px] leading-relaxed text-slate-200">
        <code className="font-mono whitespace-pre">{active.code}</code>
      </pre>
    </Card>
  )
}
