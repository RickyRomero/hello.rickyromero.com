import { useEffect, useState } from 'react'

const featureSupported = feature => {
  if (typeof window === 'undefined') { return false }

  const resolvedFeature = window.matchMedia(feature).media
  return feature === resolvedFeature
}

const useMediaQuery = (query, condition) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const feature = `(${query})`
    const match = `(${query}: ${condition})`

    if (!featureSupported(feature)) { return }
    const mediaQuery = window.matchMedia(match)
    const update = () => { setActive(mediaQuery.matches) }
    update()

    mediaQuery.addEventListener('change', update)
    return () => { mediaQuery.removeEventListener('change', update) }
  }, [])

  return active
}

const useDarkMode = () => useMediaQuery('prefers-color-scheme', 'dark')
const useHighContrast = () => useMediaQuery('prefers-contrast', 'more')
const useReducedMotion = () => useMediaQuery('prefers-reduced-motion', 'reduce')

export default useMediaQuery
export { useDarkMode, useHighContrast, useReducedMotion }
