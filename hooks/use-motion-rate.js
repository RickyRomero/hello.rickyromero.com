import create from 'zustand'
import { useSpring } from 'framer-motion'

const springConfig = {
  stiffness: 100,
  damping: 40,
  restSpeed: 0.01,
  restDelta: 0.01
}

const useMotionRate = create((set, get) => ({
  spring: null,
  motionRate: () => {
    let spring = get().spring

    if (!spring) {
      spring = useSpring(1, springConfig)
      set({ spring })
    }

    return spring
  }
}))

export default useMotionRate
