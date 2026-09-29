const API_URL = (import.meta.env.VITE_API_URL ?? '') as string

export const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

const MOCK_DELAY_MS = 320

export async function request<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  if (!API_URL) {
    throw new Error('VITE_API_URL no está configurado')
  }
  const base = API_URL.endsWith('/') ? API_URL : `${API_URL}/`
  const url = new URL(path.replace(/^\//, ''), base)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }
  }
  const response = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`API respondió ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as T
}

export function delay<T>(value: T, ms: number = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}
