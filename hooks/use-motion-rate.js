import { createHook } from 'hookleton'
import { useSpring } from 'framer-motion'

const springConfig = {
  stiffness: 100,
  damping: 40,
  restSpeed: 0.01,
  restDelta: 0.01
}

const useMotionRate = createHook(() => useSpring(1, springConfig))

export default useMotionRate
