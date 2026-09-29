import { createContext, useContext } from 'react'
import type { Season } from '@/types'

export interface SeasonContextValue {
  season: Season
  setSeason: (season: Season) => void
}

export const SEASONS: Season[] = ['2026', '2025', '2024']

export const SeasonContext = createContext<SeasonContextValue | null>(null)

export function useSeason(): SeasonContextValue {
  const context = useContext(SeasonContext)
  if (!context) {
    throw new Error('useSeason debe usarse dentro de un <SeasonProvider>')
  }
  return context
}
