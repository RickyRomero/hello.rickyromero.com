import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring } from 'framer-motion'

import useMediaQuery from 'hooks/use-media-query'
import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'

const RenderHalt = () => useFrame(() => null, 1000)

const Dreamscape = ({ onFirstFrame, children }) => {
  const darkMode = useMediaQuery('prefers-color-scheme', 'dark')
  const startingCameraRotation = 30
  const baseCameraRotation = -10
  const [renderActive, setRenderActive] = useState(true)
  const [firstFrameRendered, setFirstFrameRendered] = useState(false)
  const springConfig = {
    stiffness: 600,
    damping: 40,
    restSpeed: 0.001,
    restDelta: 0.001
  }
  const springs = {
    camYaw: useSpring(0, { ...springConfig, stiffness: 100 }),
    camPitch: useSpring(0, { ...springConfig, stiffness: 100 }),
    light: useSpring(Number(!darkMode), springConfig)
  }
  const camGroup = useRef()

  useEffect(() => {
    const handleCursorPos = event => {
      if (event.pointerType !== 'mouse') { return }

      let yaw, pitch
      if (event.type === 'pointermove') {
        yaw = (event.clientX / window.innerWidth * 3) - 1
        pitch = (event.clientY / window.innerHeight * 3) - 1
      } else if (event.type === 'pointerleave') {
        yaw = pitch = 0
      }

      springs.camYaw.set(yaw)
      springs.camPitch.set(pitch)
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
  }, [])

  useEffect(() => {
    camGroup.current?.position.set(0, 0.1, 1)

    const setCameraAngle = () => {
      let camPitch = -THREE.Math.degToRad(window.scrollY / 48)
      camPitch += THREE.Math.degToRad(springs.camPitch.get() * -4)
      const camYaw = THREE.Math.degToRad(springs.camYaw.get() * -4)
      const rotation = new THREE.Euler(camPitch, camYaw, 0, 'XYZ')
      camGroup.current?.setRotationFromEuler(rotation)

      // Stop animation after a specified scroll threshold
      // TODO: Define this without using a magic number
      // TODO: Test with large displays in portrait mode
      setRenderActive(window.scrollY < 2000)
    }

    window.addEventListener('scroll', setCameraAngle)
    const cameraUnsubs = [
      springs.camPitch,
      springs.camYaw
    ].map(spring => (
      spring.onChange(setCameraAngle)
    ))

    return () => {
      window.removeEventListener('scroll', setCameraAngle)
      cameraUnsubs.forEach(unsub => unsub())
    }
  }, [camGroup.current])

  useFrame(() => {
    if (!firstFrameRendered) {
      setFirstFrameRendered(true)
      onFirstFrame()
    }
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
