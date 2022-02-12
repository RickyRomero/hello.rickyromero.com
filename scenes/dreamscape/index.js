import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring } from 'framer-motion'

import { useDarkMode, useReducedMotion } from 'hooks/use-media-query'
import useMotionRate from 'hooks/use-motion-rate'
import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'

const RenderHalt = () => useFrame(() => null, 1000)

const Dreamscape = ({ onFirstFrame, children }) => {
  const motionRate = useMotionRate()
  const darkMode = useDarkMode()
  const reduceMotion = useReducedMotion() ? 0.2 : 1.0
  const scrollEnabled = reduceMotion === 1

  // const startingCameraRotation = 30
  // const baseCameraRotation = -10
  const [renderActive, setRenderActive] = useState(true)
  const [firstFrameRendered, setFirstFrameRendered] = useState(false)
  const springConfig = {
    damping: 40,
    restSpeed: 0.001,
    restDelta: 0.001
  }
  const springs = {
    camYaw: useSpring(0, { ...springConfig, stiffness: 100 }),
    camPitch: useSpring(0, { ...springConfig, stiffness: 100 }),
    light: useSpring(Number(!darkMode), { ...springConfig, stiffness: 600 })
  }
  const camGroup = useRef()

  useEffect(() => {
    const handleCursorPos = event => {
      if (event.pointerType !== 'mouse') { return }

      let yaw, pitch
      if (event.type === 'pointermove') {
        yaw = ((event.clientX / window.innerWidth) - 0.5) * 3
        pitch = ((event.clientY / window.innerHeight) - 0.5) * 3
      } else if (event.type === 'pointerleave') {
        yaw = pitch = 0
      }

      springs.camYaw.set(yaw * motionRate.get() * reduceMotion)
      springs.camPitch.set(pitch * motionRate.get() * reduceMotion)
    }
    const handleVis = () => setRenderActive(document.visibilityState === 'visible')

    handleVis()
    window.addEventListener('pointermove', handleCursorPos)
    document.addEventListener('pointerleave', handleCursorPos)
    document.addEventListener('visibilitychange', handleVis)

    return () => {
      window.removeEventListener('pointermove', handleCursorPos)
      document.removeEventListener('pointerleave', handleCursorPos)
      document.removeEventListener('visibilitychange', handleVis)
    }
  }, [reduceMotion])

  useEffect(() => {
    camGroup.current?.position.set(0, 0.1, 1)
  }, [camGroup.current])

  useFrame(() => {
    if (!firstFrameRendered) {
      setFirstFrameRendered(true)
      onFirstFrame()
    }

    let camPitch = -THREE.Math.degToRad(window.scrollY / 48 * scrollEnabled)
    camPitch += THREE.Math.degToRad(springs.camPitch.get() * -4)
    const camYaw = THREE.Math.degToRad(springs.camYaw.get() * -4)
    const rotation = new THREE.Euler(camPitch, camYaw, 0, 'XYZ')
    camGroup.current?.setRotationFromEuler(rotation)

    // Stop animation after a specified scroll threshold
    // TODO: Define this without using a magic number
    // TODO: Test with large displays in portrait mode
    setRenderActive(window.scrollY < 2000 && motionRate.get() > 0)
  })

  springs.light.set(Number(!darkMode))

  return (
    <>
      {children}
      <group ref={camGroup}>
        <PerspectiveCamera makeDefault fov={75} near={0.001} far={100} />
        <FarField position={[0, 0, -10]} lights={springs.light} />
      </group>
      <Bokeh lights={springs.light} />
      <Expanse lights={springs.light} />
      { renderActive ? null : <RenderHalt /> }
    </>
  )
}

export default Dreamscape
