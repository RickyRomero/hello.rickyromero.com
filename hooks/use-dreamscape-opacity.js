import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

const useDreamscapeOpacity = () => {
  const w = typeof window !== 'undefined' ? window : {}
  const maxThreshold = 1500
  const fadeRange = 1000

  const initialFade = useSpring(0.001, { damping: 1, stiffness: 1 })
  const threshold = Math.min(maxThreshold, (w?.innerHeight || 1000) * 2)
  const offsetY = useMotionValue(-threshold)
  const scrollInfluence = v => (
    1 - (Math.min(Math.max(0, v), fadeRange) / fadeRange)
  )

  useEffect(() => {
    const updateOffset = () => {
      offsetY.set((w.scrollY || 0) - threshold)
    }

    // Running updateOffset() here by itself results in an assumed
    // inaccurate scroll offset, so we must delay until the next frame
    w.requestAnimationFrame(updateOffset)
    w.addEventListener('scroll', updateOffset)
    w.addEventListener('resize', updateOffset)
    return () => {
      w.removeEventListener('scroll', updateOffset)
      w.removeEventListener('resize', updateOffset)
    }
  }, [])

  const scrollOpacity = useTransform(offsetY, scrollInfluence)

  return [scrollOpacity, initialFade]
}

export default useDreamscapeOpacity
