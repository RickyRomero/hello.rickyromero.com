// This component is responsible for dynamically adjusting render resolution
// in favor of high framerates.

import { useFrame } from '@react-three/fiber'

const calcInterval = 750
const displayCheckInterval = 60 * 1000
const displayCalcTimeout = 1 * 3000
const maxCalcSkips = 7
const fpsCeiling = 240 // Kinda stupid to render faster than this
const fps = {
  samples: [],
  average: () => Math.round(1 / (fps.samples.reduce((a, b) => a + b) / fps.samples.length)),
  max: 60,
  skipCalcs: 0,
  nextCalc: Date.now() + calcInterval,
  nextDisplayCheck: Date.now(),
  nextDisplayCalc: Number.MAX_VALUE
}
const dpr = window.devicePixelRatio

const DynamicRes = ({ pixelRatio, onUpdate }) => {
  useFrame((_, delta) => {
    const now = Date.now()
    if (fps.samples.unshift(delta) > 60) { fps.samples.pop() }

    if (now > fps.nextCalc) {
      const average = fps.average()
      if (Math.abs(average - fps.max) < 2) {
        fps.skipCalcs = Math.min(fps.skipCalcs + 1, maxCalcSkips)
      } else {
        fps.skipCalcs = 0
      }
      fps.nextCalc = now + (calcInterval * (fps.skipCalcs + 1))

      const step = average < fps.max ? -1 : 1
      let newPixelRatio = (Math.round(pixelRatio * 5) + step) / 5
      newPixelRatio = Math.max(1.0, newPixelRatio)
      newPixelRatio = Math.min(dpr, newPixelRatio)
      if (pixelRatio !== newPixelRatio) {
        console.log(newPixelRatio)
        onUpdate(newPixelRatio)
      }
    }

    if (now > fps.nextDisplayCheck) {
      fps.nextDisplayCheck = now + displayCheckInterval
      fps.nextDisplayCalc = now + displayCalcTimeout
      fps.nextCalc = Number.MAX_VALUE
      fps.skipCalcs = 0
      fps.max = fpsCeiling // Until proven otherwise
      onUpdate(pixelRatio * 0.8)
    }

    if (now > fps.nextDisplayCalc) {
      fps.nextDisplayCalc = Number.MAX_VALUE
      fps.nextCalc = now + calcInterval
      const target = Math.max(fps.average(), 60)
      fps.max = target
    }
  })

  return null
}

export default DynamicRes
