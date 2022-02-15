import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'
import { useDarkMode } from 'hooks/use-media-query'

const useLights = () => {
  const darkMode = useDarkMode()
  const lights = useMotionValue(Number(!darkMode))

  useEffect(() => lights.set(Number(!darkMode)), [darkMode])

  return lights
}

export default useLights
