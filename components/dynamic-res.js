// This component is responsible for dynamically adjusting render resolution
// in favor of high framerates.

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

import useLogs from 'hooks/use-logs'

const debugOverlayStyles = {
  width: '100vw',
  height: '100vh'
}

const debugStyles = {
  position: 'absolute',
  bottom: 30,
  right: 30
}

const calcInterval = 1000
const fps = {
  samples: [],
  average: () => Math.round(1 / (fps.samples.reduce((a, b) => a + b, 0) / fps.samples.length)),
  nextCalc: Date.now() + calcInterval
}
const dpr = window.devicePixelRatio

const DynamicRes = ({ fpsTarget, pixelRatio, onUpdate, debug }) => {
  const debugOverlay = useRef()
  const logEntry = useLogs(state => state.logEntry)

  useEffect(() => {
    const timeout = setTimeout(() => {
      logEntry({
        target: '#gpu',
        fps: fps.average()
      })
    }, 6000)
    return () => clearTimeout(timeout)
  }, [])

  useFrame((three, delta) => {
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

      const stats = [
        `w:${three.size.width}`,
        `h:${three.size.height}`,
        `dpr:${three.viewport.dpr}`,
        `avg:${fps.average()}`,
        `max:${fpsTarget}`
      ].join(' / ')
      if (debugOverlay.current) { debugOverlay.current.innerText = stats }
    }
  })

  return debug && (
    <ScrollControls>
      <Scroll html style={debugOverlayStyles}>
        <span style={debugStyles} ref={debugOverlay} />
      </Scroll>
    </ScrollControls>
  )
}

export default DynamicRes
