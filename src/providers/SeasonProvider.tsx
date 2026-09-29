import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Season } from '@/types'
import { SEASONS, SeasonContext } from './SeasonContext'

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>(SEASONS[0])

  const value = useMemo(() => ({ season, setSeason }), [season])

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>
}
