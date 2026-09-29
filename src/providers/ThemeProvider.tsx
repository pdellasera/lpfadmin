import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { THEME_STORAGE_KEY, ThemeContext } from './ThemeContext'
import type { ResolvedTheme, ThemePreference } from './ThemeContext'

const THEME_COLOR: Record<ResolvedTheme, string> = {
  dark: '#061426',
  light: '#eef2f7',
}

function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'dark'
}

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return preference
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStoredPreference)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(readStoredPreference()),
  )

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
    setResolvedTheme(resolveTheme(next))
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (preference === 'system') {
        setResolvedTheme(media.matches ? 'dark' : 'light')
      }
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = THEME_COLOR[resolvedTheme]
  }, [resolvedTheme])

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme, setPreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
