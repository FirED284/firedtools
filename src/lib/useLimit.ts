'use client'
export function useToolLimit(toolSlug: string) {
  const key = `firedtools_${toolSlug}_${new Date().toDateString()}`
  const getCount = () => parseInt(localStorage.getItem(key) || '0', 10)
  const increment = () => { const c = getCount(); localStorage.setItem(key, String(c + 1)); return c + 1 }
  const isLimited = () => getCount() >= 20
  return { getCount, increment, isLimited }
}
