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
  const camRotation = useSpring(
    startingCameraRotation,
    { stiffness: 1, damping: 2, restSpeed: 0.001, restDelta: 0.001 }
  )
  const lightSpring = useSpring(
    Number(!darkMode),
    { stiffness: 1, damping: 2, restSpeed: 0.001, restDelta: 0.001 }
  )
  const camGroup = useRef()

  const handleScroll = () => {
    setRenderActive(window.scrollY < 2000)
    camRotation.set(baseCameraRotation - (window.scrollY / 2000 * 40))
  }

  // Stop animation after a specified scroll threshold
  // TODO: Define this without using a magic number
  // TODO: Test with large displays in portrait mode
  useEffect(() => {
    const handleVis = () => setRenderActive(document.visibilityState === 'visible')

    handleScroll()
    handleVis()
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('visibilitychange', handleVis)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVis)
    }
  }, [])

  useEffect(() => {
    const unsub = camRotation.onChange(() => {
      // TODO: tie this to mouse position
      const angle = THREE.Math.degToRad(camRotation.get())
      const rotation = new THREE.Euler(angle, 0, 0, 'XYZ')
      camGroup.current?.setRotationFromEuler(rotation)
    })

    camGroup.current?.position.set(0, 0.1, 1)

    return unsub
  }, [camGroup.current])

  useFrame(() => {
    if (!firstFrameRendered) {
      setFirstFrameRendered(true)
      onFirstFrame()
    }
  })

  lightSpring.set(Number(!darkMode))

  return (
    <>
      {children}
      <group ref={camGroup}>
        <PerspectiveCamera makeDefault fov={75} near={0.001} far={100} />
        <FarField position={[0, 0, -10]} lights={lightSpring} />
      </group>
      <Bokeh lights={lightSpring} />
      <Expanse lights={lightSpring} />
      { renderActive ? null : <RenderHalt /> }
    </>
  )
}

export default Dreamscape
