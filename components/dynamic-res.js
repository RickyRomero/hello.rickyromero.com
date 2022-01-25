// This component is responsible for dynamically adjusting render resolution
// in favor of high framerates.

import { useFrame } from '@react-three/fiber'

const calcInterval = 1000
const fps = {
  samples: [],
  average: () => Math.round(1 / (fps.samples.reduce((a, b) => a + b) / fps.samples.length)),
  nextCalc: Date.now() + calcInterval
}
const dpr = window.devicePixelRatio

const DynamicRes = ({ fpsTarget, pixelRatio, onUpdate }) => {
  useFrame((_, delta) => {
    const now = Date.now()
    if (fps.samples.unshift(delta) > 60) { fps.samples.pop() }

    if (now > fps.nextCalc) {
      const average = fps.average()
      const belowTarget = average < fpsTarget * 0.95

      fps.nextCalc = now + (calcInterval * (belowTarget ? 1 : 10))
      const step = belowTarget ? -0.3 : 0.1

      let newPixelRatio = Math.round((pixelRatio + step) * 10) / 10
      newPixelRatio = Math.max(0.75, newPixelRatio)
      newPixelRatio = Math.min(dpr, newPixelRatio)

      if (pixelRatio !== newPixelRatio) {
        onUpdate(newPixelRatio)
      }
    }
  })

  return null
}

export default DynamicRes
