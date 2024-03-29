import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring } from 'framer-motion'

import { useReducedMotion } from 'hooks/use-media-query'
import useMotionRate from 'hooks/use-motion-rate'
import useDreamscapeOpacity from 'hooks/use-dreamscape-opacity'
import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'

const RenderHalt = () => useFrame(() => null, 1000)

const Dreamscape = ({ onFirstFrame, children }) => {
  const [opacity] = useDreamscapeOpacity()
  const motionRate = useMotionRate()
  const reduceMotion = useReducedMotion() ? 0.2 : 1.0
  const scrollEnabled = reduceMotion === 1

  const startingCameraRotation = 30
  // const baseCameraRotation = -10
  const [renderActive, setRenderActive] = useState(true)
  const [firstFrameRendered, setFirstFrameRendered] = useState(false)
  const springConfig = {
    stiffness: 100,
    damping: 40,
    restSpeed: 0.001,
    restDelta: 0.001
  }
  const springs = {
    camYaw: useSpring(0, springConfig),
    camPitch: useSpring(0, springConfig),
    startingPan: useSpring(startingCameraRotation, {
      ...springConfig,
      stiffness: 25,
      damping: 60
    })
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
    springs.startingPan.set(0)
  }, [camGroup.current])

  useFrame(() => {
    if (!firstFrameRendered) {
      setFirstFrameRendered(true)
      onFirstFrame()
    }

    const scrollContribution = window.scrollY < 2500 ? window.scrollY : 0

    let camPitch = -THREE.MathUtils.degToRad(scrollContribution / 48 * scrollEnabled)
    camPitch += THREE.MathUtils.degToRad(springs.camPitch.get() * -2)
    camPitch += THREE.MathUtils.degToRad(springs.startingPan.get() * scrollEnabled)
    const camYaw = THREE.MathUtils.degToRad(springs.camYaw.get() * -2)
    const rotation = new THREE.Euler(camPitch, camYaw, 0, 'XYZ')
    const xOffset = springs.camYaw.get() * 0.025
    const yOffset = springs.camPitch.get() * -0.025

    camGroup.current?.setRotationFromEuler(rotation)
    camGroup.current?.position.set(0 + xOffset, 0.1 + yOffset, 1)

    setRenderActive(opacity.get() > 0 && motionRate.get() > 0)
  })

  return (
    <>
      {children}
      <group ref={camGroup}>
        <PerspectiveCamera makeDefault fov={75} near={0.001} far={100} />
        <FarField position={[0, 0, -10]} />
      </group>
      <Bokeh />
      <Expanse />
      { renderActive ? null : <RenderHalt /> }
    </>
  )
}

export default Dreamscape
