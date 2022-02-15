import { useFrame } from '@react-three/fiber'

const neededSamples = 7 // Odd numbers only
const targets = [
  24, 25, 30, 48, 50, 60, 75, 85, 120, 144,
  160, 165, 170, 180, 200, 240, 360
]
const snapFps = rawFps => [...targets].sort(devSort(rawFps)).shift()
const devSort = mean => (a, b) => Math.abs(a - mean) - Math.abs(b - mean)
const samples = []

const FpsDetect = ({ onDetect }) => {
  useFrame((_, delta) => {
    const fps = 1 / (delta + 0.000001)

    if (samples.unshift(snapFps(fps)) === neededSamples) {
      // Return the median result
      const sorted = [...samples].sort((a, b) => a - b)
      const median = sorted[Math.floor(neededSamples / 2)]
      const detectedFps = snapFps(median)

      onDetect(detectedFps)
    }
  })

  return null
}

export default FpsDetect
