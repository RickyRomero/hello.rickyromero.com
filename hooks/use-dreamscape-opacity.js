import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

const useDreamscapeOpacity = () => {
  const w = typeof window !== 'undefined' ? window : {}
  const d = typeof document !== 'undefined' ? document : {}
  const windowContribution = (w?.innerHeight || 1000) * 2
  const maxThreshold = 1500
  const threshold = Math.min(maxThreshold, windowContribution)
  const fadeRange = 1000

  const upperTrigger = threshold
  let lowerTrigger = (
    d?.body?.offsetHeight || Number.MAX_SAFE_INTEGER
  ) - threshold - (windowContribution / 2)

  const initialFade = useSpring(0.001, { damping: 1, stiffness: 1 })
  const offsetY = useMotionValue(0)
  const scrollInfluence = v => {
    const upperDistance = v - upperTrigger
    const lowerDistance = v - lowerTrigger

    const upperFade = 1 - Math.min(1, Math.max(0, upperDistance / fadeRange))
    const lowerFade = Math.min(1, Math.max(0, lowerDistance / fadeRange))

    return Math.max(upperFade, lowerFade)
  }

  useEffect(() => {
    const updateOffset = () => {
      lowerTrigger = d.body.offsetHeight - threshold - (windowContribution / 2)
      offsetY.set(w.scrollY)
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
